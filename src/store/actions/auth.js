// export const login = (uid) => ({
//     type:'LOGIN',
//     uid
// });

export const changeFetching = (isFetchingStatus) => ({
    type:'FETCHING_STATUS',
    isFetchingStatus
});

export const login = () => ({
    type: 'LOGIN',
});

// Asynchronous login action which will be used in other functions

// export const startLogin = (user)=>{
    

// return ()=>{

// if(user.name=="test"&&user.password=="1234"){
// console.log('user id s',user.uid);
//    login(user.uid);

// }
     
// };

// };

export const logout = () => ({
    type:'LOGOUT',
});