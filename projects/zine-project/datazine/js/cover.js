let viz = d3.select('#container')
    .append('svg')
      .attr('id', 'viz')
      .style('width', '100%')
      .style('height', '100%')
      .style('background', '#f6f4e6')
;

let w = 900,
    h = 900;

function main() {
    console.log('ready');

    let logo = viz.append('image')
        .attr('xlink:href', 'image.png')
        .attr('width', 900)
        .attr('height', 900)
        .attr('transform', 'translate('+'-'+w/20+','+'-'+h/4+') rotate(10)')


    let grouptexts = viz.append('g')
        .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')')
        .attr('font-family', 'Stick')
        .attr('opacity', 0.9)
        .attr('fill', "#242424")

    // grouptexts.append('text')
    //     .attr('transform', 'translate(' + 90 + ',' + -220 + ')')
    //     .attr('font-size', 130)
    //     .text('1');
    // grouptexts.append('text')
    //     .attr('transform', 'translate(' + 90 + ',' + -100 + ')')
    //     .attr('font-size', 130)
    //     .text('2');
    // grouptexts.append('text')
    //     .attr('transform', 'translate(' + 90 + ',' + 20 + ')')
    //     .attr('font-size', 130)
    //     .text('3');

    grouptexts.append('text')
        .attr('transform', 'translate(' + 100 + ',' + -110 + ')')
        .attr('font-size', 100)
        .text('41');
    grouptexts.append('text')
        .attr('transform', 'translate(' + -320 + ',' + 170 + ')')
        .attr('font-size', 95)
        .text('2.8-2.19');
    grouptexts.append('text')
        .attr('transform', 'translate(' + 305 + ',' + -110 + ')')
        .attr('font-size', 110)
        .text('Likes');
    grouptexts.append('text')
        .attr('transform', 'translate(' + 375 + ',' + 0 + ')')
        .attr('font-size', 110)
        .text('on');
    grouptexts.append('text')
        .attr('transform', 'translate(' + 320 + ',' + 110 + ')')
        .attr('font-size', 110)
        .text('WeChat');
    grouptexts.append('text')
        .attr('transform', 'translate(' + 180 + ',' + 220 + ')')
        .attr('font-size', 110)
        .text('Moments');
    grouptexts.append('text')
        .attr('transform', 'translate(' + 570 + ',' + 300 + ')')
        .attr('font-size', 55)
        .text('Jyoti');

}

main();
