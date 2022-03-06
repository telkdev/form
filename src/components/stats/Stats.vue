<template>
  <div>
    <h3>{{ $t("stats-requests") }}:</h3>
    <span> {{ $t("stats-general") }} - {{ stats.general }} </span>
    <span> {{ $t("stats-personal") }} - {{ stats.personal }} </span>
  </div>
</template>

<script>
import { getReportStats } from "@/api/endpoints";

export default {
  name: "StatsView",
  data() {
    return {
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
