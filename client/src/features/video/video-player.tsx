import Hls from 'hls.js';
import { useEffect, useRef } from 'react';
import { assert } from '~/utils';
import { useUser } from '../user';
import { client } from '../@api';

export function VideoPlayer({ src, videoId, time = 0 }: { src: string; videoId: number; time?: number }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const profileId = useUser((state) => state.profileId);

  assert(profileId, 'profileId가 비어있음');

  useEffect(() => {
    const video = videoRef.current;
    assert(video !== null, 'videoRef가 비어있음');

    let hls: Hls;

    const isM3u8 = src.endsWith('.m3u8');

    if (isM3u8 && Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        navigator.mediaDevices.getUserMedia({ video: true }).then(() => {
          video.play();
        });
      });
    } else {
      video.src = src;
      navigator.mediaDevices.getUserMedia({ video: true }).then(() => {
        video.play();
      });
    }

    const onBeforeUnload = () =>
      client.POST('/videos/{videoId}/time/{profileId}', {
        params: {
          path: {
            videoId,
            profileId,
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

    const onLoadedMetadata = () => {
      video.currentTime = time;
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      hls?.destroy();
      onBeforeUnload();
      window.removeEventListener('beforeunload', onBeforeUnload);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [src, time, profileId, videoId]);

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video ref={videoRef} controls />;
}
