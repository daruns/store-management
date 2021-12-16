import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddEditProduct from "../components/AddEditProduct";
import { useDispatch } from 'react-redux';
import { connect, useSelector } from "react-redux";
import { fetchProducts } from '../actions/productActions';
import ProductCard from '../components/ProductCard';
import { Link, useParams } from 'react-router-dom';
import { PageHeader } from 'antd';

const Products = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [action, setAction] = useState(false);
    let dispatch = useDispatch();

    let { id } = useParams()

    useEffect(() => {
        dispatch(fetchProducts(id));
      },[dispatch]);

    let products =  useSelector(state => state.product.products);

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
            title={'Products ' + '(' + products.length + ')'}
            extra={[
              <Button type="primary" style={{textDecorationLine: 'none'}}>
              <Link to="/" type="primary" style={{textDecoration: 'none'}}>
                Go to Home
              </Link>
              </Button>
            ]}
            onBack={() => window.history.back()}
        />
      <div className="row" style={{padding: 15}}>
          {products.length ===0 && <div style={{marginTop:17}}>No products are available</div>}
          {products.map(product => {
            return (
            <div className="col-lg-2 col-md-3 col-sm-2" style={{padding:10}} key={product.id}>
            <ProductCard product={product}  />
            </div>);
          })}

      </div>
      <Button onClick={() => showModal('Add')} style={{position: 'fixed', bottom:10, right:10}} type="primary" shape="circle" icon={<PlusOutlined />} />
      { isModalVisible &&
      <AddEditProduct action={action} handleCancel={handleCancel} handleOk={handleOk} isModalVisible={isModalVisible}  />
      }
      </>
    );
  }
  
  const mapStateToProps = state => ({
    products: state.store.products,
  });

  export default connect(mapStateToProps, null)(Products);