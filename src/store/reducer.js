const initialState = {
    appName : 'React Cart',
    products :[],
    cart :[],
    isLoggedIn : false,
    userCart :[]
}

const reducer = (state =initialState ,action)=>{

  
  switch(action.type){
      case 'get_products':
        return  { ...state , products: action.info}
        case 'isLoggedIn':
            return {...state, isLoggedIn : !state.isLoggedIn}
        case 'add':
            return {...state , cart : [...state.cart,action.info.id] , userCart:[...state.userCart,action.info] }
        case 'delete': return{
                ...state,
                userCart: state.userCart.filter(item=> item.id!== action.info)
            }
    default:
        return state
  }
  
}

export default reducer;