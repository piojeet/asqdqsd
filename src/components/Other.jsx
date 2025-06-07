import React from 'react'
import { Pencil, Plus, } from 'lucide-react'
import { useOwnership } from '../context/OwnershipContext'
import OtherCreate from './OtherCreate'


function Other() {

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
        const other = ownerships.filter(item => item.type === 'Other');
      
      
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
            <div className='text-2xl font-bold text-heading-color font-manropeb'>Other Disclosure</div>

            {/* Table */}
            <div className='mt-6 overflow-auto'>

                {other.length === 0 ? (
                    <div>
                        <div colSpan={6} className="text-center py-8 text-gray-500">
                           No Other Disclosure found.
                        </div>
                    </div>

                ) : (
                    other.map(item => (
                        <div key={item.id} className='p-6 mt-6 border border-border rounded-2xl'>
                            <div className='flex items-center justify-between pb-4 border-b border-border'>
                                <div className='font-manropeb font-bold text-heading-color text-lg'>Other Disclosures</div>
                                <button onClick={() => openEditForm(item.id)} className='text-[#8d8d8d] cursor-pointer'><Pencil size={20} /></button>
                            </div>

                            <div className='space-y-4 mt-4'>
                                <div className='flex items-center'>
                                    <div className='font-manrope-r text-sm font-normal text-heading-color opacity-80 w-[150px]'>Description</div>
                                    <div className='font-manropeb font-bold text-heading-color text-sm'>{item.description}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='font-manrope-r text-sm font-normal text-heading-color opacity-80 w-[150px]'>Date Added</div>
                                    <div className='font-manropeb font-bold text-heading-color text-sm'>{item.dateOfDisclosure}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='font-manrope-r text-sm font-normal text-heading-color opacity-80 w-[150px]'>Category</div>
                                    <div className='font-manropeb font-bold text-heading-color text-sm'>{item.titleCategory}</div>
                                </div>
                            </div>
                        </div>
                    ))
                )}


                <button
                    className='p-6 flex gap-2 bg-blue text-bg-light rounded-lg font-manropeb text-base cursor-pointer mt-4'
                    onClick={openCreateForm}
                >
                    <Plus /> Add Other Disclosure
                </button>
            </div>

            {/* Create/Edit form modal */}
            {showForm && (
                <OtherCreate
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

export default Other