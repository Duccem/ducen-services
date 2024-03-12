[![Core CI](https://github.com/Duccem/ducen-health/actions/workflows/core.yml/badge.svg)](https://github.com/Duccem/ducen-health/actions/workflows/core.yml)
[![Hospital - API CI](https://github.com/Duccem/ducen-health/actions/workflows/backend.yml/badge.svg)](https://github.com/Duccem/ducen/actions/workflows/backend.yml)
[![Hospital - Web CI](https://github.com/Duccem/ducen-health/actions/workflows/frontend.yml/badge.svg)](https://github.com/Duccem/ducen/actions/workflows/backend.yml)
# Helsa

Version: 1.1.0

Author: José Véliz [(Duccem)](https://github.com/Duccem)

- [Helsa](#helsa)
  - [About](#about)
  - [Installation](#installation)
  - [Commands](#commands)
    - [Example](#example)
  - [Actions](#actions)
  - [Environments](#environments)
  - [Architecture](#architecture)
  - [Other links](#other-links)
  - [Contributing](#contributing)
  - [License](#license)

## About

This mono repository contains all of source code related to the project "Ducen", a project oriented to the team management and the career path,
each module of the repository represents a part of the principal team and the objective of that team.

## Installation

Ducen is a nodejs project, so you can install it with

```bash
$ npm install --save
```

## Commands

Some useful commands are the main run commands to stand up the services on local machine and docker containers,
the commands are compounds of elements that determinate what are you making  ```$ npm run ${script} -w ${package | app}```

### Example

```$ npm run start:local -w api```

## Actions

- start
- build
- test
- cov
- e2e

## Environments

- Local
- Docker
- Dev
- Prod

## Architecture

Ducen backend is a monorepo that contain various libs with code useful to run apps as rest api and sockets servers,
this architectures allow to some apps share code important to the domain of Ducen, the architecture have the follow structure.

The structure folder follow the DDD and Hexagonal architecture philosophy (Domain, Services/Application, Infrastructure/Adaptors).

- [apps/]() Apps of the different teams
  - [hospital/]() core team
    - [web/]() NextJS app
    - [api/]() NestJS app
    - [mobile/]() Expo app
- [contexts/]() 
  - [hospital/]() The hospital base code
  - [shared/]() Shared code between teams
    - [core/]() Core entities and modules code
    - [ui/]() UI library of all products of the management
  - [packages/]()
    - [eslint-config-duccem/]()
    - [tsconfig]()

## Other links

- [Changelog](https://github.com/Duccem/ducen-health/blob/main/CHANGELOG.md)

## Contributing

- [José Véliz (Duccem)](https://github.com/Duccem)

<a href="https://github.com/duccem/ducen-backend/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=duccem/ducen" />
</a>

## License

MIT
