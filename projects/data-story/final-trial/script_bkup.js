let w = window.innerWidth;
let h = window.innerHeight;
console.log("hiiiiihiiiiihiiiii");
let browsingMode;
let interactiveMode;



///////////////////////////////////////////////////////////////////////////////////////////below for viz1
///////////////////////////////////////////////////////////////////////////////////////////
// https://stackoverflow.com/questions/16265123/resize-svg-when-window-is-resized-in-d3-js/25978286#25978286
// https://chartio.com/resources/tutorials/how-to-resize-an-svg-when-the-window-is-resized-in-d3-js/
let viz1 = d3.select("#vizContainer1")
   .append("svg")
   // Container class to make it responsive.
   .attr("width", 0.65*w)
   .attr("height", 0.9*h)
   // .style("background-color", "lavender")
   .attr("transform", "translate(0,"+0+")")
;

// let yourself = viz1.append('circle')
//   .attr('cx', w/2)
//   .attr('cy', h/2)
//   .attr('r', 20)
//   // .attr('visibility', 'hidden')
// ;

let graphPadding = 20;
let graphW = 1000;
let graphH = 800;
let r = 5;
let simulation;

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


///////////////////////////////////////////////////////////////////////////////////////////below for viz2

let numCol = 32,
    numRow = 25,
    pad = 15;
let graph2W = graphW*0.9,
		graph2H = graphH*0.9;
let padw = (graph2W-pad*2)/numCol,
    padh = (graph2H-pad*2)/numRow;
let clusternameObject = [
	{'mode':'vigorous'},
	{'mode':'moderate'},
	{'mode':'light'},
	{'mode':'none'}
];
let viz2 = d3.select("#vizContainer2")
   .append("svg")
   // Container class to make it responsive.
   .attr("width", graph2W)
   .attr("height", graph2H)
   .style("background-color", "lightblue")
;




///////////////////////////////////////////////////////////////////////////////////////////main
function gotData(incomingData) {
    ///////////////////////////////////////////////////////////////////////////////////////////viz1
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

    if (interactiveMode) {
      var inputAge = document.getElementById('age').value;
      var numAge = processAge(inputAge);
      var inputTime = document.getElementById('time').value;
      var timeTime = processTime(inputTime);
			console.log('there',timeTime)
      var inputDuration = document.getElementById('duration').value;
      var numDuration = processDuration(inputDuration);
			var inputActivity = document.getElementById('activity').value;
			var activityLevel = processActivity(inputActivity);
			console.log('CHECK HERE',activityLevel)
      transformedData[transformedData.length] = {
        "employment_status": "special",
        "age": numAge,
        "activityLevel": activityLevel,
        "time_to_bed_workdays": timeTime,
        "sleep_durations_workdays": numDuration
      };
    }

		console.log('haha',incomingData.length);
		console.log('why still 1000',filteredTimeToBedData.length);
	  console.log('check',transformedData);

		let graphGroup = viz1.append('g')
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
      .attr('visibility', 'hidden')
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
      .domain([24,8,minSleepDurationsWorkdays])
      .range([graphPadding,graphH/3,graphH-graphPadding*3])

		let yAxisGroup = vizGroup.append("g").attr("class", "yaxis");
    let yAxis = d3.axisLeft(heightScale);
    yAxisGroup.call(yAxis)
      .attr("color", 'purple')
      .attr("font-family", "Stick")
      .attr("font-size", "13px")
      .attr("stroke-width", "3px")
      .attr('visibility', 'hidden')
      .attr("transform", "translate(" + graphW/2 + ","+graphPadding+")")
    ;

		///
		let elementGroup = vizGroup.append('g').attr('class', 'elementGroup')
    .attr("transform", (d, i)=>{
      let x = graphPadding*2;
      return "translate("+x+",0)"
    });

		function updateViz1(){
		  let elements = elementGroup.selectAll(".datapoint").data(transformedData);

		  let enteringElements = elements.enter();

		  let exitingElements = elements.exit();

			// console.log('checkcheckcheck',transformedData[1].sleep_durations_workdays);
		  let datagroups = enteringElements.append("g")
		    .attr("class", "datagroup")
		    // .attr("transform", (d, i)=>{
		    //   let x = graphPadding*2;
		    //   return "translate("+x+",0)"
		    // })


		  datagroups.append("circle")
		    .attr("cx", (d,i)=>{
					return timeScale(d.time_to_bed_workdays)
				})
		    .attr("cy", (d,i)=>{
					return 0
				})
		    .attr("r", (d,i)=>{
					if (d.employment_status == 'special') {
            return 20
          } else {
            return Math.random()*8.0
          }
					// return Math.random()*8.0
				})
				.attr('class', 'circles')
		    // .attr("fill", 'darkgrey')
				.attr('fill', (d,i)=>{
          if (d.employment_status == 'special') {
            return 'red'
          } else {
            return 'grey'
          }
        })
        .transition()
        // .delay(150)
				// .attr('transform', (d,i)=>{
				// 	let x = timeScale(d.time_to_bed_workdays);
				// 	let y = heightScale(d.sleep_durations_workdays);
				// 	return "translate("+x+", "+y+")"
				// })
		  ;
			// function showText(){
			// 	for (i=0; i<clusternameArray.length; i++){
			// 		let clusternames = datagroups.append('text')
			// 			.attr('class', 'clustername')
			// 			.text(clusternameArray[i])
			// 			.attr('x', function(){
			// 				if (i==1 || i==3){
			// 					return graphW/4
			// 				} else {
			// 					return graphW*3/4
			// 				}
			// 			})
			// 			.attr('y', function(){
			// 				if (i==1 || i==3){
			// 					return graphW/8
			// 				} else {
			// 					return graphW*5/8
			// 				}
			// 			})
			// 			.attr("fill", 'yellow')
			// 			.style("font-family", "Cabin Sketch")
			// 			.style("font-size", 40)
			// 	}
			// }


			transformedData = transformedData.map(function(datapoint){
    			datapoint.x = timeScale(datapoint.time_to_bed_workdays);
					datapoint.y = -h;
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
					return d3.forceY( 0  )
				})
		    // .force("collide", d3.forceCollide())
		    .force("collide", d3.forceCollide().radius(0))
		    .on("tick", simulationRan)
		  ;

		  function simulationRan(){
		    // console.log(incomingData[0].x);
		    // viz1.selectAll(".datapoint")
				datagroups.selectAll('.circles')
          // .transition()
          // .delay(150)
		      .attr("cx", function(d){
		        return d.x;
		      })
		      .attr("cy", function(d){
		        return d.y;
		      })
		  }

	}

	updateViz1();

  enterView({  ///////////////////////////// front page --> about sleep
			selector: '.scrollingContent #page2',

			enter: function(el) {
        xAxisGroup.attr('visibility', '');
        yAxisGroup.attr('visibility', '');
        transformedData = transformedData.map(function(datapoint){
    			datapoint.x = timeScale(datapoint.time_to_bed_workdays);
					datapoint.y = heightScale(datapoint.sleep_durations_workdays);
    			// datapoint.y = graphH/2;
    			return datapoint
  		});
        simulation = d3.forceSimulation(transformedData)
          .force("forceY", function(d,i){
              return d3.forceY(  heightScale(d.sleep_durations_workdays)  )
          })
					.force("collide", d3.forceCollide().radius(  function(d,i){
						return 2
					}));
      },

			exit: function(el) {
        xAxisGroup.attr('visibility', 'hidden');
        yAxisGroup.attr('visibility', 'hidden');
        transformedData = transformedData.map(function(datapoint){
      			datapoint.x = timeScale(datapoint.time_to_bed_workdays);
  					datapoint.y = -h;
      			// datapoint.y = graphH/2;
      			return datapoint
    		});
				simulation = d3.forceSimulation(transformedData)
					.force("forceY", function(d,i){
						return d3.forceY(  heightScale(d.sleep_durations_workdays)  )
					})
					.force("collide", d3.forceCollide().radius(0));
			},

			progress: function(el, progress) {
				// console.log("the special element's progress is:", progress);
			},

			offset: 0.5, // enter at middle of viewport
			// once: true, // trigger just once
	});

	enterView({  ///////////////////////////// about sleep --> about exercise
			selector: '.scrollingContent #page3',

			enter: function(el) {
        xAxisGroup.attr('visibility', 'hidden');
        yAxisGroup.attr('visibility', 'hidden');
				// showText();

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
          .delay(300)
			},

			exit: function(el) {
        xAxisGroup.attr('visibility', '');
        yAxisGroup.attr('visibility', '');
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
          .delay(300)
			},

			progress: function(el, progress) {
				// console.log("the special element's progress is:", progress);
			},

			offset: 0.5, // enter at middle of viewport
			// once: true, // trigger just once
	});





  ///////////////////////////////////////////////////////////////////////////////////////////viz2
  // var clusters = new Array(m);

  function drawViz2(datapoints){
    console.log("datapoints", datapoints)
    let gridDataGroups = viz2.selectAll('.gridDatapoint').data(datapoints).enter()
      .append("g")
      .attr("class", "gridDatapoint")
    ;
    gridDataGroups.append("circle")
      .attr('cx', padw/2)
      .attr('cy', padh/2)
      .attr('r', 5)
      .attr('fill', "black")
    ;
    gridDataGroups.attr("transform", (d, i)=>{
      let x = i%40 * 15;
      let y = Math.floor(i/40) * 15;
      return "translate("+x+","+y+")"
    })



    // function fillColor(d) {
    //   if (d.activityLevel == 1){
    //     return "darkred"
    //   } else if (d.activityLevel == 2){
    //     return "orange"
    //   } else if (d.activityLevel == 3){
    //     return "yellow"
    //   } else if (d.activityLevel == 4){
    //     return "lightyellow"
    //   } else {
    //     return "black"
    //   }
    // }
    //
    // let cols = viz2.selectAll('g').data(d3.range(numCol)).enter()
    //   .append('g')
    //   .attr('transform', (d,i)=>{
    //     return 'translate('+i*padw+ ','+ pad +')'
    //   });
    // let cells = cols.selectAll('g').data(d3.range(numRow)).enter()
    //   .append('g')
    //   .attr('transform', (d,i)=>{
    //     return 'translate('+pad+ ','+ i*padh +')'
    //   });
    // cells.append('circle')
    //   .attr('cx', padw/2)
    //   .attr('cy', padh/2)
    //   .attr('r', 5)
    //   .attr('fill', fillColor)


  }

  drawViz2(transformedData);



}



function processAge(string){
  let numAge = Number(string);
  return numAge
}
function mapFunction2(datapoint) {
    datapoint = timeParseFunction(datapoint);
    return datapoint
}
function processTime(string){
  let timeToTransform;
  if (string == 1) {
  	timeToTransform = "0:00"
  } else if (string == 2){
  	timeToTransform = "0:" + (Math.floor(Math.random()*59)+1 + "")
  } else if (string == 3){
  	timeToTransform = "1:" + (Math.floor(Math.random()*60) + "")
  } else if (string == 4){
  	timeToTransform = (Math.floor(Math.random()*3+2) + "") + ":" + (Math.floor(Math.random()*60) + "")
  } else if (string == 5){
  	timeToTransform = (Math.floor(Math.random()*4+5) + "") + ":" + (Math.floor(Math.random()*60) + "")
  } else if (string == 6){
  	timeToTransform = (Math.floor(Math.random()*3+9) + "") + ":" + (Math.floor(Math.random()*60) + "")
  } else if (string == 7){
  	timeToTransform = (Math.floor(Math.random()*7+12) + "") + ":" + (Math.floor(Math.random()*60) + "")
  } else if (string == 8){
  	timeToTransform = "19:" + (Math.floor(Math.random()*60) + "")
  } else if (string == 9){
  	timeToTransform = "20:" + (Math.floor(Math.random()*60) + "")
  } else if (string == 10){
  	timeToTransform = "21:" + (Math.floor(Math.random()*15) + "")
  } else if (string == 11){
  	timeToTransform = "21:" + (Math.floor(Math.random()*15 + 15) + "")
  } else if (string == 12){
  	timeToTransform = "21:" + (Math.floor(Math.random()*15 + 30) + "")
  } else if (string == 13){
  	timeToTransform = "21:" + (Math.floor(Math.random()*15 + 45) + "")
  } else if (string == 14){
  	timeToTransform = "22:" + (Math.floor(Math.random()*15) + "")
  } else if (string == 15){
  	timeToTransform = "22:" + (Math.floor(Math.random()*15 + 15) + "")
  } else if (string == 16){
  	timeToTransform = "22:" + (Math.floor(Math.random()*15 + 30) + "")
  } else if (string == 17){
  	timeToTransform = "22:" + (Math.floor(Math.random()*15 + 45) + "")
  } else if (string == 18){
  	timeToTransform = "23:" + (Math.floor(Math.random()*15) + "")
  } else if (string == 19){
  	timeToTransform = "23:" + (Math.floor(Math.random()*15 + 15) + "")
  } else if (string == 20){
  	timeToTransform = "23:" + (Math.floor(Math.random()*15 + 30) + "")
  } else if (string == 21){
  	timeToTransform = "23:" + (Math.floor(Math.random()*15 + 45) + "")
  }
  	let timeFormat = timeParseFunction(timeToTransform);
		return timeFormat
}
function processDuration(string){
  let numDuration = Number(string);
  return numDuration
}
function processActivity(string){
  let numActivity = Number(string);
  return numActivity
}


document.getElementById("browsingMode").addEventListener("click", function(){
  browsingMode = true;
  interactiveMode = false;
  window.scrollTo({
      top: h,
      behavior: "smooth"
  });
  d3.json("data0.json").then(gotData);
});


document.getElementById("interactiveMode").addEventListener("click", function(){
  interactiveMode = true;
  browsingMode = false;
	window.scrollTo({
      top: h,
      behavior: "smooth"
  });
  // generate a point
  // console.log(inputAge,inputTime,inputDuration,typeof(inputTime));
  // special.attr('visibility', 'visible')
  d3.json("data0.json").then(gotData);



});




// d3.json("data0.json").then(gotData);
