import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  api = "http://localhost:5234/api/products";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.api);
  }

  create(data: any) {
    return this.http.post(this.api, data);
  }

  update(id: number, data: any) {
    return this.http.post(`${this.api}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
