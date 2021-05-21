import React from 'react';
import { connect } from 'react-redux';
import { filterProducts, orderProducts } from '../actionCreators/productActions';

const Filter = (props) => {
    return (
        !props.filteredProducts 
        ? 'Loading...' :
        <div className="filter">
                <div className="filter-result">{props.filteredProducts.length} Products</div>
            <div className="filter-sort">
                    Order {" "} <select value={props.sort} onChange={(e) => props.sortByPrice(props.filteredProducts, e.target.value)}>
                    <option value="latest">Latest</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                </select>
            </div>
            <div className="filter-size">
                    Filter {" "} <select value={props.size} onChange={(e) => props.filterBySize(props.products, e.target.value)}>
                    <option value="" >ALL</option>
                    <option value="XS" >XS</option>
                    <option value="S" >S</option>
                    <option value="M" >M</option>
                    <option value="L" >L</option>
                    <option value="XL" >XL</option>
                    <option value="XXL" >XXL</option>
                </select>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        selectedSize: state.products.size,
        selectedPrice: state.products.price,
        products: state.products.items,
        filteredProducts: state.products.filteredItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        filterBySize: (products, size) => dispatch(filterProducts(products, size)),
        sortByPrice: (products, price) => dispatch(orderProducts(products, price))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
