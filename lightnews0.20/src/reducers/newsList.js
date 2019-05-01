const newsList = (state=[], action) => {
    switch (action.type) {
        case 'CREATE_NEWSLIST':
            return {
                ...state,
                newsList:action.newsList
            }
        default:
            return state
    }
}
export default newsList