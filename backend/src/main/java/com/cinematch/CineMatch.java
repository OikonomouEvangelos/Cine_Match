package com.cinematch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CineMatchApplication {

    public static void main(String[] args) {
        SpringApplication.run(CineMatchApplication.class, args);
        System.out.println("\n🎬 CineMatch backend is now running...");
        System.out.println("API Docs available at: http://localhost:8080/swagger-ui.html\n");
    }
}
