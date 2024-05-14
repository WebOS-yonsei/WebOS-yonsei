package server.server.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.server.application.ContentsService;

@RestController
@RequestMapping("/videos")
public class ContentsApiController {
    private final ContentsService contentsService;

}
