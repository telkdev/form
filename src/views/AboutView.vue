<template>
  <div class="about">
    <div class="container p-3">
      <h1>{{ $t("check-instructions-first") }}</h1>

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
