import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const OwnershipContext = createContext();

export const OwnershipProvider = ({ children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOwnership, setSelectedOwnership] = useState('Ownership');
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const dateInputRef = useRef(null);

  const [ownerships, setOwnerships] = useState([]);
  const [selectedItemsMap, setSelectedItemsMap] = useState({});
  const [editId, setEditId] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [activeTab, setActiveTab] = useState('OwnInterest');

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openDatePicker = () => {
    if (dateInputRef.current) dateInputRef.current.showPicker();
  };

  const handleOwnershipSelect = (type) => {
    setSelectedOwnership(type);
    setDropdownOpen(false);
  };

  const addOwnership = (newData) => {
    setOwnerships((prev) => [...prev, { ...newData, id: newData.id || Date.now() }]);
  };

  const deleteOwnership = (id) => {
    setOwnerships((prev) => prev.filter((item) => item.id !== id));
    setSelectedItemsMap((prev) => {
      const updated = {};
      for (const key in prev) {
        updated[key] = prev[key].filter((itemId) => itemId !== id);
      }
      return updated;
    });
  };

  const updateOwnership = (id, updatedItem) => {
    setOwnerships((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const editOwnership = (id, updatedData) => {
    setOwnerships((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const toggleSelectItem = (componentKey, id) => {
    setSelectedItemsMap((prev) => {
      const selected = prev[componentKey] || [];
      const updated = selected.includes(id)
        ? selected.filter((itemId) => itemId !== id)
        : [...selected, id];
      return { ...prev, [componentKey]: updated };
    });
  };

  const toggleSelectAll = (componentKey, allIds) => {
    setSelectedItemsMap((prev) => {
      const selected = prev[componentKey] || [];
      const alreadyAllSelected = selected.length === allIds.length;
      return {
        ...prev,
        [componentKey]: alreadyAllSelected ? [] : allIds,
      };
    });
  };

  return (
    <OwnershipContext.Provider
      value={{
        dropdownOpen,
        setDropdownOpen,
        selectedOwnership,
        handleOwnershipSelect,
        dropdownRef,
        dateInputRef,
        openDatePicker,
        searchQuery,
        setSearchQuery,

        activeTab,
        setActiveTab,

        ownerships,
        addOwnership,
        deleteOwnership,
        updateOwnership,

        selectedItemsMap,
        toggleSelectItem,
        toggleSelectAll,

        editId,
        setEditId,
        viewId,
        setViewId,
        editOwnership,
      }}
    >
      {children}
    </OwnershipContext.Provider>
  );
};

export const useOwnership = () => useContext(OwnershipContext);
