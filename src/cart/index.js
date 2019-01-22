import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions';
class Cart extends Component {
    constructor(props){
        super(props)
        this.remove = this.remove.bind(this);
    }
    remove(id){
        this.props.removeFromCart(id)
    }
    render() {
        if (this.props.userCart.length === 0) {
            return (<div className="product-list"> Your Cart is Empty</div>)
        }
        return (
            <div >
            <div className="product-list">                {
                    this.props.userCart.map((item) => (
                        <div key={item.id} className="card" >
                            <img src={item.logo} alt="Image Not Found" className="image" />
                            <h1>{item.name}</h1>
                            <p className="price">{item.price}</p>
                            <button onClick={() => { this.remove(item.id) }}>Remove</button>
                            
                        </div>
                        
                    ))

                }
            </div>
            <div className="order-row">
                <button className="order-button"> Place Order </button >
            </div>
            </div>
           
        );
    }
}
const mapStateToProps = (state) => {

    return {
        appName: state.appName,
        cart: state.cart,
        userCart : state.userCart
    }
}

const dispatchToProps = (dispatch) => {

    return {
        removeFromCart: (id) => {
            dispatch({ type: actions.DELETE, info : id})
        }
    }
}
export default connect(mapStateToProps, dispatchToProps)(Cart);

