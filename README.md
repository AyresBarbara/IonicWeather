# App de Monitoramento Climático com Ionic

![Conceito Climático](/ionicnewsdocs/readme_images/weather_concept.png)

## Descrição do Projeto

Este repositório contém o código-fonte e a documentação para um aplicativo móvel de monitoramento climático desenvolvido com Ionic e Angular. O objetivo principal é fornecer aos usuários informações climáticas atualizadas e previsões para diversas cidades, consumindo dados de APIs REST públicas, como a OpenWeatherMap.

O aplicativo permite a visualização das condições climáticas atuais (temperatura, umidade, condições atmosféricas) e previsões futuras (por hora e por dia). Ele foi projetado para ser intuitivo, responsivo e oferecer uma experiência de usuário agradável em dispositivos Android.


### Funcionalidades Implementadas

*   **Autenticação de Usuário:** Sistema de login e cadastro (utilizando Firebase/JWT) para salvar preferências e histórico.
*   **Integração com API de Clima:** Consumo da API OpenWeatherMap para dados climáticos em tempo real.
*   **Interface Responsiva:** UI moderna e adaptada para mobile, utilizando componentes Ionic.
*   **Busca de Cidades:** Pesquisa global de cidades com armazenamento de buscas recentes.
*   **Favoritos:** Sistema para salvar e acessar rapidamente cidades preferidas.
*   **Previsão Detalhada:** Exibição de previsão por hora (próximas 24h) e por dia (próximos 5-7 dias).
*   **Localização Atual (GPS):** Detecção automática da localização do usuário para exibir o clima local.
*   **Cache e Performance:** Armazenamento local para acesso offline ou com conexão instável.


## Como Baixar o Repositório

Para obter uma cópia local deste projeto, você pode clonar o repositório utilizando Git. Abra seu terminal ou prompt de comando e execute o seguinte comando:

```bash
git clone <https://github.com/AyresBarbara/IonicWeather.git>
```

Substitua `SEU_REPOSITORIO_AQUI` pela URL real do seu repositório no GitHub, GitLab, Bitbucket ou outro serviço de hospedagem Git.

Após clonar, navegue até o diretório do projeto:

```bash
cd ionicnewsapp
cd climaApp
```

## Pré-requisitos

Antes de executar ou modificar o projeto, certifique-se de que você possui todas as ferramentas, bibliotecas e dependências necessárias instaladas e configuradas corretamente em seu ambiente de desenvolvimento.

* Use o Npm install dentro do diretório:
 ```bash
    climaApp
```

## Fluxo de Trabalho Git

Este projeto adota um fluxo de trabalho baseado em branches para garantir um desenvolvimento organizado e colaborativo. Todo o desenvolvimento de novas funcionalidades ou correções deve ser feito em branches separadas (por exemplo, `feature/nova-funcionalidade` ou `fix/correcao-bug`) a partir da branch `main`. Após a conclusão e teste da tarefa, um Pull Request (ou Merge Request) deve ser aberto para revisar e integrar as mudanças de volta à branch principal.

Para um guia passo-a-passo detalhado com os comandos Git específicos utilizados neste fluxo de trabalho (clone, branch, commit, push, pull request, merge, etc.), consulte o tutorial abaixo:

Consulte o arquivo: [**Tutorial de Fluxo de Trabalho Git**](/ionicnewsdocs/UseCase/workflow_tutorial.pdf)

## Contribuindo

Agradecemos o interesse em contribuir para o desenvolvimento deste projeto! Para garantir a qualidade e a consistência do código, pedimos que siga as diretrizes de contribuição estabelecidas.

As diretrizes incluem informações sobre como reportar bugs, sugerir novas funcionalidades, submeter Pull Requests e os padrões de código adotados.

Consulte o arquivo: [**CONTRIBUTING.md**](/ionicnewsdocs/CONTRIBUTING.md)

## Autores

* Bárbara Fernanda Ayres da Silva
* Eduardo dos Santos Lira
* João Pedro Carneiro da Silva
* Wilson Francisco do Nascimento

## Licença

Este projeto é licenciado sob a Licença creative commons. Veja o arquivo `LICENSE`.



