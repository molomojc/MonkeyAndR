import React, { useState } from 'react';

const DiagnosisForm = ({ userId, onSave, onAnalyze }) => {
  const [form, setForm] = useState({
    diagnosis_name: '',
    symptoms: '',
    lifestyle: '',
    family_disease: '',
    current_meds: '',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success', 'error', 'info'
  const [analysisResult, setAnalysisResult] = useState(null);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // showMessage('Saving diagnosis and analyzing...', 'info');
    // setAnalysisResult(null);

    // try {
    //   // Assuming you have a way to get the token, if your backend requires it for /diagnoses
    //   // For now, I'll omit token for /diagnoses as per your backend snippet, but keep it in mind.
    //   // If your /diagnoses endpoint requires a token, you'd need to pass it here, similar to /api/profile.

    //   // 1) Save diagnosis
    //   const saveRes = await fetch('http://localhost:5000/diagnoses', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       // If token is needed for /diagnoses, uncomment and provide it:
    //       // 'Authorization': `Bearer ${token}`,
    //     },
    //     body: JSON.stringify({ ...form, user_id: userId }),
    //   });

    //   const saveData = await saveRes.json();

    //   if (!saveRes.ok) {
    //     showMessage(`Error saving diagnosis: ${saveData.error || 'Unknown error'}`, 'error');
    //     return;
    //   }

    //   showMessage('Diagnosis saved! Proceeding to analysis...', 'info');

    //   if (onSave) onSave(saveData);

    //   // 2) Call analyze endpoint with combined relevant info
    //   const inputText = `
    //     Diagnosis Name: ${form.diagnosis_name}
    //     Symptoms: ${form.symptoms}
    //     Lifestyle: ${form.lifestyle}
    //     Family Disease History: ${form.family_disease}
    //     Current Medications: ${form.current_meds}
    //   `;

    //   const analyzeRes = await fetch('http://localhost:5000/analyze', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       // If analyze endpoint requires a token, add it here
    //     },
    //     body: JSON.stringify({ user_id: userId, input_text: inputText }),
    //   });

    //   const analyzeData = await analyzeRes.json();

    //   if (!analyzeRes.ok) {
    //     showMessage(`Diagnosis saved, but analysis failed: ${analyzeData.error || 'Unknown error'}`, 'error');
    //     return;
    //   }

    //   showMessage('Diagnosis saved and analysis complete!', 'success');
    //   setAnalysisResult(analyzeData.analysis);

    //   if (onAnalyze) onAnalyze(analyzeData.analysis);

    //   // Clear form after success
    //   setForm({
    //     diagnosis_name: '',
    //     symptoms: '',
    //     lifestyle: '',
    //     family_disease: '',
    //     current_meds: '',
    //   });
    // } catch (error) {
    //   showMessage('Network error or server unreachable. Check console.', 'error');
    //   console.error('Form submission error:', error);
    // }
    alert("Feature coming soon")
  };

  return (
    <div className="diagnosis-form-container">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        .diagnosis-form-container {
          min-height: 100vh;
          background-color: #f3f4f6; /* Light gray background */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          font-family: 'Inter', sans-serif;
        }

        .diagnosis-card {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          width: 100%;
          max-width: 32rem; /* Slightly wider for more content */
        }

        .form-title {
          font-size: 1.875rem;
          font-weight: 700;
          text-align: center;
          color: #1f2937;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1rem; /* Smaller margin for more compact form */
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.25rem;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          box-sizing: border-box; /* Include padding in element's total width/height */
        }

        .form-textarea {
          min-height: 4rem; /* Minimum height for textareas */
          resize: vertical; /* Allow vertical resizing */
        }

        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
        }

        .submit-button {
          width: 100%;
          background-color: #4f46e5; /* Indigo */
          color: #ffffff;
          padding: 0.75rem 1rem;
          border-radius: 0.375rem;
          font-size: 1.125rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          margin-top: 1.5rem; /* Space above button */
        }

        .submit-button:hover {
          background-color: #4338ca; /* Darker indigo */
        }

        .submit-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25), 0 0 0 6px rgba(99, 102, 241, 0.25);
        }

        .message-box {
          padding: 0.75rem 1rem;
          border-radius: 0.375rem;
          margin-top: 1rem; /* Space above message */
          text-align: center;
          font-weight: 500;
        }

        .message-box.info {
          background-color: #e0f2fe;
          color: #0284c7;
          border: 1px solid #7dd3fc;
        }

        .message-box.error {
          background-color: #fee2e2;
          color: #dc2626;
          border: 1px solid #fca5a5;
        }
        .message-box.success {
          background-color: #d1fae5;
          color: #047857;
          border: 1px solid #a7f3d0;
        }

        .analysis-result-box {
          margin-top: 1.5rem;
          padding: 1.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          background-color: #f9fafb; /* Slightly off-white background */
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }

        .analysis-result-box h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.75rem;
        }

        .analysis-result-box p {
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
          line-height: 1.4;
          color: #4b5563;
        }

        .analysis-result-box p strong {
          color: #1f2937;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .diagnosis-card {
            padding: 1.5rem;
          }
          .form-title {
            font-size: 1.5rem;
          }
          .submit-button {
            font-size: 1rem;
            padding: 0.6rem 1rem;
          }
        }
        `}
      </style>
      <div className="diagnosis-card">
        <h3 className="form-title">Enter Diagnosis Information</h3>

        {message && (
          <div className={`message-box ${messageType}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="diagnosis_name" className="form-label">
              Diagnosis Name:
            </label>
            <input
              type="text"
              id="diagnosis_name"
              name="diagnosis_name"
              value={form.diagnosis_name}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Common Cold, Migraine"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="symptoms" className="form-label">
              Symptoms:
            </label>
            <textarea
              id="symptoms"
              name="symptoms"
              value={form.symptoms}
              onChange={handleChange}
              className="form-textarea"
              placeholder="e.g., Headache, fever, sore throat"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="lifestyle" className="form-label">
              Lifestyle:
            </label>
            <textarea
              id="lifestyle"
              name="lifestyle"
              value={form.lifestyle}
              onChange={handleChange}
              className="form-textarea"
              placeholder="e.g., Sedentary, active, diet habits, smoking/drinking"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="family_disease" className="form-label">
              Family Disease History:
            </label>
            <textarea
              id="family_disease"
              name="family_disease"
              value={form.family_disease}
              onChange={handleChange}
              className="form-textarea"
              placeholder="e.g., Diabetes, heart disease, cancer in family"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="current_meds" className="form-label">
              Current Medications:
            </label>
            <textarea
              id="current_meds"
              name="current_meds"
              value={form.current_meds}
              onChange={handleChange}
              className="form-textarea"
              placeholder="e.g., Aspirin, insulin, no medications"
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            Save & Analyze
          </button>
        </form>

        {analysisResult && (
          <div className="analysis-result-box">
            <h4>Analysis Result:</h4>
            <p><strong>Test Name:</strong> {analysisResult.test_name || 'N/A'}</p>
            <p><strong>Result:</strong> {analysisResult.result || 'N/A'}</p>
            <p><strong>Explanation:</strong> {analysisResult.explanation || 'N/A'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosisForm;
