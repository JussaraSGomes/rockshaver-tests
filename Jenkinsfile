pipeline {
    agent {
        docker { 
            image 'cypress/browsers:latest' 
            args '-u root --network rockshaver_skynet'}
    }
    stages {
        stage('API') {
            steps {
                dir('api') {
                    sh 'npm install'
                    sh 'npx cypress install --force'
                    sh 'npx cypress run'
                }
            }
        }

        stage('Mobile') {
            steps {
                dir('mobile'){
                    sh 'npm install'
                    sh 'npx cypress install --force'
                    sh 'npx cypress run'

                }
            }
        }

        stage('Web') {
            steps {
                dir('web'){
                    sh 'echo teste'
                }
            }
        }
    }
}