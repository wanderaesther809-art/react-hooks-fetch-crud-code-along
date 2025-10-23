import React from "react";
import Item from "./Item";

function ItemList({ items, onDelete, onToggleCart }) {
  return (
    <ul className="Items">
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          onDelete={onDelete}
          onToggleCart={onToggleCart}
        />
      ))}
    </ul>
  );
}

export default ItemList;
