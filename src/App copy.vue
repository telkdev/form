<template>
  <div class="flex flex-col" id="app">
    <header class="bg-gray-500">
      <div class="container p-4 flex items-center justify-between gap-4">
        <div class="">
          <span class="text-black text-4xl">Korabel</span>
        </div>
        <div class="flex flex-col items-end gap-4">
          <locale-changer />
        </div>
      </div>
    </header>

    <main class="flex-grow">
      <div class="container p-4">
        <div class="flex justify-between flex-wrap items-center">
          <instructions-view class="page-instructions-wrapper" />

          <info-view class="page-info-wrapper" />
        </div>
        <form-wrapper
          @send-logger-message="handleLoggerMessage"
          class="page-form-wrapper"
        />
      </div>
    </main>
    <logger-wrapper
      :loggerMessageArray="loggerMessageArray"
      class="page-logger-wrapper overflow-y-auto overflow-x-hidden h-72 p-4"
    />
  </div>
</template>

<script>
import LocaleChanger from "@/components/locale/LocaleChanger.vue";
import FormWrapper from "@/components/forms/FormWrapper.vue";
import LoggerWrapper from "@/components/logger/LoggerWrapper.vue";
import InfoView from "@/components/Info.vue";
import InstructionsView from "@/components/Instructions.vue";

export default {
  name: "App",
  components: {
    InfoView,
    FormWrapper,
    LoggerWrapper,
    InstructionsView,
    LocaleChanger,
  },
  data() {
    return {
      loggerMessageArray: [],
    };
  },
  methods: {
    handleLoggerMessage({ message, type, date }) {
      if (type === "error") {
        console.error(message);
      }

      this.loggerMessageArray.unshift({ message, type, date });
    },
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
