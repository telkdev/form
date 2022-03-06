<template>
  <div>
    <div class="instructions-header">
      <nav>
        <ul class="tabs">
          <li v-for="(navItem, index) of navArray" :key="index">
            <a
              @click="setActiveTab(navItem.activeTabIndex)"
              :class="{ active: activeTab === navItem.activeTabIndex }"
            >
              {{ navItem.title }}
            </a>
          </li>
        </ul>
      </nav>
      <button @click="toggleInstructionsVisibility()" class="btn btn-primary">
        {{ toggleVisibilityButtonText }}
      </button>
    </div>

    <div v-if="isShow" class="content hidden">
      <div v-if="activeTab === 0" class="tabcontent">
        <h2>Instructions:</h2>
        <h3>
          This application was created to stop Russian propaganda, which is
          spreading in Telegram channels. Allows you to automatically send
          reports to channels.
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
          <li>6. pass data into "Enter api data" form</li>
        </ul>

        <p>
          * Don't share `App api_id` and `Short name` to any!!! They can give
          access to your personal Telegram account
        </p>
      </div>
      <div v-if="activeTab === 1" class="tabcontent">
        <h2>Інструкції:</h2>
        <h3>
          Цей додаток створений для зупинення російської пропаганди, яка
          шириться в Телеграм-каналах. Дозволяє в автоматичному режимі відсилати
          скарги на канали.
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
            5. Копіюємо `App api_id` та `App api_hash`, їх необхідно буде ввести
            в наступних кроках в цьому додатку
          </li>
          <li>6. Водимо данні в поля форми "Enter api data"</li>
        </ul>

        <p>
          * ПЕРЕДАВАТИ КОМУСЬ `App api_id` та `Short name` НІ В ЯКОМУ РАЗІ НЕ
          МОЖНА!!! Вони дають можливіть контролювати вашу персональну сторінку у
          Телеграмі.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InstructionsView",
  data() {
    return {
      activeTab: 0,
      isShow: true,
      navArray: [
        {
          title: "Instructions in eng",
          activeTabIndex: 0,
        },
        {
          title: "Інструкції укр",
          activeTabIndex: 1,
        },
      ],
    };
  },
  methods: {
    setActiveTab(activeTabIndex) {
      this.activeTab = activeTabIndex;
    },
    toggleInstructionsVisibility() {
      this.isShow = !this.isShow;
    },
  },
  computed: {
    toggleVisibilityButtonText() {
      if (this.isShow) {
        return this.activeTab === 0 ? "Hide" : "Сховати";
      } else {
        return this.activeTab === 1 ?  "Розгорнути" : "Show" ;
      }
    },
  },
};
</script>

<style scoped>
.instructions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* Style the tabs */
.tabs {
  display: flex;
  overflow: hidden;
  margin-left: 20px;
  margin-bottom: -2px;
}

.tabs ul {
  list-style-type: none;
  margin-left: 20px;
}

.tabs a {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  border: 1px solid #ccc;
  border-right: none;
  background-color: #f1f1f1;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}
.tabs a:last-child {
  border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
  background-color: #aaa;
  color: #fff;
}

/* Styling for active tab */
.tabs a.active {
  background-color: #fff;
  color: #484848;
  border-bottom: 2px solid #fff;
  cursor: default;
}

/* Style the tab content */
.tabcontent {
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
   background-color: #fff;
  box-shadow: 3px 3px 6px #e1e1e1;
}
</style>
