function _deploy_tools::completion() {
    local cur prev opts path root

    root="."

    COMPREPLY=()

    cur="${COMP_WORDS[COMP_CWORD]}"
    prev="${COMP_WORDS[COMP_CWORD-1]}"

    path="./bin/scripts"
    for word in ${COMP_WORDS[@]:1:COMP_CWORD-1}
    do
        path="${path}/${word}"
    done

    if [[ -d "${path}" ]]; then

        if [[ -f "${path}/bash_completion.sh" ]]; then
            . "${path}/bash_completion.sh"
        else
            opts=""
            for sh in $(ls ${path}/*.sh); do
                sh="$(basename "$sh")"
                opts="$opts ${sh%.*}"
            done
            COMPREPLY=( $(compgen -o filenames -W "$opts" -- ${cur}) )
        fi
    fi
}
complete -F _deploy_tools::completion "./deploy.sh"

# http://kodango.com/bash-competion-programming
# https://segmentfault.com/a/1190000002968878
