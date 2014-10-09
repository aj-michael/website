var paddleWidth = 30;
var paddleHeight = 150;
var offset = 20;

$(canvas).appendTo('.site-wrapper-inner')
    .attr('id','canvas')
    .attr('width',$(window).width())
    .attr('height',$(window).height())
    //.css('border','1px solid red')
    .css('z-index','2')
    .css('position','absolute')
    .css('top','0px')
    .css('left','0px');
$('.masthead.clearfix')
    .css('position', 'absolute')
    .css('z-index','3');

var pressed = [false, false, false, false];

function Shape(x,y,w,h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.fill = '#AAAAAA';
}

Shape.prototype.draw = function(ctx) {
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.x,this.y,this.w,this.h);
}

function CanvasState(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');
    this.shapes = [];
    var state = this;
    $(document).keydown(function(e) {
        state.valid = false;
        switch(e.which) {
            case 87:    //w
                pressed[0] = true;
                break;
            case 83:    //s
                pressed[1] = true;
                break;
            case 38:    //up
                pressed[2] = true;
                break;
            case 40:    //down
                pressed[3] = true;
                break;
            default:
                state.valid = true;
                return;
        }
        e.preventDefault();
    });
    $(document).keyup(function(e) {
        switch(e.which) {
            case 87:
                pressed[0] = false;
                break;
            case 83:
                pressed[1] = false;
                break;
            case 38:
                pressed[2] = false;
                break;
            case 40:
                pressed[3] = false; 
                break;
            default:
                return;
        }
    });
    this.interval = 10;
    setInterval(function() { state.draw(); }, state.interval);
}

CanvasState.prototype.draw = function() {
    if (!this.valid) {
        if (pressed[0]) {
            state.shapes[0].y = Math.max(state.shapes[0].y-4,0);
        }
        if (pressed[1]) {
            state.shapes[0].y = Math.min(state.shapes[0].y+4,$('#canvas').height()-paddleHeight);
        }
        if (pressed[2]) {
            state.shapes[1].y = Math.max(state.shapes[1].y-4,0);
        }
        if (pressed[3]) {
            state.shapes[1].y = Math.min(state.shapes[1].y+4,$('#canvas').height()-paddleHeight);
        }

        var ctx = this.ctx;
        var shapes = this.shapes;
        this.clear();
        for (var i = 0; i < shapes.length; i++) {
            shapes[i].draw(ctx);
        }
    }
}

CanvasState.prototype.addShape = function(shape) {
    this.shapes.push(shape);
}

CanvasState.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
}



var leftStartingHeight = Math.floor((Math.random()*($(window).height()-paddleHeight)));
var rightStartingHeight = Math.floor((Math.random()*($(window).height()-paddleHeight)));


var state = new CanvasState(document.getElementById('canvas'));
state.addShape(new Shape(offset,leftStartingHeight,paddleWidth,paddleHeight));
state.addShape(new Shape($(window).width()-paddleWidth-offset,rightStartingHeight,paddleWidth,paddleHeight));

