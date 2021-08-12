
```javascript
// Transforma cada número multiplicando por 2
[1, 2, 3].map(n => n * 2);
// Filtra la comida carnívora
['🥝', '🥦', '🥩'].filter(n => n !== '🥩');
// Encuentra y devuelve la gallina
['🦖', '🦕', '🐔'].find(n => n === '🐔');
// Dime el índice de la gallina
['🦖', '🦕', '🐔'].findIndex(n => n === '🐔');
// ¡Rellena los elementos del Array con dinero
['', '', ''].fill('💰');
// ¿Todo está OK?
['✅', '❌', '✅', '✅'].every(n => n === '✅');
// ¿Hay algún error?
['✅', '❌', '✅', '✅'].some(n => n === '❌');
```