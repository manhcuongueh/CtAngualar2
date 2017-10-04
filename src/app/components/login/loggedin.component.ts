import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { AccountServices } from "../../services/account.service";

@Component({
  selector: 'logpage',
  template:`<p> You logged in</p>
  <button (click)="goPersonalPage()" class="btn btn-danger">Personal Page</button>`
})
export class LoggedInComponent {
  
    constructor(private accSer:AccountServices, private router: Router){

    }
    ngOnInit(){
        if(!this.accSer._isLoggedIn){
            this.router.navigate(["/login"])
        }
    }
    goPersonalPage(){
        this.router.navigate(["/myaccount"])

    }
  }  