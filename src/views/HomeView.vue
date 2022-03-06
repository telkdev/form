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

    <h3>{{ $t("stats-requests") }}:</h3>
    <span> {{ $t("stats-general") }} - {{ stats.general }} </span>
    <span> {{ $t("stats-personal") }} - {{ stats.personal }} </span>
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
import InstructionsView from "@/components/Instructions.vue";
import { getReportStats } from "@/api/endpoints";

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
      stats: { general: 0, personal: 0 },
    };
  },
  async mounted() {
    setInterval(this.getStats(), 30000);
  },
  methods: {
    handleLoggerMessage({ message, type, date }) {
      if (type === "error") {
        console.error(message);
      }

      this.loggerMessageArray.unshift({ message, type, date });
    },

    async apiRequest(req, options) {
      try {
        const res = await req(options);

        return res;
      } catch (error) {
        if (error.status === 401) {
          this.sendMessage(this.$t("error-unauthorized"), "error");
          // localStorage.removeItem("accessToken");
          // this.disconnect();
          // return this.handleCancel();
        }

        // this.sendMessage(this.$t("error-with-channels-api"), "error");
        // this.disconnect();

        throw error;
      }
    },

    async getStats() {
      try {
        const statsResponse = await this.apiRequest(getReportStats);
        const { data } = statsResponse;

        this.stats = data;
      } catch (error) {
        // nothing
      }
    },
  },
};
</script>
