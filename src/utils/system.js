const axios = require("axios").default;

const axiosInstance = axios.create();

module.exports = (url) => ({
  fetch(method) {
    const payload = {
      id: 4,
      method,
      version: "1.0",
      params: ["1.0"],
    };

    return axiosInstance.post(url, payload);
  },
});
