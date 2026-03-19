import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  private baseUrl = 'http://localhost:5234/api/enquiries'

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.baseUrl)
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

}