import React, { Component, Fragment } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import firebase from '../../Firebase'


const db = firebase.firestore()

class Package extends Component {

    constructor(props) {
        super(props)

        this.state = {
            orderID : this.props.packageID,
            error : false,
            errorMsg : '',
            orders : []
        }
    }


    componentWillUnmount() {
        this.work()
    }

    componentDidMount() {
        
        this.work = db.collection("orders").where("orderID", "==", this.state.orderID).onSnapshot(sap => {
            const orders = []
            
                        sap.forEach((docSnapshot) => {
                          orders.push(docSnapshot.data())
                        });
                        this.setState({ orders })
        })


    }



    getProductName = productID => {
        db.collection("products").doc(productID).get().then((doc) => {
            return doc.data().productName
        })
    }
   


    render() {

        const { orders } = this.state

        return(
            <Fragment>
                    <div className="col-md-12">

                                {orders.length > 0 && (
                                    orders.map(orders => {
                                        return (
                                            
                                                <div className="col-md-12" key={orders.orderItem}>
                                                     {this.getProductName(orders.productID)} => {orders.quantity}
                                                </div>
                                           
                                            
                                        )
                                        
                                    })
                                )}
                
                </div>

            </Fragment>
        )
    }
}





export default Package