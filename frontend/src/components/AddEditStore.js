import { Upload, Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Modal, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addStore, editStore } from '../actions/storeActions';


const AddEditStore = ({isModalVisible, handleOk, handleCancel, action, payload}) => {
  let [storeName, setStoreName] = useState('');
  let [file, setFile] = useState(null);
  let dispatch = useDispatch();

  function validate() {
      if(!storeName){
      alert('Please provide store name!');
      }else{
        let data = new FormData();
        data.append('name', storeName);
        if(file) {
          console.log("Hello")
        data.append('logo', file);
        }
        if(action === 'Add'){
        dispatch(addStore(data));
        }else{
        data.append('id', payload.id)
        dispatch(editStore(data));
        }

        handleOk();
      }
  }

  useEffect(() => {
      if(action === 'Edit'){
      setStoreName(payload.name);
      }
  },[])

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
      <Modal title={action+' Store'} visible={isModalVisible} onOk={()=>{ validate(); }} onCancel={() => {handleCancel();}}>
        <Input value={storeName} onChange={(evt) => {setStoreName(evt.target.value);}} placeholder="Store name" />
        <Upload {...props}>
        <Button style={{marginTop:10}} icon={<UploadOutlined />}>Upload store picture</Button>
        </Upload>
      </Modal>
    </>
  );
};

export default AddEditStore;