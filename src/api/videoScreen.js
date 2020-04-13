module.exports = (handler) => {
  const videoScreenHandler = handler("/videoScreen");

  return {
    setSceneSetting(value) {
      return videoScreenHandler.post({
        method: "setSceneSetting",
        id: 40,
        params: [{ value }],
        version: "1.0",
      });
    },
  };
};
