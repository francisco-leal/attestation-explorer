type EasSchemaElementValue = string | string[];

type EasSchemaElement = {
  name: string;
  value: EasSchemaElementValue;
  type: string;
};

enum PropertyType {
  String = "string",
  Uint16 = "uint16",
  Bool = "bool",
}

export type { EasSchemaElement, EasSchemaElementValue };
export { PropertyType };
