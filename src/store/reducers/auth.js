export default (state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('Email') ? true : false,
  loggedInUser: JSON.parse(localStorage.getItem('user')),
  Email: localStorage.getItem('Email'),
  geoPoints: JSON.parse(localStorage.getItem('location')),
  currentAddress: null
}, action) => {
  console.log("Something should come here.");
  console.log(action);
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({}, state, {
        isAuthenticated: localStorage.getItem('Email') ? true : false,
        loggedInUser: JSON.parse(localStorage.getItem('user')),
        geoPoints: JSON.parse(localStorage.getItem('location'))
      })
    case 'LOGOUT':
      localStorage.removeItem('Email');
      localStorage.removeItem('user')
      return Object.assign({}, state, {
        loggedInUser: null,
        isAuthenticated: false,
        Email: null
      })
    case 'UPDATE_PROFILE': 
      return Object.assign({}, state, {
        Email: localStorage.getItem('Email'),
        loggedInUser: JSON.parse(localStorage.getItem('user')),
      })
    case 'FETCHING_STATUS':
      return Object.assign({}, state, {
        isFetching: action.isFetchingStatus
      });
    case 'CURRENT ADDRESS':
      return Object.assign({}, state, {
        currentAddress: localStorage.getItem('address')
      });
    default: return state
  }
};