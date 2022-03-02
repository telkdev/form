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
      key="verificationCode"
      name="verificationCode"
      v-slot="{ errors }"
      rules="required"
    >
      <label for="verificationCode">Enter verification code</label>
      <input
        v-model="verificationCode"
        type="text"
        class="form-control input-large"
        id="verificationCode"
        placeholder="123456"
        autocomplete="off"
      />

      <p v-if="errors.length" class="error">
        {{ errors[0] }}
      </p>
      <p class="help-block">Please enter your confirmation code</p>
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
      verificationCode: null,
    };
  },
  methods: {
    handleSubmit() {
       const payload = {
        verificationCode: this.verificationCode,
      };

      this.$emit("increment-step");

      this.$emit('send-verification-code-data', payload)
    },
    handleCancel() {
      this.$emit("decrement-step");
    },
  },
};
</script>
