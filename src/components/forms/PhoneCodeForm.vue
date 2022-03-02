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
      key="numberValidationCode"
      name="numberValidationCode"
      v-slot="{ errors }"
      rules="required"
    >
      <label for="numberValidationCode">Enter verification code</label>
      <input
        v-model="number"
        type="text"
        class="form-control input-large"
        id="numberValidationCode"
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
