import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@em-polymer/google-map/google-map.js';
import '@em-polymer/google-map/google-map-marker.js';
import '@polymer/iron-selector/iron-selector.js';
import '@em-polymer/google-apis/google-apis.js';
class TransactionReports extends PolymerElement{
    constructor(){
        super();
    }
    ready(){
        
        super.ready();

        let paymentReportajax = this.$.ajax;
        paymentReportajax.method = "GET";
        paymentReportajax.contentType = "application/json";
        paymentReportajax.url = "http://localhost:3000/newtransactionHistory";
        paymentReportajax.generateRequest(); 
        
    }
    handleResponse(event){
        
        let data = event.detail.response.map((transaction) => {
            return {
                "spendcategory": transaction.details[0]['spend-category'],
                "amount": parseInt(transaction.details[0].amount)
            }
        })
        console.log('data - - ', data);
        /*let data =  [];
        newArray.forEach((arr, i) => {
            console.log(arr);
            data.push(arr.details[0]);
        });   
*/
        
          
        // const data = [{date: 2011,amount: 45},{date: 2012,amount: 47},
        // {date: 2013,amount: 52},{date: 2014,amount: 70},
        // {date: 2015,amount: 75},{date: 2016,amount: 30},];
        // this.data= data; 
 

        
        this.data= data; 
        console.log("newly formed data",data);

        //data = event.detail.response[0].details;
        var svg = d3.select(this.$.svgImage),
            margin = 200,
            width = svg.attr("width") - margin,
            height = svg.attr("height") - margin

        svg.append("text")
        .attr("transform", "translate(100,0)")
        .attr("x", 50)
        .attr("y", 50)
        .attr("font-size", "24px")
        .text("Transaction History")

        var xScale = d3.scaleBand().range([0, width]).padding(0.4),
            yScale = d3.scaleLinear().range([height, 0]);

        var g = svg.append("g")
                .attr("transform", "translate(" + 100 + "," + 100 + ")");

        /*d3.csv(this.data, function(error, data) {
            if (error) {
                throw error;
            }*/

            xScale.domain(data.map(function(d) { return  d.spendcategory; }));
            
            //let yData = data.map(function(d, subarray ) { return  d.details[0].amount; });    
            yScale.domain([0, d3.max(data, function(d) { 
                //data.map(function(d, subarray ) { return  d.details[0].amount; })    
                return d.amount; 
            })]);
            g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale))
            .append("text")
            .attr("y", height - 250)
            .attr("x", width - 100)
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("spend category");

            g.append("g")
            .call(d3.axisLeft(yScale).tickFormat(function(d){
                return "$" + d;
            })
            .ticks(10))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "-5.1em")
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Amount Spent");

            g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return xScale(d.spendcategory); })
            .attr("y", function(d) { return yScale(d.amount); })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) { return height - yScale(d.amount); });

            
        /*});*/
    }
    static get properties(){
        return {
            pageTitle:{
                type: String,
                value: "This is transaction history page"
            }
        }
    }
    static get template(){
        return html `
            <h2>[[pageTitle]]</h2>
            
                
            
            <svg id="svgImage" width="980" height="500"></svg>
            <iron-ajax
                id="ajax"
                handle-as="json"
                on-response="handleResponse"
                debounce-duration="300">
            </iron-ajax>
            
        `
    }

}
customElements.define("transaction-reports", TransactionReports);