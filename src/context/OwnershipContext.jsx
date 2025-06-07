// OwnershipContext.js
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const OwnershipContext = createContext();

export const OwnershipProvider = ({ children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOwnership, setSelectedOwnership] = useState('Ownership');
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const dateInputRef = useRef(null);

  const [ownerships, setOwnerships] = useState([]); // table data
  const [selectedItems, setSelectedItems] = useState([]); // checkboxes
  const [editId, setEditId] = useState(null); // for edit
  const [viewId, setViewId] = useState(null); // for view modal
  const [activeTab, setActiveTab] = useState('OwnInterest'); // NEW: active tab tracker

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Open native date picker
  const openDatePicker = () => {
    if (dateInputRef.current) dateInputRef.current.showPicker();
  };

  const handleOwnershipSelect = (type) => {
    setSelectedOwnership(type);
    setDropdownOpen(false);
  };

  // Add new ownership entry
  const addOwnership = (newData) => {
    setOwnerships((prev) => [...prev, { ...newData, id: newData.id || Date.now() }]);
  };

  // Delete a single ownership entry
  const deleteOwnership = (id) => {
    setOwnerships((prev) => prev.filter((item) => item.id !== id));
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  // Edit an ownership entry
const updateOwnership = (id, updatedItem) => {
  setOwnerships((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, ...updatedItem } : item
    )
  );
};


  // Toggle individual checkbox
  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Select/Deselect all
  const toggleSelectAll = () => {
    if (selectedItems.length === ownerships.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(ownerships.map((item) => item.id));
    }
  };

  const editOwnership = (id, updatedData) => {
    setOwnerships((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      )
    );
  };

  return (
    <OwnershipContext.Provider
      value={{
        // UI Controls
        dropdownOpen,
        setDropdownOpen,
        selectedOwnership,
        handleOwnershipSelect,
        dropdownRef,
        dateInputRef,
        openDatePicker,
        searchQuery,
        setSearchQuery,

        // Tab Control
        activeTab,
        setActiveTab, // for switching tab views

        // Data
        ownerships,
        addOwnership,
        deleteOwnership,
        updateOwnership,

        // Selection
        selectedItems,
        toggleSelectItem,
        toggleSelectAll,

        // Edit/View
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
