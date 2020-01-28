
import Store from './store';
import View from './view';

export default class Controller {

	constructor(store, view) {
		this.store = store;
		this.view = view;
		this.view.showRangeList( store.getContent() );
		this.view.bindMoveRange( this.store, this.view );
		
		this.view.bindMouseMoveRange( this.store, this.view );
		const dim = this.view.initPie( this.store );
		this.view.drayPie( this.store,  dim);
	}
	
	setView( items ) {
	/*	this.view.showRangeList( items );
		const store1 = this.store;
		[].forEach.call(document.querySelectorAll(".input-range"), function( range ) {
			range.addEventListener("change", function( event ){
				store1.update( event.target.dataset.id, event.target.value );
				console.log(store1.getContent());
				
			});
		});
*/		
	}

}
