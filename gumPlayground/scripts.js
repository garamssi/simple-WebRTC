const videoEl = document.querySelector('#my-video');

let stream = null; // init stream, 그리고 어디서든 사용 가능
let mediaStream = null //init mediaStream, 화면공유를 위한 변수

const constraints = {
  audio : true, // 헤드폰, 스피커
  video: true, // 카메라
}

const getMicAndCamera = async () =>{
  try {
    // constraints로 브라우저의 카메라, 오디오의 권한을 가져옴
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    // 브라우저에서 허락 시 스트림의 데이터 id를 확인할 수 있음,
    // console.log(stream);
  } catch (err){
    // 브라우저에서 허용을 안하면 catch로 감,
    console.log(err);
  }
};

// 내 로컬 비디오를 화면에 셋팅하기.
const showMyFeed = e =>{
  if(!stream) {
    alert("비디오 로드 안됨");
    return;
  }
  console.log("비디오 실행");
  videoEl.srcObject = stream; // 나의 미디어스트림을 화면에 셋팅한다. -> <video/> 태그 autoplay 옵션 필수
  const tracks = stream.getTracks();
  console.log(tracks) // => 현재 미디어에서 사용하고 있는 기능 목록 확인 가능
}

const stopMyFeed = e =>{
  const tracks = stream.getTracks();
  tracks.forEach(track =>{
    track.stop();
  })
}

const disableMyCamera = e => {
  const tracks = stream.getTracks();
  const camera = tracks.find(e => e.kind === "video");

  console.log(camera);

  if(!camera){
    return;
  }

  camera.enabled = false;
}

const enableMyCamera = e => {
  const tracks = stream.getTracks();
  const camera = tracks.find(e => e.kind === "video");

  console.log(camera);

  if(!camera){
    return;
  }

  camera.enabled = true;
}

const disableMyMic = e => {
  const tracks = stream.getTracks();
  const mic = tracks.find(e => e.kind === "audio");

  if(!mic){
    return;
  }

  mic.enabled = false;
}

const enableMyMic = e => {
  const tracks = stream.getTracks();
  const mic = tracks.find(e => e.kind === "audio");

  if(!mic){
    return;
  }

  mic.enabled = true;
}


// 카메라, 마이크 기능
document.querySelector("#share").addEventListener('click', e=>getMicAndCamera(e));
document.querySelector('#show-video').addEventListener('click', e=>showMyFeed(e));
document.querySelector('#stop-video').addEventListener('click', e=>stopMyFeed(e));
document.querySelector('#stop-camera').addEventListener('click', e=>disableMyCamera(e));
document.querySelector('#stop-mic').addEventListener('click', e=>disableMyMic(e));
document.querySelector('#start-camera').addEventListener('click', e=>enableMyCamera(e));
document.querySelector('#start-mic').addEventListener('click', e=>enableMyMic(e));

// 스크린 창 변경
document.querySelector('#change-size').addEventListener('click',e=>changeVideoSize(e));

// 녹화 기능
document.querySelector('#start-record').addEventListener('click',e=>startRecording(e));
document.querySelector('#stop-record').addEventListener('click',e=>stopRecording(e));
document.querySelector('#play-record').addEventListener('click',e=>playRecording(e));

// 화면 공유
document.querySelector('#share-screen').addEventListener('click',e=>shareScreen(e));


// 오디오 비디오 인풋
document.querySelector('#audio-input').addEventListener('change', e=>changeAudioInput(e));
document.querySelector('#audio-output').addEventListener('change', e=>changeAudioOutput(e));
document.querySelector('#video-input').addEventListener('change', e=>changeVideo(e));