import React from 'react'
import { Pencil, Plus, } from 'lucide-react'
import { useOwnership } from '../context/OwnershipContext'
import OtherCreate from './OtherCreate'


function Other() {

      const {
    
            ownerships,
    
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
                    className='md:p-6 p-4 md:text-base text-sm flex gap-2 bg-blue text-bg-light rounded-lg font-manropeb cursor-pointer mt-8'
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

        </div>
  )
}

export default Other