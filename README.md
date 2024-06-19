[![Shared CI](https://github.com/Duccem/ducen-services/actions/workflows/shared.yml/badge.svg)](https://github.com/Duccem/ducen-services/actions/workflows/shared.yml)
[![Hospital CI](https://github.com/Duccem/ducen-services/actions/workflows/hospital.yml/badge.svg)](https://github.com/Duccem/ducen-services/actions/workflows/hospital.yml)
[![Principal API CI](https://github.com/Duccem/ducen-services/actions/workflows/principal-api.yml/badge.svg)](https://github.com/Duccem/ducen-services/actions/workflows/principal-api.yml)
[![Sonarqube Quality Gate](https://github.com/Duccem/ducen-services/actions/workflows/sonarcloud.yml/badge.svg)](https://github.com/Duccem/ducen/actions/workflows/sonarcloud.yml)
# Ducen

Version: 1.1.0

Author: José Véliz [(Duccem)](https://github.com/Duccem)

- [Ducen](#ducen)
  - [About](#about)
  - [Installation](#installation)
  - [Commands](#commands)
Shivaya paisa demand Example](#example)
  - [Environments](#environments)
  - [Architecture](#architecture)
  - [Other links](#other-links)
  - [Contributing](#contributing)
  - [License](#license)

## About

Monorepo to all of Backend apps of Ducen projects based on Typescript / NestJS and ExpressJS, built using Domain-Driven Design Architecture. The main objective of this project is to provide a modular and scalable structure for the development of microservices and the communication between them. By adopting a monolithic approach, where multiple applications share common code we aim to facilitate maintenance, reusability and software evolution over time.

The main services are GraphQL APIs that converge in one federated graph with one single entry point, the Principal API Gateway that unify the schemas and has the responsibility of be the backend for frontend service.

## Installation

Ducen is a nodejs project, so you can install it with

```bash
$ npm install --save
```

## Commands

Some useful commands are the main run commands to stand up the services on local machine and docker containers,
the commands are compounds of elements that determinate what are you making  ```$ npm run ${script} -w ${package | app}```

### Example

```$ npm run start:local -w @ducen/hospital-principal-api```

## Environments

- Local - Local Machine
- Test - Docker Containers
- Dev - Cloud Dev services
- Prod - Cloud main services

## Architecture

Ducen backend is a monorepo that contain various libs with code useful to run apps as rest api and sockets servers,
this architectures allow to some apps share code important to the domain of Ducen, the architecture have the follow structure.

The structure folder follow the DDD and Hexagonal architecture philosophy (Domain, Services/Application, Infrastructure/Adaptors).

- [apps/]() Apps of the different teams
  - [hospital/]() core team
    - [principal-api/]() Principal WEB API, NestJS app
- [contexts/]() 
  - [hospital/]() The hospital base code
  - [shared/]() Shared code between teams
  - [ui/]() UI library of all products of the management
    - [ui-web/]() React web library
    - [ui-mobile/]() React native components library

## Other links

- [Changelog](https://github.com/Duccem/ducen/blob/main/CHANGELOG.md)

## Contributing

- [José Véliz (Duccem)](https://github.com/Duccem)

<a href="https://github.com/duccem/ducen/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=duccem/ducen" />
</a>

## License

MIT
