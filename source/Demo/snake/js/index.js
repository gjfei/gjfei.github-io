// getElementsByClassName获取到的HTMLCollection是动态的，所以后面的不必重新赋值
var map = document.getElementById('map');
var food = document.getElementsByClassName('food');
// 初始化地图
var initializeMap = document.getElementById('map').innerHTML;
var snake = document.getElementsByClassName('snake');
var maxIntegral = localStorage.getItem('maxIntegral') || '0'; //获取缓存的最大值

//保存颜色的数组
var colorList = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime',' maroon', 'navy', 'olive', 'orange',' purple', 'red', 'silver', 'teal', 'yellow'];
var foodColor = '';
var keyCode = 39  //当前的默认方向键
var level = 250;
// 初始化蛇
function initialize() {
    integrall = 0;
    map.innerHTML = initializeMap;
    document.getElementById('maxIntegral').value = maxIntegral;
    document.getElementById('integral').value = 0;
    for (let i = 0; i < snake.length; i++) {
        snake[i].style.left = snake[i].offsetWidth * i + 'px';
    }
    randomFood();
}
// 初始化蛇
initialize();

// 产生一个随机整数 
function Random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}
// 产生一个在随机位置的食物
function randomFood() {
    food[0].style.left = Random(0, 34) * food[0].offsetWidth + 'px';
    food[0].style.top = Random(0, 34) * food[0].offsetWidth + 'px';
    foodColor = colorList[Random(0,colorList.length-1)];
    food[0].style.backgroundColor = foodColor;
}
var start = setInterval(function () { sports(keyCode) }, level);
// 监听键盘
document.onkeydown = function (e) {
    console.log(e.keyCode);
    
    switch (e.keyCode){
        case 32:
            //空格暂停
            if (start) {
                start = clearInterval(start);
                this.innerHTML = "开始";
            } else {
                start = setInterval(function () { sports(keyCode) }, level);
                this.innerHTML = "暂停";
            }
        break;

        case 37:
            // 判断蛇头是否在最左边
            if (snake[snake.length - 1].offsetLeft <= snake[snake.length - 2].offsetLeft) {
                keyCode = e.keyCode;
                start = clearInterval(start)
                start = setInterval(function () { sports(keyCode) }, level);
            }
            
        break;

        case 38:
            // 判断蛇头是否在最上边
            if (snake[snake.length - 1].offsetTop <= snake[snake.length - 2].offsetTop) {
                keyCode = e.keyCode;
                start = clearInterval(start)
                start = setInterval(function () { sports(keyCode) }, level);
            }
        break;

        case 39:
            // 判断蛇头是否在最右边
            if (snake[snake.length - 1].offsetLeft >= snake[snake.length - 2].offsetLeft) {
                keyCode = e.keyCode;
                start = clearInterval(start)
                start = setInterval(function () { sports(keyCode) }, level);
            }
        break;

        case 40:
            // 判断蛇头是否在最下边
            if (snake[snake.length - 1].offsetTop >= snake[snake.length - 2].offsetTop) {
                keyCode = e.keyCode;
                start = clearInterval(start)
                start = setInterval(function () { sports(keyCode) }, level);
            }
        break;
            // 按键1-9改变等级
        case 97:
        case 49:
            changeLevel (1); //等级1
        break;

        case 98:
        case 50:
            changeLevel (2); //等级2
        break;

        case 99:
        case 51:
            changeLevel (3); //等级3
        break;

        case 100:
        case 52:
            changeLevel (4); //等级4
        break;

        case 101:
        case 53:
            changeLevel (5); //等级5
        break;
        
        case 102:
        case 54:
            changeLevel (6); //等级6
        break;

        case 103:
        case 55:
            changeLevel (7); //等级7
        break;
        
        case 104:
        case 56:
            changeLevel (8); //等级8
        break;

        case 105:
        case 57:
            changeLevel (9); //等级9
        break;
    }
}
// 控制蛇的行走方向   
function sports(direction) {
    // console.log("level");
    
    let x = '';
    let y = '';
    // 运动方向
    switch (direction) {
        case 37:
            x = snake[snake.length - 1].offsetLeft - snake[snake.length - 1].offsetWidth + 'px';
            y = snake[snake.length - 1].offsetTop + 'px';
            break;
        case 38:
            x = snake[snake.length - 1].offsetLeft + 'px';;
            y = snake[snake.length - 1].offsetTop - snake[snake.length - 1].offsetWidth + 'px';
            break;
        case 39:
            x = snake[snake.length - 1].offsetLeft + snake[snake.length - 1].offsetWidth + 'px';;
            y = snake[snake.length - 1].offsetTop + 'px';
            break;
        case 40:
            x = snake[snake.length - 1].offsetLeft + 'px';;
            y = snake[snake.length - 1].offsetTop + snake[snake.length - 1].offsetWidth + 'px';
            break;
    }
    for (let i = 0; i < snake.length; i++) {
        if (i < snake.length - 1) {
            // 让蛇身随着蛇头的方向运动
            snake[i].style.left = snake[i + 1].offsetLeft + 'px';
            snake[i].style.top = snake[i + 1].offsetTop + 'px';
        } else {
            snake[i].style.left = x;
            snake[i].style.top = y;
        }
    }
    giveOver();
    eatFood();    
}
// 吃食物
function eatFood() {
    if (snake[snake.length - 1].offsetLeft == food[0].offsetLeft && snake[snake.length - 1].offsetTop == food[0].offsetTop) {
        var node = document.createElement('div');
        map.insertBefore(node, snake[0]);
        node.style.left = snake[0].offsetLeft + 'px';
        node.style.top = snake[0].offsetTop + 'px';
        node.className = 'snake';
        node.style.backgroundColor = foodColor;
        randomFood();
        addIntegral();
    }
}
// 判断死亡
function giveOver() {
    for (let i = 0; i < snake.length - 1; i++) {
        if (snake[snake.length - 1].offsetLeft == snake[i].offsetLeft && snake[snake.length - 1].offsetTop == snake[i].offsetTop) {
            start = clearInterval(start)
            if (confirm("giev over\r再来一局(确认)    不玩了(取消)")) {
                initialize();
            }else {
                initialize();
            }
        }
    }
    if (!(snake[snake.length - 1].offsetLeft >= 0 && snake[snake.length - 1].offsetTop >= 0 && snake[snake.length - 1].offsetLeft <= map.offsetWidth - snake[0].offsetWidth && snake[snake.length - 1].offsetTop <= map.offsetHeight - snake[0].offsetHeight)) {
        start = clearInterval(start)
        if (confirm("giev over\r你获得了再来一局(确认)    不玩了(取消)")) {
            initialize();
        }else {
            initialize();
        }
    }
}
// 计算积分
function addIntegral() {
    var integral = document.getElementById('integral');
    if(integral.value >= maxIntegral){
        maxIntegral=document.getElementById('maxIntegral').value = (snake.length-3)*document.getElementById('grade').value;
        localStorage.setItem('maxIntegral',(snake.length-3)*document.getElementById('grade').value);
    }
    integral.value = (snake.length-3)*document.getElementById('grade').value;
}
// 加减等级
function changeLevel (count){
    document.getElementById('grade').value = count;
    level = (10-count)*25+25;
    start = clearInterval(start)
    initialize();
}