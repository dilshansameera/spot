import { PropertyDeclaration } from "ts-simple-ast";
import { Locatable } from "../../models/locatable";
import { SecurityHeaderNode } from "../../models/nodes";
import {
  extractJsDocCommentLocatable,
  extractPropertyNameLocatable
} from "../utilities/parser-utility";
import { parseType } from "../utilities/type-parser";

/**
 * Parse a `@securityHeader` decorated method.
 *
 * @param a field declaration
 */
export function parseSecurityHeader(
  property: PropertyDeclaration
): Locatable<SecurityHeaderNode> {
  const decorator = property.getDecoratorOrThrow("securityHeader");

  const name = extractPropertyNameLocatable(property);
  const description = extractJsDocCommentLocatable(property);
  const type = parseType(property.getTypeNodeOrThrow());

  const location = decorator.getSourceFile().getFilePath();
  const line = decorator.getStartLineNumber();

  return {
    value: { name, description, type },
    location,
    line
  };
}
