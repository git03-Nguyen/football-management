const TeamModel = require("../../models/team.m");
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: async function (req, file, callback) {
    const teamId = req.params.teamId;
    const path = `./public/img/teams/${teamId}`;
    fs.mkdirSync(path, { recursive: true });
    callback(null, path);
  },
  filename: function (req, file, callback) {
    const extension = file.mimetype.split('/')[1];
    callback(null, `logo.${extension}`);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;