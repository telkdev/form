<template>
  <div class="about">
    <div class="container p-3">
      <h1>Please, check instructions first</h1>

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
    </div>
  </div>
</template>

<script>
import { setIsInitialized } from "@/helpers/localStorageProvider";

export default {
  mounted() {
    setIsInitialized();
  },
};
</script>
