import React, { Component, Fragment } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  } from './../../actions/'
import firebase from './../../Firebase'


import Header from './../Header'
import OrderItem from './OrderItem'
import BuyButton from './BuyButton'


const firebaseAuth = firebase.auth()
const db = firebase.firestore()

class Cart extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userID : "",
            orderID : "",
            error : false,
            errorMsg : '',
            user : false,
            products : []
        }
    }




    componentDidMount() {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                
                this.setState({ user : true })

                db.collection("users").doc(user.uid).get().then(doc => {
                    this.setState({
                        userID : user.uid,
                        orderID : doc.data().orderID
                    })
                }).then(() => {

                    db.collection('orders').where("orderID", "==", this.state.orderID).onSnapshot((snap) => {
            
                        const products = []
            
                        snap.forEach((docSnapshot) => {
                          products.push(docSnapshot.data());
                        });
                        this.setState({ products })
            
                    })

                })
            } else {
                this.setState({user:false, userID:"", orderID:""})
            }
        });



            


        


    }


   


    componentWillReceiveProps(nextProps) {
        if (nextProps.addCartReport) {
            this.setState({
                error: true,
                errorMsg: nextProps.addCartReport.addCartReport.message,
                loading: false
            });
        }
    }



    render() {

        const {user, products, orderID, userID } = this.state

        return(
            <Fragment>

                {
                    user && (
                        <Header />
                    )
                }
               

                <div className="container">
                    <div className="row">
                       <div className="col-md-12">

                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price per Unit</th>
                                        <th>Units</th>
                                        <th>Total Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                {products.length > 0 && (
                                    products.map(product => {
                                        return (
                                            <OrderItem product={product} key={product.orderItem} />
                                        )
                                        
                                    })
                                )}

                                </tbody>
                            </table>

                       </div>
                       {
                           orderID !== "" && userID !== "" && (
                            <BuyButton orderID={orderID} userID={userID} />
                           )
                       }
                       
                    </div>
                </div>
                


            </Fragment>
        )
    }
}




let mapStateToProps = (state) => {
    
    return {
        
        
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        
    }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Cart)