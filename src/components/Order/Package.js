import React, { Component, Fragment } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import firebase from '../../Firebase'


const db = firebase.firestore()

class Package extends Component {

    constructor(props) {
        super(props)

        this.state = {
            orderID : this.props.package,
            error : false,
            errorMsg : '',
            orders = []
        }
    }


    componentWillUnmount() {
        this.work()
    }

    componentDidMount() {
        
        this.work = db.collection("orders").where("orderID", "==", this.state.orderID).onSnapshot(sap => {
            const orders = []
            
                        snap.forEach((docSnapshot) => {
                          orders.push(docSnapshot.data());
                        });
                        this.setState({ orders })
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


                    <div className="col-md-12">
                        <div className="row">
                            
                        </div>
                    </div>
                


            </Fragment>
        )
    }
}





export default Package