<template>
  <div class="about">
    <div class="container p-3">
      <h1>{{ $t("about-page") }}</h1>
      <h2>{{ $t("about-what-for") }}</h2>
      <div v-html="$t('about-description')"></div>

      <h2>{{ $t("check-instructions-first") }}</h2>
      <instructions-content />
    </div>
  </div>
</template>

<script>
import { setIsInitialized } from "@/helpers/localStorageProvider";
import InstructionsContent from "@/components/instructions/InstructionsContent.vue";

export default {
  components: {
    InstructionsContent,
  },
  mounted() {
    setIsInitialized();
  },
};
</script>
