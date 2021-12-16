import React, { useState } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const ProductToShowCard = ({product}) => {  

return(
  <>
  <Card
    style={{minHeight: '100%',maxHeight: '100%', maxWidth: '100%', minWidth: '100%',borderRadius:5, marginTop: 2.5, padding:15 }}
    cover={
      <Link to={`/admin/${product.categoryId}/products`}>
      <img
        style={{minHeight: 150,maxHeight: 150,minWidth: '100%',maxWidth: '100%',}}
        alt="product"
        src={product.logo ? `${process.env.REACT_APP_API_URL}/files/${product.logo}`  : 'https://icon-library.com/images/1041139-200_42853.png'}
        />
      </Link>
    }
  >
    <Meta
      title={product.name}
      description={<p>Price: {product.price} <br />Size: {product.size}</p>}
    />
  </Card>
  </>
)};

export default ProductToShowCard;