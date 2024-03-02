"use client"
import { useState } from 'react';
import { addToCart } from '@/store/slices/cartSlices';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useDispatch ,useSelector} from "react-redux";
function Cart() {
  const dispatch=useDispatch()
  const count = useSelector((state) => state.cart.value)

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
         <div className='mx-5'>{count}</div> 
        <Button className='m-5'onClick={()=>dispatch(addToCart())}>AddToCart</Button><Button>ClearCart</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cart;