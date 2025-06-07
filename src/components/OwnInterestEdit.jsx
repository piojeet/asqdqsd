import { CalendarDays, ChevronRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useOwnership } from '../context/OwnershipContext';

function OwnInterestEdit({ onClose, existingData }) {
  const { editOwnership } = useOwnership();

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

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (existingData && existingData.id) {
      setFormData({
        ownershipType: existingData.ownershipType || existingData.type || '',
        orgName: existingData.orgName || existingData.organization || '',
        orgNumber: existingData.orgNumber || '',
        ownershipPercentage: existingData.ownershipPercentage || existingData.ownershipPercent || '',
        country: existingData.country || '',
        startDate: existingData.startDate || '',
        endDate: existingData.endDate || '',
        notes: existingData.notes || '',
      });
    }
  }, [existingData]);

  const validateField = (id, value) => {
    if (['ownershipType', 'orgName', 'orgNumber', 'ownershipPercentage', 'country', 'startDate'].includes(id)) {
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
        ['ownershipType', 'orgName', 'orgNumber', 'ownershipPercentage', 'country', 'startDate'].includes(key)
      ) {
        if (!value.trim()) {
          errors[key] = true;
        }
      }
    });

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const updatedOwnership = {
      id: existingData.id,
      ownershipType: formData.ownershipType,
      orgName: formData.orgName,
      orgNumber: formData.orgNumber,
      ownershipPercentage: formData.ownershipPercentage,
      country: formData.country,
      startDate: formData.startDate,
      endDate: formData.endDate,
      notes: formData.notes,
      lastUpdated: new Date().toLocaleDateString(),
    };
    console.log("Submitting edited data:", updatedOwnership);

    // Call the context function
    editOwnership(existingData.id, updatedOwnership); // ✅ Make sure context expects this format
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 bg-gray-400/40 w-full h-full z-50">
      <div className="h-screen w-fit ml-auto flex items-center overflow-y-auto gap-6">
        <div
          className="size-12 bg-bg flex items-center justify-center rounded-full text-heading-color cursor-pointer"
          onClick={onClose}
        >
          <ChevronRight />
        </div>

        <div className="bg-bg h-full py-9 flex flex-col gap-8">
          <div className="text-2xl font-manropeb font-bold text-heading-color px-8">
            Edit Ownership Interest
          </div>

          <div className="h-full">
            <form
              onSubmit={handleSubmit}
              className="h-full flex flex-col justify-between gap-8"
            >
              <div className="px-8 space-y-6">
                <InputField
                  label="Type of Ownership"
                  id="ownershipType"
                  value={formData.ownershipType}
                  onChange={handleChange}
                  placeholder="Shareholder"
                  error={formErrors?.ownershipType}
                />

                <InputField
                  label="Organization Name"
                  id="orgName"
                  value={formData.orgName}
                  onChange={handleChange}
                  placeholder="ABC Holding AS"
                  error={formErrors?.orgName}
                />

                <InputField
                  label="Organization Number"
                  id="orgNumber"
                  value={formData.orgNumber}
                  onChange={handleChange}
                  placeholder="917654321"
                  error={formErrors?.orgNumber}
                />

                <InputField
                  label="Ownership Percentage"
                  id="ownershipPercentage"
                  value={formData.ownershipPercentage}
                  onChange={handleChange}
                  placeholder="25%"
                  error={formErrors?.ownershipPercentage}
                />

                <InputField
                  label="Country of Registration"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Norway"
                  error={formErrors?.country}
                />

                <DateInput
                  id="startDate"
                  label="Start Date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  error={formErrors?.startDate}
                />

                <DateInput
                  id="endDate"
                  label="End Date (optional)"
                  value={formData.endDate}
                  onChange={handleChange}
                />

                <InputField
                  label="Notes"
                  id="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Key stakeholder since 2020"
                />
              </div>

              <div className="p-6 pb-0 flex justify-between gap-5">
                <button
                  type="button"
                  className="py-5 px-6 border border-blue rounded-lg w-full text-center font-manropeb font-bold text-blue cursor-pointer"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-5 px-6 border border-blue rounded-lg w-full text-center font-manropeb font-bold text-bg-light bg-blue cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
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
      <CalendarDays
        size={20}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-bg pointer-events-none text-heading-color"
      />
    </div>
  </div>
);

export default OwnInterestEdit;
