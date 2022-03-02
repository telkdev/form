<template>
  <button
    @click="handleSubmit()"
    :disabled="isDisabled"
    :class="{ disabled: isDisabled }"
    class="btn btn-primary btn-lg"
  >
    Submit
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
      this.$emit("handle-submit");
    },
  },
};
</script>
