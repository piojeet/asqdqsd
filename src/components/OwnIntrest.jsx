import React from 'react'
import { CalendarDays, ChevronDown, Eye, PencilLine, Plus, Search, Trash2 } from 'lucide-react'
import { TbCaretUpDownFilled } from 'react-icons/tb'
import { useOwnership } from '../context/OwnershipContext'
import OwnIntrestCreate from './OwnIntrestCreate'

function OwnIntrest() {
  const {
    dropdownOpen,
    setDropdownOpen,
    selectedOwnership,
    handleOwnershipSelect,
    dropdownRef,
    dateInputRef,
    openDatePicker,
    searchQuery,
    setSearchQuery,

    ownerships,
    deleteOwnership,

    selectedItems,
    toggleSelectItem,
    toggleSelectAll,

    viewId,
    setViewId,
    setEditId,
    editId,
  } = useOwnership()

  const [showForm, setShowForm] = React.useState(false)

  // Get data for editing, if editId is set
  const selectedData = ownerships.find((item) => item.id === editId)

  // Filter ownerships based on searchQuery and selectedOwnership
const filteredOwnerships = ownerships.filter(item => {
  if (item.type !== 'Ownership') return false;
  const org = item.organization || "";
  const matchesSearch = org.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesType = selectedOwnership === 'Ownership' || item.type === selectedOwnership;
  return matchesSearch && matchesType;
});




  const formatDate = (dateInput) => {
    const date = new Date(dateInput)
    return date.toLocaleDateString('en-GB').split('/').join('.')
  }

  // Open modal for creating new role
  const openCreateForm = () => {
    setEditId(null)  // Clear edit mode
    setShowForm(true)
  }

  // Open modal for editing existing role
  const openEditForm = (id) => {
    setEditId(id)
    setShowForm(true)
  }

  // Close modal & reset states
  const closeForm = () => {
    setShowForm(false)
    setEditId(null)
  }
  
   // Get the ownership item user wants to view
  const viewedItem = ownerships.find(item => item.id === viewId)

  return (
    <div>
      <div className='text-2xl font-bold text-heading-color font-manropeb'>Ownership Interests</div>

      <div className='mt-6'>
        <form action="#" className='flex gap-4'>

          {/* Search Input */}
          <div className='relative w-full'>
            <input
              type="text"
              id='tablesearch'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search Here...'
              className='w-full border border-border outline-none py-4 px-5 text-heading-color font-manrope-r font-normal rounded-xl'
            />
            <Search className='absolute right-5 top-1/2 -translate-y-1/2 text-heading-color' />
          </div>

          {/* Dropdown */}
          <div className='relative' ref={dropdownRef}>
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className='border border-border py-4 px-5 text-heading-color font-manrope-r font-normal rounded-xl flex items-center gap-2.5 min-w-[150px] cursor-pointer justify-between'
            >
              {selectedOwnership} <ChevronDown size={18} />
            </div>
            {dropdownOpen && (
              <div className='absolute top-full mt-1 bg-bg-light w-full border border-blue/20 rounded-md shadow-md z-10'>
                <div
                  className='py-2 px-3 hover:bg-blue-100 cursor-pointer'
                  onClick={() => handleOwnershipSelect('Ownership')}
                >
                  Ownership
                </div>
                <div
                  className='py-2 px-3 hover:bg-blue-100 cursor-pointer'
                  onClick={() => handleOwnershipSelect('A')}
                >
                  A
                </div>
                <div
                  className='py-2 px-3 hover:bg-blue-100 cursor-pointer'
                  onClick={() => handleOwnershipSelect('B')}
                >
                  B
                </div>
              </div>
            )}
          </div>

          {/* Date Picker */}
          <div
            onClick={openDatePicker}
            className='border border-border py-4 px-5 text-heading-color font-manrope-r font-normal rounded-xl min-w-[150px] cursor-pointer flex items-center justify-between gap-2 relative'
          >
            <span>Date</span>
            <CalendarDays size={20} />
            <input
              type="date"
              name="datefilter"
              id="datefilter"
              ref={dateInputRef}
              className='absolute top-0 left-0 w-full h-full opacity-0 pointer-events-none'
            />
          </div>

        </form>
      </div>

      {/* Table */}
      <div className='mt-6 overflow-auto'>
        <table className='w-full text-left'>
          <thead>
            <tr className='text-[#687588] text-xs font-manropeb !rounded-lg'>
              <th className='bg-bg-light rounded-l-lg'>
                <span className='flex justify-between items-center py-4 px-2.5'>
                  <span className='flex items-center gap-2.5'>
                    <input
                      type="checkbox"
                      name="selectall"
                      id="selectall"
                      checked={selectedItems.length === ownerships.length && ownerships.length > 0}
                      onChange={toggleSelectAll}
                    /> Type
                  </span>
                  <TbCaretUpDownFilled />
                </span>
              </th>
              <th className='bg-bg-light'><span className='flex justify-between items-center py-4 px-2.5'>Organization <TbCaretUpDownFilled /></span></th>
              <th className='bg-bg-light'><span className='flex justify-between items-center py-4 px-2.5'>Ownership % <TbCaretUpDownFilled /></span></th>
              <th className='bg-bg-light'><span className='flex justify-between items-center py-4 px-2.5'>Country <TbCaretUpDownFilled /></span></th>
              <th className='bg-bg-light'><span className='flex justify-between items-center py-4 px-2.5'>Last Updated <TbCaretUpDownFilled /></span></th>
              <th className='bg-bg-light rounded-r-lg'><span className='text-right block py-4 px-2.5'>Action</span></th>
            </tr>
          </thead>
          <tbody>
            {filteredOwnerships.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500">
                  No ownership interests found.
                </td>
              </tr>
            ) : (
              filteredOwnerships.map(item => (
                <tr key={item.id} className='border-b border-border text-heading-color font-manrope-m font-medium text-xs'>
                  <td>
                    <span className='px-2.5 py-[18px] flex gap-2.5 items-center'>
                      <input
                        type="checkbox"
                        name="select"
                        id={`select-${item.id}`}
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                      /> {item.ownershipType}
                    </span>
                  </td>
                  <td><span className='px-2.5 py-[18px] inline-block'>{item.orgName}</span></td>
                  <td><span className='px-2.5 py-[18px] inline-block'>{item.ownershipPercentage}%</span></td>
                  <td><span className='px-2.5 py-[18px] inline-block'>{item.country}</span></td>
                  <td>
                    <span className='px-2.5 py-[18px] inline-block'>
                      {formatDate(item.startDate)}
                    </span>
                  </td>

                  <td>
                    <span className='flex items-center justify-end gap-2.5 px-2.5 py-[18px]'>
                      <button
                        onClick={() => setViewId(item.id)}
                        className='size-8 p-2 bg-[#27A376] rounded-lg text-bg-light flex items-center justify-center cursor-pointer'
                        title="View Details"
                      >
                        <Eye />
                      </button>
                      {/* You can add edit and delete handlers similarly */}
                      <button
                        onClick={() => openEditForm(item.id)} // <-- sets the item to edit
                        className='size-8 p-2 bg-blue rounded-lg text-bg-light flex items-center justify-center cursor-pointer'
                        title="Edit"
                      >
                        <PencilLine />
                      </button>

                      <button
                        onClick={() => deleteOwnership(item.id)}
                        className='size-8 p-2 bg-[#E03137] rounded-lg text-bg-light flex items-center justify-center cursor-pointer'
                        title="Delete"
                      >
                        <Trash2 />
                      </button>
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <button
          className='p-6 flex gap-2 bg-blue text-bg-light rounded-lg font-manropeb text-base cursor-pointer mt-4'
         onClick={openCreateForm}
        >
          <Plus /> Add Ownership Interest
        </button>
      </div>

      {/* Create/Edit form modal */}
      {showForm && (
        <OwnIntrestCreate
          editId={editId}
          existingData={selectedData}
          onClose={closeForm}
        />
      )}


      {/* View modal */}
      {viewId && viewedItem && (
        <div
          className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
          onClick={() => setViewId(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full"
            onClick={e => e.stopPropagation()} // Prevent modal close when clicking inside
          >
            <h2 className="text-xl font-bold mb-4">Ownership Details</h2>
            <p><strong>Type:</strong> {viewedItem.type || 'N/A'}</p>
            <p><strong>Organization:</strong> {viewedItem.organization}</p>
            <p><strong>Ownership %:</strong> {viewedItem.ownershipPercent}</p>
            <p><strong>Country:</strong> {viewedItem.country}</p>
            <p><strong>Last Updated:</strong> {viewedItem.lastUpdated}</p>

            <button
              onClick={() => setViewId(null)}
              className="mt-6 px-4 py-2 bg-blue text-bg-light rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default OwnIntrest
