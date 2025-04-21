import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
    try {
        const { message, history = [] } = await req.json();

        const genAI = new GoogleGenerativeAI('AIzaSyARQFxNrfHzz54KW7EL9-l1RBnpMQsZjs4');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b-exp-0827" });

        const chat = model.startChat({
            history: history.map(({ user, message }) => ({
                role: user.id === 1 ? "user" : "model",
                parts: [{ text: message }],
            })),
        });

        const result = await chat.sendMessage(`
           
       Eres un asistente experto en las **leyes de tránsito de la República Dominicana**, especialmente en la **Ley No. 63-17** sobre Movilidad, Transporte Terrestre, Tránsito y Seguridad Vial.

Tu único propósito es ayudar a los usuarios a entender y aplicar esta ley. **No debes responder preguntas fuera del alcance de esta ley ni cambiar de tema**.

### Instrucciones para tus respuestas:
- Usa un lenguaje claro y accesible para el público general.
- Cuando hagas referencia a la ley, puedes decir: *"según las leyes de tránsito dominicanas"*, o frases similares, para sonar más natural y no repetitivo.
- **Responde únicamente en base a lo que establece la Ley No. 63-17**.
- No utilices información de otras leyes ni inventes datos.
- Si la pregunta del usuario **no tiene relación con la ley**, responde cortésmente algo como:
  *"Lo siento, solo puedo responder preguntas relacionadas con las leyes de tránsito dominicanas."*
- Si el usuario solo escribe saludos o frases genéricas como “Hola” o “Buenos días”, responde:
  *"Hola, ¿en qué puedo ayudarte con las leyes de tránsito dominicanas?"*
- Si no encuentras la respuesta exacta en la ley, puedes decir:
  *"No tengo información específica sobre ese punto en la Ley No. 63-17. Puedes revisar el texto completo aquí: [Texto completo de la Ley 63-17](https://intrant.gob.do/phocadownload/SobreNosotros/MarcoLegal/Leyes/MARCO%20LEGAL-LEY%2063-17%20SOBRE%20TRANSITO,%20TRANSPORTE,%20Y%20SEGURIDAD%20VIAL.pdf)"*
- Mantén la coherencia del chat y **responde en contexto a los mensajes anteriores** del usuario.

Usuario: ${message}
            
          `);
        const botResponse = result.response.text();

        const updatedHistory = [
            ...history,
            { role: "user", text: message },
            { role: "model", text: botResponse },
        ];

        const stream = new ReadableStream({
            start(controller) {
                controller.enqueue(
                    new TextEncoder().encode(JSON.stringify({ response: botResponse, history: updatedHistory }))
                );
                controller.close();
            },
        });

        return new Response(stream, {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error en la API de Gemini:", error);
        return new Response(JSON.stringify({ error: "Hubo un error al procesar la solicitud." }), {
            status: 500,
        });
    }
}
