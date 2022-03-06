<template>
  <main class="flex-grow flex flex-col h-full">
    <div class="container p-4 flex-grow flex flex-col justify-between">
      
      <form-wrapper
        @send-logger-message="handleLoggerMessage"
        class="page-form-wrapper"
      />
      <div class="flex justify-between flex-wrap items-center gap-4">
        <instructions-view class="page-instructions-wrapper" />

        <info-view class="page-info-wrapper" />
      </div>
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
import InfoView from "@/components/Info.vue";
import InstructionsView from "@/components/instructions/Instructions.vue";

export default {
  name: "HomeView",
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
