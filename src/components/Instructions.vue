<template>
  <div>
    <div>
      <t-button @click="toggleInstructionsVisibility()">
        {{ toggleVisibilityButtonText }}
      </t-button>
    </div>

    <t-modal v-model="isShow" class="p-2 md:p-3 xl:p-4">
      <locale-changer class="mb-2" />
      <h2 class="text-3xl font-bold mb-2">{{ $t("instructions-title") }}</h2>
      <h3 class="text-xl mb-3">
        {{ $t("instructions-description") }}
      </h3>

      <ul class="space-y-2 text-lg mb-3">
        <li>
          1. {{ $t("instructions-step-1") }}
          <a target="blank" href="https://my.telegram.org/"
            >https://my.telegram.org/</a
          >
        </li>
        <li>2. {{ $t("instructions-step-2") }}</li>
        <li>
          3. {{ $t("instructions-step-3") }}
          <a target="blank" href="https://my.telegram.org/apps"
            >API development tools
          </a>
        </li>
        <li>4. {{ $t("instructions-step-4") }}</li>
        <li>5. {{ $t("instructions-step-5") }}</li>
        <li>6. {{ $t("instructions-step-6") }}</li>
      </ul>

      <p class="font-bold italic">
        {{ $t("instructions-warning") }}
      </p>
    </t-modal>
  </div>
</template>

<script>
import LocaleChanger from "@/components/locale/LocaleChanger.vue";

export default {
  name: "InstructionsView",
  components: {
    LocaleChanger,
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    toggleInstructionsVisibility() {
      this.isShow = !this.isShow;
    },
  },
  computed: {
    toggleVisibilityButtonText() {
      if (this.isShow) {
        return this.$t("instructions-hide");
      } else {
        return this.$t("instructions-show");
      }
    },
  },
};
</script>
