
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

        stage('Build Docker Images') {
            steps {
                sh 'DOCKER_BUILDKIT=0 docker-compose build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker rm -f sb-server react-client || true
                    docker-compose down || true
                    docker-compose up -d
                    sleep 10
                    docker ps
                '''
            }
        }
    }

    post {
        success {
            echo 'SUCCESS! Server=localhost:8080, Client=localhost:80'
        }
        failure {
            echo 'FAILED! Check console output for errors.'
        }
    }
}
