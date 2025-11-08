package src;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
// Removed unused imports Content and Part for cleaner code
import java.util.Scanner;

public class MoodPlaylistGenerator {

    public static void main(String[] args) {
        // 1. Initialize the Gemini Client
        // It automatically looks for the GEMINI_API_KEY environment variable.
        Client client = Client.builder().build(); 

        Scanner input = new Scanner(System.in);
        System.out.println("🎶 Mood Playlist Creator 🎶");
        
        // 2. Get User Input
        System.out.println("What mood are you in right now? (e.g., Happy, Relaxed, Pumped Up, Melancholy)");
        String mood = input.nextLine();
        
        // 3. Construct the AI Prompt
        // A System Instruction guides the AI to output a specific format.
        String systemInstruction = 
            "You are a sophisticated music recommendation bot. Your only task is to generate a playlist of 5 songs. " +
            "For each song, provide only the song title followed by 'by' and the artist name. " +
            "List each song on a new line. Do NOT include any introductory or concluding text, track numbers, or extra formatting.";
        
        String userPrompt = "Create a playlist of 5 songs for a **" + mood + "** mood.";
        
        System.out.println("\nThinking up some tunes for your " + mood + " mood...");

        try {
            // 4. Call the Gemini API
            GenerateContentResponse response = client.models.generateContent(
                "gemini-2.5-flash", 
                userPrompt,
                null, // No tools needed
                null, // No configuration needed
                null, // No safety settings needed
                null, // No image data needed
                systemInstruction // Crucial for getting a clean response
            );

            // 5. Output the Playlist
            System.out.println("\n---  Your " + mood.toUpperCase() + " Playlist 🎧 ---");
            System.out.println(response.text());
            System.out.println("----------------------------------------");
            System.out.println("Enjoy the music!");

        } catch (Exception e) {
            System.err.println("\n An error occurred while generating the playlist.");
            System.err.println("Ensure your GEMINI_API_KEY environment variable is set correctly.");
            // Print the full stack trace for debugging purposes
            // e.printStackTrace(); 
        } finally {
            input.close();
        }
    }
}