def notify(message) {
    def token = "QgqHMTsiNMd7yVAiYylPifdhEbJCzQPxnuiqKFNWoHf";
    def jobName = env.JOB_NAME + ' - ' + env.BRANCH_NAME;
    def buildNo = env.BUILD_NUMBER;
      
    def url = "https://notify-api.line.me/api/notify";
    def lineMessage = "${jobName} [#${buildNo}] : ${message} \r\n";
    sh "curl ${url} -H 'Authorization: Bearer ${token}' -F 'message=${lineMessage}'";
}

def FAILED_STAGE
pipeline {
    agent none
    environment {
        registryUrl = 'ghcr.io'
        registry = 'ghcr.io/dtdevteam/coj-migration-api'
        registryCredential = 'registry-gitlab'
        // registryCredential = '645c564a-6e79-4ee1-9faa-62b3f6cba25a'
        dockerImage = ''
    }

    stages {

        stage('Docker Build') {

            agent any

            steps{
                echo 'Docker Build'
                echo '#############################################################################################################'
                script{
                    try {
                        dockerImage = "${docker.build} ${registry}:latest"
                    } catch(err){
                        throw err;
                    }
                    
                }
            }
        }

        stage('Docker Push') {
            agent any
            steps{
                echo 'Docker Push'
                echo '#############################################################################################################'
                script {
                    try {
                        sh "echo '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' | docker login ghcr.io -u midnighttime-cha --password-stdin"
                        sh "docker push ${registry}:latest"
                    }catch(err){
                        throw err;
                    }
               }
            }
        }

        stage('Delete Docker Image') {
            agent any
            steps{
                echo 'delete docker images'
                echo '#############################################################################################################'
                script{
                    try{
                        sh 'docker rmi '+ "${registry}:latest"
                    }catch(err){
                        throw err;
                    }
                }
                
            }
        }

        stage('Deploy') {
            agent any
            steps{
                echo 'Deploy'
                echo '#############################################################################################################'
                script{
                    try{
                        sh 'chmod 744 deploy.sh'
                        sh 'sh deploy.sh'
                        notify("API Deploy successfully !!")
                    }catch(err){
                        throw err;
                    }
                }
                
            }
        }
    }
    
}
