import actions from './actions';
import { dispatch } from '../../node_modules/rxjs/internal/observable/pairs';

export const addAsync = (val)=>{
    console.log('Coming here')
    return { type: actions.ADD , info : val}
}

// WithOut Redux Thunk
// Actions must be plain objects. Use custom middleware for async actions.
export const add = (val)=>{
    return dispatch =>{
        setTimeout( ()=>{
            dispatch(addAsync(val))
        },3000)
    }
}