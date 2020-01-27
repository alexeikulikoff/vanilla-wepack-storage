import {Item, ItemList, ItemQuery, ItemUpdate, emptyItemQuery} from './item';

export default class Store {
	/**
	 * @param {!string} name Database name
	 * @param {function()} [callback] Called when the Store is ready
	 */
	constructor(name) {
	
		this.name = name;
		
		const localStorage = window.localStorage;
		
		this.getLocalStorage = () => {
			return JSON.parse(localStorage.getItem(name) || '[]');
		};
		this.setLocalStorage = ( value ) => {
			localStorage.setItem(name, JSON.stringify( value ));
		};
		
		
	}
	insert(value){
		this.setLocalStorage( value );
	}
	update(color, value) {
		const content = JSON.parse( localStorage.getItem(this.name) );
		if (content != null){
			localStorage.setItem(this.name,  JSON.stringify( content.map((s)=> {
				return (s.color===color) ? {...s, value: value} : s
			}) ));	
		}
	} 

	getContent(){
		return this.getLocalStorage();
	}
	clearAll(){
		localStorage.clear();
	}
}
