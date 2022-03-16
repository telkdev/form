<template>
  <ValidationObserver
    ref="observer"
    class="form"
    tag="form"
    v-slot="{ invalid }"
    @submit.prevent
  >
    <h1 class="mb-10 text-gray-700 text-sm font-medium">{{ $t("sign-up") }}</h1>
    <ValidationProvider
      class="mb-4"
      tag="div"
      key="phoneNumber"
      name="phoneNumber"
      v-slot="{ errors }"
      rules="required|phone"
    >
      <label
        for="phoneNumber"
        v-html="$t('enter-phone-number')"
        class="block text-gray-700 text-sm font-bold mb-2"
      ></label>
      <input
        v-model="phoneNumber"
        type="text"
        class="w-full rounded-lg border border-gray-400 text-gray-700 placeholder:text-gray-400 text-base py-3 focus:border-blue-500"
        id="phoneNumber"
        placeholder="+380998877118"
        autocomplete="off"
      />

      <p v-if="errors.length" class="text-xs text-red-500 mt-1 block">
        {{ errors[0] }}
      </p>
    </ValidationProvider>
    <ValidationProvider
      class="mb-10"
      tag="div"
      eager
      key="password"
      name="password"
      v-slot="{ errors }"
      rules="required"
    >
      <label
        for="password"
        class="block text-gray-700 text-sm font-bold mb-2"
        v-html="$t('enter-password')"
      ></label>
      <input
        v-model="password"
        type="password"
        class="w-full rounded-lg border border-gray-400 text-gray-700 placeholder:text-gray-400 text-base py-3 focus:border-blue-500"
        id="password"
        :placeholder="$t('placeholder-password')"
        autocomplete="off"
      />

      <p v-if="errors.length" class="text-xs text-red-500 mt-1 block">
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

      this.$emit("send-phone-data", payload);
    },
    handleCancel() {
      this.$emit("decrement-step");
    },
  },
};
</script>
