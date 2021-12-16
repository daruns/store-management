import React, { useState } from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../actions/categoryActions';
import AddEditCategory from './AddEditCategory';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const { Meta } = Card;

const CategoryCard = ({category}) => {
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
      <Link to={`/admin/${category.id}/products`}>
      <img
        style={{minHeight: 150,maxHeight: 150,minWidth: '100%',maxWidth: '100%',}}
        alt="category"
        src={category.logo ? `${process.env.REACT_APP_API_URL}/files/${category.logo}`  : 'https://icon-library.com/images/1041139-200_42853.png'}
        />
      </Link>
    }
    actions={[
      <DeleteOutlined style={{bottom: 0}} onClick={()=> { dispatch(deleteCategory({id:category.id, }, id)) }} key="delete" />,
      <EditOutlined style={{bottom: 0}} onClick={()=>showModal('Edit')} key="edit" />,
    ]}
  >
    <Meta
      title={<Link to={`/admin/${category.id}/products`}>{category.name}</Link>}
    />
  </Card>
  { isModalVisible &&
   <AddEditCategory action={action} payload={category} handleCancel={handleCancel} handleOk={handleOk} isModalVisible={isModalVisible}  />
  }
  </>
)};

export default CategoryCard;