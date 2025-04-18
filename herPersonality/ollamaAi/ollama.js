import axios from "axios";

export const getOllamaResponse = async (userMessage) => {
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "mistral", // or another model you’ve pulled
      prompt: userMessage,
      stream: false,
    });

    return response.data.response;
  } catch (error) {
    console.error("Ollama error:", error.message);
    return "Sorry babe, I'm having trouble thinking right now 😢";
  }
};
