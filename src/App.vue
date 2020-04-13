<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        TV Remote
      </div>
      <v-subheader>
        
      </v-subheader>

      <v-spacer></v-spacer>

      <v-btn icon @click="refresh"><v-icon>mdi-refresh</v-icon></v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-overlay v-if="loading">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-overlay>
        <v-row>
          <v-col>
            <pre>poweredOn: {{ poweredOn }}</pre>
          </v-col>
        </v-row>
        <v-row justify="space-around">
          <v-btn fab x-large color="green darken-4 white--text" @click="wakeUp">
            On
          </v-btn>

          <v-btn fab x-large color="red darken-4 white--text" @click="powerOff">
            Off
          </v-btn>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ircc from "./ircc";
import api from "./api";

const url = "";
const psk = "";

const apiInstance = api(url, psk);
const irccInstance = ircc(url, psk);

export default {
  name: "App",

  data: () => ({
    poweredOn: null,
    speaker: {
      minVolume: 0,
      maxVolume: 100,
      mute: false,
      volume: 0
    },
    loading: false
  }),

  mounted() {
    setInterval(this.internalRefresh, 60000);
    this.internalRefresh();
  },

  methods: {
    internalRefresh() {
      return Promise.all([
        apiInstance.system
          .getPowerStatus()
          .then(([{ status }]) => (this.poweredOn = status === "active"))
          .catch(() => (this.poweredOn = false)),

        apiInstance.audio
          .getVolumeInformation()
          .then((result) => {
            console.log(result);
          })
          .catch(({ code, message }) => {
            if (code === 40005) {
              console.log("TV is offline");
            } else {
              console.error({ code, message });
            }
          })
      ]);
    },
    refresh() {
      this.loading = true;
      this.internalRefresh().then(() => {
        this.loading = false;
      });
    },
    wakeUp() {
      this.loading = true;
      irccInstance.wakeUp().then(() => {
        setTimeout(this.refresh, 1000);
      });
    },
    powerOff() {
      this.loading = true;
      irccInstance.powerOff().then(() => {
        setTimeout(this.refresh, 1000);
      });
    }
  }
};
</script>
