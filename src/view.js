
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
		this.template = template;
		this.$divRange = qs('.div-range');
		
		
	}
	
	showRangeList(list){
		return this.$divRange.innerHTML = this.template.rangeList(list);
	}
	bindMoveRange(store){
		[].forEach.call(document.querySelectorAll(".input-range"), function( range ) {
			range.addEventListener("change", function( event ){
				store.update( event.target.dataset.id, event.target.value );
				console.log(store.getContent());
				
			});
		});
	}
	drayPie(store){
		const data = store.getContent();
		console.log(data);
		const elem = qs('.graph-conteiner');
		const width = elem.clientWidth;
		const height = elem.clientHeight
		const radius = Math.min( width, height ) / 2;
	
		
		var svgNS = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svgNS.setAttribute( 'width', width );
		svgNS.setAttribute( 'height', height );
		svgNS.setAttribute( 'class', 'svg' );
		elem.appendChild( svgNS );
		const svg = d3.select( '.svg' );
		svg.select("g").remove()	;
		
		const g = svg.append( "g" ).attr( "id", "pie-chart" );
		
		const pie = d3.pie()
					.sort(( a,b )=> parseInt( a.value ) > parseInt( b.value ))
					.value(function( d ) {
						return parseInt( d.value );
					});
		
		const arc = d3.arc()
					.outerRadius( radius * 0.8 )
					.innerRadius( radius * 0.4 )
					
		const shiftX = parseInt(margin["margin-left"]) + width / 2
		g.attr("transform", "translate(" + shiftX + "," + height / 2 + ")")
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
