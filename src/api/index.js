import axios from "axios";

import guide from "./guide.js";
import appControl from "./appControl.js";
import audio from "./audio.js";
import avContent from "./avContent.js";
import encryption from "./encryption.js";
import system from "./system.js";
import videoScreen from "./videoScreen.js";

export default function (baseUrl, psk) {
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
          `No interpretable data in response [${{ path, data }}]`,
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
}
