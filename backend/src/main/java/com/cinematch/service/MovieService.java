package com.cinematch.service;

import com.cinematch.client.TmdbClient;
import com.cinematch.dto.MovieDto;
import com.cinematch.dto.TmdbSearchResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    private final TmdbClient tmdbClient;
    private final String imageBaseUrl;

    public MovieService(TmdbClient tmdbClient, @Value("${tmdb.image.base-url}") String imageBaseUrl) {
        this.tmdbClient = tmdbClient;
        this.imageBaseUrl = imageBaseUrl;
    }

    public List<MovieDto> searchMovies(String query) {
        TmdbSearchResponse resp = tmdbClient.searchMovies(query);
        if (resp == null || resp.results == null) return List.of();

        return resp.results.stream()
                .map(r -> new MovieDto(
                        r.title,
                        r.overview,
                        r.posterPath != null ? imageBaseUrl + r.posterPath : null,
                        r.releaseDate,
                        r.popularity
                )).collect(Collectors.toList());
    }
}
