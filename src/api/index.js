const axios = require("axios").default;

const guide = require("./guide");
const appControl = require("./appControl");
const audio = require("./audio");
const avContent = require("./avContent");
const encryption = require("./encryption");
const system = require("./system");
const videoScreen = require("./videoScreen");

module.exports = (baseUrl, psk) => {
  const axiosInstance = axios.create({
    baseURL: `${baseUrl}/sony`,
    headers: {
      "X-Auth-PSK": psk,
    },
  });

  const requestHandler = (path) => ({
    post(data) {
      return axiosInstance.post(path, data).then(({ data: responseData }) => {
        if (responseData) {
          if (responseData.result) {
            return responseData.result;
          } else if (responseData.error) {
            const [code, message] = responseData.error;
            throw { path, code, message };
          }
        }
        throw new Error(
          `No interpretable data in response [${{ path, data }}]`
        );
      });
    },
  });

  return {
    get guide() {
      if (!this._guide) {
        this._guide = guide(requestHandler);
      }
      return this._guide;
    },

    get appControl() {
      if (!this._appControl) {
        this._appControl = appControl(requestHandler);
      }
      return this._appControl;
    },

    get audio() {
      if (!this._audio) {
        this._audio = audio(requestHandler);
      }
      return this._audio;
    },

    get avContent() {
      if (!this._avContent) {
        this._avContent = avContent(requestHandler);
      }
      return this._avContent;
    },

    get encryption() {
      if (!this._encryption) {
        this._encryption = encryption(requestHandler);
      }
      return this._encryption;
    },

    get system() {
      if (!this._system) {
        this._system = system(requestHandler);
      }
      return this._system;
    },

    get videoScreen() {
      if (!this._videoScreen) {
        this._videoScreen = videoScreen(requestHandler);
      }
      return this._videoScreen;
    },
  };
};
