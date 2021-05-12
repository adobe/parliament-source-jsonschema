/**
 *  Copyright 2021 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *  of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under
 *  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 */

const glob = require('fast-glob')
const parseJsonSchema = require('./src/parseJsonSchema')

const { GraphQLJSON } = require('gatsby/graphql')

const reduceGraphQLToJson = (nodes) => {
  return nodes
    .map(({ id, parent, children, internal, ...rest }) => Object.keys(rest))
    .reduce((a, f) => a.concat(f), [])
    .reduce((o, name) => ({ ...o, [name]: GraphQLJSON }), {})
}

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  { patterns = `**`, path }
) => {
  const { createNode } = actions

  const repoFiles = await glob(patterns, {
    cwd: path,
    absolute: true,
    onlyFiles: true
  })

  // console.log(repoFiles)
  let i = 0
  for await (const file of repoFiles) {
    if (file.endsWith('.schema.json')) {
      try {
        const schema = await parseJsonSchema(file)
        if (schema) {
          createNode({
            id: createNodeId(`json-schema-${i}`),
            ...schema,
            slug: file.replace(path, ''),
            parent: null,
            children: [],
            internal: {
              type: `ParliamentJsonSchema`,
              content: '',
              contentDigest: createContentDigest(schema)
            }
          })
          i++
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  const { name, nodes } = type
  if (name === 'ParliamentJsonSchema') {
    return reduceGraphQLToJson(nodes)
  }
}
