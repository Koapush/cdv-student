function gotData(incomingData){
  function circleColor(d, i){
    if (d.TypeOfContent == 'picture'){
      // return "#005f6f"
      return "#005f6f"
    } else if (d.TypeOfContent == 'text'){
      return "lightgrey"
    } else if (d.TypeOfContent == 'video'){
      return "orange"
    } else if (d.TypeOfContent == 'song'){
      return "#7791E6"
    } else if (d.TypeOfContent == 'article'){
      return "lightgreen"
    }
}
//
// if (d.TypeOfContent == picture){
//   return "#005f6f"
// } else if (d.TypeOfContent == “text”){
//   return "white"
// } else if (d.TypeOfContent == “video”){
//   return "lightblue"
// } else if (d.TypeOfContent == “song”){
//   return "orange"
// } else if (d.TypeOfContent == “article”){
//   return "lightgreen"
// }



function strokeColor(d, i){
  return "white"
}

function circleRadius(d, i){
  return d.HowManyLikesAlready * 5 + 10
}

function circleStrokeWidth(d, i){
  return d.HowMuchILike * 1.8
}



function positionTranslate(d, i){
  let x = d.WhatTime * 60 + 50;
  let y = d.HowLongSincePosted * 5 + 100;
  return "translate(" + x + "," + y + ")";
}

function textTranslate(d, i){
  let x = - d.HowManyLikesAlready * 5 - 40;
  let y = d.HowManyLikesAlready * 5 + 40;
  return "translate(" + x + "," + y + ")";
}

function circleText(d, i){
  return d.Description
}


  // create svg
  let viz = d3.select("#viz-container")
    .append("svg")
      .attr("id", "viz")
      .attr("width", 1000)
      .attr("height", 550)
  ;
  // append groups
  let groupelements = viz.selectAll(".datagroup").data(incomingData)
    .enter()
      .append("g")
      .attr("class", "datagroup")
      // .on('mouseover', function (d, i) {
      //     return groupelements.selectAll.attr('visibility', 'hidden')
      //   })
      groupelements.attr("transform", positionTranslate);
  ;


  // append text
  groupelements.append("text")
      .attr('id',(d,i)=>`text-${i}`)
      .text(circleText)
      .attr("transform", textTranslate)
      .attr("class", "description")
      .attr("fill", "white")
      .attr("font-family", "Orbitron")
      .attr("visibility", "hidden")
  ;
  // append circles
  groupelements.append("circle")
      .attr('id',(d,i)=>`circle-${i}`)
      .attr("r", circleRadius)
      .attr("fill", circleColor)
      .attr("stroke", strokeColor)
      .attr("stroke-width", circleStrokeWidth)
      .on('mouseover', function (d, i) {
          d3.select(`#text-${i}`)
          .attr("visibility", "visible")
        })
      .on('mouseout', function (d, i) {
          d3.select(`#text-${i}`)
          .attr("visibility", "hidden")
        })
  ;

  // position groups (this could also be part of the
  // section where we created the groups in the first place).
  // groupelements.attr("transform", positionTranslate);
}


// load data from the json file
d3.json("data.json").then(gotData);
