[cookietouch](https://docs.cookietouch.com/)
============================================

CookieTouch API Documentation
=============================

  ------------------ ------------------------------------------
  [Sommaire](/fr/)   [Sommaire détaillé](/fr/singlepage.html)
  ------------------ ------------------------------------------

* * * * *

Sommaire
--------

Voici la structure d’un script:

-   [Configuration](#configuration)
-   [Variables](#variables)
-   [Fonctions](#fonctions)
-   [Corps](#corps)

Configuration
-------------

Cette partie est placée, généralement, en entếte et donne la
configuration de votre script.

``` {.highlight}
const config = {
  MAX_PODS: 90,
  OPEN_BAGS: false,
  AUTO_DELETE: [],
  MIN_MONSTERS: 1,
  MAX_MONSTERS: 8,
  FORBIDDEN_MONSTERS: [],
  MANDATORY_MONSTERS: []
};
```

Cette configuration définie ce que le bot déposera en banque, ce qu’il
récoltera, ce qu’il supprimera, quel monstre il combattra. Bien entendu
il y a bien d’autres options: [Configuration](/fr/configuration.html)

* * * * *

Variables
---------

Les variables sont définies par le mot `const`{.highlighter-rouge} ou
`let`{.highlighter-rouge}. Les variables comme la config, le move ou le
bank sont modifiables tout au long de votre script. Cependant, pour
autoriser la modification, vous devez les appeller
`let`{.highlighter-rouge}.

``` {.highlight}
const config = {}; // Non modifiable
let config = {}; // Modifiable plus loin dans le script
```

Ce principe s’applique à toutes les variables utilisées dans un script.

* * * * *

Fonctions
---------

Les fonctions sont utilisées pour combiner des actions dans une même
sequence. Elle doit toujours être precedée de
`async function*`{.highlighter-rouge}.

``` {.highlight}
async function* potionRappel() {
  yield* inventory.use(548);
}
```

* * * * *

Corps
-----

Le corps se compose, pour les cas simples, de votre move et de votre
bank. Ces deux variables servent a faire déplacer votre personnage, lui
dire de combattre, de récolter ou d’effectuer une fonction (comme
l’exemple précédent).

``` {.highlight}
const move = [
  { map: "-5,6", gather: true, fight: true, custom: potionRappel, path: "top" },
  { map: "-6,6", gather: true, path: "top" },
  { map: 88081177, path: "510" } // Sert a ressortir de la banque lorsque vide.
];
```

Dans cet exemple, une fois sur la map -5,6 votre bot effectuera sa
fonction “potionRappel”, il recoltera la ressource provenant de la
config, combattra les monstres provenant de la config. Par la suite, il
changera de map vers celle du haut ! Il enchainera ensuite l’autre et
ainsi de suite.

``` {.highlight}
const bank = [
  { map: "-5,6", path: "top" },
  { map: "-6,6", path: "right" },
  { map: 60422201, door: 201 }, //Porte pour entrer la banque
  { map: 88081177, npcBank: true } //Une fois a l'interieur, parle au banquier et se vide.
];
```

C’est le même principe, mais ce trajet sera effectué lorsqu’il sera full
pods défini par la config, encore une fois.

Les possibilités de déplacements dans le move et le bank sont : door,
path. Lors d’un changement de map, vous utilisez un path. Le path
necessite toujours des guillemets et la direction.

``` {.highlight}
const move = [
  { map: "0,1", path: "top" },
  { map: "0,0", path: "right" },
  { map: "1,0", path: "bottom" },
  { map: "1,1", path: "left" }
];
```

Le path sert aussi pour à utiliser un soleil. (pour sortir d’une banque
par exemple)

``` {.highlight}
const move = [{ map: "1,1", path: "506" }];
```

Il sert aussi a sortir d’une map via un céllule précise.

``` {.highlight}
const move = [{ map: "1,1", path: "bottom(507)" }];
```

Lorsque vous utilisez une porte pour entrer dans la banque par exemple,
vous mettez door: ID. Vous ne devez pas mettre de guillemets !

``` {.highlight}
const move = [{ map: "1,1", door: 510 }];
```

Pour finir, il suffit de sauvegarder tout ce script dans un fichier avec
l’extension .js

Exemple du script complet :

``` {.highlight}
const config = {
  MAX_PODS: 90,
  OPEN_BAGS: false,
  AUTO_DELETE: [],
  MIN_MONSTERS: 1,
  MAX_MONSTERS: 8,
  FORBIDDEN_MONSTERS: [],
  MANDATORY_MONSTERS: []
};

async function* potionRappel() {
  yield* inventory.use(548);
}

const move = [
  { map: "-5,6", gather: true, fight: true, custom: potionRappel, path: "top" },
  { map: "-6,6", gather: true, path: "top" },
  { map: 88081177, path: "510" } // Sert a ressortir de la banque lorsque vide.
];

const bank = [
  { map: "-5,6", path: "top" },
  { map: "-6,6", path: "right" },
  { map: 60422201, door: 201 }, // Porte pour entrer la banque
  { map: 88081177, npcBank: true } // Une fois a l'interieur, parle au banquier et se vide.
];
```

Pour qu’un trajet soit fonctionnel et répétitif, il est nécessaire de le
boucler. Lorsqu’il se termine sous forme de boucle, il le fera sans
arrêter puisqu’il est dans un circuit fermé.

* * * * *
