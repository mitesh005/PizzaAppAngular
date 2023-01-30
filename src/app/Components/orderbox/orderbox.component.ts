import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orderbox',
  templateUrl: './orderbox.component.html',
  styleUrls: ['./orderbox.component.css']
})
export class OrderboxComponent {
  constructor(private router:Router,private api:ApiService,private fb:FormBuilder){
    this.OrderForm = this.fb.group({
      mynumber: ['', [Validators.required, this.validate6DigitNumber]]
    });
  }

  OrderForm!: FormGroup;

  validate6DigitNumber(control: FormControl) {
    const value = control.value;
    if (!value) {
      return null;
    }
  
    if (value.toString().length !== 6) {
      return { invalid6DigitNumber: true };
    }
  
    return null;
  }
  
  ConfirmOrder(){
   if(this.OrderForm.valid){
    let data:any=localStorage.getItem('mycart');
    let arr=JSON.parse(data);
    this.api.emptyCart(arr).subscribe((res:any)=>{
      if(res){
        Swal.fire(
          'order place successfully..!',
          'order place successfully..!',
          'success'
        )

        if(localStorage.getItem("mycart")!=undefined){
          let data:any=localStorage.getItem("mycart");
          let arr=JSON.parse(data);
          arr.length=0;
          localStorage.setItem('mycart',JSON.stringify(arr));
          this.api.storeInSubject(arr);
        }
        this.router.navigate(['home']);
      }
    
    })
  }
   
  }
}
