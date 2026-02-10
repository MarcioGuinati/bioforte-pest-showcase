import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Você é um especialista em controle de pragas e escreve artigos de blog para a empresa Bioforte Controle de Pragas e Ambiental. 
            
Suas respostas devem ser em português brasileiro e no formato JSON com a seguinte estrutura:
{
  "title": "Título do artigo",
  "excerpt": "Resumo curto do artigo (máximo 200 caracteres)",
  "content": "Conteúdo completo do artigo em formato markdown",
  "image_keywords": "2-3 palavras-chave em inglês para buscar imagem (ex: cockroach pest control, rat extermination)"
}

O conteúdo deve ser informativo, profissional e educativo, focando em:
- Prevenção de pragas
- Métodos de controle
- Saúde e segurança
- Dicas práticas para residências e empresas

Use formatação markdown no content: títulos (##), listas, negrito, etc.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content received from AI");
    }

    // Try to parse the JSON response
    let parsedContent;
    try {
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedContent = JSON.parse(cleanContent);
    } catch {
      // If parsing fails, create a structured response from the raw content
      parsedContent = {
        title: "Artigo Gerado",
        excerpt: content.substring(0, 200),
        content: content
      };
    }

    // Search for a cover image using Pexels
    let coverImageUrl = "";
    const keywords = parsedContent.image_keywords || "pest control";
    try {
      const pexelsRes = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(keywords)}&per_page=3&orientation=landscape`,
        { headers: { Authorization: "7aNKqoYMRFHFy3C2ib02T5VmfJfMKsJHEdLnFAPpy5Z0aJ0pP7mJCdKy" } }
      );
      if (pexelsRes.ok) {
        const pexelsData = await pexelsRes.json();
        if (pexelsData.photos && pexelsData.photos.length > 0) {
          coverImageUrl = pexelsData.photos[0].src.original;
        }
      }
    } catch (e) {
      console.error("Pexels search error:", e);
    }

    if (!coverImageUrl) {
      coverImageUrl = "https://images.unsplash.com/photo-1585071550721-fdb362ae2b8d?w=1200&h=630&fit=crop&auto=format&fm=jpg";
    }

    parsedContent.cover_image_url = coverImageUrl;

    return new Response(
      JSON.stringify(parsedContent),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
