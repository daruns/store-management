import React, { useState } from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { deleteProducts } from '../actions/productActions';
import AddEditProduct from './AddEditProduct';
import { useParams } from 'react-router-dom';

const { Meta } = Card;

const ProductCard = ({product}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [action, setAction] = useState(false);
  let dispatch = useDispatch();
  let {id} = useParams();
  
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = (action) => {
    setAction(action);
    setIsModalVisible(true);
  };

return(
  <>
  <Card
    style={{minHeight: '100%',maxHeight: '100%', maxWidth: '100%', minWidth: '100%',borderRadius:5, marginTop: 2.5, padding:15 }}
    cover={
      <img
        style={{minHeight: 150,maxHeight: 150,minWidth: '100%',maxWidth: '100%',}}
        alt="product"
        src={product.logo ? `${process.env.REACT_APP_API_URL}/files/${product.logo}`  : 'https://icon-library.com/images/1041139-200_42853.png'}
      />
    }
    actions={[
      <DeleteOutlined onClick={()=> { dispatch(deleteProducts({id:product.id}, id)) }} key="delete" />,
      <EditOutlined onClick={()=>showModal('Edit')} key="edit" />,
    ]}
  >
    <Meta
      title={product.name}
    />
  </Card>
  { isModalVisible &&
   <AddEditProduct action={action} payload={product} handleCancel={handleCancel} handleOk={handleOk} isModalVisible={isModalVisible}  />
  }
  </>
)};

export default ProductCard;