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

/* global test, expect */

const parseJsonSchema = require('../parseJsonSchema')

test('Non existent file', async () => {
  const parsedContent = await parseJsonSchema('./data/nope.person.schema.json')

  expect(parsedContent).toBeNull()
})

test('Escapes $id', async () => {
  const parsedContent = await parseJsonSchema(
    './src/__tests__/data/person.schema.json'
  )
  expect(parsedContent.$id).toBeUndefined()
  expect(parsedContent._id).toBe('https://example.com/person.schema.json')

  const parsedContent2 = await parseJsonSchema(
    './src/__tests__/data/location.schema.json'
  )
  expect(parsedContent2.$id).toBeUndefined()
  expect(parsedContent2._id).toBe(
    'https://example.com/geographical-location.schema.json'
  )

  const parsedContent3 = await parseJsonSchema(
    './src/__tests__/data/arrays.schema.json'
  )
  expect(parsedContent3.$id).toBeUndefined()
  expect(parsedContent3._id).toBe('https://example.com/arrays.schema.json')
})

test('Escapes $schema', async () => {
  const parsedContent = await parseJsonSchema(
    './src/__tests__/data/person.schema.json'
  )
  expect(parsedContent.$schema).toBeUndefined()
  expect(parsedContent._schema).toBe(
    'https://json-schema.org/draft/2020-12/schema'
  )

  const parsedContent2 = await parseJsonSchema(
    './src/__tests__/data/location.schema.json'
  )
  expect(parsedContent2.$schema).toBeUndefined()
  expect(parsedContent2._schema).toBe(
    'https://json-schema.org/draft/2020-12/schema'
  )

  const parsedContent3 = await parseJsonSchema(
    './src/__tests__/data/arrays.schema.json'
  )
  expect(parsedContent3.$schema).toBeUndefined()
  expect(parsedContent3._schema).toBe(
    'https://json-schema.org/draft/2020-12/schema'
  )
})

test('Escapes $defs', async () => {
  const parsedContent = await parseJsonSchema(
    './src/__tests__/data/arrays.schema.json'
  )
  expect(parsedContent.$defs).toBeUndefined()
  expect(parsedContent._defs).toBeDefined()
  expect(parsedContent._defs).toStrictEqual({
    veggie: {
      type: 'object',
      required: ['veggieName', 'veggieLike'],
      properties: {
        veggieName: {
          type: 'string',
          description: 'The name of the vegetable.'
        },
        veggieLike: {
          type: 'boolean',
          description: 'Do I like this vegetable?'
        }
      }
    }
  })
})

test('Escapes $vocabulary', async () => {
  const parsedContent = await parseJsonSchema(
    './src/__tests__/data/vocabulary.schema.json'
  )
  expect(parsedContent.$vocabulary).toBeUndefined()
  expect(parsedContent._vocabulary).toBeDefined()
  expect(parsedContent._vocabulary).toStrictEqual({
    'https://example.com/vocab/example-vocab': true
  })
})

test('Escapes $dynamicAnchor', async () => {
  const parsedContent = await parseJsonSchema(
    './src/__tests__/data/vocabulary.schema.json'
  )
  expect(parsedContent.$dynamicAnchor).toBeUndefined()
  expect(parsedContent._dynamicAnchor).toBeDefined()
  expect(parsedContent._dynamicAnchor).toStrictEqual('meta')
})
