import {qs, $on, $delegate} from './helpers';
import Store from './store';
import View from './view';
import Template from './template';
import Controller from './controller';

const pie = [{color : 'red', value : '50'}, {color : 'green', value : '50'},{color : 'yellow', value : '50'}];

const store = new Store('todos-vanilla-es6');
store.insert( pie );


const template = new Template();

const view = new View( template );

const controller = new Controller( store, view );

window.addEventListener("hashchange", function( event ){
	
	console.log( document.location.hash );
	console.log( event );
				
});

class Binding {
	constructor(b){
		const _this = this;
		console.log(this);
    	this.elementBindings = [];
    	
		this.value = b.object[b.property];
		
		this.total = 1000;
	
    	this.valueGetter = function(){
        	return _this.value;
    	}
    	this.valueSetter = function(val){
        	_this.value = val;
        	for (var i = 0; i < _this.elementBindings.length; i++) {
            	var binding=_this.elementBindings[i];
            	binding.element[binding.attribute] = val;
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
        	element[attribute] = _this.value
        	return _this
    	}
 		Object.defineProperty(b.object, b.property, {
        	get: this.valueGetter,
        	set: this.valueSetter
   		}); 

    	b.object[b.property] = this.value;
	}
   
   
}


var obj = { abcd:123 };

var myInputElement1 = document.getElementById("myText1")
var myInputElement2 = document.getElementById("myText2")
var myDOMElement = document.getElementById("myDomElement")

const bindAll = new Binding({ object: obj, property: "abcd" });

bindAll.addBinding(myInputElement1, "value", "keyup");

bindAll.addBinding(myInputElement2, "value", "keyup");

bindAll.addBinding(myDOMElement, "innerHTML");



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