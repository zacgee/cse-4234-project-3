import { useState, useEffect } from 'react';

function useProductPrice(productId) {
    const [productData, setProductData] = useState(null);

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

    const getProductPrice = (productId) => {
        const product = productData.find(product => product.id === productId);
        return product ? product.price : 0;
    };

    return getProductPrice;
}

export default useProductPrice;
