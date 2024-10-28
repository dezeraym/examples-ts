// Define the input structure for the schedule event function
interface ScheduleEventInput {
  eventName: string;
  userName: string;
}

// Define the output structure for the schedule event function
interface ScheduleEventOutput {
  message: string;
}

// Function to return a confirmation message for a scheduled event
export async function showFirstEvent(input: ScheduleEventInput): Promise<ScheduleEventOutput> {
  return { message: `Event "${input.eventName}" has been successfully scheduled for ${input.userName}.` };
}
