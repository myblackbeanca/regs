import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Gift, Music, Share2, X } from 'lucide-react';

interface Comment {
  id: number;
  user: string;
  text: string;
  likes: number;
  timestamp: string;
}

interface Song {
  id: number;
  title: string;
  artist: string;
  votes: number;
}

const initialSongs: Song[] = [
  { id: 1, title: "Lost in a Crowd", artist: "Fantastic Negrito", votes: 15 },
  { id: 2, title: "Stay Alive", artist: "Mustafa", votes: 12 },
  { id: 3, title: "Everybody Wants to Rule the World", artist: "Tears for Fears", votes: 8 },
  { id: 4, title: "Breathe Again", artist: "Joy Oladokun", votes: 7 },
  { id: 5, title: "Reggae Fever", artist: "The Silverlites", votes: 6 },
  { id: 6, title: "Surefire", artist: "Wilderado", votes: 5 }
];

const LiveStream = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimForm, setClaimForm] = useState({ email: '', phone: '' });
  const [claimed, setClaimed] = useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      user: "Anonymous User",
      text: newComment,
      likes: 0,
      timestamp: new Date().toLocaleTimeString()
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleVote = (songId: number) => {
    setSongs(songs.map(song => 
      song.id === songId ? { ...song, votes: song.votes + 1 } : song
    ).sort((a, b) => b.votes - a.votes));
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClaimed(true);
    setTimeout(() => {
      setShowClaimModal(false);
      setClaimed(false);
      setClaimForm({ email: '', phone: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Live Stream */}
            <div className="bg-neutral-800 rounded-xl overflow-hidden">
              <div className="aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src="https://player.vimeo.com/video/1026519121"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h1 className="text-2xl font-bold text-white mb-2">Live with Reg</h1>
                <p className="text-gray-400">Join the conversation and request your favorite songs!</p>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-neutral-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Live Chat</h2>
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Join the conversation..."
                    className="flex-1 bg-neutral-700 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <button type="submit" className="btn btn-primary">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </form>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-neutral-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-white">{comment.user}</span>
                      <span className="text-sm text-gray-400">{comment.timestamp}</span>
                    </div>
                    <p className="text-gray-300">{comment.text}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button className="text-gray-400 hover:text-amber-400 flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        {comment.likes}
                      </button>
                      <button className="text-gray-400 hover:text-amber-400">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Song Requests */}
            <div className="bg-neutral-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Song Requests</h2>
              <div className="space-y-4">
                {songs.map((song) => (
                  <div key={song.id} className="bg-neutral-700 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">{song.title}</h3>
                        <p className="text-sm text-gray-400">{song.artist}</p>
                      </div>
                      <button
                        onClick={() => handleVote(song.id)}
                        className="flex items-center gap-2 text-amber-400 hover:text-amber-300"
                      >
                        <Music className="w-4 h-4" />
                        {song.votes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MINY Collectibles */}
            <div className="bg-neutral-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">MINY Collectibles</h2>
              <div className="space-y-4">
                <div className="bg-neutral-700 rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <Gift className="w-8 h-8 text-amber-400" />
                    <div>
                      <h3 className="font-medium text-white">Limited Edition Badge</h3>
                      <p className="text-sm text-gray-400">Available for active listeners</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowClaimModal(true)} 
                    className="w-full btn btn-primary mt-4"
                  >
                    Claim Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Claim Modal */}
      {showClaimModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-neutral-900 rounded-xl p-8 max-w-md w-full mx-4">
            {claimed ? (
              <div className="text-center py-8">
                <Gift className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
                <p className="text-gray-400">
                  Your MINY collectible will be sent to your wallet soon.
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Claim Your Collectible</h2>
                  <button 
                    onClick={() => setShowClaimModal(false)} 
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleClaimSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={claimForm.email}
                      onChange={(e) => setClaimForm({ ...claimForm, email: e.target.value })}
                      className="w-full bg-neutral-800 text-white rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={claimForm.phone}
                      onChange={(e) => setClaimForm({ ...claimForm, phone: e.target.value })}
                      className="w-full bg-neutral-800 text-white rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                    />
                  </div>
                  <button type="submit" className="w-full btn btn-primary mt-6">
                    Claim Collectible
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveStream;