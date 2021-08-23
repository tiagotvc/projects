# Desafio Projects API

Processo padrão para iniciar e testar o projeto

utilizando o git bash acessar a pasta onde deseja despejar o projeto e executar:
git clone https://github.com/tiagotvc/projects

## Instalando dependências

```

    - Estando na Pasta Raíz execute:
    - npm install

```

## Subindo a aplicação

 Só é preciso estar com o docker rodando e fazer os seguintes comando na sequencia
 instruida abaixo:

```
   [Docker]
   - Estar na raiz, local onde esta o arquivo docker-compose.yml
   - docker estar rodando
   - Precisa ser nessa exata sequência:
   - docker-compose up --build mongo
   - docker-compose up --build redis
   - docker-compose up --build api-server
   - caso de algum erro em um dos container execute novamente o comando.

```


## Rodando script de banco

```

    [Pasta scripts]

    - Após subir todos os containers
    - Abrir novo cmd do vscode
    - docker-compose run api-server npm run mongo
    
    - aguardar a inclusão de todos os documentos e as Apis estarão prontas para testes.

```

## Testando os  End-points

 DOCUMENTAÇÃO NO SWAGGER

```
 - URL: http://localhost:3001/doc
     
```


## Testes da API

```
  Criei apenas o teste de retorno para os endpoints que recebem o parametro ID(Apenas para mostrar que sei fazer testes unitários)
  - Apenas testa o erro caso seja passado ID não existente(middleware de id)
  - Estando na pasta raiz do projeto
  - E com todos os container rodando
  - Executar o comando.  
  - docker-compose run api-server npm run test

```
