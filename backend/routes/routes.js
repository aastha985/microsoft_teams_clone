const express = require("express");
router = express.Router();
controller = require("../controller/controller");

router.get("/",controller.home)
router.get("/newMeeting",controller.newMeeting);
router.post("/joinMeeting",controller.joinMeeting);
router.get("/:room",controller.joinMeetingRoom);

module.exports = router;