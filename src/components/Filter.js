import React, { useState } from "react";
import { Input, Select, Button, Modal } from "antd";

const { Option } = Select;

function Filter({ onFilterChange, onSortChange }) {
  // Crear el estado para mostrar el modal de ejemplos
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Cree los metodos para mostrar el modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
      {/* Este botón es para mostrar el modal de ejemplos */}
      <Button type="primary" onClick={showModal}>
        Filter Examples
      </Button>
      <Modal
        title="Filter Examples"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* Estos son los ejemplos para filtrar los pokemones */}
        <p>Example 1: To filter by name, type the name in the input box.</p>
        <p>
          Example 2: To filter by move, type 'move:' followed by the move name
          (e.g., 'move: Thunderbolt').
        </p>
        <p>
          Example 3: To filter by type, type 'type:' followed by the type name
          (e.g., 'type: Fire').
        </p>
      </Modal>
    </div>
  );
}

export default Filter;
