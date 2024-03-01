-- Criação da tabela tb_user
CREATE TABLE IF NOT EXISTS tb_user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Criação da tabela tb_roleS
CREATE TABLE IF NOT EXISTS tb_role (
    id SERIAL PRIMARY KEY,
    authority VARCHAR(50) UNIQUE NOT NULL
);

-- Criação da tabela tb_user_role
CREATE TABLE IF NOT EXISTS tb_user_role (
    user_id INT REFERENCES tb_user(id),
    role_id INT REFERENCES tb_role(id),
    PRIMARY KEY (user_id, role_id)
);

-- Criação da tabela tb_schedule
CREATE TABLE IF NOT EXISTS tb_schedule (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    expiration_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela tb_contact
CREATE TABLE IF NOT EXISTS tb_contact (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cep VARCHAR(8) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    cnpj VARCHAR(14),
    cpf VARCHAR(14),
    schedule_id INT REFERENCES tb_schedule(id)
);

-- Criação da tabela user_schedule
CREATE TABLE IF NOT EXISTS user_schedule (
    user_id INT REFERENCES tb_user(id),
    schedule_id INT REFERENCES tb_schedule(id),
    PRIMARY KEY (user_id, schedule_id)
);

INSERT INTO tb_user(name, email, password) VALUES ('Kengi Ortega', 'kortega90@hotmail.com', '$2a$10$10F2E7pyIsD5YjpeURaljesA3OkJzpbPOlYy0biF2VM2s4GkN88Sy');
INSERT INTO tb_user(name, email, password) VALUES ('Maria Silva', 'maria.silva@example.com', '$2a$10$10F2E7pyIsD5YjpeURaljesA3OkJzpbPOlYy0biF2VM2s4GkN88Sy');
INSERT INTO tb_user(name, email, password) VALUES ('John Doe', 'john.doe@example.com', '$2a$10$10F2E7pyIsD5YjpeURaljesA3OkJzpbPOlYy0biF2VM2s4GkN88Sy');
INSERT INTO tb_user(name, email, password) VALUES ('Ana Oliveira', 'ana.oliveira@example.com', '$2a$10$10F2E7pyIsD5YjpeURaljesA3OkJzpbPOlYy0biF2VM2s4GkN88Sy');
INSERT INTO tb_user(name, email, password) VALUES ('Carlos Santos', 'carlos.santos@example.com', '$2a$10$10F2E7pyIsD5YjpeURaljesA3OkJzpbPOlYy0biF2VM2s4GkN88Sy');
INSERT INTO tb_user(name, email, password) VALUES ('Ana Souza', 'ana.souza@example.com', '$2a$10$10F2E7pyIsD5YjpeURaljesA3OkJzpbPOlYy0biF2VM2s4GkN88Sy');
INSERT INTO tb_user(name, email, password) VALUES ('Alice Johnson', 'Alice Johnson@example.com', '$2a$10$10F2E7pyIsD5YjpeURaljesA3OkJzpbPOlYy0biF2VM2s4GkN88Sy');

INSERT INTO tb_role (authority) VALUES ('ROLE_USER');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1,2);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2,1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (3,1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (4,1);

INSERT INTO TB_SCHEDULE (name, expiration_date, created_at, updated_at) VALUES ('Reunião de Equipe', '2024-03-01', NOW(), NOW());
INSERT INTO TB_SCHEDULE (name, expiration_date, created_at, updated_at) VALUES ('Apresentação do Projeto', '2024-03-05', NOW(), NOW());
INSERT INTO TB_SCHEDULE (name, expiration_date, created_at, updated_at) VALUES ('Entrevista de Emprego', '2024-03-10', NOW(), NOW());
INSERT INTO TB_SCHEDULE (name, expiration_date, created_at, updated_at) VALUES ('Treinamento de Novos Funcionários', '2024-03-15', NOW(), NOW());
INSERT INTO TB_SCHEDULE (name, expiration_date, created_at, updated_at) VALUES ('Conferência Anual', '2024-03-20', NOW(), NOW());
INSERT INTO TB_SCHEDULE (name, expiration_date, created_at, updated_at) VALUES ('Seminário de Marketing', '2024-03-25', NOW(), NOW());
INSERT INTO TB_SCHEDULE (name, expiration_date, created_at, updated_at) VALUES ('Reunião de Planejamento', '2024-03-30', NOW(), NOW());
INSERT INTO TB_SCHEDULE (name, expiration_date, created_at, updated_at) VALUES ('Workshop de Inovação', '2024-04-05', NOW(), NOW());
INSERT INTO TB_SCHEDULE (name, expiration_date, created_at, updated_at) VALUES ('Curso de Desenvolvimento Profissional', '2024-04-10', NOW(), NOW());
INSERT INTO TB_SCHEDULE (name, expiration_date, created_at, updated_at) VALUES ('Apresentação de Resultados Trimestrais', '2024-04-15', NOW(), NOW());


--Inserção dos contatos

-- Inserção do contato 1 (João Silva)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('João Silva', '12345678', 'contato1@example.com', '123456789', NULL, '123.456.789-10', 1);

-- Inserção do contato 2 (Maria Souza)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Maria Souza', '23456789', 'contato2@example.com', '234567890', NULL, '987.654.321-00', 1);

-- Inserção do contato 3 (Pedro Oliveira)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Pedro Oliveira', '34567890', 'contato3@example.com', '345678901', NULL, '111.222.333-44', 2);

-- Inserção do contato 4 (Empresa A)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa A', '12345458', 'contato4@example.com', '123476789', '12345678901234', NULL, 3);

-- Inserção do contato 5 (Empresa B)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa B', '23456789', 'contato5@example.com', '234567890', '56789012345678', NULL, 3);

-- Inserção do contato 6 (Empresa C)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa C', '34567890', 'contato6@example.com', '345678901', '90123456789012', NULL, 4);

-- Inserção do contato 7 (Empresa D)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa D', '45678901', 'contato7@example.com', '456789012', '34567890123456', NULL, 4);

-- Inserção do contato 8 (Empresa E)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa E', '56789012', 'contato8@example.com', '567890123', '67890123456789', NULL, 4);

-- Inserção do contato 9 (Empresa F)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa F', '67890123', 'contato9@example.com', '678901234', '78901234567890', NULL, 5);

-- Inserção do contato 10 (Empresa G)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa G', '78901234', 'contato10@example.com', '789012345', '89012345678901', NULL, 5);

-- Inserção de contatos com CPF
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('João Silva', '12345678', 'contato1@example.com', '123456789', NULL, '123.456.789-10', 5);
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Maria Souza', '23456789', 'contato2@example.com', '234567890', NULL, '987.654.321-00', 1);
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Pedro Oliveira', '34567890', 'contato3@example.com', '345678901', NULL, '111.222.333-44', 2);
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Ana Rodrigues', '45678901', 'contato4@example.com', '456789012', NULL, '444.555.666-77', 2);
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Marcos Santos', '56789012', 'contato5@example.com', '567890123', NULL, '888.999.000-11', 3);
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Juliana Lima', '67890123', 'contato6@example.com', '678901234', NULL, '222.333.444-55', 3);
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Carla Vieira', '78901234', 'contato7@example.com', '789012345', NULL, '555.666.777-88', 4);
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Ricardo Ferreira', '89012345', 'contato8@example.com', '890123456', NULL, '999.000.111-22', 4);
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Camila Oliveira', '90123456', 'contato9@example.com', '901234567', NULL, '333.444.555-66', 5);
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Fernando Silva', '01234567', 'contato10@example.com', '012345678', NULL, '666.777.888-99', 5);

-- Inserção de contatos com CNPJ
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa A', '12345458', 'empresa1@example.com', '123476789', '12345678901234', NULL, 1);
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa B', '23456789', 'empresa2@example.com', '234567890', '56789012345678', NULL, 1);
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa C', '34567890', 'empresa3@example.com', '345678901', '90123456789012', NULL, 2);
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa D', '45678901', 'empresa4@example.com', '456789012', '34567890123456', NULL, 2);
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa E', '56789012', 'empresa5@example.com', '567890123', '67890123456789', NULL, 3);
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa F', '67890123', 'empresa6@example.com', '678901234', '78901234567890', NULL, 3);
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa G', '78901234', 'empresa7@example.com', '789012345', '89012345678901', NULL, 4);
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa H', '89012345', 'empresa8@example.com', '890123456', '90123456789012', NULL, 4);
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa I', '90123456', 'empresa9@example.com', '901234567', '01234567890123', NULL, 5);
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa J', '01234567', 'empresa10@example.com', '012345678', '12345678901234', NULL, 5);
-- Inserção do contato 1 (João Silva) na agenda 6 (Apresentação de Resultados Trimestrais)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('João Silva', '12345678', 'joao.silva@example.com', '123456789', NULL, '123.456.789-10', 6);

-- Inserção do contato 2 (Maria Souza) na agenda 6 (Apresentação de Resultados Trimestrais)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Maria Souza', '23456789', 'maria.souza@example.com', '234567890', NULL, '987.654.321-00', 6);

-- Inserção do contato 3 (Pedro Oliveira) na agenda 6 (Apresentação de Resultados Trimestrais)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Pedro Oliveira', '34567890', 'pedro.oliveira@example.com', '345678901', NULL, '111.222.333-44', 6);

-- Inserção do contato 4 (Empresa A) na agenda 7 (Apresentação de Resultados Trimestrais)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa A', '12345458', 'empresa.a@example.com', '123476789', '12345678901234', NULL, 7);

-- Inserção do contato 5 (Empresa B) na agenda 7 (Apresentação de Resultados Trimestrais)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa B', '23456789', 'empresa.b@example.com', '234567890', '56789012345678', NULL, 7);

-- Inserção do contato 6 (Empresa C) na agenda 8 (Apresentação de Resultados Trimestrais)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa C', '34567890', 'empresa.c@example.com', '345678901', '90123456789012', NULL, 8);

-- Inserção do contato 7 (Empresa D) na agenda 8 (Apresentação de Resultados Trimestrais)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa D', '45678901', 'empresa.d@example.com', '456789012', '34567890123456', NULL, 8);

-- Inserção do contato 8 (Empresa E) na agenda 8 (Apresentação de Resultados Trimestrais)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa E', '56789012', 'empresa.e@example.com', '567890123', '67890123456789', NULL, 8);

-- Inserção do contato 9 (Empresa F) na agenda 9 (Apresentação de Resultados Trimestrais)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa F', '67890123', 'empresa.f@example.com', '678901234', '78901234567890', NULL, 9);

-- Inserção do contato 10 (Empresa G) na agenda 9 (Apresentação de Resultados Trimestrais)
INSERT INTO tb_contact (name, cep, email, phone, cnpj, cpf, schedule_id) VALUES ('Empresa G', '78901234', 'empresa.g@example.com', '789012345', '89012345678901', NULL, 9);



---- Inserção dos usuários nas agendas

-- Inserção do usuário 1 (Kengi Ortega) na agenda 1 (Reunião de Equipe)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Kengi Ortega'), 1);

-- Inserção do usuário 1 (Kengi Ortega) na agenda 2 (Apresentação do Projeto)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Kengi Ortega'), 2);

-- Inserção do usuário 1 (Kengi Ortega) na agenda 3 (Entrevista de Emprego)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Kengi Ortega'), 3);

-- Inserção do usuário 2 (Maria Silva) na agenda 2 (Apresentação do Projeto)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Maria Silva'), 3);

-- Inserção do usuário 3 (John Doe) na agenda 3 (Entrevista de Emprego)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'John Doe'), 3);

-- Inserção do usuário 3 (John Doe) na agenda 4 (Treinamento de Novos Funcionários)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'John Doe'), 4);

-- Inserção do usuário 1 (Kengi Ortega) na agenda 5 (Apresentação do Projeto)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Kengi Ortega'), 5);

-- Inserção do usuário 2 (Maria Silva) na agenda 4 (Treinamento de Novos Funcionários)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Maria Silva'), 4);

-- Inserção do usuário 4 (Alice Johnson) na agenda 5 (Apresentação do Projeto)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Alice Johnson'), 5);


-- Inserção do usuário 3 (John Doe) na agenda 5 (Apresentação do Projeto)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'John Doe'), 5);

-- Inserção do usuário 4 (Alice Johnson) na agenda 2 (Apresentação do Projeto)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Alice Johnson'), 2);

-- Inserção do usuário 5 (Ana Oliveira) na agenda 3 (Entrevista de Emprego)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Ana Oliveira'), 3);

-- Inserção do usuário 5 (Ana Oliveira) na agenda 4 (Treinamento de Novos Funcionários)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Ana Oliveira'), 4);

-- Inserção do usuário 5 (Ana Oliveira) na agenda 5 (Apresentação do Projeto)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Ana Oliveira'), 5);

-- Inserção do usuário 6 (Carlos Santos) na agenda 2 (Apresentação do Projeto)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Carlos Santos'), 2);

-- Inserção do usuário 6 (Carlos Santos) na agenda 3 (Entrevista de Emprego)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Carlos Santos'), 3);

-- Inserção do usuário 1 (Kengi Ortega) na agenda 6 (Seminário de Marketing)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Kengi Ortega'), 6);

-- Inserção do usuário 1 (Kengi Ortega) na agenda 7 (Reunião de Planejamento)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Kengi Ortega'), 7);

-- Inserção do usuário 1 (Kengi Ortega) na agenda 8 (Workshop de Inovação)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Kengi Ortega'), 8);

-- Inserção do usuário 1 (Kengi Ortega) na agenda 9 (Curso de Desenvolvimento Profissional)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Kengi Ortega'), 9);

-- Inserção do usuário 2 (Maria Silva) na agenda 5 (Apresentação do Projeto)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Maria Silva'), 5);

-- Inserção do usuário 2 (Maria Silva) na agenda 6 (Seminário de Marketing)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Maria Silva'), 6);

-- Inserção do usuário 3 (John Doe) na agenda 6 (Seminário de Marketing)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'John Doe'), 6);

-- Inserção do usuário 3 (John Doe) na agenda 7 (Reunião de Planejamento)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'John Doe'), 7);

-- Inserção do usuário 4 (Alice Johnson) na agenda 8 (Workshop de Inovação)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Alice Johnson'), 8);

-- Inserção do usuário 4 (Alice Johnson) na agenda 9 (Curso de Desenvolvimento Profissional)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Alice Johnson'), 9);

-- Inserção do usuário 5 (Ana Oliveira) na agenda 6 (Seminário de Marketing)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Ana Oliveira'), 6);


