import React, { useEffect, useState } from "react";
import clayful from "clayful/client-js";
import styled from "styled-components";
import "./PaymentPage.scss";

function PaymentPage() {
  const [cart, setCart] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [sendUserInfo, setSendUserInfo] = useState({
    full: "",
    mobile: "",
  });
  const [recvUserInfo, setRecvUserInfo] = useState({
    mobile: "",
    full: "",
  });
  const [address, setAddress] = useState({
    postCode: "",
    state: "",
    city: "",
    address1: "",
    address2: "",
    country: "",
  });

  useEffect(() => {
    getCartData();
    getPaymentData();
  }, []);

  const getCartData = () => {
    const Cart = clayful.Cart;
    const options = {
      customer: localStorage.getItem("accessToken"),
    };
    Cart.getForMe({}, options, function (err, result) {
      if (err) {
        console.log(err.code);
      }
      const data = result.data;
      setCart(data.cart);
    });
  };

  const getPaymentData = () => {
    const PaymentMethod = clayful.PaymentMethod;
    PaymentMethod.list({}, function (err, result) {
      if (err) {
        console.log(err.code);
        return;
      }
      const data = result.data;
      setPaymentMethods(data);
      console.log(paymentMethods);
    });
  };

  const handleSendChange = (e) => {
    const { name, value } = e.target;
    setSendUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRecvChange = (e) => {
    const { name, value } = e.target;
    setRecvUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxClick = () => {
    if (isChecked) {
      setIsChecked(false);
      setRecvUserInfo({
        full: "",
        mobile: "",
      });
    } else {
      setIsChecked(true);
      setRecvUserInfo({
        full: sendUserInfo.full,
        mobile: sendUserInfo.mobile,
      });
    }
  };

  return (
    <section className="page-wrapper">
      <div className="payment">
        <PaymentHeader>
          <PaymentTitle>결제</PaymentTitle>
          <TotalAmount>
            주문 총 가격: {(cart.total?.amount.raw + 3000).toLocaleString()}원
            (3,000원 배송비)
          </TotalAmount>
        </PaymentHeader>
        <PaymentInfo>
          <div style={{ width: "49%" }}>
            <Subtitle>주문자 정보</Subtitle>
            <input
              type="text"
              name="full"
              value={sendUserInfo.full}
              onChange={handleSendChange}
              placeholder="주문자명"
            />
            <input
              type="text"
              name="mobile"
              value={sendUserInfo.mobile}
              onChange={handleSendChange}
              placeholder="무선 연락처"
            />
            <div>
              <input
                type="checkbox"
                name="sameInfo"
                id="sameInfo"
                checked={isChecked}
                onChange={handleCheckboxClick}
              />
              <label htmlFor="sameInfo">수취자 정보도 위와 동일합니다.</label>
            </div>
          </div>

          <div style={{ width: "2%" }}></div>

          <div style={{ width: "49%" }}>
            <Subtitle>수취자 정보</Subtitle>
            <input
              type="text"
              name="full"
              value={recvUserInfo.full}
              onChange={handleRecvChange}
              placeholder="수취자명"
            />
            <input
              type="text"
              name="mobile"
              value={recvUserInfo.full}
              onChange={handleRecvChange}
              placeholder="무선 연락처"
            />

            <Subtitle>배송 주소</Subtitle>
            <input type="text" readOnly placeholder="주소" />
            <input type="text" name="address2" placeholder="상세주소" />
            <input type="text" readOnly placeholder="우편번호" />

            <Subtitle>결제</Subtitle>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option>결제 수단 선택</option>
              {paymentMethods.map((method) => (
                <option key={method.slug} value={method.slug}>
                  {method.name}
                </option>
              ))}
            </select>
            <PaymentBtn type="button">주문</PaymentBtn>
            {paymentMethod === "bank-transfer" && (
              <AccountNum>계좌번호: 1111-1111-11111 키위은행</AccountNum>
            )}
          </div>
        </PaymentInfo>
      </div>
    </section>
  );
}

export default PaymentPage;

const PaymentHeader = styled.header`
  display: flex;
  width: 100%;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #d2d2d7;
`;

const PaymentTitle = styled.h2`
  font-family: "Noto Sans KR", sans-serif;
  width: 50%;
  font-size: 24px;
  font-weight: 500;
`;

const Subtitle = styled.h3`
  font-family: "Noto Sans KR", sans-serif;
  margin: 0.5em 0 0.5em;
  font-size: 20px;
`;

const TotalAmount = styled.em`
  display: flex;
  justify-content: end;
  align-items: flex-end;
  width: 50%;
`;

const PaymentInfo = styled.article`
  display: flex;
  width: 100%;
  margin-top: 16px;
`;

const PaymentBtn = styled.button`
  width: 100%;
  margin-top: 10px;
`;

const AccountNum = styled.p`
  margin-top: 10px;
`;