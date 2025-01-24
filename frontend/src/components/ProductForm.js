import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import Layout from './Layout';

const ProductForm = () => {
  const [formData, setFormData] = useState({ name: '', description: '', price: '', quantity: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch product data by ID
      axios
        .get(`http://localhost:8080/${id}`)
        .then((response) => {
          if (response.status === 200 && response.data) {
            setFormData({
              name: response.data.name || '',
              description: response.data.description || '',
              price: response.data.price || '',
              quantity: response.data.quantity || '',
            }); // Populate form data
          } else {
            alert(response.data.statusMessage || 'Failed to fetch product details.');
          }
        })
        .catch((error) => {
          console.error(error);  // Logs the error for debugging
          alert('Failed to fetch product details.');
        });
    }
  }, [id]); // Ensure the effect runs only when the id changes

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.name || !formData.description || !formData.price || !formData.quantity) {
      alert('All fields are required.');
      return;
    }

    // Include id for PUT request when editing
    const endpoint = id ? `http://localhost:8080/` : 'http://localhost:8080/';
    const payload = { id, ...formData }; // Include 'id' for PUT request

    const method = id ? 'put' : 'post';

    axios[method](endpoint, payload)
      .then((response) => {
        if (response.status === 200) {
          alert(`${id ? 'Product updated' : 'Product added'} successfully.`);
          navigate('/');
        } else {
          alert(response.data.statusMessage || 'Failed to save product.');
        }
      })
      .catch((error) => {
        console.error(error); // Logs the error for debugging
        alert('Failed to save product.');
      });
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.heading}>{id ? 'Edit' : 'Add'} Product</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={styles.input}
          />
          <label style={styles.label}>Description:</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={styles.input}
          />
          <label style={styles.label}>Price:</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            style={styles.input}
          />
          <label style={styles.label}>Quantity:</label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value, 10) })}
            style={styles.input}
          />
          <button type="submit" style={styles.submitButton}>
            Save
          </button>
        </form>
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
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    alignSelf: 'center',
  },
};

export default ProductForm;
