import React, { Component, Fragment } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import firebase from '../../Firebase'


const db = firebase.firestore()

class OrderItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            orderID : this.props.product.orderID,
            productID : this.props.product.productID,
            orderItem : this.props.product.orderItem,
            quantity : this.props.product.quantity,
            error : false,
            errorMsg : '',
            productPrice : 0,
            productName : ""
        }
    }


    componentWillUnmount() {
        this.work()
    }

    componentDidMount() {
        
        this.work = db.collection("products").doc(this.state.productID).onSnapshot(sap => {
            this.setState({
                productPrice : sap.data().productPrice,
                productName : sap.data().productName
            })
        })


    }


   


    updateQty = event => {

        this.setState({quantity : event.target.value})

        if(event.target.value >= 1) {
            db.collection("orders").doc(this.state.orderItem).update({
                quantity : event.target.value
            })
        }else {
            this.removeProduct()
        }

        
    }

    removeProduct = () => {
        db.collection("orders").doc(this.state.orderItem).delete()
    }



    render() {

        const {productName, productPrice, quantity } = this.state

        return(
            <Fragment>


                <tr>
                    <td>{productName}</td>
                    <td>${productPrice}</td>
                    <td><input className="form-control newQty" type="number" min="0" value={quantity} onChange={event => this.updateQty(event)} /></td>
                    <td>${(quantity * productPrice).toFixed(2)}</td>
                    <td>
                        <button className="btn btn-small btn-danger" onClick={() => this.removeProduct()}>Remove</button>
                    </td>
                </tr>
                


            </Fragment>
        )
    }
}





export default OrderItem