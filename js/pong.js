var canvas = '<canvas></canvas>';
var rect = '<rect></rect>';

var svgWidth = 50;
var svgHeight = $(window).height();
var paddleWidth = svgWidth;
var paddleHeight = 100;
var paddleColor = 'rgb(0,0,255)';
var strokeColor = 'rgb(0,0,0)';

$(canvas).appendTo('.site-wrapper-inner')
    .attr('id','leftSide')
    .attr('width',svgWidth)
    .attr('height',svgHeight)
    //.css('border','1px solid red')
    .css('z-index','1000')
    .css('position','absolute')
    .css('top','0px')
    .css('left','5px');


$(canvas).appendTo('.site-wrapper-inner')
    .attr('id','rightSide')
    .attr('width',svgWidth)
    .attr('height',svgHeight)
    //.css('border','1px solid red')
    .css('z-index','1000')
    .css('position','absolute')
    .css('top','0px')
    .css('right','5px');

drawPaddle($('#leftSide'),50);
drawPaddle($('#leftSide'),300);
drawPaddle($('#rightSide'),50);

function drawPaddle(side,y) {
    console.log(side)
    var ctx = side[0].getContext("2d");
    var x = side.position().left;
    console.log(x);
    ctx.beginPath();
    ctx.rect(x,y,paddleWidth,paddleHeight);
    ctx.setFillColor("white");
    ctx.fill()
    ctx.stroke();
}

function movePaddle(paddle,direction) {

}

$(document).keydown(function(e) {
    switch(e.which) {
        case 87:    // w
            console.log('you pressed w');
            break;
        case 83:    // s
            console.log('you pressed s');
            break;
        case 38:    // up
            console.log('you pressed up');
            break;
        case 40:    // down
            console.log('you pressed down');
            break;
        default:
            return;
    }
    e.preventDefault();
});
