import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginAdminComponent } from "./components/login-admin/login-admin.component";
import { CheckoutComponent } from "./components/checkout/checkout.compent";
import { AccountServices } from "./services/account.service";
import { AccPageComponent } from "./components/accountpage/accountpage.component";
import { PerPageComponent } from "./components/accountpage/personalpage.component";
import { SearchComponent } from "./components/search/search.component";
import { AdminComponent } from "./components/admin/admin.component";
import { EditAccountComponent } from "./components/admin/editaccount.component";
import { DetailTransactionComponent } from "./components/admin/detailtransaction.component";
import { EditProductComponent } from './components/admin/editproduct.component';
import { AdminServices } from './services/admin.service';
import { NotFoundComponent } from './components/notfoundpage/notfound.component';
import { LoggedInComponent } from './components/login/loggedin.component';
import { NavBarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'detail/:id',
    component: ProductDetailComponent
  },
  {
    path: 'search/:id',
    component: SearchComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'checklogin',
    component: LoggedInComponent
  },
  {
    path: 'requirelogin',
    component: PerPageComponent
  },
  {
    path: 'myaccount',
    component: AccPageComponent,
    canActivate: [AccountServices]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    component: LoginAdminComponent
  },
  {
    path: 'manage',
    component: AdminComponent,
    canActivate: [AdminServices]
  },
  {
    path: 'transaction',
    component: DetailTransactionComponent
  },
  {
    path: 'editaccount',
    component: EditAccountComponent
  },
  {
    path: 'editproduct',
    component: EditProductComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AccountServices]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }