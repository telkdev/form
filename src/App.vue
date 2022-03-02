<template>
  <div id="app">
    <form-wrapper />
  </div>
</template>

<script>
import FormWrapper from "@/components/forms/FormWrapper.vue";

export default {
  name: "App",
  components: {
    FormWrapper,
  },
};
</script>

<style>
body {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: #333;
  font: 12px/18px "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica,
    Verdana, sans-serif;
  font-size: 14px;
  line-height: 20px;
  box-sizing: border-box;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  width: 970px;
  max-width: 570px;
  padding-top: 100px;
  padding-bottom: 100px;
}

form {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: #333;
  font: 12px/18px "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica,
    Verdana, sans-serif;
  font-size: 14px;
  line-height: 20px;
  box-sizing: border-box;
}

.form-field {
  margin-top: 15px;
  margin-bottom: 15px;
}

.form-actions {
  display: flex;
  gap: 1em;
}

label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
  font: inherit;
  margin: 0;
  font-family: inherit;
  display: block;
  width: 100%;
  padding: 6px 12px;
  font-size: 16px;
  line-height: 1.42857143;
  color: #555555;
  background-color: #ffffff;
  background-image: none;
  border: 1px solid #cccccc;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  border-radius: 0;
  box-shadow: none;
}

.error {
  font-size: 14px;
  color: rgb(167, 10, 10);
}

.help-bot {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font: 12px/18px "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica,
    Verdana, sans-serif;
  font-size: 14px;
  line-height: 20px;
  box-sizing: border-box;
  margin: 0 0 8.5px;
  display: block;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #737373;
}

a {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font: 12px/18px "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica,
    Verdana, sans-serif;
  font-size: 14px;
  line-height: 20px;
  box-sizing: border-box;
  background: transparent;
  text-decoration: none;
  color: #0088cc;
}

.btn {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
  font: inherit;
  margin: 0;
  overflow: visible;
  text-transform: none;
  -webkit-appearance: button;
  font-family: inherit;
  display: inline-block;
  padding: 10px 16px;
  box-shadow: none;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.428571429;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  background-image: none;
  border: 0;
  border-radius: 4px;
  user-select: none;
  text-shadow: none;
}

.btn-primary {
  color: #fff;
  background-color: #428bca;
  border-color: #357ebd;
}

.btn-secondary {
  color: #fff;
  background-color: #a00028;
  border-color: rgb(90, 8, 12);
}

.disabled {
  user-select: none;
  pointer-events: none;
  background: grey;
  cursor: not-allowed;
}
</style>
