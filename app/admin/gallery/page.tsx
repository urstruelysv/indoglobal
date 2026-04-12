'use client';

import { useState, useEffect, useCallback } from 'react';
import { Upload, Trash2, ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const categories = ['Campus', 'Events', 'Sports', 'Academics'] as const;

type GalleryImage = {
  id: number;
  filename: string;
  originalName: string;
  category: string;
  caption: string | null;
  uploadedAt: string;
};

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [category, setCategory] = useState<string>('Campus');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (Array.isArray(data)) setImages(data);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const uploadFile = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('caption', caption);

    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setCaption('');
        await fetchImages();
      } else {
        const error = await res.json();
        alert(error.error || 'Upload failed');
      }
    } catch (error) {
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (id: number) => {
    if (!confirm('Delete this image? This cannot be undone.')) return;

    try {
      const res = await fetch('/api/gallery', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        await fetchImages();
      }
    } catch (error) {
      alert('Failed to delete image.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) uploadFile(files[0]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-serif font-bold text-primary">Gallery Manager</h1>
          <p className="text-muted-foreground mt-1">Upload, organize, and manage school photos.</p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-2xl border border-border/20 shadow-sm p-8 mb-10">
          <h2 className="font-serif font-bold text-xl text-primary mb-6">Upload New Photo</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Caption (optional)</label>
              <Input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Annual Sports Day 2025"
                className="bg-background"
              />
            </div>
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors duration-200 ${
              dragOver
                ? 'border-primary bg-primary/5'
                : 'border-border/40 hover:border-border/60'
            }`}
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-primary font-medium">Uploading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Upload className="w-10 h-10 text-muted-foreground" />
                <p className="text-foreground font-medium">
                  Drag and drop a photo here, or{' '}
                  <label className="text-primary font-semibold cursor-pointer hover:underline">
                    browse
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                </p>
                <p className="text-xs text-muted-foreground">JPEG, PNG, or WebP</p>
              </div>
            )}
          </div>
        </div>

        {/* Image Grid */}
        <div className="bg-white rounded-2xl border border-border/20 shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif font-bold text-xl text-primary">All Photos</h2>
            <span className="text-sm text-muted-foreground">{images.length} photos</span>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No photos uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={image.id} className="group relative rounded-xl overflow-hidden border border-border/20">
                  <img
                    src={`/images/gallery/${image.filename}`}
                    alt={image.caption || image.originalName}
                    className="w-full h-48 object-cover"
                  />
                  {/* Overlay with info + delete */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-200">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteImage(image.id)}
                        className="rounded-full"
                      >
                        <Trash2 size={16} className="mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  {/* Info bar */}
                  <div className="p-3 bg-white">
                    <p className="text-xs font-medium text-foreground truncate">
                      {image.caption || image.originalName}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                      {image.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
