# parliament-source-jsonschema

Ingests JSON Schema files into the GraphQL database.

## Install

```shell
yarn add @adobe/parliament-source-jsonschema
```

## How to use

```javascript
module.exports = {
  plugins: [
    {
      resolve: `@adobe/parliament-source-jsonschema`,
      options: {
        path: `${process.env.LOCAL_PROJECT_DIRECTORY}`,
        patterns: `**/*`,
      },
    },
  ],
};
```

## How to query

```graphql
{
  allParliamentJsonSchema {
    edges {
      node {
        id
        _id
        _schema
        slug
        title
        description
        properties
        _defs
      }
    }
  }
}
```

## Contributing

Contributions are welcomed! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](LICENSE) for more information.
