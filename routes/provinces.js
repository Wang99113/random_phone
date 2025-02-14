const express = require("express");
const provinces = require('../public/provinces.json');
const router = express.Router();

// 获取所有省份列表
router.get('/', (req, res) => {
    //返回provinces.json
    res.json(require('../public/provinces.json'));
});
router.post('/', (req, res) => {
    //返回provinces.json
    res.json(require('../public/provinces.json'));
});

module.exports = router;
