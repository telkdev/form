<template>
  <div>
    <api-data-form
      v-if="currentStep === 0"
      :isFirstStep="isFirstStep"
      :isLastStep="isLastStep"
      @increment-step="incrementStep"
      @decrement-step="decrementStep"
      @send-api-data="setApiData"
    />

    <login-form
      v-if="currentStep === 1"
      :isFirstStep="isFirstStep"
      :isLastStep="isLastStep"
      @increment-step="incrementStep"
      @decrement-step="decrementStep"
      @send-phone-data="setPhoneData"
    />

    <phone-code-form
      v-if="currentStep === 2"
      :isFirstStep="isFirstStep"
      :isLastStep="isLastStep"
      @increment-step="incrementStep"
      @decrement-step="decrementStep"
    />
  </div>
</template>

<script>
import ApiDataForm from "@/components/forms/ApiDataForm.vue";
import PhoneNumberForm from "@/components/forms/PhoneNumberForm.vue";
import PhoneCodeForm from "@/components/forms/PhoneCodeForm.vue";

import {authRequest} from "@/api/auth";

const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

export default {
  name: "FormWrapper",
  components: {
    // TODO: rename
    "login-form": PhoneNumberForm,
    ApiDataForm,
    PhoneCodeForm,
  },
  data() {
    return {
      currentStep: 0,
      totalSteps: 2,
      session: null,

      // User data
      apiId: null,
      apiHash: null,
      phoneNumber: null,
      password: null,
    };
  },
  computed: {
    isFirstStep() {
      return this.currentStep === 0;
    },
    isLastStep() {
      return this.currentStep === this.totalSteps;
    },
  },
  methods: {
    incrementStep() {
      if (this.isLastStep) return;
      this.currentStep++;
    },

    decrementStep() {
      this.currentStep--;
    },

    setApiData(payload) {
      this.apiId = payload.apiId;
      this.apiHash = payload.apiHash;
    },

    setPhoneData(payload) {
      this.phoneNumber = payload.phoneNumber;
      this.password = payload.password;

      this.sendAuthRequest();
    },

    async sendAuthRequest() {
      const user = await authRequest({
        login: this.phoneNumber,
        password: this.password,
      });

      console.log(user);
    },

    // TODO: check how to save session, so we don't need to login second time;
    // TODO: send data via form, not prompt
    async sendApiData2(payload) {
      const session = this.session || new StringSession(""); // You should put your string session here
      const apiId = payload.apiId;
      const apiHash = payload.apiHash;

      (async () => {
        console.log("Loading interactive example...");
        const client = new TelegramClient(session, apiId, apiHash, {
          connectionRetries: 5,
        });

        await client.connect();

        // If not logged in
        if (!(await client.checkAuthorization())) {
          await client.start({
            //? password: ,
            phoneNumber: await prompt("phone number"),
            phoneCode: async () =>
              await prompt("verification code from telegram"),
            onError: (err) => console.log(err),
          });

          console.log("You should now be connected.");
          // Save this string to avoid logging in again
          this.session = client.session.save();
        }

        const telegramChannels = ["BeregTime", "lebedevalive"];

        telegramChannels.forEach(async (dayn) => {
          const result = await client.invoke(
            new Api.account.ReportPeer({
              peer: dayn,
              reason: new Api.InputReportReasonSpam({}),
              message:
                "Propagand of Terrorism and violence against civil people.",
            })
          );

          console.log(result); // prints the result
        });
      })();
    },
  },
};
</script>
