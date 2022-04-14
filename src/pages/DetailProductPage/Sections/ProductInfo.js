import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./ProductInfo.scss";
import { AuthContext } from "../../../context/AuthContext";
import clayful from "clayful/client-js";
import Alert from "react-bootstrap/Alert";

function ProductInfos({ detail }) {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);
  const { isAuth } = useContext(AuthContext);

  const handleQuantityClick = (type) => {
    if (type === "plus") {
      setCount((prev) => prev + 1);
    } else {
      if (count === 1) return;
      setCount((prev) => prev - 1);
    }
  };

  const handleActionClick = (type) => {
    if (!isAuth) {
      alert("먼저 로그인해주세요");
      navigate("/login");
      return;
    }
    const Cart = clayful.Cart;
    const payload = {
      product: detail._id,
      variant: detail.variants[0]._id,
      quantity: count,
      shippingMethod: detail.shipping.methods[0]._id,
    };
    const options = {
      customer: localStorage.getItem("accessToken"),
    };

    Cart.addItemForMe(payload, options, function (err, result) {
      if (err) {
        console.log(err.code);
        return;
      }
      if (type === "cart") {
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 3000);
      } else {
        setTimeout(() => {
          navigate("/user/cart");
        }, 500);
      }
    });
  };

  return (
    <ProductSection>
      {show && (
        <Alert variant="info">
          <Alert.Heading>상품이 장바구니에 담겼습니다.</Alert.Heading>
          <p>장바구니에서 확인해주세요.</p>
        </Alert>
      )}
      <New>New</New>
      <ProductTitle>{detail.name} 구입하기</ProductTitle>
      <ProductSummary>
        개별 판매 가격 {detail.price?.original.formatted}
      </ProductSummary>
      <div className="quantity">
        <Quantity>수량</Quantity>
        <button
          onClick={() => handleQuantityClick("minus")}
          type="button"
          name="button"
          className="minus-btn"
        >
          -
        </button>
        <input type="text" readOnly name="number" value={count} />
        <button
          onClick={() => handleQuantityClick("plus")}
          type="button"
          name="button"
          className="plus-btn"
        >
          +
        </button>
      </div>
      <ProductPrice>
        총 상품 금액: {(detail.price?.original.raw * count).toLocaleString()}원
      </ProductPrice>
      <button
        onClick={() => handleActionClick("cart")}
        className="product-info-action"
      >
        장바구니에 담기
      </button>
      <button onClick={() => handleActionClick("pay")} className="product-info-action">
        바로 구매
      </button>
    </ProductSection>
  );
}

export default ProductInfos;

const ProductSection = styled.section`
  line-height: 2rem;
`;
const New = styled.p`
  color: #bf4800;
`;
const ProductTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 2.2rem;
  font-weight: 500;
`;
const ProductSummary = styled.em`
  font-size: 1.2rem;
`;
const Quantity = styled.p`
  margin-bottom: 5px;
  font-weight: 600;
`;
const ProductPrice = styled.h3`
  font-size: 1.6rem;
  line-height: 3em;
`;
