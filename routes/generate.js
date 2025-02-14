const express = require("express");
const router = express.Router();

const generate_controller = require("../controllers/generateController");

// 生成手机号
router.get('/', generate_controller.generate);

module.exports = router;
