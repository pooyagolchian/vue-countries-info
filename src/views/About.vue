<template>
  <v-container>
    <country :countryName="countryName" />
  </v-container>
</template>

<script>
import Country from "@/components/Country.vue";

export default {
  name: "about",
  props: ["countryName"],
  components: {
    Country,
  },
};
</script>
