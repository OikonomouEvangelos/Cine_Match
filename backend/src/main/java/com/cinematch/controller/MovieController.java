package com.cinematch.controller;

import com.cinematch.dto.MovieDto;
import com.cinematch.service.MovieService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @Operation(summary = "Search movies by query (uses TMDb)")
    @GetMapping("/search")
    public ResponseEntity<List<MovieDto>> search(@RequestParam("query") String query) {
        var list = movieService.searchMovies(query);
        return ResponseEntity.ok(list);
    }
}
