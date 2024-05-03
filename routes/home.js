const express = require("express");
const {handelShowHomePage } = require("../controllers/home")

const router = express.Router();

router.route("/").get(handelShowHomePage)


module.exports= router;