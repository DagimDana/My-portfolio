import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Trash2, LogOut, Home, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface AdminState {
  session: any;
  messages: ContactMessage[];
  loading: boolean;
  error: string | null;
}

export default function Admin() {
  const navigate = useNavigate();
  const [state, setState] = useState<AdminState>({
    session: null,
    messages: [],
    loading: true,
    error: null,
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setState(prev => ({ ...prev, session, loading: false }));
        if (session) fetchMessages();
      } catch (error) {
        setState(prev => ({ ...prev, error: 'Authentication error', loading: false }));
      }
    };

    handleAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState(prev => ({ ...prev, session, loading: false }));
      if (session) fetchMessages();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchMessages = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        messages: data as ContactMessage[],
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Error fetching messages',
        loading: false,
      }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoggingIn(true);
      const { error } = await supabase.auth.signInWithPassword(loginData);
      
      if (error) throw error;
      
      setLoginData({ email: '', password: '' });
      
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Error logging in',
      }));
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      await supabase.auth.signOut();
      setState(prev => ({ 
        ...prev, 
        messages: [], 
        session: null,
        loading: false,
        error: null 
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Error logging out',
        loading: false
      }));
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      setState(prev => ({ ...prev, loading: true }));
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setState(prev => ({
        ...prev,
        messages: prev.messages.filter(msg => msg.id !== id),
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Error deleting message',
        loading: false,
      }));
    }
  };

  const toggleMessage = (id: string) => {
    setExpandedMessage(expandedMessage === id ? null : id);
  };

  if (!state.session) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">
              Admin <span className="gradient-text">Login</span>
            </h1>
            <p className="mt-2 text-gray-400">
              Sign in to access the admin dashboard
            </p>
          </div>

          {state.error && (
            <div className="bg-red-900/30 text-red-400 p-4 rounded-lg">
              {state.error}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-8 space-y-6 bg-[#1a1a1a] p-8 rounded-xl">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={loginData.email}
                onChange={e => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d] focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={loginData.password}
                onChange={e => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9d] focus:border-transparent transition-all"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#00ff9d] text-black px-6 py-4 rounded-lg hover:bg-[#00cc7d] transition-colors font-medium flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="text-center">
            <Link
              to="/"
              className="text-[#00ff9d] hover:text-[#00cc7d] transition-colors inline-flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Contact <span className="gradient-text">Messages</span>
          </h1>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 bg-[#1a1a1a] text-[#00ff9d] px-4 py-2 rounded-lg hover:bg-[#2a2a2a] transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {state.error && (
          <div className="bg-red-900/30 text-red-400 p-4 rounded-lg mb-6">
            {state.error}
          </div>
        )}

        {state.loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-8 w-8 border-2 border-[#00ff9d] border-t-transparent rounded-full"></div>
          </div>
        ) : state.messages.length === 0 ? (
          <div className="bg-[#1a1a1a] rounded-xl p-8 text-center">
            <p className="text-gray-400">No messages found</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {state.messages.map((message) => (
              <div
                key={message.id}
                className="bg-[#1a1a1a] rounded-xl p-6 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {message.name}
                    </h3>
                    <p className="text-[#00ff9d]">{message.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleMessage(message.id)}
                      className="p-2 text-gray-400 hover:text-[#00ff9d] rounded-lg transition-colors"
                      title={expandedMessage === message.id ? "Show less" : "Show more"}
                    >
                      {expandedMessage === message.id ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(message.id)}
                      className="p-2 text-red-400 hover:text-red-300 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Subject</h4>
                    <p className="text-white">{message.subject}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Message</h4>
                    <p className={`text-gray-300 ${expandedMessage !== message.id && 'line-clamp-2'}`}>
                      {message.message}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-sm text-gray-500">
                      Received: {new Date(message.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}