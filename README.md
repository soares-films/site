# Publicar o site da SoaresFilms (Windows)

Guia completo, do zero até `https://soaresfilms.com` estar online.
Faz os passos pela ordem e só avanças quando a verificação de cada passo der certo.

Escolhas feitas:
- **Domínio e DNS:** Cloudflare (preço de custo, cerca de 10,46 USD/ano para .com).
- **Email:** Cloudflare Email Routing, grátis. O `geral@soaresfilms.com` chega ao `soaresfilmspt@gmail.com`.
- **Alojamento:** GitHub Pages, grátis.
- **Onde trabalhas:** Windows, com o PowerShell.

**Regra para todas as contas:** usa sempre o `soaresfilmspt@gmail.com`, nunca o teu email pessoal. Assim a SoaresFilms é dona de tudo e o teu irmão também consegue entrar se for preciso.

Onde aparecer `O_TEU_USER`, troca pelo teu nome de utilizador do GitHub.

---

## Fase 0. Preparar (antes de começar)

- [ ] Acesso ao `soaresfilmspt@gmail.com` e ao telemóvel com a verificação em 2 passos dessa conta.
- [ ] Um cartão para pagar o domínio, cerca de 10 USD. Dá para MB WAY virtual ou cartão pré-pago.
- [ ] Uma app de autenticação no iPhone (Google Authenticator, Microsoft Authenticator ou as Palavras-passe do iOS).
- [ ] Escolher o nome de utilizador do GitHub. Sugestão: `soaresfilms`.
- [ ] Cerca de 1 a 2 horas. A ligação do domínio pode demorar até 24 horas a propagar.
- [ ] Extrair o ZIP do site:
  1. Botão direito no `soaresfilms-site.zip` > **Extrair tudo**.
  2. Em destino, escolhe a pasta **Documentos** e carrega em **Extrair**.
  3. Confirma que tens `Documentos\soaresfilms-site\index.html`. Se ficou `soaresfilms-site\soaresfilms-site\index.html`, move a pasta de dentro para os Documentos.

---

## Fase 1. Criar conta na Cloudflare e comprar o domínio

**Criar a conta**
1. Vai a `dash.cloudflare.com/sign-up`.
2. **Email:** `soaresfilmspt@gmail.com`. **Password:** uma nova e forte, que não uses noutro sítio. Guarda-a num gestor de palavras-passe.
3. Carrega em **Sign up**.
4. Se a Cloudflare te perguntar o que queres fazer ou te mostrar um assistente para adicionar um site, salta essa parte. Não precisas de adicionar nada ainda.
5. Abre o Gmail da SoaresFilms e carrega no link de confirmação da Cloudflare. Sem isto, não deixam registar domínios.
6. Ativa a autenticação em 2 passos: ícone do perfil, no canto superior direito > **Profile** > **Authentication** > **Two-Factor Authentication**. Lê o QR code com a app de autenticação e guarda os códigos de recuperação.

**Comprar o domínio**
7. No menu da esquerda, abre **Domain Registration** > **Register Domains**.
8. Escreve `soaresfilms.com` e carrega em **Search**.
   - Se aparecer como indisponível, **para aqui** e fala comigo antes de comprar outro nome.
9. Carrega em **Purchase**.
10. Em **Payment option**, escolhe **1 ano**. A renovação automática fica ligada por omissão, e convém deixá-la ligada.
11. Preenche os contactos **sem acentos nem ç**, porque a Cloudflare só aceita caracteres simples (por exemplo `Ilhavo`, `Joao`). A privacidade WHOIS esconde estes dados do público.
12. Mete o cartão, lê os acordos e carrega em **Complete purchase**.
13. **Muito importante:** vais receber um email para confirmar o contacto do domínio (verificação ICANN). Confirma-o. Se não o fizeres, o domínio é suspenso ao fim de alguns dias.

**Verificação:** em **Domain Registration** > **Manage Domains**, aparece `soaresfilms.com` com estado ativo.

---

## Fase 2. Criar o email geral@soaresfilms.com

1. No dashboard da Cloudflare, abre **Compute** > **Email Service** > **Email Routing**. Se o menu tiver outro nome, procura "Email Routing" na barra de pesquisa do dashboard.
2. Carrega em **Onboard Domain** e escolhe `soaresfilms.com`.
3. A Cloudflare mostra os registos que vai criar (MX, SPF e DKIM). Aceita e carrega em **Done**.
4. Abre **Destination Addresses**, mete `soaresfilmspt@gmail.com` e envia.
5. No Gmail, abre o email da Cloudflare e confirma o endereço.
6. Volta ao Email Routing, separador **Routing Rules** > **Create routing rule**:
   - **Email pattern:** `geral`
   - **Action:** Send to an email
   - **Destination:** `soaresfilmspt@gmail.com`
   - **Save**
7. Opcional: cria uma regra **Catch-all** para o mesmo Gmail, assim qualquer `algo@soaresfilms.com` também chega.

**Verificação:** do teu email pessoal, manda um email para `geral@soaresfilms.com`. Tem de aparecer no Gmail da SoaresFilms. Se não aparecer, vê o Spam.

**Responder:** por agora respondes a partir do `soaresfilmspt@gmail.com`. Não configures o "Enviar como" do Gmail com este endereço, porque a Google vai remover essa função para endereços de outros domínios em janeiro de 2027.

---

## Fase 3. Criar a conta do GitHub

1. Vai a `github.com/signup`.
2. **Email:** `soaresfilmspt@gmail.com`. **Password:** nova e forte. **Username:** o que escolheste na Fase 0.
3. Confirma o código que o GitHub te manda para o Gmail. Se perguntar por um plano, escolhe o **Free**.
4. Ativa a autenticação em 2 passos: foto do perfil > **Settings** > **Password and authentication** > **Two-factor authentication**. Guarda os códigos de recuperação num sítio seguro.
5. Esconde o email nos commits: **Settings** > **Emails**:
   - Liga **Keep my email addresses private**.
   - Liga **Block command line pushes that expose my email**.
   - Copia o endereço que aparece no formato `123456+O_TEU_USER@users.noreply.github.com`. Vais precisar dele na fase seguinte.

---

## Fase 4. Enviar o site para o GitHub

**Instalar as ferramentas**
1. Carrega na tecla Windows, escreve **PowerShell** e abre-o.
2. Corre estes dois comandos, um de cada vez. Se perguntar se aceitas os termos, escreve `Y` e Enter. Se aparecer uma janela de permissões do Windows, carrega em **Sim**.
   ```powershell
   winget install --id Git.Git -e
   winget install --id GitHub.cli -e
   ```
3. **Fecha o PowerShell e abre um novo.** Sem isto, ele não reconhece os comandos novos.
4. Confirma que ficaram instalados:
   ```powershell
   git --version
   gh --version
   ```
   Os dois têm de mostrar um número de versão.

**Configurar**
5. Mete o nome e o email escondido da Fase 3:
   ```powershell
   git config --global user.name "SoaresFilms"
   git config --global user.email "123456+O_TEU_USER@users.noreply.github.com"
   ```
6. Faz login no GitHub:
   ```powershell
   gh auth login
   ```
   Responde com as setas e Enter: **GitHub.com** > **HTTPS** > **Yes** (autenticar o git) > **Login with a web browser**. Copia o código de 8 caracteres que aparece, carrega em Enter, cola-o no browser que abre e autoriza.

**Enviar**
7. Entra na pasta do site:
   ```powershell
   cd "$HOME\Documents\soaresfilms-site"
   dir
   ```
   Se der erro, troca `Documents` por `Documentos`. Na lista têm de aparecer `index.html`, `CNAME`, `css`, `js` e `assets`.
8. Cria o repositório e envia o site:
   ```powershell
   git init -b main
   git add .
   git commit -m "Primeira versão do site"
   gh repo create soaresfilms --public --source=. --push
   ```
   Avisos do tipo "LF will be replaced by CRLF" são normais e não afetam o site.

**Verificação:** abre `github.com/O_TEU_USER/soaresfilms` e confirma que os ficheiros aparecem.

---

## Fase 5. Ligar o GitHub Pages

1. No repositório: **Settings** > **Pages**.
2. Em **Build and deployment** > **Source**, escolhe **Deploy from a branch**.
3. Em **Branch**, escolhe `main` e `/ (root)` e carrega em **Save**.
4. Espera 1 a 2 minutos. No separador **Actions** do repositório tem de aparecer um visto verde.

Neste momento o site ainda não abre bem no endereço `github.io`, porque o ficheiro `CNAME` já o manda para o `soaresfilms.com`. É normal, resolve-se nas próximas fases.

---

## Fase 6. Proteger o domínio no GitHub

Isto impede que outra pessoa publique um site com o teu domínio.

1. No GitHub, foto do perfil > **Settings** (as tuas, não as do repositório) > **Pages**.
2. Carrega em **Add a domain**, escreve `soaresfilms.com` e continua.
3. O GitHub mostra um registo **TXT**. Deixa a página aberta.
4. Noutro separador, abre a Cloudflare > `soaresfilms.com` > **DNS** > **Records** > **Add record**:
   - **Type:** TXT
   - **Name:** `_github-pages-challenge-O_TEU_USER` (a Cloudflare acrescenta o domínio sozinha)
   - **Content:** o código que o GitHub mostrou
   - **Save**
5. Volta ao GitHub e carrega em **Verify**. Se falhar, espera uns minutos e tenta outra vez.

**Verificação:** o domínio aparece como **Verified** nas definições de Pages da tua conta.

---

## Fase 7. Apontar o domínio para o site

1. No repositório: **Settings** > **Pages** > **Custom domain**. Escreve `soaresfilms.com` e carrega em **Save**. Faz isto **antes** de mexer no DNS.
2. Na Cloudflare: `soaresfilms.com` > **DNS** > **Records**.
3. Se já existirem registos **A**, **AAAA** ou **CNAME** para `soaresfilms.com` ou `www`, apaga-os. **Não apagues** os registos MX e TXT do email nem o TXT do GitHub.
4. Cria estes registos. Em todos, mete o **Proxy status** em **DNS only** (nuvem cinzenta). Com a nuvem laranja, o GitHub não consegue criar o certificado HTTPS.

| Type | Name | Content |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `O_TEU_USER.github.io` |

5. Espera. Costuma demorar minutos, mas pode levar até 24 horas. Para testar no PowerShell:
   ```powershell
   nslookup soaresfilms.com
   ```
   Tens de ver os quatro endereços `185.199.x.153`.
6. Volta a **Settings** > **Pages** no repositório e espera que a verificação de DNS fique verde.

---

## Fase 8. Ligar o HTTPS

1. Em **Settings** > **Pages**, espera até a opção **Enforce HTTPS** ficar disponível. O certificado pode demorar até uma hora.
2. Liga **Enforce HTTPS**.
3. Se a opção continuar cinzenta depois de uma hora, apaga o domínio em **Custom domain**, guarda, volta a escrevê-lo e guarda outra vez.

**Verificação:**
- `https://soaresfilms.com` abre o site com o cadeado.
- `http://soaresfilms.com` passa sozinho para `https`.
- `https://www.soaresfilms.com` vai dar ao `soaresfilms.com`.

---

## Fase 9. Testar tudo

- [ ] No PC e no iPhone: menu, botão "Ver Sempre Contigo", botão do YouTube, cartões do IMDb e Letterboxd e as seis redes.
- [ ] Carregar no email `geral@soaresfilms.com` e confirmar que abre a app de email.
- [ ] Abrir `https://soaresfilms.com/qualquercoisa` e ver a página "Corta!".
- [ ] Colar `https://soaresfilms.com` no WhatsApp e confirmar que aparece a imagem de partilha (pode demorar a aparecer na primeira vez).

---

## Fase 10. Depois de estar online

1. **Google Search Console:** vai a `search.google.com/search-console` com a conta da SoaresFilms > **Adicionar propriedade** > **Domínio** > `soaresfilms.com`. O Google dá um registo TXT: cria-o na Cloudflare como fizeste na Fase 6 e verifica. Depois, em **Sitemaps**, submete `sitemap.xml`.
2. **Linktree:** acrescenta `https://soaresfilms.com` no topo.
3. **Bios:** Instagram, TikTok e YouTube.
4. **IMDb:** na página de "Sempre Contigo", adiciona o site nos links oficiais.
5. **Descrição do vídeo** no YouTube: mete o link do site.

---

## Como mudar o site no futuro

1. Edita os ficheiros na pasta `Documentos\soaresfilms-site` (por exemplo no VS Code).
2. Vê o resultado com duplo clique no `index.html`.
3. No PowerShell, envia:
   ```powershell
   cd "$HOME\Documents\soaresfilms-site"
   git add .
   git commit -m "O que mudaste"
   git push
   ```
4. Em 1 a 2 minutos o site atualiza. Se não vires a mudança, faz Ctrl+F5.

**Notas do IMDb e Letterboxd:** no `index.html`, procura `NOTA DO IMDB` e `NOTA DO LETTERBOXD` e troca o texto na linha seguinte (`8,4/10`, `4,5/5`).

**Curta nova:** exporta o poster em WebP para `assets\img\`, copia o bloco `<article class="film">`, preenche os dados e atualiza o "Rolo 02".

**Nunca** apagues o ficheiro `CNAME`, senão o domínio deixa de funcionar.

---

## O que está na pasta

```
index.html      a página toda
404.html        página de erro
CNAME           diz ao GitHub qual é o domínio
favicon.ico     ícone para browsers antigos
css/style.css   aspeto
js/main.js      efeito do fantasma
assets/fonts    fontes locais e as licenças (OFL)
assets/img      poster, cena da entrada, imagem de partilha, ícones
robots.txt, sitemap.xml   para os motores de busca
```
