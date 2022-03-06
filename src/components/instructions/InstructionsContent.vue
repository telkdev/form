<template>
  <div>
    <h2 class="text-3xl font-bold mb-2">{{ $t("instructions-title") }}</h2>
    <h3 class="text-xl mb-3">
      {{ $t("instructions-description") }}
    </h3>

    <ul class="space-y-2 text-lg mb-3">
      <li
        v-html="
          $t('instructions-step-1', {
            class: 'text-blue-600 underline hover:text-red-600',
          })
        "
      ></li>
      <li>{{ $t("instructions-step-2") }}</li>
      <li
        v-html="
          $t('instructions-step-3', {
            class: 'text-blue-600 underline hover:text-red-600',
          })
        "
      ></li>
      <li>{{ $t("instructions-step-4") }}</li>
      <li>{{ $t("instructions-step-5") }}</li>
      <li>{{ $t("instructions-step-6") }}</li>
    </ul>

    <p class="font-bold italic">
      {{ $t("instructions-warning") }}
    </p>
  </div>
</template>
<script>
export default {
  name: "InstructionsContent",
};
</script>
