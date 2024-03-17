"use client"
import { useState } from 'react';
import { addToCart } from '@/store/slices/cartSlices';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
function Cart() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <FontAwesomeIcon icon={faCartShopping} style={{color:"white"}} onClick={handleShow}/>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shoping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Button className='m-5'>AddToCart</Button><Button>ClearCart</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cart;