"use client"

import { useState } from 'react';
import searchAddress from '../utils/searchAddress';

const SearchComponent = () => {
  const [address, setAddress] = useState('');

  const handleSearch = () => {
    searchAddress(address);
  };

  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Nhập địa chỉ cần tìm"
      />
      <button onClick={handleSearch}>Tìm kiếm</button>
    </div>
  );
};

export default SearchComponent;
