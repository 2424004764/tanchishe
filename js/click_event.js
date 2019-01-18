function monitor_click_event(){
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
    // 查看排名
    $(".view_ranking").on('click', function(){
        $(".update_text").css({'display': 'none'})
        $(".ranking").css({'display': 'block'})

    })
    // 查看更新日志
    $(".view_update_log").on('click', function(){
        $(".update_text").css({'display': 'block'})
    })
    // 关闭更新日志/排名
    $(".close_update_text").click(function(){
        $(".update_text").css({'display':'none'})
    })
    // 刷新页面
    $(".refresh_page").click(function(){
        location.reload()
    })
}