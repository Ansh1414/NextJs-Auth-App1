//page.js
"use client";
import React, { useState } from 'react';
const BulkUploadPage = () => {
  const [csvData, setCsvData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setErrorMessage('Please select a file.');
      return;
    }
    if (!file.name.endsWith('.csv')) {
      setErrorMessage('Please upload a CSV file.');
      return;
    }
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split('\n').map((row) => row.split(','));
      setCsvData(rows);
      setErrorMessage('');
      setIsLoading(false);
    };
    reader.readAsText(file);
  };
  return (
    <div className="border-2 content-center text-center h-screen">
      
    <div  style={{ padding:'20px', maxWidth:'800px', margin:'0 auto' }}>
      <h1 style={{marginBottom: '20px' }}>
          Loading Data from File
      </h1>
      <input className="cursor-pointer bg-white text-black" type="file" onChange={handleFileUpload} 
            accept=".csv" style={{ marginBottom: '10px' }} 
      />
      { errorMessage && <div style={{color:'red', marginBottom:'10px' }}>
        { errorMessage }</div> 
      }
      { isLoading ? 
        (
          <div style={{ textAlign:'center', marginTop:'20px' }}>
            Loading...
          </div>
        ) : 
        (
          csvData.length > 0 && ( 
          <table style={{ borderCollapse:'collapse', 
                          width:'100%', marginTop:'20px' }}>
            <tbody>
              { csvData.map((row, index) => (
                <tr key={index}>
                  { row.map((cell, cellIndex) => (
                    <>
                    <td key={cellIndex} className="border-2 border-green-700">
                        {cell}
                    </td>
                     
                    </>
                    
                  ))}
                </tr>
                ))
              }
            </tbody>
          </table>
          )
        )
      }
    </div>

    </div>
  );
};
export default BulkUploadPage;
