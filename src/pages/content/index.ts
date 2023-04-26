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
  chrome.runtime.onMessage.addListener(async (request) => {
    if (request.message === "GET_PR_LIST") {
      const prList = await fetchPRListFromPage();
      chrome.runtime.sendMessage({
        code: 200,
        message: "PR_LIST",
        data: prList,
      });
      return true;
    }
    if (request.message === "APPROVE_PR") {
      await approvePR(request.data.issueNumber);
      chrome.runtime.sendMessage({ code: 200, message: "APPROVED" });
    }
    return true;
  });
}
