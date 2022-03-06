<template>
  <div class="flex justify-end">
    <ul class="flex flex-wrap justify-end gap-3">
      <li>
        * Privacy: All sensitive data stored on your device and <br /> not sent to any
        other services!
      </li>
      <li>
        <a
          target="blank"
          href="https://github.com/telkdev/form"
          class="btn btn-primary"
          >Github link front-end</a
        >
      </li>
      <li>
        <a
          target="blank"
          href="https://github.com/AndrewHaluza/reporter-service"
          class="btn btn-primary"
          >Github link back-end</a
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
