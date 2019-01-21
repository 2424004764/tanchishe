// 如果是手机打开网页 则返回false
function check() { 
    var userAgentInfo = navigator.userAgent; 
    var Agents = new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"); 
    var flag = true; 
    for(var v = 0; v < Agents.length; v++) { 
       if(userAgentInfo.indexOf(Agents[v]) > 0) { 
            flag = false; 
            break; 
        }
    }
    return flag; 
}

// 操作 localStorage
var LS = {
    setLS : function(key, value){
        localStorage.setItem(key,value)
    },
    getLS : function(key){
        return localStorage.getItem(key)
    },
    delLS : function(key){
        localStorage.removeItem(key)
    },
    delAllLS : function(){
        localStorage.clear()
    },
}

// 获取排名数据
// 参数为回调函数
function get_ranking(cf){
    let params = {}
    params.Tname = LSTNAME
    $.ajax({
        url : resuest_url + "get_ranking",
        tyepe : 'POST',
        data : params,
        success : function(data){
            // console.log(data)
            // 将数据回调出去
            cf(data)
        }
    })
}

function add_ranking(username, score){
    let params = {}
    params.name = username
    params.score = score
    if(username != "" && username.length <= 4 && score > 0){
        $.ajax({
            url : resuest_url + "add_ranking",
            tyepe : 'POST',
            data : params,
            success : function(data){
                console.log(data)
                $(".ranking_explain span").html("成绩保存成功！")
            }
        })
    }
}

// 播放音频
function play_audio(dom_obj){
    if(LS.getLS('is_play_audio') == 'true'){
        document.getElementById(dom_obj).play() 
    }
}