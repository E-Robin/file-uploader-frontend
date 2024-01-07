import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../Model/Profile';
import { Observable, Subject, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profilesArray:Profile[]=[];
  profile$ = new Subject<Profile[]>();

  subject$ = new Subject<string>();

  editSubject$ = new Subject<any>()

  readonly url = "http://localhost:3000/api/profiles";

  constructor( private http:HttpClient , private toastService:ToastrService) {

  }

  getProfiles()  {
    //here for same thing we are mapping additionaly to get the array of data out from the object
      this.http.get<{profiles:Profile[]}>(this.url).pipe(map((profileData)=>{
      return profileData.profiles
      // with this i am directly geting profile Array not object of profiles
    }))
    .subscribe( (profiles)=> {
      this.profilesArray = profiles
      
      // this.profile$.next(profiles)
      this.profile$.next(this.profilesArray)
      this.subject$.next(`get calls added ${Date.now()}`)
    })
  }




  postProfiles(name:string,image:File):Observable<{ profile: Profile }> {

    const profileData = new FormData();
    profileData.append("name",name);
    profileData.append("image", image, name );
    return this.http.post<{ profile: Profile }>(this.url,profileData)

  }




  getProfilesStream() :Observable<Profile[]> {

    return this.profile$.asObservable();

  }



  delete(id: string) {
    
    return  this.http.delete(`http://localhost:3000/api/profiles/${id}`)

  }


  getbyid(id:any){
    return this.http.get(`http://localhost:3000/api/profiles/${id}`)

  }

  updateProfile(name:string,image:File ,id:string):Observable<Profile > {

    const profileData = new FormData();
    profileData.append("name",name);
    profileData.append("image", image, name);
    return this.http.patch<Profile >(`http://localhost:3000/api/profiles/${id}`,profileData)

  }
  

  getSubject(){
    return this.subject$;
  }

}





/*
Old code ...>>>>>>>>>>>>>>>>>>>>>>>>


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../Model/Profile';
import { Observable, Subject, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profilesArray:Profile[]=[];
  profile$ = new Subject<Profile[]>();

readonly url = "http://localhost:3000/api/profiles"

  constructor( private http:HttpClient , private toastService:ToastrService) {

  }

  // getProfiles(){
  //    this.http.get<Profile[]>(this.url).subscribe((res)=>{
  //     this.profiles = res;
  //     this.profile$.next(this.profiles)
  //    })
  // }


  getProfiles() :void{
    //here for same thing we are mapping additionaly to get the array of data out from the object
     this.http.get<{profiles:Profile[]}>(this.url).pipe(map((profileData)=>{
      return profileData.profiles
      // with this i am directly geting profile Array not object of profiles
    })).subscribe( (profiles)=> {
      this.profilesArray = profiles
      
      // this.profile$.next(profiles)
      this.profile$.next(this.profilesArray)
    })
  }


  // postProfiles(name:string,image:File) :void{
  //   // console.log('file detail',image)
  //   const profileData = new FormData();
  //   profileData.set("name",name);
  //   profileData.set("image", image , name);

  //   // console.log('profile data is ',profileData)
  //   //Here in below i can directly get profile type reult but i create object of profile to get 
  //   //Profile so it depend which type of data you want to receive
  //   this.http.post<{ profile: Profile }>(this.url, profileData)
  //     .subscribe({

  //       next: (profileData) => {
  //         const profile: Profile = {
  //           _id: profileData.profile._id,
  //           name: name,
  //           imagePath: profileData.profile.imagePath,
  //         };
          
  //         console.log('Post data is ', profile)
  //         this.toastService.success('record added successfully')
  //         this.getProfiles()

  //       },

  //       error: (error) => {
  //         this.toastService.error("Reuest Faild", error)
  //       }
  //             })
  // }
    
      

  postProfiles(name:string,image:File):Observable<Profile> {

    const profileData = new FormData();
    profileData.append("name",name);
    profileData.append("image", image, name );
    return this.http.post<Profile>(this.url,profileData)

  }




  getProfilesStream() :Observable<Profile[]> {

    return this.profile$.asObservable();

  }



  delete(id: string) :void{
    
     this.http.delete(`http://localhost:3000/api/profiles/${id}`)
     .subscribe(
      {
      next:  (res)=>{
        this.getProfiles();
        this.toastService.success("Record has been Deleted Successfully")
       },

       error: (err)=> {
         this.toastService.error("Unable to delete",err)
       }
    })
  }
  

}





*/