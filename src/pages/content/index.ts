import approvePR from "./modules/approvePR";

console.log("content loaded");

/**
 * @description
 * Chrome extensions don't support modules in content scripts.
 */
import("./components/Demo");

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "approvePR") {
    await approvePR();
  }
});
