/* eslint-disable @typescript-eslint/no-unused-vars */
interface Window {
  fetchPRList: () => Promise<Array<{ title: string; issueNumber: string }>>;
}

(async () => {
  const fetchPRList = async () => {
    const prList = [];
    const prNodes = document.querySelectorAll(".js-issue-row");

    prNodes.forEach((prNode) => {
      const titleNode = prNode.querySelector(".js-navigation-open");
      const title = titleNode.textContent.trim();
      const issueNumber = prNode.getAttribute("id").replace("issue_", "");

      const authorNode = prNode.querySelector(".opened-by > a");
      const username = authorNode.textContent.trim();

      const avatarNode = prNode.querySelector(".avatar-user > img");
      const avatarUrl = avatarNode.getAttribute("src");

      prList.push({
        title,
        issueNumber,
        username,
        avatarUrl,
      });
    });

    return prList;
  };

  window.fetchPRList = fetchPRList;
  window.addEventListener("message", async (event) => {
    if (event.source === window && event.data.type === "FETCH_PR_LIST") {
      const prList = await fetchPRList();

      window.fetchPRList = fetchPRList;
      window.postMessage(
        { type: "FETCH_PR_LIST_RESULT", prList },
        window.location.origin
      );
    }
  });
})();
