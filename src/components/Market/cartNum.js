import React, { Component, Fragment } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBuilding } from '@fortawesome/free-solid-svg-icons'

import firebase from './../../Firebase'




const firebaseAuth = firebase.auth()
const db = firebase.firestore()

class CartNum extends Component {

    constructor(props) {
        super(props)

        this.state = {
            
            cart : 0
        }
    }



    componentWillUnmount() {
        this.listenForCart()
    }


    componentDidMount() {
        this.listenForCart = firebaseAuth.onAuthStateChanged(user => {
            if (user) {

                db.collection("users").doc(user.uid).get().then((sap) => {
                
    
                    db.collection("orders").where("orderID", "==", sap.data().orderID).get().then((snap) => {
                        
                           this.setState({
                               cart : snap.size
                           })
    
                    });
    
                })

            } else {
              
            }
        });
            
    }


    render() {
        return(
            <Fragment>
                {this.state.cart}
            </Fragment>
        )
    }




}


export default CartNum