import React, { Component, Fragment } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import firebase from './../Firebase'


const firebaseAuth = firebase.auth()
const db = firebase.firestore()


class Redirect extends Component {


    componentDidMount() {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {

                //firebaseAuth.signOut()
                db.collection("users").doc(user.uid).get().then((doc) => {
                    if(doc.data().usertype === "admin") {
                        window.location.href = '/adminHome'
                    }else if(doc.data().usertype === "customer"){
                        window.location.href = '/'
                    }else {
                        window.location.href = '/delivery'
                    }
                })

            } else {
                window.location.href = '/'
            }
        });
    }



    render() {
        return(
            <Fragment>
                Redirecting...
            </Fragment>
        )
    }


}


export default Redirect