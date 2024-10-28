import { log, step } from "@restackio/ai/workflow";

// Define input structure for the workflow
interface ListEventsInput {
  count?: number;
  user?: string;
  organization?: string;
  group?: string;
  invitee_email?: string;
  max_start_time?: string;
  min_start_time?: string;
  page_token?: string;
  sort?: string;
  status?: string;
}

export async function listScheduledEventsWorkflow({
  count,
  user,
  organization,
  group,
  invitee_email,
  max_start_time,
  min_start_time,
  page_token,
  sort,
  status,
}: ListEventsInput) {
  // Fetch the scheduled events by calling the function in the integrations repo via the "calendly" task queue
  const calendlyOutput = await step({
    taskQueue: "calendly",  // Ensure this matches the queue for the integration
  }).listScheduledEvents({
    count,
    user,
    organization,
    group,
    invitee_email,
    max_start_time,
    min_start_time,
    page_token,
    sort,
    status,
  });

  const events = calendlyOutput ?? [];
  log.info("Fetched scheduled events", { events });

  // Proceed to use the fetched events as needed
  if (events.length >= 0) {
    const firstEventName = events[0].name;
    const userName = user || "User";

    const { message: scheduleMessage } = await step({
      taskQueue: "calendly",  // Call the scheduling function here as well if needed
    }).showFirstEvent({
      eventName: firstEventName,
      userName: userName,
    });

    log.info("Scheduled new event", { scheduleMessage });

    return {
      events,
      scheduleMessage,
    };
  }

  return {
    events,
    scheduleMessage: "No events to schedule a follow-up for.",
  };
}
