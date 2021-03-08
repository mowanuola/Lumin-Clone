import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

import styled from "styled-components";
import Cart from "./Cart";
import Navbar from "../components/NavBar";

const PRODUCTS = gql`
  query GetProducts($currency: Currency!) {
    products {
      title
      id
      price(currency: $currency)
      image_url
    }
  }
`;
const StyledProductPage = styled.div``;
const StyledProductHero = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 70px 25px 25px;
  background-color: #fcfcf9;
  align-items: flex-end;
  div.left-container {
    padding-right: 20px;
    max-width: 500px;
    width: 50%;
    margin: 0 auto;
    h2 {
      font-family: "Playfair Display", serif;
      font-weight: 400;
      font-size: 48px;
      letter-spacing: 0px;
      font-family: freight-display-pro, serif;
      text-transform: none;
      color: #2b2e2b;
      margin-bottom: 26px;
    }
    p {
      font-size: 16px;
      letter-spacing: 0.03px;
      text-transform: none;
      color: #2b2e2b;
      margin-bottom: 36px;
    }
  }
  div.right-container {
    padding-left: 20px;
    max-width: 300px;
    width: 50%;
    margin: 0 auto;
    select {
      width: 100%;
      border: 1px solid #cdd1ce;
      padding: 20px;
      font-size: 13px;
      margin-bottom: 35px;
      color: #4b5548;
    }
  }
`;
const StyledProductsGrid = styled.section`
  padding: 25px;
  background-color: #e2e6e3;
  display: flex;
  flex-wrap: wrap;

  @media only screen and (max-width: 768px) {
    .col-custom {
      padding: 2.5rem 0.5rem !important;
      width: 50% !important;
    }
  }
`;
const StyledProductsItem = styled.div`
  text-align: center;
  padding: 50px 30px;
  min-height: 50px;

  img {
    padding: 0 15px;
    max-height: 150px;
    object-fit: contain;
    margin-top: -47px;
    width: 50%;
  }
  .add-to-cart-btn {
    background-color: #4b5548;
    color: #fcfcf9;
    padding: 14px 11px;
    border: 0.5px solid #4b5548;
    width: calc(50% - 5px);
    font-size: 14px;
    text-align: center;
    cursor: pointer;
  }
  .product-img {
    min-height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .product-title {
    font-size: 16px;
    ont-weight: 400;
    line-height: 25px;
    color: #2b2e2b;
    margin-bottom: 6px;
  }
`;
const ProductPage = () => {
  const [currency, setCurrency] = useState("NGN");
  const { loading, error, data } = useQuery(PRODUCTS, {
    variables: { currency },
    notifyOnNetworkStatusChange: true,
  });
  const [open, setOpen] = useState(false);
  const [cartContent, setCartContent]: any = useState({ cart: [], total: 0 });

  const incrementCount = (obj: any) => {
    let addedItem = cartContent.cart.find((item) => obj.id === item.id);
    addedItem.count += 1;
    let newTotal = cartContent.total + addedItem.price;
    setCartContent({
      ...cartContent,
      total: newTotal,
    });
  };
  const decrementCount = (obj: any) => {
    let addedItem = cartContent.cart.find((item) => obj.id === item.id);
    if (addedItem.count === 1) {
      let new_items = cartContent.cart.filter((item) => item.id !== obj.id);
      let newTotal = cartContent.total - addedItem.price;
      setCartContent({
        ...cartContent,
        cart: new_items,
        total: newTotal,
      });
    } else {
      addedItem.count -= 1;
      let newTotal = cartContent.total - addedItem.price;
      setCartContent({
        ...cartContent,
        total: newTotal,
      });
    }
  };
  const addToCart = (obj: any) => {
    let addedItem = data.products.find((item) => item.id === obj.id);
    let existingItem = cartContent.cart.find((item) => obj.id === item.id);
    if (existingItem) {
      existingItem.count += 1;
      setCartContent({
        ...cartContent,
        total: cartContent.total + addedItem.price,
      });
    } else {
      addedItem = { ...addedItem, count: 1 };
      let newTotal = cartContent.total + addedItem.price;
      setCartContent({
        ...cartContent,
        cart: [...cartContent.cart, addedItem],
        total: newTotal,
      });
    }
  };
  const clearCart = (obj: any) => {
    let itemToRemove = cartContent.cart.find((item) => obj.id === item.id);
    let new_items = cartContent.cart.filter((item) => obj.id !== item.id);
    let newTotal = cartContent.total - itemToRemove.price * itemToRemove.count;
    setCartContent({
      ...cartContent,
      cart: new_items,
      total: newTotal,
    });
  };

  return (
    <StyledProductPage>
      <Navbar
        count={cartContent.cart.length}
        handleOpen={() => setOpen(true)}
      />
      <StyledProductHero>
        <div className="left-container">
          <h2>All Products</h2>
          <p>A 360° look at Lumin</p>
        </div>
        <div className="right-container">
          <select
            className=""
            name=""
            placeholder="Filter by"
            defaultValue="single-product"
          >
            <option value="single-product" disabled>
              Filter by
            </option>
            <option value="all-products">All Products</option>
            <option value="new-products">New Products</option>
            <option value="sets">Sets</option>
            <option value="skincare">Skincare</option>
            <option value="hair-and-body">Hair &amp; Body Care</option>
          </select>
        </div>
      </StyledProductHero>
      {loading ? (
        <div className="loader">
          <div></div>
          <div></div>
        </div>
      ) : (
        <StyledProductsGrid>
          {data &&
            data.products.map((item: any) => (
              <StyledProductsItem className="col-md-4 col-custom" key={item.id}>
                <div className="product-img">
                  <img src={item.image_url} alt={`item ${item.title}`} />
                </div>
                <h3 className="product-title">{item.title}</h3>
                <p className="product-price">
                  <b>{currency}</b> {item.price}
                </p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => {
                    setOpen(true);
                    addToCart(item);
                  }}
                >
                  Add To Cart
                </button>
              </StyledProductsItem>
            ))}
        </StyledProductsGrid>
      )}
      <Cart
        open={open}
        handleClose={() => setOpen(false)}
        cart={cartContent}
        updateCart={setCartContent}
        incrementCart={incrementCount}
        decrementCart={decrementCount}
        clearCart={clearCart}
        currency={currency}
        setCurrency={setCurrency}
        fetching={loading}
        data={data}
        error={error}
      />
    </StyledProductPage>
  );
};

export default ProductPage;
