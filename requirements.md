Documentação do Sistema de Reservas
Visão Geral
O sistema de reservas é uma aplicação web que permite aos usuários gerenciar a reserva de recursos como salas de reunião, equipamentos e outros itens. O sistema é projetado para ser simples, intuitivo e funcional, proporcionando uma experiência de usuário agradável e eficiente.

Funcionalidades Principais
Cadastro de Usuários

Registro e login de usuários.
Perfis de usuário com informações básicas.
Gerenciamento de Recursos

Adição, edição e remoção de recursos (salas, equipamentos, etc.).
Visualização de disponibilidade dos recursos.
Criação de Reservas

Formulário para criar novas reservas.
Seleção de data, hora e recurso desejado.
Confirmação de reserva.
Geração de Link de Compartilhamento: Ao criar uma reserva, será gerado um link único que pode ser compartilhado com outros usuários.
Visualização de Reservas

Calendário ou lista de reservas.
Detalhes das reservas (data, hora, recurso, usuário).
Notificações

Notificações por e-mail ou no sistema para confirmar reservas e lembrar os usuários.
Painéis de Controle

Painel do Administrador: Para gerenciar recursos e visualizar todas as reservas.
Painel do Usuário: Para criar e gerenciar suas próprias reservas.
Tecnologias Utilizadas
Frontend: React, HTML, CSS
Backend: PHP
Banco de Dados e Autenticação: Supabase
Estrutura do Projeto
Frontend
React: Utilizado para criar componentes reutilizáveis.
HTML/CSS: Utilizado para a estrutura e estilo das páginas.
Axios ou Fetch API: Utilizado para fazer requisições ao backend.
Backend
PHP: Utilizado para criar APIs que gerenciam as operações CRUD (Create, Read, Update, Delete).
JWT (JSON Web Tokens): Utilizado para autenticação de usuários.
Banco de Dados e Autenticação
Supabase: Utilizado para armazenar informações de usuários, recursos e reservas, além de gerenciar a autenticação.
Estrutura de Tabelas (Supabase)
CREATE TABLE users (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
username VARCHAR(50) NOT NULL,
password VARCHAR(255) NOT NULL,
email VARCHAR(100) NOT NULL
);

CREATE TABLE resources (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name VARCHAR(100) NOT NULL,
description TEXT
);

CREATE TABLE reservations (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID REFERENCES users(id),
resource_id UUID REFERENCES resources(id),
start_time TIMESTAMP,
end_time TIMESTAMP,
share_link VARCHAR(255)
);
Endpoints da API
Usuários
POST /api/register: Registro de novos usuários.
POST /api/login: Autenticação de usuários.
GET /api/users: Listagem de usuários.
Recursos
POST /api/resources: Adição de novos recursos.
GET /api/resources: Listagem de recursos.
PUT /api/resources/{id}: Edição de recursos.
DELETE /api/resources/{id}: Remoção de recursos.
Reservas
POST /api/reservations: Criação de novas reservas e geração de link de compartilhamento.
GET /api/reservations: Listagem de reservas.
GET /api/reservations/{id}: Detalhes de uma reserva específica.
PUT /api/reservations/{id}: Edição de reservas.
DELETE /api/reservations/{id}: Remoção de reservas.
Design da Interface
Ideias de Cores
Paleta Principal:

Azul Claro (#4A90E2)
Branco (#FFFFFF)
Cinza Claro (#F5F5F5)
Cinza Escuro (#4A4A4A)
Cores de Destaque:

Verde (#7ED321) para ações positivas.
Vermelho (#D0021B) para ações negativas.
Amarelo (#F8E71C) para notificações e alertas.
Tipografia
Utilize fontes sans-serif modernas como Roboto ou Open Sans para garantir legibilidade e um visual contemporâneo.
Layout
Design Responsivo: Certifique-se de que o layout se adapta bem a diferentes tamanhos de tela, desde desktops até dispositivos móveis.
Espaçamento Generoso: Use espaçamento adequado entre elementos para evitar um visual sobrecarregado e melhorar a usabilidade.
Componentes Reutilizáveis: Crie componentes de interface reutilizáveis para manter a consistência visual e facilitar a manutenção do código.
Elementos Visuais
Botões e Formulários: Utilize botões com bordas arredondadas e efeitos de hover para melhorar a interatividade.
Ícones: Use ícones simples e claros para representar ações e funcionalidades, como os da biblioteca Font Awesome.
Animações Suaves: Adicione animações suaves para transições e feedback de ações do usuário, como cliques em botões e carregamento de conteúdo.
Exemplo de Interface
Página de Login: Tela limpa com campos de entrada centralizados, botão de login destacado em azul claro.
Dashboard: Visão geral das reservas com um calendário interativo e lista de reservas recentes.
Formulário de Reserva: Campos de entrada claros e organizados, com seleção de data e hora intuitiva.
Página de Recursos: Lista de recursos com opções para adicionar, editar e remover, utilizando ícones e botões de ação.
