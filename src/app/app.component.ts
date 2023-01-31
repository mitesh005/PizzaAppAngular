import { Component, OnInit } from '@angular/core';
import { DialogueComponent } from './dialogue/dialogue.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { EditprofileComponent } from './Components/editprofile/editprofile.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
openDialogLogin() {
  this.dialog.open(LoginComponent, {
    width:'30%'
   });
}
  title = 'angularcrud';
  cart=0;
  constructor(private dialog:MatDialog,private router:Router,private api:ApiService){

  }
  ngOnInit(): void {
    if(localStorage.getItem("mycart")!= undefined){
     
      let data:any=localStorage.getItem("mycart");
      let arr=JSON.parse(data);
      this.cart=arr.length;
      
      }

    this.api.Mysubject.subscribe((data:any)=>{
      this.cart = data.length;
    })
  }
  public getToken(){
    return localStorage.getItem('usertoken');
  }
  openDialog() {
    this.dialog.open(RegisterComponent, {
     width:'30%'
    });
  }

  openEditProfile(){
    this.dialog.open(EditprofileComponent, {
      width:'30%'
     });
  }
  public logout(){
    localStorage.removeItem("usertoken");
    localStorage.removeItem("name");
    localStorage.clear();
    Swal.fire(
      'Thank You For Visiting Us..!',
      'LogOut Sucessfully',
      'success'
    )
    this.router.navigate(['']);
  
  }

}



