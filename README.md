# bookmarks-node-react-ts

An example React client + Node API made with Typescript

## Clone the project

```sh
git clone https://github.com/vguillou/bookmarks-node-react-ts.git
cd bookmarks-node-react-ts
rm -rf .git
```

## Install dependencies

```sh
yarn
```

## Set environment variables

By order of preference:
- Either create a symbolic link `.env` pointing to `.env.example`:
  ```sh
  ln -s .env.example ./packages/server/.env
  ```
- Or make a copy of `.env.example` as `.env`
  ```sh
  cp ./packages/server/.env.example ./packages/server/.env
  ```

## Run in development mode

```sh
yarn dev
```

- See the API's swagger at http://127.0.0.1:3000/api-docs
- Launch the application's Front End at http://127.0.0.1:3001

## Run in production mode

```sh
yarn build
yarn start
```

- Then open http://127.0.0.1:3000

## IDE:

VSCode recommended, with the following extensions:
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [openapi-lint](https://marketplace.visualstudio.com/items?itemName=mermade.openapi-lint) for editing the `./docs/openapi3.yml` spec

To enable auto fixing ESLint errors on save, modify VSCode settings.json and set:

```json
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
}
```
