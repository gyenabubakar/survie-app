ROOT_DIR=$(pwd)

rm -rf .git-cloned/vite
git clone https://github.com/shYkiSto/vite.git .git-cloned/vite

# shellcheck disable=SC2164
cd .git-cloned/vite

git switch fix-ssr-deadlock
pnpm install --reporter=silent
pnpm run build --reporter=silent
cd packages/vite && npm link

# go back to the root of the project
cd "$ROOT_DIR" || exit

# replace all occurrences of `link:` with `file:` in the packages/vite/package.json files
bun use-file-protocol-in-vite.ts

npm link vite
