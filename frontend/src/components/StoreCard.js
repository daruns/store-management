import React, { useState } from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddEditStore from './AddEditStore';
import { useDispatch } from 'react-redux';
import { deleteStore } from '../actions/storeActions';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const StoreCard = ({store}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [action, setAction] = useState(false);
  let dispatch = useDispatch();
  
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
      <Link to={`/admin/${store.id}/categories`}>
      <img
        style={{minHeight: 150,maxHeight: 150,minWidth: '100%',maxWidth: '100%',}}
        alt="store"
        src={store.logo ? `${process.env.REACT_APP_API_URL}/files/${store.logo}`  : 'https://icon-library.com/images/1041139-200_42853.png'}
        />
      </Link>
    }
    actions={[
      <DeleteOutlined onClick={()=> { dispatch(deleteStore({id:store.id})) }} key="delete" />,
      <EditOutlined onClick={()=>showModal('Edit')} key="edit" />,
    ]}
  >
    <Meta
      title={<Link to={`/admin/${store.id}/categories`}>{store.name}</Link>}
    />
  </Card>
  { isModalVisible &&
   <AddEditStore action={action} payload={store} handleCancel={handleCancel} handleOk={handleOk} isModalVisible={isModalVisible}  />
  }
  </>
)};

export default StoreCard;