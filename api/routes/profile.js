const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const upload = multer({
    storage: storage
}).single('avatar');


router.post('/', function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
        }
        res.json({
            success: true,
            message: 'Image upload successful'
        })

        // Everything went fine.
    })
});

router.get("/", (req, res) => {
    res.json({
        cool:"yeah"
    });
    console.log('hahahahahahha');
});




module.exports = router;
