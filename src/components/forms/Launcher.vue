<template>
  <div>
    <div class="flex flex-col gap-3 mb-6">
      <p v-if="!launched" class="text-green-600 font-bold text-sm">
        {{ $t("bot-will-be-started") }}
      </p>

      <ul class="flex flex-col gap-3">
        <li
          class="text-sm font-bold"
          :class="[connected ? 'text-green-600 ' : 'text-red-600']"
        >
          {{
            connected
              ? $t("connection-established")
              : $t("connection-not-established")
          }}
        </li>
        <li
          class="text-sm font-bold"
          :class="[launched ? 'text-green-600' : 'text-orange-600']"
        >
          {{ launched ? $t("bot-running") : $t("bot-paused") }}
        </li>
      </ul>
    </div>
    <div>
      <div class="flex items-center flex-wrap gap-2 md:gap-3 xl:gap-8 mb-2 md:mb-3 xl:mb-8">
        <button
          v-if="false"
          @click="handleReconnect"
          :disabled="connected"
          class="btn btn-primary"
          :class="{ disabled: connected }"
        >
          {{ $t("btn-reconnect") }}
        </button>
        <button
          @click="runReporting"
          class="bg-blue-500 border-2 border-blue-500 text-sm text-white rounded-lg py-3 md:py-4 px-4 md:px-9 font-bold hover:bg-white hover:text-blue-500 cursor-pointer"
        >
          {{ launched ? $t("btn-restart") : $t("btn-start") }}
        </button>
        <button
          @click="stopReporting"
          :disabled="!launched"
          class="bg-white border-2 border-gray-200 text-sm text-gray-200 rounded-lg py-3 md:py-4 px-4 md:px-9 font-bold hover:bg-gray-200 hover:text-white cursor-pointer"
          :class="{
            'border-gray-700 text-gray-700 bg-white select-none pointer-events-none':
              !launched,
          }"
        >
          {{ $t("btn-stop") }}
        </button>
        <instructions-view />
      </div>
      <button
        @click="handleClearData"
        class="text-red-400 cursor-pointer hover:text-red-600 hover:underline"
      >
        {{ $t("btn-clear-data") }}
      </button>
    </div>
  </div>
</template>

<script>
import TelegramBotMixin from "@/components/telegram/bot.vue";
import InstructionsView from "@/components/instructions/Instructions.vue";

export default {
  name: "LauncherView",
  components: { InstructionsView },
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
      this.$dialog
        .prompt({
          title: this.$t("confirm-delete-data-title"),
          text: this.$t("confirm-delete-data-message"),
          icon: "info",
          // variant: 'my-confirm',
        })
        .then((result) => {
          if (result && result.input === "+") {
            this.disconnect();
            this.$emit("clear-data");
          }
        });
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
  margin-bottom: 2em;
  font-weight: 600;
  color: #27ae60;
}
</style>
