import express = require("express");
const router = express.Router();

import { login, register, me, logout } from "../services/AuthService";

router.post("/api/register", register); // register
router.post("/api/login", login); // login
router.get("/api/me", me); // me
router.get("/api/logout", logout); // me

module.exports = router;
