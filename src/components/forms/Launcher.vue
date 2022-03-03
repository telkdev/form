<template>
  <div>
    <p>The bot will be started in a moment</p>

    <ul>
      <li>
        {{
          connected ? "Connection established " : "Connection not established"
        }}
      </li>
      <li>{{ launched ? "Bot is running" : "Bot is paused" }}</li>
    </ul>

    <button @click="handleReconnect" :disabled="connected">Reconnect</button>
    <button @click="runReporting" :disabled="!connected">Restart</button>
    <button @click="stopReporting" :disabled="!launched">Stop</button>
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
