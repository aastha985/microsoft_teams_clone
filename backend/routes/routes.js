const express = require("express");
router = express.Router();
controller = require("../controller/controller");

router.get("/",controller.home)
router.post("/newMeeting",controller.newMeeting);
router.post("/joinMeeting",controller.joinMeeting);
router.post("/inviteParticipant",controller.inviteParticipant);
router.get("/:room",controller.joinMeetingRoom);

module.exports = router;