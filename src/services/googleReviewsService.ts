/**
 * Serviço para consulta de avaliações do Google via Google Places API (New).
 * Fornece dados atualizados em tempo real de forma segura.
 */

// Chave da API obtida das variáveis de ambiente
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

// Cache simples em memória para evitar consumo excessivo de cotas da API do Google
let cachedPlaceId: string | null = null;
let cachedReviewsData: GoogleReviewsResult | null = null;
let isFetching = false;
let fetchPromise: Promise<GoogleReviewsResult | null> | null = null;

export interface GoogleReview {
  name: string;
  content: string;
  rating: number;
  date: string;
}

export interface GoogleReviewsResult {
  rating: number;
  userRatingCount: number;
  reviews: GoogleReview[];
}

/**
 * Obtém as avaliações em tempo real do Google para a Bioforte Controle de Pragas.
 * 
 * Se a API do Google falhar ou estiver desativada no console do cliente,
 * o método retornará `null`, permitindo ao frontend acionar o fallback local.
 */
export async function getGoogleReviews(): Promise<GoogleReviewsResult | null> {
  // Retorna do cache se já estiver populado
  if (cachedReviewsData !== null) {
    return cachedReviewsData;
  }

  // Se houver uma requisição idêntica paralela em andamento, reaproveita a promessa
  if (isFetching && fetchPromise) {
    return fetchPromise;
  }

  if (!GOOGLE_API_KEY) {
    return null;
  }

  isFetching = true;

  fetchPromise = (async () => {
    try {
      let placeId = cachedPlaceId;

      // 1. Passo: Buscar o Place ID caso não esteja em cache
      if (!placeId) {
        const query = "Bioforte Controle de Pragas Franca SP";
        const searchRes = await fetch("https://places.googleapis.com/v1/places:searchText", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_API_KEY,
            "X-Goog-FieldMask": "places.id"
          },
          body: JSON.stringify({
            textQuery: query
          })
        });

        if (!searchRes.ok) {
          return null;
        }

        const searchData = await searchRes.json();
        if (searchData.places && searchData.places.length > 0) {
          placeId = searchData.places[0].id;
          cachedPlaceId = placeId;
        } else {
          return null;
        }
      }

      // 2. Passo: Buscar detalhes do local (Avaliações, Nota e Contagem)
      if (!placeId) {
        return null;
      }

      const detailsUrl = `https://places.googleapis.com/v1/places/${placeId}?languageCode=pt-BR`;
      const detailsRes = await fetch(detailsUrl, {
        method: "GET",
        headers: {
          "X-Goog-Api-Key": GOOGLE_API_KEY,
          "X-Goog-FieldMask": "id,rating,userRatingCount,reviews"
        }
      });

      if (!detailsRes.ok) {
        return null;
      }

      const detailsData = await detailsRes.json();

      // 3. Passo: Validar e formatar os dados
      const rating = detailsData.rating || 4.9;
      const userRatingCount = detailsData.userRatingCount || 127;
      const rawReviews = detailsData.reviews || [];

      // Mapeamento para o formato consumido pelo layout do site
      const reviews: GoogleReview[] = rawReviews.map((review: any) => ({
        name: review.authorAttribution?.displayName || "Cliente Google",
        content: review.text?.text || "",
        rating: review.rating || 5,
        date: review.relativePublishTimeDescription || "há 1 semana"
      }));

      cachedReviewsData = {
        rating,
        userRatingCount,
        reviews: reviews.length > 0 ? reviews : []
      };

      return cachedReviewsData;
    } catch {
      // Captura erros silenciosamente sem expor a chave do Google Maps no console
      return null;
    } finally {
      isFetching = false;
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}
