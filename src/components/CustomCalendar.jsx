// CustomCalendar.jsx
import React, { useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from 'date-fns';

const CustomCalendar = ({ selectedDate, onChange, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderHeader = () => (
    <div className="flex justify-between items-center px-4 py-2 border-b">
      <button
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        className="px-2 py-1 rounded hover:bg-gray-200"
        aria-label="Previous Month"
      >
        &lt;
      </button>
      <h2 className="font-semibold text-lg">{format(currentMonth, 'MMMM yyyy')}</h2>
      <button
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        className="px-2 py-1 rounded hover:bg-gray-200"
        aria-label="Next Month"
      >
        &gt;
      </button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-medium text-gray-500 py-1">
          {format(addDays(startDate, i), 'EEE')}
        </div>
      );
    }
    return <div className="grid grid-cols-7 border-b">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;

        days.push(
          <div
            key={day.toISOString()}
            className={`text-center py-2 rounded cursor-pointer select-none ${
              isSelected
                ? 'bg-blue-600 text-white'
                : isCurrentMonth
                ? 'text-gray-900'
                : 'text-gray-400'
            } hover:bg-blue-300/50`}
            onClick={() => onChange(day)}
          >
            {format(day, 'd')}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toISOString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 w-80">
      <div className="text-sm font-semibold mb-2">Select Date</div>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={onClose}
          className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CustomCalendar;
