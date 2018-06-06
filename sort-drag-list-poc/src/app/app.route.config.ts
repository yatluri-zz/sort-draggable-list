import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SortListComponent } from './sort-list/sort-list.component';
const sortRoutes: Routes = [
	{ path: 'sortList', component: SortListComponent },
	{ path: '**', redirectTo: 'sortList' }
];

@NgModule({
	declarations: [],
	imports: [ RouterModule.forRoot(sortRoutes, { useHash: true }) ],
	exports: [ RouterModule ]
})
export class AppRouteConfig {}
