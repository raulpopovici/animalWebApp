import { updateUserInfo, getAllUsers } from "../services/UserService";

import express = require("express");
const router = express.Router();

router.post("/api/updateUserInfo", updateUserInfo);

router.get("/api/getAllUsers", getAllUsers);

module.exports = router;
