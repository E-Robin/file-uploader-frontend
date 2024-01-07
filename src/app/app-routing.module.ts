import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllProfilesComponent } from './components/all-profiles/all-profiles.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  }
// {
  
//   path:'profile/:id' , component:CreateProfileComponent
  
// },{
//   path:':id' , component:HomeComponent
// }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
