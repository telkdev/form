<template>
  <div id="app" class="flex flex-col">
    <header class="bg-gray-500">
      <div class="container p-4 flex items-center justify-between gap-4">
        <div class="">
          <span class="text-black text-4xl">Korabel</span>
        </div>
        <div class="flex items-center gap-4 md:gap-7 flex-wrap">
          <nav class="flex items-center gap-3">
            <router-link to="/" class="text-2xl hover:text-green-600">{{
              $t("main-page")
            }}</router-link>
            <router-link to="/about" class="text-2xl hover:text-green-600">{{
              $t("about-page")
            }}</router-link>
          </nav>
          <locale-changer />
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
