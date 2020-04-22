import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddskillComponent } from './addskill/addskill.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AllskillsComponent } from './allskills/allskills.component';
import { MyskillsComponent } from './myskills/myskills.component';
import { DetailsComponent } from './details/details.component'
import { UserprofileComponent} from './userprofile/userprofile.component'

export const routes: Routes = [
  {path : '' , redirectTo:'home', pathMatch:'full'},
  {path : 'home' , component:HomeComponent},
  {path : 'addskill' , component:AddskillComponent},
  {path : 'login' , component:LoginComponent},
  {path : 'register' , component:RegisterComponent},
  {path : 'allskills' , component:AllskillsComponent},
  {path : 'myskills' , component:MyskillsComponent},
  {path : 'details/:id' , component:DetailsComponent},
  {path : 'profile' , component:UserprofileComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
