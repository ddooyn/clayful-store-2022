import React, { useEffect, useState } from "react";
import clayful from "clayful/client-js";
import styled from "styled-components";
import Table from "react-bootstrap/Table";

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

  return (
    <div className="page-wrapper">
      <section className="history">
        <HistoryTitle>주문 내역</HistoryTitle>
        <Table striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th>주문 번호</th>
              <th>총 주문 가격</th>
              <th>주문 일시</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item._id}</td>
                <td>{item.total.amount.converted}</td>
                <td>{item.createdAt.formatted}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </div>
  );
}

export default HisrotyPage;

const HistoryTitle = styled.div`
  width: 50%;
  margin-bottom: 1em;
  font-size: 24px;
  font-weight: 500;
`;
