const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/img/avatars');
  },
  filename: function (req, file, callback) {
    const extension = file.mimetype.split('/')[1];
    const userId = req.user.id;
    callback(null, `${userId}.${extension}`);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;