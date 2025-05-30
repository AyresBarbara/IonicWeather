# Exemplo de Caso de Uso: Consultar Clima Atual

**Ator Principal:** Usuário do Aplicativo

**Pré-condições:**
*   O usuário está com o aplicativo aberto.
*   O aplicativo tem conexão com a internet (para dados em tempo real) ou dados em cache.

**Fluxo Principal:**
1.  Usuário abre a tela principal ou a tela de busca de cidades.
2.  Usuário digita o nome de uma cidade no campo de busca OU seleciona uma cidade favorita OU permite que o app use a localização GPS.
3.  O aplicativo envia uma requisição para a API de clima (se online) ou busca no cache local.
4.  A API (ou cache) retorna os dados climáticos atuais (temperatura, condição, umidade, etc.).
5.  O aplicativo exibe os dados formatados na interface do usuário.

**Fluxos Alternativos:**
*   **Cidade não encontrada:** Se a cidade digitada não for encontrada pela API, o aplicativo exibe uma mensagem informativa.
*   **Falha na Conexão:** Se não houver conexão com a internet e não houver dados em cache para a cidade solicitada, o aplicativo exibe uma mensagem de erro de conexão.
*   **Erro na API:** Se a API retornar um erro, o aplicativo exibe uma mensagem genérica de erro.

**Pós-condições:**
*   As informações climáticas da cidade selecionada são exibidas para o usuário.
*   Se a busca foi feita manualmente, a cidade pode ser adicionada ao histórico de buscas recentes.

---

