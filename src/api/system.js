module.exports = (handler) => {
  const systemHandler = handler("/system");

  return {
    getCurrentTimeOld() {
      return systemHandler.post({
        method: "getCurrentTime",
        id: 51,
        params: [],
        version: "1.0",
      });
    },

    getCurrentTime() {
      return systemHandler.post({
        method: "getCurrentTime",
        id: 51,
        params: [],
        version: "1.1",
      });
    },

    getInterfaceInformation() {
      return systemHandler.post({
        method: "getInterfaceInformation",
        id: 33,
        params: [],
        version: "1.0",
      });
    },

    getLEDIndicatorStatus() {
      return systemHandler.post({
        method: "getLEDIndicatorStatus",
        id: 45,
        params: [],
        version: "1.0",
      });
    },

    getNetworkSettings(netif = "") {
      return systemHandler.post({
        method: "getNetworkSettings",
        id: 2,
        params: [{ netif }],
        version: "1.0",
      });
    },

    getPowerSavingMode() {
      return systemHandler.post({
        method: "getPowerSavingMode",
        id: 51,
        params: [],
        version: "1.0",
      });
    },

    getPowerStatus() {
      return systemHandler.post({
        method: "getPowerStatus",
        id: 50,
        params: [],
        version: "1.0",
      });
    },

    getRemoteControllerInfo() {
      return systemHandler.post({
        method: "getRemoteControllerInfo",
        id: 54,
        params: [],
        version: "1.0",
      });
    },

    getRemoteDeviceSettings(target = "") {
      return systemHandler.post({
        method: "getRemoteDeviceSettings",
        id: 44,
        params: [{ target }],
        version: "1.0",
      });
    },

    getSystemInformation() {
      return systemHandler.post({
        method: "getSystemInformation",
        id: 33,
        params: [],
        version: "1.0",
      });
    },

    getSystemSupportedFunction() {
      return systemHandler.post({
        method: "getSystemSupportedFunction",
        id: 55,
        params: [],
        version: "1.0",
      });
    },

    getWolMode() {
      return systemHandler.post({
        method: "getSystemSupportedFunction",
        id: 50,
        params: [],
        version: "1.0",
      });
    },

    requestReboot() {
      return systemHandler.post({
        method: "requestReboot",
        id: 10,
        params: [],
        version: "1.0",
      });
    },

    setLEDIndicatorStatus(mode, status = null) {
      return systemHandler.post({
        method: "setLEDIndicatorStatus",
        id: 53,
        params: [{ mode, status }],
        version: "1.1",
      });
    },

    setLanguage(language) {
      return systemHandler.post({
        method: "setLanguage",
        id: 55,
        params: [{ language }],
        version: "1.0",
      });
    },

    setPowerSavingMode(mode) {
      return systemHandler.post({
        method: "setPowerSavingMode",
        id: 52,
        params: [{ mode }],
        version: "1.0",
      });
    },

    setPowerStatus(status = false) {
      return systemHandler.post({
        method: "setPowerStatus",
        id: 55,
        params: [{ status }],
        version: "1.0",
      });
    },

    setWolMode(enabled = false) {
      return systemHandler.post({
        method: "setWolMode",
        id: 55,
        params: [{ enabled }],
        version: "1.0",
      });
    },
  };
};
