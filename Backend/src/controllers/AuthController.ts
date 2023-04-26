import express = require("express");
const router = express.Router();

import { register } from "../services/AuthService";

router.post("/api/register", register); // register
// router.post("/auth/login", login); // login

module.exports = router;
