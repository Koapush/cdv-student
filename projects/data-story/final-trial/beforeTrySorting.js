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
let graphW = 1000*0.95;
let graphH = 800*0.95;
let r = 5;
let colorByAgeSwitch = false;
let circle;

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

let numCol = 40,
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
   // .style("background-color", "grey")
;




///////////////////////////////////////////////////////////////////////////////////////////main
function gotData(incomingData) {
    ///////////////////////////////////////////////////////////////////////////////////////////viz1

    //////////////////////////////////// clean data
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

    //////////////////////////////////// Graph 1:

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
			  .attr("fill", "#202227")
		;
		vizGroup.attr("transform", ()=>{
		    let x = (0.65*w-graphW)/2;
		    let y = (0.9*h-graphH)/2;
		    return "translate("+x+","+y+")"
	  		})
		;
    // let exercise
    // var textArray = ["Vigorous Exercisers","Moderate Exercisers","Light Exercisers","Non-Exercisers"];
    // function getExerciseText(d,i){
    //   return textArray[i]
    // }
    // var exerciseText = vizGroup.append("text")
    //       .attr('fill', 'black')
    //       .attr("font-size", "20px")
    //       .attr("transform", (d,i)=>{
    //         if (i == 0) {
    //           x = graphW/8
    //           y = graphH/8
    //         } else if (i == 1) {
    //           x = graphW*3/8
    //           y = graphH/8
    //         } else if (i == 2) {
    //           x = graphW/8
    //           y = graphH*3/8
    //         } else {
    //           x = graphW*3/8
    //           y = graphH*3/8
    //         }
    //       })
    // }
    var exerciseText1 = vizGroup.append("text")
      .text("↑ Vigorous Exercisers")
      .attr('class', 'exerciseText')
      .attr("transform", "translate("+(graphW/2-180)+","+(graphH/2-20)+")")
      .attr('fill', '#e1bc91')
      .attr('visibility', 'hidden')
      .attr('font-family', 'Oswald')
      .attr("font-size", "20px");
    var exerciseText2 = vizGroup.append("text")
      .text("Moderate Exercisers ↑")
      .attr('class', 'exerciseText')
      .attr("transform", "translate("+(graphW/2+80)+","+(graphH/2-20)+")")
      .attr('fill', '#e1bc91')
      .attr('visibility', 'hidden')
      .attr('font-family', 'Oswald')
      .attr("font-size", "20px");
    var exerciseText3 = vizGroup.append("text")
      .text("↓ Light Exercisers")
      .attr('class', 'exerciseText')
      .attr("transform", "translate("+(graphW/2-145)+","+(graphH/2+20)+")")
      .attr('fill', '#e1bc91')
      .attr('visibility', 'hidden')
      .attr('font-family', 'Oswald')
      .attr("font-size", "20px");
    var exerciseText4 = vizGroup.append("text")
      .text("Non-Exercisers ↓")
      .attr('class', 'exerciseText')
      .attr("transform", "translate("+(graphW/2+80)+","+(graphH/2+20)+")")
      .attr('fill', '#e1bc91')
      .attr('visibility', 'hidden')
      .attr('font-family', 'Oswald')
      .attr("font-size", "20px");


    // build scales
    // scales for "about sleep" x, y
    // scales for "about exercise" x, y


    // build axis
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
		xAxisGroup.attr("color", "#e1bc91")
			.attr("font-family", "Oswald")
			.attr("font-size", "15px")
			.attr("stroke-width", "3px")
      .attr('visibility', 'hidden')
		  .attr("transform", ()=>{
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
    yAxisGroup.attr("color", '#e1bc91')
      .attr("font-family", "Oswald")
      .attr("font-size", "13px")
      .attr("stroke-width", "3px")
      .attr('visibility', 'hidden')
      .attr("transform", "translate(" + graphW/2 + ","+graphPadding+")")
    ;

// ！！！    // draw points: without updateViz1() function
    let elementGroup = vizGroup.append('g')
      .attr('class', 'elementGroup')
      .attr("transform", (d, i)=>{
        let x = graphPadding*2;
        return "translate("+x+",0)"
      });

    let elements = elementGroup.selectAll(".datapoint").data(transformedData);

    let enteringElements = elements.enter();
    let exitingElements = elements.exit();

    let datagroups = enteringElements.append("g")
      .attr("class", "datagroup")

    transformedData = transformedData.map(function(node, index){
      node.x = timeScale(node.time_to_bed_workdays);
      node.y = heightScale(node.sleep_durations_workdays);
      return node
    });
    let activityScale = d3.scaleLinear()
      .domain([24,8,minSleepDurationsWorkdays])
      .range([graphPadding,graphH/3,graphH-graphPadding*3])
    // run simulation 1 "About sleep"
    let force = d3.forceSimulation(transformedData)
      .force("forceX", d3.forceX(  d => timeScale(d.time_to_bed_workdays)  ))
      .force("forceY", d3.forceY(  d => heightScale(d.sleep_durations_workdays)  ))
      // .force("collide", d3.forceCollide().radius(3))
      .force('collide', d3.forceCollide(d => 5))
      .tick(200)
    // on("end"):
      .on("end", function(){
        vizGroup.selectAll(".exerciseText").attr('visibility', 'hidden');
        // save x & y into a new key of each nod
        transformedData.forEach(node=>{
          if (node.activityLevel == 1){
              node.activityX = graphW/4;
              node.activityY = graphH/4;
          } else if (node.activityLevel == 2) {
              node.activityX = graphW*3/4;
              node.activityY = graphH/4;
          } else if (node.activityLevel == 3) {
              node.activityX = graphW/4;
              node.activityY = graphH*3/4;
          } else{
              node.activityX = graphW*3/4;
              node.activityY = graphH*3/4;
          };
          node.sleepX = node.x;
          node.sleepY = node.y;
          node.x = node.activityX;
          node.y = node.activityY;
        });
        // scroll page down
        scrollDown();
        // show points
        initSleepGraph();
        // activate first scroll trigger (enterview..... not re-simiulate, but jsut put point to scleepX, sleepY)
        enterView({
          selector: '.scrollingContent #page2',
          enter: function(el){
            showSleepGraph()
            xAxisGroup.attr('visibility', '')
            yAxisGroup.attr('visibility', '')
            vizGroup.selectAll(".exerciseText").attr('visibility', 'hidden');
            // exerciseText.attr('visibility', 'hidden');
          },
          exit: function(el){
            elementGroup.selectAll(".datagroup")
              .transition()
              .duration(300)
              .attr("transform", function(d){
                d.currentx = d.sleepX;
                // d.currenty = d.sleepY;
                return "translate("+d.sleepX+","+(-h)+")"
              })
            xAxisGroup.attr('visibility', 'hidden')
            yAxisGroup.attr('visibility', 'hidden')
            vizGroup.selectAll(".exerciseText").attr('visibility', 'hidden');
            // exerciseText.attr('visibility', 'hidden');
            // showExerciseGraph()
          },
          progress: function(el, progress) {
    				// console.log("the special element's progress is:", progress);
    			},
    			offset: 0.7,
        });
        // 画轴
        // xAxisGroup.call(xAxis);
        // yAxisGroup.call(yAxis);

        // trigger next caluclation
        clustering()
      })
    ;


    // run simiulation 2 "about Exercise"
    // on("end"):
    // save x & y into a new key of each node:
    // activete sccrolling (allowed to scroll)
    // activate scroll tirgger
    function clustering(){
      force = d3.forceSimulation(transformedData)
        .force("forceX", function(d,i){
          if (d.activityLevel == 1 || d.activityLevel == 3){
            return d3.forceX(graphW/4);
          } else if (d.activityLevel == 2 || d.activityLevel == 4) {
            return d3.forceX(graphW*3/4);
          }
        })
        // .force("forceY", d3.forceY(0))
        .force("forceY", function(d,i){
          if (d.activityLevel == 1 || d.activityLevel == 2){
            return d3.forceY(graphH/4);
          } else if (d.activityLevel == 3 || d.activityLevel == 4) {
            return d3.forceY(graphH*3/4);
          }
        })
        // .force('collide', d3.forceCollide(d => radius*1.5))
        .force('collide', d3.forceCollide(d => 5))
        .tick(800)
        .on("end", function(){
          // console.log("hallo");
          // save x & y into a new key of each nod
          transformedData.forEach(node=>{
            node.endingX = node.x;
            node.endingY = node.y;
          });
          enterView({
            selector: '.scrollingContent #page3',
            enter: function(el){
              showExerciseGraph();
              xAxisGroup.attr('visibility', 'hidden')
              yAxisGroup.attr('visibility', 'hidden')
              vizGroup.selectAll(".exerciseText").attr('visibility', 'visible');
              // exerciseText.attr('visibility', 'visible');
            },
            exit: function(el){
              showSleepGraph();
              xAxisGroup.attr('visibility', '')
              yAxisGroup.attr('visibility', '')
              vizGroup.selectAll(".exerciseText").attr('visibility', 'hidden');
              // exerciseText.attr('visibility', 'hidden');
            },
            progress: function(el, progress) {
      				// console.log("the special element's progress is:", progress);
      			},
      			offset: 0.5,
          })
        })

    }

    function scrollDown(){
      window.scrollTo({
          top: h,
          behavior: "smooth"
      });
    };
    function initSleepGraph(){
      // exerciseText.attr('visibility', 'visible');
      circle = datagroups.append("circle")
        .transition()
        .duration(500)
        .attr("r", (d,i)=>{
          if (d.employment_status == 'special') {
            return 20
          } else {
            // return Math.random()*8.0
            return 3
          }
        })
        .attr('class', 'sleepCircle')
        .attr('fill', (d,i)=>{
          if (d.employment_status == 'special') {
              return 'red'
            } else {
              return "grey"

          }

        })
      ;
    }
    function getRadius(d,i) {
      if (d.employment_status == "special"){
        return 10
      } else {
        return 3
      }
    }
    function showSleepGraph(){
      elementGroup.selectAll(".datagroup")
        .transition()
        .duration(500)
        .attr("transform", function(d){
          d.currentx = d.sleepX;
          d.currenty = d.sleepY;
          return "translate("+d.sleepX+","+d.sleepY+")"
        });
      d3.selectAll(".sleepCircle")
      .transition(500)
      .attr("r", getRadius);
    };
    function showExerciseGraph(){
      elementGroup.selectAll(".datagroup")
        .transition()
        .duration(500)
        .attr("transform", function(d){
          d.currentx = d.endingX;
          d.currenty = d.endingY;
          // console.log(d.x === d.currentx, d.currentx === d.activityX);
          return "translate("+d.endingX+","+d.endingY+")"
        });
      d3.selectAll(".sleepCircle")
        .transition(500)
        .attr("r", getRadius);


    };
    function fillColor(d) {
      if (d.activityLevel == 1){
        return "brown"
      } else if (d.activityLevel == 2){
        return "red"
      } else if (d.activityLevel == 3){
        return "orange"
      } else if (d.activityLevel == 4){
        return "yellow"
      } else {
        if (interactiveMode) {
          return "red"
        } else {
          return "purple"

        }
      }
    }
    showAgeGroup = function (d){
      d3.selectAll(".sleepCircle")
      .transition(500)
      .duration(200)
      .style("fill", (d,i)=>{
        if (d.age >= 23 && d.age <=29 || d.age == 2329){
          return "#ffe5b9"
        } else if (d.age >= 30 && d.age <=39 || d.age == 3039){
          return "#ffd56b"
        } else if (d.age >= 40 && d.age <=49 || d.age == 4049){
          return "#ecb390"
        } else if (d.age >= 50 && d.age <=60 || d.age == 5060){
          return "#cc7351"
        } else {
          return "black"
        }
      })
    };
    showSleepCondition = function (d){
      d3.selectAll(".sleepCircle")
        .transition(1000)
        .duration(200)
      //   .attr("opacity", (d,i)=>{
      //     if (d.rateYourOverallSleepQuality == 1) { //very good
      //       return 0.2
      //     } else if (d.rateYourOverallSleepQuality == 2) { //fairly good
      //       return 0.5
      //     } else if (d.rateYourOverallSleepQuality == 3) { //fairly bad
      //       return 1
      //     } else if (d.rateYourOverallSleepQuality == 4) { //very bad
      //       return 1
      //     }
      // })
        .attr("r", (d,i)=>{
          if (d.rateYourOverallSleepQuality == 1) { //very good
            return 1
          } else if (d.rateYourOverallSleepQuality == 2) { //fairly good
            return 2
          } else if (d.rateYourOverallSleepQuality == 3) { //fairly bad
            return 6
          } else if (d.rateYourOverallSleepQuality == 4) { //very bad
            return 10
          }
      })
    };
    reset = function(){
      d3.selectAll(".sleepCircle")
        .transition(1000)
        .duration(200)
        .attr("r", getRadius)
        .style("fill", (d,i)=>{
          if (d.employment_status == 'special') {
              return 'red'
            } else {
              return "grey"

          }

        })
    }
    // showExpectedSleepDuration = function (d){
    //   force = d3.forceSimulation(transformedData)
    //     .force("forceX", d3.forceX( d=>timeScale(d.time_to_bed_workdays) ))
    //     .force("forceY", d3.forceY( d=>heightScale(d.need_how_many_hours_sleep_workdays) ))
    //     .force("collide", d3.forceCollide(d=>5))
    //
    //   elementGroup.selectAll(".datagroup")
    //     .transition()
    //     .duration(300)
    //     .attr("transform", function(d){
    //       d.currentx = d.sleepX
    //       d.currenty = heightScale(d.need_how_many_hours_sleep_workdays)
    //       return "translate("+d.currentx+"," + d.currenty +")"
    //     })
    //   };




    //////////////////////////////////// Graph 2:
    // filter out special datapoint

    function drawViz2(datapoints){
      console.log("datapoints", datapoints)
      function assignKeys(d,i){
        return i
      }
      // let gridDataGroups = viz2.selectAll('.gridDatapoint').data(datapoints, assignKeys).enter()
      let gridDataGroups = viz2.selectAll('.gridDatapoint').data(datapoints, assignKeys).enter()
        .append("g")
        .attr("class", "gridDatapoint")
      ;
      let gridCircles = gridDataGroups.append("circle")
        .attr('cx', padw/2)
        .attr('cy', padh/2)
        .attr('r', 5)
        .attr('fill', fillColor)
        .attr('class', 'gridcircle')
        .transition()
        .delay(500)
      ;
      gridDataGroups.attr("transform", (d, i)=>{
        let x = i % numCol * padw + pad;
        let y = Math.floor(i/numCol) * padh + pad;
        return "translate("+x+","+y+")"
      })
    };

    drawViz2updateActivityLevel = function(){
      let sortedData = transformedData;
      sortedData.sort(sortByProperty('activityLevel'))
      let gridDataGroups = viz2.selectAll('.gridDatapoint').data(sortedData, assignKeys);
      // gridDataGroups.attr('transform', 'translate('+graph2W/2+','+graph2H/2+')')(d,i)=>{
      gridDataGroups.transition().duration(500).attr("transform", (d,i)=>{
        let x = i % numCol * padw + pad;
        let y = Math.floor(i/numCol) * padh + pad;
        return "translate("+x+","+y+")"
      });
    }



// ？？？？？？？？// why color doesnt change
    sortActivity = function(d){
      let sortedData = transformedData;
      console.log('DS CHECK', sortedData[0].age, transformedData[0].age)

      sortedData.sort(sortByProperty('activityLevel'))
      console.log('DS CHECK', sortedData[0].age, transformedData[0].age)

      gridDataGroups = viz2.selectAll('.gridDatapoint').data(sortedData)
        // .attr("transform", (d,i)=>{
        //   let x = i % numCol * padw + pad;
        //   let y = Math.floor(i/numCol) * padh + pad;
        //   return "translate("+x+","+y+")"
        // });
      gridDataGroups.selectAll(".gridcircle").attr('fill', fillColor);
      gridDataGroups.transition().duration(500).attr("transform", (d,i)=>{
        let x = i % numCol * padw + pad;
        let y = Math.floor(i/numCol) * padh + pad;
        return "translate("+x+","+y+")"
      });

    }

    // document.getElementById("sort").addEventListener('click', sortActivity);




    enterView({
      selector: '.scrollingContent #page4',
      enter: function(el){
        drawViz2(transformedData);
      },
      exit: function(el){

      },
      progress: function(el, progress) {
        // console.log("the special element's progress is:", progress);
      },
      offset: 0.4,
    })


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

function sortByProperty(property){
  console.log('sorted');
  return function(a, b){
    if (a[property] > b[property]) {
        return 1
      } else if (a[property] < b[property]) {
        return -1
      } else {
        return 0;
      }
  }
}


document.getElementById("browsingMode").addEventListener("click", function(){
  browsingMode = true;
  interactiveMode = false;
  // window.scrollTo({
  //     top: h,
  //     behavior: "smooth"
  // });
  d3.json("data0.json").then(gotData);
});


document.getElementById("interactiveMode").addEventListener("click", function(){
  interactiveMode = true;
  browsingMode = false;
	// window.scrollTo({
  //     top: h,
  //     behavior: "smooth"
  // });
  // generate a point
  // console.log(inputAge,inputTime,inputDuration,typeof(inputTime));
  // special.attr('visibility', 'visible')
  d3.json("data0.json").then(gotData);

});




// d3.json("data0.json").then(gotData);
