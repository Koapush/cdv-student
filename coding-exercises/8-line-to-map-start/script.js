let w = 1200;
let h = 800;
let padding = 90;
let i = 0;

// SVG
let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "lightgrey")
;


// IMPORT DATA
// d3.json("births-china.json").then(function(incomingData){
d3.json("countries.geojson").then(function(geoData){
// d3.json("countries.geojson").then(function(geoData){
  d3.csv("gapminder_internet.csv").then(function(incomingData){
    console.log(incomingData);
    incomingData = incomingData.map(function(d, i){
      d.internetuserate = Number(d.internetuserate);
      return d
    });

    console.log(incomingData);
    let minUserRate = d3.min(incomingData, function(d,i){
      return d.internetuserate
    })
    console.log(minUserRate);

    let maxUserRate = d3.max(incomingData, function(d,i){
      return d.internetuserate
    })
    console.log(maxUserRate);

    let colorScale = d3.scaleLinear().domain([minUserRate, maxUserRate]).range(["white", "orange", "red"]);
    console.log( colorScale(20));




    // PRINT DATA
    console.log(geoData);
    // SCALES (to translate data values to pixel values)
    // let xDomain = d3.extent(incomingData, function(d){ return Number(d.year); })
    // let xScale = d3.scaleLinear().domain(xDomain).range([padding,w-padding]);
    // let yDomain = d3.extent(incomingData, function(d){ return Number(d.birthsPerThousand); })
    // let yScale = d3.scaleLinear().domain(yDomain).range([h-padding,padding]);

    let projection1 = d3.geoEqualEarth()
      .translate([w/2, h/2])
      // .center([103.8, 34.1])
      .fitExtent([[padding, padding], [w-padding, h-padding]], geoData)
    // PATH (line) MAKER - gets points, returns one of those complicated looking path strings
    // let lineMaker = d3.line()
    //     .x(function(d){
    //       return xScale(Number(d.year));
    //     })
    //     .y(function(d){
    //       return yScale(Number(d.birthsPerThousand));
    //     })
    // ;
    // let pathMaker = d3.geoPath(projection1);


    let projection2 = d3.geoEquirectangular()
      .translate([w/2, h/2])
      .fitExtent([[padding, padding], [w-padding, h-padding]], geoData)
    ;

    let projection3 = d3.geoMercator()
      .translate([w/2, h/2])
      .fitExtent([[padding, padding], [w-padding, h-padding]], geoData)
    ;

    let projlis = [projection1, projection2, projection3];
    let pathMaker = d3.geoPath(projlis[i]);

// ??????

    // CREATE SHAPES ON THE PAGE!
    // viz.selectAll(".line").data([incomingData]).enter()
    viz.selectAll(".countries").data(geoData.features).enter()
      .append("path")
        .attr("class", "country")
        .attr("d", pathMaker)
        // .attr("fill", "balck")
        .attr("fill", function(d, i){
          console.log(d.properties.name);

          let correspondingDatapoint = incomingData.find(function(datapoint){
            if (datapoint.country == d.properties.name) {
              return true
            } else {
              return false
            }
          });

          if(correspondingDatapoint != undefined) {
            console.log(correspondingDatapoint.internetuserate);
            return colorScale(correspondingDatapoint.internetuserate)
          } else {
            return "darkred"
          }
        })
        .on('mouseover',mouseOverCountry)
        .on("mouseout",mouseOutCountry)
        // .attr("stroke", "white")
        // .attr("stroke-width", 8)
    ;

    function mouseOverCountry(d,i){
      let internetuserate = incomingData.filter(e=>{
        return e.country===d.properties.name;
      })[0].internetuserate

      d3.select('#tooltip')
        .style('left', (d3.event.pageX+10)+'px')
        .style('top', (d3.event.pageY-25)+'px')
        .style('display','inline-block')
        .html(`
          <p>
          <b>${d.properties.name}</b>
          <br>${internetuserate.toFixed(2)}%
          </p>
          `)
    }

    function mouseOutCountry(d,i){
      d3.select('#tooltip')
        .style('display','none')

    }

    // document.querySelector("#tooltip").addEventListener("mousemove")



    document.getElementById("button").addEventListener("click", function() {
      i =(i+1)%projlis.length;
			let pathMaker = d3.geoPath(projlis[i]);
			viz.selectAll(".country")
        .data(geoData.features)
        .attr("d", pathMaker)
    		// document.querySelector("#pp").innerHTML = "Projection Type " + (i+1) + ": " + name[i]
		});


    let lat = 31.22773;
    let lon = 121.52946;
    // let pixelvalue = projection1([lon, lat]);
    // console.log(pixelvalue);

    // viz.append("circle")
    //   .attr("cx",function(){
    //     return projection1([lon, lat])[0];
    //   })
    //   .attr("cy",function(){
    //     return projection1([lon, lat])[1];
    //   })
    //   .attr("r", 20)
    //   .attr("fill", "red")
  })
})
