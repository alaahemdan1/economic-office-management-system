import { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Card, Form, Button, Table, Badge } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Study {
  id: number;
  name: string;
  description: string;
  status: string;
  date: string;
  totalFees: number;
  firstPayment: number;
  secondPayment: number;
  remaining: number;
}

interface Company {
  id: number;
  name: string;
  companyType: string;
  capital: number;
  licenseStatus: string;
  status: string;
  date: string;
  totalFees: number;
  firstPayment: number;
  secondPayment: number;
  remaining: number;
}

interface License {
  id: number;
  projectName: string;
  company: string;
  status: string;
  date: string;
  totalFees: number;
  firstPayment: number;
  secondPayment: number;
  remaining: number;
}

interface Opportunity {
  id: number;
  title: string;
  sector: string;
  description: string;
  status: string;
  date: string;
  totalFees: number;
  firstPayment: number;
  secondPayment: number;
  remaining: number;
}

interface Land {
  id: number;
  location: string;
  area: string;
  companyName: string;
  activityType: string;
  product: string;
  status: string;
  date: string;
  totalFees: number;
  firstPayment: number;
  secondPayment: number;
  remaining: number;
}

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data states
  const [studies, setStudies] = useState<Study[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [lands, setLands] = useState<Land[]>([]);
  
  const [newStudy, setNewStudy] = useState({ 
    name: '', 
    description: '', 
    status: 'قيد التنفيذ', 
    date: '',
    totalFees: 0,
    firstPayment: 0,
    secondPayment: 0,
    remaining: 0
  });
  
  const [newCompany, setNewCompany] = useState({ 
    name: '', 
    companyType: 'منشأة فردية', 
    capital: 0,
    licenseStatus: 'قيد التنفيذ',
    status: 'قيد التنفيذ', 
    date: '',
    totalFees: 0,
    firstPayment: 0,
    secondPayment: 0,
    remaining: 0
  });
  
  const [newLicense, setNewLicense] = useState({ 
    projectName: '', 
    company: '', 
    status: 'متقدم', 
    date: '',
    totalFees: 0,
    firstPayment: 0,
    secondPayment: 0,
    remaining: 0
  });
  
  const [newOpportunity, setNewOpportunity] = useState({ 
    title: '', 
    sector: '', 
    description: '', 
    status: 'متاحة', 
    date: '',
    totalFees: 0,
    firstPayment: 0,
    secondPayment: 0,
    remaining: 0
  });
  
  const [newLand, setNewLand] = useState({ 
    location: '', 
    area: '', 
    companyName: '', 
    activityType: '', 
    product: '', 
    status: 'قيد التنفيذ', 
    date: '',
    totalFees: 0,
    firstPayment: 0,
    secondPayment: 0,
    remaining: 0
  });
  
  // Edit states
  // @ts-ignore
  const [editingStudy, setEditingStudy] = useState<Study | null>(null);
  // @ts-ignore
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  // @ts-ignore
  const [editingLicense, setEditingLicense] = useState<License | null>(null);
  // @ts-ignore
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null);
  // @ts-ignore
  const [editingLand, setEditingLand] = useState<Land | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedStudies = localStorage.getItem('economicOffice_studies');
    if (savedStudies) setStudies(JSON.parse(savedStudies));
    
    const savedCompanies = localStorage.getItem('economicOffice_companies');
    if (savedCompanies) setCompanies(JSON.parse(savedCompanies));
    
    const savedLicenses = localStorage.getItem('economicOffice_licenses');
    if (savedLicenses) setLicenses(JSON.parse(savedLicenses));
    
    const savedOpportunities = localStorage.getItem('economicOffice_opportunities');
    if (savedOpportunities) setOpportunities(JSON.parse(savedOpportunities));
    
    const savedLands = localStorage.getItem('economicOffice_lands');
    if (savedLands) setLands(JSON.parse(savedLands));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('economicOffice_studies', JSON.stringify(studies));
    localStorage.setItem('economicOffice_companies', JSON.stringify(companies));
    localStorage.setItem('economicOffice_licenses', JSON.stringify(licenses));
    localStorage.setItem('economicOffice_opportunities', JSON.stringify(opportunities));
    localStorage.setItem('economicOffice_lands', JSON.stringify(lands));
  }, [studies, companies, licenses, opportunities, lands]);

  // Delete handlers
  const deleteStudy = (id: number) => setStudies(studies.filter(s => s.id !== id));
  const deleteCompany = (id: number) => setCompanies(companies.filter(c => c.id !== id));
  const deleteLicense = (id: number) => setLicenses(licenses.filter(l => l.id !== id));
  const deleteOpportunity = (id: number) => setOpportunities(opportunities.filter(o => o.id !== id));
  const deleteLand = (id: number) => setLands(lands.filter(l => l.id !== id));

  // Edit handlers
  const editStudy = (study: Study) => {
    setEditingStudy(study);
    setNewStudy({...study});
  };

  const editCompany = (company: Company) => {
    setEditingCompany(company);
    setNewCompany({...company});
  };

  const editLicense = (license: License) => {
    setEditingLicense(license);
    setNewLicense({...license});
  };

  const editOpportunity = (opportunity: Opportunity) => {
    setEditingOpportunity(opportunity);
    setNewOpportunity({...opportunity});
  };

  const editLand = (land: Land) => {
    setEditingLand(land);
    setNewLand({...land});
  };

  // Add handlers
  const addStudy = () => {
    if (newStudy.name && newStudy.description && newStudy.totalFees > 0) {
      const remaining = newStudy.totalFees - (newStudy.firstPayment + newStudy.secondPayment);
      
      if (editingStudy) {
        // Update existing study
        setStudies(studies.map(s => s.id === editingStudy.id ? {
          ...newStudy,
          id: editingStudy.id,
          date: editingStudy.date,
          remaining: remaining
        } : s));
        setEditingStudy(null);
        alert('تم تعديل الدراسة بنجاح');
      } else {
        // Add new study
        setStudies([...studies, { 
          id: Date.now(), 
          ...newStudy, 
          date: new Date().toLocaleDateString('ar-EG'),
          totalFees: newStudy.totalFees,
          firstPayment: newStudy.firstPayment,
          secondPayment: newStudy.secondPayment,
          remaining: remaining
        }]);
        alert('تمت إضافة الدراسة بنجاح');
      }
      
      setNewStudy({ name: '', description: '', status: 'قيد التنفيذ', date: '', totalFees: 0, firstPayment: 0, secondPayment: 0, remaining: 0 });
    }
  };

  const addCompany = () => {
    if (newCompany.name && newCompany.companyType) {
      // Calculate remaining automatically
      const remaining = newCompany.totalFees - (newCompany.firstPayment + newCompany.secondPayment);
      
      if (editingCompany) {
        // Update existing company
        setCompanies(companies.map(c => c.id === editingCompany.id ? {
          ...newCompany,
          id: editingCompany.id,
          date: editingCompany.date,
          remaining: remaining
        } : c));
        setEditingCompany(null);
        alert('تم تعديل الشركة بنجاح');
      } else {
        // Add new company
        const newCompanyObj = {
          id: Date.now(),
          name: newCompany.name,
          companyType: newCompany.companyType,
          capital: newCompany.capital,
          licenseStatus: newCompany.licenseStatus,
          status: newCompany.status,
          date: new Date().toLocaleDateString('ar-EG'),
          totalFees: newCompany.totalFees,
          firstPayment: newCompany.firstPayment,
          secondPayment: newCompany.secondPayment,
          remaining: remaining
        };
        console.log('Adding company:', newCompanyObj);
        setCompanies([...companies, newCompanyObj]);
        alert('تمت إضافة الشركة بنجاح');
      }
      
      setNewCompany({ 
        name: '', 
        companyType: 'منشأة فردية', 
        capital: 0,
        licenseStatus: 'قيد التنفيذ',
        status: 'قيد التنفيذ', 
        date: '',
        totalFees: 0,
        firstPayment: 0,
        secondPayment: 0,
        remaining: 0
      });
    } else {
      alert('الرجاء ملء اسم الشركة ونوع الشركة');
    }
  };

  const addLicense = () => {
    if (newLicense.projectName && newLicense.company && newLicense.totalFees > 0) {
      const remaining = newLicense.totalFees - (newLicense.firstPayment + newLicense.secondPayment);
      
      if (editingLicense) {
        // Update existing license
        setLicenses(licenses.map(l => l.id === editingLicense.id ? {
          ...newLicense,
          id: editingLicense.id,
          date: editingLicense.date,
          remaining: remaining
        } : l));
        setEditingLicense(null);
        alert('تم تعديل الترخيص بنجاح');
      } else {
        // Add new license
        setLicenses([...licenses, {
          id: Date.now(),
          ...newLicense,
          remaining,
          date: new Date().toLocaleDateString('ar-EG')
        }]);
        alert('تمت إضافة الترخيص بنجاح');
      }
      
      setNewLicense({ 
        projectName: '', 
        company: '', 
        status: 'متقدم', 
        date: '',
        totalFees: 0,
        firstPayment: 0,
        secondPayment: 0,
        remaining: 0
      });
    }
  };

  const addOpportunity = () => {
    if (newOpportunity.title && newOpportunity.sector && newOpportunity.totalFees > 0) {
      const remaining = newOpportunity.totalFees - (newOpportunity.firstPayment + newOpportunity.secondPayment);
      
      if (editingOpportunity) {
        // Update existing opportunity
        setOpportunities(opportunities.map(o => o.id === editingOpportunity.id ? {
          ...newOpportunity,
          id: editingOpportunity.id,
          date: editingOpportunity.date,
          remaining: remaining
        } : o));
        setEditingOpportunity(null);
        alert('تم تعديل الفرصة بنجاح');
      } else {
        // Add new opportunity
        setOpportunities([...opportunities, {
          id: Date.now(),
          ...newOpportunity,
          remaining,
          date: new Date().toLocaleDateString('ar-EG')
        }]);
        alert('تمت إضافة الفرصة بنجاح');
      }
      
      setNewOpportunity({ 
        title: '', 
        sector: '', 
        description: '', 
        status: 'متاحة', 
        date: '',
        totalFees: 0,
        firstPayment: 0,
        secondPayment: 0,
        remaining: 0
      });
    }
  };

  const addLand = () => {
    if (newLand.location && newLand.area && newLand.companyName && newLand.totalFees > 0) {
      const remaining = newLand.totalFees - (newLand.firstPayment + newLand.secondPayment);
      
      if (editingLand) {
        // Update existing land
        setLands(lands.map(l => l.id === editingLand.id ? {
          ...newLand,
          id: editingLand.id,
          date: editingLand.date,
          remaining: remaining
        } : l));
        setEditingLand(null);
        alert('تم تعديل الأرض بنجاح');
      } else {
        // Add new land
        setLands([...lands, {
          id: Date.now(),
          ...newLand,
          remaining,
          date: new Date().toLocaleDateString('ar-EG')
        }]);
        alert('تمت إضافة الأرض بنجاح');
      }
      
      setNewLand({ 
        location: '', 
        area: '', 
        companyName: '', 
        activityType: '', 
        product: '', 
        status: 'قيد التنفيذ', 
        date: '',
        totalFees: 0,
        firstPayment: 0,
        secondPayment: 0,
        remaining: 0
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variantMap: Record<string, string> = {
      'قيد التنفيذ': 'warning',
      'مكتمل': 'success',
      'مرفض': 'danger',
      'جديد': 'primary',
      'متحقق': 'success',
      'متقدم': 'info',
      'معتمد': 'success',
      'مرفوض': 'danger',
      'متاحة': 'success',
      'مستغلة': 'secondary',
      'متاح': 'success',
      'محجوز': 'warning',
      'مستخدم': 'danger'
    };
    return <Badge bg={variantMap[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <Container fluid className="p-0">
      <Row className="bg-primary text-white p-3 mb-4 rounded-top">
        <Col>
          <h2 className="h4 mb-0">مكتب الرؤية الاقتصادية</h2>
          <p className="mb-0 small">لوحة تحكم إدارة الدراسات والخدمات</p>
        </Col>
      </Row>

      <Row>
        <Col md={2} className="border-end">
          <Nav className="flex-column">
            <Nav.Link 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')}
              className={`py-2 px-3 ${activeTab === 'dashboard' ? 'bg-secondary text-white' : ''}`}
            >
              لوحة تحكم
            </Nav.Link>
            <Nav.Link 
              active={activeTab === 'feasibility'} 
              onClick={() => setActiveTab('feasibility')}
              className={`py-2 px-3 ${activeTab === 'feasibility' ? 'bg-primary text-white' : ''}`}
            >
              دراسات الجدوى
            </Nav.Link>
            <Nav.Link 
              active={activeTab === 'company'} 
              onClick={() => setActiveTab('company')}
              className={`py-2 px-3 ${activeTab === 'company' ? 'bg-success text-white' : ''}`}
            >
              تأسيس شركات
            </Nav.Link>
            <Nav.Link 
              active={activeTab === 'license'} 
              onClick={() => setActiveTab('license')}
              className={`py-2 px-3 ${activeTab === 'license' ? 'bg-warning text-dark' : ''}`}
            >
              تراخيص صناعية
            </Nav.Link>
            <Nav.Link 
              active={activeTab === 'opportunities'} 
              onClick={() => setActiveTab('opportunities')}
              className={`py-2 px-3 ${activeTab === 'opportunities' ? 'bg-info text-dark' : ''}`}
            >
              فرص استثمارية
            </Nav.Link>
            <Nav.Link 
              active={activeTab === 'lands'} 
              onClick={() => setActiveTab('lands')}
              className={`py-2 px-3 ${activeTab === 'lands' ? 'bg-danger text-white' : ''}`}
            >
              طرح أراضي صناعية
            </Nav.Link>
          </Nav>
        </Col>

        <Col md={10} className="p-4">
          {activeTab === 'dashboard' && (
            <div>
              <h3 className="mb-4">لوحة تحكم</h3>
              <Row className="mb-4">
                <Col md={2}>
                  <Card className="text-center border-primary mb-3">
                    <Card.Body>
                      <h4 className="card-title">دراسات الجدوى</h4>
                      <h3>{studies.length}</h3>
                      <p>مجموع الدراسات</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={2}>
                  <Card className="text-center border-success mb-3">
                    <Card.Body>
                      <h4 className="card-title">الشركات</h4>
                      <h3>{companies.length}</h3>
                      <p>شركات مؤسسة</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={2}>
                  <Card className="text-center border-info mb-3">
                    <Card.Body>
                      <h4 className="card-title">التراخيص</h4>
                      <h3>{licenses.length}</h3>
                      <p>تراخيص صناعية</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={2}>
                  <Card className="text-center border-warning mb-3">
                    <Card.Body>
                      <h4 className="card-title">الفرص</h4>
                      <h3>{opportunities.length}</h3>
                      <p>فرص استثمارية</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={2}>
                  <Card className="text-center border-dark mb-3">
                    <Card.Body>
                      <h4 className="card-title">الأراضي</h4>
                      <h3>{lands.length}</h3>
                      <p>أراضي صناعية</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              
              <div className="alert alert-info">
                <h5>مرحبًا بكم في نظام إدارة مكتب الرؤية الاقتصادية</h5>
                <p>يمكنكم من خلال هذا النظام إدارة جميع خدمات المكتب بما في ذلك دراسات الجدوى، تأسيس الشركات، والتراخيص الصناعية.</p>
              </div>
            </div>
          )}

          {activeTab === 'feasibility' && (
            <div>
              <h3 className="mb-4">دراسات الجدوى</h3>
              
              <Card className="mb-4 border-primary">
                <Card.Header as="h5" className="bg-primary text-white">{editingStudy ? 'تعديل دراسة جدوى' : 'إضافة دراسة جدوى جديدة'}</Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={5}>
                      <Form.Group className="mb-3">
                        <Form.Label>اسم الدراسة</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="أدخل اسم الدراسة" 
                          value={newStudy.name}
                          onChange={e => setNewStudy({...newStudy, name: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={5}>
                      <Form.Group className="mb-3">
                        <Form.Label>الحالة</Form.Label>
                        <Form.Select 
                          value={newStudy.status}
                          onChange={e => setNewStudy({...newStudy, status: e.target.value})}
                        >
                          <option value="قيد التنفيذ">قيد التنفيذ</option>
                          <option value="مكتمل">مكتمل</option>
                          <option value="مرفض">مرفض</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={2}>
                      <Form.Group className="mb-3">
                        <Form.Label>التاريخ</Form.Label>
                        <Form.Control 
                          type="date" 
                          value={newStudy.date}
                          onChange={e => setNewStudy({...newStudy, date: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>وصف الدراسة</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3} 
                      placeholder="وصف تفصيلي للدراسة" 
                      value={newStudy.description}
                      onChange={e => setNewStudy({...newStudy, description: e.target.value})}
                    />
                  </Form.Group>
                  <Row>
                    <Col md={12}>
                      <h6 className="mb-3 text-primary fw-bold">💰 نظام الدفعات المالية</h6>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>💵 إجمالي الاتعاب المتفق عليها</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="أدخل إجمالي الاتعاب" 
                          value={newStudy.totalFees}
                          onChange={e => setNewStudy({...newStudy, totalFees: Number(e.target.value)})}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>📥 الدفعة الأولى</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="أدخل الدفعة الأولى" 
                          value={newStudy.firstPayment}
                          onChange={e => setNewStudy({...newStudy, firstPayment: Number(e.target.value)})}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>📥 الدفعة الثانية</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="أدخل الدفعة الثانية" 
                          value={newStudy.secondPayment}
                          onChange={e => setNewStudy({...newStudy, secondPayment: Number(e.target.value)})}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>📊 المبلغ المتبقي</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="المبلغ المتبقي" 
                          value={newStudy.totalFees - (newStudy.firstPayment + newStudy.secondPayment)}
                          readOnly
                          style={{ backgroundColor: '#FFF3CD', borderColor: '#FFE5A6' }}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Card className="bg-success text-white mb-3">
                        <Card.Body>
                          <div className="text-center">
                            <h6 className="mb-2">✅ إجمالي المدفوع</h6>
                            <h4 className="mb-0">{(newStudy.firstPayment + newStudy.secondPayment).toLocaleString('ar-SA')} ج.م</h4>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card className="bg-primary text-white mb-3">
                        <Card.Body>
                          <div className="text-center">
                            <h6 className="mb-2">📊 نسبة السداد</h6>
                            <h4 className="mb-0">
                              {newStudy.totalFees > 0 
                                ? ((((newStudy.firstPayment + newStudy.secondPayment) / newStudy.totalFees) * 100).toFixed(2))
                                : '0'}%
                            </h4>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Button variant="primary" onClick={addStudy} className="bg-primary text-white">
                    {editingStudy ? 'تعديل' : 'إضافة'} دراسة
                  </Button>
                </Card.Body>
              </Card>

              <h4 className="mb-3 text-primary">الدراسات المسجلة ({studies.length})</h4>
              {studies.length === 0 ? (
                <p className="text-muted">لا توجد دراسات مسجلة بعد</p>
              ) : (
                <>
                <Table striped bordered hover responsive id="studies-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>اسم الدراسة</th>
                      <th>الحالة</th>
                      <th>التاريخ</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studies.map(study => (
                      <tr key={study.id}>
                        <td>{study.id}</td>
                        <td>{study.name}</td>
                        <td>{getStatusBadge(study.status)}</td>
                        <td>{study.date}</td>
                        <td>
                          <Button variant="primary" size="sm" onClick={() => editStudy(study)} style={{marginRight: '5px'}}>
                            تعديل
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => deleteStudy(study.id)}>
                            حذف
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                </>
              )}
              <Button variant="primary" onClick={() => {
                const element = document.getElementById('studies-table');
                if (element) {
                  html2canvas(element, { allowTaint: true, useCORS: true }).then((canvas: any) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const imgProps = pdf.getImageProperties(imgData);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (pdfWidth * imgProps.height) / imgProps.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save('الدراسات.pdf');
                  }).catch(() => {
                    alert('فشل تحميل PDF. تأكد من أن جدول البيانات يحتوي على بيانات');
                  });
                } else {
                  alert('لا يوجد جدول بيانات');
                }
              }} className="mt-3 me-2">
                📥 تحميل PDF
              </Button>
            </div>
          )}

                    {activeTab === 'company' && (
            <div>
              <h3 className="mb-4 text-success">تأسيس شركات</h3>
      
              <Card className="mb-4 border-success">
                <Card.Header as="h5" className="bg-success text-white">{editingCompany ? 'تعديل شركة' : 'إضافة شركة جديدة'}</Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>اسم الشركة</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="أدخل اسم الشركة" 
                          value={newCompany.name}
                          onChange={e => setNewCompany({...newCompany, name: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>نوع الشركة</Form.Label>
                        <Form.Select
                          value={newCompany.companyType}
                          onChange={e => setNewCompany({...newCompany, companyType: e.target.value})}
                        >
                          <option value="شركة فردية">منشأة فردية</option>
                          <option value="شركة ذات مسؤولية محدودة">شركة ذات مسؤولية محدودة</option>
                          <option value="شركة مساهمة">شركة مساهمة</option>
                          <option value="شركة تضامن">شركة تضامن</option>
                          <option value="شركة توصية بسيطة">شركة توصية بسيطة</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>رأس المال (ج.م)</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="أدخل رأس المال" 
                          value={newCompany.capital}
                          onChange={e => setNewCompany({...newCompany, capital: Number(e.target.value)})}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <h6 className="mb-3 text-success fw-bold">💰 نظام الدفعات المالية</h6>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>💵 إجمالي الاتعاب المتفق عليها</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="أدخل إجمالي الاتعاب" 
                          value={newCompany.totalFees}
                          onChange={e => setNewCompany({...newCompany, totalFees: Number(e.target.value)})}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>📥 الدفعة الأولى</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="أدخل الدفعة الأولى" 
                          value={newCompany.firstPayment}
                          onChange={e => setNewCompany({...newCompany, firstPayment: Number(e.target.value)})}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>📥 الدفعة الثانية</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="أدخل الدفعة الثانية" 
                          value={newCompany.secondPayment}
                          onChange={e => setNewCompany({...newCompany, secondPayment: Number(e.target.value)})}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>📊 المبلغ المتبقي</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="المبلغ المتبقي" 
                          value={newCompany.totalFees - (newCompany.firstPayment + newCompany.secondPayment)}
                          readOnly
                          style={{ backgroundColor: '#FFF3CD', borderColor: '#FFE5A6' }}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Card className="bg-success text-white mb-3">
                        <Card.Body>
                          <div className="text-center">
                            <h6 className="mb-2">✅ إجمالي المدفوع</h6>
                            <h4 className="mb-0">{(newCompany.firstPayment + newCompany.secondPayment).toLocaleString('ar-SA')} ج.م</h4>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card className="bg-primary text-white mb-3">
                        <Card.Body>
                          <div className="text-center">
                            <h6 className="mb-2">📊 نسبة السداد</h6>
                            <h4 className="mb-0">
                              {newCompany.totalFees > 0 
                                ? ((((newCompany.firstPayment + newCompany.secondPayment) / newCompany.totalFees) * 100).toFixed(2))
                                : '0'}%
                            </h4>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>الحالة العامة</Form.Label>
                        <Form.Select 
                          value={newCompany.status}
                          onChange={e => setNewCompany({...newCompany, status: e.target.value})}
                        >
                          <option value="قيد التنفيذ">قيد التنفيذ</option>
                          <option value="مكتمل">مكتمل</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="success" onClick={addCompany}>
                    {editingCompany ? 'تعديل' : 'إضافة'} شركة
                  </Button>
                </Card.Body>
              </Card>

              <h4 className="mb-3 text-success">الشركات المسجلة ({companies.length})</h4>
              {companies.length === 0 ? (
                <p className="text-muted">لا توجد شركات مسجلة بعد</p>
              ) : (
                <Table striped bordered hover responsive id="companies-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>اسم الشركة</th>
                      <th>نوع الشركة</th>
                      <th>رأس المال</th>
                      <th>الدفعة الأولى</th>
                      <th>الدفعة الثانية</th>
                      <th>المتبقي</th>
                      <th>الحالة</th>
                      <th>التاريخ</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map(company => (
                      <tr key={company.id}>
                        <td>{company.id}</td>
                        <td>{company.name}</td>
                        <td>
                          <Badge bg="info">{company.companyType}</Badge>
                        </td>
                        <td>{company.capital?.toLocaleString('ar-SA')} ج.م</td>
                        <td>{company.firstPayment?.toLocaleString('ar-SA')} ج.م</td>
                        <td>{company.secondPayment?.toLocaleString('ar-SA')} ج.م</td>
                        <td>{company.remaining?.toLocaleString('ar-SA')} ج.م</td>
                        <td>{getStatusBadge(company.status)}</td>
                        <td>{company.date}</td>
                        <td>
                          <Button variant="primary" size="sm" onClick={() => editCompany(company)} style={{marginRight: '5px'}}>
                            تعديل
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => deleteCompany(company.id)}>
                            حذف
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              <Button variant="success" onClick={() => {
                const element = document.getElementById('companies-table');
                if (element) {
                  html2canvas(element, { allowTaint: true, useCORS: true }).then((canvas: any) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const imgProps = pdf.getImageProperties(imgData);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (pdfWidth * imgProps.height) / imgProps.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save('الشركات.pdf');
                  }).catch(() => {
                    alert('فشل تحميل PDF. تأكد من أن جدول البيانات يحتوي على بيانات');
                  });
                } else {
                  alert('لا يوجد جدول بيانات');
                }
              }} className="mt-3 me-2">
                📥 تحميل PDF
              </Button>
            </div>
          )}

          {activeTab === 'license' && (
            <div>
              <h3 className="mb-4 text-warning">التراخيص الصناعية</h3>
              
              <Card className="mb-4 border-warning">
                <Card.Header as="h5" className="bg-warning text-dark">{editingLicense ? 'تعديل ترخيص' : 'إضافة ترخيص جديد'}</Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>اسم المشروع</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="أدخل اسم المشروع" 
                          value={newLicense.projectName}
                          onChange={e => setNewLicense({...newLicense, projectName: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>الشركة</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="أدخل اسم الشركة" 
                          value={newLicense.company}
                          onChange={e => setNewLicense({...newLicense, company: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>الحالة</Form.Label>
                        <Form.Select 
                          value={newLicense.status}
                          onChange={e => setNewLicense({...newLicense, status: e.target.value})}
                        >
                          <option value="متقدم">متقدم</option>
                          <option value="معتمد">معتمد</option>
                          <option value="مرفوض">مرفوض</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <h6 className="mb-3 text-warning fw-bold">💰 نظام الدفعات المالية</h6>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>💵 إجمالي الاتعاب المتفق عليها</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="أدخل إجمالي الاتعاب" 
                          value={newLicense.totalFees}
                          onChange={e => setNewLicense({...newLicense, totalFees: Number(e.target.value)})}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>📥 الدفعة الأولى</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="أدخل الدفعة الأولى" 
                          value={newLicense.firstPayment}
                          onChange={e => setNewLicense({...newLicense, firstPayment: Number(e.target.value)})}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>📥 الدفعة الثانية</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="أدخل الدفعة الثانية" 
                          value={newLicense.secondPayment}
                          onChange={e => setNewLicense({...newLicense, secondPayment: Number(e.target.value)})}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>📊 المبلغ المتبقي</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="المبلغ المتبقي" 
                          value={newLicense.totalFees - (newLicense.firstPayment + newLicense.secondPayment)}
                          readOnly
                          style={{ backgroundColor: '#FFF3CD', borderColor: '#FFE5A6' }}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Card className="bg-success text-white mb-3">
                        <Card.Body>
                          <div className="text-center">
                            <h6 className="mb-2">✅ إجمالي المدفوع</h6>
                            <h4 className="mb-0">{(newLicense.firstPayment + newLicense.secondPayment).toLocaleString('ar-SA')} ج.م</h4>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card className="bg-primary text-white mb-3">
                        <Card.Body>
                          <div className="text-center">
                            <h6 className="mb-2">📊 نسبة السداد</h6>
                            <h4 className="mb-0">0%</h4>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Button variant="warning" onClick={addLicense}>{editingLicense ? 'تعديل' : 'إضافة'} ترخيص</Button>
                </Card.Body>
              </Card>

              <h4 className="mb-3 text-warning">التراخيص المسجلة ({licenses.length})</h4>
              {licenses.length === 0 ? (
                <p className="text-muted">لا توجد تراخيص مسجلة بعد</p>
              ) : (
                <Table striped bordered hover responsive id="licenses-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>اسم المشروع</th>
                      <th>الشركة</th>
                      <th>الحالة</th>
                      <th>التاريخ</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {licenses.map(license => (
                      <tr key={license.id}>
                        <td>{license.id}</td>
                        <td>{license.projectName}</td>
                        <td>{license.company}</td>
                        <td>{getStatusBadge(license.status)}</td>
                        <td>{license.date}</td>
                        <td>
                          <Button variant="primary" size="sm" onClick={() => editLicense(license)} style={{marginRight: '5px'}}>
                            تعديل
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => deleteLicense(license.id)}>
                            حذف
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              <Button variant="warning" onClick={() => {
                const element = document.getElementById('licenses-table');
                if (element) {
                  html2canvas(element, { allowTaint: true, useCORS: true }).then((canvas: any) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const imgProps = pdf.getImageProperties(imgData);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (pdfWidth * imgProps.height) / imgProps.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save('التراخيص.pdf');
                  }).catch(() => {
                    alert('فشل تحميل PDF. تأكد من أن جدول البيانات يحتوي على بيانات');
                  });
                } else {
                  alert('لا يوجد جدول بيانات');
                }
              }} className="mt-3 me-2">
                📥 تحميل PDF
              </Button>
            </div>
          )}

          {activeTab === 'opportunities' && (
            <div>
              <h3 className="mb-4 text-info">الفرص الاستثمارية</h3>
              
              <Card className="mb-4 border-info">
                <Card.Header as="h5" className="bg-info text-dark">إضافة فرصة استثمارية جديدة</Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>عنوان الفرصة</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="أدخل عنوان الفرصة" 
                          value={newOpportunity.title}
                          onChange={e => setNewOpportunity({...newOpportunity, title: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>القطاع</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="أدخل القطاع" 
                          value={newOpportunity.sector}
                          onChange={e => setNewOpportunity({...newOpportunity, sector: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>الحالة</Form.Label>
                        <Form.Select 
                          value={newOpportunity.status}
                          onChange={e => setNewOpportunity({...newOpportunity, status: e.target.value})}
                        >
                          <option value="متاحة">متاحة</option>
                          <option value="مستغلة">مستغلة</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>التاريخ</Form.Label>
                        <Form.Control 
                          type="date" 
                          value={newOpportunity.date}
                          onChange={e => setNewOpportunity({...newOpportunity, date: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>وصف الفرصة</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3} 
                      placeholder="وصف تفصيلي للفرصة" 
                      value={newOpportunity.description}
                      onChange={e => setNewOpportunity({...newOpportunity, description: e.target.value})}
                    />
                  </Form.Group>
                  <Row>
                    <Col md={12}>
                      <h6 className="mb-3 text-info fw-bold">💰 نظام الدفعات المالية</h6>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>💵 إجمالي الاتعاب المتفق عليها</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="أدخل إجمالي الاتعاب" 
                          value={newOpportunity.totalFees}
                          onChange={e => setNewOpportunity({...newOpportunity, totalFees: Number(e.target.value)})}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>📥 الدفعة الأولى</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="أدخل الدفعة الأولى" 
                          value={newOpportunity.firstPayment}
                          onChange={e => setNewOpportunity({...newOpportunity, firstPayment: Number(e.target.value)})}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>📥 الدفعة الثانية</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="أدخل الدفعة الثانية" 
                          value={newOpportunity.secondPayment}
                          onChange={e => setNewOpportunity({...newOpportunity, secondPayment: Number(e.target.value)})}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>📊 المبلغ المتبقي</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="المبلغ المتبقي" 
                          value={newOpportunity.totalFees - (newOpportunity.firstPayment + newOpportunity.secondPayment)}
                          readOnly
                          style={{ backgroundColor: '#FFF3CD', borderColor: '#FFE5A6' }}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Card className="bg-success text-white mb-3">
                        <Card.Body>
                          <div className="text-center">
                            <h6 className="mb-2">✅ إجمالي المدفوع</h6>
                            <h4 className="mb-0">{(newOpportunity.firstPayment + newOpportunity.secondPayment).toLocaleString('ar-SA')} ج.م</h4>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card className="bg-primary text-white mb-3">
                        <Card.Body>
                          <div className="text-center">
                            <h6 className="mb-2">📊 نسبة السداد</h6>
                            <h4 className="mb-0">0%</h4>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Button variant="info" onClick={addOpportunity}>{editingOpportunity ? 'تعديل' : 'إضافة'} فرصة</Button>
                </Card.Body>
              </Card>

              <h4 className="mb-3 text-info">الفرص المسجلة ({opportunities.length})</h4>
              {opportunities.length === 0 ? (
                <p className="text-muted">لا توجد فرص مسجلة بعد</p>
              ) : (
                <Table striped bordered hover responsive id="opportunities-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>العنوان</th>
                      <th>القطاع</th>
                      <th>الحالة</th>
                      <th>التاريخ</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {opportunities.map(opportunity => (
                      <tr key={opportunity.id}>
                        <td>{opportunity.id}</td>
                        <td>{opportunity.title}</td>
                        <td>{opportunity.sector}</td>
                        <td>{getStatusBadge(opportunity.status)}</td>
                        <td>{opportunity.date}</td>
                        <td>
                          <Button variant="primary" size="sm" onClick={() => editOpportunity(opportunity)} style={{marginRight: '5px'}}>
                            تعديل
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => deleteOpportunity(opportunity.id)}>
                            حذف
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              <Button variant="info" onClick={() => {
                const element = document.getElementById('opportunities-table');
                if (element) {
                  html2canvas(element, { allowTaint: true, useCORS: true }).then((canvas: any) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const imgProps = pdf.getImageProperties(imgData);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (pdfWidth * imgProps.height) / imgProps.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save('الفرص.pdf');
                  }).catch(() => {
                    alert('فشل تحميل PDF. تأكد من أن جدول البيانات يحتوي على بيانات');
                  });
                } else {
                  alert('لا يوجد جدول بيانات');
                }
              }} className="mt-3 me-2">
                📥 تحميل PDF
              </Button>
            </div>
          )}

          {activeTab === 'lands' && (
            <div>
              <h3 className="mb-4 text-danger">طرح الأراضي الصناعية</h3>
              
              <Card className="mb-4 border-danger">
                <Card.Header as="h5" className="bg-danger text-white">{editingLand ? 'تعديل أرض' : 'إضافة أرض جديدة'}</Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>الموقع</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="أدخل موقع الأرض" 
                          value={newLand.location}
                          onChange={e => setNewLand({...newLand, location: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>المساحة</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="أدخل المساحة (متر مربع)" 
                          value={newLand.area}
                          onChange={e => setNewLand({...newLand, area: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>اسم الشركة</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="أدخل اسم الشركة" 
                          value={newLand.companyName}
                          onChange={e => setNewLand({...newLand, companyName: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>نوع النشاط</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="أدخل نوع النشاط" 
                          value={newLand.activityType}
                          onChange={e => setNewLand({...newLand, activityType: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>المنتج الرئيسي</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="أدخل المنتج الرئيسي" 
                          value={newLand.product}
                          onChange={e => setNewLand({...newLand, product: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>الحالة</Form.Label>
                        <Form.Select 
                          value={newLand.status}
                          onChange={e => setNewLand({...newLand, status: e.target.value})}
                        >
                          <option value="قيد التنفيذ">قيد التنفيذ</option>
                          <option value="مكتمل">مكتمل</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>التاريخ</Form.Label>
                        <Form.Control 
                          type="date" 
                          value={newLand.date}
                          onChange={e => setNewLand({...newLand, date: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <h6 className="mb-3 text-danger fw-bold">💰 نظام الدفعات المالية</h6>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>💵 إجمالي الاتعاب المتفق عليها</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="أدخل إجمالي الاتعاب" 
                          value={newLand.totalFees}
                          onChange={e => setNewLand({...newLand, totalFees: Number(e.target.value)})}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>📥 الدفعة الأولى</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="أدخل الدفعة الأولى" 
                          value={newLand.firstPayment}
                          onChange={e => setNewLand({...newLand, firstPayment: Number(e.target.value)})}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>📥 الدفعة الثانية</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="أدخل الدفعة الثانية" 
                          value={newLand.secondPayment}
                          onChange={e => setNewLand({...newLand, secondPayment: Number(e.target.value)})}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>📊 المبلغ المتبقي</Form.Label>
                        <Form.Control 
                          type="number" 
                          placeholder="المبلغ المتبقي" 
                          value={newLand.totalFees - (newLand.firstPayment + newLand.secondPayment)}
                          readOnly
                          style={{ backgroundColor: '#FFF3CD', borderColor: '#FFE5A6' }}
                          className="form-control-lg"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Card className="bg-success text-white mb-3">
                        <Card.Body>
                          <div className="text-center">
                            <h6 className="mb-2">✅ إجمالي المدفوع</h6>
                            <h4 className="mb-0">{(newLand.firstPayment + newLand.secondPayment).toLocaleString('ar-SA')} ج.م</h4>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card className="bg-primary text-white mb-3">
                        <Card.Body>
                          <div className="text-center">
                            <h6 className="mb-2">📊 نسبة السداد</h6>
                            <h4 className="mb-0">
                              {newLand.totalFees > 0 
                                ? ((((newLand.firstPayment + newLand.secondPayment) / newLand.totalFees) * 100).toFixed(2))
                                : '0'}%
                            </h4>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Button variant="danger" onClick={addLand}>
                    {editingLand ? 'تعديل' : 'إضافة'} أرض
                  </Button>
                </Card.Body>
              </Card>

              <h4 className="mb-3 text-danger">الأراضي المسجلة ({lands.length})</h4>
              {lands.length === 0 ? (
                <p className="text-muted">لا توجد أراضي مسجلة بعد</p>
              ) : (
                <Table striped bordered hover responsive id="lands-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>الموقع</th>
                      <th>المساحة</th>
                      <th>اسم الشركة</th>
                      <th>نوع النشاط</th>
                      <th>المنتج الرئيسي</th>
                      <th>الحالة</th>
                      <th>التاريخ</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lands.map(land => (
                      <tr key={land.id}>
                        <td>{land.id}</td>
                        <td>{land.location}</td>
                        <td>{land.area}</td>
                        <td>{land.companyName}</td>
                        <td>{land.activityType}</td>
                        <td>{land.product}</td>
                        <td>{getStatusBadge(land.status)}</td>
                        <td>{land.date}</td>
                        <td>
                          <Button variant="primary" size="sm" onClick={() => editLand(land)} style={{marginRight: '5px'}}>
                            تعديل
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => deleteLand(land.id)}>
                            حذف
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              <Button variant="danger" onClick={() => {
                const element = document.getElementById('lands-table');
                if (element) {
                  html2canvas(element, { allowTaint: true, useCORS: true }).then((canvas: any) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const imgProps = pdf.getImageProperties(imgData);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (pdfWidth * imgProps.height) / imgProps.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save('الأراضي.pdf');
                  }).catch(() => {
                    alert('فشل تحميل PDF. تأكد من أن جدول البيانات يحتوي على بيانات');
                  });
                } else {
                  alert('لا يوجد جدول بيانات');
                }
              }} className="mt-3 me-2">
                📥 تحميل PDF
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
