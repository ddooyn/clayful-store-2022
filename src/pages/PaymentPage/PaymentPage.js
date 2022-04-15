import React, { useEffect, useState } from 'react'
import clayful from 'clayful/client-js';

function PaymentPage() {
  const [cart, setCart] = useState({});
  const [paymentMethods, setPaymentMethods] = useState([]);
  useEffect(() => {
    getCartData();
    getPaymentData();
  }, [])

  const getPaymentData = () => {
    const PaymentMethod = clayful.PaymentMethod;
    PaymentMethod.list({}, function(err, result) {
      if (err) {
        console.log(err.code);
        return;
      }
      const data = result.data;
      setPaymentMethods(data);
    });
  }

  const getCartData = () => {
    const Cart = clayful.Cart;
    const options = {
      customer: localStorage.getItem('accessToken'),
    };
    Cart.getForMe({}, options, function(err, result) {
      if (err) {
        console.log(err.code);
      }
      const data = result.data;
      setCart(data.cart);
});
  }

  return (
    <div>PaymentPage</div>
  )
}

export default PaymentPage