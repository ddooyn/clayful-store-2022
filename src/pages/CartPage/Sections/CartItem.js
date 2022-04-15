import React from "react";

function CartItem({ product, quantity, price, index, buttonHandler }) {
  // if (!item.product) return null;
  return (
    <div className="item">
      <div className="image">
        <img
          style={{ height: "100%" }}
          src={product.thumbnail.url}
          alt={product.name}
        />
      </div>

      <div className="description">
        <span>{product.name}</span>
        <span>Bball High</span>
        <span>White</span>
      </div>

      <div className="quantity">
        <button
          onClick={() => buttonHandler("minus", index)}
          type="button"
          name="button"
          className="minus-btn"
        >
          -
        </button>
        <input type="text" readOnly name="number" value={quantity.raw} />
        <button
          onClick={() => buttonHandler("plus", index)}
          type="button"
          name="button"
          className="plus-btn"
        >
          +
        </button>
      </div>

      <div className="total-price">
        ￦ {price.original.raw.toLocaleString()}
      </div>

      <div className="buttons">
        <button type="button" className="delete-btn">
          X
        </button>
      </div>
    </div>
  );
}

export default CartItem;
