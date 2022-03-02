import Vue from "vue";
import App from "./App.vue";

import { ValidationProvider, extend } from "vee-validate";
import { required, numeric, min, max } from "vee-validate/dist/rules";

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
  components: {
    ValidationProvider,
  },
}).$mount("#app");
