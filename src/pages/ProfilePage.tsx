import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiGetProfile, apiUpdateProfile } from '../api';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Phone, GraduationCap, ArrowLeft, UserPlus, MessageSquare, Edit, Camera, X } from 'lucide-react';

interface StudentProfile {
  id: string;
  name: string;
  code: string;
  career: string;
  semester: number;
  email: string;
  phone: string;
  avatar_url?: string;
  bio?: string;
}

export default function ProfilePage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ bio: '', avatar_url: '' });
  const [uploadingImage, setUploadingImage] = useState(false);
  const { student } = useAuth();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!code) return;
      setLoading(true);
      setError('');
      try {
        const data = await apiGetProfile(code);
        if (!cancelled) {
          setProfile(data);
          setEditForm({ 
            bio: (data as any).bio || '', 
            avatar_url: (data as any).avatar_url || '' 
          });
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Error al cargar perfil');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [code]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingImage(true);
      // Simular subida de imagen (en producción usarías un servicio como Cloudinary)
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditForm(prev => ({ ...prev, avatar_url: result }));
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    if (!profile) return;
    try {
      await apiUpdateProfile(profile.code, editForm);
      setProfile(prev => prev ? { ...prev, ...editForm } : null);
      setShowEditModal(false);
    } catch (e: any) {
      setError(e?.message || 'Error al actualizar perfil');
    }
  };

  const avatarUrl = profile ? (profile.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profile.name)}`) : '';

  return (
    <div className="max-w-5xl mx-auto">
      <button onClick={() => navigate(-1)} className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" />
        <span>Volver</span>
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
          <div className="flex items-center space-x-6">
            <div className="relative w-24 h-24 rounded-2xl bg-white/20 flex items-center justify-center overflow-hidden">
              {profile && <img src={avatarUrl} alt={profile.name} className="w-full h-full object-cover" />}
              <button 
                onClick={() => setShowEditModal(true)}
                className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{profile?.name || 'Perfil'}</h1>
              <p className="text-blue-100">{profile?.career}</p>
              {profile?.bio && (
                <p className="text-blue-200 mt-2 max-w-md">{profile.bio}</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Información</h2>
                <button 
                  onClick={() => setShowEditModal(true)}
                  className="inline-flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar Perfil</span>
                </button>
              </div>
              {loading && <p className="text-gray-600">Cargando...</p>}
              {error && <p className="text-red-600">{error}</p>}
              {profile && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Código: {profile.code}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">Semestre: {profile.semester}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-green-600" />
                    <a href={`mailto:${profile.email}`} className="font-medium hover:underline">{profile.email}</a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-orange-600" />
                    <a href={`tel:${profile.phone}`} className="font-medium hover:underline">{profile.phone || '—'}</a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <button className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
              <UserPlus className="w-4 h-4" />
              <span>Agregar amigo</span>
            </button>
            <Link to={profile ? `/dashboard#community` : '#'} className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-black">
              <MessageSquare className="w-4 h-4" />
              <span>Enviar mensaje</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal de Edición */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Editar Perfil</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Foto de Perfil</label>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                    {editForm.avatar_url && (
                      <img src={editForm.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                {uploadingImage && <p className="text-sm text-blue-600">Subiendo imagen...</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Biografía</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Cuéntanos sobre ti..."
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


