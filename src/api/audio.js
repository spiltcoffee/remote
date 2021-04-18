export default function (handler) {
  const audioHandler = handler("/audio");

  return {
    getSoundSettings(target = "") {
      return audioHandler.post({
        method: "getSoundSettings",
        id: 73,
        params: [{ target }],
        version: "1.1",
      });
    },

    getSpeakerSettings(target = "") {
      return audioHandler.post({
        method: "getSpeakerSettings",
        id: 67,
        params: [{ target }],
        version: "1.0",
      });
    },

    getVolumeInformation() {
      return audioHandler.post({
        method: "getVolumeInformation",
        id: 33,
        params: [],
        version: "1.0",
      });
    },

    setAudioMute(status = false) {
      return audioHandler.post({
        method: "setAudioMute",
        id: 601,
        params: [{ status }],
        version: "1.0",
      });
    },

    setAudioVolumeOld(target, volume) {
      return audioHandler.post({
        method: "setAudioVolume",
        id: 601,
        params: [{ target, volume }],
        version: "1.0",
      });
    },

    setAudioVolume(target, volume, ui = null) {
      return audioHandler.post({
        method: "setAudioVolume",
        id: 98,
        params: [{ target, volume, ui }],
        version: "1.2",
      });
    },

    setSoundSettings(settings) {
      return audioHandler.post({
        method: "setSoundSettings",
        id: 5,
        params: [{ settings }],
        version: "1.1",
      });
    },

    setSpeakerSettings(settings) {
      return audioHandler.post({
        method: "setSpeakerSettings",
        id: 62,
        params: [{ settings }],
        version: "1.0",
      });
    },
  };
}
