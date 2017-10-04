import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { ProductService } from '../../services/product.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'product-detail',
    templateUrl: 'product-detail.component.html',
    styleUrls: ['product-detail.component.scss']
})

export class ProductDetailComponent {
    id: number;
    subcription: Subscription;
    selectedProduct;
    quantity: number=1;
    constructor(
        private proser:ProductService,
        private route:ActivatedRoute,
        private location:Location,
    ) { }


    // When initialized, fetch for the product info based on the product id and set it as selectedProduct
    ngOnInit() {
        this.subcription = this.route.params.subscribe(params=>{
            this.id=params['id'];
          });
          this.proser.getSingle(this.id).subscribe((data) => {
                  this.selectedProduct = data;
              });
        
    }
    addToCarts() {
        this.proser.AddtoCart(this.quantity,this.selectedProduct);
        this.proser.getTotalPrice();
      }

    goBack() {
        this.location.back()
    }
}