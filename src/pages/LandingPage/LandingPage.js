import React from "react";
import clayful from "clayful/client-js";

function LandingPage() {
  const Product = clayful.Product;

  const options = {
    query: {
      page: 1,
    },
  };

  Product.list(options, function (err, response) {
    if (err) {
      console.log(err.isClayful);
    }

    console.log(response.status);
    console.log(response.headers);
    console.log(response.data);
  });
  return <div className="page-wrapper">LandingPage 성공적?</div>;
}

export default LandingPage;
