const schedule = require('node-schedule');
const dbMatches = require('../utils/database/dbMatches');

async function run() {
  await dbMatches.updateMatchesPlayedOrFinished();
  console.log("Schedule job is running");
}

module.exports = async () => {
  await run();
  schedule.scheduleJob("*/5 * * * *", async () => {
    try {
      await run();
    } catch (error) {
      console.log(error);
    }
  });
}