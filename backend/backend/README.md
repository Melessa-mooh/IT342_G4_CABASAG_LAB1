# backend

This is the backend service for the miniapp project.

Quick commands:

Build (skip tests):

```bash
./mvnw -DskipTests package
```

Run:

```bash
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

Notes:

- This repository targets Java 11. If you have a different JDK installed, either install JDK 11 or update `pom.xml` accordingly.
- Database configuration is in `src/main/resources/application.properties`.
