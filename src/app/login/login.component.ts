import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service'; 
import { NavigationEnd, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';

// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:String;
  role:String;
  password:String;
  flag:boolean;
  up_flag=false;
  user:any;
  show=false;
  chg_Pwd:any;
  constructor(private router:Router,private service:UserServiceService,private Location:LocationStrategy) {
    history.pushState(null,' ',window.location.href);
    this.Location.onPopState(() => {

      history.pushState(null,' ', window.location.href);
      
      });
    this.chg_Pwd={'email':'','password':'','newPwd':''};
     
   this.email='';
   this.role='';
   this.password='';
   this.flag=false;
   }

  ngOnInit(): void {
  }
  loginSubmit(loginForm:any):void{
    this.email = loginForm.email;
    this.password=loginForm.password;
    this.role=loginForm.role;
    console.log(loginForm.email);
    console.log(loginForm.password);
    console.log(loginForm.role);
    if(loginForm.role==='Student'){
      this.service.getStuDetails(loginForm).subscribe((result:any)=>this.checkCred(result));
      // alert("Reached");
    }
    if(loginForm.role==='Admin'){
      // alert("Raeched Admin");
      this.service.getAdminDetails(loginForm).subscribe((result:any)=>this.checkCred(result));
    }
    if(loginForm.role==='Faculty'){
      this.service.getFacultyDetails(loginForm).subscribe((result:any)=>this.checkCred(result));
    }
  }
    checkCred(users:any){
      console.log(users);
      if(users==null){
        alert("Invalid username or password");
      }
      console.log("---------");
      console.log(users.email);
      console.log(users.password);
      console.log(this.email);
      console.log(this.password);
      console.log("---------");
     if(users.email===this.email || users.password===this.password){
         //  alert("Logged in");
         this.flag=true;
         this.user=users;
         localStorage.setItem('Users',JSON.stringify(this.user));
         localStorage.setItem('Role',JSON.stringify(this.role));
        //  alert("Logged In");
          this.router.navigateByUrl('/homepage');
     }
     if(this.flag==false){
          alert("Incorrect password or email");
     }
    }
    showForm(){
      this.show=true;
    }
    closeForm(){
      this.show=false;
    }
    upPwd(chgPwd:any):void{
      this.chg_Pwd.email = chgPwd.email;
    this.chg_Pwd.password=chgPwd.password;
    this.chg_Pwd.newPwd=chgPwd.newPwd;
    if(this.chg_Pwd.newPwd===chgPwd.cnfmPwd){
      this.service.getStuDetails(chgPwd).subscribe((result:any)=>this.recheckPwd(result));
    }
    if(this.chg_Pwd.newPwd!==chgPwd.cnfmPwd){
      alert("Re-confirm your password");
    }
    }
    recheckPwd(result:any){
      if(result===null){
        alert("Invalid email or password");
      }
      if(result.email===this.chg_Pwd.email || result.password===this.chg_Pwd.password){
        this.up_flag=true;
        this.service.changePassword(this.chg_Pwd).subscribe();
        alert("Your password successfully updated");
      }
      if(this.up_flag===false){
        alert("Invalid username or password");
      }
      
    }
  }


