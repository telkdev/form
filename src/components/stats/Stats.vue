<template>
  <div class="py-10 pr-3 xl:pr-10 xl:py-20 flex flex-col gap-2 shrink-0">
    <h3 class="text-lg md:text-2xl font-medium text-gray-700 uppercase">
      {{ $t("stats-requests") }}:
    </h3>
    <div class="flex flex-col gap-1">
      <p class="font-medium text-gray-700 text-base md:text-lg uppercase">
        {{ $t("stats-general") }} - <span class="text-lg md:text-2xl font-bold text-blue-500">{{ stats.general }}</span>
      </p>
      <p
        v-if="stats.personal"
        class="font-medium text-gray-700 text-base md:text-lg uppercase"
      >
        {{ $t("stats-personal") }} - <span class="text-lg md:text-2xl font-bold text-blue-500">{{ stats.personal }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { getReportStats } from "@/api/endpoints";

export default {
  name: "StatsView",
  data() {
    return {
      stats: { general: 0, personal: 0 },
      interval: null,
    };
  },
  async mounted() {
    this.getStats();

    this.interval = setInterval(() => {
      this.getStats();
    }, 30000);
  },
  
  beforeDestroy() {
    window.clearInterval(this.interval);
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
