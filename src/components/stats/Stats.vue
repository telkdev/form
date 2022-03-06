<template>
  <div>
    <h3>{{ $t("stats-requests") }}:</h3>
    <span> {{ $t("stats-general") }} - {{ stats.general }} </span>
    <span v-if="stats.personal">
      {{ $t("stats-personal") }} - {{ stats.personal }}
    </span>
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
    handleLoggerMessage(message, type) {
      this.$emit("send-logger-message", {
        message,
        type,
        date: new Date(),
      });
    },

    async apiRequest(req, options) {
      try {
        const res = await req(options);

        return res;
      } catch (error) {
        if (error.status === 401) {
          this.handleLoggerMessage(this.$t("error-unauthorized"), "error");
        } else {
          this.handleLoggerMessage(this.$t("error-with-channels-api"), "error");
        }

        throw error;
      }
    },

    async getStats() {
      try {
        const statsResponse = await this.apiRequest(getReportStats);
        const { data } = statsResponse;

        this.stats.general = data.general;

        if (data.personal) {
          this.stats.personal = data.personal;
        }
      } catch (error) {
        // nothing
      }
    },
  },
};
</script>
