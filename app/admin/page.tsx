'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Download, 
  Trash2, 
  CheckCircle2, 
  Phone, 
  MapPin, 
  UserPlus, 
  XCircle,
  Clock,
  Filter,
  MoreVertical,
  LogOut
} from 'lucide-react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

type Status = 'New' | 'Called' | 'Visited' | 'Converted' | 'Not Converted';

interface Admission {
  id: number;
  parentName: string;
  studentDOB: string;
  phone: string;
  altPhone: string | null;
  classApplying: string;
  email: string | null;
  status: Status;
  submittedAt: string;
}

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: Status;
  submittedAt: string;
}

const statusColors: Record<Status, string> = {
  'New': 'bg-blue-100 text-blue-700 border-blue-200',
  'Called': 'bg-amber-100 text-amber-700 border-amber-200',
  'Visited': 'bg-purple-100 text-purple-700 border-purple-200',
  'Converted': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Not Converted': 'bg-rose-100 text-rose-700 border-rose-200',
};

const statusIcons: Record<Status, any> = {
  'New': Clock,
  'Called': Phone,
  'Visited': MapPin,
  'Converted': UserPlus,
  'Not Converted': XCircle,
};

export default function AdminDashboard() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeTab, setActiveTab] = useState<'admissions' | 'contacts'>('admissions');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Status | 'All'>('All');
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        toast.success('Logged out');
        router.push('/login');
      }
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [admissionsRes, contactsRes] = await Promise.all([
        fetch('/api/admissions'),
        fetch('/api/contact'),
      ]);

      if (admissionsRes.ok) {
        const data = await admissionsRes.json();
        setAdmissions(data);
      }

      if (contactsRes.ok) {
        const data = await contactsRes.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (type: 'admissions' | 'contact', id: number, newStatus: Status) => {
    try {
      const endpoint = `/api/${type}`;
      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        if (type === 'admissions') {
          setAdmissions(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
        } else {
          setContacts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
        }
        toast.success(`Status updated to ${newStatus}`);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deleteRecord = async (type: 'admissions' | 'contact', id: number) => {
    if (!confirm('Are you sure you want to delete this record? This action cannot be undone.')) return;
    
    try {
      const res = await fetch(`/api/${type}?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (type === 'admissions') {
          setAdmissions(prev => prev.filter(a => a.id !== id));
        } else {
          setContacts(prev => prev.filter(c => c.id !== id));
        }
        toast.success('Record deleted');
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error('Failed to delete record');
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => 
      Object.values(row).map(val => `"${val}"`).join(',')
    ).join('\n');
    
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredAdmissions = filter === 'All' ? admissions : admissions.filter(a => a.status === filter);
  const filteredContacts = filter === 'All' ? contacts : contacts.filter(c => c.status === filter);

  const StatusBadge = ({ status }: { status: Status }) => {
    const Icon = statusIcons[status];
    return (
      <Badge variant="outline" className={`${statusColors[status]} flex items-center gap-1 font-medium px-2 py-0.5`}>
        <Icon size={12} />
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white border-b border-border/60 sticky top-0 z-40 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-muted rounded-full transition-all hover:scale-105">
              <ArrowLeft size={20} className="text-primary" />
            </Link>
            <div>
              <h1 className="text-xl font-serif font-bold text-primary">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground font-medium">Indo Global School Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportToCSV(activeTab === 'admissions' ? admissions : contacts, `${activeTab}.csv`)}
              className="hidden md:flex items-center gap-2 border-primary/20 hover:bg-primary/5 text-primary"
            >
              <Download size={16} />
              Export {activeTab}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-4 text-rose-600 hover:bg-rose-50 hover:text-rose-700 font-bold px-4"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 border-none shadow-sm bg-white">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Admissions</p>
            <p className="text-2xl font-bold text-primary">{admissions.length}</p>
          </Card>
          <Card className="p-4 border-none shadow-sm bg-white">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Inquiries</p>
            <p className="text-2xl font-bold text-secondary">{contacts.length}</p>
          </Card>
          <Card className="p-4 border-none shadow-sm bg-white">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Converted</p>
            <p className="text-2xl font-bold text-emerald-600">
              {admissions.filter(a => a.status === 'Converted').length + contacts.filter(c => c.status === 'Converted').length}
            </p>
          </Card>
          <Card className="p-4 border-none shadow-sm bg-white">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">New Today</p>
            <p className="text-2xl font-bold text-blue-600">
              {[...admissions, ...contacts].filter(r => 
                format(new Date(r.submittedAt), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
              ).length}
            </p>
          </Card>
        </div>

        {/* Filters & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-border/40 w-fit">
            <button
              onClick={() => setActiveTab('admissions')}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'admissions'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Admissions
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'contacts'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Inquiries
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-muted-foreground" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="bg-white border border-border/60 rounded-lg px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Called">Called</option>
              <option value="Visited">Visited</option>
              <option value="Converted">Converted</option>
              <option value="Not Converted">Not Converted</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-muted-foreground font-medium animate-pulse">Fetching records...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeTab === 'admissions' ? (
              <div className="grid gap-4">
                {filteredAdmissions.length === 0 ? (
                  <Card className="p-12 text-center bg-white border-dashed border-2 border-border/60">
                    <p className="text-muted-foreground">No records found matching the filter</p>
                  </Card>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-border/40 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/30 border-b border-border/40">
                            <th className="text-left py-4 px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Parent/Student</th>
                            <th className="text-left py-4 px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Contact</th>
                            <th className="text-left py-4 px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Alt Contact</th>
                            <th className="text-left py-4 px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Class Info</th>
                            <th className="text-left py-4 px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                            <th className="text-right py-4 px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                          {filteredAdmissions.map((admission) => (
                            <tr key={admission.id} className="hover:bg-muted/10 transition-colors group">
                              <td className="py-4 px-6">
                                <div className="font-bold text-primary">{admission.parentName}</div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                  <Clock size={10} />
                                  DOB: {admission.studentDOB}
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <div className="text-sm font-semibold">{admission.phone}</div>
                                <div className="text-xs text-muted-foreground">{admission.email || 'No email provided'}</div>
                              </td>
                              <td className="py-4 px-6">
                                <div className="text-sm font-semibold text-muted-foreground">{admission.altPhone || '-'}</div>
                              </td>
                              <td className="py-4 px-6">
                                <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10">
                                  Class: {admission.classApplying}
                                </Badge>
                                <div className="text-[10px] text-muted-foreground mt-1">
                                  {format(new Date(admission.submittedAt), 'MMM dd, yyyy HH:mm')}
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <button className="hover:opacity-80 transition-opacity">
                                      <StatusBadge status={admission.status} />
                                    </button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="start" className="w-48 p-1">
                                    {(['New', 'Called', 'Visited', 'Converted', 'Not Converted'] as Status[]).map((s) => (
                                      <DropdownMenuItem 
                                        key={s} 
                                        onClick={() => updateStatus('admissions', admission.id, s)}
                                        className="flex items-center gap-2 py-2 px-3 cursor-pointer"
                                      >
                                        <div className={`w-2 h-2 rounded-full ${statusColors[s].split(' ')[0]}`} />
                                        {s}
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                              <td className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => deleteRecord('admissions', admission.id)}
                                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                    title="Delete Record"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredContacts.length === 0 ? (
                  <Card className="col-span-full p-12 text-center bg-white border-dashed border-2 border-border/60">
                    <p className="text-muted-foreground">No inquiries found matching the filter</p>
                  </Card>
                ) : (
                  filteredContacts.map((contact) => (
                    <Card key={contact.id} className="p-6 bg-white border-none shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                      <div className="absolute top-0 right-0 w-1.5 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                      
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {contact.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-bold text-primary">{contact.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{contact.email}</span>
                              {contact.phone && <span>• {contact.phone}</span>}
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 hover:bg-muted rounded-md transition-colors">
                              <MoreVertical size={16} className="text-muted-foreground" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              className="text-rose-600 focus:text-rose-600 cursor-pointer"
                              onClick={() => deleteRecord('contact', contact.id)}
                            >
                              <Trash2 size={14} className="mr-2" />
                              Delete inquiry
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="bg-[#F1F5F9] p-4 rounded-xl mb-4 relative">
                        <div className="text-xs font-bold text-muted-foreground uppercase mb-1 flex items-center gap-2">
                          <CheckCircle2 size={12} className="text-primary" />
                          {contact.subject}
                        </div>
                        <p className="text-sm text-foreground leading-relaxed italic">"{contact.message}"</p>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-2">
                        <div className="text-[10px] text-muted-foreground font-medium">
                          {format(new Date(contact.submittedAt), 'MMM dd, yyyy HH:mm')}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="hover:opacity-80 transition-opacity">
                              <StatusBadge status={contact.status} />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 p-1">
                            {(['New', 'Called', 'Visited', 'Converted', 'Not Converted'] as Status[]).map((s) => (
                              <DropdownMenuItem 
                                key={s} 
                                onClick={() => updateStatus('contact', contact.id, s)}
                                className="flex items-center gap-2 py-2 px-3 cursor-pointer"
                              >
                                <div className={`w-2 h-2 rounded-full ${statusColors[s].split(' ')[0]}`} />
                                {s}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
