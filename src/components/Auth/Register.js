import React, { Component, Fragment } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { registerUser } from './../../actions/'
import firebase from './../../Firebase'


const firebaseAuth = firebase.auth()

class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username : '',
            email : '',
            password : '',
            phone : '',
            address : '',
            passwordRepeat : '',
            error : false,
            errorMsg : '',
            loading : false,
            user : false
        }
    }


    componentDidMount() {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ user : true })
                window.location.href = '/redirect'
            } else {
              
            }
        });
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.auth) {
            this.setState({
                error: true,
                errorMsg: nextProps.auth.regReport.message,
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

        }else if(!this.isPasswordValid(this.state)) {
            
            this.setState({ loading : false })
            return false

        }else {
            return true
        }

    }


    isFromEmpty = ({ username, email, password, passwordRepeat, address, phone }) => {
        return !username.length || !email.length || !password.length || !passwordRepeat.length || !address.length || !phone.length
    }

    isEmailValid = ({ email }) => {
        let regex = /\S+@\S+\.\S+/

        return regex.test(email)
    }

    isPasswordValid = ({ password, passwordRepeat }) => {
        if(password.length < 8 || passwordRepeat.length < 8) {
            this.setState({ error: true, errorMsg: 'Your password must be atleast 8 characters long' })
            return false
        }else if(password !== passwordRepeat) {
            this.setState({ error: true, errorMsg: `Your passwords do not match` })
            return false
        }else {
            return true
        }
    }


    formSubmit = event => {
        event.preventDefault()
        this.setState({ error: false, loading: true })

        if(this.isFormValid()) {
            this.props.registerUser(this.state.username, this.state.address, this.state.phone, this.state.email, this.state.password)
        }   

    }

    handleError = ( errorMsg, inputName) => {
        if(errorMsg !== undefined) {
            return errorMsg.toLowerCase().includes(inputName) ? "error" : ""
        }
    }


    render() {

        const { username, email, password, passwordRepeat, error, errorMsg, loading, user, address, phone } = this.state

        return(
            <Fragment>


                <form className="col-12" onSubmit={this.formSubmit}>
                    <div className="row">
                        <input className="form-control" name="username" value={username} placeholder="Full Name" onChange={this.handleChange} type="text" />
                    </div>
                    <div className="row">
                        <input className={this.handleError(errorMsg, "email") + " form-control"} name="email" value={email} placeholder="Email Address" onChange={this.handleChange} type="email" />
                    </div>
                    <div className="row">
                        <input className="form-control" name="address" value={address} placeholder="Address" onChange={this.handleChange} type="text" />
                    </div>
                    <div className="row">
                        <input className="form-control" name="phone" value={phone} placeholder="Phone Number" onChange={this.handleChange} type="text" />
                    </div>
                    <div className="row">
                        <input className={this.handleError(errorMsg, "password") + " form-control"} name="password" value={password} placeholder="Password" onChange={this.handleChange} type="password" />
                    </div>
                    <div className="row">
                        <input className={this.handleError(errorMsg, "password") + " form-control"} name="passwordRepeat" value={passwordRepeat} placeholder="Repeat Password" onChange={this.handleChange} type="password" />
                    </div>
                    <div className="row">
                        <button className="btn btn-success btn-block" disabled={loading}>Register</button>
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




let mapStateToProps = state => {
    
    return {
        auth : state.auth
        
    }
}

let mapDispatchToProps = dispatch => {
    return bindActionCreators({
        registerUser
    }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(Register)