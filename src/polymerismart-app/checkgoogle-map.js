import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@em-polymer/google-map/google-map.js';

//@customElement('google-map')
class CheckgoogleMap extends PolymerElement{ 
 
    static get template(){
        return html `
			sample check
            
			<google-map fit-to-markers api-key="AIzaSyA9nj9FWgbmPOkUOEh4HUrUeqQkjgF3ERo">
				<google-map-marker latitude="37.78" longitude="-122.4" draggable="true"></google-map-marker>
			</google-map>
            
            
        `
    }

}
customElements.define("checkgoogle-map", CheckgoogleMap);
