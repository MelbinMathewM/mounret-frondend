import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private api = "http://localhost:5234/api/categories"

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(this.api)
    }

}