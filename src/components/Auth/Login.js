import React, { Component, Fragment } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loginUser } from './../../actions/'
import firebase from './../../Firebase'


const firebaseAuth = firebase.auth()

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email : '',
            password : '',
            error : false,
            errorMsg : '',
            loading : false,
            user : false
        }
    }


    componentDidMount() {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                window.location.href = '/redirect'
                this.setState({ user : true })
            } else {
              
            }
        });
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.auth) {
            this.setState({
                error: true,
                errorMsg: nextProps.auth.logReport.message,
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

        }else if(!this.isEmailValid(this.state)) {
            
            this.setState({ error: true, errorMsg: 'Please input a valid Email Address', laoding : false })
            return false

        }else {
            return true
        }

    }


    isFromEmpty = ({ email, password }) => {
        return !email.length || !password.length
    }

    isEmailValid = ({ email }) => {
        let regex = /\S+@\S+\.\S+/

        return regex.test(email)
    }


    formSubmit = event => {
        event.preventDefault()
        this.setState({ error: false, loading: true })

        if(this.isFormValid()) {
            this.props.loginUser(this.state.email, this.state.password)
        }   

    }

    handleError = ( errorMsg, inputName) => {
        if(errorMsg !== undefined) {
            return errorMsg.toLowerCase().includes(inputName) ? "is-invalid" : ""
        }
    }


    render() {

        const { email, password, error, errorMsg, loading, user } = this.state

        return(
            <Fragment>

                <form className="col-12" onSubmit={this.formSubmit}>
                    <div className="row">
                        <input className={this.handleError(errorMsg, "email") + " form-control"} name="email" value={email} placeholder="Email Address" onChange={this.handleChange} type="email" />
                    </div>
                    <div className="row">
                        <input className={this.handleError(errorMsg, "password") + " form-control"} name="password" value={password} placeholder="Password" onChange={this.handleChange} type="password" />
                    </div>
                    <div className="row">
                        <button className="btn btn-success btn-block" disabled={loading}>Login</button>
                    </div>

                    {error && !user && (
                        <div className="alert alert-danger col-md-12">
                            <h5>Error</h5>
                            {errorMsg}
                        </div>
                    ) }
                </form>



            </Fragment>
        )
    }
}




let mapStateToProps = (state) => {
    
    return {
        auth : state.auth
        
    }
}

let mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loginUser
    }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Login)