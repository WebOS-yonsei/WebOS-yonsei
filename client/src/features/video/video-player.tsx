import Hls from 'hls.js';
import { useEffect, useRef } from 'react';
import { assert } from '~/utils';
import { client } from '../@api';

export function VideoPlayer({ src, videoId, time = 0 }: { src: string; videoId: number; time?: number }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    assert(video !== null, 'videoRef가 비어있음');

    let hls: Hls;

    const isM3u8 = src.endsWith('.m3u8');

    if (isM3u8 && Hls.isSupported()) {
      hls = new Hls({
        startPosition: time,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        navigator.mediaDevices.getUserMedia({ video: true }).then(() => {
          video.play();
        });
      });
    } else {
      video.src = src;
      video.currentTime = time;
      navigator.mediaDevices.getUserMedia({ video: true }).then(() => {
        video.play();
      });
    }

    const onBeforeUnload = () =>
      client.POST('/videos/{videoId}/time', {
        params: {
          path: {
            videoId,
          },
          query: {
            user: {},
          },
        },
        body: {
          time: video.currentTime,
        },
      });

    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      hls?.destroy();
      onBeforeUnload();
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [src, time, videoId]);

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video ref={videoRef} controls />;
}
