const Crawler = require('crawler');
const temme = require('temme').default;
const _ = require('lodash');
const request = require('request');
const cheerio = require('cheerio');
const News = require('./models/news.js');


var NewsList=[];
var NewsCount=0;
//var NewsSource='http://www.myzaker.com/channel/1';
var parm = process.argv.splice(2);
var NewsSource = parm[0];
//科技 http://www.myzaker.com/channel/13
//国内 http://www.myzaker.com/channel/1
//国际 http://www.myzaker.com/channel/2
//军事 http://www.myzaker.com/channel/3
//财经 http://www.myzaker.com/channel/4
//互联网 http://www.myzaker.com/channel/5
//体育 http://www.myzaker.com/channel/8
//娱乐 http://www.myzaker.com/channel/9
//教育 http://www.myzaker.com/channel/11
//电影 http://www.myzaker.com/channel/10530
//游戏 http://www.myzaker.com/channel/10376
//美食 http://www.myzaker.com/channel/10386
function insertDB(){
    console.log("开始插入数据库...");
    for(let i=0,len=NewsList.length;i<len;i++)
    {
        if(i === len-1){
            News.upsert(NewsList[i])
                .then((result)=>{
                    console.log("插入数据库成功");
                    process.exit(0);
                })
                .catch((err)=>{console.log("插入数据库失败，发生错误"+err);});
        }else{
            News.upsert(NewsList[i])
            .then((result)=>{return 0;})
            .catch((err)=>{console.log("插入数据库失败，发生错误"+err);});
        }
    }
}
var news_link_crawler = new Crawler({
    maxConnections: 1,
    callback: function (error, res, done) {
        if (error) {
            return console.log(error);
        }else{
            $ = cheerio.load(res.body);
            $('a.img').each(function (index,item){
                NewsList.push({
                    title:$(this).attr("title"),
                    href:$(this).attr("href"),
                    img:$(this).attr("style").substr(21).replace(');',''),
                })
                NewsCount++;
                //console.log($(this).attr("style").substr(21).replace(');',''));
            })
            let json = _.compact(temme(res.body, `.figcaption@{a[href=$article_path]{$title};}`));

            var nexturl=temme(res.body, `#nexturl[value=$nexturl];`).nexturl;
            //console.log('本页面已抓取数据'+(NewsCount)+'条');
            if(nexturl){
                getMoreData(nexturl);
            }else{
                console.log("nexturl:"+nexturl)
            }
            
        }

        done();
    }

});

function getMoreData(nexturl){
    request(`http:${nexturl}`, function (err, res) {
    if(err){
        return console.log('请求更多数据失败，错误信息:'+err);
    }else{
        var data = JSON.parse(res.body).data;
        //获取的文章数据的数据结构[{title:title,href:href,img:imgpath}]
        _.forEach(data.article,(obj,index)=>{
           NewsList.push(_.pick(obj,["title","href","img"]));
           NewsCount++;
        })

        //只能获取16次数据
        //console.log('本页面已获取数据'+(NewsCount)+'条');
        if(NewsCount<=200){
            getMoreData(data.next_url);
            
        }else{
            //获取新闻列表里所有新闻的新闻详情
            for (let i=0, len= NewsList.length; i < len; i++) {
                getNewsDetails(NewsList[i].href,i);
            } 
        }
        
    } 
});
}
var news_details_crawler = new Crawler({
    maxConnections:1,
    callback : function (err, res, done) {
                if(err){
                    console.log("获取新闻详情失败：错误信息："+err);
                }else{
                    var index=res.options.index;
                    //console.log(index);
                    $ = cheerio.load(res.body);
                    var content = $('#content','.article_content').html();
                    let json = temme(res.body,`.breadcrumb{$channel};
                                                .article_detail a[href=$original_href];
                                                .article_more a@tags{&{$};};
                                                .auther{$author};
                                                .time{$time};`);
                    json.channel=_.replace(json.channel,"\n首页\n","");
                    json.channel=_.replace(json.channel,"\n正文\n","");
                    json.tags=_.join(json.tags,'_');
                    NewsList[index]=_.assign(NewsList[index],json,{content:content});
                    if(index === NewsList.length-1){
                        //进行数据库操作
                        //验证数据抓取完整性
                        console.log("共抓取"+(index+1)+"条数据")
                        insertDB(); 
                        
                        /*setTimeout(function(){
                            console.log("插入数据库成功");
                            process.exit(0);
                        },4000);*/
                        //process.exit(0);
                    } 
                }
                done();
        
    }

});
function getNewsDetails(url,index) {
    news_details_crawler.queue({
        uri : "http:"+url,
        index : index
    });
}

function init_getNews(){
        news_link_crawler.queue({
            uri:`${NewsSource}`,
            NewsCount:0
        });   
}
init_getNews();