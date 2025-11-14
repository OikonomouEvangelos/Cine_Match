package com.cinematch.client;

import com.cinematch.dto.TmdbSearchResponse;
import com.cinematch.exception.ExternalApiException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class TmdbClient {

    private final RestTemplate restTemplate;
    private final String apiKey;
    private final String baseUrl;

    public TmdbClient(RestTemplate restTemplate,
                      @Value("${tmdb.api.key}") String apiKey,
                      @Value("${tmdb.base.url}") String baseUrl) {
        this.restTemplate = restTemplate;
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    public TmdbSearchResponse searchMovies(String query) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/search/movie")
                    .queryParam("api_key", apiKey)
                    .queryParam("query", query)
                    .toUriString();

            return restTemplate.getForObject(url, TmdbSearchResponse.class);
        } catch (Exception ex) {
            throw new ExternalApiException("Failed to call TMDb: " + ex.getMessage(), ex);
        }
    }
}
