export default function (handler) {
  const guideHandler = handler("/guide");

  return {
    getSupportedApiInfo(services = null) {
      return guideHandler.post({
        method: "getSupportedApiInfo",
        id: 5,
        params: [{ services }],
        version: "1.0",
      });
    },
  };
}
