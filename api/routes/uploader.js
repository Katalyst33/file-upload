const express = require("express");
const router = express.Router();
const app = express();
const multer = require('multer');

const fileFilter = function (req, file, cb) {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];


    if(!allowedTypes.includes(file.mimetype)){
        const error = new Error("Wrong file type");
        error.code = "LIMIT_FILE_TYPES";
        return cb(error, false);
    }
    cb(null, true);
};

const uploader = multer({
    dest:'./uploads/',
    fileFilter,
    limits:{
        fileSize:200000
    }
});

router.get("/", (req, res) => {
    res.json({
        cool:"bitch ass niggacdcc"
    });
    console.log('bitch');
});

router.post("/", uploader.single("file"), (req, res) => {
    res.json({
        file:req.file
    });

});




module.exports = [
    router,
    app
];

