const socket = io('/');
const peer = new Peer(undefined, { host: '/', port: '3001' });
const peers = {};

const videoGrid = document.getElementById('video-grid');
const videoElement = document.createElement('video');
videoElement.muted = true;

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true,
}).then((stream) => {
  addVideoStream(videoElement, stream);

  peer.on('call', (call) => {
    call.answer(stream);
    const video = document.createElement('video');
    call.on('stream', (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });
  });

  socket.on('user-connected', (userId) => {
    connectToNewUser(userId, stream);
  })
});

socket.on('user-disconnected', (userId) => {
  console.log('user disconnected');
  if (peers[userId]) {
    peers[userId].close();
  }
});

peer.on('open', (USER_ID) => {
  socket.emit('join-room', ROOM_ID, USER_ID);
});

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => video.play());
  videoGrid.append(video);
};

const connectToNewUser = (userId, stream) => {
  console.log('connect to new user');
  const call = peer.call(userId, stream);
  const video = document.createElement('video');

  call.on('stream', (userVideoStream) => {
    console.log('new video stream');
    addVideoStream(video, userVideoStream);
  });

  call.on('close', () => {
    video.remove();
  });

  peers[userId] = call;
};
