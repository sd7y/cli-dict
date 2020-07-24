# Translation for shell

## Install
Fork this project and pull the code to your computer.
`git pull <your forked address>`

Install the [Deno](https://deno.land/)
```
curl -fsSL https://deno.land/x/install/install.sh | sh
```

Install the mpg123 
```bash
sudo apt-get install mpg123
```

Optional
- Add an alias in ~/.bashrc
  ```
  alias fy="<your-path>/cli-dict/run.sh"
  ```

## Instruction for use

`./run.sh hello` or `fy hello`

## TODO

- Run with HTTP server, and create a shell client to access the server to get translation
- Store the word list in mongo
- Make a Dockerfile for [Deno](https://deno.land/), `curl -fsSL https://deno.land/x/install/install.sh | sh`
- Make a docker compose contains Deno & Mongo
