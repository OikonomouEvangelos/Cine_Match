package com.cinematch.dto;

public record MovieDto(
        String title,
        String overview,
        String posterUrl,
        String releaseDate,
        Double popularity
) {}
