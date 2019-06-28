import React, { Component, Fragment } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesom'
import firebase from './../../Firebase'
import moment from 'moment'


import Header from './../Header'
//import Package from './Package'


const firebaseAuth = firebase.auth()
const db = firebase.firestore()

class Orders extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userID : "",
            error : false,
            errorMsg : '',
            user : false,
            packages : []
        }
    }




    componentDidMount() {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                
                this.setState({ user : true })

                db.collection("users").doc(user.uid).get().then(doc => {
                    this.setState({
                        userID : user.uid
                    })
                }).then(() => {

                    db.collection('packages').where("sentOrder", ">", 0).where("user", "==", this.state.userID).orderBy("sentOrder", "desc").onSnapshot((snap) => {
            
                        const packages = []
            
                        snap.forEach((docSnapshot) => {
                          packages.push(docSnapshot.data())
                        });
                        this.setState({ packages })
            
                    })

                })
            } else {
                this.setState({user:false, userID:""})
                window.location.href = "/"
            }
        });



            


        


    }



    render() {

        const { user, packages } = this.state

        return(
            <Fragment>

                {
                    user && (
                        <Header />
                    )
                }
               

                <div className="container">
                    <div className="row">
                       

                            

                                {packages.length > 0 && (
                                    packages.map(packages => {
                                        return (
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-12">Order made at {moment(packages.sentOrder).format("YYYY-MM-DD hh:mm:ss")}</div>
                                                    <div className="col-md-12">Order is due {moment(packages.due).format("YYYY-MM-DD hh:mm:ss")}</div>
                                                    {/* <Package packageID={package.orderID} key={package.orderID} /> */}
                                                </div>
                                            </div>
                                            
                                        )
                                        
                                    })
                                )}


                       
                       
                       
                    </div>
                </div>
                


            </Fragment>
        )
    }
}




export default Orders