import { Upload, Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Modal, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { connect } from "react-redux";
import { addCategory, editCategory } from '../actions/categoryActions';
import { useParams } from 'react-router-dom';



const AddEditCategory = ({isModalVisible, handleOk, handleCancel, action, payload}) => {
  let [categName, setCategName] = useState('');
  let [file, setFile] = useState(null);
  let dispatch = useDispatch();

    let {id} = useParams();


  function validate() {
      if(!categName){
      alert('Please provide category name!');
      return
      }

        let data = new FormData();
        data.append('name', categName);
        data.append('storeId', Number(id))
        if(file) {
        data.append('logo', file);
        }
        if(action === 'Add'){
        dispatch(addCategory(data, id));
        }else{
        data.append('id', payload.id)
        dispatch(editCategory(data, id));
        }

        handleOk();
  }

  useEffect(() => {
      if(action === 'Edit'){
        setCategName(payload.name);
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
      <Modal title={action+' Category'} visible={isModalVisible} onOk={()=>{ validate(); }} onCancel={() => {handleCancel();}}>
        <Input value={categName} onChange={(evt) => {setCategName(evt.target.value);}} placeholder="Category name" />
        <Upload {...props}>
        <Button style={{marginTop:10}} icon={<UploadOutlined />}>Upload category picture</Button>
        </Upload>
      </Modal>
    </>
  );
};
  
const mapStateToProps = state => ({
  stores: state.store.stores,
  categories: state.category.categories
});

export default connect(mapStateToProps, null)(AddEditCategory);