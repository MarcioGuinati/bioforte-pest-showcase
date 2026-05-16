# Guia de Deploy - Bioforte

Este documento contém as instruções para subir o site da Bioforte para um servidor de produção.

## 1. Preparação Local

Antes de subir os arquivos, você precisa gerar a versão de produção (otimizada):

1. Abra o terminal na pasta do projeto.
2. Execute o comando:
   ```bash
   npm run build
   ```
3. Uma pasta chamada `dist` será criada. **Estes são os arquivos que devem ser enviados para o servidor.**

---

## 2. Opções de Servidor

### Opção A: Servidor Tradicional (cPanel, HostGator, Locaweb, Apache)
Se você estiver usando um servidor comum com Apache:

1. Use um cliente FTP (como FileZilla) ou o Gerenciador de Arquivos do cPanel.
2. Envie todo o conteúdo da pasta `dist` para dentro da pasta `public_html` (ou a pasta raiz do seu domínio).
3. **IMPORTANTE (Rotas):** Para que as páginas como `/quem-somos` funcionem ao atualizar o navegador, você deve criar um arquivo chamado `.htaccess` na raiz do servidor com o seguinte conteúdo:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Opção B: Servidor VPS (Nginx)
Se você estiver usando um servidor Nginx:

Configure o seu arquivo de site em `/etc/nginx/sites-available/` para incluir a regra de fallback:

```nginx
location / {
    root /var/www/bioforte/dist;
    index index.html;
    try_files $uri $uri/ /index.html;
}
```

### Opção C: Plataformas Modernas (Vercel, Netlify) - RECOMENDADO
Estas plataformas são gratuitas e ideais para React/Vite:

1. **Vercel**: Conecte seu GitHub ou arraste a pasta `dist` para o dashboard da Vercel. Ela detectará automaticamente as configurações de Vite.
2. **Netlify**: Arraste a pasta `dist` para o "Deploy" do Netlify.

---

## 3. Checklist Pós-Deploy

- [ ] Verifique se o `https` (SSL) está ativo.
- [ ] Teste a navegação entre as páginas e atualize o navegador (F5) para ver se não dá erro 404.
- [ ] Verifique se o `sitemap.xml` e `robots.txt` estão acessíveis em `bioforte.com.br/sitemap.xml`.
- [ ] Envie o sitemap para o Google Search Console.

---
*Dica: Se o formulário de contato não funcionar, verifique se as chaves do Firebase no seu `.env` de produção estão configuradas corretamente.*
