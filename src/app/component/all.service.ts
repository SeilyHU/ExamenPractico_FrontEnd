import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllService {
  private apiURL = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }
  headers = new HttpHeaders();
  
   crearEmpresa(body:any){
    this.headers.set('Content-Type', 'application/json');
    return  this.http.post(`${this.apiURL}/crear`, body, {headers: this.headers})
  }

  getAllData(){
    return this.http.get(`${this.apiURL}/leer`)
  }

  getProject(id:any){
    return this.http.get(`${this.apiURL}/leer/${id}`);
}

  putAllData(id:any, body:any){
    this.headers.set('Content-Type', 'application/json');
    return this.http.put(`${this.apiURL}/actualizar/${id}`,body,{headers: this.headers})
  }

  deleteRegister(id:any){
    return this.http.delete(`${this.apiURL}/eliminar/${id}`);
  }
}
