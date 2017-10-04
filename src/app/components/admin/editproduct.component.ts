import { Component, OnInit } from '@angular/core';
import { AccountServices } from "../../services/account.service";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";

@Component({
    selector: 'editaccount',
    styles: [
        `.check{
        font-size: 20px;
        height: 40px;
        width: 500px;
        color: green;
        font-weight: bold;
      }
      .ng-valid[required], .ng-valid:not(form)  {
        border-left: 5px solid #42A948; /* green */
      }
      .ng-invalid:not(form)  {
        border-left: 5px solid #a94442; /* red */
      }
      `
    ],
    template: `
  <div class="checkout">
  <h3>Product Information</h3>
  <div class="check" *ngIf="code!=null">
      <p>Successful! Updated your Information</p>
  </div>
  <form #updateForm="ngForm" (ngSubmit)="onSubmit(updateForm.value)">
      <div class="name">
          <label>Product Code: {{productInfo.code}}</label>
          <label>Product Name: <input type="text"  size="35" [(ngModel)]="productInfo.name" name="name" required/></label>
      </div>
      <div class="form-group">
          <label>Image Url</label>
          <input type="text" class="form-control" [(ngModel)]="productInfo.scr" name="scr" />
      </div>
      <div class="form-group">
          <label>Update Date</label>
          <input type="text" class="form-control" [(ngModel)]="productInfo.createDate" name="createDate" />
      </div>
      <div class="form-group">
          <label>Price</label>
          <input type="text" class="form-control" [(ngModel)]="productInfo.price" name="price"
          required/>
      </div>
      <div class="form-group">
          <label>Description</label>
          <input type="text" class="form-control" [(ngModel)]="productInfo.info" name="info" 
          required/>
      </div>
      <div class="form-group">
          <label>Category:</label>
          <input type="text" class="form-control" [(ngModel)]="productInfo.category" name="category"
          required/>
      </div>
      <div class="form-group coButton">
          <button class="btn btn-primary" [disabled]="!updateForm.valid">Update</button>
      </div>

  </form>
</div> 
`
})
export class EditProductComponent {
    productInfo = {};
    code;
    constructor(private proSer: ProductService, private accSer: AccountServices, private router: Router) {

    }
    ngOnInit() {
        this.proSer.getSingle(this.proSer.productCode).subscribe((res: any) => {
            this.productInfo = res;
        }, error => {
            console.log(error);
        });

    }
    onSubmit() {
        this.proSer.UpdateProduct(this.productInfo).subscribe(
            resBody => this.code = resBody.code.toString(),
            error => console.error(error));
    };


}