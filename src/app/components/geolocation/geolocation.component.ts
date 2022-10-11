import { Component, OnInit } from '@angular/core';
import Navigator from 'src/app/libs/helpers/navigator.helper';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss']
})
export class GeolocationComponent implements OnInit {

  constructor() { }

  position: any={}
  error : any={}
  time !: any
  ngOnInit(): void {
    this.getDevices()
  }

  getLocation(){
    //  Navigator.getLocation().then(position =>{
    //   console.log(position)
    //  }).catch( error =>{
    //   console.log(error)
    //  })
      Navigator.getLocationC((position)=>{
        console.log(position)
        this.position={
          lat:position.coords.latitude,
          lon:position.coords.longitude
        }
        // this.time = new Date(position.timestamp).toLocaleDateString();
        this.time = position.timestamp
      },(error)=>{
        console.log(error)
      })

  }

  onSubmit(){
    console.log(this.position,this.time)
  }

  startRecord(video: HTMLVideoElement, stop: HTMLElement){
    console.log(video)
    Navigator.startRecord(video,stop)
  }

  audioRecord(audio: HTMLAudioElement, stop: HTMLElement){
      console.log(audio)
      Navigator.startAudio(audio,stop)
  }

  getDevices(){
    Navigator.getDevices()
  }

}
