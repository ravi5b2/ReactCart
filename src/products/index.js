import React, { Component } from 'react';
import { connect } from 'react-redux';
import {data} from '../constants/appConstants';
import './products.css';
import actions from '../store/actions';
import * as create from '../store/actionCreator';
class Products extends Component {

    constructor(props) {
        super(props)
        this.addToCart = this.addToCart.bind(this);
        this.goToCart = this.goToCart.bind(this);
    }
    componentDidMount() {
        // Call the Data From DB and Show Loader
        this.props.getAllProducts(data)

    }
    addToCart(item){
            this.props.addProducts(item)

    }
    goToCart(){
        this.props.history.push('/cart')
    }
    render() {
        if (this.props.products.length === 0)
            return <div> No Products to Display</div>
        else {
            return (
                <div className="product-list">
                     {
             this.props.products.map((item) => (
             <div key={item.id} className="card" >
               <img src={item.logo} alt="Image Not Found" className="image" />
               <h1>{item.name}</h1>
               <p className="price">{item.price}</p>
               {this.props.cart.includes(item.id)?
               <button onClick={()=>{this.goToCart(item)}}>Go to Cart</button>:
               <button onClick={()=>{this.addToCart(item)}}>Add to Cart</button>
            }
                <div></div>
            </div> 
            ))
   
        }
                </div>
            );
        }
    }
}
const mapStateToProps = (state) => {

    return {
        appName: state.appName,
        products: state.products,
        cart :state.cart
    }
}

const dispatchToProps = (dispatch) => {
    return {
        getAllProducts: () => {
            dispatch({ type: actions.GET_ALL_PRODUCTS, info: data })
        },
        addProducts : (data)=>{
            dispatch(create.add(data))
        }
    }
}
export default connect(mapStateToProps, dispatchToProps)(Products);
