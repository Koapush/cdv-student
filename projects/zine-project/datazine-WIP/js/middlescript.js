// QUESTIONS:
// 1. how to draw wechat logo; edge color
// 2. transform dotted line intervals
// 3. earlist & latest
// 4. gradient color background & lines
// 5. axis
// 黑白渐变背景 typeofcontent涂相应格子的颜色 notmark的点线在下面

let w = 2400;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "#272c34")
    // .style("opacity", 0.6)
;

// //// GRADIENT COLOR FROM ONLINE TUTORIAL
// //Append a defs (for definition) element to your SVG
// var defs = viz.append("defs");
// //Append a linearGradient element to the defs and give it a unique id
// var linearGradient = defs.append("linearGradient")
//     .attr("id", "linear-gradient");
// //Draw the rectangle and fill with gradient
// viz.append("rect")
//     .attr("x", 0)
//     .attr("width", w)
//     .attr("height", h)
//     .style("fill", "url(#linear-gradient)");
// //A color scale
// var colorScale = d3.scaleLinear()
    // .range(["#2c7bb6", "#00a6ca","#00ccbc","#90eb9d","#ffff8c","#f9d057","#f29e2e","#e76818","#d7191c"]);
    // .range(["#d7191c","#e76818","#f29e2e","#f9d057","#ffff8c","#90eb9d","#00ccbc","#00a6ca","#2c7bb6"]);
    // .range(["#f17a6d", "#fcbe56", "#ffff56", "#c5ff64", "#87dd70", "#61dae7", "#56a0ff", "#b38ddf"])
//     .range(["#272c34","white","#272c34"])
// // Append multiple color stops by using D3's data/enter step
// linearGradient.selectAll("stop")
//     .data( colorScale.range() )
//     .enter().append("stop")
//     .attr("offset", function(d,i) { return i/(colorScale.range().length-1); })
//     .attr("stop-color", function(d) { return d; });


let timeParseFunction = d3.timeParse("%M:%S");

function mapFunction(datapoint) {
  datapoint.WhatTime  = timeParseFunction(datapoint.WhatTime);
  return datapoint
}
function transformData(dataToTransform) {
  let timeCorrected = dataToTransform.map(mapFunction);  // map the death_year to what html understands, return the datasets with updated year
  return timeCorrected
}


// All Data features:
// // WhatTime: Group X-position
// // HowLongSincePosted: Group Y-position
// // HowManyLikesAlready: Radius
// // Who
// // TypeOfContent (video/picture/text/article/song/hyperlink/advertisement)
// // HowMuchILike: StrokeWeight
// // Description: Text

function gotData(incomingData){
  console.log(incomingData);
  console.log(incomingData.length)
  let transformedData = transformData(incomingData)
  console.log(transformedData)

  let datagroups = viz.selectAll(".datagroup").data(transformedData).enter()
    .append('g')
      .attr("class", "datagroup")
  ;

// TRANSFORM DATA - Change Time Format

// LINES - Height: HowLongSincePosted   StrokeWeight: HowMuchILike
  function getHowLongSincePosted(transformedData) {
    return transformedData.HowLongSincePosted;
  }
  let minHowLongSincePosted = d3.min(transformedData, getHowLongSincePosted);
  let maxHowLongSincePosted = d3.max(transformedData, getHowLongSincePosted);
  let meanHowLongSincePosted = d3.mean(transformedData, getHowLongSincePosted);
  let yPadding = 50;
  // let heightScale = d3.scaleLinear().domain([minHowLongSincePosted*0.01,maxHowLongSincePosted]).range([yPadding,h-yPadding*4])
  // let heightScale = d3.scaleLinear().domain([minHowLongSincePosted,meanHowLongSincePosted,maxHowLongSincePosted]).range([yPadding,h/1.75,h-yPadding*5])
  let heightScale = d3.scaleLinear().domain([minHowLongSincePosted,meanHowLongSincePosted,maxHowLongSincePosted]).range([yPadding/2,h/1.85,h-yPadding*5])

  function getHeight(d,i){
    return heightScale(d.HowLongSincePosted)
  }
  // let colorScale = d3.scaleLinear().domain([minimumX, maximumX).range(["red",'orange',"yellow","green","blue","purple"]);
  function getColor(d,i){
    return colorScale(d.WhatTime)
  }

  function getHowMuchILike(transformedData) {
    return transformedData.HowMuchILike;
  }
  let minHowMuchILike = d3.min(transformedData, getHowMuchILike);
  let maxHowMuchILike = d3.max(transformedData, getHowMuchILike);
  let strokeWeightScale = d3.scaleLinear().domain([minHowMuchILike,maxHowMuchILike]).range([1,20])
  function getStrokeWeight(d,i){
    transformedStrokeWeight = strokeWeightScale(d.HowMuchILike)
    // return (transformedStrokeWeight + ", 30")
    return transformedStrokeWeight
  }

  let lines = datagroups
    .append("line")//making a line for legend
      .attr('class', 'datalines')
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", getHeight) //HowLongSincePosted
      // .attr("y2", h-2*yPadding) //HowLongSincePosted
      .style("stroke-dasharray",getStrokeWeight) //虚线小方块长度-美观？maybe apply to other features
      // .style("stroke-width",8) //HowMuchILike
      .style("stroke-width",getStrokeWeight) //HowMuchILike
      .style("opacity",0.2) //？maybe apply to other features
// 渐变！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
      // .style("stroke", getColor)
      .style("stroke", "white")
  ; // LINES FINISH



// CIRCLES - R: HowManyLikesAlready
  function getHowManyLikesAlready(transformedData) {
    return transformedData.HowManyLikesAlready;
  }
  let leastLikes = d3.min(transformedData, getHowManyLikesAlready);
  let mostLikes = d3.max(transformedData, getHowManyLikesAlready);
  let radiusScale = d3.scaleLinear().domain([leastLikes,mostLikes]).range([8,70])
  function getRadius(d,i){
    return radiusScale(d.HowManyLikesAlready);
  }
  function getCy(d,i){
    height = getHeight(d,i)
    radius = getRadius(d,i)
    return height + radius
  }
  function getCircleColor(d,i){
    if (d.typeofcontent == "text"){
      return "red"
    } else if (d.typeofcontent == "video"){
      return "yellow"
    } else if(d.typeofcontent == "picture"){
      return "lightgreen"
    } else if (d.typeofcontent == "article"){
      return "lightblue"
    } else if (d.typeofcontent == "song") {
      return "purple"
    }
  }
  let circles = datagroups
    .append('circle')
      .attr('cx', 0)
      .attr('cy', getCy)
      .attr('r', getRadius)
      .attr('fill', 'white')
      // .attr('fill', getCircleColor)
      .attr('opacity', 0.7)
  ; //CIRCLES FINISH





// TEXTS - Description
  function getDescription(d,i){
    return d.Description
  }
  function getFontTranslate(d,i){
    fontTranslate = getStrokeWeight(d,i)
    return -fontTranslate/2 -10
  }
  function getXPosition(d,i){
    return heightScale(d.HowLongSincePosted)
  }

  let descriptions = datagroups.append("text")//making a line for legend
      .attr('class', 'description')
      .text(getDescription)
      .attr("x", getXPosition)
      .attr("y", getFontTranslate)
      .attr("transform", "rotate(90)")
      // .style("text-align", "right")
      .style("fill", "white")
      .style("font-family", "Stick")
      .style("font-size", 20)
      .style("opacity",0.9)
  ;// TEXTS FINISH


// GROUP POSITION - WhatTime
  let xPadding = w/(transformedData.length);
  function getWhatTime(datapoint) {
    return datapoint.WhatTime;
  }
  let earliestTime = d3.min(transformedData, getWhatTime);
  let latestTime = d3.max(transformedData, getWhatTime);
  // let earliestTime = timeScale("0:00");
  // let latestTime = timeScale("24:00");
  let timeScale = d3.scaleTime().domain([earliestTime, latestTime]).range([1.5*xPadding,w-xPadding])
  function getGroupPosition(d, i) {
    var x = timeScale(d.WhatTime);
    // var x = (w/(transformedData.length))*i+xPadding*1.5;
    var y = h/15;
    return "translate(" + x + ", " + y + ")"
  }


  //// GRADIENT COLOR FROM ONLINE TUTORIAL
  //Append a defs (for definition) element to your SVG
  var defs = viz.append("defs");
  //Append a linearGradient element to the defs and give it a unique id
  var linearGradient = defs.append("linearGradient")
      .attr("id", "linear-gradient");
  //Draw the rectangle and fill with gradient
  viz.append("rect")
      .attr("x", 0)
      .attr("width", w)
      .attr("height", 30)
      .style("opacity", 0.8)
      .style("fill", "url(#linear-gradient)");
  //A color scale
  var colorScale = d3.scaleLinear()
      // .range(["#2c7bb6", "#00a6ca","#00ccbc","#90eb9d","#ffff8c","#f9d057","#f29e2e","#e76818","#d7191c"]);
      // .range(["#d7191c","#e76818","#f29e2e","#f9d057","#ffff8c","#90eb9d","#00ccbc","#00a6ca","#2c7bb6"]);
      .range(["#f17a6d", "#fcbe56", "#ffff56", "#c5ff64", "#87dd70", "#61dae7", "#56a0ff", "#b38ddf"])
  //Append multiple color stops by using D3's data/enter step
  linearGradient.selectAll("stop")
      .data( colorScale.range() )
      .enter().append("stop")
      .attr("offset", function(d,i) { return i/(colorScale.range().length-1); })
      .attr("stop-color", function(d) { return d; });

  datagroups.attr("transform", getGroupPosition)
}






d3.json("data2.json").then(gotData);
