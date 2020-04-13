const axios = require("axios").default;
const command = require("./command");

module.exports = (baseUrl, psk) => {
  const axiosInstance = axios.create({
    baseURL: `${baseUrl}/sony`,
    headers: {
      "Content-Type": "text/xml; charset=UTF-8",
      SOAPACTION: '"urn:schemas-sony-com:service:IRCC:1#X_SendIRCC"',
      "X-Auth-PSK": psk,
    },
  });
  const path = "/IRCC";
  const camelCase = (value) => value.charAt(0).toLowerCase() + value.slice(1);

  return command.reduce(
    (obj, { name, value: code }) =>
      Object.assign(obj, {
        [camelCase(name)]() {
          const envelope = `<?xml version="1.0"?>
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
  <s:Body>
    <u:X_SendIRCC xmlns:u="urn:schemas-sony-com:service:IRCC:1">
      <IRCCCode>${code}</IRCCCode>
    </u:X_SendIRCC>
  </s:Body>
</s:Envelope>`;

          return axiosInstance.post(path, envelope);
        },
      }),
    {}
  );
};
