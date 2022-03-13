<template>
  <button
    @click="handleSubmit()"
    :disabled="isDisabled"
    :class="{ 'border-gray-700 text-gray-700 bg-white select-none pointer-events-none': isDisabled }"
    class="bg-blue-500 border-2 border-blue-500 text-sm text-white rounded-lg py-3 md:py-4 px-4 md:px-9 font-bold hover:bg-white hover:text-blue-500 cursor-pointer"
  >
    {{ $t("btn-submit") }}
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
