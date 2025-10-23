import React from "react";

function Item({ item, onToggleCart, onDelete }) {
  function handleToggle() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isInCart: !item.isInCart }),
    })
      .then((r) => r.json())
      .then((updatedItem) => onToggleCart(updatedItem));
  }

  function handleDelete() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    }).then(() => onDelete(item.id));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className="add" onClick={handleToggle}>
        {item.isInCart ? "Remove From Cart" : "Add to Cart"}
      </button>
      <button className="delete" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

export default Item;
