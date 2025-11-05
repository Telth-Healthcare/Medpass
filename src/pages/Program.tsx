import React from 'react';
import { Container, Row, Col, Card, Badge, Accordion } from 'react-bootstrap';
import {
  BookOpen,
  Award,
  Briefcase,
  Users,
  Globe,
  Brain,
  Heart,
  Monitor,
  Stethoscope,
  Target,
  GraduationCap,
  LifeBuoy,
} from 'lucide-react';
import programmeImage from '../assest/Picture2.jpg';
import '../Program.css';


const Program: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="section-padding-sm bg-gradient-primary text-white" style={{ marginTop: '60px' }}>
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h5 className="display-4 fw-bold mb-3">Our Programme Overview</h5>
              {/* <p className="lead">
                Comprehensive information about the Telth UK Postgraduate Skill Upgrade Program
              </p> */}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Program Overview */}
      <section className="section-padding">
        <Container>
          <section className="programme-overview-section">
            <Container>
              <Row className="align-items-center g-5">
                {/* Left: Timeline-style content */}
                <Col lg={7}>
                  <div className="timeline">
                    <div className="timeline-item ">
                      <div className="timeline-content card1">
                        <div className="timeline-icon"><GraduationCap /></div>
                        <h5 className="fw-bold">UK Postgraduate Certification</h5>
                        <p>Earn a prestigious qualification through our Knowledge Transfer Partnership with a leading UK university.</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-content card1">
                        <div className="timeline-icon"><Briefcase /></div>
                        <h5 className="fw-bold">Guaranteed Employment</h5>
                        <p>Secure a two-year paid position at Telth AI Care Hubs, gaining valuable UK clinical experience.</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-content card1">
                        <div className="timeline-icon"><LifeBuoy /></div>
                        <h5 className="fw-bold">Comprehensive Support</h5>
                        <p>Receive assistance with visa processing, accommodation, and ongoing professional development.</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-content card1">
                        <div className="timeline-icon">
                          <Globe />
                          <h5 className="fw-bold">Global Career Pathway</h5>
                        </div>
                        <p>Build a foundation for an international healthcare career with transferable skills.</p>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Right: Image */}
                <Col lg={5}>
                  <img
                    src={programmeImage}
                    alt="Telth UK Program"
                    className="img-fluid rounded shadow-lg programme-image"
                  />
                </Col>
              </Row>
            </Container>
          </section>
        </Container>
      </section>

      {/* Curriculum Section */}
      <section className="section-padding bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <h2 className="display-6 fw-bold text-primary-blue mb-3">
                Comprehensive Curriculum
              </h2>
              <p className="lead">
                Our integrated curriculum blends clinical practice with future-ready technologies
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col lg={6} md={12}>
              <Card className="feature-card border-0 h-100">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <Brain className="text-secondary-teal me-3" size={28} />
                    <h5 className="fw-bold mb-0">Advanced Diagnostics and AI-Driven Healthcare</h5>
                  </div>
                  <p className="text-muted">
                    Master cutting-edge diagnostic technologies and artificial intelligence
                    applications in modern healthcare settings.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <Badge bg="primary">AI Diagnostics</Badge>
                    <Badge bg="secondary">Machine Learning</Badge>
                    <Badge bg="info">Data Analytics</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6} md={12}>
              <Card className="feature-card border-0 h-100">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <Heart className="text-secondary-teal me-3" size={28} />
                    <h5 className="fw-bold mb-0">Personalized Medicine & Genomic Profiling</h5>
                  </div>
                  <p className="text-muted">
                    Learn individualized treatment approaches using genomic data and
                    personalized medicine techniques.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <Badge bg="primary">Genomics</Badge>
                    <Badge bg="secondary">Precision Medicine</Badge>
                    <Badge bg="info">Biomarkers</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6} md={12}>
              <Card className="feature-card border-0 h-100">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <Monitor className="text-secondary-teal me-3" size={28} />
                    <h5 className="fw-bold mb-0">IoMT Integration & Real-Time Monitoring</h5>
                  </div>
                  <p className="text-muted">
                    Understand the Internet of Medical Things (IoMT) and real-time
                    patient monitoring systems and dashboards.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <Badge bg="primary">IoMT</Badge>
                    <Badge bg="secondary">Remote Monitoring</Badge>
                    <Badge bg="info">Digital Health</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6} md={12}>
              <Card className="feature-card border-0 h-100">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <Stethoscope className="text-secondary-teal me-3" size={28} />
                    <h5 className="fw-bold mb-0">Evidence-Based Community & Home Care Models</h5>
                  </div>
                  <p className="text-muted">
                    Modern approaches to community healthcare delivery and home-based
                    care management systems.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <Badge bg="primary">Community Care</Badge>
                    <Badge bg="secondary">Home Healthcare</Badge>
                    <Badge bg="info">Evidence-Based Practice</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* KTP Program Explanation */}
      <section className="section-padding">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="display-6 fw-bold text-primary-blue mb-4">
                How KTP (Knowledge Transfer Partnership) Works
              </h2>
              <p className="lead mb-4">
                A UK Government initiative led by Innovate UK, KTPs connect businesses,
                academic institutions, and graduates in a unique partnership model.
              </p>

              <div className="d-flex align-items-start mb-3">
                <div className="bg-primary-blue text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                  1
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Businesses (Telth Tech)</h6>
                  <p className="text-muted mb-0">Industry expertise and real-world application</p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-3">
                <div className="bg-secondary-teal text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                  2
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Academic Institutions (University of Warwick)</h6>
                  <p className="text-muted mb-0">Academic rigor and research excellence</p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <div className="bg-accent-gold text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                  3
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Graduates (You)</h6>
                  <p className="text-muted mb-0">Career development and practical training</p>
                </div>
              </div>

              <div className="alert alert-info">
                <strong>Up to 67% Government Funding</strong><br />
                An affordable, high-impact upskilling solution supported by UK government initiatives.
              </div>
            </Col>

            <Col lg={6}>
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Knowledge Transfer Partnership"
                className="img-fluid rounded shadow-lg"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Eligibility and Requirements */}
      <section className="section-padding bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <h2 className="display-6 fw-bold text-primary-blue mb-3">
                Who Is This For?
              </h2>
              <p className="lead">
                This program is designed for ambitious healthcare professionals seeking
                career advancement in the UK healthcare system.
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col lg={6}>
              <Card className="feature-card border-0 h-100">
                <Card.Body className="p-4">
                  <h5 className="fw-bold text-primary-blue mb-3">Ideal Candidates</h5>
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-start mb-3">
                      <Users className="text-secondary-teal me-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <h6 className="fw-bold mb-1">Foreign Medical Graduates (FMGs)</h6>
                        <p className="text-muted mb-0">International medical degree holders seeking UK practice</p>
                      </div>
                    </li>
                    <li className="d-flex align-items-start mb-3">
                      <Stethoscope className="text-secondary-teal me-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <h6 className="fw-bold mb-1">Junior Doctors</h6>
                        <p className="text-muted mb-0">Early-career physicians looking for specialization</p>
                      </div>
                    </li>
                    <li className="d-flex align-items-start mb-3">
                      <Heart className="text-secondary-teal me-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <h6 className="fw-bold mb-1">Physician Assistants & Nursing Practitioners</h6>
                        <p className="text-muted mb-0">Advanced practice healthcare providers</p>
                      </div>
                    </li>
                    <li className="d-flex align-items-start">
                      <Target className="text-secondary-teal me-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <h6 className="fw-bold mb-1">Ambitious Healthcare Workers</h6>
                        <p className="text-muted mb-0">Professionals aiming for UK clinical practice</p>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="feature-card border-0 h-100">
                <Card.Body className="p-4">
                  <h5 className="fw-bold text-primary-blue mb-3">Career Goals</h5>
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-start mb-3">
                      <Award className="text-secondary-teal me-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <h6 className="fw-bold mb-1">Career Advancement</h6>
                        <p className="text-muted mb-0">Seeking professional growth in healthcare</p>
                      </div>
                    </li>
                    <li className="d-flex align-items-start mb-3">
                      <Globe className="text-secondary-teal me-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <h6 className="fw-bold mb-1">International Experience</h6>
                        <p className="text-muted mb-0">Building global healthcare expertise</p>
                      </div>
                    </li>
                    <li className="d-flex align-items-start mb-3">
                      <Brain className="text-secondary-teal me-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <h6 className="fw-bold mb-1">Advanced Learning</h6>
                        <p className="text-muted mb-0">Mastering cutting-edge medical technologies</p>
                      </div>
                    </li>
                    <li className="d-flex align-items-start">
                      <Briefcase className="text-secondary-teal me-3 mt-1 flex-shrink-0" size={20} />
                      <div>
                        <h6 className="fw-bold mb-1">UK Clinical Practice</h6>
                        <p className="text-muted mb-0">Entry into the UK's elite medical system</p>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <h2 className="display-6 fw-bold text-primary-blue mb-3">
                Frequently Asked Questions
              </h2>
              <p className="lead">
                Common questions about the Telth UK Postgraduate Skill Upgrade Program
              </p>
            </Col>
          </Row>

          <Row>
            <Col lg={10} className="mx-auto">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>What is the duration of the program?</Accordion.Header>
                  <Accordion.Body>
                    The program typically runs for 12-18 months, combining academic coursework with practical training. Upon completion, participants are guaranteed a 2-year employment contract with Telth AI Care Hubs in the UK.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>What support is provided for international candidates?</Accordion.Header>
                  <Accordion.Body>
                    We provide comprehensive end-to-end support including visa assistance, accommodation guidance, professional onboarding, and cultural integration support to ensure a smooth transition to the UK healthcare system.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>How is the program funded?</Accordion.Header>
                  <Accordion.Body>
                    The program benefits from up to 67% UK government funding through the Knowledge Transfer Partnership (KTP) initiative, making it an affordable and high-impact upskilling solution for participants.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>What qualifications will I receive?</Accordion.Header>
                  <Accordion.Body>
                    Participants receive a postgraduate certification from the University of Warwick, a prestigious UK institution. The qualification is fully recognized within the UK healthcare system and internationally.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                  <Accordion.Header>Where will I work after completing the program?</Accordion.Header>
                  <Accordion.Body>
                    Upon program completion, you'll be employed at Telth AI Care Hubs across the UK. These are community-based, AI-powered Smart Clinics that provide comprehensive healthcare services with advanced diagnostic capabilities.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="5">
                  <Accordion.Header>What career opportunities are available after the 2-year contract?</Accordion.Header>
                  <Accordion.Body>
                    The program builds a foundation for an international healthcare career. Graduates typically advance to senior clinical roles, healthcare management positions, or pursue further specialization within the UK healthcare system or globally.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Program;