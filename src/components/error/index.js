import {
    Form,
    Input,Button,
    Select,
    InputNumber,
    Switch,
    Result,
  } from "antd";
const ResultWidget=(props)=>{
    return <Result
    status="error"
    title="Submission Failed"
    subTitle="Please check and modify the following information before resubmitting."
    extra={[
      <Button onClick={props.update} key="buy">Buy Again</Button>,
    ]}
  ></Result>
};
export default ResultWidget;