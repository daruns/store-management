import React, { useState, useEffect } from 'react';
import StoreCard from "../components/StoreCard";
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddEditStore from "../components/AddEditStore";
import { useDispatch } from 'react-redux';
import { connect, useSelector } from "react-redux";
import { fetchStores } from '../actions/storeActions';
import { PageHeader } from 'antd';
import { Link } from 'react-router-dom';

const Stores = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [action, setAction] = useState(false);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStores());
      },[dispatch]);

    let stores =  useSelector(state => state.store.stores);
    
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
            title={'Stores ' + '(' + stores.length + ')'}
            extra={[
              <Button type="primary" style={{textDecorationLine: 'none'}}>
              <Link to="/" type="primary" style={{textDecorationLine: 'none'}}>
                Go to Home
              </Link>
              </Button>
            ]}

        />
      <div className="row" style={{padding: 15}}>
      {stores.length ===0 && <div style={{marginTop:17}}>No stores are available</div>}
          {stores.map(store => {
            return (
            <div className="col-lg-2 col-md-3 col-sm-2" style={{padding:10}} key={store.id}>
            <StoreCard store={store}  />
            </div>);
          })}

      </div>
      <Button onClick={() => showModal('Add')} style={{position: 'fixed', bottom:10, right:10}} type="primary" shape="circle" icon={<PlusOutlined />} />
      { isModalVisible &&
      <AddEditStore action={action} handleCancel={handleCancel} handleOk={handleOk} isModalVisible={isModalVisible}  />
      }
      </>
    );
  }
  
  const mapStateToProps = state => ({
    stores: state.store.stores,
  });

  export default connect(mapStateToProps, null)(Stores);