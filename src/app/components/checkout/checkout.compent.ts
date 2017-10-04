import { Component, OnInit } from '@angular/core';
import { AccountServices } from "../../services/account.service";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";


@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  accountInfo = {};
  cart = [];
  totalprice;
  OrderInfo = {
    accId: 0,
    amount: 0,
    orderDetail:[]
  };
  Orders=[];


  constructor(private accSer: AccountServices, private proSer: ProductService, private router: Router) {

  }
  ngOnInit() {
    this.proSer.getTotalPrice();
    this.totalprice = this.proSer.totalprice;
    this.accSer.getAccount().subscribe((res: any) => {
      this.accountInfo = res;
    }, error => {
      console.log(error);
    });
    this.cart = this.proSer.GetCart();
  }
  onSubmit(accId) {

    this.accSer.UpdateAccount(this.accountInfo).subscribe();
    //Order
    this.OrderInfo.accId = accId;
    this.OrderInfo.amount = this.totalprice;
    //Orderdetail
    this.cart.forEach((item, i) => {
      delete item.scr
      delete item.category
      delete item.createDate
      delete item.info
      item.amount = item.quantity * item.price;
    })
    this.OrderInfo.orderDetail=this.cart;
    this.proSer.CreateOrder(this.OrderInfo).subscribe();
    console.log(this.OrderInfo)
    this.proSer.carts=[];
    this.router.navigate(['/']);
  }
}