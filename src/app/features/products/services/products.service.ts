import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private api = "http://localhost:5234/api/products"

    constructor(private http: HttpClient) { }

    getProducts(filters: any) {

        return this.http.get(this.api, {
            params: filters
        })

    }

}