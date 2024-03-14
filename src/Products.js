import React, { useState, useEffect } from 'react';
import './App.css';

import App from "./App";

function ProductList() {
    const [productData, setProductData] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [highlightedIndex, setHighlightedIndex] = useState(null);

    useEffect(() => {
        fetch('products.json')
            .then(response => response.json())
            .then(jsonData => {
                setProductData(jsonData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        const productRows = document.querySelectorAll('.product-row');
        productRows.forEach((row) => {
            row.style.display = 'flex';
            row.style.paddingLeft = '10px';
            row.style.paddingRight = '10px';
        });
    }, [productData]);

    useEffect(() => {
        const productCells = document.querySelectorAll('.product-row p');
        productCells.forEach((cell, index) => {
            cell.style.border = '1px solid #FFFFFF';
            cell.style.paddingLeft = '10px';
            cell.style.paddingTop = '10px';
            cell.style.paddingBottom = '10px';
            cell.style.paddingRight = '10px';
            cell.style.margin = '0px';
            cell.style.fontSize = '1vw';
            if (index % 7 === 1 || index % 7 === 4 || index % 7 === 5) {
                cell.style.textAlign = 'right';
            } else {
                cell.style.textAlign = 'left';
            }

            if (Math.floor(index / 7) % 2 === 0) {
                if (highlightedIndex === Math.floor(index / 7)) {
                    cell.style.backgroundColor = '#c6d1e8'; // Lighter blue color for selected row
                } else {
                    cell.style.backgroundColor = '#ffffff';
                }
            } else {
                if (highlightedIndex === Math.floor(index / 7)) {
                    cell.style.backgroundColor = '#c6d1e8';
                } else {
                    cell.style.backgroundColor = '#e0e0e0';
                }
            }
        });
    }, [productData, highlightedIndex]);

    useEffect(() => {
        const headerCells = document.querySelectorAll('h3');
        headerCells.forEach((cell, index) => {
            cell.style.backgroundColor = '#999999';
            cell.style.padding = '10px';
            cell.style.margin = '0px';
            cell.style.border = '1px solid #FFFFFF';
            cell.style.fontSize = '1.7vw';
            if (index === 1 || index === 4 || index === 5) {
                cell.style.textAlign = 'right';
            } else {
                cell.style.textAlign = 'left';
            }
        });
    }, [productData]);

    useEffect(() => {
        const productTable = document.querySelector('.product-table');
        if (productTable) {
            productTable.style.display = 'flex';
            productTable.style.flexDirection = 'column';
        }
    }, [productData]);

    useEffect(() => {
        const headerRow = document.querySelector('.header-row');
        if (headerRow) {
            headerRow.style.display = 'flex';
            headerRow.style.flexDirection = 'row';
            headerRow.style.padding = '10px';
        }
    }, [productData]);

    const handleLearnMoreClick = (item, itemIndex) => {
        setSelectedItem(item);
        setHighlightedIndex(itemIndex);
    };

    return (
        <div className="App">
            <App />
            <h2>Product </h2>
            <div className="header-row">
                <h3 style={{width: `${100 / 3}%`}}>Title</h3>
                <h3 style={{width: `${100 / 7}%`}}>Price</h3>
                <h3 style={{width: `${100 / 7}%`}}>Category</h3>
                <h3 style={{width: `${100 / 7}%`}}>Rating</h3>
                <h3 style={{width: `${100 / 7}%`}}>Inventory</h3>
                <h3 style={{width: `${100 / 7}%`}}>Revenue</h3>
                <h3 style={{width: `${100 / 7}%`}}> </h3>
            </div>
            <div className="product-table">
                {productData ? (
                    productData.map((item, index) => {
                        const itemPrice = item.price.toFixed(2);
                        const itemRating = item.rating.rate;
                        const itemInventory = item.inventory.toLocaleString();

                        return (
                            <div
                                key={item.id}
                                className={`product-row ${highlightedIndex === index ? 'selected' : ''}`}
                            >
                                <p style={{width: `${100 / 3}%`}}>{item.title}</p>
                                <p style={{width: `${100 / 7}%`}}>{itemPrice}</p>
                                <p style={{width: `${100 / 7}%`}}>{item.category}</p>
                                <p style={{width: `${100 / 7}%`}}>{itemRating}</p>
                                <p style={{width: `${100 / 7}%`}}>{itemInventory}</p>
                                <p style={{width: `${100 / 7}%`}}>
                                    {(item.price * item.inventory).toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </p>
                                <p style={{width: `${100 / 7}%`}}>
                                    <button
                                        type="button"
                                        style={{fontSize: '1vw'}}
                                        onClick={() => handleLearnMoreClick(item, index)}
                                    >
                                        Learn More
                                    </button>
                                </p>
                            </div>
                        );
                    })
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default ProductList;