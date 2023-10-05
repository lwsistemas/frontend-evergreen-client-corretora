export default function(state={},action){
    switch(action.type){
        case 'RESET':
            return action.payload
        default:
            return state
    }
}