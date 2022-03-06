<script>
const { Api, TelegramClient, errors: TgErrors } = require("telegram");
const { StringSession } = require("telegram/sessions");

import { getChannels, saveReported } from "@/api/endpoints";
// We get User data(below) after phone code form initialization
// apiId: null,
// apiHash: null,
// phoneNumber: null,
export default {
  name: "Telegram-Bot",
  components: {},
  data() {
    return {
      sessionKey: "tgSession",
      floodDateKey: "floodDate",
      client: null,
      connected: null,
      launched: null,
      verificationCode: null,
      errorCounter: 0,
      channelsList: [],
      floodDate: this.getFloodDate(),
    };
  },

  async mounted() {
    if (!this.checkFloodDate()) return;

    await this.initializeConnection();

    if (this.connected) {
      await this.runReporting();
    }
  },

  methods: {
    setPhoneData(payload) {
      this.phoneNumber = payload.phoneNumber;
    },

    getFloodDate() {
      const date = localStorage.getItem("floodDate");

      if (!date) {
        return null;
      }

      return new Date(+date);
    },

    setFloodDate(seconds) {
      const nowMs = Date.now();
      const waitMs = seconds * 1000;
      const value = nowMs + waitMs;

      this.floodDate = new Date(value);

      localStorage.setItem(this.floodDateKey, value);
    },

    getSession() {
      return localStorage.getItem(this.sessionKey);
    },

    setSession(sessionString) {
      localStorage.setItem(this.sessionKey, sessionString);
    },

    async initializeConnection() {
      try {
        this.sendMessage(this.$t("connecting"), "warn");

        const { apiId, apiHash } = this;
        let sessionString = this.getSession();

        if (!sessionString) {
          sessionString = "";
        }

        const session = new StringSession(sessionString);

        this.client = new TelegramClient(session, +apiId, apiHash, {
          connectionRetries: 5,
          useWSS: true,
        });

        await this.client.start({
          phoneNumber: this.phoneNumber,
          phoneCode: async () => {
            this.verificationCode = await prompt(
              this.$t("enter-telegram-code")
            );

            return this.verificationCode;
          },
          onError: (err) => {
            this.sendMessage(err.message, "error");
            throw err;
          },
        });

        this.sendMessage(this.$t("connected"), "warn");

        this.setSession(this.client.session.save());

        await this.client.connect();

        this.connected = true;
      } catch (err) {
        this.sendMessage(err?.message || err, "error");
        this.sendMessage(this.$t("unable-to-connect-try-reconnect"), "warn");

        this.disconnect();
      }
    },

    disconnect() {
      this.stopReporting();
      this.client = null;
      this.connected = null;
      this.verificationCode = null;
    },

    getRandomReason() {
      const first = [
        this.$t("reason-1-1"),
        this.$t("reason-1-2"),
        this.$t("reason-1-3"),
        this.$t("reason-1-4"),
        this.$t("reason-1-5"),
        this.$t("reason-1-6"),
        this.$t("reason-1-7"),
      ];
      const second = [
        this.$t("reason-2-1"),
        this.$t("reason-2-2"),
        this.$t("reason-2-3"),
        this.$t("reason-2-4"),
        this.$t("reason-2-5"),
      ];

      return randomEl(first) + randomEl(second);

      function randomEl(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      }
    },

    async reportChannel(channelName, message) {
      return this.client.invoke(
        new Api.account.ReportPeer({
          peer: channelName,
          reason: new Api.InputReportReasonSpam({}),
          message,
        })
      );
    },

    wait(seconds) {
      return new Promise((res) => {
        const timer = setTimeout(() => {
          res();
        }, seconds * 1000);

        setInterval(() => {
          if (!this.launched) {
            clearTimeout(timer);
            res();
          }
        }, 1);
      });
    },

    randomInRange(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    sendMessage(message, type = "info") {
      this.$emit("send-logger-message", {
        message,
        type,
        date: new Date(),
      });
    },

    incrementError() {
      this.errorCounter += 1;
    },

    decrementError() {
      const { errorCounter } = this;

      if (errorCounter !== 0) {
        this.errorCounter -= 1;
      }
    },

    checkFloodDate() {
      if (!this.floodDate) {
        return true;
      }

      const floodDateMs = this.floodDate.getTime();
      const nowMs = Date.now();

      if (nowMs < floodDateMs) {
        this.disconnect();
        this.sendMessage(
          this.$t("flood-error", {
            date: this.floodDate.toLocaleString("en-US"),
          }),
          "error"
        );

        return false;
      }

      return true;
    },

    async processChannel(channelName) {
      const randomSec = this.randomInRange(30, 60);

      try {
        if (!this.checkFloodDate()) return;

        const message = this.getRandomReason();

        await this.reportChannel(channelName, message);
        await this.saveReportedChannel(channelName);

        this.sendMessage(
          `[${channelName}] ${this.$t("sent-report")}: ${message}`,
          "info"
        );

        await this.wait(randomSec);
        this.decrementError();
      } catch (err) {
        if (err instanceof TgErrors.FloodWaitError) {
          this.setFloodDate(err.seconds);
        }

        this.incrementError();

        this.sendMessage(err.message, "error");

        if (this.errorCounter >= 5) {
          this.sendMessage(this.$t("stopped-by-error-series"), "error");
          this.errorCounter = 0;
          this.stopReporting();
        }

        await this.wait(randomSec);
      }
    },

    async handleConnection() {
      if (!this.client || !this.connected) {
        return this.initializeConnection();
      }
    },

    async stopReporting() {
      this.sendMessage(this.$t("reporting-stopping"), "warn");
      this.launched = false;
    },

    async apiRequest(req, options) {
      try {
        const res = await req(options);

        return res;
      } catch (error) {
        if (error.status === 401) {
          this.sendMessage(this.$t("error-unauthorized"), "error");
          localStorage.removeItem("accessToken");
          this.disconnect();
          return this.handleCancel();
        }

        this.sendMessage(this.$t("error-with-channels-api"), "error");
        this.disconnect();

        throw error;
      }
    },

    async getChannelsList(options = {}) {
      try {
        const channelsResponse = await this.apiRequest(getChannels, options);
        const { data } = channelsResponse;
        this.channelsList = data;
      } catch (error) {
        // nothing
      }
    },

    async saveReportedChannel(channelName) {
      try {
        await this.apiRequest(saveReported, { name: channelName });
      } catch (error) {
        // nothing
      }
    },

    async runReporting() {
      this.sendMessage(this.$t("reporting-launched"), "warn");

      await this.handleConnection();

      if (!this.connected) {
        return this.sendMessage(
          this.$t("couldnt-launch-without-connection"),
          "error"
        );
      }

      this.launched = true;

      await this.getChannelsList();

      for (let i = 0; i < this.channelsList.length; i += 1) {
        if (!this.launched) {
          this.sendMessage(this.$t("reporting-stopped"), "warn");

          /** exit */
          return;
        }

        const channel = this.channelsList[i];

        await this.processChannel(channel.name);
      }
    },
  },
};
</script>
