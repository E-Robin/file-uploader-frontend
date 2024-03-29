import { AfterContentInit, AfterViewInit, Component, DoCheck, ViewChild } from '@angular/core';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { AllProfilesComponent } from './components/all-profiles/all-profiles.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  
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
    console.log(this.viewchildId ,'after id')
    // this.viewchildId = data;
    console.log(this.viewchildId,'idd')
    this.create.editUserMethod(data)
    
  }

  
}
