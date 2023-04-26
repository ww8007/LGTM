import "@pages/popup/Popup.css";
import { useEffect, useState } from "react";
import logo from "@assets/img/Logo.png";
const Popup = () => {
  const [prList, setPRList] = useState<PullRequestItem[]>([]);

  chrome.runtime.onMessage.addListener((res) => {
    if (res.message === "PR_LIST") {
      setPRList(res.data);
    }

    return true;
  });

  useEffect(() => {
    setTimeout(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { message: "GET_PR_LIST" });
      });
    }, 1000);
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
    <div className="App">
      <header>
        <img src={logo} width={120} className="App-logo" alt="logo" />
        <ul className="pr-list">
          {prList.map((pr) => (
            <button
              onClick={() => onClickApprovePR(pr.issueNumber)}
              className="pr-item"
              key={pr.issueNumber}
            >
              <div className="pr_flex_row">
                <img src={pr.avatarUrl} alt="" />
                <div className="pr-item__info__author">{pr.username}</div>
              </div>
              <div className="pr-item__info">
                <div className="pr-item__info__title">{pr.title}</div>
              </div>
            </button>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default Popup;
