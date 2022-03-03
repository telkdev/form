<template>
  <ValidationObserver
    ref="observer"
    class="form"
    tag="form"
    v-slot="{ invalid }"
    @submit.prevent
  >
    <h1>Sign up</h1>
    <ValidationProvider
      class="form-field"
      tag="div"
      key="phoneNumber"
      name="phoneNumber"
      v-slot="{ errors }"
      rules="required|phone"
    >
      <label for="phoneNumber">Enter phone number</label>
      <input
        v-model="phoneNumber"
        type="text"
        class="form-control input-large"
        id="phoneNumber"
        placeholder="+380998877118"
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
      key="password"
      name="password"
      v-slot="{ errors }"
      rules="required"
    >
      <label for="password">Create password (not from Telegram, just random)</label>
      <input
        v-model="password"
        type="password"
        class="form-control input-large"
        id="password"
        placeholder="some-random-password"
        autocomplete="off"
      />

      <p v-if="errors.length" class="error">
        {{ errors[0] }}
      </p>
    </ValidationProvider>

    <buttons-wrapper
      :isFirstStep="isFirstStep"
      :isLastStep="isLastStep"
      :isInvalid="invalid"
      @handle-submit="handleSubmit()"
      @handle-cancel="handleCancel()"
    />
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

import ButtonsWrapper from "@/components/buttons/ButtonsWrapper.vue";

export default {
  name: "PhoneCodeForm",
  components: {
    ValidationObserver,
    ValidationProvider,
    ButtonsWrapper,
  },
  props: {
    isFirstStep: {
      type: Boolean,
      required: true,
    },
    isLastStep: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      phoneNumber: localStorage.getItem("phoneNumber"),
      password: localStorage.getItem("password"),
    };
  },
  methods: {
    handleSubmit() {
      const payload = {
        phoneNumber: this.phoneNumber,
        password: this.password,
      };

      this.$emit("increment-step");

      this.$emit("send-phone-data", payload);
    },
    handleCancel() {
      this.$emit("decrement-step");
    },
  },
};
</script>
