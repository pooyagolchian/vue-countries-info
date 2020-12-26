<template>
  <section>
    <v-btn class="btn-primary mt-5 mb-5" @click="$router.go(-1)"
      >&larr; Back</v-btn
    >

    <v-row>
      <v-col cols="12" md="6">
        <v-img :aspect-ratio="4 / 3" :src="country.flag" :alt="country.name" />
      </v-col>

      <v-col cols="12" md="6">
        <h1>{{ country.name }}</h1>
        <ul>
          <li>
            <span>Native Name:</span>
            {{ country.nativeName }}
          </li>
          <li>
            <span>Population:</span>
            {{
              country.population
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </li>
          <li><span>Region:</span> {{ country.region }}</li>
          <li>
            <span>Sub Region:</span>
            {{ country.subregion }}
          </li>
          <li><span>Capital:</span> {{ country.capital }}</li>
          <li class="about-section__list-item mt-sm-40">
            <span>Top Level Domain:</span>
            {{ country.topLevelDomain[0] }}
          </li>
          <li>
            <span>Currencies:</span>
            {{
              country.currencies[0].symbol
                ? `(${country.currencies[0].symbol}) ${country.currencies[0].name}`
                : `${country.currencies[0].name}`
            }}
          </li>
          <li>
            <span>Languages:</span>
            {{ showListName(country.languages).join(", ") }}
          </li>
        </ul>
        <v-col>
          <span v-if="country.borders != ''">
            Border Countries:
            <v-btn
              v-for="(country, index) in borderCountry"
              class="btn-secondary mr-2 mb-2 ml-2"
              :key="index"
              :to="'/about/' + country.name.replace(/\s\([\w\s\.]+\)/gi, '')"
            >
              {{ country.name.replace(/\s\([\w\s\.]+\)/gi, "") }}
            </v-btn>
          </span>
          <span v-else>Border Countries: <strong>None</strong> </span>
        </v-col>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["countryName"],
  data: () => ({
    loading: true,
  }),

  computed: {
    ...mapGetters(["countries"]),
    countryData() {
      return this.countries.filter((x) => {
        return x.name
          .replace(/\s\([\w\s\.]+\)/gi, "")
          .match(this.countryName.replace(/\s\([\w\s\.]+\)/gi, ""));
      });
    },

    country() {
      return this.countryData[0];
    },

    borderCountry() {
      return this.countries.filter((x) => {
        const countryBorders = this.country.borders;
        const regexBorders = new RegExp(countryBorders.join("|", "gi"));
        return x.alpha3Code.match(regexBorders);
      });
    },
  },

  created() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },

  methods: {
    showListName(list) {
      return list.map((item) => item.name);
    },
  },
};
</script>
