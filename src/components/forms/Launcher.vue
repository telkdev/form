<template>
  <div>
    <div class="launcher-status">
      <p>{{ $t("bot-will-be-started") }}</p>

      <ul>
        <li>
          {{
            connected
              ? $t("connection-established")
              : $t("connection-not-established")
          }}
        </li>
        <li>{{ launched ? $t("bot-running") : $t("bot-paused") }}</li>
      </ul>
    </div>

    <div class="btn-wrapper">
      <button @click="handleClearData" class="btn btn-secondary">
        {{ $t("btn-clear-data") }}
      </button>
      <button
        @click="handleReconnect"
        :disabled="connected"
        class="btn btn-primary"
        :class="{ disabled: connected }"
      >
        {{ $t("btn-reconnect") }}
      </button>
      <button
        @click="runReporting"
        :disabled="!connected"
        class="btn btn-primary"
        :class="{ disabled: !connected }"
      >
        {{ $t("btn-restart") }}
      </button>
      <button
        @click="stopReporting"
        :disabled="!launched"
        class="btn btn-secondary"
        :class="{ disabled: !launched }"
      >
        {{ $t("btn-stop") }}
      </button>
    </div>
  </div>
</template>

<script>
import TelegramBotMixin from "@/components/telegram/bot.vue";

export default {
  name: "LauncherView",
  components: {},
  props: {
    isFirstStep: {
      type: Boolean,
      required: true,
    },
    isLastStep: {
      type: Boolean,
      required: true,
    },
    apiId: {
      type: Number,
      required: true,
    },
    apiHash: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  mixins: [TelegramBotMixin],
  data() {
    return {
      verificationCode: null,
    };
  },
  methods: {
    handleClearData() {
      const result = prompt(this.$t("confirm-delete-data-message"));

      if (result && result === "+") {
        this.disconnect();
        this.$emit("clear-data");
      }
    },

    handleSubmit() {
      const payload = {
        verificationCode: this.verificationCode,
      };

      this.$emit("increment-step");

      this.$emit("send-verification-code-data", payload);
    },
    handleCancel() {
      this.$emit("decrement-step");
    },
  },
};
</script>

<style scoped>
.launcher-status {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-bottom: 1em;
  background: #333;
  color: rgb(8, 212, 8);
  padding: 15px;
}
</style>
