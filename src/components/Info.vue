<template>
  <div class="flex justify-between flex-wrap items-center gap-4">
    <p v-html="$t('privacy-note-1')" class="text-gray-700 font-medium"></p>
    <ul class="flex flex-wrap justify-end gap-3">
      
      <li>
        <t-button
          target="blank"
          href="https://github.com/telkdev/form"
          variant="link"
          class="flex items-center gap-1 text-blue-500 hover:text-blue-800 hover:underline"
        >
          <img
            :src="require('@/assets/github.svg')"
            alt="github icon"
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
          class="flex items-center gap-1 text-blue-500 hover:text-blue-800 hover:underline"
        >
          <img
            :src="require('@/assets/github.svg')"
            alt="github icon"
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
