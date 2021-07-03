const {v4: uuidv4} = require('uuid');
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.home = (req,res) => {
    res.render("home");
}

exports.newMeeting = (req,res) => {
    res.redirect(`/meet?meetingCode=${uuidv4()}&username=${req.body.username}`);
}

exports.joinMeeting = (req,res) => {
    res.redirect(`/meet?meetingCode=${req.body.meetingCode}&username=${req.body.username}`);
}

exports.joinMeetingRoom =(req,res)=>{
    res.render("meeting",{meetingCode: req.params.meetingCode});
}

exports.inviteParticipant = (req,res) => {
    const receiver = req.body.email;
    const receiversName = receiver.split("@")[0];
    const url = process.env.SERVER_URL+"meet?meetingCode"+req.body.meetingCode+"&username="+receiversName;

    const emailContent = 
    `<p>Hi ${receiversName}</p>
    <p>${req.body.sender} has invited you to a meeting.</p>
    <hr>
    <h2>Microsoft Teams Meeting</h2>
    <p><b>Join on your computer</b><p>
    <a href="${url}">Click here to join the meeting</a>`;

    let transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD ,
        },
    });

    transporter.sendMail({
        from: process.env.EMAIL,
        to: receiver,
        subject: "Invitation: Microsoft Teams Meeting",
        html: emailContent,
    });

    res.redirect("/");
}