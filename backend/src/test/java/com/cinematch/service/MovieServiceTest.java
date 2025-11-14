package com.cinematch.service;

import com.cinematch.client.TmdbClient;
import com.cinematch.dto.TmdbSearchResponse;
import com.cinematch.dto.TmdbSearchResponse.Result;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class MovieServiceTest {

    @Test
    void searchMovies_returnsMappedDtos() {
        TmdbClient mockClient = Mockito.mock(TmdbClient.class);

        TmdbSearchResponse resp = new TmdbSearchResponse();
        Result r = new Result();
        r.title = "Test Movie";
        r.overview = "Overview";
        r.posterPath = "/poster.jpg";
        r.releaseDate = "2020-01-01";
        r.popularity = 5.5;
        resp.results = List.of(r);

        Mockito.when(mockClient.searchMovies("test")).thenReturn(resp);

        MovieService svc = new MovieService(mockClient, "https://image.tmdb.org/t/p/w500");
        var dtos = svc.searchMovies("test");

        assertEquals(1, dtos.size());
        var dto = dtos.get(0);
        assertEquals("Test Movie", dto.title());
        assertEquals("https://image.tmdb.org/t/p/w500/poster.jpg", dto.posterUrl());
    }
}
