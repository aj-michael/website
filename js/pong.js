var paddleWidth = 30;
var paddleHeight = 150;
var ballWidth = 15;

var offset = 10;
var voffset = 10;
var counter = 0;

var speed = 1
var velocity = []
velocity.push(speed * (.5*Math.random()+.5))
velocity.push(Math.sqrt(speed*speed-velocity[0]*velocity[0]))
if (Math.random() > .5) {
    velocity[0] = -1*velocity[0];
}
if (Math.random() > .5) {
    velocity[1] = -1*velocity[1];
}

var mode = 0;
var turn = velocity[0] < 0 ? 0 : 1;

$(canvas).appendTo('.site-wrapper-inner')
    .attr('id','canvas')
    .attr('width',$(window).width())
    .attr('height',$(window).height());

var pressed = [false, false, false, false];

function Shape(x,y,w,h,fill) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.fill = fill || '#AAAAAA';
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
    this.interval = 1;
    setInterval(function() { state.draw(); }, state.interval);
}

CanvasState.prototype.draw = function() {
    if (!this.valid && counter == 0) {
        if (pressed[0]) {
            state.shapes[0].y = Math.max(state.shapes[0].y-4,voffset);
        }
        if (pressed[1]) {
            state.shapes[0].y = Math.min(state.shapes[0].y+4,$('#canvas').height()-paddleHeight-voffset);
        }
        if (pressed[2]) {
            state.shapes[1].y = Math.max(state.shapes[1].y-4,voffset);
        }
        if (pressed[3]) {
            state.shapes[1].y = Math.min(state.shapes[1].y+4,$('#canvas').height()-paddleHeight-voffset);
        }

        var ctx = this.ctx;
        var shapes = this.shapes;
        this.clear();
        for (var i = 0; i < shapes.length-1; i++) {
            shapes[i].draw(ctx);
        }
    }
    var ball = this.shapes[this.shapes.length-1];
    if (ball.y <= 0 || ball.y+ballWidth >= $(window).height()) {
        velocity[1] = -1*velocity[1];
    }
    var leftBorder = offset+paddleWidth;
    var rightBorder = $(window).width()-offset-paddleWidth;
    if (ball.x>leftBorder && ball.x+velocity[0]<leftBorder && ball.y+ballWidth>this.shapes[0].y && ball.y<this.shapes[0].y+paddleHeight) {
        velocity[0] = -1*velocity[0];
        turn = (turn + 1) % 2;
    } else if (ball.x+ballWidth<rightBorder&&ball.x+ballWidth+velocity[0]>rightBorder&&ball.y+ballWidth>this.shapes[1].y&&ball.y<this.shapes[1].y+paddleHeight) {
        velocity[0] = -1*velocity[0];
        turn = (turn + 1) % 2;
    }
    ball.x = ball.x + velocity[0];
    ball.y = ball.y + velocity[1];
    ball.draw(this.ctx);
    counter = (counter + 1) % 5;

    
    if (ball.x < -100 || ball.x > 100+$(window).width()) {
        ball.x = Math.random()*$(window).width()
        ball.y = Math.random()*$(window).height()
        velocity = []
        velocity.push(speed * (.5*Math.random()+.5))
        velocity.push(Math.sqrt(speed*speed-velocity[0]*velocity[0]))
        if (Math.random() > .5) {
            velocity[0] = -1*velocity[0];
        }
        if (Math.random() > .5) {
            velocity[1] = -1*velocity[1];
        }
        turn = velocity[0] < 0 ? 0 : 1;
    }

    if (mode < 2 && turn == 0) {
        // moving left
        var time = (ball.x-leftBorder)/(-1*velocity[0]);
        var intersection = ball.y + velocity[1]*time;
        if (intersection < state.shapes[0].y+paddleHeight/2+10) {
            pressed = [true, false, false, false];
        } else if (intersection > state.shapes[0].y+paddleHeight/2-10) {
            pressed = [false,true,false,false];
        }
    } else if (mode == 0 && turn == 1) {
        // moving right
        var time = (rightBorder-ball.x-ballWidth)/velocity[0];
        var intersection = ball.y+velocity[1]*time;
        if (intersection < state.shapes[1].y+paddleHeight/2+10) {
            pressed = [false,false,true,false];
        } else if (intersection > state.shapes[1].y+paddleHeight/2-10) {
            pressed = [false,false,false,true];
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

var initialBallX = Math.floor(Math.random()*$(window).width());
var initialBallY = Math.floor(Math.random()*$(window).height());

state.addShape(new Shape(initialBallX,initialBallY,ballWidth,ballWidth,"red"));


$('#twoperson').click(function() {
    mode = 2;
    $('li #twoperson').parent().addClass('active');
    $('li #oneperson').parent().removeClass('active');
    $('li #noperson').parent().removeClass('active');
});
$('#oneperson').click(function() {
    mode = 1;
    $('li #oneperson').parent().addClass('active');
    $('li #noperson').parent().removeClass('active');
    $('li #twoperson').parent().removeClass('active');
});
$('#noperson').click(function() {
    mode = 0;
    $('li #oneperson').parent().removeClass('active');
    $('li #noperson').parent().addClass('active');
    $('li #twoperson').parent().removeClass('active');
});

