"use client"

import React, { useState, useRef } from 'react';

const Diabetic = () => {
  const [inputData, setInputData] = useState({
    Pregnancies: '',
    Glucose: '',
    BloodPressure: '',
    SkinThickness: '',
    Insulin: '',
    BMI: '',
    DiabetesPedigreeFunction: '',
    Age: ''
  });
  const [submitMessage, setSubmitMessage] = useState('');
  const resultRef = useRef(null);

  const labels = ['Pregnancies', 'Glucose', 'BloodPressure', 'Skin Thickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age'];

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  // Prevent negative values
  const sanitizedValue = value < 0 ? '' : value;
  setInputData({
    ...inputData,
    [name]: sanitizedValue
  });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const inputDataArray = labels.map(label => inputData[label]);
      const response = await fetch(`http://localhost:5000/predict?inputData=${inputDataArray.join(',')}`);
      const data = await response.json();

      // Check the prediction result
      if (response.ok) {
        setSubmitMessage(data.prediction === 1 ? 'Diabetic' : 'Not Diabetic');
        scrollToResult();
      } else {
        setSubmitMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error during API call:', error);
      setSubmitMessage('Error during API call. Please try again.');
    }
  };

  const scrollToResult = () => {
    resultRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-screen h-min-screen text-white bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Diabetic Prediction</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {labels.map((label, index) => (
            <div key={index}>
              <label htmlFor={label} className="block font-medium">{label}</label>
              <input 
                type="number" 
                id={label} 
                name={label} 
                value={inputData[label]} 
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                required 
              />
            </div>
          ))}
          <button type="submit" className="bg-white hover:bg-blue-500 text-black font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
        {submitMessage && (
          <div ref={resultRef} className={`mt-4 p-3 rounded ${submitMessage === 'Not Diabetic' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            <p className="font-semibold">Prediction Result:</p>
            <p>{submitMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diabetic;
