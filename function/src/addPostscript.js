(() => {
    const styleSrc = document.createElement('style');
    styleSrc.textContent = `
        <meta charset="UTF-8">
        <title>rw</title>
        <script type="text/javascript" src="script.js"></script>
        <script type="module" src="/components/components.js"></script>

        <link rel="stylesheet" href="/css/screen/work.css">

        <link rel="stylesheet" href="/css/error/viewport.css">

        <link rel="stylesheet" href="/css/utility/tooltip.css">

        <link rel="stylesheet" href="/css/type/text.css">
        <link rel="stylesheet" href="/css/type/type.css">
        <link rel="stylesheet" href="/css/type/glyph.css">

        <link rel="stylesheet" href="/css/effector/array.css">
        <link rel="stylesheet" href="/css/effector/loader.css">

        <link rel="stylesheet" href="/css/global/tokens.css">
        <link rel="stylesheet" href="/css/global/grid.css">
        <link rel="stylesheet" href="/css/type/global.css">

        <link rel="stylesheet" href="/css/container/container.css">

        <link rel="stylesheet" href="/css/card/cardAccount.css">
        <link rel="stylesheet" href="/css/card/cardProject.css">

        <link rel="stylesheet" href="/css/array/item.css">

        <link rel="stylesheet" href="/css/media/image.css">

        <link rel="stylesheet" href="/css/style.css">
    `
    document.head.appendChild(style);

    // const styleSrc = document.createElement('style');
    const loaderScript = document.createElement('script');
    const viewportScript = document.createElement('script');

    loaderScript.src = '/function/loader/load.js';
    viewportScript.src = '/function/view/viewport.js';

    document.head.appendChild(styleSrc);
    document.head.appendChild(loaderScript);
    document.head.appendChild(viewportScript);

    loaderScript.async = true; // or script.defer = true;
    viewportScript.async = true;
})();