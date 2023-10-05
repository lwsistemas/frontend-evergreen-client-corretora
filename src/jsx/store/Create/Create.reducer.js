export default function(state={},action){
    switch(action.type){
        case 'CREATE':
            return action.payload
        default:
            return state
    }
}