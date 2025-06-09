import { CalendarDays, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useOwnership } from '../context/OwnershipContext';
import SuccessPopup from './SuccessPopup';

function RolesCreate({ onClose }) {

  const {
    ownerships,
    addOwnership,
    updateOwnership,
    editId,
    setEditId,
  } = useOwnership();

  const existingData = ownerships.find(item => item.id === editId);

  const [formData, setFormData] = useState({
    roleTitle: '',
    orgNameRoles: '',
    orgNumberRole: '',
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
          roleTitle: existingData.roleTitle || '',
          orgNameRoles: existingData.orgNameRoles || '',
          orgNumberRole: existingData.orgNumberRole || '',
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
        'roleTitle',
        'orgNameRoles',
        'orgNumberRole',
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
          'roleTitle',
          'orgNameRoles',
          'orgNumberRole',
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
      roleTitle: formData.roleTitle?.trim() || '—',
      orgNameRoles: formData.orgNameRoles?.trim() || '—',
      orgNumberRole: formData.orgNumberRole?.trim() || '—',
      country: formData.country?.trim() || '—',
      startDate: formData.startDate || '—',
      endDate: formData.endDate || '—',
      notes: formData.notes?.trim() || '—',
      lastUpdated: new Date().toLocaleDateString(),
      type: 'Roles'
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
          type="Roles"
        />
      )}

      {!showSuccess && (
        <div className="fixed top-0 left-0 bg-gray-400/40 w-full h-full z-50">
          <div className="sm:w-fit w-full ml-auto flex items-center overflow-y-auto gap-6">
            <div
              className="size-12 bg-bg sm:flex items-center justify-center rounded-full text-heading-color cursor-pointer hidden"
              onClick={onClose}
            >
              <ChevronRight />
            </div>

            <div className='h-screen overflow-y-auto shrink-0 max-w-[300px] w-full sm:max-w-fit sm:w-fit'>
              <div className="bg-bg min-h-full py-9 flex flex-col gap-8 sm:w-[400px] w-full">
                <div className="text-2xl font-manropeb font-bold text-heading-color md:px-8 px-6">
                  {editId ? 'Edit Role' : 'Add Role'}
                </div>

                <div className="h-full">
                  <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between gap-8">
                    <div className="md:px-8 px-6 space-y-6">
                      <InputField label="Role Title" id="roleTitle" value={formData.roleTitle} onChange={handleChange} placeholder="" error={formErrors?.roleTitle} />
                      <InputField label="Organization Name" id="orgNameRoles" value={formData.orgNameRoles} onChange={handleChange} placeholder="" error={formErrors?.orgNameRoles} />
                      <InputField label="Organization Number" id="orgNumberRole" value={formData.orgNumberRole} onChange={handleChange} placeholder="" error={formErrors?.orgNumberRole} />
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
  )
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
      className={`py-2 px-5 h-20 resize-none outline-none rounded-xl border ${error ? 'border-red-500' : 'border-border'} text-heading-color`}
    />
  </div>
);

export default RolesCreate