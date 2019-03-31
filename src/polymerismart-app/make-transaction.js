import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@polymer/paper-toast/paper-toast.js';
import { sharedStyles } from './shared-styles.js';
class makeTransactions extends PolymerElement{
    constructor(){
        super();
    }
    ready(){
        super.ready();
        // this.$.transactionForm.addEventListener('iron-form-submit', function(event){
        //     console.log(event.detail);
        // }.bind(this));
    }
    _makePaymetProcess(event){
        console.log(event.details);
    }
    static get properties(){
        return{
            pageTitle:{
                type: String,
                value: "This page is to create transaction"
            },
            spendCategory:{
                type: Array,
                value: ["Medical","Travel","Loans","Utility Bills","Education","Shopping","Misc"]
            },
            paymentType:{
                type: Array,
                value: ["make","receive"]
            },
            selectedCategory:{
                type: String,
                value: ''
            },
            selectedType:{
                type: String,
                value: ''
            }
            
        }
    }
    makeTransaction(event){
        let availableBalance = 10000;
        
        if((this.amount > availableBalance) && this.selectedType == "make"){
            this.invalid = true;
            this.amountValid = "Enter amount is more then your available balance";
            
        }else{
            this.invalid = false;
            if(this.$.transactionForm.validate()){
                //this.$.transactionForm.submit();
               console.log(this.selectedCategory, this.amount, this.description, this.selectedDate, this.selectedType);
               let makePaymentajax = this.$.ajax;
               makePaymentajax.method = "POST";
               makePaymentajax.contentType = "application/json";
               makePaymentajax.url = "http://localhost:3000/newtransactionHistory";
               let jsonBody = {"user_id": 1,"details": [{"spend-category": this.selectedCategory, "amount": this.amount, "date": this.selectedDate, "payment-type": this.selectedType, "description": this.description}]};
               let jsonString = JSON.stringify(jsonBody);
               let parseJsonData = JSON.parse(jsonString);
               makePaymentajax.body = jsonBody;
               makePaymentajax.generateRequest(); 
            }
        }
        
    }
    handleResponse(){
        this.$.successTransfer.toggle()
    }
    __getSpendCategory(){
        var spendCategories = [
            {"categoryName": "Medical"},
            {"categoryName": "Travel"},
            {"categoryName": "Loans"},
            {"categoryName": "Utility Bills"},
            {"categoryName": "Education"},
            {"categoryName": "Shopping"},
            {"categoryName": "Misc"}
        ]
        return spendCategories;
    }
    __getPaymentType(){
        var spendCategories = [
            {"selectedType": "make"},
            {"selectedType": "receive"}
        ]
        return spendCategories;
    }
    static get template(){
        return html `
        ${sharedStyles}
            <h2 class="my-3">This page is to create transaction</h2>
            <paper-toast id="successTransfer" text="Transaction successful" horizontal-align="center" vertical-align="middle"></paper-toast>
            <iron-form id="transactionForm" class="col-md-4 offset-md-4 border border-secondary pt-3 pb-3">
                
                <form>
                    <paper-dropdown-menu label="Select Category" name="selectCategory">
                        <paper-listbox slot="dropdown-content" selected="{{selectedCategory}}" attr-for-selected="name" selected-attribute="visible">
                            <template is="dom-repeat" items="[[spendCategory]]">
                                <paper-item name={{item}}>{{item}}</paper-item>
                            </template>
                        </paper-listbox>
                    </paper-dropdown-menu>
                    <paper-input label="Amount" required invalid="{{invalid}}" required error-message=[[amountValid]]  name="{{amount}}" value="{{amount}}"><div slot="prefix">$</div></paper-input>
                    <vaadin-date-picker label="Transaction Date" placeholder="Transaction Date" value="{{selectedDate}}"></vaadin-date-picker>
                    <paper-input label="description" required value="{{description}}"></paper-input>
                    <label id="paymentType">Payment Type:</label>
                    <paper-radio-group aria-labelledby="paymentType" name={{selectedType}} selected="{{selectedType}}">
                        <template is="dom-repeat" items={{paymentType}}>
                            <paper-radio-button name="{{item}}">{{item}}</paper-radio-button>
                        </template>
                    </paper-radio-group>
                    <paper-button label="Submit" required raised on-click="makeTransaction">Submit</paper-input>
                </form>
            </iron-form>
            <iron-ajax
                id="ajax"
                handle-as="json"
                on-response="handleResponse"
                debounce-duration="300">
            </iron-ajax>
        `
    }

}
customElements.define("make-transaction", makeTransactions);