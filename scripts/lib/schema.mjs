// A small JSON Schema validator for the keywords the files in schema/ use.
// It throws on any other keyword, so a schema cannot quietly ask for a check
// this code does not make.

const ANNOTATIONS = new Set(['$schema', 'title', 'description']);

const typeOf = (value) => {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';
  if (Number.isInteger(value)) return 'integer';
  return typeof value;
};

function resolve(root, ref) {
  if (!ref.startsWith('#/')) throw new Error(`unsupported $ref ${ref}`);
  return ref.slice(2).split('/').reduce((node, key) => node[key], root);
}

function check(root, schema, value, path, errors) {
  const fail = (message) => errors.push(`${path || '(root)'}: ${message}`);
  for (const [keyword, rule] of Object.entries(schema)) {
    switch (keyword) {
      case '$ref':
        check(root, resolve(root, rule), value, path, errors);
        break;
      case '$defs':
        break;
      case 'type':
        if (typeOf(value) !== rule && !(rule === 'number' && typeof value === 'number')) fail(`must be ${rule}`);
        break;
      case 'const':
        if (value !== rule) fail(`must be ${JSON.stringify(rule)}`);
        break;
      case 'enum':
        if (!rule.includes(value)) fail(`must be one of ${rule.join(', ')}`);
        break;
      case 'pattern':
        if (typeof value === 'string' && !new RegExp(rule, 'u').test(value)) fail(`must match ${rule}`);
        break;
      case 'minLength':
        if (typeof value === 'string' && [...value].length < rule) fail(`must have at least ${rule} characters`);
        break;
      case 'minItems':
        if (Array.isArray(value) && value.length < rule) fail(`must have at least ${rule} items`);
        break;
      case 'items':
        if (Array.isArray(value)) value.forEach((item, i) => check(root, rule, item, `${path}[${i}]`, errors));
        break;
      case 'required':
        if (typeOf(value) === 'object') for (const key of rule) if (!Object.hasOwn(value, key)) fail(`missing ${key}`);
        break;
      case 'properties':
        if (typeOf(value) === 'object') {
          for (const [key, sub] of Object.entries(rule)) {
            if (Object.hasOwn(value, key)) check(root, sub, value[key], path ? `${path}.${key}` : key, errors);
          }
        }
        break;
      case 'additionalProperties':
        if (rule !== false) throw new Error('only additionalProperties: false is supported');
        if (typeOf(value) === 'object') {
          for (const key of Object.keys(value)) if (!Object.hasOwn(schema.properties ?? {}, key)) fail(`unexpected property ${key}`);
        }
        break;
      case 'anyOf': {
        const passes = rule.some((sub) => {
          const inner = [];
          check(root, sub, value, path, inner);
          return inner.length === 0;
        });
        if (!passes) fail('matches none of the allowed forms');
        break;
      }
      default:
        if (!ANNOTATIONS.has(keyword)) throw new Error(`unsupported schema keyword ${keyword}`);
    }
  }
}

/** The ways `value` breaks `schema`, as readable lines; empty when it is valid. */
export function validate(schema, value) {
  const errors = [];
  check(schema, schema, value, '', errors);
  return errors;
}
