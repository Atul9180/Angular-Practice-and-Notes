import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  ngOnInit(){}

  //post product
  postProduct(data:any) {
    return this.http.post<any>("http://localhost:3000/productList",data);
  }

  //get product
  getProduct() {
    return this.http.get<any>("http://localhost:3000/productList");
  }
}
