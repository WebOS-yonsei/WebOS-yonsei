// @ts-ignore
import Hls from 'hls.js';
import { useEffect, useRef } from 'react';
import { assert } from '~/utils';

export function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    assert(videoRef.current !== null, 'videoRef가 비어있음');

    let hls: Hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
    }
    // HLS.js is not supported on platforms that do not have Media Source
    // Extensions (MSE) enabled.
    //
    // When the browser has built-in HLS support (check using `canPlayType`),
    // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
    // element through the `src` property. This is using the built-in support
    // of the plain video element, without using HLS.js.
    else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = src;
    }

    return () => hls?.destroy();
  }, [src]);

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video ref={videoRef} controls />;
}
