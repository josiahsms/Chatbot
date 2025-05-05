export default async function handler(req, res) {
  const { message } = req.body;

  const apiKey = process.env.CHATBOT_API_KEY;
  const apiEndpoint = 'https://api.openai.com/v1/completions';

  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: \`Bearer \${apiKey}\`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: message,
      max_tokens: 150,
    }),
  });

  const data = await response.json();
  res.status(200).json({ reply: data.choices[0].text.trim() });
}