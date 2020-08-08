[cookietouch](https://docs.cookietouch.com/)
============================================

CookieTouch API Documentation
=============================

||
|[Sommaire](/fr/)|[Sommaire détaillé](/fr/singlepage.html)|

* * * * *

Sommaire
--------

-   [BID](#bid)
    -   [startBuying](#bidstartbuying)
    -   [buyItem](#hdv-buy-item)
    -   [startSelling](#bidstartselling)
    -   [itemsInSaleCount](#biditemsInSaleCount)
    -   [getItemPrice](#hdv-get-item-price)
    -   [getItemsInSale](#bidgetitemsinsale)
    -   [sellItem](#hdv-sell-item)
    -   [editItemInSalePrice](#hdv-edit-item-in-sale-price)
    -   [removeItemsInSale](#hdv-remove-item-in-sale)

HDV
===

Toutes les fonctions relatives à l’hotel de vente.

Les lots peuvent etre egaux à 1, 10 ou 100.

* * * * *

bid.startBuying()
-----------------

Active l’achat dans l’hdv, doit etre executé avant d’acheter des items.

**Exemple:**

``` {.highlight}
yield * bid.startBuying(); // Active l'achat.
```

* * * * *

bid.buyItem(`gid`: [number](https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type), `lot`: [number](https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type))
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Permet d’acheter un lot d’item donné.

**Exemple:**

``` {.highlight}
yield * bid.startBuying(); // Active l'achat.
yield * bid.buyItem(423, 10); // Achète 10 Lin.
```

* * * * *

bid.getItemPrice(`gid`: [number](https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type), `lot`: [number](https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type))
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Return type: [number](https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type)

Retourne le prix d’un lot d’item en vente.

**Exemple:**

``` {.highlight}
const prixBle = await bid.getItemPrice(289, 100); // Retourne le prix du lot de 100 blé.
```

* * * * *

bid.startSelling()
------------------

Active la vente dans l’hotel de vente, doit etre executé avant toutes les fonctions ci-dessous.

**Exemple:**

``` {.highlight}
yield * bid.startSelling(); // Active la vente.
```

* * * * *

bid.itemsInSaleCount()
----------------------

-   Return type: [number](https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type)

Retourne le nombre d’items en vente.

**Exemple:**

``` {.highlight}
const itemsInSale = bid.itemsInSaleCount();
```

* * * * *

bid.getItemsInSale()
--------------------

-   Return type: [List\<{ gid: number; uid: number; lot: number; price: number }\>](http://flaviocorpa.com/linq.ts/docs/classes/list/index.html)

Retourne une liste de lots d’objets en vente et le prix du lot.

**Exemple:**

``` {.highlight}
for (const itemInSale of bid.getItemsInSale()) {
  const gid = itemInSale.gid;
  const uid = itemInSale.uid;
  const lot = itemInSale.lot;
  const price = itemInSale.price;
}
```

bid.sellItem(`gid`: [number](https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type), `lot`: [number](https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type), `price`: [number](https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type))
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Permet de vendre un lot d’un item donné à un prix donné.

**Exemple:**

``` {.highlight}
yield * bid.sellItem(289, 100, 200); // Vend 100 blé pour 200 kamas.
```

* * * * *

bid.editItemInSalePrice(`uid`: [number](https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type), `newPrice`: [number](https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type))
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Permet d’éditer le prix d’un item donné en vente.

**Exemple:**

``` {.highlight}
for (const itemInSale of bid.getItemsInSale()) {
  if (
    itemInSale.gid === 289 &&
    itemInSale.price <= 1000 &&
    itemInSale.lot <= 100
  ) {
    yield * bid.editItemInSalePrice(itemInSale.uid, 1200); // On augmente le prix des lots de 100 blé.
  }
}
```

*Le uid peut etre trouvé dans [getItemsInSale](#bidgetitemsinsale). Il est unique à chaque item (ou lot d’item).*

* * * * *

bid.removeItemInSale(`uid`: [number](https://developer.mozilla.org/fr-Fr/docs/Web/JavaScript/Data_structures#Number_type))
--------------------------------------------------------------------------------------------------------------------------

Retire un item donné de la vente.

**Exemple:**

``` {.highlight}
for (const itemInSale of bid.getItemsInSale()) {
  if (itemInSale.gid === 289) {
    yield * bid.removeItemInSale(itemInSale.uid); // On retire tous les lots de blé de la vente.
  }
}
```

*Le uid peut etre trouvé dans [getItemsInSale](#bidgetitemsinsale). Il est unique à chaque item (ou lot d’item).*
