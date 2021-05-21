---
title: 50 preguntas típicas con git
date: '2021-05-20'
image: '/images/50-preguntas-tipicas-git.png'
description: Evita usar rutas relativas a la hora de importar archivos en tus componentes de React en Next.js y usa rutas más fáciles de leer
tags:
- nextjs
---

## ¿Cómo saber si tengo git instalado en mi sistema?

Ejecuta en tu terminal. Si te dice la versión es que funciona. Si te aparece un mensaje como `command not found: git` es que no lo tienes instalado en tu sistema o, al menos, disponible en el PATH.

```
git --version
```

## ¿Cómo inicializar un nuevo proyecto con Git?

```
git init nuevo-proyecto
cd nuevo-proyecto
```

## ¿Cómo configuro el nombre y correo usado en Git?

Ejecuta en la terminal estos comandos y cambia el `<your na>
```
git config --global user.name "<tu nombre>"
git config --global user.email "<tu email>"
```

Por ejemplo:

```
git config --global user.name "Miguel Ángel"
git config --global user.email "midudev@gmail.com"
```

## ¿Cómo configurar el editor por defecto que abre Git?

¿Cansado que te abra vim para editar los commits? Configura el editor que prefieras:

```
git config --global core.editor "code"
```

## ¿Qué es el área de staging?

Es una zona
1. What is the staging area?
The staging area is an intermediate storage for changes that will be part of the next commit.

6. How to add a file to the staging area?
$ git add <file>
7. How to remove a file from the staging area?
$ git reset HEAD -- <file>
8. How to make a commit?
$ git commit -m "Commit message"
9. Where are git preferences saved?
$ git config --list --show-origin
10. How to ignore untracked files?
Add them to a local .gitignore file

11. How to untrack a file without deleting it?
$ git rm --cached <file>
12. How to undo the most recent commit?
$ git reset HEAD~
$ nano <file>
$ git add <file>
$ git commit -c ORIG_HEAD
13. How to change the message of the last commit?
$ git commit --amend -m "New message"
14. How to add a remote repository?
$ git remote add <name> <url>
15. How to compare a file to the last committed version?
$ git diff HEAD -- <file>
16. How to rename a remote?
$ git remote rename <old_name> <new_name>
17. How to change the address of a remote?
$ git remote set-url <name> <new_url>
18. How to send your changes to a remote repository?
$ git push
19. How to synchronize your local and remote repositories?
20. What is the different between reset and revert?
21. How to tell git to ignore trailing whitespaces?
22. What is the difference between git add *; git commit and git commit -a -m?
23. What is the difference between pull and fetch?
24. How to make a commit from another author?
$ git commit --author "Name Surname <email@address>" ...
25. How to create a branch?
$ git branch BRANCHNAME
26. How to switch to a branch?
$ git checkout BRANCHNAME
Tip:

$ git checkout -b BRANCHNAME
Will create and switch to the branch called BRANCHNAME

27. How to know when a file was first added to the repository?
28. How to get a list of all deleted files?
29. How to completely remove (sensitive) files from history?
You can't unless you change the history

30. How to list remote repositories?
$ git remote -v
31. How to tag a specific commit?
$ git tag -m '...' <commit>
32. How to get a list of tags?
$ git tag
33. How to merge 3 last commits into a single one?
34. How to get last modification for a given file?
35. How to swap branch master with another one?
36. How to access all commits in case of problem?
37. How to get all the commits from a specific user?
38. How to ignore the .gitignore file?
In the global gitignore add a line like this

.gitignore

Or in the root of a dir add a line like this

folder_where_is_its_gitignore/.gitignore

39. How to get the list of unpushed commits?
$ git log @{u}..
40. How to compare a file across two different branches?
$ git diff <branch-a> <branch-b> -- <file>
41. How to merge two git repositories?
A single branch of another repository can be easily placed under a subdirectory retaining its history. For example:

git subtree add --prefix=rails git://github.com/rails/rails.git master

42. What is the difference between HEAD and ORIG_HEAD?
43. How to use a global .gitignore?
Create ~/.config/git/ignore with a list of patterns.

44. What if the difference between rm and git rm?
git-rm - Remove files from the working tree and from the index rm - remove files or directories

45. How prevent a push if remote has extra commits?
This is the default with git push, not necessary to do anything.

You need to do that in the remote

46. How to create a git alias command?
$ git config --global alias.THEALIASED "WHAT_GIT_COMMAND_TO_ALIAS"
Note: If you want to alias a real command not a git command you need to use ! but your shell will try to find an event so you need to use a "!echo 'Test'"

47. How to undo a pushed commit?
Some blog post on freecodecamp

Briefly :

git fetch is the command that tells your local git to retrieve the latest meta-data info from the original (yet doesn’t do any file transferring. It’s more like just checking to see if there are any changes available).

git pull on the other hand does that AND brings (copy) those changes from the remote repository.

48. How to find the first commit?
git log master HEAD~ --oneline | tail -1 | awk '{ print $1 }'
49. How to find top contributor?
git shortlog -s -n | head -1
If you remove | head -1 you get all contributors

50.