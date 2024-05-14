package server.server.api.response;

import jakarta.persistence.Enumerated;
import server.server.entity.Grade;

public record ProfileResponse(Long id, Long userId, String nickname, String imageURI, Grade grade, String password) {
}
