import React from "react";

const HowItWorks = () => {
  const videoId = "4Xh9DLUQCWs"; // Directly assign the video ID

  return (
    <section id="howitworks" className="container mx-auto px-4 py-8 mt-10">
      <h1 className="text-4xl font-bold text-[#1A1818] dark:text-[#ffffff] text-center mb-5">
        How It <span className="text-[#08BD80]">Works</span>
      </h1>
      <div className="w-full max-w-3xl mx-auto">
        <div className="relative pb-[56.25%] h-0">
          <iframe
            className="absolute top-0 left-0 h-full w-full rounded-lg  border-2 border-[#08BD80]"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Course Preview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
