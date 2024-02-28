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
INSERT INTO tb_user(name, email, password) VALUES ('Alice Johnson', 'alice.johnson@example.com', '$2a$10$10F2E7pyIsD5YjpeURaljesA3OkJzpbPOlYy0biF2VM2s4GkN88Sy');

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

---- Inserção dos usuários nas agendas

-- Inserção do usuário 1 (Kengi Ortega) na agenda 1 (Reunião de Equipe)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Kengi Ortega'), 1);

-- Inserção do usuário 1 (Kengi Ortega) na agenda 2 (Apresentação do Projeto)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Kengi Ortega'), 2);

-- Inserção do usuário 1 (Kengi Ortega) na agenda 3 (Entrevista de Emprego)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Kengi Ortega'), 3);

-- Inserção do usuário 2 (Maria Silva) na agenda 2 (Apresentação do Projeto)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Maria Silva'), 2);

-- Inserção do usuário 3 (John Doe) na agenda 3 (Entrevista de Emprego)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'John Doe'), 3);

-- Inserção do usuário 3 (John Doe) na agenda 4 (Treinamento de Novos Funcionários)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'John Doe'), 4);

-- Inserção do usuário 4 (Alice Johnson) na agenda 4 (Treinamento de Novos Funcionários)
INSERT INTO USER_SCHEDULE (user_id, schedule_id) VALUES ((SELECT id FROM tb_user WHERE name = 'Alice Johnson'), 4);


