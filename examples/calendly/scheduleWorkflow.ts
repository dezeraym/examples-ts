import { client } from "./src/client";

export type InputSchedule = {
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
};

async function scheduleWorkflow(input: InputSchedule) {
  try {
    const workflowId = `${Date.now()}-listScheduledEventsWorkflow`;

    const runId = await client.scheduleWorkflow({
      workflowName: "listScheduledEventsWorkflow",
      workflowId,
      input,
    });

    const result = await client.getWorkflowResult({ workflowId, runId });

    console.log("Workflow result:", result);

    process.exit(0);
  } catch (error) {
    console.error("Error scheduling workflow:", error);
    process.exit(1); 
  }
}

scheduleWorkflow({
  count: 5,
  user: "user@example.com",
  organization: "ExampleOrg",
  group: "Engineering",
  invitee_email: "invitee@example.com",
  max_start_time: "2024-12-31T23:59:59Z",
  min_start_time: "2024-01-01T00:00:00Z",
  sort: "start_time",
  status: "active",
});
