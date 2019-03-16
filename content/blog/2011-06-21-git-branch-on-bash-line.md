+++
date = "2011-06-21T04:52:48Z"
language = "en"
tags = ["Server", "bash", "git"]
title = "git branch on bash line"
+++

This little code, if placed in to your ~/.bash_profile file will reveal what git branch you are working on.  
 
    parse_git_branch() {
            git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* (.*)/(1)/'
    }
    if [[ $EUID -ne 0 ]]; then
            PS1="w$(parse_git_branch) $ "
    fi
