package com.EduManage.api_gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.List;


@Configuration
public class CorsConfig {

        @Bean
        public CorsWebFilter corsWebFilter() {
            CorsConfiguration config = new CorsConfiguration();

            // Allow only your Angular app
            config.setAllowedOrigins(List.of("http://localhost:4200"));

            // Allow all necessary methods
            config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

            // Allow all headers
            config.setAllowedHeaders(List.of("*"));

            // Allow credentials (cookies/tokens)
            config.setAllowCredentials(true);

            // Register the config for all routes
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", config);

            return new CorsWebFilter(source);
        }
}
