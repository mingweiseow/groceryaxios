import {Line} from 'vue-chartjs'
import axios from 'axios'

export default{
    extends:Line,
    data: () => ({
        results:[],
        chartdata: {
          //labels:['2020-3-05',4,5,6],
          labels:[],
          datasets: [
            {
              label: [],
              data:[],
              //backgroundColor:['aqua','lightgreen','red','orange'],
              borderWidth: "",
              borderColor: "",
              backgroundColor:"",
              fill:false
            }
          ]
          
        },
        options: {
            scales:{
                yAxes:[{
                    ticks:{
                        min:0
                    }

                }]
            }
        }
      }),
    methods:{
    
    fetchData : function(){
        axios.get('https://data.gov.sg/api/action/datastore_search?resource_id=552b8662-3cbc-48c0-9fbb-abdc07fb377a').then(response=>{
        this.results=response.data.result.records

        var MRT = this.results.filter(function(transport) {
            return transport.type_of_public_transport == "MRT";
        });
        var LRT = this.results.filter(function(transport) {
            return transport.type_of_public_transport == "LRT";
        });
        var BUS = this.results.filter(function(transport) {
            return transport.type_of_public_transport == "Bus";
        });
        var TAXI = this.results.filter(function(transport) {
            return transport.type_of_public_transport == "Taxi";
        });

        var array = [];
        array.push(MRT, LRT, BUS, TAXI);
        var transport = ["MRT", "LRT", "Bus", "Taxi"];
        var colors = ["magenta", "red", "blue", "green"]

        function getRidership(array, type) {
            var arr = array.filter(function(transport) {
            return transport.type_of_public_transport == type;
            });
            var i;
            var data = []
            for (i = 0; i < arr.length; i++) {
               data.push(parseInt(arr[i].average_ridership));
            }
            return data;
        }
        
        function getYear(array) {
            var year = [];
            var i;
            for (i = 0; i < array.length; i++) {
                year.push(parseInt(array[i].year));
            }
            return year;
        }
        var j;
        var i;
        for(i = 0; i < array.length; i++){
            var dict = {
                "label": transport[i],
                "data": getRidership(array[i], transport[i]),
                "borderWidth": 0.5,
                "borderColor": colors[i],
                "backgroundColor": colors[i],
                "fill":false,
            };
            this.chartdata.datasets.push(dict)
        }
        for(j = 0; j < 22; j++)
        this.chartdata.labels.push(getYear(array[0])[j])
        
        this.renderChart(this.chartdata,this.options)
    })
    
    }
    
    },
     mounted(){
       // console.log('Do I come here')
        this.fetchData()
        
     }

    
    
    
}