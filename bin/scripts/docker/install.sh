
function scripts::docker::install() {

  sudo apt-get update

  sudo apt-get install \
      apt-transport-https \
      ca-certificates \
      curl \
      software-properties-common

  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

  sudo apt-key fingerprint 0EBFCD88


  sudo add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) \
    stable"

  sudo apt-get update

  # sudo apt-get install -y docker-ce=18.06.1~ce~3-0~ubuntu 

  sudo apt-get install docker-ce


  # docker-compose
  sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" \
      -o /usr/local/bin/docker-compose

  sudo chmod +x /usr/local/bin/docker-compose
}

scripts::docker::install