<template>
  <v-container>
    <countries />
  </v-container>
</template>

<script>
import Countries from "@/components/Countries.vue";

export default {
  name: "Home",
  components: {
    Countries,
  },
};
</script>
