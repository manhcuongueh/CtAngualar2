import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router'
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class AdminServices {
    public _isLoggedIn: boolean = false;
    SetLogin(isLoggedIn: boolean) {
        this._isLoggedIn = isLoggedIn;
    }
    canActivate() {
        return this._isLoggedIn;
    }
}