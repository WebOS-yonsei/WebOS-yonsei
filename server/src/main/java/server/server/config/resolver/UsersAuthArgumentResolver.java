package server.server.config.resolver;

import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import server.server.entity.Session;
import server.server.repository.SessionRepository;

import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Component
public class UsersAuthArgumentResolver implements HandlerMethodArgumentResolver {

    private final SessionRepository sessionRepository;

    @Override
    public boolean supportsParameter(final MethodParameter parameter) {
        return parameter.getParameterType()
                .equals(UsersAuth.class);
    }

    @Override
    public Object resolveArgument(final MethodParameter parameter, final ModelAndViewContainer mavContainer, final NativeWebRequest webRequest, final WebDataBinderFactory binderFactory) throws Exception {
        final String sessionId = webRequest.getHeader(HttpHeaders.AUTHORIZATION);
        System.out.println("sessionId = " + sessionId);
        final Session session = sessionRepository.findById(Long.parseLong(sessionId)).orElseThrow(NoSuchElementException::new);
        final Long userId = session.getUserId();
        System.out.println("userId = " + userId);
        return new UsersAuth(userId);
    }
}
