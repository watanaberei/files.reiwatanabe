// Scripts at the bottom of HTML, before </body>
export const head = `
          <head>
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

            <link rel="stylesheet" href="/css/global/tokens.css">
            <link rel="stylesheet" href="/css/global/grid.css">
            <link rel="stylesheet" href="/css/type/global.css">

            <link rel="stylesheet" href="/css/container/container.css">

            <link rel="stylesheet" href="/css/card/cardAccount.css">
            <link rel="stylesheet" href="/css/card/cardProject.css">

            <link rel="stylesheet" href="/css/array/item.css">

            <link rel="stylesheet" href="/css/media/image.css">

            <link rel="stylesheet" href="/css/style.css">

            <link rel="apple-touch-icon" sizes="180x180" href="asset/favicon/apple-touch-icon.png?">
            <link rel="icon" type="image/png" sizes="32x32" href="asset/favicon/favicon-32x32.png?">
            <link rel="icon" type="image/png" sizes="16x16" href="asset/favicon/favicon-16x16.png?">
            <link rel="manifest" href="asset/favicon/site.webmanifest?">
            <link rel="mask-icon" href="asset/favicon/safari-pinned-tab.svg?" color="#5bbad5">
            <meta name="msapplication-TileColor" content="#da532c">
            <meta name="theme-color" content="#ffffff">
            <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">

            <script src="/function/view/viewport.js"></script>
            <script type="module" src="/function/loader/load.js"></script>

            <script type="text/javascript">
              function fullScreen(theURL) {
                window.open(theURL, '', 'fullscreen=yes, scrollbars=yes,location=yes,resizable=yes');
              }
            </script>
          </head>
`;




// Apply hero styles to the document
const headHTMLStyle = document.createElement("head");
attrTagStyle.textContent = head;
document.head.appendChild(attrTagStyle);