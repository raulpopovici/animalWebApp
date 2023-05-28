import { updateUserInfo } from "../services/UserService";

import express = require("express");
const router = express.Router();

router.post("/api/updateUserInfo", updateUserInfo);

module.exports = router;
