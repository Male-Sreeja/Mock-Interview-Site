import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user:any;
  user1:any;
  role:any;
  role1:any;
  show=false;
  fac_slots:any;
  open=false;
  mySlots:any;
  slottime:Date;
  constructor(private router:Router,private service:UserServiceService) {
    this.slottime = new Date();
   }

  ngOnInit(): void {
    this.user=localStorage.getItem("Users");
    this.user1 = JSON.parse(this.user);
    this.role=localStorage.getItem("Role");
    this.role1=JSON.parse(this.role);
    this.service.getmySlots(this.user1.email).subscribe((result)=>{this.mySlots=result;
      console.log("My Slot Details");
      console.log(this.mySlots);
    });
  }
  isAdmin():boolean{
    if(this.role1==='Admin'){
      return true;
    }
    return false;
  }
  isFaculty():boolean{
    if(this.role1==='Faculty'){
      return true;
    }
    return false;
  }
  isStudent():boolean{
    if(this.role1==="Student"){
      return true;
    }
    return false;
  }
  viewTo(){
    if(this.role1==='Faculty' || this.role1==='Admin'){
      this.router.navigateByUrl("/fac_view")
    }
    if(this.role1==='Student'){
      this.router.navigateByUrl("/stu_view");
    }
  }
  showForm(){
    this.show=true;
  }
  closeForm(){
    this.show=false;
  }
  checkUser(userForm:any){
    console.log(userForm);
    this.service.checkUser(userForm).subscribe((result:any)=>this.addUser(result,userForm));
  }
  addUser(result:any,userForm:any){
    if(result!=null){
      alert("User already exists");
    }
    if(result===null){
      this.fac_slots = {'email':userForm.email,'name':userForm.name,'slots':[]};
      this.service.addUser(userForm).subscribe();
      if(userForm.role==='faculty'){
        this.service.addInFacSlots(this.fac_slots).subscribe();
      }
      
      alert("user added");
    }
  }
  openBar(){
    this.open=true;
  }
  closeBar(){
    this.open=false;
  }
  isPastTime(datetime:string):Boolean{
    this.slottime = new Date(datetime);
    console.log("Checkkkkk");
    console.log(datetime);
    const now: Date = new Date();
    const differenceInMs: number = now.getTime() - this.slottime.getTime();
    const differenceInMinutes: number = Math.floor(differenceInMs / (1000 * 60));
    if((this.slottime.getTime()<new Date().getTime()) && differenceInMinutes<60){
      return true;
    }
    return false;
  }
  isFutureTime(datetime:string):Boolean{
    this.slottime = new Date(datetime);
    return (this.slottime.getTime()>new Date().getTime());
  }
  isDisable(datetime:string):Boolean{
    if(!this.isPastTime(datetime) && !this.isFutureTime(datetime)){
      return true;
    }
    return false;
  }
  joinCall(){
    this.router.navigateByUrl("/call");
  }
}
