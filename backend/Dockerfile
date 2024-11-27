# Use the JHipster base image
FROM jhipster/jhipster:latest

# Set the working directory inside the container
WORKDIR /app

# Add the application JAR file
COPY target/rental-car-0.0.3-SNAPSHOT.jar app.jar

# Expose the port the application runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]