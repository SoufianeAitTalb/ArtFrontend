import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agent } from '../api/Agent';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClientModule } from '@angular/common/http';
import {Paint} from "../api/Paint";

@Injectable()
export class CategoryService {
    num=0;

    constructor(private http:HttpClient) {}




    public getCategories():Observable<Paint[]>{
      return this.http.get<Paint[]>(environment.backendHost+"/api/categories/dto/");
   }

    //
    // addPaint(paint:Paint){
    //     this.http.post(environment.backendHost+"/api/paints/add-paint",paint).subscribe();
    // }
    // updatePaint(paint:Paint){
    //     this.http.put( environment.backendHost+"/api/paints/update-paint/"+paint.paintId,{...paint}).subscribe();
    //
    // }
    // deletePaintById(id: bigint) {
    //
    //    this.http.delete(environment.backendHost+"/api/paints/delete-paint/"+id).subscribe();
    // }
    //
    //
    //
    // getPaintById(id: bigint):Observable<Paint> {
    //
    //     return this.http.get<Paint>(environment.backendHost+"/api/paints/"+id);
    // }
    //


}
