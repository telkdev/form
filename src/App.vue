<template>
  <div class="page" id="app">
    <div class="page-inner">
      <form-wrapper
        @send-logger-message="handleLoggerMessage"
        class="page-form-wrapper"
      />
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

export default {
  name: "App",
  components: {
    FormWrapper,
    LoggerWrapper,
  },
  data() {
    return {
      loggerMessageArray: [],
    };
  },
  methods: {
    handleLoggerMessage({ message, type, date }) {
      this.loggerMessageArray.push({ message, type, date });
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
  grid-template-rows: 1fr auto;
}

.page-form-wrapper {
  max-width: 970px;
  width: 100%;
  margin: 0 auto;
  flex-grow: 1;
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
