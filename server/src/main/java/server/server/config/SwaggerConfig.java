package server.server.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI WebOsAPI() {

        Info info = new Info()
                .title("Webos Yonsei")
                .description("Webos Yonsei API 명세서")
                .version("1.0.0");

        String sessionSchemeName = "Authorization";

        // SecuritySchemes 등록
        Components components = new Components()
                .addSecuritySchemes(sessionSchemeName, new SecurityScheme()
                        .name(sessionSchemeName)
                        .type(SecurityScheme.Type.APIKEY) // API Key 방식
                        .in(SecurityScheme.In.HEADER) // 헤더에 포함
                        .name("Authorization")); // 헤더 이름

        return new OpenAPI()
                .addServersItem(new Server().url("/"))
                .info(info)
                .addSecurityItem(new SecurityRequirement().addList(sessionSchemeName))
                .components(components);
    }
}
