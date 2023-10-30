export default function createReducer(state = {}, action) {
    switch (action.type) {
      case 'CREATE':
        return action.payload;
      default:
        return state;
    }
  }
  