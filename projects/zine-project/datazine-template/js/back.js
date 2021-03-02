let viz = d3.select('#container')
    .append('svg')
      .attr('id', 'viz')
      .style('width', '100%')
      .style('height', '100%')
      .style('background', 'white')
;

let w = 900,
    h = 900,
    padding = 25;

function main() {
    console.log('ready');
   //  // COLOR FROM ONLINE TUTORIAL
   // //Append a defs (for definition) element to your SVG
   // var defs = viz.append("defs");
   // //Append a linearGradient element to the defs and give it a unique id
   // var linearGradient = defs.append("linearGradient")
   //     .attr("id", "linear-gradient");
   // //Draw the rectangle and fill with gradient
   // viz.append("rect")
   //     .attr("x", 0)
   //     .attr("width", h/2-padding)
   //     .attr("height", 30)
   //     .style("fill", "url(#linear-gradient)");
   // //A color scale
   // var colorScale = d3.scaleLinear()
   //     // .range(["#2c7bb6", "#00a6ca","#00ccbc","#90eb9d","#ffff8c","#f9d057","#f29e2e","#e76818","#d7191c"]);
   //     // .range(["#d7191c","#e76818","#f29e2e","#f9d057","#ffff8c","#90eb9d","#00ccbc","#00a6ca","#2c7bb6"]);
   //     .range(["#f17a6d", "#fcbe56", "#ffff56", "#c5ff64", "#87dd70", "#61dae7", "#56a0ff", "#b38ddf"])
   // //Append multiple color stops by using D3's data/enter step
   // linearGradient.selectAll("stop")
   //     .data( colorScale.range() )
   //     .enter().append("stop")
   //     .attr("offset", function(d,i) { return i/(colorScale.range().length-1); })
   //     .attr("stop-color", function(d) { return d; });




    let logo = viz.append('image')
        .attr('xlink:href', 'image.png')
        .attr('width', w/3.5)
        .attr('height', h/3.5)
        .attr('transform', 'translate('+w/2+','+h/2+')')
    ;


    let line1 = viz.append("line")//making a line for legend
        .attr('class', 'tower')
        .attr("x1", w/1.6)
        .attr("x2", w/1.6)
        .attr("y1", padding)
        .attr("y2", h/2)
        .style("stroke-dasharray",("50,30")) //虚线小方块长度,间隔
        .style("stroke-width",30)
        .style("opacity",0.7)
        .style("stroke", "black")
        // .style("fill", "url(#linear-gradient)")
    ;

    let dottedLines = viz.append('g')
        // .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')')
        .attr("class", "dottedlines")
        .style("stroke-dasharray",("6,4")) //虚线小方块长度
        .style("stroke-width",6)
        .style("opacity",0.7)
        .style("stroke", "black");

    let grouptexts = viz.append('g')
        // .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')')
        .attr('font-family', 'Stick')
        .attr('font-size', 25)
        .attr('fill', 'black');

    dottedLines.append("line")//vertical
        .attr("x1", w/1.5)
        .attr("x2", w/1.5)
        .attr("y1", padding)
        .attr("y2", h/2-20);
    grouptexts.append('text')
        // .attr('transform', 'translate(' + 90 + ',' + -220 + ') rotate(90)')
        .attr('transform', 'translate(' + w/1.39 + ',' + padding + ') rotate(90)')
        .text('Text:');
    grouptexts.append('text')
        // .attr('transform', 'translate(' + 90 + ',' + -220 + ') rotate(90)')
        .attr('transform', 'translate(' + w/1.46 + ',' + padding + ') rotate(90)')
        .text('Brief Description of the Moment');

    dottedLines.append("line")//horizontal right 1
        .attr("x1", w/1.5)
        .attr("x2", w * 1.2)
        .attr("y1", h/2-20)
        .attr("y2", h/2-20);
    grouptexts.append('text')
        .attr('transform', 'translate(' + (w*1.09) + ',' + (h/2-35) + ')')
        .text('Length:');
    grouptexts.append('text')
        .attr('transform', 'translate(' + w*0.88 + ',' + (h/2+10) + ')')
        .text('How Long Since Posted');



    dottedLines.append("line")//horizontal right 1
        .attr("x1", w/1.6) //right point
        .attr("x2", w*0.2) //left point
        .attr("y1", h/2.65)
        .attr("y2", h/2.65);
    dottedLines.append("line")//vertical
        .attr("x1", w/1.6)
        .attr("x2", w/1.6)
        .attr("y1", h/2.65+3)
        .attr("y2", h*0.35+3);
    grouptexts.append('text')
        .attr('transform', 'translate(' + w*0.21 + ',' + (h/2.7-10) + ')')
        .text('Stroke Weight:');
    grouptexts.append('text')
        .attr('transform', 'translate(' + w*0.21 + ',' + (h/2.7+35) + ')')
        .text('How Much I Like It');


    dottedLines.append("line")//horizontal right 2
        .attr("x1", w/1.8) //right point
        .attr("x2", w*0.08) //left point
        .attr("y1", h/2+20)
        .attr("y2", h/2+20);
    grouptexts.append('text')
        .attr('transform', 'translate(' + w*0.09 + ',' + (h/2+3) + ')')
        .text('X-Position:');
    grouptexts.append('text')
        .attr('transform', 'translate(' + w*0.09 + ',' + (h/2+48) + ')')
        .text('What Time Is It');


    // let grouptexts = viz.selectAll(".textgroup").data(coverTexts)
    //   .enter()
    //     .append("g")
    //       .attr("class", "textgroup")
    // grouptexts.attr("transform", 'translate(' + w / 2 + ',' + h / 2 + ')')
    //           .attr('font-family', 'Gill Sans')
    //           .attr('fill', 'black')
    //
    // grouptexts.append('text')
    //     .text(coverText)
    //     .attr("transform", textTranslate)
    //
    // let grouptexts = viz.append('g')
    //     .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')')
    //     .attr('font-family', 'Gill Sans')
    //     .attr('fill', 'black')
    //
    // grouptexts.append('text')
    //     .attr('transform', 'translate(' + 90 + ',' + -220 + ')')
    //     .attr('font-size', 130)
    //     .text('1');


}

main();
