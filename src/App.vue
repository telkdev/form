<template>
  <div id="app" class="flex flex-col">
    <header class="bg-blue-500">
      <div
        class="container p-4 md:py-5 flex flex-wrap items-center justify-between gap-4"
      >
        <div class="">
          <span class="uppercase text-white text-4xl font-bold">Korabel</span>
        </div>
        <div class="flex items-center gap-3 md:gap-7 xl:gap-10 flex-wrap">
          <nav class="flex items-center gap-3 md:gap-7 xl:gap-10">
            <router-link
              to="/"
              class="text-sm uppercase text-white hover:text-blue-300 font-bold"
              >{{ $t("main-page") }}</router-link
            >
            <router-link
              to="/about"
              class="text-sm uppercase text-white hover:text-blue-300 font-bold"
              >{{ $t("about-page") }}</router-link
            >
          </nav>
          <locale-changer :title-class="'text-white'"/>
        </div>
      </div>
    </header>

    <router-view />
  </div>
</template>

<script>
import LocaleChanger from "@/components/locale/LocaleChanger.vue";

export default {
  name: "App",
  components: {
    LocaleChanger,
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}

.page-logger-wrapper::-webkit-scrollbar {
  width: 10px;
  background-color: auto;
  background-color: rgb(6, 161, 6);
}

.page-logger-wrapper::-webkit-scrollbar-thumb {
  border-radius: 10px;
  border: 2px auto;
  border: 2px solid #333;
  background: #333;
}
</style>
