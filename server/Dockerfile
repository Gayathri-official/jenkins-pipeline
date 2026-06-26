# ===========================================================
# STAGE 1: BUILD STAGE — compiles the Spring Boot app into a JAR
# ===========================================================
FROM maven:3.9-eclipse-temurin-8 AS build

WORKDIR /app

ENV MAVEN_OPTS=""
ENV MAVEN_CONFIG=""

COPY pom.xml .

RUN mvn dependency:go-offline -B

COPY src ./src

RUN mvn clean package -DskipTests

# ===========================================================
# STAGE 2: RUNTIME STAGE — small final image to actually run the app
# ===========================================================
FROM eclipse-temurin:8-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
