import Hls from 'hls.js';
import { useEffect, useRef } from 'react';
import { assert } from '~/utils';
import { useUser } from '../user';
import { client } from '../@api';
import { useCallbackRef } from '~/hooks';

export function VideoPlayer({ src, videoId }: { src: string; videoId: number }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const profileId = useUser((state) => state.profileId);
  const sessionId = useUser((state) => state.sessionId);

  assert(profileId, 'profileId가 비어있음');
  assert(sessionId, 'sessionId가 비어있음');

  const recordPlayingTime = useCallbackRef((time: number) => {
    client.POST('/videos/{videoId}/time/{profileId}', {
      params: {
        path: {
          videoId,
          profileId,
        },
        query: {
          user: {
            sessionId,
          },
        },
      },
      body: {
        time,
      },
    });
  });

  useEffect(() => {
    const video = videoRef.current;
    assert(video !== null, 'videoRef가 비어있음');

    let hls: Hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.FRAG_PARSED, () => {
        recordPlayingTime(video.currentTime);
      });
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        navigator.mediaDevices.getUserMedia({ video: true }).then(() => {
          video.play();
        });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    }

    const onVideoEnded = () => recordPlayingTime(video.duration);

    video.addEventListener('ended', onVideoEnded);

    return () => {
      hls?.destroy();
      video.removeEventListener('ended', onVideoEnded);
    };
  }, [src, recordPlayingTime]);

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video ref={videoRef} controls />;
}
