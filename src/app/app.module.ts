import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CompaniesComponent } from './companies/companies.component';
import { EditOrViewComponent } from './edit-or-view/edit-or-view.component';
import { FacViewComponent } from './fac-view/fac-view.component';
import { StuViewComponent } from './stu-view/stu-view.component';
import { VideoCallComponent } from './video-call/video-call.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    CompaniesComponent,
    EditOrViewComponent,
    FacViewComponent,
    StuViewComponent,
    VideoCallComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
