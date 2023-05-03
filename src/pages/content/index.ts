import approvePR from "./modules/approvePR";
import injectScript from "./modules/injectScript";

injectScript(
  chrome.runtime.getURL("fetchPRList.iife.js"),
  document.documentElement
);

const fetchPRListFromPage = async (): Promise<
  Array<{ title: string; issueNumber: string }>
> => {
  return new Promise((resolve) => {
    window.postMessage({ type: "FETCH_PR_LIST" }, window.location.origin);
    window.addEventListener("message", (event) => {
      if (
        event.source === window &&
        event.data.type === "FETCH_PR_LIST_RESULT"
      ) {
        resolve(event.data.prList);
      }
    });
  });
};

if (window.location.hostname === "github.com") {
  chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    if (request.message === "READY") {
      sendResponse({ code: 200, data: true });
      return true;
    }
    if (request.message === "GET_PR_LIST") {
      (async () => {
        if (request.message === "GET_PR_LIST") {
          const prList = await fetchPRListFromPage();
          sendResponse({ code: 200, data: prList });
        }
      })();
      return true;
    }
    if (request.message === "APPROVE_PR") {
      approvePR(request.data.issueNumber);
      chrome.runtime.sendMessage({ code: 200, message: "APPROVED" });
    }
    return true;
  });
}
