import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect, useSelector } from "react-redux";
import { fetchAllProducts } from '../actions/productActions';
import ProductToShowCard from '../components/ProductToShowCard';
import { PageHeader } from 'antd';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Products = () => {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllProducts());
      },[dispatch]);

    let products =  useSelector(state => state.product.products);

    return (
        <>
          <PageHeader
            className="site-page-header"
            title={'Products ' + '(' + products.length + ')'}
            extra={[
                <Button type="primary" style={{textDecorationLine: 'none'}}>
                <Link to="/admin/stores" type="primary" style={{textDecorationLine: 'none'}}>
                  Go to Admin panel
                </Link>
                </Button>
              ]}
        />
      <div className="row" style={{padding: 15}}>
         {products.length ===0 && <div>No products are available</div>}
          {products.map((product, i) => {
            return (
            <div className="col-lg-2 col-md-3 col-sm-2" style={{padding:10}} key={product.id}>
            <ProductToShowCard product={product}  />
            </div>);
          })}
      </div>
      </>
    );
  }
  
  const mapStateToProps = state => ({
    products: state.store.products,
  });

  export default connect(mapStateToProps, null)(Products);