import React from "react";

function CartItem({ item, index }) {
  // if (!item.product) return null;
  return (
    <div className="item">
      <div className="image">
        <img
          style={{ height: "100%" }}
          src={item.product.thumbnail.url}
          alt={item.product.name}
        />
      </div>

      <div className="description">
        <span>{item.product.name}</span>
        <span>Bball High</span>
        <span>White</span>
      </div>

      <div className="quantity">
        <button type="button" name="button" className="minus-btn">
          -
        </button>
        <input type="text" readOnly name="number" value={item.quantity.raw} />
        <button type="button" name="button" className="plus-btn">
          +
        </button>
      </div>

      <div className="total-price">
        ￦ {item.price.original.raw.toLocaleString()}
      </div>

      <div className="buttons">
        <button type="button" className="delete-btn">X</button>
      </div>
    </div>
  );
}

export default CartItem;
