import { Injectable} from '@angular/core';
import {HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class SortAuthInterceptor implements HttpInterceptor{
    constructor(){}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler        
    ): Observable<HttpEvent<any>>{
        console.log(req.url);
        const reqClone = req.clone({headers: new HttpHeaders()});
        return next.handle(reqClone);
    }
}