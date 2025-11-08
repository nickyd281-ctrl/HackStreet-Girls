package com.gemini.cli;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import java.util.Scanner;

public class GenerateTextFromTextInput {
    public static void main(String[] args) {
        // The client gets the API key from the environment variable `GEMINI_API_KEY`.
        Client client = Client.builder().apiKey("").build(); // <---- Enter API KEY in the apiKey() function

        Scanner input = new Scanner(System.in);
        System.out.println("Enter a prompt:");
        String prompt = input.nextLine();

        GenerateContentResponse response = client.models.generateContent(
                "gemini-2.5-flash",
                prompt,
                null);

        System.out.println(response.text());
    }
}