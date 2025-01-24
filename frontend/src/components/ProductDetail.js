import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import Layout from './Layout';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch product details based on product ID
  useEffect(() => {
    axios
      .get(`http://localhost:8080/${id}`)
      .then((response) => {
        if (response.status === 200 && response.data) {
          const { id, name, description, price, quantity } = response.data;
          setProduct({ id, name, description, price, quantity });
          setError('');
        } else {
          setError(response.data.statusMessage || 'Failed to fetch product details.');
        }
      })
      .catch(() => setError('Failed to fetch product details. Please try again later.'));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios
        .delete(`http://localhost:8080?id=${id}`)
        .then((response) => {
          if (response.data.statusCode === 200) {
            alert('Product deleted successfully.');
            navigate('/');
          } else {
            alert(response.data.statusMessage || 'Failed to delete product.');
          }
        })
        .catch(() => alert('Failed to delete product. Please try again later.'));
    }
  };

  if (error) {
    return (
      <Layout>
        <p style={{ color: 'red' }}>{error}</p>
      </Layout>
    );
  }

  if (!product.name) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.heading}>{product.name}</h1>
        <p style={styles.description}>{product.description}</p>
        <p style={styles.info}>
          <strong>Price:</strong> ${product.price}
        </p>
        <p style={styles.info}>
          <strong>Quantity:</strong> {product.quantity}
        </p>
        <div style={styles.buttonContainer}>
          <Link
            to={`/products/${id}/edit`}
            state={product} // Pass current product details to edit page
            style={styles.editButton}
          >
            Edit
          </Link>
          <button onClick={handleDelete} style={styles.deleteButton}>
            Delete
          </button>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '15px',
    color: '#333',
  },
  description: {
    fontSize: '16px',
    marginBottom: '10px',
    color: '#555',
  },
  info: {
    fontSize: '14px',
    marginBottom: '10px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
  },
  editButton: {
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    textDecoration: 'none',
    textAlign: 'center',
  },
  deleteButton: {
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ProductDetail;
