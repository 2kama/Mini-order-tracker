import React, { Component, Fragment } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import firebase from '../../Firebase'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sendOrder } from './../../actions/'


const db = firebase.firestore()

class BuyButton extends Component {

    constructor(props) {
        super(props)

        this.state = {
            orderID : this.props.orderID,
            amount : 0,
            userID : this.props.userID
        }
    }


    componentWillUnmount() {
        this.work()
    }

    componentDidMount() {
        
        this.work = db.collection("orders").where("orderID", "==", this.state.orderID).onSnapshot(sap => {
            this.setState({amount : 0})

            sap.forEach(doc => {
                db.collection("products").doc(doc.data().productID).get().then(snap => {

                    let plusamt = doc.data().quantity * snap.data().productPrice

                    this.setState({
                        amount : this.state.amount + plusamt
                    })

                })
            })
        })


    }


   sendOrder = () => {
      this.props.sendOrder(this.state.userID, this.state.orderID, this.state.amount)
   }



    render() {

        const {amount } = this.state

        return(
            <Fragment>

                <div className="col-md-12 text-center">
                    {
                        amount > 0 && (
                            <button className="btn btn-success btn-block" onClick={() => this.sendOrder()}>Pay ${amount.toFixed(2)}</button>
                        )
                    }

                    {
                        amount === 0 && (
                            <p>You have nothing in your cart</p>
                        )
                    }
                    
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
        sendOrder
    }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(BuyButton)