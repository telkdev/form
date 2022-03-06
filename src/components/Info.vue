<template>
  <div class="flex justify-end">
    <ul class="flex flex-wrap justify-end gap-3">
      <li v-html="$t('privacy-note-1')"></li>
      <li>
        <t-button
          target="blank"
          href="https://github.com/telkdev/form"
          variant="link"
          class="flex items-center gap-1"
        >
          <img
            :src="require('@/assets/github.svg')"
            alt=""
            aria-hidden="true"
          />
          {{ $t("front-end") }}
        </t-button>
      </li>
      <li>
        <t-button
          target="blank"
          href="https://github.com/AndrewHaluza/reporter-service"
          variant="link"
          class="flex items-center gap-1"
        >
          <img
            :src="require('@/assets/github.svg')"
            alt=""
            aria-hidden="true"
          />
          {{ $t("back-end") }}
        </t-button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "InfoView",
  props: {},
};
</script>

<style scoped>
ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

a {
  text-decoration: none;
}
</style>
