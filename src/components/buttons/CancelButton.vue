<template>
  <button
    @click="handleSubmit()"
    :disabled="isDisabled"
    :class="{ 'border-gray-700 text-gray-700 bg-white select-none pointer-events-none': isDisabled }"
    class=" bg-white border-2 border-gray-200 text-sm text-gray-200 rounded-lg py-3 md:py-4 px-4 md:px-9 font-bold hover:bg-gray-200 hover:text-white cursor-pointer"
  >
    {{ $t("btn-cancel") }}
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
