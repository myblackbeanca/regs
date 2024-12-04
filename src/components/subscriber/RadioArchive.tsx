import React, { useState } from 'react';
import { Calendar, Play, Download, Clock, Search } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import MixtapeViewer from './MixtapeViewer';

interface Show {
  id: string;
  title: string;
  date: string;
  duration: string;
  description: string;
  audioUrl: string;
  videoUrl?: string;
  hasExtended: boolean;
  mixtapeUrl?: string;
  interviews: Array<{
    artist: string;
    duration: string;
    videoUrl: string;
  }>;
}

const shows: Show[] = [
  {
    id: 'show-1',
    title: "Reg's Coffee House - Holiday Special",
    date: "2023-12-24",
    duration: "2:00:00",
    description: "A festive blend of holiday tunes and winter favorites, featuring exclusive interviews with The Wood Brothers and Ben Folds.",
    audioUrl: "https://storage.example.com/shows/holiday-special.mp3",
    videoUrl: "https://player.vimeo.com/video/1026519121",
    hasExtended: true,
    mixtapeUrl: "https://go.minyvinyl.com/holiday-mix",
    interviews: [
      {
        artist: "The Wood Brothers",
        duration: "45:00",
        videoUrl: "https://player.vimeo.com/video/1026519121"
      },
      {
        artist: "Ben Folds",
        duration: "30:00",
        videoUrl: "https://player.vimeo.com/video/1026519121"
      }
    ]
  },
  {
    id: 'show-2',
    title: "Indie Spotlight: New Discoveries",
    date: "2023-12-17",
    duration: "1:45:00",
    description: "Exploring the best new indie releases, featuring an extended interview with Joy Oladokun about her creative process.",
    audioUrl: "https://storage.example.com/shows/indie-spotlight.mp3",
    videoUrl: "https://player.vimeo.com/video/1034035101",
    hasExtended: true,
    mixtapeUrl: "https://go.minyvinyl.com/indie-dec",
    interviews: [
      {
        artist: "Joy Oladokun",
        duration: "40:00",
        videoUrl: "https://player.vimeo.com/video/1034035101"
      }
    ]
  },
  {
    id: 'show-3',
    title: "Coffee House Classics",
    date: "2023-12-10",
    duration: "2:15:00",
    description: "A journey through timeless coffee house favorites, with special guest Kathleen Edwards sharing stories behind her music.",
    audioUrl: "https://storage.example.com/shows/classics.mp3",
    videoUrl: "https://player.vimeo.com/video/1033249955",
    hasExtended: true,
    mixtapeUrl: "https://go.minyvinyl.com/classics-dec",
    interviews: [
      {
        artist: "Kathleen Edwards",
        duration: "35:00",
        videoUrl: "https://player.vimeo.com/video/1033249955"
      }
    ]
  }
];

const RadioArchive: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [filter, setFilter] = useState<'all' | 'extended' | 'mixtapes' | 'interviews'>('all');

  const filteredShows = shows.filter(show => {
    const matchesSearch = show.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'all') return matchesSearch;
    if (filter === 'extended') return matchesSearch && show.hasExtended;
    if (filter === 'mixtapes') return matchesSearch && show.mixtapeUrl;
    if (filter === 'interviews') return matchesSearch && show.interviews.length > 0;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Radio Show Archive</h1>
          <p className="text-gray-400">Exclusive access for subscribers: Explore past episodes, extended shows, and in-depth interviews.</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search shows..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-800 text-white rounded-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'extended', 'mixtapes', 'interviews'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as typeof filter)}
                className={`px-4 py-2 rounded-lg ${
                  filter === f 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Mixtapes Section */}
        {filter === 'mixtapes' && <MixtapeViewer />}

        {/* Shows Grid */}
        {filter !== 'mixtapes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShows.map((show) => (
              <div 
                key={show.id}
                className="bg-neutral-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                {show.videoUrl && (
                  <div className="aspect-video">
                    <iframe
                      src={show.videoUrl}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{show.title}</h3>
                  <p className="text-gray-400 mb-4">{show.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDistanceToNow(new Date(show.date), { addSuffix: true })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {show.duration}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="btn btn-primary flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Play
                    </button>
                    <button className="btn btn-secondary flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RadioArchive;