let initialState = {
  token: null,
  user: null,
  userData: null,
  cart: localStorage.getItem('cart') || [],
  orders: localStorage.getItem('orders') || [],
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
     let { token, userData, user, keep } = action.payload
      localStorage.setItem('token', token)
      !keep && localStorage.setItem('cart', JSON.stringify(userData.cart))
      return {
        token: token,
        user: user,
        userData: userData,
        cart: keep ? state.cart : userData.cart,
      }
    case 'CREATE_ORDER': 
     let {newOrder} = action.payload
     return {
       ...state,
       orders: [...state.orders, newOrder],
       userData: action.payload.userData
     }
    case 'LOG_OUT': 
      localStorage.removeItem('token')
      localStorage.setItem('cart', JSON.stringify([]))
      localStorage.setItem('orders', JSON.stringify([]))
      return initialState

    default:
      return state
  }
}

export default userReducer
