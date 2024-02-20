# GreenThumb-Backend

## 1
update working code

`git checkout main` on local main branch
`git pull origin main` updates and add new work from Github main

## 2
create a working branch
`git checkout -b name_branch` 

## 2.5
While working on branch and need the updated main
`git fetch origin main`
`git merge origin/main`

Might get internal conflicts on your branch, when merged from main, fix locally.

## 3
Finished the branch work 
`git add .`
`git commit -m"...."`

## 4 
Push to the branch once completed (Must have branch name)

`git push origin name_branch` pushes the brnach youve finished to githb.

## 5
Make pull request of complete brnach work

 - just go to pull requests in Github
 - add your pull request to the list
 - 1,2 or 3 (can number of people) people can sign -off ( hit confirm/merge)
 - check the conflicts (fix on your branch and re-push if any)

## 6
Your branch is merged into main and start from set one again
