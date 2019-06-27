import firebase from './../Firebase'
import { USER_LOGIN, USER_REGISTER, USER_DATA, CLEAR_USER_DATA, ADD_PRODUCTS, ADD_TO_CART } from './types'


const db = firebase.firestore()
const auth = firebase.auth()


export const registerUser = (username, address, phone, email, password) => {

   

    return dispatch => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(createdUser => {


                let orderID = `order_${Math.random().toString(36).substr(2, 12)}`

                db.collection("packages").doc(orderID).set({
                    amt : 0,
                    sent : false,
                    paid : false,
                    comfirmed : false,
                    processed : false,
                    ontheWay : false,
                    delivered: false,
                    user : createdUser.user.uid
                 })

                db.collection("users").doc(createdUser.user.uid).set({
                    username,
                    usertype : "customer",
                    email,
                    address,
                    phone,
                    orderID,
                    uid : createdUser.user.uid,
                    userCreated : new Date().getTime()
                }).then(() => {

                        dispatch({
                            type: USER_REGISTER,
                            payload : createdUser.user
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


export const addingCart = (productID, orderID) => {
    return dispatch => {

        db.collection("orders").where("productID", "==", productID).where("orderID", "==", orderID).get().then(find => {

            if(find.size === 0) {

                let orderItem = `orderItem_${Math.random().toString(36).substr(2,12)}`

                db.collection("orders").doc(orderItem).set({
                    productID,
                    orderID,
                    quantity : 1
                }).then(() => {
                    dispatch({
                        type: ADD_TO_CART,
                        payload : {
                            message : "Success"
                        }
                    })
                })

            }else {
                dispatch({
                    type: ADD_TO_CART,
                    payload : {
                        message : "Success"
                    }
                })
            }

        }).catch(err => {
            dispatch({
                type: ADD_TO_CART,
                payload : err
            })
        })

        
    }
}


