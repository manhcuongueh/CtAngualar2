import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { AccountServices } from "../../services/account.service";

@Component({
  selector: 'accpage',
  templateUrl: './personalpage.component.html',
})
export class PerPageComponent {
  
    constructor(private accSer:AccountServices, private router: Router){

    }
    ngOnInit(){
        if(this.accSer._isLoggedIn){
            this.router.navigate(["/myaccount"])
        }
    }
    goLogin(){
        this.router.navigate(["/login"])
    }
  }  