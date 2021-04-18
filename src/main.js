import { loadEnv } from "./env/index.js";
import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify.js";

Vue.config.productionTip = false;

(async function () {
  const env = await loadEnv();

  new Vue({
    vuetify,
    components: {
      App: () => App,
    },
    data() {
      return {
        env,
      };
    },
    render: (h) => h(App, { props: { env } }),
  }).$mount("#app");

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("service-worker.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }
})();
