import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRouteConfig } from './app.route.config';
import { SortablejsModule } from 'angular-sortablejs';
import { ToastrModule } from 'ngx-toastr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { ModalModule, BsDatepickerModule, BsDropdownModule, TooltipModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { SortListComponent } from './sort-list/sort-list.component';
import { SortListService } from './sort-list/service/sort-list.service';
import { DragulaExtendedDirective } from './shared/directives/dragula-extended.directive';
import { SortAuthInterceptor } from './shared/interceptors/sort.Auth.interceptors';

@NgModule({
	declarations: [ AppComponent, SortListComponent, DragulaExtendedDirective ],
	imports: [
		BrowserModule,
		BsDatepickerModule.forRoot(),
		BsDropdownModule.forRoot(),
		DragulaModule,
		FormsModule,
		HttpClientModule,
		ModalModule.forRoot(),
		ReactiveFormsModule,
		SortablejsModule.forRoot({ animation: 150 }),
		TooltipModule.forRoot(),
		ToastrModule.forRoot({ preventDuplicates: true }),
		NgxDatatableModule,
		AppRouteConfig
	],
	providers: [
		SortListService,
		DragulaService,
		{ provide: HTTP_INTERCEPTORS, useClass: SortAuthInterceptor, multi: true }
	],
	exports: [ DragulaExtendedDirective ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
