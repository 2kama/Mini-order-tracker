import React, { Component, Fragment } from 'react'
import firebase from './../Firebase'


const firebaseAuth = firebase.auth()
const db = firebase.firestore()

class Header extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user : false,
            name : "",
            type : ""
        }
    }


    componentDidMount() {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ user : true })

                db.collection("users").doc(user.uid).get().then((doc) => {
                    this.setState({
                        name : doc.data().username,
                        type : doc.data().usertype
                    })
                })
            } else {
              
            }
        });
    }


    logout() {
        firebaseAuth.signOut()
    }




    render() {


        return(
            <Fragment>

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="javascript:;">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    
                    </ul>
                    <ul className="navbar-nav my-2 my-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="javascript:;">{this.state.name} ({this.state.type})</a>
                        </li>
                        <li className="nav-item">
                        {
                            this.state.user && (
                                <button className="btn btn-danger" onClick={this.logout}>Logout</button>
                            )
                        }
                        </li>
                    </ul>
                </div>
                </nav>

                


            </Fragment>
        )
    }
}




export default Header