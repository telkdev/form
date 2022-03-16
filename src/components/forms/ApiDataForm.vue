<template>
  <ValidationObserver
    ref="observer"
    class="form"
    tag="form"
    v-slot="{ invalid }"
    @submit.prevent
  >
    <h1 class="mb-10 text-gray-700 text-sm font-medium">
      {{ $t("enter-api-data") }}
    </h1>
    <ValidationProvider
      class="mb-4"
      tag="div"
      eager
      key="apiId"
      name="api Id"
      v-slot="{ errors }"
      rules="required|min:5"
    >
      <label for="apiId" class="block text-gray-700 text-sm font-bold mb-2"
        >{{ $t("enter-app-api-id") }}:
      </label>
      <input
        v-model="apiId"
        type="text"
        class="w-full rounded-lg border border-gray-400 text-gray-700 placeholder:text-gray-400 text-base py-3 focus:border-blue-500"
        id="apiId"
        placeholder="21332112"
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
      key="apiHash"
      name="apiHash"
      v-slot="{ errors }"
      rules="required|min:15"
    >
      <label for="apiHash" class="block text-gray-700 text-sm font-bold mb-2"
        >{{ $t("enter-app-api-hash") }}:
      </label>
      <input
        v-model="apiHash"
        type="password"
        class="w-full rounded-lg border border-gray-400 text-gray-700 placeholder:text-gray-400 text-base py-3 focus:border-blue-500"
        id="apiHash"
        placeholder="12331231231233"
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
  name: "ApiDataForm",
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
      apiId: localStorage.getItem("apiId"),
      apiHash: localStorage.getItem("apiHash"),
    };
  },
  methods: {
    handleSubmit() {
      const payload = {
        apiId: this.apiId,
        apiHash: this.apiHash,
      };

      this.$emit("increment-step");
      this.$emit("send-api-data", payload);
    },
    handleCancel() {
      this.$emit("decrement-step");
    },
  },
};
</script>
