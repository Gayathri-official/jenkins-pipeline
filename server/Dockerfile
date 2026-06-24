
# ===========================================================
# STAGE 1: BUILD STAGE — compiles the Spring Boot app into a JAR
# ===========================================================
FROM maven:3.9-eclipse-temurin-8 AS build
# Base image already has Maven + Java 8 (JDK) installed.
# "AS build" names this stage so we can reference it later.
 
WORKDIR /app
# All following commands run inside /app folder inside the container.
 
ENV MAVEN_OPTS=""
ENV MAVEN_CONFIG=""
# The base maven image ships with a MAVEN_OPTS env variable that
# conflicts with mvnw's argument parsing (caused the
# "Unknown lifecycle phase /root/.m2" error). Clearing it fixes that.
 
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
# Copy ONLY the wrapper + pom.xml first (not the source code yet).
# This is a caching trick: if pom.xml doesn't change between builds,
# Docker reuses this layer instead of re-downloading dependencies.
 
RUN sed -i 's/\r$//' mvnw && chmod +x mvnw
# mvnw is a shell script written for Linux/Mac.
# Since the project was cloned/edited on Windows, it has CRLF
# line endings (\r\n) which break shell scripts in Linux containers.
# sed removes the trailing \r characters (CRLF -> LF), then
# chmod +x makes the script executable.
 
COPY src ./src
# NOW copy the actual Java source code (controllers, entities, etc.)
 
RUN mvn clean package -DskipTests
# Build the project into a runnable JAR file (target/*.jar).
# We use the pre-installed "mvn" binary directly (not ./mvnw) because
# maven is already present in this base image — this avoids the
# wrapper's env-variable parsing bug entirely.
# -DskipTests skips running unit tests, for a faster build.
 
# ===========================================================
# STAGE 2: RUNTIME STAGE — small final image to actually run the app
# ===========================================================
FROM eclipse-temurin:8-jre
# Much smaller image — only Java RUNTIME (JRE), no Maven, no source code,
# no build tools. This keeps the final image lightweight.
 
WORKDIR /app
 
COPY --from=build /app/target/*.jar app.jar
# Copy ONLY the compiled jar file from the "build" stage above.
# Everything else from stage 1 (Maven, source, .m2 cache) is discarded.
 
EXPOSE 8080
# Documents that this container listens on port 8080 (Spring Boot default).
 
ENTRYPOINT ["java", "-jar", "app.jar"]
# The command that runs when the container starts.