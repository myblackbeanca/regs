import React, { useState } from 'react';
import { Send, MessageSquare, Music, User } from 'lucide-react';
import { supabase } from '../../supabase/config';

interface FormData {
  type: 'question' | 'artist' | 'interview';
  name: string;
  email: string;
  content: string;
  artistName?: string;
  artistLink?: string;
}

const AskReg: React.FC = () => {
  const storedName = localStorage.getItem('userName') || '';
  const storedEmail = localStorage.getItem('userEmail') || '';

  const [formData, setFormData] = useState<FormData>({
    type: 'question',
    name: storedName,
    email: storedEmail,
    content: '',
    artistName: '',
    artistLink: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('regs_coffee_asked_questions')
      .insert([
        {
          type: formData.type,
          name: formData.name,
          email: formData.email,
          content: formData.content,
          artist_name: formData.artistName,
          artist_link: formData.artistLink
        }
      ]);

    if (error) {
      console.error('Error inserting data:', error);
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        type: 'question',
        name: '',
        email: '',
        content: '',
        artistName: '',
        artistLink: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-900 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">Ask Reg</h1>
          <p className="text-gray-400">
            Got questions? Found an amazing artist? Share your thoughts with Reg!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: MessageSquare,
              title: "Ask a Question",
              description: "Get Reg's take on music, coffee, or anything in between"
            },
            {
              icon: Music,
              title: "Share Artists",
              description: "Tell us about emerging artists we should feature"
            },
            {
              icon: User,
              title: "Interview Questions",
              description: "Suggest questions for upcoming artist interviews"
            }
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => setFormData(prev => ({
                ...prev,
                type: ['question', 'artist', 'interview'][index] as FormData['type']
              }))}
              className={`p-6 rounded-xl text-center transition-all duration-300 ${
                formData.type === ['question', 'artist', 'interview'][index]
                  ? 'bg-amber-600 text-white'
                  : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700'
              }`}
            >
              <item.icon className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </button>
          ))}
        </div>

        {submitted ? (
          <div className="bg-green-600 text-white p-6 rounded-xl text-center">
            <h3 className="text-xl font-bold mb-2">Thank You!</h3>
            <p>Your submission has been received. Reg will review it soon!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-neutral-800 rounded-xl p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-neutral-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-neutral-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {formData.type === 'artist' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2">Artist Name</label>
                  <input
                    type="text"
                    required
                    value={formData.artistName}
                    onChange={(e) => setFormData(prev => ({ ...prev, artistName: e.target.value }))}
                    className="w-full bg-neutral-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Artist Link (Optional)</label>
                  <input
                    type="url"
                    value={formData.artistLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, artistLink: e.target.value }))}
                    className="w-full bg-neutral-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-gray-400 mb-2">
                {formData.type === 'question' ? 'Your Question' :
                 formData.type === 'artist' ? 'Why should we feature this artist?' :
                 'Your Interview Question'}
              </label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={4}
                className="w-full bg-neutral-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            <button type="submit" className="w-full btn btn-primary flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AskReg;