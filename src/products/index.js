import React, { Component } from 'react';
import { connect } from 'react-redux';
import {data} from '../constants/appConstants';
import './products.css';
class Products extends Component {

    constructor(props) {
        super(props)
        this.addToCart = this.addToCart.bind(this);
    }
    componentDidMount() {
        // Call the Data From DB and Show Loader
        this.props.getAllProducts(data)

    }
    addToCart(item){
        console.log(item.id)
        if(this.props.cart.includes(item.id)){
           
            alert( "Item Already in Cart");
        }
        else{
            alert( "Item Added to Cart");
            this.props.addProducts(item)
        }

    }
    render() {
        if (this.props.products.length == 0)
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
               <button onClick={()=>{this.addToCart(item)}}>Add to Cart</button>
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
            dispatch({ type: 'get_products', info: data })
        },
        addProducts : (data)=>{
            dispatch({ type: 'add' , info : data})
        }
    }
}
export default connect(mapStateToProps, dispatchToProps)(Products);
