import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export abstract class SortRestService<T> {
	constructor(protected http: HttpClient) {}

	abstract getUri(): string;

	getAll(): Observable<T[]> {
		return this.http.get<T[]>(`${this.getUri()}`).pipe(
			map((response) => {
				return response;
			})
		);
	}

	updateAll(model:T[]):Observable<T[]>{
		return this.http.put<T[]>(`${this.getUri()}`,model).pipe(
			map((response)=>{
				return response;
			})
		);
	}
}
