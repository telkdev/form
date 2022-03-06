<template>
  <div>
    <div>
      <t-button @click="toggleInstructionsVisibility()">
        {{ toggleVisibilityButtonText }}
      </t-button>
    </div>

    <t-modal v-model="isShow">
      <locale-changer />
      <h2>{{ $t("instructions-title") }}</h2>
      <h3>
        {{ $t("instructions-description") }}
      </h3>

      <ul>
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

      <p>
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