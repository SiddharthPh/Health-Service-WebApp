// (function () {
//     'use strict'
  
    // feather.replace()
  
    // 
  function randomData(min,max){
    return Math.random()*(max-min+1)+min
  }
  var temp_data=[]
  var label_final=[]
  var count=7
  var label_init=['Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday']
  var j=0;
  for(i=0;i<count;i++)
  {
    var temp_value=randomData(36,39)
    temp_data.push(temp_value)
    dummy=label_init[j]
    label_final.push(label_init[j])
    console.log(temp_value)
    if(i>0){
      if(temp_data[i-1]<=37.5 && temp_data[i-1]>=36.5){
        if (temp_value>37.5) {
          
          i++;
          temp_data[i-1]=37.5;
          temp_data[i]=temp_value;
          label_final[i-1]=dummy+'..'
          label_final[i]=dummy
          count++;
          console.log(1);
        }
        else if(temp_value<36.5)
        {
          i++;
          temp_data[i-1]=36.5;
          temp_data[i]=temp_value;
          label_final[i-1]=dummy+'..'
          label_final[i]=dummy
          count++;
          console.log(2);

        }
      }
      else if(temp_data[i-1]>37.5)
      {
        if (temp_value<37.5 && temp_value>=36.5) {
          i++;
          temp_data[i-1]=37.5;
          temp_data[i]=temp_value;
          label_final[i-1]=dummy+'..'
          label_final[i]=dummy
          count++;
          console.log(3);

        }
        else if(temp_value<36.5){
          label_final.push(' ')
          i=i+2;
          temp_data[i-2]=37.5;
          temp_data[i-1]=36.5;
          temp_data[i]=temp_value;
          label_final[i-2]=dummy+'...'
          label_final[i-1]=dummy+'..'
          label_final[i]=dummy
          count=count+2;
          console.log(4);
        }
      }
      else{
        if (temp_value<=37.5 && temp_value>36.5) {
          i++;
          temp_data[i-1]=36.5;
          temp_data[i]=temp_value;
          label_final[i-1]=dummy+'..'
          label_final[i]=dummy
          count++;
          console.log(5);

        }
        else if(temp_value>37.5){
          label_final.push(' ')
          i=i+2;
          temp_data[i-2]=36.5;
          temp_data[i-1]=37.5;
          temp_data[i]=temp_value;
          label_final[i-2]=dummy+'...'
          label_final[i-1]=dummy+'..'
          label_final[i]=dummy
          count=count+2;
          console.log(6);
        }
      }

      }
      j++;
  }
  var ctx = document.getElementById('myChart').getContext('2d');
//adding custom chart type
Chart.defaults.multicolorLine = Chart.defaults.line;
Chart.controllers.multicolorLine = Chart.controllers.line.extend({
  draw: function(ease) {
    var
      startIndex = 0,
      meta = this.getMeta(),
      points = meta.data || [],
      colors = this.getDataset().colors,
      area = this.chart.chartArea,
      originalDatasets = meta.dataset._children
        .filter(function(data) {
          return !isNaN(data._view.y);
        });

    function _setColor(newColor, meta) {
      meta.dataset._view.borderColor = newColor;
    }

    if (!colors) {
      Chart.controllers.line.prototype.draw.call(this, ease);
      return;
    }

    for (var i = 0; i < meta.dataset._children.length; i++) {
      const slicer = i + 2;
      // console.log(i);
      if(i>0){
        if (meta.dataset._chart.config.data.datasets['0'].data[i+1] < (meta.dataset._chart.config.data.datasets['0'].data[i-1]))
        {
      if (meta.dataset._chart.config.data.datasets['0'].data[i] <= '36.5') {
          _setColor('blue', meta);
      }else if (meta.dataset._chart.config.data.datasets['0'].data[i] <= '37.5' && meta.dataset._chart.config.data.datasets['0'].data[i] >'36.5') {
        _setColor('green',meta)
      } 
      else{
          _setColor('red', meta);
      }
    }
    else{
      if (meta.dataset._chart.config.data.datasets['0'].data[i] < '36.5') {
        _setColor('blue', meta);
    }else if (meta.dataset._chart.config.data.datasets['0'].data[i] < '37.5' && meta.dataset._chart.config.data.datasets['0'].data[i] >='36.5') {
      _setColor('green',meta)
    } 
    else{
        _setColor('red', meta);
    }

    }
  }
  else{
    if (meta.dataset._chart.config.data.datasets['0'].data[i+1] < (meta.dataset._chart.config.data.datasets['0'].data[i]))
        {
      if (meta.dataset._chart.config.data.datasets['0'].data[i] < '36.5') {
          _setColor('blue', meta);
      }else if (meta.dataset._chart.config.data.datasets['0'].data[i] < '37.5' && meta.dataset._chart.config.data.datasets['0'].data[i] >='36.5') {
        _setColor('green',meta)
      } 
      else{
          _setColor('red', meta);
      }
    }
    else{
      if (meta.dataset._chart.config.data.datasets['0'].data[i] <= '36.5') {
        _setColor('blue', meta);
    }else if (meta.dataset._chart.config.data.datasets['0'].data[i] <= '37.5' && meta.dataset._chart.config.data.datasets['0'].data[i] >'36.5') {
      _setColor('green',meta)
    } 
    else{
        _setColor('red', meta);
    }

    }
  }


    
      meta.dataset._children = originalDatasets.slice(i, slicer);
      // console.log(meta.dataset._chart.config.data.datasets['0'].data[i] < 36);

      meta.dataset.draw();
      meta.dataset._children = originalDatasets;
  }

    points.forEach(function(point) {
      point.draw(area);
    });
  }
});
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'multicolorLine',

    // The data for our dataset
    data: {
      labels: label_final,
        datasets: [{
            label: "Temperature",
            borderColor: 'rgb(128, 99, 132)',
            data:temp_data,
            //first color is not important
            colors: ['', 'red', 'green', 'blue']
        }]
    },

    // Configuration options go here
    options: {}
});
//   })()
function temp(){var temp_data=[]
  var label_final=[]
  var count=7
  var label_init=['Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday']
  var j=0;
  for(i=0;i<count;i++)
  {
    var temp_value=randomData(36,39)
    temp_data.push(temp_value)
    dummy=label_init[j]
    label_final.push(label_init[j])
    console.log(temp_value)
    if(i>0){
      if(temp_data[i-1]<=37.5 && temp_data[i-1]>=36.5){
        if (temp_value>37.5) {
          
          i++;
          temp_data[i-1]=37.5;
          temp_data[i]=temp_value;
          label_final[i-1]=dummy+'..'
          label_final[i]=dummy
          count++;
          console.log(1);
        }
        else if(temp_value<36.5)
        {
          i++;
          temp_data[i-1]=36.5;
          temp_data[i]=temp_value;
          label_final[i-1]=dummy+'..'
          label_final[i]=dummy
          count++;
          console.log(2);

        }
      }
      else if(temp_data[i-1]>37.5)
      {
        if (temp_value<37.5 && temp_value>=36.5) {
          i++;
          temp_data[i-1]=37.5;
          temp_data[i]=temp_value;
          label_final[i-1]=dummy+'..'
          label_final[i]=dummy
          count++;
          console.log(3);

        }
        else if(temp_value<36.5){
          label_final.push(' ')
          i=i+2;
          temp_data[i-2]=37.5;
          temp_data[i-1]=36.5;
          temp_data[i]=temp_value;
          label_final[i-2]=dummy+'...'
          label_final[i-1]=dummy+'..'
          label_final[i]=dummy
          count=count+2;
          console.log(4);
        }
      }
      else{
        if (temp_value<=37.5 && temp_value>36.5) {
          i++;
          temp_data[i-1]=36.5;
          temp_data[i]=temp_value;
          label_final[i-1]=dummy+'..'
          label_final[i]=dummy
          count++;
          console.log(5);

        }
        else if(temp_value>37.5){
          label_final.push(' ')
          i=i+2;
          temp_data[i-2]=36.5;
          temp_data[i-1]=37.5;
          temp_data[i]=temp_value;
          label_final[i-2]=dummy+'...'
          label_final[i-1]=dummy+'..'
          label_final[i]=dummy
          count=count+2;
          console.log(6);
        }
      }

      }
      j++;
  }
  var ctx = document.getElementById('myChart').getContext('2d');
//adding custom chart type
Chart.defaults.multicolorLine = Chart.defaults.line;
Chart.controllers.multicolorLine = Chart.controllers.line.extend({
  draw: function(ease) {
    var
      startIndex = 0,
      meta = this.getMeta(),
      points = meta.data || [],
      colors = this.getDataset().colors,
      area = this.chart.chartArea,
      originalDatasets = meta.dataset._children
        .filter(function(data) {
          return !isNaN(data._view.y);
        });

    function _setColor(newColor, meta) {
      meta.dataset._view.borderColor = newColor;
    }

    if (!colors) {
      Chart.controllers.line.prototype.draw.call(this, ease);
      return;
    }

    for (var i = 0; i < meta.dataset._children.length; i++) {
      const slicer = i + 2;
      // console.log(i);
      if(i>0){
        if (meta.dataset._chart.config.data.datasets['0'].data[i+1] < (meta.dataset._chart.config.data.datasets['0'].data[i-1]))
        {
      if (meta.dataset._chart.config.data.datasets['0'].data[i] <= '36.5') {
          _setColor('blue', meta);
      }else if (meta.dataset._chart.config.data.datasets['0'].data[i] <= '37.5' && meta.dataset._chart.config.data.datasets['0'].data[i] >'36.5') {
        _setColor('green',meta)
      } 
      else{
          _setColor('red', meta);
      }
    }
    else{
      if (meta.dataset._chart.config.data.datasets['0'].data[i] < '36.5') {
        _setColor('blue', meta);
    }else if (meta.dataset._chart.config.data.datasets['0'].data[i] < '37.5' && meta.dataset._chart.config.data.datasets['0'].data[i] >='36.5') {
      _setColor('green',meta)
    } 
    else{
        _setColor('red', meta);
    }

    }
  }
  else{
    if (meta.dataset._chart.config.data.datasets['0'].data[i+1] < (meta.dataset._chart.config.data.datasets['0'].data[i]))
        {
      if (meta.dataset._chart.config.data.datasets['0'].data[i] < '36.5') {
          _setColor('blue', meta);
      }else if (meta.dataset._chart.config.data.datasets['0'].data[i] < '37.5' && meta.dataset._chart.config.data.datasets['0'].data[i] >='36.5') {
        _setColor('green',meta)
      } 
      else{
          _setColor('red', meta);
      }
    }
    else{
      if (meta.dataset._chart.config.data.datasets['0'].data[i] <= '36.5') {
        _setColor('blue', meta);
    }else if (meta.dataset._chart.config.data.datasets['0'].data[i] <= '37.5' && meta.dataset._chart.config.data.datasets['0'].data[i] >'36.5') {
      _setColor('green',meta)
    } 
    else{
        _setColor('red', meta);
    }

    }
  }


    
      meta.dataset._children = originalDatasets.slice(i, slicer);
      // console.log(meta.dataset._chart.config.data.datasets['0'].data[i] < 36);

      meta.dataset.draw();
      meta.dataset._children = originalDatasets;
  }

    points.forEach(function(point) {
      point.draw(area);
    });
  }
});
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'multicolorLine',

    // The data for our dataset
    data: {
      labels: label_final,
        datasets: [{
            label: "Temperature",
            borderColor: 'rgb(128, 99, 132)',
            data:temp_data,
            //first color is not important
            colors: ['', 'red', 'green', 'blue']
        }]
    },

    // Configuration options go here
    options: {
      legend:{display:true
      }
    }
});}
function bmi(){
    var ctx = document.getElementById('myChart')
    // eslint-disable-next-line no-unused-vars
    var temp_chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Sunday1',
          'Monday2',
          'Tuesday3',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        datasets: [{
          data: [
            15339,
            21345,
            18483,
            24003,
            23489,
            24092,
            12034
          ],
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 4,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            },
            gridLines:{
                display:false
            }
          }],
          xAxes:[{
              gridLines:{
                  display:true
              }
          }]
        },
        legend: {
          display: false
        }
      }
    })

}
function bloodp(){
    var ctx = document.getElementById('myChart')
    // eslint-disable-next-line no-unused-vars
    var temp_chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Sunday1',
          'Monday2',
          'Tuesday3',
          'Wednesday4',
          'Thursday5',
          'Friday',
          'Saturday'
        ],
        datasets: [{
          data: [
            15339,
            21345,
            18483,
            24003,
            23489,
            24092,
            12034
          ],
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 4,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            },
            gridLines:{
                display:false
            }
          }],
          xAxes:[{
              gridLines:{
                  display:true
              }
          }]
        },
        legend: {
          display: false
        }
      }
    })

}




var ctx1 = document.getElementById('myChart1')
    // eslint-disable-next-line no-unused-vars
    var temp_chart = new Chart(ctx1, {
      type: 'line',
      data: {
        labels: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        datasets: [{
          data: [
            15339,
            21345,
            18483,
            24003,
            23489,
            24092,
            12034
          ],
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 4,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            },
            gridLines:{
                display:false
            }
          }]
        },
        legend: {
          display: false
        }
      }
    })
//   })()
function temp1(){
    var ctx = document.getElementById('myChart1')
    // eslint-disable-next-line no-unused-vars
    var temp_chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        datasets: [{
          data: [
            15339,
            21345,
            18483,
            24003,
            23489,
            24092,
            12034
          ],
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 4,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false,
            },
            gridLines:{
                display:false
            }
          }]
        },
        legend: {
          display: false
        }
      }
    })
}
function bmi1(){
    var ctx = document.getElementById('myChart1')
    // eslint-disable-next-line no-unused-vars
    var temp_chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Sunday1',
          'Monday2',
          'Tuesday3',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        datasets: [{
          data: [
            15339,
            21345,
            18483,
            24003,
            23489,
            24092,
            12034
          ],
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 4,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            },
            gridLines:{
                display:false
            }
          }],
          xAxes:[{
              gridLines:{
                  display:true
              }
          }]
        },
        legend: {
          display: false
        }
      }
    })

}
function bloodp1(){
    var ctx = document.getElementById('myChart1')
    // eslint-disable-next-line no-unused-vars
    var temp_chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Sunday1',
          'Monday2',
          'Tuesday3',
          'Wednesday4',
          'Thursday5',
          'Friday',
          'Saturday'
        ],
        datasets: [{
          data: [
            15339,
            21345,
            18483,
            24003,
            23489,
            24092,
            12034
          ],
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 4,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            },
            gridLines:{
                display:false
            }
          }],
          xAxes:[{
              gridLines:{
                  display:true
              }
          }]
        },
        legend: {
          display: false
        }
      }
    })

}