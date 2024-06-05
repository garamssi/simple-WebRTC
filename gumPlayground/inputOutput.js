const audioInputEl = document.querySelector('#audio-input')
const audioOutputEl = document.querySelector('#audio-output')
const videoInputEl = document.querySelector('#video-input')

const getDevices = async()=>{
  try{
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices)
    devices.forEach(d=>{
      const option = document.createElement('option') // option tag 생성
      option.value = d.deviceId
      option.text = d.label
      // 오른쪽 선택 항목에 방금 만든 옵션 태그를 추가
      if(d.kind === "audioinput"){
        audioInputEl.appendChild(option)
      }else if(d.kind === "audiooutput"){
        audioOutputEl.appendChild(option)
      }else if(d.kind === "videoinput"){
        videoInputEl.appendChild(option)
      }
    })
  }catch(err){
    console.log(err);
  }
}

const changeAudioInput = async(e)=>{
  //audio input 변경
  const deviceId = e.target.value;
  const newConstraints = {
    audio: {deviceId: {exact: deviceId}},
    video: true,
  }
  try{
    // 제약조건을 설정하기 위해선 새로운 스트림을 생성해서 적용해야함
    stream = await navigator.mediaDevices.getUserMedia(newConstraints);
    console.log(stream);
    const tracks = stream.getAudioTracks();
    console.log(tracks);
  }catch(err){
    console.log(err)
  }
}

const changeAudioOutput = async(e)=>{
  // html 내장 메소드
  // videoEL은 script.js에 정의한 비디오 태그
  await videoEl.setSinkId(e.target.value)
  console.log("오디오 디바이스 성공!")
}

const changeVideo = async(e)=>{
  //video input 변경
  const deviceId = e.target.value;
  const newConstraints = {
    audio: true,
    video: {deviceId: {exact: deviceId}},
  }
  try{
    // 제약조건을 설정하기 위해선 새로운 스트림을 생성해서 적용해야함
    stream = await navigator.mediaDevices.getUserMedia(newConstraints);
    console.log(stream);
    const tracks = stream.getVideoTracks();
    console.log(tracks);
  }catch(err){
    console.log(err)
  }
}

getDevices();