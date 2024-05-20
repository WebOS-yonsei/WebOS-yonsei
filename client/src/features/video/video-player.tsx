import Hls from 'hls.js';
import { useEffect, useRef } from 'react';
import { assert } from '~/utils';

export function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    assert(video !== null, 'videoRef가 비어있음');

    let hls: Hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.FRAG_LOADED, () => {
        // TODO: send to server
        // eslint-disable-next-line no-console
        console.log('>>> current time: ', video.currentTime);
      });
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        navigator.mediaDevices.getUserMedia({ video: true }).then(() => {
          video.play();
        });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    }

    return () => hls?.destroy();
  }, [src]);

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video ref={videoRef} controls />;
}
