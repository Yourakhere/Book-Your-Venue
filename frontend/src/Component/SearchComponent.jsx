<<<<<<< HEAD
import { useState, useEffect } from "react";
import MyCalendar from "./MyCalender";
import { Calendar, Search, Filter, Clock } from "lucide-react";

const SearchComponent = ({ onSearchChange, filters, timeSlots }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    onSearchChange(localFilters);
  }, [localFilters]);

  const handleChange = (key, value) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateDaySelect = (date, day) => {
    console.log(day, date);
    setLocalFilters((prev) => ({
      ...prev,
      selectedDate: date, // For booking (exact date)
      selectedDay: day,   // For fetching backend data
    }));
    
    setCalendarOpen(false); 
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            value={localFilters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            placeholder="Search venues..."
            className="pl-10 pr-3 py-2 h-11 border border-gray-300 rounded-md text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Category */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            value={localFilters.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="pl-10 pr-3 py-2 h-11 border border-gray-300 rounded-md text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
          >
            <option value="all">All Categories</option>
            <option value="classroom">Classroom</option>
            <option value="lab">Lab</option>
          </select>
        </div>

        {/* Date picker with popup */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setCalendarOpen(!calendarOpen)}
            className="flex items-center px-3 py-2 h-11 border border-gray-300 rounded-md text-sm w-full text-left hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            {localFilters.selectedDate
              ? `${localFilters.selectedDate}`
              : "Select Date"}
          </button>
              
          {calendarOpen && (
            <div className="absolute z-50 bg-white shadow-lg rounded-md p-2 mt-2 border">
              <MyCalendar onDateChange={handleDateDaySelect} />
            </div>
          )}
        </div>

        {/* Time slot selection */}
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <select
            value={localFilters.selectedTimeIndex}
            onChange={(e) => handleChange("selectedTimeIndex", e.target.value)}
            className="pl-10 pr-3 py-2 h-11 border border-gray-300 rounded-md text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
          >
            {timeSlots.map((slot) => (
              <option key={slot.index} value={slot.index}>
                {slot.label}
              </option>
            ))}
          </select>
        </div>
      </div>
=======
import React, { useState } from 'react';

const SearchComponent = ({ onSearchChange, filters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleInputChange = (field, value) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
    onSearchChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      category: 'all',
      availability: 'all'
    };
    setLocalFilters(resetFilters);
    onSearchChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Venues
          </label>
          <input
            type="text"
            id="search"
            value={localFilters.search}
            onChange={(e) => handleInputChange('search', e.target.value)}
            placeholder="Search by name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={localFilters.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="classroom">Classroom</option>
            <option value="complab">Computer Lab</option>
            <option value="lab"> Lab</option>
            <option value="seminar">Seminar Hall</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
            Availability
          </label>
          <select
            id="availability"
            value={localFilters.availability}
            onChange={(e) => handleInputChange('availability', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

      
      <div className="flex mt-5  justify-center items-center gap-3">
        <button
          onClick={() => handleInputChange('search', localFilters.search)}
          className="px-6 py-2 bg-blue-900 hover:bg-secondary text-white font-medium rounded-md transition-colors"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md transition-colors"
        >
          Reset
        </button>
        
      </div>
      </div>

>>>>>>> 37946e52a67d0a2a78bafc7e2c5d4ac816add528
    </div>
  );
};

export default SearchComponent;