import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 import {
  PlusOutlined,
  EyeOutlined,
  DeleteOutlined,
}from "@ant-design/icons/lib/icons";
import { generatePDF } from "../utils/generatePdf";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { Modal, Select } from "antd";
import {
  deleteCV,
  setTemplateVersion,
} from "../app/features/templateSlice";
import View from "../components/View";
import View1 from "../components/View1";
import View2 from "../components/View2";
import DraftModel from "../components/DraftModel";
function Home() {
  const data = useSelector((state) => state.cv_data);
  const currentUserId = useSelector((state) => state.CurrentUserId);
  const dummyData = {
    cgpa: "*****",
    email: "*******@gmail.com",
    gender: "male",
    graduatingYear: "0000",
    intro: "***********************",
    name: "Demo",
    phone: "***********",
    prefix: "91",
    project1: "********************************",
    project2: "*****************************",
    school: "**********",
    schoolMarks: "100",
    schoolYear: "0000",
    skill: "A  B  C  D ",
    university: "++++",
    website: "*****.com",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [templateOpen, setTemplateOpen] = useState(false);
  const [templateValue, settemplateValue] = useState("1");
  const [singleModelProps, setSingleModelProps] = useState();

  const handleClick = () => {
    setTemplateOpen(true);
  };

  const handleView = (e) => {
    setOpen(true);
    setSingleModelProps(e);
  };
 
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    settemplateValue(value);
  };

  //handle the template selection
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
  const handleTemplateChosen = () => {
    dispatch(setTemplateVersion(templateValue));
    navigate("/form");
  };

  const handleDelete = (value) => {
    console.log(value);
    dispatch(deleteCV(value));
  };

  return (
    <>
      <div className="fuz1">
        <span
          style={{ fontWeight: "600", fontSize: "3rem", marginLeft: "-10rem" }}
        >
          My CV's
        </span>
      </div>
      <div className="fuz">
        <p>Your Templates here</p>

        // TODO: Models for the view separates components
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
            onClick={generatePDF}
            type="button"
          >
            Export PDF
          </button>
          <div id="report">
            {handleTemplateVersion(
              singleModelProps?.templateSelectedForAdd,
              singleModelProps?.cvValues
            )}
          </div>
        </Modal>
        {data ? (
          data.map((e) => {
            if (currentUserId === e.userId)
              return (
                <div
                  key={e.id}
                  className="box"
                >
                  <img
                    src="https://media.gettyimages.com/photos/top-view-of-stack-of-resume-filesmagnifier-on-black-surfaceconcept-of-picture-id1138817616"
                    alt=""
                    width="300px"
                    height="300px"
                    id="uiz"
                  />
                  <h2 style={{ paddingTop: "2rem" }}>{e.cvValues.name}</h2>{" "}
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
                    <EyeOutlined style={{ fontSize: "2rem" }} />{" "}
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
                    onClick={() => handleDelete(e)}
                  >
                    <DeleteOutlined
                      style={{ fontSize: "2rem", backgroundColor: "red" }}
                    />{" "}
                  </button>
                </div>
              );
          })
        ) : (
          <div>Add any template from the + Icon</div>
        )}
        
        //Add to + Button
        <button
          style={{
            padding: "1rem",
            position: "fixed",
            cursor: "pointer",
            bottom: "3rem",
            right: "4rem",
            border: "none",
            borderRadius: "1rem",
            color: "white",
            backgroundColor: "black",
          }}
          onClick={handleClick}
        >
          <PlusOutlined style={{ fontSize: "2rem" }} />{" "}
        </button>

        //  Modal for Add button + for template to continue with
        <Modal
          bodyStyle={{ height: "auto", boxShadow: "0 4px 6px -6px #222" }}
          title="Select a template from Dropdown"
          centered
          open={templateOpen}
          footer={null}
          onOk={() => setTemplateOpen(false)}
          onCancel={() => setTemplateOpen(false)}
          width={1000}
        >
          <Select
            defaultValue="Template 1"
            style={{ width: 200, marginBottom: "1rem" }}
            onChange={handleChange}
            options={[
              { value: "1", label: "Template 1" },
              { value: "2", label: "Template 2" },
              { value: "3", label: "Template 3" },
            ]}
          />{" "}
          <button
            onClick={handleTemplateChosen}
            style={{
              padding: "0.4rem",
              marginLeft: "35rem",
              borderRadius: "1rem",
              color: "white",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#66a5ff",
            }}
          >
            <p style={{ textAlign: "center" }}>Continue with this Template</p>
          </button>
          {handleTemplateVersion(templateValue, dummyData)}
        </Modal>

        
      

        
      </div>
      <DraftModel/>
    </>
  );
}

export default Home;
