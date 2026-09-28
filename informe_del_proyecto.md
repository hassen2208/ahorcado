# Informe del Proceso y Evaluación de Madurez del Equipo

**Proyecto:** Desarrollo de la versión digital del juego "El Ahorcado"  
**Rol:** Documentador  

## 1. Proceso de Desarrollo y Evolución Técnica
El proyecto comenzó con la inicialización del repositorio a cargo de nuestro Líder del equipo, quien coordinó las tareas iniciales proponiendo una base de código generada por GitHub Copilot (un único archivo `index.html`). 

Sin embargo, tras analizar los requerimientos para que el computador asumiera el rol del otro jugador de forma óptima, el Programador principal propuso descartar la estructura básica inicial. En su lugar, se decidió migrar hacia una arquitectura más robusta y escalable dividida en un backend con Node.js y un frontend con React. 

Esta decisión fue respaldada e impulsada por el Diseñador de interfaz, quien aprovechó el ecosistema de React para crear la botonera y la interactividad de manera más fluida y basada en componentes. Finalmente, para asegurar la calidad del despliegue, el Tester probó el juego y reportó hallazgos, elevando el estándar del proyecto al incorporar tanto pruebas unitarias en el código como pruebas manuales de la dinámica del juego.

## 2. Aprendizajes del Proyecto
* **Adaptabilidad Técnica:** Comprendimos que los requerimientos iniciales pueden evolucionar; pasar de Vanilla JS a un stack de React/Node.js nos permitió tener un código más modular, mantenible y profesional.
* **Importancia del Testing Automático:** La integración de pruebas unitarias por parte del tester redujo significativamente el tiempo de depuración manual y brindó confianza en los despliegues.
* **Separación de Responsabilidades:** Aislar la lógica de selección de palabras y el control de la partida (el computador como jugador) en el backend de Node.js brindó mayor seguridad y limpieza a la interfaz de usuario.

## 3. Evaluación de Madurez del Equipo (Modelo de Tuckman)
Para evaluar de manera objetiva la dinámica del grupo, aplicamos el Cuestionario de Madurez del Equipo. A continuación, se presentan los resultados consolidados de los puntajes obtenidos en cada etapa:

* **Forming (Formación):** 28 puntos
* **Storming (Conflicto):** 19 puntos
* **Norming (Normalización):** 35 puntos
* **Performing (Desempeño):** 38 puntos

### Análisis de los Resultados y Evolución del Equipo:
De acuerdo con las reglas de interpretación del cuestionario, la puntuación más alta indica la etapa en la que el equipo opera normalmente. Dado que nuestro puntaje más alto fue de **38 en la etapa de Performing**, y este valor es superior a 32, representa un indicador fuerte de que el equipo se encuentra firmemente en esta etapa de alto rendimiento. Además, la metodología establece que si se califica alto en las fases Norming y Performing, la conclusión definitiva es que el equipo consolida su trabajo en la fase de Performing.

Esta evaluación cuantitativa refleja con precisión nuestra evolución durante el proyecto:

1. **Forming (28 puntos):** Este puntaje intermedio refleja la fase inicial donde el Líder del equipo propuso el repositorio con el código base inicial y se asignaron los roles.
2. **Storming (19 puntos):** Esta fue la puntuación más baja, lo cual indica que es la etapa a la que nuestro equipo se parece menos en este momento (un indicador fuerte de que no operamos bajo conflicto prolongado). El debate técnico sobre migrar de un archivo `index.html` a una arquitectura React/Node.js fue constructivo y se resolvió rápidamente por consenso.
3. **Norming (35 puntos):** Este alto puntaje refleja el momento en que el Diseñador de interfaz apoyó la decisión del Programador principal. El equipo estableció normas claras de trabajo y definió cómo interactuarían el frontend y el backend sin fricciones.
4. **Performing (38 puntos):** Como indicador fuerte de nuestra realidad operativa, esta etapa se evidenció cuando el equipo alcanzó un alto nivel de autonomía y eficiencia. El Tester pudo ejecutar pruebas unitarias de forma continua y la documentación se redactó fluidamente sobre un producto estable, demostrando que la colaboración evolucionó a una sinergia completa.