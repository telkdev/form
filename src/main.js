import Vue from "vue";
import App from "./App.vue";

import VueTailwind from "vue-tailwind";

import VueTailwindSettings from "./vue-tailwind/settings.js";

Vue.use(VueTailwind, VueTailwindSettings);

import "./index.css";

// TODO: remove validator logic to external file
import { isValidPhoneNumber } from "libphonenumber-js";

import { ValidationProvider, extend } from "vee-validate";
import { required, numeric, min, max } from "vee-validate/dist/rules";
import i18n from "./i18n";
import router from './router'

extend("phone", {
  getMessage: (field) => "The " + field + " is invalid phone number.",
  validate: (value) => isValidPhoneNumber(value),
  message: "It is invalid phone number",
});

extend("required", {
  ...required,
  message: "This field is required",
});

extend("numeric", numeric);

extend("min", min);

extend("max", max);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  i18n,
  router,

  components: {
    ValidationProvider,
  }
}).$mount("#app");
