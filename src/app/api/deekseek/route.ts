export async function GET() {
    const res = await fetch('https://api.deepseek.com/user/balance', {
        headers: { 
            'Accept': 'application/json', 
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
    })
    const data = await res.json()
   
    return Response.json(data)
  }