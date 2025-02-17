import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req) {
    

    try {
        const { message, history = [] } = await req.json();
        const genAI = new GoogleGenerativeAI('AIzaSyARQFxNrfHzz54KW7EL9-l1RBnpMQsZjs4');

        
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
    
        const chat = model.startChat({
            history: history.map(({ user, message }) => ({
              role: user.id === 1 ? 'user' : 'model', 
              parts: [{ text: message }], 
            })),
          });
   

       
        const result = await chat.sendMessage(message);
        const botResponse = result.response.text();


        const updatedHistory = [
            ...history,
            { role: "user", text: message },
            { role: "model", text: botResponse },
        ];

        
        return new Response(
            JSON.stringify({
                response: result.response.text(),
                history: updatedHistory
            }),
            { status: 200 }
        );
        
    } catch (error) {
        console.error("Error en la API de Gemini:", error);
        return new Response(
            JSON.stringify({ error: "Hubo un error al procesar la solicitud." }),
            { status: 500 }
        );
    }
}
