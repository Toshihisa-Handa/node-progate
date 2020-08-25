const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix +'Date:'+ Date.now() + '.jpg')
    }
  });
  
  const upload = multer({ storage: storage }).single('profileImage');

  //↓router.post('/profile'.)のprofileを削除したのはapp.jsでapp.use('/profile',profile);を指定しているかららしい
  router.post('/', function (req, res) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
      } else if (err) {
        // An unknown error occurred when uploading.
      }
  
      // Everything went fine.
    })
  });

module.exports = router;