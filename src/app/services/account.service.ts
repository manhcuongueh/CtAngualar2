import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router'
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class AccountServices {
    private registerUrl = "http://ctproject.j.layershift.co.uk/register";
    private loginUrl = "http://ctproject.j.layershift.co.uk/login";
    private adminUrl = "http://ctproject.j.layershift.co.uk/admin";
    private accUrl = "http://ctproject.j.layershift.co.uk/account";
    private updateUrl = "http://ctproject.j.layershift.co.uk/updateaccount"
    private deleteUrl = "http://ctproject.j.layershift.co.uk/deleteaccount"
    constructor(private _http: Http) {
    }

    public _isLoggedIn: boolean = false;
    SetLogin(isLoggedIn: boolean) {
        this._isLoggedIn = isLoggedIn;
    }
    canActivate() {
        return this._isLoggedIn;
    }

    Login(data: any): Observable<any> {
        return this._http.post(this.loginUrl, data).map((res: Response) => res.json());
    }

    loginAdmin(data: any): Observable<any> {
        return this._http.post(this.adminUrl, data).map((res: Response) => res.json());
    }

    Register(data: any): Observable<any> {
        return this._http.post(this.registerUrl, data).map((res: Response) => res.json());

    }
    public accountId;
    setaccountID(id) {
        this.accountId = id;
    }
    getAccount() {
        return this._http.get(this.accUrl + "/" + this.accountId).map((res: Response) => res.json());
    }
    GetAllAccount(): Observable<any[]> {
        return this._http.get(this.accUrl).map((res: Response) => res.json());
    }
    UpdateAccount(data) {
        return this._http.post(this.updateUrl, data).map((res: Response) => res.json());
    }
    DeleteAccount(data){
        return this._http.delete(this.accUrl+ "/" + data);
    }


}
