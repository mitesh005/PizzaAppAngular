import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit{
  constructor(private router:Router,private api:ApiService,private formBuilder : FormBuilder,private dialogRef:MatDialogRef<EditprofileComponent>){
    this.usermodel=new User();
  }
  editform !: FormGroup;
usermodel:any;
  ngOnInit(): void {
  let name = (localStorage.getItem('name'))?.toString();
  this.api.getUserByName(name).subscribe( (res:any)=>{
    this.usermodel=res;
  });
  this.editform = this.formBuilder.group({
    userName:['',Validators.required],
      password:['',Validators.required],
      email:['',Validators.required],
    })
   
  

  }

  editprofile(data:any){
    if(this.editform.valid){
    this.api.editProfile(data).subscribe((res:any)=>{
      Swal.fire(  
        'Edited!',  
        'Your profile has been Edited.',  
        'success'  
      )  ;
      this.dialogRef.close('save');
    })
  }

  }

}
