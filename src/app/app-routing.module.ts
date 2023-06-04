import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CompaniesComponent } from './companies/companies.component';
import { EditOrViewComponent } from './edit-or-view/edit-or-view.component';
import { StuViewComponent } from './stu-view/stu-view.component';
import { FacViewComponent } from './fac-view/fac-view.component';
import { AuthGuard } from './services/auth.guard';
import { VideoCallComponent } from './video-call/video-call.component';
const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"homepage",component:HomepageComponent},
  {path:"companies",component:CompaniesComponent},
  {path:"edit",component:EditOrViewComponent},
  {path:"login",component:LoginComponent},
  {path:"stu_view",component:StuViewComponent},
  {path:"fac_view",component:FacViewComponent},
  {path:'call',component:VideoCallComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
