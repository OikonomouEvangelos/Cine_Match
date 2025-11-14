package com.cinematch.exception;

public class ExternalApiException extends RuntimeException {
    public ExternalApiException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
