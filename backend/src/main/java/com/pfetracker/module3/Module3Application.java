package com.pfetracker.module3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class Module3Application {
    public static void main(String[] args) {
        SpringApplication.run(Module3Application.class, args);
    }
}
