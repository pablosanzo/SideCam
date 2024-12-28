// Enable toggling the side panel on action click
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

// Handle extension icon clicks
chrome.action.onClicked.addListener(async (tab) => {
  const options = await chrome.sidePanel.getOptions({ tabId: tab.id });
  if (options?.enabled) {
    // If panel is enabled, close it
    await chrome.sidePanel.setOptions({
      tabId: tab.id,
      enabled: false
    });
  } else {
    // If panel is disabled, open it
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'webcam-settings',
    title: 'Webcam Extension Settings',
    contexts: ['action']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'webcam-settings') {
    chrome.runtime.openOptionsPage();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'webcamPermissionGranted') {
    // You can add additional logic here if needed when permissions are granted
    console.log('Webcam permissions updated');
  }
});
