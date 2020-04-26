<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        TV Remote
      </div>
      <v-subheader>

      </v-subheader>

      <v-spacer></v-spacer>

      <v-btn icon @click="modalRefresh"
        ><v-icon>mdi-modalRefresh </v-icon></v-btn
      >
    </v-app-bar>

    <v-content class="mx-2">
      <v-container>
        <v-overlay v-if="loading">
          <v-progress-circular indeterminate></v-progress-circular>
        </v-overlay>
        <v-row class="my-2">
          <v-switch
            v-model="poweredOn"
            @change="togglePower"
            :label="poweredOn ? 'Powered On' : 'Powered Off'"
          >
          </v-switch>
        </v-row>
        <v-fade-transition group>
          <template v-if="poweredOn">
            <v-row class="my-2" key="volume-controls">
              <v-slider
                :label="speaker.volume + ''"
                :prepend-icon="'mdi-volume-' + (speaker.mute ? 'off' : 'high')"
                v-model="speaker.volume"
                @change="changeVolume($event)"
                hide-details
                class="align-center"
              >
                <template #append>
                  <v-btn-toggle rounded>
                    <v-btn @click="toggleMute">
                      <v-icon>mdi-volume-mute</v-icon>
                    </v-btn>
                    <v-btn @click="decVolume">
                      <v-icon>mdi-volume-minus</v-icon>
                    </v-btn>
                    <v-btn @click="incVolume">
                      <v-icon>mdi-volume-plus</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </template>
              </v-slider>
            </v-row>
            <v-row class="my-2" justify="center" key="main-controls">
              <v-btn-toggle rounded>
                <v-btn @click="back">
                  <v-icon>mdi-arrow-left-bold</v-icon> Back
                </v-btn>
                <v-btn @click="source">
                  <v-icon>mdi-import</v-icon> Source
                </v-btn>
                <v-btn @click="home"><v-icon>mdi-home</v-icon> Home</v-btn>
                <v-btn @click="menu"><v-icon>mdi-menu</v-icon> Menu</v-btn>
              </v-btn-toggle>
            </v-row>
            <v-row class="my-8" justify="center" key="directional-controls">
              <div class="dircon">
                <v-btn
                  @click="up"
                  fab
                  class="dircon__button dircon__button--up"
                >
                  <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
                <v-btn
                  @click="right"
                  fab
                  class="dircon__button dircon__button--right"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
                <v-btn
                  @click="down"
                  fab
                  class="dircon__button dircon__button--down"
                >
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
                <v-btn
                  @click="left"
                  fab
                  class="dircon__button dircon__button--left"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn @click="ok" fab class="dircon__button font-weight-bold">
                  OK
                </v-btn>
              </div>
            </v-row>
            <v-row class="my-2" justify="center" key="track-controls">
              <v-btn-toggle rounded>
                <v-btn @click="stop"> <v-icon>mdi-stop</v-icon> Stop </v-btn>
                <v-btn @click="pause"> <v-icon>mdi-pause</v-icon> Pause </v-btn>
                <v-btn @click="play"> <v-icon>mdi-play</v-icon> Play </v-btn>
              </v-btn-toggle>
            </v-row>
          </template>
        </v-fade-transition>
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
    setInterval(this.refresh, 60000);
    this.refresh();
  },

  methods: {
    refresh() {
      return Promise.all([
        apiInstance.system
          .getPowerStatus()
          .then(([{ status }]) => (this.poweredOn = status === "active"))
          .catch(() => (this.poweredOn = false)),

        apiInstance.audio
          .getVolumeInformation()
          .then(([devices]) => {
            devices
              .filter(({ target }) => target === "speaker")
              .forEach(
                ({
                  volume = 0,
                  mute = false,
                  maxVolume = 100,
                  minVolume = 0,
                }) => {
                  this.speaker = {
                    volume,
                    mute,
                    maxVolume,
                    minVolume,
                  };
                }
              );
          })
          .catch(({ code, message }) => {
            // 40005 == TV is offline
            if (code !== 40005) {
              console.error({ code, message });
            }
          })
      ]);
    },
    modalRefresh() {
      this.loading = true;
      this.refresh().then(() => {
        this.loading = false;
      });
    },
    togglePower(value) {
      this.loading = true;
      (value ? irccInstance.wakeUp : irccInstance.powerOff)().then(() => {
        setTimeout(this.modalRefresh, 1000);
      });
    },

    toggleMute() {
      irccInstance.mute().then(() => {
        this.mute = !this.mute;
      });
    },
    decVolume() {
      irccInstance.volumeDown().then(() => {
        this.speaker.volume--;
      });
    },
    incVolume() {
      irccInstance.volumeUp().then(() => {
        this.speaker.volume++;
      });
    },
    changeVolume(volume) {
      apiInstance.audio.setAudioVolume("speaker", volume + "").then(() => {
        this.speaker.volume = volume;
      });
    },

    stop() {
      irccInstance.stop();
    },
    pause() {
      irccInstance.pause();
    },
    play() {
      irccInstance.play();
    },

    back() {
      irccInstance.return();
    },
    source() {
      irccInstance.input();
    },
    home() {
      irccInstance.home();
    },
    menu() {
      irccInstance.options();
    },

    up() {
      irccInstance.up();
    },
    right() {
      irccInstance.right();
    },
    down() {
      irccInstance.down();
    },
    left() {
      irccInstance.left();
    },
    ok() {
      irccInstance.confirm();
    },
  },
};
</script>

<style scoped>
.dircon {
  height: calc(56px * 3 + 16px);
  width: calc(56px * 3 + 16px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.dircon__button {
  position: absolute;
}

.dircon__button--up {
  top: 0;
}

.dircon__button--right {
  right: 0;
}

.dircon__button--down {
  bottom: 0;
}

.dircon__button--left {
  left: 0;
}
</style>
