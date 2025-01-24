// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css'; // Styles for the layout

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="layout-header">
        <h1>Product Management System</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products/new" style={{ marginLeft: '10px' }}>Add Product</Link>
        </nav>
      </header>
      <main className="layout-content">{children}</main>
      <footer className="layout-footer">
        <p>&copy; 2025 BigBasket. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
    searchBarContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: '20px',
      gap: '10px',
    },
    searchInput: {
      padding: '8px',
      fontSize: '14px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      flex: '1',
    },
    searchButton: {
      padding: '8px 16px',
      fontSize: '14px',
      color: 'white',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    searchButtonHover: {
      backgroundColor: '#0056b3',
    },
    productCard: {
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '16px',
      marginBottom: '10px',
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '10px',
    },
    editButton: {
      padding: '8px 16px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      textDecoration: 'none',
      textAlign: 'center',
      cursor: 'pointer',
    },
    deleteButton: {
      padding: '8px 16px',
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };



export default Layout;
