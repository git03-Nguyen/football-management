const schedule = require('node-schedule');

module.exports = schedule.scheduleJob("*/5 * * * *", async () => {
  const dbMatches = require('../utils/database/dbMatches');
  try {
    await dbMatches.updateMatchesPlayedOrFinished();
    console.log("Schedule job is running");
  } catch (error) {
    console.log(error);
  }
});