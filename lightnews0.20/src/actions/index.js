
export const createUser=(user)=>{
    return {
        type:'CREATE_USER',
        user:user
    }
}
export const createNewsList=(newsList)=>{
    return {
        type:'CREATE_NEWSLIST',
        newsList:newsList
    }
}
export const createNews=(news)=>{
    return {
        type:'CREATE_NEWS',
        news:news
    }
}