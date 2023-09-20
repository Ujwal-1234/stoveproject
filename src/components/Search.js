import React, { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function Search() {
  const inp = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const data = ["stove 1", "1212121212", "54023053", "stove6", "annidfer", "maharashtra", "gujrat"];

  useEffect(() => {
    function autocomplete(inputValue) {
      if (inputValue.trim() === '') {
        setSuggestions([]); 
        return;
      }
      
      const filteredSuggestions = data.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }

    function handleKeyDown(e) {
      if (e.key === 'Enter' && suggestions.length > 0) {
        inp.current.value = suggestions[0];
        setSuggestions([]);
      }
    }

    document.addEventListener("click", () => {
      setSuggestions([]);
    });

    inp.current.addEventListener("input", (e) => {
      autocomplete(e.target.value);
    });

    inp.current.addEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className='bg-slate-700 p-10 rounded-2xl lg:w-full shadow-2xl shadow-black flex flex-wrap items-center justify-center'>
      <input
        type='text'
        ref={inp}
        className='lg:w-3/4 w-11/12 m-2 shadow-xl shadow-black text-black rounded-3xl lg:text-4xl p-4'
      />
      <FiSearch className='shadow-xl shadow-black hover:text-6xl text-5xl hover:cursor-pointer' />
      <div className="autocomplete w-3/4 border-l p-5">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="autocomplete-item w-full hover:cursor-pointer hover:bg-slate-600 p-2"
            onClick={() => {
              inp.current.value = suggestion;
              setSuggestions([]);
            }}
          >
            {suggestion}
          </div>
        ))}
      </div>
    </div>
  );
}
