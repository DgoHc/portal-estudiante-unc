import React, { useEffect, useState } from 'react';
import { Users, MessageCircle, ThumbsUp, UserPlus, Mic, MicOff, Send, Plus, Users2, Bot, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { apiCreateCommunityPost, apiGetCommunityPosts, apiLikeCommunityPost, apiSendFriendRequest, apiGetComments, apiAddComment, apiCreateGroup, apiJoinGroup, apiGetGroupMessages, apiSendGroupMessage, apiSendAgentMessageToGroup } from '../../api';
import { Link } from 'react-router-dom';

interface CommunityPost {
  id: number;
  author: string;
  content: string;
  likes: number;
  createdAt: string;
}

interface Group {
  id: number;
  name: string;
  creator_id: number;
  created_at: string;
  member_count: number;
}

interface GroupMessage {
  id: number;
  content: string;
  author: string;
  created_at: string;
  is_agent?: boolean;
}

export function CommunitySection() {
  const { student } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([
    { id: 1, author: 'María González', content: '¿Alguien tiene los apuntes de IA del viernes?', likes: 12, createdAt: new Date().toISOString() },
    { id: 2, author: 'Juan Pérez', content: 'Formando grupo para el proyecto de BD, ¡me escriben!', likes: 8, createdAt: new Date().toISOString() },
  ]);
  const [newPost, setNewPost] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [commentDraft, setCommentDraft] = useState<Record<number, string>>({});
  const [comments, setComments] = useState<Record<number, any[]>>({});
  
  // Estados para grupos
  const [activeTab, setActiveTab] = useState<'posts' | 'groups'>('posts');
  const [groups, setGroups] = useState<Group[]>([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [groupMessages, setGroupMessages] = useState<GroupMessage[]>([]);
  const [newGroupMessage, setNewGroupMessage] = useState('');
  const [showJoinGroup, setShowJoinGroup] = useState(false);
  const [groupToJoin, setGroupToJoin] = useState('');

  useEffect(() => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.lang = 'es-PE';
      rec.continuous = false;
      rec.interimResults = false;
      rec.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        setNewPost(prev => (prev ? prev + ' ' : '') + transcript);
      };
      rec.onend = () => setIsRecording(false);
      setRecognition(rec);
    }
  }, []);

  const handleToggleVoice = () => {
    if (!recognition) return;
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      recognition.start();
    }
  };

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { posts } = await apiGetCommunityPosts();
        if (!cancelled) setPosts(posts);
      } catch {
        // ignore
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const loadComments = async (postId: number) => {
    try {
      const { comments } = await apiGetComments(postId);
      setComments(prev => ({ ...prev, [postId]: comments }));
    } catch {}
  };

  const handlePublish = async () => {
    if (!newPost.trim() || !student?.code) return;
    try {
      const r = await apiCreateCommunityPost(student.code, newPost.trim());
      setPosts(prev => [
        { id: r.id, author: student?.name || 'Yo', content: newPost.trim(), likes: 0, createdAt: r.created_at },
        ...prev,
      ]);
      setNewPost('');
    } catch {
      // ignore
    }
  };

  const handleLike = async (id: number) => {
    if (!student?.code) return;
    try {
      const r = await apiLikeCommunityPost(student.code, id);
      setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: r.likes } : p));
    } catch {
      // ignore
    }
  };

  const handleAddFriend = async (toCode: string) => {
    if (!student?.code) return;
    try {
      await apiSendFriendRequest(student.code, toCode);
    } catch {
      // ignore
    }
  };

  const handleAddComment = async (postId: number) => {
    if (!student?.code) return;
    const content = (commentDraft[postId] || '').trim();
    if (!content) return;
    try {
      const r = await apiAddComment(postId, student.code, content);
      setComments(prev => ({
        ...prev,
        [postId]: [ ...(prev[postId] || []), { id: r.id, content, author: student.name, code: student.code, created_at: r.created_at } ]
      }));
      setCommentDraft(prev => ({ ...prev, [postId]: '' }));
    } catch {}
  };

  // Funciones para grupos
  const handleCreateGroup = async () => {
    if (!newGroupName.trim() || !student?.code) return;
    try {
      const group = await apiCreateGroup(newGroupName.trim(), student.code);
      setGroups(prev => [group, ...prev]);
      setNewGroupName('');
      setShowCreateGroup(false);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleJoinGroup = async () => {
    if (!groupToJoin.trim() || !student?.code) return;
    try {
      await apiJoinGroup(parseInt(groupToJoin), student.code);
      setGroupToJoin('');
      setShowJoinGroup(false);
      // Recargar grupos
      // En producción aquí harías una llamada para obtener la lista actualizada
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  const handleSelectGroup = async (group: Group) => {
    setSelectedGroup(group);
    try {
      const messages = await apiGetGroupMessages(group.id);
      setGroupMessages(messages);
    } catch (error) {
      console.error('Error loading group messages:', error);
    }
  };

  const handleSendGroupMessage = async () => {
    if (!newGroupMessage.trim() || !selectedGroup || !student?.code) return;
    try {
      const message = await apiSendGroupMessage(selectedGroup.id, student.code, newGroupMessage.trim());
      setGroupMessages(prev => [...prev, message]);
      setNewGroupMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleSendAgentMessage = async () => {
    if (!selectedGroup || !student?.code) return;
    try {
      const message = await apiSendAgentMessageToGroup(selectedGroup.id, student.code, 'Hola agente, ¿cómo estás?');
      setGroupMessages(prev => [...prev, { 
        id: Date.now(), 
        content: 'Hola agente, ¿cómo estás?', 
        author: 'Tú', 
        created_at: new Date().toISOString(),
        is_agent: false
      }, {
        id: Date.now() + 1,
        content: message.response || 'Hola! Soy el agente n8n, ¿en qué puedo ayudarte?',
        author: 'Agente n8n',
        created_at: new Date().toISOString(),
        is_agent: true
      }]);
    } catch (error) {
      console.error('Error sending agent message:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-sky-600 to-sky-800 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Comunidad</h2>
            <p className="text-sky-100">Conversa, haz amigos y comparte recursos</p>
          </div>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'posts'
                ? 'bg-sky-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Publicaciones
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'groups'
                ? 'bg-sky-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Grupos de Chat
          </button>
        </div>
      </div>

      {activeTab === 'posts' ? (
        <>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-center space-x-3">
              <button onClick={handleToggleVoice} className={`p-3 rounded-xl border transition-colors ${isRecording ? 'bg-red-600 text-white border-red-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <input
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Comparte algo con tu comunidad..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
              <button onClick={handlePublish} className="px-4 py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors flex items-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Publicar</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <Link to={`/profile/${encodeURIComponent((post as any).code || '')}`} className="font-semibold text-gray-900 hover:underline">{post.author}</Link>
                    <p className="text-xs text-gray-500">{new Date(post.createdAt || (post as any).created_at).toLocaleString('es-PE')}</p>
                  </div>
                  <button onClick={() => handleLike(post.id)} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    <ThumbsUp className="w-4 h-4 mr-1" /> {post.likes}
                  </button>
                </div>
                <p className="text-gray-700 mt-3">{post.content}</p>
                <div className="mt-3 flex items-center space-x-3 text-sm text-gray-500">
                  <button onClick={() => loadComments(post.id)} className="inline-flex items-center space-x-1 hover:text-gray-700"><MessageCircle className="w-4 h-4" /><span>Comentarios</span></button>
                  <button onClick={() => handleAddFriend((post as any).code || '')} className="inline-flex items-center space-x-1 hover:text-gray-700"><UserPlus className="w-4 h-4" /><span>Agregar amigo</span></button>
                </div>
                {comments[post.id] && (
                  <div className="mt-3 space-y-2">
                    {comments[post.id].map((c: any) => (
                      <div key={c.id} className="text-sm bg-gray-50 border border-gray-200 rounded-xl p-2">
                        <Link to={`/profile/${encodeURIComponent(c.code)}`} className="font-medium text-gray-800 hover:underline">{c.author}</Link>
                        <span className="text-gray-400 ml-2">{new Date(c.created_at).toLocaleString('es-PE')}</span>
                        <p className="text-gray-700">{c.content}</p>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <input
                        value={commentDraft[post.id] || ''}
                        onChange={e => setCommentDraft(prev => ({ ...prev, [post.id]: e.target.value }))}
                        placeholder="Escribe un comentario..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <button onClick={() => handleAddComment(post.id)} className="px-3 py-2 bg-blue-600 text-white rounded-lg">Enviar</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          {/* Botones de acción para grupos */}
          <div className="flex space-x-4">
            <button
              onClick={() => setShowCreateGroup(true)}
              className="inline-flex items-center space-x-2 px-4 py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Grupo</span>
            </button>
            <button
              onClick={() => setShowJoinGroup(true)}
              className="inline-flex items-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
            >
              <Users2 className="w-4 h-4" />
              <span>Unirse a Grupo</span>
            </button>
          </div>

          {/* Lista de grupos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map((group) => (
              <div
                key={group.id}
                onClick={() => handleSelectGroup(group)}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{group.name}</h3>
                  <span className="text-sm text-gray-500">{group.member_count} miembros</span>
                </div>
                <p className="text-sm text-gray-600">Creado el {new Date(group.created_at).toLocaleDateString('es-PE')}</p>
                <button className="mt-3 w-full px-3 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors">
                  Entrar al Chat
                </button>
              </div>
            ))}
          </div>

          {/* Chat del grupo seleccionado */}
          {selectedGroup && (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Chat: {selectedGroup.name}</h3>
                <button
                  onClick={() => setSelectedGroup(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
                {groupMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-3 ${message.is_agent ? 'text-right' : 'text-left'}`}
                  >
                    <div className={`inline-block max-w-xs px-3 py-2 rounded-lg ${
                      message.is_agent
                        ? 'bg-sky-600 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}>
                      <p className="text-sm font-medium">{message.author}</p>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(message.created_at).toLocaleTimeString('es-PE')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-3">
                <input
                  value={newGroupMessage}
                  onChange={(e) => setNewGroupMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendGroupMessage()}
                />
                <button
                  onClick={handleSendGroupMessage}
                  className="px-4 py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors"
                >
                  Enviar
                </button>
                <button
                  onClick={handleSendAgentMessage}
                  className="px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center space-x-2"
                  title="Chatear con el agente n8n"
                >
                  <Bot className="w-4 h-4" />
                  <span>Agente</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal para crear grupo */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Crear Nuevo Grupo</h3>
              <button
                onClick={() => setShowCreateGroup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Grupo</label>
                <input
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Ej: Proyecto IA 2024"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateGroup(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateGroup}
                  className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                >
                  Crear Grupo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para unirse a grupo */}
      {showJoinGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Unirse a Grupo</h3>
              <button
                onClick={() => setShowJoinGroup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ID del Grupo</label>
                <input
                  value={groupToJoin}
                  onChange={(e) => setGroupToJoin(e.target.value)}
                  placeholder="Ingresa el ID del grupo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowJoinGroup(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleJoinGroup}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Unirse
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunitySection;


