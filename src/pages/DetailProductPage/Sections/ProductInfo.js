import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./ProductInfo.scss";

function ProductInfos({ detail }) {
  const [count, setCount] = useState(1);
  if (!detail) return;
  
  return (
    <ProductSection>
      <New>New</New>
      <ProductTitle>{detail.name} 구입하기</ProductTitle>
      <ProductSummary>개별 판매 가격 {detail.price?.original.formatted}</ProductSummary>
      <div className="quantity">
        <Quantity>수량</Quantity>
        <button type="button" name="button" className="plus-btn">+</button>
        <input type="text" readOnly name="number" value={count} />
        <button type="button" name="button" className="minus-btn">-</button>
      </div>
      <ProductPrice>총 상품 금액: {detail.price?.original.raw * count}원</ProductPrice>
      <button className="product-info-action">장바구니에 담기</button>
      <Link to={`/user/cart`} className="product-info-action">바로 구매</Link>
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