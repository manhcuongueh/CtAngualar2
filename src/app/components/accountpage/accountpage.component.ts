import { Component, OnInit } from '@angular/core';
import { AccountServices } from "../../services/account.service";

@Component({
  selector: 'accpage',
  templateUrl: './accountpage.component.html',
  styleUrls: ['./accountpage.component.scss'],
})
export class AccPageComponent {
  ind: number = 1;
  accountInfo={};
  code;
  constructor(private accSer: AccountServices) {

  }
  Changetab(ind) {
    this.ind = ind;

  }
  ngOnInit() {
    this.accSer.getAccount().subscribe((res: any) => {
      this.accountInfo = res;
    }, error => {
      console.log(error);
    });
  }
  onSubmit() {
    console.log(this.accountInfo);
    this.accSer.UpdateAccount(this.accountInfo).subscribe(
      resBody => this.code = resBody.code.toString(),
      error => console.error(error))
  }
 
}