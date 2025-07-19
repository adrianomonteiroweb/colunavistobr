CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- USUÁRIOS - BASEADO NO ESTUDO DE CASO
-- ================================================
-- Hash SHA-256 para senha '123456': 7c4a8d09ca3762af61e59520943dc26494f8941b

-- 1. Profissionais de diferentes segmentos (conforme Business Overview)
INSERT INTO agendei.users (name, email, password_hash, role) VALUES
  -- Saúde e Bem-estar (40% TAM)
  ('Dr. Adriano Monteiro', 'adrianomonteiroweb@gmail.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'professional'),
  ('Dra. Carla Mendes', 'carla.mendes@clinicapsico.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'professional'),
  ('Dr. Roberto Silva', 'roberto.silva@cardioexpert.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'professional'),
  ('Dra. Ana Costa', 'ana.costa@nutricaointegral.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'professional'),
  ('Prof. Marina Santos', 'marina.santos@personalfit.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'professional'),
  
  -- Serviços Profissionais (25% TAM)
  ('Adv. João Pedro', 'joao.pedro@escritoriolaw.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'professional'),
  ('Contador Lucas', 'lucas.contabil@expertise.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'professional'),
  ('Coach Fernanda', 'fernanda.coach@transformation.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'professional'),
  
  -- Educação e Ensino (20% TAM)
  ('Prof. Carlos Alberto', 'carlos.alberto@mathexpert.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'professional'),
  ('Teacher Sarah', 'sarah.english@globallanguage.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'professional'),
  
  -- Beleza e Estética (15% TAM)
  ('Isabela Beauty', 'isabela.beauty@salon.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'professional'),
  ('Marcos Barbeiro', 'marcos.barbeiro@barbearia.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'professional');

-- 2. Clientes conforme estudo de caso (30 clientes ativos, 3 por profissional)
INSERT INTO agendei.users (name, email, password_hash, role) VALUES
  -- Clientes Dr. Adriano
  ('Maria Silva', 'maria.silva@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('João Santos', 'joao.santos@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Ana Paula', 'ana.paula@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  
  -- Clientes Dra. Carla
  ('Pedro Costa', 'pedro.costa@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Julia Fernandes', 'julia.fernandes@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Roberto Alves', 'roberto.alves@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  
  -- Clientes Dr. Roberto
  ('Carla Oliveira', 'carla.oliveira@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Marcos Lima', 'marcos.lima@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Lucia Martins', 'lucia.martins@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  
  -- Clientes Dra. Ana (Nutricionista)
  ('Patricia Rocha', 'patricia.rocha@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Diego Souza', 'diego.souza@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Fernanda Castro', 'fernanda.castro@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  
  -- Clientes Prof. Marina (Personal)
  ('Ricardo Gomes', 'ricardo.gomes@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Amanda Torres', 'amanda.torres@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Bruno Pereira', 'bruno.pereira@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  
  -- Clientes Adv. João
  ('Empresa XYZ Ltda', 'contato@empresaxyz.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Startup Tech', 'legal@startuptech.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('MEI Consultor', 'mei.consultor@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  
  -- Clientes Contador Lucas
  ('Loja do Bairro', 'financeiro@lojadobairro.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Freelancer Design', 'freelancer.design@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Padaria Central', 'padaria.central@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  
  -- Clientes Coach Fernanda
  ('Executivo Sênior', 'executivo.senior@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Empreendedora', 'empreendedora@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Gerente Vendas', 'gerente.vendas@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  
  -- Clientes Prof. Carlos
  ('Estudante Medicina', 'estudante.medicina@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Vestibulando', 'vestibulando@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Concurseiro', 'concurseiro@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  
  -- Clientes Teacher Sarah
  ('Executivo Internacional', 'executivo.internacional@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Estudante Intercâmbio', 'estudante.intercambio@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Profissional TI', 'profissional.ti@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  
  -- Clientes Isabela Beauty
  ('Cliente VIP 1', 'cliente.vip1@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Cliente VIP 2', 'cliente.vip2@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Cliente VIP 3', 'cliente.vip3@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  
  -- Clientes Marcos Barbeiro
  ('Barbeiro Cliente 1', 'barbeiro.cliente1@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Barbeiro Cliente 2', 'barbeiro.cliente2@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer'),
  ('Barbeiro Cliente 3', 'barbeiro.cliente3@email.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'customer');

-- 3. Admin do sistema
INSERT INTO agendei.users (name, email, password_hash, role) VALUES
  ('Admin Sistema', 'admin@agendei.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'admin');

-- ================================================
-- PROFISSIONAIS - BASEADO NO BUSINESS OVERVIEW
-- ================================================
INSERT INTO agendei.professionals (user_id, username, bio, profession_type, hourly_rate, stripe_account_id, metadata) VALUES
  -- Saúde e Bem-estar (40% TAM)
  (1, 'dr-adriano-monteiro', 'Cardiologista com 15 anos de experiência. Especialista em prevenção cardiovascular, medicina do esporte e check-ups executivos. Atendimento presencial e teleconsulta.', 'healthcare', 25000, 'acct_test_dr_adriano', '{"specialty": "cardiology", "license": "CRM-SP 123456", "experience_years": 15, "languages": ["pt", "en"], "certifications": ["Cardiologia", "Medicina do Esporte"], "location": "São Paulo, SP"}'),
  
  (2, 'dra-carla-mendes', 'Psicóloga clínica com abordagem cognitivo-comportamental. Especialista em ansiedade, depressão e desenvolvimento pessoal. Atendimento online e presencial.', 'healthcare', 18000, 'acct_test_dra_carla', '{"specialty": "psychology", "license": "CRP-SP 06/123456", "experience_years": 8, "approaches": ["TCC", "Humanista"], "languages": ["pt"], "online_only": false}'),
  
  (3, 'dr-roberto-silva', 'Clínico geral com foco em medicina preventiva. Consultas de rotina, check-ups e acompanhamento de doenças crônicas. Atendimento domiciliar disponível.', 'healthcare', 20000, 'acct_test_dr_roberto', '{"specialty": "general_medicine", "license": "CRM-RJ 789012", "experience_years": 12, "services": ["consulta_geral", "check_up", "domiciliar"], "languages": ["pt", "es"]}'),
  
  (4, 'dra-ana-costa', 'Nutricionista especializada em emagrecimento saudável e nutrição esportiva. Planos alimentares personalizados e acompanhamento nutricional.', 'healthcare', 15000, 'acct_test_dra_ana', '{"specialty": "nutrition", "license": "CRN-SP 12345", "experience_years": 6, "specializations": ["emagrecimento", "esportiva", "funcional"], "consultation_types": ["presencial", "online"]}'),
  
  (5, 'prof-marina-santos', 'Personal trainer certificada CREF. Especialista em treinamento funcional, musculação e condicionamento físico. Treinos personalizados e em grupo.', 'fitness', 12000, 'acct_test_prof_marina', '{"specialty": "personal_training", "license": "CREF 123456-G/SP", "experience_years": 5, "specializations": ["funcional", "musculacao", "condicionamento"], "group_training": true}'),
  
  -- Serviços Profissionais (25% TAM)
  (6, 'adv-joao-pedro', 'Advogado especializado em direito empresarial e startups. Consultoria jurídica, contratos e assessoria legal para pequenas e médias empresas.', 'legal', 35000, 'acct_test_adv_joao', '{"specialty": "business_law", "license": "OAB-SP 345678", "experience_years": 10, "areas": ["empresarial", "contratos", "startups"], "languages": ["pt", "en"]}'),
  
  (7, 'contador-lucas', 'Contador com expertise em contabilidade digital e planejamento tributário. Atendimento para MEI, pequenas empresas e profissionais liberais.', 'accounting', 25000, 'acct_test_contador_lucas', '{"specialty": "digital_accounting", "license": "CRC-SP 1234567", "experience_years": 7, "services": ["mei", "pequenas_empresas", "planejamento_tributario"], "softwares": ["Conta Azul", "Sage"]}'),
  
  (8, 'coach-fernanda', 'Coach executiva e de carreira. Especialista em liderança, transição de carreira e desenvolvimento de alta performance. Sessões individuais e em grupo.', 'coaching', 30000, 'acct_test_coach_fernanda', '{"specialty": "executive_coaching", "certifications": ["ICF", "SBCoaching"], "experience_years": 9, "areas": ["lideranca", "carreira", "performance"], "languages": ["pt", "en"]}'),
  
  -- Educação e Ensino (20% TAM)
  (9, 'prof-carlos-alberto', 'Professor de matemática e física com 20 anos de experiência. Preparação para vestibular, ENEM e concursos. Aulas individuais e em grupo.', 'education', 10000, 'acct_test_prof_carlos', '{"specialty": "exact_sciences", "subjects": ["matematica", "fisica"], "experience_years": 20, "levels": ["ensino_medio", "pre_vestibular", "concursos"], "group_classes": true}'),
  
  (10, 'teacher-sarah', 'Professora de inglês nativa com certificação internacional. Aulas para todos os níveis, conversação e preparação para exames internacionais.', 'education', 12000, 'acct_test_teacher_sarah', '{"specialty": "english_language", "native_speaker": true, "certifications": ["TESOL", "CELTA"], "experience_years": 6, "levels": ["basico", "intermediario", "avancado"], "exam_prep": ["TOEFL", "IELTS"]}'),
  
  -- Beleza e Estética (15% TAM)
  (11, 'isabela-beauty', 'Esteticista e designer de sobrancelhas. Especializada em tratamentos faciais, limpeza de pele e micropigmentação. Atendimento em domicílio disponível.', 'beauty', 8000, 'acct_test_isabela', '{"specialty": "facial_aesthetics", "services": ["limpeza_pele", "design_sobrancelhas", "micropigmentacao"], "experience_years": 4, "home_service": true, "certifications": ["SENAC", "SEBRAE"]}'),
  
  (12, 'marcos-barbeiro', 'Barbeiro profissional com técnicas clássicas e modernas. Cortes masculinos, barba, bigode e tratamentos capilares. Ambiente descontraído e profissional.', 'beauty', 6000, 'acct_test_marcos', '{"specialty": "barbershop", "services": ["corte_masculino", "barba", "bigode", "tratamento_capilar"], "experience_years": 8, "style": "classico_moderno", "ambiente": "descontraido"}');

-- ================================================
-- CLIENTES - BASEADO NO ESTUDO DE CASO
-- ================================================
INSERT INTO agendei.customers (user_id, stripe_customer_id) VALUES
  -- Clientes Dr. Adriano
  (13, 'cus_test_maria_silva'),
  (14, 'cus_test_joao_santos'),
  (15, 'cus_test_ana_paula'),
  
  -- Clientes Dra. Carla
  (16, 'cus_test_pedro_costa'),
  (17, 'cus_test_julia_fernandes'),
  (18, 'cus_test_roberto_alves'),
  
  -- Clientes Dr. Roberto
  (19, 'cus_test_carla_oliveira'),
  (20, 'cus_test_marcos_lima'),
  (21, 'cus_test_lucia_martins'),
  
  -- Clientes Dra. Ana
  (22, 'cus_test_patricia_rocha'),
  (23, 'cus_test_diego_souza'),
  (24, 'cus_test_fernanda_castro'),
  
  -- Clientes Prof. Marina
  (25, 'cus_test_ricardo_gomes'),
  (26, 'cus_test_amanda_torres'),
  (27, 'cus_test_bruno_pereira'),
  
  -- Clientes Adv. João
  (28, 'cus_test_empresa_xyz'),
  (29, 'cus_test_startup_tech'),
  (30, 'cus_test_mei_consultor'),
  
  -- Clientes Contador Lucas
  (31, 'cus_test_loja_bairro'),
  (32, 'cus_test_freelancer_design'),
  (33, 'cus_test_padaria_central'),
  
  -- Clientes Coach Fernanda
  (34, 'cus_test_executivo_senior'),
  (35, 'cus_test_empreendedora'),
  (36, 'cus_test_gerente_vendas'),
  
  -- Clientes Prof. Carlos
  (37, 'cus_test_estudante_medicina'),
  (38, 'cus_test_vestibulando'),
  (39, 'cus_test_concurseiro'),
  
  -- Clientes Teacher Sarah
  (40, 'cus_test_executivo_internacional'),
  (41, 'cus_test_estudante_intercambio'),
  (42, 'cus_test_profissional_ti'),
  
  -- Clientes Isabela Beauty
  (43, 'cus_test_cliente_vip1'),
  (44, 'cus_test_cliente_vip2'),
  (45, 'cus_test_cliente_vip3'),
  
  -- Clientes Marcos Barbeiro
  (46, 'cus_test_barbeiro_cliente1'),
  (47, 'cus_test_barbeiro_cliente2'),
  (48, 'cus_test_barbeiro_cliente3');

-- ================================================
-- PACOTES DE SERVIÇOS - BASEADO NO BUSINESS MODEL
-- ================================================
INSERT INTO agendei.packages (professional_id, title, description, price, number_of_sessions, allow_rollover, max_rollover_sessions, stripe_price_id, stripe_product_id) VALUES
  -- Dr. Adriano (Cardiologista) - Ticket médio R$ 250
  (1, 'Consulta Cardiológica', 'Consulta individual para avaliação cardiovascular completa', 25000, 1, false, 0, 'price_cardio_single', 'prod_cardio_single'),
  (1, 'Check-up Executivo', 'Pacote completo com 3 consultas + exames para executivos', 70000, 3, true, 1, 'price_cardio_checkup', 'prod_cardio_checkup'),
  (1, 'Acompanhamento Preventivo', 'Pacote mensal com 4 consultas de prevenção cardiovascular', 90000, 4, true, 2, 'price_cardio_preventivo', 'prod_cardio_preventivo'),
  
  -- Dra. Carla (Psicóloga) - Ticket médio R$ 180
  (2, 'Sessão Individual', 'Sessão individual de psicoterapia cognitivo-comportamental', 18000, 1, false, 0, 'price_psico_single', 'prod_psico_single'),
  (2, 'Pacote Semanal', 'Pacote com 4 sessões semanais de psicoterapia', 64800, 4, true, 1, 'price_psico_weekly', 'prod_psico_weekly'),
  (2, 'Tratamento Intensivo', 'Pacote intensivo com 8 sessões para casos específicos', 129600, 8, true, 2, 'price_psico_intensive', 'prod_psico_intensive'),
  
  -- Dr. Roberto (Clínico Geral) - Ticket médio R$ 200
  (3, 'Consulta Geral', 'Consulta clínica geral com avaliação completa', 20000, 1, false, 0, 'price_clinico_single', 'prod_clinico_single'),
  (3, 'Atendimento Domiciliar', 'Consulta domiciliar para maior comodidade', 35000, 1, false, 0, 'price_clinico_home', 'prod_clinico_home'),
  (3, 'Acompanhamento Crônico', 'Pacote mensal para acompanhamento de doenças crônicas', 72000, 4, true, 1, 'price_clinico_chronic', 'prod_clinico_chronic'),
  
  -- Dra. Ana (Nutricionista) - Ticket médio R$ 150
  (4, 'Consulta Nutricional', 'Consulta individual com plano alimentar personalizado', 15000, 1, false, 0, 'price_nutri_single', 'prod_nutri_single'),
  (4, 'Plano Emagrecimento', 'Pacote com 6 consultas para emagrecimento saudável', 81000, 6, true, 2, 'price_nutri_weight', 'prod_nutri_weight'),
  (4, 'Nutrição Esportiva', 'Pacote especializado para atletas e praticantes de esporte', 90000, 6, true, 1, 'price_nutri_sport', 'prod_nutri_sport'),
  
  -- Prof. Marina (Personal Trainer) - Ticket médio R$ 120
  (5, 'Personal Training', 'Sessão individual de treinamento personalizado', 12000, 1, false, 0, 'price_personal_single', 'prod_personal_single'),
  (5, 'Pacote Semanal', 'Pacote com 8 treinos semanais (2x por semana)', 86400, 8, true, 2, 'price_personal_weekly', 'prod_personal_weekly'),
  (5, 'Treino Funcional', 'Pacote especializado em treinamento funcional', 108000, 10, true, 3, 'price_personal_functional', 'prod_personal_functional'),
  
  -- Adv. João (Advogado) - Ticket médio R$ 350
  (6, 'Consultoria Jurídica', 'Consulta jurídica especializada em direito empresarial', 35000, 1, false, 0, 'price_adv_single', 'prod_adv_single'),
  (6, 'Assessoria Mensal', 'Assessoria jurídica mensal para pequenas empresas', 105000, 3, true, 1, 'price_adv_monthly', 'prod_adv_monthly'),
  (6, 'Consultoria Startups', 'Pacote completo para estruturação de startups', 210000, 6, true, 2, 'price_adv_startup', 'prod_adv_startup'),
  
  -- Contador Lucas - Ticket médio R$ 250
  (7, 'Consultoria Contábil', 'Consultoria especializada em contabilidade digital', 25000, 1, false, 0, 'price_contador_single', 'prod_contador_single'),
  (7, 'Serviços MEI', 'Pacote completo para microempreendedores individuais', 75000, 3, true, 1, 'price_contador_mei', 'prod_contador_mei'),
  (7, 'Planejamento Tributário', 'Consultoria anual para planejamento tributário', 150000, 6, true, 2, 'price_contador_tributario', 'prod_contador_tributario'),
  
  -- Coach Fernanda - Ticket médio R$ 300
  (8, 'Sessão de Coaching', 'Sessão individual de coaching executivo', 30000, 1, false, 0, 'price_coach_single', 'prod_coach_single'),
  (8, 'Programa de Liderança', 'Programa com 6 sessões para desenvolvimento de liderança', 162000, 6, true, 2, 'price_coach_leadership', 'prod_coach_leadership'),
  (8, 'Transição de Carreira', 'Programa intensivo para mudança de carreira', 240000, 8, true, 3, 'price_coach_career', 'prod_coach_career'),
  
  -- Prof. Carlos (Matemática) - Ticket médio R$ 100
  (9, 'Aula Individual', 'Aula particular de matemática e física', 10000, 1, false, 0, 'price_math_single', 'prod_math_single'),
  (9, 'Pacote Semanal', 'Pacote com 4 aulas semanais de reforço', 36000, 4, true, 1, 'price_math_weekly', 'prod_math_weekly'),
  (9, 'Preparação ENEM', 'Pacote intensivo para preparação do ENEM', 80000, 8, true, 2, 'price_math_enem', 'prod_math_enem'),
  
  -- Teacher Sarah (Inglês) - Ticket médio R$ 120
  (10, 'Aula de Inglês', 'Aula individual de inglês para todos os níveis', 12000, 1, false, 0, 'price_english_single', 'prod_english_single'),
  (10, 'Conversação Avançada', 'Pacote com 8 aulas focadas em conversação', 86400, 8, true, 2, 'price_english_conversation', 'prod_english_conversation'),
  (10, 'Preparação TOEFL', 'Curso intensivo para preparação do TOEFL', 144000, 12, true, 3, 'price_english_toefl', 'prod_english_toefl'),
  
  -- Isabela Beauty - Ticket médio R$ 80
  (11, 'Limpeza de Pele', 'Limpeza de pele profissional com extração', 8000, 1, false, 0, 'price_beauty_cleaning', 'prod_beauty_cleaning'),
  (11, 'Design de Sobrancelhas', 'Design profissional de sobrancelhas', 6000, 1, false, 0, 'price_beauty_eyebrow', 'prod_beauty_eyebrow'),
  (11, 'Pacote Mensal Beleza', 'Pacote com 4 procedimentos mensais', 28800, 4, true, 1, 'price_beauty_monthly', 'prod_beauty_monthly'),
  
  -- Marcos Barbeiro - Ticket médio R$ 60
  (12, 'Corte Masculino', 'Corte de cabelo masculino com acabamento', 6000, 1, false, 0, 'price_barber_cut', 'prod_barber_cut'),
  (12, 'Corte + Barba', 'Corte completo com barba e bigode', 8000, 1, false, 0, 'price_barber_full', 'prod_barber_full'),
  (12, 'Pacote Mensal', 'Pacote com 4 cortes mensais', 21600, 4, true, 1, 'price_barber_monthly', 'prod_barber_monthly');

-- ================================================
-- DISPONIBILIDADES COM RRULES - CASOS REALISTAS
-- ================================================
-- Dr. Adriano - Cardiologista (Segunda a Sexta, 8h às 18h - Caso Profissional)
INSERT INTO agendei.availabilities (professional_id, title, rrule, start_time, end_time, duration_minutes, buffer_minutes, effective_from) VALUES
  (1, 'Consultas Manhã', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', '08:00:00', '12:00:00', 60, 15, NOW()),
  (1, 'Consultas Tarde', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', '13:00:00', '18:00:00', 60, 15, NOW()),
  
-- Dra. Carla - Psicóloga (Segunda a Sexta, 9h às 19h + Sábado manhã)
  (2, 'Terapia Manhã', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', '09:00:00', '12:00:00', 50, 10, NOW()),
  (2, 'Terapia Tarde', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', '14:00:00', '19:00:00', 50, 10, NOW()),
  (2, 'Terapia Sábado', 'RRULE:FREQ=WEEKLY;BYDAY=SA', '09:00:00', '13:00:00', 50, 10, NOW()),
  
-- Dr. Roberto - Clínico (Segunda a Sexta, 7h às 17h - Atendimento domiciliar)
  (3, 'Consultório Manhã', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', '07:00:00', '12:00:00', 45, 15, NOW()),
  (3, 'Consultório Tarde', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', '13:00:00', '17:00:00', 45, 15, NOW()),
  (3, 'Domiciliar Sábado', 'RRULE:FREQ=WEEKLY;BYDAY=SA', '08:00:00', '16:00:00', 90, 30, NOW()),
  
-- Dra. Ana - Nutricionista (Segunda a Sexta, 8h às 18h)
  (4, 'Consultas Nutricionais', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', '08:00:00', '12:00:00', 60, 0, NOW()),
  (4, 'Retornos Tarde', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', '14:00:00', '18:00:00', 45, 15, NOW()),
  
-- Prof. Marina - Personal (Segunda a Sábado, 6h às 21h)
  (5, 'Personal Manhã', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR,SA', '06:00:00', '10:00:00', 60, 0, NOW()),
  (5, 'Personal Tarde', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR,SA', '14:00:00', '18:00:00', 60, 0, NOW()),
  (5, 'Personal Noite', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', '18:00:00', '21:00:00', 60, 0, NOW()),
  
-- Adv. João - Advogado (Segunda a Sexta, 9h às 18h)
  (6, 'Consultas Jurídicas', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', '09:00:00', '12:00:00', 90, 30, NOW()),
  (6, 'Assessoria Empresarial', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', '14:00:00', '18:00:00', 90, 30, NOW()),
  
-- Contador Lucas (Segunda a Sexta, 8h às 17h)
  (7, 'Consultoria Contábil', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', '08:00:00', '12:00:00', 60, 0, NOW()),
  (7, 'Atendimento Empresas', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', '13:00:00', '17:00:00', 60, 0, NOW()),
  
-- Coach Fernanda (Segunda a Sexta, 10h às 19h)
  (8, 'Coaching Executivo', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', '10:00:00', '12:00:00', 90, 30, NOW()),
  (8, 'Coaching Carreira', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', '14:00:00', '19:00:00', 90, 30, NOW()),
  
-- Prof. Carlos - Matemática (Segunda, Quarta, Sexta, 14h às 22h + Sábado)
  (9, 'Aulas Particulares', 'RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR', '14:00:00', '22:00:00', 90, 30, NOW()),
  (9, 'Preparação ENEM', 'RRULE:FREQ=WEEKLY;BYDAY=SA', '08:00:00', '18:00:00', 90, 30, NOW()),
  
-- Teacher Sarah - Inglês (Segunda a Sexta, 8h às 20h)
  (10, 'Aulas Inglês Manhã', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', '08:00:00', '12:00:00', 60, 0, NOW()),
  (10, 'Aulas Inglês Tarde', 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', '14:00:00', '20:00:00', 60, 0, NOW()),
  
-- Isabela Beauty (Terça a Sábado, 9h às 18h)
  (11, 'Procedimentos Estéticos', 'RRULE:FREQ=WEEKLY;BYDAY=TU,WE,TH,FR,SA', '09:00:00', '12:00:00', 60, 30, NOW()),
  (11, 'Atendimento Domiciliar', 'RRULE:FREQ=WEEKLY;BYDAY=TU,WE,TH,FR,SA', '14:00:00', '18:00:00', 90, 30, NOW()),
  
-- Marcos Barbeiro (Terça a Sábado, 8h às 19h)
  (12, 'Barbearia Manhã', 'RRULE:FREQ=WEEKLY;BYDAY=TU,WE,TH,FR,SA', '08:00:00', '12:00:00', 45, 15, NOW()),
  (12, 'Barbearia Tarde', 'RRULE:FREQ=WEEKLY;BYDAY=TU,WE,TH,FR,SA', '13:00:00', '19:00:00', 45, 15, NOW());

-- ================================================
-- EXCEÇÕES DE DISPONIBILIDADE - CASOS PROFISSIONAIS
-- ================================================
-- Dr. Adriano - Implementação do Caso Profissional
-- Dia do Trabalhador (1º de maio) - Bloqueio TOTAL
INSERT INTO agendei.availability_exceptions (professional_id, exception_type, title, start_at, end_at, is_recurring, rrule, notes) VALUES
  (1, 'block', 'Dia do Trabalhador', '2025-05-01 00:00:00', '2025-05-01 23:59:59', true, 'RRULE:FREQ=YEARLY;BYMONTHDAY=1;BYMONTH=5', 'Feriado nacional - 0 slots disponíveis'),
  
-- Aniversário Pessoal (15 de março) - Bloqueio PARCIAL (50% do horário)
  (1, 'block', 'Aniversário Pessoal', '2025-03-15 08:00:00', '2025-03-15 13:00:00', true, 'RRULE:FREQ=YEARLY;BYMONTHDAY=15;BYMONTH=3', 'Aniversário - atendimento apenas no período da tarde (4 slots)'),
  
-- Férias de Final de Ano
  (1, 'block', 'Férias de Final de Ano', '2025-12-20 00:00:00', '2026-01-05 23:59:59', false, null, 'Período de férias programadas'),
  
-- Congresso Cardiológico 
  (1, 'block', 'Congresso Brasileiro de Cardiologia', '2025-09-15 00:00:00', '2025-09-17 23:59:59', false, null, 'Participação em congresso científico'),

-- Dra. Carla - Exceções da Psicóloga
  (2, 'block', 'Congresso de Psicologia', '2025-11-10 00:00:00', '2025-11-12 23:59:59', false, null, 'Participação em congresso científico'),
  (2, 'block', 'Férias Janeiro', '2025-01-15 00:00:00', '2025-01-30 23:59:59', false, null, 'Período de férias'),

-- Dr. Roberto - Exceções do Clínico
  (3, 'block', 'Plantão Hospital', '2025-06-01 00:00:00', '2025-06-01 23:59:59', false, null, 'Plantão médico - sem atendimento consultório'),
  (3, 'modify', 'Horário Especial - Domiciliar', '2025-07-20 00:00:00', '2025-07-20 23:59:59', false, null, 'Dia dedicado exclusivamente a atendimento domiciliar'),

-- Dra. Ana - Exceções da Nutricionista
  (4, 'block', 'Curso de Atualização', '2025-08-05 00:00:00', '2025-08-07 23:59:59', false, null, 'Curso de nutrição esportiva'),
  (4, 'block', 'Férias Meio do Ano', '2025-07-01 00:00:00', '2025-07-15 23:59:59', false, null, 'Período de férias'),

-- Prof. Marina - Exceções da Personal
  (5, 'modify', 'Evento Academia', '2025-07-10 00:00:00', '2025-07-10 23:59:59', false, null, 'Academia terá evento - horário reduzido'),
  (5, 'block', 'Competição Fitness', '2025-10-15 00:00:00', '2025-10-17 23:59:59', false, null, 'Participação em competição'),

-- Adv. João - Exceções do Advogado
  (6, 'block', 'Audiência Tribunal', '2025-06-10 09:00:00', '2025-06-10 17:00:00', false, null, 'Audiência no tribunal - dia todo ocupado'),
  (6, 'block', 'Congresso Jurídico', '2025-09-20 00:00:00', '2025-09-22 23:59:59', false, null, 'Congresso de direito empresarial'),

-- Contador Lucas - Exceções do Contador
  (7, 'block', 'Fechamento Fiscal', '2025-04-28 00:00:00', '2025-04-30 23:59:59', false, null, 'Período de fechamento fiscal - sem novos atendimentos'),
  (7, 'block', 'Treinamento Software', '2025-08-15 00:00:00', '2025-08-16 23:59:59', false, null, 'Treinamento em novo software contábil'),

-- Coach Fernanda - Exceções da Coach
  (8, 'block', 'Workshop Internacional', '2025-10-05 00:00:00', '2025-10-07 23:59:59', false, null, 'Workshop de coaching executivo'),
  (8, 'modify', 'Sessões Online', '2025-11-20 00:00:00', '2025-11-22 23:59:59', false, null, 'Período dedicado exclusivamente a sessões online'),

-- Prof. Carlos - Exceções do Professor
  (9, 'block', 'Período de Provas', '2025-11-15 00:00:00', '2025-11-30 23:59:59', false, null, 'Período de provas - sem aulas particulares'),
  (9, 'modify', 'Intensivo ENEM', '2025-10-01 00:00:00', '2025-10-31 23:59:59', false, null, 'Mês dedicado intensivamente ao ENEM'),

-- Teacher Sarah - Exceções da Professora
  (10, 'block', 'Férias na Inglaterra', '2025-12-01 00:00:00', '2025-12-20 23:59:59', false, null, 'Viagem para a Inglaterra - sem aulas'),
  (10, 'modify', 'Preparação TOEFL', '2025-09-01 00:00:00', '2025-09-30 23:59:59', false, null, 'Mês focado em preparação para TOEFL'),

-- Isabela Beauty - Exceções da Esteticista
  (11, 'block', 'Curso Avançado', '2025-06-15 00:00:00', '2025-06-17 23:59:59', false, null, 'Curso de micropigmentação avançada'),
  (11, 'modify', 'Horário Especial Noivas', '2025-05-10 00:00:00', '2025-05-10 23:59:59', false, null, 'Dia dedicado ao atendimento de noivas'),

-- Marcos Barbeiro - Exceções do Barbeiro
  (12, 'block', 'Reforma Barbearia', '2025-08-01 00:00:00', '2025-08-05 23:59:59', false, null, 'Reforma da barbearia - fechado'),
  (12, 'modify', 'Evento Especial', '2025-12-15 00:00:00', '2025-12-15 23:59:59', false, null, 'Evento de fim de ano - horário especial');

-- ================================================
-- SLOTS DE DISPONIBILIDADE - BASEADO NO ESTUDO DE CASO
-- ================================================
-- Gerar slots para próxima semana para todos os profissionais
-- Dr. Adriano - Próximos slots disponíveis
INSERT INTO agendei.availability_slots (availability_id, professional_id, start_at, end_at, status) VALUES
  -- Segunda-feira próxima
  (1, 1, NOW() + INTERVAL '7 days' + TIME '08:00:00', NOW() + INTERVAL '7 days' + TIME '09:00:00', 'available'),
  (1, 1, NOW() + INTERVAL '7 days' + TIME '09:15:00', NOW() + INTERVAL '7 days' + TIME '10:15:00', 'available'),
  (1, 1, NOW() + INTERVAL '7 days' + TIME '10:30:00', NOW() + INTERVAL '7 days' + TIME '11:30:00', 'available'),
  (2, 1, NOW() + INTERVAL '7 days' + TIME '13:00:00', NOW() + INTERVAL '7 days' + TIME '14:00:00', 'available'),
  (2, 1, NOW() + INTERVAL '7 days' + TIME '14:15:00', NOW() + INTERVAL '7 days' + TIME '15:15:00', 'available'),
  
  -- Terça-feira próxima
  (1, 1, NOW() + INTERVAL '8 days' + TIME '08:00:00', NOW() + INTERVAL '8 days' + TIME '09:00:00', 'available'),
  (1, 1, NOW() + INTERVAL '8 days' + TIME '09:15:00', NOW() + INTERVAL '8 days' + TIME '10:15:00', 'available'),
  (2, 1, NOW() + INTERVAL '8 days' + TIME '13:00:00', NOW() + INTERVAL '8 days' + TIME '14:00:00', 'available'),
  (2, 1, NOW() + INTERVAL '8 days' + TIME '14:15:00', NOW() + INTERVAL '8 days' + TIME '15:15:00', 'available'),
  
-- Dra. Carla - Slots de terapia
  (3, 2, NOW() + INTERVAL '7 days' + TIME '09:00:00', NOW() + INTERVAL '7 days' + TIME '09:50:00', 'available'),
  (3, 2, NOW() + INTERVAL '7 days' + TIME '10:00:00', NOW() + INTERVAL '7 days' + TIME '10:50:00', 'available'),
  (3, 2, NOW() + INTERVAL '7 days' + TIME '11:00:00', NOW() + INTERVAL '7 days' + TIME '11:50:00', 'available'),
  (4, 2, NOW() + INTERVAL '7 days' + TIME '14:00:00', NOW() + INTERVAL '7 days' + TIME '14:50:00', 'available'),
  (4, 2, NOW() + INTERVAL '7 days' + TIME '15:00:00', NOW() + INTERVAL '7 days' + TIME '15:50:00', 'available'),
  
-- Dr. Roberto - Slots consultório
  (6, 3, NOW() + INTERVAL '7 days' + TIME '07:00:00', NOW() + INTERVAL '7 days' + TIME '07:45:00', 'available'),
  (6, 3, NOW() + INTERVAL '7 days' + TIME '08:00:00', NOW() + INTERVAL '7 days' + TIME '08:45:00', 'available'),
  (6, 3, NOW() + INTERVAL '7 days' + TIME '09:00:00', NOW() + INTERVAL '7 days' + TIME '09:45:00', 'available'),
  (7, 3, NOW() + INTERVAL '7 days' + TIME '13:00:00', NOW() + INTERVAL '7 days' + TIME '13:45:00', 'available'),
  (7, 3, NOW() + INTERVAL '7 days' + TIME '14:00:00', NOW() + INTERVAL '7 days' + TIME '14:45:00', 'available'),
  
-- Dra. Ana - Slots nutrição
  (9, 4, NOW() + INTERVAL '7 days' + TIME '08:00:00', NOW() + INTERVAL '7 days' + TIME '09:00:00', 'available'),
  (9, 4, NOW() + INTERVAL '7 days' + TIME '09:00:00', NOW() + INTERVAL '7 days' + TIME '10:00:00', 'available'),
  (10, 4, NOW() + INTERVAL '7 days' + TIME '14:00:00', NOW() + INTERVAL '7 days' + TIME '14:45:00', 'available'),
  (10, 4, NOW() + INTERVAL '7 days' + TIME '15:00:00', NOW() + INTERVAL '7 days' + TIME '15:45:00', 'available'),
  
-- Prof. Marina - Slots personal
  (11, 5, NOW() + INTERVAL '7 days' + TIME '06:00:00', NOW() + INTERVAL '7 days' + TIME '07:00:00', 'available'),
  (11, 5, NOW() + INTERVAL '7 days' + TIME '07:00:00', NOW() + INTERVAL '7 days' + TIME '08:00:00', 'available'),
  (12, 5, NOW() + INTERVAL '7 days' + TIME '14:00:00', NOW() + INTERVAL '7 days' + TIME '15:00:00', 'available'),
  (12, 5, NOW() + INTERVAL '7 days' + TIME '15:00:00', NOW() + INTERVAL '7 days' + TIME '16:00:00', 'available'),
  
-- Adv. João - Slots consultoria
  (14, 6, NOW() + INTERVAL '7 days' + TIME '09:00:00', NOW() + INTERVAL '7 days' + TIME '10:30:00', 'available'),
  (14, 6, NOW() + INTERVAL '7 days' + TIME '11:00:00', NOW() + INTERVAL '7 days' + TIME '12:30:00', 'available'),
  (15, 6, NOW() + INTERVAL '7 days' + TIME '14:00:00', NOW() + INTERVAL '7 days' + TIME '15:30:00', 'available'),
  (15, 6, NOW() + INTERVAL '7 days' + TIME '16:00:00', NOW() + INTERVAL '7 days' + TIME '17:30:00', 'available'),
  
-- Mais slots para outros profissionais...
  (16, 7, NOW() + INTERVAL '7 days' + TIME '08:00:00', NOW() + INTERVAL '7 days' + TIME '09:00:00', 'available'),
  (17, 7, NOW() + INTERVAL '7 days' + TIME '13:00:00', NOW() + INTERVAL '7 days' + TIME '14:00:00', 'available'),
  (18, 8, NOW() + INTERVAL '7 days' + TIME '10:00:00', NOW() + INTERVAL '7 days' + TIME '11:30:00', 'available'),
  (19, 8, NOW() + INTERVAL '7 days' + TIME '14:00:00', NOW() + INTERVAL '7 days' + TIME '15:30:00', 'available'),
  (20, 9, NOW() + INTERVAL '7 days' + TIME '14:00:00', NOW() + INTERVAL '7 days' + TIME '15:30:00', 'available'),
  (22, 10, NOW() + INTERVAL '7 days' + TIME '08:00:00', NOW() + INTERVAL '7 days' + TIME '09:00:00', 'available'),
  (23, 10, NOW() + INTERVAL '7 days' + TIME '14:00:00', NOW() + INTERVAL '7 days' + TIME '15:00:00', 'available'),
  (24, 11, NOW() + INTERVAL '7 days' + TIME '09:00:00', NOW() + INTERVAL '7 days' + TIME '10:00:00', 'available'),
  (26, 12, NOW() + INTERVAL '7 days' + TIME '08:00:00', NOW() + INTERVAL '7 days' + TIME '08:45:00', 'available'),
  (26, 12, NOW() + INTERVAL '7 days' + TIME '09:00:00', NOW() + INTERVAL '7 days' + TIME '09:45:00', 'available');

-- ================================================
-- PAGAMENTOS - BASEADO NO ESTUDO DE CASO (GMV R$ 12.000/mês)
-- ================================================
INSERT INTO agendei.payments (stripe_payment_intent_id, stripe_session_id, amount, currency, status, method, customer_id, professional_id, created_at) VALUES
  -- Pagamentos Dr. Adriano (3 clientes x R$ 250 x 2 agendamentos/semana = R$ 1.500/semana)
  ('pi_adriano_001', 'cs_adriano_001', 25000, 'brl', 'succeeded', 'card', 1, 1, NOW() - INTERVAL '10 days'),
  ('pi_adriano_002', 'cs_adriano_002', 25000, 'brl', 'succeeded', 'pix', 2, 1, NOW() - INTERVAL '8 days'),
  ('pi_adriano_003', 'cs_adriano_003', 25000, 'brl', 'succeeded', 'card', 3, 1, NOW() - INTERVAL '6 days'),
  ('pi_adriano_004', 'cs_adriano_004', 25000, 'brl', 'succeeded', 'card', 1, 1, NOW() - INTERVAL '4 days'),
  ('pi_adriano_005', 'cs_adriano_005', 25000, 'brl', 'succeeded', 'pix', 2, 1, NOW() - INTERVAL '2 days'),
  ('pi_adriano_006', 'cs_adriano_006', 25000, 'brl', 'succeeded', 'card', 3, 1, NOW() - INTERVAL '1 day'),
  
  -- Pagamentos Dra. Carla (3 clientes x R$ 180 x 2 agendamentos/semana = R$ 1.080/semana)
  ('pi_carla_001', 'cs_carla_001', 18000, 'brl', 'succeeded', 'card', 4, 2, NOW() - INTERVAL '9 days'),
  ('pi_carla_002', 'cs_carla_002', 18000, 'brl', 'succeeded', 'pix', 5, 2, NOW() - INTERVAL '7 days'),
  ('pi_carla_003', 'cs_carla_003', 18000, 'brl', 'succeeded', 'card', 6, 2, NOW() - INTERVAL '5 days'),
  ('pi_carla_004', 'cs_carla_004', 18000, 'brl', 'succeeded', 'card', 4, 2, NOW() - INTERVAL '3 days'),
  ('pi_carla_005', 'cs_carla_005', 18000, 'brl', 'succeeded', 'pix', 5, 2, NOW() - INTERVAL '1 day'),
  ('pi_carla_006', 'cs_carla_006', 64800, 'brl', 'succeeded', 'card', 6, 2, NOW() - INTERVAL '5 days'), -- Pacote semanal
  
  -- Pagamentos Dr. Roberto (3 clientes x R$ 200 x 2 agendamentos/semana = R$ 1.200/semana)
  ('pi_roberto_001', 'cs_roberto_001', 20000, 'brl', 'succeeded', 'card', 7, 3, NOW() - INTERVAL '8 days'),
  ('pi_roberto_002', 'cs_roberto_002', 35000, 'brl', 'succeeded', 'pix', 8, 3, NOW() - INTERVAL '6 days'), -- Domiciliar
  ('pi_roberto_003', 'cs_roberto_003', 20000, 'brl', 'succeeded', 'card', 9, 3, NOW() - INTERVAL '4 days'),
  ('pi_roberto_004', 'cs_roberto_004', 20000, 'brl', 'succeeded', 'card', 7, 3, NOW() - INTERVAL '2 days'),
  ('pi_roberto_005', 'cs_roberto_005', 35000, 'brl', 'succeeded', 'pix', 8, 3, NOW() - INTERVAL '1 day'),
  
  -- Pagamentos Dra. Ana (3 clientes x R$ 150 x 2 agendamentos/semana = R$ 900/semana)
  ('pi_ana_001', 'cs_ana_001', 15000, 'brl', 'succeeded', 'card', 10, 4, NOW() - INTERVAL '9 days'),
  ('pi_ana_002', 'cs_ana_002', 15000, 'brl', 'succeeded', 'pix', 11, 4, NOW() - INTERVAL '7 days'),
  ('pi_ana_003', 'cs_ana_003', 81000, 'brl', 'succeeded', 'card', 12, 4, NOW() - INTERVAL '5 days'), -- Pacote emagrecimento
  ('pi_ana_004', 'cs_ana_004', 15000, 'brl', 'succeeded', 'card', 10, 4, NOW() - INTERVAL '3 days'),
  ('pi_ana_005', 'cs_ana_005', 15000, 'brl', 'succeeded', 'pix', 11, 4, NOW() - INTERVAL '1 day'),
  
  -- Pagamentos Prof. Marina (3 clientes x R$ 120 x 2 agendamentos/semana = R$ 720/semana)
  ('pi_marina_001', 'cs_marina_001', 12000, 'brl', 'succeeded', 'card', 13, 5, NOW() - INTERVAL '8 days'),
  ('pi_marina_002', 'cs_marina_002', 12000, 'brl', 'succeeded', 'pix', 14, 5, NOW() - INTERVAL '6 days'),
  ('pi_marina_003', 'cs_marina_003', 86400, 'brl', 'succeeded', 'card', 15, 5, NOW() - INTERVAL '4 days'), -- Pacote semanal
  ('pi_marina_004', 'cs_marina_004', 12000, 'brl', 'succeeded', 'card', 13, 5, NOW() - INTERVAL '2 days'),
  ('pi_marina_005', 'cs_marina_005', 12000, 'brl', 'succeeded', 'pix', 14, 5, NOW() - INTERVAL '1 day'),
  
  -- Pagamentos Adv. João (3 clientes x R$ 350 x 2 agendamentos/semana = R$ 2.100/semana)
  ('pi_joao_001', 'cs_joao_001', 35000, 'brl', 'succeeded', 'card', 16, 6, NOW() - INTERVAL '9 days'),
  ('pi_joao_002', 'cs_joao_002', 35000, 'brl', 'succeeded', 'pix', 17, 6, NOW() - INTERVAL '7 days'),
  ('pi_joao_003', 'cs_joao_003', 105000, 'brl', 'succeeded', 'card', 18, 6, NOW() - INTERVAL '5 days'), -- Assessoria mensal
  ('pi_joao_004', 'cs_joao_004', 35000, 'brl', 'succeeded', 'card', 16, 6, NOW() - INTERVAL '3 days'),
  ('pi_joao_005', 'cs_joao_005', 35000, 'brl', 'succeeded', 'pix', 17, 6, NOW() - INTERVAL '1 day'),
  
  -- Pagamentos Contador Lucas (3 clientes x R$ 250 x 2 agendamentos/semana = R$ 1.500/semana)
  ('pi_lucas_001', 'cs_lucas_001', 25000, 'brl', 'succeeded', 'card', 19, 7, NOW() - INTERVAL '8 days'),
  ('pi_lucas_002', 'cs_lucas_002', 75000, 'brl', 'succeeded', 'pix', 20, 7, NOW() - INTERVAL '6 days'), -- Serviços MEI
  ('pi_lucas_003', 'cs_lucas_003', 25000, 'brl', 'succeeded', 'card', 21, 7, NOW() - INTERVAL '4 days'),
  ('pi_lucas_004', 'cs_lucas_004', 25000, 'brl', 'succeeded', 'card', 19, 7, NOW() - INTERVAL '2 days'),
  ('pi_lucas_005', 'cs_lucas_005', 25000, 'brl', 'succeeded', 'pix', 20, 7, NOW() - INTERVAL '1 day'),
  
  -- Pagamentos Coach Fernanda (3 clientes x R$ 300 x 2 agendamentos/semana = R$ 1.800/semana)
  ('pi_fernanda_001', 'cs_fernanda_001', 30000, 'brl', 'succeeded', 'card', 22, 8, NOW() - INTERVAL '9 days'),
  ('pi_fernanda_002', 'cs_fernanda_002', 30000, 'brl', 'succeeded', 'pix', 23, 8, NOW() - INTERVAL '7 days'),
  ('pi_fernanda_003', 'cs_fernanda_003', 162000, 'brl', 'succeeded', 'card', 24, 8, NOW() - INTERVAL '5 days'), -- Programa liderança
  ('pi_fernanda_004', 'cs_fernanda_004', 30000, 'brl', 'succeeded', 'card', 22, 8, NOW() - INTERVAL '3 days'),
  ('pi_fernanda_005', 'cs_fernanda_005', 30000, 'brl', 'succeeded', 'pix', 23, 8, NOW() - INTERVAL '1 day'),
  
  -- Pagamentos Prof. Carlos (3 clientes x R$ 100 x 2 agendamentos/semana = R$ 600/semana)
  ('pi_carlos_001', 'cs_carlos_001', 10000, 'brl', 'succeeded', 'card', 25, 9, NOW() - INTERVAL '8 days'),
  ('pi_carlos_002', 'cs_carlos_002', 10000, 'brl', 'succeeded', 'pix', 26, 9, NOW() - INTERVAL '6 days'),
  ('pi_carlos_003', 'cs_carlos_003', 36000, 'brl', 'succeeded', 'card', 27, 9, NOW() - INTERVAL '4 days'), -- Pacote semanal
  ('pi_carlos_004', 'cs_carlos_004', 10000, 'brl', 'succeeded', 'card', 25, 9, NOW() - INTERVAL '2 days'),
  ('pi_carlos_005', 'cs_carlos_005', 10000, 'brl', 'succeeded', 'pix', 26, 9, NOW() - INTERVAL '1 day'),
  
  -- Pagamentos Teacher Sarah (3 clientes x R$ 120 x 2 agendamentos/semana = R$ 720/semana)
  ('pi_sarah_001', 'cs_sarah_001', 12000, 'brl', 'succeeded', 'card', 28, 10, NOW() - INTERVAL '9 days'),
  ('pi_sarah_002', 'cs_sarah_002', 12000, 'brl', 'succeeded', 'pix', 29, 10, NOW() - INTERVAL '7 days'),
  ('pi_sarah_003', 'cs_sarah_003', 86400, 'brl', 'succeeded', 'card', 30, 10, NOW() - INTERVAL '5 days'), -- Conversação
  ('pi_sarah_004', 'cs_sarah_004', 12000, 'brl', 'succeeded', 'card', 28, 10, NOW() - INTERVAL '3 days'),
  ('pi_sarah_005', 'cs_sarah_005', 12000, 'brl', 'succeeded', 'pix', 29, 10, NOW() - INTERVAL '1 day'),
  
  -- Pagamentos Isabela Beauty (3 clientes x R$ 80 x 2 agendamentos/semana = R$ 480/semana)
  ('pi_isabela_001', 'cs_isabela_001', 8000, 'brl', 'succeeded', 'card', 31, 11, NOW() - INTERVAL '8 days'),
  ('pi_isabela_002', 'cs_isabela_002', 6000, 'brl', 'succeeded', 'pix', 32, 11, NOW() - INTERVAL '6 days'), -- Sobrancelha
  ('pi_isabela_003', 'cs_isabela_003', 28800, 'brl', 'succeeded', 'card', 33, 11, NOW() - INTERVAL '4 days'), -- Pacote mensal
  ('pi_isabela_004', 'cs_isabela_004', 8000, 'brl', 'succeeded', 'card', 31, 11, NOW() - INTERVAL '2 days'),
  ('pi_isabela_005', 'cs_isabela_005', 6000, 'brl', 'succeeded', 'pix', 32, 11, NOW() - INTERVAL '1 day'),
  
  -- Pagamentos Marcos Barbeiro (3 clientes x R$ 60 x 2 agendamentos/semana = R$ 360/semana)
  ('pi_marcos_001', 'cs_marcos_001', 6000, 'brl', 'succeeded', 'card', 34, 12, NOW() - INTERVAL '9 days'),
  ('pi_marcos_002', 'cs_marcos_002', 8000, 'brl', 'succeeded', 'pix', 35, 12, NOW() - INTERVAL '7 days'), -- Corte + Barba
  ('pi_marcos_003', 'cs_marcos_003', 21600, 'brl', 'succeeded', 'card', 36, 12, NOW() - INTERVAL '5 days'), -- Pacote mensal
  ('pi_marcos_004', 'cs_marcos_004', 6000, 'brl', 'succeeded', 'card', 34, 12, NOW() - INTERVAL '3 days'),
  ('pi_marcos_005', 'cs_marcos_005', 8000, 'brl', 'succeeded', 'pix', 35, 12, NOW() - INTERVAL '1 day');

-- ================================================
-- ASSINATURAS ATIVAS - BASEADO NO MODELO RECORRENTE
-- ================================================
INSERT INTO agendei.subscriptions (stripe_subscription_id, customer_id, professional_id, package_id, status, current_period_start, current_period_end, sessions_used_current_period, sessions_rollover) VALUES
  -- Assinaturas Dr. Adriano
  ('sub_adriano_001', 1, 1, 3, 'active', NOW() - INTERVAL '15 days', NOW() + INTERVAL '15 days', 2, 1), -- Acompanhamento preventivo
  ('sub_adriano_002', 2, 1, 2, 'active', NOW() - INTERVAL '10 days', NOW() + INTERVAL '20 days', 1, 0), -- Check-up executivo
  
  -- Assinaturas Dra. Carla
  ('sub_carla_001', 4, 2, 5, 'active', NOW() - INTERVAL '12 days', NOW() + INTERVAL '18 days', 3, 0), -- Pacote semanal
  ('sub_carla_002', 6, 2, 6, 'active', NOW() - INTERVAL '8 days', NOW() + INTERVAL '22 days', 4, 1), -- Tratamento intensivo
  
  -- Assinaturas Dr. Roberto
  ('sub_roberto_001', 7, 3, 9, 'active', NOW() - INTERVAL '5 days', NOW() + INTERVAL '25 days', 2, 0), -- Acompanhamento crônico
  ('sub_roberto_002', 9, 3, 9, 'active', NOW() - INTERVAL '20 days', NOW() + INTERVAL '10 days', 3, 1), -- Acompanhamento crônico
  
  -- Assinaturas Dra. Ana
  ('sub_ana_001', 10, 4, 11, 'active', NOW() - INTERVAL '18 days', NOW() + INTERVAL '12 days', 4, 1), -- Plano emagrecimento
  ('sub_ana_002', 12, 4, 12, 'active', NOW() - INTERVAL '7 days', NOW() + INTERVAL '23 days', 2, 0), -- Nutrição esportiva
  
  -- Assinaturas Prof. Marina
  ('sub_marina_001', 13, 5, 14, 'active', NOW() - INTERVAL '14 days', NOW() + INTERVAL '16 days', 6, 2), -- Pacote semanal
  ('sub_marina_002', 15, 5, 15, 'active', NOW() - INTERVAL '6 days', NOW() + INTERVAL '24 days', 4, 1), -- Treino funcional
  
  -- Assinaturas Adv. João

  ('sub_joao_001', 16, 6, 17, 'active', NOW() - INTERVAL '10 days', NOW() + INTERVAL '20 days', 2, 0), -- Assessoria mensal
  ('sub_joao_002', 18, 6, 18, 'active', NOW() - INTERVAL '25 days', NOW() + INTERVAL '5 days', 5, 1), -- Consultoria startups
  
  -- Assinaturas Contador Lucas
  ('sub_lucas_001', 19, 7, 20, 'active', NOW() - INTERVAL '8 days', NOW() + INTERVAL '22 days', 1, 0), -- Serviços MEI
  ('sub_lucas_002', 21, 7, 21, 'active', NOW() - INTERVAL '30 days', NOW() + INTERVAL '0 days', 4, 2), -- Planejamento tributário
  
  -- Assinaturas Coach Fernanda
  ('sub_fernanda_001', 22, 8, 23, 'active', NOW() - INTERVAL '20 days', NOW() + INTERVAL '10 days', 4, 1), -- Programa liderança
  ('sub_fernanda_002', 24, 8, 24, 'active', NOW() - INTERVAL '15 days', NOW() + INTERVAL '15 days', 3, 0), -- Transição carreira
  
  -- Assinaturas Prof. Carlos
  ('sub_carlos_001', 25, 9, 26, 'active', NOW() - INTERVAL '12 days', NOW() + INTERVAL '18 days', 3, 0), -- Pacote semanal
  ('sub_carlos_002', 27, 9, 27, 'active', NOW() - INTERVAL '35 days', NOW() + INTERVAL '-5 days', 7, 1), -- Preparação ENEM
  
  -- Assinaturas Teacher Sarah
  ('sub_sarah_001', 28, 10, 29, 'active', NOW() - INTERVAL '16 days', NOW() + INTERVAL '14 days', 5, 2), -- Conversação
  ('sub_sarah_002', 30, 10, 30, 'active', NOW() - INTERVAL '40 days', NOW() + INTERVAL '-10 days', 9, 3), -- Preparação TOEFL
  
  -- Assinaturas Isabela Beauty
  ('sub_isabela_001', 31, 11, 33, 'active', NOW() - INTERVAL '10 days', NOW() + INTERVAL '20 days', 2, 0), -- Pacote mensal
  ('sub_isabela_002', 33, 11, 33, 'active', NOW() - INTERVAL '25 days', NOW() + INTERVAL '5 days', 3, 1), -- Pacote mensal
  
  -- Assinaturas Marcos Barbeiro
  ('sub_marcos_001', 34, 12, 36, 'active', NOW() - INTERVAL '5 days', NOW() + INTERVAL '25 days', 1, 0), -- Pacote mensal
  ('sub_marcos_002', 36, 12, 36, 'active', NOW() - INTERVAL '20 days', NOW() + INTERVAL '10 days', 3, 1); -- Pacote mensal

-- ================================================
-- AGENDAMENTOS - CASOS REALISTAS E VARIADOS
-- ================================================
-- Agendamentos passados (concluídos) - Demonstrando diversidade
INSERT INTO agendei.appointments (professional_id, customer_id, title, status, start_at, end_at, duration_minutes, location_type, location_address, price, payment_id, client_rating, client_feedback, professional_notes, created_at) VALUES
  -- Dr. Adriano (Cardiologista)
  (1, 1, 'Consulta Cardiológica Inicial', 'completed', NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days' + INTERVAL '1 hour', 60, 'in_person', 'Clínica CardioVida - Av. Paulista, 1000 - São Paulo/SP', 25000, 1, 5, 'Excelente atendimento! Dr. Adriano é muito atencioso e explicou tudo detalhadamente.', 'Paciente com histórico familiar de cardiopatia. PA: 130/85. Solicitados: ECG, ecocardiograma e perfil lipídico.', NOW() - INTERVAL '10 days'),
  
  (1, 2, 'Retorno Cardiológico', 'completed', NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days' + INTERVAL '1 hour', 60, 'in_person', 'Clínica CardioVida - Av. Paulista, 1000 - São Paulo/SP', 25000, 2, 4, 'Ótimo profissional, mas a espera foi um pouco longa.', 'Exames normais. Paciente respondeu bem à medicação. Manter dieta e exercícios.', NOW() - INTERVAL '8 days'),
  
  (1, 3, 'Check-up Executivo', 'completed', NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days' + INTERVAL '1 hour', 60, 'in_person', 'Clínica CardioVida - Av. Paulista, 1000 - São Paulo/SP', 25000, 3, 5, 'Consulta muito completa, me senti seguro para retomar os exercícios.', 'Executivo, 45 anos, sedentário. Iniciando programa de exercícios. Orientações sobre prevenção cardiovascular.', NOW() - INTERVAL '6 days'),
  
  -- Dra. Carla (Psicóloga)
  (2, 4, 'Primeira Sessão de Terapia', 'completed', NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days' + INTERVAL '50 minutes', 50, 'online', NULL, 18000, 7, 5, 'Dra. Carla me deixou muito à vontade. Sessão muito produtiva.', 'Paciente com ansiedade social. Primeira sessão - estabelecimento de rapport. Técnicas de relaxamento introduzidas.', NOW() - INTERVAL '9 days'),
  
  (2, 5, 'Sessão de Terapia CBT', 'completed', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days' + INTERVAL '50 minutes', 50, 'online', NULL, 18000, 8, 5, 'Cada sessão me ajuda a entender melhor meus pensamentos.', 'Trabalho com distorções cognitivas. Paciente demonstra boa evolução na identificação de padrões.', NOW() - INTERVAL '7 days'),
  
  (2, 6, 'Terapia de Casal', 'completed', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days' + INTERVAL '50 minutes', 50, 'in_person', 'Consultório - Rua Augusta, 500 - São Paulo/SP', 18000, 9, 4, 'Sessão difícil, mas necessária. Dra. Carla conduziu muito bem.', 'Casal em crise. Trabalhando comunicação e resolução de conflitos. Próxima sessão: exercícios de empatia.', NOW() - INTERVAL '5 days'),
  
  -- Dr. Roberto (Clínico Geral)
  (3, 7, 'Consulta Clínica', 'completed', NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days' + INTERVAL '45 minutes', 45, 'in_person', 'Clínica Saúde Total - Rua da Saúde, 123 - Rio de Janeiro/RJ', 20000, 13, 5, 'Dr. Roberto é muito cuidadoso e atencioso. Recomendo!', 'Paciente com diabetes tipo 2. Glicemia controlada. Ajuste na medicação e orientações dietéticas.', NOW() - INTERVAL '8 days'),
  
  (3, 8, 'Atendimento Domiciliar', 'completed', NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days' + INTERVAL '1 hour 30 minutes', 90, 'home_visit', 'Residência - Barra da Tijuca, Rio de Janeiro/RJ', 35000, 14, 5, 'Atendimento em casa foi perfeito. Dr. Roberto muito profissional.', 'Idosa acamada. Renovação de receitas. Orientações para cuidadores. Família muito atenciosa.', NOW() - INTERVAL '6 days'),
  
  -- Dra. Ana (Nutricionista)
  (4, 10, 'Consulta Nutricional Inicial', 'completed', NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days' + INTERVAL '1 hour', 60, 'in_person', 'Clínica NutriVida - Av. Rebouças, 800 - São Paulo/SP', 15000, 18, 5, 'Dra. Ana elaborou um plano alimentar perfeito para minha rotina.', 'Paciente busca emagrecimento. IMC: 28. Meta: perder 8kg em 3 meses. Plano hipocalórico personalizado.', NOW() - INTERVAL '9 days'),
  
  (4, 11, 'Retorno Nutricional', 'completed', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days' + INTERVAL '45 minutes', 45, 'online', NULL, 15000, 19, 4, 'Perdi 2kg! Dra. Ana sempre tem dicas valiosas.', 'Paciente perdeu 2kg. Aderindo bem ao plano. Ajustes para acelerar metabolismo.', NOW() - INTERVAL '7 days'),
  
  -- Prof. Marina (Personal Trainer)
  (5, 13, 'Avaliação Física', 'completed', NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days' + INTERVAL '1 hour', 60, 'in_person', 'Academia PowerFit - Rua do Exercício, 456 - São Paulo/SP', 12000, 23, 5, 'Prof. Marina é incrível! Treino desafiador mas adequado ao meu nível.', 'Iniciante. Avaliação física completa. Programa de treinamento funcional 3x/semana.', NOW() - INTERVAL '8 days'),
  
  (5, 14, 'Personal Training', 'completed', NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days' + INTERVAL '1 hour', 60, 'in_person', 'Academia PowerFit - Rua do Exercício, 456 - São Paulo/SP', 12000, 24, 5, 'Cada treino é único e motivador. Recomendo muito!', 'Treino de força para membros superiores. Paciente evoluindo bem na carga.', NOW() - INTERVAL '6 days'),
  
  -- Adv. João (Advogado)
  (6, 16, 'Consultoria Jurídica Empresarial', 'completed', NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days' + INTERVAL '1 hour 30 minutes', 90, 'in_person', 'Escritório - Faria Lima, 1500 - São Paulo/SP', 35000, 29, 5, 'Dr. João esclareceu todas as dúvidas sobre a constituição da empresa.', 'Empresa de tecnologia. Orientações sobre constituição, tributação e contratos. Documentação em andamento.', NOW() - INTERVAL '9 days'),
  
  (6, 17, 'Assessoria Startups', 'completed', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days' + INTERVAL '1 hour 30 minutes', 90, 'online', NULL, 35000, 30, 4, 'Muito conhecimento sobre startups. Ajudou muito na estruturação.', 'Startup de fintech. Revisão de contratos com investidores. Questões regulatórias.', NOW() - INTERVAL '7 days'),
  
  -- Contador Lucas
  (7, 19, 'Abertura de MEI', 'completed', NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days' + INTERVAL '1 hour', 60, 'in_person', 'Escritório Contábil - Centro, São Paulo/SP', 25000, 34, 5, 'Lucas facilitou todo o processo. Muito profissional e rápido.', 'Abertura de MEI para serviços de design. Orientações fiscais e obrigações mensais.', NOW() - INTERVAL '8 days'),
  
  -- Coach Fernanda
  (8, 22, 'Sessão de Coaching Executivo', 'completed', NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days' + INTERVAL '1 hour 30 minutes', 90, 'online', NULL, 30000, 39, 5, 'Fernanda tem uma abordagem muito prática. Senti diferença imediata.', 'Executivo com dificuldades em liderança. Trabalhando inteligência emocional e comunicação.', NOW() - INTERVAL '9 days'),
  
  -- Prof. Carlos (Matemática)
  (9, 25, 'Aula de Matemática', 'completed', NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days' + INTERVAL '1 hour 30 minutes', 90, 'online', NULL, 10000, 44, 4, 'Prof. Carlos explica muito bem, mas às vezes vai muito rápido.', 'Álgebra linear. Estudante com dificuldades em matrizes. Exercícios práticos aplicados.', NOW() - INTERVAL '8 days'),
  
  -- Teacher Sarah
  (10, 28, 'Aula de Inglês', 'completed', NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days' + INTERVAL '1 hour', 60, 'online', NULL, 12000, 49, 5, 'Sarah é uma professora excelente! Aula dinâmica e divertida.', 'Conversação nível intermediário. Trabalhando pronuncia e vocabulário corporativo.', NOW() - INTERVAL '9 days'),
  
  -- Isabela Beauty
  (11, 31, 'Limpeza de Pele', 'completed', NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days' + INTERVAL '1 hour', 60, 'in_person', 'Studio Bella - Rua da Beleza, 789 - São Paulo/SP', 8000, 54, 5, 'Isabela é muito cuidadosa e o resultado ficou incrível!', 'Limpeza profunda. Pele oleosa com cravos. Aplicação de máscara calmante.', NOW() - INTERVAL '8 days'),
  
  -- Marcos Barbeiro
  (12, 34, 'Corte Masculino', 'completed', NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days' + INTERVAL '45 minutes', 45, 'in_person', 'Barbearia Clássica - Rua dos Barbeiros, 321 - São Paulo/SP', 6000, 59, 4, 'Corte ficou bom, mas demorou um pouco mais que o esperado.', 'Corte social. Cliente executivo. Acabamento com navalhete.', NOW() - INTERVAL '9 days');

-- Agendamentos futuros (confirmados e agendados)
INSERT INTO agendei.appointments (professional_id, customer_id, title, status, start_at, end_at, duration_minutes, location_type, location_address, online_meeting_url, price, created_at) VALUES
  -- Próximos agendamentos Dr. Adriano
  (1, 1, 'Retorno Cardiológico', 'confirmed', NOW() + INTERVAL '3 days', NOW() + INTERVAL '3 days' + INTERVAL '1 hour', 60, 'in_person', 'Clínica CardioVida - Av. Paulista, 1000 - São Paulo/SP', NULL, 25000, NOW() - INTERVAL '2 days'),
  
  (1, 2, 'Check-up Executivo', 'scheduled', NOW() + INTERVAL '5 days', NOW() + INTERVAL '5 days' + INTERVAL '1 hour', 60, 'in_person', 'Clínica CardioVida - Av. Paulista, 1000 - São Paulo/SP', NULL, 25000, NOW() - INTERVAL '1 day'),
  
  -- Próximos agendamentos Dra. Carla
  (2, 4, 'Sessão de Terapia', 'confirmed', NOW() + INTERVAL '2 days', NOW() + INTERVAL '2 days' + INTERVAL '50 minutes', 50, 'online', NULL, 'https://meet.google.com/carla-terapia-001', 18000, NOW() - INTERVAL '3 days'),
  
  (2, 5, 'Terapia CBT', 'confirmed', NOW() + INTERVAL '4 days', NOW() + INTERVAL '4 days' + INTERVAL '50 minutes', 50, 'online', NULL, 'https://meet.google.com/carla-terapia-002', 18000, NOW() - INTERVAL '2 days'),
  
  -- Próximos agendamentos Dr. Roberto
  (3, 7, 'Consulta de Rotina', 'confirmed', NOW() + INTERVAL '6 days', NOW() + INTERVAL '6 days' + INTERVAL '45 minutes', 45, 'in_person', 'Clínica Saúde Total - Rua da Saúde, 123 - Rio de Janeiro/RJ', NULL, 20000, NOW() - INTERVAL '1 day'),
  
  (3, 8, 'Atendimento Domiciliar', 'scheduled', NOW() + INTERVAL '8 days', NOW() + INTERVAL '8 days' + INTERVAL '1 hour 30 minutes', 90, 'home_visit', 'Residência - Barra da Tijuca, Rio de Janeiro/RJ', NULL, 35000, NOW() - INTERVAL '4 days'),
  
  -- Próximos agendamentos Dra. Ana
  (4, 10, 'Retorno Nutricional', 'confirmed', NOW() + INTERVAL '3 days', NOW() + INTERVAL '3 days' + INTERVAL '45 minutes', 45, 'online', NULL, 'https://meet.google.com/ana-nutri-001', 15000, NOW() - INTERVAL '2 days'),
  
  -- Próximos agendamentos Prof. Marina
  (5, 13, 'Personal Training', 'confirmed', NOW() + INTERVAL '1 day', NOW() + INTERVAL '1 day' + INTERVAL '1 hour', 60, 'in_person', 'Academia PowerFit - Rua do Exercício, 456 - São Paulo/SP', NULL, 12000, NOW() - INTERVAL '3 days'),
  
  (5, 14, 'Treino Funcional', 'confirmed', NOW() + INTERVAL '2 days', NOW() + INTERVAL '2 days' + INTERVAL '1 hour', 60, 'in_person', 'Academia PowerFit - Rua do Exercício, 456 - São Paulo/SP', NULL, 12000, NOW() - INTERVAL '1 day'),
  
  -- Próximos agendamentos Adv. João
  (6, 16, 'Revisão Contratual', 'scheduled', NOW() + INTERVAL '7 days', NOW() + INTERVAL '7 days' + INTERVAL '1 hour 30 minutes', 90, 'in_person', 'Escritório - Faria Lima, 1500 - São Paulo/SP', NULL, 35000, NOW() - INTERVAL '2 days'),
  
  -- Próximos agendamentos Teacher Sarah
  (10, 28, 'Conversação em Inglês', 'confirmed', NOW() + INTERVAL '4 days', NOW() + INTERVAL '4 days' + INTERVAL '1 hour', 60, 'online', NULL, 'https://meet.google.com/sarah-english-001', 12000, NOW() - INTERVAL '1 day'),
  
  -- Próximos agendamentos Isabela Beauty
  (11, 31, 'Design de Sobrancelhas', 'confirmed', NOW() + INTERVAL '5 days', NOW() + INTERVAL '5 days' + INTERVAL '1 hour', 60, 'in_person', 'Studio Bella - Rua da Beleza, 789 - São Paulo/SP', NULL, 6000, NOW() - INTERVAL '2 days');

-- ================================================
-- CONTEXTOS DOS AGENDAMENTOS - CASOS PROFISSIONAIS
-- ================================================
INSERT INTO agendei.appointment_contexts (appointment_id, internal_notes, public_notes, status, context_type, title, content, created_at) VALUES
  -- Contextos Dr. Adriano
  (1, 'Paciente com histórico familiar de cardiopatia. Sedentário há 2 anos. Relata palpitações ocasionais e cansaço. PA: 130/85 mmHg. Ausculta cardíaca normal. Solicitados ECG, ecocardiograma e perfil lipídico completo.', 'Exames solicitados: ECG, ecocardiograma e perfil lipídico. Retorno em 15 dias com os resultados. Manter dieta equilibrada e iniciar caminhadas leves.', 'completed', 'medical_record', 'Consulta Cardiológica', 'Avaliação cardiovascular preventiva. Paciente masculino, 42 anos, executivo.', NOW() - INTERVAL '10 days'),
  
  (2, 'Retorno com exames normais. ECG: ritmo sinusal. Ecocardiograma: função sistólica preservada. Colesterol total: 220 mg/dL. Paciente aderiu bem às orientações dietéticas e está caminhando 3x/semana.', 'Exames dentro da normalidade! Continue com as caminhadas e dieta. Agendar retorno em 3 meses para reavaliação.', 'completed', 'medical_record', 'Retorno Cardiológico', 'Seguimento de avaliação preventiva. Boa evolução clínica.', NOW() - INTERVAL '8 days'),
  
  -- Contextos Dra. Carla
  (3, 'Primeira sessão com paciente apresentando ansiedade social severa. Dificuldade para falar em público e fazer apresentações no trabalho. Histórico de ataques de pânico. Iniciadas técnicas de respiração e relaxamento progressivo.', 'Vamos trabalhar gradualmente sua confiança em situações sociais. Pratique os exercícios de respiração diariamente. Anote situações que geram ansiedade.', 'completed', 'therapy_session', 'Terapia CBT - Ansiedade Social', 'Estabelecimento de rapport e avaliação inicial. Paciente colaborativo.', NOW() - INTERVAL '9 days'),
  
  (4, 'Sessão focada em identificação de distorções cognitivas. Paciente demonstra catastrofização e pensamento tudo-ou-nada. Aplicada técnica de registro de pensamentos automáticos. Boa evolução na consciência dos padrões.', 'Continue praticando o registro de pensamentos. Questione-se: "Esta interpretação é realista?" Exercícios de reestruturação cognitiva para casa.', 'completed', 'therapy_session', 'CBT - Distorções Cognitivas', 'Trabalho com padrões de pensamento. Paciente receptivo às técnicas.', NOW() - INTERVAL '7 days'),
  
  -- Contextos Dr. Roberto
  (5, 'Paciente diabético tipo 2, 58 anos. Glicemia em jejum: 140 mg/dL. HbA1c: 7.2%. Aderência medicamentosa boa. Orientado sobre importância do controle glicêmico. Ajustada dosagem de metformina.', 'Diabetes controlado! Continue com a medicação conforme orientado. Dieta com baixo índice glicêmico. Exercícios leves 30 min/dia.', 'completed', 'medical_record', 'Acompanhamento Diabetes', 'Consulta de rotina para controle glicêmico. Bom controle metabólico.', NOW() - INTERVAL '8 days'),
  
  (6, 'Atendimento domiciliar para paciente idosa acamada. Renovação de receitas para hipertensão e depressão. Orientações para cuidadores sobre prevenção de escaras e mobilização. Família muito participativa.', 'Medicações renovadas por 3 meses. Cuidadores orientados sobre mudanças de decúbito. Retorno domiciliar em 30 dias.', 'completed', 'medical_record', 'Atendimento Domiciliar', 'Cuidados geriátricos domiciliares. Paciente estável.', NOW() - INTERVAL '6 days'),
  
  -- Contextos Dra. Ana
  (7, 'Paciente feminina, 35 anos, IMC 28. Meta: perder 8kg em 3 meses. Histórico de dietas restritivas. Elaborado plano hipocalórico 1400 kcal/dia com distribuição balanceada de macronutrientes. Orientações sobre hidratação.', 'Plano alimentar personalizado elaborado. Beba 2L de água/dia. Evite alimentos ultraprocessados. Retorno em 15 dias para ajustes.', 'completed', 'nutrition_plan', 'Plano Emagrecimento', 'Primeira consulta nutricional. Paciente motivada e colaborativa.', NOW() - INTERVAL '9 days'),
  
  (8, 'Primeira quinzena do tratamento. Paciente perdeu 2kg, está seguindo 80% do plano. Relata mais disposição e menos inchaço. Sugeridas substituições para acelerar metabolismo.', 'Parabéns pelos 2kg perdidos! Continue firme. Inclua chá verde e gengibre. Aumente proteínas no café da manhã.', 'completed', 'nutrition_plan', 'Retorno Nutricional', 'Boa aderência ao plano. Evolução satisfatória.', NOW() - INTERVAL '7 days'),
  
  -- Contextos Prof. Marina
  (9, 'Avaliação física inicial: sedentário há 3 anos, sem restrições médicas. Teste de flexibilidade: ruim. Força: regular. Elaborado programa de treinamento funcional progressivo 3x/semana, foco em movimento e condicionamento.', 'Programa de treino elaborado! Comece devagar, ouça seu corpo. Hidrate-se bem e durma 7-8h. Treinaremos juntos 3x/semana.', 'completed', 'fitness_assessment', 'Avaliação Física', 'Primeira avaliação e planejamento de treino. Paciente motivado.', NOW() - INTERVAL '8 days'),
  
  (10, 'Segundo treino da semana. Foco em fortalecimento de core e membros superiores. Paciente demonstra boa evolução na execução dos movimentos. Aumentada intensidade gradualmente.', 'Você está evoluindo muito bem! Postura melhorou bastante. Continue com os alongamentos em casa.', 'completed', 'training_session', 'Treino Funcional', 'Evolução técnica e física. Paciente comprometido.', NOW() - INTERVAL '6 days'),
  
  -- Contextos Adv. João
  (11, 'Empresa de tecnologia em fase de constituição. Orientações sobre tipo societário mais adequado (LTDA), regime tributário (Lucro Presumido), contratos com sócios e funcionários. Documentação societária em elaboração.', 'Empresa será constituída como LTDA. Documentos em elaboração. Próximos passos: abertura na Junta Comercial e obtenção de licenças.', 'completed', 'legal_consultation', 'Constituição Empresa', 'Consultoria para abertura de empresa de tecnologia. Documentação iniciada.', NOW() - INTERVAL '9 days'),
  
  -- Contextos Teacher Sarah
  (12, 'Aula de conversação nível intermediário. Trabalhados temas: apresentação profissional, vocabulário corporativo, expressões idiomáticas. Paciente demonstra boa fluência mas precisa melhorar pronunciation.', 'Great improvement in your vocabulary! Practice the pronunciation exercises daily. Focus on the /th/ sound.', 'completed', 'english_lesson', 'Business English', 'Conversação empresarial. Foco em pronuncia e vocabulário.', NOW() - INTERVAL '9 days');

-- ================================================
-- TAREFAS PROFISSIONAIS - SISTEMA DE GERENCIAMENTO
-- ================================================

-- Limpar tabelas relacionadas e resetar sequences
DELETE FROM agendei.task_history;
DELETE FROM agendei.task_attachments;
DELETE FROM agendei.task_subtasks;
DELETE FROM agendei.professional_tasks;

ALTER SEQUENCE agendei.professional_tasks_id_seq RESTART WITH 1;
ALTER SEQUENCE agendei.task_subtasks_id_seq RESTART WITH 1;
ALTER SEQUENCE agendei.task_attachments_id_seq RESTART WITH 1;
ALTER SEQUENCE agendei.task_history_id_seq RESTART WITH 1;

-- Inserir tarefas profissionais com diferentes periodicidades
INSERT INTO agendei.professional_tasks (
  professional_id, title, description, category, priority, 
  is_recurring, rrule, recurrence_type, series_id, 
  due_date, status, alert_settings, next_alert_at, 
  customer_id, context_type, estimated_duration_minutes, 
  tags, metadata, created_at
) VALUES
  -- Dr. Adriano (Cardiologista) - ID: 1
  (1, 'Atualização semanal de prontuários', 'Revisar e atualizar prontuários dos pacientes atendidos na semana', 'clinical', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=FR', 'weekly', 'task-dr-adriano-001', NOW() + INTERVAL '2 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 24}, {"type": "notification", "hours_before": 2}]}', NOW() + INTERVAL '1 day 2 hours', null, 'general', 120, '["prontuario", "documentacao", "pacientes"]', '{"professional_type": "healthcare", "requires_certification": true}', NOW() - INTERVAL '1 day'),
  
  (1, 'Análise urgente de exames laboratoriais', 'Revisar resultados de exames e preparar relatórios para pacientes', 'clinical', 'urgent', false, null, null, null, NOW() + INTERVAL '1 day', 'pending', '{"alerts": [{"type": "email", "hours_before": 4}, {"type": "notification", "hours_before": 1}]}', NOW() + INTERVAL '23 hours', 1, 'appointment', 90, '["exames", "laboratorio", "relatorios"]', '{"patient_count": 5, "exam_types": ["ECG", "ecocardiograma", "laboratorio"]}', NOW() - INTERVAL '2 days'),
  
  (1, 'Renovação anual de certificações médicas', 'Renovar certificações do CRM e especialização em cardiologia', 'administrative', 'medium', true, 'RRULE:FREQ=YEARLY;BYMONTH=6', 'yearly', 'task-dr-adriano-002', NOW() + INTERVAL '180 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 720}, {"type": "notification", "hours_before": 168}]}', NOW() + INTERVAL '179 days', null, 'certification', 240, '["certificacao", "crm", "cardiologia"]', '{"renewal_type": "annual", "certification_body": "CFM", "specialty": "cardiology"}', NOW() - INTERVAL '3 days'),
  
  (1, 'Revisão mensal de medicamentos para pacientes crônicos', 'Revisar prescrições e ajustar medicamentos para pacientes com doenças crônicas', 'clinical', 'high', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=15', 'monthly', 'task-dr-adriano-003', NOW() + INTERVAL '15 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 48}, {"type": "notification", "hours_before": 24}]}', NOW() + INTERVAL '14 days', null, 'general', 180, '["medicamentos", "cronicos", "prescricoes"]', '{"patient_count": 12, "chronic_conditions": ["hipertensao", "diabetes", "dislipidemia"]}', NOW() - INTERVAL '1 day'),
  
  (1, 'Aniversário da paciente Maria Silva', 'Enviar mensagem de aniversário e lembrete de consulta preventiva', 'administrative', 'low', true, 'RRULE:FREQ=YEARLY;BYMONTH=1;BYMONTHDAY=15', 'yearly', 'task-dr-adriano-004', NOW() + INTERVAL '30 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 48}, {"type": "notification", "hours_before": 24}]}', NOW() + INTERVAL '29 days', 1, 'customer_birthday', 15, '["aniversario", "preventiva", "relacionamento"]', '{"birth_date": "1990-01-15", "last_checkup": "2024-06-15"}', NOW() - INTERVAL '1 day'),
  
  -- Dra. Carla (Psicóloga) - ID: 2
  (2, 'Planejamento semanal de sessões terapêuticas', 'Preparar roteiro e materiais para sessões da semana', 'clinical', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=SU', 'weekly', 'task-dra-carla-001', NOW() + INTERVAL '3 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 12}, {"type": "notification", "hours_before": 2}]}', NOW() + INTERVAL '2 days 22 hours', null, 'general', 90, '["planejamento", "sessoes", "terapia"]', '{"approach": "TCC", "session_count": 8, "techniques": ["respiracao", "reestruturacao_cognitiva"]}', NOW() - INTERVAL '2 days'),
  
  (2, 'Documentação semanal de evolução dos pacientes', 'Atualizar prontuários e documentar evolução dos pacientes', 'clinical', 'medium', true, 'RRULE:FREQ=WEEKLY;BYDAY=SA', 'weekly', 'task-dra-carla-002', NOW() + INTERVAL '5 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 24}, {"type": "notification", "hours_before": 4}]}', NOW() + INTERVAL '4 days 20 hours', null, 'general', 120, '["documentacao", "evolucao", "prontuarios"]', '{"patient_count": 15, "therapy_types": ["individual", "casal", "grupo"]}', NOW() - INTERVAL '1 day'),
  
  (2, 'Supervisão clínica mensal obrigatória', 'Participar de supervisão clínica com supervisor credenciado', 'administrative', 'high', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=10', 'monthly', 'task-dra-carla-003', NOW() + INTERVAL '10 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 72}, {"type": "notification", "hours_before": 24}]}', NOW() + INTERVAL '9 days', null, 'certification', 120, '["supervisao", "clinica", "capacitacao"]', '{"supervisor": "Dr. Silva", "modality": "online", "certification_required": true}', NOW() - INTERVAL '3 days'),
  
  (2, 'Aniversário do paciente Pedro Costa', 'Enviar mensagem de aniversário e verificar agendamento de sessão', 'administrative', 'low', true, 'RRULE:FREQ=YEARLY;BYMONTH=3;BYMONTHDAY=22', 'yearly', 'task-dra-carla-004', NOW() + INTERVAL '90 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 48}, {"type": "notification", "hours_before": 24}]}', NOW() + INTERVAL '89 days', 2, 'customer_birthday', 15, '["aniversario", "relacionamento", "cuidado"]', '{"birth_date": "1985-03-22", "therapy_start": "2024-01-10"}', NOW() - INTERVAL '1 day'),
  
  -- Dr. Roberto (Clínico Geral) - ID: 3
  (3, 'Atualização mensal de protocolos clínicos', 'Revisar e atualizar protocolos de atendimento conforme diretrizes médicas', 'clinical', 'medium', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=1', 'monthly', 'task-dr-roberto-001', NOW() + INTERVAL '30 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 48}, {"type": "notification", "hours_before": 12}]}', NOW() + INTERVAL '29 days 12 hours', null, 'general', 180, '["protocolos", "diretrizes", "atualizacao"]', '{"protocols": ["diabetes", "hipertensao", "preventivo"], "source": "SBM"}', NOW() - INTERVAL '2 days'),
  
  (3, 'Preparação semanal de relatórios domiciliares', 'Elaborar relatórios dos atendimentos domiciliares da semana', 'administrative', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=SU', 'weekly', 'task-dr-roberto-002', NOW() + INTERVAL '4 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 24}, {"type": "notification", "hours_before": 6}]}', NOW() + INTERVAL '3 days 18 hours', null, 'general', 150, '["relatorios", "domiciliar", "documentacao"]', '{"home_visits": 8, "report_type": "weekly", "insurance_required": true}', NOW() - INTERVAL '1 day'),
  
  -- Dra. Ana (Nutricionista) - ID: 4
  (4, 'Desenvolvimento semanal de cardápios personalizados', 'Criar novos cardápios baseados nas necessidades dos pacientes', 'clinical', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=MO', 'weekly', 'task-dra-ana-001', NOW() + INTERVAL '6 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 12}, {"type": "notification", "hours_before": 2}]}', NOW() + INTERVAL '5 days 22 hours', null, 'general', 120, '["cardapios", "personalizados", "nutricao"]', '{"patient_count": 10, "diet_types": ["emagrecimento", "esportiva", "clinica"]}', NOW() - INTERVAL '2 days'),
  
  (4, 'Atualização mensal de tabelas nutricionais', 'Revisar e atualizar tabelas de composição nutricional dos alimentos', 'administrative', 'medium', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=5', 'monthly', 'task-dra-ana-002', NOW() + INTERVAL '5 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 48}, {"type": "notification", "hours_before": 12}]}', NOW() + INTERVAL '4 days 12 hours', null, 'general', 90, '["tabelas", "nutricao", "alimentos"]', '{"source": "IBGE", "food_count": 500, "last_update": "2024-01-01"}', NOW() - INTERVAL '1 day'),
  
  (4, 'Avaliação quinzenal de bioimpedância', 'Analisar resultados de bioimpedância e atualizar planos nutricionais', 'clinical', 'high', true, 'RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=WE', 'biweekly', 'task-dra-ana-003', NOW() + INTERVAL '3 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 24}, {"type": "notification", "hours_before": 4}]}', NOW() + INTERVAL '2 days 20 hours', null, 'evaluation', 60, '["bioimpedancia", "composicao", "corporal"]', '{"equipment": "InBody", "frequency": "biweekly", "patients": 15}', NOW() - INTERVAL '1 day'),
  
  (4, 'Aniversário da paciente Fernanda Castro', 'Enviar mensagem de aniversário e dicas de alimentação saudável', 'administrative', 'low', true, 'RRULE:FREQ=YEARLY;BYMONTH=7;BYMONTHDAY=8', 'yearly', 'task-dra-ana-004', NOW() + INTERVAL '200 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 48}, {"type": "notification", "hours_before": 24}]}', NOW() + INTERVAL '199 days', 3, 'customer_birthday', 15, '["aniversario", "nutricao", "relacionamento"]', '{"birth_date": "1992-07-08", "goal": "weight_loss", "progress": "excellent"}', NOW() - INTERVAL '1 day'),
  
  -- Prof. Marina (Personal Trainer) - ID: 5
  (5, 'Planejamento semanal de treinos personalizados', 'Elaborar programas de treinamento personalizados para cada aluno', 'clinical', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=SU', 'weekly', 'task-prof-marina-001', NOW() + INTERVAL '2 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 12}, {"type": "notification", "hours_before": 2}]}', NOW() + INTERVAL '1 day 22 hours', null, 'general', 180, '["treinos", "planejamento", "personalizados"]', '{"student_count": 15, "training_types": ["funcional", "musculacao", "condicionamento"]}', NOW() - INTERVAL '2 days'),
  
  (5, 'Avaliação física mensal dos alunos', 'Realizar avaliações físicas mensais dos alunos regulares', 'clinical', 'medium', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=1', 'monthly', 'task-prof-marina-002', NOW() + INTERVAL '30 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 72}, {"type": "notification", "hours_before": 24}]}', NOW() + INTERVAL '29 days', null, 'evaluation', 240, '["avaliacao", "fisica", "mensal"]', '{"students": 12, "metrics": ["peso", "bf", "circunferencias", "flexibilidade"]}', NOW() - INTERVAL '1 day'),
  
  (5, 'Renovação anual de certificações fitness', 'Renovar certificações CREF e cursos de especialização', 'administrative', 'medium', true, 'RRULE:FREQ=YEARLY;BYMONTH=8', 'yearly', 'task-prof-marina-003', NOW() + INTERVAL '240 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 720}, {"type": "notification", "hours_before": 168}]}', NOW() + INTERVAL '239 days', null, 'certification', 120, '["certificacao", "cref", "especializacao"]', '{"certification_body": "CREF", "specializations": ["funcional", "pilates"]}', NOW() - INTERVAL '3 days'),
  
  (5, 'Avaliação semestral de performance dos alunos', 'Avaliar progresso e ajustar objetivos semestralmente', 'clinical', 'medium', true, 'RRULE:FREQ=MONTHLY;INTERVAL=6;BYMONTHDAY=1', 'semiannual', 'task-prof-marina-004', NOW() + INTERVAL '180 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 168}, {"type": "notification", "hours_before": 48}]}', NOW() + INTERVAL '179 days', null, 'evaluation', 360, '["avaliacao", "performance", "semestral"]', '{"students": 15, "metrics": ["strength", "endurance", "flexibility", "goals"]}', NOW() - INTERVAL '1 day'),
  
  (5, 'Aniversário do aluno Ricardo Gomes', 'Enviar mensagem de aniversário e oferecer treino especial', 'administrative', 'low', true, 'RRULE:FREQ=YEARLY;BYMONTH=11;BYMONTHDAY=12', 'yearly', 'task-prof-marina-005', NOW() + INTERVAL '320 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 48}, {"type": "notification", "hours_before": 24}]}', NOW() + INTERVAL '319 days', 4, 'customer_birthday', 15, '["aniversario", "treino", "relacionamento"]', '{"birth_date": "1988-11-12", "training_since": "2024-01-15", "favorite_exercise": "funcional"}', NOW() - INTERVAL '1 day'),
  
  -- Adv. João (Advogado) - ID: 6
  (6, 'Revisão semanal de contratos empresariais', 'Revisar contratos em andamento e identificar necessidades de ajuste', 'administrative', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=FR', 'weekly', 'task-adv-joao-001', NOW() + INTERVAL '4 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 24}, {"type": "notification", "hours_before": 4}]}', NOW() + INTERVAL '3 days 20 hours', null, 'general', 180, '["contratos", "revisao", "empresarial"]', '{"contract_count": 8, "companies": 5, "priority_clients": ["Empresa XYZ", "Startup Tech"]}', NOW() - INTERVAL '2 days'),
  
  (6, 'Atualização mensal da legislação empresarial', 'Estudar mudanças na legislação e impactos para clientes', 'administrative', 'medium', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=15', 'monthly', 'task-adv-joao-002', NOW() + INTERVAL '15 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 48}, {"type": "notification", "hours_before": 12}]}', NOW() + INTERVAL '14 days 12 hours', null, 'general', 120, '["legislacao", "atualizacao", "empresarial"]', '{"focus_areas": ["startups", "tributario", "trabalhista"], "sources": ["DOU", "revistas_juridicas"]}', NOW() - INTERVAL '1 day'),
  
  (6, 'Preparação para audiência urgente', 'Preparar documentação e estratégia para audiência agendada', 'administrative', 'urgent', false, null, null, null, NOW() + INTERVAL '7 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 48}, {"type": "notification", "hours_before": 24}]}', NOW() + INTERVAL '6 days', 5, 'appointment', 240, '["audiencia", "preparacao", "tribunal"]', '{"case_type": "empresarial", "court": "TJSP", "client": "Empresa XYZ"}', NOW() - INTERVAL '3 days'),
  
  -- Contador Lucas - ID: 7
  (7, 'Fechamento contábil mensal crítico', 'Realizar fechamento contábil mensal para todos os clientes', 'financial', 'urgent', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=25', 'monthly', 'task-contador-lucas-001', NOW() + INTERVAL '25 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 72}, {"type": "notification", "hours_before": 24}]}', NOW() + INTERVAL '24 days', null, 'general', 480, '["fechamento", "contabil", "mensal"]', '{"client_count": 25, "entity_types": ["MEI", "LTDA", "EIRELI"], "deadlines": ["DASN", "DEFIS", "ECF"]}', NOW() - INTERVAL '1 day'),
  
  (7, 'Atualização semanal de obrigações fiscais', 'Verificar e atualizar obrigações fiscais pendentes', 'financial', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=MO', 'weekly', 'task-contador-lucas-002', NOW() + INTERVAL '6 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 24}, {"type": "notification", "hours_before": 4}]}', NOW() + INTERVAL '5 days 20 hours', null, 'general', 120, '["obrigacoes", "fiscais", "atualizacao"]', '{"obligations": ["IRPJ", "CSLL", "PIS/COFINS", "ICMS", "ISS"], "frequency": "weekly"}', NOW() - INTERVAL '2 days'),
  
  (7, 'Planejamento tributário anual', 'Elaborar planejamento tributário anual para clientes estratégicos', 'financial', 'medium', true, 'RRULE:FREQ=YEARLY;BYMONTH=11', 'yearly', 'task-contador-lucas-003', NOW() + INTERVAL '330 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 720}, {"type": "notification", "hours_before": 168}]}', NOW() + INTERVAL '329 days', null, 'general', 600, '["planejamento", "tributario", "anual"]', '{"strategic_clients": 8, "focus": "tax_optimization", "deadline": "december"}', NOW() - INTERVAL '2 days'),
  
  -- Coach Fernanda - ID: 8
  (8, 'Preparação semanal de materiais de coaching', 'Desenvolver exercícios e materiais para sessões de coaching', 'education', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=SU', 'weekly', 'task-coach-fernanda-001', NOW() + INTERVAL '3 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 12}, {"type": "notification", "hours_before": 2}]}', NOW() + INTERVAL '2 days 22 hours', null, 'general', 120, '["materiais", "coaching", "exercicios"]', '{"tools": ["wheel_of_life", "swot", "smart_goals"], "client_count": 12}', NOW() - INTERVAL '2 days'),
  
  (8, 'Avaliação mensal de resultados dos clientes', 'Analisar progresso e ajustar planos de ação mensalmente', 'education', 'medium', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=1', 'monthly', 'task-coach-fernanda-002', NOW() + INTERVAL '30 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 48}, {"type": "notification", "hours_before": 12}]}', NOW() + INTERVAL '29 days 12 hours', null, 'evaluation', 180, '["avaliacao", "resultados", "progresso"]', '{"client_count": 12, "kpis": ["goal_achievement", "satisfaction", "engagement"]}', NOW() - INTERVAL '1 day'),
  
  -- Prof. Carlos (Matemática) - ID: 9
  (9, 'Preparação semanal de aulas e exercícios', 'Elaborar conteúdo, exercícios e materiais didáticos para as aulas', 'education', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=SU', 'weekly', 'task-prof-carlos-001', NOW() + INTERVAL '2 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 12}, {"type": "notification", "hours_before": 2}]}', NOW() + INTERVAL '1 day 22 hours', null, 'general', 180, '["aulas", "exercicios", "didaticos"]', '{"subjects": ["algebra", "geometria", "calculo"], "student_count": 20}', NOW() - INTERVAL '2 days'),
  
  (9, 'Correção quinzenal de provas e trabalhos', 'Corrigir provas e trabalhos dos alunos com feedback detalhado', 'education', 'medium', true, 'RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=SA', 'biweekly', 'task-prof-carlos-002', NOW() + INTERVAL '12 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 24}, {"type": "notification", "hours_before": 4}]}', NOW() + INTERVAL '11 days 20 hours', null, 'evaluation', 240, '["correcao", "provas", "feedback"]', '{"student_count": 20, "exam_types": ["mensal", "bimestral", "simulado"]}', NOW() - INTERVAL '1 day'),
  
  (9, 'Atualização anual de materiais didáticos', 'Revisar e atualizar apostilas e materiais de apoio', 'education', 'medium', true, 'RRULE:FREQ=YEARLY;BYMONTH=1', 'yearly', 'task-prof-carlos-003', NOW() + INTERVAL '360 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 720}, {"type": "notification", "hours_before": 168}]}', NOW() + INTERVAL '359 days', null, 'general', 480, '["materiais", "didaticos", "atualizacao"]', '{"subjects": ["matematica", "fisica"], "format": ["apostilas", "videos", "exercicios"]}', NOW() - INTERVAL '2 days'),
  
  -- Teacher Sarah (Inglês) - ID: 10
  (10, 'Preparação semanal de aulas de conversação', 'Preparar tópicos e atividades para aulas de conversação em inglês', 'education', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=SU', 'weekly', 'task-teacher-sarah-001', NOW() + INTERVAL '3 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 12}, {"type": "notification", "hours_before": 2}]}', NOW() + INTERVAL '2 days 22 hours', null, 'general', 120, '["conversacao", "topicos", "atividades"]', '{"levels": ["intermediate", "advanced"], "focus": "business_english"}', NOW() - INTERVAL '2 days'),
  
  (10, 'Atualização mensal de materiais didáticos', 'Atualizar apostilas e materiais de apoio para diferentes níveis', 'education', 'medium', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=1', 'monthly', 'task-teacher-sarah-002', NOW() + INTERVAL '30 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 72}, {"type": "notification", "hours_before": 24}]}', NOW() + INTERVAL '29 days', null, 'general', 180, '["materiais", "didaticos", "apostilas"]', '{"levels": ["basic", "intermediate", "advanced"], "exam_prep": ["toefl", "ielts"]}', NOW() - INTERVAL '1 day'),
  
  (10, 'Avaliação trimestral de progresso dos alunos', 'Avaliar progresso e ajustar planos de estudo trimestralmente', 'education', 'medium', true, 'RRULE:FREQ=MONTHLY;INTERVAL=3;BYMONTHDAY=15', 'quarterly', 'task-teacher-sarah-003', NOW() + INTERVAL '90 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 72}, {"type": "notification", "hours_before": 24}]}', NOW() + INTERVAL '89 days', null, 'evaluation', 240, '["avaliacao", "progresso", "trimestral"]', '{"student_count": 18, "skills": ["speaking", "listening", "reading", "writing"]}', NOW() - INTERVAL '1 day'),
  
  -- Isabela Beauty (Estética) - ID: 11
  (11, 'Atualização mensal de técnicas e procedimentos', 'Estudar novas técnicas de beleza e procedimentos estéticos', 'administrative', 'medium', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=10', 'monthly', 'task-isabela-beauty-001', NOW() + INTERVAL '10 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 48}, {"type": "notification", "hours_before": 12}]}', NOW() + INTERVAL '9 days 12 hours', null, 'general', 120, '["tecnicas", "procedimentos", "atualizacao"]', '{"areas": ["micropigmentacao", "limpeza_pele", "design_sobrancelhas"]}', NOW() - INTERVAL '1 day'),
  
  (11, 'Organização semanal de agenda e estoque', 'Organizar agenda da semana e verificar estoque de produtos', 'administrative', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=MO', 'weekly', 'task-isabela-beauty-002', NOW() + INTERVAL '6 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 12}, {"type": "notification", "hours_before": 2}]}', NOW() + INTERVAL '5 days 22 hours', null, 'general', 60, '["agenda", "estoque", "organizacao"]', '{"products": ["cosmeticos", "equipamentos", "descartaveis"]}', NOW() - INTERVAL '2 days'),
  
  (11, 'Campanhas promocionais trimestrais', 'Planejar e executar campanhas promocionais sazonais', 'marketing', 'medium', true, 'RRULE:FREQ=MONTHLY;INTERVAL=3;BYMONTHDAY=1', 'quarterly', 'task-isabela-beauty-003', NOW() + INTERVAL '90 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 168}, {"type": "notification", "hours_before": 48}]}', NOW() + INTERVAL '89 days', null, 'general', 180, '["campanhas", "promocoes", "sazonais"]', '{"channels": ["instagram", "whatsapp", "email"], "focus": "seasonal_treatments"}', NOW() - INTERVAL '1 day'),
  
  -- Marcos Barbeiro - ID: 12
  (12, 'Manutenção semanal de equipamentos', 'Verificar e fazer manutenção preventiva dos equipamentos da barbearia', 'administrative', 'medium', true, 'RRULE:FREQ=WEEKLY;BYDAY=MO', 'weekly', 'task-marcos-barbeiro-001', NOW() + INTERVAL '5 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 24}, {"type": "notification", "hours_before": 4}]}', NOW() + INTERVAL '4 days 20 hours', null, 'general', 90, '["manutencao", "equipamentos", "barbearia"]', '{"equipment": ["maquinas", "navalhas", "tesouras", "secadores"]}', NOW() - INTERVAL '1 day'),
  
  (12, 'Planejamento mensal de campanhas promocionais', 'Planejar promoções e campanhas para atrair novos clientes', 'marketing', 'medium', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=15', 'monthly', 'task-marcos-barbeiro-002', NOW() + INTERVAL '15 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 72}, {"type": "notification", "hours_before": 24}]}', NOW() + INTERVAL '14 days', null, 'general', 120, '["campanhas", "promocoes", "marketing"]', '{"channels": ["instagram", "whatsapp", "boca_a_boca"], "target": "novos_clientes"}', NOW() - INTERVAL '2 days'),
  
  (12, 'Atualização semestral de técnicas de corte', 'Estudar novas tendências e técnicas de corte masculino', 'administrative', 'medium', true, 'RRULE:FREQ=MONTHLY;INTERVAL=6;BYMONTHDAY=1', 'semiannual', 'task-marcos-barbeiro-003', NOW() + INTERVAL '180 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 168}, {"type": "notification", "hours_before": 48}]}', NOW() + INTERVAL '179 days', null, 'general', 240, '["tecnicas", "corte", "tendencias"]', '{"focus": ["fade", "undercut", "pompadour"], "sources": ["youtube", "cursos", "revistas"]}', NOW() - INTERVAL '1 day');

-- ================================================
-- TAREFAS DOS AGENDAMENTOS - CASOS PROFISSIONAIS
-- ================================================
INSERT INTO agendei.appointment_tasks (appointment_id, title, description, is_completed, is_visible_to_customer, due_date, created_at) VALUES
  -- Tarefas Dr. Adriano
  (1, 'Atualização do prontuário eletrônico', 'Revisar e atualizar prontuários dos pacientes atendidos na semana', 'clinical', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=FR', 'task-dr-adriano-001', NOW() + INTERVAL '2 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 24}, {"type": "notification", "hours_before": 2}]}', NOW() + INTERVAL '1 day 2 hours', null, 120, '["prontuario", "documentacao", "pacientes"]', '{"professional_type": "healthcare", "requires_certification": true}', NOW() - INTERVAL '1 day'),
  
  (1, 'Análise de exames laboratoriais', 'Revisar resultados de exames e preparar relatórios para pacientes', 'clinical', 'urgent', false, null, null, NOW() + INTERVAL '1 day', 'pending', '{"alerts": [{"type": "email", "hours_before": 4}, {"type": "notification", "hours_before": 1}]}', NOW() + INTERVAL '23 hours', 1, 90, '["exames", "laboratorio", "relatorios"]', '{"patient_count": 5, "exam_types": ["ECG", "ecocardiograma", "laboratorio"]}', NOW() - INTERVAL '2 days'),
  
  (1, 'Renovação de certificações médicas', 'Renovar certificações do CRM e especialização em cardiologia', 'administrative', 'medium', true, 'RRULE:FREQ=YEARLY;BYMONTH=6', 'task-dr-adriano-002', NOW() + INTERVAL '180 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 720}, {"type": "notification", "hours_before": 168}]}', NOW() + INTERVAL '179 days', null, 240, '["certificacao", "crm", "cardiologia"]', '{"renewal_type": "annual", "certification_body": "CFM", "specialty": "cardiology"}', NOW() - INTERVAL '3 days'),
  
  (1, 'Revisão de medicamentos pacientes crônicos', 'Revisar prescrições e ajustar medicamentos para pacientes com doenças crônicas', 'clinical', 'high', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=15', 'task-dr-adriano-003', NOW() + INTERVAL '15 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 48}, {"type": "notification", "hours_before": 24}]}', NOW() + INTERVAL '14 days', null, 180, '["medicamentos", "cronicos", "prescricoes"]', '{"patient_count": 12, "chronic_conditions": ["hipertensao", "diabetes", "dislipidemia"]}', NOW() - INTERVAL '1 day'),
  
  -- Dra. Carla (Psicóloga) - Tarefas terapicas
  (2, 'Planejamento de sessões terapêuticas', 'Preparar roteiro e materiais para sessões da semana', 'clinical', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=SU', 'task-dra-carla-001', NOW() + INTERVAL '3 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 12}, {"type": "notification", "hours_before": 2}]}', NOW() + INTERVAL '2 days 22 hours', null, 90, '["planejamento", "sessoes", "terapia"]', '{"approach": "TCC", "session_count": 8, "techniques": ["respiracao", "reestruturacao_cognitiva"]}', NOW() - INTERVAL '2 days'),
  
  (2, 'Atualização de registros terapêuticos', 'Documentar evolução dos pacientes e ajustar planos terapêuticos', 'clinical', 'medium', true, 'RRULE:FREQ=WEEKLY;BYDAY=SA', 'task-dra-carla-002', NOW() + INTERVAL '5 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 24}, {"type": "notification", "hours_before": 4}]}', NOW() + INTERVAL '4 days 20 hours', null, 120, '["registros", "evolucao", "documentacao"]', '{"patient_count": 15, "therapy_types": ["individual", "casal", "grupo"]}', NOW() - INTERVAL '1 day'),
  
  (2, 'Supervisão clínica mensal', 'Participar de supervisão clínica com supervisor credenciado', 'administrative', 'high', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=10', 'task-dra-carla-003', NOW() + INTERVAL '10 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 72}, {"type": "notification", "hours_before": 24}]}', NOW() + INTERVAL '9 days', null, 120, '["supervisao", "clinica", "capacitacao"]', '{"supervisor": "Dr. Silva", "modality": "online", "certification_required": true}', NOW() - INTERVAL '3 days'),
  
  -- Dr. Roberto (Clínico Geral) - Tarefas gerais
  (3, 'Atualização de protocolos clínicos', 'Revisar e atualizar protocolos de atendimento conforme diretrizes médicas', 'clinical', 'medium', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=1', 'task-dr-roberto-001', NOW() + INTERVAL '30 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 48}, {"type": "notification", "hours_before": 12}]}', NOW() + INTERVAL '29 days 12 hours', null, 180, '["protocolos", "diretrizes", "atualizacao"]', '{"protocols": ["diabetes", "hipertensao", "preventivo"], "source": "SBM"}', NOW() - INTERVAL '2 days'),
  
  (3, 'Preparação de relatórios domiciliares', 'Elaborar relatórios dos atendimentos domiciliares da semana', 'administrative', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=SU', 'task-dr-roberto-002', NOW() + INTERVAL '4 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 24}, {"type": "notification", "hours_before": 6}]}', NOW() + INTERVAL '3 days 18 hours', null, 150, '["relatorios", "domiciliar", "documentacao"]', '{"home_visits": 8, "report_type": "weekly", "insurance_required": true}', NOW() - INTERVAL '1 day'),
  
  -- Dra. Ana (Nutricionista) - Tarefas nutricionais
  (4, 'Desenvolvimento de cardápios personalizados', 'Criar novos cardápios baseados nas necessidades dos pacientes', 'clinical', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=MO', 'task-dra-ana-001', NOW() + INTERVAL '6 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 12}, {"type": "notification", "hours_before": 2}]}', NOW() + INTERVAL '5 days 22 hours', null, 120, '["cardapios", "personalizados", "nutricao"]', '{"patient_count": 10, "diet_types": ["emagrecimento", "esportiva", "clinica"]}', NOW() - INTERVAL '2 days'),
  
  (4, 'Atualização de tabelas nutricionais', 'Revisar e atualizar tabelas de composição nutricional dos alimentos', 'administrative', 'medium', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=5', 'task-dra-ana-002', NOW() + INTERVAL '5 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 48}, {"type": "notification", "hours_before": 12}]}', NOW() + INTERVAL '4 days 12 hours', null, 90, '["tabelas", "nutricao", "alimentos"]', '{"source": "IBGE", "food_count": 500, "last_update": "2024-01-01"}', NOW() - INTERVAL '1 day'),
  
  (4, 'Análise de bioimpedância', 'Analisar resultados de bioimpedância e atualizar planos nutricionais', 'clinical', 'high', false, null, null, NOW() + INTERVAL '3 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 24}, {"type": "notification", "hours_before": 4}]}', NOW() + INTERVAL '2 days 20 hours', 10, 60, '["bioimpedancia", "composicao", "corporal"]', '{"patient_id": 10, "exam_date": "2024-12-15", "follow_up": true}', NOW() - INTERVAL '1 day'),
  
  -- Prof. Marina (Personal Trainer) - Tarefas fitness
  (5, 'Planejamento de treinos semanais', 'Elaborar programas de treinamento personalizados para cada aluno', 'clinical', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=SU', 'task-prof-marina-001', NOW() + INTERVAL '2 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 12}, {"type": "notification", "hours_before": 2}]}', NOW() + INTERVAL '1 day 22 hours', null, 180, '["treinos", "planejamento", "personalizados"]', '{"student_count": 15, "training_types": ["funcional", "musculacao", "condicionamento"]}', NOW() - INTERVAL '2 days'),
  
  (5, 'Avaliação física mensal', 'Realizar avaliações físicas mensais dos alunos regulares', 'clinical', 'medium', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=1', 'task-prof-marina-002', NOW() + INTERVAL '30 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 72}, {"type": "notification", "hours_before": 24}]}', NOW() + INTERVAL '29 days', null, 240, '["avaliacao", "fisica", "mensal"]', '{"students": 12, "metrics": ["peso", "bf", "circunferencias", "flexibilidade"]}', NOW() - INTERVAL '1 day'),
  
  (5, 'Atualização de certificações fitness', 'Renovar certificações CREF e cursos de especialização', 'administrative', 'medium', true, 'RRULE:FREQ=YEARLY;BYMONTH=8', 'task-prof-marina-003', NOW() + INTERVAL '240 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 720}, {"type": "notification", "hours_before": 168}]}', NOW() + INTERVAL '239 days', null, 120, '["certificacao", "cref", "especializacao"]', '{"certification_body": "CREF", "specializations": ["funcional", "pilates"]}', NOW() - INTERVAL '3 days'),
  
  -- Adv. João (Advogado) - Tarefas jurídicas
  (6, 'Revisão de contratos empresariais', 'Revisar contratos em andamento e identificar necessidades de ajuste', 'administrative', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=FR', 'task-adv-joao-001', NOW() + INTERVAL '4 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 24}, {"type": "notification", "hours_before": 4}]}', NOW() + INTERVAL '3 days 20 hours', null, 180, '["contratos", "revisao", "empresarial"]', '{"contract_count": 8, "companies": 5, "priority_clients": ["Empresa XYZ", "Startup Tech"]}', NOW() - INTERVAL '2 days'),
  
  (6, 'Atualização legislação empresarial', 'Estudar mudanças na legislação e impactos para clientes', 'administrative', 'medium', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=15', 'task-adv-joao-002', NOW() + INTERVAL '15 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 48}, {"type": "notification", "hours_before": 12}]}', NOW() + INTERVAL '14 days 12 hours', null, 120, '["legislacao", "atualizacao", "empresarial"]', '{"focus_areas": ["startups", "tributario", "trabalhista"], "sources": ["DOU", "revistas_juridicas"]}', NOW() - INTERVAL '1 day'),
  
  (6, 'Preparação para audiências', 'Preparar documentação e estratégia para audiências agendadas', 'clinical', 'urgent', false, null, null, NOW() + INTERVAL '7 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 48}, {"type": "notification", "hours_before": 24}]}', NOW() + INTERVAL '6 days', 16, 240, '["audiencia", "preparacao", "tribunal"]', '{"case_type": "empresarial", "court": "TJSP", "client": "Empresa XYZ"}', NOW() - INTERVAL '3 days'),
  
  -- Contador Lucas - Tarefas contábeis
  (7, 'Fechamento contábil mensal', 'Realizar fechamento contábil de todos os clientes MEI e empresas', 'administrative', 'urgent', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=5', 'task-contador-lucas-001', NOW() + INTERVAL '5 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 24}, {"type": "notification", "hours_before": 4}]}', NOW() + INTERVAL '4 days 20 hours', null, 480, '["fechamento", "contabil", "mensal"]', '{"clients": 25, "mei_count": 15, "company_count": 10}', NOW() - INTERVAL '2 days'),
  
  (7, 'Atualização de obrigações fiscais', 'Verificar e atualizar calendário de obrigações fiscais dos clientes', 'administrative', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=MO', 'task-contador-lucas-002', NOW() + INTERVAL '6 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 12}, {"type": "notification", "hours_before": 2}]}', NOW() + INTERVAL '5 days 22 hours', null, 120, '["obrigacoes", "fiscais", "calendario"]', '{"obligations": ["DAS", "DEFIS", "DASN"], "clients": 25}', NOW() - INTERVAL '1 day'),
  
  (7, 'Planejamento tributário anual', 'Elaborar estratégias de planejamento tributário para clientes', 'financial', 'medium', true, 'RRULE:FREQ=YEARLY;BYMONTH=11', 'task-contador-lucas-003', NOW() + INTERVAL '330 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 720}, {"type": "notification", "hours_before": 168}]}', NOW() + INTERVAL '329 days', null, 360, '["planejamento", "tributario", "anual"]', '{"focus": "reducao_impostos", "strategies": ["regime_tributario", "deducoes"]}', NOW() - INTERVAL '3 days'),
  
  -- Coach Fernanda - Tarefas de coaching
  (8, 'Preparação de materiais de coaching', 'Desenvolver exercícios e materiais para sessões de coaching', 'clinical', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=SA', 'task-coach-fernanda-001', NOW() + INTERVAL '3 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 24}, {"type": "notification", "hours_before": 4}]}', NOW() + INTERVAL '2 days 22 hours', null, 150, '["materiais", "coaching", "exercicios"]', '{"focus_areas": ["lideranca", "carreira", "performance"], "tools": ["wheel_of_life", "smart_goals"]}', NOW() - INTERVAL '2 days'),
  
  (8, 'Avaliação de resultados de coaching', 'Avaliar progresso dos clientes e ajustar planos de desenvolvimento', 'clinical', 'medium', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=20', 'task-coach-fernanda-002', NOW() + INTERVAL '20 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 48}, {"type": "notification", "hours_before": 12}]}', NOW() + INTERVAL '19 days 12 hours', null, 180, '["avaliacao", "resultados", "progresso"]', '{"client_count": 8, "assessment_tools": ["feedback_360", "kpis", "goals_tracking"]}', NOW() - INTERVAL '1 day'),
  
  -- Prof. Carlos (Matemática) - Tarefas educacionais
  (9, 'Preparação de aulas e exercícios', 'Elaborar conteúdo didático e listas de exercícios para alunos', 'education', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=SU', 'task-prof-carlos-001', NOW() + INTERVAL '2 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 12}, {"type": "notification", "hours_before": 2}]}', NOW() + INTERVAL '1 day 22 hours', null, 180, '["aulas", "exercicios", "didatico"]', '{"subjects": ["matematica", "fisica"], "levels": ["ensino_medio", "pre_vestibular"]}', NOW() - INTERVAL '2 days'),
  
  (9, 'Correção de provas e simulados', 'Corrigir provas e simulados dos alunos, fornecendo feedback detalhado', 'education', 'medium', true, 'RRULE:FREQ=WEEKLY;BYDAY=WE', 'task-prof-carlos-002', NOW() + INTERVAL '5 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 24}, {"type": "notification", "hours_before": 6}]}', NOW() + INTERVAL '4 days 18 hours', null, 240, '["correcao", "provas", "simulados"]', '{"student_count": 20, "exam_types": ["diagnostico", "simulado_enem", "vestibular"]}', NOW() - INTERVAL '1 day'),
  
  -- Teacher Sarah - Tarefas de inglês
  (10, 'Preparação de aulas de conversação', 'Preparar tópicos e atividades para aulas de conversação em inglês', 'education', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=SU', 'task-teacher-sarah-001', NOW() + INTERVAL '3 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 12}, {"type": "notification", "hours_before": 2}]}', NOW() + INTERVAL '2 days 22 hours', null, 120, '["conversacao", "topicos", "atividades"]', '{"levels": ["intermediate", "advanced"], "focus": "business_english"}', NOW() - INTERVAL '2 days'),
  
  (10, 'Atualização de materiais didáticos', 'Atualizar apostilas e materiais de apoio para diferentes níveis', 'education', 'medium', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=1', 'task-teacher-sarah-002', NOW() + INTERVAL '30 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 72}, {"type": "notification", "hours_before": 24}]}', NOW() + INTERVAL '29 days', null, 180, '["materiais", "didaticos", "apostilas"]', '{"levels": ["basic", "intermediate", "advanced"], "exam_prep": ["toefl", "ielts"]}', NOW() - INTERVAL '1 day'),
  
  -- Isabela Beauty - Tarefas de estética
  (11, 'Atualização de técnicas e procedimentos', 'Estudar novas técnicas de beleza e procedimentos estéticos', 'administrative', 'medium', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=10', 'task-isabela-beauty-001', NOW() + INTERVAL '10 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 48}, {"type": "notification", "hours_before": 12}]}', NOW() + INTERVAL '9 days 12 hours', null, 120, '["tecnicas", "procedimentos", "atualizacao"]', '{"areas": ["micropigmentacao", "limpeza_pele", "design_sobrancelhas"]}', NOW() - INTERVAL '1 day'),
  
  (11, 'Organização de agenda e estoque', 'Organizar agenda da semana e verificar estoque de produtos', 'administrative', 'high', true, 'RRULE:FREQ=WEEKLY;BYDAY=MO', 'task-isabela-beauty-002', NOW() + INTERVAL '6 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 12}, {"type": "notification", "hours_before": 2}]}', NOW() + INTERVAL '5 days 22 hours', null, 60, '["agenda", "estoque", "organizacao"]', '{"products": ["cosmeticos", "equipamentos", "descartaveis"]}', NOW() - INTERVAL '2 days'),
  
  -- Marcos Barbeiro - Tarefas de barbearia
  (12, 'Manutenção de equipamentos', 'Verificar e fazer manutenção preventiva dos equipamentos da barbearia', 'administrative', 'medium', true, 'RRULE:FREQ=WEEKLY;BYDAY=MO', 'task-marcos-barbeiro-001', NOW() + INTERVAL '5 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 24}, {"type": "notification", "hours_before": 4}]}', NOW() + INTERVAL '4 days 20 hours', null, 90, '["manutencao", "equipamentos", "barbearia"]', '{"equipment": ["maquinas", "navalhas", "tesouras", "secadores"]}', NOW() - INTERVAL '1 day'),
  
  (12, 'Planejamento de campanhas promocionais', 'Planejar promoções e campanhas para atrair novos clientes', 'marketing', 'medium', true, 'RRULE:FREQ=MONTHLY;BYMONTHDAY=15', 'task-marcos-barbeiro-002', NOW() + INTERVAL '15 days', 'pending', '{"alerts": [{"type": "email", "hours_before": 72}, {"type": "notification", "hours_before": 24}]}', NOW() + INTERVAL '14 days', null, 120, '["campanhas", "promocoes", "marketing"]', '{"channels": ["instagram", "whatsapp", "boca_a_boca"], "target": "novos_clientes"}', NOW() - INTERVAL '2 days');

-- Subtarefas para tarefas profissionais complexas
INSERT INTO agendei.task_subtasks (parent_task_id, title, description, is_completed, due_date, order_index, created_at) VALUES
  -- Subtarefas para atualização semanal de prontuários (Dr. Adriano - ID: 1)
  (1, 'Revisar prontuários da segunda-feira', 'Revisar e atualizar prontuários dos pacientes atendidos na segunda', false, NOW() + INTERVAL '2 days', 1, NOW()),
  (1, 'Revisar prontuários da terça-feira', 'Revisar e atualizar prontuários dos pacientes atendidos na terça', false, NOW() + INTERVAL '2 days', 2, NOW()),
  (1, 'Revisar prontuários da quarta-feira', 'Revisar e atualizar prontuários dos pacientes atendidos na quarta', false, NOW() + INTERVAL '2 days', 3, NOW()),
  (1, 'Revisar prontuários da quinta-feira', 'Revisar e atualizar prontuários dos pacientes atendidos na quinta', false, NOW() + INTERVAL '2 days', 4, NOW()),
  (1, 'Gerar relatório semanal', 'Compilar relatório semanal de atendimentos e evolução dos pacientes', false, NOW() + INTERVAL '2 days', 5, NOW()),
  
  -- Subtarefas para análise urgente de exames (Dr. Adriano - ID: 2)
  (2, 'Analisar ECGs pendentes', 'Analisar 3 eletrocardiogramas pendentes', false, NOW() + INTERVAL '1 day', 1, NOW()),
  (2, 'Revisar ecocardiogramas', 'Revisar 2 ecocardiogramas com doppler', false, NOW() + INTERVAL '1 day', 2, NOW()),
  (2, 'Avaliar exames laboratoriais', 'Avaliar perfis lipídicos e hemogramas', false, NOW() + INTERVAL '1 day', 3, NOW()),
  (2, 'Preparar relatórios médicos', 'Elaborar relatórios detalhados para os pacientes', false, NOW() + INTERVAL '1 day', 4, NOW()),
  (2, 'Contatar pacientes com resultados', 'Ligar para pacientes com resultados que requerem atenção', false, NOW() + INTERVAL '1 day', 5, NOW()),
  
  -- Subtarefas para renovação de certificações (Dr. Adriano - ID: 3)
  (3, 'Solicitar formulários CRM', 'Baixar e preencher formulários de renovação do CRM', false, NOW() + INTERVAL '170 days', 1, NOW()),
  (3, 'Comprovar educação continuada', 'Reunir certificados de cursos e eventos científicos', false, NOW() + INTERVAL '175 days', 2, NOW()),
  (3, 'Pagar taxas de renovação', 'Efetuar pagamento das taxas de renovação CRM e especialização', false, NOW() + INTERVAL '178 days', 3, NOW()),
  (3, 'Agendar avaliação clínica', 'Agendar avaliação clínica se necessário', false, NOW() + INTERVAL '179 days', 4, NOW()),
  
  -- Subtarefas para planejamento de sessões (Dra. Carla - ID: 6)
  (6, 'Preparar materiais para terapia individual', 'Preparar exercícios de respiração e planilhas de ansiedade', false, NOW() + INTERVAL '3 days', 1, NOW()),
  (6, 'Roteiro para terapia de casal', 'Elaborar roteiro de sessão focada em comunicação', false, NOW() + INTERVAL '3 days', 2, NOW()),
  (6, 'Materiais para terapia de grupo', 'Preparar dinâmicas e exercícios para terapia de grupo', false, NOW() + INTERVAL '3 days', 3, NOW()),
  (6, 'Atualizar técnicas TCC', 'Revisar novas técnicas de terapia cognitivo-comportamental', false, NOW() + INTERVAL '3 days', 4, NOW()),
  
  -- Subtarefas para fechamento contábil (Contador Lucas - ID: 19)
  (19, 'Conciliar contas bancárias', 'Conciliar todas as contas bancárias dos clientes', false, NOW() + INTERVAL '23 days', 1, NOW()),
  (19, 'Calcular impostos MEI', 'Calcular DAS para todos os clientes MEI', false, NOW() + INTERVAL '24 days', 2, NOW()),
  (19, 'Elaborar demonstrativos', 'Preparar DRE e balanços para empresas', false, NOW() + INTERVAL '24 days', 3, NOW()),
  (19, 'Gerar relatórios gerenciais', 'Criar relatórios de análise financeira para clientes', false, NOW() + INTERVAL '25 days', 4, NOW()),
  (19, 'Enviar documentação', 'Enviar toda documentação para clientes e órgãos competentes', false, NOW() + INTERVAL '25 days', 5, NOW()),
  
  -- Subtarefas para preparação de materiais de coaching (Coach Fernanda - ID: 22)
  (22, 'Criar exercício Roda da Vida', 'Desenvolver exercício personalizado da Roda da Vida', false, NOW() + INTERVAL '3 days', 1, NOW()),
  (22, 'Elaborar plano de ação', 'Criar templates de plano de ação para diferentes perfis', false, NOW() + INTERVAL '3 days', 2, NOW()),
  (22, 'Preparar questionário SWOT', 'Desenvolver questionário de análise SWOT pessoal', false, NOW() + INTERVAL '3 days', 3, NOW()),
  (22, 'Atualizar metas SMART', 'Revisar metodologia SMART para definição de metas', false, NOW() + INTERVAL '3 days', 4, NOW()),
  
  -- Subtarefas para preparação de aulas (Prof. Carlos - ID: 25)
  (25, 'Preparar aula de álgebra linear', 'Elaborar conteúdo sobre matrizes e determinantes', false, NOW() + INTERVAL '2 days', 1, NOW()),
  (25, 'Criar exercícios de física', 'Desenvolver problemas de cinemática e dinâmica', false, NOW() + INTERVAL '2 days', 2, NOW()),
  (25, 'Simulado ENEM matemática', 'Montar simulado com questões do ENEM de matemática', false, NOW() + INTERVAL '2 days', 3, NOW()),
  (25, 'Material de apoio geometria', 'Criar resumos e mapas mentais de geometria', false, NOW() + INTERVAL '2 days', 4, NOW()),
  
  -- Subtarefas para planejamento de treinos (Prof. Marina - ID: 13)
  (13, 'Treino funcional individualizado', 'Elaborar treino funcional específico para cada aluno', false, NOW() + INTERVAL '2 days', 1, NOW()),
  (13, 'Programa de musculação', 'Criar programa de musculação progressivo', false, NOW() + INTERVAL '2 days', 2, NOW()),
  (13, 'Treino cardiovascular', 'Desenvolver treino cardiovascular adaptado', false, NOW() + INTERVAL '2 days', 3, NOW()),
  (13, 'Treino de flexibilidade', 'Planejar sessões de alongamento e flexibilidade', false, NOW() + INTERVAL '2 days', 4, NOW()),
  
  -- Subtarefas para avaliação física mensal (Prof. Marina - ID: 14)
  (14, 'Medidas antropométricas', 'Coletar peso, altura e circunferências', false, NOW() + INTERVAL '29 days', 1, NOW()),
  (14, 'Teste de flexibilidade', 'Aplicar testes de flexibilidade padronizados', false, NOW() + INTERVAL '29 days', 2, NOW()),
  (14, 'Avaliação de força', 'Realizar testes de força máxima e resistência', false, NOW() + INTERVAL '29 days', 3, NOW()),
  (14, 'Composição corporal', 'Medir percentual de gordura e massa muscular', false, NOW() + INTERVAL '29 days', 4, NOW()),
  (14, 'Relatório de evolução', 'Elaborar relatório completo de evolução física', false, NOW() + INTERVAL '30 days', 5, NOW()),
  
  -- Subtarefas para preparação de aulas de conversação (Teacher Sarah - ID: 28)
  (28, 'Tópicos de business english', 'Selecionar tópicos relevantes para inglês empresarial', false, NOW() + INTERVAL '3 days', 1, NOW()),
  (28, 'Atividades de listening', 'Preparar exercícios de compreensão auditiva', false, NOW() + INTERVAL '3 days', 2, NOW()),
  (28, 'Role-play empresarial', 'Criar situações de role-play para ambiente corporativo', false, NOW() + INTERVAL '3 days', 3, NOW()),
  (28, 'Vocabulary building', 'Preparar lista de vocabulário essencial para negócios', false, NOW() + INTERVAL '3 days', 4, NOW()),
  
  -- Subtarefas para organização de agenda (Isabela Beauty - ID: 33)
  (33, 'Verificar agenda da semana', 'Revisar todos os agendamentos confirmados', false, NOW() + INTERVAL '6 days', 1, NOW()),
  (33, 'Controlar estoque de produtos', 'Verificar níveis de estoque de cosméticos e materiais', false, NOW() + INTERVAL '6 days', 2, NOW()),
  (33, 'Confirmar agendamentos', 'Entrar em contato com clientes para confirmar horários', false, NOW() + INTERVAL '6 days', 3, NOW()),
  (33, 'Preparar materiais descartáveis', 'Organizar materiais descartáveis para a semana', false, NOW() + INTERVAL '6 days', 4, NOW()),
  
  -- Subtarefas para manutenção de equipamentos (Marcos Barbeiro - ID: 35)
  (35, 'Limpar máquinas de corte', 'Limpeza completa das máquinas de corte', false, NOW() + INTERVAL '5 days', 1, NOW()),
  (35, 'Afiar navalhas e tesouras', 'Afiar e ajustar navalhas e tesouras profissionais', false, NOW() + INTERVAL '5 days', 2, NOW()),
  (35, 'Verificar secadores', 'Testar funcionamento dos secadores de cabelo', false, NOW() + INTERVAL '5 days', 3, NOW()),
  (35, 'Organizar ferramentas', 'Organizar e esterilizar todas as ferramentas de trabalho', false, NOW() + INTERVAL '5 days', 4, NOW());
  (21, 'Simulado ENEM matemática', 'Montar simulado com questões do ENEM de matemática', false, NOW() + INTERVAL '2 days', 3, NOW()),
  (21, 'Material de apoio geometria', 'Criar resumos e mapas mentais de geometria', false, NOW() + INTERVAL '2 days', 4, NOW()),
  
  -- Subtarefas para planejamento de treinos (Prof. Marina)
  (11, 'Treino funcional para Ricardo', 'Elaborar treino focado em core e estabilidade', false, NOW() + INTERVAL '2 days', 1, NOW()),
  (11, 'Programa de musculação Amanda', 'Criar programa de hipertrofia para membros superiores', false, NOW() + INTERVAL '2 days', 2, NOW()),
  (11, 'Condicionamento físico Bruno', 'Desenvolver treino cardiovascular progressivo', false, NOW() + INTERVAL '2 days', 3, NOW()),
  (11, 'Treino funcional grupo', 'Planejar aula de treino funcional para grupo de 5 pessoas', false, NOW() + INTERVAL '2 days', 4, NOW());

-- Anexos para tarefas profissionais
INSERT INTO agendei.task_attachments (task_id, filename, file_type, file_url, file_size, uploaded_by, description, created_at) VALUES
  -- Anexos para renovação de certificações (Dr. Adriano - ID: 3)
  (3, 'formulario_renovacao_crm.pdf', 'application/pdf', '/uploads/tasks/3/formulario_renovacao_crm.pdf', 234567, 'professional', 'Formulário de renovação do CRM preenchido', NOW()),
  (3, 'comprovante_educacao_continuada.pdf', 'application/pdf', '/uploads/tasks/3/comprovante_educacao_continuada.pdf', 345678, 'professional', 'Comprovantes de educação continuada em cardiologia', NOW()),
  (3, 'certidao_negativa_crm.pdf', 'application/pdf', '/uploads/tasks/3/certidao_negativa_crm.pdf', 123456, 'professional', 'Certidão negativa do CRM', NOW()),
  
  -- Anexos para supervisão clínica (Dra. Carla - ID: 8)
  (8, 'relatorio_casos_clinicos.pdf', 'application/pdf', '/uploads/tasks/8/relatorio_casos_clinicos.pdf', 456789, 'professional', 'Relatório de casos clínicos para supervisão', NOW()),
  (8, 'plano_desenvolvimento_profissional.pdf', 'application/pdf', '/uploads/tasks/8/plano_desenvolvimento_profissional.pdf', 234567, 'professional', 'Plano de desenvolvimento profissional', NOW()),
  
  -- Anexos para fechamento contábil (Contador Lucas - ID: 19)
  (19, 'planilha_controle_mei.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '/uploads/tasks/19/planilha_controle_mei.xlsx', 89123, 'professional', 'Planilha de controle de faturamento MEI', NOW()),
  (19, 'relatorios_bancarios.pdf', 'application/pdf', '/uploads/tasks/19/relatorios_bancarios.pdf', 567890, 'professional', 'Extratos bancários para conciliação', NOW()),
  (19, 'calendario_obrigacoes.pdf', 'application/pdf', '/uploads/tasks/19/calendario_obrigacoes.pdf', 345678, 'professional', 'Calendário de obrigações fiscais 2024', NOW()),
  
  -- Anexos para preparação de audiências (Adv. João - ID: 18)
  (18, 'peticao_inicial.pdf', 'application/pdf', '/uploads/tasks/18/peticao_inicial.pdf', 678901, 'professional', 'Petição inicial do processo', NOW()),
  (18, 'documentos_probatorios.pdf', 'application/pdf', '/uploads/tasks/18/documentos_probatorios.pdf', 789012, 'professional', 'Documentos probatórios para audiência', NOW()),
  (18, 'jurisprudencia_correlata.pdf', 'application/pdf', '/uploads/tasks/18/jurisprudencia_correlata.pdf', 456789, 'professional', 'Jurisprudência relacionada ao caso', NOW()),
  
  -- Anexos para materiais de coaching (Coach Fernanda - ID: 22)
  (22, 'exercicio_wheel_of_life.pdf', 'application/pdf', '/uploads/tasks/22/exercicio_wheel_of_life.pdf', 234567, 'professional', 'Exercício Roda da Vida para coaching', NOW()),
  (22, 'template_plano_acao.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '/uploads/tasks/22/template_plano_acao.docx', 123456, 'professional', 'Template de plano de ação para clientes', NOW()),
  (22, 'questionario_autoconhecimento.pdf', 'application/pdf', '/uploads/tasks/22/questionario_autoconhecimento.pdf', 345678, 'professional', 'Questionário de autoconhecimento', NOW()),
  
  -- Anexos para atualização de materiais (Teacher Sarah - ID: 29)
  (29, 'apostila_business_english.pdf', 'application/pdf', '/uploads/tasks/29/apostila_business_english.pdf', 890123, 'professional', 'Apostila atualizada de inglês empresarial', NOW()),
  (29, 'exercicios_toefl_listening.mp3', 'audio/mpeg', '/uploads/tasks/29/exercicios_toefl_listening.mp3', 5678901, 'professional', 'Exercícios de listening para TOEFL', NOW()),
  (29, 'vocabulary_list_advanced.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '/uploads/tasks/29/vocabulary_list_advanced.xlsx', 234567, 'professional', 'Lista de vocabulário avançado', NOW()),
  
  -- Anexos para avaliação física (Prof. Marina - ID: 14)
  (14, 'planilha_medidas_antropometricas.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '/uploads/tasks/14/planilha_medidas_antropometricas.xlsx', 123456, 'professional', 'Planilha de controle de medidas antropométricas', NOW()),
  (14, 'protocolo_avaliacao_fisica.pdf', 'application/pdf', '/uploads/tasks/14/protocolo_avaliacao_fisica.pdf', 234567, 'professional', 'Protocolo padronizado de avaliação física', NOW()),
  
  -- Anexos para atualização de técnicas (Isabela Beauty - ID: 31)
  (31, 'manual_micropigmentacao.pdf', 'application/pdf', '/uploads/tasks/31/manual_micropigmentacao.pdf', 567890, 'professional', 'Manual de técnicas de micropigmentação', NOW()),
  (31, 'catalogo_produtos_2024.pdf', 'application/pdf', '/uploads/tasks/31/catalogo_produtos_2024.pdf', 345678, 'professional', 'Catálogo de produtos e cosméticos 2024', NOW()),
  
  -- Anexos para preparação de aulas (Prof. Carlos - ID: 25)
  (25, 'apostila_algebra_linear.pdf', 'application/pdf', '/uploads/tasks/25/apostila_algebra_linear.pdf', 789012, 'professional', 'Apostila de álgebra linear com exercícios', NOW()),
  (25, 'simulado_enem_matematica.pdf', 'application/pdf', '/uploads/tasks/25/simulado_enem_matematica.pdf', 456789, 'professional', 'Simulado ENEM matemática com gabarito', NOW()),
  
  -- Anexos para planejamento tributário (Contador Lucas - ID: 21)
  (21, 'planilha_planejamento_tributario.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '/uploads/tasks/21/planilha_planejamento_tributario.xlsx', 234567, 'professional', 'Planilha de planejamento tributário anual', NOW()),
  (21, 'manual_legislacao_tributaria.pdf', 'application/pdf', '/uploads/tasks/21/manual_legislacao_tributaria.pdf', 567890, 'professional', 'Manual de legislação tributária atualizado', NOW());

-- Histórico de alterações das tarefas profissionais
INSERT INTO agendei.task_history (task_id, action, field_changed, old_value, new_value, changed_by, notes, created_at) VALUES
  -- Histórico da tarefa de atualização de prontuários (Dr. Adriano - ID: 1)
  (1, 'created', null, null, null, 'professional', 'Tarefa criada automaticamente pelo sistema de recorrência', NOW() - INTERVAL '1 day'),
  (1, 'updated', 'priority', 'medium', 'high', 'professional', 'Prioridade aumentada devido ao prazo de auditoria', NOW() - INTERVAL '6 hours'),
  (1, 'updated', 'estimated_duration_minutes', '90', '120', 'professional', 'Tempo estimado ajustado baseado em experiências anteriores', NOW() - INTERVAL '4 hours'),
  
  -- Histórico da tarefa de análise de exames (Dr. Adriano - ID: 2)
  (2, 'created', null, null, null, 'professional', 'Tarefa criada para análise de exames pendentes', NOW() - INTERVAL '2 days'),
  (2, 'updated', 'due_date', '2024-12-20 10:00:00', '2024-12-19 10:00:00', 'professional', 'Prazo antecipado devido à urgência dos resultados', NOW() - INTERVAL '1 day'),
  (2, 'updated', 'status', 'pending', 'in_progress', 'professional', 'Iniciado processo de análise dos exames', NOW() - INTERVAL '2 hours'),
  
  -- Histórico da tarefa de planejamento de sessões (Dra. Carla - ID: 6)
  (6, 'created', null, null, null, 'professional', 'Tarefa recorrente criada para planejamento semanal', NOW() - INTERVAL '2 days'),
  (6, 'updated', 'description', 'Preparar roteiro para sessões da semana', 'Preparar roteiro e materiais para sessões da semana', 'professional', 'Incluído materiais na descrição', NOW() - INTERVAL '1 day'),
  
  -- Histórico da tarefa de fechamento contábil (Contador Lucas - ID: 19)
  (19, 'created', null, null, null, 'professional', 'Tarefa mensal de fechamento contábil', NOW() - INTERVAL '2 days'),
  (19, 'updated', 'priority', 'high', 'urgent', 'professional', 'Prioridade aumentada devido aos prazos fiscais', NOW() - INTERVAL '1 day'),
  (19, 'updated', 'estimated_duration_minutes', '360', '480', 'professional', 'Tempo aumentado devido ao maior número de clientes', NOW() - INTERVAL '6 hours'),
  
  -- Histórico da tarefa de preparação de aulas (Prof. Carlos - ID: 25)
  (25, 'created', null, null, null, 'professional', 'Planejamento semanal de aulas', NOW() - INTERVAL '2 days'),
  (25, 'updated', 'tags', '["aulas", "exercicios"]', '["aulas", "exercicios", "didatico"]', 'professional', 'Adicionada tag para material didático', NOW() - INTERVAL '1 day'),
  
  -- Histórico da tarefa de materiais de coaching (Coach Fernanda - ID: 22)
  (22, 'created', null, null, null, 'professional', 'Desenvolvimento de materiais para coaching', NOW() - INTERVAL '2 days'),
  (22, 'updated', 'status', 'pending', 'in_progress', 'professional', 'Iniciado desenvolvimento dos exercícios', NOW() - INTERVAL '4 hours'),
  
  -- Histórico da tarefa de organização de agenda (Isabela Beauty - ID: 33)
  (33, 'created', null, null, null, 'professional', 'Organização semanal da agenda', NOW() - INTERVAL '2 days'),
  (33, 'updated', 'due_date', '2024-12-23 10:00:00', '2024-12-22 10:00:00', 'professional', 'Antecipado devido ao feriado', NOW() - INTERVAL '1 day'),
  (33, 'updated', 'status', 'pending', 'completed', 'professional', 'Agenda organizada e estoque verificado', NOW() - INTERVAL '12 hours'),
  
  -- Histórico da tarefa de manutenção de equipamentos (Marcos Barbeiro - ID: 35)
  (35, 'created', null, null, null, 'professional', 'Manutenção preventiva semanal dos equipamentos', NOW() - INTERVAL '2 days'),
  (35, 'updated', 'description', 'Verificar equipamentos', 'Verificar e fazer manutenção preventiva dos equipamentos da barbearia', 'professional', 'Descrição detalhada da manutenção', NOW() - INTERVAL '1 day'),
  
  -- Histórico da tarefa de avaliação física (Prof. Marina - ID: 14)
  (14, 'created', null, null, null, 'professional', 'Avaliação física mensal programada', NOW() - INTERVAL '3 days'),
  (14, 'updated', 'alert_settings', '{"alerts": [{"type": "email", "hours_before": 48}]}', '{"alerts": [{"type": "email", "hours_before": 72}, {"type": "notification", "hours_before": 24}]}', 'professional', 'Incluído alerta adicional por notificação', NOW() - INTERVAL '2 days'),
  
  -- Histórico da tarefa de preparação de materiais (Teacher Sarah - ID: 28)
  (28, 'created', null, null, null, 'professional', 'Preparação semanal de aulas de conversação', NOW() - INTERVAL '2 days'),
  (28, 'updated', 'metadata', '{"levels": ["intermediate"]}', '{"levels": ["intermediate", "advanced"], "focus": "business_english"}', 'professional', 'Expandido para nível avançado com foco empresarial', NOW() - INTERVAL '1 day'),
  
  -- Histórico da tarefa de aniversário (Dr. Adriano - ID: 5)
  (5, 'created', null, null, null, 'system', 'Tarefa de aniversário criada automaticamente', NOW() - INTERVAL '3 days'),
  (5, 'updated', 'context_type', 'general', 'customer_birthday', 'system', 'Reclassificada como aniversário de cliente', NOW() - INTERVAL '2 days'),
  
  -- Histórico da tarefa de avaliação trimestral (Teacher Sarah - ID: 30)
  (30, 'created', null, null, null, 'professional', 'Avaliação trimestral de progresso programada', NOW() - INTERVAL '1 day'),
  (30, 'updated', 'recurrence_type', 'monthly', 'quarterly', 'professional', 'Corrigida periodicidade para trimestral', NOW() - INTERVAL '6 hours'),
  
  -- Histórico da tarefa de campanhas promocionais (Isabela Beauty - ID: 34)
  (34, 'created', null, null, null, 'professional', 'Campanha promocional trimestral planejada', NOW() - INTERVAL '1 day'),
  (34, 'updated', 'priority', 'low', 'medium', 'professional', 'Prioridade aumentada para início do trimestre', NOW() - INTERVAL '12 hours'),
  
  -- Histórico da tarefa de atualização de técnicas (Marcos Barbeiro - ID: 36)
  (36, 'created', null, null, null, 'professional', 'Atualização semestral de técnicas programada', NOW() - INTERVAL '1 day'),
  (36, 'updated', 'estimated_duration_minutes', '180', '240', 'professional', 'Tempo aumentado para curso prático', NOW() - INTERVAL '6 hours');
  (1, 'updated', 'estimated_duration_minutes', '90', '120', 'professional', 'Tempo estimado ajustado baseado em experiências anteriores', NOW() - INTERVAL '4 hours'),
  
  -- Histórico da tarefa de análise de exames (Dr. Adriano)
  (2, 'created', null, null, null, 'professional', 'Tarefa criada para análise de exames pendentes', NOW() - INTERVAL '2 days'),
  (2, 'updated', 'due_date', '2024-12-20 10:00:00', '2024-12-19 10:00:00', 'professional', 'Prazo antecipado devido à urgência dos resultados', NOW() - INTERVAL '1 day'),
  (2, 'updated', 'status', 'pending', 'in_progress', 'professional', 'Iniciado processo de análise dos exames', NOW() - INTERVAL '2 hours'),
  
  -- Histórico da tarefa de planejamento de sessões (Dra. Carla)
  (5, 'created', null, null, null, 'professional', 'Tarefa recorrente criada para planejamento semanal', NOW() - INTERVAL '2 days'),
  (5, 'updated', 'description', 'Preparar roteiro para sessões da semana', 'Preparar roteiro e materiais para sessões da semana', 'professional', 'Incluído materiais na descrição', NOW() - INTERVAL '1 day'),
  
  -- Histórico da tarefa de fechamento contábil (Contador Lucas)
  (17, 'created', null, null, null, 'professional', 'Tarefa mensal de fechamento contábil', NOW() - INTERVAL '2 days'),
  (17, 'updated', 'priority', 'high', 'urgent', 'professional', 'Prioridade aumentada devido aos prazos fiscais', NOW() - INTERVAL '1 day'),
  (17, 'updated', 'estimated_duration_minutes', '360', '480', 'professional', 'Tempo aumentado devido ao maior número de clientes', NOW() - INTERVAL '6 hours'),
  
  -- Histórico da tarefa de preparação de aulas (Prof. Carlos)
  (21, 'created', null, null, null, 'professional', 'Planejamento semanal de aulas', NOW() - INTERVAL '2 days'),
  (21, 'updated', 'tags', '["aulas", "exercicios"]', '["aulas", "exercicios", "didatico"]', 'professional', 'Adicionada tag para material didático', NOW() - INTERVAL '1 day'),
  
  -- Histórico da tarefa de materiais de coaching (Coach Fernanda)
  (19, 'created', null, null, null, 'professional', 'Desenvolvimento de materiais para coaching', NOW() - INTERVAL '2 days'),
  (19, 'updated', 'status', 'pending', 'in_progress', 'professional', 'Iniciado desenvolvimento dos exercícios', NOW() - INTERVAL '4 hours'),
  
  -- Histórico da tarefa de organização de agenda (Isabela Beauty)
  (26, 'created', null, null, null, 'professional', 'Organização semanal da agenda', NOW() - INTERVAL '2 days'),
  (26, 'updated', 'due_date', '2024-12-23 10:00:00', '2024-12-22 10:00:00', 'professional', 'Antecipado devido ao feriado', NOW() - INTERVAL '1 day'),
  (26, 'completed', 'status', 'pending', 'completed', 'professional', 'Agenda organizada e estoque verificado', NOW() - INTERVAL '12 hours'),
  
  -- Histórico da tarefa de manutenção de equipamentos (Marcos Barbeiro)
  (27, 'created', null, null, null, 'professional', 'Manutenção preventiva semanal', NOW() - INTERVAL '1 day'),
  (27, 'updated', 'metadata', '{"equipment": ["maquinas", "navalhas"]}', '{"equipment": ["maquinas", "navalhas", "tesouras", "secadores"]}', 'professional', 'Incluídos mais equipamentos na manutenção', NOW() - INTERVAL '6 hours');

-- ================================================
-- VERIFICAÇÃO DAS NOVAS TABELAS DE TAREFAS
-- ================================================
SELECT 'TAREFAS PROFISSIONAIS' as tabela, count(*) as total FROM agendei.professional_tasks
UNION ALL
SELECT 'SUBTAREFAS', count(*) FROM agendei.task_subtasks
UNION ALL
SELECT 'ANEXOS DE TAREFAS', count(*) FROM agendei.task_attachments
UNION ALL
SELECT 'HISTÓRICO DE TAREFAS', count(*) FROM agendei.task_history;

-- ================================================
-- MÉTRICAS DAS TAREFAS PROFISSIONAIS
-- ================================================
SELECT 
  'MÉTRICAS TAREFAS PROFISSIONAIS' as categoria,
  '' as metrica,
  '' as valor,
  '' as observacao
UNION ALL
SELECT 
  '',
  'Total de Tarefas',
  COUNT(*)::text,
  'Tarefas do sistema de gerenciamento'
FROM agendei.professional_tasks
UNION ALL
SELECT 
  '',
  'Tarefas Pendentes',
  COUNT(*)::text,
  'Tarefas aguardando execução'
FROM agendei.professional_tasks
WHERE status = 'pending'
UNION ALL
SELECT 
  '',
  'Tarefas Recorrentes',
  COUNT(*)::text,
  'Tarefas com RRules configuradas'
FROM agendei.professional_tasks
WHERE is_recurring = true
UNION ALL
SELECT 
  '',
  'Tarefas por Profissional',
  ROUND(COUNT(*) / (SELECT COUNT(DISTINCT professional_id) FROM agendei.professional_tasks), 1)::text,
  'Média de tarefas por profissional'
FROM agendei.professional_tasks
UNION ALL
SELECT 
  '',
  'Tarefas Urgentes',
  COUNT(*)::text,
  'Tarefas com alta prioridade'
FROM agendei.professional_tasks
WHERE priority IN ('high', 'urgent')
UNION ALL
SELECT 
  '',
  'Subtarefas Criadas',
  COUNT(*)::text,
  'Subtarefas para organização'
FROM agendei.task_subtasks
UNION ALL
SELECT 
  '',
  'Anexos de Tarefas',
  COUNT(*)::text,
  'Documentos anexados às tarefas'
FROM agendei.task_attachments
ORDER BY categoria, metrica;

-- ================================================
-- ANÁLISE DE TAREFAS POR CATEGORIA
-- ================================================
SELECT 
  'TAREFAS POR CATEGORIA' as categoria,
  '' as metrica,
  '' as valor,
  '' as observacao
UNION ALL
SELECT 
  '',
  COALESCE(category, 'Sem categoria') || ' - Total',
  COUNT(*)::text,
  'Tarefas por categoria profissional'
FROM agendei.professional_tasks
GROUP BY category
UNION ALL
SELECT 
  '',
  'Distribuição por Prioridade',
  priority || ': ' || COUNT(*)::text,
  'Quantidade por nível de prioridade'
FROM agendei.professional_tasks
GROUP BY priority
ORDER BY categoria, metrica;
