import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clayful from "clayful/client-js";
import CartItem from "./Sections/CartItem";
import "./CartPage.scss";

function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  
  const Cart = clayful.Cart;
  const options = {
    customer: localStorage.getItem("accessToken"),
  };
  
  useEffect(() => {
    Cart.getForMe({}, options, function (err, result) {
      if (err) {
        console.log(err.code);
        return;
      }
      const data = result.data;
      setCart(data.cart);
    });
  }, []);

  const updateItemData = (itemId, quantity) => {
    const payload = {
      quantity
    };

    Cart.updateItemForMe(itemId, payload, options, function(err, result) {
      if (err) {
        console.log(err.code);
        return;
      }
    });
  }

  const buttonHandler = (type, index) => {
    let newCart = { ...cart };
    const price = newCart.items[index].price.original.raw / newCart.items[index].quantity.raw;

    if (type === "plus") {
      // 해당 아이템 가격 변경
      newCart.items[index].price.original.raw += price;
      // 전체 아이템 가격 변경
      newCart.total.amount.raw += price;
      // 해당 아이템 개수 변경
      newCart.items[index].quantity.raw += 1;
    } else {
      if (newCart.items[index].quantity.raw === 1) return;
      newCart.items[index].price.original.raw -= price;
      newCart.total.amount.raw -= price;
      newCart.items[index].quantity.raw -= 1;
    }

    updateItemData(newCart.items[index]._id, newCart.items[index].quantity.raw);
    setCart(newCart);
  };

  const removeItemFromState = (itemId, price) => {
    const newCart = {...cart};
    const filteredItems = newCart.items.filter(item => item._id !== itemId);
    newCart.items = filteredItems;
    newCart.total.amount.raw = newCart.total.amount.raw - price;
    setCart(newCart);
  }

  const deleteItemHandler = (itemId, price) => {
    Cart.deleteItemForMe(itemId, options, function(err, result) {
      if (err) {
        console.log(err.code);
        return;
      }
      removeItemFromState(itemId, price);
    });
  }

  const items = cart.items;

  return (
    <div className="page-wrapper">
      <div className="shopping-cart">
        <h1 className="title">장바구니</h1>

        <div className="shopping-cart-body">
          {items && items.length > 0 ? (
            items.map((item, index) => {
              return (
                <CartItem
                  key={item._id}
                  {...item}
                  index={index}
                  buttonHandler={(type, index) => buttonHandler(type, index)}
                  deleteItemHandler={(itemId, price) => deleteItemHandler(itemId, price)}
                />
              );
            })
          ) : (
            <p style={{ textAlign: "center", marginTop: "2rem" }}>
              카트에 상품이 하나도 없습니다.
            </p>
          )}
        </div>

        {items && items.length > 0 && (
          <div className="bottom">
            <span className="total-price">
              총 금액: ￦ {(cart.total?.amount.raw).toLocaleString()}
            </span>
            <button
              style={{ float: "right", padding: "4px 8px" }}
              onClick={() => navigate("/payment")}
            >
              결제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
