import React, { useState, useRef } from 'react';
import type { Photo } from '../../data/types';
import { PHOTO_AUTH_SENTENCE } from '../../data/copy';
import { useStore } from '../../store/useStore';
import { pools, unsplashUrl } from '../../data/images';
import { 
  UploadCloud, 
  Trash2, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Loader2, 
  Image as ImageIcon 
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { legal } from '../../data/copy';

interface PhotoUploaderProps {
  photos: Photo[];
  onChange: (photos: Photo[]) => void;
  authorized: boolean;
  onAuthorizedChange: (authorized: boolean) => void;
  error?: string;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  photos,
  onChange,
  authorized,
  onAuthorizedChange,
  error,
}) => {
  const toast = useStore((s) => s.toast);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [photoAuthModalOpen, setPhotoAuthModalOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Reorder photo
  const move = (from: number, to: number) => {
    if (to < 0 || to >= photos.length) return;
    const next = [...photos];
    const item = next.splice(from, 1)[0];
    next.splice(to, 0, item);
    onChange(next);
  };

  // Remove photo with Undo toast
  const removePhoto = (index: number) => {
    const target = photos[index];
    const next = photos.filter((_, i) => i !== index);
    onChange(next);

    toast({
      kind: 'info',
      title: 'Photo removed',
      action: {
        label: 'Undo',
        run: () => {
          const restored = [...next];
          restored.splice(index, 0, target);
          onChange(restored);
        },
      },
    });
  };

  // Set as Cover
  const setCover = (index: number) => {
    if (index === 0) return;
    const next = [...photos];
    const item = next.splice(index, 1)[0];
    next.unshift(item);
    onChange(next);
  };

  // Simulate file drop or selection
  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadError(null);

    // Check size & type simulation
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.name.toLowerCase().includes('large') || file.size > 10 * 1024 * 1024) {
        setUploadError(`“${file.name}” is too large (max 10MB). Try a smaller JPG or PNG.`);
        return;
      }
    }

    setUploading(true);
    // Simulate realistic upload progress
    setTimeout(() => {
      // Pick random complementary pool photos
      const added: Photo[] = Array.from(files).map((f, i) => {
        const sample = pools.living[(photos.length + i) % pools.living.length];
        return {
          id: `up-${Date.now()}-${i}`,
          src: sample.src,
          kind: 'unsplash',
          alt: f.name.replace(/\.[^/.]+$/, ''),
          color: sample.color,
        };
      });

      onChange([...photos, ...added]);
      setUploading(false);
      toast({
        kind: 'success',
        title: `${added.length} ${added.length === 1 ? 'photo' : 'photos'} added`,
      });
    }, 900);
  };

  // Quick helper to seed demo photos if user wants sample batch
  const handleAddSamplePhotos = () => {
    setUploading(true);
    setTimeout(() => {
      const samples: Photo[] = [
        pools.living[2],
        pools.bedroom[1],
        pools.kitchen[0],
        pools.bath[0],
        pools.beach[2],
        pools.pool[1],
        pools.living[5],
        pools.bedroom[3],
      ];
      onChange(samples);
      setUploading(false);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Dropzone Container */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-all ${
          dragOver
            ? 'border-seaglass-500 bg-seaglass-100/50'
            : 'border-line-300 bg-sand-50/60 hover:bg-sand-50 hover:border-line-300'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="w-12 h-12 rounded-full bg-sand-100 text-brass-600 flex items-center justify-center mx-auto mb-3">
          {uploading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <UploadCloud className="w-6 h-6" strokeWidth={1.5} />
          )}
        </div>

        <h4 className="font-serif text-lg text-tide-900 font-medium">
          Drag photos here, or browse
        </h4>
        <p className="text-xs text-ink-500 mt-1 max-w-sm mx-auto">
          6 to 25 photos required. High-resolution JPG or PNG up to 10MB each.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="btn btn-secondary btn-sm"
          >
            Select from computer
          </button>
          {photos.length < 6 && (
            <button
              type="button"
              onClick={handleAddSamplePhotos}
              disabled={uploading}
              className="btn btn-ghost btn-sm text-brass-600 hover:text-brass-700"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Add 8 demo photos
            </button>
          )}
        </div>
      </div>

      {uploadError && (
        <div className="p-3 bg-err-100 text-err-600 rounded border border-err-600/30 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Uploaded Photos Grid */}
      {photos.length > 0 && (
        <div>
          <div className="flex items-center justify-between text-xs text-ink-600 mb-3">
            <span className="font-semibold text-tide-900">
              {photos.length} {photos.length === 1 ? 'photo' : 'photos'} uploaded
              {photos.length < 6 ? ` (need ${6 - photos.length} more)` : ' · First photo is Cover'}
            </span>
            <span className="text-ink-500 hidden sm:inline">
              Drag or use arrows to reorder
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {photos.map((p, idx) => {
              const isCover = idx === 0;
              const src = p.kind === 'unsplash' ? unsplashUrl(p.src, 300, 200) : p.src;

              return (
                <div
                  key={p.id || idx}
                  className={`card overflow-hidden group relative border ${
                    isCover ? 'border-brass-500 ring-2 ring-brass-500/20' : 'border-line-200'
                  }`}
                >
                  <div className="aspect-[4/3] bg-sand-100 relative">
                    <img
                      src={src}
                      alt={p.alt || `Condo photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {isCover && (
                      <span className="absolute top-2 left-2 bg-brass-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-1">
                        Cover Photo
                      </span>
                    )}

                    {/* Quick Action Overlay */}
                    <div className="absolute inset-0 bg-tide-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2 text-white">
                      {!isCover && (
                        <button
                          type="button"
                          onClick={() => setCover(idx)}
                          className="p-1.5 rounded bg-white/20 hover:bg-white/40 text-xs font-medium"
                          title="Make cover photo"
                        >
                          Make Cover
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="p-1.5 rounded bg-err-600/80 hover:bg-err-600 text-white"
                        title="Delete photo"
                        aria-label="Remove photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Reorder Arrows on Card Footer */}
                  <div className="p-1.5 bg-sand-50 border-t border-line-200 flex items-center justify-between text-[11px] text-ink-500">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => move(idx, idx - 1)}
                      className="p-1 hover:text-tide-900 disabled:opacity-20"
                      aria-label="Move left"
                    >
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                    <span>{idx + 1}</span>
                    <button
                      type="button"
                      disabled={idx === photos.length - 1}
                      onClick={() => move(idx, idx + 1)}
                      className="p-1 hover:text-tide-900 disabled:opacity-20"
                      aria-label="Move right"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Photo Authorization Checkbox */}
      <div className="pt-2 border-t border-line-200">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={authorized}
            onChange={(e) => onAuthorizedChange(e.target.checked)}
            className="checkbox mt-1"
          />
          <span className="text-xs sm:text-sm text-ink-900 leading-normal">
            {PHOTO_AUTH_SENTENCE}{' '}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setPhotoAuthModalOpen(true);
              }}
              className="text-brass-600 hover:text-brass-700 underline underline-offset-2 font-medium"
            >
              Read photo authorization details
            </button>
          </span>
        </label>
        {error && <p className="error-text text-xs mt-2">{error}</p>}
      </div>

      {/* Photo Authorization Modal to preserve form progress */}
      <Modal
        isOpen={photoAuthModalOpen}
        onClose={() => setPhotoAuthModalOpen(false)}
        title="Photo authorization"
        size="md"
      >
        <div className="space-y-4 text-xs text-ink-600 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
          {legal.photos.sections.map((sec) => (
            <div key={sec.id}>
              <h5 className="font-semibold text-tide-900 text-sm mb-1">{sec.title}</h5>
              {sec.body.map((p, i) => (
                <p key={i} className="mb-2">{p}</p>
              ))}
            </div>
          ))}
          <div className="pt-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onAuthorizedChange(true);
                setPhotoAuthModalOpen(false);
              }}
            >
              I authorize these photos
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
