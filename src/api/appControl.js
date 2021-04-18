export default function (handler) {
  const appControlHandler = handler("/appControl");

  return {
    getApplicationList() {
      return appControlHandler.post({
        method: "getApplicationList",
        id: 60,
        params: [],
        version: "1.0",
      });
    },

    getApplicationStatusList() {
      return appControlHandler.post({
        method: "getApplicationStatusList",
        id: 55,
        params: [],
        version: "1.0",
      });
    },

    getTextForm(encKey) {
      return appControlHandler.post({
        method: "getTextForm",
        id: 60,
        params: [encKey ? { encKey } : {}],
        version: "1.1",
      });
    },

    getWebAppStatus() {
      return appControlHandler.post({
        method: "getWebAppStatus",
        id: 1,
        params: [],
        version: "1.0",
      });
    },

    setActiveApp(uri) {
      return appControlHandler.post({
        method: "setActiveApp",
        id: 601,
        params: [{ uri }],
        version: "1.0",
      });
    },

    setTextFormOld(text) {
      return appControlHandler.post({
        method: "setTextForm",
        id: 601,
        params: [text],
        version: "1.0",
      });
    },

    setTextForm(text, encKey = "") {
      return appControlHandler.post({
        method: "setTextForm",
        id: 601,
        params: [{ text, encKey }],
        version: "1.1",
      });
    },

    terminateApps() {
      return appControlHandler.post({
        method: "terminateApps",
        id: 55,
        params: [],
        version: "1.0",
      });
    },
  };
}
