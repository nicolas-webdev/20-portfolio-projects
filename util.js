var ncp = require("ncp").ncp;

// Represents the number of pending
// file system requests at a time.
ncp.limit = 16;

// ncp(source, destination, callback)

for (let i = 7; i < 21; i++) {
  ncp("./5", `./${i}`, function (err) {
    if (err) {
      return console.error(err);
    }

    console.log("Folders copied recursively");
  });
}
