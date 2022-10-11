

export default class Navigator{


    static getLocation():Promise<any>{
        // let options: any={
        //   timeout: 5,
    
        // }

        return new Promise((resolve,reject)=>{
          navigator.geolocation.getCurrentPosition((pos)=>{
            //console.log('respuesta',pos)
            resolve(pos)
          },(error)=>{
            reject(error)
            //console.log("error",error)
          })
        })
        
    }

    static getLocationC(success: (key:any)=>void,error :(err:any)=>void){
        navigator.geolocation.getCurrentPosition((position)=>{
            success(position)
        },
        err =>{
          error(err)
        })
    }

    static startRecord(videoElement : HTMLVideoElement,stop: HTMLElement){
      navigator.mediaDevices.getUserMedia({
        video:{
          width: 800,
          height: 600,
          deviceId :{
          exact: "b7e442ec699c812160f21fa1edb107e7946ecfd38b7b996af7b6a69e8fcf90d7"
          
          }
        },
        audio:true
      }).then(mediStream =>{
        console.log(mediStream)
        videoElement.srcObject=mediStream
        videoElement.onloadedmetadata=resp=>{
          
          videoElement.play()
          let data: any[]=[]
          const recorder = new MediaRecorder(mediStream,{
            mimeType: 'video/webm'
          })
          recorder.ondataavailable= (ev)=>{
            console.log("onDataAvailable")
            data.push(ev.data)
          }
          recorder.onstop = ()=>{
            console.log("onStopAvailable")
             const blob = new Blob(data,{
              type: 'video/webm'
             })
             const url= URL.createObjectURL(blob)
             const a = document.createElement('a')
             document.body.appendChild(a)
             a.href=url
             a.download= "video.webm"
             a.click()
             console.log(url)
            //  const reader = new FileReader()
            //  reader.readAsDataURL(blob)
            //  reader.onloadend = ()=>{
            //   console.log(reader.result)
            //  }
             //console.log(URL.createObjectURL(blob))
          }
          setTimeout(()=>{
            console.log("toStart")
            recorder.start()
          },10)
          stop.addEventListener('click',()=>{
            console.log("toStop")
            recorder.stop()
          })
          // setTimeout(()=>{
            
          // },1000)
        }
      })
    }

    static getDevices(){
      navigator.mediaDevices.enumerateDevices()
      .then(devices =>{
        devices.forEach(item =>{
          if(item.kind === "videoinput"){
            console.log(item)
          }
          
        })
      })
      
    }

    static startAudio(audio: HTMLAudioElement,stop: HTMLElement){
      navigator.mediaDevices.getUserMedia(
        {
          audio: true
        }
      ).then(mediStream =>{
        console.log(mediStream)
        audio.srcObject=mediStream
        audio.onloadedmetadata=resp=>{
          
          audio.play()
          let data: any[]=[]
          const recorder = new MediaRecorder(mediStream,{
            mimeType: 'audio/webm'
          })
          recorder.ondataavailable= (ev)=>{
            console.log("onDataAvailable")
            data.push(ev.data)
          }
          recorder.onstop = ()=>{
            console.log("onStopAvailable")
             const blob = new Blob(data,{
              type: 'audio/webm'
             })
             const url= URL.createObjectURL(blob)
             const a = document.createElement('a')
             document.body.appendChild(a)
             a.href=url
             a.download= "audio.webm"
             a.click()
             console.log(url)
            //  const reader = new FileReader()
            //  reader.readAsDataURL(blob)
            //  reader.onloadend = ()=>{
            //   console.log(reader.result)
            //  }
             //console.log(URL.createObjectURL(blob))
          }
          setTimeout(()=>{
            console.log("toStart")
            recorder.start()
          },10)
          stop.addEventListener('click',()=>{
            console.log("toStop")
            recorder.stop()
          })
          // setTimeout(()=>{
            
          // },1000)
        }
      })
    }
}