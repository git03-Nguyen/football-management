const TournamentModel = require("../../models/tournament.m");
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: async function (req, file, callback) {
    const tournamentId = await TournamentModel.getCurrentTournamentId();
    const path = `./public/img/tournaments/${tournamentId}`;
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