const BrowserInfo=(sessionKey)=>{
    
    const sessionData = typeof window !== "undefined"?JSON.parse(sessionStorage.getItem(sessionKey)):null;

    if (sessionData) {
    console.log('sessionData retrieved from sessionStorage:', sessionData);
    return sessionData;
    } else {
    console.log('No sessionData found in sessionStorage.');
    return null;
    }
}

export {
    BrowserInfo
}