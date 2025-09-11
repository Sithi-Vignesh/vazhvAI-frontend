import { useEffect, useMemo, useState } from 'react';
import './TradingDashboard.css';

function useFontAwesome() {
  useEffect(() => {
    const id = 'fa-6-4-0-cdn';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      document.head.appendChild(link);
    }
  }, []);
}

function TradingHeader() {
  return (
    <header>
      <div className="header-content" />
    </header>
  );
}

function FiltersSection() {
  return (
    <div className="filters-section">
      <h2 className="filter-title">
        <i className="fas fa-filter" />
        Filters
      </h2>

      <div className="filter-group">
        <label htmlFor="crop-filter">Crop Type</label>
        <select id="crop-filter" className="filter-select" defaultValue="">
          <option value="">All Crops</option>
          <option value="wheat">Wheat</option>
          <option value="rice">Rice</option>
          <option value="corn">Corn</option>
          <option value="barley">Barley</option>
          <option value="soybeans">Soybeans</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="location-filter">Location</label>
        <input type="text" id="location-filter" className="filter-input" placeholder="Enter location..." />
      </div>

      <div className="filter-group">
        <label>Price Range (per kg)</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input type="number" className="filter-input" placeholder="Min" style={{ width: '50%' }} />
          <input type="number" className="filter-input" placeholder="Max" style={{ width: '50%' }} />
        </div>
      </div>

      <div className="filter-group">
        <label>Certification</label>
        <div className="checkbox-group">
          <div className="checkbox-item">
            <input type="checkbox" id="organic" />
            <label htmlFor="organic">Organic</label>
          </div>
          <div className="checkbox-item">
            <input type="checkbox" id="non-gmo" />
            <label htmlFor="non-gmo">Non-GMO</label>
          </div>
          <div className="checkbox-item">
            <input type="checkbox" id="fair-trade" />
            <label htmlFor="fair-trade">Fair Trade</label>
          </div>
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-by">Sort By</label>
        <select id="sort-by" className="filter-select" defaultValue="newest">
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="distance">Distance</option>
        </select>
      </div>

      <button className="contact-btn" style={{ width: '100%', marginTop: '1rem' }}>Apply Filters</button>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="search-bar">
      <i className="fas fa-search" />
      <input type="text" placeholder="Search crops..." />
    </div>
  );
}

function ViewOptions({ view, onChange }) {
  return (
    <div className="view-options">
      <button className={`view-btn ${view === 'grid' ? 'active' : ''}`} onClick={() => onChange('grid')}>
        <i className="fas fa-th-large" />
      </button>
      <button className={`view-btn ${view === 'list' ? 'active' : ''}`} onClick={() => onChange('list')}>
        <i className="fas fa-list" />
      </button>
    </div>
  );
}

function ListingCard({ listing }) {
  return (
    <div className="listing-card">
      <div className="listing-image">
        <img src={listing.image} alt={listing.alt} />
      </div>
      <div className="listing-content">
        <div className="listing-header">
          <h3 className="crop-name">{listing.title}</h3>
          <span className="crop-price">{listing.price}</span>
        </div>
        <div className="listing-details">
          <div className="detail-item">
            <i className="fas fa-map-marker-alt" />
            <span>{listing.location}</span>
          </div>
          <div className="detail-item">
            <i className="fas fa-weight" />
            <span>{listing.quantity}</span>
          </div>
          <div className="detail-item">
            <i className="fas fa-calendar-alt" />
            <span>{listing.harvested}</span>
          </div>
        </div>
        <div className="farmer-info">
          <img src={listing.farmer.avatar} alt="Farmer" className="farmer-avatar" />
          <span className="farmer-name">{listing.farmer.name}</span>
          <button className="contact-btn">Contact</button>
        </div>
      </div>
    </div>
  );
}

function Pagination({ totalPages = 5, page, onChange }) {
  const pages = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);
  return (
    <div className="pagination">
      {pages.map((p) => (
        <div key={p} className={`page-btn ${p === page ? 'active' : ''}`} onClick={() => onChange(p)}>
          {p}
        </div>
      ))}
      <div className="page-btn" onClick={() => onChange(Math.min(page + 1, totalPages))}>
        <i className="fas fa-chevron-right" />
      </div>
    </div>
  );
}

function FooterSection() {
  return (
    <footer>
      <div className="container">
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">How It Works</a>
          <a href="#">For Farmers</a>
          <a href="#">For Buyers</a>
          <a href="#">Success Stories</a>
          <a href="#">Contact</a>
        </div>
        <p>&copy; 2023 vazhvAI. All rights reserved. Empowering farmers through direct trade.</p>
      </div>
    </footer>
  );
}

const LISTINGS = [
  {
    image: 'https://picsum.photos/seed/wheat/400/300.jpg',
    alt: 'Wheat',
    title: 'Organic Wheat',
    price: '₹24.50/kg',
    location: 'Punjab, India',
    quantity: '500 kg available',
    harvested: 'Harvested 2 weeks ago',
    farmer: { avatar: 'https://picsum.photos/seed/farmer1/100/100.jpg', name: 'Raj Singh' }
  },
  {
    image: 'https://picsum.photos/seed/rice/400/300.jpg',
    alt: 'Rice',
    title: 'Basmati Rice',
    price: '₹32.75/kg',
    location: 'Haryana, India',
    quantity: '750 kg available',
    harvested: 'Harvested 1 week ago',
    farmer: { avatar: 'https://picsum.photos/seed/farmer2/100/100.jpg', name: 'Priya Sharma' }
  },
  {
    image: 'https://picsum.photos/seed/corn/400/300.jpg',
    alt: 'Corn',
    title: 'Sweet Corn',
    price: '₹18.90/kg',
    location: 'Uttar Pradesh, India',
    quantity: '300 kg available',
    harvested: 'Harvested 3 days ago',
    farmer: { avatar: 'https://picsum.photos/seed/farmer3/100/100.jpg', name: 'Amit Kumar' }
  },
  {
    image: 'https://picsum.photos/seed/vegetables/400/300.jpg',
    alt: 'Vegetables',
    title: 'Mixed Vegetables',
    price: '₹15.40/kg',
    location: 'Maharashtra, India',
    quantity: '200 kg available',
    harvested: 'Harvested yesterday',
    farmer: { avatar: 'https://picsum.photos/seed/farmer4/100/100.jpg', name: 'Sunita Patil' }
  },
  {
    image: 'https://picsum.photos/seed/soybeans/400/300.jpg',
    alt: 'Soybeans',
    title: 'Non-GMO Soybeans',
    price: '₹28.30/kg',
    location: 'Madhya Pradesh, India',
    quantity: '600 kg available',
    harvested: 'Harvested 10 days ago',
    farmer: { avatar: 'https://picsum.photos/seed/farmer5/100/100.jpg', name: 'Vijay Reddy' }
  },
  {
    image: 'https://picsum.photos/seed/fruits/400/300.jpg',
    alt: 'Fruits',
    title: 'Seasonal Fruits',
    price: '₹22.15/kg',
    location: 'Karnataka, India',
    quantity: '150 kg available',
    harvested: 'Harvested 2 days ago',
    farmer: { avatar: 'https://picsum.photos/seed/farmer6/100/100.jpg', name: 'Meera Nair' }
  }
];

export default function TradingDashboard() {
  useFontAwesome();
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);

  return (
    <div>
      <div className="container">
        <div className="trading-dashboard">
          <FiltersSection />

          <div className="main-content">
            <div className="listings-section">
              <div className="listings-header">
                <h2 className="listings-title">Available Crops</h2>
                <SearchBar />
                <ViewOptions view={view} onChange={setView} />
              </div>

              <div className="listings-grid" data-view={view}>
                {LISTINGS.map((l, i) => (
                  <ListingCard key={i} listing={l} />
                ))}
              </div>

              <Pagination totalPages={5} page={page} onChange={setPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


