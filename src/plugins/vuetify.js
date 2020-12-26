import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "@mdi/font/css/materialdesignicons.css";
Vue.use(Vuetify);
const options = {
  icons: {
    iconfont: "mdi",
  },
  theme: {
    dark: false,
  },
};
export default new Vuetify(options);
