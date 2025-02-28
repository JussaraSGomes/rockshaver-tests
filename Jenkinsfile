pipeline {
    agent {
        docker { image 'cypress/browsers:latest' }
    }
    stages {
        stage('Testes no Backend') {
            steps {
                dir('api') {
                    sh 'npm install'
                    sh 'npx cypress install --force'
                    sh 'npx cypress run'
                }
            }
        }

        stage('Testes no Frontend (mobile)') {
            steps {
                dir('mobile'){
                    sh 'echo teste'
                }
            }
        }

        stage('Testes no Frontend (web)') {
            steps {
                dir('web'){
                    sh 'echo teste'
                }
            }
        }
    }
}