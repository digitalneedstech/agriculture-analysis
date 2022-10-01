import React, { useState } from "react";
import { Modal, Button } from "antd";
import FodderList from "../../components/fodderList";
import AddNewSale from "../../components/addNewSale";
function BuffaloCalveSale(props) {
  const [modalVisible, setModalVisble] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalVisble(false);
    }, 3000);
  };

  const handleCancel = () => {
    setModalVisble(false);
  };

  return (
    <>
      <div className="white-background content">
        <Button
          type="primary"
          onClick={() => {
            setModalVisble(true);
          }}
        >
          Add New Milk Sale
        </Button>
        <FodderList></FodderList>
      </div>
      <Modal
        style={{ top: 20 }}
        visible={modalVisible}
        title="New Milk Sale"
        onOk={handleSubmit}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleSubmit}
          >
            Submit
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <AddNewSale />
      </Modal>
    </>
  );
}

export default BuffaloCalveSale;
