<script>
const { Api, TelegramClient } = require("telegram");
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
      client: null,
      connected: null,
      launched: null,
      verificationCode: null,
    };
  },
  computed: {},

  async mounted() {
    try {
      await this.initializeConnection();

      await this.runReporting();
    } catch (err) {
      this.sendMessage(err.message, "error");

      this.disconnect();

      console.error(err);
    }
  },

  methods: {
    setPhoneData(payload) {
      this.phoneNumber = payload.phoneNumber;
    },

    getSession() {
      return localStorage.getItem(this.sessionKey);
    },

    setSession(sessionString) {
      localStorage.setItem(this.sessionKey, sessionString);
    },

    async initializeConnection() {
      this.sendMessage("Connecting...", "warn");

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
          this.verificationCode = await prompt("Enter code sent by Telegram");

          return this.verificationCode;
        },
        onError: (err) => {
          this.sendMessage(err.message, "error");

          console.log(err);
          throw err;
        },
      });

      this.sendMessage("Connected", "warn");

      this.setSession(this.client.session.save());

      await this.client.connect();

      this.connected = true;
    },

    disconnect() {
      this.stopReporting();
      this.client = null;
      this.connected = null;
      this.verificationCode = null;
    },

    getRandomReason() {
      const first = [
        "Propaganda of the war in Ukraine. ",
        "Propaganda of the murder of Ukrainians and Ukrainian soldiers. ",
        "Dissemination of military personal data. ",
        "The channel undermines the integrity of the Ukrainian state. ",
        "Spreading fake news, misleading people. ",
        "Propaganda of violence and russian aggression. ",
        "Dangerous fake news from russian propagandist against Ukraine. ",
      ];
      const second = [
        "Block the channel! ",
        "Block it as soon as possible! ",
        "Ban this channel please ",
        "It would be helpful if you ban this channel ",
        "This channel is violating Telegram rules and must be stopped ",
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
        date: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }),
      });
    },

    async processChannel(channelName) {
      try {
        const randomSec = this.randomInRange(30, 60);
        const message = this.getRandomReason();

        await this.reportChannel(channelName, message);
        await saveReported({ name: channelName });

        this.sendMessage(
          `[${channelName}] was sent report: ${message}`,
          "info"
        );

        await this.wait(randomSec);
      } catch (err) {
        console.error(err);
        this.sendMessage(err.message, "error");
      }
    },

    async handleReconnect() {
      return this.initializeConnection();
    },

    async stopReporting() {
      this.sendMessage("Stopping reporting...", "warn");
      this.launched = false;
    },

    async runReporting() {
      this.sendMessage("Reporting launched", "warn");

      if (!this.connected) {
        return this.sendMessage("Couldn't launch without connection", "error");
      }

      this.launched = true;

      const channelsResponse = await getChannels({});

      const { data: telegramChannels } = channelsResponse;

      for (let i = 0; i < telegramChannels.length; i += 1) {
        try {
          if (!this.launched) {
            this.sendMessage("Reporting stopped", "warn");

            /** exit */
            return;
          }

          const channel = telegramChannels[i];

          await this.processChannel(channel.name);
        } catch (err) {
          console.error(err);
          this.sendMessage(err.message, "error");
        }
      }
    },
  },
};
</script>
