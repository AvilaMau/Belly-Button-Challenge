

function init() {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {

        console.log(data);
        let names = data.names;
        let dropdownmenu = d3.select("#selDataset");

        names.forEach((sample) => {
          dropdownmenu
              .append("option")
              .text(sample)
              .property("value", sample);
      });
      buildMetadata(names[0])
      buildCharts(names[0])


    })
};

init();

function optionChanged(sample){
  buildMetadata(sample)
  buildCharts(sample)
}

function buildMetadata(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      let metadata = data.metadata;
      let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      let result = resultArray[0];
      let PANEL = d3.select("#sample-metadata");
      PANEL.html("");
      for (key in result){
        PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
      };

      buildGauge(result.wfreq);
    });
}

function buildCharts(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let samples = data.samples;
        let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: { t:0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30}
        };
        let BubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }
            }
        ];

        Plotly.newPlot("bubble", BubbleData, bubbleLayout);

        let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        let barData = [
            {
                y: yticks,
                x: sample_values.slice(0, 10).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
            }

        ];
        
        let barLayout = {
            title: "Top 10 Bacteria Cultures Food",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", barData, barLayout);
    });   

}

// {
//     "init"; {
//       "function"; "init",
//       "actions" [
//         {
//           "action": d3.select,
//           "parameters": ["#selDataset"],
//           "assignTo": "selector"
//         },
//         {
//           "action": "d3.json",
//           "parameters": ["https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"],
//           "callback": {
//             "function": null,
//             "parameters": ["data"],
//             "actions": [
//               {
//                 "action": "assign",
//                 "parameters": [
//                   {
//                     "function": "data.names",
//                     "assignTo": "sampleNames"
//                   }
//                 ]
//               },
//               {
//                 "action": "for",
//                 "parameters": [
//                   {
//                     "function": "let i = 0",
//                     "condition": "i < sampleNames.length",
//                     "increment": "i++"
//                   }
//                 ],
//                 "actions": [
//                   {
//                     "action": "selector.append",
//                     "parameters": [
//                       {
//                         "function": "\"option\""
//                       }
//                     ],
//                     "chainActions": [
//                       {
//                         "action": "text",
//                         "parameters": [
//                           {
//                             "function": "sampleNames[i]"
//                           }
//                         ]
//                       },
//                       {
//                         "action": "property",
//                         "parameters": [
//                           {
//                             "function": "sampleNames[i]"
//                           },
//                           {
//                             "function": "sampleNames[i]"
//                           }
//                         ]
//                       }
//                     ]
//                   }
//                 ]
//               },
//               {
//                 "action": "assign",
//                 "parameters": [
//                   {
//                     "function": "sampleNames[0]",
//                     "assignTo": "firstSample"
//                   }
//                 ]
//               },
//               {
//                 "action": "buildCharts",
//                 "parameters": [
//                   {
//                     "function": "firstSample"
//                   }
//                 ]
//               },
//               {
//                 "action": "buildMetadata",
//                 "parameters": [
//                   {
//                     "function": "firstSample"
//                   }
//                 ]
//               }
//             ]
//           }
//         }
//       ]
//     };
//     "optionChanged"; {
//       "function"; "optionChanged",
//       "parameters" ["newSample"],
//       "actions" [
//         {
//           "action": "buildCharts",
//           "parameters": ["newSample"]
//         },
//         {
//           "action": "buildMetadata",
//           "parameters": ["newSample"]
//         }
//       ]
    
// }

  
  // Initialize the dashboard
  //init()
//}