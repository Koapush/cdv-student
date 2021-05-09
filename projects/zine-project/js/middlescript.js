// QUESTIONS:
// DONE!!!!!

// All Data features:
// // WhatTime: Group X-position
// // HowLongSincePosted: Group Y-position
// // HowManyLikesAlready: Radius
// // TypeOfContent: Center Color(video/picture/text/article/else)
// // HowMuchILike: StrokeWeight
// // Description: Text


// LINES - Height: HowLongSincePosted   StrokeWeight: HowMuchILike


let w = 2400;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "#242424")
;


let timeParseFunction = d3.timeParse("%H:%M");
function mapFunction(datapoint) {
    datapoint.WhatTime  = timeParseFunction(datapoint.WhatTime);
    return datapoint
}
function transformData(dataToTransform) {
    let timeCorrected = dataToTransform.map(mapFunction);
    // map the death_year to what html understands, return the datasets with updated year
    return timeCorrected
}


function gotData(incomingData){
    console.log('heng',typeof(incomingData))
    console.log(incomingData.length)
    let transformedData = transformData(incomingData)
    console.log('hello',transformedData)


    let vizGroup = viz.append("g").attr("class","vizGroup")
    let datagroups = vizGroup.selectAll(".datagroup").data(transformedData).enter()
      .append('g')
        .attr("class", "datagroup")
      ;


    function getHowLongSincePosted(transformedData) {
        return transformedData.HowLongSincePosted;
    }
    let minHowLongSincePosted = d3.min(transformedData, getHowLongSincePosted);
    let maxHowLongSincePosted = d3.max(transformedData, getHowLongSincePosted);
    let meanHowLongSincePosted = d3.mean(transformedData, getHowLongSincePosted);
    let yPadding = 50;
    console.log(minHowLongSincePosted,maxHowLongSincePosted)
    let heightScale = d3.scaleLinear()
      .domain([minHowLongSincePosted,meanHowLongSincePosted,maxHowLongSincePosted])
      .range([yPadding,h/1.55,h-yPadding*3.8])

    function getHeight(d,i){
        return heightScale(d.HowLongSincePosted)
    }

    function getHowMuchILike(transformedData) {
        return transformedData.HowMuchILike;
    }
    let minHowMuchILike = d3.min(transformedData, getHowMuchILike);
    let maxHowMuchILike = d3.max(transformedData, getHowMuchILike);
    let strokeWeightScale = d3.scaleLinear()
      .domain([minHowMuchILike,maxHowMuchILike])
      .range([1,25])
    function getStrokeWeight(d,i){
        transformedStrokeWeight = strokeWeightScale(d.HowMuchILike)
        return transformedStrokeWeight
    }


  // GROUP POSITION - WhatTime
    let xPadding = w/(transformedData.length);
    function getWhatTime(datapoint) {
        return datapoint.WhatTime;
    }
    let earliestTime = d3.min(transformedData, getWhatTime);
    let latestTime = d3.max(transformedData, getWhatTime);
    let xDomain = d3.extent(transformedData, getWhatTime);
    console.log(xDomain)
    let timeScale = d3.scaleTime().domain(xDomain).range([1.5*xPadding,w-xPadding])


    function getGroupPosition(d, i) {
        var x = timeScale(d.WhatTime);
        var y = h/12;
        return "translate(" + (x+5) + ", " + y + ")"
    }


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
        return height - radius
    }



    var colorScaleCircle = d3.scaleLinear()
      .domain([earliestTime, latestTime])
      // .range(["#d7191c","#e76818","#f29e2e","#f9d057","#ffff8c","#90eb9d","#00ccbc","#00a6ca","#2c7bb6"]);
      .range([0,1]);
    let pieceWiseColorScale = d3.piecewise(["#f17a6d", "#fcbe56", "#ffff56",
                      "#c5ff64", "#87dd70", "#61dae7", "#56a0ff", "#b38ddf"])
    function getCircleColor(d,i){
        return pieceWiseColorScale(colorScaleCircle(d.WhatTime))
        // if (d.typeofcontent == "text"){
        //     return "red"
        // } else if (d.typeofcontent == "video"){
        //     return "yellow"
        // } else if(d.typeofcontent == "picture"){
        //     return "lightgreen"
        // } else if (d.typeofcontent == "article"){
        //     return "lightblue"
        // } else if (d.typeofcontent == "song") {
        //     return "purple"
        // }
    }

    let circles = datagroups
      .append('circle')
        .attr('cx', 0)
        .attr('cy', getHeight)
        .attr('r', getRadius)
        .attr('fill', getCircleColor)
        .attr('opacity', 0)
    ; //CIRCLES FINISH

    let lines = datagroups
      .append("line")//making a line for legend
        .attr('class', 'datalines')
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", 0)
        .attr("y2", getCy) //HowLongSincePosted
        .style("stroke-dasharray",getStrokeWeight) //虚线小方块长度
        .style("stroke-width",getStrokeWeight) //HowMuchILike
        .style("opacity",0.4)
        .style("stroke", getCircleColor)
    ; // LINES FINISH


//// GRADIENT COLOR FROM ONLINE TUTORIAL
    //Append a defs (for definition) element to your SVG
    var defs = viz.append("defs");
    //Append a linearGradient element to the defs and give it a unique id
    var linearGradient = defs.append("linearGradient")
      .attr("id", "linear-gradient");
    //Draw the rectangle and fill with gradient
    viz.append("rect")
      .attr("x", 1.5*xPadding+10)
      .attr("y", 6)
      .attr("width", w-2.5*xPadding)
      .attr("height",xPadding/2-12)
      .style("fill", "url(#linear-gradient)");
    //A color scale
    var colorScale = d3.scaleLinear()
      .range(["#f17a6d", "#fcbe56", "#ffff56", "#c5ff64", "#87dd70", "#61dae7", "#56a0ff", "#b38ddf"])
    // Append multiple color stops by using D3's data/enter step
    linearGradient.selectAll("stop")
      .data( colorScale.range() )
      .enter().append("stop")
      .attr("offset", function(d,i) { return i/(colorScale.range().length-1); })
      .attr("stop-color", function(d) { return d; });



    let xAxisGroup = viz.append("g").attr("class", "xaxis");
    let xAxis = d3.axisBottom(timeScale).ticks(24);
    xAxisGroup.call(xAxis)
      .attr("transform", "translate(10,"+xPadding/2+")")
      .attr("color", "#f6f4e6")

      .attr("font-family", "Stick")
      .attr("font-size", "15px")
      .attr("stroke-width", "3px")
    ;
    xAxisGroup
      .append("text")
        .attr("transform", "translate(22,200) rotate(90)")
        .attr('fill', '#f6f4e6')
        .attr("font-family", "Stick")
        .attr("font-size", "20px")
        .text("posted minutes ago")
    ;

    let yAxisGroup = viz.append("g").attr("class", "yaxis");
    let yAxis = d3.axisLeft(heightScale).ticks(5);
    yAxisGroup.call(yAxis)
      .attr("transform", "translate(" + (xPadding-5) + ","+yPadding/10+")")
      .attr("color", '#f6f4e6')
      .attr("font-family", "Stick")
      .attr("font-size", "13px")
      .attr("stroke-width", "3px")
    ; // Axises FINISH


    // TEXTS - Description
    function getDescription(d,i){
        return d.Description
    };
    function getFontTranslate(d,i){
        fontTranslate = getStrokeWeight(d,i)
        return -fontTranslate/2 -10
    };
    function getXPosition(d,i){
        return heightScale(d.HowLongSincePosted)
    };



    let scaleScale = d3.scaleLinear().domain([leastLikes,mostLikes]).range([0.05,0.32])
    function getScale(d,i){
        return scaleScale(d.HowManyLikesAlready)
    };
    function translateLogoPositionSize(d,i){
        width = getRadius(d,i)
        height = getCy(d,i)
        scale = getScale(d,i)
        return "translate("+ (-width-2.5) +","+ (height+4) + ") scale(" + scale + ")"
    };


    let circleStrokeWeightScale = d3.scaleLinear().domain([minHowMuchILike,maxHowMuchILike]).range([0.1,20])
    function getCircleStrokeWeight(d,i){
        transformedStrokeWeight = circleStrokeWeightScale(d.HowMuchILike)
        return transformedStrokeWeight
    };

    let customLogos = datagroups.append("g")
      .attr("class", "customLogo")
      .html(logo)
      .attr("transform", translateLogoPositionSize)
    function getLogoColor(d,i){
        if (d.typeofcontent == "text"){
            return "#f17a6d"
        } else if (d.typeofcontent == "picture") {
            return "#fcbe56"
        } else if (d.typeofcontent == "video") {
            return "#ffff56"
        } else if (d.typeofcontent == "article") {
            return "#87dd70"
        } else if (d.typeofcontent == "song") {
            return "#56a0ff"
        } else {
            return "#b38ddf"
        }
    };

    datagroups.select(".blade1").attr("fill", getLogoColor).attr("opacity", 0);
    datagroups.select(".blade2").attr("fill", getLogoColor).attr("opacity", 0);
    datagroups.select(".blade3").attr("fill", getLogoColor).attr("opacity", 0);
    datagroups.select(".blade4").attr("fill", getLogoColor).attr("opacity", 0);
    datagroups.select(".blade5").attr("fill", getLogoColor).attr("opacity", 0);
    datagroups.select(".blade6").attr("fill", getLogoColor).attr("opacity", 0);
    datagroups.select(".blade7").attr("fill", getLogoColor).attr("opacity", 0);
    datagroups.select(".blade8").attr("fill", getLogoColor).attr("opacity", 0);

    customLogos.select(".outside")
      .attr("fill", getCircleColor)
      .attr('opacity', 0.8)
      .attr("stroke",getCircleColor)
      .attr("stroke-width",getCircleStrokeWeight)

    function getInsideCircleColor(d,i){
        let xPosition = timeScale(d.WhatTime)
        if (xPosition<650){
            if (d.typeofcontent == "picture") {return "#c24914"}
            else if (d.typeofcontent == "text") {return "#fc8621"}
            else if (d.typeofcontent == "video") {return "#c05555"}
            else if (d.typeofcontent == "article") {return "#f9e0ae"}
            else {return "#202124"}
        } else if (xPosition>1650){
            if (d.typeofcontent == "picture") {return "#4d4c7d"}
            else if (d.typeofcontent == "text") {return "#b8b5ff"}
            else if (d.typeofcontent == "video") {return "#a8d3da"}
            else if (d.typeofcontent == "article") {return "#a6b1e1"}
            else {return "#c9cbff"}
        } else if (650<xPosition<1650){
            if (d.typeofcontent == "picture") {return "#018383"}
            else if (d.typeofcontent == "text") {return "#02a8a8"}
            else if (d.typeofcontent == "video") {return "#70af85"}
            else if (d.typeofcontent == "article") {return "#f5dea3"}
            else {return "#202124"}
        }
    }


    datagroups.select(".insideCircle")
      .attr("opacity", 1)
      .attr("fill", getInsideCircleColor)

    desNeedToStart = ["idols","new semester", "lego", "exhibitions", "fireworks",
                    "new year", "internship offer", "winter", "valentine",
                    "gather with friends", "football game", "birthday party"]
    function getDescriptionX(d,i) {
        if (desNeedToStart.includes(d.Description)) {
            height = getHeight(d,i)
            radius = getRadius(d,i)
            return height*1.1 + radius
        } else {
            descriptionX = getCy(d,i)
            return descriptionX
        }
    }

    function getDescriptionY(d,i) {
      if (desNeedToStart.includes(d.Description)) {
      radius = getRadius(d,i)
      descriptionY = 5
      return descriptionY
    } else {
      return -getStrokeWeight(d,i)
    }
  }


  let descriptions = datagroups.append("text")//making a line for legend
    .attr('class', 'description')
    .text(getDescription)
    .attr("x", getDescriptionX)
    .attr("y", getDescriptionY)
    .attr("transform", "rotate(90)")
    .attr("fill", '#f6f4e6')
    .style("font-family", "Stick")
    .style("font-size", 20)
    .style("opacity",0.9)
    .attr("text-anchor",function (d,i){
        if (desNeedToStart.includes(d.Description)) {
            return "start"
        } else {
            return "end" }
        })
    ;// TEXTS FINISH

    datagroups.attr("transform", getGroupPosition);
}


d3.json("data.json").then(gotData);


let logo = `<path class="cls-1 outside" d="M301.38,286.82C421.79,287,521,385.3,519.84,507.91c-1.16,119.65-98.24,215.91-217.43,216.58A218.5,218.5,0,0,1,82.23,502.63C83.62,383.8,180.48,286.92,301.38,286.82Zm-.49,141.82c-42.57-.82-77.53,34.81-77.1,77.89.42,41.85,34.81,76.35,76.56,76.27,44-.09,77.8-34,77.8-77.95C378.15,462.19,342.9,427.89,300.89,428.64Zm.73,279.11c5.4-.28,12.12-.14,18.69-1.06,11.31-1.59,22.6-3.56,33.78-5.93,5.13-1.08,5.64-4.09,2-7.82q-8.57-8.64-17.26-17.15c-11.67-11.49-23.45-22.89-35-34.47s-22.8-23.22-34.23-34.8q-19-19.24-38.15-38.39c-1.89-1.89-4.32-3.25-6.5-4.85-.63,2.59-1.81,5.18-1.82,7.78-.12,37.83-.08,75.65-.07,113.48,0,1.67-.43,3.57.23,4.94.91,1.9,2.33,4.23,4.1,4.91,5.24,2,10.83,3.06,16.15,4.9C261.91,705.68,281.05,707.32,301.62,707.75ZM97.92,504c1.21,13,1.79,23.6,3.33,34.06,1.06,7.16,3.42,14.12,5.29,21.15,1,3.8,3,3.89,5.73,1.4,2.92-2.7,6-5.17,8.85-8,7.33-7.39,14.45-15,21.81-22.35,8.85-8.87,17.85-17.6,26.81-26.37,3.18-3.1,6.56-6,9.64-9.2,5.5-5.72,10.68-11.75,16.28-17.36,7.36-7.35,15-14.44,22.52-21.6,7.92-7.51,15.9-14.94,23.8-22.45a25.8,25.8,0,0,0,2.54-3.3c-1.28-.89-2.46-2.31-3.86-2.57a41.71,41.71,0,0,0-8.44-.46c-8.14.21-16.28.84-24.42.8-15.89-.07-31.67-1.63-47.7.58-13.07,1.8-26.64,1-39.88,0-5.77-.44-7.61,1.73-8.75,6-3,11.49-6.4,22.94-8.63,34.59C100.49,481.2,99.31,493.72,97.92,504ZM378.47,451a25.26,25.26,0,0,0,.81-3.64Q379.16,387.19,379,327c0-7.52-.83-9.26-7.79-11.34-10.67-3.19-21.38-6.43-32.3-8.53a191.88,191.88,0,0,0-61.56-2.16c-10.18,1.35-20.2,3.89-30.28,5.93-3.8.77-4.28,2.67-1.76,5.53,2.2,2.49,4.18,5.21,6.54,7.53,13.53,13.29,27.32,26.32,40.69,39.77,14.61,14.7,28.84,29.77,43.29,44.65,3.42,3.52,7,6.85,10.51,10.33Q359,431.34,371.55,444Zm-171,39.35c-3.09,2.6-5,4-6.73,5.7q-39.76,39.69-79.47,79.44c-6.83,6.82-7,7.6-2.89,16.37,9,19.09,21.06,36.19,35.08,51.88,13,14.51,28.73,25.62,45.15,35.81,2,1.23,4.53,1.57,6.81,2.32.54-2.34,1.08-4.67,1.6-7a4.77,4.77,0,0,0,0-1q0-82.41,0-164.84c0-3,.33-6,.41-8.95C207.49,497.41,207.43,494.7,207.43,490.39Zm104.15-78.63c.08.43.17.86.25,1.29,1-.65,2.68-1.13,2.94-2a4.45,4.45,0,0,0-1-3.58c-5.45-5.95-10.89-11.93-16.65-17.56-5.17-5-11-9.41-16.1-14.54-16.49-16.62-32.64-33.59-49.28-50.07-2.62-2.6-5.3-7.55-10.24-5.52-7.21,3-14.5,6.1-21,10.28-13.68,8.76-27.35,17.48-39,29.15a260.3,260.3,0,0,0-36.59,46.36,6,6,0,0,0-.11,5.3c.6,1,3.15,1.11,4.81,1.05,2.79-.1,5.56-1,8.34-1,20.32-.11,40.63-.26,60.95-.06C236.4,411.27,274,409.69,311.58,411.76Zm46.07,170.85a13.78,13.78,0,0,0,2.79.67c7.49-.07,15-.35,22.46-.29,32.47.25,64.93.52,97.4,1,4.91.07,7.3-1.59,9.07-6.33,14.82-39.58,16.5-79.88,7.29-120.86-.64-2.83-1.71-5.56-3.11-10Zm-72.16,16.87c2.39,2.66,3.6,4.14,4.94,5.49q23.43,23.47,46.88,46.92,18.17,18.17,36.3,36.36c2.78,2.8,5.61,3.91,9.34,1.87,3.47-1.91,7.06-3.63,10.64-5.36a178.82,178.82,0,0,0,52.86-39.34c10.58-11.33,19.17-24.55,28.33-37.17,3.83-5.29,2.51-7.39-3.93-7.45-38.61-.35-77.22-.74-115.82-.94-11.14-.05-22.28.74-33.41.71-9.31,0-18.61-.72-27.91-1.07C291.5,599.41,289.29,599.48,285.49,599.48Zm109.16-79.2,1.73.83c11.5-11.79,22.88-23.69,34.52-35.34,17.29-17.3,34.8-34.38,52.11-51.66,2.54-2.54,4.84-5.35,2.88-9.7a215,215,0,0,0-30-48.17c-15.5-18.84-34.25-33.88-55.24-46.2-4.26-2.5-5.66-1.88-5.61,3.12.09,9.48.63,19,.65,28.44q.1,69.18,0,138.36C395.66,506.74,395,513.5,394.65,520.28Z" transform="translate(-82.21 -286.82)"/>
<path  class="insideCircle" d="M300.89,428.64c42-.75,77.26,33.55,77.26,76.21,0,43.93-33.78,77.86-77.8,77.95-41.75.08-76.14-34.42-76.56-76.27C223.36,463.45,258.32,427.82,300.89,428.64Z" transform="translate(-82.21 -286.82)"/>
<path class="blade1" d="M301.62,707.75c-20.57-.43-39.71-2.07-58.16-8.46-5.32-1.84-10.91-2.9-16.15-4.9-1.77-.68-3.19-3-4.1-4.91-.66-1.37-.23-3.27-.23-4.94,0-37.83,0-75.65.07-113.48,0-2.6,1.19-5.19,1.82-7.78,2.18,1.6,4.61,3,6.5,4.85q19.17,19.1,38.15,38.39c11.43,11.58,22.72,23.29,34.23,34.8s23.36,23,35,34.47q8.67,8.54,17.26,17.15c3.69,3.73,3.18,6.74-2,7.82-11.18,2.37-22.47,4.34-33.78,5.93C313.74,707.61,307,707.47,301.62,707.75Z" transform="translate(-82.21 -286.82)"/>
<path class="blade2" d="M97.92,504c1.39-10.23,2.57-22.75,4.92-35.05,2.23-11.65,5.59-23.1,8.63-34.59,1.14-4.29,3-6.46,8.75-6,13.24,1,26.81,1.8,39.88,0,16-2.21,31.81-.65,47.7-.58,8.14,0,16.28-.59,24.42-.8a41.71,41.71,0,0,1,8.44.46c1.4.26,2.58,1.68,3.86,2.57a25.8,25.8,0,0,1-2.54,3.3c-7.9,7.51-15.88,14.94-23.8,22.45-7.54,7.16-15.16,14.25-22.52,21.6-5.6,5.61-10.78,11.64-16.28,17.36-3.08,3.2-6.46,6.1-9.64,9.2-9,8.77-18,17.5-26.81,26.37-7.36,7.36-14.48,15-21.81,22.35-2.8,2.82-5.93,5.29-8.85,8-2.69,2.49-4.73,2.4-5.73-1.4-1.87-7-4.23-14-5.29-21.15C99.71,527.55,99.13,517,97.92,504Z" transform="translate(-82.21 -286.82)"/>
<path class="blade3" d="M378.47,451l-6.92-7q-12.6-12.68-25.21-25.36c-3.47-3.48-7.09-6.81-10.51-10.33-14.45-14.88-28.68-30-43.29-44.65-13.37-13.45-27.16-26.48-40.69-39.77-2.36-2.32-4.34-5-6.54-7.53-2.52-2.86-2-4.76,1.76-5.53,10.08-2,20.1-4.58,30.28-5.93a191.88,191.88,0,0,1,61.56,2.16c10.92,2.1,21.63,5.34,32.3,8.53,7,2.08,7.77,3.82,7.79,11.34q.15,60.22.28,120.43A25.26,25.26,0,0,1,378.47,451Z" transform="translate(-82.21 -286.82)"/>
<path class="blade4" d="M207.43,490.39c0,4.31.06,7,0,9.72-.08,3-.41,6-.41,8.95q0,82.43,0,164.84a4.77,4.77,0,0,1,0,1c-.52,2.34-1.06,4.67-1.6,7-2.28-.75-4.82-1.09-6.81-2.32-16.42-10.19-32.19-21.3-45.15-35.81-14-15.69-26-32.79-35.08-51.88-4.15-8.77-3.94-9.55,2.89-16.37Q161,535.81,200.7,496.09C202.39,494.41,204.34,493,207.43,490.39Z" transform="translate(-82.21 -286.82)"/>
<path class="blade5" d="M311.58,411.76c-37.56-2.07-75.18-.49-112.77-.87-20.32-.2-40.63-.05-60.95.06-2.78,0-5.55.86-8.34,1-1.66.06-4.21-.07-4.81-1.05a6,6,0,0,1,.11-5.3,260.3,260.3,0,0,1,36.59-46.36c11.67-11.67,25.34-20.39,39-29.15,6.53-4.18,13.82-7.32,21-10.28,4.94-2,7.62,2.92,10.24,5.52,16.64,16.48,32.79,33.45,49.28,50.07,5.09,5.13,10.93,9.49,16.1,14.54,5.76,5.63,11.2,11.61,16.65,17.56a4.45,4.45,0,0,1,1,3.58c-.26.88-1.91,1.36-2.94,2C311.75,412.62,311.66,412.19,311.58,411.76Z" transform="translate(-82.21 -286.82)"/>
<path class="blade6" d="M357.65,582.61l135.9-135.85c1.4,4.46,2.47,7.19,3.11,10,9.21,41,7.53,81.28-7.29,120.86-1.77,4.74-4.16,6.4-9.07,6.33-32.47-.46-64.93-.73-97.4-1-7.48-.06-15,.22-22.46.29A13.78,13.78,0,0,1,357.65,582.61Z" transform="translate(-82.21 -286.82)"/>
<path class="blade7" d="M285.49,599.48c3.8,0,6-.07,8.22,0,9.3.35,18.6,1,27.91,1.07,11.13,0,22.27-.76,33.41-.71,38.6.2,77.21.59,115.82.94,6.44.06,7.76,2.16,3.93,7.45-9.16,12.62-17.75,25.84-28.33,37.17a178.82,178.82,0,0,1-52.86,39.34c-3.58,1.73-7.17,3.45-10.64,5.36-3.73,2-6.56.93-9.34-1.87q-18.09-18.24-36.3-36.36Q313.87,628.43,290.43,605C289.09,603.62,287.88,602.14,285.49,599.48Z" transform="translate(-82.21 -286.82)"/>
<path class="blade8" d="M394.65,520.28c.36-6.78,1-13.54,1-20.32q.13-69.18,0-138.36c0-9.48-.56-19-.65-28.44-.05-5,1.35-5.62,5.61-3.12,21,12.32,39.74,27.36,55.24,46.2a215,215,0,0,1,30,48.17c2,4.35-.34,7.16-2.88,9.7-17.31,17.28-34.82,34.36-52.11,51.66-11.64,11.65-23,23.55-34.52,35.34Z" transform="translate(-82.21 -286.82)"/>
`
