import { CalendarDays, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useOwnership } from '../context/OwnershipContext';
import SuccessPopup from './SuccessPopup';

function OwnInterestCreate({ onClose }) {
  const {
    ownerships,
    addOwnership,
    updateOwnership,
    editId,
    setEditId,
  } = useOwnership();

  const existingData = ownerships.find(item => item.id === editId);

  const [formData, setFormData] = useState({
    ownershipType: '',
    orgName: '',
    orgNumber: '',
    ownershipPercentage: '',
    country: '',
    startDate: '',
    endDate: '',
    notes: '',
  });

  // Pre-fill form for edit
  useEffect(() => {
    if (editId && ownerships.length > 0) {
      const existingData = ownerships.find(item => item.id === editId);
      if (existingData) {
        setFormData({
          ownershipType: existingData.ownershipType || '',
          orgName: existingData.orgName || '',
          orgNumber: existingData.orgNumber || '',
          ownershipPercentage: existingData.ownershipPercentage || '',
          country: existingData.country || '',
          startDate: existingData.startDate || '',
          endDate: existingData.endDate || '',
          notes: existingData.notes || '',
        });
      }
    }
  }, [editId, ownerships]);


  useEffect(() => {
    console.log("ownerships:", ownerships);
    console.log("editId:", editId);
    console.log("existingData:", existingData);
  }, [ownerships, editId, existingData]);



  const [formErrors, setFormErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [actionType, setActionType] = useState('create');

  const validateField = (id, value) => {
    if (
      [
        'ownershipType',
        'orgName',
        'orgNumber',
        'ownershipPercentage',
        'country',
        'startDate',
        'notes',
      ].includes(id)
    ) {
      return !value.trim();
    }
    return false;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setFormErrors((prev) => ({
      ...prev,
      [id]: validateField(id, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (
        [
          'ownershipType',
          'orgName',
          'orgNumber',
          'ownershipPercentage',
          'country',
          'startDate',
          'notes',
        ].includes(key)
      ) {
        if (!value.trim()) {
          errors[key] = true;
        }
      }
    });

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const ownershipData = {
      id: editId || Date.now(),
      ownershipType: formData.ownershipType?.trim() || '—',
      orgName: formData.orgName?.trim() || '—',
      orgNumber: formData.orgNumber?.trim() || '—',
      ownershipPercentage: formData.ownershipPercentage?.trim() || '0%',
      country: formData.country?.trim() || '—',
      startDate: formData.startDate || '—',
      endDate: formData.endDate || '—',
      notes: formData.notes?.trim() || '—',
      lastUpdated: new Date().toLocaleDateString(),
      type: 'Ownership'
    };

    if (editId) {
      updateOwnership(editId, ownershipData);
      setActionType('update');
    } else {
      addOwnership(ownershipData);
      setActionType('create');
    }

    setShowSuccess(true);
    setEditId(null); // clear edit mode
  };

  const handlePopupClose = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <>
      {showSuccess && (
        <SuccessPopup
          onClose={handlePopupClose}
          actionType={actionType}
          type="Ownership"
        />
      )}

      {!showSuccess && (
        <div className="fixed top-0 left-0 bg-gray-400/40 w-full h-full z-50">
          <div className="w-fit ml-auto flex items-center gap-6">
            <div
              className="size-12 bg-bg flex items-center justify-center rounded-full text-heading-color cursor-pointer"
              onClick={onClose}
            >
              <ChevronRight />
            </div>

            <div className='h-screen overflow-y-auto'>
              <div className="bg-bg min-h-full py-9 flex flex-col gap-8 w-[400px]">
                <div className="text-2xl font-manropeb font-bold text-heading-color px-8">
                  {editId ? 'Edit Ownership Interest' : 'Add Ownership Interest'}
                </div>

                <div className="h-full">
                  <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between gap-8">
                    <div className="px-8 space-y-6">
                      <InputField label="Type of Ownership" id="ownershipType" value={formData.ownershipType} onChange={handleChange} placeholder="" error={formErrors?.ownershipType} />
                      <InputField label="Organization Name" id="orgName" value={formData.orgName} onChange={handleChange} placeholder="" error={formErrors?.orgName} />
                      <InputField label="Organization Number" id="orgNumber" value={formData.orgNumber} onChange={handleChange} placeholder="" error={formErrors?.orgNumber} />
                      <InputField label="Ownership Percentage" id="ownershipPercentage" value={formData.ownershipPercentage} onChange={handleChange} placeholder="" error={formErrors?.ownershipPercentage} />
                      <InputField label="Country of Registration" id="country" value={formData.country} onChange={handleChange} placeholder="" error={formErrors?.country} />
                      <DateInput id="startDate" label="Start Date" value={formData.startDate} onChange={handleChange} required error={formErrors?.startDate} />
                      <DateInput id="endDate" label="End Date (optional)" value={formData.endDate} onChange={handleChange} />
                      <TextArea label="Notes" id="notes" value={formData.notes} onChange={handleChange} placeholder="" error={formErrors?.notes} />
                    </div>

                    <div className="p-6 pb-0 flex justify-between gap-5">
                      <button type="button" className="py-5 px-6 border border-blue rounded-lg w-full text-center font-manropeb font-bold text-blue cursor-pointer" onClick={onClose}>
                        Cancel
                      </button>
                      <button type="submit" className="py-5 px-6 border border-blue rounded-lg w-full text-center font-manropeb font-bold text-bg-light bg-blue cursor-pointer">
                        {editId ? 'Update' : 'Create'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

const InputField = ({ label, id, value, onChange, placeholder, error = false }) => (
  <div className="flex flex-col gap-2.5">
    <label htmlFor={id} className="text-heading-color font-manrope-m font-medium text-sm">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      id={id}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      spellCheck={false}
      // autoComplete="off"
      // autoFocus={false}
      className={`py-4 px-5 outline-none rounded-xl border ${error ? 'border-red-500' : 'border-border'} text-heading-color`}
    />
  </div>
);

const DateInput = ({ id, label, value, onChange, required, error = false }) => (
  <div className="flex flex-col gap-2.5">
    <label htmlFor={id} className="text-heading-color font-manrope-m font-medium text-sm">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <input
        id={id}
        type="date"
        value={value}
        onChange={onChange}
        className={`py-4 px-5 outline-none rounded-xl w-full border ${error ? 'border-red-500' : 'border-border'} text-heading-color`}
      />
      <CalendarDays size={20} className="absolute right-5 top-1/2 -translate-y-1/2 bg-bg pointer-events-none text-heading-color" />
    </div>
  </div>
);

const TextArea = ({ label, id, value, onChange, placeholder, error = false }) => (
  <div className="flex flex-col gap-2.5">
    <label htmlFor={id} className="text-heading-color font-manrope-m font-medium text-sm">
      {label} <span className="text-red-500">*</span>
    </label>
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      spellCheck={false}
      // autoComplete="off"
      // autoFocus={false}
      className={`py-2 px-5 outline-none rounded-xl border h-[80px] resize-none ${error ? 'border-red-500' : 'border-border'} text-heading-color`}
    />
  </div>
);

export default OwnInterestCreate;
