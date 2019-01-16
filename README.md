# javascript版 贪吃蛇

​	基于坐标的贪吃蛇

用到了jquery javascript css html

jquery主要用来抓取元素，绘制蛇身 设置样式

![](http://qn.fologde.com/2019-01-16/11:59:25.jpg)



设计思路：

​	初始化：

​		先生成游戏格子

​		再生成蛇的身体,并绘制到游戏格子上，变量名叫snakeBody，默认长度为3，可改，采用数组的形式，数组的最后一个元素为蛇头，也就是snakeBody[snakeBody.lenght - 1] 的位置，前面的元素为蛇身，并初始化食物的位置，初始食物的时候需要检测是否是蛇身体部分。

并且绘制蛇身体的时候，尽量让蛇Y轴小于等于12

​	移动：

​		设置一个定时器，默认全局方向方向为右（‘r’，t：表示上，l：表示左， b：表示向下），定时器跑一个叫startGame的函数，该函数首先判断方向，如果方向为r，则蛇的最后一个元素，也就是蛇头部分的Y轴 + 1，x轴不变，第n个元素等于第n+1个元素的值，如蛇身元素为[{x:12,y:7}, {x:12,y:8}, {x:12, y:9}]

如果默认方向为右，则此时蛇移动一次后的位置为[{x:12,y:8}, {x:12,y:9}, {x:12, y:10}]

代码实现部分

```javascript
/**
* symbol 方向 如 r
* axle 坐标系 如 x
**/
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
```

碰壁检测：
	如果蛇头的最后一个元素，也就是蛇头的位置的Y轴大于15、X轴大于15、Y轴小于0、X轴小于0了，则表示撞墙了 



咬到自己的检测：

​	首先，判断蛇身长度是否大于4，如果大于4则开始判断，因为蛇如果蛇身长度等于4的话，是不可能咬到自己的，因为长度为4的时候，蛇如果想自己咬到自己，就会变成一个正方形，是无论如何都咬不到自己的。当蛇身长度大于4时，还需要跳过最后面的4个元素。代码如下：

```javascript
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
                    clearInterval(t1) // 清除定时器
                }
            }
        }
    }
```

吃到食物：

​	当吃到食物后，先增加蛇数组，在数组的第0个位置添加，并绘制蛇身体，实现蛇身体增长的目的



碰壁或咬到自己死亡：

​	当检测到碰壁或者咬到自己后，执行清理定时器，弹窗提示操作





目前还存在的两个问题：

1、生成食物问题，有时候会生成到蛇身体位置

2、不能让蛇反向移动，当蛇的前进方向为右时，按下左方向键时，还应该向右方向移动

3、吃到的食物填充到蛇身后的问题