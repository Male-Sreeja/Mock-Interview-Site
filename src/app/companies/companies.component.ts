import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserServiceService } from '../user-service.service'; 
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  // com:any;
  message:string;
  companies:any;
  rows:any;
  n_rw:any;
  idx:any;
  n:any;
  user:any;
  user1:any;
  role:any;
  role1:any;
  show=false;
  constructor(private router:Router,private service:UserServiceService) {
    this.idx=-1;
    this.message="Hi";
    // this.service.getCompDetails().subscribe((result)=>{this.companies=result;});
    // this.service.getCompDetails().subscribe((result:any)=>this.displayCards(result));
    
    // this.com = [{name:'capgemini'},{name:'infosys'},{name:'tcs'},{name:'statestreet'},
    // {name:'micron'},{name:'dbs'},{name:'oracle'}]
    // console.log(this.com.length);
   }
  //  displayCards(companies:any):any{
  //    console.log(companies);
  //    console.log(Object.keys(companies).length);
  //  }
  ngOnInit(): void {
    this.user=localStorage.getItem("Users");
    this.user1 = JSON.parse(this.user);
    this.role=localStorage.getItem("Role");
    this.role1=JSON.parse(this.role);
    console.log("ROLE");
    console.log(this.role1);
    console.log(this.user1);
    this.service.getCompDetails().subscribe((result)=>{this.companies=result;
    console.log(this.companies);
    console.log(this.companies[0]);
    console.log(Object.keys(this.companies).length);
    this.n =  Object.keys(this.companies).length;
    this.n_rw = Math.ceil(this.n/4);
    this.rows = Array(this.n_rw).fill(1).map((x,i)=>i);
    console.log(this.n);
    console.log(this.rows);
    console.log("---------###");
    
    });
    
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }
  cmpName():string{
    console.log(this.companies);
    this.idx+=1;
    console.log("----------------");
    console.log(this.idx);
    console.log(this.companies[this.idx].comp_name)
    return this.companies[this.idx].comp_name;
  }
  cmpIndex():number{
    return this.idx+1;
  }
  cmpy_info(msg:number):void{
    this.service.setMessage(this.companies[msg].comp_name);
    this.router.navigateByUrl("/edit");
    // console.log(this.cmpName());
  }
  isAdmin():boolean{
    if(this.role1==='Admin'){
      return true;
    }
    return false;
  }
  
  showForm(){
    this.show=true;
  }
  closeForm(){
    this.show=false;
  }
  checkCmp(cpForm:any){
    this.service.checkCmp(cpForm).subscribe((result)=>this.addCmp(result,cpForm));
  }
  addCmp(result:any,cpForm:any):void{
    if(result!==null){
      alert(cpForm.newCmp+ ' already exists');
    }
    if(result===null){
    this.service.addCompTable(cpForm).subscribe();
    this.service.addCompName(cpForm).subscribe();
    alert(cpForm.newCmp + '  added succesfully');
    }
  }
}
