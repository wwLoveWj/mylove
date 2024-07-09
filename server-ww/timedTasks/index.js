const schedule = require("node-schedule");
const axios = require("axios");
const notifier = require("node-notifier");
const config = require("./config.js");

schedule.scheduleJob("*/20 * * * * *", () => {
  axios({
    url: config.check_url,
    method: "post",
    headers: {
      Referer: config.url,
      Cookie: config.cookie,
    },
  })
    .then((res) => {
      console.log(res.data);
      if (res.data?.err_no === 15001) {
        notifier.notify({
          title: "掘金签到通知",
          message: res.data?.err_msg,
          sound: "Submarine",
          closeLabel: "CANCEL",
          actions: "OK",
        });
      }
    })
    .catch((err) => {
      console.err(err);
    });
});
