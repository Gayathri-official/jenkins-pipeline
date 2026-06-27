
pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/master']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/Gayathri-official/jenkins-pipeline.git'
                    ]],
                    extensions: [[$class: 'CleanBeforeCheckout']]
                ])
            }
        }

        stage('Install Docker Compose') {
            steps {
                sh '''
                    if ! [ -x "$(command -v docker-compose)" ]; then
                        curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" \
                          -o /usr/local/bin/docker-compose
                        chmod +x /usr/local/bin/docker-compose
                    fi
                    docker-compose --version
                '''
            }
        }

        stage('Unit Test - Server') {
            steps {
                sh '''
                    docker run --rm \
                      -v $(pwd)/server:/app \
                      -w /app \
                      maven:3.9-eclipse-temurin-8 \
                      mvn test
                '''
            }
            post {
                always {
                    junit 'server/target/surefire-reports/*.xml'
                }
            }
        }

        stage('Unit Test - Client') {
            steps {
                sh '''
                    docker run --rm \
                      -v $(pwd)/client:/app \
                      -w /app \
                      node:16-alpine \
                      sh -c "yarn install && CI=true yarn test --passWithNoTests"
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'DOCKER_BUILDKIT=0 docker-compose build'
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh '''
                    docker-compose down || true
                    docker rm -f sb-server react-client || true
                '''
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Verify') {
            steps {
                sh '''
                    sleep 10
                    docker ps
                    curl -f http://localhost:8080 || echo "Server not ready yet"
                    curl -f http://localhost:80 || echo "Client not ready yet"
                '''
            }
        }
    }

    post {
        success {
            echo 'Build, Test and Deployment successful! Server: localhost:8080, Client: localhost:80'
        }
        failure {
            echo 'Build failed. Check the console output above for errors.'
        }
    }
}
