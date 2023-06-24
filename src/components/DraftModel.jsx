import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./DraftModel.css";
import { Modal, Select } from "antd";
import View from "../components/View";
import View1 from "../components/View1";
import View2 from "../components/View2";
import { deleteDraft,setLogOut } from "../app/features/templateSlice";
import {
  LogoutOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons/lib/icons";

function DraftModel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [singleModelProps, setSingleModelProps] = useState();

  const currentUserId = useSelector((state) => state.CurrentUserId);
  const draft_data = useSelector((state) => state.draft_data);
  const handleView = (e) => {
    setOpen(true);
    //setting the data from draft store in the singleModelProps as a object
    setSingleModelProps(e);
  };
  const handleTemplateVersion = (templateValue, item) => {
    switch (templateValue) {
      case "1":
        return <View item={item} />;
        break;
      case "2":
        return <View1 item={item} />;
        break;
      case "3":
        return <View2 item={item} />;
        break;
    }
  };
  const handleDeletDraft = (value) => {
    dispatch(deleteDraft(value));
  };
  const handlLogout = () => {
    dispatch(setLogOut);
    navigate("/");
  };
  const gotoFormPrepolulated = (id) => {
    navigate("/form", {state:id});
  }

  return (
    <>
      <div className="fuz1d">
        <span
          style={{ fontWeight: "600", fontSize: "3rem", marginLeft: "-10rem",color:'black' }}
        >
          My Draft's
        </span>
      </div>

      <div className="fuzyy">
      <Modal
      bodyStyle={{ height: "auto" }}
      title="Preview"
      centered
      open={open}
      footer={null}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
    >
      <button
        style={{
          marginLeft: "52rem",
          padding: "0.8rem",
          border: "none",
          color: "white",
          backgroundColor: "#4599e4",
          cursor: "pointer",
          borderRadius: "0.7rem",
        }}
       onClick={()=>gotoFormPrepolulated(singleModelProps?.id)}
        type="button"
      >
        Resume your Draft
      </button>

      <div id="report">
        {handleTemplateVersion(
          singleModelProps?.templateSelectedForDraft,
          singleModelProps?.cvDraft
        )}
      </div>

    </Modal>


        {draft_data ? (
          draft_data.map((e) => {
            if (currentUserId === e.userId)
              return (
                <div className="box" key={e.id}>
                  <img
                    src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1985&q=80"
                    alt=""
                    width="300px"
                    height="300px"
                    id="uiz"
                  />
                  <h2 style={{ paddingTop: "2rem" }}>{e.cvDraft.name}</h2>{" "}
                  <br />
                  <button
                    style={{
                      padding: "1rem",
                      cursor: "pointer",
                      border: "none",
                      borderRadius: "1rem",
                      color: "white",
                      backgroundColor: "black",
                    }}
                    onClick={() => handleView(e)}
                  >
                    <FormOutlined style={{ fontSize: "2rem" }} />{" "}
                  </button>
                  <button
                    style={{
                      padding: "1rem",
                      cursor: "pointer",
                      marginLeft: "1rem",
                      border: "none",
                      borderRadius: "1rem",
                      color: "white",
                      backgroundColor: "red",
                    }}
                    onClick={() => handleDeletDraft(e.id)}
                  >
                    <DeleteOutlined
                      style={{ fontSize: "2rem", backgroundColor: "red" }}
                    />{" "}
                  </button>
                </div>
              );
          })
        ) : (
          <div>Your Draft Shows here</div>
        )}
      </div>
      <button
        style={{
          padding: "1rem",
          position: "fixed",
          cursor: "pointer",
          top: "1rem",
          right: "4rem",
          border: "none",
          borderRadius: "1rem",
          color: "white",
          backgroundColor: "black",
        }}
        onClick={handlLogout}
      >
        <LogoutOutlined style={{ fontSize: "2rem" }} />{" "}
      </button>
    </>
  );
}

export default DraftModel;
