<template>
  <v-container>
    <v-row>
      <v-col>
        <pre>{{ lastMessage }}</pre>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

const STATUS_URL = "";

export default {
  name: "Remote",

  data: () => ({
    lastMessage: "Loading"
  }),

  mounted() {
    this.fetch();
  },

  methods: {
    fetch() {
      axios
        .post(STATUS_URL, {
          id: 4,
          method: "getPowerStatus",
          version: "1.0",
          params: ["1.0"]
        })
        .then(({ data }) => (this.lastMessage = data));
    }
  }
};
</script>
