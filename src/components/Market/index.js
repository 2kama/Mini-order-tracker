import React, { Component, Fragment } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addingCart } from './../../actions/'
import firebase from './../../Firebase'


import Header from './../Header'
import CartNum from './cartNum'


const firebaseAuth = firebase.auth()
const db = firebase.firestore()

class Market extends Component {

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



    componentWillUnmount() {
        this.listenForProducts()
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
                })
            } else {
                this.setState({user:false, userID:"", orderID:""})
            }
        });


        this.listenForProducts = db.collection('products').onSnapshot((snap) => {
            
            const products = []

            snap.forEach((docSnapshot) => {
              products.push(docSnapshot.data());
            });
            this.setState({ products })

        })


    }


    addToCart = productID => {
        this.props.addingCart(productID, this.state.orderID)
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

        const {error, errorMsg, user, products } = this.state

        return(
            <Fragment>

                {
                    user && (
                        <Header />
                    )
                }
               

                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            {
                                user && (
                                    <a href="/cart">Cart (<CartNum />)</a>
                                )
                            }
                            
                        </div>
                        <div className="col-md-6">
                            {
                                user && (
                                    <h2>Make your order</h2>
                                )
                            }

                            {
                                !user && (
                                    <h2>Login to make orders</h2>
                                )
                            }
                            
                        </div>
                    </div>

                    <div className="row">
                            {error && errorMsg === "Success" && user && (
                                    <div className="alert alert-success col-md-12">
                                        Product added to Cart
                                    </div>
                                )}

                                {error && errorMsg !== "Success" && user && (
                                    <div className="alert alert-danger col-md-12">
                                        <h5>Error</h5>
                                        {errorMsg}
                                    </div>
                                )}
                    </div>

                    <div className="row">
                        {
                                    products.map(products => {
                                        return (
                                            <div key={products.productID} className="col-md-3 col-sm-6 col-12">
                                                <h3>{products.productName}</h3>
                                                <p>Desc : {products.productDesc}</p>
                                                {
                                                    user && (
                                                        <button className="btn btn-success btn-block" onClick={() => this.addToCart(products.productID)}>Add to Cart (${products.productPrice})</button>
                                                    )
                                                    
                                                }
                                            </div>
                                        )
                                        
                                    })
                                }
                    </div>
                </div>
                


            </Fragment>
        )
    }
}




let mapStateToProps = (state) => {
    console.log(state)
    return {
        addCartReport : state.addCartReport
        
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addingCart
    }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Market)