/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Style/Checkout.css';
import creditCardIcon from '../images/credit-card.svg';
import lockIcon from '../images/lock.svg';

const Checkout = ({ onPaymentComplete }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Default course data if none is passed
  const defaultCourse = {
    title: "Sales Funnels 101",
    price: 99.99,
    id: 1,
    ...location.state?.course
  };

  const [paymentMethod, setPaymentMethod] = useState('cards');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });
  const [saveCard, setSaveCard] = useState(true);
  const [country, setCountry] = useState('Egypt');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'number') {
      const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    if (name === 'expiry' && value.length === 2 && !cardDetails.expiry.includes('/')) {
      setCardDetails(prev => ({ ...prev, [name]: value + '/' }));
      return;
    }
    
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsProcessing(false);
    onPaymentComplete();
    // Redirect to CoursePage with course data
    navigate('/course', { 
      state: { 
        course: {
          title: "Sales Funnels 101",
          subtitle: "Master the art of converting leads into customers",
          instructor: "Alex Johnson",
          duration: "1.5 hours",
          level: "Intermediate",
          students: "2,000+",
          lastUpdated: "June 2024"
        }
      } 
    });
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Complete Your Purchase</h1>
          <div className="secure-payment">
            <img src={lockIcon} alt="Secure" />
            <span>Secure Payment</span>
          </div>
        </div>
        
        <div className="checkout-grid">
          <form onSubmit={handleSubmit} className="payment-form">
            {/* ... rest of your form JSX remains exactly the same ... */}
            <section className="payment-section">
              <h2 className="section-title">
                <span>1</span>
                Payment Method
              </h2>
              
              <div className="payment-methods">
                <div 
                  className={`method-option ${paymentMethod === 'cards' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('cards')}
                >
                  <div className="method-radio">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      checked={paymentMethod === 'cards'} 
                      onChange={() => {}}
                    />
                  </div>
                  <div className="method-content">
                    <img src={creditCardIcon} alt="Credit Card" />
                    <span>Credit/Debit Card</span>
                  </div>
                </div>
                
                <div 
                  className={`method-option ${paymentMethod === 'paypal' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <div className="method-radio">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      checked={paymentMethod === 'paypal'} 
                      onChange={() => {}}
                    />
                  </div>
                  <div className="method-content">
                    <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" />
                    <span>PayPal</span>
                  </div>
                </div>
              </div>
              
              {paymentMethod === 'cards' && (
                <div className="card-form">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input 
                      type="text" 
                      name="number" 
                      value={cardDetails.number} 
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiration Date</label>
                      <input 
                        type="text" 
                        name="expiry" 
                        value={cardDetails.expiry} 
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Security Code</label>
                      <input 
                        type="text" 
                        name="cvc" 
                        value={cardDetails.cvc} 
                        onChange={handleInputChange}
                        placeholder="CVC"
                        maxLength="4"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Name on Card</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={cardDetails.name} 
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  
                  <div className="form-group checkbox-group">
                    <input 
                      type="checkbox" 
                      id="saveCard"
                      checked={saveCard} 
                      onChange={() => setSaveCard(!saveCard)}
                    />
                    <label htmlFor="saveCard">Save this card for future payments</label>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'paypal' && (
                <div className="paypal-notice">
                  <p>You'll be redirected to PayPal to complete your payment securely.</p>
                </div>
              )}
            </section>
            
            <section className="billing-section">
              <h2 className="section-title">
                <span>2</span>
                Billing Information
              </h2>
              
              <div className="form-group">
                <label>Country</label>
                <select 
                  value={country} 
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  <option value="Egypt">Egypt</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>
              
              <div className="tax-notice">
                TrackIt is required by law to collect applicable transaction taxes for purchases made in certain tax jurisdictions.
              </div>
            </section>
            
            <button 
              type="submit" 
              className="pay-button"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : (
                `Pay E£${defaultCourse.price.toFixed(2)}`
              )}
            </button>
          </form>
          
          <div className="order-summary">
            <h3>Order Summary</h3>
            
            <div className="course-item">
              <div className="course-thumbnail"></div>
              <div className="course-details">
                <h4>{defaultCourse.title}</h4>
                <p className="price">E£{defaultCourse.price.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="summary-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>E£{defaultCourse.price.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax</span>
                <span>E£0.00</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>E£{defaultCourse.price.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="terms-agreement">
              By completing your purchase, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;