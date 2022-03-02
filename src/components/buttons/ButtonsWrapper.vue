<template>
  <div class="form-actions">
    <cancel-button
      @handle-cancel="handleCancel()"
      :isDisabled="isFirstStep"
    />

    <submit-button
      @handle-submit="handleSubmit()"
      :isDisabled="isInvalid"
    />
  </div>
</template>

<script>
import SubmitButton from "@/components/buttons/SubmitButton.vue";
import CancelButton from "@/components/buttons/CancelButton.vue";

export default {
  name: "ButtonsWrapper",
  components: {
    SubmitButton,
    CancelButton,
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
    isInvalid: {
      type: Boolean,
      required: true,
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
      if (this.isLastStep) return;
      this.$emit("handle-submit");
    },
    handleCancel() {
      if (this.isFirstStep) return;
      this.$emit("handle-cancel");
    },
  },
};
</script>
