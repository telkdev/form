<template>
  <div class="page" id="app">
    <div class="page-inner">
      <form-wrapper
        @send-logger-message="handleLoggerMessage"
        class="page-form-wrapper"
      />
      <instructions-view class="page-instructions-wrapper" />
      <info-view class="page-info-wrapper" />
      <logger-wrapper
        :loggerMessageArray="loggerMessageArray"
        class="page-logger-wrapper"
      />
    </div>
  </div>
</template>

<script>
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
  box-sizing: border-box;
}

.page-inner {
  display: grid;
  grid-template-areas:
    "form instructions"
    "info info"
    "logger logger";
  grid-template-rows: 1fr auto auto;
  grid-template-columns: 600px 1fr;
}

.page-info-wrapper {
  grid-area: info;
  padding: 15px;
  background-color: rgb(22, 168, 78);
  color: rgb(0, 0, 0);
}

.page-instructions-wrapper {
  grid-area: instructions;
  padding: 15px;
}

.page-form-wrapper {
  grid-area: form;
  padding: 15px;
}

.page-logger-wrapper {
  grid-area: logger;
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
