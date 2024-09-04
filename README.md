# CAP Project Calculator

## FIXME
* Bug quand on ouvre une pièce sans sablage et/ou peinture

## TODO
* Ajouter 15 minutes de CNC de plus pour chaque pièce pour le temps avant/après la gravure
* Ajouter un createdDate et updatedDate pour les projets et les pièces
* Ajouter des frais de design par projet (En heures)
* Afficher un résumé de la pièce dans le bas du dialogue

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


## Pour obtenir la liste des couleurs MTN 94 en JSON
1. Aller sur https://www.montanacolors.com/en/productos/mtn-94-aerosol-spray-paint/
2. Ouvrir un debugger et coller le code javascript plus bas
3. Un fichier JSOn devrait se télécharger
```javascript
// https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

// https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

var colors = [];

var items = document.getElementsByClassName('m-item_color');
Array.prototype.forEach.call(items, function(el) {
  if (el.style.backgroundColor) {
    var textContent = el.children[1].children[0].textContent.trim();

    var ids = textContent.match(/[A-Z]{0,2}-[0-9]{1,4}/g);
    colors.push({
      code: ids ? ids[0] : '-',
      title: textContent.replace(/[A-Z]{0,2}-[0-9]{1,4}/g, ""),
      color: rgb2hex(el.style.backgroundColor),
    })
  }
});

downloadObjectAsJson({colors}, 'colors');
```
