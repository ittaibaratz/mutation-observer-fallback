
console.log('top script');

let rightCSS;

const observer = new MutationObserver((mutationList) => {
  mutationList.forEach((mutation) => {
    if (mutation.type === 'childList') {
      if (mutation.addedNodes?.length) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeName === 'LINK') {
            if (node.rel === 'preload' && node.as === 'style') {
              rightCSS = node.href;
              console.log(`The correct CSS is ${rightCSS}`);
            } else if (node.rel === 'stylesheet') {
              node.onerror = event => {
                if (rightCSS) {
                  console.log(`Error loading ${event.target.href}! Replacing with ${rightCSS}`);
                  event.target.href = rightCSS;
                }
              };
            }
          } else {
            //console.log('added node: ', node);
          }
        });
      }
    }
  });
});

console.log('observing');

observer.observe(document, {
  subtree: true,
  childList: true
});
