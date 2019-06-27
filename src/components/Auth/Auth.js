import React from 'react'



import Login from './Login'
import Register from './Register'



const Auth = () => {

    return(
        <React.Fragment>
            <div className="container">
                <div className="row">

                    <div className="text-center col-md-6 col-sm-6 col-12 account-choose">
                        <div className="row">
                            <Login />
                        </div>
                    </div>

                    <div className="text-center col-md-6 col-sm-6 col-12 account-choose">
                        <div className="row">
                            <Register />
                        </div>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )

}


export default Auth