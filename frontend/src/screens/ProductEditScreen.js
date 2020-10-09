import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  FormControl,
  FormFile,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { listProductDetails, updateProduct } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  return (
    <div>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId='name'>
              <FormLabel>Name</FormLabel>
              <FormControl
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId='price'>
              <FormLabel>Price</FormLabel>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(event) => {
                  setPrice(Number(event.target.value));
                }}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId='image'>
              <FormLabel>Image</FormLabel>
              <FormControl
                type='text'
                placeholder='Enter image'
                value={image}
                onChange={(event) => {
                  setImage(event.target.value);
                }}
              ></FormControl>
              <FormFile
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></FormFile>
              {uploading && <Loader />}
            </FormGroup>
            <FormGroup controlId='brand'>
              <FormLabel>Brand</FormLabel>
              <FormControl
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId='category'>
              <FormLabel>Category</FormLabel>
              <FormControl
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
              ></FormControl>
            </FormGroup>
            <FormGroup controlId='countInStockk'>
              <FormLabel>Count In Stock</FormLabel>
              <Form.Control
                type='number'
                placeholder='Enter count in stock'
                value={countInStock}
                onChange={(event) => {
                  setCountInStock(Number(event.target.value));
                }}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId='description'>
              <FormLabel>Description</FormLabel>
              <FormControl
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              ></FormControl>
            </FormGroup>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default ProductEditScreen;
