import { Base64 } from 'js-base64';

const channelList = ["热点","科技", "娱乐", "国内", "国际", "军事", "财经", "互联网", "教育", "体育", "电影", " 游戏", "美食", "本地"];



const util={
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
    setItem(key,value){
        if(typeof value=='object') value=JSON.stringify(value);
        localStorage.setItem(key,value);
    },
    getItem(key){
        let temp=localStorage.getItem(key);
        let res=null;
        try {
            if (res === JSON.parse(temp)) return res;
        }
        catch(e){
            return temp;
        }
    },
    removeItem(key){
        localStorage.removeItem(key);
    },
    clear(){
        localStorage.clear();
    }

}
export default util;