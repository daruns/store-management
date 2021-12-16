import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddEditCategory from "../components/AddEditCategory";
import { useDispatch } from 'react-redux';
import { connect, useSelector } from "react-redux";
import { fetchCategories } from '../actions/categoryActions';
import CategoryCard from '../components/CategoryCard';
import { Link, useParams } from 'react-router-dom'
import { PageHeader } from 'antd';

const Categories = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] =useState(false);
    const [action, setAction] = useState(false);
    let dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        dispatch(fetchCategories(id));
      },[dispatch]);

    let categories =  useSelector(state => state.category.categories);

    const showModal = (action) => {
      setAction(action);
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
            setIsModalVisible(false);
    };
  
    const handleCancel = () => {
            setIsModalVisible(false);
    };
    return (
        <>
         <PageHeader
            className="site-page-header"
            title={'Categories ' + '(' + categories.length + ')'}
            onBack={() => window.history.back()}
            extra={[
              <Button type="primary" style={{textDecorationLine: 'none'}}>
              <Link to="/" type="primary" style={{textDecorationLine: 'none'}}>
                Go to Home
              </Link>
              </Button>
            ]}
        />
      <div className="row" style={{padding: 15}}>
          {categories.length ===0 && <div style={{marginTop:17}}>No categories are available</div>}
          {categories.map(category => {
            return (
            <div className="col-lg-2 col-md-3 col-sm-2" style={{padding:10}} key={category.id}>
            <CategoryCard category={category}  />
            </div>);
          })}

      </div>
      <Button onClick={() => showModal('Add')} style={{position: 'fixed', bottom:10, right:10}} type="primary" shape="circle" icon={<PlusOutlined />} />
      { isModalVisible &&
      <AddEditCategory action={action} handleCancel={handleCancel} handleOk={handleOk} isModalVisible={isModalVisible}  />
      }
      </>
    );
  }
  
  const mapStateToProps = state => ({
    categories: state.store.categories,
  });

  export default connect(mapStateToProps, null)(Categories);