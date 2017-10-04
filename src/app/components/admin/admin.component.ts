import { Component, OnInit } from '@angular/core';
import { AccountServices } from "../../services/account.service";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";

@Component({
  selector: 'adminpage',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  orders = [];
  accountInfo = {
  }
  productInfo = {
  }
  code;
  accounts = [];
  products = [];
  status = [{ id: "1", name: "finished" },
  { id: "2", name: "in process" },
  { id: "3", name: "new order" }]
  ind: number = 1;
  Changetab(ind) {
    this.ind = ind;

  }
  constructor(private proSer: ProductService, private accSer: AccountServices, private router: Router) {

  }
  ngOnInit() {
    this.proSer.GetOrders().subscribe((res: any) => {
      this.orders = res;
    }, error => {
      console.log(error);
    });
    console.log(this.orders);


    this.accSer.GetAllAccount().subscribe((res: any) => {
      this.accounts = res;
    }, error => {
      console.log(error);
    });

    this.proSer.GetProduct().subscribe((res: any) => {
      this.products = res;
    }, error => {
      console.log(error);
    });
  }
  //Transaction
  onDetail(accId, id) {
    this.accSer.setaccountID(accId);
    this.proSer.setOrderId(id);
    this.router.navigate(['/transaction']);

  }
  //Account
  DeleteAccount(accId, acc) {
    this.accSer.DeleteAccount(accId).subscribe();
    console.log(acc)
    this.accounts.splice(this.accounts.indexOf(acc), 1);
    console.log(this.accounts)
  }
  AddAccount() {
    this.accSer.Register(this.accountInfo).subscribe(
      resBody => this.code = resBody.code.toString(),
      error => console.error(error),
      () => this.onCheck(this.code))
    this.accSer.GetAllAccount().subscribe((res: any) => {
      this.accounts = res;
    }, error => {
      console.log(error);
    });


  }
  onCheck(code) {
    if (code == '1000') {
      //this.accounts.push(this.accountInfo);
      this.accSer.GetAllAccount().subscribe((res: any) => {
        this.accounts = res;
      }, error => {
        console.log(error);
      });
      this.accountInfo = {};
    }


  }
  EditAccount(accId) {
    this.accSer.setaccountID(accId);
    this.router.navigate(['/editaccount']);

  }
  //Product
  DeleteProduct(code, product) {
    this.proSer.DeleteProduct(code).subscribe();
    this.products.splice(this.products.indexOf(product), 1);
    console.log(product);
  }
  AddProduct() {
    console.log(this.productInfo);
    this.proSer.AddProduct(this.productInfo).subscribe(
      resBody => this.code = resBody.code.toString(),
      error => console.error(error),
      () => this.onCheckProduct(this.code))
    this.accSer.GetAllAccount().subscribe((res: any) => {
      this.accounts = res;
    }, error => {
      console.log(error);
    });
  }
  onCheckProduct(code) {
    if (code == '1000') {
      //this.accounts.push(this.accountInfo);
      this.proSer.GetProduct().subscribe((res: any) => {
        this.products = res;
      }, error => {
        console.log(error);
      });
      this.productInfo = {};
    }
  }
  EditProduct(code) {
    this.proSer.productCode = code;
    this.router.navigate(['/editproduct']);

  }
  upstatus={orderId:0, status:""};
  Update(id, status){
    this.upstatus.orderId=id;
    this.upstatus.status=status;
    console.log(this.upstatus);
    this.proSer.UpdateStatus(this.upstatus).subscribe();
  }
}
