import { MultiWaveRing, FlowerShoots } from '@/utils/import/lazyComponentsAnimations.js';

function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-10">
        <FlowerShoots />
      </div>
      <div className="fixed inset-0 z-20">
        <canvas id="smoky-ring" className="w-full h-full"></canvas>
        <MultiWaveRing canvasId="smoky-ring" />
      </div>
    </div>
  );
}

export default Home;
