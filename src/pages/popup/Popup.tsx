import { useEffect, useState } from "react";
import logo from "@assets/img/Logo.png";
import { appStyles } from "./styles/popup.css";
const Popup = () => {
  const [prList, setPRList] = useState<PullRequestItem[]>([]);

  const checkIfReceiverIsReady = (
    tabId: number,
    callback: (isReady: boolean) => void
  ) => {
    chrome.tabs.sendMessage(tabId, { message: "READY" }, (response) => {
      if (chrome.runtime.lastError) {
        setTimeout(() => checkIfReceiverIsReady(tabId, callback), 1000);
      } else {
        callback(response.data);
      }
    });
  };

  const getPRList = (
    tabId: number,
    callback: (data: PullRequestItem[]) => void
  ) => {
    chrome.tabs.sendMessage(tabId, { message: "GET_PR_LIST" }, (response) => {
      if (chrome.runtime.lastError) {
        setTimeout(() => getPRList(tabId, callback), 1000);
      } else {
        callback(response.data);
      }
    });
  };

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      checkIfReceiverIsReady(tabs[0].id, (isReady) => {
        if (isReady) {
          getPRList(tabs[0].id, (data) => {
            setPRList(data);
          });
        } else {
          console.error("Error: Receiving end does not exist");
        }
      });
    });
  }, []);

  const onClickApprovePR = (issueNumber: string) => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        message: "APPROVE_PR",
        data: { issueNumber },
      });
    });
  };

  return (
    <div className={appStyles.app}>
      <header>
        <img src={logo} width={120} alt="logo" />
        <ul className={appStyles.prList}>
          {prList.map((pr) => (
            <button
              onClick={() => onClickApprovePR(pr.issueNumber)}
              className={appStyles.prItem}
              key={pr.issueNumber}
            >
              <div className={appStyles.prFlexRow}>
                <img
                  className={appStyles.userProfile}
                  src={pr.avatarUrl}
                  alt="git profile image"
                />
                <span className={appStyles.prItemInfoAuthor}>
                  {pr.username}
                </span>
              </div>
              <div className={appStyles.prItemInfo}>
                <div className={appStyles.prItemInfoTitle}>{pr.title}</div>
              </div>
            </button>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default Popup;
