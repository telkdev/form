<template>
  <div class="about">
    <div class="container p-3 md:p-5 xl:py-7 prose prose-zin lg:prose-xl">
      <h1 class="">{{ $t("about-page") }}</h1>
      <h2 class="">{{ $t("about-what-for") }}</h2>
      <div
        v-html="
          $t('about-description', {
            linkClass: 'text-blue-600 underline hover:text-red-600',
          })
        "
      ></div>

      <h2 class="">
        {{ $t("check-instructions-first") }}
      </h2>
      <instructions-content />
      <br />
      <center>
        <router-link to="/" class="btn btn-primary btn-lg text-2xl">{{
          $t("start-init-bot")
        }}</router-link>
      </center>
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

// TODO: FIX THIS;
<style>
.prose {
  max-width: 70vw !important;
}

@media (max-width: 600px) {
  .prose {
    max-width: 100% !important;
  }
}
</style>
