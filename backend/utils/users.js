const users = [];

const userJoin = (id, username, meetingCode) => {
  const user = { id, username, meetingCode };
  users.push(user);
}

const getCurrentUser = (id) =>  {
  return users.find(user => user.id === id);
}

const userLeave = (id) => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
}

const getParticipants = (meetingCode) => {
  return users.filter(user => user.meetingCode === meetingCode);
}

module.exports = {userJoin,getCurrentUser,userLeave,getParticipants};
