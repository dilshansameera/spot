import assertNever from "assert-never";
import { generate as generateRandomString } from "randomstring";
import { Type, TypeKind, TypeTable } from "../types";

/**
 * Generates dummy data based on a type.
 */
export function generateData(types: TypeTable, type: Type): any {
  switch (type.kind) {
    case TypeKind.NULL:
      return null;
    case TypeKind.BOOLEAN:
      return randomBoolean();
    case TypeKind.BOOLEAN_LITERAL:
      return type.value;
    case TypeKind.STRING:
      return generateRandomString();
    case TypeKind.STRING_LITERAL:
      return type.value;
    case TypeKind.FLOAT:
    case TypeKind.DOUBLE:
      return randomDouble(100);
    case TypeKind.INT32:
      return randomInteger(100);
    case TypeKind.INT64:
      return Math.pow(2, 50) + randomInteger(10000);
    case TypeKind.DATE:
    case TypeKind.DATE_TIME:
      return new Date().toISOString();
    case TypeKind.INT_LITERAL:
    case TypeKind.FLOAT_LITERAL:
      return type.value;
    case TypeKind.OBJECT:
      return type.properties.reduce<{ [key: string]: any }>((acc, property) => {
        if (randomBoolean() || !property.optional) {
          acc[property.name] = generateData(types, property.type);
        }
        return acc;
      }, {});
    case TypeKind.ARRAY:
      const size = randomInteger(10);
      const array: any[] = [];
      for (let i = 0; i < size; i++) {
        array.push(generateData(types, type.elementType));
      }
      return array;
    case TypeKind.UNION:
      return generateData(
        types,
        type.types[randomInteger(type.types.length - 1)]
      );
    case TypeKind.REFERENCE:
      const referencedType = types.get(type.name);
      if (!referencedType) {
        throw new Error(`Missing referenced type: ${type.name}`);
      }
      return generateData(types, referencedType);
    default:
      throw assertNever(type);
  }
}

function randomBoolean() {
  return Math.random() > 0.5;
}

function randomInteger(max: number) {
  return Math.round(randomDouble(max));
}

function randomDouble(max: number) {
  return Math.random() * max;
}
