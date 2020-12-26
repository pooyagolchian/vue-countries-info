<template>
  <section>
    <v-row class="pt-10 pb-3" no-gutters>
      <v-col>
        <v-text-field
          v-model="keywords"
          label="Search for a country…"
          placeholder="Search for a country…"
          prepend-inner-icon="mdi-magnify"
          outlined
        ></v-text-field>
      </v-col>

      <v-spacer></v-spacer>

      <v-col>
        <v-select
          :items="items"
          v-model="region"
          color="black"
          label="Filter by Region"
          outlined
        ></v-select>
      </v-col>
    </v-row>

    <v-layout wrap>
      <v-skeleton-loader
        class="mr-2 ml-2"
        v-show="loading"
        v-for="(item, index) in 250"
        :key="index + '-skeletor'"
        type="card"
        max-width="264"
        width="100%"
        min-height="336"
      ></v-skeleton-loader>

      <v-col
        cols="12"
        lg="3"
        md="6"
        sm="12"
        v-for="(country, index) in filteredCountries"
        :key="index + '-card'"
      >
        <v-card :to="'/about/' + country.name">
          <v-img
            :aspect-ratio="4 / 3"
            class="align-end"
            height="160"
            :src="country.flag"
          >
          </v-img>

          <v-card-text>
            <ul>
              <li>
                <h3>{{ country.name }}</h3>
              </li>
              <li>
                <strong>Population:</strong>
                {{
                  country.population
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </li>
              <li><strong>Region:</strong> {{ country.region }}</li>
              <li><strong>Capital:</strong> {{ country.capital }}</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-layout>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    items: ["Africa", "America", "Asia", "Europe", "Oceania"],
    keywords: "",
    region: "",
    loading: true,
  }),
  methods: {},
  computed: {
    ...mapGetters(["countries"]),
    filteredCountries() {
      function compare(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }
      let filterCountries = this.countries.filter((x) => {
        return (
          x.name.toLowerCase().indexOf(this.keywords.toLowerCase()) > -1 &&
          x.region.match(this.region)
        );
      });
      return filterCountries.sort(compare);
    },
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>
