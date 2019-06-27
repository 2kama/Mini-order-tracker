import firebase from './../Firebase'
import { USER_LOGIN, USER_REGISTER, USER_DATA, CLEAR_USER_DATA, ADD_PRODUCTS } from './types'


const db = firebase.firestore()
const auth = firebase.auth()


export const registerUser = (username, address, phone, email, password) => {

   

    return dispatch => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(createdUser => {

            createdUser.user.updateProfile({
                displayName : username
            }).then(() => {

                let orderID = `order_${Math.random().toString(36).substr(2, 12)}`

                db.collection("users").doc(createdUser.uid).set({
                    username,
                    usertype : "customer",
                    email,
                    address,
                    phone,
                    orderID,
                    uid : createdUser.uid,
                    userCreated : new Date().getTime()
                }).then(() => {

                    db.collection("packages").doc(orderID).set({
                        amt : 0,
                        sent : false,
                        paid : false,
                        comfirmed : false,
                        processed : false,
                        ontheWay : false,
                        delivered: false,
                        user : createdUser.uid
                     }).then(() => {

                        dispatch({
                            type: USER_REGISTER,
                            payload : createdUser
                        })

                     })
                })

                

            })
             
            
        }).catch(err => {
            dispatch({
                type: USER_REGISTER,
                payload : err
            })
        })
    }

}




export const loginUser = (email, password) => {


      return dispatch => {
          auth.signInWithEmailAndPassword(email, password)
          .then(res => {
              dispatch({
                  type: USER_LOGIN,
                  payload : res
              })
          }).catch(err => {
              dispatch({
                  type: USER_LOGIN,
                  payload : err
              })
          })
      }

}



export const setUser = user => {
    return dispatch => {
        dispatch({
            type: USER_DATA,
            payload : user
        })
    }
}

export const clearUser = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_USER_DATA
        })
    }
}


export const addProducts = (name, desc, price) => {
    return dispatch => {
        let productID = `product_${Math.random().toString(36).substr(2, 12)}`

        db.collection("products").doc(productID).set({
            productID,
            productName : name,
            productDesc : desc,
            productPrice : parseFloat(price)
        }).then(() => {
            dispatch({
                type: ADD_PRODUCTS,
                payload : {
                    message : 'Success'
                }
            })
        }).catch(err => {
            dispatch({
                type: ADD_PRODUCTS,
                payload : err
            })
        })
    }
}

// export const addChannel = (channelName, channelDetails, user) => {
//     return dispatch => {
//         let channelID = `channel_${Math.random().toString(36).substr(2, 12)}_${Math.random().toString(36).substr(2, 12)}`
//         db.collection("channel").doc(channelID).set({
//             channelID : channelID,
//             channelName : channelName,
//             channelDetails : channelDetails,
//             createdBy : user,
//             createdOn : new Date().getTime(),
//             show : true
//         }).then(() => {
//             dispatch({
//                 type: ADD_CHANNEL,
//                 payload : {
//                     message : 'Success'
//                 }
//             })
//         }).catch(err => {
//             dispatch({
//                 type: ADD_CHANNEL,
//                 payload : err
//             })
//         })
//     }
// }


