import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { exists } from "fs";

const CURRENCY = gql`
  {
    currency
  }
`;
/**
 * TODO:
 * - Implement API call on Currency Change
 */
const StyledModalContent = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  img {
    height: 15px;
    width: 10px;
    fill: rgb(43, 46, 43);
  }
  > div {
    flex: 1;
    width: 33.3%;
    display: flex;
    align-items: center;
    padding-top: 20px;
    .close {
      justify-content: flex-start;
    }
    .close-container {
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
      border-bottom-left-radius: 50%;
      border: 1px solid rgb(198, 204, 199);
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-left: 20px;
    }
  }
  .title {
    color: #696969;
    font-weight: 400;
    letter-spacing: 1px;
    font-style: normal;
    font-size: 10px;
    text-align: center;
    margin-bottom: 0;
    line-height: 1.2;
    display: inline-block;
  }
`;
const StyledModalCurrency = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  select {
    max-width: 80px;
    padding: 5px 10px;
    border: 0;
    border-radius: 0;
    outline: none;
    width: 100%;
    margin: 0;
    display: block;
    margin-bottom: 15px;
  }
`;
const StyledModalBody = styled.div`
  margin-top: 10px;
  padding-left: 20px;
  padding-right: 20px;

  p {
    margin-top: 20px;
    text-align: center;
  }
  h6 {
    color: #1e2d2b;
    margin-bottom: 0;
    font-size: 13px;
    letter-spacing: 0.03px;
    padding: 0;
    line-height: 1.5;
  }
  .item-list {
    margin-top: 20px;
  }
  .item {
    display: flex;
    flex-wrap: wrap;
    min-height: inherit;
    max-height: inherit;
    justify-content: space-between;
    position: relative;
    margin-bottom: 20px;
    background: #fff;
    padding: 20px 5px;
  }
  .details {
    color: #1e2d2b;
    width: 65%;
    line-height: 18px;
    font-size: 10px;
    padding: 15px 13px 13px 21px;
    letter-spacing: 0.02px;
  }
  .image {
    background-color: #fdfdfd;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1e2d2b;
    width: 33.3%;
    padding-right: 15px;
  }
  .img {
    overflow: hidden;
    height: 80px;
    width: auto;
    object-fit: contain;
  }
  .remove {
    cursor: pointer;
    float: right;
    padding-right: 5px;
    position: absolute;
    right: 27px;
    margin-top: -10px;
    margin-right: -20px;
    font-size: 15px;
    opacity: 0.7;
  }
  div.amount {
    font-size: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  div.increment {
    border: 0.5px solid #bcbcbc;
    padding: 7px;
    width: 76px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .increment {
    font-size: 13px;
  }
  .increment .num {
    padding: 0 10px;
  }
  .increment .increase,
  .increment .decrease {
    cursor: pointer;
    color: #000;
    font-size: 15px;
  }
`;
const StyledModalFooter = styled.div`
  border-top: 1px solid #d0d0d0;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1;
  padding: 0 20px 20px;
  font-size: 15px;
  div.total {
    margin-bottom: 10px;
    padding-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 0 solid #6e7b70;
    border-top: none;
    color: #2b2e2b;

    .price {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
  div.add-to-cart-btn {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    button {
      color: #fff;
      letter-spacing: 2px;
      background-color: #4b5548;
      border: none;
      margin-top: 15px;
      font-size: 12px;
      font-weight: 400;
      font-style: normal;
      padding: 16px 20px;
      text-align: center;
      text-decoration: none;
    }
  }
`;
const Cart = ({
  open,
  handleClose,
  cart,
  incrementCart,
  decrementCart,
  clearCart,
  currency,
  setCurrency,
  fetching,
  error: fetchError,
  updateCart,
  data: cartData,
}) => {
  let updatedItems;

  const { data, loading, error } = useQuery(CURRENCY);
  const handleChange = (e: any) => {
    setCurrency(e.target.value);
  };
  const updateCartCurrency = async () => {
    let currencyChange = await updatedItems.filter((item) => {
      return cart.cart.some((exist) => {
        return item.id === exist.id;
      });
    });
    updateCart((previousState) => {
      const { cart } = previousState;

      let totalPrice = 0;

      const newCart = cart.map((item) => {
        const changedItem = currencyChange.find((c) => c.id === item.id);
        if (changedItem) {
          totalPrice += changedItem.price * item.count;
          return {
            ...item,
            ...changedItem,
          };
        }

        totalPrice += item.price * item.count;
        return item;
      });

      return {
        total: totalPrice,
        cart: newCart,
      };
    });
  };
  useEffect(() => {
    if (!fetchError && !fetching) {
      updatedItems = cartData.products.map((item) => {
        return { id: item.id, price: item.price };
      });
      updateCartCurrency();
    }
  }, [cartData, fetchError, fetching]);
  const editCart = (obj: any, increment?: boolean) => {
    if (increment) {
      incrementCart(obj);
    }
    if (!increment) {
      decrementCart(obj);
    }
  };
  return (
    <Modal
      size="lg"
      show={open}
      onHide={() => {
        handleClose();
      }}
      aria-labelledby="go-back"
      backdropClassName="modal-backdrop-nested"
      className="right-modal"
      backdrop="static"
      keyboard={false}
    >
      <StyledModalContent>
        <div className="close">
          <div className="close-container">
            <img
              src="/assets/close.svg"
              onClick={() => {
                handleClose();
              }}
              alt="close-modal"
            />
          </div>
        </div>
        <div className="title">
          <h5 className="title">YOUR CART</h5>
        </div>
        <div></div>
      </StyledModalContent>
      <StyledModalCurrency>
        <select
          className="currency-select"
          defaultValue={currency}
          onChange={handleChange}
        >
          {data &&
            data.currency.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
        </select>
      </StyledModalCurrency>
      <StyledModalBody>
        {cart.cart.length < 1 ? (
          <p>There are no items in your cart.</p>
        ) : fetching ? (
          <div className="loader">
            <div></div>
            <div></div>
          </div>
        ) : (
          <div className="item-list">
            {cart.cart.map((item) => (
              <div className="item">
                <div className="details">
                  <span
                    className="remove"
                    onClick={() => {
                      clearCart(item);
                    }}
                  >
                    <b>X</b>
                  </span>
                  <h6>{item.title}</h6>

                  <div className="amount">
                    <div className="increment">
                      <span
                        className="decrease"
                        onClick={() => {
                          editCart(item, false);
                        }}
                      >
                        -
                      </span>
                      <span className="num">{item.count}</span>
                      <span
                        className="increase"
                        onClick={() => {
                          editCart(item, true);
                        }}
                      >
                        +
                      </span>
                    </div>
                    <div className="price">
                      {currency}
                      {item.count > 1 ? item.count * item.price : item.price}
                    </div>
                  </div>
                </div>
                <div className="image">
                  <img
                    src={item.image_url}
                    alt={`item ${item.title}`}
                    className="img"
                  />
                </div>
              </div>
            ))}

            <StyledModalFooter>
              <div className="total">
                <span>Subtotal</span>
                <div className="price">
                  {currency} {cart.total}
                </div>
              </div>
              <div className="add-to-cart-btn">
                <button>PROCEED TO CHECKOUT</button>
              </div>
            </StyledModalFooter>
          </div>
        )}
      </StyledModalBody>
    </Modal>
  );
};

export default Cart;
