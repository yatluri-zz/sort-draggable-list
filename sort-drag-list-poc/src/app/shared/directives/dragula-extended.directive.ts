import {
	Directive,
	OnChanges,
	AfterViewInit,
	EventEmitter,
	OnInit,
	Output,
	Input,
	OnDestroy,
	ElementRef,
	SimpleChange
} from '@angular/core';
import { dragula, DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
@Directive({
	selector: 'ngx-datatable[dragulaName]'
})
export class DragulaExtendedDirective implements OnChanges, OnInit, AfterViewInit, OnDestroy {
	@Input() public dragulaName: string;
	@Input() public dragulaModel: any;
	@Input() public dragulaVScroll: any;
	@Input() public classSelector: string = 'null';
	@Output() public directiveDrop: EventEmitter<any> = new EventEmitter<any>();
	@Output() public directiveDrag: EventEmitter<any> = new EventEmitter<any>();

	protected container: any;
	private drake: any;
	private options: any;
	private el: ElementRef;
	private dragulaService: DragulaService;
	subscriptionDrag: Subscription;
	subscriptionDrop: Subscription;
	constructor(elRef: ElementRef, dragulaService: DragulaService) {
		this.el = elRef;
		this.dragulaService = dragulaService;
	}

	ngOnInit() {}
	ngAfterViewInit() {
		if (this.el) {
			let container = this.el;

			if (container.nativeElement.querySelector('datatable-scroller')) {
				let parentRow = container.nativeElement.querySelector('datatable-scroller');

				if (!this.dragulaService.find(this.dragulaName)) {
					this.container = parentRow;
					this.initializeDragula();
				}
			}
		}
	}
	ngOnDestroy() {}
	initializeDragula() {
		let dragularContainer = this.dragulaService.find(this.dragulaName);
		if (dragularContainer) {
			this.drake = dragularContainer.drake;
			this.checkModel();
			this.drake.containers.push(this.container);
		} else {
			if (this.classSelector !== 'null') {
				let classSelector = this.classSelector;
				let options = {
					moves: (el, container, handle, sibling)=>{
						return handle.className === classSelector;
					}
				};
				this.drake = dragula([ this.container ], options);
			} else {
				let options = {
					revertOnSpill: true,
					moves: (el, container, handle) => {
						return handle.classList.contains('glyphicon-menu-hamburger');
					}
				};

				this.drake = dragula([ this.container ], options);
			}
			this.checkModel();
			this.dragulaService.add(this.dragulaName, this.drake);
		}
		
		this.subscriptionDrop = this.dragulaService.drop.subscribe((value) => {
			const [ bagName, el, target, source ] = value;
			this.onDropModel(value.slice(1));
		});
	}
	private checkModel() {
		if (this.dragulaModel) {
			if (this.drake.models) {
				this.drake.models.push(this.dragulaModel);
			} else {
				this.drake.models = [ this.dragulaModel ];
			}
		}
	}
	

	private onDropModel(args) {
		let [ el, target, source ] = args;
		this.directiveDrop.emit(this.dragulaModel);
	}

	public ngOnChanges(changes: { dragulaModel?: SimpleChange }): void {
		if (changes && changes.dragulaModel) {
			if (this.drake) {
				if (this.drake.models) {
					let modelIndex = this.drake.models.indexOf(changes.dragulaModel.previousValue);
					this.drake.models.splice(modelIndex, 1, changes.dragulaModel.currentValue);
				} else {
					this.drake.models = [ changes.dragulaModel.currentValue ];
				}
			}
		}
	}
}
