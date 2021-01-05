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