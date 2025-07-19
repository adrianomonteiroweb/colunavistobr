import { db } from "./src/db";
import { appointments } from "./src/schema";

async function testConnection() {
  try {
    console.log("Testing database connection...");

    // Test basic connection
    const result = await db.execute("SELECT NOW()");
    console.log("Database connected successfully");

    // Test schema existence
    const schemaCheck = await db.execute(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name = 'agendei'
    `);
    console.log("Schema check:", schemaCheck);

    // Test appointments table existence
    const tableCheck = await db.execute(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'agendei' AND table_name = 'appointments'
      ORDER BY ordinal_position
    `);
    console.log("Appointments table columns:", tableCheck);

    // Test if duration_minutes column exists
    const columnCheck = await db.execute(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'agendei' AND table_name = 'appointments' AND column_name = 'duration_minutes'
    `);
    console.log("Duration minutes column:", columnCheck);
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

testConnection();
