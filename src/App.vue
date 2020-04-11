<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        TV Remote
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <Remote/>
    </v-content>
  </v-app>
</template>

<script>
import Remote from './components/Remote';

export default {
  name: 'App',

  components: {
    Remote,
  },

  data: () => ({
    //
  }),
};
</script>
