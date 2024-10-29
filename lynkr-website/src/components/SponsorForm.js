import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SponsorForm.css'; // Import CSS for styling
import emailjs from 'emailjs-com';
import axios from 'axios';

function SponsorForm() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      companyName: '',
      requirements: '',
      contactEmail: '',
      attendance: '',
      brandActivation: '',
      restrictions: '',
      marketingMaterials: '',
      daysToShip: '',
      photoVideoStyle: '',
      photosRequired: '',
      videosRequired: ''
    }); // Hook to navigate between routes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const xanoURL = 'https://x8ki-letl-twmt.n7.xano.io/api:E0kSkxT4/lynkr_request_form_data'; //Change to database

    const serviceID = 'service_i9qog1p';
    const templateID = 'template_brcvw1b';
    const publicKey = 'hmRrxY-b1RSuLWjR-';

    try {
      // Send form data to Xano using Axios
      const xanoResponse = await axios.post(xanoURL, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (xanoResponse.status === 200) {
        console.log('Form data successfully submitted to Xano');
      } else {
        console.error('Failed to submit form data to Xano');
        alert('There was an issue submitting your form data to the database.');
        return; // Exit if Xano submission fails
      }

      // Send form data via EmailJS
      await emailjs.send(serviceID, templateID, formData, publicKey);
      console.log('Email sent successfully!');
      // Navigate to Thank You page
      navigate('/thank-you');
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsLoading(false); // Turn off the loading indicator
    }
  };

  return (
    <div className="background">
      <div className="form-container">
        <h1 style={{ paddingTop: '2rem' }}>Want to Sponsor a University Event through Lynkr?</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} required />
            <input type="text" name="requirements" placeholder="What do you require in return?" value={formData.requirements} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <input type="email" name="contactEmail" placeholder="Contact Email" value={formData.contactEmail} onChange={handleChange} required />
            <select name="attendance" value={formData.attendance} onChange={handleChange} required>
              <option value=""># people in attendance</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>

          <div className="form-group">
            <input type="text" name="brandActivation" placeholder="Describe your Ideal Brand Activation" value={formData.brandActivation} onChange={handleChange} />
            <input type="text" name="restrictions" placeholder="Any organizations you don’t want to sponsor?" value={formData.restrictions} onChange={handleChange} />
          </div>

          <div className="form-group">
            <input type="text" name="marketingMaterials" placeholder="Will you be shipping marketing materials?" value={formData.marketingMaterials} onChange={handleChange} />
            <select name="daysToShip" value={formData.daysToShip} onChange={handleChange} required>
              <option value=""># days before to ship marketing materials</option>
              <option value="1">1</option>
              <option value="7+">7+</option>
              <option value="14+">14+</option>
            </select>
          </div>

          <div className="form-group">
            <input type="text" name="photoVideoStyle" placeholder="Describe the Style of Photos and Videos you Require" value={formData.photoVideoStyle} onChange={handleChange} />
          </div>

          <div className="form-group">
            <select name="photosRequired" value={formData.photosRequired} onChange={handleChange} required>
              <option value=""># photos required</option>
              <option value="1">1</option>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10+">10+</option>
            </select>
            <select name="videosRequired" value={formData.videosRequired} onChange={handleChange} required>
              <option value=""># videos required</option>
              <option value="1">1</option>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10+">10+</option>
            </select>
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
</button>
        </form>
      </div>
    </div>
  );
}

export default SponsorForm;
