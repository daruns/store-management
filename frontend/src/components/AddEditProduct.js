import { Upload, Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Modal, Input, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { connect } from "react-redux";
import { addProducts, editProducts, fetchProducts } from '../actions/productActions';
import { useParams } from 'react-router-dom';
import { Select } from 'antd';

const { Option } = Select;



const AddEditProduct = ({isModalVisible, handleOk, handleCancel, action, payload}) => {
  let [product, setProductName] = useState('');
  let [price, setPrice] = useState(0);
  let [size, setSize] = useState('md');
  let [file, setFile] = useState(null);
  let dispatch = useDispatch();

  let {id} = useParams();

  useEffect(async () => {
     await dispatch(fetchProducts(id));
     if(action === 'Edit') {
       setProductName(payload.name);
       setSize(payload.size);
       setPrice(payload.price);
     }
    },[dispatch]);


  function validate() {
      if(!product){
      alert('Please provide product name!');
      return
      }
      if(!size){
        alert('Please provide product size!');
        return
        }

        if(!price){
          alert('Please provide product price!');
          return
          }

        let data = new FormData();
        data.append('name', product);
        data.append('size', size);
        data.append('price', price);
        data.append('categoryId', id);
        if(file) {
        data.append('logo', file);
        }
        if(action === 'Add'){
        dispatch(addProducts(data, id));
        }else{
          console.log(file)
        data.append('id', Number(payload.id))
        dispatch(editProducts(data, id));
        }

        handleOk();
  }


  const props = {
    beforeUpload: file => {
      if (!file.type.includes('image')) {
        message.error(`${file.name} is not image file`);
      }else{
          setFile(file);
      }
      return file.type.includes('image') ? true : Upload.LIST_IGNORE;
    },
    onChange: info => {
        if(info.fileList.length === 0)
        setFile(null);
      },
  };

  return (
    <>
      <Modal title={action+' Product'} visible={isModalVisible} onOk={()=>{ validate(); }} onCancel={() => {handleCancel();}}>
        <Input value={product} onChange={(evt) => {setProductName(evt.target.value);}} placeholder="Product name" />
        <InputNumber addonBefore="$" min={0} value={price} onChange={value => {setPrice(Number(value))}} />
        <Select value={size} style={{ width: 120 }} onChange={value => {setSize(value)}}>
          <Option value="xs">xs</Option>
          <Option value="sm">sm</Option>
          <Option value="md">md</Option>
          <Option value="lg">lg</Option>
          <Option value="xl">xl</Option>
        </Select>
        <Upload {...props}>
        <Button style={{marginTop:10}} icon={<UploadOutlined />}>Upload product picture</Button>
        </Upload>
      </Modal>
    </>
  );
};
  
const mapStateToProps = state => ({
  stores: state.store.stores,
});

export default connect(mapStateToProps, null)(AddEditProduct);