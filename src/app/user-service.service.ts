import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  userLoggedIn:boolean;
  message: string;
  peerId:string;
  constructor(private HttpClient: HttpClient) { 
    this.userLoggedIn = true;  
    this.message=""; 
    this.peerId="";
  }
  setMessage(data:string){
    this.message=data;
  }
  getMessage(){
    return this.message;
  }
  setPeerId(data:string){
    this.peerId=data;
  }
  getPeerId(){
    return this.peerId;
  }
  getUserLoggedIn(){
    return this.userLoggedIn;
  } 
  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  setUserLoggedIn(){
    this.userLoggedIn=true;
  }
  setUserLoggedOut(){
    this.userLoggedIn=false;
  }
  getStuDetails(loginForm:any){
    return this.HttpClient.get('http://localhost:3000/stu_login/'+ loginForm.email+"/"+loginForm.password);
  }
  getAdminDetails(loginForm:any){
    return this.HttpClient.get('http://localhost:3000/adm_login/'+ loginForm.email+"/"+loginForm.password);
  }
  getFacultyDetails(loginForm:any){
    return this.HttpClient.get('http://localhost:3000/fac_login/'+ loginForm.email+"/"+loginForm.password);
  }
  getCompDetails(){
    return this.HttpClient.get('http://localhost:3000/fetch_comp');
  }
  getIndivComp(cmpName:string){
    return this.HttpClient.get('http://localhost:3000/fetch_indiv_comp/'+cmpName);
  }
  getFacSlotDetails(){
    return this.HttpClient.get('http://localhost:3000/fetch_facData');
  }
  addStufb(fbForm:any){
    return this.HttpClient.post('http://localhost:3000/insert_stuFb',fbForm);
  }
  addCompTable(newCmp:string){
    return this.HttpClient.post('http://localhost:3000/addnewCmp/',newCmp);
  }
  addCompName(newCmp:string){
    return this.HttpClient.post('http://localhost:3000/insert_newCmp/',newCmp);
  }
  addInFacSlots(fac_slots:any){
    return this.HttpClient.post('http://localhost:3000/insertInfacSlot',fac_slots);
  }
  addInStuSlots(stu_slots:any){
    return this.HttpClient.post('http://localhost:3000/insert_stu_slots',stu_slots);
  }
  changePassword(userdetails:any){
    return this.HttpClient.put('http://localhost:3000/update_pwd/'+userdetails.email+"/"+userdetails.password,userdetails);
  }
  addSlots(fac_slots:any){
    return this.HttpClient.put('http://localhost:3000/update_slots/'+fac_slots.email,fac_slots);
  }
  bookSlot(booking:any){
    return this.HttpClient.put('http://localhost:3000/bookSlot/'+booking.email+"/"+booking.slot,booking);
  }
  checkUser(userForm:any){
    return this.HttpClient.get('http://localhost:3000/checkUser/'+userForm.role+"/"+userForm.email);
  }
  addUser(userForm:any){
    return this.HttpClient.post('http://localhost:3000/insert_user/',userForm);
  }
  checkCmp(cpForm:any){
    return this.HttpClient.get('http://localhost:3000/checkCmp/'+cpForm.newCmp);
  }
  getStuSlots(email:any){
    return this.HttpClient.get('http://localhost:3000/fetch_mySlots/'+email);
  }
  getmySlots(email:any){
    return this.HttpClient.get('http://localhost:3000/fetchMySlots/'+email);
  }
}
