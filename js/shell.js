let fangxiang = 'r' // 定义全局的按键方向 默认为往右行进
let t1 // 定义定时器
let isStartGame = true // 是否开始游戏
let isGenerateFoods = false // 是否生成食物
let generateFoodsLoc = {x: '', y:''} // 生成的食物坐标
let ifPausegame = false // 是否暂停游戏
let snaikeBody = [] // 蛇的身体 
let speed = 200 // 速度 值越小 移动速度越快 建议100~1000 之间

$(document).ready(function(){
    let width = 800 // 游戏屏幕宽度
    let height = 800 // 游戏屏幕高度 
    let app = "app" // 游戏容器ID
    loadShe(width, height, app)

    // 开始游戏
    $(".startGame").on('click', function(){
        console.log('isStartGame', isStartGame)
        if(!isStartGame) return false // 是否可以开始游戏
        $(".brithLoc").css({'background':'orange'})
        goGame()
    })
    // 重新生成位置
    $(".reloadLoc").on('click', function(){
        location.reload()
    })
    // 暂停游戏
    $(".pauseGame").on('click', function(){
        console.log('暂停游戏')
        clearInterval(t1)
    })
    // 继续游戏
    $(".goGame").on('click', function(){
        console.log('继续游戏')
        goGame()
    })

    // 键盘事件
    if(isStartGame){
        $("#"+app+"").keydown(function(event){
            // console.log('按键', event.which )
            let keyCode = event.which
            if(keyCode == 38 || keyCode == 87){
                // 不能往反方向前进 如果方向为下 则不能为上
                fangxiang = fangxiang == 'b' ? 'b' : 't' // 上 
            }else if(keyCode == 37 || keyCode == 65){
                fangxiang = fangxiang == 'r' ? 'r' : 'l' // 左
            }else if(keyCode == 40 || keyCode == 83){
                fangxiang = fangxiang == 't' ? 't' : 'b' // 下
            }else if(keyCode == 39 || keyCode == 68){
                fangxiang = fangxiang == 'l' ? 'l' : 'r' // 右
            }else if(keyCode == 32){ // 暂停游戏 空格键
                if(!ifPausegame){
                    console.log('暂停游戏')
                    clearInterval(t1)
                    ifPausegame = !ifPausegame
                }else{
                    console.log('继续游戏')
                    goGame()
                }
            }
        })
    }
    $("#asle .left").on('click', function(){
        fangxiang = 'l'
    })
    $("#asle .top").on('click', function(){
        fangxiang = 't'
    })
    $("#asle .right").on('click', function(){
        fangxiang = 'r'
    })
    $("#asle .bottom").on('click', function(){
        fangxiang = 'b'
    })
})

//  每次移动
function startGame (app=$("#"+app+"")) {
    if(!isStartGame) return false
    app.focus() // 游戏区域聚焦
    // 初始蛇向上方向行进
    let snakeLength = snaikeBody.length
    if(fangxiang == 't'){ // 如果按下 上方向键
        moveDispose(fangxiang, 'x')
    }else if(fangxiang == 'l'){ // 如果按下 左方向键
        moveDispose(fangxiang, 'y')
    }else if(fangxiang == 'b'){ // 如果按下 下方向键
        moveDispose(fangxiang, 'x')
    }else if(fangxiang == 'r'){ // 如果按下 右方向键
        moveDispose(fangxiang, 'y')
    }
    clear_axle(snakeLength)
    eachFood(fangxiang)
    // console.log(snaikeBody[snaikeBody.length - 1]['x'], snaikeBody[snaikeBody.length - 1]['y'])

    // 检测是否咬到自己
    if(snaikeBody.length > 4){
        for(let n = 0; n < snaikeBody.length; n++){
            if(snakeLength - n > 4){
                if(snaikeBody[snaikeBody.length - 1]['x'] == snaikeBody[n]['x']
                && snaikeBody[snaikeBody.length - 1]['y'] == snaikeBody[n]['y']
                ){
                    console.log('咬到自己了！')
                    $("#tip").css({'display':'block'})
                    $("#tip .commit").css({'display':'block'})
                    $("#controller").css({'display':'none'})
                    clearInterval(t1) // 清除定时器
                }
            }
        }
    }

    // 检测碰壁
    if(snaikeBody[snaikeBody.length - 1]['y'] > 15 || snaikeBody[snaikeBody.length - 1]['x'] > 15 ||
    snaikeBody[snaikeBody.length - 1]['y'] < 0 || snaikeBody[snaikeBody.length - 1]['x'] < 0){
        console.log('撞到墙了！')
        $("#tip").css({'display':'block'})
        $("#tip .qiang").css({'display':'block'})
        $("#controller").css({'display':'none'})
        clearInterval(t1) // 清除定时器
    }
}

// 检测是是否蛇身体
function is_snakeBody(x, y){
    let snakeBody = true
    for(let i = 0; i < snaikeBody.length; i++){
        if(snaikeBody[i]['x'] == x && snaikeBody[i]['y'] == y){
            snakeBody = false
            break
        }
    }
    return snakeBody
}

// x、y轴坐标
function clear_axle(snakeLength){
    for(let j = 0; j < snakeLength; j++){
        if(j == 0){
            // 获取当前蛇尾的上下左右的位置
            let x_left_coord = snaikeBody[j]['x']
            let y_left_coord = snaikeBody[j]['y'] - 1

            let x_top_coord = snaikeBody[j]['x'] - 1
            let y_top_coord = snaikeBody[j]['y']

            let x_right_coord = snaikeBody[j]['x']
            let y_right_coord = snaikeBody[j]['y'] + 1

            let x_bottom_coord = snaikeBody[j]['x'] + 1
            let y_bottom_coord = snaikeBody[j]['y']

            let x_asle = generateFoodsLoc['x']
            let y_asle = generateFoodsLoc['y']

            if(!(x_left_coord == x_asle && y_left_coord == y_asle) 
            && is_snakeBody(x_left_coord, y_left_coord)){
                $("#app .x-" + x_left_coord + ".y-" + y_left_coord + "").css({'background': ''})
            }
            // 判断上边
            if(!(x_top_coord == x_asle && y_top_coord == y_asle) 
            && is_snakeBody(x_top_coord, y_top_coord)){
                $("#app .x-" + x_top_coord + ".y-" + y_top_coord + "").css({'background': ''})
            }
            // 判断右边
            if(!(x_right_coord == x_asle && y_right_coord == y_asle) 
            && is_snakeBody(x_right_coord, y_right_coord)){
                $("#app .x-" + x_right_coord + ".y-" + y_right_coord + "").css({'background': ''})
            }
            // 判断下边
            if(!(x_bottom_coord == x_asle && y_bottom_coord == y_asle) 
            && is_snakeBody(x_bottom_coord, y_bottom_coord)){
                $("#app .x-" + x_bottom_coord + ".y-" + y_bottom_coord + "").css({'background': ''})
            }
        }
        // 从最后一个元素开始循环
        let color = j == 0 ? "red" : "black"
        $("#app .x-"+snaikeBody[snakeLength - (j + 1)]['x']+".y-"+snaikeBody[snakeLength - (j + 1)]['y']+"")
        .css({'background': color})
    }
}

function eachFood(fangxiang){
    switch(fangxiang){
        case 'r':
            // 检测是否吃到食物
            if(snaikeBody[snaikeBody.length - 1]['y'] == generateFoodsLoc['y'] 
            && snaikeBody[snaikeBody.length - 1]['x'] == generateFoodsLoc['x']){
                let add_x = snaikeBody[0]['x']
                let add_y = snaikeBody[0]['y'] - 1
                addSnakeBody(add_x, add_y)
            }
            break
        case 'b':
            if(snaikeBody[snaikeBody.length - 1]['y'] == generateFoodsLoc['y'] 
            && snaikeBody[snaikeBody.length - 1]['x'] == generateFoodsLoc['x']){
                let add_x = snaikeBody[0]['x'] - 1
                let add_y = snaikeBody[0]['y']
                addSnakeBody(add_x, add_y)
            }
            break
        case 'l': // 不是数字1 而是字母l
            if(snaikeBody[snaikeBody.length - 1]['y'] == generateFoodsLoc['y'] 
            && snaikeBody[snaikeBody.length - 1]['x'] == generateFoodsLoc['x']){
                let add_x = snaikeBody[0]['x']
                let add_y = snaikeBody[0]['y'] + 1
                addSnakeBody(add_x, add_y)
            }
            break
        case 't':
            if(snaikeBody[snaikeBody.length - 1]['y'] == generateFoodsLoc['y'] 
            && snaikeBody[snaikeBody.length - 1]['x'] == generateFoodsLoc['x']){
                let add_x = snaikeBody[0]['x'] + 1
                let add_y = snaikeBody[0]['y']
                addSnakeBody(add_x, add_y)
            }
            break
    }
}

function addSnakeBody(add_x, add_y){
    console.log('吃到了食物，开心！')
    $("#app .x-" + add_x + ".y-" + add_y + "").css({'background': 'black'})
    snaikeBody.splice(0, 0, {
        x: add_x,
        y: add_y
    })
    // console.log(snaikeBody)
    // 解锁食物生成
    isGenerateFoods = false
    // 重新生成食物
    generateRandomFoods()
}

function moveDispose(symbol, axle){
    let snakeLength = snaikeBody.length
    for(let i = 0; i < snakeLength; i++){
        if(i == snakeLength - 1){
            switch(symbol){
                case 't':
                    --snaikeBody[i][axle]
                    break
                case 'l':
                    --snaikeBody[i][axle]
                    break
                case 'b':
                    ++snaikeBody[i][axle]
                    break
                case 'r':
                    ++snaikeBody[i][axle]
                    break
            }
        }else{
            snaikeBody[i]['x'] = snaikeBody[(i + 1)]['x']
            snaikeBody[i]['y'] = snaikeBody[(i + 1)]['y']
        }
    }
}

// 初始化游戏 容器 参数
function loadShe(width, height, app) {
    $("#tip").css({'display':'none'})
    $("#tip .qiang").css({'display':'none'})
    $("#tip .commit").css({'display':'none'})
    clearInterval(t1) // 清除定时器
    // 初始化游戏区域、坐标轴
    let apps = $("#"+app+"")
    apps.html("")
    apps.css({"width":width+"px", "height":height+"px"})
    // 初始化游戏格子
    let _html = "" // 定义游戏格子html 元素
    let gridCount = 16 * 16 // 格子数
    let xCount = -1 // X轴 总格子数
    
    for (let i = 0; i < gridCount; i++) {
        // 计算坐标
        let coordinate = i % 16
        if(coordinate == 0) {
            xCount++
        }
        let x = xCount // x轴 坐标
        let y = coordinate// y轴 坐标

        let className = "grid"
        // 生成游戏格子 html
        _html += "<div class='"+ className +" x-"+x+" y-"+y+"'>"+x+"-"+y+"</div>"
    }
    apps.append(_html) // 生成游戏格子
    // 初始化蛇的身体
    onLoadSnakeBody()
    // 生成随机食物
    generateRandomFoods()
}

// 获取最小值到最大值之间的整数随机数
function GetRandomNum(Min, Max) {
    return (Min + Math.round((Math.random()) * (Max - Min)))
}

// 生成随机食物
function generateRandomFoods(){
    if(isGenerateFoods){
        return false // 如果已生成食物 则跳过
    }
    // 生成随机坐标
    let randomX = GetRandomNum(0, 15)
    let randomY = GetRandomNum(0, 15)
    // 在此处写检测生成的位置是否是蛇身 如果是，则重新生成 直到非蛇身位置
    let flag = true
    // console.log(snaikeBody)
    while(flag){
        for(let i = 0; i < snaikeBody.length; i++){
            console.log('生成食物 x', randomX, ' y ', randomY)
            // 如果生成的食物在蛇身范围内
            if(snaikeBody[i]['x'] == randomX && snaikeBody[i]['y'] == randomY){
                console.log('生成的食物在蛇身体部分，重新生成')
                // 继续循环 直到生成的食物不在蛇身范围内
                randomX = GetRandomNum(0, 15)
                randomY = GetRandomNum(0, 15)
                break
            }else{
                // 生成食物
                $("#app .x-"+randomX+".y-"+randomY+"").removeClass("brithLoc")
                .css({'background':'green'})
                generateFoodsLoc['x'] = randomX
                generateFoodsLoc['y'] = randomY
                isGenerateFoods = true
                flag = !flag
                break
            }
        }
    }
    // console.log("generateFoodsLoc", generateFoodsLoc)

}

function goGame() {
    clearInterval(t1)
    t1 = window.setInterval('startGame(app)', speed)
}

function onLoadSnakeBody(){
    // 初始蛇的身体 x轴在0~10之间 y轴在0~15之间
    let x = GetRandomNum(0, 15)
    let y = GetRandomNum(0, 11)
    let snakeLength = 3 // 蛇身长度
    for (let i = 0; i < snakeLength; i++){
        snaikeBody.push({
            x: x,
            y: y + i
        })
        // 绘制蛇身
        let snakeBodyColor = 'black' // 蛇身颜色
        let snakeHeadColor = 'red' // 蛇头颜色
        let color = i == snakeLength - 1  ? snakeHeadColor : snakeBodyColor
        $("#app .x-"+ snaikeBody[i]['x'] +".y-"+ snaikeBody[i]['y'] +"").css({'background':color})
    }

    console.log('初始蛇身体', snaikeBody)
}