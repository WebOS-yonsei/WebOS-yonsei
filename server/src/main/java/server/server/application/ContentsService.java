package server.server.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.server.entity.Contents;
import server.server.entity.ProfileContents;
import server.server.repository.ContentsRepository;
import server.server.repository.ProfileContentsRepository;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ContentsService {
    private final ContentsRepository contentsRepository;
    private final ProfileContentsRepository profileContentsRepository;

    // contents list 조회
    public List<Contents> getContents() {

        List<Contents> ContentsList = contentsRepository.findAll();
        if (ContentsList.isEmpty()) {
            throw new NoSuchElementException("There's no Content");
        }

        return ContentsList;
    }

    // 시청 시간 기록
    public void recordTime(Long profileId, Long videoId, float time){
        ProfileContents profileContent = profileContentsRepository.findByProfileIdAndContentsId(profileId, videoId)
                .orElseThrow(() -> new NoSuchElementException("해당 컨텐츠는 존재하지 않습니다"));
        profileContent.setTime(time);
        profileContentsRepository.save(profileContent);
    }

    // 특정 비디오 설명 가져오기
    public Contents getContentInfo(Long videoId){
        return contentsRepository.findById(videoId).orElseThrow(NoSuchElementException::new);
    }
}
