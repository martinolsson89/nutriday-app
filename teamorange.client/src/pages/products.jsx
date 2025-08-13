import React, { useState, useEffect } from 'react';
import { Cake } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../services/Products';
import Fuse from 'fuse.js';
import { ViewProduct } from '../components/viewproduct';
import ApiService from '../services/api-service';
import WaterTracker from '../components/waterTracker';

export function Products(props) {
  const [filteredItems, setFilteredItems] = useState([]); // Initiate an empty list with no products.
  const [filter, setFilter] = useState(props.searchFilter || "");
  const [pageNr, setPageNr] = useState(0);
  const [pageMax, setPageMax] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [hasSearched, setHasSearched] = useState(false); // Then track the products that have been searched for.
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold the selected product data
  const [selectedProductName, setSelectedProductName] = useState(""); // State to hold the selected product name
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800); // Detect screen size
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState(null);

  const fuseOptions = {
    keys: ['namn'],
    includeScore: true,
    threshold: 0.4,
  };

  // Update `isMobile` whenever the screen is resized
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // This part retrieves the search filter and page number from sessionStorage on effect.
  useEffect(() => {
    const storedFilter = sessionStorage.getItem('searchFilter');
    const storedPageNr = sessionStorage.getItem('pageNr');

    if (storedFilter) {
      setFilter(storedFilter);
      setHasSearched(true);
    }
    if (storedPageNr) {
      setPageNr(Number(storedPageNr));
    }
  }, []);

  // And this filters the products based on the search filter.
  useEffect(() => {
    if (hasSearched) {
      const searchTerm = filter.toLowerCase();
      const fuse = new Fuse(products, fuseOptions);
      const fuseResults = fuse.search(filter);
      const fuseProducts = fuseResults.map(result => result.item);

      // get all products that include the search term anywhere in the name
      const containsMatches = products.filter(product =>
        product.namn.toLowerCase().includes(searchTerm)
      );

      // sort products that contain the search term by:
      // 1. filter exact or start matches first, for example 'Öl' starts with 'Öl'
      // 2. matches anywhere else
      const sortedMatches = containsMatches.sort((a, b) => {
        const aIndex = a.namn.toLowerCase().indexOf(searchTerm);
        const bIndex = b.namn.toLowerCase().indexOf(searchTerm);

        if (aIndex === 0 && bIndex !== 0) return -1; // a starts with the search term
        if (bIndex === 0 && aIndex !== 0) return 1;  // b starts with the search term
        return aIndex - bIndex; // otherwise, sort by first occurrence of search term
      });

      // avoid duplicates
      const uniqueFuseResults = fuseProducts.filter(product =>
        !sortedMatches.some(match => match.namn === product.namn)
      );

      // combine them
      const filteredProducts = [...sortedMatches, ...uniqueFuseResults];

      setFilteredItems(filteredProducts);
      setPageMax(Math.ceil(filteredProducts.length / 10));
      setTotalCount(filteredProducts.length);
    }
  }, [filter, hasSearched]);


  // This part handles the updated search functionality.
  const onSearch = async (e) => {
    e.preventDefault();
    const searchFilter = document.getElementById("search").value;
    setFilter(searchFilter);
    setHasSearched(true);

    // This resets to the first page for a new search.
    setPageNr(0);

    // This part stores the filter in sessionStorage, but resets the page number.
    sessionStorage.setItem('searchFilter', searchFilter);
    sessionStorage.removeItem('pageNr'); // Clearing page number for new searches.
  };

  // Handling previous page clicks.
  const onPrevClick = () => {
    if (pageNr > 0) {
      const newPageNr = pageNr - 1;
      setPageNr(newPageNr);

      sessionStorage.setItem('pageNr', newPageNr); // Stores the current page in sessionStorage.
    }
  };

  // Handling next page clicks.
  const onNextClick = () => {
    if (pageNr < pageMax - 1) {
      const newPageNr = pageNr + 1;
      setPageNr(newPageNr);

      sessionStorage.setItem('pageNr', newPageNr); // Same as above.
    }
  };

  const paginatedItems = filteredItems.slice(pageNr * 10, (pageNr + 1) * 10);

  // Handling click on product in the list.
  const handleProductClick = async (productId, productName) => {
    // When not on mobile, fetch data inside the Products component
    console.log("Clicked product:", productId, productName);  // Log to check if product is clicked
    if (!isMobile) {
      const service = new ApiService();
      const productData = await service.getItemNutrition(productId);
      console.log("Fetched group data:", productData);  // Log to verify API response
      setSelectedProduct(productData);
      setSelectedProductName(productName);
      setSelectedProductId(productId);
    } else {
      // Redirect to a new page on mobile
      navigate(`/viewproduct/${productId}`);
    }
  };

  return (
    <div className="container-fluid">
      {/* Top row: Search bar */}
      <div className="search-bar-container">
        <h2 className="groups mb-4 d-flex justify-content-center align-items-center">
          <Cake className="bi bi-cake flex-shrink-0 me-3" width="1.75em" height="1.75em" />
          <span className="text-content">Näringsämnen</span>
        </h2>
        <p className="famous mb-4 text-center fs-5">Sök efter matprodukter!</p>
        <div className="justify-content-center">
          <ListSearch searchFilter={filter} onSearch={onSearch} />
        </div>
      </div>

      {/* Bottom row: Product list on the left, Group view on the right */}
      <div className="d-flex" style={{ flex: 1 }}>
        {/* Left side: Product list */}
        <div className="product-list-container">
          {hasSearched ? (
            filteredItems.length > 0 ? (
              <>
                <div className="total mb-4 fs-5">Totala mängden produkter: {totalCount}</div>
                <List
                  items={paginatedItems}
                  onProductClick={handleProductClick}
                  selectedProductId={selectedProductId}
                />
                <ListPager
                  onPrevClick={onPrevClick}
                  onNextClick={onNextClick}
                  currentPage={pageNr}
                  totalPages={pageMax}
                />
              </>
            ) : (
              <div className="text-white"></div>
            )
          ) : (
            <p className="text-white"></p>
          )}
        </div>

        {/* Right side: Group view (only visible if not on mobile and hasSearched) */}
        {!isMobile && hasSearched && (
          <div className="product-view-container">
            {/* Show message if hasSearched is true but no selected product */}
            {!selectedProduct && (
              <div className="text-center"><h5>Välj en produkt för att visa detaljer</h5></div>
            )}

            {/* Show GroupView if a product is selected */}
            {selectedProduct && (
              <ViewProduct group={selectedProduct} groupName={selectedProductName} />
            )}
          </div>
        )}


      </div>
      <div>
        <WaterTracker />
      </div>
    </div>
  );
}

export function ListSearch(props) {
  const onClick = (e) => {
    e.preventDefault();
    e.searchFilter = document.getElementById("search").value;
    if (props.onSearch) props.onSearch(e);
  };

  return (
    <div className="row mb-4 justify-content-center">
      <div className="col-md-8">
        <form className="d-flex" role="search">
          <input id='search' className="form-control me-2" type="search" placeholder="Sök efter matprodukt"
            defaultValue={props.searchFilter} aria-label="Search" />
          <button className="btn btn-outline-light" onClick={onClick}>Sök</button>
        </form>
      </div>
    </div>
  );
}

export function List(props) {
  return (
    <div className="row row-cols-1 row-cols-lg-1 align-items-stretch g-4">
      <div className="col-12">
        <div className="row mb-2 text-center themed-grid-head-row">
          <div className="col-md-12 themed-grid-head-col">Produkter</div>
        </div>
        {props.items.map((product) => (
          <div
            key={product.nummer}
            onClick={() => props.onProductClick(product.nummer, product.namn)}
            style={{ cursor: 'pointer' }}
            className={`product-item ${product.nummer === props.selectedProductId ? 'selected-product' : ''
              }`}
          >
            <div className="row mb-2 text-center themed-grid-row">
              <div className="col-md-12 themed-grid-col">{product.namn}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// Handles the new pagination.
export function ListPager(props) {
  const onPrevClick = (e) => {
    if (props.onPrevClick) props.onPrevClick(e);
  };

  const onNextClick = (e) => {
    if (props.onNextClick) props.onNextClick(e);
  };

  console.log('Current page:', props.currentPage);
  console.log('Total pages:', props.totalPages);

  return (
    <nav aria-label="Standard pagination example" className="text-center">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button className="page-link btn btn-secondary" onClick={onPrevClick}>&laquo;</button>
        </li>
        <li className="page-item disabled">
          <span className="page-link">
            Sida {isNaN(props.currentPage) ? 1 : props.currentPage + 1} av {isNaN(props.totalPages) ? 1 : props.totalPages}
          </span>
        </li>

        <li className="page-item">
          <button className="page-link btn btn-secondary" onClick={onNextClick}>&raquo;</button>
        </li>
      </ul>
    </nav>
  );
}


