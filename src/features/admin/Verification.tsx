import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { Button } from '../shared/Button';
import { Badge } from '../shared/Badge';
import { Input } from '../shared/Input';
import { Modal } from '../shared/Modal';
import { Search, Eye, Check, X, Building2, AlertTriangle } from 'lucide-react';

const pendingVerifications = [
  {
    id: '1',
    companyName: 'TechCorp Solutions',
    contactPerson: 'Rajesh Kumar',
    email: 'rajesh@techcorp.com',
    phone: '+91 9876543210',
    website: 'https://techcorp.com',
    address: 'Sector 62, Noida, UP',
    gstNumber: '07AABCT1234C1Z5',
    documents: ['GST Certificate', 'Company Registration', 'PAN Card'],
    submittedDate: '2024-01-15',
    status: 'pending'
  },
  {
    id: '2',
    companyName: 'InnovateLabs Pvt Ltd',
    contactPerson: 'Priya Sharma',
    email: 'priya@innovatelabs.in',
    phone: '+91 8765432109',
    website: 'https://innovatelabs.in',
    address: 'Koramangala, Bangalore, KA',
    gstNumber: '29AABCI5678D1Z8',
    documents: ['GST Certificate', 'Company Registration'],
    submittedDate: '2024-01-12',
    status: 'pending'
  },
  {
    id: '3',
    companyName: 'StartupXYZ',
    contactPerson: 'Amit Patel',
    email: 'amit@startupxyz.com',
    phone: '+91 7654321098',
    website: 'https://startupxyz.com',
    address: 'Bandra, Mumbai, MH',
    gstNumber: '27AABCS9012E1Z3',
    documents: ['GST Certificate', 'Company Registration', 'PAN Card', 'Address Proof'],
    submittedDate: '2024-01-10',
    status: 'pending'
  }
];

export function Verification() {
  const [verifications, setVerifications] = useState(pendingVerifications);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const filteredVerifications = verifications.filter(company =>
    company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const approveCompany = (companyId: string) => {
    setVerifications(verifications.map(company =>
      company.id === companyId
        ? { ...company, status: 'approved', approvedDate: new Date().toISOString().split('T')[0] }
        : company
    ));
    setSelectedCompany(null);
  };

  const rejectCompany = () => {
    if (selectedCompany && rejectReason.trim()) {
      setVerifications(verifications.map(company =>
        company.id === selectedCompany.id
          ? { 
              ...company, 
              status: 'rejected', 
              rejectedDate: new Date().toISOString().split('T')[0],
              rejectReason: rejectReason
            }
          : company
      ));
      setRejectReason('');
      setShowRejectModal(false);
      setSelectedCompany(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🔍 Company Verification</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Review and verify industry partner registrations
        </p>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search companies by name, contact person, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Verification Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVerifications.map((company) => (
          <Card key={company.id} className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{company.companyName}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {company.contactPerson}
                    </p>
                  </div>
                </div>
                <Badge variant={getStatusColor(company.status)}>
                  {company.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Email: </span>
                    <span className="text-gray-900 dark:text-white">{company.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Phone: </span>
                    <span className="text-gray-900 dark:text-white">{company.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">GST: </span>
                    <span className="text-gray-900 dark:text-white">{company.gstNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Submitted: </span>
                    <span className="text-gray-900 dark:text-white">
                      {new Date(company.submittedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Documents Submitted:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {company.documents.map((doc) => (
                      <Badge key={doc} variant="secondary" className="text-xs">
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>

                {company.status === 'pending' && (
                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      onClick={() => setSelectedCompany(company)}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-1" /> Review
                    </Button>
                  </div>
                )}

                {company.status === 'rejected' && company.rejectReason && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800 dark:text-red-200">
                        Rejection Reason:
                      </span>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-300">{company.rejectReason}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Company Details Modal */}
      <Modal 
        isOpen={!!selectedCompany && !showRejectModal} 
        onClose={() => setSelectedCompany(null)}
        title={`Review ${selectedCompany?.companyName}`}
        size="lg"
      >
        {selectedCompany && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Company Name</label>
                <p className="text-gray-900 dark:text-white">{selectedCompany.companyName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Contact Person</label>
                <p className="text-gray-900 dark:text-white">{selectedCompany.contactPerson}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <p className="text-gray-900 dark:text-white">{selectedCompany.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                <p className="text-gray-900 dark:text-white">{selectedCompany.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Website</label>
                <a 
                  href={selectedCompany.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {selectedCompany.website}
                </a>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">GST Number</label>
                <p className="text-gray-900 dark:text-white">{selectedCompany.gstNumber}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
              <p className="text-gray-900 dark:text-white">{selectedCompany.address}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Documents Submitted
              </label>
              <div className="space-y-2">
                {selectedCompany.documents.map((doc: string) => (
                  <div key={doc} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-sm text-gray-900 dark:text-white">{doc}</span>
                    <Button size="sm" variant="outline">
                      View Document
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button 
                onClick={() => approveCompany(selectedCompany.id)}
                className="flex-1"
              >
                <Check className="h-4 w-4 mr-2" />
                Approve Company
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowRejectModal(true)}
                className="flex-1"
              >
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Reject Modal */}
      <Modal 
        isOpen={showRejectModal} 
        onClose={() => setShowRejectModal(false)}
        title="Reject Company"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Reason for Rejection
            </label>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Please provide a reason for rejection..."
              className="w-full min-h-[120px] rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <Button onClick={rejectCompany} variant="outline" className="flex-1">
              Confirm Rejection
            </Button>
            <Button 
              onClick={() => setShowRejectModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}