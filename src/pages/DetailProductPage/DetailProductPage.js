import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clayful from "clayful/client-js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductInfo from "./Sections/ProductInfo";
import styled from "styled-components";

function DetailProductPage() {
  const params = useParams();
  const productId = params.productId;
  const [item, setItem] = useState({});

  useEffect(() => {
    const Product = clayful.Product;
    const options = {};

    Product.get(productId, options, function (err, result) {
      if (err) {
        console.log(err.code);
        return;
      }
      const data = result.data;
      setItem(data);
    });
  }, []);

  return (
    <div className="page-wrapper">
      <Row>
        <Col md>
          <section>
            <img style={{ width: '100%' }} src={item.thumbnail?.url} alt={item.name} />
          </section>
        </Col>
        <Col md>
          <ProductInfo detail={item} />
        </Col>
      </Row>

      <Desc dangerouslySetInnerHTML={{ __html: item.description }} />
    </div>
  );
}

export default DetailProductPage;

const Desc = styled.section`
  margin-top: 60px;
  line-height: 1.6rem;
`;