/**
 * Representa um dicionário imutável com chaves e valores fortemente tipados.
 * @template K Tipo das chaves (string, number ou symbol)
 * @template V Tipo dos valores
 */
export type Disc<K extends string | number | symbol, V> = Record<K, V>;

/**
 * Cria um novo Disc (dicionário) a partir de uma lista de entradas.
 * @template K Tipo das chaves (string)
 * @template V Tipo dos valores
 * @param entries Lista de tuplas [chave, valor]
 * @returns Um novo Disc contendo as entradas fornecidas
 */
export function disc<K extends string, V>(entries: [K, V][] = []): Disc<K, V> {
  return entries.reduce((acc, [k, v]) => {
    acc[k] = v;
    return acc;
  }, {} as Disc<K, V>);
}

/**
 * Recupera um valor associado a uma chave em um Disc.
 * @template K Tipo das chaves (string)
 * @template V Tipo dos valores
 * @param d O Disc de origem
 * @param key A chave a ser acessada
 * @returns O valor associado ou undefined se não existir
 */
export function get<K extends string, V>(d: Disc<K, V>, key: K): V | undefined {
  return d[key];
}

/**
 * IMPORTANTE: NÃO ESTÁ FUNCIONANDO, TEM QUE CONSERTAR
 * Define (ou substitui) um valor em um Disc, retornando um novo Disc.
 * @template K Tipo das chaves (string)
 * @template V Tipo dos valores
 * @param d O Disc original
 * @param key A chave a ser definida
 * @param value O valor a ser associado à chave
 * @returns Um novo Disc com o par chave-valor atualizado
 */
export function set<K extends string, V>(d: Disc<K, V>, key: K, value: V): Disc<K, V> {
  return { ...d, [key]: value };
}

/**
 * Remove uma chave de um Disc, retornando um novo Disc sem ela.
 * @template K Tipo das chaves (string)
 * @template V Tipo dos valores
 * @param d O Disc original
 * @param key A chave a ser removida
 * @returns Um novo Disc sem a chave especificada
 */
export function del<K extends string, V>(d: Disc<K, V>, key: K): Disc<K, V> {
  const { [key]: _, ...rest } = d;
  return rest as Disc<K, V>;
}

/**
 * Verifica se uma chave está presente em um Disc.
 * @template K Tipo das chaves (string)
 * @template V Tipo dos valores
 * @param d O Disc a ser verificado
 * @param key A chave a ser testada
 * @returns true se a chave existe, false caso contrário
 */
export function has<K extends string, V>(d: Disc<K, V>, key: K): boolean {
  return Object.prototype.hasOwnProperty.call(d, key);
}

/**
 * Retorna uma lista de todas as chaves presentes no Disc.
 * @template K Tipo das chaves (string)
 * @template V Tipo dos valores
 * @param d O Disc a ser inspecionado
 * @returns Um array com as chaves
 */
export function keys<K extends string, V>(d: Disc<K, V>): K[] {
  return Object.keys(d) as K[];
}

/**
 * Retorna uma lista de todos os valores presentes no Disc.
 * @template K Tipo das chaves (string)
 * @template V Tipo dos valores
 * @param d O Disc a ser inspecionado
 * @returns Um array com os valores
 */
export function values<K extends string, V>(d: Disc<K, V>): V[] {
  return Object.values(d);
}

/**
 * Retorna todas as entradas [chave, valor] do Disc.
 * @template K Tipo das chaves (string)
 * @template V Tipo dos valores
 * @param d O Disc a ser inspecionado
 * @returns Um array de tuplas [chave, valor]
 */
export function entries<K extends string, V>(d: Disc<K, V>): [K, V][] {
  return Object.entries(d) as [K, V][];
}

/**
 * Aplica uma função a todos os valores do Disc, retornando um novo Disc com os valores transformados.
 * @template K Tipo das chaves (string)
 * @template V Tipo dos valores de entrada
 * @template U Tipo dos valores de saída
 * @param d O Disc original
 * @param fn Função que transforma cada valor e chave
 * @returns Um novo Disc com os valores resultantes
 */
export function map<K extends string, V, U>(d: Disc<K, V>, fn: (value: V, key: K) => U): Disc<K, U> {
  return keys(d).reduce((acc, key) => {
    acc[key] = fn(d[key], key);
    return acc;
  }, {} as Disc<K, U>);
}

/**
 * Adiciona um ou mais valores a uma lista existente em uma chave de um Disc onde os valores são arrays.
 * Se a chave não existir, ela será criada com o array fornecido.
 * @template K Tipo da chave
 * @template V Tipo dos elementos do array
 * @param d O Disc original contendo arrays como valores
 * @param key A chave à qual os valores devem ser adicionados
 * @param values Um ou mais valores a serem adicionados ao array
 * @returns Um novo Disc com os valores adicionados ao array correspondente
 */
export function push<K extends string, V>(
  d: Disc<K, V[]>,
  key: K,
  ...values: V[]
): Disc<K, V[]> {
  const existing = get(d, key) || [];
  return set(d, key, [...existing, ...values]);
}