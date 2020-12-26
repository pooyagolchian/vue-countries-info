<template>
  <v-app>
    <v-app-bar app>
      <v-container>
        <v-row align="center" justify="center">
          <v-col align-self="center">
            <v-toolbar-title
              ><router-link to="/" tag="h3" class="slogan"
                >Where in the world?</router-link
              ></v-toolbar-title
            >
          </v-col>
          <v-spacer></v-spacer>
          <v-col align-self="start" align="end">
            <span>
              <v-btn v-if="$vuetify.theme.dark" icon @click="switchTheme">
                <v-icon>mdi-moon-waxing-crescent</v-icon>
              </v-btn>
              <v-btn v-if="!$vuetify.theme.dark" icon @click="switchTheme">
                <v-icon>mdi-weather-sunny</v-icon>
              </v-btn>
            </span>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view :loading="loading"></router-view>
    </v-main>
  </v-app>
</template>
<style lang="scss">
@import "../src/assets/scss/main.scss";
</style>
<script>
import api from "@/services";
import { mapActions } from "vuex";
export default {
  name: "App",

  data: () => ({
    loading: false,
  }),

  methods: {
    ...mapActions(["getData"]),
    switchTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },

    async getAllCountriesData() {
      try {
        this.loading = true;
        let response = await api.Coutries.getAllCountries();
        this.getData(response);
      } catch (error) {
        this.loading = false;
        console.error("error", error);
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    await this.getAllCountriesData();
    const theme = localStorage.getItem("dark_theme");
    if (theme && theme == "true") {
      this.$vuetify.theme.dark = true;
    } else {
      this.$vuetify.theme.dark = false;
    }
  },
};
</script>
