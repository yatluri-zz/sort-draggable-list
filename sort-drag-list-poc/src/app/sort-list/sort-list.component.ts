import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { SortListService } from './service/sort-list.service';
import { SortList } from '../shared/models/sortList';
import * as _ from 'lodash';
import { DragulaExtendedDirective } from '../shared/directives/dragula-extended.directive';
@Component({
	selector: 'app-sort-list',
	templateUrl: './sort-list.component.html',
	styleUrls: [ './sort-list.component.scss' ]
})
export class SortListComponent implements OnInit, OnDestroy {
	data: Array<SortList> = [ { id: 0, name: 'sample', imageUrl: '', price: 0, isSelected: false } ];
	selectedArrayList: Array<SortList> = [];
	columns = [
		{ prop: '', name: '' },
		{ prop: 'name', name: 'Name' },
		{ prop: 'imageUrl', name: 'Product' },
		{ prop: 'price', name: 'Price' }
	];
	ListGlobalActions = [ 'Delete' ];

	constructor(private http: SortListService, private rendererService: Renderer2) {}

	ngOnInit() {
		this.http.getAll().subscribe((response: SortList[]) => {
			if (response) {
				this.data = response['products'];
			}
		});
	}

	ngOnDestroy() {}
	onDrop(event) {
		event.slice();
		const sortArray: Array<SortList> = [ ...event ];
		if (_.isEqual(this.data.sort(), sortArray.sort())) {
			this.data = this.data;
			// this.http.updateAll(this.data).subscribe((response:SortList[])=>{
			// 	this.data = response;
			// });
		}
	}
	onDrag(event) {
		console.log('DRAG event::', event);
	}

	onSelect($event) {
		this.selectedArrayList = $event.selected;
	}

	onCheckboxChange($event) {
		this.selectedArrayList.some((v, k) => {
			return v.id === $event.id;
		})
			? this.selectedArrayList.splice(
					this.selectedArrayList.findIndex((c) => {
						return c.id === $event.id;
					}),
					1
				)
			: this.selectedArrayList.push($event);
	}

	onDeleteAll() {
		console.log('delete all');
	}
}
