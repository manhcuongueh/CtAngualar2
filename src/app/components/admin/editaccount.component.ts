import { Component, OnInit } from '@angular/core';
import { AccountServices } from "../../services/account.service";
import { ProductService } from "../../services/product.service";
import { Router } from "@angular/router";

@Component({
  selector: 'editaccount',
  styles:[
      `.accButton{
        font-size: 20px;
    }
    .information{
        text-align: left;
        font-size: 18px;
    }
    .check{
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
  <h3>Account Information</h3>
  <div class="check" *ngIf="code!=null">
      <p>Successful! Updated your Information</p>
  </div>
  <form #updateForm="ngForm" (ngSubmit)="onSubmit(updateForm.value)">
      <div class="name">
          <label>First Name: <input type="text" size="35" [(ngModel)]="accountInfo.firstname" name="firstname"/></label>
          <label>Last Name: <input type="text"  size="35" [(ngModel)]="accountInfo.lastname" name="lastname" /></label>
      </div>
      <div class="form-group" > 
      <label >Email Address</label>
      <input type="text" class="form-control" name="email" [(ngModel)]="accountInfo.email"
      #email="ngModel" required ngModel pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"/>
      <div *ngIf="email.errors&&(email.dirty||email.touched)" 
      class="alert alert-danger">
            <div  [hidden]="!email.errors.required">Email Address is required</div>
            <div  [hidden]="!email.errors.pattern">Invalid Email Address</div>
        </div>
      
    </div>
    <div class="form-group" > 
      <label >PassWord</label>
      <input type="password" class="form-control" name="password" [(ngModel)]="accountInfo.password"
      #password="ngModel" required ngModel minlength="6" maxlength="20"/>
      <div *ngIf="password.errors&&(password.dirty||password.touched)" 
      class="alert alert-danger">
            <div  [hidden]="!password.errors.required">Password is required</div>
            <div  [hidden]="!password.errors.minlength">PassWord must be between 6-20 characters </div>
        </div>
    </div>
      <div class="form-group">
          <label>Phone Number</label>
          <input type="text" class="form-control" [(ngModel)]="accountInfo.phonenumber" name="phonenumber" placeholder="Enter your Phone Number"
          />
      </div>
      <div class="form-group">
          <label>Address</label>
          <input type="text" class="form-control" [(ngModel)]="accountInfo.address" name="address" placeholder="Enter your Address"
          />
      </div>
      <div class="form-group">
          <label>Credit Card Number:</label>
          <input type="text" class="form-control" [(ngModel)]="accountInfo.creditnumber" name="creditnumber" placeholder="Enter your Credit Card Number"
          />
      </div>
      <div class="form-group coButton">
          <button class="btn btn-primary" [disabled]="!updateForm.valid">Update</button>
      </div>

  </form>
</div> 
`
})
export class EditAccountComponent {
  accountInfo = {};
  code;
  constructor(private proSer: ProductService, private accSer: AccountServices, private router: Router) {

  }
  ngOnInit() {
    this.accSer.getAccount().subscribe((res: any) => {
      this.accountInfo = res;
    }, error => {
      console.log(error);
    });
  
  }
  onSubmit(value: any) {
    console.log(value)
    this.accSer.UpdateAccount(value).subscribe(
      resBody => this.code = resBody.code.toString(),
      error => console.error(error))
  }
}