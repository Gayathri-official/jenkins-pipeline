pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
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
        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }
        stage('Stop Old Containers') {
            steps {
                sh 'docker-compose down || true'
            }
        }
        stage('Run Containers') {
            steps {
                sh 'docker-compose up -d'
            }
        }
        stage('Verify') {
            steps {
                sh 'docker ps'
            }
        }
    }
    post {
        success {
            echo 'Build and deployment successful! Server: localhost:8080, Client: localhost:3000'
        }
        failure {
            echo 'Build failed. Check the console output above for errors.'
        }
    }
}
