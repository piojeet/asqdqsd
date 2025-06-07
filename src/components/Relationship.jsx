import React from 'react'
import { Pencil, Plus } from 'lucide-react'
import { useOwnership } from '../context/OwnershipContext'
import RelationshipCreate from './RelationshipCreate'

function Relationship() {
  const {
    ownerships,
    viewId,
    setViewId,
    setEditId,
    editId,
  } = useOwnership()

  const [showForm, setShowForm] = React.useState(false)

  // Get data for editing, if editId is set
  const selectedData = ownerships.find((item) => item.id === editId)

  // Filter only items of type "Relationship"
  const relationships = ownerships.filter(item => item.type === 'Relationship');


  // Open modal for creating new relationship
  const openCreateForm = () => {
    setEditId(null)
    setShowForm(true)
  }

  // Open modal for editing existing relationship
  const openEditForm = (id) => {
    setEditId(id)
    setShowForm(true)
  }

  // Close modal & reset states
  const closeForm = () => {
    setShowForm(false)
    setEditId(null)
  }

  // Get the item user wants to view
  const viewedItem = ownerships.find(item => item.id === viewId)

  return (
    <div>
      <div className='text-2xl font-bold text-heading-color font-manropeb'>Relationship</div>

      {/* Table */}
      <div className='mt-6 overflow-auto'>
        {relationships.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No relationships found.
          </div>
        ) : (
          relationships.map(item => (
            <div key={item.id} className='p-6 mt-6 border border-border rounded-2xl'>
              <div className='flex items-center justify-between pb-4 border-b border-border'>
                <div className='font-manropeb font-bold text-heading-color text-lg'>Relationship</div>
                <button onClick={() => openEditForm(item.id)} className='text-[#8d8d8d] cursor-pointer'>
                  <Pencil size={20} />
                </button>
              </div>

              <div className='space-y-4 mt-4'>
                <div className='flex items-center'>
                  <div className='w-[150px] text-sm text-heading-color opacity-80'>Relation Type</div>
                  <div className='text-sm font-bold text-heading-color'>{item.relationType}</div>
                </div>
                <div className='flex items-center'>
                  <div className='w-[150px] text-sm text-heading-color opacity-80'>Person Name</div>
                  <div className='text-sm font-bold text-heading-color'>{item.perName}</div>
                </div>
                <div className='flex items-center'>
                  <div className='w-[150px] text-sm text-heading-color opacity-80'>Role in Org</div>
                  <div className='text-sm font-bold text-heading-color'>{item.roleinOrg}</div>
                </div>
                <div className='flex items-center'>
                  <div className='w-[150px] text-sm text-heading-color opacity-80'>Related Org</div>
                  <div className='text-sm font-bold text-heading-color'>{item.relatedOrg}</div>
                </div>
                <div className='flex items-center'>
                  <div className='w-[150px] text-sm text-heading-color opacity-80'>Notes</div>
                  <div className='text-sm font-bold text-heading-color'>{item.notes}</div>
                </div>
              </div>
            </div>
          ))
        )}

        <button
          className='p-6 flex gap-2 bg-blue text-bg-light rounded-lg font-manropeb text-base cursor-pointer mt-4'
          onClick={openCreateForm}
        >
          <Plus /> Add Relationship
        </button>
      </div>

      {/* Create/Edit form modal */}
      {showForm && (
        <RelationshipCreate
          editId={editId}
          existingData={selectedData}
          onClose={closeForm}
        />
      )}

      {/* View modal */}
      {viewId && viewedItem && viewedItem.type === 'Relationship' && (
        <div
          className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
          onClick={() => setViewId(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Relationship Details</h2>
            <p><strong>Relation Type:</strong> {viewedItem.relationType}</p>
            <p><strong>Person Name:</strong> {viewedItem.perName}</p>
            <p><strong>Role in Org:</strong> {viewedItem.roleinOrg}</p>
            <p><strong>Related Org:</strong> {viewedItem.relatedOrg}</p>
            <p><strong>Notes:</strong> {viewedItem.notes}</p>

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

export default Relationship
