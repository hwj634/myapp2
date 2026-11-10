const os = require("os");
const original = os.hostname;

os.hostname = () =>
  original.call(os).normalize("NFKD").replace(/[^\x20-\x7e]/g, "");
