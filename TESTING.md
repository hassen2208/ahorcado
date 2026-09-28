# Resultados de Pruebas

## Descripción general

Se realizaron pruebas sobre el juego de Ahorcado con el objetivo de verificar el funcionamiento de sus principales funcionalidades, incluyendo el inicio de una partida, el ingreso de letras, el manejo de aciertos y errores, y la finalización de la partida.

## Resultados de las pruebas

| Prueba                              | Resultado       | Observaciones                                                                     |
| ----------------------------------- | --------------- | --------------------------------------------------------------------------------- |
| Iniciar una nueva partida           | Aprobada        | La partida inicia correctamente y selecciona una palabra.                         |
| Mostrar la palabra/letras ocultas   | Aprobada        | La palabra oculta y las letras adivinadas se muestran correctamente.              |
| Ingresar una letra correcta         | Aprobada        | Las letras acertadas se revelan correctamente.                                    |
| Ingresar una letra incorrecta       | Aprobada        | Los intentos incorrectos se registran correctamente.                              |
| Condición de victoria               | Aprobada        | El juego reconoce correctamente cuando se ha adivinado la palabra completa.       |
| Condición de derrota                | Aprobada        | El juego reconoce correctamente cuando se agotan los intentos disponibles.        |
| Reiniciar/iniciar una nueva partida | Aprobada        | Es posible iniciar una nueva partida correctamente.                               |
| Variedad de palabras                | Requiere mejora | La lista actual de palabras es limitada y sería conveniente agregar más palabras. |

## Hallazgos

El funcionamiento principal del juego de Ahorcado se comportó de manera correcta durante las pruebas realizadas. No se encontraron problemas funcionales en las mecánicas evaluadas.

El principal aspecto identificado para mejorar es la **cantidad de palabras disponibles**. La lista actual es limitada, lo que puede reducir la variedad y rejugabilidad del juego.

## Recomendación

Ampliar la lista de palabras disponibles. Como mejora adicional, las palabras podrían organizarse por categorías o niveles de dificultad para aumentar la variedad de las partidas.

## Resultado general

**Pruebas funcionales: Aprobadas**

**Aspecto identificado para mejora:** Ampliar la lista de palabras disponibles.
