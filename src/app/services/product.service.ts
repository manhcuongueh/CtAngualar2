import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
    carts = [];
    totalprice = 0;
    totalquantity;
    keyword;
    productCode;
    private productUrl = "http://ctproject.j.layershift.co.uk/info";
    private searchUrl = "http://ctproject.j.layershift.co.uk/";
    private createOrderUrl = "http://ctproject.j.layershift.co.uk/order";
    private orderUrl = "http://ctproject.j.layershift.co.uk/orders";
    private updateUrl="http://ctproject.j.layershift.co.uk/updateproduct";
    private statusUrl="http://ctproject.j.layershift.co.uk/status";
    constructor(private _http: Http) {

    }
    GetProduct(): Observable<any[]> {
        return this._http.get(this.productUrl).map((res: Response) => res.json());
    }

    Search(): Observable<any[]> {
        return this._http.get(this.searchUrl + "/" + this.keyword).map((res: Response) => res.json());
    }

    getSingle(id) {
        return this._http.get(this.productUrl + "/" + id).map((res: Response) => res.json());
    }
    AddProduct(data: any): Observable<any> {
        return this._http.post(this.productUrl, data).map((res: Response) => res.json());
    }
    UpdateProduct(data) {
        return this._http.post(this.updateUrl, data).map((res: Response) => res.json());
    }

    DeleteProduct(data){
        return this._http.delete(this.productUrl+ "/" + data);
    }

    GetCart() {
        return this.carts;
    }

    AddtoCart(q:number,p) {
        if (this.carts.indexOf(p) > -1 && this.carts[this.carts.indexOf(p)].quantity > 0) {
            this.carts[this.carts.indexOf(p)].quantity=(this.carts[this.carts.indexOf(p)].quantity) - -q;
            console.log(q, this.carts[this.carts.indexOf(p)].quantity)
        }
        else {
            this.carts.push(p);
            this.carts[this.carts.indexOf(p)].quantity = q;
        }
        // this.totalprice=this.totalprice+this.carts[this.carts.indexOf(p)].price;

    }
    updateQuantity(newQuantity, p) {
        this.carts[this.carts.indexOf(p)].quantity = newQuantity;
    }

    removeItem(p) {
        let itemIndex = this.carts.indexOf(p);
        //    this.totalprice=this.totalprice-this.carts[itemIndex].price*this.carts[itemIndex].quantity;
        this.carts.splice(itemIndex, 1);
    }
    getTotalPrice() {
        let totalCost: Array<number> = []
        let quantity: Array<number> = []
        let intPrice: number
        let intQuantity: number
        this.carts.forEach((item, i) => {
            intPrice = parseInt(item.price)
            intQuantity = parseInt(item.quantity)
            totalCost.push(intPrice * intQuantity)
            quantity.push(intQuantity)
        })

        this.totalprice = totalCost.reduce((acc, item) => {
            return acc += item
        }, 0)
        this.totalquantity = quantity.reduce((acc, item) => {
            return acc += item
        }, 0)
    }
    CreateOrder(data) {
        return this._http.post(this.createOrderUrl, data).map((res: Response) => res.json());
        
    }
    GetOrders(): Observable<any[]> {
            return this._http.get(this.orderUrl).map((res: Response) => res.json());
    }
    Orderid;
    setOrderId(orderid){
        this.Orderid=orderid;
    }
    GetSingleOrder() {
        return this._http.get(this.orderUrl+'/'+this.Orderid).map((res: Response) => res.json());
}
    UpdateStatus(data){
        return this._http.post(this.statusUrl, data).map((res: Response) => res.json());
    }

}
