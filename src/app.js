import {qs, $on, $delegate} from './helpers';
import Store from './store';
import View from './view';
import Template from './template';
import Controller from './controller';

const pie = [{color : 'red', value : '50'}, {color : 'green', value : '50'},{color : 'yellow', value : '50'}];

const store = new Store('todos-vanilla-es6');
store.insert( pie );

const localStorage = window.localStorage;

const template = new Template();

const view = new View( template );

const controller = new Controller( store, view );

window.addEventListener("hashchange", function( event ){
	
	console.log( document.location.hash );
	console.log( event );
				
});


var family = [ { firstName:  'Doroty' , lastname: 'Gamble' }, { firstName:  'Smith', lastname: 'Buble' }, { firstName:  'kate',lastname: 'Ramble' }   ];

class ULBind{
	constructor( value ){
		const _this = this;
	
		this.value = value;
		this.updateList = function(){
			//document.getElementById("data-list").innerHTML = this.value.reduce((a, item) => a + `<li> ${item.firstName}</li> `, '');
			
			document.getElementById("data-list").innerHTML =  this.value.map((s)=>{
				return `<li> ${s.firstName}</li> `
			}).join('');
			
		}
		this.add = function( val ){
			this.value.push(val);
			this.updateList();
		}
		this.remove = function(){
			this.value.pop();
			this.updateList();
		}		
		this.init = function(){
			this.updateList();
		}		
	}

}
const list = new ULBind( family );
list.init();

const button1 = document.getElementById("add-data-btn");

button1.addEventListener('click', function(event){
	list.add({ firstName:  'Doroty' , lastname: 'Gamble' });
});

const button2 = document.getElementById("remove-data-btn");

button2.addEventListener('click', function(event){
	list.remove();
});


class Binding {
	constructor(b){
		const _this = this;
		
		this.elementBindings = [];

  		this.value = b.object[b.property];

    	this.valueGetter = function(){
        	return _this.value;
    	}
    	this.valueSetter = function(val){
			var i = _this.elementBindings.length;
        	while(i--) {
				_this.elementBindings[ i ].element[ _this.elementBindings[ i ].attribute ] = val;
        	}
    	}
    	this.addBinding = function(element, attribute, event){
        	var binding = {
            	element: element,
            	attribute: attribute
        	}
        	if (event){
            	element.addEventListener(event, function(event){
                	_this.valueSetter(element[attribute]);
            	})
           	 binding.event = event;
        	}       
        	this.elementBindings.push(binding)
        	return _this;
    	}
 		Object.defineProperty(b.object, b.property, {
        	get: this.valueGetter,
        	set: this.valueSetter
   		}); 

	}
   
   
}


var person = {  name:  'Doroty' };

var myInputElement1 = document.getElementById("myText1")
var myInputElement2 = document.getElementById("myText2")
var myDOMElement = document.getElementById("myDomElement")

const bindme = new Binding( { object: person ,  property: "name" });

bindme
		.addBinding(myInputElement1, "value", "keyup")
		.addBinding(myInputElement2, "value", "keyup")
		.addBinding(myDOMElement, "innerHTML");

person.name = 'Suka sima';




//const setView = () => controller.setView( pie );

//$on(window, 'load', setView); 


/*
store.clearAll();

store.insert(  pie );

store.update('red',100);	

const un = store.getContent();

console.log(  un  );



/*
const template = new Template();
const view = new View(template);

const controller = new Controller(store, view);

const setView = () => controller.setView(document.location.hash);
$on(window, 'load', setView);
$on(window, 'hashchange', setView);

*/