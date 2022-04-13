import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clayful from "clayful/client-js";

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
      console.log(data);
      setItem(data);
    });
  }, []);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: item.description }} />
    </div>
  );
}

export default DetailProductPage;
