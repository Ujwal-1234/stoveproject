import React, { useState, useEffect } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import axios from 'axios';

export default function List() {
  const [active, setActive] = useState(false);
  const [viewData, setViewData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const get_stovedata = () => {
  };
  
  const itemsPerPage = 35;
  const [itemList, setItemList] = useState([]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const totalPages = Math.ceil(itemList.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/stover/stovedata.php');
        const actualData = response.data;
        console.log(actualData.data);
        
        let arr = [];
        for (let loop = 0; loop < actualData.data.length; loop++) {
          arr.push(actualData.data[loop].device_name);
          sessionStorage.setItem(actualData.data[loop].device_name, JSON.stringify(actualData.data[loop]));
        }
        console.log(arr);
        setItemList(arr);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const view_stove_data = (item) => {
    const stovedataElement = document.getElementById('stovedata');
    if (stovedataElement) {
      stovedataElement.style.display = 'block';
      let data = JSON.parse(sessionStorage.getItem(item));
      console.log(data);
      stovedataElement.innerHTML = `
        <p class='flex flex-wrap items-center justify-center h-full'>
          <span class='w-1/2 p-2'>Stove Serial Number : </span><span class=' w-1/2'>${data.serial_number?data.serial_number:'Loading ...'}</span>
          <span class='w-1/2 p-2'>Stove Location : </span><span class=' w-1/2'>${data.location?data.location:'Loading ...'}</span>
          <span class='w-1/2 p-2'>Stove Region : </span><span class=' w-1/2'>${data.region?data.region:'Loading ...'}</span>
          <span class='w-1/2 p-2'>Status : </span><span class=' w-1/2'>${data.status?data.status:'Loading ...'}</span>
          <span class='w-1/2 p-2'>Working session :</span> <span class=' w-1/2'>${data.working_session?data.working_session:'Loading ...'}</span>
          <span class='w-1/2 p-2'>Started on : </span><span class=' w-1/2'>${data.started_on?data.started_on:'Loading ...'}</span>
          <span class='w-1/2 p-2'>Temperature : </span><span class=' w-1/2'>${data.started_on?data.temperature:'Loading ...'}</span>
        </p>
      `;
      setViewData(true);
    }
  };
  const currentItems = itemList.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const concernedElement = document.getElementById('stovedata');

    document.addEventListener('mousedown', (event) => {
      if (concernedElement && concernedElement.contains(event.target)) {
        console.log("Clicked Inside");
      } else {
        if (concernedElement) {
          concernedElement.style.display = 'none';
        }
        console.log("Clicked Outside / Elsewhere");
      }
    });
  }, []);

  return (
    <>
      <div className='max-h-screen p-10 shadow-inner shadow-white flex flex-wrap items-center overflow-auto justify-center lg:w-11/12'>
        {currentItems.map((item, index) => (
          <div
            className={`lg:m-5 m-4 border p-5 lg:w-36 rounded-xl text-white ${
              sessionStorage.getItem('admin')==='1' ? 'cursor-pointer' : 'cursor-default'
            } ${JSON.parse(sessionStorage.getItem(item)).status=='active' ? 'bg-green-600' : 'bg-red-600'}`}
            key={index}
            onClick={() => {
              view_stove_data(item);
            }}
          >
            {item}
          </div>
        ))}
        <div className='w-full flex flex-wrap justify-center items-center'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <GrFormPrevious className='text-2xl m-2 inline bg-white' />
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <GrFormNext className='text-2xl m-2 inline bg-white' />
          </button>
        </div>
      </div>
      {viewData ? (
        <div id='stovedata' className='fixed hidden bg-white items-center justify-center w-96 h-96 rounded-lg bg-opacity-90 text-black '>
          <p className='flex flex-wrap items-center justify-center h-full'>
            Loading ...
          </p>
          User might not be allowed for some Data. So it might be showing Loading
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
