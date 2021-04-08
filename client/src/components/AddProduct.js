import React, { useState } from 'react';
import { Container, Form, Button, Toast } from 'react-bootstrap';
import axios from 'axios';
const URL = 'http://localhost:3001/api/create';
const categoryOptions = ['greens', 'meat', 'fish'];
const initialState = {
  name: '',
  category: '',
  price: '',
};

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState(initialState);
  const [showToast, setShowToast] = useState(false);
  const handleChanges = (e) => {
    e.preventDefault();
    const key = e.target.id;
    const value = e.target.value;
    setNewProduct({ ...newProduct, [key]: value });
  };
  const formHandler = (e) => {
    e.preventDefault();
    axios
      .post(URL, newProduct)
      .then(() => setShowToast(true))
      .catch((e) => console.log(e));
    e.target.reset();
  };
  return (
    <Container>
      <Form.Text as="h1">Add New Product</Form.Text>
      <Form onSubmit={formHandler}>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          <Toast.Body>
            <strong className="mr-auto">New product added!</strong>
          </Toast.Body>
        </Toast>
        <Form.Group controlId="name">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            onChange={handleChanges}
            required
            type="text"
            placeholder="Enter your product name..."
          />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control onChange={handleChanges} required as="select">
            <option value={''} hidden>
              Please select a category
            </option>
            {categoryOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            onChange={handleChanges}
            min="0"
            step="1"
            type="number"
            required
            placeholder="Enter your product price..."
          />
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          Add New Product
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
