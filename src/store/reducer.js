import actions from './actions';
const initialState = {
    appName : 'React Cart',
    products :[],
    cart :[],
    isLoggedIn : false,
    userCart :[]
}

const reducer = (state =initialState ,action)=>{

  
  switch(action.type){
      case actions.GET_ALL_PRODUCTS :
        return  { ...state , products: action.info}
        case actions.IS_LOGGED_IN:
            return {...state, isLoggedIn : !state.isLoggedIn}
        case  actions.ADD:
            return {...state , cart : [...state.cart,action.info.id] , userCart:[...state.userCart,action.info] }
        case  actions.DELETE: return{
                ...state,
                userCart: state.userCart.filter(item=> item.id!== action.info),
                cart: state.cart.filter(item=> item!== action.info)
            }
    default:
        return state
  }
  
}

export default reducer;