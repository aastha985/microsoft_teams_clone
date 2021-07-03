//==================video functionality=======================

//connect to the socket
const socket = io();

//grid for adding user's videos
const videoGrid = $("#meeting-video-grid")[0];

//create a peer
let peer = new Peer(undefined);

//create video element for user
const userVideo = $("<video></video>");

//enable video and audio and get user's stream
let userVideoStream
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    userVideoStream = stream;
    addVideoToGrid(userVideo,stream);

    answerCall(stream);

    //get id of the user who joined
    socket.on("joined",(userId)=>{
      const video = $("<video></video>");
      peer.call(userId,stream).on("stream",userVideoStream=>{
          addVideoToGrid(video,userVideoStream);
      });
    });
})

//when a user connects emit user id and meeting code
peer.on("open",id => {
    socket.emit("joinMeeting",meetingCode,id,username);
})

//when new user joins the meeting
const answerCall=(stream) => {
  peer.on('call',call=>{
    call.answer(stream);
    const video = $("<video></video>");
    call.on("stream",userVideoStream=>{
        addVideoToGrid(video,userVideoStream);
    })
})
}

//set video stream and add video to grid
const addVideoToGrid = (video,stream) => {
  //set stream
  video[0].srcObject = stream;
  //play video
    video.on("loadedmetadata",()=>{
      video[0].play();
    })
    //add video to grid
    videoGrid.append(video[0]);
}

//=============chat functionality================

let chatInput = $("#message-input");

$('html').keydown((event) => {
  //when enter key is pressed & input is not empty
    if(event.which==13 && chatInput.val().length!=0){
        socket.emit('chat',chatInput.val());
        chatInput.val(''); //clearing the input
    }
})

socket.on("sendChatMessage",(chatMessage,username,time) => {
  //add message to the list
    $('#meeting-chat-messages').append(`<li><b>${username}</b><span class="meeting-message-time">${time}</span><br/>${chatMessage}</li>`);

   //scroll chat window
    var chatWindow = $('#meeting-chat-window');
    chatWindow.scrollTop(chatWindow.prop("scrollHeight"));
});

//===============video controls===============

const audioControl = () => {
    const enabled = userVideoStream.getAudioTracks()[0].enabled;

    var button;

    if (enabled) {
      button = `  <button type="button" class="btn btn-secondary">Unmute  <i class="fas fa-microphone-slash" ></i></button>`;
      userVideoStream.getAudioTracks()[0].enabled = false; //disable audio
      
    } else {
      button = `<button type="button" class="btn btn-secondary">Mute  <i class="fas fa-microphone" ></i></button>`;
      userVideoStream.getAudioTracks()[0].enabled = true; //enable audio
    }

    $('#meeting-mute')[0].innerHTML = button;

}

  const videoControl = () => {
    console.log('object')
    let enabled = userVideoStream.getVideoTracks()[0].enabled;

    var button;

    if (enabled) {
      userVideoStream.getVideoTracks()[0].enabled = false;
      button = ` <button type="button" class="btn btn-secondary">Start Video <i class="fas fa-video-slash"></i></button>`;
    } else {
      button = `<button type="button" class="btn btn-secondary">Stop Video <i class="fas fa-video"></i></button>`;
      userVideoStream.getVideoTracks()[0].enabled = true;
    }

    $('#meeting-video-control')[0].innerHTML = button;

  }  

  // ==============leave meeting ========================

  socket.on("leaveMeeting", () =>{
    $("video")[1].remove();
  });

  //==============participants ========================

  socket.on("getParticipants",(meetingCode,users) => {
    participants = $("#meeting-participants");
    participants.empty();
    const displayPicUrl = "https://www.donkey.bike/wp-content/uploads/2020/12/user-member-avatar-face-profile-icon-vector-22965342-300x300.jpg"
      users.forEach((user) => {
         const userDiv = $(`<li><img src=${displayPicUrl}>${user.username}</li>`);
         participants.append(userDiv);
      });
  })

// ============= copy meeting code ===========================

//enabling all tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

//instantiate clipboard
var clipboard = new ClipboardJS('#copy-to-clipboard');

//set meeting code 
document.querySelector("#copy-to-clipboard").setAttribute("data-clipboard-text",meetingCode);

clipboard.on('success', function(e) {
  let trigger_btn = e.trigger; 
  
  //changer text from copy to clipboard to copied
  trigger_btn.setAttribute('data-bs-original-title', 'Copied!');

  //get instance and show toolkit
  let tooltip_btn = bootstrap.Tooltip.getInstance(trigger_btn);
  tooltip_btn.show();

  //reset text
  trigger_btn.setAttribute('data-bs-original-title', 'Copy to clipboard');
});


// ==================invite participants=======================

document.querySelector("#meeting-code").setAttribute("value",meetingCode);
document.querySelector("#sender").setAttribute("value",username);

$(function($){
  $("#send-invite-btn").click(function(){
    $.ajax({
      type: "POST",
      url: "inviteParticipant",
      data: $("#invite-form").serialize(),
      success: function(){
        alert("Invite Has Been Sent");
        $("#receiver-email").val('');
      }
    });
  })
})