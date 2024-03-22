"use client"

import { useState } from 'react';
import type { RootState } from '../../../../store'; // Assuming RootState is defined in ../../../../store
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../../features/counter/counterSlice';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <Button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <span>{count}</span>
        <Button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
      </div>
    </div>
  );
}

function Cart() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <FontAwesomeIcon icon={faCartShopping} style={{color:"white"}} onClick={handleShow}/>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title> {/* Fixed title */}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Counter /> {/* Render Counter component here */}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cart;
