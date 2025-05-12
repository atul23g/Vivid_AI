'use server'

export const generateCreativePrompt = async (userPrompt: string) => {
  const finalPrompt = `
Create a coherent and relevant outline for the following prompt: ${userPrompt}.
The outline should consist of at least 6 points, with each point written as a single sentence.
Ensure the outline is well-structured and directly related to the topic.
Return only the JSON in the following format:

{
  "outlines": [
    "Point 1",
    "Point 2",
    "Point 3",
    "Point 4",
    "Point 5",
    "Point 6"
  ]
}
`

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI that responds only with valid JSON."
          },
          {
            role: "user",
            content: finalPrompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.2
      })
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;

    if (content) {
      // Ensure it parses correctly
      const parsed = JSON.parse(content);
      return { status: 200, data: parsed };
    }

    return { status: 400, error: "No content returned from Groq" };
  } catch (error) {
    console.error("🔴 ERROR:", error);
    return { status: 500, error: "Internal server error" };
  }
}