$(canvas).appendTo('.site-wrapper-inner')
    .attr('id','canvas')
    .attr('width',$(window).width())
    .attr('height',$(window).height())
    .css('border','1px solid red')
    .css('z-index','2')
    .css('position','absolute')
    .css('top','0px')
    .css('left','0px');
$('.masthead.clearfix')
    .css('position', 'absolute')
    .css('z-index','3');


function Shape(x,y,w,h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.fill = '#AAAAAA';
}

Shape.prototype.draw = function(ctx) {
    console.log("attmpteing to draw");
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.x,this.y,this.w,this.h);
}

function CanvasState(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');
    this.valid = false;
    this.shapes = [];
    var state = this;
    $(document).keydown(function(e) {
        switch(e.which) {
            case 87:    //w
                console.log('you pressed w');
                this.
                break;
            default:
                return;
        }
        e.preventDefault();
    });
    $(document).keyup(function(e) {
        console.log("you just released " + e.which);
    });
    this.interval = 30;
    setInterval(function() { state.draw(); }, state.interval);
}

CanvasState.prototype.draw = function() {
    if (!this.valid) {
        var ctx = this.ctx;
        var shapes = this.shapes;
        this.clear();
        for (var i = 0; i < shapes.length; i++) {
            shapes[i].draw(ctx);
        }
        this.valid = true;
    }
}

CanvasState.prototype.addShape = function(shape) {
    this.shapes.push(shape);
    this.valid = false;
}

CanvasState.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
}



var paddleWidth = 30;
var paddleHeight = 150;
var offset = 20;

var leftStartingHeight = Math.floor((Math.random()*($(window).height()-paddleHeight)));
var rightStartingHeight = Math.floor((Math.random()*($(window).height()-paddleHeight)));


var state = new CanvasState(document.getElementById('canvas'));
state.addShape(new Shape(offset,leftStartingHeight,paddleWidth,paddleHeight));
state.addShape(new Shape($(window).width()-paddleWidth-offset,rightStartingHeight,paddleWidth,paddleHeight));

