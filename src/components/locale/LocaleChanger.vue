<template>
  <div class="locale_changer flex items-center gap-2">
    <span class="locale_changer-title">{{ $t("select-language-title") }}</span>
    <select v-model="$i18n.locale" @change="saveDefaultLocale($event)">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "LocaleChanger",
  data() {
    return { langs: ["uk", "en"] };
  },
  methods: {
    saveDefaultLocale(event) {
      const localeCode = event.target.value;

      localStorage.setItem('lang',localeCode)
    },
  },
};
</script>
