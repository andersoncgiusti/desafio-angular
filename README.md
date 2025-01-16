# Desafio Angular

> Este projeto foi gerado com[Angular CLI](https://github.com/angular/angular-cli) versão 17.3.11.

```sh
# Clonar o repositório
git clone

# Enter the
cd turbo-bench-back

# Instale as dependências
npm install

# Iniciar
npm start

# Iniciar testes com Coverage
npm start
```

### Aplicação hospedada de forma estática no bucket da IBM Cloud.

```
https://desafio-angular.s3-web.us-south.cloud-object-storage.appdomain.cloud/marvel
```

# Arquitetura

> A arquitetura apresentada é baseada em modularidade e segue os princípios da Clean Architecture, adaptada para projetos Angular. Essa abordagem organiza o código de forma que cada funcionalidade seja isolada e reutilizável, respeitando as melhores práticas de desenvolvimento frontend.

Tipo de Arquitetura

1. Modularidade (Feature-based Structure)
   - Cada funcionalidade ou módulo representa uma feature independente, com seus próprios componentes, serviços, páginas, etc.
   - Isso facilita o crescimento do projeto, porque novos módulos podem ser adicionados sem impactar outras partes.
2. Separação de Preocupações (Separation of Concerns)
   - Core: Contém funcionalidades essenciais, como serviços globais, guards e interceptors, que são fundamentais para o funcionamento do app.
   - Shared: Contém elementos reutilizáveis, como componentes genéricos (botões, tabelas), pipes e diretivas.
   - Features: Cada módulo encapsula uma funcionalidade específica, reduzindo o acoplamento entre as partes do sistema.
3. Clean Architecture Adaptada A ideia de Clean Architecture é garantir que o domínio e a lógica de negócios sejam independentes do framework ou de implementações específicas. Aqui, isso é adaptado para Angular com:
   - Camadas de dependência:
     - Core: Camada essencial que fornece ferramentas e serviços globais.
     - Features: Camadas externas que utilizam os serviços e ferramentas fornecidos pelo core.
     - Shared: Componentes reutilizáveis disponíveis para qualquer módulo.
4. Lazy Loading e Otimização de Performance
   - O Angular permite lazy loading de módulos, ou seja, carregar apenas o que é necessário em tempo de execução. A organização modular facilita isso.

Por que Escolher Essa Arquitetura no Angular?

1. Escalabilidade:
   - Projetos grandes podem crescer sem desorganizar o código.
2. Reutilização:
   - Componentes, pipes e diretivas podem ser facilmente reutilizados em toda a aplicação.
3. Testabilidade:
   - O isolamento de funcionalidades facilita os testes unitários e de integração.
4. Manutenibilidade:
   - Atualizar ou corrigir uma funcionalidade específica não afeta outras partes do sistema.
5. Performance:
   - Lazy loading reduz o tamanho inicial do bundle.

```plaintext
src/
├── app/
│   ├── core/                 # Serviços e componentes essenciais
│   │   ├── services/         # Serviços globais (ex: autenticação, API base)
│   │   ├── guards/           # Guards de rotas
│   │   ├── interceptors/     # Interceptadores HTTP
│   │   ├── models/           # Modelos de dados (interfaces, tipos)
│   │   └── utils/            # Funções e helpers globais
│   ├── features/             # Módulos específicos por funcionalidade
│   │   ├── marvel/           # Módulo de funcionalidade (exemplo: Marvel)
│   │   │   ├── components/   # Componentes específicos da funcionalidade
│   │   │   ├── pages/        # Páginas relacionadas à funcionalidade
│   │   │   ├── services/     # Serviços específicos
│   │   │   └── marvel.module.ts
│   │   └── other-feature/    # Outros módulos de funcionalidades
│   ├── shared/               # Componentes, diretivas e pipes reutilizáveis
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── directives/       # Diretivas customizadas
│   │   ├── pipes/            # Pipes personalizados
│   │   └── shared.module.ts  # Exporta os itens reutilizáveis
│   ├── state/                # Gerenciamento de estado (NgRx, Akita, etc.)
│   ├── app-routing.module.ts # Configuração de rotas
│   └── app.module.ts         # Módulo raiz
├── assets/                   # Arquivos estáticos (imagens, fontes, etc.)
├── environments/             # Configurações para diferentes ambientes
└── main.ts                   # Entrada principal da aplicação
```
