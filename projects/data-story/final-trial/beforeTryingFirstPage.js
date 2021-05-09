let w = window.innerWidth;
let h = window.innerHeight;

// https://stackoverflow.com/questions/16265123/resize-svg-when-window-is-resized-in-d3-js/25978286#25978286
// https://chartio.com/resources/tutorials/how-to-resize-an-svg-when-the-window-is-resized-in-d3-js/
let viz = d3.select("#vizContainer1")
   .append("svg")
   // Container class to make it responsive.
   .attr("width", 0.65*w)
   .attr("height", 0.9*h)
   .style("background-color", "lavender")
;

let graphPadding = 20;
let graphW = 1000;
let graphH = 800;
let r = 5;
let simulation;

// let xScale = d3.scaleLinear().domain([0, 100]).range([0, graphW])
// let yScale = d3.scaleLinear().domain([0, 100]).range([0, graphH])


// filter out those datapoint.time_to_bed_workdays == refused/dont know

// transform string to time:
let timeParseFunction = d3.timeParse("%H:%M");
function mapFunction(datapoint) {
    datapoint.time_to_bed_workdays  = timeParseFunction(datapoint.time_to_bed_workdays);
    return datapoint
}
// first transform selection to string, then apply mapFunction:
function transformData(dataToTransform) {
		for (i=0; i<dataToTransform.length; i++) {
				dataToTransform[i].sleep_durations_workdays =(dataToTransform[i].sleep_durations_workdays + (Math.random()*1.0));
				// console.log('after', dataToTransform[i].sleep_durations_workdays);
				if (dataToTransform[i].time_to_bed_workdays == 1) {
					dataToTransform[i].time_to_bed_workdays = "0:00"
				} else if (dataToTransform[i].time_to_bed_workdays == 2){
					dataToTransform[i].time_to_bed_workdays = "0:" + (Math.floor(Math.random()*59)+1 + "")
				} else if (dataToTransform[i].time_to_bed_workdays == 3){
					dataToTransform[i].time_to_bed_workdays = "1:" + (Math.floor(Math.random()*60) + "")
				} else if (dataToTransform[i].time_to_bed_workdays == 4){
					dataToTransform[i].time_to_bed_workdays = (Math.floor(Math.random()*3+2) + "") + ":" + (Math.floor(Math.random()*60) + "")
				} else if (dataToTransform[i].time_to_bed_workdays == 5){
					dataToTransform[i].time_to_bed_workdays = (Math.floor(Math.random()*4+5) + "") + ":" + (Math.floor(Math.random()*60) + "")
				} else if (dataToTransform[i].time_to_bed_workdays == 6){
					dataToTransform[i].time_to_bed_workdays = (Math.floor(Math.random()*3+9) + "") + ":" + (Math.floor(Math.random()*60) + "")
				} else if (dataToTransform[i].time_to_bed_workdays == 7){
					dataToTransform[i].time_to_bed_workdays = (Math.floor(Math.random()*7+12) + "") + ":" + (Math.floor(Math.random()*60) + "")
				} else if (dataToTransform[i].time_to_bed_workdays == 8){
					dataToTransform[i].time_to_bed_workdays = "19:" + (Math.floor(Math.random()*60) + "")
				} else if (dataToTransform[i].time_to_bed_workdays == 9){
					dataToTransform[i].time_to_bed_workdays = "20:" + (Math.floor(Math.random()*60) + "")
				} else if (dataToTransform[i].time_to_bed_workdays == 10){
					dataToTransform[i].time_to_bed_workdays = "21:" + (Math.floor(Math.random()*15) + "")
				} else if (dataToTransform[i].time_to_bed_workdays == 11){
					dataToTransform[i].time_to_bed_workdays = "21:" + (Math.floor(Math.random()*15 + 15) + "")
				} else if (dataToTransform[i].time_to_bed_workdays == 12){
					dataToTransform[i].time_to_bed_workdays = "21:" + (Math.floor(Math.random()*15 + 30) + "")
				} else if (dataToTransform[i].time_to_bed_workdays == 13){
					dataToTransform[i].time_to_bed_workdays = "21:" + (Math.floor(Math.random()*15 + 45) + "")
				} else if (dataToTransform[i].time_to_bed_workdays == 14){
					dataToTransform[i].time_to_bed_workdays = "22:" + (Math.floor(Math.random()*15) + "")
				} else if (dataToTransform[i].time_to_bed_workdays == 15){
					dataToTransform[i].time_to_bed_workdays = "22:" + (Math.floor(Math.random()*15 + 15) + "")
				} else if (dataToTransform[i].time_to_bed_workdays == 16){
					dataToTransform[i].time_to_bed_workdays = "22:" + (Math.floor(Math.random()*15 + 30) + "")
				} else if (dataToTransform[i].time_to_bed_workdays == 17){
					dataToTransform[i].time_to_bed_workdays = "22:" + (Math.floor(Math.random()*15 + 45) + "")
				} else if (dataToTransform[i].time_to_bed_workdays == 18){
					dataToTransform[i].time_to_bed_workdays = "23:" + (Math.floor(Math.random()*15) + "")
				} else if (dataToTransform[i].time_to_bed_workdays == 19){
					dataToTransform[i].time_to_bed_workdays = "23:" + (Math.floor(Math.random()*15 + 15) + "")
				} else if (dataToTransform[i].time_to_bed_workdays == 20){
					dataToTransform[i].time_to_bed_workdays = "23:" + (Math.floor(Math.random()*15 + 30) + "")
				} else if (dataToTransform[i].time_to_bed_workdays == 21){
					dataToTransform[i].time_to_bed_workdays = "23:" + (Math.floor(Math.random()*15 + 45) + "")
				} else {
					dataToTransform[i].time_to_bed_workdays = String(dataToTransform[i].time_to_bed_workdays)
				}
		}
		// if (dataToTransform.time_to_bed_workdays != "98" ||dataToTransform.time_to_bed_workdays != "99") {
		let timeCorrected = dataToTransform.map(mapFunction);
		return timeCorrected
		// } else {
		// 	return dataToTransform
		// }
}


//main
function gotData(incomingData) {
		function filterFunctionWithoutTimeToBed(datapoint) {
			// console.log(typeof(datapoint));
			// console.log('??why undefined',datapoint.time_to_bed_workdays===99,datapoint[0]);
			if (datapoint.time_to_bed_workdays != 98 || datapoint.time_to_bed_workdays != 99) {
				return true;
			} else {
				return false;
			}
		}
		let filteredTimeToBedData = incomingData.filter(filterFunctionWithoutTimeToBed); // filteredTimeToBedData: filter out those datapoint.time_to_bed_workdays == refused/dont know
		let transformedData = transformData(filteredTimeToBedData); // transformedData: datapoint.time_to_bed_workdays in time format for js

		console.log('haha',incomingData.length);
		console.log('why still 1000',filteredTimeToBedData.length);
	  console.log('check',transformedData);

		let graphGroup = viz.append('g')
			.attr('class', 'graphGroup')
			.attr("transform", ()=>{
	    let x = 0;
	    let y = 0;
	    return "translate("+x+","+y+")"
  	})

		let vizGroup = graphGroup.append('g').attr('class', 'vizGroup');
		vizGroup.append('rect')
			  .attr("x", 0)
			  .attr("y", 0)
			  .attr("width", graphW)
			  .attr("height", graphH)
			  .attr("fill", "white")
		;
		vizGroup.attr("transform", ()=>{
		    let x = (0.65*w-graphW)/2;
		    let y = (0.9*h-graphH)/2;
		    return "translate("+x+","+y+")"
	  		})
		;



		//
		// let vizGroup = viz.append("g")
		// 	.attr("class","vizGroup");
		// function filterFunctionWithoutTimeToBed(datapoint) {
		// 	// console.log(typeof(datapoint));
		// 	// console.log('??why undefined',datapoint.time_to_bed_workdays===99,datapoint[0]);
		// 	if (datapoint.time_to_bed_workdays != 98 || datapoint.time_to_bed_workdays != 99) {
		// 		return true;
		// 	} else {
		// 		// console.log('yes');
		// 		return false;
		// 	}
		// }
		// let filteredSleepDurationsData = incomingData.filter(filterFunctionWithoutTimeToBed);
		function getTimeToBedWorkdays(datapoint) {
	    return datapoint.time_to_bed_workdays;
	  }
	  let earliestTime = d3.min(transformedData, getTimeToBedWorkdays);
	  let latestTime = d3.max(transformedData, getTimeToBedWorkdays);
	  let xDomain = d3.extent(transformedData, getTimeToBedWorkdays);
		let timeScale = d3.scaleTime().domain(xDomain).range([0, graphW-graphPadding*4])

		let xAxisGroup = vizGroup.append('g').attr('class', 'xAxisGroup');
		let xAxis = d3.axisBottom(timeScale).ticks(12);
		xAxisGroup.call(xAxis)
			.attr("color", "purple")
			.attr("font-family", "Stick")
			.attr("font-size", "15px")
			.attr("stroke-width", "3px")
		;
		xAxisGroup.attr("transform", ()=>{
				let x = graphPadding*2
				let y = graphH-graphPadding*2
				return "translate("+x+", "+y+")"
			})
		;

		function getSleepDurationsWorkdays(datapoint) {
        return datapoint.sleep_durations_workdays;
    }
    let minSleepDurationsWorkdays = d3.min(transformedData, getSleepDurationsWorkdays);
    let maxSleepDurationsWorkdays = d3.max(transformedData, getSleepDurationsWorkdays);
    let meanSleepDurationsWorkdays = d3.mean(transformedData, getSleepDurationsWorkdays);
    let yPadding = 50;
    console.log(minSleepDurationsWorkdays,maxSleepDurationsWorkdays)
    let heightScale = d3.scaleLinear()
      .domain([24,10,minSleepDurationsWorkdays])
      .range([graphPadding,graphH/3,graphH-graphPadding*3])

		let yAxisGroup = vizGroup.append("g").attr("class", "yaxis");
    let yAxis = d3.axisLeft(heightScale);
    yAxisGroup.call(yAxis)
      .attr("transform", "translate(" + graphW/2 + ","+graphPadding+")")
      .attr("color", 'purple')
      .attr("font-family", "Stick")
      .attr("font-size", "13px")
      .attr("stroke-width", "3px")
    ;

		///
		let elementGroup = vizGroup.append('g').attr('class', 'elementGroup');

		function updateViz(){
		  let elements = elementGroup.selectAll(".datapoint").data(transformedData);

		  let enteringElements = elements.enter();
		  let exitingElements = elements.exit();

			// console.log('checkcheckcheck',transformedData[1].sleep_durations_workdays);
		  let datagroups = enteringElements.append("g")
		    .attr("class", "datagroup")
		    .attr("transform", (d, i)=>{
		      let x = graphPadding*2;
		      return "translate("+x+",0)"
		    })

		  datagroups.append("circle")
		    .attr("cx", (d,i)=>{
					return timeScale(d.time_to_bed_workdays)
				})
		    .attr("cy", (d,i)=>{
					return heightScale(d.sleep_durations_workdays)
				})
		    .attr("r", (d,i)=>{
					return Math.random()*8.0
				})
				.attr('class', 'circles')
		    // .attr("fill", 'darkgrey')
				.attr('fill', 'grey')
				// .attr('transform', (d,i)=>{
				// 	let x = timeScale(d.time_to_bed_workdays);
				// 	let y = heightScale(d.sleep_durations_workdays);
				// 	return "translate("+x+", "+y+")"
				// })
		  ;

			transformedData = transformedData.map(function(datapoint){
    			datapoint.x = timeScale(datapoint.time_to_bed_workdays);
					datapoint.y = heightScale(datapoint.sleep_durations_workdays);
    			// datapoint.y = graphH/2;
    			return datapoint
  		});
		  simulation = d3.forceSimulation(transformedData)
		    // .force("forceX", d3.forceX(w/2))
		    .force("forceX", function(d,i){
		      return d3.forceX(  timeScale(d.time_to_bed_workdays)  )
		    })
		    // .force("forceY", d3.forceY(h/2))
		    .force("forceY", function(d,i){
					return d3.forceY(  heightScale(d.sleep_durations_workdays)  )
				})
		    // .force("collide", d3.forceCollide())
		    .force("collide", d3.forceCollide().radius(  function(d,i){
		      return 3
		    }))
		    .on("tick", simulationRan)
		  ;

		  function simulationRan(){
		    // console.log(incomingData[0].x);
		    // viz.selectAll(".datapoint")
				datagroups.selectAll('.circles')
          .transition()
          .duration(100)
		      .attr("cx", function(d){
		        return d.x;
		      })
		      .attr("cy", function(d){
		        return d.y;
		      })
		  }

	}

	updateViz();
	enterView({
			selector: '.scrollingContent #page3',

			enter: function(el) {
				transformedData = transformedData.map(function(datapoint){
					if (datapoint.activityLevel == 1){
						datapoint.x = graphW/4;
						datapoint.y = graphH/4;
					} else if (datapoint.activityLevel == 2) {
						datapoint.x = graphW*3/4;
						datapoint.y = graphH/4;
					} else if (datapoint.activityLevel == 3) {
						datapoint.x = graphW/4;
						datapoint.y = graphH*3/4;
					} else if (datapoint.activityLevel == 4) {
						datapoint.x = graphW*3/4;
						datapoint.y = graphH*3/4;
					}
						return datapoint
				});
				simulation = d3.forceSimulation(transformedData)
					.force("forceX", function(d,i){
							if (d.activityLevel == 1 || d.activityLevel == 3){
								return d3.forceX(graphW/4)
							} else if (d.activityLevel == 2||d.activityLevel == 4){
								return d3.forceX(graphW*3/4)
							} else {
								return d3.forceX(0)
							}
						})
					.force("forceY", function(d,i){
							if (d.activityLevel == 1 || d.activityLevel == 3){
								return d3.forceY(graphH/4)
							} else if (d.activityLevel == 2 || d.activityLevel == 4){
								return d3.forceY(graphH*3/4)
							} else {
								return d3.forceY(0)
							}
					})
        elementGroup.selectAll(".datagroup")
          .transition()
          .duration(1000)
			},

			exit: function(el) {
				transformedData = transformedData.map(function(datapoint){
						datapoint.x = timeScale(datapoint.time_to_bed_workdays);
						datapoint.y = heightScale(datapoint.sleep_durations_workdays);
						// datapoint.y = graphH/2;
						return datapoint
				});
				simulation = d3.forceSimulation(transformedData)
					.force("forceX", function(d,i){
						return d3.forceX(  timeScale(d.time_to_bed_workdays)  )
					})
					.force("forceY", function(d,i){
						return d3.forceY(  heightScale(d.sleep_durations_workdays)  )
					})
					.force("collide", d3.forceCollide().radius(  function(d,i){
						return 3
					}))
        elementGroup.selectAll(".datagroup")
          .transition()
          .duration(1000)
			},

			progress: function(el, progress) {
				console.log("the special element's progress is:", progress);
			},

			offset: 0.3, // enter at middle of viewport
			// once: true, // trigger just once
	});




}











d3.json("data0.json").then(gotData);
