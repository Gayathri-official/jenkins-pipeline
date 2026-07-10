pipeline {
    agent any
    environment {
        DOCKERHUB_USERNAME = 'mudraboyinagayathri29'
        IMAGE_SERVER = "${DOCKERHUB_USERNAME}/spring-boot-server"
        IMAGE_CLIENT = "${DOCKERHUB_USERNAME}/react-client"
    }
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

        stage('Verify Docker') {
            steps {
                bat 'docker --version'
                bat 'docker compose version'
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'set DOCKER_BUILDKIT=0 && docker compose build'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat '''
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                        docker tag spring-boot-react-example_master-server:latest %IMAGE_SERVER%:latest
                        docker tag spring-boot-react-example_master-client:latest %IMAGE_CLIENT%:latest
                        docker push %IMAGE_SERVER%:latest
                        docker push %IMAGE_CLIENT%:latest
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                bat '''
                    docker rm -f sb-server react-client || exit 0
                    docker compose down || exit 0
                    docker compose up -d
                    timeout /t 10
                    docker ps
                '''
            }
        }
    }
    post {
        success {
            echo 'SUCCESS! Images pushed to Docker Hub. Server=localhost:8080, Client=localhost:80'
        }
        failure {
            echo 'FAILED! Check console output for errors.'
        }
    }
}
