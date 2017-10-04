import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AccountServices } from "../../services/account.service";
import { AdminServices } from '../../services/admin.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

   account: any;
    code: string;
    checkLogin:boolean=false;
    constructor( private accSer: AccountServices, private router: Router,private ad: AdminServices) {

    }
    ngOnInit() {
        this.account = {};
    }
    onSubmit(value:any) {
         this.accSer.loginAdmin(value).subscribe(
             resBody => this.code = resBody.code.toString(),
         error => console.error(error),
         () => this.onCheck(this.code))      
}
    onCheck(code){
            if(code=='1000'){
                console.log("this is 1000", code)
                this.ad.SetLogin(true);
                this.router.navigate(['/manage']);
            }  
            else {
                console.log("This is -1000")
                this.checkLogin=true;
            }
        }

}
