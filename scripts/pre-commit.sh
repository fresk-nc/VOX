#!/bin/sh

PATCH_FILE="working-tree.patch"

function cleanup {
    exit_code=$?
    if [ -f "$PATCH_FILE" ]; then
        git apply "$PATCH_FILE" 2> /dev/null
        rm "$PATCH_FILE"
    fi
    exit $exit_code
}

trap cleanup EXIT SIGINT SIGHUP

# Cancel any changes to the working tree that are not going to be committed
git diff > "$PATCH_FILE"
git checkout -- .

git_cached_files=$(git diff --cached --name-only --diff-filter=ACMR | grep "\.js$")

if [ "$git_cached_files" ]; then
    npm run lint:precommit $git_cached_files || exit 1
fi
