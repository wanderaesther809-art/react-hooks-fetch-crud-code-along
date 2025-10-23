import React, { useEffect, useState } from "react";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  function handleAddItem(newItem) {
    setItems((prev) => [...prev, newItem]);
  }

  function handleDeleteItem(id) {
    fetch(`http://localhost:3000/items/${id}`, { method: "DELETE" }).then(
      () => {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }
    );
  }

  function handleToggleCart(item) {
    const updatedItem = { ...item, isInCart: !item.isInCart };

    fetch(`http://localhost:3000/items/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    })
      .then((r) => r.json())
      .then((updated) =>
        setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)))
      );
  }

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <ItemList
        items={items}
        onDelete={handleDeleteItem}
        onToggleCart={handleToggleCart}
      />
    </div>
  );
}

export default App;
