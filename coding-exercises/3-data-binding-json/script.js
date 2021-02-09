console.log('hello');

let viz = d3.select("#viz-container")
  .append("svg")
    .attr("id", "viz")
    .attr("width", 1000)
    .attr("height", 750)
;

// load data from the json file
d3.json("data.json").then(gotData);

let color = [];
let x = [];
let y = [];
let strokewidth = [];
let r = [];

function gotData(incomingData) {
  console.log(incomingData);

//store data in lists
  for (let i = 0; i<incomingData.length; i++) {
    color.push(incomingData[i].MarkOrNot);
    x.push(incomingData[i].WhatTime);
    y.push(incomingData[i].HowLongSincePosted);
    strokewidth.push(incomingData[i].HowMuchILike);
    r.push(incomingData[i].HowManyLikesAlready);
  }

//visualize data points as circles
  viz.selectAll("circle").data(x).enter()
    .append("circle")
      .attr("cx", circlex)
      .data(y)
      .attr("cy", circley)
      .data(r)
      .attr("r", radius)
      .data(color)
      .attr("fill", circleColor)
      .attr("stroke", strokeColor)
      .data(strokewidth)
      .attr("stroke-width", circleStrokeWidth)
  ;

}

function circlex(x) {
  return x * 30 + 150;
}

function circley(y) {
  return y * 5 + 100;
}

function radius(r) {
  return r * 5 + 10;
}

function circleColor(color) {
  if (color == 0) {
    return "white"
  } else {
    return "#005f6f"
  }
}

function strokeColor(color) {
  if (color == 0) {
    return "#005f6f"
  } else {
    return "white"
  }
}

function circleStrokeWidth(strokewidth) {
  return strokewidth * 2.5
}
