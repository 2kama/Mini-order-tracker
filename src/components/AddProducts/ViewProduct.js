import React, { Component, Fragment } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import firebase from './../../Firebase'


const db = firebase.firestore()


class ViewProduct extends Component {

    state = {
        products : []
    }


    componentWillUnmount() {
        this.listenForProducts()
    }



    componentDidMount() {
       
        this.listenForProducts = db.collection('products').onSnapshot((snap) => {
            
            const products = []

            snap.forEach((docSnapshot) => {
              products.push(docSnapshot.data());
            });
            this.setState({ products })

        })

    }



    render() {

        const { products } = this.state
        return(
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">Products in Database</div>
                        <div className="col-md-12">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Product ID</th>
                                        <th>Product Name</th>
                                        <th>Product Desc</th>
                                        <th>Product Price ($)</th>
                                    </tr>
                                </thead>

                                <tbody>
                                {
                                    products.map(products => {
                                        return (
                                            <tr key={products.productID}>
                                                <td>{products.productID}</td>
                                                <td>{products.productName}</td>
                                                <td>{products.productDesc}</td>
                                                <td>{products.productPrice}</td>
                                            </tr>
                                        )
                                        
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
            </Fragment>
        )
    }


    


}


export default ViewProduct