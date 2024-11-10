import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SponsorForm.css';

function SponsorForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    requirements: '',
    coverImage: null,
    email: '',
    attendance: '',
    brandActivation: '',
    exclusions: '',
    sizeOfEvent: '',
    numberOfPeople: '',
    amountOfProduct: '',
    shipping: '',
    shippingNoticeNumber: '',
    shippingNoticePeriod: '',
    mediaStyle: '',
    photosRequired: '',
    videosRequired: '',
    additionalMaterials: ''
  });
  const [showPhotosDropdown, setShowPhotosDropdown] = useState(false);
  const [showVideosDropdown, setShowVideosDropdown] = useState(false);
  const [showMarketing, setShowMarketing] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/thank-you');
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      coverImage: e.target.files[0],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const togglePhotosDropdown = () => setShowPhotosDropdown(!showPhotosDropdown);
  const toggleVideosDropdown = () => setShowVideosDropdown(!showVideosDropdown);
  const toggleAdditionalMarketingMaterials = () => setShowMarketing(!showMarketing);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.companyName && formData.email && formData.coverImage;
      case 2:
        return formData.brandActivation;
      case 3:
        return formData.exclusions;
      case 4:
        return formData.sizeOfEvent;
      case 5:
        return true; //optional
      case 6:
        return formData.shippingNoticeNumber && formData.shippingNoticePeriod && (!showMarketing || (formData.additionalMaterials && showMarketing));
      default:
        return false;
    }
  };

  return (
    <div className="background">
      <h1 style={{ paddingTop: '2rem', textAlign: 'center' }}>Want to Sponsor a University Event Through Lynkr?</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div className="form-group">
              <div>
                <label htmlFor="companyName">Company Name</label>
                <input type="text" id="companyName" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} onKeyDown={handleKeyDown} required />
              </div>
              <div>
                <label htmlFor="contactEmail">Contact Email</label>
                <input type="email" name="email" placeholder="ex: johnsmith@gmail.com" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="coverImage">Upload a Cover Image</label>
                <input type="file" id="coverImage" name="coverImage" onChange={handleFileChange} />
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="form-group">
              <div>
                <label htmlFor="brandActivation">What does your Ideal Brand Activation Look Like?</label>
                <input type="text" name="brandActivation" placeholder="Describe your Ideal Brand Activation:" value={formData.brandActivation} onChange={handleChange} onKeyDown={handleKeyDown} required/>
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div className="form-group">
              <div>
                <label htmlFor="exclusions">Are there Any Organizations you don't want to Sponsor?</label>
                <input type="text" name="exclusions" placeholder="ex: Greek Life, Professional, etc. N/A if none" value={formData.exclusions} onChange={handleChange} onKeyDown={handleKeyDown} required/>
              </div>
              
            </div>
          )}
          {currentStep === 4 && (
            <div className="form-group">
              <div>
                <label htmlFor="sizeOfEvent">Ideal Size of Event:</label>
                <select name="sizeOfEvent" value={formData.sizeOfEvent} onChange={handleChange} required>
                  <option value="" disabled>ideal # of people in attendance</option>
                  <option value="0-25">0-25</option>
                  <option value="25-50">25-50</option>
                  <option value="50-100">50-100</option>
                  <option value="100+">100+</option>
                </select>
              </div>
              <div>
                <label>How much Product will you send for X number of People?</label>
                <label className="example">ex: We will send 2 cases of product for every 20 people in attendance.</label>
                <label>For every X number of people,</label>
                <input type="text" name="numberOfPeople" placeholder="5, 25, 50 people" value={formData.numberOfPeople} onChange={handleChange} onKeyDown={handleKeyDown} required/>
                
              </div>
              <div>
                <label>we will send Y of Product.</label>
                <input type="text" name="amountOfProduct" placeholder="please specify: 1 case, 5 boxes, 2 pallets, etc" value={formData.amountOfProduct} onChange={handleChange} onKeyDown={handleKeyDown} required/>
              </div>
              
            </div>
          )}
          {currentStep === 5 && (
            <div className="form-group">
              <label>Content Requirements?</label>
              <div>
                <div className="checkbox-container">
                  <label htmlFor="photosCheckbox">Photos</label>
                  <input type="checkbox" id="photosCheckbox" className="custom-checkbox" onChange={togglePhotosDropdown} />
                </div>
                {showPhotosDropdown && (
                  <select name="photosRequired" value={formData.photosRequired} onChange={handleChange}>
                    <option value="" disabled># photos required</option>
                    <option value="1-3">1-3</option>
                    <option value="3-5">3-5</option>
                    <option value="5-10">5-10</option>
                    <option value="10+">10+</option>
                  </select>
                )}
              </div>
              <div>
              <div className="checkbox-container">
                  <label htmlFor="videosCheckbox">Videos</label>
                  <input type="checkbox" id="videosCheckbox" className="custom-checkbox" onChange={toggleVideosDropdown} />
                </div>
                {showVideosDropdown && (
                  <select name="videosRequired" value={formData.videosRequired} onChange={handleChange}>
                    <option value="" disabled># videos required</option>
                    <option value="1-3">1-3</option>
                    <option value="3-5">3-5</option>
                    <option value="5-10">5-10</option>
                    <option value="10+">10+</option>
                  </select>
                )}
              </div>
              <div>
                <label htmlFor="mediaStyle">(Optional): Describe any content preferences:</label>
                <input
                  type="text"
                  id="mediaStyle"
                  name="mediaStyle"
                  placeholder="ex: logos facing camera, people engaged in activities"
                  value={formData.mediaStyle}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
          )}
          {currentStep === 6 && (
            <div className="form-group">
              <label htmlFor="shipping">Event Notice Required for Shipping Product:</label>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} className="shippingNotice">
                <input
                  type="text"
                  id="shippingNoticeNumber"
                  name="shippingNoticeNumber"
                  placeholder="please enter a number:"
                  value={formData.shippingNoticeNumber}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                <select name="shippingNoticePeriod" value={formData.shippingNoticePeriod} onChange={handleChange}>
                    <option value="" disabled>period of time</option>
                    <option value="day(s)">day(s)</option>
                    <option value="week(s)">week(s)</option>
                    <option value="month(s)">month(s)</option>
                  </select>
              </div>

              <div>
                <div className="checkbox-container">
                  <label htmlFor="marketingCheckbox">Will you be providing Additional Marketing Materials?</label>
                  <input type="checkbox" id="marketingCheckbox" className="custom-checkbox" onChange={toggleAdditionalMarketingMaterials} />
                </div>
                {showMarketing && (
                  <input
                  type="text"
                  id="additionalMaterials"
                  name="additionalMaterials"
                  placeholder="ex: merch, banners, flags"
                  value={formData.additionalMaterials}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                )}
              </div>
            </div>
          )}

          <div className="form-navigation">
            {currentStep > 1 && (
              <div className="back-button-container">
                <button type="button" onClick={prevStep} className="nav-button">
                  Back
                </button>
              </div>
            )}
            <div className="next-button-container">
              {currentStep < 6 ? (
                <button type="button" onClick={nextStep} className="nav-button" disabled={!isStepValid()}>
                  Next
                </button>
              ) : (
                <button type="submit" className="submit-button" disabled={!isStepValid()}>
                  Submit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SponsorForm;
