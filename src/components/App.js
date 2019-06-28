import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import Login from './Auth/Login'
import Register from './Auth/Register'
import AdminHome from './Admin/'
import Redirect from './Redirect'
import Order from './Order/Orders'

import AddProduct from './AddProducts/AddProduct'
import Market from './Market/'
import Cart from './Cart/Cart'


const App = () => {

        return(
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={Market} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/adminHome" component={AdminHome} />
                        <Route path="/redirect" component={Redirect} />
                        <Route path="/addProduct" component={AddProduct} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/orders" component={Order} />
                    </Switch>
                </div>
            </BrowserRouter>
        )


}

export default App