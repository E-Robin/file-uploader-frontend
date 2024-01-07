import { Component, ViewChild } from '@angular/core';
import { CreateProfileComponent } from '../components/create-profile/create-profile.component';
import { AllProfilesComponent } from '../components/all-profiles/all-profiles.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  viewchildId:any;  // we are sending the id to create component form 
  @ViewChild (CreateProfileComponent) create :CreateProfileComponent;
  @ViewChild (AllProfilesComponent) allProfile:AllProfilesComponent;
  title = 'frontend';


  // editUser(data:any){
  //   console.log(this.viewchildId,'before id')

  //   this.viewchildId = data;
  //   console.log(this.viewchildId ,'after id')
  //   // this.viewchildId = data;
  //   console.log(this.viewchildId,'idd')
  //   // this.create.editUserMethod()
    
  // }


  // new use case without input decorator i can pass direclty values to the method;
   editUser(data:any){
    console.log(this.viewchildId,'before id')

    this.viewchildId = data;
    setTimeout( ()=>{this.create.editUserMethods()},10  )
    // this.create.editUserMethods()
    console.log(this.viewchildId ,'after id')
    // this.viewchildId = data;
    console.log(this.viewchildId,'idd')
    // this.create.editUserMethod(data)
    
  }

  
}



