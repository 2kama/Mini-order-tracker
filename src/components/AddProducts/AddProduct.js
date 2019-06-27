import React, { Component, Fragment } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addProducts } from './../../actions/'
import firebase from './../../Firebase'

import ViewProduct from './ViewProduct'
import Header from './../Header'


const db = firebase.firestore()
const firebaseAuth = firebase.auth()

class addProduct extends Component {

    constructor(props) {
        super(props)

        this.state = {
            error : false,
            errorMsg : '',
            loading : false,
            user : false,
            productDesc : '',
            productName : '',
            productPrice : 0
        }
    }


    componentDidMount() {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                
                this.setState({user : true})

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


    componentWillReceiveProps(nextProps) {
        if (nextProps.addProductReport) {
            this.setState({
                error: true,
                errorMsg: nextProps.addProductReport.addProductReport.message,
                loading: false
            });
        }
    }


    handleChange = event => {
        this.setState({ [event.target.name] : event.target.value })
    }

    isFormValid = () => {
        
        if(this.isFromEmpty(this.state)) {

            this.setState({ error : true, errorMsg : 'Fill in all fields', loading : false })
            return false

        }else {
            return true
        }

    }


    isFromEmpty = ({ productDesc, productName, productPrice }) => {
        return !productDesc.length || !productName.length || productPrice <= 0
    }


    formSubmit = event => {
        event.preventDefault()
        this.setState({ error: false, loading: true })

        if(this.isFormValid()) {
            this.props.addProducts(this.state.productName, this.state.productDesc, this.state.productPrice)
        }   

    }



    render() {

        const {error, errorMsg, loading, productDesc, productName, productPrice, user } = this.state

        return(
            <Fragment>
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2">

                            <form className="col-12" onSubmit={this.formSubmit}>
                                <div className="row">
                                    <input className="form-control" name="productName" value={productName} placeholder="Product Name" onChange={this.handleChange} type="text" />
                                </div>
                                <div className="row">
                                    <input className="form-control" name="productPrice" value={productPrice} placeholder="Product Price" onChange={this.handleChange} type="number" />
                                </div>
                                <div className="row">
                                    <textarea className="form-control" name="productDesc" value={productDesc} placeholder="Product Description" onChange={this.handleChange}></textarea>
                                </div>
                                <div className="row">
                                    <button className="btn btn-success btn-block" disabled={loading}>Add Product</button>
                                </div>

                                {error && errorMsg === "Success" && user && (
                                    <div className="alert alert-success col-md-12">
                                        <h5>{errorMsg}</h5>
                                        Product has been successfully added
                                    </div>
                                )}

                                {error && errorMsg !== "Success" && user && (
                                    <div className="alert alert-danger col-md-12">
                                        <h5>Error</h5>
                                        {errorMsg}
                                    </div>
                                )}


                            </form>

                        </div>
                    </div>
                </div>


                <ViewProduct />



            </Fragment>
        )
    }
}




let mapStateToProps = (state) => {
    console.log(state)
    return {
        addProductReport : state.addProductReport
        
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addProducts
    }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(addProduct)