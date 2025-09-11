import ProductItem from './ProductItem';

const ProductsSection = () => {
  const products = [
    { name: 'Fruits', icon: 'apple-alt' },
    { name: 'Vegetables', icon: 'carrot' },
    { name: 'Eggs', icon: 'egg' },
    { name: 'Jams', icon: 'wine-bottle' },
    { name: 'Dairy', icon: 'cheese' },
    { name: 'Greens', icon: 'leaf' }
  ];
  
  const handleProductClick = (e) => {
    e.target.style.backgroundColor = '#e8f5e8';
    setTimeout(() => {
      e.target.style.backgroundColor = '#f8f9fa';
    }, 300);
  };
  
  return (
    <div className="profile-section">
      <h2 className="section-title">
        <i className="fas fa-seedling"></i>
        Products
        <span className="section-badge">12 items</span>
      </h2>
      <div className="products-grid">
        {products.map((product, index) => (
          <ProductItem 
            key={index} 
            product={product} 
            onClick={handleProductClick} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;