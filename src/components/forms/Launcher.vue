<template>
  <div>
    <div class="launcher-status">
      <p>The bot will be started in a moment</p>

      <ul>
        <li>
          {{
            connected ? "Connection established " : "Connection not established"
          }}
        </li>
        <li>{{ launched ? "Bot is running" : "Bot is paused" }}</li>
      </ul>
    </div>

    <div class="btn-wrapper">
      <button @click="handleClearData" class="btn btn-secondary">
        Clear all data
      </button>
      <button
        @click="handleReconnect"
        :disabled="connected"
        class="btn btn-primary"
        :class="{ disabled: connected }"
      >
        Reconnect
      </button>
      <button
        @click="runReporting"
        :disabled="!connected"
        class="btn btn-primary"
        :class="{ disabled: !connected }"
      >
        Restart
      </button>
      <button
        @click="stopReporting"
        :disabled="!launched"
        class="btn btn-secondary"
        :class="{ disabled: !launched }"
      >
        Stop
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
      const result = prompt(
        "This action will remove all data in the local storage. You will need to pass all steps again to able launch service again. Do you confirm your decision to remove data? Write `+` (plus sign) to confirm."
      );

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
