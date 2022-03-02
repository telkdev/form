<template>
  <div>
    <api-data-form
      v-show="currentStep === 0"
      :isFirstStep="isFirstStep"
      :isLastStep="isLastStep"
      @increment-step="incrementStep"
      @decrement-step="decrementStep"
      @send-api-data="setApiData"
    />

    <login-form
      v-show="currentStep === 1"
      :isFirstStep="isFirstStep"
      :isLastStep="isLastStep"
      @increment-step="incrementStep"
      @decrement-step="decrementStep"
      @send-phone-data="setPhoneData"
    />

    <phone-code-form
      v-show="currentStep === 2"
      :isFirstStep="isFirstStep"
      :isLastStep="isLastStep"
      @increment-step="incrementStep"
      @decrement-step="decrementStep"
      @send-verification-code-data="setVerificationCodeData"
    />
  </div>
</template>

<script>
import ApiDataForm from "@/components/forms/ApiDataForm.vue";
import PhoneNumberForm from "@/components/forms/PhoneNumberForm.vue";
import PhoneCodeForm from "@/components/forms/PhoneCodeForm.vue";

import { authRequest } from "@/api/auth";

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
      currentStep: 1,
      totalSteps: 2,
      session: null,

      // User data
      apiId: 17353630,
      apiHash: '3e7fc31a750f061db266e828c82e7ce5',
      phoneNumber: '+380953364145',
      password: null,
      verificationCode: null,
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

    async setPhoneData(payload) {
      this.phoneNumber = payload.phoneNumber;
      this.password = payload.password;

      await this.sendAuthRequest();

      await this.sendApiData();
    },

    async sendAuthRequest() {
      const user = await authRequest({
        login: this.phoneNumber,
        password: this.password,
      });

      console.log(user);
    },

    setVerificationCodeData(payload) {
      this.verificationCode = payload.verificationCode;
    },

    // While we reach to this method call we already wil be on a 2 step(last one), where we can easily wait for a verification code;
    async getVerificationCode() {
      console.log(this.verificationCode);

      while (!this.verificationCode) {
        await this.wait(3);
      }

      return this.verificationCode;
    },

   async wait(seconds) {
      return new Promise((res) => {
        setTimeout(() => {
          res();
        }, seconds * 1000);
      });
    },

    // TODO: check how to save session, so we don't need to login second time;
    // TODO: send data via form, not prompt
    async sendApiData() {
      const session = this.session || new StringSession(""); // You should put your string session here
      const apiId = +this.apiId;
      const apiHash = this.apiHash;

      (async () => {
        const client = new TelegramClient(session, apiId, apiHash, {
          connectionRetries: 5,
        });

        await client.connect();

        // If not logged in
        if (!(await client.checkAuthorization())) {
          await client.start({
            //? password: ,
            phoneNumber: this.phoneNumber,
            phoneCode: this.getVerificationCode(),

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
