(() => {
    // const styleSrc = document.createElement('style');
    const loaderScript = document.createElement('script');
    const viewportScript = document.createElement('script');

    loaderScript.src = '/function/loader/load.js';
    viewportScript.src = '/function/view/viewport.js';

    document.head.appendChild(loaderScript);
    document.head.appendChild(viewportScript);

    loaderScript.async = true; // or script.defer = true;
    viewportScript.async = true;
})();