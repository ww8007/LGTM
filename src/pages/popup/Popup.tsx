import "@pages/popup/Popup.css";

const Popup = () => {
  const onClickApprove = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "approvePR" });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={onClickApprove}>Approve</button>
      </header>
    </div>
  );
};

export default Popup;
