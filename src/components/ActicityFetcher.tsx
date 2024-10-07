import React from "react";

interface ActivityFetcherProps {
  activity: string;
}

const ActivityFetcher: React.FC<ActivityFetcherProps> = ({ activity }) => {
  return (
    <div className="p-4 bg-white  text-black flex flex-col justify-center items-center h-full">
      <h1 className="text-5xl font-bold mb-4 text-center">Activitat:</h1>
      <h1 className="text-3xl font-bold mb-4 text-center">{activity}</h1>
    </div>
  );
};

export default ActivityFetcher;
