import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import Layout from './Layout';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/')
      .then((response) => setProducts(response.data))
      .catch(() => alert('Failed to fetch products.'));
  }, []);

  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`/?id=${id}`)
        .then(() => setProducts((prev) => prev.filter((product) => product.id !== id)))
        .catch(() => alert('Failed to delete product.'));
    }
  };

  const handleSearch = () => {
    axios.get(`/product?name=${search}`)
      .then((response) => setProducts(response.data))
      .catch(() => alert('Failed to search products.'));
  };

  return (
    <Layout>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <input
            type="text"
            value={search}
            placeholder="Search products..."
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '300px',
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        </div>
      </div>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Product List</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((product) => (
          <li
            key={product.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '5px',
              padding: '15px',
              marginBottom: '15px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.quantity}</p>
              </div>
              <div>
                <Link
                  to={`/products/${product.id}/edit`}
                  style={{
                    textDecoration: 'none',
                    color: '#fff',
                    backgroundColor: '#28a745',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    marginRight: '10px',
                  }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(product.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default ProductList;
