import React, { useState, useEffect } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

import "./marketplace.scss";
import axios from "axios";

const Marketplace = () => {
  const [items, setItems] = useState([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  const [file, setFile] = useState(null);

  // const mutation = useMutation({
  //   mutationFn: (newPost) => {
  //     return makeRequest.post("/posts", newPost);
  //   },
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries(["posts"]);
  //   },
  // });

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // const handlePictureUpload = async (event) => {
  //   event.preventDefault();
  //   let imgUrl = "";
  //   if (file) imgUrl = await upload();
  //   mutation.mutate({ img: imgUrl });
  //   setDesc("");
  //   setFile(null);
  // };

  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    price: "",
    availability: true,
    picture: "",
  });
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchMarketItems();
  }, []);

  const fetchMarketItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/api/markets/getItems"
      );
      const data = response.data;
      // Convert the object to an array of items
      const itemsArray = Object.values(data);
      setItems(itemsArray);
    } catch (error) {
      console.error("Error fetching market items:", error);
    }
  };

  console.log("items:", items);

  const handleSellSubmit = async (event) => {
    event.preventDefault();
    try {
      let imgUrl = "";
      if (file) imgUrl = await upload();
      //     mutation.mutate({ img: imgUrl });

      await axios.post("http://localhost:8800/api/markets/uploadItem", newItem);

      setFile(null);
      // Assuming successful upload, refresh items from backend
      fetchMarketItems();

      handleCloseSellModal();
    } catch (error) {
      console.error("Error uploading item:", error);
    }
  };

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleCloseSellModal = () => {
    setIsSellModalOpen(false);
    setNewItem({
      title: "",
      description: "",
      price: "",
      availability: true,
      picture: "",
    });
  };

  return (
    <div className="marketplace">
      <header className="marketplace-header">
        <h1>Marketplace</h1>
        <span>
          "ArtEcho is a marketplace where artists sell their amazing artwork to
          people who appreciate creativity. It's a place where you can find
          unique, one-of-a-kind pieces that will add a touch of personality to
          your home or office. Come and discover the beauty of art on ArtEcho."
        </span>
      </header>
      {/* Sell Item Button */}
      <div className="buttons">
        <button onClick={() => setIsCartOpen(true)}>Cart</button>
        <button onClick={() => setIsSellModalOpen(true)}>Sell Item</button>
      </div>
      {/* Marketplace Items */}
      <div className="marketplace-container">
        {items.map((item) => (
          <div key={item.id} className="marketplace-item">
            <img src={item.picture} alt={item.title} />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Rs.{item.price}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Sell Item Modal */}
      {isSellModalOpen && (
        <div className="sell-item-modal">
          <div className="sell-item-modal-content">
            <h2>Sell Item</h2>
            <form onSubmit={handleSellSubmit}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                value={newItem.title}
                onChange={(e) =>
                  setNewItem({ ...newItem, title: e.target.value })
                }
                required
              />
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                required
              />
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
                required
              />
              <label htmlFor="picture">Picture URL</label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button type="submit" oncClick={handleSellSubmit}>
                Sell
              </button>
              <button type="button" onClick={handleCloseSellModal}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Cart Modal */}
      {isCartOpen && (
        <div className="checkout-modal">
          <div className="checkout-modal-content">
            <h2>Checkout</h2>
            {/* Cart Items */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <p>
                    {item.title} Rs.{item.price}
                  </p>
                </div>
              ))}
            </div>
            <button onClick={() => setIsCartOpen(false)}>Close</button>
          </div>
        </div>
      )}
      <div className="space2"></div>
    </div>
  );
};

export default Marketplace;
