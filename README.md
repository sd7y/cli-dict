# Translation for shell

## Install
Fork this project and pull the code to your computer.
`git pull <your forked address>`

Install the mpg123 
```bash
sudo apt-get install mpg123
```

Add the `FY_API_YOUDAO_APP_KEY` and `FY_API_YOUDAO_KEY` to ~/.bashrc.   
API from [有道智云](http://ai.youdao.com)
```
export FY_API_YOUDAO_APP_KEY="<应用ID>"
export FY_API_YOUDAO_KEY="<应用密钥>"
alias fy='<your path>/fy.sh'
```

## Instruction for use

Please refer to the `fy --help`

## TODO

- can delete the remote word-list
- merge the query history
- cache the query result to local
- cache the sound to local
- add the 'Ebbinghaus Forgetting Curve'
- will show a error when execute 'fy -s' if the word-list.json is not modified
- if the .word-list.json is not exists or it is emptied, then execute 'fy -l' will show a error