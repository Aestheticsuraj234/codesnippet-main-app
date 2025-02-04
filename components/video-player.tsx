export function VideoPlayer({ videoId }: { videoId: string }) {
    return (
      <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-2xl border-2 border-emerald-400">
        <iframe
          className="absolute top-0 left-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Course Preview"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    )
  }
  
  