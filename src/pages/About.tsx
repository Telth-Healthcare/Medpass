import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { 
  Building, 
  Users, 
  Award, 
  Globe,
  Heart,
  Brain,
  Target,
  Zap
} from 'lucide-react';

const About: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="section-padding-sm bg-gradient-primary text-white" style={{marginTop: '76px'}}>
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h1 className="display-4 fw-bold mb-3">About Telth Tech</h1>
              <p className="lead">
                A Johns Hopkins and Harvard-driven initiative revolutionizing care delivery 
                across geographies since 2008.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Company Overview */}
      <section className="section-padding">
        <Container>
          <Row className="align-items-center mb-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="display-6 fw-bold text-primary-blue mb-4">
                Leading Healthcare Innovation
              </h2>
              <p className="lead mb-4">
                Founded in 2008, Telth Tech has been at the forefront of healthcare innovation, 
                combining cutting-edge technology with clinical expertise to deliver accessible, 
                intelligent healthcare solutions globally.
              </p>
              <p className="mb-4">
                Our vision is simple yet transformative: <strong>Decentralized, accessible, 
                and intelligent healthcare for all.</strong>
              </p>
              
              <Row className="g-3">
                <Col sm={6}>
                  <div className="d-flex align-items-center">
                    <Building className="text-secondary-teal me-3" size={24} />
                    <div>
                      <h6 className="fw-bold mb-0">Founded 2008</h6>
                      <small className="text-muted">15+ Years Experience</small>
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="d-flex align-items-center">
                    <Globe className="text-secondary-teal me-3" size={24} />
                    <div>
                      <h6 className="fw-bold mb-0">Global Presence</h6>
                      <small className="text-muted">USA, UK, India</small>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            
            <Col lg={6}>
              <img 
                src="https://images.pexels.com/photos/3184432/pexels-photo-3184432.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Healthcare Innovation"
                className="img-fluid rounded shadow-lg"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Leadership Section */}
      <section className="section-padding bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <h2 className="display-6 fw-bold text-primary-blue mb-3">
                Leadership Excellence
              </h2>
              <p className="lead">
                Our program is led by internationally recognized healthcare leaders 
                and industry experts.
              </p>
            </Col>
          </Row>
          
          <Row className="g-4 justify-content-center">
            <Col lg={5} md={6}>
              <Card className="feature-card text-center border-0 h-100">
                <Card.Body className="p-4">
                  <img 
                    src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                    alt="Dr. Ram"
                    className="rounded-circle mb-3"
                    style={{width: '120px', height: '120px', objectFit: 'cover'}}
                  />
                  <h5 className="fw-bold mb-2">Dr. Ram</h5>
                  <p className="text-secondary-teal fw-semibold mb-3">
                    Top 25 Healthcare Executives, USA
                  </p>
                  <p className="text-muted">
                    Leading healthcare transformation with decades of experience in 
                    strategic healthcare management and innovation.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={5} md={6}>
              <Card className="feature-card text-center border-0 h-100">
                <Card.Body className="p-4">
                  <img 
                    src="https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                    alt="Dr. Alex Ephrem"
                    className="rounded-circle mb-3"
                    style={{width: '120px', height: '120px', objectFit: 'cover'}}
                  />
                  <h5 className="fw-bold mb-2">Dr. Alex Ephrem</h5>
                  <p className="text-secondary-teal fw-semibold mb-3">
                    40+ Years Healthcare R&D
                  </p>
                  <p className="text-muted">
                    Pioneering healthcare research and development with extensive 
                    experience in clinical innovation and medical technology.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Global Operations */}
      <section className="section-padding">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <h2 className="display-6 fw-bold text-primary-blue mb-3">
                Global Operations
              </h2>
              <p className="lead">
                With strategic locations worldwide, we deliver healthcare innovation 
                across multiple continents.
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
                  <h5 className="fw-bold mb-3">R&D Hub</h5>
                  <p className="text-muted mb-2">
                    <strong>IIT Madras Research Park</strong>
                  </p>
                  <p className="text-muted">
                    Our primary research and development center, driving innovation 
                    in healthcare technology and clinical solutions.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={6}>
              <Card className="feature-card text-center border-0 h-100">
                <Card.Body className="p-4">
                  <div className="benefit-icon">
                    <Globe />
                  </div>
                  <h5 className="fw-bold mb-3">USA Operations</h5>
                  <p className="text-muted mb-2">
                    <strong>Healthcare Leadership</strong>
                  </p>
                  <p className="text-muted">
                    Strategic operations in the United States, leveraging partnerships 
                    with Johns Hopkins and Harvard medical institutions.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={6}>
              <Card className="feature-card text-center border-0 h-100">
                <Card.Body className="p-4">
                  <div className="benefit-icon">
                    <Target />
                  </div>
                  <h5 className="fw-bold mb-3">UK Expansion</h5>
                  <p className="text-muted mb-2">
                    <strong>University of Warwick Partnership</strong>
                  </p>
                  <p className="text-muted">
                    Expanding into the UK market through strategic academic partnerships 
                    and innovative training programs.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Innovation Highlights */}
      <section className="section-padding bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <h2 className="display-6 fw-bold text-primary-blue mb-3">
                Innovation in Action: Telth Care Hubs
              </h2>
              <p className="lead">
                Community-based, AI-powered Smart Clinics that serve as both 
                training and employment centers for our program participants.
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            <Col lg={3} md={6}>
              <Card className="feature-card text-center border-0 h-100">
                <Card.Body className="p-4">
                  <div className="benefit-icon">
                    <Brain />
                  </div>
                  <h5 className="fw-bold mb-3">90+ Diagnostic Parameters</h5>
                  <p className="text-muted">
                    Comprehensive diagnostic capabilities powered by advanced 
                    AI and medical technology.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6}>
              <Card className="feature-card text-center border-0 h-100">
                <Card.Body className="p-4">
                  <div className="benefit-icon">
                    <Users />
                  </div>
                  <h5 className="fw-bold mb-3">On-Site Consultation</h5>
                  <p className="text-muted">
                    Complete medical consultation and medication services 
                    available on-site for patient convenience.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6}>
              <Card className="feature-card text-center border-0 h-100">
                <Card.Body className="p-4">
                  <div className="benefit-icon">
                    <Zap />
                  </div>
                  <h5 className="fw-bold mb-3">20-Minute Turnaround</h5>
                  <p className="text-muted">
                    Rapid diagnostic and treatment processes ensuring 
                    efficient patient care delivery.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={3} md={6}>
              <Card className="feature-card text-center border-0 h-100">
                <Card.Body className="p-4">
                  <div className="benefit-icon">
                    <Heart />
                  </div>
                  <h5 className="fw-bold mb-3">Home Care Integration</h5>
                  <p className="text-muted">
                    Seamless integration with home-based care services 
                    for comprehensive patient support.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* University Partnership */}
      <section className="section-padding">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <img 
                src="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="University Partnership"
                className="img-fluid rounded shadow-lg"
              />
            </Col>
            
            <Col lg={6}>
              <h2 className="display-6 fw-bold text-primary-blue mb-4">
                Strategic Academic Collaboration: University of Warwick
              </h2>
              <p className="lead mb-4">
                The partnership brings unmatched academic prestige and practical relevance 
                to our healthcare training program.
              </p>
              
              <div className="d-flex align-items-start mb-3">
                <Award className="text-secondary-teal me-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h6 className="fw-bold mb-1">NHS-Aligned Placements</h6>
                  <p className="text-muted mb-0">Direct integration with UK healthcare system</p>
                </div>
              </div>
              
              <div className="d-flex align-items-start mb-3">
                <Users className="text-secondary-teal me-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h6 className="fw-bold mb-1">Co-Designed Curriculum</h6>
                  <p className="text-muted mb-0">Jointly developed postgraduate programs</p>
                </div>
              </div>
              
              <div className="d-flex align-items-start mb-3">
                <Building className="text-secondary-teal me-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h6 className="fw-bold mb-1">Harley Street Training</h6>
                  <p className="text-muted mb-0">Hands-on experience in prestigious medical centers</p>
                </div>
              </div>
              
              <div className="d-flex align-items-start">
                <Heart className="text-secondary-teal me-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h6 className="fw-bold mb-1">Longevity Clubs Integration</h6>
                  <p className="text-muted mb-0">Preventive and personalized care focus</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;