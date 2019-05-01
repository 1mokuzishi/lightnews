const user = (state={}, action) => {
    switch (action.type) {
        case 'CREATE_USER':
            return {
                user:action.user
            }
        default:
            return state
    }
}
export default user