'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  LogOut,
  Upload,
  ImageIcon,
  Loader2,
  FileText,
  Briefcase,
  Edit2,
  Eye,
  EyeOff,
} from 'lucide-react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import GalleryManager from '@/components/admin/GalleryManager';

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

interface CareerApplication {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  positionType: 'Teaching' | 'Non-Teaching';
  positionApplying: string;
  qualification: string;
  experience: string;
  resumeFilename: string;
  resumeOriginalName: string;
  message: string | null;
  status: Status;
  submittedAt: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  author: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface SiteImageSlot {
  key: string;
  label: string;
  publicPath: string;
}

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  category: string;
  author: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

const statusColors: Record<Status, string> = {
  'New': 'bg-blue-100 text-blue-700 border-blue-200',
  'Called': 'bg-amber-100 text-amber-700 border-amber-200',
  'Visited': 'bg-purple-100 text-purple-700 border-purple-200',
  'Converted': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Not Converted': 'bg-rose-100 text-rose-700 border-rose-200',
};

const statusIcons: Record<Status, React.ElementType> = {
  'New': Clock,
  'Called': Phone,
  'Visited': MapPin,
  'Converted': UserPlus,
  'Not Converted': XCircle,
};

const tabLabels: Record<string, string> = {
  admissions: 'Admissions',
  contacts: 'Inquiries',
  careers: 'Careers',
  gallery: 'Gallery',
  blogs: 'Blogs',
  news: 'News',
  'site-images': 'Site Images',
};

export default function AdminDashboard() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [careers, setCareers] = useState<CareerApplication[]>([]);
  const [activeTab, setActiveTab] = useState<'admissions' | 'contacts' | 'gallery' | 'careers' | 'blogs' | 'news' | 'site-images'>('admissions');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Status | 'All'>('All');
  const router = useRouter();

  const [careersLoading, setCareersLoading] = useState(true);

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState('IGS Team');
  const [newPublished, setNewPublished] = useState(false);
  const [newCoverFile, setNewCoverFile] = useState<File | null>(null);
  const [blogSubmitting, setBlogSubmitting] = useState(false);

  const [siteImageSlots, setSiteImageSlots] = useState<SiteImageSlot[]>([]);
  const [siteImagesLoading, setSiteImagesLoading] = useState(false);
  const [siteImageUploading, setSiteImageUploading] = useState<string | null>(null);

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsExcerpt, setNewsExcerpt] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsAuthor, setNewsAuthor] = useState('IGS Team');
  const [newsCategory, setNewsCategory] = useState('news');
  const [newsPublished, setNewsPublished] = useState(false);
  const [newsCoverFile, setNewsCoverFile] = useState<File | null>(null);
  const [newsSubmitting, setNewsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
    fetchCareers();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        toast.success('Logged out');
        router.push('/login');
      }
    } catch {
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
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const fetchCareers = useCallback(async () => {
    try {
      setCareersLoading(true);
      const res = await fetch('/api/careers');
      if (res.ok) {
        const data = await res.json();
        setCareers(data);
      }
    } catch {
      toast.error('Failed to load career applications');
    } finally {
      setCareersLoading(false);
    }
  }, []);

  const fetchBlogs = useCallback(async () => {
    try {
      setBlogsLoading(true);
      const res = await fetch('/api/blogs?all=1');
      if (res.ok) {
        const data = await res.json();
        setBlogs(Array.isArray(data) ? data : []);
      }
    } catch {
      toast.error('Failed to load blog posts');
    } finally {
      setBlogsLoading(false);
    }
  }, []);

  const fetchSiteImages = useCallback(async () => {
    try {
      setSiteImagesLoading(true);
      const res = await fetch('/api/site-images');
      if (res.ok) {
        const data = await res.json();
        setSiteImageSlots(Array.isArray(data) ? data : []);
      }
    } catch {
      toast.error('Failed to load site image slots');
    } finally {
      setSiteImagesLoading(false);
    }
  }, []);

  const fetchNews = useCallback(async () => {
    try {
      setNewsLoading(true);
      const res = await fetch('/api/news?all=1');
      if (res.ok) {
        const data = await res.json();
        setNewsItems(Array.isArray(data) ? data : []);
      }
    } catch {
      toast.error('Failed to load news items');
    } finally {
      setNewsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'blogs' && blogs.length === 0) fetchBlogs();
    if (activeTab === 'news' && newsItems.length === 0) fetchNews();
    if (activeTab === 'site-images' && siteImageSlots.length === 0) fetchSiteImages();
  }, [activeTab]);

  const resetBlogForm = () => {
    setEditingBlog(null);
    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
    setNewAuthor('IGS Team');
    setNewPublished(false);
    setNewCoverFile(null);
  };

  const startEditBlog = (post: BlogPost) => {
    setEditingBlog(post);
    setNewTitle(post.title);
    setNewExcerpt(post.excerpt ?? '');
    setNewContent(post.content);
    setNewAuthor(post.author);
    setNewPublished(post.published);
    setNewCoverFile(null);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const createBlog = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      toast.error('Title and content are required');
      return;
    }
    try {
      setBlogSubmitting(true);
      const form = new FormData();
      form.append('title', newTitle.trim());
      form.append('content', newContent.trim());
      form.append('excerpt', newExcerpt.trim());
      form.append('author', newAuthor.trim() || 'IGS Team');
      form.append('published', String(newPublished));
      if (newCoverFile) form.append('file', newCoverFile);

      const res = await fetch('/api/blogs', { method: 'POST', body: form });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Failed to create');
      }
      toast.success('Blog post created');
      resetBlogForm();
      fetchBlogs();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create blog post');
    } finally {
      setBlogSubmitting(false);
    }
  };

  const updateBlog = async () => {
    if (!editingBlog) return;
    if (!newTitle.trim() || !newContent.trim()) {
      toast.error('Title and content are required');
      return;
    }
    try {
      setBlogSubmitting(true);
      const form = new FormData();
      form.append('id', String(editingBlog.id));
      form.append('title', newTitle.trim());
      form.append('content', newContent.trim());
      form.append('excerpt', newExcerpt.trim());
      form.append('author', newAuthor.trim() || 'IGS Team');
      form.append('published', String(newPublished));
      if (newCoverFile) form.append('file', newCoverFile);

      const res = await fetch('/api/blogs', { method: 'PATCH', body: form });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Failed to update');
      }
      toast.success('Blog post updated');
      resetBlogForm();
      fetchBlogs();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update blog post');
    } finally {
      setBlogSubmitting(false);
    }
  };

  const deleteBlog = async (id: number) => {
    if (!confirm('Delete this blog post? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
        toast.success('Blog post deleted');
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Failed to delete blog post');
    }
  };

  const togglePublished = async (post: BlogPost) => {
    try {
      const form = new FormData();
      form.append('id', String(post.id));
      form.append('published', String(!post.published));
      const res = await fetch('/api/blogs', { method: 'PATCH', body: form });
      if (res.ok) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === post.id ? { ...b, published: !post.published } : b)),
        );
        toast.success(post.published ? 'Post unpublished' : 'Post published');
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Failed to toggle publish status');
    }
  };

  const resetNewsForm = () => {
    setEditingNews(null);
    setNewsTitle('');
    setNewsExcerpt('');
    setNewsContent('');
    setNewsAuthor('IGS Team');
    setNewsCategory('news');
    setNewsPublished(false);
    setNewsCoverFile(null);
  };

  const startEditNews = (item: NewsItem) => {
    setEditingNews(item);
    setNewsTitle(item.title);
    setNewsExcerpt(item.excerpt ?? '');
    setNewsContent(item.content);
    setNewsAuthor(item.author);
    setNewsCategory(item.category ?? 'news');
    setNewsPublished(item.published);
    setNewsCoverFile(null);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const createNews = async () => {
    if (!newsTitle.trim() || !newsContent.trim()) { toast.error('Title and content are required'); return; }
    try {
      setNewsSubmitting(true);
      const form = new FormData();
      form.append('title', newsTitle.trim());
      form.append('content', newsContent.trim());
      form.append('excerpt', newsExcerpt.trim());
      form.append('author', newsAuthor.trim() || 'IGS Team');
      form.append('category', newsCategory);
      form.append('published', String(newsPublished));
      if (newsCoverFile) form.append('file', newsCoverFile);
      const res = await fetch('/api/news', { method: 'POST', body: form });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error ?? 'Failed'); }
      toast.success('News item created');
      resetNewsForm();
      fetchNews();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create');
    } finally {
      setNewsSubmitting(false);
    }
  };

  const updateNews = async () => {
    if (!editingNews) return;
    if (!newsTitle.trim() || !newsContent.trim()) { toast.error('Title and content are required'); return; }
    try {
      setNewsSubmitting(true);
      const form = new FormData();
      form.append('id', String(editingNews.id));
      form.append('title', newsTitle.trim());
      form.append('content', newsContent.trim());
      form.append('excerpt', newsExcerpt.trim());
      form.append('author', newsAuthor.trim() || 'IGS Team');
      form.append('category', newsCategory);
      form.append('published', String(newsPublished));
      if (newsCoverFile) form.append('file', newsCoverFile);
      const res = await fetch('/api/news', { method: 'PATCH', body: form });
      if (!res.ok) { const err = await res.json(); throw new Error(err.error ?? 'Failed'); }
      toast.success('News item updated');
      resetNewsForm();
      fetchNews();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setNewsSubmitting(false);
    }
  };

  const deleteNews = async (id: number) => {
    if (!confirm('Delete this news item?')) return;
    try {
      const res = await fetch(`/api/news?id=${id}`, { method: 'DELETE' });
      if (res.ok) { setNewsItems((prev) => prev.filter((n) => n.id !== id)); toast.success('Deleted'); }
      else throw new Error();
    } catch { toast.error('Failed to delete'); }
  };

  const toggleNewsPublished = async (item: NewsItem) => {
    try {
      const form = new FormData();
      form.append('id', String(item.id));
      form.append('published', String(!item.published));
      const res = await fetch('/api/news', { method: 'PATCH', body: form });
      if (res.ok) {
        setNewsItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, published: !item.published } : n)));
        toast.success(item.published ? 'Unpublished' : 'Published');
      } else throw new Error();
    } catch { toast.error('Failed to toggle'); }
  };

  const uploadSiteImage = async (slot: string, file: File) => {
    try {
      setSiteImageUploading(slot);
      const form = new FormData();
      form.append('slot', slot);
      form.append('file', file);
      const res = await fetch('/api/site-images', { method: 'POST', body: form });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Failed to upload');
      }
      toast.success('Image updated successfully');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setSiteImageUploading(null);
    }
  };

  const updateCareerStatus = async (id: number, newStatus: Status) => {
    try {
      const res = await fetch('/api/careers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setCareers(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
        toast.success(`Status updated to ${newStatus}`);
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Failed to update status');
    }
  };

  const deleteCareer = async (id: number) => {
    if (!confirm('Delete this application? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/careers?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCareers(prev => prev.filter(c => c.id !== id));
        toast.success('Application deleted');
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Failed to delete application');
    }
  };

  const updateStatus = async (type: 'admissions' | 'contact', id: number, newStatus: Status) => {
    try {
      const res = await fetch(`/api/${type}`, {
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
    } catch {
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
    } catch {
      toast.error('Failed to delete record');
    }
  };

  const exportToCSV = (data: Record<string, unknown>[], filename: string) => {
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
  const filteredCareers = filter === 'All' ? careers : careers.filter(c => c.status === filter);

  const StatusBadge = ({ status }: { status: Status }) => {
    const Icon = statusIcons[status];
    return (
      <Badge variant="outline" className={`${statusColors[status]} flex items-center gap-1 font-medium px-2 py-0.5`}>
        <Icon size={12} />
        {status}
      </Badge>
    );
  };

  const noFilterTabs = ['gallery', 'blogs', 'news', 'site-images'];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white border-b border-border/60 sticky top-0 z-40 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/" className="p-2 hover:bg-muted rounded-full transition-all hover:scale-105">
              <ArrowLeft size={20} className="text-primary" />
            </Link>
            <div>
              <h1 className="text-lg md:text-xl font-serif font-bold text-primary">Admin Dashboard</h1>
              <p className="text-[10px] md:text-xs text-muted-foreground font-medium">Indo Global School Management</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            {!noFilterTabs.includes(activeTab) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportToCSV(
                  (activeTab === 'admissions' ? admissions : activeTab === 'careers' ? careers : contacts) as unknown as Record<string, unknown>[],
                  `${activeTab}.csv`
                )}
                className="hidden md:flex items-center gap-2 border-primary/20 hover:bg-primary/5 text-primary"
              >
                <Download size={16} />
                Export
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2 md:gap-4 text-rose-600 hover:bg-rose-50 hover:text-rose-700 font-bold px-3 md:px-4"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <Card className="p-3 md:p-4 border-none shadow-sm bg-white">
            <p className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Admissions</p>
            <p className="text-xl md:text-2xl font-bold text-primary">{admissions.length}</p>
          </Card>
          <Card className="p-3 md:p-4 border-none shadow-sm bg-white">
            <p className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Inquiries</p>
            <p className="text-xl md:text-2xl font-bold text-secondary">{contacts.length}</p>
          </Card>
          <Card className="p-3 md:p-4 border-none shadow-sm bg-white">
            <p className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Converted</p>
            <p className="text-xl md:text-2xl font-bold text-emerald-600">
              {admissions.filter(a => a.status === 'Converted').length + contacts.filter(c => c.status === 'Converted').length}
            </p>
          </Card>
          <Card className="p-3 md:p-4 border-none shadow-sm bg-white">
            <p className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Careers</p>
            <p className="text-xl md:text-2xl font-bold text-blue-600">{careers.length}</p>
          </Card>
        </div>

        {/* Tabs & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-border/40 w-fit overflow-x-auto">
            {(['admissions', 'contacts', 'careers', 'gallery', 'blogs', 'news', 'site-images'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setFilter('All'); }}
                className={`px-3 md:px-5 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-primary text-white shadow-md'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </div>

          {!noFilterTabs.includes(activeTab) && (
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-muted-foreground" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as Status | 'All')}
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
          )}
        </div>

        {/* ========= CONTENT AREA ========= */}
        {activeTab === 'gallery' && <GalleryManager />}

        {/* ========= ADMISSIONS TAB ========= */}
        {activeTab === 'admissions' && (
          loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground font-medium animate-pulse">Fetching records...</p>
            </div>
          ) : (
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
                          <th className="text-left py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Parent/Student</th>
                          <th className="text-left py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Contact</th>
                          <th className="text-left py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Alt Contact</th>
                          <th className="text-left py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Class</th>
                          <th className="text-left py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                          <th className="text-right py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {filteredAdmissions.map((admission) => (
                          <tr key={admission.id} className="hover:bg-muted/10 transition-colors group">
                            <td className="py-4 px-4 md:px-6">
                              <div className="font-bold text-primary text-sm">{admission.parentName}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                <Clock size={10} />
                                DOB: {admission.studentDOB}
                              </div>
                            </td>
                            <td className="py-4 px-4 md:px-6">
                              <div className="text-sm font-semibold">{admission.phone}</div>
                              <div className="text-xs text-muted-foreground">{admission.email || 'No email'}</div>
                            </td>
                            <td className="py-4 px-4 md:px-6 hidden lg:table-cell">
                              <div className="text-sm text-muted-foreground">{admission.altPhone || '-'}</div>
                            </td>
                            <td className="py-4 px-4 md:px-6">
                              <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 text-xs">
                                {admission.classApplying}
                              </Badge>
                              <div className="text-[10px] text-muted-foreground mt-1">
                                {format(new Date(admission.submittedAt), 'MMM dd, yyyy')}
                              </div>
                            </td>
                            <td className="py-4 px-4 md:px-6">
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
                            <td className="py-4 px-4 md:px-6 text-right">
                              <button
                                onClick={() => deleteRecord('admissions', admission.id)}
                                className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )
        )}

        {/* ========= CONTACTS TAB ========= */}
        {activeTab === 'contacts' && (
          loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground font-medium animate-pulse">Fetching records...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredContacts.length === 0 ? (
                <Card className="col-span-full p-12 text-center bg-white border-dashed border-2 border-border/60">
                  <p className="text-muted-foreground">No inquiries found matching the filter</p>
                </Card>
              ) : (
                filteredContacts.map((contact) => (
                  <Card key={contact.id} className="p-5 md:p-6 bg-white border-none shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-1.5 h-full bg-primary/20 group-hover:bg-primary transition-colors" />

                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                          {contact.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-primary text-sm">{contact.name}</h3>
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

                    <div className="bg-[#F1F5F9] p-3 md:p-4 rounded-xl mb-4">
                      <div className="text-xs font-bold text-muted-foreground uppercase mb-1 flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-primary" />
                        {contact.subject}
                      </div>
                      <p className="text-sm text-foreground leading-relaxed italic">&ldquo;{contact.message}&rdquo;</p>
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
          )
        )}

        {/* ========= CAREERS TAB ========= */}
        {activeTab === 'careers' && (
          careersLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground font-medium animate-pulse">Fetching applications...</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredCareers.length === 0 ? (
                <Card className="p-12 text-center bg-white border-dashed border-2 border-border/60">
                  <Briefcase className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">No career applications found</p>
                </Card>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-border/40 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/30 border-b border-border/40">
                          <th className="text-left py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Applicant</th>
                          <th className="text-left py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground hidden md:table-cell">Position</th>
                          <th className="text-left py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Qualification</th>
                          <th className="text-left py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Resume</th>
                          <th className="text-left py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                          <th className="text-right py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {filteredCareers.map((app) => (
                          <tr key={app.id} className="hover:bg-muted/10 transition-colors group">
                            <td className="py-4 px-4 md:px-6">
                              <div className="font-bold text-primary text-sm">{app.fullName}</div>
                              <div className="text-xs text-muted-foreground">{app.email}</div>
                              <div className="text-xs text-muted-foreground">{app.phone}</div>
                              <div className="md:hidden mt-1">
                                <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 text-[10px]">
                                  {app.positionType} — {app.positionApplying}
                                </Badge>
                              </div>
                            </td>
                            <td className="py-4 px-4 md:px-6 hidden md:table-cell">
                              <Badge variant="secondary" className={`text-xs mb-1 ${app.positionType === 'Teaching' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'}`}>
                                {app.positionType}
                              </Badge>
                              <div className="text-sm font-medium text-foreground">{app.positionApplying}</div>
                              <div className="text-[10px] text-muted-foreground mt-0.5">{app.experience}</div>
                            </td>
                            <td className="py-4 px-4 md:px-6 hidden lg:table-cell">
                              <div className="text-sm text-foreground">{app.qualification}</div>
                              {app.message && (
                                <p className="text-xs text-muted-foreground mt-1 max-w-[200px] truncate" title={app.message}>
                                  {app.message}
                                </p>
                              )}
                            </td>
                            <td className="py-4 px-4 md:px-6">
                              <a
                                href={`/api/careers/resume?filename=${encodeURIComponent(app.resumeFilename)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                              >
                                <FileText size={14} />
                                <span className="hidden sm:inline">{app.resumeOriginalName.length > 15 ? app.resumeOriginalName.slice(0, 15) + '...' : app.resumeOriginalName}</span>
                                <span className="sm:hidden">View</span>
                              </a>
                              <div className="text-[10px] text-muted-foreground mt-1">
                                {format(new Date(app.submittedAt), 'MMM dd, yyyy')}
                              </div>
                            </td>
                            <td className="py-4 px-4 md:px-6">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="hover:opacity-80 transition-opacity">
                                    <StatusBadge status={app.status} />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-48 p-1">
                                  {(['New', 'Called', 'Visited', 'Converted', 'Not Converted'] as Status[]).map((s) => (
                                    <DropdownMenuItem
                                      key={s}
                                      onClick={() => updateCareerStatus(app.id, s)}
                                      className="flex items-center gap-2 py-2 px-3 cursor-pointer"
                                    >
                                      <div className={`w-2 h-2 rounded-full ${statusColors[s].split(' ')[0]}`} />
                                      {s}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                            <td className="py-4 px-4 md:px-6 text-right">
                              <button
                                onClick={() => deleteCareer(app.id)}
                                className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )
        )}

        {/* ========= BLOGS TAB ========= */}
        {activeTab === 'blogs' && (
          <div className="grid gap-6">
            {blogsLoading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-muted-foreground font-medium animate-pulse">Fetching posts...</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-border/40 overflow-hidden">
                {blogs.length === 0 ? (
                  <div className="p-12 text-center">
                    <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">No blog posts yet. Create one below.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/30 border-b border-border/40">
                          <th className="text-left py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Title</th>
                          <th className="text-left py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground hidden md:table-cell">Author</th>
                          <th className="text-left py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                          <th className="text-left py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Date</th>
                          <th className="text-right py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {blogs.map((post) => (
                          <tr key={post.id} className="hover:bg-muted/10 transition-colors group">
                            <td className="py-4 px-4 md:px-6">
                              <div className="font-bold text-primary text-sm">{post.title}</div>
                              <div className="text-xs text-muted-foreground mt-0.5 font-mono">/blogs/{post.slug}</div>
                            </td>
                            <td className="py-4 px-4 md:px-6 hidden md:table-cell">
                              <div className="text-sm text-foreground">{post.author}</div>
                            </td>
                            <td className="py-4 px-4 md:px-6">
                              <button
                                onClick={() => togglePublished(post)}
                                className="flex items-center gap-1.5"
                                title={post.published ? 'Click to unpublish' : 'Click to publish'}
                              >
                                {post.published ? (
                                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 border flex items-center gap-1 hover:bg-emerald-200 transition-colors">
                                    <Eye size={11} />
                                    Published
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1 hover:bg-amber-100 transition-colors">
                                    <EyeOff size={11} />
                                    Draft
                                  </Badge>
                                )}
                              </button>
                            </td>
                            <td className="py-4 px-4 md:px-6 hidden lg:table-cell">
                              <div className="text-xs text-muted-foreground">
                                {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                              </div>
                            </td>
                            <td className="py-4 px-4 md:px-6 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                <button
                                  onClick={() => startEditBlog(post)}
                                  className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                                  title="Edit"
                                >
                                  <Edit2 size={15} />
                                </button>
                                <button
                                  onClick={() => deleteBlog(post.id)}
                                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                  title="Delete"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Blog Form */}
            <Card className="p-6 bg-white border-none shadow-sm">
              <h3 className="font-serif font-bold text-lg text-primary mb-5">
                {editingBlog ? `Editing: ${editingBlog.title}` : 'Create New Post'}
              </h3>
              <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title *</label>
                    <Input
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Post title"
                      className="bg-[#F8FAFC]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Author</label>
                    <Input
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="IGS Team"
                      className="bg-[#F8FAFC]"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Excerpt</label>
                  <textarea
                    value={newExcerpt}
                    onChange={(e) => setNewExcerpt(e.target.value)}
                    placeholder="Short summary shown on blog listing..."
                    rows={2}
                    className="w-full rounded-lg border border-input bg-[#F8FAFC] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content *</label>
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Full post content. Separate paragraphs with a blank line..."
                    rows={10}
                    className="w-full rounded-lg border border-input bg-[#F8FAFC] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-y"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="space-y-1.5 flex-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cover Image</label>
                    <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border border-dashed border-border/70 hover:border-primary/40 transition-colors bg-[#F8FAFC] w-fit">
                      <Upload size={14} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {newCoverFile ? newCoverFile.name : 'Choose image...'}
                      </span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        className="hidden"
                        onChange={(e) => setNewCoverFile(e.target.files?.[0] ?? null)}
                      />
                    </label>
                  </div>
                  <div className="flex items-center gap-2.5 pt-5">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={newPublished}
                      onClick={() => setNewPublished(!newPublished)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                        newPublished ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                          newPublished ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className="text-sm font-medium text-foreground">
                      {newPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={editingBlog ? updateBlog : createBlog}
                    disabled={blogSubmitting}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    {blogSubmitting ? (
                      <Loader2 size={14} className="animate-spin mr-2" />
                    ) : null}
                    {editingBlog ? 'Update Post' : 'Create Post'}
                  </Button>
                  {editingBlog && (
                    <Button
                      variant="outline"
                      onClick={resetBlogForm}
                      disabled={blogSubmitting}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ========= NEWS TAB ========= */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            {newsLoading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-muted-foreground font-medium animate-pulse">Loading news items...</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-border/40 overflow-hidden">
                {newsItems.length === 0 ? (
                  <div className="p-12 text-center">
                    <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">No news items yet. Create one below.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/30 border-b border-border/40">
                          <th className="text-left py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Title</th>
                          <th className="text-left py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground hidden md:table-cell">Category</th>
                          <th className="text-left py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                          <th className="text-left py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Date</th>
                          <th className="text-right py-4 px-4 md:px-6 font-bold text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {newsItems.map((item) => (
                          <tr key={item.id} className="hover:bg-muted/10 transition-colors group">
                            <td className="py-4 px-4 md:px-6">
                              <div className="font-bold text-primary text-sm">{item.title}</div>
                              <div className="text-xs text-muted-foreground mt-0.5 font-mono">/newsie/{item.slug}</div>
                            </td>
                            <td className="py-4 px-4 md:px-6 hidden md:table-cell">
                              <Badge variant="outline" className="text-xs capitalize">{item.category}</Badge>
                            </td>
                            <td className="py-4 px-4 md:px-6">
                              <button onClick={() => toggleNewsPublished(item)} title={item.published ? 'Click to unpublish' : 'Click to publish'} className="flex items-center gap-1.5">
                                {item.published ? (
                                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 border flex items-center gap-1 hover:bg-emerald-200 transition-colors">
                                    <Eye size={11} />Published
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1 hover:bg-amber-100 transition-colors">
                                    <EyeOff size={11} />Draft
                                  </Badge>
                                )}
                              </button>
                            </td>
                            <td className="py-4 px-4 md:px-6 hidden lg:table-cell">
                              <div className="text-xs text-muted-foreground">{format(new Date(item.createdAt), 'MMM dd, yyyy')}</div>
                            </td>
                            <td className="py-4 px-4 md:px-6 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                <button onClick={() => startEditNews(item)} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all" title="Edit">
                                  <Edit2 size={15} />
                                </button>
                                <button onClick={() => deleteNews(item.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="Delete">
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* News Form */}
            <Card className="p-6 bg-white border-none shadow-sm">
              <h3 className="font-serif font-bold text-lg text-primary mb-5">
                {editingNews ? `Editing: ${editingNews.title}` : 'Create News Item'}
              </h3>
              <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title *</label>
                    <Input value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} placeholder="News title" className="bg-[#F8FAFC]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Author</label>
                    <Input value={newsAuthor} onChange={(e) => setNewsAuthor(e.target.value)} placeholder="IGS Team" className="bg-[#F8FAFC]" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</label>
                  <select value={newsCategory} onChange={(e) => setNewsCategory(e.target.value)} className="w-full rounded-lg border border-input bg-[#F8FAFC] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="news">School News</option>
                    <option value="announcement">Announcement</option>
                    <option value="achievement">Achievement</option>
                    <option value="event">School Event</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Excerpt</label>
                  <textarea value={newsExcerpt} onChange={(e) => setNewsExcerpt(e.target.value)} placeholder="Short summary..." rows={2} className="w-full rounded-lg border border-input bg-[#F8FAFC] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content *</label>
                  <textarea value={newsContent} onChange={(e) => setNewsContent(e.target.value)} placeholder="Full content. Separate paragraphs with a blank line..." rows={10} className="w-full rounded-lg border border-input bg-[#F8FAFC] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 resize-y" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="space-y-1.5 flex-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cover Image</label>
                    <label className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border border-dashed border-border/70 hover:border-primary/40 transition-colors bg-[#F8FAFC] w-fit">
                      <Upload size={14} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{newsCoverFile ? newsCoverFile.name : 'Choose image...'}</span>
                      <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={(e) => setNewsCoverFile(e.target.files?.[0] ?? null)} />
                    </label>
                  </div>
                  <div className="flex items-center gap-2.5 pt-5">
                    <button type="button" role="switch" aria-checked={newsPublished} onClick={() => setNewsPublished(!newsPublished)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${newsPublished ? 'bg-primary' : 'bg-muted'}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${newsPublished ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                    <span className="text-sm font-medium text-foreground">{newsPublished ? 'Published' : 'Draft'}</span>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button onClick={editingNews ? updateNews : createNews} disabled={newsSubmitting} className="bg-primary hover:bg-primary/90 text-white">
                    {newsSubmitting ? <Loader2 size={14} className="animate-spin mr-2" /> : null}
                    {editingNews ? 'Update Item' : 'Create Item'}
                  </Button>
                  {editingNews && (
                    <Button variant="outline" onClick={resetNewsForm} disabled={newsSubmitting}>Cancel</Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ========= SITE IMAGES TAB ========= */}
        {activeTab === 'site-images' && (
          siteImagesLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground font-medium animate-pulse">Loading image slots...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {siteImageSlots.map((slot) => (
                <Card key={slot.key} className="overflow-hidden bg-white border-none shadow-sm">
                  <div className="h-44 overflow-hidden bg-muted relative">
                    <img
                      src={`/${slot.publicPath}`}
                      alt={slot.label}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <ImageIcon className="w-10 h-10 text-muted-foreground/20" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-sm text-foreground mb-1">{slot.label}</h4>
                    <p className="text-[11px] text-muted-foreground font-mono mb-3 truncate">{slot.publicPath}</p>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-primary/30 text-primary hover:bg-primary/5 pointer-events-none"
                        disabled={siteImageUploading === slot.key}
                      >
                        <span>
                          {siteImageUploading === slot.key ? (
                            <Loader2 size={13} className="animate-spin mr-1.5" />
                          ) : (
                            <Upload size={13} className="mr-1.5" />
                          )}
                          Replace
                        </span>
                      </Button>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        className="hidden"
                        disabled={siteImageUploading !== null}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadSiteImage(slot.key, file);
                          e.target.value = '';
                        }}
                      />
                    </label>
                  </div>
                </Card>
              ))}
            </div>
          )
        )}
      </main>
    </div>
  );
}
