import React, { useState, useEffect } from "react";
import Item from "./Item";
import ItemForm from "./ItemForm";

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((data) => setItems(data));
  }, []);

  // Add new item
  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  // Delete item
  function handleDeleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  // Toggle cart status
  function handleToggleCart(itemToToggle) {
    setItems(
      items.map((item) =>
        item.id === itemToToggle.id
          ? { ...item, isInCart: !item.isInCart }
          : item
      )
    );
  }

  // Filtered items
  const itemsToDisplay =
    filter === "All" ? items : items.filter((item) => item.category === filter);

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <div className="Filter">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">Filter by category</option>
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDelete={handleDeleteItem}
            onToggleCart={handleToggleCart}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
