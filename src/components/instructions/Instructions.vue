<template>
  <div>
    <div>
      <t-button @click="toggleInstructionsVisibility()">
        {{ toggleVisibilityButtonText }}
      </t-button>
    </div>

    <t-modal v-model="isShow" class="p-2 md:p-3 xl:p-4">
      <locale-changer class="mb-2" />

      <instructions-content />
    </t-modal>
  </div>
</template>

<script>
import LocaleChanger from "@/components/locale/LocaleChanger.vue";
import InstructionsContent from "@/components/instructions/InstructionsContent.vue";

export default {
  name: "InstructionsView",
  components: {
    LocaleChanger,
    InstructionsContent,
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
