import { JsonPipe } from '@angular/common';
import { Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { Profile } from 'src/app/Model/Profile';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent  implements OnDestroy ,OnInit ,OnChanges  { 
// id:any
//   _InputUserId:any;
//   @Input() 
//   set InputUserId(value:any){

//     this._InputUserId = value
//   }
//   get InputUserId(){
//     return this._InputUserId
//   }
  id:any
  @Input() InputUserId:any;  //getting id from parent component through the all profile edit 
  //method 


  isEdit:boolean = false;
  updateUserId:string;
  subscription$:Subscription = new Subscription()

  profileForm:FormGroup ;
  imageData: string;
  profile:Profile[] = []

  constructor(
    private profileService: ProfileService,
    private activateRoute:ActivatedRoute,
    private toastService: ToastrService) {
    this.profileForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required)
    })
  }


  // when i am not calling edit method with viewchild i can use the input decorator value and 
  // edit the form , but still the optimum way is viewchild call
  ngOnChanges(changes: SimpleChanges): void {
    // this.id = changes['InputUserId'].currentValue;
    // console.log(changes['InputUserId'].currentValue,"Hello new value id ng onchanges ")


    // if(this.id){
    //   this.profileService.getbyid(this.id).subscribe((res)=>{
        
    //     if(res !== null){
          
    //     console.log(res,"onchages")
    //     this.isEdit = true;
    //     this.profileForm.patchValue(res);
    //     }
    //   })}
    

  }

  
 

  update(data:any ){
    console.log(data,'dsfsd')

    this.subscription$.add(
      // this.profileService.updateProfile(data.name , data.image ,this.id )
      this.profileService.updateProfile(data.name , data.image ,this.updateUserId )
    .subscribe({

      next: (res) => {

        this.toastService.success('record updated successfully');
        this.isEdit = false;
        this.profileService.getProfiles()
        this.profileForm.reset();
        this.imageData = '';

        this.profileService.subject$.next(`new item has been added ${Date.now()} ${res.name}`)
      },
      error: (error) => {
        this.toastService.error("Reuest Failed", error)
      }
    })

    )

  }

  submit(data: any) {
    console.log(data, 'datavalues')
    this.postData(data)
    // this.profileService.postProfiles(data.name, data.image)
    //   .subscribe({

    //     next: (res) => {

    //       this.toastService.success('record added successfully');
    //       this.profileService.getProfiles()
    //       this.profileForm.reset();
    //       this.imageData = '';

    //       this.profileService.subject$.next(`new item has been added ${Date.now()} ${res.imagePath}`)
    //     },
    //     error: (error) => {
    //       this.toastService.error("Reuest Faild", error)
    //     }
    //   })

}


  postData(data:any){

    this.subscription$.add(
      this.profileService.postProfiles(data.name, data.image)
    .subscribe({

      next: (res) => {

        this.toastService.success('record added successfully');
        this.profileService.getProfiles()
        this.profileForm.reset();
        this.imageData = '';

        this.profileService.subject$.next(`new item has been added ${Date.now()} ${res.profile.name}`)
      },
      error: (error) => {
        this.toastService.error("Reuest Failed", error)
      }
    })

    )
    

  }


  onFileSelect(event: Event) {
    //console.log("selecred",event)
    const file = (event.target as HTMLInputElement).files[0];

    this.profileForm.patchValue({ image: file });
    console.log(this.profileForm.value)
    const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"];

    //this code is for showing images below the input field
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }

  }


  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }



  //editing with the help  
  ngOnInit(): void {

    // editing and patching values with the help of subject 
    // this.profileService.editSubject$.subscribe((res)=>{
    //   if(res !== null){
    //     this.isEdit = true;
    //     this.updateUserId = res._id
    //     this.profileForm.patchValue(res);

  
    //   }
    // })


    // we ca also get values with routes
    // this.activateRoute.params.subscribe((params)=>{
    //   const id  = params['id']
    //   this.editUserMethod(id)
    // } )


  }


  // editing with the helo of  child and parent relation 
  editUserMethod(id:any){
    
    if (id) {
      this.updateUserId = id;
      this.profileService.getbyid(id).subscribe((res) => {
        console.log(res, "we got the data to patch")
        this.isEdit = true;
        this.profileForm.patchValue(res);

      })

    }
    // console.log(id,'dfdsf edituser method')
    // if(this.id !== null){
      
      // console.log('edit is clicked input decorator',this.id)
     
      // this.profileService.getbyid(this.InputUserId).subscribe((res)=>{
      //   this.isEdit = true
      //   this.profileForm.patchValue(res)
      // })
    }

    ngDoCheck(){
      // this.id = this.InputUserId
      // console.log(this.InputUserId,'cea')
    }


    editUserMethods(){
     console.log('edit called')
      // if (id) {
      //   this.updateUserId = id;
      //   this.profileService.getbyid(id).subscribe((res) => {
      //     console.log(res, "we got the data to patch")
      //     this.isEdit = true;
      //     this.profileForm.patchValue(res);
  
      //   })
  
      // }
      // console.log(id,'dfdsf edituser method')
      // if(this.id !== null){
        
        // console.log('edit is clicked input decorator',this.id)
       const id = this.InputUserId;
       this.updateUserId =this.InputUserId
       if(this.InputUserId){
        this.profileService.getbyid(this.InputUserId).subscribe((res)=>{
          if(res){
            this.profileForm.patchValue(res)
          }
          this.isEdit = true
          
        })
       }
        
      }
  


//using routes to get data 
    

    
  }

  

 




/*
>>>>>>>>>>>>>>>>>>old code subscriing in service

 constructor( private profileService: ProfileService ,
                private toastService:ToastrService          
    )
  {
    this.profileForm = new FormGroup({
      name: new FormControl(null),
      image:new FormControl(null)
    })
  }


  submit(data:any){
    console.log(data,'datavalues')
  //  console.log(this.profileForm.value.name)
  //  this.profileService.postProfiles(data.name,data.image)
    // need to understand this that submitting the data values or form values 
    // this.profileService.postProfiles(this.profileForm.value.name,this.profileForm.value.image)
          

  }

  onFileSelect(event:Event){
    //console.log("selecred",event)
    const file = (event.target as HTMLInputElement).files[0];
    
    this.profileForm.patchValue({image:file});
    console.log(this.profileForm.value)
    const allowedMimeTypes  = ["image/png","image/jpg","image/jpeg"];

    //this code is for showing images below the input field
    if(file && allowedMimeTypes.includes(file.type)){
      const reader  = new FileReader();
      reader.onload = ()=>{
        this.imageData  = reader.result as string;
      };
      reader.readAsDataURL(file);
    }

    
  }

  

}








*/