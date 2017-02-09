var WINDOW_WIDTH;
var WINDOW_HEIGHT;
var RADIUS;
var MARGIN_TOP;
var MARGIN_LEFT;

const endTime = new Date();
endTime.setTime(endTime.getTime() + 3600 * 1000);//设置结束时间为该时刻之后一个小时

var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"];

window.onload = function () {

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    WINDOW_WIDTH = document.documentElement.clientWidth;
    WINDOW_HEIGHT = document.documentElement.clientHeight;

    //让空白部分占屏幕的1/5，所以两侧的空白分别是1/10
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);

//数字部分占屏幕的4/5,每个数字占15个(RADIUS+1),6个数字占90个(RADIUS+1),1个冒号占9个(RADIUS+1)，两个冒号占18个(RADIUS+1),共108个(RADIUS+1)
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;

    //上端距离顶部1/5
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(
        function () {
            render(context);//逐桢动画,每50毫秒执行一次
            update();
        }, 50);
};

function getCurrentShowTimeSeconds() {
    var curTime = new Date();//当前时间
    var ret = endTime.getTime() - curTime.getTime();//截止时间的毫秒数减去当前时间的毫秒数
    ret = Math.round(ret / 1000);//毫秒转化成秒（四舍五入）

    return ret >= 0 ? ret : 0;
}

function update() {

    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSeconds / 3600);
    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);
    var curSeconds = curShowTimeSeconds % 60;

    if (nextSeconds != curSeconds) {//时间变化时,增加彩色小球
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {//如果小时的的十位数不同，增加小球
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
        }
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {//如果小时的的个位数不同，增加小球
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours % 10));
        }

        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {//如果分钟的的十位数不同，增加小球
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
        }
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {//如果分钟的的个位数不同，增加小球
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
        }

        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {//如果秒数的的十位数不同，增加小球
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
        }
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {//如果秒数的的个位数不同，增加小球
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
        }

        curShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();
}

function updateBalls() {

    for (var i = 0; i < balls.length; i++) {

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;//将重力加速度加到垂直方向的速度上

        //碰撞检测
        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {//小球碰到底部
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;//0.75摩擦系数,使得小球的弹跳更符合实际
        }
    }
    //控制小球数量
    var cnt = 0;
    for(var i = 0; i< balls.length;i++) {
        if(balls[i].x+RADIUS >0 && balls[i].x-RADIUS < WINDOW_WIDTH) {//留在画布中的小球
            balls[cnt++] = balls[i];//cnt <= i,前cnt个小球符合要求，cnt后面的小球可以删掉
        }
    }
    while(balls.length > cnt) {
        balls.pop();//删除病返回数组最后一个元素
    }
}

function addBalls(x, y, num) {

    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++)
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,//水平方向的速度为[-4,4]
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                };

                balls.push(aBall)
            }
}

function render(cxt) {

    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);//刷新掉原来的图像，否则新图像会叠加在上面

    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = curShowTimeSeconds % 60;

    //绘制数字
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);//绘制小时的十位数
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt);//(//绘制小时的个位数)本来是14个(R+1),为了有点空隙，取15个
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);//冒号只有4列, 8个(R+1),多取一个9个(R+1)
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);//绘制分钟的十位数
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);//绘制分钟的个位数
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);//绘制秒数的十位数
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);//绘制秒数的个位数

    //绘制小球
    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
        cxt.closePath();

        cxt.fill();
    }
}

function renderDigit(x, y, num, cxt) {//数字最左端横坐标,数字最左端纵坐标,绘制的数字,绘制的上下文环境

    cxt.fillStyle = "rgb(0,102,153)";//设置小球的填充颜色

    for (var i = 0; i < digit[num].length; i++)
        for (var j = 0; j < digit[num][i].length; j++)
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();

                cxt.fill()
            }
}

