const express = require("express");
router = express.Router();
index = require("../controller/index");

router.get("/",index.home)
router.get("/newMeeting",index.newMeeting);
router.post("/joinMeeting",index.joinMeeting);
router.get("/:room",index.joinMeetingRoom);

module.exports = router;