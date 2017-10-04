import { Component, Input, OnInit } from '@angular/core';
import { AccountServices } from "../../services/account.service";
import { Router } from "@angular/router/";
import { Location } from '@angular/common';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: []
})
export class NavBarComponent {
  a:boolean=false;
  constructor(private accSer:AccountServices, private router:Router, private location:Location){
  }
  ngOnInit(){
  }
  logout(){
    this.accSer.SetLogin(false);
  }
}