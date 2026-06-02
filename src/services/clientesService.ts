/**
 * Serviço para consulta de clientes atendidos via API externa do Supabase.
 * Este serviço é otimizado para privacidade (LGPD) e performance.
 */

// Variáveis de ambiente configuradas no Vite
const API_URL = import.meta.env.VITE_CLIENTES_API_URL;
const API_KEY = import.meta.env.VITE_CLIENTES_API_KEY;

// Cache simples em memória para evitar requisições redundantes durante a navegação
let cachedCount: number | null = null;
let isFetching = false;
let fetchPromise: Promise<number | null> | null = null;

/**
 * Obtém o número total de clientes atendidos de forma dinâmica.
 * 
 * Visando a segurança dos dados (LGPD):
 * - Usamos `select=id` na requisição para baixar apenas os IDs dos clientes,
 *   evitando tráfego de dados sensíveis como nomes, telefones e e-mails.
 * - Credenciais e detalhes da requisição não são impressos no console do navegador.
 * 
 * @returns O número de clientes ou null caso ocorra uma falha na requisição.
 */
export async function getClientesCount(): Promise<number | null> {
  // Se já temos a contagem em cache, retorna imediatamente
  if (cachedCount !== null) {
    return cachedCount;
  }

  // Se já houver uma requisição em andamento, reaproveita a mesma promessa
  if (isFetching && fetchPromise) {
    return fetchPromise;
  }

  if (!API_URL || !API_KEY) {
    // Falha silenciosa se as variáveis de ambiente não estiverem configuradas
    return null;
  }

  isFetching = true;

  fetchPromise = (async () => {
    try {
      // Faz o fetch com limit=1 e solicita apenas a contagem exata (otimização extrema e LGPD)
      const url = `${API_URL}?select=cdCliente&limit=1`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "apikey": API_KEY,
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "count=exact"
        },
      });

      if (!response.ok) {
        return null;
      }

      // O Supabase retorna a contagem total no header Content-Range (ex: 0-0/10450)
      const contentRange = response.headers.get("content-range");
      if (contentRange) {
        const parts = contentRange.split("/");
        if (parts.length === 2) {
          const count = parseInt(parts[1], 10);
          if (!isNaN(count)) {
            cachedCount = count;
            return cachedCount;
          }
        }
      }
    } catch {
      // Captura o erro silenciosamente sem expor credenciais ou detalhes da API no console
      return null;
    } finally {
      isFetching = false;
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}
