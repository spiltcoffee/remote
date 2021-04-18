export default function (handler) {
  const encryptionHandler = handler("/encryption");

  return {
    getPublicKey() {
      return encryptionHandler.post({
        method: "getPublicKey",
        id: 1,
        params: [],
        version: "1.0",
      });
    },
  };
}
