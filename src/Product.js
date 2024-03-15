import React from 'react';
import './Product.css';

function Product({ selectedItem, handleCloseDetailView }) {
    if (!selectedItem) {
        return null; // Don't render if selectedItem is null
    }

    const { title, price, category, rating, inventory, image } = selectedItem;

    return (
        <div className="Product">
            <button onClick={handleCloseDetailView}>X</button>
            <div className="ProductContent">
                <img src={image} alt={title} />
                <p>{title}</p>
                <h4>${price.toFixed(2)}</h4>
                <p><strong>Category:</strong> {category}</p>
                <p><strong>Rating:</strong> {rating.rate}</p>
                <p><strong>In Stock:</strong> {inventory}</p>
            </div>
        </div>
    );
}

export default Product;
