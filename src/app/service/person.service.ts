import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  url = 'http://localhost:8080/addbook/api/persons';

  constructor(private http: HttpClient) { }
  
  getApidata(){
    return this.http.get(this.url);
  }

  savetodb(data: any){
    return this.http.post(this.url,data)
  }

  deleteAddress(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  getByID(id:number){
    return this.http.get(`${this.url}/${id}`)
  
  }
  updateAddress(id:number, data:any){
    return this.http.put(`${this.url}/${id}`,data)
  }
}
