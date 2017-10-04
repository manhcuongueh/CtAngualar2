import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {

  public products: any[];
  public carts = [];
  totalPrice = 0;
  totalQuantity = 0;
  check: boolean = false;
  
  constructor(private proser: ProductService, private router: Router) {

  }
  keyword=this.proser.keyword;
  ngOnInit() {
    this.proser.Search().subscribe(res => {
        this.products = res
        if (this.products.length === 0)
          this.check = true
      })
    this.carts = this.proser.GetCart();
  }
  search() {
    this.proser.keyword=this.keyword;    
    this.proser.Search().subscribe(res => {
      this.products = res
      if (this.products.length === 0)
        this.check = true
    })
    let link = ['search/', this.keyword];
    this.router.navigate(link);
  }
  addToCarts(q,product) {
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
    this.check = false;
  }
}