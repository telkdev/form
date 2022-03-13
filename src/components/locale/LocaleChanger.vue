<template>
  <div class="flex items-center gap-2">
    <span class="text-sm uppercase font-bold" :class="titleClass">{{
      $t("select-language-title")
    }}</span>
    <select v-model="$i18n.locale" @change="saveDefaultLocale($event)">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
    <svg class="w-5 h-5">
      <g clip-path="url(#a)">
        <path
          d="M13.145 6.438C12.578 2.949 11.242.5 9.688.5 8.133.5 6.796 2.95 6.23 6.438h6.915Zm-7.207 3.75c0 .867.046 1.699.128 2.5h7.239a24.493 24.493 0 0 0 0-5H6.066c-.082.8-.128 1.632-.128 2.5Zm12.683-3.75A9.708 9.708 0 0 0 12.45.905c.953 1.32 1.61 3.309 1.953 5.532h4.22ZM6.921.905A9.701 9.701 0 0 0 .755 6.438h4.219c.34-2.223.996-4.211 1.949-5.532ZM19.04 7.688h-4.48c.082.82.129 1.66.129 2.5 0 .84-.047 1.68-.13 2.5h4.477c.215-.801.336-1.633.336-2.5 0-.868-.121-1.7-.332-2.5Zm-14.352 2.5c0-.84.047-1.68.13-2.5H.335C.125 8.488 0 9.32 0 10.188c0 .867.125 1.699.336 2.5h4.477c-.079-.82-.125-1.66-.125-2.5Zm1.543 3.75c.567 3.488 1.903 5.937 3.457 5.937 1.555 0 2.891-2.45 3.458-5.938H6.23Zm6.223 5.53a9.718 9.718 0 0 0 6.172-5.53h-4.219c-.344 2.222-1 4.21-1.953 5.53Zm-11.7-5.53a9.708 9.708 0 0 0 6.173 5.53c-.953-1.32-1.61-3.308-1.953-5.53H.753Z"
          fill="#fff"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" transform="translate(0 .5)" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {
  name: "LocaleChanger",
  props: {
    titleClass: {
      type: String,
      required: true,
    }
  },
  data() {
    return { langs: ["ua", "en"] };
  },
  methods: {
    saveDefaultLocale(event) {
      const localeCode = event.target.value;

      localStorage.setItem("lang", localeCode);
    },
  },
};
</script>
