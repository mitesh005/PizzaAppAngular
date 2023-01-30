import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { Cart } from 'src/app/models/Cart';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productData:any;
  cart?: Cart;
constructor(private router:Router, private api:ApiService){

}
  ngOnInit(): void {
    this.api.getAllProduct()
    .subscribe((res:any)=>{
      this.productData=res;
    
    })
  }

  AddCart(pimage:any,pname:any,price:any,id:any){

    if(localStorage.getItem('mycart')!=undefined){

      let data:any=localStorage.getItem('mycart');
      let arr=JSON.parse(data);
      if(arr.includes(id)){
        Swal.fire(
          'Pizza already in Cart!',
          ' Already Exists',
          'success'
        )
      }
      else{
       arr.push(id);
       localStorage.setItem('mycart',JSON.stringify(arr));
       this.api.storeInSubject(arr);
    
       this.cart=new Cart();
  
  
      this.cart.username = (localStorage.getItem('name'))?.toString();
      this.cart.product_Name=pname;
      this.cart.product_Price=price;
      this.cart.productImage=pimage;
      this.cart.quantity=1;
      console.log(this.cart.username);


    
    this.api.addCart(this.cart).subscribe((res:any)=>{
      if(res){
        Swal.fire(
                'Pizza Added to Cart!',
                'Added to cart sucessfully',
                'success'
              )
              this.router.navigate(['home']);
            
        }
 
})

      }
  }
  else {
    let arr=[];
    arr.push(id);
    localStorage.setItem('mycart',JSON.stringify(arr));
    this.api.storeInSubject(arr);
  
    this.cart=new Cart();
  
  
      this.cart.username = (localStorage.getItem('name'))?.toString();
      this.cart.product_Name=pname;
      this.cart.product_Price=price;
      this.cart.productImage=pimage;
      this.cart.quantity=1;
      console.log(this.cart.username);


    
    this.api.addCart(this.cart).subscribe((res:any)=>{
      if(res){
        Swal.fire(
                'Pizza Added to Cart!',
                'Added to cart sucessfully',
                'success'
              )
              this.router.navigate(['home']);
           
        }
      
 
})

  }
    
  }
  


}


