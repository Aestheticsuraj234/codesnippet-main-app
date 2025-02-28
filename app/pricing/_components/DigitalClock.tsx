"use client";
import React, { useEffect, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

// @ts-ignore
const DigitalClock = ({ endDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="mt-5 flex flex-row justify-between items-center w-full gap-2">
      <div className="h-15 w-12 rounded-xl bg-zinc-800 font-extrabold text-white text-center flex justify-center items-center flex-col">
      {/* @ts-ignore */}
        {timeLeft.days || '00'}
        <span className="text-xs">Days</span>
      </div>

      <div className="h-12 w-12 rounded-xl bg-zinc-800 font-extrabold text-white text-center flex justify-center items-center flex-col">
       {/* @ts-ignore */}
        {timeLeft.hours || '00'}
        <span className="text-xs">Hours</span>
      </div>

      <div className="h-12 w-12 rounded-xl bg-zinc-800 font-extrabold text-white text-center flex justify-center items-center flex-col">
        {/* @ts-ignore */}
        {timeLeft.minutes || '00'}
        <span className="text-xs">Mins</span>
      </div>

      <div className="h-12 w-12 rounded-xl bg-zinc-800 font-extrabold text-white text-center flex justify-center items-center flex-col">
       {/* @ts-ignore */}
        {timeLeft.seconds || '00'}
        <span className="text-xs">Secs</span>
      </div>
    </div>
  );
}

export default DigitalClock;
