import { db } from "../src/db";
import {
  users,
  professionals,
  customers,
  appointments,
  packages,
} from "../src/schema";

const verifySeedData = async () => {
  try {
    console.log("🔍 Verificando dados inseridos no banco...\n");

    // Verificar usuários
    const usersCount = await db.select().from(users);
    console.log(`👥 Usuários cadastrados: ${usersCount.length}`);
    usersCount.forEach((user) => {
      console.log(`  - ${user.name} (${user.email}) - ${user.role}`);
    });

    // Verificar profissionais
    const professionalsCount = await db.select().from(professionals);
    console.log(`\n🩺 Profissionais cadastrados: ${professionalsCount.length}`);
    professionalsCount.forEach((prof) => {
      console.log(
        `  - @${prof.username} - ${prof.profession_type} - R$ ${(
          prof.hourly_rate / 100
        ).toFixed(2)}/h`
      );
    });

    // Verificar clientes
    const customersCount = await db.select().from(customers);
    console.log(`\n👥 Clientes cadastrados: ${customersCount.length}`);

    // Verificar pacotes
    const packagesCount = await db.select().from(packages);
    console.log(`\n📦 Pacotes disponíveis: ${packagesCount.length}`);
    packagesCount.forEach((pkg) => {
      console.log(
        `  - ${pkg.title} - R$ ${(pkg.price / 100).toFixed(2)} (${
          pkg.number_of_sessions
        } sessões)`
      );
    });

    // Verificar agendamentos
    const appointmentsCount = await db.select().from(appointments);
    console.log(`\n📅 Agendamentos cadastrados: ${appointmentsCount.length}`);
    appointmentsCount.forEach((apt) => {
      console.log(
        `  - ${apt.title} - ${apt.status} - ${
          apt.start_at?.toISOString().split("T")[0]
        }`
      );
    });

    console.log("\n✅ Verificação concluída com sucesso!");

    console.log("\n🔐 Credenciais para teste:");
    console.log("Email: adrianomonteiroweb@gmail.com");
    console.log("Senha: 123456");
    console.log("Ou qualquer outro email listado acima com a mesma senha.");
  } catch (error) {
    console.error("❌ Erro ao verificar dados:", error);
  } finally {
    process.exit(0);
  }
};

verifySeedData();
