import { Base64 } from 'js-base64';

const channelList = ["热点","科技", "娱乐", "国内", "国际", "军事", "财经", "互联网", "教育", "体育", "电影", " 游戏", "美食", "本地"];

var util={
    channelId2Name: function (id) {
        return channelList[id];
    },
    channelName2Id: function (name) {
        return channelList.indexOf(name);
    },
    encode:function(str){
        return Base64.encode(str);
    },
    decode:function(str){
        return Base64.decode(str);
    },
    setCookie :function (name, value, day) {
        if(day !== 0){     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
            var expires = day * 24 * 60 * 60 * 1000;
            var date = new Date(+new Date()+expires);
            document.cookie = `${name}=${value};expires=${date.toUTCString()}`;
        }else{
            document.cookie =`${name}=${value}`;
        }
    },
    getCookie:function (name) {
            var arr;
            var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return arr[2];
            else
                return null;
    }

}
export default util;