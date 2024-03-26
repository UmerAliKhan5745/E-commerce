"use client"
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTrash } from '@fortawesome/free-solid-svg-icons';
import { clearCart, removeItem } from '@/app/features/cart/cartSlice'; // Import the clearCart and removeItem actions

function Cart() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const cartItems = useSelector((state:any) => state.cart.items);
  const Id = cartItems[0]?._id;
    const dispatch = useDispatch();

  // Function to handle clearing the cart
  const handleClearCart = () => {
    dispatch(clearCart()); // Dispatch the clearCart action
    handleClose(); // Close the Offcanvas after clearing the cart
  };

  // Function to handle removing an item from the cart
  const handleRemoveItem = (Id:number) => {
    dispatch(removeItem(Id)); // Dispatch the removeItem action with the itemId
  };

  return (
    <>
      <FontAwesomeIcon icon={faCartShopping} style={{ color: "white" }} onClick={handleShow} />
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <ul>
  {cartItems.map((item) => (
    <li key={Id}> 
      <div>{item.name}</div>
      <div>{item.price}</div>
      <Button variant="danger" size="sm" onClick={() => handleRemoveItem(Id)}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </li>
  ))}
</ul>

          {cartItems.length === 0 && <p>Your cart is empty.</p>}
          {cartItems.length > 0 && (
            <Button variant="danger" onClick={handleClearCart}>
              <FontAwesomeIcon icon={faTrash} /> Clear Cart
            </Button>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cart;
