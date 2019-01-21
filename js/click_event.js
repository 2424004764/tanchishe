function monitor_click_event(){
    // 开始游戏
    $(".startGame").on('click', function(){
        // console.log('isStartGame', isStartGame)
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
        let ranking_html = ""
        get_ranking(function(data){
            for(let i = 0; i < data.result.length; i++){
                // console.log(i)
                let create_time = data.result[i]['create_time']
                let username = data.result[i]['name']
                let score = data.result[i]['score']
                // console.log(LSTNAME)
                let classs = ''
                if(LSTNAME == username){
                    classs = 'my'
                }
                ranking_html += "<p class="+classs+">"+ (i + 1) +"、"+create_time+" -- 玩家【"+username+"】 -- 分数为："+score+"</p>"
            }
            $(".ranking .log-list").html(ranking_html)
        })
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
    // 退出登陆
    $("#top_controller .login_info.quit").click(function(){
        if(confirm("是否退出登陆？")){
            LS.delAllLS()
            location.reload()
        }
    })
    // 关闭音频
    $("#controller .audio_togger").click(function(){
        let is_play_audio = LS.getLS('is_play_audio')
        // console.log(is_play_audio)
        if(is_play_audio == 'true'){ // 如果是开启状态
            LS.setLS('is_play_audio', 'false')
            $(this).html("打开音频")
        }else{
            LS.setLS('is_play_audio', 'true')
            $(this).html("关闭音频")
        }
    })
}