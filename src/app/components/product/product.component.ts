import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent {

  public products: any[];
  public carts = [];
  totalPrice = 0;
  totalQuantity = 0;
  keyword;
  constructor(private proser: ProductService, private router: Router) {

  }
  ngOnInit() {
    this.proser.GetProduct().subscribe((res: any) => {
      this.products = res;
    }, error => {
      console.log(error);
    });
    this.carts = this.proser.GetCart();
    this.totalPrice = this.proser.totalprice;
    this.totalQuantity = this.proser.totalquantity;
  }
  search() {
    this.proser.keyword=this.keyword;
    let link = ['search/', this.keyword];
    this.router.navigate(link);
  }
  addToCarts(q: number,product) {
    this.proser.AddtoCart(q,product);
    this.proser.getTotalPrice();
    this.totalPrice = this.proser.totalprice;
    this.totalQuantity = this.proser.totalquantity;
  }
  
  clickedProduct(product) {
    let link = ['/detail', product.code];
    this.router.navigate(link);
  }
  goBack() {
    this.router.navigate(["/"])
  }
}