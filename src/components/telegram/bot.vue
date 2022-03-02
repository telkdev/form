<script>
const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

import { getChannels, saveReported } from "@/api/endpoints";

export default {
  name: "Telegram-Bot",
  components: {},
  data() {
    return {
      sessionKey: "tgSession",
      client: null,
      // User data
      // apiId: null,
      // apiHash: null,
      // phoneNumber: null,
    };
  },
  computed: {},

  async mounted() {
    await this.initializeConnection();
    await this.runReporting();
  },

  methods: {
    setApiData(payload) {
      this.apiId = payload.apiId;
      this.apiHash = payload.apiHash;
    },

    setPhoneData(payload) {
      this.phoneNumber = payload.phoneNumber;
    },

    getSession() {
      localStorage.getItem(this.sessionKey);
    },

    setSession(sessionString) {
      localStorage.setItem(this.sessionKey, sessionString);
    },

    async initializeConnection() {
      const { apiId, apiHash } = this;
      let sessionString = this.getSession();

      if (!sessionString) {
        sessionString = "";
      }

      const session = new StringSession(sessionString);

      this.client = new TelegramClient(session, apiId, apiHash, {
        connectionRetries: 5,
      });

      if (!(await this.client.checkAuthorization())) {
        await this.client.start({
          phoneNumber: this.phoneNumber,
          phoneCode: async () =>
            await prompt("verification code from telegram"),
          onError: (err) => console.log(err),
        });

        console.log("You should now be connected.");

        this.setSession(this.client.session.save());
      }

      await this.client.connect();
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

    async reportChannel(channelName) {
      return this.client.invoke(
        new Api.account.ReportPeer({
          peer: channelName,
          reason: new Api.InputReportReasonSpam({}),
          message: this.getRandomReason(),
        })
      );
    },

    async processChannel(channelName) {
      try {
        await this.reportChannel(channelName);
        await saveReported({ name: channelName });
      } catch (err) {
        console.error(err);
      }
    },

    async runReporting() {
      console.log("Loading interactive example...");

      const { data: telegramChannels } = await getChannels();

      for (let i = 0; i < telegramChannels.length; i += 1) {
        try {
          const channelName = telegramChannels[i];

          await this.processChannel(channelName);
        } catch (err) {
          console.error(err);
        }
      }
    },
  },
};
</script>
