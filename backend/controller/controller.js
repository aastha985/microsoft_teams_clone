const {v4: uuidv4} = require('uuid');

exports.home = (req,res) => {
    res.render("home");
}

exports.newMeeting = (req,res) => {
    res.redirect(`/${uuidv4()}`);
}

exports.joinMeeting = (req,res) => {
    res.redirect("/"+req.body.meetingCode);
}

exports.joinMeetingRoom =(req,res)=>{
    res.render("meeting",{meetingCode: req.params.meetingCode});
}