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
function bloodp(){
  var j=0;
  var count=7
  var systolic_list=[]
  var diastolic_list=[]
  var label_init_bmi=['Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday']
  var label_final_bmi=[]
  for(var i=0;i<count;i++)
  {
  var systolic=randomData(80,190);
  systolic_list.push(systolic)
  var diastolic=0
  
  dummy=label_init[j]
  if (systolic<90){
    diastolic=randomData(50,60)
  }
  else if(systolic>=90 && systolic<120){
    diastolic=randomData(60,80)
  }
  else if(systolic>=120 && systolic<130){
    diastolic=randomData(80,85)
  }
  else if (systolic>=130 && systolic<140) {
    diastolic=randomData(85,90)
  }
  else if(systolic>=140 && systolic<180){
    diastolic=randomData(90,120)
  }
  else if(systolic>=180){
    diastolic=randomData(120,140)
  }
diastolic_list.push(diastolic)
if(i>0){
  if (systolic_list[i-1]<=90) {
    if(systolic>90 && systolic<=120)
    {
      i++
      systolic_list[i-1]=90
      diastolic_list[i-1]=60
      label_final_bmi[i-1]=dummy+'.'
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count++;
    }
    else if(systolic>120 && systolic<=130)
    {
      i=i+2
      systolic_list[i-2]=90
      diastolic_list[i-2]=60
      systolic_list[i-1]=120
      diastolic_list[i-1]=80
      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+2;

    }
    else if(systolic>130 && systolic<=140)
    {
      i=i+3
      systolic_list[i-3]=90
      diastolic_list[i-3]=60
      systolic_list[i-2]=120
      diastolic_list[i-2]=80
      systolic_list[i-1]=130
      diastolic_list[i-1]=85
      label_final_bmi[i-3]=dummy+'.'

      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+3;
    }
    else if(systolic>140 && systolic<=180)
  {
    i=i+4
      systolic_list[i-4]=90
      diastolic_list[i-4]=60
      systolic_list[i-3]=120
      diastolic_list[i-3]=80
      systolic_list[i-2]=130
      diastolic_list[i-2]=85
      systolic_list[i-1]=140
      diastolic_list[i-1]=90
      label_final_bmi[i-4]=dummy+'.'
      label_final_bmi[i-3]=dummy+'.'
      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+4;


  }
  else if(systolic>180)
  {
    i=i+5
      systolic_list[i-5]=90
      diastolic_list[i-5]=60
      systolic_list[i-4]=120
      diastolic_list[i-4]=80
      systolic_list[i-3]=130
      diastolic_list[i-3]=85
      systolic_list[i-2]=140
      diastolic_list[i-2]=90
      systolic_list[i-1]=180
      diastolic_list[i-1]=120
      label_final_bmi[i-5]=dummy+'.'
      label_final_bmi[i-4]=dummy+'.'
      label_final_bmi[i-3]=dummy+'.'
      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+5;
  }
    
  }
  else if(systolic_list[i-1]>90 && systolic_list[i-1]<=120){
    if(systolic<90)
    {
      i++
      systolic_list[i-1]=90
      diastolic_list[i-1]=60
      label_final_bmi[i-1]=dummy+'.'
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count++;
    }
    else if(systolic>120 && systolic<=130)
    {
      i++
      systolic_list[i-1]=120
      diastolic_list[i-1]=80
      label_final_bmi[i-1]=dummy+'.'
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy
      count++;
    }
    else if(systolic>130 && systolic<=140)
    {
      i=i+2
      systolic_list[i-2]=120
      diastolic_list[i-2]=80
      systolic_list[i-1]=130
      diastolic_list[i-1]=85
      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+2;

    }
    else if(systolic>140 && systolic<=180)
    {
      i=i+3
      systolic_list[i-3]=120
      diastolic_list[i-3]=80
      systolic_list[i-2]=130
      diastolic_list[i-2]=85
      systolic_list[i-1]=140
      diastolic_list[i-1]=90
      label_final_bmi[i-3]=dummy+'.'

      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+3;

    }
    else if(systolic>180)
    {
      i=i+4
      systolic_list[i-4]=120
      diastolic_list[i-4]=80
      systolic_list[i-3]=130
      diastolic_list[i-3]=85
      systolic_list[i-2]=140
      diastolic_list[i-2]=90
      systolic_list[i-1]=180
      diastolic_list[i-1]=120
      label_final_bmi[i-4]=dummy+'.'
      label_final_bmi[i-3]=dummy+'.'
      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+4;

    }
  }
  else if(systolic_list[i-1]>120 && systolic_list[i-1]<=130)
  {
    if(systolic<90)
    {
      i=i+2
      systolic_list[i-2]=120
      diastolic_list[i-2]=80
      systolic_list[i-1]=90
      diastolic_list[i-1]=60
      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+2;
      
    }
    else if(systolic>=90 && systolic<120)
    {
      i++
      systolic_list[i-1]=120
      diastolic_list[i-1]=80
      label_final_bmi[i-1]=dummy+'.'
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy
      count++;

    }
    else if(systolic>=130 && systolic<140)
    {
      i++
      systolic_list[i-1]=130
      diastolic_list[i-1]=85
      label_final_bmi[i-1]=dummy+'.'
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy
      count++;

    }
    else if(systolic>=140 && systolic<180)
    {
      i=i+2
      systolic_list[i-2]=130
      diastolic_list[i-2]=85
      systolic_list[i-1]=140
      diastolic_list[i-1]=90
      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+2;

    }
    else if(systolic>=180)
    {
      i=i+3
      systolic_list[i-3]=130
      diastolic_list[i-3]=85
      systolic_list[i-2]=140
      diastolic_list[i-2]=90
      systolic_list[i-1]=180
      diastolic_list[i-1]=120
      label_final_bmi[i-3]=dummy+'.'

      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+3;

    }
  }
  else if(systolic_list[i-1]>130 && systolic_list[i-1]<=140)
  {
    if(systolic<90)
    {
      i=i+3
      systolic_list[i-3]=130
      diastolic_list[i-3]=85
      systolic_list[i-2]=120
      diastolic_list[i-2]=80
      systolic_list[i-1]=90
      diastolic_list[i-1]=60
      label_final_bmi[i-3]=dummy+'.'

      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+3;
      
    }
    else if(systolic >=90 && systolic<120)
    {
      i=i+2
      systolic_list[i-2]=130
      diastolic_list[i-2]=85
      systolic_list[i-1]=120
      diastolic_list[i-1]=80
      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+2;

    }
    else if(systolic>=120 && systolic<130)
    {
      i++
      systolic_list[i-1]=130
      diastolic_list[i-1]=85
      label_final_bmi[i-1]=dummy+'.'
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy
      count++;
    }
    else if(systolic>=140 && systolic <180)
    {
      i++
      systolic_list[i-1]=140
      diastolic_list[i-1]=90
      label_final_bmi[i-1]=dummy+'.'
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy
      count++
    }
    else if(systolic>=180)
    {
      i=i+2
      systolic_list[i-2]=130
      diastolic_list[i-2]=85
      systolic_list[i-1]=140
      diastolic_list[i-1]=90
      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+2;
    }
  }
  else if(systolic_list[i-1]>=140 && systolic_list[i-1]<180)
  {
    if(systolic<90)
    {
      i=i+4
      systolic_list[i-4]=140
      diastolic_list[i-4]=90
      systolic_list[i-3]=130
      diastolic_list[i-3]=85
      systolic_list[i-2]=120
      diastolic_list[i-2]=80
      systolic_list[i-1]=90
      diastolic_list[i-1]=60
      label_final_bmi[i-4]=dummy+'.'
      label_final_bmi[i-3]=dummy+'.'
      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+4;
    }
    else if(systolic>=90 && systolic<120)
    {
      i=i+3
      systolic_list[i-3]=140
      diastolic_list[i-3]=90
      systolic_list[i-2]=130
      diastolic_list[i-2]=85
      systolic_list[i-1]=120
      diastolic_list[i-1]=80
      label_final_bmi[i-3]=dummy+'.'

      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+3;

    }
    else if(systolic>=120 && systolic<130)
    {
      i=i+2
      systolic_list[i-2]=140
      diastolic_list[i-2]=90
      systolic_list[i-1]=130
      diastolic_list[i-1]=85
      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+2;
    }
    else if(systolic>=130 && systolic<140)
    {
      i++
      systolic_list[i-1]=140
      diastolic_list[i-1]=90
      label_final_bmi[i-1]=dummy+'.'
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy
      count++
    }
    else if(systolic>=180)
    {
      i++
      systolic_list[i-1]=180
      diastolic_list[i-1]=120
      label_final_bmi[i-1]=dummy+'.'
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy
      count++
    }
  }
  else if(systolic_list[i-1]>=180)
  {
    if(systolic<90)
    {
      i=i+5
      systolic_list[i-5]=180
      diastolic_list[i-5]=120
      systolic_list[i-4]=140
      diastolic_list[i-4]=90
      systolic_list[i-3]=130
      diastolic_list[i-3]=85
      systolic_list[i-2]=120
      diastolic_list[i-2]=80
      systolic_list[i-1]=90
      diastolic_list[i-1]=60
      label_final_bmi[i-5]=dummy+'.'
      label_final_bmi[i-4]=dummy+'.'
      label_final_bmi[i-3]=dummy+'.'
      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+5;
    }
    else if(systolic>=90 && systolic<120)
    {
      i=i+4
      systolic_list[i-4]=180
      diastolic_list[i-4]=120
      systolic_list[i-3]=140
      diastolic_list[i-3]=90
      systolic_list[i-2]=130
      diastolic_list[i-2]=85
      systolic_list[i-1]=120
      diastolic_list[i-1]=80
      label_final_bmi[i-4]=dummy+'.'
      label_final_bmi[i-3]=dummy+'.'
      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+4;
    }
    else if(systolic>=120 && systolic<130)
    {
      i=i+3
      systolic_list[i-3]=180
      diastolic_list[i-3]=120
      systolic_list[i-2]=140
      diastolic_list[i-2]=90
      systolic_list[i-1]=130
      diastolic_list[i-1]=85
      label_final_bmi[i-3]=dummy+'.'

      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+3;
    }
    else if(systolic>=130 && systolic<140)
    {
      i=i+2
      systolic_list[i-2]=180
      diastolic_list[i-2]=120
      systolic_list[i-1]=140
      diastolic_list[i-1]=90
      label_final_bmi[i-2]=dummy+'.'
      label_final_bmi[i-1]=dummy+'.'
      
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy

      count=count+2;
    }
    else if(systolic>=140 && systolic<180)
    {
      i++
      systolic_list[i-1]=180
      diastolic_list[i-1]=120
      label_final_bmi[i-1]=dummy+'.'
      systolic_list[i]=systolic
      diastolic_list[i]=diastolic
      label_final_bmi[i]=dummy
      count++
    }
  }

}
j++;
  }
console.log(systolic_list)
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
        if (meta.dataset._chart.config.data.datasets['0'].data[i] <= '90') {
            _setColor('blue', meta);
        }else if (meta.dataset._chart.config.data.datasets['0'].data[i] <= '120' && meta.dataset._chart.config.data.datasets['0'].data[i] >'90') {
          _setColor('green',meta)
        }
        else if (meta.dataset._chart.config.data.datasets['0'].data[i] <= '130' && meta.dataset._chart.config.data.datasets['0'].data[i] >'120') {
          _setColor('yellow',meta)
        }  
        else if (meta.dataset._chart.config.data.datasets['0'].data[i] <= '140' && meta.dataset._chart.config.data.datasets['0'].data[i] >'130') {
          _setColor('orange',meta)
        }  
        else if (meta.dataset._chart.config.data.datasets['0'].data[i] <= '180' && meta.dataset._chart.config.data.datasets['0'].data[i] >'140') {
          _setColor('red',meta)
        } 
        else if (meta.dataset._chart.config.data.datasets['0'].data[i] <= '180' && meta.dataset._chart.config.data.datasets['0'].data[i] >'140') {
          _setColor('red',meta)
        }  
        else{
            _setColor('black', meta);
        }
      }
      else{
        if (meta.dataset._chart.config.data.datasets['0'].data[i] < '90') {
          _setColor('blue', meta);
      }else if (meta.dataset._chart.config.data.datasets['0'].data[i] < '120' && meta.dataset._chart.config.data.datasets['0'].data[i] >='90') {
        _setColor('green',meta)
      } 
      else if (meta.dataset._chart.config.data.datasets['0'].data[i] < '130' && meta.dataset._chart.config.data.datasets['0'].data[i] >='120') {
        _setColor('yellow',meta)
      } 
      else if (meta.dataset._chart.config.data.datasets['0'].data[i] < '140' && meta.dataset._chart.config.data.datasets['0'].data[i] >='130') {
        _setColor('orange',meta)
      } 
      else if (meta.dataset._chart.config.data.datasets['0'].data[i] < '180' && meta.dataset._chart.config.data.datasets['0'].data[i] >='140') {
        _setColor('red',meta)
      } 
      else{
          _setColor('black', meta);
      }
      }
    }
    else{
      if (meta.dataset._chart.config.data.datasets['0'].data[i+1] < (meta.dataset._chart.config.data.datasets['0'].data[i]))
          {
        if (meta.dataset._chart.config.data.datasets['0'].data[i] < '90') {
            _setColor('blue', meta);
        }else if (meta.dataset._chart.config.data.datasets['0'].data[i] < '120' && meta.dataset._chart.config.data.datasets['0'].data[i] >='90') {
          _setColor('green',meta)
        } 
        else if (meta.dataset._chart.config.data.datasets['0'].data[i] < '130' && meta.dataset._chart.config.data.datasets['0'].data[i] >='120') {
          _setColor('yellow',meta)
        } 
        else if (meta.dataset._chart.config.data.datasets['0'].data[i] < '140' && meta.dataset._chart.config.data.datasets['0'].data[i] >='130') {
          _setColor('orange',meta)
        } 
        else if (meta.dataset._chart.config.data.datasets['0'].data[i] < '180' && meta.dataset._chart.config.data.datasets['0'].data[i] >='140') {
          _setColor('red',meta)
        } 
        else{
            _setColor('black', meta);
        }
      }
      else{
        if (meta.dataset._chart.config.data.datasets['0'].data[i] <= '90') {
          _setColor('blue', meta);
      }else if (meta.dataset._chart.config.data.datasets['0'].data[i] <= '120' && meta.dataset._chart.config.data.datasets['0'].data[i] >'90') {
        _setColor('green',meta)
      }
      else if (meta.dataset._chart.config.data.datasets['0'].data[i] <= '130' && meta.dataset._chart.config.data.datasets['0'].data[i] >'120') {
        _setColor('yellow',meta)
      } 
      else if (meta.dataset._chart.config.data.datasets['0'].data[i] <= '140' && meta.dataset._chart.config.data.datasets['0'].data[i] >'130') {
        _setColor('orange',meta)
      } 
      else if (meta.dataset._chart.config.data.datasets['0'].data[i] <= '180' && meta.dataset._chart.config.data.datasets['0'].data[i] >'140') {
        _setColor('red',meta)
      } 
      else{
          _setColor('black', meta);
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
              label: "bmi",
              borderColor: 'rgb(129, 99, 132)',
              data:systolic_list,
              //first color is not important
              colors: ['', 'red', 'green', 'blue','yellow','orange']
          },{
            label: "bmi1",
            borderColor: 'rgb(130, 99, 132)',
            data:diastolic_list,
            //first color is not important
            colors: ['', 'red', 'green', 'blue','yellow','orange']
        }]
      },
  
      // Configuration options go here
      options: {
        legend:{display:true
        }
      }
  });
}
function bmi(){
  height_data=[183,183,183,183,183]
  weight_data=[]
  bmi_data=[]
  for(var i=0;i<7;i++)
  {
  weight_value=randomData(70,73)
  bmi_value=weight_value/3.34
  bmi_data.push(bmi_value)
  weight_data.push(weight_value)
  }
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx,{
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
    //   label: 'dataset - big points',
    //   data: height_data,
    //   backgroundColor: 'red',
    //   borderColor: 'red',
    //   fill: false,
    //   borderDash: [5, 5],
    //   pointRadius: 15,
    //   pointHoverRadius: 10,
    // }, {
    //   label: 'dataset - individual point sizes',
    //   data: weight_data,
    //   backgroundColor:'blue',
    //   borderColor: 'blue',
    //   fill: false,
    //   borderDash: [5, 5],
    //   pointRadius: [2, 4, 6, 18, 0, 12, 20],
    // }, {
      label: 'dataset - large pointHoverRadius',
      data: bmi_data,
      backgroundColor: 'green',
      borderColor: 'green',
      fill: false,
      pointHoverRadius: 30,
    // }, {
    //   label: 'dataset - large pointHitRadius',
    //   data: temp_data,
    //   backgroundColor: 'yellow',
    //   borderColor:'yellow',
    //   fill: false,
    //   pointHitRadius: 20,
    }]
    
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart - Different point sizes'
      }
    },
    hover: {
      mode: 'index'
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }
    }
  }
});

window.onload = function() {
  var ctx = document.getElementById('canvas').getContext('2d');
  window.myLine = new Chart(ctx, config);
};}




// var ctx1 = document.getElementById('myChart1')
//     // eslint-disable-next-line no-unused-vars
//     var temp_chart = new Chart(ctx1, {
//       type: 'line',
//       data: {
//         labels: [
//           'Sunday',
//           'Monday',
//           'Tuesday',
//           'Wednesday',
//           'Thursday',
//           'Friday',
//           'Saturday'
//         ],
//         datasets: [{
//           data: [
//             15339,
//             21345,
//             18483,
//             24003,
//             23489,
//             24092,
//             12034
//           ],
//           lineTension: 0,
//           backgroundColor: 'transparent',
//           borderColor: '#007bff',
//           borderWidth: 4,
//           pointBackgroundColor: '#007bff'
//         }]
//       },
//       options: {
//         scales: {
//           yAxes: [{
//             ticks: {
//               beginAtZero: false
//             },
//             gridLines:{
//                 display:false
//             }
//           }]
//         },
//         legend: {
//           display: false
//         }
//       }
//     })
//   })()
function temp1(){
    var ctx = document.getElementById('myChart1')
    // eslint-disable-next-line no-unused-vars
    var temp_chart = new Chart(ctx, {
      type: 'scatter',
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
        // labels: [
        //   'Sunday1',
        //   'Monday2',
        //   'Tuesday3',
        //   'Wednesday4',
        //   'Thursday5',
        //   'Friday',
        //   'Saturday'
        // ],
        label:"ECG",
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
function ecg(){

  var ctx = document.getElementById('myChart_1')
    // eslint-disable-next-line no-unused-vars
    var temp_chart = new Chart(ctx, {
      type: 'scatter',
      data: {
        // labels: [
        //   'Sunday1',
        //   'Monday2',
        //   'Tuesday3',
        //   'Wednesday4',
        //   'Thursday5',
        //   'Friday',
        //   'Saturday'
        // ],
        label:"ECG",
        datasets: [{
          data: [
            { x: 2, y: 81 },
    { x: 3, y: 83 },
    { x: 4, y: 88 },
    { x: 5, y: 98 },
    { x: 6, y: 92 },
    { x: 7, y: 85 },
    { x: 8, y: 73 },
    { x: 9, y: 71 },
    { x: 10, y: 70 },
    { x: 11, y: 83 },
    { x: 12, y: 73 },
    { x: 13, y: 79 },
    { x: 14, y: 84 },
    { x: 15, y: 78 },
    { x: 16, y: 67 },
    { x: 17, y: 71 },
    { x: 18, y: 76 },
    { x: 19, y: 77 },
    { x: 20, y: 64 },
    { x: 21, y: 53 },
    { x: 22, y: 0 },
    { x: 23, y: 41 },
    { x: 24, y: 51 },
    { x: 25, y: 3 },
    { x: 26, y: 31 },
    { x: 27, y: 37 },
    { x: 28, y: 35 },
    { x: 29, y: 48 },
    { x: 30, y: 40 },
    { x: 31, y: 42 },
    { x: 32, y: 42 },
    { x: 33, y: 32 },
    { x: 34, y: 21 },
    { x: 35, y: 41 },
    { x: 36, y: 48 },
    { x: 37, y: 47 },
    { x: 38, y: 45 },
    { x: 39, y: 42 },
    { x: 40, y: 28 },
    { x: 41, y: 15 },
    { x: 42, y: 1 },
    { x: 43, y: -12 },
    { x: 44, y: -4 },
    { x: 45, y: 15 },
    { x: 46, y: 23 },
    { x: 47, y: 22 },
    { x: 48, y: 40 },
    { x: 49, y: 46 },
    { x: 50, y: 49 },
    { x: 51, y: 48 },
    { x: 52, y: 43 },
    { x: 53, y: 52 },
    { x: 54, y: 49 },
    { x: 55, y: 44 },
    { x: 56, y: 41 },
    { x: 57, y: 41 },
    { x: 58, y: 45 },
    { x: 59, y: 57 },
    { x: 60, y: 67 },
    { x: 61, y: 65 },
    { x: 62, y: 58 },
    { x: 63, y: 47 },
    { x: 64, y: 34 },
    { x: 65, y: 35 },
    { x: 66, y: 23 },
    { x: 67, y: 11 },
    { x: 68, y: 7 },
    { x: 69, y: 14 },
    { x: 70, y: 23 },
    { x: 71, y: 18 },
    { x: 72, y: 31 },
    { x: 73, y: 35 },
    { x: 74, y: 44 },
    { x: 75, y: 49 },
    { x: 76, y: 34 },
    { x: 77, y: 7 },
    { x: 78, y: -3 },
    { x: 79, y: -8 },
    { x: 80, y: -11 },
    { x: 81, y: -20 },
    { x: 82, y: -28 },
    { x: 83, y: -4 },
    { x: 84, y: 15 },
    { x: 85, y: 20 },
    { x: 86, y: 26 },
    { x: 87, y: 26 },
    { x: 88, y: 24 },
    { x: 89, y: 34 },
    { x: 90, y: 35 },
    { x: 91, y: 30 },
    { x: 92, y: 22 },
    { x: 93, y: 12 },
    { x: 94, y: 15 },
    { x: 95, y: 18 },
    { x: 96, y: 24 },
    { x: 97, y: 18 },
    { x: 98, y: 26 },
    { x: 99, y: 25 },
    { x: 100, y: 13 },
    { x: 101, y: 2 },
    { x: 102, y: 1 },
    { x: 103, y: -10 },
    { x: 104, y: -10 },
    { x: 105, y: -4 },
    { x: 106, y: 8 },
    { x: 107, y: 15 },
    { x: 108, y: 15 },
    { x: 109, y: 15 },
    { x: 110, y: 15 },
    { x: 111, y: 18 },
    { x: 112, y: 19 },
    { x: 113, y: 3 },
    { x: 114, y: -12 },
    { x: 115, y: -14 },
    { x: 116, y: -10 },
    { x: 117, y: -22 },
    { x: 118, y: -24 },
    { x: 119, y: -29 },
    { x: 120, y: -21 },
    { x: 121, y: -19 },
    { x: 122, y: -26 },
    { x: 123, y: -9 },
    { x: 124, y: -10 },
    { x: 125, y: -6 },
    { x: 126, y: -8 },
    { x: 127, y: -31 },
    { x: 128, y: -52 },
    { x: 129, y: -57 },
    { x: 130, y: -40 },
    { x: 131, y: -20 },
    { x: 132, y: 7 },
    { x: 133, y: 14 },
    { x: 134, y: 10 },
    { x: 135, y: 6 },
    { x: 136, y: 12 },
    { x: 137, y: -5 },
    { x: 138, y: -2 },
    { x: 139, y: 9 },
    { x: 140, y: 23 },
    { x: 141, y: 36 },
    { x: 142, y: 52 },
    { x: 143, y: 61 },
    { x: 144, y: 56 },
    { x: 145, y: 48 },
    { x: 146, y: 48 },
    { x: 147, y: 38 },
    { x: 148, y: 29 },
    { x: 149, y: 33 },
    { x: 150, y: 20 },
    { x: 151, y: 1 },
    { x: 152, y: -7 },
    { x: 153, y: -9 },
    { x: 154, y: -4 },
    { x: 155, y: -12 },
    { x: 156, y: -3 },
    { x: 157, y: 5 },
    { x: 158, y: -3 },
    { x: 159, y: 12 },
    { x: 160, y: 6 },
    { x: 161, y: -10 },
    { x: 162, y: -2 },
    { x: 163, y: 15 },
    { x: 164, y: 17 },
    { x: 165, y: 21 },
    { x: 166, y: 22 },
    { x: 167, y: 15 },
    { x: 168, y: 16 },
    { x: 169, y: 1 },
    { x: 170, y: -2 },
    { x: 171, y: -9 },
    { x: 172, y: -16 },
    { x: 173, y: -18 },
    { x: 174, y: -15 },
    { x: 175, y: -4 },
    { x: 176, y: 0 },
    { x: 177, y: -1 },
    { x: 178, y: -1 },
    { x: 179, y: -3 },
    { x: 180, y: -12 },
    { x: 181, y: -15 },
    { x: 182, y: -13 },
    { x: 183, y: -16 },
    { x: 184, y: -29 },
    { x: 185, y: -34 },
    { x: 186, y: -28 },
    { x: 187, y: -29 },
    { x: 188, y: -27 },
    { x: 189, y: -25 },
    { x: 190, y: -25 },
    { x: 191, y: -33 },
    { x: 192, y: -38 },
    { x: 193, y: -36 },
    { x: 194, y: -12 },
    { x: 195, y: -7 },
    { x: 196, y: -20 },
    { x: 197, y: -21 },
    { x: 198, y: -14 },
    { x: 199, y: -7 },
    { x: 200, y: 7 },
    { x: 201, y: 14 },
    { x: 202, y: 18 },
    { x: 203, y: 28 },
    { x: 204, y: 27 },
    { x: 205, y: 38 },
    { x: 206, y: 33 },
    { x: 207, y: 24 },
    { x: 208, y: 20 },
    { x: 209, y: 15 },
    { x: 210, y: 6 },
    { x: 211, y: 0 },
    { x: 212, y: -2 },
    { x: 213, y: 2 },
    { x: 214, y: 0 },
    { x: 215, y: -2 },
    { x: 216, y: -12 },
    { x: 217, y: -10 },
    { x: 218, y: 20 },
    { x: 219, y: 41 },
    { x: 220, y: 35 },
    { x: 221, y: 27 },
    { x: 222, y: 12 },
    { x: 223, y: -1 },
    { x: 224, y: -15 },
    { x: 225, y: -20 },
    { x: 226, y: -23 },
    { x: 227, y: 0 },
    { x: 228, y: 24 },
    { x: 229, y: 36 },
    { x: 230, y: 52 },
    { x: 231, y: 61 },
    { x: 232, y: 67 },
    { x: 233, y: 73 },
    { x: 234, y: 88 },
    { x: 235, y: 85 },
    { x: 236, y: 71 },
    { x: 237, y: 74 },
    { x: 238, y: 67 },
    { x: 239, y: 41 },
    { x: 240, y: 26 },
    { x: 241, y: 13 },
    { x: 242, y: 10 },
    { x: 243, y: 1 },
    { x: 244, y: -10 },
    { x: 245, y: -26 },
    { x: 246, y: -33 },
    { x: 247, y: -23 },
    { x: 248, y: -25 },
    { x: 249, y: -24 },
    { x: 250, y: -24 },
    { x: 251, y: -28 },
    { x: 252, y: -24 },
    { x: 253, y: -25 },
    { x: 254, y: -21 },
    { x: 255, y: -8 },
    { x: 256, y: -5 },
    { x: 257, y: -4 },
    { x: 258, y: -13 },
    { x: 259, y: -29 },
    { x: 260, y: -42 },
    { x: 261, y: -52 },
    { x: 262, y: -52 },
    { x: 263, y: -40 },
    { x: 264, y: -40 },
    { x: 265, y: -34 },
    { x: 266, y: -28 },
    { x: 267, y: -30 },
    { x: 268, y: -37 },
    { x: 269, y: -40 },
    { x: 270, y: -38 },
    { x: 271, y: -41 },
    { x: 272, y: -39 },
    { x: 273, y: -46 },
    { x: 274, y: -48 },
    { x: 275, y: -48 },
    { x: 276, y: -40 },
    { x: 277, y: -40 },
    { x: 278, y: -45 },
    { x: 279, y: -57 },
    { x: 280, y: -61 },
    { x: 281, y: -63 },
    { x: 282, y: -78 },
    { x: 283, y: -81 },
    { x: 284, y: -87 },
    { x: 285, y: -82 },
    { x: 286, y: -88 },
    { x: 287, y: -100 },
    { x: 288, y: -100 },
    { x: 289, y: -97 },
    { x: 290, y: -104 },
    { x: 291, y: -102 },
    { x: 292, y: -79 },
    { x: 293, y: -72 },
    { x: 294, y: -72 },
    { x: 295, y: -63 },
    { x: 296, y: -35 },
    { x: 297, y: -22 },
    { x: 298, y: -10 },
    { x: 299, y: 2 },
    { x: 300, y: 5 },
    { x: 301, y: 9 },
    { x: 302, y: -10 },
    { x: 303, y: -16 },
    { x: 304, y: -16 },
    { x: 305, y: -10 },
    { x: 306, y: -4 },
    { x: 307, y: -1 },
    { x: 308, y: 2 },
    { x: 309, y: 14 },
    { x: 310, y: 21 },
    { x: 311, y: 23 },
    { x: 312, y: 17 },
    { x: 313, y: 13 },
    { x: 314, y: 10 },
    { x: 315, y: 0 },
    { x: 316, y: -6 },
    { x: 317, y: -5 },
    { x: 318, y: 11 },
    { x: 319, y: 22 },
    { x: 320, y: 28 },
    { x: 321, y: 31 },
    { x: 322, y: 33 },
    { x: 323, y: 29 },
    { x: 324, y: 26 },
    { x: 325, y: 27 },
    { x: 326, y: 28 },
    { x: 327, y: 26 },
    { x: 328, y: 35 },
    { x: 329, y: 44 },
    { x: 330, y: 52 },
    { x: 331, y: 80 },
    { x: 332, y: 100 },
    { x: 333, y: 101 },
    { x: 334, y: 111 },
    { x: 335, y: 120 },
    { x: 336, y: 128 },
    { x: 337, y: 150 },
    { x: 338, y: 174 },
    { x: 339, y: 201 },
    { x: 340, y: 232 },
    { x: 341, y: 278 },
    { x: 342, y: 350 },
    { x: 343, y: 422 },
    { x: 344, y: 510 },
    { x: 345, y: 580 },
    { x: 346, y: 662 },
    { x: 347, y: 738 },
    { x: 348, y: 806 },
    { x: 349, y: 869 },
    { x: 350, y: 907 },
    { x: 351, y: 939 },
    { x: 352, y: 954 },
    { x: 353, y: 971 },
    { x: 354, y: 961 },
    { x: 355, y: 912 },
    { x: 356, y: 826 },
    { x: 357, y: 713 },
    { x: 358, y: 553 },
    { x: 359, y: 382 },
    { x: 360, y: 166 },
    { x: 361, y: -56 },
    { x: 362, y: -275 },
    { x: 363, y: -518 },
    { x: 364, y: -824 },
    { x: 365, y: -1122 },
    { x: 366, y: -1325 },
    { x: 367, y: -1453 },
    { x: 368, y: -1507 },
    { x: 369, y: -1547 },
    { x: 370, y: -1568 },
    { x: 371, y: -1559 },
    { x: 372, y: -1553 },
    { x: 373, y: -1537 },
    { x: 374, y: -1499 },
    { x: 375, y: -1447 },
    { x: 376, y: -1424 },
    { x: 377, y: -1398 },
    { x: 378, y: -1352 },
    { x: 379, y: -1291 },
    { x: 380, y: -1189 },
    { x: 381, y: -1085 },
    { x: 382, y: -977 },
    { x: 383, y: -852 },
    { x: 384, y: -736 },
    { x: 385, y: -649 },
    { x: 386, y: -603 },
    { x: 387, y: -576 },
    { x: 388, y: -454 },
    { x: 389, y: -443 },
    { x: 390, y: -332 },
    { x: 391, y: -264 },
    { x: 392, y: -209 },
    { x: 393, y: -153 },
    { x: 394, y: -105 },
    { x: 395, y: -61 },
    { x: 396, y: -16 },
    { x: 397, y: 37 },
    { x: 398, y: 96 },
    { x: 399, y: 150 },
    { x: 400, y: 198 },
    { x: 401, y: 238 },
    { x: 402, y: 265 },
    { x: 403, y: 294 },
    { x: 404, y: 324 },
    { x: 405, y: 351 },
    { x: 406, y: 367 },
    { x: 407, y: 376 },
    { x: 408, y: 378 },
    { x: 409, y: 391 },
    { x: 410, y: 406 },
    { x: 411, y: 427 },
    { x: 412, y: 433 },
    { x: 413, y: 448 },
    { x: 414, y: 440 },
    { x: 415, y: 429 },
    { x: 416, y: 429 },
    { x: 417, y: 420 },
    { x: 418, y: 413 },
    { x: 419, y: 420 },
    { x: 420, y: 411 },
    { x: 421, y: 408 },
    { x: 422, y: 404 },
    { x: 423, y: 398 },
    { x: 424, y: 401 },
    { x: 425, y: 412 },
    { x: 426, y: 389 },
    { x: 427, y: 367 },
    { x: 428, y: 357 },
    { x: 429, y: 359 },
    { x: 430, y: 351 },
    { x: 431, y: 345 },
    { x: 432, y: 341 },
    { x: 433, y: 345 },
    { x: 434, y: 346 },
    { x: 435, y: 340 },
    { x: 436, y: 334 },
    { x: 437, y: 323 },
    { x: 438, y: 319 },
    { x: 439, y: 314 },
    { x: 440, y: 284 },
    { x: 441, y: 263 },
    { x: 442, y: 261 },
    { x: 443, y: 248 },
    { x: 444, y: 234 },
    { x: 445, y: 236 },
    { x: 446, y: 236 },
    { x: 447, y: 248 },
    { x: 448, y: 252 },
    { x: 449, y: 251 },
    { x: 450, y: 237 },
    { x: 451, y: 230 },
    { x: 452, y: 238 },
    { x: 453, y: 227 },
    { x: 454, y: 207 },
    { x: 455, y: 188 },
    { x: 456, y: 163 },
    { x: 457, y: 155 },
    { x: 458, y: 152 },
    { x: 459, y: 153 },
    { x: 460, y: 156 },
    { x: 461, y: 171 },
    { x: 462, y: 162 },
    { x: 463, y: 155 },
    { x: 464, y: 148 },
    { x: 465, y: 139 },
    { x: 466, y: 154 },
    { x: 467, y: 158 },
    { x: 468, y: 155 },
    { x: 469, y: 159 },
    { x: 470, y: 147 },
    { x: 471, y: 143 },
    { x: 472, y: 133 },
    { x: 473, y: 118 },
    { x: 474, y: 118 },
    { x: 475, y: 121 },
    { x: 476, y: 130 },
    { x: 477, y: 133 },
    { x: 478, y: 133 },
    { x: 479, y: 128 },
    { x: 480, y: 120 },
    { x: 481, y: 97 },
    { x: 482, y: 91 },
    { x: 483, y: 88 },
    { x: 484, y: 85 },
    { x: 485, y: 84 },
    { x: 486, y: 74 },
    { x: 487, y: 44 },
    { x: 488, y: 32 },
    { x: 489, y: 10 },
    { x: 490, y: -2 },
    { x: 491, y: -9 },
    { x: 492, y: -4 },
    { x: 493, y: -5 },
    { x: 494, y: 1 },
    { x: 495, y: 5 },
    { x: 496, y: 21 },
    { x: 497, y: 41 },
    { x: 498, y: 44 },
    { x: 499, y: 39 },
    { x: 500, y: 24 },
    { x: 501, y: 22 },
    { x: 502, y: 37 },
    { x: 503, y: 44 },
    { x: 504, y: 35 },
    { x: 505, y: 31 },
    { x: 506, y: 35 },
    { x: 507, y: 20 },
    { x: 508, y: 15 },
    { x: 509, y: 7 },
    { x: 510, y: 4 },
    { x: 511, y: 9 },
    { x: 512, y: 0 },
    { x: 513, y: -15 },
    { x: 514, y: -21 },
    { x: 515, y: -31 },
    { x: 516, y: -32 },
    { x: 517, y: -48 },
    { x: 518, y: -53 },
    { x: 519, y: -29 },
    { x: 520, y: -14 },
    { x: 521, y: -6 },
    { x: 522, y: 1 },
    { x: 523, y: 4 },
    { x: 524, y: -4 },
    { x: 525, y: -3 },
    { x: 526, y: 2 },
    { x: 527, y: 1 },
    { x: 528, y: -12 },
    { x: 529, y: -37 },
    { x: 530, y: -29 },
    { x: 531, y: -25 },
    { x: 532, y: -18 },
    { x: 533, y: -31 },
    { x: 534, y: -42 },
    { x: 535, y: -26 },
    { x: 536, y: -22 },
    { x: 537, y: -18 },
    { x: 538, y: -25 },
    { x: 539, y: -16 },
    { x: 540, y: -13 },
    { x: 541, y: -23 },
    { x: 542, y: -15 },
    { x: 543, y: 0 },
    { x: 544, y: 8 },
    { x: 545, y: 14 },
    { x: 546, y: 34 },
    { x: 547, y: 39 },
    { x: 548, y: 33 },
    { x: 549, y: 22 },
    { x: 550, y: 18 },
    { x: 551, y: 20 },
    { x: 552, y: 23 },
    { x: 553, y: 16 },
    { x: 554, y: 11 },
    { x: 555, y: 1 },
    { x: 556, y: 6 },
    { x: 557, y: 11 },
    { x: 558, y: 7 },
    { x: 559, y: 14 },
    { x: 560, y: 22 },
    { x: 561, y: 14 },
    { x: 562, y: 14 },
    { x: 563, y: 5 },
    { x: 564, y: -6 },
    { x: 565, y: -14 },
    { x: 566, y: -27 },
    { x: 567, y: -28 },
    { x: 568, y: -21 },
    { x: 569, y: -16 },
    { x: 570, y: -8 },
    { x: 571, y: -5 },
    { x: 572, y: -8 },
    { x: 573, y: 3 },
    { x: 574, y: 22 },
    { x: 575, y: 29 },
    { x: 576, y: 27 },
    { x: 577, y: 23 },
    { x: 578, y: 22 },
    { x: 579, y: 25 },
    { x: 580, y: 34 },
    { x: 581, y: 36 },
    { x: 582, y: 39 },
    { x: 583, y: 44 },
    { x: 584, y: 55 },
    { x: 585, y: 54 },
    { x: 586, y: 44 },
    { x: 587, y: 39 },
    { x: 588, y: 41 },
    { x: 589, y: 49 },
    { x: 590, y: 44 },
    { x: 591, y: 33 },
    { x: 592, y: 27 },
    { x: 593, y: 23 },
    { x: 594, y: 20 },
    { x: 595, y: 18 },
    { x: 596, y: 20 },
    { x: 597, y: 19 },
    { x: 598, y: 8 },
    { x: 599, y: 7 },
    { x: 600, y: 2 },
    { x: 601, y: 4 },
    { x: 602, y: -3 },
    { x: 603, y: -16 },
    { x: 604, y: -16 },
    { x: 605, y: -19 },
    { x: 606, y: -28 },
    { x: 607, y: -37 },
    { x: 608, y: -26 },
    { x: 609, y: -14 },
    { x: 610, y: -31 },
    { x: 611, y: -45 },
    { x: 612, y: -45 },
    { x: 613, y: -43 },
    { x: 614, y: -50 },
    { x: 615, y: -59 },
    { x: 616, y: -73 },
    { x: 617, y: -79 },
    { x: 618, y: -88 },
    { x: 619, y: -92 },
    { x: 620, y: -95 },
    { x: 621, y: -101 },
    { x: 622, y: -104 },
    { x: 623, y: -124 },
    { x: 624, y: -150 },
    { x: 625, y: -152 },
    { x: 626, y: -153 },
    { x: 627, y: -174 },
    { x: 628, y: -205 },
    { x: 629, y: -215 },
    { x: 630, y: -211 },
    { x: 631, y: -214 },
    { x: 632, y: -211 },
    { x: 633, y: -222 },
    { x: 634, y: -218 },
    { x: 635, y: -211 },
    { x: 636, y: -200 },
    { x: 637, y: -200 },
    { x: 638, y: -196 },
    { x: 639, y: -184 },
    { x: 640, y: -189 },
    { x: 641, y: -202 },
    { x: 642, y: -203 },
    { x: 643, y: -202 },
    { x: 644, y: -200 },
    { x: 645, y: -205 },
    { x: 646, y: -211 },
    { x: 647, y: -226 },
    { x: 648, y: -241 },
    { x: 649, y: -242 },
    { x: 650, y: -252 },
    { x: 651, y: -273 },
    { x: 652, y: -279 },
    { x: 653, y: -288 },
    { x: 654, y: -291 },
    { x: 655, y: -289 },
    { x: 656, y: -286 },
    { x: 657, y: -269 },
    { x: 658, y: -266 },
    { x: 659, y: -280 },
    { x: 660, y: -287 },
    { x: 661, y: -277 },
    { x: 662, y: -260 },
    { x: 663, y: -271 },
    { x: 664, y: -269 },
    { x: 665, y: -271 },
    { x: 666, y: -287 },
    { x: 667, y: -299 },
    { x: 668, y: -297 },
    { x: 669, y: -288 },
    { x: 670, y: -287 },
    { x: 671, y: -287 },
    { x: 672, y: -289 },
    { x: 673, y: -287 },
    { x: 674, y: -286 },
    { x: 675, y: -276 },
    { x: 676, y: -271 },
    { x: 677, y: -266 },
    { x: 678, y: -260 },
    { x: 679, y: -252 },
    { x: 680, y: -236 },
    { x: 681, y: -223 },
    { x: 682, y: -215 },
    { x: 683, y: -213 },
    { x: 684, y: -224 },
    { x: 685, y: -230 },
    { x: 686, y: -220 },
    { x: 687, y: -209 },
    { x: 688, y: -207 },
    { x: 689, y: -194 },
    { x: 690, y: -182 },
    { x: 691, y: -181 },
    { x: 692, y: -186 },
    { x: 693, y: -189 },
    { x: 694, y: -186 },
    { x: 695, y: -174 },
    { x: 696, y: -167 },
    { x: 697, y: -161 },
    { x: 698, y: -158 },
    { x: 699, y: -155 },
    { x: 700, y: -153 },
    { x: 701, y: -139 },
    { x: 702, y: -135 },
    { x: 703, y: -130 },
    { x: 704, y: -129 },
    { x: 705, y: -116 },
    { x: 706, y: -107 },
    { x: 707, y: -98 },
    { x: 708, y: -84 },
    { x: 709, y: -85 },
    { x: 710, y: -92 },
    { x: 711, y: -100 },
    { x: 712, y: -105 },
    { x: 713, y: -97 },
    { x: 714, y: -81 },
    { x: 715, y: -72 },
    { x: 716, y: -58 },
    { x: 717, y: -49 },
    { x: 718, y: -35 },
    { x: 719, y: -33 },
    { x: 720, y: -28 },
    { x: 721, y: -13 },
    { x: 722, y: -7 },
    { x: 723, y: -9 },
    { x: 724, y: -6 },
    { x: 725, y: 10 },
    { x: 726, y: 22 },
    { x: 727, y: 16 },
    { x: 728, y: 5 },
    { x: 729, y: -12 },
    { x: 730, y: -12 },
    { x: 731, y: 1 },
    { x: 732, y: 6 },
    { x: 733, y: 17 },
    { x: 734, y: 41 },
    { x: 735, y: 52 },
    { x: 736, y: 54 },
    { x: 737, y: 57 },
    { x: 738, y: 63 },
    { x: 739, y: 81 },
    { x: 740, y: 96 },
    { x: 741, y: 107 },
    { x: 742, y: 118 },
    { x: 743, y: 133 },
    { x: 744, y: 123 },
    { x: 745, y: 121 },
    { x: 746, y: 129 },
    { x: 747, y: 128 },
    { x: 748, y: 127 },
    { x: 749, y: 112 },
    { x: 750, y: 89 },
    { x: 751, y: 0 },
    { x: 752, y: 123 },
    { x: 753, y: 42 },
    { x: 754, y: 98 },
    { x: 755, y: 109 },
    { x: 756, y: 109 },
    { x: 757, y: 108 },
    { x: 758, y: 113 },
    { x: 759, y: 121 },
    { x: 760, y: 119 },
    { x: 761, y: 119 },
    { x: 762, y: 114 },
    { x: 763, y: 112 },
    { x: 764, y: 109 },
    { x: 765, y: 107 },
    { x: 766, y: 105 },
    { x: 767, y: 114 },
    { x: 768, y: 122 },
    { x: 769, y: 130 },
    { x: 770, y: 134 },
    { x: 771, y: 121 },
    { x: 772, y: 113 },
    { x: 773, y: 100 },
    { x: 774, y: 94 },
    { x: 775, y: 114 },
    { x: 776, y: 112 },
    { x: 777, y: 108 },
    { x: 778, y: 116 },
    { x: 779, y: 114 },
    { x: 780, y: 112 },
    { x: 781, y: 118 },
    { x: 782, y: 119 },
    { x: 783, y: 116 },
    { x: 784, y: 109 },
    { x: 785, y: 110 },
    { x: 786, y: 108 },
    { x: 787, y: 113 },
    { x: 788, y: 116 },
    { x: 789, y: 118 },
    { x: 790, y: 107 },
    { x: 791, y: 103 },
    { x: 792, y: 109 },
    { x: 793, y: 110 },
    { x: 794, y: 103 },
    { x: 795, y: 106 },
    { x: 796, y: 104 },
    { x: 797, y: 93 },
    { x: 798, y: 86 },
    { x: 799, y: 77 },
    { x: 800, y: 83 },
    { x: 801, y: 87 },
    { x: 802, y: 80 },
    { x: 803, y: 95 },
    { x: 804, y: 100 },
    { x: 805, y: 88 },
    { x: 806, y: 102 },
    { x: 807, y: 87 },
    { x: 808, y: 77 },
    { x: 809, y: 88 },
    { x: 810, y: 81 },
    { x: 811, y: 71 },
    { x: 812, y: 59 },
    { x: 813, y: 61 },
    { x: 814, y: 67 },
    { x: 815, y: 76 },
    { x: 816, y: 91 },
    { x: 817, y: 94 },
    { x: 818, y: 93 },
    { x: 819, y: 89 },
    { x: 820, y: 94 },
    { x: 821, y: 98 },
    { x: 822, y: 103 },
    { x: 823, y: 95 },
    { x: 824, y: 83 },
    { x: 825, y: 89 },
    { x: 826, y: 88 },
    { x: 827, y: 96 },
    { x: 828, y: 97 },
    { x: 829, y: 97 },
    { x: 830, y: 92 },
    { x: 831, y: 88 },
    { x: 832, y: 86 },
    { x: 833, y: 84 },
    { x: 834, y: 84 },
    { x: 835, y: 76 },
    { x: 836, y: 65 },
    { x: 837, y: 52 },
    { x: 838, y: 45 },
    { x: 839, y: 47 },
    { x: 840, y: 36 },
    { x: 841, y: 33 },
    { x: 842, y: 46 },
    { x: 843, y: 46 },
    { x: 844, y: 57 },
    { x: 845, y: 53 },
    { x: 846, y: 52 },
    { x: 847, y: 56 },
    { x: 848, y: 61 },
    { x: 849, y: 64 },
    { x: 850, y: 65 },
    { x: 851, y: 59 },
    { x: 852, y: 55 },
    { x: 853, y: 60 },
    { x: 854, y: 59 },
    { x: 855, y: 61 },
    { x: 856, y: 55 },
    { x: 857, y: 51 },
    { x: 858, y: 48 },
    { x: 859, y: 46 },
    { x: 860, y: 49 },
    { x: 861, y: 47 },
    { x: 862, y: 46 },
    { x: 863, y: 44 },
    { x: 864, y: 43 },
    { x: 865, y: 46 },
    { x: 866, y: 47 },
    { x: 867, y: 45 },
    { x: 868, y: 28 },
    { x: 869, y: 17 },
    { x: 870, y: 20 },
    { x: 871, y: 24 },
    { x: 872, y: 22 },
    { x: 873, y: 38 },
    { x: 874, y: 29 },
    { x: 875, y: 23 },
    { x: 876, y: 23 },
    { x: 877, y: 9 },
    { x: 878, y: 1 },
    { x: 879, y: 15 },
    { x: 880, y: 32 },
    { x: 881, y: 38 },
    { x: 882, y: 37 },
    { x: 883, y: 38 },
    { x: 884, y: 31 },
    { x: 885, y: 18 },
    { x: 886, y: 11 },
    { x: 887, y: 5 },
    { x: 888, y: 5 },
    { x: 889, y: -1 },
    { x: 890, y: -6 },
    { x: 891, y: -8 },
    { x: 892, y: -6 },
    { x: 893, y: 5 },
    { x: 894, y: 14 },
    { x: 895, y: 8 },
    { x: 896, y: 21 },
    { x: 897, y: 35 },
    { x: 898, y: 35 },
    { x: 899, y: 32 },
    { x: 900, y: 26 },
    { x: 901, y: 28 },
    { x: 902, y: 26 },
    { x: 903, y: 24 },
    { x: 904, y: 23 },
    { x: 905, y: 28 },
    { x: 906, y: 26 },
    { x: 907, y: 27 },
    { x: 908, y: 23 },
    { x: 909, y: 32 },
    { x: 910, y: 30 },
    { x: 911, y: 19 },
    { x: 912, y: 16 },
    { x: 913, y: 25 },
    { x: 914, y: 32 },
    { x: 915, y: 20 },
    { x: 916, y: 12 },
    { x: 917, y: 8 },
    { x: 918, y: 7 },
    { x: 919, y: 14 },
    { x: 920, y: 14 },
    { x: 921, y: 11 },
    { x: 922, y: 15 },
    { x: 923, y: 4 },
    { x: 924, y: -5 },
    { x: 925, y: -3 },
    { x: 926, y: -3 },
    { x: 927, y: -11 },
    { x: 928, y: -2 },
    { x: 929, y: 18 },
    { x: 930, y: 11 },
    { x: 931, y: -2 },
    { x: 932, y: 1 },
    { x: 933, y: -9 },
    { x: 934, y: -21 },
    { x: 935, y: -13 },
    { x: 936, y: -16 },
    { x: 937, y: -4 },
    { x: 938, y: 15 },
    { x: 939, y: 31 },
    { x: 940, y: 55 },
    { x: 941, y: 52 },
    { x: 942, y: 35 },
    { x: 943, y: 23 },
    { x: 944, y: 24 },
    { x: 945, y: 20 },
    { x: 946, y: 19 },
    { x: 947, y: 18 },
    { x: 948, y: 13 },
    { x: 949, y: 6 },
    { x: 950, y: 7 },
    { x: 951, y: 12 },
    { x: 952, y: 12 },
    { x: 953, y: 3 },
    { x: 954, y: 2 },
    { x: 955, y: -4 },
    { x: 956, y: -11 },
    { x: 957, y: -12 },
    { x: 958, y: -9 },
    { x: 959, y: -17 },
    { x: 960, y: -6 },
    { x: 961, y: 1 },
    { x: 962, y: -2 },
    { x: 963, y: -6 },
    { x: 964, y: -18 },
    { x: 965, y: -17 },
    { x: 966, y: -14 },
    { x: 967, y: -13 },
    { x: 968, y: -11 },
    { x: 969, y: 9 },
    { x: 970, y: 9 },
    { x: 971, y: 2 },
    { x: 972, y: -2 },
    { x: 973, y: -14 },
    { x: 974, y: -27 },
    { x: 975, y: -24 },
    { x: 976, y: -16 },
    { x: 977, y: -10 },
    { x: 978, y: -3 },
    { x: 979, y: 2 },
    { x: 980, y: 7 },
    { x: 981, y: 16 },
    { x: 982, y: 29 },
    { x: 983, y: 40 },
    { x: 984, y: 47 },
    { x: 985, y: 46 },
    { x: 986, y: 30 },
    { x: 987, y: 19 },
    { x: 988, y: 20 },
    { x: 989, y: 21 },
    { x: 990, y: 22 },
    { x: 991, y: 12 },
    { x: 992, y: 0 },
    { x: 993, y: -6 },
    { x: 994, y: -6 },
    { x: 995, y: -11 },
    { x: 996, y: -9 },
    { x: 997, y: -5 },
    { x: 998, y: -9 },
    { x: 999, y: -15 },
    { x: 1000, y: -18 },
    { x: 1001, y: -21 },
    { x: 1002, y: -19 },
    { x: 1003, y: -27 },
    { x: 1004, y: -31 },
    { x: 1005, y: -32 },
    { x: 1006, y: -35 },
    { x: 1007, y: -31 },
    { x: 1008, y: -26 },
    { x: 1009, y: -26 },
    { x: 1010, y: -19 },
    { x: 1011, y: -6 },
    { x: 1012, y: 0 },
    { x: 1013, y: -3 },
    { x: 1014, y: -16 },
    { x: 1015, y: -16 },
    { x: 1016, y: -3 },
    { x: 1017, y: 5 },
    { x: 1018, y: 13 },
    { x: 1019, y: 6 },
    { x: 1020, y: 9 },
    { x: 1021, y: 18 },
    { x: 1022, y: 40 },
    { x: 1023, y: 54 },
    { x: 1024, y: 64 },
    { x: 1025, y: 68 },
    { x: 1026, y: 57 },
    { x: 1027, y: 47 },
    { x: 1028, y: 41 },
    { x: 1029, y: 41 },
    { x: 1030, y: 50 },
    { x: 1031, y: 54 },
    { x: 1032, y: 35 },
    { x: 1033, y: 33 },
    { x: 1034, y: 33 },
    { x: 1035, y: 27 },
    { x: 1036, y: 26 },
    { x: 1037, y: 19 },
    { x: 1038, y: 16 },
    { x: 1039, y: 28 },
    { x: 1040, y: 44 },
    { x: 1041, y: 38 },
    { x: 1042, y: 42 },
    { x: 1043, y: 57 },
    { x: 1044, y: 61 },
    { x: 1045, y: 65 },
    { x: 1046, y: 55 },
    { x: 1047, y: 45 },
    { x: 1048, y: 33 },
    { x: 1049, y: 21 },
    { x: 1050, y: 11 },
    { x: 1051, y: 5 },
    { x: 1052, y: -14 },
    { x: 1053, y: -30 },
    { x: 1054, y: -35 },
    { x: 1055, y: -31 },
    { x: 1056, y: -32 },
    { x: 1057, y: -33 },
    { x: 1058, y: -25 },
    { x: 1059, y: -19 },
    { x: 1060, y: -18 },
    { x: 1061, y: -30 },
    { x: 1062, y: -42 },
    { x: 1063, y: -38 },
    { x: 1064, y: -44 },
    { x: 1065, y: -49 },
    { x: 1066, y: -43 },
    { x: 1067, y: -41 },
    { x: 1068, y: -30 },
    { x: 1069, y: -26 },
    { x: 1070, y: -29 },
    { x: 1071, y: -33 },
    { x: 1072, y: -53 },
    { x: 1073, y: -58 },
    { x: 1074, y: -58 },
    { x: 1075, y: -45 },
    { x: 1076, y: -37 },
    { x: 1077, y: -39 },
    { x: 1078, y: -51 },
    { x: 1079, y: -50 },
    { x: 1080, y: -52 },
    { x: 1081, y: -53 },
    { x: 1082, y: -36 },
    { x: 1083, y: -27 },
    { x: 1084, y: -29 },
    { x: 1085, y: -24 },
    { x: 1086, y: -27 },
    { x: 1087, y: -34 },
    { x: 1088, y: -46 },
    { x: 1089, y: -49 },
    { x: 1090, y: -42 },
    { x: 1091, y: -50 },
    { x: 1092, y: -49 },
    { x: 1093, y: -50 },
    { x: 1094, y: -42 },
    { x: 1095, y: -35 },
    { x: 1096, y: -24 },
    { x: 1097, y: -33 },
    { x: 1098, y: -40 },
    { x: 1099, y: -36 },
    { x: 1100, y: -37 },
    { x: 1101, y: -38 },
    { x: 1102, y: -51 },
    { x: 1103, y: -61 },
    { x: 1104, y: -67 },
    { x: 1105, y: -75 },
    { x: 1106, y: -81 },
    { x: 1107, y: -70 },
    { x: 1108, y: -66 },
    { x: 1109, y: -71 },
    { x: 1110, y: -72 },
    { x: 1111, y: -57 },
    { x: 1112, y: -48 },
    { x: 1113, y: -40 },
    { x: 1114, y: -31 },
    { x: 1115, y: 0 },
    { x: 1116, y: 31 },
    { x: 1117, y: -63 },
    { x: 1118, y: -16 },
    { x: 1119, y: -22 },
    { x: 1120, y: -30 },
    { x: 1121, y: -36 },
    { x: 1122, y: -37 },
    { x: 1123, y: -42 },
    { x: 1124, y: -40 },
    { x: 1125, y: -47 },
    { x: 1126, y: -38 },
    { x: 1127, y: -5 },
    { x: 1128, y: 2 },
    { x: 1129, y: -9 },
    { x: 1130, y: -2 },
    { x: 1131, y: 7 },
    { x: 1132, y: 11 },
    { x: 1133, y: 12 },
    { x: 1134, y: 22 },
    { x: 1135, y: 26 },
    { x: 1136, y: 29 },
    { x: 1137, y: 21 },
    { x: 1138, y: 25 },
    { x: 1139, y: 32 },
    { x: 1140, y: 35 },
    { x: 1141, y: 36 },
    { x: 1142, y: 48 },
    { x: 1143, y: 74 },
    { x: 1144, y: 79 },
    { x: 1145, y: 78 },
    { x: 1146, y: 92 },
    { x: 1147, y: 108 },
    { x: 1148, y: 120 },
    { x: 1149, y: 143 },
    { x: 1150, y: 172 },
    { x: 1151, y: 201 },
    { x: 1152, y: 232 },
    { x: 1153, y: 285 },
    { x: 1154, y: 363 },
    { x: 1155, y: 447 },
    { x: 1156, y: 514 },
    { x: 1157, y: 573 },
    { x: 1158, y: 663 },
    { x: 1159, y: 754 },
    { x: 1160, y: 815 },
    { x: 1161, y: 859 },
    { x: 1162, y: 895 },
    { x: 1163, y: 940 },
    { x: 1164, y: 977 },
    { x: 1165, y: 972 },
    { x: 1166, y: 945 },
    { x: 1167, y: 898 },
    { x: 1168, y: 808 },
    { x: 1169, y: 686 },
    { x: 1170, y: 532 },
    { x: 1171, y: 360 },
    { x: 1172, y: 167 },
    { x: 1173, y: -33 },
    { x: 1174, y: -232 },
    { x: 1175, y: -472 },
    { x: 1176, y: -766 },
    { x: 1177, y: -1082 },
    { x: 1178, y: -1295 },
    { x: 1179, y: -1438 },
    { x: 1180, y: -1509 },
    { x: 1181, y: -1567 },
    { x: 1182, y: -1594 },
    { x: 1183, y: -1583 },
    { x: 1184, y: -1569 },
    { x: 1185, y: -1547 },
    { x: 1186, y: -1504 },
    { x: 1187, y: -1457 },
    { x: 1188, y: -1432 },
    { x: 1189, y: -1403 },
    { x: 1190, y: -1335 },
    { x: 1191, y: -1249 },
    { x: 1192, y: -1157 },
    { x: 1193, y: -1058 },
    { x: 1194, y: -957 },
    { x: 1195, y: -835 },
    { x: 1196, y: -733 },
    { x: 1197, y: -650 },
    { x: 1198, y: -567 },
    { x: 1199, y: -508 },
    { x: 1200, y: -446 },
    { x: 1201, y: -378 },
    { x: 1202, y: -304 },
    { x: 1203, y: -240 },
    { x: 1204, y: -180 },
    { x: 1205, y: -123 },
    { x: 1206, y: -63 },
    { x: 1207, y: -11 },
    { x: 1208, y: 46 },
    { x: 1209, y: 112 },
    { x: 1210, y: 181 },
    { x: 1211, y: 221 },
    { x: 1212, y: 256 },
    { x: 1213, y: 283 },
    { x: 1214, y: 318 },
    { x: 1215, y: 348 },
    { x: 1216, y: 371 },
    { x: 1217, y: 397 },
    { x: 1218, y: 410 },
    { x: 1219, y: 409 },
    { x: 1220, y: 424 },
    { x: 1221, y: 440 },
    { x: 1222, y: 443 },
    { x: 1223, y: 429 },
    { x: 1224, y: 420 },
    { x: 1225, y: 424 },
    { x: 1226, y: 429 },
    { x: 1227, y: 415 },
    { x: 1228, y: 394 },
    { x: 1229, y: 391 },
    { x: 1230, y: 402 },
    { x: 1231, y: 410 },
    { x: 1232, y: 410 },
    { x: 1233, y: 408 },
    { x: 1234, y: 408 },
    { x: 1235, y: 405 },
    { x: 1236, y: 399 },
    { x: 1237, y: 392 },
    { x: 1238, y: 383 },
    { x: 1239, y: 376 },
    { x: 1240, y: 375 },
    { x: 1241, y: 368 },
    { x: 1242, y: 366 },
    { x: 1243, y: 363 },
    { x: 1244, y: 353 },
    { x: 1245, y: 345 },
    { x: 1246, y: 334 },
    { x: 1247, y: 326 },
    { x: 1248, y: 317 },
    { x: 1249, y: 313 },
    { x: 1250, y: 320 },
    { x: 1251, y: 318 },
    { x: 1252, y: 300 },
    { x: 1253, y: 275 },
    { x: 1254, y: 262 },
    { x: 1255, y: 252 },
    { x: 1256, y: 239 },
    { x: 1257, y: 236 },
    { x: 1258, y: 231 },
    { x: 1259, y: 236 },
    { x: 1260, y: 240 },
    { x: 1261, y: 235 },
    { x: 1262, y: 222 },
    { x: 1263, y: 220 },
    { x: 1264, y: 223 },
    { x: 1265, y: 228 },
    { x: 1266, y: 222 },
    { x: 1267, y: 205 },
    { x: 1268, y: 197 },
    { x: 1269, y: 191 },
    { x: 1270, y: 180 },
    { x: 1271, y: 185 },
    { x: 1272, y: 174 },
    { x: 1273, y: 170 },
    { x: 1274, y: 166 },
    { x: 1275, y: 161 },
    { x: 1276, y: 151 },
    { x: 1277, y: 148 },
    { x: 1278, y: 142 },
    { x: 1279, y: 136 },
    { x: 1280, y: 131 },
    { x: 1281, y: 127 },
    { x: 1282, y: 118 },
    { x: 1283, y: 111 },
    { x: 1284, y: 114 },
    { x: 1285, y: 110 },
    { x: 1286, y: 97 },
    { x: 1287, y: 85 },
    { x: 1288, y: 72 },
    { x: 1289, y: 65 },
    { x: 1290, y: 61 },
    { x: 1291, y: 62 },
    { x: 1292, y: 64 },
    { x: 1293, y: 61 },
    { x: 1294, y: 59 },
    { x: 1295, y: 56 },
    { x: 1296, y: 64 },
    { x: 1297, y: 55 },
    { x: 1298, y: 56 },
    { x: 1299, y: 73 },
    { x: 1300, y: 63 },
    { x: 1301, y: 56 },
    { x: 1302, y: 54 },
    { x: 1303, y: 35 },
    { x: 1304, y: 12 },
    { x: 1305, y: -3 },
    { x: 1306, y: -2 },
    { x: 1307, y: -9 },
    { x: 1308, y: -15 },
    { x: 1309, y: -13 },
    { x: 1310, y: 1 },
    { x: 1311, y: 27 },
    { x: 1312, y: 48 },
    { x: 1313, y: 53 },
    { x: 1314, y: 55 },
    { x: 1315, y: 54 },
    { x: 1316, y: 27 },
    { x: 1317, y: 20 },
    { x: 1318, y: 14 },
    { x: 1319, y: 10 },
    { x: 1320, y: 3 },
    { x: 1321, y: 9 },
    { x: 1322, y: 21 },
    { x: 1323, y: 15 },
    { x: 1324, y: 9 },
    { x: 1325, y: 5 },
    { x: 1326, y: 0 },
    { x: 1327, y: 0 },
    { x: 1328, y: -1 },
    { x: 1329, y: 3 },
    { x: 1330, y: 4 },
    { x: 1331, y: 2 },
    { x: 1332, y: -4 },
    { x: 1333, y: -5 },
    { x: 1334, y: -12 },
    { x: 1335, y: -14 },
    { x: 1336, y: -20 },
    { x: 1337, y: -23 },
    { x: 1338, y: -21 },
    { x: 1339, y: -20 },
    { x: 1340, y: -28 },
    { x: 1341, y: -25 },
    { x: 1342, y: -25 },
    { x: 1343, y: -30 },
    { x: 1344, y: -34 },
    { x: 1345, y: -43 },
    { x: 1346, y: -39 },
    { x: 1347, y: -36 },
    { x: 1348, y: -44 },
    { x: 1349, y: -28 },
    { x: 1350, y: -22 },
    { x: 1351, y: -11 },
    { x: 1352, y: -12 },
    { x: 1353, y: -7 },
    { x: 1354, y: -14 },
    { x: 1355, y: -11 },
    { x: 1356, y: -13 },
    { x: 1357, y: -19 },
    { x: 1358, y: -19 },
    { x: 1359, y: -13 },
    { x: 1360, y: 4 },
    { x: 1361, y: 19 },
    { x: 1362, y: 16 },
    { x: 1363, y: 19 },
    { x: 1364, y: 21 },
    { x: 1365, y: 22 },
    { x: 1366, y: 5 },
    { x: 1367, y: -12 },
    { x: 1368, y: -27 },
    { x: 1369, y: -24 },
    { x: 1370, y: -16 },
    { x: 1371, y: -15 },
    { x: 1372, y: -2 },
    { x: 1373, y: 8 },
    { x: 1374, y: -1 },
    { x: 1375, y: -7 },
    { x: 1376, y: -1 },
    { x: 1377, y: 12 },
    { x: 1378, y: 26 },
    { x: 1379, y: 27 },
    { x: 1380, y: 32 },
    { x: 1381, y: 27 },
    { x: 1382, y: 19 },
    { x: 1383, y: 22 },
    { x: 1384, y: 30 },
    { x: 1385, y: 36 },
    { x: 1386, y: 38 },
    { x: 1387, y: 43 },
    { x: 1388, y: 46 },
    { x: 1389, y: 40 },
    { x: 1390, y: 35 },
    { x: 1391, y: 27 },
    { x: 1392, y: 24 },
    { x: 1393, y: 23 },
    { x: 1394, y: 16 },
    { x: 1395, y: 7 },
    { x: 1396, y: 7 },
    { x: 1397, y: 11 },
    { x: 1398, y: 16 },
    { x: 1399, y: 10 },
    { x: 1400, y: 6 },
    { x: 1401, y: 3 },
    { x: 1402, y: 3 },
    { x: 1403, y: 12 },
    { x: 1404, y: 12 },
    { x: 1405, y: 8 },
    { x: 1406, y: 5 },
    { x: 1407, y: 4 },
    { x: 1408, y: 4 },
    { x: 1409, y: 4 },
    { x: 1410, y: 12 },
    { x: 1411, y: 22 },
    { x: 1412, y: 9 },
    { x: 1413, y: 0 },
    { x: 1414, y: -6 },
    { x: 1415, y: -23 },
    { x: 1416, y: -25 },
    { x: 1417, y: -25 },
    { x: 1418, y: -31 },
    { x: 1419, y: -45 },
    { x: 1420, y: -51 },
    { x: 1421, y: -50 },
    { x: 1422, y: -46 },
    { x: 1423, y: -55 },
    { x: 1424, y: -59 },
    { x: 1425, y: -60 },
    { x: 1426, y: -63 },
    { x: 1427, y: -62 },
    { x: 1428, y: -62 },
    { x: 1429, y: -63 },
    { x: 1430, y: -75 },
    { x: 1431, y: -85 },
    { x: 1432, y: -92 },
    { x: 1433, y: -94 },
    { x: 1434, y: -87 },
    { x: 1435, y: -85 },
    { x: 1436, y: -77 },
    { x: 1437, y: -91 },
    { x: 1438, y: -106 },
    { x: 1439, y: -114 },
    { x: 1440, y: -121 },
    { x: 1441, y: -133 },
    { x: 1442, y: -146 },
    { x: 1443, y: -159 },
    { x: 1444, y: -168 },
    { x: 1445, y: -167 },
    { x: 1446, y: -179 },
    { x: 1447, y: -190 },
    { x: 1448, y: -200 },
    { x: 1449, y: -205 },
    { x: 1450, y: -210 },
    { x: 1451, y: -213 },
    { x: 1452, y: -210 },
    { x: 1453, y: -217 },
    { x: 1454, y: -219 },
    { x: 1455, y: -225 },
    { x: 1456, y: -239 },
    { x: 1457, y: -246 },
    { x: 1458, y: -257 },
    { x: 1459, y: -276 },
    { x: 1460, y: -298 },
    { x: 1461, y: -297 },
    { x: 1462, y: -305 },
    { x: 1463, y: -312 },
    { x: 1464, y: -305 },
    { x: 1465, y: -300 },
    { x: 1466, y: -312 },
    { x: 1467, y: -321 },
    { x: 1468, y: -318 },
    { x: 1469, y: -306 },
    { x: 1470, y: -302 },
    { x: 1471, y: -296 },
    { x: 1472, y: -297 },
    { x: 1473, y: -294 },
    { x: 1474, y: -287 },
    { x: 1475, y: -290 },
    { x: 1476, y: -301 },
    { x: 1477, y: -310 },
    { x: 1478, y: -312 },
    { x: 1479, y: 0 },
    { x: 1480, y: -265 },
    { x: 1481, y: -362 },
    { x: 1482, y: -303 },
    { x: 1483, y: -302 },
    { x: 1484, y: -293 },
    { x: 1485, y: -296 },
    { x: 1486, y: -295 },
    { x: 1487, y: -286 },
    { x: 1488, y: -291 },
    { x: 1489, y: -287 },
    { x: 1490, y: -268 },
    { x: 1491, y: -243 },
    { x: 1492, y: -231 },
    { x: 1493, y: -229 },
    { x: 1494, y: -228 },
    { x: 1495, y: -229 },
    { x: 1496, y: -236 },
    { x: 1497, y: -243 },
    { x: 1498, y: -242 },
    { x: 1499, y: -217 },
    { x: 1500, y: -206 },
    { x: 1501, y: -199 },
    { x: 1502, y: -189 },
    { x: 1503, y: -187 },
    { x: 1504, y: -178 },
    { x: 1505, y: -163 },
    { x: 1506, y: -152 },
    { x: 1507, y: -150 },
    { x: 1508, y: -149 },
    { x: 1509, y: -144 },
    { x: 1510, y: -137 },
    { x: 1511, y: -121 },
    { x: 1512, y: -119 },
    { x: 1513, y: -132 },
    { x: 1514, y: -126 },
    { x: 1515, y: -123 },
    { x: 1516, y: -104 },
    { x: 1517, y: -96 },
    { x: 1518, y: -97 },
    { x: 1519, y: -82 },
    { x: 1520, y: -56 },
    { x: 1521, y: -42 },
    { x: 1522, y: -47 },
    { x: 1523, y: -40 },
    { x: 1524, y: -33 },
    { x: 1525, y: -37 },
    { x: 1526, y: -43 },
    { x: 1527, y: -51 },
    { x: 1528, y: -51 },
    { x: 1529, y: -35 },
    { x: 1530, y: -19 },
    { x: 1531, y: -12 },
    { x: 1532, y: -11 },
    { x: 1533, y: -9 },
    { x: 1534, y: -2 },
    { x: 1535, y: 12 },
    { x: 1536, y: 24 },
    { x: 1537, y: 24 },
    { x: 1538, y: 32 },
    { x: 1539, y: 42 },
    { x: 1540, y: 39 },
    { x: 1541, y: 45 },
    { x: 1542, y: 55 },
    { x: 1543, y: 43 },
    { x: 1544, y: 42 },
    { x: 1545, y: 45 },
    { x: 1546, y: 46 },
    { x: 1547, y: 51 },
    { x: 1548, y: 58 },
    { x: 1549, y: 61 },
    { x: 1550, y: 57 },
    { x: 1551, y: 55 },
    { x: 1552, y: 46 },
    { x: 1553, y: 29 },
    { x: 1554, y: 23 },
    { x: 1555, y: 24 },
    { x: 1556, y: 21 },
    { x: 1557, y: 27 },
    { x: 1558, y: 45 },
    { x: 1559, y: 56 },
    { x: 1560, y: 79 },
    { x: 1561, y: 102 },
    { x: 1562, y: 103 },
    { x: 1563, y: 114 },
    { x: 1564, y: 129 },
    { x: 1565, y: 116 },
    { x: 1566, y: 112 },
    { x: 1567, y: 127 },
    { x: 1568, y: 130 },
    { x: 1569, y: 135 },
    { x: 1570, y: 143 },
    { x: 1571, y: 144 },
    { x: 1572, y: 157 },
    { x: 1573, y: 153 },
    { x: 1574, y: 140 },
    { x: 1575, y: 135 },
    { x: 1576, y: 129 },
    { x: 1577, y: 111 },
    { x: 1578, y: 103 },
    { x: 1579, y: 106 },
    { x: 1580, y: 108 },
    { x: 1581, y: 94 },
    { x: 1582, y: 96 },
    { x: 1583, y: 89 },
    { x: 1584, y: 85 },
    { x: 1585, y: 89 },
    { x: 1586, y: 94 },
    { x: 1587, y: 82 }],
          lineTension: 0.5,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 1.5,
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

    var ctx = document.getElementById('myChart_2')
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