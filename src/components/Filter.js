import React from "react";
import { Input, Select } from "antd";

const { Option } = Select;

function Filter({ onFilterChange, onSortChange }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}
    >
      <Input
        placeholder="Filter Pokémon by name"
        onChange={(e) => onFilterChange(e.target.value)}
        style={{ width: "60%" }}
      />
      <Select
        defaultValue="name"
        onChange={onSortChange}
        style={{ width: "30%" }}
      >
        <Option value="name">Name (A-Z)</Option>
        <Option value="-name">Name (Z-A)</Option>
      </Select>
    </div>
  );
}

export default Filter;
