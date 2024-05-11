import { useQuery } from "@tanstack/react-query";
import React from "react";
import Youtube from "../api/youtube";
import { IVideo } from "../interface";
import VideoCard from "./VideoCard";

interface IRelatedVideosProps {
  id: string;
  categoryId: string;
}

export default function RelatedVideos({ id, categoryId }: IRelatedVideosProps) {
  const youtube = new Youtube();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["related", id], () => youtube.mostPopular(), {
    staleTime: 1000 * 60 * 5,
  });

  console.log(videos);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>error</p>}
      <ul className="basis-2/6 lg:mt-24">
        {videos?.map((video: IVideo) => (
          <VideoCard type="related" video={video} key={video.id} />
        ))}
      </ul>
    </>
  );
}
