import React, { useState, useEffect } from 'react';
import './App.css';
import App from "./App";
import useProductPrice from "./useProductPrice";


function CustomerAnalytics() {
    const [customers, setCustomers] = useState([]);
    const getProductPrice = useProductPrice();


    const [highlightedIndex] = useState(null);

    useEffect(() => {
        fetch('customers.json')
            .then(response => response.json())
            .then(jsonData => {
                setCustomers(jsonData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


        useEffect(() => {
        const headerRow = document.querySelector('.header-row');
        if (headerRow) {
            headerRow.style.display = 'flex';
            headerRow.style.flexDirection = 'row';
            headerRow.style.padding = '10px';
        }
    }, [customers]);
        useEffect(() => {
        const customerRows = document.querySelectorAll('.customer-row');
        customerRows.forEach((row) => {
            row.style.display = 'flex';
            row.style.paddingLeft = '10px';
            row.style.paddingRight = '10px';
        });
    }, [customers]);

    useEffect(() => {
        const customerCells = document.querySelectorAll('.customer-row p');
        customerCells.forEach((cell, index) => {
            cell.style.border = '1px solid #FFFFFF';
            cell.style.paddingLeft = '10px';
            cell.style.paddingTop = '10px';
            cell.style.paddingBottom = '10px';
            cell.style.paddingRight = '10px';
            cell.style.margin = '0px';
            cell.style.fontSize = '1vw';
            if (index % 5 === 3) {
                cell.style.textAlign = 'right';
            } else {
                cell.style.textAlign = 'left';
            }
            if (Math.floor(index / 5) % 2 === 0) {
                if (highlightedIndex === Math.floor(index / 5)) {
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
    }, [customers,highlightedIndex]);


    useEffect(() => {
        const headerCells = document.querySelectorAll('h3');
        headerCells.forEach((cell, index) => {
            cell.style.backgroundColor = '#999999';
            cell.style.padding = '10px';
            cell.style.margin = '0px';
            cell.style.border = '1px solid #FFFFFF';
            cell.style.fontSize = '1.7vw';
            if (index ==3) {
                cell.style.textAlign = 'right';
            } else {
                cell.style.textAlign = 'left';
            }
        });
    }, [customers]);

        useEffect(() => {
        const customerTable = document.querySelector('.customer-table');
        if (customerTable) {
            customerTable.style.display = 'flex';
            customerTable.style.flexDirection = 'column';
        }
    }, [customers]);

    return (
        <div className="App">
            <App />
            <div className="CustomerAnalytics">
                <h2>Customer Analytics</h2>
                <div className="header-row">
                    <h3 style={{width: `${100 / 5}%`}}>Name</h3>
                    <h3 style={{width: `${100 / 3}%`}}>Address</h3>
                    <h3 style={{width: `${100 / 4}%`}}>Email</h3>
                    <h3 style={{width: `${100 / 5}%`}}>Revenue</h3>
                    <h3 style={{textAlign: "center", width: `${100 / 10}%`}}></h3>
                </div>
                <div className="customer-table">
                    {customers ? (
                        customers.map((customer,index) =>{
                            return (
                                <div
                                    className={`customer-row ${highlightedIndex === index ? 'selected' : ''}`}
                                    key={customer.login.uuid}
                                >
                                    <p style={{width: `${100 / 5}%`}}>{customer.name.first} {customer.name.last}</p>
                                    <p style={{width: `${100 / 3}%`}}>{customer.location.street.number} {customer.location.street.name}, {customer.location.city}, {customer.location.country}, {customer.location.postcode}</p>
                                    <p style={{width: `${100 / 4}%`}}>{customer.email}</p>
                                    <p style={{width: `${100 / 5}%`, textAlign: 'right'}}>
                                        {customer.purchases.reduce((total, purchase) => {
                                            return total + (purchase.quantity * getProductPrice(purchase.productID));
                                        }, 0).toFixed(2)}
                                    </p>
                                    <p style={{width: `${100 / 10}%`}}>
                                        <img src={customer.picture.thumbnail} alt="Customer Thumbnail"
                                             style={{width: '50px', height: '50px', justifyContent: 'center', alignItems: 'center'}}/>
                                    </p>
                                </div>
                            );
                        })
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}


export default CustomerAnalytics;
