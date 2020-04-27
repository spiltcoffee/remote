import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

let darkMode = false;
try {
  darkMode = JSON.parse(localStorage.getItem("darkMode"));
} catch {
  //ignore
}

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    dark: darkMode,
  },
});
