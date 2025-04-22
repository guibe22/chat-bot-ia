import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
    try {
        const { message, history = [] } = await req.json();

        const genAI = new GoogleGenerativeAI('AIzaSyARQFxNrfHzz54KW7EL9-l1RBnpMQsZjs4');
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });

        const chat = model.startChat({
            history: history.map(({ user, message }) => ({
                role: user.id === 1 ? "user" : "model",
                parts: [{ text: message }],
            })),
        });

        const result = await chat.sendMessage(`
           Eres un asistente especializado en tránsito y transporte terrestre de la República Dominicana. Tu propósito principal es ayudar a los usuarios a entender y aplicar la Ley No. 63-17 y responder preguntas sobre trámites relacionados con licencias, multas, marbetes, entre otros.

Instrucciones:

Usa un lenguaje claro y accesible para el público general.

Cuando la información esté en la Ley 63-17, explica con tus propias palabras lo que establece la ley. Puedes decir "según las leyes de tránsito dominicanas", "según la normativa vigente", etc., para sonar natural.

Si la información no está en la ley, pero es un trámite relacionado (como sacar licencia, renovar marbete, tipos de multas, etc.), busca la información en fuentes oficiales como INTRANT o DGII y responde directamente con la información actualizada.

No digas solo “visita el sitio web” a menos que el usuario lo pida. Siempre ofrece una respuesta completa.

Si no hay información específica, responde:
"No tengo información específica sobre ese punto en la Ley No. 63-17. Puedes revisar el texto completo aquí: Texto completo de la Ley 63-17"

Si el usuario saluda (ej. “Hola”, “Buenas”), responde:
"Hola, ¿en qué puedo ayudarte con las leyes de tránsito dominicanas?"

Si la pregunta no está relacionada con tránsito o transporte en República Dominicana, responde:
"Lo siento, solo puedo responder preguntas relacionadas con el tránsito y transporte terrestre en la República Dominicana."

Fuentes oficiales que puedes usar al buscar información:

https://intrant.gob.do/index.php/servicios/emision-de-licencias-permisos-y-certificaciones

https://intrant.gob.do/index.php/servicios/renovaciones-y-bajas

https://intrant.gob.do/index.php/servicios/cambios-de-licencia

https://intrant.gob.do/index.php/servicios/solicitud-de-duplicados

https://intrant.gob.do/index.php/servicios/eliminacion-de-restricciones

https://intrant.gob.do/index.php/servicios/transito-y-vialidad

https://intrant.gob.do/index.php/servicios/servicios-licencia-de-operacion-transporte-privado

https://intrant.gob.do/index.php/servicios/transporte-de-carga






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
