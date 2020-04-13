module.exports = (handler) => {
  const avContentHandler = handler("/avContent");

  return {
    getContentCountOld(source, type = "") {
      return avContentHandler.post({
        method: "getContentCount",
        id: 11,
        params: [{ source, type }],
        version: "1.0",
      });
    },

    getContentCount(source, type = "", target = "") {
      return avContentHandler.post({
        method: "getContentCount",
        id: 11,
        params: [{ source, type, target }],
        version: "1.1",
      });
    },

    getContentList(uri = null, stIdx = 0, cnt = 50) {
      return avContentHandler.post({
        method: "getContentList",
        id: 88,
        params: [{ uri, stIdx, cnt }],
        version: "1.5",
      });
    },

    getCurrentExternalInputsStatusOld() {
      return avContentHandler.post({
        method: "getCurrentExternalInputsStatus",
        id: 105,
        params: [],
        version: "1.0",
      });
    },

    getCurrentExternalInputsStatus(scheme) {
      return avContentHandler.post({
        method: "getCurrentExternalInputsStatus",
        id: 105,
        params: [{ scheme }],
        version: "1.1",
      });
    },

    getSchemeList() {
      return avContentHandler.post({
        method: "getSchemeList",
        id: 1,
        params: [],
        version: "1.0",
      });
    },

    getSourceList(scheme) {
      return avContentHandler.post({
        method: "getSourceList",
        id: 1,
        params: [{ scheme }],
        version: "1.0",
      });
    },

    getPlayingContentInfo() {
      return avContentHandler.post({
        method: "getPlayingContentInfo",
        id: 103,
        params: [],
        version: "1.0",
      });
    },

    setPlayContent(uri) {
      return avContentHandler.post({
        method: "setPlayContent",
        id: 101,
        params: [{ uri }],
        version: "1.0",
      });
    },
  };
};
