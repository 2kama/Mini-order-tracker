import React, { Component, Fragment } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import firebase from './../../Firebase'


const firebaseAuth = firebase.auth()
const db = firebase.firestore()


class AdminHome extends Component {


    componentDidMount() {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                
                db.collection("users").doc(user.uid).get().then((doc) => {
                    if(doc.data().usertype !== "admin") {
                        window.location.href = '/redirect'
                    }else{}
                })

            } else {
                window.location.href = '/'
            }
        });
    }



    render() {
        return(
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 offset-md-1">
                            <a href="/addProduct" className="btn btn-primary btn-block">Add Products</a>
                        </div>

                        <div className="col-md-4 offset-md-2">
                            <a href="/manageOrder" className="btn btn-primary btn-block">Manage Orders</a>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }


}


export default AdminHome