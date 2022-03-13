<template>
  <div class="flex items-center flex-wrap justify-between gap-6">
    <div class="flex items-center gap-6">
      <cancel-button
        @handle-cancel="handleCancel()"
        :isDisabled="isFirstStep"
      />

      <submit-button @handle-submit="handleSubmit()" :isDisabled="isInvalid" />
    </div>
    <instructions-view />
  </div>
</template>

<script>
import SubmitButton from "@/components/buttons/SubmitButton.vue";
import CancelButton from "@/components/buttons/CancelButton.vue";
import InstructionsView from "@/components/instructions/Instructions.vue";

export default {
  name: "ButtonsWrapper",
  components: {
    SubmitButton,
    CancelButton,
    InstructionsView,
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
