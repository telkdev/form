<template>
  <div class="logger-wrapper">
    <h2 class="logger-main_title">Message Logger:</h2>
    <ul
      v-if="loggerMessageArray && loggerMessageArray.length"
      class="logger-list"
    >
      <li
        v-for="(log, index) of loggerMessageArray"
        :key="index"
        class="logger-item"
        :class="{
          'logger-item--error': log.type === 'error',
          'logger-item--warn': log.type === 'warn',
        }"
      >
        <span class="logger-date">
          {{ log.date }}
        </span>
        <span v-if="false" class="logger-type"> [{{ log.type }}] </span>
        <p class="logger-message">
          {{ log.message }}
        </p>
      </li>
    </ul>
    <h3 v-else class="logger-description">
      Here will be messages after bot initialization...
    </h3>
  </div>
</template>
<script>
export default {
  name: "LoggerWrapper",
  props: {
    loggerMessageArray: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.logger-wrapper {
  background: #333;
}

.logger-main_title {
  color: rgb(8, 212, 8);
  font-size: 20px;
  margin: 0;
  margin-bottom: 15px;
}
.logger-description {
  color: rgb(8, 212, 8);
  font-size: 18px;
  font-weight: 400;
}

.logger-item {
  display: flex;
  color: rgb(8, 212, 8);

  align-items: flex-start;
  gap: 12px;
}

.logger-item + .logger-item {
  margin-top: 15px;
}

.logger-item--warn {
  color: #ffa500;
}

.logger-item--error {
  color: rgb(197, 9, 9);
}

.logger-message {
  margin: 0;
}
</style>
