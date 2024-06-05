const shareScreen = async()=>{

  const options = {
    video: true,
    audio: false,
    surfaceSwitching: 'include', //include or exclude 로 지정
  }
  try{
    //
    mediaStream = await navigator.mediaDevices.getDisplayMedia(options);
  }catch(err) {
    console.log( err );

  }
}