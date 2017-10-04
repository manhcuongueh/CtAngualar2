import { Component, OnInit } from '@angular/core';
import { AccountServices } from "../../services/account.service";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'editaccount',
  templateUrl: './detailtransaction.component.html',
  styleUrls: []
})
export class DetailTransactionComponent {
  accountInfo = {};
  order={};
  constructor(private proSer: ProductService, private accSer: AccountServices, private location: Location) {

  }
  ngOnInit() {
    this.accSer.getAccount().subscribe((res: any) => {
      this.accountInfo = res
    }, error => {
      console.log(error);
    });
    this.proSer.GetSingleOrder().subscribe((res: any) => {
      this.order = res;
    }, error => {
      console.log(error);
    });
 
  }
  goBack(){
      this.location.back();
  }
}