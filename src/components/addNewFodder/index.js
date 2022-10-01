import React, {useState, useEffect} from "react";
import {Form, Select, Button, InputNumber} from "antd";

const AddNewFodder = (props) => {
    const [fodderList, setFodderList] = useState([]);
    const [fodderCatList, setFodderCatList] = useState([]);
    const [formValues, setFormValues] = useState({});
    const [selectedFodder, setSelectedFodder] = useState(0);
    const [selectedSubFodder, setSelectedSubFodder] = useState("");
    const [loading, setLoading] = useState(false);
    console.log("form", props.formData);
    useEffect(() => {
        onFormValueChange(props.formData);
    }, []);
    const onFormValueChange = (inputValues) => {
        setFormValues((p) => {
            return {
                ...p,
                ...inputValues
            };
        });
    };
    const onFinish = (values) => {
        console.log("Success:", values);
        setLoading(true);
        setFormValues({});
        saveFodder(values)
    };
    async function saveFodder(value) {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        };
        fetch('http://localhost:8080/api/expense/fodder', requestOptions).then((response) => response.json()).then((response) => {
            console.log(response);
            setLoading(false);
            props.onSubmitSuccess();
        }).catch((err) => {
            props.onSubmitFailure();
        });
    }
    useEffect(() => {
        fetch('http://localhost:8080/api/metadata/fodderTypes').then((response) => response.json()).then((response) => {
            console.log(response);
            setFodderList(response);
            setSelectedFodder(response[0].id);
            formValues["fodder_cat_id"] = response[0].id;
            var values = formValues;
            setFormValues(values);
        });
    }, []);

    const handleChangeSelectedAnimal = (val) => {
        setSelectedFodder(val);
    }
    useEffect(() => {
        if (selectedFodder != "") {
            fetch('http://localhost:8080/api/metadata/fodder/' + selectedFodder + '/subTypes').then((response) => response.json()).then((response) => {
                console.log(response);
                setFodderCatList(response);
                formValues["fodder_sub_cat_id"] = response[0].id;
                var values = formValues;
                setFormValues(values);
            });
        }
    }, [selectedFodder]);

    const handleChangeSelectedSubFodder = (value) => {
        setSelectedSubFodder(value);
        formValues["fodder_sub_cat_id"] = value;
        var values = formValues;
        setFormValues(values);
    }

    console.log(formValues);
    return (
        <Form labelCol={
                {span: 8}
            }
            wrapperCol={
                {span: 14}
            }
            initialValues={
                props.formData
            }
            layout="horizontal"
            onFinish={onFinish}
            onValuesChange={onFormValueChange}
            labelWrap>
            {
            fodderList.length > 0 ? <Form.Item label="Fodder Category" name="fodder_cat_id"
                rules={
                    [{
                            required: true,
                            message: 'Please select fodder cateogy!'
                        }]
            }>
                <Select defaultValue={
                        {
                            value: props.formData.fodder_cat_id,
                            label: props.formData.fodder_cat_id
                        }
                    }
                    onChange={handleChangeSelectedAnimal}>
                    {
                    fodderList.map((fodder) => <Select.Option key={
                            fodder.id
                        }
                        value={
                            fodder.id
                    }>
                        {
                        fodder.name
                    }</Select.Option>)
                } </Select>

            </Form.Item> : <></>
        }
            {
            fodderCatList.length > 0 ? <Form.Item label="Fodder Sub Category" name="fodder_sub_cat_id"
                rules={
                    [{
                            required: true,
                            message: 'Please select fodder sub category!'
                        }]
            }>

                <Select defaultValue={
                        {
                            value: props.formData.fodder_sub_cat_id,
                            label: props.formData.fodder_sub_cat_id
                        }
                    }
                    onChange={handleChangeSelectedSubFodder}>
                    {
                    fodderCatList.map((fodderCat) => <Select.Option key={
                            fodderCat.id
                        }
                        value={
                            fodderCat.id
                    }>
                        {
                        fodderCat.name
                    }</Select.Option>)
                } </Select>

            </Form.Item> : <></>
        }
            <Form.Item label="Select" name="season_type"
                rules={
                    [{
                            required: true,
                            message: 'Please Select season type!'
                        }]
            }>
                <Select defaultValue={
                    {
                        value: props.formData.season_type,
                        label: props.formData.season_type
                    }
                }>
                    <Select.Option value="Rabi">Rabi</Select.Option>
                    <Select.Option value="Kharif">Kharif</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="year" name="year"
                rules={
                    [{
                            required: true,
                            message: 'Please enter year!'
                        }]
                }
                initialValue={
                    props.formData.year
            }>
                <InputNumber/>
            </Form.Item>
            <Form.Item label="Seeds (Kgs)" initialValue="1" name="seeds_quantity">
                <InputNumber/>
            </Form.Item>
            <Form.Item label="Seeds Price(Rs./kg)" name="seeds_rate">
                <InputNumber/>
            </Form.Item>
            <Form.Item label="No. Of Man Days" name="labour_hours">
                <InputNumber/>
            </Form.Item>
            <Form.Item label="Rate/Man Day" name="labour_rate">
                <InputNumber/>
            </Form.Item>
            <Form.Item label="Diesel For Irrigation (Qt./Ltr)" name="diesel_quantity">
                <InputNumber/>
            </Form.Item>
            <Form.Item label="Pesticides (Kgs)" name="pesticides_quantity">
                <InputNumber/>
            </Form.Item>
            <Form.Item label="Pesticides Price(Rs./kg)" name="pesticides_rate">
                <InputNumber/>
            </Form.Item>
            <Form.Item label="FYM (Kgs)" name="fym_quantity">
                <InputNumber/>
            </Form.Item>
            <Form.Item label="FYM Price(Rs./kg)" name="fym_rate">
                <InputNumber/>
            </Form.Item>
            Fertilizers
            <Form.Item label="Urea (Kgs)" name="fertilizer_urea_quantity">
                <InputNumber/>
            </Form.Item>
            <Form.Item label="Urea Price(Rs./kg)" name="fertilizer_urea_rate">
                <InputNumber/>
            </Form.Item>
            <Form.Item label="DAP (Kgs)" name="fertlizer_dap_quantity">
                <InputNumber/>
            </Form.Item>
            <Form.Item label="DAP Price(Rs./kg)" name="fertlizer_dap_price">
                <InputNumber/>
            </Form.Item>
            <Form.Item label="Micronutrients (Kgs)" name="fertlizer_micro_quantity">
                <InputNumber/>
            </Form.Item>
            <Form.Item label="Micronutrients Price(Rs./kg)" name="fertlizer_micro_rate">
                <InputNumber/>
            </Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
            <Button key="back"
                onClick={
                    () => {
                        setLoading(false);
                        props.onCancel();
                    }
            }>
                Cancel
            </Button>
        </Form>
    );
};

export default AddNewFodder;
