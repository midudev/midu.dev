---
title: Migrando de Travis CI a Github Actions proyectos con Node
date: '2020-11-14'
description: >-
  Con el cambio de prestaciones de Travis para repositorios de código abierto en
  GitHub, el paso más lógico parece migrar a GitHub Actions. En este artículo te
  cuento cómo hacerlo paso a paso con proyectos de Node.js.
topic: github-actions
tags:
  - github-actions
image: /images/og/migrando-travis-github-actions-proyectos-node.png
---

Hace unas semanas [Travis ha cambiado su _pricing model_](https://blog.travis-ci.com/2020-11-02-travis-ci-new-billing) para todos sus usuarios. Estos cambios **buscan hacer la empresa más rentable** y, por lo tanto, viene a impactar negativamente a sus usuarios, especialmente, aquellos que no pagaban para hacer uso de sus servicios en sus repositorios de código abierto.

Esto se traduce que _builds_ que antes se iniciaban inmediatamente **ahora pasan a tardar de 30 minutos a 1 hora en encontrar una máquina libre para iniciar el proceso.** Esto puede no ser un problema para algunos proyectos pero, en mi caso, siempre me gusta ver cuanto antes que el proceso de integración ha ido bien para seguir tranquilo a hacer otras cosas.

Como mis proyectossssss

### Introducción

Esta guía te ayudará a **migrar de Travis CI a GitHub Actions.** En ella se comparan los conceptos y sintaxis de ambos, describe las similitudes y muestra sus diferentes enfoques para tareas comunes.

### Antes de empezar

Antes de empezar tu migración a GitHub Actions es muy útil que tengas claro cómo funciona:

- Para un ejemplo rápido de cómo funciona un trabajo en GitHub Actions, revisa "[Quickstart for GitHub Actions](/actions/quickstart)".
- Para aprender lo esencial sobre los conceptos de GitHub Actions, revisa "[Introducción a GitHub Actions](/actions/learn-github-actions/introduction-to-github-actions)".

### Comparando ejecución de trabajos

Para controlar cuando las tareas de CI se ejecutan, un _flujo de trabajo_ de GitHub Actions usa _trabajos_ para ejecutarse en paralelo por defecto. Cada trabajo contiene _pasos_ que son ejecutados de forma secuencial en el orden que defines. Si necesitas ejecutar acciones de preparación o limpieza para un trabajo, puedes definir los pasos en cada uno para realizarlos.

### Similitudes clave

GitHub Actions y Travis CI comparten ciertas similitudes y comprenderlas antes de tiempo puede ayudarte a hacer las cosas más fáciles con el proceso de migración.

#### Usando la sintaxis YAML

Travis CI y GitHub Actions usan YAML para crear los trabajos y flujos de trabajo. Estos archivos son guardados en el repositorio de código. Para más información sobre cómo GitHub Actions usa YAML, puedes ver "[Crea un flujo de trabajo de ejemplo](/actions/learn-github-actions/introduction-to-github-actions#create-an-example-workflow)".

#### Variables de entorno personalizadas

Travis CI te permite definir variables de entorno y compartirlas entre fases. De forma similar, GitHub Actions te permite definir variables de entorno a nivel de trabajo, paso o flujo de trabajo. Para más información puedes ver "[Variables de entorno](/actions/reference/environment-variables)".

#### Variables de entorno por defecto

Travis CI y GitHub Actions incluyen ambos algunas variables de entorno por defecto que puedes usar en tus archivos YAML. Para GitHub Actions, puedes ver la lista completa en "[Variables de entorno por defecto](/actions/reference/environment-variables#default-environment-variables)".

#### Procesando trabajos en paralelo

Travis CI puede usar `stages` (fases) para ejecutar trabajos en paralelo. De forma similar, GitHub Actions ejecuta los trabajos (`jobs`) en paralelo. Para más información puedes leer "[Creando trabajos dependientes](/actions/learn-github-actions/managing-complex-workflows#creating-dependent-jobs)".

#### Insignias de estado

Travis CI y GitHub Actions soportan ambos insignias de estado que te permite indicar si flujo de trabajo ha sido un éxito o está fallando. Para más información, lee ["Añadiendo una insignia de estado de tu flujo de trabajo en tu repositorio"](/actions/managing-workflow-runs/adding-a-workflow-status-badge)".

#### Usando una matriz de construcción

Travis CI y GitHub Actions soportan ambos matrices de construcción, permitiéndote realizar pruebas usando diferentes combinaciones de sistemas operativos y paquetes de software. Tienes más información en "[Usando matrices de construcción](/actions/learn-github-actions/managing-complex-workflows#using-a-build-matrix)".

Debajo tienes un ejemplo comparando la sintaxis de cada sistema:

<table>
<tr>
<th>
Travis CI
</th>
<th>
GitHub Actions
</th>
</tr>
<tr>
<td class="d-table-cell v-align-top">

```yaml
matrix:
  include:
  - rvm: 2.5
  - rvm: 2.6.3
```

</td>
<td class="d-table-cell v-align-top">

```yaml
jobs:
  build:
    strategy:
      matrix:
        ruby: [2.5, 2.6.3]
```

</td>
</tr>
</table>

#### Focalizarse en ramas específicas

Travis CI y GitHub Actions permiten ejecutar tu CI en una rama específica. Para más información, ver "[Sintaxis de flujos de trabajo para GitHub Actions](/actions/reference/workflow-syntax-for-github-actions#onpushpull_requestbranchestags)".

Debajo puedes encontrar un ejemplo para cada sistema:

<table>
<tr>
<th>
Travis CI
</th>
<th>
GitHub Actions
</th>
</tr>
<tr>
<td class="d-table-cell v-align-top">

```yaml
branches:
  only:
  - main
  - 'mona/octocat'
```

</td>
<td class="d-table-cell v-align-top">

```yaml
on:
  push:
    branches:    
      - main
      - 'mona/octocat'
```

</td>
</tr>
</table>

#### Comprobando submódulos

Travis CI y GitHub Actions permiten controlar si los submódulos deben ser incluidos al clonar un repositorio.

Debajo puedes encontrar un ejemplo para cada sistema:

<table>
<tr>
<th>
Travis CI
</th>
<th>
GitHub Actions
</th>
</tr>
<tr>
<td class="d-table-cell v-align-top">

```yaml
git:
  submodules: false
```

</td>
<td class="d-table-cell v-align-top">

```yaml
    - uses: actions/checkout@v2
      with:
        submodules: false
```

</td>
</tr>
</table>

### Características clave GitHub Actions

Cuando realices la migración desde Travis CI, considera las siguientes características clave en GitHub Actions:

#### Almacenando secretos

GitHub Actions te permite almacenar secretos y usarlos en tus trabajos. GitHub Actions además incluye políticas que te permiten limitar el acceso a secretos a nivel de repositorio y organización. Para más información revisa "[Secretos encriptados](/actions/reference/encrypted-secrets)".

#### Compartiendo archivos entre trabajos y flujos de trabajo

GitHub Actions tiene integrado el soporte para el almacenaje de artefactos, permitiéndote compartir archivos entre trabajos y flujos de trabajos. Puedes también guardar los archivos resultantes y compartirlo entre diferentes flujos de trabajo. Para más información puedes ver "[Compartir información entre trabajos](/actions/learn-github-actions/essential-features-of-github-actions#sharing-data-between-jobs)".

#### Hospedando tus propios ejecutores

Si tu trabajo requiere un hardware o software específico, GitHub Actions te permite hospedar tu propio ejecutor y enviar tus trabajos allí para ser procesadores. GitHub Actions también permite usar políticas para controlar cómo estos ejecutores son accedidos, otorgando acceso a nivel de organización o repositorio. Para más información, leer "[Hospedando tus propios ejecutores"](/actions/hosting-your-own-runners)".

#### Trabajos concurrentes y tiempo de ejecución

Los trabajos concurrentes y los tiempos de ejecución de los flujos de trabajo en GitHub Actions puede variar dependiendo de tu plan {% data variables.product.company_short %}. Para más información, leer "[Límites de uso, facturación y administración](/actions/reference/usage-limits-billing-and-administration)".

#### Usando diferentes lenguajes en GitHub Actions

Cuando trabajas con diferentes lenguajes en GitHub Actions, puedes crear un paso en tu trabajo para preparar las dependencias de tu lenguaje. Para más información sobre trabajar con un lenguaje en particular puedes revisar su guía específica:
  - [Construir y testear Node.js](/actions/guides/building-and-testing-nodejs)
  - [Construir y testear PowerShell](/actions/guides/building-and-testing-powershell)
  - [Construir y testear Python](/actions/guides/building-and-testing-python)
  - [Construir y testear Java con Maven](/actions/guides/building-and-testing-java-with-maven)
  - [Construir y testear Java con Gradle](/actions/guides/building-and-testing-java-with-gradle)
  - [Construir y testear Java con Ant](/actions/guides/building-and-testing-java-with-ant)

### Ejecutando scripts

GitHub Actions puede usar el paso `run` para ejecutar scripts o comandos del intérprete de comandos. Para usar un shell en particular, puedes especificar el tipo `shell` cuando proporciones una ruta para el script. Para más información, ver "[Sintaxis de flujos de trabajo para GitHub Actions](/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepsrun)".

Por ejemplo:

```yaml
      steps:
        - name: Ejecutar script de build
          run: ./.github/scripts/build.sh
          shell: bash
```

### Manejo de errores en GitHub Actions 

Al migrar a GitHub Actions, hay diferentes formas de manejar los errores que  deberías conocer.

#### Manejo de error de script

GitHub Actions detiene inmediatamente un trabajo si uno de sus pasos devuelve un código de error. Para más información, ver "[Sintaxis del flujo de trabajo GitHub Actions](/actions/reference/workflow-syntax-for-github-actions#exit-codes-and-error-action-preference)".

#### Manejo de error de trabajo

GitHub Actions usa condicionales `if` para ejecutar trabajos o pasos en ciertas situaciones. Por ejemplo, puedes ejecutar un paso cuando otro paso ha resultado en un `failure()`. Para más información, ver "[Ejemplo usando funciones de verificación de estado GitHub Actions](/actions/reference/workflow-syntax-for-github-actions#example-using-status-check-functions)". También puedes usar [`continue-on-error`](/actions/reference/workflow-syntax-for-github-actions#jobsjob_idcontinue-on-error) para evitar que el flujo de trabajo se pare cuando un trabajo falle.

### Migrando sintaxis para condicionales y expresiones

Para ejecutar trabajos bajo expresiones condicionales, Travis CI y GitHub Actions comparten una sintaxis de condición `if` similar. GitHub Actions te permite usar el condicional `if` para evitar un trabajo o paso de ejecutarse a no ser que la condición se cumpla. Para más información, ver "[Contexto y sintaxis de expresión para GitHub Actions](/actions/reference/context-and-expression-syntax-for-github-actions)".

Este ejemplo demuestra como puedes usar el condicional `if` para controlar si un paso debe ser ejecutado:

```yaml
jobs:
  conditional:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Este paso ejecuta cuando str es igual a 'ABC' y num a 123"
        if: env.str == 'ABC' && env.num == 123
```

### Migrando de fases a pasos

Donde Travis CI usa _phases_ para ejecutar _steps_, GitHub Actions tiene _steps_ que ejecuta _actions_. Puedes encontrar acciones preconstruidas en [{% data variables.product.prodname_marketplace %}](https://github.com/marketplace?type=actions) o puedes crear tus propias acciones. Para más información, ver "[Construyendo acciones](/actions/building-actions)".

Debajo puedes encontrar un ejemplo para cada sistema:

<table align='center'>
<tr>
<th>
Travis CI
</th>
<th>
GitHub Actions
</th>
</tr>
<tr>
<td class="d-table-cell v-align-top">

```yaml
language: python
python:
  - "3.7"

script:
  - python script.py
```

</td>
<td class="d-table-cell v-align-top">

```yaml
jobs:
  run_python:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/setup-python@v2
      with:
        python-version: '3.7'
        architecture: 'x64'
    - run: python script.py
```

</td>
</tr>
</table>

### Guardando en la caché dependencias

Travis CI y GitHub Actions te permiten manualmente guardar dependencias en la caché para ser usadas más tarde.Este ejemplo te muestra la sintaxis para los dos sistemas: 

<table>
<tr>
<th>
Travis CI
</th>
<th>
GitHub Actions
</th>
</tr>
<tr>
<td class="d-table-cell v-align-top">

```yaml
language: node_js
cache: npm
```

</td>
<td class="d-table-cell v-align-top">

```yaml
- name: Cache node modules
  uses: actions/cache@v2
  with:
    path: ~/.npm
    key: v1-npm-deps-${{ hashFiles('**/package-lock.json') }}
    restore-keys: v1-npm-deps-
```

</td>
</tr>
</table>

Para más información, ver "[Usando la caché de las dependencias para acelerar los flujos de trabajo](/actions/guides/caching-dependencies-to-speed-up-workflows)".

### Ejemplos de tareas comunes

Esta sección compara como GitHub Actions y Travis CI realizan tareas comunes.

#### Configurando variables de environment

Puedes crear variables de entorno personalizadas en un trabajo de GitHub Actions. Por ejemplo:

<table align='center'>
<tr>
<th>
Travis CI
</th>
<th>
GitHub Actions Workflow
</th>
</tr>
<tr>
<td>

  ```yaml
env:
  - MAVEN_PATH="/usr/local/maven"
  ```

</td>
<td>

  ```yaml
 jobs:
    maven-build:
      env:
        MAVEN_PATH: '/usr/local/maven'
  ```

</td>
</tr>
</table>

#### Construyendo con Node.js

<table align='center'>
<tr>
<th>
Travis CI
</th>
<th>
GitHub Actions Workflow
</th>
</tr>
<tr>
<td>

```yaml
install:
    - npm install
script:
    - npm run build
    - npm test
```

</td>
<td>

```yaml
name: Node.js CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js
      uses: actions/setup-node@v1
      with:
        node-version: '12.x'
    - run: npm install
    - run: npm run build
    - run: npm test
```

</td>
</tr>
</table>


### Próximos pasos

Para continuar aprendiendo sobre las características principales de GitHub Actions, puedes ver "[Aprende GitHub Actions](/actions/learn-github-actions)".
