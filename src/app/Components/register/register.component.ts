import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogueComponent } from 'src/app/dialogue/dialogue.component';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private api:ApiService, private dialogRef:MatDialogRef<RegisterComponent>){}
  ngOnInit(): void {
    this.registerUserForm = this.formBuilder.group({
      userName:['',Validators.required],
        password:['',Validators.required],
        email:['',Validators.required],
      })
  }
RegisterUser() {
  if(this.registerUserForm.valid){
    this.api.addUser(this.registerUserForm.value)
    .subscribe({
      next:(res)=>{
        Swal.fire(  
          'Added!',  
          'User Register Successfully.',  
          'success'  
        ) ;
        this.registerUserForm.reset();
        this.dialogRef.close('save');
      },
      error:()=>{
        Swal.fire(  
          'Error!',  
          'Error While Registering User.',  
          'error'  
        ) ;
      }
    })
  }
}

}






