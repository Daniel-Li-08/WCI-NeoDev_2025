console.log("opened")

const getKey = async (key) => {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs[0]; 

    // Execute script in the current tab
    const fromPageLocalStore = await chrome.scripting.executeScript({ 
      target: { tabId: tab.id }, 
      function: (key) => localStorage[key], 
      args : [ key],
    });
    return fromPageLocalStore[0].result;
}


const loadnames = async () => {
        // Store the result  
        nm = await getKey("name");
        pw = await getKey("pw");
        prime = await getKey("prime");

    if (nm == null || pw == null || prime == null){
        
        nm = await localStorage.getItem("name");
        pw = await localStorage.getItem("pw");
        prime = await localStorage.getItem("prime");

        if (nm == null || pw == null || prime == null){
            // Move to other page if not currently on our site
            chrome.tabs.create({ url: "https://wci-neo-dev-2025.vercel.app/login"});
            return
        }
    } else {

        localStorage.setItem("name",nm)
        localStorage.setItem("pw",pw)
        localStorage.setItem("prime",prime)
    }

    if (prime == "true"){
        window.location = chrome.runtime.getURL("./adder/adder.html")
    } else {
        window.location = chrome.runtime.getURL("./scraper/scraper.html")
    }

}


loadnames()