import React from 'react'
import { TbCaretUpDownFilled } from 'react-icons/tb'
import { Eye, PencilLine, Plus, Trash2, ChevronDown } from 'lucide-react'
import { useOwnership } from '../context/OwnershipContext'
import RolesCreate from './RolesCreate'

function Roles() {
  const {
    selectedOwnership,
    searchQuery,
    ownerships,
    deleteOwnership,
    selectedItems,
    toggleSelectItem,
    toggleSelectAll,
    viewId,
    setViewId,
    editId,
    setEditId,
  } = useOwnership()

  const [showForm, setShowForm] = React.useState(false)

  // Data for editing
  const selectedData = ownerships.find(item => item.id === editId)

  // Filter ownerships based on searchQuery and selectedOwnership
  const filteredOwnerships = ownerships.filter(item => {
     if (item.type !== 'Roles') return false;
    const org = item.organization || ""
    const matchesSearch = org.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedOwnership === 'Roles' || item.type === selectedOwnership
    return matchesSearch && matchesType
  })

  const formatDate = (dateInput) => {
    const date = new Date(dateInput)
    return date.toLocaleDateString('en-GB').split('/').join('.')
  }

  const openCreateForm = () => {
    setEditId(null)
    setShowForm(true)
  }

  const openEditForm = (id) => {
    setEditId(id)
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditId(null)
  }

  const viewedItem = ownerships.find(item => item.id === viewId)

  return (
    <div>
      <div className='text-2xl font-bold text-heading-color font-manropeb'>Roles</div>

      <div className='mt-6 overflow-auto'>
        <table className='w-full text-left'>
          <thead>
            <tr className='text-[#687588] text-xs font-manropeb'>
              <th className='bg-bg-light rounded-l-lg'>
                <span className='flex justify-between items-center py-4 px-2.5'>
                  <span className='flex items-center gap-2.5'>
                    <input
                      type="checkbox"
                      name="selectall"
                      checked={selectedItems.length === ownerships.length && ownerships.length > 0}
                      onChange={toggleSelectAll}
                    /> Role Title
                  </span>
                  <TbCaretUpDownFilled />
                </span>
              </th>
              <th className='bg-bg-light'><span className='flex justify-between items-center py-4 px-2.5'>Organization <TbCaretUpDownFilled /></span></th>
              <th className='bg-bg-light'><span className='flex justify-between items-center py-4 px-2.5'>Start Date <TbCaretUpDownFilled /></span></th>
              <th className='bg-bg-light'><span className='flex justify-between items-center py-4 px-2.5'>End Date <TbCaretUpDownFilled /></span></th>
              <th className='bg-bg-light'><span className='flex justify-between items-center py-4 px-2.5'>Last Updated <TbCaretUpDownFilled /></span></th>
              <th className='bg-bg-light'><span className='flex justify-between items-center py-4 px-2.5'>Status <TbCaretUpDownFilled /></span></th>
              <th className='bg-bg-light rounded-r-lg'><span className='text-right block py-4 px-2.5'>Action</span></th>
            </tr>
          </thead>
          <tbody>
            {filteredOwnerships.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  No Roles found.
                </td>
              </tr>
            ) : (
              filteredOwnerships.map(item => (
                <tr key={item.id} className='border-b border-border text-heading-color font-manrope-m font-medium text-xs'>
                  <td>
                    <span className='px-2.5 py-[18px] flex gap-2.5 items-center'>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                      /> {item.ownershipType}
                    </span>
                  </td>
                  <td><span className='px-2.5 py-[18px] inline-block'>{item.orgName}</span></td>
                  <td><span className='px-2.5 py-[18px] inline-block'>{formatDate(item.startDate)}</span></td>
                  <td><span className='px-2.5 py-[18px] inline-block'>{formatDate(item.endDate)}</span></td>
                  <td><span className='px-2.5 py-[18px] inline-block'>{formatDate(item.lastUpdated)}</span></td>
                  <td><span className='flex items-center justify-between'>
                    <span className='px-4 py-[4px] inline-block bg-green-50 text-green-400 rounded-lg'>{item.status}Active</span>
                    <ChevronDown className='size-4 text-heading-color' />
                  </span></td>
                  <td>
                    <span className='flex items-center justify-end gap-2.5 px-2.5 py-[18px]'>
                      <button
                        onClick={() => setViewId(item.id)}
                        className='size-8 p-2 bg-[#27A376] rounded-lg text-bg-light flex items-center justify-center cursor-pointer'
                        title="View Details"
                      >
                        <Eye />
                      </button>
                      <button
                        className='size-8 p-2 bg-blue rounded-lg text-bg-light flex items-center justify-center cursor-pointer'
                        title="Edit"
                        onClick={() => openEditForm(item.id)}
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
          <Plus /> Add Role
        </button>
      </div>

      {/* Create/Edit form modal */}
      {showForm && (
        <RolesCreate
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
            onClick={e => e.stopPropagation()}
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

export default Roles
