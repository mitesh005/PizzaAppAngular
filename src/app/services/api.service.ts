import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  Mysubject = new Subject();
  API_URL="https://localhost:7279/api/Product";
  constructor(private http:HttpClient) { }
  storeInSubject(data:any){
    this.Mysubject.next(data);
  }
  postProduct(data:any){
return this.http.post<any>("http://localhost:3000/productList",data);
  }

  getProduct(){
    return this.http.get<any>("http://localhost:3000/productList");
  }

  addUser(data:any){
    return this.http.post<any>(this.API_URL+'/RegisterUser',data)
   }
  loginUser(data:any){
    return this.http.post<any>(this.API_URL+'/Login',data)
   }
   getAllProduct(){
    return this.http.get(this.API_URL+'/GetAllProducts')
 }

 addCart(data:any):Observable<boolean>{
  return this.http.post<boolean>(this.API_URL+'/Addtocart',data)
 }

 getAllFromCart(username?:string){
  return this.http.get(this.API_URL+'/GetAllFromCart?username='+username)
}
deleteFromCart(id:number){
  return this.http.delete(this.API_URL+'/Deletefromcart?id='+id);

}

emptyCart(data:any){
  return this.http.post(this.API_URL+'/DeleteCartItems',data);
}

editProfile(data:any){
  return this.http.put(this.API_URL+'/EditUser',data);
}

getUserByName(username ?:string){
  return this.http.get(this.API_URL+'/GetUser?username='+username);
}

getcartCount(username ?:string){
  return this.http.get(this.API_URL+'/GetCartCount?username='+username);
}
}
