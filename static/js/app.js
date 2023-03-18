const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

//Functions
function buildMetadata(sample) {
    let panel = d3.select('#sample-metadata')
    panel.html('')
    d3.json(url).then(function (data) {
        let metadata = data.metadata.filter(obj => obj.id == sample)[0];
        console.log(data.metadata.filter(obj => obj.id == sample));
        for (item in metadata) {
            panel.append('h6').text(`${item}: ${metadata[item]}`)
        }  
    }

    )
    
}

function init(){
    let select = d3.select('#selDataset')
    d3.json(url).then(function (data) {
        for (let i = 0; i < data.names.length; i++) {
            select.append('option').text(data.names[i]).property('value', data.names[i])
        }
    }
    
    )
    buildCharts('940');
    buildMetadata('940');
}

function buildCharts(sample){
// Fetch the JSON data and console log it
d3.json(url).then(function (data) {
  console.log(data);
  let sampleValues = data.samples.filter(obj => obj.id === sample)[0].sample_values;  
  let otuIDs = data.samples.filter(obj => obj.id === sample)[0].otu_ids;
  let otuLabels = data.samples.filter(obj => obj.id === sample)[0].otu_labels;

  let barData = [{
    x: sampleValues.slice(0,10).reverse(),
    y: otuIDs.slice(0,10).map(otu => `OTU ${otu}`).reverse(),
    text: otuLabels.slice(0,10).reverse(),
    orientation: 'h',
    type: 'bar'
  }]

  Plotly.newPlot("bar", barData)

  let bubbleData = [{
    x: otuIDs,
    y: sampleValues,
    text: otuLabels, 
    mode: 'markers',
    marker: {
      color: otuIDs,
      size: sampleValues
    }
  }]
   
  let layout = {
    xaxis: {
        title: {
          text: 'OTU ID',
        },
      },
  }
  Plotly.newPlot('bubble', bubbleData, layout);
});
}

function optionChanged(sample) {
    buildCharts(sample);
    buildMetadata(sample);  
}

init();