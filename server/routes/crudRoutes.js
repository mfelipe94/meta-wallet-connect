/* learn more: https://github.com/testing-library/jest-dom // @testing-library/jest-dom library provides a set of custom jest matchers that you can use to extend jest. These will make your tests more declarative, clear to read and to maintain.*/  
const express = require("express");
const router = express.Router();
const Controller = require("../controllers/Controller");

router.post("/add", Controller.add_earn);
router.get("/history/:address", Controller.get_history);
router.get("/time/:address", Controller.get_time);

module.exports = router;
