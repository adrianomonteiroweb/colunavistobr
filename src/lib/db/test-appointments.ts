import { AppointmentRepository } from "./src/repositories/AppointmentRepository";

async function testAppointments() {
  try {
    console.log("Testing appointment queries...");

    // Test the specific method that was failing
    const appointments = await AppointmentRepository.findByProfessionalId(1);
    console.log("Found appointments:", appointments.length);
    console.log("First appointment:", appointments[0]);
  } catch (error) {
    console.error("Appointment query error:", error);
  }
}

testAppointments();
