import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, debounceTime, delay, filter, take } from 'rxjs';
import { Profile } from 'src/app/Model/Profile';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-all-profiles',
  templateUrl: './all-profiles.component.html',
  styleUrls: ['./all-profiles.component.scss']
})
export class AllProfilesComponent  implements OnInit, OnDestroy {



 @Output() editUser:EventEmitter<string> = new EventEmitter()
  updateUserData:any;

  profile$:Observable<Profile[]>
  subscription$ = new Subscription()

  isDelete:boolean = false;
  profiles :Profile[] =[] 
  constructor(private service:ProfileService,private toastService:ToastrService ,
      private router:Router
    
    ){

  }
  ngOnInit(): void {
    // this.router.navigateByUrl('')

  this.subscription$.add(
    this.getProfilesData()
  )

    // this.getProfilesData()
    
    //below code is for testing as suject observable automatically updates its values
    this.service.getSubject().subscribe((res)=>{
      console.log(res, "subject from all profiles")
    })
    
  }



  getProfilesData(){
      
    console.log('post call initiated')
    this.service.getProfiles()
    
    this.profile$  = this.service.getProfilesStream()

    // this below code i can use but new code is good to use with async autosubscribe 

    // this.service.getProfilesStream().subscribe((res:Profile[])=>{
    //   this.profiles = res
    //   console.log(res,'profiles got in all-profile component with subject')
    // } )

  }



  Delete(id: any){
    this.isDelete = true;

    this.subscription$.add(
      this.service.delete(id).pipe()
      .subscribe(
       {
       next:  (res)=>{
         this.getProfilesData();
         this.toastService.success("Record has been Deleted Successfully")
         setTimeout(()=>{this.isDelete=false},1000)
        },
 
        error: (err)=> {
          this.toastService.error("Unable to delete",err)
        }
     })
    )
   

  }

  Edit(id:any){

    // this.router.navigateByUrl('profile/'+id)
    this.editUser.emit(id)
    // here i am only sending the id , rest process will be done in all-profile component


    // editing with subject   here i am first getting data of user and then sending it to 
    //create component

    // this.service.getbyid(id).subscribe((res)=>{
    //   console.log(res , "single user")
    //   this.updateUserData = res;
    //   this.service.editSubject$.next(res)
    // })


  }


  ngOnDestroy(){
    this.subscription$.unsubscribe()
  }


}












/*
?>>>>>>>>>>>>>>>>>>>>>>>>>>>old code

import { Component, OnInit } from '@angular/core';
import { filter, take } from 'rxjs';
import { Profile } from 'src/app/Model/Profile';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-all-profiles',
  templateUrl: './all-profiles.component.html',
  styleUrls: ['./all-profiles.component.scss']
})
export class AllProfilesComponent  implements OnInit {

  profiles :Profile[] =[] 
  constructor(private service:ProfileService ){

  }
  ngOnInit(): void {
    this.service.getProfiles()
    // this.service.profile$.subscribe((res)=>this.profiles = res)
    this.service.getProfilesStream().subscribe((res:Profile[])=>{
      this.profiles = res
      console.log(res,'profiles got in all-profile component with subject')
    } )
  }

  Delete(id: any){
    this.service.delete(id)
    

  }


}

*/