import React from 'react';
import { Play, Music, ExternalLink } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei';
import MixtapeGrid from './MixtapeGrid';
import { HexagonMesh } from './MixtapeGrid';

const featuredMixtape = {
  name: "Special Edition Reg Coffee",
  imageUrl: "https://raw.githubusercontent.com/myblackbeanca/regcoffee/refs/heads/main/regslogo.jpg",
  shortenedLink: "https://go.minyvinyl.com/regspecial",
  artists: [
    "Cole Spain", "Maria Somerville", "Jenny Owen Youngs", "Arbes", 
    "Peter McPoland", "Tears for Fears", "Kim Deal Music", "Beau", 
    "King Pari", "The Coronas", "Faye Webster"
  ]
};

const featuredArtists = [
  {
    name: "Cole Spain",
    image: "https://firebasestorage.googleapis.com/v0/b/subway-musician-564bd.appspot.com/o/aminy-generation%2Fminy-3416cfd2-2db7-484a-b5fd-422eeea9f07f?alt=media&token=fa63aaba-ccdb-4652-903b-0cd13aa78e28",
    link: "https://go.minyvinyl.com/colespain"
  },
  {
    name: "Maria Somerville",
    image: "https://firebasestorage.googleapis.com/v0/b/subway-musician-564bd.appspot.com/o/aminy-generation%2Fminy-4f75b558-eeda-49b0-9fcd-41bb8c3eebee?alt=media&token=97d11215-faa4-4eb3-a6dd-9dcc60b77dd8",
    link: "https://go.minyvinyl.com/mariasomerville"
  },
  {
    name: "Jenny Owen Youngs",
    image: "https://firebasestorage.googleapis.com/v0/b/subway-musician-564bd.appspot.com/o/aminy-generation%2Fminy-792f2173-131a-4345-831b-9053e911f89b?alt=media&token=22a75a96-a7e4-4db7-b82d-13343c0fbb01",
    link: "https://go.minyvinyl.com/jennyowen"
  },
  {
    name: "Arbes",
    image: "https://firebasestorage.googleapis.com/v0/b/subway-musician-564bd.appspot.com/o/aminy-generation%2Fminy-d35588f3-1c5e-4d09-b03c-191e7d5f0325?alt=media&token=b604884a-3ece-4747-9306-1cd01a0845e9",
    link: "https://go.minyvinyl.com/arbes"
  }
];

const ArtistCard = ({ artist }: { artist: typeof featuredArtists[0] }) => (
  <div className="relative h-[300px] bg-neutral-800 rounded-xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
    <Canvas 
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      shadows 
      dpr={[1, 2]}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 3]} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />
      <ambientLight intensity={0.5} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.25}
        penumbra={1}
        intensity={0.5}
        castShadow
      />
      <Environment preset="studio" />
      <HexagonMesh imageUrl={artist.image} isPlaying={true} />
    </Canvas>

    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
      <h3 className="text-lg font-bold text-white mb-1">{artist.name}</h3>
      <p className="text-gray-300 text-sm mb-2">Featured Artist</p>
      <a
        href={artist.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm"
      >
        <Play className="w-4 h-4" />
      </a>
    </div>
  </div>
);

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-neutral-900 via-amber-900 to-neutral-900 pt-24">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Where Music Meets Coffee
              </h1>
              <p className="text-xl text-gray-300">
                Join us for exclusive mixtapes, live sessions, and intimate conversations 
                with your favorite artists.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('featured-mixtapes')} 
                className="btn btn-primary flex gap-2 items-center"
              >
                <Music className="w-5 h-5 mr-2" />
                Explore Mixtapes
              </button>
              <button 
                onClick={() => scrollToSection('upcoming-events')} 
                className="btn btn-secondary flex gap-2 items-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Live
              </button>
            </div>
          </div>

          <div className="h-[600px]">
            <MixtapeGrid mixtapes={[featuredMixtape]} singleDisplay={true} />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Featured Artists</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredArtists.map((artist, index) => (
              <ArtistCard key={index} artist={artist} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;