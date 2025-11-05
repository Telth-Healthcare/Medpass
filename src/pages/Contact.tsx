import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  Globe,
  Building,
  Users
} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding-sm bg-gradient-primary text-white" style={{marginTop: '76px'}}>
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
              <p className="lead">
                Get in touch with our team for any questions about the 
                Telth UK Postgraduate Skill Upgrade Program
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Information Cards */}
      <section className="section-padding">
        <Container>
          <Row className="g-4 mb-5">
            <Col lg={3} md={6}>
              <Card className="feature-card text-center border-0 h-100">
                <Card.Body className="p-4">
                  <div className="benefit-icon">
                    <Phone />
                  </div>
                  <h5 className="fw-bold mb-3">Call Us</h5>
                  <p className="text-muted mb-2">+44 20 7946 0958</p>
                  <p className="text-muted small">
                    Mon-Fri: 9:00 AM - 6:00 PM (GMT)
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6}>
              <Card className="feature-card text-center border-0 h-100">
                <Card.Body className="p-4">
                  <div className="benefit-icon">
                    <Mail />
                  </div>
                  <h5 className="fw-bold mb-3">Email Us</h5>
                  <p className="text-muted mb-2">info@telthprogram.com</p>
                  <p className="text-muted small">
                    Response within 24 hours
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6}>
              <Card className="feature-card text-center border-0 h-100">
                <Card.Body className="p-4">
                  <div className="benefit-icon">
                    <MapPin />
                  </div>
                  <h5 className="fw-bold mb-3">Visit Us</h5>
                  <p className="text-muted mb-2">University of Warwick</p>
                  <p className="text-muted small">
                    Coventry, CV4 7AL, UK
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6}>
              <Card className="feature-card text-center border-0 h-100">
                <Card.Body className="p-4">
                  <div className="benefit-icon">
                    <MessageCircle />
                  </div>
                  <h5 className="fw-bold mb-3">Live Chat</h5>
                  <p className="text-muted mb-2">Available on website</p>
                  <p className="text-muted small">
                    Instant support during business hours
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Form and Map */}
      <section className="section-padding bg-light">
        <Container>
          <Row>
            <Col lg={8}>
              <Card className="shadow-sm border-0 mb-4">
                <Card.Header className="bg-primary-blue text-white p-4">
                  <h4 className="fw-bold mb-0 d-flex align-items-center">
                    <Send className="me-2" size={24} />
                    Send Us a Message
                  </h4>
                </Card.Header>
                <Card.Body className="p-4">
                  <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your full name"
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
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+44 20 7946 0958"
                          />
                        </Form.Group>
                      </Col>
                      
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Subject *</Form.Label>
                          <Form.Select
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select a subject</option>
                            <option value="program-inquiry">Program Inquiry</option>
                            <option value="application-support">Application Support</option>
                            <option value="eligibility">Eligibility Questions</option>
                            <option value="partnership">Partnership Opportunities</option>
                            <option value="technical-support">Technical Support</option>
                            <option value="other">Other</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label>Message *</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            placeholder="Please provide details about your inquiry..."
                          />
                        </Form.Group>
                      </Col>
                      
                      <Col md={12}>
                        <Button type="submit" className="btn-primary-custom">
                          <Send className="me-2" size={18} />
                          Send Message
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Header className="bg-secondary-teal text-white p-4">
                  <h5 className="fw-bold mb-0">Program Information</h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <div className="mb-4">
                    <h6 className="fw-bold text-primary-blue mb-2">Admissions Office</h6>
                    <p className="text-muted small mb-0">
                      For application-related inquiries, program details, and eligibility questions.
                    </p>
                    <div className="mt-2">
                      <small className="text-muted">
                        <Mail className="me-1" size={14} />
                        admissions@telthprogram.com
                      </small>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h6 className="fw-bold text-primary-blue mb-2">International Support</h6>
                    <p className="text-muted small mb-0">
                      Visa assistance, accommodation guidance, and relocation support.
                    </p>
                    <div className="mt-2">
                      <small className="text-muted">
                        <Mail className="me-1" size={14} />
                        international@telthprogram.com
                      </small>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h6 className="fw-bold text-primary-blue mb-2">Technical Support</h6>
                    <p className="text-muted small mb-0">
                      Application portal issues, document uploads, and technical assistance.
                    </p>
                    <div className="mt-2">
                      <small className="text-muted">
                        <Mail className="me-1" size={14} />
                        support@telthprogram.com
                      </small>
                    </div>
                  </div>
                  
                  <div className="border-top pt-3">
                    <h6 className="fw-bold text-primary-blue mb-2">Office Hours</h6>
                    <div className="d-flex align-items-center mb-2">
                      <Clock className="text-secondary-teal me-2" size={16} />
                      <small>Mon-Fri: 9:00 AM - 6:00 PM (GMT)</small>
                    </div>
                    <div className="d-flex align-items-center">
                      <Globe className="text-secondary-teal me-2" size={16} />
                      <small>Saturday: 10:00 AM - 2:00 PM (GMT)</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Office Locations */}
      <section className="section-padding">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <h2 className="display-6 fw-bold text-primary-blue mb-3">
                Our Global Offices
              </h2>
              <p className="lead">
                Connect with our team at any of our international locations
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            <Col lg={4} md={6}>
              <Card className="feature-card text-center border-0 h-100">
                <Card.Body className="p-4">
                  <div className="benefit-icon">
                    <Building />
                  </div>
                  <h5 className="fw-bold mb-3">UK Headquarters</h5>
                  <p className="text-muted mb-2">
                    <strong>University of Warwick</strong><br/>
                    Coventry, CV4 7AL<br/>
                    United Kingdom
                  </p>
                  <div className="mt-3">
                    <small className="text-muted">
                      <Phone className="me-1" size={14} />
                      +44 20 7946 0958
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={6}>
              <Card className="feature-card text-center border-0 h-100">
                <Card.Body className="p-4">
                  <div className="benefit-icon">
                    <Globe />
                  </div>
                  <h5 className="fw-bold mb-3">R&D Center</h5>
                  <p className="text-muted mb-2">
                    <strong>IIT Madras Research Park</strong><br/>
                    Chennai, Tamil Nadu<br/>
                    India
                  </p>
                  <div className="mt-3">
                    <small className="text-muted">
                      <Phone className="me-1" size={14} />
                      +91 44 2257 5000
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={6}>
              <Card className="feature-card text-center border-0 h-100">
                <Card.Body className="p-4">
                  <div className="benefit-icon">
                    <Users />
                  </div>
                  <h5 className="fw-bold mb-3">US Operations</h5>
                  <p className="text-muted mb-2">
                    <strong>Healthcare Division</strong><br/>
                    Baltimore, Maryland<br/>
                    United States
                  </p>
                  <div className="mt-3">
                    <small className="text-muted">
                      <Phone className="me-1" size={14} />
                      +1 410 955 5000
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Reference */}
      <section className="section-padding bg-gradient-secondary text-white">
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h3 className="fw-bold mb-3">
                Frequently Asked Questions
              </h3>
              <p className="lead mb-4">
                Before contacting us, you might find the answer to your question 
                in our comprehensive FAQ section.
              </p>
              <Button 
                variant="light" 
                size="lg" 
                href="/program#faq"
                className="px-4"
              >
                View FAQ Section
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Contact;