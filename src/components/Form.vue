<template>
  <!-- deprecated -->
  <div class="">
    <!-- Phone number field -->
    <!-- <ValidationObserver
      v-if="!isNumberSent"
      ref="observer"
      class="form"
      tag="form"
      v-slot="{ invalid }"
      @submit.prevent
    >
      <ValidationProvider
        class="form-field"
        tag="div"
        eager
        key="number"
        name="tel"
        v-slot="{ errors }"
        rules="required|numeric"
      >
        <label for="my_login_phone">Your Phone Number</label>
        <input
          v-model.number="number"
          type="number"
          class="form-control input-large"
          id="my_login_phone"
          placeholder="+12223334455"
          autocomplete="off"
        />

        <p v-if="errors.length" class="error">
          {{ errors[0] }}
        </p>
        <p class="help-block">
          Please enter your number in
          <a href="https://telegram.org/faq#login-and-sms" target="_blank"
            >international format</a
          >
        </p>
      </ValidationProvider>
      <button
        @click="sendNumber"
        :disabled="invalid"
        class="btn btn-primary btn-lg"
      >
        Send phone number
      </button>
    </ValidationObserver> -->

    <!-- Telegram verification code field -->
    <ValidationObserver
      v-if="isNumberSent && !isNumberValidationCodeSent"
      ref="observer"
      class="form"
      tag="form"
      v-slot="{ invalid }"
      @submit.prevent
    >
      <ValidationProvider
        class="form-field"
        tag="div"
        eager
        key="numberValidationCode"
        name="numberValidationCode"
        v-slot="{ errors }"
        rules="required|numeric"
      >
        <label for="numberValidationCode">Enter verification code</label>
        <input
          v-model.number="numberValidationCode"
          type="number"
          class="form-control input-large"
          id="numberValidationCode"
          placeholder="+12223334455"
          autocomplete="off"
        />

        <p v-if="errors.length" class="error">
          {{ errors[0] }}
        </p>
        <p class="help-block">Please enter your confirmation code</p>
      </ValidationProvider>
      <button
        @click="sendNumberValidationCode"
        :disabled="invalid"
        :class="{ disabled: invalid }"
        class="btn btn-primary btn-lg"
      >
        Send verification code
      </button>
    </ValidationObserver>

    <!--  AppHash field -->
    <ValidationObserver
      v-if="isNumberSent && isNumberValidationCodeSent"
      ref="observer"
      class="form"
      tag="form"
      v-slot="{ invalid }"
      @submit.prevent
    >
      <ValidationProvider
        class="form-field"
        tag="div"
        eager
        key="number"
        name="appId"
        v-slot="{ errors }"
        rules="required|numeric"
      >
        <label for="appId">App api_id: </label>
        <input
          v-model="appId"
          type="text"
          class="form-control input-large"
          id="appId"
          placeholder="21332112"
          autocomplete="off"
        />

        <p v-if="errors.length" class="error">
          {{ errors[0] }}
        </p>
      </ValidationProvider>
      <ValidationProvider
        class="form-field"
        tag="div"
        eager
        key="number"
        name="appHash"
        v-slot="{ errors }"
        rules="required|numeric"
      >
        <label for="appHash">App api_hash: </label>
        <input
          v-model="appHash"
          type="text"
          class="form-control input-large"
          id="appHash"
          placeholder="12331231231233"
          autocomplete="off"
        />

        <p v-if="errors.length" class="error">
          {{ errors[0] }}
        </p>
      </ValidationProvider>
      <div class="support_submit">
        <button
          @submit="sendAppId"
          :disabled="invalid"
          class="btn btn-primary btn-lg"
        >
          Submit
        </button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  name: "AuthForm",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      number: null,
      appId: null,
      appHash: null,
      numberValidationCode: null,
      isNumberSent: false,
      isNumberValidationCodeSent: false,
    };
  },
  methods: {
    sendNumber() {
      this.isNumberSent = true;
      console.log(1);
      // send somewhere
    },
    sendNumberValidationCode() {
      this.isNumberValidationCodeSent = true;
      console.log(1);
      // send somewhere
    },
    sendAppData() {
      console.log(1);
      // send somewhere
    },
    validateNumber(number) {
      console.log(number);
    },
  },
};
</script>
