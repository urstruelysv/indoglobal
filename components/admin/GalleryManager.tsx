'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Trash2, Upload, Eye, EyeOff, Pencil, Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  imageData: string;
  displayOrder: number;
  active: boolean;
  createdAt: string;
}

const MAX_UPLOAD_BYTES = 2_500_000;
const TARGET_MAX_DIMENSION = 1600; // resize longest side if larger

// Client-side resize + re-encode to keep payload sane.
async function fileToResizedDataUrl(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  // If already tiny, skip resize
  if (dataUrl.length < 600_000) return dataUrl;

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = document.createElement('img');
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error('Failed to decode image'));
    el.src = dataUrl;
  });

  const longest = Math.max(img.width, img.height);
  const scale = longest > TARGET_MAX_DIMENSION ? TARGET_MAX_DIMENSION / longest : 1;
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');
  ctx.drawImage(img, 0, 0, w, h);

  // Try decreasing quality until under limit
  let quality = 0.85;
  let out = canvas.toDataURL('image/jpeg', quality);
  while (out.length > MAX_UPLOAD_BYTES && quality > 0.4) {
    quality -= 0.1;
    out = canvas.toDataURL('image/jpeg', quality);
  }
  return out;
}

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Upload form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);

  // Inline edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editOrder, setEditOrder] = useState<number>(0);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/gallery?all=1', { cache: 'no-store' });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setImages(data);
    } catch {
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !category) {
      toast.error('Title, category, and image file are required');
      return;
    }
    try {
      setUploading(true);
      const imageData = await fileToResizedDataUrl(file);
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, imageData, displayOrder }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Upload failed');
      }
      toast.success('Image uploaded');
      setTitle('');
      setCategory('');
      setDisplayOrder(0);
      setFile(null);
      (document.getElementById('gallery-file-input') as HTMLInputElement | null)?.value &&
        ((document.getElementById('gallery-file-input') as HTMLInputElement).value = '');
      await fetchImages();
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload');
    } finally {
      setUploading(false);
    }
  };

  const toggleActive = async (img: GalleryImage) => {
    try {
      const res = await fetch('/api/gallery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: img.id, active: !img.active }),
      });
      if (!res.ok) throw new Error();
      setImages((prev) => prev.map((i) => (i.id === img.id ? { ...i, active: !i.active } : i)));
      toast.success(img.active ? 'Hidden from site' : 'Visible on site');
    } catch {
      toast.error('Failed to update');
    }
  };

  const startEdit = (img: GalleryImage) => {
    setEditingId(img.id);
    setEditTitle(img.title);
    setEditCategory(img.category);
    setEditOrder(img.displayOrder);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (id: number) => {
    try {
      const res = await fetch('/api/gallery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          title: editTitle,
          category: editCategory,
          displayOrder: Number(editOrder) || 0,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success('Image updated');
      setEditingId(null);
      await fetchImages();
    } catch {
      toast.error('Failed to save');
    }
  };

  const replaceImage = async (id: number, newFile: File) => {
    try {
      const imageData = await fileToResizedDataUrl(newFile);
      const res = await fetch('/api/gallery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, imageData }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed');
      }
      toast.success('Image replaced');
      await fetchImages();
    } catch (err: any) {
      toast.error(err.message || 'Failed to replace image');
    }
  };

  const deleteImage = async (id: number) => {
    if (!confirm('Delete this image? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setImages((prev) => prev.filter((i) => i.id !== id));
      toast.success('Image deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <Card className="p-6 bg-white border-none shadow-sm">
        <h3 className="font-bold text-primary text-lg mb-4">Upload New Image</h3>
        <form onSubmit={handleUpload} className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="g-title">Title</Label>
            <Input
              id="g-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Smart Classrooms"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="g-category">Category</Label>
            <Input
              id="g-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Learning / Facility / Sports"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="g-order">Display Order</Label>
            <Input
              id="g-order"
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(parseInt(e.target.value || '0', 10))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gallery-file-input">Image File</Label>
            <Input
              id="gallery-file-input"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" disabled={uploading} className="bg-primary text-white">
              <Upload size={16} className="mr-2" />
              {uploading ? 'Uploading…' : 'Upload Image'}
            </Button>
          </div>
        </form>
      </Card>

      {/* Gallery List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground font-medium animate-pulse">Loading images…</p>
        </div>
      ) : images.length === 0 ? (
        <Card className="p-12 text-center bg-white border-dashed border-2 border-border/60">
          <p className="text-muted-foreground">No images yet. Upload your first one above.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img) => (
            <Card key={img.id} className="overflow-hidden bg-white border-none shadow-sm">
              <div className="relative h-48 bg-muted">
                {/* Use plain img — data URLs don't need next/image optimization */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.imageData}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />
                {!img.active && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="outline" className="bg-rose-100 text-rose-700 border-rose-200">
                      Hidden
                    </Badge>
                  </div>
                )}
              </div>
              <div className="p-4 space-y-3">
                {editingId === img.id ? (
                  <div className="space-y-2">
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Title"
                    />
                    <Input
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      placeholder="Category"
                    />
                    <Input
                      type="number"
                      value={editOrder}
                      onChange={(e) => setEditOrder(parseInt(e.target.value || '0', 10))}
                      placeholder="Order"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => saveEdit(img.id)}
                        className="bg-primary text-white flex-1"
                      >
                        <Save size={14} className="mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        <X size={14} />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h4 className="font-bold text-primary">{img.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {img.category} • Order {img.displayOrder}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(img)}
                      >
                        <Pencil size={14} className="mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleActive(img)}
                      >
                        {img.active ? (
                          <>
                            <EyeOff size={14} className="mr-1" />
                            Hide
                          </>
                        ) : (
                          <>
                            <Eye size={14} className="mr-1" />
                            Show
                          </>
                        )}
                      </Button>
                      <label className="inline-flex">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) replaceImage(img.id, f);
                            e.currentTarget.value = '';
                          }}
                        />
                        <span className="inline-flex items-center justify-center h-9 px-3 text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer">
                          <Upload size={14} className="mr-1" />
                          Replace
                        </span>
                      </label>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteImage(img.id)}
                        className="text-rose-600 hover:bg-rose-50 border-rose-200"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
