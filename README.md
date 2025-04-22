<body>
  <h1>🌐 Network ETL Pipeline</h1>

  <p>
    Este repositório apresenta uma pipeline ETL para o gerenciamento de dados de rede, integrando-se à
    <a href="https://ozmap.com.br/" target="_blank">Ozmap</a>. O sistema automatiza todo o fluxo de extração,
    transformação e envio de dados, com registro em banco de dados intermediário para controle e rastreabilidade.
    Este projeto foi desenvolvido como parte de um teste técnico proposto pela Ozmap para a vaga de Desenvolvedor Sênior.
  </p>
  <br>
  <h2>✨ Visão Geral</h2>
  <ul>
    <li><strong>Extract</strong>: coleta dados de um <code>json-server</code>.</li>
    <li><strong>Transform</strong>: realiza adaptações necessárias para compatibilidade com o SDK da Ozmap.</li>
    <li><strong>Load</strong>: envia os dados transformados para a API da Ozmap.</li>
    <li><strong>Registry</strong>: registra os dados no banco MongoDB como backup/intermediário.</li>
    <li><strong>Orchestrator</strong>: controla a execução ordenada dos jobs usando <code>BullMQ</code>.</li>
  </ul>
  <br>
  <h2>🔧 Pré-requisitos</h2>
  <p>
    Antes de iniciar o projeto, certifique-se de que possui os seguintes pré-requisitos configurados corretamente no seu ambiente:
  </p>

  <h2>Variáveis de Ambiente</h2>
  <p>Para rodar o projeto, altere o arquivo <code>.env</code> com as variáveis abaixo:</p>

  <pre>
  <code>
  DB_URI=mongodb://database:27017/ozmap_isp
  DB_NAME=ozmap_isp
  APPLICATION_PORT=3000
  APPLICATION_HOST=localhost
  JOB_MAX_ATTEMPTS=5
  JOB_BACKOFF_DELAY_SECONDS=60
  JOB_REPEAT_EVERY_MINUTES=50
  SDK_BASE_URL=&lt;your_url&gt;
  SDK_KEY=&lt;your_key&gt;
  SDK_PROJECT_ID=&lt;your_project_id&gt;
  </code>
  </pre>

  <p>Onde:</p>
  <ul>
      <li><strong>DB_URI</strong>: URL de conexão com o banco de dados MongoDB. **Atenção** o projeto rodara dentro de um container docker, db_uri deve seguir o padrão mongodb://database:27017/ozmap_isp</li>
      <li><strong>DB_NAME</strong>: Nome do banco de dados no MongoDB.</li>
      <li><strong>APPLICATION_PORT</strong>: Porta na qual o servidor irá rodar.</li>
      <li><strong>APPLICATION_HOST</strong>: Endereço do host do servidor.</li>
      <li><strong>JOB_MAX_ATTEMPTS</strong>: Número máximo de tentativas para processar um job.</li>
      <li><strong>JOB_BACKOFF_DELAY_SECONDS</strong>: Tempo de espera entre as tentativas de execução de um job, é recomendado manter o tempo proposto para evitar eventuais looping do ratelimit, pois o sdk aceita apenas 50 requests por minuto.</li>
      <li><strong>JOB_REPEAT_EVERY_MINUTES</strong>: Frequência para re-executar um job.</li>
      <li><strong>SDK_BASE_URL</strong>: URL base para comunicação com a API da Ozmap.</li>
      <li><strong>SDK_KEY</strong>: Chave de autenticação do SDK da Ozmap.</li>
      <li><strong>SDK_PROJECT_ID</strong>: ID do projeto Ozmap para comunicação via SDK.</li>
  </ul>
  <br>
  <h2>🐳 Como rodar com Docker</h2>
  <p>Recomendamos fortemente que execute o projeto com docker para evitar dependencias extras, como json-server, redis:</p>
  <pre><code>docker compose build && docker compose up  </code></pre>
  
  <p>A aplicação estará disponível por padrão em <code>http://localhost:${APPLICATION_PORT}</code>.</p>
  <p>O json server estará disponível por padrão em <code>http://json-server:4000</code>.</p>
  <p> <strong>Importante</strong>: Altere o arquivo db.json conforme necessidade para gerar mais dados mocados, mas lembre-se sempre que alterar o arquivo vc deverá reiniciar a aplicação com docker-compose up</p>

  <br>
  <h2>🧪 Healthcheck</h2>
  <p> Para verificar se sua aplicação está rodando sem problemas, basta acessar a rota abaixo: </p>
  <pre><code>GET /healthcheck</code></pre>
  <p>Resposta:</p>
  <pre><code>{
  "status": "ok",
  "message": "API is running",
  "timestamp": "..."
}</code></pre>

  <br>
  <h2>✅ Testes</h2>
  <p>O projeto utiliza <strong>Mocha</strong>, <strong>Chai</strong> e <strong>Sinon</strong> para testes unitários:</p>
  <pre><code>npm run test </code></pre>


<h2>📖 Documentação adicional</h2>

<p>A aplicação inclui um cron job que realiza a sincronização automática dos dados do <code>json-server</code> em intervalos regulares, definidos por uma variável de ambiente. Além disso, o usuário pode realizar sincronizações manuais através das seguintes rotas:</p>

<h3>Rotas de sincronização manual:</h3>

<ul>
  <li><strong>Sincronização Completa</strong><br>
    Realiza uma sincronização completa de todos os dados.<br>
    <code>POST</code> para:  
    <pre>http://localhost:3000/api/manual-flow/full-sync</pre>
  </li>

  <li><strong>Sincronização de Boxes</strong><br>
    Sincroniza os dados de um box específico, identificado pelo <code>id</code>.<br>
    <code>POST</code> para:  
    <pre>http://localhost:3000/api/manual-flow/sync-boxes/:id</pre>
  </li>

  <li><strong>Sincronização de Propriedades</strong><br>
    Sincroniza os dados de uma propriedade específica, identificada pelo <code>id</code>.<br>
    <code>POST</code> para:  
    <pre>http://localhost:3000/api/manual-flow/sync-properties/:id</pre>
  </li>

  <li><strong>Sincronização de Cabos</strong><br>
    Sincroniza os dados de um cabo específico, identificado pelo <code>id</code>.<br>
    <code>POST</code> para:  
    <pre>http://localhost:3000/api/manual-flow/sync-cables/:id</pre>
  </li>
</ul>

<p>Essas rotas permitem que o usuário tenha controle total sobre as sincronizações, seja de maneira automática ou manual, conforme a necessidade.</p>

  


  
  <h2>🧱 Estrutura de Pastas</h2>
  <pre><code>modules/
├── extract/       → leitura de dados (ex: boxes, customers, cables)
├── transform/     → normalização dos dados
├── load/          → envio para a Ozmap via SDK
├── registry/      → persistência em MongoDB
├── orchestrator/  → controle de fluxo e agendamento com BullMQ
├── shared/        → utilitários, logger, configs
  </code></pre>

<p> <strong>Módulo extract</strong>: Irá realizar as consultas no json-server, também é responsável por realizar validações iniciais, como por exemplo tratar dados duplicados, dados com coordenadas inválidas ou com campos obrigatórios ausentes.</p>
<p> <strong>Módulo transform</strong>: Irá realizar a transformação dos dados para o DTO da ozmap, seja para cadastrar ou atualizar dados. </p>
<p> <strong>Módulo load</strong>: Irá na sua grande maioria função realizar cadastros na base da ozmap utilizando seu sdk, em alguns casos também irá buscar alguns dados da base da ozmap.</p>
<p> <strong>Módulo registry</strong>: Irá armazenar os dados sincronizados com a ozmap no banco mongoDb, isso é utíl para evitar requisições desnecessárias ao sdk da ozmap que possui um rate limit configurado. </p>
<p> <strong>Módulo orchestrator</strong>: Irá orquestrar todos os dados, desde fazer requisições de extração, carregamento, tratamento e registro. </p>
<p> <strong>Módulo shared</strong>: São pastas utilitárias que são compartilhadas entre os modulos. </p>





  <h2>📌 Diagrama </h2>
![image](https://github.com/user-attachments/assets/3c8545b7-5176-4306-a58e-9af0e9d8dd8a)

  <ul>
    <li>Jobs são orquestrados com dependências e retries automáticos via BullMQ, utilizando conceitos de DLQ.</li>
    <li>O sistema respeita limites de requisições usando <code>Bottleneck</code>.</li>
    <li>O sistema possui um banco de dados para auxiliar na manutenção dos dados, utilizando conceitos de CDC.</li>
  </ul>


</body>
</html>
