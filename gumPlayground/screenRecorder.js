let mediaRecorder;
let recordedBlobs;

const startRecording = ()=>{
  if(!stream){
    alert("스트림 생성 전");
    return
  }
  console.log("녹화 시작")
  recordedBlobs = []; // 버퍼 초기화
  mediaRecorder = new MediaRecorder(stream) // 미디어 객체 생성
  mediaRecorder.ondataavailable = e=>{
    console.log("미디어 레코드에 대한 녹화 데이터 접근 가능")
    recordedBlobs.push(e.data)
  }
  mediaRecorder.start();

}


const stopRecording = ()=>{
  if(!mediaRecorder){
    alert("중지 전에 먼저 녹화 시작")
    return
  }
  console.log("녹화 스탑")
  mediaRecorder.stop()

}

const playRecording = ()=>{
  console.log("녹화 플레이")
  if(!recordedBlobs){
    alert("녹화 저장 안됨")
    return
  }
  const buffer = new Blob(recordedBlobs) // array blob 데이터
  const recordedVideoEl = document.querySelector('#other-video');
  recordedVideoEl.src = window.URL.createObjectURL(buffer);
  recordedVideoEl.controls = true;
  recordedVideoEl.play();
}