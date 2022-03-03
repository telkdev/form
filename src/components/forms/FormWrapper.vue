<template>
  <div class="form-wrapper">
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
      v-if="currentStep === 2"
      :apiId="+apiId"
      :apiHash="apiHash"
      :phoneNumber="phoneNumber"
      :isFirstStep="isFirstStep"
      :isLastStep="isLastStep"
      @increment-step="incrementStep"
      @decrement-step="decrementStep"
      @send-verification-code-data="setVerificationCodeData"
      @send-logger-message="handleLoggerMessage"
    />
  </div>
</template>

<script>
import ApiDataForm from "@/components/forms/ApiDataForm.vue";
import PhoneNumberForm from "@/components/forms/PhoneNumberForm.vue";
import PhoneCodeForm from "@/components/forms/PhoneCodeForm.vue";

import { authRequest } from "@/api/endpoints";

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
      apiId: null,
      apiHash: localStorage.getItem("apiHash"),
      phoneNumber: localStorage.getItem("phoneNumber"),
      password: localStorage.getItem("password"),

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
  mounted() {
    // this.apiId = localStorage.getItem("apiId");
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

      localStorage.setItem("apiId", payload.apiId);
      localStorage.setItem("apiHash", payload.apiHash);
    },

    async setPhoneData(payload) {
      this.phoneNumber = payload.phoneNumber;
      this.password = payload.password;

      localStorage.setItem("phoneNumber", payload.phoneNumber);
      localStorage.setItem("password", payload.password);

      await this.sendAuthRequest();
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

    handleLoggerMessage({ message, type, date }) {
      this.$emit("send-logger-message", {
        message,
        type,
        date,
      });
    },

    // Temporary disabled
    // While we reach to this method call we already wil be on a 2 step(last one), where we can easily wait for a verification code;
    // async getVerificationCode() {
    //   console.log(this.verificationCode);

    //   while (!this.verificationCode) {
    //     await this.wait(3);
    //   }

    //   return this.verificationCode;
    // },

    // async wait(seconds) {
    //   return new Promise((res) => {
    //     setTimeout(() => {
    //       res();
    //     }, seconds * 1000);
    //   });
    // },

    // TODO: check how to save session, so we don't need to login second time;
    // TODO: send data via form, not prompt
    // async sendApiData() {
    //   const session = this.session || new StringSession(""); // You should put your string session here
    //   const apiId = +this.apiId;
    //   const apiHash = this.apiHash;

    //   (async () => {
    //     const client = new TelegramClient(session, apiId, apiHash, {
    //       connectionRetries: 5,
    //     });

    //     await client.connect();

    //     // If not logged in
    //     if (!(await client.checkAuthorization())) {
    //       await client.start({
    //         //? password: ,
    //         phoneNumber: () => this.phoneNumber,
    //         phoneCode: async () =>
    //           await prompt("Please, enter verification code from telegram"),

    //         onError: (err) => console.log(err),
    //       });

    //       console.log("You should now be connected.");
    //       // Save this string to avoid logging in again
    //       this.session = client.session.save();
    //     }

    //     const telegramChannels = ["BeregTime", "lebedevalive"];

    //     telegramChannels.forEach(async (dayn) => {
    //       const result = await client.invoke(
    //         new Api.account.ReportPeer({
    //           peer: dayn,
    //           reason: new Api.InputReportReasonSpam({}),
    //           message:
    //             "Propagand of Terrorism and violence against civil people.",
    //         })
    //       );

    //       console.log(result); // prints the result
    //     });
    //   })();
    // },
  },
};
</script>

<style>
.form {
  &-wrapper {
    a {
      -webkit-text-size-adjust: 100%;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      font: 12px/18px "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica,
        Verdana, sans-serif;
      font-size: 14px;
      line-height: 20px;
      box-sizing: border-box;
      background: transparent;
      text-decoration: none;
      color: #0088cc;
    }
  }
}

.form-field {
  margin-top: 15px;
  margin-bottom: 15px;
}

.form-actions {
  display: flex;
  gap: 1em;
}

label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
  font: inherit;
  margin: 0;
  font-family: inherit;
  display: block;
  width: 100%;
  padding: 6px 12px;
  font-size: 16px;
  line-height: 1.42857143;
  color: #555555;
  background-color: #ffffff;
  background-image: none;
  border: 1px solid #cccccc;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  border-radius: 0;
  box-shadow: none;
}

.error {
  font-size: 14px;
  color: rgb(167, 10, 10);
}

.help-bot {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font: 12px/18px "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica,
    Verdana, sans-serif;
  font-size: 14px;
  line-height: 20px;
  box-sizing: border-box;
  margin: 0 0 8.5px;
  display: block;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #737373;
}

.btn {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
  font: inherit;
  margin: 0;
  overflow: visible;
  text-transform: none;
  -webkit-appearance: button;
  font-family: inherit;
  display: inline-block;
  padding: 10px 16px;
  box-shadow: none;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.428571429;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  background-image: none;
  border: 0;
  border-radius: 4px;
  user-select: none;
  text-shadow: none;
}

.btn-primary {
  color: #fff;
  background-color: #428bca;
  border-color: #357ebd;
}

.btn-secondary {
  color: #fff;
  background-color: #a00028;
  border-color: rgb(90, 8, 12);
}

.disabled {
  user-select: none;
  pointer-events: none;
  background: grey;
  cursor: not-allowed;
}
</style>
