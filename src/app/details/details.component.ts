import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  detailsForm:FormGroup;
  detailsList=["Manisha"];

  constructor(private formbuilder:FormBuilder) { 
    this.detailsForm=this.formbuilder.group({
      name:new FormControl('',Validators.compose([Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z\s]+$/)])),
      email:new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])),
      mobileNo:new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[1-9]{1}[0-9]{9}$/)])),
      dob:new FormControl('',Validators.compose([Validators.required])),
      gender:new FormControl('',Validators.compose([Validators.required])),
      qualification:new FormControl('',Validators.compose([Validators.required])),
      address:new FormArray([
        this.formbuilder.group({
          id:new FormControl(1),
          city:new FormControl('',Validators.compose([Validators.required])),
          state:new FormControl('',Validators.compose([Validators.required])),
          pincode:new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]{6}$/)]))
        })
      ]),
      // languagesKnown:new FormControl('',Validators.requiredTrue),
      about:new FormControl(''),
      uploadResume:new FormControl('',Validators.compose([Validators.required]))

    })
  }

  ngOnInit(): void {
  }

  
  public get addressesasformarray() : FormArray {
    return this.detailsForm.get('address') as FormArray;
  }
  

  addAddress(){
this.addressesasformarray.push(this.getAddressFormGroup());
  }

  getAddressFormGroup():FormGroup{
    return this.formbuilder.group({
      id:new FormControl(this.addressesasformarray.controls.length +1),
      city:new FormControl('',Validators.compose([Validators.required])),
      state:new FormControl('',Validators.compose([Validators.required])),
      pincode:new FormControl('',Validators.compose([Validators.required,Validators.minLength(6),Validators.maxLength(6)]))
    })
  }

  removeAddress(index:number):void{
    this.addressesasformarray.removeAt(index);

  }

  submit(){
    console.log(this.detailsForm.value);
   
  }

  isFieldValid(formGroup:any, formControlName:string){
   
    if(formGroup.get(formControlName)?.invalid && (formGroup.get(formControlName)?.touched || formGroup.get(formControlName)?.dirty)){
      
      return true;
    }
    return false;
  }


  getFieldByErrorType(formGroup:any, formControlName:string,type:string){
  
    return formGroup.get(formControlName)?.errors[type];

  }


 

}
