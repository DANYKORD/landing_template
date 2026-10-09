import React, { useState, useEffect, useRef } from 'react';
import config from '../config';

export default function NpAutocomplete({ type, placeholder, label, cityRef, onSelect, required = false }) {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset branch input when city changes
  useEffect(() => {
    if (type === 'branch') {
      setQuery('');
      setOptions([]);
      setIsOpen(false);
      onSelect(null);
    }
  }, [cityRef, type]);

  useEffect(() => {
    const fetchOptions = async () => {
      // For city, require at least 2 chars to search. 
      if (type === 'city' && query.trim().length < 2) {
        setOptions([]);
        return;
      }
      if (type === 'branch' && !cityRef) return;
      
      setLoading(true);
      const apiKey = config.integrations.novaPoshta.apiKey;
      
      let payload = {};
      if (type === 'city') {
        payload = {
          apiKey,
          modelName: "Address",
          calledMethod: "searchSettlements",
          methodProperties: {
            CityName: query.trim(),
            Limit: "50",
            Page: "1"
          }
        };
      } else {
        payload = {
          apiKey,
          modelName: "Address",
          calledMethod: "getWarehouses",
          methodProperties: {
            CityRef: cityRef,
            FindByString: query.trim(),
            Limit: "50"
          }
        };
      }

      try {
        const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (data.success) {
          let newOptions = [];
          if (type === 'city') {
            newOptions = data.data[0]?.Addresses || [];
          } else {
            newOptions = data.data;
          }
          setOptions(newOptions);
          
          // Auto-open if this input is currently focused
          if (document.activeElement === inputRef.current && newOptions.length > 0) {
            setIsOpen(true);
          }
        }
      } catch (err) {
        console.error("NP API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      if (type === 'city' && query.trim().length >= 2) fetchOptions();
      if (type === 'branch' && cityRef) fetchOptions();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query, cityRef, type]);

  const handleSelect = (option) => {
    const inputText = type === 'city' ? option.MainDescription : option.Description;
    setQuery(inputText);
    setIsOpen(false);
    
    // Return DeliveryCity for branch lookup if type is city
    onSelect(type === 'city' 
        ? { text: option.Present, ref: option.DeliveryCity } 
        : { text: option.Description, ref: option.Ref }
    );
  };

  return (
    <div className="flex flex-col gap-1.5 relative" ref={wrapperRef}>
      <label className="text-sm font-bold text-gray-700">{label} {required && <span className="text-red-500">*</span>}</label>
      <div className="relative">
        <input 
          ref={inputRef}
          type="text" 
          value={query} 
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            onSelect(null);
          }}
          onFocus={() => {
              if (options.length > 0) setIsOpen(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              if (options.length > 0) {
                const searchStr = query.trim().toLowerCase();
                if (searchStr.length >= 2 || type === 'branch') {
                  const exactMatch = options.find(
                    opt => (type === 'city' ? opt.MainDescription : opt.Description).toLowerCase() === searchStr
                  );
                  if (exactMatch) {
                    handleSelect(exactMatch);
                  } else {
                    handleSelect(options[0]);
                  }
                }
              }
              setIsOpen(false);
            }, 200);
          }}
          placeholder={type === 'branch' && !cityRef ? config.uiText.checkout.branchNeedCity : placeholder}
          className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-red-400 focus:bg-white transition font-medium text-lg"
        />
        
        {loading && (
          <div className="absolute right-4 top-[14px]">
             <span className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin inline-block"></span>
          </div>
        )}
      </div>

      {isOpen && options.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl top-[90px] max-h-60 overflow-y-auto shadow-2xl overflow-hidden">
          {options.map((opt, i) => (
            <li 
              key={opt.Ref || i} 
              onMouseDown={(e) => {
                // Prevent onBlur from firing before click is processed
                e.preventDefault(); 
              }}
              onClick={() => handleSelect(opt)}
              className="px-4 py-3 hover:bg-red-50 cursor-pointer border-b border-gray-100 last:border-0 font-medium text-gray-700 text-sm transition"
            >
              {type === 'city' ? opt.Present : opt.Description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
