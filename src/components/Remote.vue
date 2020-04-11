<template>
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
      <v-btn
        fab
        x-large
        color="green darken-4 white--text"
        @click="sendCommand('WakeUp')"
      >
        On
      </v-btn>

      <v-btn
        fab
        x-large
        color="red darken-4 white--text"
        @click="sendCommand('PowerOff')"
      >
        Off
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import command from "../utils/command";
import ircc from "../utils/ircc";
import system from "../utils/system";

const URL = "";
const systemInstance = system(`${URL}/system`);
const irccInstance = ircc(`${URL}/IRCC`);

export default {
  name: "Remote",

  data: () => ({
    poweredOn: null,
    loading: false,
  }),

  mounted() {
    setInterval(this.refreshState, 10000);
    this.refreshState();
  },

  methods: {
    refreshState() {
      return systemInstance
        .fetch("getPowerStatus")
        .then(({ data }) => {
          this.poweredOn =
            data.result && data.result[0] && data.result[0].status === "active";
        })
        .catch(() => {
          this.poweredOn = false;
        });
    },
    sendCommand(name) {
      this.loading = true;
      const code = command.byName(name);
      irccInstance.send(code).then(() => {
        setTimeout(() => {
          this.refreshState().then(() => {
            this.loading = false;
          });
        }, 1000);
      });
    },
  },
};
</script>
