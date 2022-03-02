<template>
  <ValidationObserver
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
      key="apiId"
      name="api Id"
      v-slot="{ errors }"
      rules="required"
    >
      <label for="apiId">App api_id: </label>
      <input
        v-model="apiId"
        type="text"
        class="form-control input-large"
        id="apiId"
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
      key="apiHash"
      name="apiHash"
      v-slot="{ errors }"
      rules="required"
    >
      <label for="apiHash">App api_hash: </label>
      <input
        v-model="apiHash"
        type="text"
        class="form-control input-large"
        id="apiHash"
        placeholder="12331231231233"
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
  name: "ApiDataForm",
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
      apiId: null,
      apiHash: null,
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
