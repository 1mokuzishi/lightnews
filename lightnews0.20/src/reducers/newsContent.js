const newsContent = (state=[], action) => {
    switch (action.type) {
        case 'CREATE_NEWS':
            return {
                newsContent:action.newsContent
            }
        default:
            return state
    }
}
export default newsContent