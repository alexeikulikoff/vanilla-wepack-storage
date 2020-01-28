
import {qs, $on, $delegate} from './helpers';
import Template from './template';
import  * as d3 from 'd3';

const colors = [ "red", "green", "yellow"]    ;

export const margin = {
	"margin-top" : 25,
	"margin-bottom" : 25,
	"margin-left" : 0 ,
	"margin-right" : 0
}

export default class View {
	/**
	 * @param {!Template} template A Template instance
	 */
	constructor(template) {
		const _this = this;
		this.template = template;
		this.$divRange = qs('.div-range');
		this.width = qs('.graph-conteiner').clientWidth;
		this.height = qs('.graph-conteiner').clientHeight;

		this.initPie = function( ){
			var svgNS = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			svgNS.setAttribute( 'width', this.width );
			svgNS.setAttribute( 'height', this.height );
			svgNS.setAttribute( 'class', 'svg' );
			qs('.graph-conteiner').appendChild( svgNS );
		}
	
		this.drayPie = function(store ){
		
			const data = store.getContent();
			const svg = d3.select( '.svg' );
			const radius = Math.min( this.width, this.height ) / 2;
			svg.select("g").remove()	;
			
			const g = svg.append( "g" ).attr( "id", "pie-chart" );
			
			const pie = d3.pie()
						.sort(( a,b )=> a.color.length >  b.color.length )
						.value(function( d ) {
							return parseInt( d.value );
						});
			
			const arc = d3.arc()
						.outerRadius( radius * 0.8 )
						.innerRadius( radius * 0.4 )
						
			const shiftX = parseInt(margin["margin-left"]) + this.width / 2
			g.attr("transform", "translate(" + shiftX + "," + this.height / 2 + ")")
			//const color = d3.scaleOrdinal().domain( data.map(( s )=> { s })).range( colors );
			
			g.attr("stroke", "#f8f8f8")
				.selectAll("path")
	    		.data( pie( data ) )
	   			.join("path")
	     		.attr("fill", ( s )=>{  return s.data.color  })
				.attr("class", "slice")
				.attr("id", (s)=>'slice' + s.index )
	     		.attr("d", arc)
		}
	}
	
	showRangeList(list){
		return this.$divRange.innerHTML = this.template.rangeList(list);
	}
	
	print_me(){
		console.log('print me');
	}
	bindMoveRange(store, _this){
		[].forEach.call(document.querySelectorAll(".input-range"), function( range ) {
			range.addEventListener("change", function( event ){
				store.update( event.target.dataset.id, event.target.value );
			//	_this.drayPie( store );
				//console.log(store.getContent());
				
			});
		});
	}
	bindMouseMoveRange(store, _this){
		[].forEach.call(document.querySelectorAll(".input-range"), function( range ) {
			
			
			var listener = function() {
  					window.requestAnimationFrame(function() {
    				document.getElementById("range-value").innerHTML = range.value;
					store.update( range.dataset.id, range.value );
					_this.drayPie( store );
  				});
			};
			range.addEventListener("mousedown", function() {
 				 listener();
 			 	 range.addEventListener("mousemove", listener);
			});
			range.addEventListener("mouseup", function() {
  				range.removeEventListener("mousemove", listener);
			});
			
			range.addEventListener("keydown", listener);
			
		});
	}
}
