export default (state = {
  isFetching : false,
  isAuthenticated: localStorage.getItem('Email') ? true : false,
  loggedInUser: JSON.parse(localStorage.getItem('user')),
  Email: localStorage.getItem('Email')
}, action) => {
  console.log("Something should come here.");
  console.log(action);
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({}, state, {})
    case 'LOGOUT':
      return Object.assign({}, state, {
        loggedInUser: null,
      })

    case 'FETCHING_STATUS': 
      return Object.assign({}, state, {
        isFetching: action.isFetchingStatus
      });
    default: return state
  }
};