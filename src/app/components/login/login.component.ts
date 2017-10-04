import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AccountServices } from "../../services/account.service";
import { Location } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


    code: string;
    accountId: string;
    checkLogin: boolean = false;
    constructor(private accSer: AccountServices, private router: Router, private location: Location) {

    }
    ngOnInit() {
    }
    onSubmit(value: any) {

        this.accSer.Login(value).subscribe(
            resBody => [this.code = resBody.code.toString(), this.accountId = resBody.message.toString()],
            error => console.error(error),
            () => this.onCheck(this.code))

        
    }
    onCheck(code) {
        if (code == '1000') {
            this.accSer._isLoggedIn=true;
            this.accSer.SetLogin(true);
            this.accSer.setaccountID(this.accountId);
            this.location.back();  

        }
        else {
            this.checkLogin = true;
        }
    }

}
