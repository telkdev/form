<template>
  <div class="page" id="app">
    <header class="header page-header">
      <div class="header-inner flex items-center justify-between p-4">
        <span class="text-black text-4xl">Korabel</span>
        <locale-changer />
      </div>
    </header>
    <main class="page-main">
      <div class="page-inner">
        <form-wrapper
          @send-logger-message="handleLoggerMessage"
          class="page-form-wrapper"
        />
        <instructions-view class="page-instructions-wrapper" />

        <logger-wrapper
          :loggerMessageArray="loggerMessageArray"
          class="page-logger-wrapper"
        />
      </div>
    </main>
    <footer class="footer page-footer">
      <div class="footer-inner">
        <info-view class="page-info-wrapper" />
      </div>
    </footer>
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
.page,
.page-inner {
  height: 100%;
}

body {
  margin: 0;
  background: #fafafa;
}

ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.page {
  color: #333;
  font: 12px/18px "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica,
    Verdana, sans-serif;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  flex-direction: column;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.header,
.footer {
  background-color: rgb(27, 139, 70);
}

.header-inner,
.footer-inner {
  max-width: 1500px;
  margin: 0 auto;
  width: 100%;
  padding: 15px;
}

.page-main {
  flex-grow: 1;
}

@media (max-width: 1200px) {
}

.page-info-wrapper {
}

.page-instructions-wrapper {
  padding: 15px;
}

.page-form-wrapper {
  padding: 15px;
}

.page-logger-wrapper {
  padding: 15px;
  height: 330px;
  overflow-y: auto;
  overflow-x: hidden;
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
