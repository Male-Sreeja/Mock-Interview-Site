import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserServiceService } from '../user-service.service'; 
@Component({
  selector: 'app-edit-or-view',
  templateUrl: './edit-or-view.component.html',
  styleUrls: ['./edit-or-view.component.css']
})
export class EditOrViewComponent implements OnInit {
  message:any;
  cmp_fb:any;
  stu_newfb:any;
  show=false;
  ques:string='';
  questions: string[] = [];
  // private route: ActivatedRoute = new ActivatedRoute;
  constructor(private router:Router,private service:UserServiceService) { 
    this.message=this.service.getMessage();
    this.stu_newfb={cmpName:this.message,rollno:"",domains:"",Sugg:""};
    console.log(this.message);
    // this.route.snapshot.params.msg;
    // console.log("************");
    // console.log(this.route.snapshot.params.msg);
  }

  ngOnInit(): void {
    this.service.getIndivComp(this.message).subscribe((result)=>{this.cmp_fb=result;
    console.log(this.cmp_fb)
  });
  }
  showForm(){
    this.show=true;
  }
  closeForm(){
    this.show=false;
  }
  addFb(fbForm:any){
    this.stu_newfb.rollno=fbForm.rollno;
    this.stu_newfb.domains=fbForm.domains;
    this.stu_newfb.Sugg=fbForm.Sugg;
    fbForm.questions=this.questions;
    fbForm.cmpName=this.message;
    // this.stu_newfb.questions=this.questions;
    console.log(fbForm);
    this.service.addStufb(fbForm).subscribe();
  }
  addQues(quest:any){
    this.questions.push(quest.ques);
    alert(quest.ques);
    console.log(this.questions);
    
  }
  
}
