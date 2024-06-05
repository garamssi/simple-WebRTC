
const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
console.log(supportedConstraints);

const changeVideoSize = ()=>{
  stream.getVideoTracks().forEach(track=>{
    // 비디오 트랙
    // .getCapabilities()을 통해서 capabilities 가져올 수 있다.
    // 새로운 constraints 생성하여 applyConstraints(); 메소드로 적용 가능
    const capabilities = track.getCapabilities()
    const height = document.querySelector('#vid-height').value
    const width = document.querySelector('#vid-width').value
    const vConstraints = {
      height: {exact: height < capabilities.height.max ? height : capabilities.height.max},
      width: {exact: width < capabilities.width.max ? width : capabilities.width.max},
      // height : height,
      // width : width,
      // frameRate: 5,
      // aspectRatio: 10,
    }
    track.applyConstraints(vConstraints)
  })

  // stream.getTracks().forEach(track=>{
  //     const capabilities = track.getCapabilities()
  //     console.log(capabilities);
  // })
}

