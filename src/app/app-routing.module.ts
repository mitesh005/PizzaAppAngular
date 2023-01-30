import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CartComponent } from './Components/cart/cart.component';
import { HomeComponent } from './Components/home/home.component';
import { OrderboxComponent } from './Components/orderbox/orderbox.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'cart',component:CartComponent,canActivate:[AuthGuard]},
  {path:'order',component:OrderboxComponent,canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
