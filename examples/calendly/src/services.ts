import { showFirstEvent } from "./functions"; // Import only the relevant function
// import { calendlyService } from "@restackio/integrations-calendly"; // Import Calendly service integration
import { client } from "./client"; // Your client for interacting with the workflows

async function services() {
  const workflowsPath = require.resolve("./workflows/");

  try {
    await Promise.all([
      // Start service with current workflows and the `showFirstEvent` function
      client.startService({
        workflowsPath,
        functions: {
          showFirstEvent, // The only function needed for the workflow
        },
      }),

      //Start the Calendly service
      // calendlyService({ client }),
    ]);

    console.log("Services running successfully.");
  } catch (e) {
    console.error("Failed to run services", e);
  }
}

// Run the services with error handling
services().catch((err) => {
  console.error("Error running services:", err);
});
