<template>
  <div class="flex justify-end">
    <ul class="flex flex-wrap justify-end gap-3">
      <li>
        * Privacy: All sensitive data stored on your device and <br />
        not sent to any other services!
      </li>
      <li>
         <t-button
          target="blank"
          href="https://github.com/telkdev/form"
          variant="link"
          >Github link front-end</t-button
        >
      </li>
      <li>
        <t-button
          target="blank"
          href="https://github.com/AndrewHaluza/reporter-service"
          variant="link"
          >Github link back-end</t-button
        >
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
