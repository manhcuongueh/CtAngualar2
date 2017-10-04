import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { AccountServices } from "../../services/account.service";

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {

  public totalPrice: number;
  public totalQuantity: number;
  public carts = [];
  public code = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private accSer: AccountServices) { }

  removeProduct(product) {
    this.productService.removeItem(product)
    this.productService.getTotalPrice()
    this.totalPrice = this.productService.totalprice;
  }
  addQuality(quantity, p) {
    this.productService.updateQuantity(quantity, p);
    this.productService.getTotalPrice();
    this.totalPrice = this.productService.totalprice;
  }

  checkout() {
    console.log(this.carts.length)
    if (this.carts.length < 1) {
      alert("You must add an item first!")

    }
    else {
      if (this.accSer._isLoggedIn) {

        this.router.navigate(["/checkout"]);
      }
      else {
        this.router.navigate(["/login"]);
      }
    }
  }

  ngOnInit() {
    this.carts = this.productService.carts;
    this.productService.getTotalPrice()
    this.totalPrice = this.productService.totalprice;
  }

}
