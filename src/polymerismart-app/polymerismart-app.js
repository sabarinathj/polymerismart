import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-spinner/paper-spinner.js';
import { sharedStyles } from './shared-styles.js';
/**
 * @customElement
 * @polymer
 */
class PolymerismartApp extends PolymerElement {
  ready(){
    super.ready();
  }
  static get template() {
    return html`
      ${sharedStyles}
      <style>
        :host {
          display: block;
        }
      </style>
      <!--<paper-spinner active></paper-spinner>-->
      <div class="container">
        <h2>Hello [[prop1]]!</h2>
      </div>
      <app-location route="{{route}}"></app-location>
      <app-route
          route="{{route}}"
          pattern="/:page"
          data="{{routeData}}"
          tail="{{subroute}}">
      </app-route>
      <app-route
          route="{{subroute}}"
          pattern="/:id"
          data="{{subrouteData}}">
      </app-route>
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item"><a  class="nav-link"href="/make-transaction">Make Transaction</a></li>
            <li class="nav-item"><a class="nav-link" href="/transaction-history">Transaction History</a></li>
            <li class="nav-item"><a class="nav-link" href="/reports">Reports</a></li>
            <li class="nav-item"><a class="nav-link" href="/maps">Maps</a></li>
          </ul>
          </div>
          </nav> 
          <div class="d-flex justify-content-center">
            <paper-spinner active={{isActive}}></paper-spinner>
          </div> 
        <iron-pages selected=[[page]] attr-for-selected="name" selected-attribute="visible">
          <make-transaction name="make-transaction"></make-transaction>
          <transaction-history name="transaction-history"></transaction-history>
          <transaction-reports name="reports"></transaction-reports>
          <maps-check name="maps"></maps-check>
        </iron-pages>
      </div>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'polymer i smart'
      },
      page:{
        type: String,
        observer: '_pageChanged'
      }
    };
  }
  static get observers(){
    
    return ['_routeChanged(routeData.page)'];
    
  }
  _routeChanged(page){
    this.page = (page || ('make-transaction'))
  }
  _pageChanged(newPage, oldPage){
    this.isActive = true;
    switch(newPage){
      case 'make-transaction':
        import('./make-transaction.js');
        this.isActive = false;
        break;
      case 'transaction-history':
        import('./transaction-history.js');
        this.isActive = false;
        break;
      case 'reports':
        import('./transaction-reports.js');
        this.isActive = false;
        break;
      case 'maps':
        import('./maps-check.js');
        this.isActive = false;
        break;  
      default:
        this.page = 'make-transaction';      
    }
  }
}

window.customElements.define('polymerismart-app', PolymerismartApp);
