<template>
  <button
    @click="handleSubmit()"
    :disabled="isDisabled"
    :class="{ disabled: isDisabled }"
    class="btn btn-secondary btn-lg"
  >
    Cancel
  </button>
</template>

<script>
export default {
  name: "SubmitButton",
  props: {
    isDisabled: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("handle-cancel");
    },
  },
};
</script>
