import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@em-polymer/google-map/google-map.js';

class MapsCheck extends PolymerElement{
	static get template(){
		return html `
			<p>Google Maps Page</p>
			<google-map latitude="37.779" longitude="-122.3892"
				api-key="AIzaSyA9nj9FWgbmPOkUOEh4HUrUeqQkjgF3ERo" zoom="13" disable-default-ui>
			</google-map>
			<google-map fit-to-markers api-key="AIzaSyA9nj9FWgbmPOkUOEh4HUrUeqQkjgF3ERo">
				<google-map-marker latitude="37.78" longitude="-122.4" draggable="true"></google-map-marker>
			</google-map>
			
		`
	}
}
customElements.define('maps-check',MapsCheck);