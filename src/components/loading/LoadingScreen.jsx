const LoadingScreen = ({ progress }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-custom-radial z-50">
      <div className="text-white text-4xl font-space-game">
        <div className="animate-pulse">Loading... {progress}%</div>
        <div className="mt-4 w-64 h-2 bg-gray-200 rounded-full">
          <div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
