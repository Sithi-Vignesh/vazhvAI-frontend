const ProductItem = ({ product, onClick }) => {
  return (
    <div className="product-item" onClick={onClick}>
      <div className="product-icon">
        <i className={`fas fa-${product.icon}`}></i>
      </div>
      <div className="product-name">{product.name}</div>
    </div>
  );
};

export default ProductItem;