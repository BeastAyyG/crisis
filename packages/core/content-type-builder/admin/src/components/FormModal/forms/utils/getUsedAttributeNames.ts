import snakeCase from 'lodash/snakeCase';

export type SchemaData = {
  initialData: {
    name?: string;
    targetAttribute?: string | null;
    [key: string]: unknown;
  };
  modifiedData: {
    createComponent?: boolean;
    enum?: string[];
    name?: string;
    relation?: string;
    repeatable?: boolean;
    targetAttribute?: string | null;
    targetField?: string;
    type?: string;
    [key: string]: unknown;
  };
};

export type Attribute = {
  name: string;
};

export const getUsedAttributeNames = (
  attributes: Array<Attribute>,
  schemaData: SchemaData
): Array<string> => {
  // Only the original name of the field being edited is excluded, so saving it
  // unchanged still passes. The name currently typed in the form must stay in
  // the used list, otherwise a new field (or a rename) duplicating an existing
  // field would never be reported as already used.
  const editedNames = [schemaData.initialData.name]
    .filter((name): name is string => Boolean(name))
    .map((name) => snakeCase(name));

  const isEditedAttribute = (name: string) => editedNames.includes(snakeCase(name));

  return attributes.filter(({ name }) => !isEditedAttribute(name)).map(({ name }) => name);
};
