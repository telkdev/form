<template>
  <div>
    <h2 class="">{{ $t("instructions-title") }}</h2>
    <h3 class="">
      {{ $t("instructions-description") }}
    </h3>

    <ol class=" mb-3">
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
    </ol>

    <p class="">
      {{ $t("instructions-warning") }}
    </p>
  </div>
</template>
<script>
export default {
  name: "InstructionsContent",
};
</script>
