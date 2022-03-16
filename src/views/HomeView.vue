<template>
  <main class="flex-grow flex flex-col h-full">
    <div
      class="container p-4 md:p-6 flex-grow flex flex-col justify-between gap-4"
    >
      <div class="flex flex-col md:flex-row gap-4 xl:gap-36 justify-between">
        <form-wrapper
          @send-logger-message="handleLoggerMessage"
          class="flex-grow"
        />
        <stats @send-logger-message="handleLoggerMessage" class="md:pl-4" />
      </div>
      <info-view />
    </div>

    <logger-wrapper
      :loggerMessageArray="loggerMessageArray"
      class="page-logger-wrapper overflow-y-auto overflow-x-hidden h-72 p-4"
    />
  </main>
</template>
<script>
import FormWrapper from "@/components/forms/FormWrapper.vue";
import LoggerWrapper from "@/components/logger/LoggerWrapper.vue";
import Stats from "@/components/stats/Stats.vue";
import InfoView from "@/components/Info.vue";

export default {
  name: "HomeView",
  components: {
    InfoView,
    FormWrapper,
    LoggerWrapper,
    Stats,
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
