const PlayerModel = require("../../models/player.m");
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: async function (req, file, callback) {
    const path = `./public/img/players`;
    fs.mkdirSync(path, { recursive: true });
    callback(null, path);
  },
  filename: function (req, file, callback) {
    const extension = file.mimetype.split('/')[1];
    const playerId = req.params.playerId;
    console.log(playerId);
    callback(null, `${playerId}.${extension}`);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;