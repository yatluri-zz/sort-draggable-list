import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SortRestService } from '../../shared/services/sort.rest.service';
import { SortList } from '../../shared/models/sortList';

@Injectable()
export class SortListService extends SortRestService<SortList> {
	constructor(protected http: HttpClient) {
		super(http);
	}
	getUri(): string {
		return 'assets/json/sort-list-items.json';
	}
}
