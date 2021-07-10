# Microsoft Teams Clone

This project was built as a part of [Microsoft Engage 2021](https://microsoft.acehacker.com/engage2021/). 

## Table of Contents
1. [About The Project](#about)
2. [Additional Features Implemented](#additional-features)
3. [Demo Video](#demo)
4. [Agile](#agile)
5. [Built With](#built-with)
6. [Network Protocols Used](#network-protocols)
7. [Instructions To Run](#instructions-to-run)
8. [Acknowledgements](#acknowledgements)

<a name="about"></a>
### About The Project
A clone of the popular Microsoft Teams App that allows 2 people to connect with each other and have a video conversation. 

<a name="additional-features"></a>
##### Additional Features Implemented
1. Mute/Unmute
2. Video On/Off
3. Copy Meeting Code to Clipboard
4. Invite Participants via Email
5. Chat
6. Display Participants in Meeting

### Demo Video
[Click here to view the demo](https://youtu.be/-7_R5Ki5jms)

<a name="agile"></a>
### Agile

This project was built using the principles of Agile Development Methodology by following a 4-week sprint. 

##### About Agile
Agile scrum methodology is a project management system that relies on incremental development. Each iteration consists of two- to four-week sprints, where each sprint’s goal is to build the most important features first and come out with a potentially deliverable product.

##### How Agile was followed in this project

![](https://i.imgur.com/UMxhV8m.jpg)

<a name="built-with"></a>
### Built With
* Node.js
* Express
* EJS
* WebRTC
* Socket.IO

<a name="network-protocols"></a>
### Network Protocols Used
1. Socket.IO : TCP
2. For Sending Mails: SMTP


<a name="instructions-to-run"></a>
### Instructions To Run
1. `npm install`
2. Create `.env` file with
```
EMAIL=<email_here>
PASSWORD=<email_password_here>
SERVER_URL=https://teams-microsoft.herokuapp.com/
```
3.  To start the server
    1. Development: `npm run dev`
    2. Production: `npm start`

<a name="acknowledgements"></a>
### Acknowledgements
[UUID](https://www.npmjs.com/package/uuid)\
[Moment.js](https://momentjs.com/)\
[Nodemailer](https://nodemailer.com/about/)\
[Font Awesome](https://fontawesome.com/)
