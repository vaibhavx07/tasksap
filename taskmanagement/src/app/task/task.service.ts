import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import {Task} from './Task'
@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(private http: HttpClient) { }

    taskCreate(taskdata: Task) {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let options = { headers: headers };
        let API_URL = environment.URL + 'createtask';
        return this.http.post(API_URL, taskdata, options)
            .pipe(
                catchError(this.error)
            )
    }
    taskupdate(taskdata: Task,id:number) {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let options = { headers: headers };
        let API_URL = environment.URL + 'createtask/'+id;
        return this.http.post(API_URL, taskdata, options)
            .pipe(
                catchError(this.error)
            )
    }
    tasklist() {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        let API_URL = environment.URL + 'tasklist';
        return this.http.get(API_URL);
           
    }
    taskdelete(id:number) {
       
        let API_URL = environment.URL + 'deletetask/'+id
        return this.http.delete(API_URL);
           
    }
    error(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(error);
    }

}