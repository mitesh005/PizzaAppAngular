import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { RegisterComponent } from '../register/register.component';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private api:ApiService, private dialogRef:MatDialogRef<LoginComponent>,private router:Router){}
ngOnInit(): void {
  this.loginUserForm = this.formBuilder.group({
    loginName:['',Validators.required],
      loginPassword:['',Validators.required],
     
    })
}

getDecodedAccessToken(token?: any): any {
  try {
    if(token != null){
      return jwt_decode(token);
    }
    else{
      return null;
    }
  } catch(Error) {
    return null;
  }
}

public getToken(){
  return localStorage.getItem('usertoken');
}


LoginUser() {
  
  if(this.loginUserForm.valid){
    this.api.loginUser(this.loginUserForm.value)
    .subscribe({
      next:(res)=>{
        let JsonObject=JSON.stringify(res);
        let JsonToken=JSON.parse(JsonObject);
        localStorage.setItem('usertoken',JsonToken["Token"]);
        Swal.fire(  
          'Login!',  
          'Login Successfull.',  
          'success'  
        ) ;
        
        let name= this.getDecodedAccessToken(localStorage.getItem('usertoken'))["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        localStorage.setItem('name',name);
        this.router.navigate(['home']);
        this.loginUserForm.reset();
        this.dialogRef.close('save');
      
      },
      error:()=>{
        Swal.fire(  
          'Error!',  
          'Error While Login User.',  
          'error'  
        ) ;
      }
    })
   
  }
}

}
