const axios = require("axios");
const fs = require("fs");
const cp = require("child_process");

var dir = "./downloads";

let downloadFinishedCounter = 0;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

axios({
  method: "get",
  url: "https://go.microsoft.com/fwlink/p/?LinkID=869426&clcid=0x409&culture=en-us&country=US&lm=deeplink&lmsrc=groupChatMarketingPageWeb&cmpid=directDownloadWin64",
  responseType: "stream",
}).then(function (response) {
  let w = response.data.pipe(fs.createWriteStream("./downloads/teams.exe"));
  w.on("finish", function () {
    downloadFinishedCounter++;
    checkIfDone();
  });
});
axios({
  method: "get",
  url: "https://ninite.com/chrome-firefox-windirstat/ninite.exe",
  responseType: "stream",
}).then(function (response) {
  let w = response.data.pipe(fs.createWriteStream("./downloads/ninite.exe"));
  w.on("finish", function () {
    downloadFinishedCounter++;
    checkIfDone();
  });
});
axios({
  method: "get",
  url: "https://downloads.slack-edge.com/releases/windows/4.23.0/prod/x64/SlackSetup.exe",
  responseType: "stream",
}).then(function (response) {
  let w = response.data.pipe(fs.createWriteStream("./downloads/slack.exe"));
  w.on("finish", function () {
    downloadFinishedCounter++;
    checkIfDone();
  });
});
axios({
  method: "get",
  url: "https://admdownload.adobe.com/bin/live/readerdc64_en_xa_crd_install.exe",
  responseType: "stream",
}).then(function (response) {
  let w = response.data.pipe(fs.createWriteStream("./downloads/adobe.exe"));
  w.on("finish", function () {
    downloadFinishedCounter++;
    checkIfDone();
  });
});

checkIfDone = () => {
  if (downloadFinishedCounter < 4) {
    console.log(`${downloadFinishedCounter}/4 downloaded`);
  } else {
    console.log(`${downloadFinishedCounter}/4 downloaded`);
    console.log("done");
    cp.exec(".\\downloads\\adobe.exe", function (err, stdout, stderr) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
      process.exit(0); // exit process once it is opened
    });
    cp.exec(".\\downloads\\ninite.exe", function (err, stdout, stderr) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
      process.exit(0); // exit process once it is opened
    });
    cp.exec(".\\downloads\\slack.exe", function (err, stdout, stderr) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
      process.exit(0); // exit process once it is opened
    });
    cp.exec(".\\downloads\\teams.exe", function (err, stdout, stderr) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
      process.exit(0); // exit process once it is opened
    });
  }
};
