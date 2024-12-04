import React from 'react';
import { Music, ExternalLink } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei';
import { HexagonMesh } from './MixtapeGrid';

const contributingArtists = [
  {
    name: "Kathleen Edwards",
    image: "https://firebasestorage.googleapis.com/v0/b/subway-musician-564bd.appspot.com/o/aminy-generation%2Fminy-96b5c368-b0fe-4f02-8d6f-d42c9bfd111f?alt=media&token=e42cfb4b-356e-44d6-9a3f-5a8ddd375063",
    description: "Featuring Lauren Morrow",
    link: "https://go.minyvinyl.com/kathleen"
  },
  {
    name: "Ringo Starr",
    image: "https://firebasestorage.googleapis.com/v0/b/subway-musician-564bd.appspot.com/o/aminy-generation%2Fminy-d0257d4a-bcbc-49ad-8109-45a8d4242642?alt=media&token=f6e9a94c-87cc-4d9f-8837-43f1699d15f7",
    description: "Featuring Alison Krauss",
    link: "https://go.minyvinyl.com/ringo"
  },
  {
    name: "Holy Pinto",
    image: "https://firebasestorage.googleapis.com/v0/b/subway-musician-564bd.appspot.com/o/aminy-generation%2Fminy-e2ce0f70-02c8-498b-8916-9d75be819de1?alt=media&token=0780b6de-d152-4ee6-8f70-8edd01dacc77",
    description: "Exclusive mixtape curator",
    link: "https://go.minyvinyl.com/holy"
  }
];

const ArtistCard = ({ artist }: { artist: typeof contributingArtists[0] }) => (
  <div className="relative h-[400px] bg-neutral-800 rounded-xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
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

    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
      <h3 className="text-xl font-bold text-white mb-2">{artist.name}</h3>
      <p className="text-gray-300 text-sm mb-4">{artist.description}</p>
      <a
        href={artist.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 btn btn-primary"
      >
        <Music className="w-4 h-4" />
        Listen Now
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  </div>
);

const ArtistMixtapes = () => {
  return (
    <section className="py-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Artist Curated Mixtapes</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Exclusive collections curated by our featured artists
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contributingArtists.map((artist, index) => (
            <ArtistCard key={index} artist={artist} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistMixtapes;