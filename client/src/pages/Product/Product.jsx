import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

import "./product.scss";

import axios from "axios";

const Product = () => {
  const [item, setItem] = useState([]);
  const [user, setUser] = useState([]);

  // Get the current URL
  var url = window.location.href;

  // Extract the product ID from the URL
  var productId = url.substring(url.lastIndexOf("/") + 1);

  useEffect(() => {
    fetchItem(productId);
  }, []);

  const fetchItem = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/markets/getItem/${productId}`
      );
      const data = response.data;
      setItem(data);
      // Once item is fetched, fetch the user information using item.userId
      fetchUser(data.userId);
    } catch (error) {
      console.error("Error fetching market items:", error);
    }
  };

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/users/find/${userId}`
      );
      const userData = response.data;
      setUser(userData); // Set user data received from the API
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div className="product">
      <div className="Information">
        {item && ( // Check if item is not null before accessing its properties
          <div key={item.id} className="marketplace-item">
            <h1>{item.title}</h1>
            <h3>Price: Rs.{item.price}</h3>
            <span>{item.description}</span>

            <div className="ownerInfo">
            <img src={user.profilePicture} />
            <p>{user.name}</p>
            </div>
          </div>
        )}

        <div className="buttons">
          <button>Add to Cart</button>
          <button>Buy Now</button>
        </div>
      </div>
      <div className="infoGraphics">
        {item && ( // Check if item is not null before accessing its properties
          <div key={item.id} className="marketplace-item">
            <img src={`${process.env.PUBLIC_URL}/upload/${item.picture}`} />
          </div>
        )}
        <div className="space2"></div>
      </div>
    </div>
  );
};

export default Product;
