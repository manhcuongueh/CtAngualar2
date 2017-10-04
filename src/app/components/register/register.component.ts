import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { AccountServices } from "../../services/account.service";

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    account: any;
    code: string;
    accountId;
    checkExist:boolean=false;
    constructor( private accSer: AccountServices, private router: Router) {

    }
    ngOnInit() {
        this.account = {};
    }
    onSubmit(value:any) {
         console.log(value)
         this.accSer.Register(value).subscribe(
             resBody => [this.code = resBody.code.toString(), this.accountId = resBody.message.toString()],
         error => console.error(error),
         () => this.onCheck(this.code))
        
        
}
    onCheck(code){
        if(code=='1000'){
            console.log("this is 1000")
            this.accSer.setaccountID(this.accountId);
            this.accSer.SetLogin(true);
            this.router.navigate(['myaccount']);
        }  
         else {
             console.log("This is -1000")
            this.checkExist=true;
         }
    }
}
