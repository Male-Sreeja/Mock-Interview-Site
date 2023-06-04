import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-stu-view',
  templateUrl: './stu-view.component.html',
  styleUrls: ['./stu-view.component.css']
})
export class StuViewComponent implements OnInit {
  user:any;
  user1:any;
  role:any;
  role1:any;
  details:any;
  booking:any;
  stu_slots:any;
  open=false;
  mySlots:any;
  isFutureDate:boolean;
  slottime:Date;
  otherDate:Date = new Date('2023-04-22T21:49');
  constructor(private service :UserServiceService,private router:Router) { 
    this.booking={'email':"","slot":""};
    this.stu_slots={"email":"","name":"","slot":"",'fac_name':""};
    this.isFutureDate = this.otherDate.getTime() === new Date().getTime();
    this.slottime=new Date();

    
  }

  ngOnInit(): void {
    this.user=localStorage.getItem("Users");
    this.user1 = JSON.parse(this.user);
    this.role=localStorage.getItem("Role");
    this.role1=JSON.parse(this.role);
    console.log(this.user1);
    this.stu_slots.email=this.user1.email;
    this.stu_slots.name = this.user1.name;
    this.service.getFacSlotDetails().subscribe((result)=>{this.details=result;
      console.log("details");
      console.log(this.details);
    });
    this.service.getStuSlots(this.user1.email).subscribe((result)=>{this.mySlots=result;
    console.log("MySlots");
    console.log(this.mySlots);
    });
  }
  bookSlot(fac_email:string,datetime:string,isBooked:string,fac_name:string){
    this.stu_slots.fac_name=fac_name;
    this.booking.email=fac_email;
    this.booking.slot=datetime;
    this.stu_slots.slot = datetime;
    if(confirm("Are you sure want to book the slot "+datetime + " with faculty "+fac_name)){
      this.service.bookSlot(this.booking).subscribe();
    this.service.addInStuSlots(this.stu_slots).subscribe();
    alert("You have successfully booked your slot with "+fac_name+"on "+datetime);
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
  joinCall(datetime:string){
    this.slottime = new Date(datetime);
    if(confirm("You are about to join the call")){
      this.router.navigateByUrl('/call');
    }
  }
  isDisable(datetime:string):Boolean{
    if(!this.isPastTime(datetime) && !this.isFutureTime(datetime)){
      return true;
    }
    return false;
  }
}
