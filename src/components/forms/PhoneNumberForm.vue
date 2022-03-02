<template>
  <ValidationObserver
    ref="observer"
    class="form"
    tag="form"
    v-slot="{ invalid }"
    @submit.prevent="handleSubmit()"
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
        v-model="number"
        type="tel"
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
  name: "PhoneNumberForm",
  components: {
    ValidationObserver,
    ValidationProvider,
    ButtonsWrapper,
  },
  props: {
    isFirstStep: {
      type: Boolean,
      requierd: true,
    },
    isLastStep: {
      type: Boolean,
      requierd: true,
    },
  },
  data() {
    return {
      number: null,
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("increment-step");

      // TODO: send payload
    },
    handleCancel() {
      this.$emit("decrement-step");
    },
  },
};
</script>
