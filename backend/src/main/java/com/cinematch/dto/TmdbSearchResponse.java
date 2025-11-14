package com.cinematch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class TmdbSearchResponse {
    @JsonProperty("results")
    public List<Result> results;

    public static class Result {
        public String title;
        public String overview;
        @JsonProperty("poster_path")
        public String posterPath;
        @JsonProperty("release_date")
        public String releaseDate;
        public Double popularity;
    }
}
