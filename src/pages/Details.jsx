import { AutoComplete, Button, Form, Input, Space, Modal, Select } from "antd";
import {
  addCV,
  setTemplateVersion,
  addDraft,
  deleteDraft,
} from "../app/features/templateSlice";
import { useEffect, useState } from "react";
import "./Form.css";
import { useDispatch } from "react-redux";
import { RollbackOutlined } from "@ant-design/icons";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { v4 as uuid } from "uuid";
import View from "../components/View";
import View1 from "../components/View1";
import View2 from "../components/View2";
import {  notification } from 'antd';
import {
  BorderTopOutlined
} from '@ant-design/icons';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

function Details() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //noti
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
     
      description:
        'CV succeessfully saved in Home',
      placement,
    });
  };
  const openDraftSvedNotification = (placement) => {
    api.info({
     
      description:
        'CV saved in My Drafts',
      placement,
    });
  };
  //setting during login in store
  const currentUserId = useSelector((state) => state.CurrentUserId);
  const selectedTemplateFromHome = useSelector(
    (state) => state.TemplateVersion
  );

  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [templateValue, settemplateValue] = useState(selectedTemplateFromHome);

  //setting prepopulation
  const location = useLocation();
  const draft_data = useSelector((state) => state.draft_data);
  const required_draft_object = draft_data.find(
    (draft) => draft.id === location.state
  );

  const [draftValue, setDraftValue] = useState(null);

  useEffect(() => {
    const handleData = (required_draft_object) => {
      setDraftValue(required_draft_object);
    };
    handleData(required_draft_object);
    // To populate the form fields with initial values
    onFill();
  }, [draftValue]);

  const onFill = () => {
    form.setFieldsValue({
      name: draftValue?.cvDraft.name || "",
      email: draftValue?.cvDraft.email || "",
    });
  };
  //Default Items for Preview Modal
  const [item, setItem] = useState({
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
  });

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const id = uuid().slice(0, 8);

    // TODO: TO dispatch the template along with add
    // console.log(values);
    dispatch(
      addCV({
        id,
        userId: currentUserId,
        cvValues: values,
        templateSelectedForAdd: templateValue,
      })
    );
    dispatch(deleteDraft(location.state));
    // console.log(templateValue)
    openNotification('top')
  };

  //changing preview templates
  const handleTemplateToShowWith = (templateValue) => {
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

  //setting the preview presets onchange form
  const handelOnChange = (e) => {
    let { name, value } = e.target;
    setItem({ ...item, [name]: value });
    console.log(item);
  };

  //sending data to draft reducer
  const handleDraft = (templateValue) => {
    const id = uuid().slice(0, 8);
    dispatch(
      addDraft({
        id,
        userId: currentUserId,
        cvDraft: item,
        templateSelectedForDraft: templateValue,
      })
    );
    openDraftSvedNotification('top')
  };
  //changing the templates again for user experience
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    settemplateValue(value);
  };

  //newly agained chosen template
  const handleTemplateChosen = () => {
    dispatch(setTemplateVersion(templateValue));
    setOpen(false);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
        <Option value="90">+90</Option>
        <Option value="87">+89</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  const handleClick = () => {
    navigate("/home");
  };

  return (
    
    <div className="hui" style={{ paddingBottom: "2rem" }}>
    {contextHolder}

      <button
        style={{
          padding: "1rem",
          position: "fixed",
          cursor: "pointer",
          top: "3rem",
          left: "4rem",
          border: "none",
          borderRadius: "1rem",
          color: "white",
          backgroundColor: "black",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <RollbackOutlined style={{ fontSize: "2rem", cursor: "pointer" }} />{" "}
      </button>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "91",
        }}
        style={{
          maxWidth: 1500,
          paddingTop: "2rem",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input name="name" onChange={handelOnChange} />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input name="email" onChange={handelOnChange} />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          name="school"
          label="Enter School Name"
          rules={[
            {
              required: true,
              message: "Please input your School",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="schoolYear"
          label="Enter Passing Year"
          rules={[
            {
              required: true,
              message: "Please input your year!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="schoolMarks"
          label="Enter School Marks"
          rules={[
            {
              required: true,
              message: "Please input your Marks!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="university"
          label="Enter University"
          rules={[
            {
              required: true,
              message: "Please input your University",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="graduatingYear"
          label="Enter Graduating Year"
          rules={[
            {
              required: true,
              message: "Please input your year!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="cgpa"
          label="Enter Your CGPA "
          rules={[
            {
              required: true,
              message: "Please input your CGPA !",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="intro"
          label="Intro"
          rules={[
            {
              required: true,
              message: "Please input Intro",
            },
          ]}
        >
          <Input.TextArea showCount maxLength={50} />
        </Form.Item>

        <Form.Item
          name="website"
          label="Website"
          rules={[
            {
              required: true,
              message: "Please input website!",
            },
          ]}
        >
          <AutoComplete
            options={websiteOptions}
            onChange={onWebsiteChange}
            placeholder="website"
          >
            <Input />
          </AutoComplete>
        </Form.Item>
        <Form.Item
          name="project1"
          label="Enter About Project 1"
          rules={[
            {
              required: true,
              message: "Please input Project",
            },
          ]}
        >
          <Input.TextArea showCount maxLength={200} />
        </Form.Item>
        <Form.Item
          name="project2"
          label="Enter About Project 2"
          rules={[
            {
              required: true,
              message: "Please input Project ",
            },
          ]}
        >
          <Input.TextArea showCount maxLength={200} />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: "Please select gender!",
            },
          ]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item style={{ marginLeft: "18.5rem" }}>
          <Space size={"large"}>
            <Button type="primary" htmlType="submit" >
              Save
            </Button>
            <Button type="primary" onClick={() => setOpen(true)}>
              Preview
            </Button>
            <Button type="primary" onClick={() => handleDraft(templateValue)}>
              Save as Draft
            </Button>
            <Button type="primary" htmlType="reset">
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Modal
        title="Select if you want to change template again"
        centered
        bodyStyle={{ height: "auto", boxShadow: "0 4px 6px -6px #222" }}
        open={open}
        footer={null}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Select
          defaultValue={`Template ${templateValue}`}
          style={{ width: 120, marginBottom: "1rem" }}
          onChange={handleChange}
          options={[
            { value: "1", label: "Template 1" },
            { value: "2", label: "Template 2" },
            { value: "3", label: "Template 3" },
          ]}
        />
        {handleTemplateToShowWith(templateValue)}
        <button
          onClick={handleTemplateChosen}
          style={{
            padding: "1rem",
            marginLeft: "24rem",
            borderRadius: "1rem",
            border: "none",
            cursor: "pointer",
            backgroundColor: "orange",
          }}
        >
          Continue with this
        </button>
      </Modal>
    </div>
  );
}

export default Details;
