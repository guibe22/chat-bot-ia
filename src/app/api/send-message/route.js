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
            "${message}
          
            Actúa como un experto en la **Ley No. 63-17** de Movilidad, Transporte Terrestre, Tránsito y Seguridad Vial de la República Dominicana.  
            **Reglas para tus respuestas:**
            - **Debes basarte únicamente** en las disposiciones de esta ley, sin incluir información de otras fuentes o leyes.
            - Si la pregunta no es relevante para la Ley No. 63-17, responde con:  
              *"Disculpa, pero solo estoy diseñado para responder sobre las leyes de tránsito de la República Dominicana."* (puedes parafrasear).
            - Si el usuario envía mensajes genéricos como "Hola" o "Buenos días", responde con:  
              *"Hola, ¿en qué puedo ayudarte con las leyes de tránsito?"*  
            - Para más detalles, puedes consultar el texto completo de la ley en el siguiente enlace:  
              https://intrant.gob.do/phocadownload/SobreNosotros/MarcoLegal/Leyes/MARCO%20LEGAL-LEY%2063-17%20SOBRE%20TRANSITO,%20TRANSPORTE,%20Y%20SEGURIDAD%20VIAL.pdf  
            "
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
