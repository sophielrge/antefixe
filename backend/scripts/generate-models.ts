import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

/*
** PlantUML example content parsed

// /!\ packages are ignored, entity should have different names !

package 'referential' {
    // attribute visibility is not taken in account for interface and is optional
    interface User {
        + number id? // optional character is interpreted as attribute name
        + string firstName
        + string lastName 
        + string email
        + string[] phones // array is part of attribute type
        + Role role // attribute of generated type      
        --encrypted-- // separator is ignored     
        /' encrypted '/ // comment is ignored
        + string password
    }

    enum Role {
        ADMINISTRATOR
        USER
    }
}

interface Tenant {
}

// each of these inheritance relation are interpreted
// package is ignored and removed
Tenant --> referential.User
Tenant ..> referential.User
Tenant --|> referential.User
Tenant ..|> referential.User
referential.User <-- Tenant
referential.User <.. Tenant
referential.User <|-- Tenant
referential.User <|.. Tenant

*/

const pumlContent: string[] = readFileSync(join(__dirname, '..', 'src', 'models', 'model.puml'))
  .toString()
  .split('\n');

const typesContent: string[] = [
  '// Content is generated automatically, please modify UML instead and regenerate this file.',
  '',
  '/* eslint-disable */'
];

// key child : value parent
const extendsMap: Record<string, string> = {};
const removePackage = (entity: string): string => {
  const splittedEntity = entity.split('.');
  if (splittedEntity && splittedEntity.length > 1) {
    return splittedEntity[splittedEntity.length - 1];
  }
  return entity;
};

// Read relation first
const extendRegExp = /(<\|?(-[^-]*-|\.[^.]*\.))|((-[^-]*-|\.[^.]*.)\|?>)/;
const extendParentLeftSideRegExp = /<\|?(-[^-]*-|\.[^.]*\.)/;
pumlContent.forEach((line) => {
  if (extendRegExp.test(line)) {
    const splittedLine = line.trim().split(' ');
    const leftSide = removePackage(splittedLine[0]);
    const rightSide = removePackage(splittedLine[splittedLine.length - 1]);
    if (extendParentLeftSideRegExp.test(line)) {
      // Parent is left side and so child is right side
      extendsMap[rightSide] = leftSide;
    } else {
      // Parent is right side and so child is left side
      extendsMap[leftSide] = rightSide;
    }
  }
});

// Read entity
const enumStart = /enum ([^ ]*) {/;
const interfaceStart = /interface ([^ ]*) {/;
const ignoredRegExp = /--.*--|\/'|'\//;
const attributeDefinitionRegExp = /([+#-]?) ([^ +#-][^ ]*) ([^ \r\n]+)/;
const entityEnd = /\}/;

let entityContent: string[] = [];
let isReadingEnum = false;
let isReadingInterface = false;
const isReadingEntity = (): boolean => {
  return isReadingEnum || isReadingInterface;
};
const endReading = (): void => {
  isReadingEnum = false;
  isReadingInterface = false;

  entityContent = entityContent.sort();
  entityContent = entityContent.reduce((content: string[], line: string) => {
    // Option for JSON schemas to TS
    const annotations: string[] = [];
    if (line.includes('?:')) {
      annotations.push('@nullable');
    }
    // Specific case
    if (line.includes('coordinates')) {
      annotations.push('@items.type [ "number", "null" ]');
      annotations.push('@minItems 2');
    }
    if (annotations.length) {
      content.push('  /**');
      annotations.forEach((annotation) => {
        content.push(`   *  ${annotation}`);
      });
      content.push('   */');
    }
    return content.concat(line);
  }, []);
  typesContent.push(...entityContent);
  entityContent = [];
};

pumlContent.forEach((line) => {
  if (isReadingEntity()) {
    if (entityEnd.test(line)) {
      endReading();
      typesContent.push('}');
      typesContent.push('');
    } else if (isReadingEnum && !ignoredRegExp.test(line)) {
      const enumValue = line.trim();
      if (enumValue) {
        entityContent.push(`  ${enumValue.includes('-') ? `'${enumValue}'` : enumValue} = '${enumValue}',`);
      }
    } else if (isReadingInterface && !ignoredRegExp.test(line) && attributeDefinitionRegExp.test(line)) {
      const attributeDefinition = attributeDefinitionRegExp.exec(line) as RegExpExecArray;
      // attributeVisibilityMarker = attributeDefinition[1];
      entityContent.push(`  ${attributeDefinition[3]}: ${attributeDefinition[2]};`);
    }
  } else {
    if (enumStart.test(line)) {
      isReadingEnum = true;
      const enumName = (enumStart.exec(line) as RegExpExecArray)[1];
      typesContent.push(`export enum ${enumName} {`);
    } else if (interfaceStart.test(line)) {
      isReadingInterface = true;
      const interfaceName = (interfaceStart.exec(line) as RegExpExecArray)[1];
      const parentEntity = extendsMap[interfaceName];
      typesContent.push(`export interface ${interfaceName}${parentEntity ? ` extends ${parentEntity}` : ''} {`);
    }
  }
});

writeFileSync(join(__dirname, '..', 'src', 'models', 'types.ts'), typesContent.join('\n'));

// eslint-disable-next-line no-console
console.log("Success: 'src/models/types.ts' re-generated");

