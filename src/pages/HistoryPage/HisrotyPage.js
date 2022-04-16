import React, { useEffect, useState } from "react";
import clayful from "clayful/client-js";

function HisrotyPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const Order = clayful.Order;
    const options = {
      customer: localStorage.getItem("accessToken"),
    };

    Order.listForMe(options, function (err, result) {
      if (err) {
        console.log(err.code);
        return;
      }
      const data = result.data;
      setHistory(data);
      console.log(history);
    });
  }, []);

  return <div className="page-wrapper">HisrotyPage</div>;
}

export default HisrotyPage;
