import { Component, OnInit,Input } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { DatePipe,CommonModule } from '@angular/common';

@Component({
  selector: 'app-fac-view',
  templateUrl: './fac-view.component.html',
  styleUrls: ['./fac-view.component.css']
})
export class FacViewComponent implements OnInit {
  user:any;
  user1:any;
  role:any;
  role1:any;
  show=false;
  fac_slots:any;
  slot:any;
  details:any;
  open=false;
  mySlots:any;
  slottime:Date;
  constructor(private service:UserServiceService,private router:Router) {
    this.fac_slots = {'email':"",'slots':[]};
    this.slot={'datetime':'','isBooked':false};
    this.slottime = new Date();
   }

  ngOnInit(): void {
    this.user=localStorage.getItem("Users");
    this.user1 = JSON.parse(this.user);
    this.role=localStorage.getItem("Role");
    this.role1=JSON.parse(this.role);
    this.fac_slots.email=this.user1.email;
    this.service.getFacSlotDetails().subscribe((result)=>{this.details=result;
      console.log("details");
      console.log(this.details);
    });
    this.service.getmySlots(this.user1.email).subscribe((result)=>{this.mySlots=result;
      console.log("My Slot Details");
      console.log(this.mySlots);
    });
  }
  showForm(){
    this.show=true;
  }
  closeForm(){
    this.show=false;
  }
  addSlots(slotsForm:any){
    this.slot.datetime = slotsForm.slot;
    this.fac_slots.slots = this.slot;
    this.service.addSlots(this.fac_slots).subscribe();
    console.log("Check");
    console.log(this.fac_slots);

    alert("Slots Added");
  }
  joinCall(){
    this.router.navigateByUrl("/call");
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
  isAdmin(){
    return this.role1 === 'Admin';
  }
  
}
