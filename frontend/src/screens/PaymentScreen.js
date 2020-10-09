import React, { useState } from 'react';
import { Button, Col, Form, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel as='legend'>Select Method</FormLabel>
          <Row>
            <Col>
              <Form.Check
                type='radio'
                label='Paypal or Credit Card'
                name='paymentMethod'
                id='paypal'
                value='Paypal'
                onChange={(event) => setPaymentMethod(event.target.value)}
                checked
              ></Form.Check>
              {/* <Form.Check
                type='radio'
                label='Stripe'
                name='paymentMethod'
                id='stripe'
                value='Stripe'
                onChange={(event) => setPaymentMethod(event.target.value)}
                checked
              ></Form.Check> */}
            </Col>
          </Row>
        </FormGroup>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
