import React from "react";

function HeroSection() {
  return (
    <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
      <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        {/* HERO CAPTION */}
        <div className="sm:max-w-lg">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Computer Beaver
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Collect your parts to become a ASSEMBLER of a desktop computer.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
