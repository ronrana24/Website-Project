// chrome.webRequest.onHeadersReceived.addListener(info => {
//     const headers = info.responseHeaders; // original headers
//     for (let i=headers.length-1; i>=0; --i) {
//         let header = headers[i].name.toLowerCase();
//         if (header === "content-security-policy") { // csp header is found
//             // modify frame-src here
//             headers[i].value = headers[i].value.replace("frame-src", "frame-src https://domain-you-want-to-iframe.com/");
//         }
//     }
//     // return modified headers
//     return {responseHeaders: headers};
// }, {
//     urls: [ "<all_urls>" ], // match all pages
//     types: [ "sub_frame" ] // for framing only
// }, ["blocking", "responseHeaders"]);