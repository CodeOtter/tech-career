rsync -avPz . cultstate.com:~/tech-career
ssh cultstate.com 'killall node'
ssh cultstate.com 'export NVM_DIR=~/.nvm && source ~/.nvm/nvm.sh && node /home/cultstate/tech-career/ranvier </dev/null >/home/cultstate/tech-career.log 2>&1 &'
