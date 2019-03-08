const channelList = ["热点","科技", "娱乐", "国内", "国际", "军事", "财经", "互联网", "教育", "体育", "电影", " 游戏", "美食", "本地"];




module.exports={
    channelId2Name: function (id) {
        return channelList[id];
    },
    channelName2Id: function (name) {
        return channelList.indexOf(name);
    }
}