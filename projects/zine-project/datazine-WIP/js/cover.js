let viz = d3.select('#container')
    .append('svg')
      .attr('id', 'viz')
      .style('width', '100%')
      .style('height', '100%')
      .style('background', 'white')
;

let w = 900,
    h = 900;

function main() {
    console.log('ready');

    let logo = viz.append('image')
        .attr('xlink:href', 'image.png')
        .attr('width', 900)
        .attr('height', 900)
        // .attr('transform', 'rotate(8)')
        .attr('transform', 'translate('+'-'+w/20+','+'-'+h/4+') rotate(10)')


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

    let grouptexts = viz.append('g')
        .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')')
        .attr('font-family', 'Stick')
        .attr('fill', 'black')

    grouptexts.append('text')
        .attr('transform', 'translate(' + 90 + ',' + -220 + ')')
        .attr('font-size', 130)
        .text('1');
    grouptexts.append('text')
        .attr('transform', 'translate(' + 90 + ',' + -100 + ')')
        .attr('font-size', 130)
        .text('2');
    grouptexts.append('text')
        .attr('transform', 'translate(' + 90 + ',' + 20 + ')')
        .attr('font-size', 130)
        .text('3');

    grouptexts.append('text')
        .attr('transform', 'translate(' + 305 + ',' + -100 + ')')
        .attr('font-size', 110)
        .text('Likes');
    grouptexts.append('text')
        .attr('transform', 'translate(' + 375 + ',' + 10 + ')')
        .attr('font-size', 110)
        .text('on');
    grouptexts.append('text')
        .attr('transform', 'translate(' + 320 + ',' + 120 + ')')
        .attr('font-size', 110)
        .text('WeChat');
    grouptexts.append('text')
        .attr('transform', 'translate(' + 180 + ',' + 230 + ')')
        .attr('font-size', 110)
        .text('Moments');
    grouptexts.append('text')
        .attr('transform', 'translate(' + 580 + ',' + 300 + ')')
        .attr('font-size', 55)
        .text('Jyoti');



}

main();
