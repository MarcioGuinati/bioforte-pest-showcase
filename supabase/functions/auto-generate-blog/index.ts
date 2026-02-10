import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const FIREBASE_PROJECT_ID = "cleber-702d3";
const FIREBASE_API_KEY = "AIzaSyCFZow8OnO2hBD8y_jtyQY0NZdM-vRdM9c";

const DAYS_MAP: Record<number, string> = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
};

async function firestoreGet(path: string) {
  const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/${path}?key=${FIREBASE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Firestore GET error: ${res.status} ${text}`);
  }
  return res.json();
}

function parseFirestoreValue(value: any): any {
  if (value.stringValue !== undefined) return value.stringValue;
  if (value.booleanValue !== undefined) return value.booleanValue;
  if (value.integerValue !== undefined) return parseInt(value.integerValue);
  if (value.doubleValue !== undefined) return value.doubleValue;
  if (value.timestampValue !== undefined) return value.timestampValue;
  if (value.mapValue) {
    const result: Record<string, any> = {};
    for (const [k, v] of Object.entries(value.mapValue.fields || {})) {
      result[k] = parseFirestoreValue(v);
    }
    return result;
  }
  if (value.arrayValue) {
    return (value.arrayValue.values || []).map(parseFirestoreValue);
  }
  return null;
}

function toFirestoreValue(val: any): any {
  if (typeof val === "string") return { stringValue: val };
  if (typeof val === "boolean") return { booleanValue: val };
  if (typeof val === "number") return Number.isInteger(val) ? { integerValue: String(val) } : { doubleValue: val };
  if (val instanceof Date) return { timestampValue: val.toISOString() };
  if (Array.isArray(val)) return { arrayValue: { values: val.map(toFirestoreValue) } };
  if (val && typeof val === "object") {
    const fields: Record<string, any> = {};
    for (const [k, v] of Object.entries(val)) {
      fields[k] = toFirestoreValue(v);
    }
    return { mapValue: { fields } };
  }
  return { nullValue: null };
}

async function firestoreCreate(collectionPath: string, data: Record<string, any>) {
  const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/${collectionPath}?key=${FIREBASE_API_KEY}`;
  const fields: Record<string, any> = {};
  for (const [k, v] of Object.entries(data)) {
    fields[k] = toFirestoreValue(v);
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Firestore CREATE error: ${res.status} ${text}`);
  }
  return res.json();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Read schedule config from Firestore
    const configDoc = await firestoreGet("blog_schedule_config/main");
    
    if (!configDoc.fields) {
      return new Response(
        JSON.stringify({ message: "No schedule config found" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const enabled = parseFirestoreValue(configDoc.fields.enabled);
    if (!enabled) {
      return new Response(
        JSON.stringify({ message: "Automation is disabled" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get today's day of week (Brazil timezone UTC-3)
    const now = new Date();
    const brazilOffset = -3 * 60;
    const brazilTime = new Date(now.getTime() + (brazilOffset + now.getTimezoneOffset()) * 60000);
    const dayKey = DAYS_MAP[brazilTime.getDay()];

    const topicsByDay = parseFirestoreValue(configDoc.fields.topics_by_day);
    const todayTopics = topicsByDay?.[dayKey] || [];

    if (todayTopics.length === 0) {
      return new Response(
        JSON.stringify({ message: `No topics for ${dayKey}` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Pick a random topic
    const topic = todayTopics[Math.floor(Math.random() * todayTopics.length)];

    // Generate content using Lovable AI
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const prompt = `Escreva um artigo completo e detalhado sobre: ${topic}. 
O artigo deve ser relevante para o contexto de controle de pragas e dedetização.
Inclua dicas práticas, informações sobre prevenção e quando procurar ajuda profissional.
Ao final, sugira uma descrição de imagem de capa ideal para o artigo no campo cover_image_suggestion.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
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
  "cover_image_suggestion": "Descrição de uma imagem de capa ideal"
}

O conteúdo deve ser informativo, profissional e educativo.
Use formatação markdown no content: títulos (##), listas, negrito, etc.`
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI error:", aiResponse.status, errorText);
      throw new Error(`AI generation failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const messageContent = aiData.choices?.[0]?.message?.content;

    if (!messageContent) {
      throw new Error("No content from AI");
    }

    let parsedContent;
    try {
      const clean = messageContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedContent = JSON.parse(clean);
    } catch {
      parsedContent = {
        title: `Artigo sobre ${topic}`,
        excerpt: messageContent.substring(0, 200),
        content: messageContent,
        cover_image_suggestion: `Imagem sobre ${topic}`,
      };
    }

    // Save draft to Firestore
    await firestoreCreate("blog_auto_drafts", {
      title: parsedContent.title || `Artigo sobre ${topic}`,
      excerpt: parsedContent.excerpt || "",
      content: parsedContent.content || "",
      cover_image_suggestion: parsedContent.cover_image_suggestion || `Imagem sobre ${topic}`,
      topic,
      status: "pending",
      day_of_week: dayKey,
      created_at: new Date(),
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        topic, 
        day: dayKey,
        title: parsedContent.title 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Auto-generate error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
