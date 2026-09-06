import { VideoPlay } from "iconsax-react";

const ItemsLoading = () => {
  return (
    <div className="w-full">
      {/* Top micro loading status bar */}
      <div className="flex flex-col items-center justify-center my-4 animate-fade-in">
        <div className="h-1 w-32 bg-white/10 rounded-full overflow-hidden relative">
          <div className="absolute inset-y-0 bg-fuelYellow w-1/2 rounded-full animate-[shimmer_1.2s_infinite]" />
        </div>
      </div>

      {/* Grid of Skeleton Cards with Shimmer */}
      <div className="flex flex-wrap justify-center paddings !pt-0">
        {Array.from(Array(15).keys()).map((idx) => (
          <div
            key={idx}
            className="w-64 h-96 bg-[#16151a] border border-white/10 m-5 rounded-2xl overflow-hidden relative shadow-xl animate-shimmer flex flex-col justify-between"
          >
            {/* Poster area placeholder with subtle film icon */}
            <div className="w-full h-full flex flex-col items-center justify-center text-white/10">
              <VideoPlay size={44} aria-hidden="true" className="animate-pulse" />
            </div>

            {/* Bottom info panel matching real card layout */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
              {/* Title bar */}
              <div
                className="h-4 bg-white/15 rounded-md mb-2 animate-pulse"
                style={{ width: `${60 + (idx % 4) * 10}%` }}
              />
              {/* Meta & Rating badge */}
              <div className="flex items-center justify-between mt-3">
                <div className="h-5 w-14 bg-fuelYellow/20 border border-fuelYellow/30 rounded-lg flex items-center justify-center">
                  <div className="h-2 w-6 bg-fuelYellow/50 rounded-sm" />
                </div>
                <div className="h-3 w-16 bg-white/10 rounded-sm" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsLoading;
