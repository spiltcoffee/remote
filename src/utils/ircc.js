const axios = require("axios").default;

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "text/xml; charset=UTF-8",
    SOAPACTION: '"urn:schemas-sony-com:service:IRCC:1#X_SendIRCC"',
    "X-Auth-PSK": ""
  }
});

module.exports = (url) => ({
  send(code) {
    const envelope = `<?xml version="1.0"?>
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
  <s:Body>
    <u:X_SendIRCC xmlns:u="urn:schemas-sony-com:service:IRCC:1">
      <IRCCCode>${code}</IRCCCode>
    </u:X_SendIRCC>
  </s:Body>
</s:Envelope>`;

    return axiosInstance.post(url, envelope);
  }
});
