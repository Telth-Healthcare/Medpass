import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, ProgressBar } from 'react-bootstrap';
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  GraduationCap, 
  FileText, 
  Calendar,
  MapPin,
  Award,
  Send
} from 'lucide-react';

const Apply: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    currentLocation: '',
    
    // Educational Background
    medicalDegree: '',
    university: '',
    graduationYear: '',
    currentPosition: '',
    experience: '',
    
    // Program Preferences
    motivation: '',
    careerGoals: '',
    specialization: ''
  });

  const totalSteps = 3;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Application submitted successfully! You will receive a confirmation email shortly.');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding-sm bg-gradient-primary text-white" style={{marginTop: '76px'}}>
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h1 className="display-4 fw-bold mb-3">Apply Now</h1>
              <p className="lead">
                Take the first step towards transforming your healthcare career with the 
                Telth UK Postgraduate Skill Upgrade Program
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Application Process Info */}
      <section className="section-padding">
        <Container>
          <Row className="mb-5">
            <Col lg={8} className="mx-auto text-center">
              <h2 className="display-6 fw-bold text-primary-blue mb-3">
                Application Process
              </h2>
              <p className="lead">
                Our streamlined application process is designed to assess your suitability 
                for this transformative program.
              </p>
            </Col>
          </Row>
          
          <Row className="g-4 mb-5">
            <Col lg={4} md={6}>
              <Card className="feature-card text-center border-0 h-100">
                <Card.Body className="p-4">
                  <div className="benefit-icon">
                    <FileText />
                  </div>
                  <h5 className="fw-bold mb-3">1. Submit Application</h5>
                  <p className="text-muted">
                    Complete our comprehensive application form with your personal, 
                    educational, and professional information.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={6}>
              <Card className="feature-card text-center border-0 h-100">
                <Card.Body className="p-4">
                  <div className="benefit-icon">
                    <User />
                  </div>
                  <h5 className="fw-bold mb-3">2. Initial Review</h5>
                  <p className="text-muted">
                    Our admissions committee conducts a thorough review of your 
                    application and qualifications.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={6}>
              <Card className="feature-card text-center border-0 h-100">
                <Card.Body className="p-4">
                  <div className="benefit-icon">
                    <Award />
                  </div>
                  <h5 className="fw-bold mb-3">3. Interview & Acceptance</h5>
                  <p className="text-muted">
                    Successful candidates are invited for an interview, followed by 
                    program acceptance and onboarding.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Application Form */}
      <section className="section-padding bg-light">
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
              <Card className="shadow-lg border-0">
                <Card.Header className="bg-primary-blue text-white p-4">
                  <h4 className="fw-bold mb-2">Application Form</h4>
                  <ProgressBar now={progressPercentage} className="mb-2" style={{height: '6px'}} />
                  <small>Step {currentStep} of {totalSteps}</small>
                </Card.Header>
                
                <Card.Body className="p-4">
                  <Form onSubmit={handleSubmit}>
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                      <div>
                        <h5 className="fw-bold text-primary-blue mb-4 d-flex align-items-center">
                          <User className="me-2" size={24} />
                          Personal Information
                        </h5>
                        
                        <Row className="g-3">
                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>First Name *</Form.Label>
                              <Form.Control
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter your first name"
                              />
                            </Form.Group>
                          </Col>
                          
                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>Last Name *</Form.Label>
                              <Form.Control
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter your last name"
                              />
                            </Form.Group>
                          </Col>
                          
                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>Email Address *</Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                placeholder="your.email@example.com"
                              />
                            </Form.Group>
                          </Col>
                          
                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>Phone Number *</Form.Label>
                              <Form.Control
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                placeholder="+44 20 7946 0958"
                              />
                            </Form.Group>
                          </Col>
                          
                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>Date of Birth *</Form.Label>
                              <Form.Control
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                required
                              />
                            </Form.Group>
                          </Col>
                          
                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>Nationality *</Form.Label>
                              <Form.Control
                                type="text"
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter your nationality"
                              />
                            </Form.Group>
                          </Col>
                          
                          <Col md={12}>
                            <Form.Group>
                              <Form.Label>Current Location *</Form.Label>
                              <Form.Control
                                type="text"
                                name="currentLocation"
                                value={formData.currentLocation}
                                onChange={handleInputChange}
                                required
                                placeholder="City, Country"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                    )}

                    {/* Step 2: Educational & Professional Background */}
                    {currentStep === 2 && (
                      <div>
                        <h5 className="fw-bold text-primary-blue mb-4 d-flex align-items-center">
                          <GraduationCap className="me-2" size={24} />
                          Educational & Professional Background
                        </h5>
                        
                        <Row className="g-3">
                          <Col md={12}>
                            <Form.Group>
                              <Form.Label>Medical Degree *</Form.Label>
                              <Form.Select
                                name="medicalDegree"
                                value={formData.medicalDegree}
                                onChange={handleInputChange}
                                required
                              >
                                <option value="">Select your medical degree</option>
                                <option value="mbbs">MBBS</option>
                                <option value="md">MD</option>
                                <option value="do">DO</option>
                                <option value="other">Other</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          
                          <Col md={8}>
                            <Form.Group>
                              <Form.Label>University/Institution *</Form.Label>
                              <Form.Control
                                type="text"
                                name="university"
                                value={formData.university}
                                onChange={handleInputChange}
                                required
                                placeholder="Enter your university name"
                              />
                            </Form.Group>
                          </Col>
                          
                          <Col md={4}>
                            <Form.Group>
                              <Form.Label>Graduation Year *</Form.Label>
                              <Form.Control
                                type="number"
                                name="graduationYear"
                                value={formData.graduationYear}
                                onChange={handleInputChange}
                                required
                                placeholder="2020"
                                min="1990"
                                max={new Date().getFullYear()}
                              />
                            </Form.Group>
                          </Col>
                          
                          <Col md={12}>
                            <Form.Group>
                              <Form.Label>Current Position *</Form.Label>
                              <Form.Control
                                type="text"
                                name="currentPosition"
                                value={formData.currentPosition}
                                onChange={handleInputChange}
                                required
                                placeholder="e.g., Junior Doctor, Resident, Medical Officer"
                              />
                            </Form.Group>
                          </Col>
                          
                          <Col md={12}>
                            <Form.Group>
                              <Form.Label>Years of Experience *</Form.Label>
                              <Form.Select
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                required
                              >
                                <option value="">Select experience level</option>
                                <option value="0-1">0-1 years</option>
                                <option value="2-5">2-5 years</option>
                                <option value="6-10">6-10 years</option>
                                <option value="10+">10+ years</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>
                      </div>
                    )}

                    {/* Step 3: Program Preferences & Motivation */}
                    {currentStep === 3 && (
                      <div>
                        <h5 className="fw-bold text-primary-blue mb-4 d-flex align-items-center">
                          <Award className="me-2" size={24} />
                          Program Preferences & Motivation
                        </h5>
                        
                        <Row className="g-3">
                          <Col md={12}>
                            <Form.Group>
                              <Form.Label>Preferred Specialization</Form.Label>
                              <Form.Select
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleInputChange}
                              >
                                <option value="">Select preferred specialization</option>
                                <option value="ai-diagnostics">AI-Driven Diagnostics</option>
                                <option value="personalized-medicine">Personalized Medicine</option>
                                <option value="iomt">IoMT & Digital Health</option>
                                <option value="community-care">Community Care</option>
                                <option value="general">General Healthcare Technology</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          
                          <Col md={12}>
                            <Form.Group>
                              <Form.Label>Why do you want to join this program? *</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={4}
                                name="motivation"
                                value={formData.motivation}
                                onChange={handleInputChange}
                                required
                                placeholder="Share your motivation for joining the Telth UK Program..."
                              />
                            </Form.Group>
                          </Col>
                          
                          <Col md={12}>
                            <Form.Group>
                              <Form.Label>Career Goals (5-year vision) *</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={4}
                                name="careerGoals"
                                value={formData.careerGoals}
                                onChange={handleInputChange}
                                required
                                placeholder="Describe your career goals and how this program fits into your plans..."
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        
                        <Alert variant="info" className="mt-4">
                          <strong>Next Steps:</strong> After submitting your application, you will receive 
                          a confirmation email within 24 hours. Our admissions team will review your 
                          application and contact you within 5-7 business days.
                        </Alert>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="d-flex justify-content-between mt-4 pt-4 border-top">
                      <Button
                        variant="outline-secondary"
                        onClick={handlePrevious}
                        disabled={currentStep === 1}
                      >
                        Previous
                      </Button>
                      
                      {currentStep < totalSteps ? (
                        <Button
                          className="btn-primary-custom"
                          onClick={handleNext}
                        >
                          Next Step
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="btn-primary-custom"
                        >
                          <Send className="me-2" size={18} />
                          Submit Application
                        </Button>
                      )}
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Support Section */}
      <section className="section-padding">
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h3 className="fw-bold text-primary-blue mb-3">
                Need Help with Your Application?
              </h3>
              <p className="lead mb-4">
                Our admissions team is here to support you throughout the application process.
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <div className="d-flex align-items-center">
                  <Mail className="text-secondary-teal me-2" size={20} />
                  <span>admissions@telthprogram.com</span>
                </div>
                <div className="d-flex align-items-center">
                  <Phone className="text-secondary-teal me-2" size={20} />
                  <span>+44 20 7946 0958</span>  
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Apply;