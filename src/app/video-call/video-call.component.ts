import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import Peer from 'peerjs';
import {DOCUMENT} from '@angular/common'
import { UserServiceService } from '../user-service.service';
@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit {
  private peer: Peer;
  peerIdShare: string;
  peerId: string;
  private lazyStream: any;
  currentPeer: any;
  user:any;
  user1:any;
  role:any;
  role1:any;
  private peerList: Array<any> = [];

  constructor(private service:UserServiceService) {
    this.peer = new Peer();
    this.peerIdShare='';
    this.peerId='';
  }

  ngOnInit(): void {
    this.getPeerId();
    this.user=localStorage.getItem("Users");
    this.user1 = JSON.parse(this.user);
    this.role=localStorage.getItem("Role");
    this.role1=JSON.parse(this.role);
    alert(this.role1);
  }
  isFaculty():Boolean{
    return this.role1==='Faculty';
  }
  isStudent():Boolean{
    return this.role1==='Student';
  }
  private getPeerId = () => {
    this.peer.on('open', (id) => {
      this.peerId = id;
    });

    this.peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then((stream) => {
        this.lazyStream = stream;

        call.answer(stream);
        call.on('stream', (remoteStream) => {
          if (!this.peerList.includes(call.peer)) {
            this.streamRemoteVideo(remoteStream);
            this.currentPeer = call.peerConnection;
            this.peerList.push(call.peer);
          }
        });
      }).catch(err => {
        console.log(err + 'Unable to get media');
      });
    });
  }

  connectWithPeer(): void {
    this.callPeer(this.peerIdShare);
  }

  private callPeer(id: string): void {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then((stream) => {
      this.lazyStream = stream;

      const call = this.peer.call(id, stream);
      call.on('stream', (remoteStream) => {
        if (!this.peerList.includes(call.peer)) {
          this.streamRemoteVideo(remoteStream);
          this.currentPeer = call.peerConnection;
          this.peerList.push(call.peer);
        }
      });
    }).catch((err:Error) => {
      console.log(err + 'Unable to connect');
    });
  }

  private streamRemoteVideo(stream: any): void {
    const video = document.createElement('video');
    video.classList.add('video');
    video.srcObject = stream;
    video.play();

    var box=document.getElementById('remote-video') as HTMLDivElement | null;
    box?.append(video)
    
  }

  screenShare(): void {
    this.shareScreen();
  }

  private shareScreen(): void {
    // @ts-ignore
    navigator.mediaDevices.getDisplayMedia({
      video: {
        
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true
      }
    }).then((stream:any) => {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.onended = () => {
        this.stopScreenShare();
      };

      const sender = this.currentPeer.getSenders().find((s: { track: { kind: string; }; }) => s.track.kind === videoTrack.kind);
      sender.replaceTrack(videoTrack);
    }).catch((err:Error) => {
      console.log('Unable to get display media ' + err);
    });
  }

  private stopScreenShare(): void {
    const videoTrack = this.lazyStream.getVideoTracks()[0];
    const sender = this.currentPeer.getSenders().find((s: { track: { kind: any; }; }) => s.track.kind === videoTrack.kind);
    sender.replaceTrack(videoTrack);
  }
  sharePeerId(peerId:string){
    alert(peerId);
    this.service.setPeerId(peerId);
    localStorage.setItem('Id',peerId);
  }
  get_Peer_Id(){
    var Id = this.service.getPeerId();
    alert("Please Enter following Id to join the call  " + localStorage.getItem('Id'));
  }
}



