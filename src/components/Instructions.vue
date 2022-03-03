<template>
  <div>
    <h2>Інструкції:</h2>
    <h3>
      Цей додаток створений для зупинення російської пропаганди, яка шириться в
      Телеграм-каналах. Дозволяє в автоматичному режимі відсилати скарги на
      канали.
    </h3>
    <ul>
      <li>
        1. Переходимо за посиланням
        <a target="blank" href="https://my.telegram.org/"
          >https://my.telegram.org/</a
        >
      </li>
      <li>2. Вводимо свій номер телефону та код авторизації</li>
      <li>
        3. Переходимо у вкладку
        <a target="blank" href="https://my.telegram.org/apps"
          >API development tools
        </a>
      </li>
      <li>4. Пишемо любий `App title` та `Short name` та підтверджуємо</li>
      <li>
        5. Копіюємо `App api_id` та `App api_hash`, їх необхідно буде ввести в
        наступних кроках в цьому додатку
      </li>
      <li>
        6.
        <a @click="handleSubmit">Переходимо на наступний крок цього додатку</a>
        і вводимо данні в поля додатку
      </li>
    </ul>

    <p>
      * ПЕРЕДАВАТИ КОМУСЬ `App api_id` та `Short name` НІ В ЯКОМУ РАЗІ НЕ
      МОЖНА!!! Вони дають можливіть контролювати вашу персональну сторінку у
      Телеграмі.
    </p>

    <h2>Instructions:</h2>
    <h3>
      This application was created to stop Russian propaganda, which is
      spreading in Telegram channels. Allows you to automatically send reports
      to channels.
    </h3>

    <ul>
      <li>
        1. Go to
        <a target="blank" href="https://my.telegram.org/"
          >https://my.telegram.org/</a
        >
      </li>
      <li>2. Pass phone number and authorization code</li>
      <li>
        3. Go to
        <a target="blank" href="https://my.telegram.org/apps"
          >API development tools
        </a>
      </li>
      <li>4. Enter `App title` and `Short name` then submit</li>
      <li>
        5. Copy `App api_id` and `App api_hash`, they will needed for start
        reporting process
      </li>
      <li>
        6.
        <a @click="handleSubmit">move forward to the next app step</a>, pass
        data into app inputs
      </li>
    </ul>

    <p>
      * Don't share `App api_id` and `Short name` to any!!! They can give access
      to your personal Telegram account
    </p>

    <buttons-wrapper
      :isFirstStep="isFirstStep"
      :isLastStep="isLastStep"
      :isInvalid="false"
      @handle-submit="handleSubmit()"
      @handle-cancel="handleCancel()"
    />
  </div>
</template>

<script>
import ButtonsWrapper from "@/components/buttons/ButtonsWrapper.vue";

export default {
  name: "InstructionsView",
  components: {
    ButtonsWrapper,
  },
  props: {
    isFirstStep: {
      type: Boolean,
      required: true,
    },
    isLastStep: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("increment-step");
    },
    handleCancel() {
      this.$emit("decrement-step");
    },
  },
};
</script>
