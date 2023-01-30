import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  viewcart:any
  constructor(private api:ApiService,private router:Router){}

  calculatetotal(){
    let total=0;
    this.viewcart?.forEach((element:any) => {
      let sum = ((element.product_Price) * (element.quantity));
      total=total+sum;
    });
    return total;
  }

  updateAmount(index: number, quantity: number) {
    this.viewcart[index].quantity = quantity;
    // this.cartItems[index].amount = this.cartItems[index].price * quantity;
  }
  ngOnInit(): void {
   let name = (localStorage.getItem('name'))?.toString();
    this.api.getAllFromCart(name).subscribe((res) => { 
      
      this.viewcart = res; 
  });
  }

  Deleteitem(id:any){
   
   
    this.api.deleteFromCart(id).subscribe(
      
      (res)=>{
       
      if(res){
        Swal.fire(
          'Item Deleted',
          'Item Deleted sucessfully',
          'success'
        )
        this.router.navigate(['cart']);
       
      }
    }
    )
    window.location.reload();
    if(localStorage.getItem("mycart")!=undefined){
      let data:any=localStorage.getItem("mycart");
      let arr=JSON.parse(data);
      let index = arr.findIndex((item:any) => item.id === id);
      arr.splice(index, 1);
      localStorage.setItem('mycart',JSON.stringify(arr));
      this.api.storeInSubject(arr);
    }

  }

}
