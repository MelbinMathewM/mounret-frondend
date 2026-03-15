import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class AdminAuthService {

    api = "http://localhost:5234/api/auth"

    constructor(private http: HttpClient) { }

    login(data: any) {
        return this.http.post(`${this.api}/login`, data)
    }

    storeAuth(res: any) {

        localStorage.setItem("token", res.token)
        localStorage.setItem("user", JSON.stringify(res))

    }

    getToken() {
        return localStorage.getItem("token")
    }

    logout() {

        localStorage.removeItem("token")
        localStorage.removeItem("user")

    }

}