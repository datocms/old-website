import React from 'react'
import { parse } from 'flatted/cjs';
import { Wrap, button, Space, text } from 'blocks'

const Foo = ({ data }) => {
  const intro = parse(data.cda.body);

  const filters = intro.__schema.types
    .find(type => type.name === 'ModelModelFilter')
    .inputFields
    .filter(field => field.type.kind === 'INPUT_OBJECT')
    .map(field => (
      intro.__schema.types
        .find(type => type.name === field.type.name)
    ));

  const exampleForType = (typeRef) => {
    if (typeRef.kind === 'LIST') {
      return `[${exampleForType(typeRef.ofType)}]`;
    }

    if (typeRef.kind === 'NON_NULL') {
      return exampleForType(typeRef.ofType);
    }

    const type = intro.__schema.types.find(type => type.name === typeRef.name);

    if (type.name === 'ID') {
      return '"123"';
    } else if (type.name === 'Boolean') {
      return 'true';
    } else if (type.name === 'String') {
      return '"foobar"';
    } else if (type.name === 'Float') {
      return '3.14';
    } else if (type.name === 'Int') {
      return '42';
    } else if (type.name === 'DateTime') {
      return '"2018-02-13T14:30:00+00:00"';
    } else {
      return type.name;
    }
  }

  const exampleForField = (field) => {
    return `
      allPosts(
        filter: {
          field: {
            ${field.name}: ${exampleForType(field.type)}
          }
        }
      )
    `;
  }

  return (
    <Wrap>
      <div>
        {
          filters.map(type => (
            <Space both="10">
              {type.name}
              {
                type.inputFields.map(field => (
                  <div>
                    <div>
                      {field.name}
                    </div>
                    <pre>
                      {exampleForField(field)}
                    </pre>
                  </div>
                ))
              }
            </Space>
          ))
        }
      </div>
    </Wrap>
  )
}

export default Foo

export const query = graphql`
query FooQuery {
  cda {
    body
  }
}
`
