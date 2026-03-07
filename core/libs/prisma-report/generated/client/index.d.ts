
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model MetaData
 * 
 */
export type MetaData = $Result.DefaultSelection<Prisma.$MetaDataPayload>
/**
 * Model DbConnection
 * 
 */
export type DbConnection = $Result.DefaultSelection<Prisma.$DbConnectionPayload>
/**
 * Model AiProvider
 * 
 */
export type AiProvider = $Result.DefaultSelection<Prisma.$AiProviderPayload>
/**
 * Model Chart
 * 
 */
export type Chart = $Result.DefaultSelection<Prisma.$ChartPayload>
/**
 * Model Dashboard
 * 
 */
export type Dashboard = $Result.DefaultSelection<Prisma.$DashboardPayload>
/**
 * Model DashboardChart
 * 
 */
export type DashboardChart = $Result.DefaultSelection<Prisma.$DashboardChartPayload>
/**
 * Model DashboardFilter
 * 
 */
export type DashboardFilter = $Result.DefaultSelection<Prisma.$DashboardFilterPayload>
/**
 * Model GlobalFilter
 * 
 */
export type GlobalFilter = $Result.DefaultSelection<Prisma.$GlobalFilterPayload>
/**
 * Model GlobalFilterOverride
 * 
 */
export type GlobalFilterOverride = $Result.DefaultSelection<Prisma.$GlobalFilterOverridePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const DbType: {
  MYSQL: 'MYSQL'
};

export type DbType = (typeof DbType)[keyof typeof DbType]


export const ChartType: {
  BAR: 'BAR',
  LINE: 'LINE',
  PIE: 'PIE',
  DOUGHNUT: 'DOUGHNUT',
  SCATTER: 'SCATTER',
  AREA: 'AREA',
  TABLE: 'TABLE'
};

export type ChartType = (typeof ChartType)[keyof typeof ChartType]


export const FilterType: {
  MULTI_SELECT: 'MULTI_SELECT',
  SINGLE_SELECT: 'SINGLE_SELECT',
  DATE_RANGE: 'DATE_RANGE',
  TEXT: 'TEXT',
  NUMBER: 'NUMBER'
};

export type FilterType = (typeof FilterType)[keyof typeof FilterType]


export const MissingColumnBehavior: {
  SHOW_ALL: 'SHOW_ALL',
  HIDE_DATA: 'HIDE_DATA'
};

export type MissingColumnBehavior = (typeof MissingColumnBehavior)[keyof typeof MissingColumnBehavior]

}

export type DbType = $Enums.DbType

export const DbType: typeof $Enums.DbType

export type ChartType = $Enums.ChartType

export const ChartType: typeof $Enums.ChartType

export type FilterType = $Enums.FilterType

export const FilterType: typeof $Enums.FilterType

export type MissingColumnBehavior = $Enums.MissingColumnBehavior

export const MissingColumnBehavior: typeof $Enums.MissingColumnBehavior

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more AuditLogs
 * const auditLogs = await prisma.auditLog.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more AuditLogs
   * const auditLogs = await prisma.auditLog.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.metaData`: Exposes CRUD operations for the **MetaData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MetaData
    * const metaData = await prisma.metaData.findMany()
    * ```
    */
  get metaData(): Prisma.MetaDataDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dbConnection`: Exposes CRUD operations for the **DbConnection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DbConnections
    * const dbConnections = await prisma.dbConnection.findMany()
    * ```
    */
  get dbConnection(): Prisma.DbConnectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aiProvider`: Exposes CRUD operations for the **AiProvider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiProviders
    * const aiProviders = await prisma.aiProvider.findMany()
    * ```
    */
  get aiProvider(): Prisma.AiProviderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chart`: Exposes CRUD operations for the **Chart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Charts
    * const charts = await prisma.chart.findMany()
    * ```
    */
  get chart(): Prisma.ChartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dashboard`: Exposes CRUD operations for the **Dashboard** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dashboards
    * const dashboards = await prisma.dashboard.findMany()
    * ```
    */
  get dashboard(): Prisma.DashboardDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dashboardChart`: Exposes CRUD operations for the **DashboardChart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DashboardCharts
    * const dashboardCharts = await prisma.dashboardChart.findMany()
    * ```
    */
  get dashboardChart(): Prisma.DashboardChartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dashboardFilter`: Exposes CRUD operations for the **DashboardFilter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DashboardFilters
    * const dashboardFilters = await prisma.dashboardFilter.findMany()
    * ```
    */
  get dashboardFilter(): Prisma.DashboardFilterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.globalFilter`: Exposes CRUD operations for the **GlobalFilter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GlobalFilters
    * const globalFilters = await prisma.globalFilter.findMany()
    * ```
    */
  get globalFilter(): Prisma.GlobalFilterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.globalFilterOverride`: Exposes CRUD operations for the **GlobalFilterOverride** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GlobalFilterOverrides
    * const globalFilterOverrides = await prisma.globalFilterOverride.findMany()
    * ```
    */
  get globalFilterOverride(): Prisma.GlobalFilterOverrideDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.2
   * Query Engine version: 94a226be1cf2967af2541cca5529f0f7ba866919
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    AuditLog: 'AuditLog',
    MetaData: 'MetaData',
    DbConnection: 'DbConnection',
    AiProvider: 'AiProvider',
    Chart: 'Chart',
    Dashboard: 'Dashboard',
    DashboardChart: 'DashboardChart',
    DashboardFilter: 'DashboardFilter',
    GlobalFilter: 'GlobalFilter',
    GlobalFilterOverride: 'GlobalFilterOverride'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "auditLog" | "metaData" | "dbConnection" | "aiProvider" | "chart" | "dashboard" | "dashboardChart" | "dashboardFilter" | "globalFilter" | "globalFilterOverride"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      MetaData: {
        payload: Prisma.$MetaDataPayload<ExtArgs>
        fields: Prisma.MetaDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MetaDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MetaDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaDataPayload>
          }
          findFirst: {
            args: Prisma.MetaDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MetaDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaDataPayload>
          }
          findMany: {
            args: Prisma.MetaDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaDataPayload>[]
          }
          create: {
            args: Prisma.MetaDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaDataPayload>
          }
          createMany: {
            args: Prisma.MetaDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MetaDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaDataPayload>
          }
          update: {
            args: Prisma.MetaDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaDataPayload>
          }
          deleteMany: {
            args: Prisma.MetaDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MetaDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MetaDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetaDataPayload>
          }
          aggregate: {
            args: Prisma.MetaDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMetaData>
          }
          groupBy: {
            args: Prisma.MetaDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<MetaDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.MetaDataCountArgs<ExtArgs>
            result: $Utils.Optional<MetaDataCountAggregateOutputType> | number
          }
        }
      }
      DbConnection: {
        payload: Prisma.$DbConnectionPayload<ExtArgs>
        fields: Prisma.DbConnectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DbConnectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbConnectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DbConnectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbConnectionPayload>
          }
          findFirst: {
            args: Prisma.DbConnectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbConnectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DbConnectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbConnectionPayload>
          }
          findMany: {
            args: Prisma.DbConnectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbConnectionPayload>[]
          }
          create: {
            args: Prisma.DbConnectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbConnectionPayload>
          }
          createMany: {
            args: Prisma.DbConnectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.DbConnectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbConnectionPayload>
          }
          update: {
            args: Prisma.DbConnectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbConnectionPayload>
          }
          deleteMany: {
            args: Prisma.DbConnectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DbConnectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DbConnectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbConnectionPayload>
          }
          aggregate: {
            args: Prisma.DbConnectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDbConnection>
          }
          groupBy: {
            args: Prisma.DbConnectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DbConnectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DbConnectionCountArgs<ExtArgs>
            result: $Utils.Optional<DbConnectionCountAggregateOutputType> | number
          }
        }
      }
      AiProvider: {
        payload: Prisma.$AiProviderPayload<ExtArgs>
        fields: Prisma.AiProviderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiProviderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiProviderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiProviderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiProviderPayload>
          }
          findFirst: {
            args: Prisma.AiProviderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiProviderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiProviderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiProviderPayload>
          }
          findMany: {
            args: Prisma.AiProviderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiProviderPayload>[]
          }
          create: {
            args: Prisma.AiProviderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiProviderPayload>
          }
          createMany: {
            args: Prisma.AiProviderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AiProviderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiProviderPayload>
          }
          update: {
            args: Prisma.AiProviderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiProviderPayload>
          }
          deleteMany: {
            args: Prisma.AiProviderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiProviderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AiProviderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiProviderPayload>
          }
          aggregate: {
            args: Prisma.AiProviderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiProvider>
          }
          groupBy: {
            args: Prisma.AiProviderGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiProviderGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiProviderCountArgs<ExtArgs>
            result: $Utils.Optional<AiProviderCountAggregateOutputType> | number
          }
        }
      }
      Chart: {
        payload: Prisma.$ChartPayload<ExtArgs>
        fields: Prisma.ChartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload>
          }
          findFirst: {
            args: Prisma.ChartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload>
          }
          findMany: {
            args: Prisma.ChartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload>[]
          }
          create: {
            args: Prisma.ChartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload>
          }
          createMany: {
            args: Prisma.ChartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ChartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload>
          }
          update: {
            args: Prisma.ChartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload>
          }
          deleteMany: {
            args: Prisma.ChartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ChartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChartPayload>
          }
          aggregate: {
            args: Prisma.ChartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChart>
          }
          groupBy: {
            args: Prisma.ChartGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChartGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChartCountArgs<ExtArgs>
            result: $Utils.Optional<ChartCountAggregateOutputType> | number
          }
        }
      }
      Dashboard: {
        payload: Prisma.$DashboardPayload<ExtArgs>
        fields: Prisma.DashboardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DashboardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DashboardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardPayload>
          }
          findFirst: {
            args: Prisma.DashboardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DashboardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardPayload>
          }
          findMany: {
            args: Prisma.DashboardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardPayload>[]
          }
          create: {
            args: Prisma.DashboardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardPayload>
          }
          createMany: {
            args: Prisma.DashboardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.DashboardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardPayload>
          }
          update: {
            args: Prisma.DashboardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardPayload>
          }
          deleteMany: {
            args: Prisma.DashboardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DashboardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DashboardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardPayload>
          }
          aggregate: {
            args: Prisma.DashboardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDashboard>
          }
          groupBy: {
            args: Prisma.DashboardGroupByArgs<ExtArgs>
            result: $Utils.Optional<DashboardGroupByOutputType>[]
          }
          count: {
            args: Prisma.DashboardCountArgs<ExtArgs>
            result: $Utils.Optional<DashboardCountAggregateOutputType> | number
          }
        }
      }
      DashboardChart: {
        payload: Prisma.$DashboardChartPayload<ExtArgs>
        fields: Prisma.DashboardChartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DashboardChartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardChartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DashboardChartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardChartPayload>
          }
          findFirst: {
            args: Prisma.DashboardChartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardChartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DashboardChartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardChartPayload>
          }
          findMany: {
            args: Prisma.DashboardChartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardChartPayload>[]
          }
          create: {
            args: Prisma.DashboardChartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardChartPayload>
          }
          createMany: {
            args: Prisma.DashboardChartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.DashboardChartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardChartPayload>
          }
          update: {
            args: Prisma.DashboardChartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardChartPayload>
          }
          deleteMany: {
            args: Prisma.DashboardChartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DashboardChartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DashboardChartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardChartPayload>
          }
          aggregate: {
            args: Prisma.DashboardChartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDashboardChart>
          }
          groupBy: {
            args: Prisma.DashboardChartGroupByArgs<ExtArgs>
            result: $Utils.Optional<DashboardChartGroupByOutputType>[]
          }
          count: {
            args: Prisma.DashboardChartCountArgs<ExtArgs>
            result: $Utils.Optional<DashboardChartCountAggregateOutputType> | number
          }
        }
      }
      DashboardFilter: {
        payload: Prisma.$DashboardFilterPayload<ExtArgs>
        fields: Prisma.DashboardFilterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DashboardFilterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardFilterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DashboardFilterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardFilterPayload>
          }
          findFirst: {
            args: Prisma.DashboardFilterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardFilterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DashboardFilterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardFilterPayload>
          }
          findMany: {
            args: Prisma.DashboardFilterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardFilterPayload>[]
          }
          create: {
            args: Prisma.DashboardFilterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardFilterPayload>
          }
          createMany: {
            args: Prisma.DashboardFilterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.DashboardFilterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardFilterPayload>
          }
          update: {
            args: Prisma.DashboardFilterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardFilterPayload>
          }
          deleteMany: {
            args: Prisma.DashboardFilterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DashboardFilterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DashboardFilterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DashboardFilterPayload>
          }
          aggregate: {
            args: Prisma.DashboardFilterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDashboardFilter>
          }
          groupBy: {
            args: Prisma.DashboardFilterGroupByArgs<ExtArgs>
            result: $Utils.Optional<DashboardFilterGroupByOutputType>[]
          }
          count: {
            args: Prisma.DashboardFilterCountArgs<ExtArgs>
            result: $Utils.Optional<DashboardFilterCountAggregateOutputType> | number
          }
        }
      }
      GlobalFilter: {
        payload: Prisma.$GlobalFilterPayload<ExtArgs>
        fields: Prisma.GlobalFilterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GlobalFilterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalFilterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GlobalFilterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalFilterPayload>
          }
          findFirst: {
            args: Prisma.GlobalFilterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalFilterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GlobalFilterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalFilterPayload>
          }
          findMany: {
            args: Prisma.GlobalFilterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalFilterPayload>[]
          }
          create: {
            args: Prisma.GlobalFilterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalFilterPayload>
          }
          createMany: {
            args: Prisma.GlobalFilterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.GlobalFilterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalFilterPayload>
          }
          update: {
            args: Prisma.GlobalFilterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalFilterPayload>
          }
          deleteMany: {
            args: Prisma.GlobalFilterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GlobalFilterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GlobalFilterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalFilterPayload>
          }
          aggregate: {
            args: Prisma.GlobalFilterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGlobalFilter>
          }
          groupBy: {
            args: Prisma.GlobalFilterGroupByArgs<ExtArgs>
            result: $Utils.Optional<GlobalFilterGroupByOutputType>[]
          }
          count: {
            args: Prisma.GlobalFilterCountArgs<ExtArgs>
            result: $Utils.Optional<GlobalFilterCountAggregateOutputType> | number
          }
        }
      }
      GlobalFilterOverride: {
        payload: Prisma.$GlobalFilterOverridePayload<ExtArgs>
        fields: Prisma.GlobalFilterOverrideFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GlobalFilterOverrideFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalFilterOverridePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GlobalFilterOverrideFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalFilterOverridePayload>
          }
          findFirst: {
            args: Prisma.GlobalFilterOverrideFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalFilterOverridePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GlobalFilterOverrideFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalFilterOverridePayload>
          }
          findMany: {
            args: Prisma.GlobalFilterOverrideFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalFilterOverridePayload>[]
          }
          create: {
            args: Prisma.GlobalFilterOverrideCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalFilterOverridePayload>
          }
          createMany: {
            args: Prisma.GlobalFilterOverrideCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.GlobalFilterOverrideDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalFilterOverridePayload>
          }
          update: {
            args: Prisma.GlobalFilterOverrideUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalFilterOverridePayload>
          }
          deleteMany: {
            args: Prisma.GlobalFilterOverrideDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GlobalFilterOverrideUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GlobalFilterOverrideUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GlobalFilterOverridePayload>
          }
          aggregate: {
            args: Prisma.GlobalFilterOverrideAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGlobalFilterOverride>
          }
          groupBy: {
            args: Prisma.GlobalFilterOverrideGroupByArgs<ExtArgs>
            result: $Utils.Optional<GlobalFilterOverrideGroupByOutputType>[]
          }
          count: {
            args: Prisma.GlobalFilterOverrideCountArgs<ExtArgs>
            result: $Utils.Optional<GlobalFilterOverrideCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    auditLog?: AuditLogOmit
    metaData?: MetaDataOmit
    dbConnection?: DbConnectionOmit
    aiProvider?: AiProviderOmit
    chart?: ChartOmit
    dashboard?: DashboardOmit
    dashboardChart?: DashboardChartOmit
    dashboardFilter?: DashboardFilterOmit
    globalFilter?: GlobalFilterOmit
    globalFilterOverride?: GlobalFilterOverrideOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DbConnectionCountOutputType
   */

  export type DbConnectionCountOutputType = {
    charts: number
    dashboardFilters: number
  }

  export type DbConnectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    charts?: boolean | DbConnectionCountOutputTypeCountChartsArgs
    dashboardFilters?: boolean | DbConnectionCountOutputTypeCountDashboardFiltersArgs
  }

  // Custom InputTypes
  /**
   * DbConnectionCountOutputType without action
   */
  export type DbConnectionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbConnectionCountOutputType
     */
    select?: DbConnectionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DbConnectionCountOutputType without action
   */
  export type DbConnectionCountOutputTypeCountChartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChartWhereInput
  }

  /**
   * DbConnectionCountOutputType without action
   */
  export type DbConnectionCountOutputTypeCountDashboardFiltersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DashboardFilterWhereInput
  }


  /**
   * Count Type ChartCountOutputType
   */

  export type ChartCountOutputType = {
    dashboardCharts: number
  }

  export type ChartCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dashboardCharts?: boolean | ChartCountOutputTypeCountDashboardChartsArgs
  }

  // Custom InputTypes
  /**
   * ChartCountOutputType without action
   */
  export type ChartCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChartCountOutputType
     */
    select?: ChartCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChartCountOutputType without action
   */
  export type ChartCountOutputTypeCountDashboardChartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DashboardChartWhereInput
  }


  /**
   * Count Type DashboardCountOutputType
   */

  export type DashboardCountOutputType = {
    dashboardCharts: number
    dashboardFilters: number
    globalFilterOverrides: number
  }

  export type DashboardCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dashboardCharts?: boolean | DashboardCountOutputTypeCountDashboardChartsArgs
    dashboardFilters?: boolean | DashboardCountOutputTypeCountDashboardFiltersArgs
    globalFilterOverrides?: boolean | DashboardCountOutputTypeCountGlobalFilterOverridesArgs
  }

  // Custom InputTypes
  /**
   * DashboardCountOutputType without action
   */
  export type DashboardCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardCountOutputType
     */
    select?: DashboardCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DashboardCountOutputType without action
   */
  export type DashboardCountOutputTypeCountDashboardChartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DashboardChartWhereInput
  }

  /**
   * DashboardCountOutputType without action
   */
  export type DashboardCountOutputTypeCountDashboardFiltersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DashboardFilterWhereInput
  }

  /**
   * DashboardCountOutputType without action
   */
  export type DashboardCountOutputTypeCountGlobalFilterOverridesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GlobalFilterOverrideWhereInput
  }


  /**
   * Count Type GlobalFilterCountOutputType
   */

  export type GlobalFilterCountOutputType = {
    overrides: number
  }

  export type GlobalFilterCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    overrides?: boolean | GlobalFilterCountOutputTypeCountOverridesArgs
  }

  // Custom InputTypes
  /**
   * GlobalFilterCountOutputType without action
   */
  export type GlobalFilterCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilterCountOutputType
     */
    select?: GlobalFilterCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GlobalFilterCountOutputType without action
   */
  export type GlobalFilterCountOutputTypeCountOverridesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GlobalFilterOverrideWhereInput
  }


  /**
   * Models
   */

  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    action: string | null
    operation: string | null
    tableName: string | null
    recordId: string | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    action: string | null
    operation: string | null
    tableName: string | null
    recordId: string | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    action: number
    operation: number
    tableName: number
    recordId: number
    oldValue: number
    newValue: number
    createdBy: number
    createdAt: number
    createdIp: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    action?: true
    operation?: true
    tableName?: true
    recordId?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    action?: true
    operation?: true
    tableName?: true
    recordId?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    action?: true
    operation?: true
    tableName?: true
    recordId?: true
    oldValue?: true
    newValue?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    action: string | null
    operation: string | null
    tableName: string | null
    recordId: string | null
    oldValue: JsonValue | null
    newValue: JsonValue | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    operation?: boolean
    tableName?: boolean
    recordId?: boolean
    oldValue?: boolean
    newValue?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
  }, ExtArgs["result"]["auditLog"]>



  export type AuditLogSelectScalar = {
    id?: boolean
    action?: boolean
    operation?: boolean
    tableName?: boolean
    recordId?: boolean
    oldValue?: boolean
    newValue?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "action" | "operation" | "tableName" | "recordId" | "oldValue" | "newValue" | "createdBy" | "createdAt" | "createdIp", ExtArgs["result"]["auditLog"]>

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      action: string | null
      operation: string | null
      tableName: string | null
      recordId: string | null
      oldValue: Prisma.JsonValue | null
      newValue: Prisma.JsonValue | null
      createdBy: string | null
      createdAt: Date | null
      createdIp: string | null
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly operation: FieldRef<"AuditLog", 'String'>
    readonly tableName: FieldRef<"AuditLog", 'String'>
    readonly recordId: FieldRef<"AuditLog", 'String'>
    readonly oldValue: FieldRef<"AuditLog", 'Json'>
    readonly newValue: FieldRef<"AuditLog", 'Json'>
    readonly createdBy: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
    readonly createdIp: FieldRef<"AuditLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data?: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
  }


  /**
   * Model MetaData
   */

  export type AggregateMetaData = {
    _count: MetaDataCountAggregateOutputType | null
    _min: MetaDataMinAggregateOutputType | null
    _max: MetaDataMaxAggregateOutputType | null
  }

  export type MetaDataMinAggregateOutputType = {
    id: string | null
    name: string | null
    desc: string | null
    type: string | null
  }

  export type MetaDataMaxAggregateOutputType = {
    id: string | null
    name: string | null
    desc: string | null
    type: string | null
  }

  export type MetaDataCountAggregateOutputType = {
    id: number
    name: number
    desc: number
    type: number
    _all: number
  }


  export type MetaDataMinAggregateInputType = {
    id?: true
    name?: true
    desc?: true
    type?: true
  }

  export type MetaDataMaxAggregateInputType = {
    id?: true
    name?: true
    desc?: true
    type?: true
  }

  export type MetaDataCountAggregateInputType = {
    id?: true
    name?: true
    desc?: true
    type?: true
    _all?: true
  }

  export type MetaDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetaData to aggregate.
     */
    where?: MetaDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaData to fetch.
     */
    orderBy?: MetaDataOrderByWithRelationInput | MetaDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MetaDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MetaData
    **/
    _count?: true | MetaDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MetaDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MetaDataMaxAggregateInputType
  }

  export type GetMetaDataAggregateType<T extends MetaDataAggregateArgs> = {
        [P in keyof T & keyof AggregateMetaData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMetaData[P]>
      : GetScalarType<T[P], AggregateMetaData[P]>
  }




  export type MetaDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MetaDataWhereInput
    orderBy?: MetaDataOrderByWithAggregationInput | MetaDataOrderByWithAggregationInput[]
    by: MetaDataScalarFieldEnum[] | MetaDataScalarFieldEnum
    having?: MetaDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MetaDataCountAggregateInputType | true
    _min?: MetaDataMinAggregateInputType
    _max?: MetaDataMaxAggregateInputType
  }

  export type MetaDataGroupByOutputType = {
    id: string
    name: string
    desc: string | null
    type: string
    _count: MetaDataCountAggregateOutputType | null
    _min: MetaDataMinAggregateOutputType | null
    _max: MetaDataMaxAggregateOutputType | null
  }

  type GetMetaDataGroupByPayload<T extends MetaDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MetaDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MetaDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MetaDataGroupByOutputType[P]>
            : GetScalarType<T[P], MetaDataGroupByOutputType[P]>
        }
      >
    >


  export type MetaDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    desc?: boolean
    type?: boolean
  }, ExtArgs["result"]["metaData"]>



  export type MetaDataSelectScalar = {
    id?: boolean
    name?: boolean
    desc?: boolean
    type?: boolean
  }

  export type MetaDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "desc" | "type", ExtArgs["result"]["metaData"]>

  export type $MetaDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MetaData"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      desc: string | null
      type: string
    }, ExtArgs["result"]["metaData"]>
    composites: {}
  }

  type MetaDataGetPayload<S extends boolean | null | undefined | MetaDataDefaultArgs> = $Result.GetResult<Prisma.$MetaDataPayload, S>

  type MetaDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MetaDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MetaDataCountAggregateInputType | true
    }

  export interface MetaDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MetaData'], meta: { name: 'MetaData' } }
    /**
     * Find zero or one MetaData that matches the filter.
     * @param {MetaDataFindUniqueArgs} args - Arguments to find a MetaData
     * @example
     * // Get one MetaData
     * const metaData = await prisma.metaData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MetaDataFindUniqueArgs>(args: SelectSubset<T, MetaDataFindUniqueArgs<ExtArgs>>): Prisma__MetaDataClient<$Result.GetResult<Prisma.$MetaDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MetaData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MetaDataFindUniqueOrThrowArgs} args - Arguments to find a MetaData
     * @example
     * // Get one MetaData
     * const metaData = await prisma.metaData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MetaDataFindUniqueOrThrowArgs>(args: SelectSubset<T, MetaDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MetaDataClient<$Result.GetResult<Prisma.$MetaDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MetaData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaDataFindFirstArgs} args - Arguments to find a MetaData
     * @example
     * // Get one MetaData
     * const metaData = await prisma.metaData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MetaDataFindFirstArgs>(args?: SelectSubset<T, MetaDataFindFirstArgs<ExtArgs>>): Prisma__MetaDataClient<$Result.GetResult<Prisma.$MetaDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MetaData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaDataFindFirstOrThrowArgs} args - Arguments to find a MetaData
     * @example
     * // Get one MetaData
     * const metaData = await prisma.metaData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MetaDataFindFirstOrThrowArgs>(args?: SelectSubset<T, MetaDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__MetaDataClient<$Result.GetResult<Prisma.$MetaDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MetaData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MetaData
     * const metaData = await prisma.metaData.findMany()
     * 
     * // Get first 10 MetaData
     * const metaData = await prisma.metaData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const metaDataWithIdOnly = await prisma.metaData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MetaDataFindManyArgs>(args?: SelectSubset<T, MetaDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetaDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MetaData.
     * @param {MetaDataCreateArgs} args - Arguments to create a MetaData.
     * @example
     * // Create one MetaData
     * const MetaData = await prisma.metaData.create({
     *   data: {
     *     // ... data to create a MetaData
     *   }
     * })
     * 
     */
    create<T extends MetaDataCreateArgs>(args: SelectSubset<T, MetaDataCreateArgs<ExtArgs>>): Prisma__MetaDataClient<$Result.GetResult<Prisma.$MetaDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MetaData.
     * @param {MetaDataCreateManyArgs} args - Arguments to create many MetaData.
     * @example
     * // Create many MetaData
     * const metaData = await prisma.metaData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MetaDataCreateManyArgs>(args?: SelectSubset<T, MetaDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MetaData.
     * @param {MetaDataDeleteArgs} args - Arguments to delete one MetaData.
     * @example
     * // Delete one MetaData
     * const MetaData = await prisma.metaData.delete({
     *   where: {
     *     // ... filter to delete one MetaData
     *   }
     * })
     * 
     */
    delete<T extends MetaDataDeleteArgs>(args: SelectSubset<T, MetaDataDeleteArgs<ExtArgs>>): Prisma__MetaDataClient<$Result.GetResult<Prisma.$MetaDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MetaData.
     * @param {MetaDataUpdateArgs} args - Arguments to update one MetaData.
     * @example
     * // Update one MetaData
     * const metaData = await prisma.metaData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MetaDataUpdateArgs>(args: SelectSubset<T, MetaDataUpdateArgs<ExtArgs>>): Prisma__MetaDataClient<$Result.GetResult<Prisma.$MetaDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MetaData.
     * @param {MetaDataDeleteManyArgs} args - Arguments to filter MetaData to delete.
     * @example
     * // Delete a few MetaData
     * const { count } = await prisma.metaData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MetaDataDeleteManyArgs>(args?: SelectSubset<T, MetaDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MetaData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MetaData
     * const metaData = await prisma.metaData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MetaDataUpdateManyArgs>(args: SelectSubset<T, MetaDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MetaData.
     * @param {MetaDataUpsertArgs} args - Arguments to update or create a MetaData.
     * @example
     * // Update or create a MetaData
     * const metaData = await prisma.metaData.upsert({
     *   create: {
     *     // ... data to create a MetaData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MetaData we want to update
     *   }
     * })
     */
    upsert<T extends MetaDataUpsertArgs>(args: SelectSubset<T, MetaDataUpsertArgs<ExtArgs>>): Prisma__MetaDataClient<$Result.GetResult<Prisma.$MetaDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MetaData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaDataCountArgs} args - Arguments to filter MetaData to count.
     * @example
     * // Count the number of MetaData
     * const count = await prisma.metaData.count({
     *   where: {
     *     // ... the filter for the MetaData we want to count
     *   }
     * })
    **/
    count<T extends MetaDataCountArgs>(
      args?: Subset<T, MetaDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MetaDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MetaData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MetaDataAggregateArgs>(args: Subset<T, MetaDataAggregateArgs>): Prisma.PrismaPromise<GetMetaDataAggregateType<T>>

    /**
     * Group by MetaData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetaDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MetaDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MetaDataGroupByArgs['orderBy'] }
        : { orderBy?: MetaDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MetaDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMetaDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MetaData model
   */
  readonly fields: MetaDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MetaData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MetaDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MetaData model
   */
  interface MetaDataFieldRefs {
    readonly id: FieldRef<"MetaData", 'String'>
    readonly name: FieldRef<"MetaData", 'String'>
    readonly desc: FieldRef<"MetaData", 'String'>
    readonly type: FieldRef<"MetaData", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MetaData findUnique
   */
  export type MetaDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaData
     */
    select?: MetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaData
     */
    omit?: MetaDataOmit<ExtArgs> | null
    /**
     * Filter, which MetaData to fetch.
     */
    where: MetaDataWhereUniqueInput
  }

  /**
   * MetaData findUniqueOrThrow
   */
  export type MetaDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaData
     */
    select?: MetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaData
     */
    omit?: MetaDataOmit<ExtArgs> | null
    /**
     * Filter, which MetaData to fetch.
     */
    where: MetaDataWhereUniqueInput
  }

  /**
   * MetaData findFirst
   */
  export type MetaDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaData
     */
    select?: MetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaData
     */
    omit?: MetaDataOmit<ExtArgs> | null
    /**
     * Filter, which MetaData to fetch.
     */
    where?: MetaDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaData to fetch.
     */
    orderBy?: MetaDataOrderByWithRelationInput | MetaDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetaData.
     */
    cursor?: MetaDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetaData.
     */
    distinct?: MetaDataScalarFieldEnum | MetaDataScalarFieldEnum[]
  }

  /**
   * MetaData findFirstOrThrow
   */
  export type MetaDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaData
     */
    select?: MetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaData
     */
    omit?: MetaDataOmit<ExtArgs> | null
    /**
     * Filter, which MetaData to fetch.
     */
    where?: MetaDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaData to fetch.
     */
    orderBy?: MetaDataOrderByWithRelationInput | MetaDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetaData.
     */
    cursor?: MetaDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetaData.
     */
    distinct?: MetaDataScalarFieldEnum | MetaDataScalarFieldEnum[]
  }

  /**
   * MetaData findMany
   */
  export type MetaDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaData
     */
    select?: MetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaData
     */
    omit?: MetaDataOmit<ExtArgs> | null
    /**
     * Filter, which MetaData to fetch.
     */
    where?: MetaDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetaData to fetch.
     */
    orderBy?: MetaDataOrderByWithRelationInput | MetaDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MetaData.
     */
    cursor?: MetaDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetaData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetaData.
     */
    skip?: number
    distinct?: MetaDataScalarFieldEnum | MetaDataScalarFieldEnum[]
  }

  /**
   * MetaData create
   */
  export type MetaDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaData
     */
    select?: MetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaData
     */
    omit?: MetaDataOmit<ExtArgs> | null
    /**
     * The data needed to create a MetaData.
     */
    data: XOR<MetaDataCreateInput, MetaDataUncheckedCreateInput>
  }

  /**
   * MetaData createMany
   */
  export type MetaDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MetaData.
     */
    data: MetaDataCreateManyInput | MetaDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MetaData update
   */
  export type MetaDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaData
     */
    select?: MetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaData
     */
    omit?: MetaDataOmit<ExtArgs> | null
    /**
     * The data needed to update a MetaData.
     */
    data: XOR<MetaDataUpdateInput, MetaDataUncheckedUpdateInput>
    /**
     * Choose, which MetaData to update.
     */
    where: MetaDataWhereUniqueInput
  }

  /**
   * MetaData updateMany
   */
  export type MetaDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MetaData.
     */
    data: XOR<MetaDataUpdateManyMutationInput, MetaDataUncheckedUpdateManyInput>
    /**
     * Filter which MetaData to update
     */
    where?: MetaDataWhereInput
    /**
     * Limit how many MetaData to update.
     */
    limit?: number
  }

  /**
   * MetaData upsert
   */
  export type MetaDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaData
     */
    select?: MetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaData
     */
    omit?: MetaDataOmit<ExtArgs> | null
    /**
     * The filter to search for the MetaData to update in case it exists.
     */
    where: MetaDataWhereUniqueInput
    /**
     * In case the MetaData found by the `where` argument doesn't exist, create a new MetaData with this data.
     */
    create: XOR<MetaDataCreateInput, MetaDataUncheckedCreateInput>
    /**
     * In case the MetaData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MetaDataUpdateInput, MetaDataUncheckedUpdateInput>
  }

  /**
   * MetaData delete
   */
  export type MetaDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaData
     */
    select?: MetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaData
     */
    omit?: MetaDataOmit<ExtArgs> | null
    /**
     * Filter which MetaData to delete.
     */
    where: MetaDataWhereUniqueInput
  }

  /**
   * MetaData deleteMany
   */
  export type MetaDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetaData to delete
     */
    where?: MetaDataWhereInput
    /**
     * Limit how many MetaData to delete.
     */
    limit?: number
  }

  /**
   * MetaData without action
   */
  export type MetaDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetaData
     */
    select?: MetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetaData
     */
    omit?: MetaDataOmit<ExtArgs> | null
  }


  /**
   * Model DbConnection
   */

  export type AggregateDbConnection = {
    _count: DbConnectionCountAggregateOutputType | null
    _avg: DbConnectionAvgAggregateOutputType | null
    _sum: DbConnectionSumAggregateOutputType | null
    _min: DbConnectionMinAggregateOutputType | null
    _max: DbConnectionMaxAggregateOutputType | null
  }

  export type DbConnectionAvgAggregateOutputType = {
    port: number | null
  }

  export type DbConnectionSumAggregateOutputType = {
    port: number | null
  }

  export type DbConnectionMinAggregateOutputType = {
    id: string | null
    name: string | null
    dbType: $Enums.DbType | null
    host: string | null
    port: number | null
    databaseName: string | null
    username: string | null
    encryptedPassword: string | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type DbConnectionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    dbType: $Enums.DbType | null
    host: string | null
    port: number | null
    databaseName: string | null
    username: string | null
    encryptedPassword: string | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type DbConnectionCountAggregateOutputType = {
    id: number
    name: number
    dbType: number
    host: number
    port: number
    databaseName: number
    username: number
    encryptedPassword: number
    createdBy: number
    createdAt: number
    createdIp: number
    updatedBy: number
    updatedAt: number
    updatedIp: number
    _all: number
  }


  export type DbConnectionAvgAggregateInputType = {
    port?: true
  }

  export type DbConnectionSumAggregateInputType = {
    port?: true
  }

  export type DbConnectionMinAggregateInputType = {
    id?: true
    name?: true
    dbType?: true
    host?: true
    port?: true
    databaseName?: true
    username?: true
    encryptedPassword?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type DbConnectionMaxAggregateInputType = {
    id?: true
    name?: true
    dbType?: true
    host?: true
    port?: true
    databaseName?: true
    username?: true
    encryptedPassword?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type DbConnectionCountAggregateInputType = {
    id?: true
    name?: true
    dbType?: true
    host?: true
    port?: true
    databaseName?: true
    username?: true
    encryptedPassword?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
    _all?: true
  }

  export type DbConnectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DbConnection to aggregate.
     */
    where?: DbConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbConnections to fetch.
     */
    orderBy?: DbConnectionOrderByWithRelationInput | DbConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DbConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DbConnections
    **/
    _count?: true | DbConnectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DbConnectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DbConnectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DbConnectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DbConnectionMaxAggregateInputType
  }

  export type GetDbConnectionAggregateType<T extends DbConnectionAggregateArgs> = {
        [P in keyof T & keyof AggregateDbConnection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDbConnection[P]>
      : GetScalarType<T[P], AggregateDbConnection[P]>
  }




  export type DbConnectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DbConnectionWhereInput
    orderBy?: DbConnectionOrderByWithAggregationInput | DbConnectionOrderByWithAggregationInput[]
    by: DbConnectionScalarFieldEnum[] | DbConnectionScalarFieldEnum
    having?: DbConnectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DbConnectionCountAggregateInputType | true
    _avg?: DbConnectionAvgAggregateInputType
    _sum?: DbConnectionSumAggregateInputType
    _min?: DbConnectionMinAggregateInputType
    _max?: DbConnectionMaxAggregateInputType
  }

  export type DbConnectionGroupByOutputType = {
    id: string
    name: string
    dbType: $Enums.DbType
    host: string
    port: number
    databaseName: string
    username: string
    encryptedPassword: string
    createdBy: string | null
    createdAt: Date
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
    _count: DbConnectionCountAggregateOutputType | null
    _avg: DbConnectionAvgAggregateOutputType | null
    _sum: DbConnectionSumAggregateOutputType | null
    _min: DbConnectionMinAggregateOutputType | null
    _max: DbConnectionMaxAggregateOutputType | null
  }

  type GetDbConnectionGroupByPayload<T extends DbConnectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DbConnectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DbConnectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DbConnectionGroupByOutputType[P]>
            : GetScalarType<T[P], DbConnectionGroupByOutputType[P]>
        }
      >
    >


  export type DbConnectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    dbType?: boolean
    host?: boolean
    port?: boolean
    databaseName?: boolean
    username?: boolean
    encryptedPassword?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
    charts?: boolean | DbConnection$chartsArgs<ExtArgs>
    dashboardFilters?: boolean | DbConnection$dashboardFiltersArgs<ExtArgs>
    _count?: boolean | DbConnectionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dbConnection"]>



  export type DbConnectionSelectScalar = {
    id?: boolean
    name?: boolean
    dbType?: boolean
    host?: boolean
    port?: boolean
    databaseName?: boolean
    username?: boolean
    encryptedPassword?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
  }

  export type DbConnectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "dbType" | "host" | "port" | "databaseName" | "username" | "encryptedPassword" | "createdBy" | "createdAt" | "createdIp" | "updatedBy" | "updatedAt" | "updatedIp", ExtArgs["result"]["dbConnection"]>
  export type DbConnectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    charts?: boolean | DbConnection$chartsArgs<ExtArgs>
    dashboardFilters?: boolean | DbConnection$dashboardFiltersArgs<ExtArgs>
    _count?: boolean | DbConnectionCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $DbConnectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DbConnection"
    objects: {
      charts: Prisma.$ChartPayload<ExtArgs>[]
      dashboardFilters: Prisma.$DashboardFilterPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      dbType: $Enums.DbType
      host: string
      port: number
      databaseName: string
      username: string
      encryptedPassword: string
      createdBy: string | null
      createdAt: Date
      createdIp: string | null
      updatedBy: string | null
      updatedAt: Date | null
      updatedIp: string | null
    }, ExtArgs["result"]["dbConnection"]>
    composites: {}
  }

  type DbConnectionGetPayload<S extends boolean | null | undefined | DbConnectionDefaultArgs> = $Result.GetResult<Prisma.$DbConnectionPayload, S>

  type DbConnectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DbConnectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DbConnectionCountAggregateInputType | true
    }

  export interface DbConnectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DbConnection'], meta: { name: 'DbConnection' } }
    /**
     * Find zero or one DbConnection that matches the filter.
     * @param {DbConnectionFindUniqueArgs} args - Arguments to find a DbConnection
     * @example
     * // Get one DbConnection
     * const dbConnection = await prisma.dbConnection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DbConnectionFindUniqueArgs>(args: SelectSubset<T, DbConnectionFindUniqueArgs<ExtArgs>>): Prisma__DbConnectionClient<$Result.GetResult<Prisma.$DbConnectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DbConnection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DbConnectionFindUniqueOrThrowArgs} args - Arguments to find a DbConnection
     * @example
     * // Get one DbConnection
     * const dbConnection = await prisma.dbConnection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DbConnectionFindUniqueOrThrowArgs>(args: SelectSubset<T, DbConnectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DbConnectionClient<$Result.GetResult<Prisma.$DbConnectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DbConnection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbConnectionFindFirstArgs} args - Arguments to find a DbConnection
     * @example
     * // Get one DbConnection
     * const dbConnection = await prisma.dbConnection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DbConnectionFindFirstArgs>(args?: SelectSubset<T, DbConnectionFindFirstArgs<ExtArgs>>): Prisma__DbConnectionClient<$Result.GetResult<Prisma.$DbConnectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DbConnection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbConnectionFindFirstOrThrowArgs} args - Arguments to find a DbConnection
     * @example
     * // Get one DbConnection
     * const dbConnection = await prisma.dbConnection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DbConnectionFindFirstOrThrowArgs>(args?: SelectSubset<T, DbConnectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DbConnectionClient<$Result.GetResult<Prisma.$DbConnectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DbConnections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbConnectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DbConnections
     * const dbConnections = await prisma.dbConnection.findMany()
     * 
     * // Get first 10 DbConnections
     * const dbConnections = await prisma.dbConnection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dbConnectionWithIdOnly = await prisma.dbConnection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DbConnectionFindManyArgs>(args?: SelectSubset<T, DbConnectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DbConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DbConnection.
     * @param {DbConnectionCreateArgs} args - Arguments to create a DbConnection.
     * @example
     * // Create one DbConnection
     * const DbConnection = await prisma.dbConnection.create({
     *   data: {
     *     // ... data to create a DbConnection
     *   }
     * })
     * 
     */
    create<T extends DbConnectionCreateArgs>(args: SelectSubset<T, DbConnectionCreateArgs<ExtArgs>>): Prisma__DbConnectionClient<$Result.GetResult<Prisma.$DbConnectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DbConnections.
     * @param {DbConnectionCreateManyArgs} args - Arguments to create many DbConnections.
     * @example
     * // Create many DbConnections
     * const dbConnection = await prisma.dbConnection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DbConnectionCreateManyArgs>(args?: SelectSubset<T, DbConnectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a DbConnection.
     * @param {DbConnectionDeleteArgs} args - Arguments to delete one DbConnection.
     * @example
     * // Delete one DbConnection
     * const DbConnection = await prisma.dbConnection.delete({
     *   where: {
     *     // ... filter to delete one DbConnection
     *   }
     * })
     * 
     */
    delete<T extends DbConnectionDeleteArgs>(args: SelectSubset<T, DbConnectionDeleteArgs<ExtArgs>>): Prisma__DbConnectionClient<$Result.GetResult<Prisma.$DbConnectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DbConnection.
     * @param {DbConnectionUpdateArgs} args - Arguments to update one DbConnection.
     * @example
     * // Update one DbConnection
     * const dbConnection = await prisma.dbConnection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DbConnectionUpdateArgs>(args: SelectSubset<T, DbConnectionUpdateArgs<ExtArgs>>): Prisma__DbConnectionClient<$Result.GetResult<Prisma.$DbConnectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DbConnections.
     * @param {DbConnectionDeleteManyArgs} args - Arguments to filter DbConnections to delete.
     * @example
     * // Delete a few DbConnections
     * const { count } = await prisma.dbConnection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DbConnectionDeleteManyArgs>(args?: SelectSubset<T, DbConnectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DbConnections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbConnectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DbConnections
     * const dbConnection = await prisma.dbConnection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DbConnectionUpdateManyArgs>(args: SelectSubset<T, DbConnectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DbConnection.
     * @param {DbConnectionUpsertArgs} args - Arguments to update or create a DbConnection.
     * @example
     * // Update or create a DbConnection
     * const dbConnection = await prisma.dbConnection.upsert({
     *   create: {
     *     // ... data to create a DbConnection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DbConnection we want to update
     *   }
     * })
     */
    upsert<T extends DbConnectionUpsertArgs>(args: SelectSubset<T, DbConnectionUpsertArgs<ExtArgs>>): Prisma__DbConnectionClient<$Result.GetResult<Prisma.$DbConnectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DbConnections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbConnectionCountArgs} args - Arguments to filter DbConnections to count.
     * @example
     * // Count the number of DbConnections
     * const count = await prisma.dbConnection.count({
     *   where: {
     *     // ... the filter for the DbConnections we want to count
     *   }
     * })
    **/
    count<T extends DbConnectionCountArgs>(
      args?: Subset<T, DbConnectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DbConnectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DbConnection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbConnectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DbConnectionAggregateArgs>(args: Subset<T, DbConnectionAggregateArgs>): Prisma.PrismaPromise<GetDbConnectionAggregateType<T>>

    /**
     * Group by DbConnection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbConnectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DbConnectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DbConnectionGroupByArgs['orderBy'] }
        : { orderBy?: DbConnectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DbConnectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDbConnectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DbConnection model
   */
  readonly fields: DbConnectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DbConnection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DbConnectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    charts<T extends DbConnection$chartsArgs<ExtArgs> = {}>(args?: Subset<T, DbConnection$chartsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dashboardFilters<T extends DbConnection$dashboardFiltersArgs<ExtArgs> = {}>(args?: Subset<T, DbConnection$dashboardFiltersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DashboardFilterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DbConnection model
   */
  interface DbConnectionFieldRefs {
    readonly id: FieldRef<"DbConnection", 'String'>
    readonly name: FieldRef<"DbConnection", 'String'>
    readonly dbType: FieldRef<"DbConnection", 'DbType'>
    readonly host: FieldRef<"DbConnection", 'String'>
    readonly port: FieldRef<"DbConnection", 'Int'>
    readonly databaseName: FieldRef<"DbConnection", 'String'>
    readonly username: FieldRef<"DbConnection", 'String'>
    readonly encryptedPassword: FieldRef<"DbConnection", 'String'>
    readonly createdBy: FieldRef<"DbConnection", 'String'>
    readonly createdAt: FieldRef<"DbConnection", 'DateTime'>
    readonly createdIp: FieldRef<"DbConnection", 'String'>
    readonly updatedBy: FieldRef<"DbConnection", 'String'>
    readonly updatedAt: FieldRef<"DbConnection", 'DateTime'>
    readonly updatedIp: FieldRef<"DbConnection", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DbConnection findUnique
   */
  export type DbConnectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbConnection
     */
    select?: DbConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbConnection
     */
    omit?: DbConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbConnectionInclude<ExtArgs> | null
    /**
     * Filter, which DbConnection to fetch.
     */
    where: DbConnectionWhereUniqueInput
  }

  /**
   * DbConnection findUniqueOrThrow
   */
  export type DbConnectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbConnection
     */
    select?: DbConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbConnection
     */
    omit?: DbConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbConnectionInclude<ExtArgs> | null
    /**
     * Filter, which DbConnection to fetch.
     */
    where: DbConnectionWhereUniqueInput
  }

  /**
   * DbConnection findFirst
   */
  export type DbConnectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbConnection
     */
    select?: DbConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbConnection
     */
    omit?: DbConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbConnectionInclude<ExtArgs> | null
    /**
     * Filter, which DbConnection to fetch.
     */
    where?: DbConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbConnections to fetch.
     */
    orderBy?: DbConnectionOrderByWithRelationInput | DbConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DbConnections.
     */
    cursor?: DbConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DbConnections.
     */
    distinct?: DbConnectionScalarFieldEnum | DbConnectionScalarFieldEnum[]
  }

  /**
   * DbConnection findFirstOrThrow
   */
  export type DbConnectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbConnection
     */
    select?: DbConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbConnection
     */
    omit?: DbConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbConnectionInclude<ExtArgs> | null
    /**
     * Filter, which DbConnection to fetch.
     */
    where?: DbConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbConnections to fetch.
     */
    orderBy?: DbConnectionOrderByWithRelationInput | DbConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DbConnections.
     */
    cursor?: DbConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DbConnections.
     */
    distinct?: DbConnectionScalarFieldEnum | DbConnectionScalarFieldEnum[]
  }

  /**
   * DbConnection findMany
   */
  export type DbConnectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbConnection
     */
    select?: DbConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbConnection
     */
    omit?: DbConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbConnectionInclude<ExtArgs> | null
    /**
     * Filter, which DbConnections to fetch.
     */
    where?: DbConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbConnections to fetch.
     */
    orderBy?: DbConnectionOrderByWithRelationInput | DbConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DbConnections.
     */
    cursor?: DbConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbConnections.
     */
    skip?: number
    distinct?: DbConnectionScalarFieldEnum | DbConnectionScalarFieldEnum[]
  }

  /**
   * DbConnection create
   */
  export type DbConnectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbConnection
     */
    select?: DbConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbConnection
     */
    omit?: DbConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbConnectionInclude<ExtArgs> | null
    /**
     * The data needed to create a DbConnection.
     */
    data: XOR<DbConnectionCreateInput, DbConnectionUncheckedCreateInput>
  }

  /**
   * DbConnection createMany
   */
  export type DbConnectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DbConnections.
     */
    data: DbConnectionCreateManyInput | DbConnectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DbConnection update
   */
  export type DbConnectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbConnection
     */
    select?: DbConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbConnection
     */
    omit?: DbConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbConnectionInclude<ExtArgs> | null
    /**
     * The data needed to update a DbConnection.
     */
    data: XOR<DbConnectionUpdateInput, DbConnectionUncheckedUpdateInput>
    /**
     * Choose, which DbConnection to update.
     */
    where: DbConnectionWhereUniqueInput
  }

  /**
   * DbConnection updateMany
   */
  export type DbConnectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DbConnections.
     */
    data: XOR<DbConnectionUpdateManyMutationInput, DbConnectionUncheckedUpdateManyInput>
    /**
     * Filter which DbConnections to update
     */
    where?: DbConnectionWhereInput
    /**
     * Limit how many DbConnections to update.
     */
    limit?: number
  }

  /**
   * DbConnection upsert
   */
  export type DbConnectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbConnection
     */
    select?: DbConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbConnection
     */
    omit?: DbConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbConnectionInclude<ExtArgs> | null
    /**
     * The filter to search for the DbConnection to update in case it exists.
     */
    where: DbConnectionWhereUniqueInput
    /**
     * In case the DbConnection found by the `where` argument doesn't exist, create a new DbConnection with this data.
     */
    create: XOR<DbConnectionCreateInput, DbConnectionUncheckedCreateInput>
    /**
     * In case the DbConnection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DbConnectionUpdateInput, DbConnectionUncheckedUpdateInput>
  }

  /**
   * DbConnection delete
   */
  export type DbConnectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbConnection
     */
    select?: DbConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbConnection
     */
    omit?: DbConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbConnectionInclude<ExtArgs> | null
    /**
     * Filter which DbConnection to delete.
     */
    where: DbConnectionWhereUniqueInput
  }

  /**
   * DbConnection deleteMany
   */
  export type DbConnectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DbConnections to delete
     */
    where?: DbConnectionWhereInput
    /**
     * Limit how many DbConnections to delete.
     */
    limit?: number
  }

  /**
   * DbConnection.charts
   */
  export type DbConnection$chartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChartInclude<ExtArgs> | null
    where?: ChartWhereInput
    orderBy?: ChartOrderByWithRelationInput | ChartOrderByWithRelationInput[]
    cursor?: ChartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChartScalarFieldEnum | ChartScalarFieldEnum[]
  }

  /**
   * DbConnection.dashboardFilters
   */
  export type DbConnection$dashboardFiltersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardFilter
     */
    select?: DashboardFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardFilter
     */
    omit?: DashboardFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardFilterInclude<ExtArgs> | null
    where?: DashboardFilterWhereInput
    orderBy?: DashboardFilterOrderByWithRelationInput | DashboardFilterOrderByWithRelationInput[]
    cursor?: DashboardFilterWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DashboardFilterScalarFieldEnum | DashboardFilterScalarFieldEnum[]
  }

  /**
   * DbConnection without action
   */
  export type DbConnectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbConnection
     */
    select?: DbConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbConnection
     */
    omit?: DbConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbConnectionInclude<ExtArgs> | null
  }


  /**
   * Model AiProvider
   */

  export type AggregateAiProvider = {
    _count: AiProviderCountAggregateOutputType | null
    _min: AiProviderMinAggregateOutputType | null
    _max: AiProviderMaxAggregateOutputType | null
  }

  export type AiProviderMinAggregateOutputType = {
    id: string | null
    name: string | null
    model: string | null
    encryptedApiKey: string | null
    isEnabled: boolean | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type AiProviderMaxAggregateOutputType = {
    id: string | null
    name: string | null
    model: string | null
    encryptedApiKey: string | null
    isEnabled: boolean | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type AiProviderCountAggregateOutputType = {
    id: number
    name: number
    model: number
    encryptedApiKey: number
    isEnabled: number
    createdBy: number
    createdAt: number
    createdIp: number
    updatedBy: number
    updatedAt: number
    updatedIp: number
    _all: number
  }


  export type AiProviderMinAggregateInputType = {
    id?: true
    name?: true
    model?: true
    encryptedApiKey?: true
    isEnabled?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type AiProviderMaxAggregateInputType = {
    id?: true
    name?: true
    model?: true
    encryptedApiKey?: true
    isEnabled?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type AiProviderCountAggregateInputType = {
    id?: true
    name?: true
    model?: true
    encryptedApiKey?: true
    isEnabled?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
    _all?: true
  }

  export type AiProviderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiProvider to aggregate.
     */
    where?: AiProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiProviders to fetch.
     */
    orderBy?: AiProviderOrderByWithRelationInput | AiProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiProviders
    **/
    _count?: true | AiProviderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiProviderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiProviderMaxAggregateInputType
  }

  export type GetAiProviderAggregateType<T extends AiProviderAggregateArgs> = {
        [P in keyof T & keyof AggregateAiProvider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiProvider[P]>
      : GetScalarType<T[P], AggregateAiProvider[P]>
  }




  export type AiProviderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiProviderWhereInput
    orderBy?: AiProviderOrderByWithAggregationInput | AiProviderOrderByWithAggregationInput[]
    by: AiProviderScalarFieldEnum[] | AiProviderScalarFieldEnum
    having?: AiProviderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiProviderCountAggregateInputType | true
    _min?: AiProviderMinAggregateInputType
    _max?: AiProviderMaxAggregateInputType
  }

  export type AiProviderGroupByOutputType = {
    id: string
    name: string
    model: string
    encryptedApiKey: string
    isEnabled: boolean
    createdBy: string | null
    createdAt: Date
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
    _count: AiProviderCountAggregateOutputType | null
    _min: AiProviderMinAggregateOutputType | null
    _max: AiProviderMaxAggregateOutputType | null
  }

  type GetAiProviderGroupByPayload<T extends AiProviderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiProviderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiProviderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiProviderGroupByOutputType[P]>
            : GetScalarType<T[P], AiProviderGroupByOutputType[P]>
        }
      >
    >


  export type AiProviderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    model?: boolean
    encryptedApiKey?: boolean
    isEnabled?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
  }, ExtArgs["result"]["aiProvider"]>



  export type AiProviderSelectScalar = {
    id?: boolean
    name?: boolean
    model?: boolean
    encryptedApiKey?: boolean
    isEnabled?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
  }

  export type AiProviderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "model" | "encryptedApiKey" | "isEnabled" | "createdBy" | "createdAt" | "createdIp" | "updatedBy" | "updatedAt" | "updatedIp", ExtArgs["result"]["aiProvider"]>

  export type $AiProviderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiProvider"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      model: string
      encryptedApiKey: string
      isEnabled: boolean
      createdBy: string | null
      createdAt: Date
      createdIp: string | null
      updatedBy: string | null
      updatedAt: Date | null
      updatedIp: string | null
    }, ExtArgs["result"]["aiProvider"]>
    composites: {}
  }

  type AiProviderGetPayload<S extends boolean | null | undefined | AiProviderDefaultArgs> = $Result.GetResult<Prisma.$AiProviderPayload, S>

  type AiProviderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AiProviderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AiProviderCountAggregateInputType | true
    }

  export interface AiProviderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiProvider'], meta: { name: 'AiProvider' } }
    /**
     * Find zero or one AiProvider that matches the filter.
     * @param {AiProviderFindUniqueArgs} args - Arguments to find a AiProvider
     * @example
     * // Get one AiProvider
     * const aiProvider = await prisma.aiProvider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiProviderFindUniqueArgs>(args: SelectSubset<T, AiProviderFindUniqueArgs<ExtArgs>>): Prisma__AiProviderClient<$Result.GetResult<Prisma.$AiProviderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AiProvider that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AiProviderFindUniqueOrThrowArgs} args - Arguments to find a AiProvider
     * @example
     * // Get one AiProvider
     * const aiProvider = await prisma.aiProvider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiProviderFindUniqueOrThrowArgs>(args: SelectSubset<T, AiProviderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiProviderClient<$Result.GetResult<Prisma.$AiProviderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiProvider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiProviderFindFirstArgs} args - Arguments to find a AiProvider
     * @example
     * // Get one AiProvider
     * const aiProvider = await prisma.aiProvider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiProviderFindFirstArgs>(args?: SelectSubset<T, AiProviderFindFirstArgs<ExtArgs>>): Prisma__AiProviderClient<$Result.GetResult<Prisma.$AiProviderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiProvider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiProviderFindFirstOrThrowArgs} args - Arguments to find a AiProvider
     * @example
     * // Get one AiProvider
     * const aiProvider = await prisma.aiProvider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiProviderFindFirstOrThrowArgs>(args?: SelectSubset<T, AiProviderFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiProviderClient<$Result.GetResult<Prisma.$AiProviderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AiProviders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiProviderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiProviders
     * const aiProviders = await prisma.aiProvider.findMany()
     * 
     * // Get first 10 AiProviders
     * const aiProviders = await prisma.aiProvider.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiProviderWithIdOnly = await prisma.aiProvider.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiProviderFindManyArgs>(args?: SelectSubset<T, AiProviderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiProviderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AiProvider.
     * @param {AiProviderCreateArgs} args - Arguments to create a AiProvider.
     * @example
     * // Create one AiProvider
     * const AiProvider = await prisma.aiProvider.create({
     *   data: {
     *     // ... data to create a AiProvider
     *   }
     * })
     * 
     */
    create<T extends AiProviderCreateArgs>(args: SelectSubset<T, AiProviderCreateArgs<ExtArgs>>): Prisma__AiProviderClient<$Result.GetResult<Prisma.$AiProviderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AiProviders.
     * @param {AiProviderCreateManyArgs} args - Arguments to create many AiProviders.
     * @example
     * // Create many AiProviders
     * const aiProvider = await prisma.aiProvider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiProviderCreateManyArgs>(args?: SelectSubset<T, AiProviderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AiProvider.
     * @param {AiProviderDeleteArgs} args - Arguments to delete one AiProvider.
     * @example
     * // Delete one AiProvider
     * const AiProvider = await prisma.aiProvider.delete({
     *   where: {
     *     // ... filter to delete one AiProvider
     *   }
     * })
     * 
     */
    delete<T extends AiProviderDeleteArgs>(args: SelectSubset<T, AiProviderDeleteArgs<ExtArgs>>): Prisma__AiProviderClient<$Result.GetResult<Prisma.$AiProviderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AiProvider.
     * @param {AiProviderUpdateArgs} args - Arguments to update one AiProvider.
     * @example
     * // Update one AiProvider
     * const aiProvider = await prisma.aiProvider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiProviderUpdateArgs>(args: SelectSubset<T, AiProviderUpdateArgs<ExtArgs>>): Prisma__AiProviderClient<$Result.GetResult<Prisma.$AiProviderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AiProviders.
     * @param {AiProviderDeleteManyArgs} args - Arguments to filter AiProviders to delete.
     * @example
     * // Delete a few AiProviders
     * const { count } = await prisma.aiProvider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiProviderDeleteManyArgs>(args?: SelectSubset<T, AiProviderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiProviderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiProviders
     * const aiProvider = await prisma.aiProvider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiProviderUpdateManyArgs>(args: SelectSubset<T, AiProviderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AiProvider.
     * @param {AiProviderUpsertArgs} args - Arguments to update or create a AiProvider.
     * @example
     * // Update or create a AiProvider
     * const aiProvider = await prisma.aiProvider.upsert({
     *   create: {
     *     // ... data to create a AiProvider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiProvider we want to update
     *   }
     * })
     */
    upsert<T extends AiProviderUpsertArgs>(args: SelectSubset<T, AiProviderUpsertArgs<ExtArgs>>): Prisma__AiProviderClient<$Result.GetResult<Prisma.$AiProviderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AiProviders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiProviderCountArgs} args - Arguments to filter AiProviders to count.
     * @example
     * // Count the number of AiProviders
     * const count = await prisma.aiProvider.count({
     *   where: {
     *     // ... the filter for the AiProviders we want to count
     *   }
     * })
    **/
    count<T extends AiProviderCountArgs>(
      args?: Subset<T, AiProviderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiProviderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiProviderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AiProviderAggregateArgs>(args: Subset<T, AiProviderAggregateArgs>): Prisma.PrismaPromise<GetAiProviderAggregateType<T>>

    /**
     * Group by AiProvider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiProviderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AiProviderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiProviderGroupByArgs['orderBy'] }
        : { orderBy?: AiProviderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AiProviderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiProviderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiProvider model
   */
  readonly fields: AiProviderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiProvider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiProviderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AiProvider model
   */
  interface AiProviderFieldRefs {
    readonly id: FieldRef<"AiProvider", 'String'>
    readonly name: FieldRef<"AiProvider", 'String'>
    readonly model: FieldRef<"AiProvider", 'String'>
    readonly encryptedApiKey: FieldRef<"AiProvider", 'String'>
    readonly isEnabled: FieldRef<"AiProvider", 'Boolean'>
    readonly createdBy: FieldRef<"AiProvider", 'String'>
    readonly createdAt: FieldRef<"AiProvider", 'DateTime'>
    readonly createdIp: FieldRef<"AiProvider", 'String'>
    readonly updatedBy: FieldRef<"AiProvider", 'String'>
    readonly updatedAt: FieldRef<"AiProvider", 'DateTime'>
    readonly updatedIp: FieldRef<"AiProvider", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AiProvider findUnique
   */
  export type AiProviderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiProvider
     */
    select?: AiProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiProvider
     */
    omit?: AiProviderOmit<ExtArgs> | null
    /**
     * Filter, which AiProvider to fetch.
     */
    where: AiProviderWhereUniqueInput
  }

  /**
   * AiProvider findUniqueOrThrow
   */
  export type AiProviderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiProvider
     */
    select?: AiProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiProvider
     */
    omit?: AiProviderOmit<ExtArgs> | null
    /**
     * Filter, which AiProvider to fetch.
     */
    where: AiProviderWhereUniqueInput
  }

  /**
   * AiProvider findFirst
   */
  export type AiProviderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiProvider
     */
    select?: AiProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiProvider
     */
    omit?: AiProviderOmit<ExtArgs> | null
    /**
     * Filter, which AiProvider to fetch.
     */
    where?: AiProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiProviders to fetch.
     */
    orderBy?: AiProviderOrderByWithRelationInput | AiProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiProviders.
     */
    cursor?: AiProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiProviders.
     */
    distinct?: AiProviderScalarFieldEnum | AiProviderScalarFieldEnum[]
  }

  /**
   * AiProvider findFirstOrThrow
   */
  export type AiProviderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiProvider
     */
    select?: AiProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiProvider
     */
    omit?: AiProviderOmit<ExtArgs> | null
    /**
     * Filter, which AiProvider to fetch.
     */
    where?: AiProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiProviders to fetch.
     */
    orderBy?: AiProviderOrderByWithRelationInput | AiProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiProviders.
     */
    cursor?: AiProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiProviders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiProviders.
     */
    distinct?: AiProviderScalarFieldEnum | AiProviderScalarFieldEnum[]
  }

  /**
   * AiProvider findMany
   */
  export type AiProviderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiProvider
     */
    select?: AiProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiProvider
     */
    omit?: AiProviderOmit<ExtArgs> | null
    /**
     * Filter, which AiProviders to fetch.
     */
    where?: AiProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiProviders to fetch.
     */
    orderBy?: AiProviderOrderByWithRelationInput | AiProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiProviders.
     */
    cursor?: AiProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiProviders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiProviders.
     */
    skip?: number
    distinct?: AiProviderScalarFieldEnum | AiProviderScalarFieldEnum[]
  }

  /**
   * AiProvider create
   */
  export type AiProviderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiProvider
     */
    select?: AiProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiProvider
     */
    omit?: AiProviderOmit<ExtArgs> | null
    /**
     * The data needed to create a AiProvider.
     */
    data: XOR<AiProviderCreateInput, AiProviderUncheckedCreateInput>
  }

  /**
   * AiProvider createMany
   */
  export type AiProviderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiProviders.
     */
    data: AiProviderCreateManyInput | AiProviderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiProvider update
   */
  export type AiProviderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiProvider
     */
    select?: AiProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiProvider
     */
    omit?: AiProviderOmit<ExtArgs> | null
    /**
     * The data needed to update a AiProvider.
     */
    data: XOR<AiProviderUpdateInput, AiProviderUncheckedUpdateInput>
    /**
     * Choose, which AiProvider to update.
     */
    where: AiProviderWhereUniqueInput
  }

  /**
   * AiProvider updateMany
   */
  export type AiProviderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiProviders.
     */
    data: XOR<AiProviderUpdateManyMutationInput, AiProviderUncheckedUpdateManyInput>
    /**
     * Filter which AiProviders to update
     */
    where?: AiProviderWhereInput
    /**
     * Limit how many AiProviders to update.
     */
    limit?: number
  }

  /**
   * AiProvider upsert
   */
  export type AiProviderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiProvider
     */
    select?: AiProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiProvider
     */
    omit?: AiProviderOmit<ExtArgs> | null
    /**
     * The filter to search for the AiProvider to update in case it exists.
     */
    where: AiProviderWhereUniqueInput
    /**
     * In case the AiProvider found by the `where` argument doesn't exist, create a new AiProvider with this data.
     */
    create: XOR<AiProviderCreateInput, AiProviderUncheckedCreateInput>
    /**
     * In case the AiProvider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiProviderUpdateInput, AiProviderUncheckedUpdateInput>
  }

  /**
   * AiProvider delete
   */
  export type AiProviderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiProvider
     */
    select?: AiProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiProvider
     */
    omit?: AiProviderOmit<ExtArgs> | null
    /**
     * Filter which AiProvider to delete.
     */
    where: AiProviderWhereUniqueInput
  }

  /**
   * AiProvider deleteMany
   */
  export type AiProviderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiProviders to delete
     */
    where?: AiProviderWhereInput
    /**
     * Limit how many AiProviders to delete.
     */
    limit?: number
  }

  /**
   * AiProvider without action
   */
  export type AiProviderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiProvider
     */
    select?: AiProviderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiProvider
     */
    omit?: AiProviderOmit<ExtArgs> | null
  }


  /**
   * Model Chart
   */

  export type AggregateChart = {
    _count: ChartCountAggregateOutputType | null
    _min: ChartMinAggregateOutputType | null
    _max: ChartMaxAggregateOutputType | null
  }

  export type ChartMinAggregateOutputType = {
    id: string | null
    name: string | null
    connectionId: string | null
    sqlQuery: string | null
    chartType: $Enums.ChartType | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type ChartMaxAggregateOutputType = {
    id: string | null
    name: string | null
    connectionId: string | null
    sqlQuery: string | null
    chartType: $Enums.ChartType | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type ChartCountAggregateOutputType = {
    id: number
    name: number
    connectionId: number
    sqlQuery: number
    chartType: number
    chartConfig: number
    createdBy: number
    createdAt: number
    createdIp: number
    updatedBy: number
    updatedAt: number
    updatedIp: number
    _all: number
  }


  export type ChartMinAggregateInputType = {
    id?: true
    name?: true
    connectionId?: true
    sqlQuery?: true
    chartType?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type ChartMaxAggregateInputType = {
    id?: true
    name?: true
    connectionId?: true
    sqlQuery?: true
    chartType?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type ChartCountAggregateInputType = {
    id?: true
    name?: true
    connectionId?: true
    sqlQuery?: true
    chartType?: true
    chartConfig?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
    _all?: true
  }

  export type ChartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chart to aggregate.
     */
    where?: ChartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Charts to fetch.
     */
    orderBy?: ChartOrderByWithRelationInput | ChartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Charts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Charts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Charts
    **/
    _count?: true | ChartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChartMaxAggregateInputType
  }

  export type GetChartAggregateType<T extends ChartAggregateArgs> = {
        [P in keyof T & keyof AggregateChart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChart[P]>
      : GetScalarType<T[P], AggregateChart[P]>
  }




  export type ChartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChartWhereInput
    orderBy?: ChartOrderByWithAggregationInput | ChartOrderByWithAggregationInput[]
    by: ChartScalarFieldEnum[] | ChartScalarFieldEnum
    having?: ChartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChartCountAggregateInputType | true
    _min?: ChartMinAggregateInputType
    _max?: ChartMaxAggregateInputType
  }

  export type ChartGroupByOutputType = {
    id: string
    name: string
    connectionId: string
    sqlQuery: string
    chartType: $Enums.ChartType
    chartConfig: JsonValue
    createdBy: string | null
    createdAt: Date
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
    _count: ChartCountAggregateOutputType | null
    _min: ChartMinAggregateOutputType | null
    _max: ChartMaxAggregateOutputType | null
  }

  type GetChartGroupByPayload<T extends ChartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChartGroupByOutputType[P]>
            : GetScalarType<T[P], ChartGroupByOutputType[P]>
        }
      >
    >


  export type ChartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    connectionId?: boolean
    sqlQuery?: boolean
    chartType?: boolean
    chartConfig?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
    connection?: boolean | DbConnectionDefaultArgs<ExtArgs>
    dashboardCharts?: boolean | Chart$dashboardChartsArgs<ExtArgs>
    _count?: boolean | ChartCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chart"]>



  export type ChartSelectScalar = {
    id?: boolean
    name?: boolean
    connectionId?: boolean
    sqlQuery?: boolean
    chartType?: boolean
    chartConfig?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
  }

  export type ChartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "connectionId" | "sqlQuery" | "chartType" | "chartConfig" | "createdBy" | "createdAt" | "createdIp" | "updatedBy" | "updatedAt" | "updatedIp", ExtArgs["result"]["chart"]>
  export type ChartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connection?: boolean | DbConnectionDefaultArgs<ExtArgs>
    dashboardCharts?: boolean | Chart$dashboardChartsArgs<ExtArgs>
    _count?: boolean | ChartCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ChartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Chart"
    objects: {
      connection: Prisma.$DbConnectionPayload<ExtArgs>
      dashboardCharts: Prisma.$DashboardChartPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      connectionId: string
      sqlQuery: string
      chartType: $Enums.ChartType
      chartConfig: Prisma.JsonValue
      createdBy: string | null
      createdAt: Date
      createdIp: string | null
      updatedBy: string | null
      updatedAt: Date | null
      updatedIp: string | null
    }, ExtArgs["result"]["chart"]>
    composites: {}
  }

  type ChartGetPayload<S extends boolean | null | undefined | ChartDefaultArgs> = $Result.GetResult<Prisma.$ChartPayload, S>

  type ChartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChartCountAggregateInputType | true
    }

  export interface ChartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Chart'], meta: { name: 'Chart' } }
    /**
     * Find zero or one Chart that matches the filter.
     * @param {ChartFindUniqueArgs} args - Arguments to find a Chart
     * @example
     * // Get one Chart
     * const chart = await prisma.chart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChartFindUniqueArgs>(args: SelectSubset<T, ChartFindUniqueArgs<ExtArgs>>): Prisma__ChartClient<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Chart that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChartFindUniqueOrThrowArgs} args - Arguments to find a Chart
     * @example
     * // Get one Chart
     * const chart = await prisma.chart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChartFindUniqueOrThrowArgs>(args: SelectSubset<T, ChartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChartClient<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartFindFirstArgs} args - Arguments to find a Chart
     * @example
     * // Get one Chart
     * const chart = await prisma.chart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChartFindFirstArgs>(args?: SelectSubset<T, ChartFindFirstArgs<ExtArgs>>): Prisma__ChartClient<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartFindFirstOrThrowArgs} args - Arguments to find a Chart
     * @example
     * // Get one Chart
     * const chart = await prisma.chart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChartFindFirstOrThrowArgs>(args?: SelectSubset<T, ChartFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChartClient<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Charts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Charts
     * const charts = await prisma.chart.findMany()
     * 
     * // Get first 10 Charts
     * const charts = await prisma.chart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chartWithIdOnly = await prisma.chart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChartFindManyArgs>(args?: SelectSubset<T, ChartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Chart.
     * @param {ChartCreateArgs} args - Arguments to create a Chart.
     * @example
     * // Create one Chart
     * const Chart = await prisma.chart.create({
     *   data: {
     *     // ... data to create a Chart
     *   }
     * })
     * 
     */
    create<T extends ChartCreateArgs>(args: SelectSubset<T, ChartCreateArgs<ExtArgs>>): Prisma__ChartClient<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Charts.
     * @param {ChartCreateManyArgs} args - Arguments to create many Charts.
     * @example
     * // Create many Charts
     * const chart = await prisma.chart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChartCreateManyArgs>(args?: SelectSubset<T, ChartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Chart.
     * @param {ChartDeleteArgs} args - Arguments to delete one Chart.
     * @example
     * // Delete one Chart
     * const Chart = await prisma.chart.delete({
     *   where: {
     *     // ... filter to delete one Chart
     *   }
     * })
     * 
     */
    delete<T extends ChartDeleteArgs>(args: SelectSubset<T, ChartDeleteArgs<ExtArgs>>): Prisma__ChartClient<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Chart.
     * @param {ChartUpdateArgs} args - Arguments to update one Chart.
     * @example
     * // Update one Chart
     * const chart = await prisma.chart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChartUpdateArgs>(args: SelectSubset<T, ChartUpdateArgs<ExtArgs>>): Prisma__ChartClient<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Charts.
     * @param {ChartDeleteManyArgs} args - Arguments to filter Charts to delete.
     * @example
     * // Delete a few Charts
     * const { count } = await prisma.chart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChartDeleteManyArgs>(args?: SelectSubset<T, ChartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Charts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Charts
     * const chart = await prisma.chart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChartUpdateManyArgs>(args: SelectSubset<T, ChartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Chart.
     * @param {ChartUpsertArgs} args - Arguments to update or create a Chart.
     * @example
     * // Update or create a Chart
     * const chart = await prisma.chart.upsert({
     *   create: {
     *     // ... data to create a Chart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chart we want to update
     *   }
     * })
     */
    upsert<T extends ChartUpsertArgs>(args: SelectSubset<T, ChartUpsertArgs<ExtArgs>>): Prisma__ChartClient<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Charts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartCountArgs} args - Arguments to filter Charts to count.
     * @example
     * // Count the number of Charts
     * const count = await prisma.chart.count({
     *   where: {
     *     // ... the filter for the Charts we want to count
     *   }
     * })
    **/
    count<T extends ChartCountArgs>(
      args?: Subset<T, ChartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChartAggregateArgs>(args: Subset<T, ChartAggregateArgs>): Prisma.PrismaPromise<GetChartAggregateType<T>>

    /**
     * Group by Chart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChartGroupByArgs['orderBy'] }
        : { orderBy?: ChartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Chart model
   */
  readonly fields: ChartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Chart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    connection<T extends DbConnectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DbConnectionDefaultArgs<ExtArgs>>): Prisma__DbConnectionClient<$Result.GetResult<Prisma.$DbConnectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    dashboardCharts<T extends Chart$dashboardChartsArgs<ExtArgs> = {}>(args?: Subset<T, Chart$dashboardChartsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DashboardChartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Chart model
   */
  interface ChartFieldRefs {
    readonly id: FieldRef<"Chart", 'String'>
    readonly name: FieldRef<"Chart", 'String'>
    readonly connectionId: FieldRef<"Chart", 'String'>
    readonly sqlQuery: FieldRef<"Chart", 'String'>
    readonly chartType: FieldRef<"Chart", 'ChartType'>
    readonly chartConfig: FieldRef<"Chart", 'Json'>
    readonly createdBy: FieldRef<"Chart", 'String'>
    readonly createdAt: FieldRef<"Chart", 'DateTime'>
    readonly createdIp: FieldRef<"Chart", 'String'>
    readonly updatedBy: FieldRef<"Chart", 'String'>
    readonly updatedAt: FieldRef<"Chart", 'DateTime'>
    readonly updatedIp: FieldRef<"Chart", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Chart findUnique
   */
  export type ChartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChartInclude<ExtArgs> | null
    /**
     * Filter, which Chart to fetch.
     */
    where: ChartWhereUniqueInput
  }

  /**
   * Chart findUniqueOrThrow
   */
  export type ChartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChartInclude<ExtArgs> | null
    /**
     * Filter, which Chart to fetch.
     */
    where: ChartWhereUniqueInput
  }

  /**
   * Chart findFirst
   */
  export type ChartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChartInclude<ExtArgs> | null
    /**
     * Filter, which Chart to fetch.
     */
    where?: ChartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Charts to fetch.
     */
    orderBy?: ChartOrderByWithRelationInput | ChartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Charts.
     */
    cursor?: ChartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Charts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Charts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Charts.
     */
    distinct?: ChartScalarFieldEnum | ChartScalarFieldEnum[]
  }

  /**
   * Chart findFirstOrThrow
   */
  export type ChartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChartInclude<ExtArgs> | null
    /**
     * Filter, which Chart to fetch.
     */
    where?: ChartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Charts to fetch.
     */
    orderBy?: ChartOrderByWithRelationInput | ChartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Charts.
     */
    cursor?: ChartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Charts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Charts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Charts.
     */
    distinct?: ChartScalarFieldEnum | ChartScalarFieldEnum[]
  }

  /**
   * Chart findMany
   */
  export type ChartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChartInclude<ExtArgs> | null
    /**
     * Filter, which Charts to fetch.
     */
    where?: ChartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Charts to fetch.
     */
    orderBy?: ChartOrderByWithRelationInput | ChartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Charts.
     */
    cursor?: ChartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Charts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Charts.
     */
    skip?: number
    distinct?: ChartScalarFieldEnum | ChartScalarFieldEnum[]
  }

  /**
   * Chart create
   */
  export type ChartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChartInclude<ExtArgs> | null
    /**
     * The data needed to create a Chart.
     */
    data: XOR<ChartCreateInput, ChartUncheckedCreateInput>
  }

  /**
   * Chart createMany
   */
  export type ChartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Charts.
     */
    data: ChartCreateManyInput | ChartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Chart update
   */
  export type ChartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChartInclude<ExtArgs> | null
    /**
     * The data needed to update a Chart.
     */
    data: XOR<ChartUpdateInput, ChartUncheckedUpdateInput>
    /**
     * Choose, which Chart to update.
     */
    where: ChartWhereUniqueInput
  }

  /**
   * Chart updateMany
   */
  export type ChartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Charts.
     */
    data: XOR<ChartUpdateManyMutationInput, ChartUncheckedUpdateManyInput>
    /**
     * Filter which Charts to update
     */
    where?: ChartWhereInput
    /**
     * Limit how many Charts to update.
     */
    limit?: number
  }

  /**
   * Chart upsert
   */
  export type ChartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChartInclude<ExtArgs> | null
    /**
     * The filter to search for the Chart to update in case it exists.
     */
    where: ChartWhereUniqueInput
    /**
     * In case the Chart found by the `where` argument doesn't exist, create a new Chart with this data.
     */
    create: XOR<ChartCreateInput, ChartUncheckedCreateInput>
    /**
     * In case the Chart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChartUpdateInput, ChartUncheckedUpdateInput>
  }

  /**
   * Chart delete
   */
  export type ChartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChartInclude<ExtArgs> | null
    /**
     * Filter which Chart to delete.
     */
    where: ChartWhereUniqueInput
  }

  /**
   * Chart deleteMany
   */
  export type ChartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Charts to delete
     */
    where?: ChartWhereInput
    /**
     * Limit how many Charts to delete.
     */
    limit?: number
  }

  /**
   * Chart.dashboardCharts
   */
  export type Chart$dashboardChartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardChart
     */
    select?: DashboardChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardChart
     */
    omit?: DashboardChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardChartInclude<ExtArgs> | null
    where?: DashboardChartWhereInput
    orderBy?: DashboardChartOrderByWithRelationInput | DashboardChartOrderByWithRelationInput[]
    cursor?: DashboardChartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DashboardChartScalarFieldEnum | DashboardChartScalarFieldEnum[]
  }

  /**
   * Chart without action
   */
  export type ChartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chart
     */
    select?: ChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chart
     */
    omit?: ChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChartInclude<ExtArgs> | null
  }


  /**
   * Model Dashboard
   */

  export type AggregateDashboard = {
    _count: DashboardCountAggregateOutputType | null
    _min: DashboardMinAggregateOutputType | null
    _max: DashboardMaxAggregateOutputType | null
  }

  export type DashboardMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type DashboardMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type DashboardCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdBy: number
    createdAt: number
    createdIp: number
    updatedBy: number
    updatedAt: number
    updatedIp: number
    _all: number
  }


  export type DashboardMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type DashboardMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type DashboardCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
    _all?: true
  }

  export type DashboardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dashboard to aggregate.
     */
    where?: DashboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dashboards to fetch.
     */
    orderBy?: DashboardOrderByWithRelationInput | DashboardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DashboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dashboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dashboards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Dashboards
    **/
    _count?: true | DashboardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DashboardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DashboardMaxAggregateInputType
  }

  export type GetDashboardAggregateType<T extends DashboardAggregateArgs> = {
        [P in keyof T & keyof AggregateDashboard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDashboard[P]>
      : GetScalarType<T[P], AggregateDashboard[P]>
  }




  export type DashboardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DashboardWhereInput
    orderBy?: DashboardOrderByWithAggregationInput | DashboardOrderByWithAggregationInput[]
    by: DashboardScalarFieldEnum[] | DashboardScalarFieldEnum
    having?: DashboardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DashboardCountAggregateInputType | true
    _min?: DashboardMinAggregateInputType
    _max?: DashboardMaxAggregateInputType
  }

  export type DashboardGroupByOutputType = {
    id: string
    name: string
    description: string | null
    createdBy: string | null
    createdAt: Date
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
    _count: DashboardCountAggregateOutputType | null
    _min: DashboardMinAggregateOutputType | null
    _max: DashboardMaxAggregateOutputType | null
  }

  type GetDashboardGroupByPayload<T extends DashboardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DashboardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DashboardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DashboardGroupByOutputType[P]>
            : GetScalarType<T[P], DashboardGroupByOutputType[P]>
        }
      >
    >


  export type DashboardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
    dashboardCharts?: boolean | Dashboard$dashboardChartsArgs<ExtArgs>
    dashboardFilters?: boolean | Dashboard$dashboardFiltersArgs<ExtArgs>
    globalFilterOverrides?: boolean | Dashboard$globalFilterOverridesArgs<ExtArgs>
    _count?: boolean | DashboardCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dashboard"]>



  export type DashboardSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
  }

  export type DashboardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "createdBy" | "createdAt" | "createdIp" | "updatedBy" | "updatedAt" | "updatedIp", ExtArgs["result"]["dashboard"]>
  export type DashboardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dashboardCharts?: boolean | Dashboard$dashboardChartsArgs<ExtArgs>
    dashboardFilters?: boolean | Dashboard$dashboardFiltersArgs<ExtArgs>
    globalFilterOverrides?: boolean | Dashboard$globalFilterOverridesArgs<ExtArgs>
    _count?: boolean | DashboardCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $DashboardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Dashboard"
    objects: {
      dashboardCharts: Prisma.$DashboardChartPayload<ExtArgs>[]
      dashboardFilters: Prisma.$DashboardFilterPayload<ExtArgs>[]
      globalFilterOverrides: Prisma.$GlobalFilterOverridePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      createdBy: string | null
      createdAt: Date
      createdIp: string | null
      updatedBy: string | null
      updatedAt: Date | null
      updatedIp: string | null
    }, ExtArgs["result"]["dashboard"]>
    composites: {}
  }

  type DashboardGetPayload<S extends boolean | null | undefined | DashboardDefaultArgs> = $Result.GetResult<Prisma.$DashboardPayload, S>

  type DashboardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DashboardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DashboardCountAggregateInputType | true
    }

  export interface DashboardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Dashboard'], meta: { name: 'Dashboard' } }
    /**
     * Find zero or one Dashboard that matches the filter.
     * @param {DashboardFindUniqueArgs} args - Arguments to find a Dashboard
     * @example
     * // Get one Dashboard
     * const dashboard = await prisma.dashboard.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DashboardFindUniqueArgs>(args: SelectSubset<T, DashboardFindUniqueArgs<ExtArgs>>): Prisma__DashboardClient<$Result.GetResult<Prisma.$DashboardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Dashboard that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DashboardFindUniqueOrThrowArgs} args - Arguments to find a Dashboard
     * @example
     * // Get one Dashboard
     * const dashboard = await prisma.dashboard.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DashboardFindUniqueOrThrowArgs>(args: SelectSubset<T, DashboardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DashboardClient<$Result.GetResult<Prisma.$DashboardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dashboard that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardFindFirstArgs} args - Arguments to find a Dashboard
     * @example
     * // Get one Dashboard
     * const dashboard = await prisma.dashboard.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DashboardFindFirstArgs>(args?: SelectSubset<T, DashboardFindFirstArgs<ExtArgs>>): Prisma__DashboardClient<$Result.GetResult<Prisma.$DashboardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dashboard that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardFindFirstOrThrowArgs} args - Arguments to find a Dashboard
     * @example
     * // Get one Dashboard
     * const dashboard = await prisma.dashboard.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DashboardFindFirstOrThrowArgs>(args?: SelectSubset<T, DashboardFindFirstOrThrowArgs<ExtArgs>>): Prisma__DashboardClient<$Result.GetResult<Prisma.$DashboardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Dashboards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dashboards
     * const dashboards = await prisma.dashboard.findMany()
     * 
     * // Get first 10 Dashboards
     * const dashboards = await prisma.dashboard.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dashboardWithIdOnly = await prisma.dashboard.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DashboardFindManyArgs>(args?: SelectSubset<T, DashboardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DashboardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Dashboard.
     * @param {DashboardCreateArgs} args - Arguments to create a Dashboard.
     * @example
     * // Create one Dashboard
     * const Dashboard = await prisma.dashboard.create({
     *   data: {
     *     // ... data to create a Dashboard
     *   }
     * })
     * 
     */
    create<T extends DashboardCreateArgs>(args: SelectSubset<T, DashboardCreateArgs<ExtArgs>>): Prisma__DashboardClient<$Result.GetResult<Prisma.$DashboardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Dashboards.
     * @param {DashboardCreateManyArgs} args - Arguments to create many Dashboards.
     * @example
     * // Create many Dashboards
     * const dashboard = await prisma.dashboard.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DashboardCreateManyArgs>(args?: SelectSubset<T, DashboardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Dashboard.
     * @param {DashboardDeleteArgs} args - Arguments to delete one Dashboard.
     * @example
     * // Delete one Dashboard
     * const Dashboard = await prisma.dashboard.delete({
     *   where: {
     *     // ... filter to delete one Dashboard
     *   }
     * })
     * 
     */
    delete<T extends DashboardDeleteArgs>(args: SelectSubset<T, DashboardDeleteArgs<ExtArgs>>): Prisma__DashboardClient<$Result.GetResult<Prisma.$DashboardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Dashboard.
     * @param {DashboardUpdateArgs} args - Arguments to update one Dashboard.
     * @example
     * // Update one Dashboard
     * const dashboard = await prisma.dashboard.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DashboardUpdateArgs>(args: SelectSubset<T, DashboardUpdateArgs<ExtArgs>>): Prisma__DashboardClient<$Result.GetResult<Prisma.$DashboardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Dashboards.
     * @param {DashboardDeleteManyArgs} args - Arguments to filter Dashboards to delete.
     * @example
     * // Delete a few Dashboards
     * const { count } = await prisma.dashboard.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DashboardDeleteManyArgs>(args?: SelectSubset<T, DashboardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dashboards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dashboards
     * const dashboard = await prisma.dashboard.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DashboardUpdateManyArgs>(args: SelectSubset<T, DashboardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Dashboard.
     * @param {DashboardUpsertArgs} args - Arguments to update or create a Dashboard.
     * @example
     * // Update or create a Dashboard
     * const dashboard = await prisma.dashboard.upsert({
     *   create: {
     *     // ... data to create a Dashboard
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dashboard we want to update
     *   }
     * })
     */
    upsert<T extends DashboardUpsertArgs>(args: SelectSubset<T, DashboardUpsertArgs<ExtArgs>>): Prisma__DashboardClient<$Result.GetResult<Prisma.$DashboardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Dashboards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardCountArgs} args - Arguments to filter Dashboards to count.
     * @example
     * // Count the number of Dashboards
     * const count = await prisma.dashboard.count({
     *   where: {
     *     // ... the filter for the Dashboards we want to count
     *   }
     * })
    **/
    count<T extends DashboardCountArgs>(
      args?: Subset<T, DashboardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DashboardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dashboard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DashboardAggregateArgs>(args: Subset<T, DashboardAggregateArgs>): Prisma.PrismaPromise<GetDashboardAggregateType<T>>

    /**
     * Group by Dashboard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DashboardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DashboardGroupByArgs['orderBy'] }
        : { orderBy?: DashboardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DashboardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDashboardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Dashboard model
   */
  readonly fields: DashboardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Dashboard.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DashboardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dashboardCharts<T extends Dashboard$dashboardChartsArgs<ExtArgs> = {}>(args?: Subset<T, Dashboard$dashboardChartsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DashboardChartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dashboardFilters<T extends Dashboard$dashboardFiltersArgs<ExtArgs> = {}>(args?: Subset<T, Dashboard$dashboardFiltersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DashboardFilterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    globalFilterOverrides<T extends Dashboard$globalFilterOverridesArgs<ExtArgs> = {}>(args?: Subset<T, Dashboard$globalFilterOverridesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalFilterOverridePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Dashboard model
   */
  interface DashboardFieldRefs {
    readonly id: FieldRef<"Dashboard", 'String'>
    readonly name: FieldRef<"Dashboard", 'String'>
    readonly description: FieldRef<"Dashboard", 'String'>
    readonly createdBy: FieldRef<"Dashboard", 'String'>
    readonly createdAt: FieldRef<"Dashboard", 'DateTime'>
    readonly createdIp: FieldRef<"Dashboard", 'String'>
    readonly updatedBy: FieldRef<"Dashboard", 'String'>
    readonly updatedAt: FieldRef<"Dashboard", 'DateTime'>
    readonly updatedIp: FieldRef<"Dashboard", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Dashboard findUnique
   */
  export type DashboardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dashboard
     */
    select?: DashboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dashboard
     */
    omit?: DashboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardInclude<ExtArgs> | null
    /**
     * Filter, which Dashboard to fetch.
     */
    where: DashboardWhereUniqueInput
  }

  /**
   * Dashboard findUniqueOrThrow
   */
  export type DashboardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dashboard
     */
    select?: DashboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dashboard
     */
    omit?: DashboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardInclude<ExtArgs> | null
    /**
     * Filter, which Dashboard to fetch.
     */
    where: DashboardWhereUniqueInput
  }

  /**
   * Dashboard findFirst
   */
  export type DashboardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dashboard
     */
    select?: DashboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dashboard
     */
    omit?: DashboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardInclude<ExtArgs> | null
    /**
     * Filter, which Dashboard to fetch.
     */
    where?: DashboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dashboards to fetch.
     */
    orderBy?: DashboardOrderByWithRelationInput | DashboardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dashboards.
     */
    cursor?: DashboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dashboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dashboards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dashboards.
     */
    distinct?: DashboardScalarFieldEnum | DashboardScalarFieldEnum[]
  }

  /**
   * Dashboard findFirstOrThrow
   */
  export type DashboardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dashboard
     */
    select?: DashboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dashboard
     */
    omit?: DashboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardInclude<ExtArgs> | null
    /**
     * Filter, which Dashboard to fetch.
     */
    where?: DashboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dashboards to fetch.
     */
    orderBy?: DashboardOrderByWithRelationInput | DashboardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dashboards.
     */
    cursor?: DashboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dashboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dashboards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dashboards.
     */
    distinct?: DashboardScalarFieldEnum | DashboardScalarFieldEnum[]
  }

  /**
   * Dashboard findMany
   */
  export type DashboardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dashboard
     */
    select?: DashboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dashboard
     */
    omit?: DashboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardInclude<ExtArgs> | null
    /**
     * Filter, which Dashboards to fetch.
     */
    where?: DashboardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dashboards to fetch.
     */
    orderBy?: DashboardOrderByWithRelationInput | DashboardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Dashboards.
     */
    cursor?: DashboardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dashboards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dashboards.
     */
    skip?: number
    distinct?: DashboardScalarFieldEnum | DashboardScalarFieldEnum[]
  }

  /**
   * Dashboard create
   */
  export type DashboardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dashboard
     */
    select?: DashboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dashboard
     */
    omit?: DashboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardInclude<ExtArgs> | null
    /**
     * The data needed to create a Dashboard.
     */
    data: XOR<DashboardCreateInput, DashboardUncheckedCreateInput>
  }

  /**
   * Dashboard createMany
   */
  export type DashboardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Dashboards.
     */
    data: DashboardCreateManyInput | DashboardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Dashboard update
   */
  export type DashboardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dashboard
     */
    select?: DashboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dashboard
     */
    omit?: DashboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardInclude<ExtArgs> | null
    /**
     * The data needed to update a Dashboard.
     */
    data: XOR<DashboardUpdateInput, DashboardUncheckedUpdateInput>
    /**
     * Choose, which Dashboard to update.
     */
    where: DashboardWhereUniqueInput
  }

  /**
   * Dashboard updateMany
   */
  export type DashboardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Dashboards.
     */
    data: XOR<DashboardUpdateManyMutationInput, DashboardUncheckedUpdateManyInput>
    /**
     * Filter which Dashboards to update
     */
    where?: DashboardWhereInput
    /**
     * Limit how many Dashboards to update.
     */
    limit?: number
  }

  /**
   * Dashboard upsert
   */
  export type DashboardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dashboard
     */
    select?: DashboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dashboard
     */
    omit?: DashboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardInclude<ExtArgs> | null
    /**
     * The filter to search for the Dashboard to update in case it exists.
     */
    where: DashboardWhereUniqueInput
    /**
     * In case the Dashboard found by the `where` argument doesn't exist, create a new Dashboard with this data.
     */
    create: XOR<DashboardCreateInput, DashboardUncheckedCreateInput>
    /**
     * In case the Dashboard was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DashboardUpdateInput, DashboardUncheckedUpdateInput>
  }

  /**
   * Dashboard delete
   */
  export type DashboardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dashboard
     */
    select?: DashboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dashboard
     */
    omit?: DashboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardInclude<ExtArgs> | null
    /**
     * Filter which Dashboard to delete.
     */
    where: DashboardWhereUniqueInput
  }

  /**
   * Dashboard deleteMany
   */
  export type DashboardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dashboards to delete
     */
    where?: DashboardWhereInput
    /**
     * Limit how many Dashboards to delete.
     */
    limit?: number
  }

  /**
   * Dashboard.dashboardCharts
   */
  export type Dashboard$dashboardChartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardChart
     */
    select?: DashboardChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardChart
     */
    omit?: DashboardChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardChartInclude<ExtArgs> | null
    where?: DashboardChartWhereInput
    orderBy?: DashboardChartOrderByWithRelationInput | DashboardChartOrderByWithRelationInput[]
    cursor?: DashboardChartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DashboardChartScalarFieldEnum | DashboardChartScalarFieldEnum[]
  }

  /**
   * Dashboard.dashboardFilters
   */
  export type Dashboard$dashboardFiltersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardFilter
     */
    select?: DashboardFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardFilter
     */
    omit?: DashboardFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardFilterInclude<ExtArgs> | null
    where?: DashboardFilterWhereInput
    orderBy?: DashboardFilterOrderByWithRelationInput | DashboardFilterOrderByWithRelationInput[]
    cursor?: DashboardFilterWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DashboardFilterScalarFieldEnum | DashboardFilterScalarFieldEnum[]
  }

  /**
   * Dashboard.globalFilterOverrides
   */
  export type Dashboard$globalFilterOverridesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilterOverride
     */
    select?: GlobalFilterOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilterOverride
     */
    omit?: GlobalFilterOverrideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterOverrideInclude<ExtArgs> | null
    where?: GlobalFilterOverrideWhereInput
    orderBy?: GlobalFilterOverrideOrderByWithRelationInput | GlobalFilterOverrideOrderByWithRelationInput[]
    cursor?: GlobalFilterOverrideWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GlobalFilterOverrideScalarFieldEnum | GlobalFilterOverrideScalarFieldEnum[]
  }

  /**
   * Dashboard without action
   */
  export type DashboardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dashboard
     */
    select?: DashboardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dashboard
     */
    omit?: DashboardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardInclude<ExtArgs> | null
  }


  /**
   * Model DashboardChart
   */

  export type AggregateDashboardChart = {
    _count: DashboardChartCountAggregateOutputType | null
    _avg: DashboardChartAvgAggregateOutputType | null
    _sum: DashboardChartSumAggregateOutputType | null
    _min: DashboardChartMinAggregateOutputType | null
    _max: DashboardChartMaxAggregateOutputType | null
  }

  export type DashboardChartAvgAggregateOutputType = {
    positionX: number | null
    positionY: number | null
    width: number | null
    height: number | null
    order: number | null
  }

  export type DashboardChartSumAggregateOutputType = {
    positionX: number | null
    positionY: number | null
    width: number | null
    height: number | null
    order: number | null
  }

  export type DashboardChartMinAggregateOutputType = {
    id: string | null
    dashboardId: string | null
    chartId: string | null
    positionX: number | null
    positionY: number | null
    width: number | null
    height: number | null
    order: number | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type DashboardChartMaxAggregateOutputType = {
    id: string | null
    dashboardId: string | null
    chartId: string | null
    positionX: number | null
    positionY: number | null
    width: number | null
    height: number | null
    order: number | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type DashboardChartCountAggregateOutputType = {
    id: number
    dashboardId: number
    chartId: number
    positionX: number
    positionY: number
    width: number
    height: number
    order: number
    createdBy: number
    createdAt: number
    createdIp: number
    updatedBy: number
    updatedAt: number
    updatedIp: number
    _all: number
  }


  export type DashboardChartAvgAggregateInputType = {
    positionX?: true
    positionY?: true
    width?: true
    height?: true
    order?: true
  }

  export type DashboardChartSumAggregateInputType = {
    positionX?: true
    positionY?: true
    width?: true
    height?: true
    order?: true
  }

  export type DashboardChartMinAggregateInputType = {
    id?: true
    dashboardId?: true
    chartId?: true
    positionX?: true
    positionY?: true
    width?: true
    height?: true
    order?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type DashboardChartMaxAggregateInputType = {
    id?: true
    dashboardId?: true
    chartId?: true
    positionX?: true
    positionY?: true
    width?: true
    height?: true
    order?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type DashboardChartCountAggregateInputType = {
    id?: true
    dashboardId?: true
    chartId?: true
    positionX?: true
    positionY?: true
    width?: true
    height?: true
    order?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
    _all?: true
  }

  export type DashboardChartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DashboardChart to aggregate.
     */
    where?: DashboardChartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DashboardCharts to fetch.
     */
    orderBy?: DashboardChartOrderByWithRelationInput | DashboardChartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DashboardChartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DashboardCharts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DashboardCharts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DashboardCharts
    **/
    _count?: true | DashboardChartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DashboardChartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DashboardChartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DashboardChartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DashboardChartMaxAggregateInputType
  }

  export type GetDashboardChartAggregateType<T extends DashboardChartAggregateArgs> = {
        [P in keyof T & keyof AggregateDashboardChart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDashboardChart[P]>
      : GetScalarType<T[P], AggregateDashboardChart[P]>
  }




  export type DashboardChartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DashboardChartWhereInput
    orderBy?: DashboardChartOrderByWithAggregationInput | DashboardChartOrderByWithAggregationInput[]
    by: DashboardChartScalarFieldEnum[] | DashboardChartScalarFieldEnum
    having?: DashboardChartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DashboardChartCountAggregateInputType | true
    _avg?: DashboardChartAvgAggregateInputType
    _sum?: DashboardChartSumAggregateInputType
    _min?: DashboardChartMinAggregateInputType
    _max?: DashboardChartMaxAggregateInputType
  }

  export type DashboardChartGroupByOutputType = {
    id: string
    dashboardId: string
    chartId: string
    positionX: number
    positionY: number
    width: number
    height: number
    order: number
    createdBy: string | null
    createdAt: Date
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
    _count: DashboardChartCountAggregateOutputType | null
    _avg: DashboardChartAvgAggregateOutputType | null
    _sum: DashboardChartSumAggregateOutputType | null
    _min: DashboardChartMinAggregateOutputType | null
    _max: DashboardChartMaxAggregateOutputType | null
  }

  type GetDashboardChartGroupByPayload<T extends DashboardChartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DashboardChartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DashboardChartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DashboardChartGroupByOutputType[P]>
            : GetScalarType<T[P], DashboardChartGroupByOutputType[P]>
        }
      >
    >


  export type DashboardChartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dashboardId?: boolean
    chartId?: boolean
    positionX?: boolean
    positionY?: boolean
    width?: boolean
    height?: boolean
    order?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
    dashboard?: boolean | DashboardDefaultArgs<ExtArgs>
    chart?: boolean | ChartDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dashboardChart"]>



  export type DashboardChartSelectScalar = {
    id?: boolean
    dashboardId?: boolean
    chartId?: boolean
    positionX?: boolean
    positionY?: boolean
    width?: boolean
    height?: boolean
    order?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
  }

  export type DashboardChartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dashboardId" | "chartId" | "positionX" | "positionY" | "width" | "height" | "order" | "createdBy" | "createdAt" | "createdIp" | "updatedBy" | "updatedAt" | "updatedIp", ExtArgs["result"]["dashboardChart"]>
  export type DashboardChartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dashboard?: boolean | DashboardDefaultArgs<ExtArgs>
    chart?: boolean | ChartDefaultArgs<ExtArgs>
  }

  export type $DashboardChartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DashboardChart"
    objects: {
      dashboard: Prisma.$DashboardPayload<ExtArgs>
      chart: Prisma.$ChartPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dashboardId: string
      chartId: string
      positionX: number
      positionY: number
      width: number
      height: number
      order: number
      createdBy: string | null
      createdAt: Date
      createdIp: string | null
      updatedBy: string | null
      updatedAt: Date | null
      updatedIp: string | null
    }, ExtArgs["result"]["dashboardChart"]>
    composites: {}
  }

  type DashboardChartGetPayload<S extends boolean | null | undefined | DashboardChartDefaultArgs> = $Result.GetResult<Prisma.$DashboardChartPayload, S>

  type DashboardChartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DashboardChartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DashboardChartCountAggregateInputType | true
    }

  export interface DashboardChartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DashboardChart'], meta: { name: 'DashboardChart' } }
    /**
     * Find zero or one DashboardChart that matches the filter.
     * @param {DashboardChartFindUniqueArgs} args - Arguments to find a DashboardChart
     * @example
     * // Get one DashboardChart
     * const dashboardChart = await prisma.dashboardChart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DashboardChartFindUniqueArgs>(args: SelectSubset<T, DashboardChartFindUniqueArgs<ExtArgs>>): Prisma__DashboardChartClient<$Result.GetResult<Prisma.$DashboardChartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DashboardChart that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DashboardChartFindUniqueOrThrowArgs} args - Arguments to find a DashboardChart
     * @example
     * // Get one DashboardChart
     * const dashboardChart = await prisma.dashboardChart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DashboardChartFindUniqueOrThrowArgs>(args: SelectSubset<T, DashboardChartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DashboardChartClient<$Result.GetResult<Prisma.$DashboardChartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DashboardChart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardChartFindFirstArgs} args - Arguments to find a DashboardChart
     * @example
     * // Get one DashboardChart
     * const dashboardChart = await prisma.dashboardChart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DashboardChartFindFirstArgs>(args?: SelectSubset<T, DashboardChartFindFirstArgs<ExtArgs>>): Prisma__DashboardChartClient<$Result.GetResult<Prisma.$DashboardChartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DashboardChart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardChartFindFirstOrThrowArgs} args - Arguments to find a DashboardChart
     * @example
     * // Get one DashboardChart
     * const dashboardChart = await prisma.dashboardChart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DashboardChartFindFirstOrThrowArgs>(args?: SelectSubset<T, DashboardChartFindFirstOrThrowArgs<ExtArgs>>): Prisma__DashboardChartClient<$Result.GetResult<Prisma.$DashboardChartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DashboardCharts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardChartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DashboardCharts
     * const dashboardCharts = await prisma.dashboardChart.findMany()
     * 
     * // Get first 10 DashboardCharts
     * const dashboardCharts = await prisma.dashboardChart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dashboardChartWithIdOnly = await prisma.dashboardChart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DashboardChartFindManyArgs>(args?: SelectSubset<T, DashboardChartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DashboardChartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DashboardChart.
     * @param {DashboardChartCreateArgs} args - Arguments to create a DashboardChart.
     * @example
     * // Create one DashboardChart
     * const DashboardChart = await prisma.dashboardChart.create({
     *   data: {
     *     // ... data to create a DashboardChart
     *   }
     * })
     * 
     */
    create<T extends DashboardChartCreateArgs>(args: SelectSubset<T, DashboardChartCreateArgs<ExtArgs>>): Prisma__DashboardChartClient<$Result.GetResult<Prisma.$DashboardChartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DashboardCharts.
     * @param {DashboardChartCreateManyArgs} args - Arguments to create many DashboardCharts.
     * @example
     * // Create many DashboardCharts
     * const dashboardChart = await prisma.dashboardChart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DashboardChartCreateManyArgs>(args?: SelectSubset<T, DashboardChartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a DashboardChart.
     * @param {DashboardChartDeleteArgs} args - Arguments to delete one DashboardChart.
     * @example
     * // Delete one DashboardChart
     * const DashboardChart = await prisma.dashboardChart.delete({
     *   where: {
     *     // ... filter to delete one DashboardChart
     *   }
     * })
     * 
     */
    delete<T extends DashboardChartDeleteArgs>(args: SelectSubset<T, DashboardChartDeleteArgs<ExtArgs>>): Prisma__DashboardChartClient<$Result.GetResult<Prisma.$DashboardChartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DashboardChart.
     * @param {DashboardChartUpdateArgs} args - Arguments to update one DashboardChart.
     * @example
     * // Update one DashboardChart
     * const dashboardChart = await prisma.dashboardChart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DashboardChartUpdateArgs>(args: SelectSubset<T, DashboardChartUpdateArgs<ExtArgs>>): Prisma__DashboardChartClient<$Result.GetResult<Prisma.$DashboardChartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DashboardCharts.
     * @param {DashboardChartDeleteManyArgs} args - Arguments to filter DashboardCharts to delete.
     * @example
     * // Delete a few DashboardCharts
     * const { count } = await prisma.dashboardChart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DashboardChartDeleteManyArgs>(args?: SelectSubset<T, DashboardChartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DashboardCharts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardChartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DashboardCharts
     * const dashboardChart = await prisma.dashboardChart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DashboardChartUpdateManyArgs>(args: SelectSubset<T, DashboardChartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DashboardChart.
     * @param {DashboardChartUpsertArgs} args - Arguments to update or create a DashboardChart.
     * @example
     * // Update or create a DashboardChart
     * const dashboardChart = await prisma.dashboardChart.upsert({
     *   create: {
     *     // ... data to create a DashboardChart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DashboardChart we want to update
     *   }
     * })
     */
    upsert<T extends DashboardChartUpsertArgs>(args: SelectSubset<T, DashboardChartUpsertArgs<ExtArgs>>): Prisma__DashboardChartClient<$Result.GetResult<Prisma.$DashboardChartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DashboardCharts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardChartCountArgs} args - Arguments to filter DashboardCharts to count.
     * @example
     * // Count the number of DashboardCharts
     * const count = await prisma.dashboardChart.count({
     *   where: {
     *     // ... the filter for the DashboardCharts we want to count
     *   }
     * })
    **/
    count<T extends DashboardChartCountArgs>(
      args?: Subset<T, DashboardChartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DashboardChartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DashboardChart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardChartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DashboardChartAggregateArgs>(args: Subset<T, DashboardChartAggregateArgs>): Prisma.PrismaPromise<GetDashboardChartAggregateType<T>>

    /**
     * Group by DashboardChart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardChartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DashboardChartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DashboardChartGroupByArgs['orderBy'] }
        : { orderBy?: DashboardChartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DashboardChartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDashboardChartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DashboardChart model
   */
  readonly fields: DashboardChartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DashboardChart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DashboardChartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dashboard<T extends DashboardDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DashboardDefaultArgs<ExtArgs>>): Prisma__DashboardClient<$Result.GetResult<Prisma.$DashboardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    chart<T extends ChartDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChartDefaultArgs<ExtArgs>>): Prisma__ChartClient<$Result.GetResult<Prisma.$ChartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DashboardChart model
   */
  interface DashboardChartFieldRefs {
    readonly id: FieldRef<"DashboardChart", 'String'>
    readonly dashboardId: FieldRef<"DashboardChart", 'String'>
    readonly chartId: FieldRef<"DashboardChart", 'String'>
    readonly positionX: FieldRef<"DashboardChart", 'Int'>
    readonly positionY: FieldRef<"DashboardChart", 'Int'>
    readonly width: FieldRef<"DashboardChart", 'Int'>
    readonly height: FieldRef<"DashboardChart", 'Int'>
    readonly order: FieldRef<"DashboardChart", 'Int'>
    readonly createdBy: FieldRef<"DashboardChart", 'String'>
    readonly createdAt: FieldRef<"DashboardChart", 'DateTime'>
    readonly createdIp: FieldRef<"DashboardChart", 'String'>
    readonly updatedBy: FieldRef<"DashboardChart", 'String'>
    readonly updatedAt: FieldRef<"DashboardChart", 'DateTime'>
    readonly updatedIp: FieldRef<"DashboardChart", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DashboardChart findUnique
   */
  export type DashboardChartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardChart
     */
    select?: DashboardChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardChart
     */
    omit?: DashboardChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardChartInclude<ExtArgs> | null
    /**
     * Filter, which DashboardChart to fetch.
     */
    where: DashboardChartWhereUniqueInput
  }

  /**
   * DashboardChart findUniqueOrThrow
   */
  export type DashboardChartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardChart
     */
    select?: DashboardChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardChart
     */
    omit?: DashboardChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardChartInclude<ExtArgs> | null
    /**
     * Filter, which DashboardChart to fetch.
     */
    where: DashboardChartWhereUniqueInput
  }

  /**
   * DashboardChart findFirst
   */
  export type DashboardChartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardChart
     */
    select?: DashboardChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardChart
     */
    omit?: DashboardChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardChartInclude<ExtArgs> | null
    /**
     * Filter, which DashboardChart to fetch.
     */
    where?: DashboardChartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DashboardCharts to fetch.
     */
    orderBy?: DashboardChartOrderByWithRelationInput | DashboardChartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DashboardCharts.
     */
    cursor?: DashboardChartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DashboardCharts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DashboardCharts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DashboardCharts.
     */
    distinct?: DashboardChartScalarFieldEnum | DashboardChartScalarFieldEnum[]
  }

  /**
   * DashboardChart findFirstOrThrow
   */
  export type DashboardChartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardChart
     */
    select?: DashboardChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardChart
     */
    omit?: DashboardChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardChartInclude<ExtArgs> | null
    /**
     * Filter, which DashboardChart to fetch.
     */
    where?: DashboardChartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DashboardCharts to fetch.
     */
    orderBy?: DashboardChartOrderByWithRelationInput | DashboardChartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DashboardCharts.
     */
    cursor?: DashboardChartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DashboardCharts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DashboardCharts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DashboardCharts.
     */
    distinct?: DashboardChartScalarFieldEnum | DashboardChartScalarFieldEnum[]
  }

  /**
   * DashboardChart findMany
   */
  export type DashboardChartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardChart
     */
    select?: DashboardChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardChart
     */
    omit?: DashboardChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardChartInclude<ExtArgs> | null
    /**
     * Filter, which DashboardCharts to fetch.
     */
    where?: DashboardChartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DashboardCharts to fetch.
     */
    orderBy?: DashboardChartOrderByWithRelationInput | DashboardChartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DashboardCharts.
     */
    cursor?: DashboardChartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DashboardCharts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DashboardCharts.
     */
    skip?: number
    distinct?: DashboardChartScalarFieldEnum | DashboardChartScalarFieldEnum[]
  }

  /**
   * DashboardChart create
   */
  export type DashboardChartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardChart
     */
    select?: DashboardChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardChart
     */
    omit?: DashboardChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardChartInclude<ExtArgs> | null
    /**
     * The data needed to create a DashboardChart.
     */
    data: XOR<DashboardChartCreateInput, DashboardChartUncheckedCreateInput>
  }

  /**
   * DashboardChart createMany
   */
  export type DashboardChartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DashboardCharts.
     */
    data: DashboardChartCreateManyInput | DashboardChartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DashboardChart update
   */
  export type DashboardChartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardChart
     */
    select?: DashboardChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardChart
     */
    omit?: DashboardChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardChartInclude<ExtArgs> | null
    /**
     * The data needed to update a DashboardChart.
     */
    data: XOR<DashboardChartUpdateInput, DashboardChartUncheckedUpdateInput>
    /**
     * Choose, which DashboardChart to update.
     */
    where: DashboardChartWhereUniqueInput
  }

  /**
   * DashboardChart updateMany
   */
  export type DashboardChartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DashboardCharts.
     */
    data: XOR<DashboardChartUpdateManyMutationInput, DashboardChartUncheckedUpdateManyInput>
    /**
     * Filter which DashboardCharts to update
     */
    where?: DashboardChartWhereInput
    /**
     * Limit how many DashboardCharts to update.
     */
    limit?: number
  }

  /**
   * DashboardChart upsert
   */
  export type DashboardChartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardChart
     */
    select?: DashboardChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardChart
     */
    omit?: DashboardChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardChartInclude<ExtArgs> | null
    /**
     * The filter to search for the DashboardChart to update in case it exists.
     */
    where: DashboardChartWhereUniqueInput
    /**
     * In case the DashboardChart found by the `where` argument doesn't exist, create a new DashboardChart with this data.
     */
    create: XOR<DashboardChartCreateInput, DashboardChartUncheckedCreateInput>
    /**
     * In case the DashboardChart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DashboardChartUpdateInput, DashboardChartUncheckedUpdateInput>
  }

  /**
   * DashboardChart delete
   */
  export type DashboardChartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardChart
     */
    select?: DashboardChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardChart
     */
    omit?: DashboardChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardChartInclude<ExtArgs> | null
    /**
     * Filter which DashboardChart to delete.
     */
    where: DashboardChartWhereUniqueInput
  }

  /**
   * DashboardChart deleteMany
   */
  export type DashboardChartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DashboardCharts to delete
     */
    where?: DashboardChartWhereInput
    /**
     * Limit how many DashboardCharts to delete.
     */
    limit?: number
  }

  /**
   * DashboardChart without action
   */
  export type DashboardChartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardChart
     */
    select?: DashboardChartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardChart
     */
    omit?: DashboardChartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardChartInclude<ExtArgs> | null
  }


  /**
   * Model DashboardFilter
   */

  export type AggregateDashboardFilter = {
    _count: DashboardFilterCountAggregateOutputType | null
    _avg: DashboardFilterAvgAggregateOutputType | null
    _sum: DashboardFilterSumAggregateOutputType | null
    _min: DashboardFilterMinAggregateOutputType | null
    _max: DashboardFilterMaxAggregateOutputType | null
  }

  export type DashboardFilterAvgAggregateOutputType = {
    order: number | null
  }

  export type DashboardFilterSumAggregateOutputType = {
    order: number | null
  }

  export type DashboardFilterMinAggregateOutputType = {
    id: string | null
    dashboardId: string | null
    name: string | null
    filterType: $Enums.FilterType | null
    connectionId: string | null
    targetColumn: string | null
    sourceQuery: string | null
    defaultValue: string | null
    order: number | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type DashboardFilterMaxAggregateOutputType = {
    id: string | null
    dashboardId: string | null
    name: string | null
    filterType: $Enums.FilterType | null
    connectionId: string | null
    targetColumn: string | null
    sourceQuery: string | null
    defaultValue: string | null
    order: number | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type DashboardFilterCountAggregateOutputType = {
    id: number
    dashboardId: number
    name: number
    filterType: number
    connectionId: number
    targetColumn: number
    sourceQuery: number
    defaultValue: number
    order: number
    createdBy: number
    createdAt: number
    createdIp: number
    updatedBy: number
    updatedAt: number
    updatedIp: number
    _all: number
  }


  export type DashboardFilterAvgAggregateInputType = {
    order?: true
  }

  export type DashboardFilterSumAggregateInputType = {
    order?: true
  }

  export type DashboardFilterMinAggregateInputType = {
    id?: true
    dashboardId?: true
    name?: true
    filterType?: true
    connectionId?: true
    targetColumn?: true
    sourceQuery?: true
    defaultValue?: true
    order?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type DashboardFilterMaxAggregateInputType = {
    id?: true
    dashboardId?: true
    name?: true
    filterType?: true
    connectionId?: true
    targetColumn?: true
    sourceQuery?: true
    defaultValue?: true
    order?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type DashboardFilterCountAggregateInputType = {
    id?: true
    dashboardId?: true
    name?: true
    filterType?: true
    connectionId?: true
    targetColumn?: true
    sourceQuery?: true
    defaultValue?: true
    order?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
    _all?: true
  }

  export type DashboardFilterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DashboardFilter to aggregate.
     */
    where?: DashboardFilterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DashboardFilters to fetch.
     */
    orderBy?: DashboardFilterOrderByWithRelationInput | DashboardFilterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DashboardFilterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DashboardFilters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DashboardFilters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DashboardFilters
    **/
    _count?: true | DashboardFilterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DashboardFilterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DashboardFilterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DashboardFilterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DashboardFilterMaxAggregateInputType
  }

  export type GetDashboardFilterAggregateType<T extends DashboardFilterAggregateArgs> = {
        [P in keyof T & keyof AggregateDashboardFilter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDashboardFilter[P]>
      : GetScalarType<T[P], AggregateDashboardFilter[P]>
  }




  export type DashboardFilterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DashboardFilterWhereInput
    orderBy?: DashboardFilterOrderByWithAggregationInput | DashboardFilterOrderByWithAggregationInput[]
    by: DashboardFilterScalarFieldEnum[] | DashboardFilterScalarFieldEnum
    having?: DashboardFilterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DashboardFilterCountAggregateInputType | true
    _avg?: DashboardFilterAvgAggregateInputType
    _sum?: DashboardFilterSumAggregateInputType
    _min?: DashboardFilterMinAggregateInputType
    _max?: DashboardFilterMaxAggregateInputType
  }

  export type DashboardFilterGroupByOutputType = {
    id: string
    dashboardId: string
    name: string
    filterType: $Enums.FilterType
    connectionId: string
    targetColumn: string
    sourceQuery: string | null
    defaultValue: string | null
    order: number
    createdBy: string | null
    createdAt: Date
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
    _count: DashboardFilterCountAggregateOutputType | null
    _avg: DashboardFilterAvgAggregateOutputType | null
    _sum: DashboardFilterSumAggregateOutputType | null
    _min: DashboardFilterMinAggregateOutputType | null
    _max: DashboardFilterMaxAggregateOutputType | null
  }

  type GetDashboardFilterGroupByPayload<T extends DashboardFilterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DashboardFilterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DashboardFilterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DashboardFilterGroupByOutputType[P]>
            : GetScalarType<T[P], DashboardFilterGroupByOutputType[P]>
        }
      >
    >


  export type DashboardFilterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dashboardId?: boolean
    name?: boolean
    filterType?: boolean
    connectionId?: boolean
    targetColumn?: boolean
    sourceQuery?: boolean
    defaultValue?: boolean
    order?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
    dashboard?: boolean | DashboardDefaultArgs<ExtArgs>
    connection?: boolean | DbConnectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dashboardFilter"]>



  export type DashboardFilterSelectScalar = {
    id?: boolean
    dashboardId?: boolean
    name?: boolean
    filterType?: boolean
    connectionId?: boolean
    targetColumn?: boolean
    sourceQuery?: boolean
    defaultValue?: boolean
    order?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
  }

  export type DashboardFilterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dashboardId" | "name" | "filterType" | "connectionId" | "targetColumn" | "sourceQuery" | "defaultValue" | "order" | "createdBy" | "createdAt" | "createdIp" | "updatedBy" | "updatedAt" | "updatedIp", ExtArgs["result"]["dashboardFilter"]>
  export type DashboardFilterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dashboard?: boolean | DashboardDefaultArgs<ExtArgs>
    connection?: boolean | DbConnectionDefaultArgs<ExtArgs>
  }

  export type $DashboardFilterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DashboardFilter"
    objects: {
      dashboard: Prisma.$DashboardPayload<ExtArgs>
      connection: Prisma.$DbConnectionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      dashboardId: string
      name: string
      filterType: $Enums.FilterType
      connectionId: string
      targetColumn: string
      sourceQuery: string | null
      defaultValue: string | null
      order: number
      createdBy: string | null
      createdAt: Date
      createdIp: string | null
      updatedBy: string | null
      updatedAt: Date | null
      updatedIp: string | null
    }, ExtArgs["result"]["dashboardFilter"]>
    composites: {}
  }

  type DashboardFilterGetPayload<S extends boolean | null | undefined | DashboardFilterDefaultArgs> = $Result.GetResult<Prisma.$DashboardFilterPayload, S>

  type DashboardFilterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DashboardFilterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DashboardFilterCountAggregateInputType | true
    }

  export interface DashboardFilterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DashboardFilter'], meta: { name: 'DashboardFilter' } }
    /**
     * Find zero or one DashboardFilter that matches the filter.
     * @param {DashboardFilterFindUniqueArgs} args - Arguments to find a DashboardFilter
     * @example
     * // Get one DashboardFilter
     * const dashboardFilter = await prisma.dashboardFilter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DashboardFilterFindUniqueArgs>(args: SelectSubset<T, DashboardFilterFindUniqueArgs<ExtArgs>>): Prisma__DashboardFilterClient<$Result.GetResult<Prisma.$DashboardFilterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DashboardFilter that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DashboardFilterFindUniqueOrThrowArgs} args - Arguments to find a DashboardFilter
     * @example
     * // Get one DashboardFilter
     * const dashboardFilter = await prisma.dashboardFilter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DashboardFilterFindUniqueOrThrowArgs>(args: SelectSubset<T, DashboardFilterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DashboardFilterClient<$Result.GetResult<Prisma.$DashboardFilterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DashboardFilter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardFilterFindFirstArgs} args - Arguments to find a DashboardFilter
     * @example
     * // Get one DashboardFilter
     * const dashboardFilter = await prisma.dashboardFilter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DashboardFilterFindFirstArgs>(args?: SelectSubset<T, DashboardFilterFindFirstArgs<ExtArgs>>): Prisma__DashboardFilterClient<$Result.GetResult<Prisma.$DashboardFilterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DashboardFilter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardFilterFindFirstOrThrowArgs} args - Arguments to find a DashboardFilter
     * @example
     * // Get one DashboardFilter
     * const dashboardFilter = await prisma.dashboardFilter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DashboardFilterFindFirstOrThrowArgs>(args?: SelectSubset<T, DashboardFilterFindFirstOrThrowArgs<ExtArgs>>): Prisma__DashboardFilterClient<$Result.GetResult<Prisma.$DashboardFilterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DashboardFilters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardFilterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DashboardFilters
     * const dashboardFilters = await prisma.dashboardFilter.findMany()
     * 
     * // Get first 10 DashboardFilters
     * const dashboardFilters = await prisma.dashboardFilter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dashboardFilterWithIdOnly = await prisma.dashboardFilter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DashboardFilterFindManyArgs>(args?: SelectSubset<T, DashboardFilterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DashboardFilterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DashboardFilter.
     * @param {DashboardFilterCreateArgs} args - Arguments to create a DashboardFilter.
     * @example
     * // Create one DashboardFilter
     * const DashboardFilter = await prisma.dashboardFilter.create({
     *   data: {
     *     // ... data to create a DashboardFilter
     *   }
     * })
     * 
     */
    create<T extends DashboardFilterCreateArgs>(args: SelectSubset<T, DashboardFilterCreateArgs<ExtArgs>>): Prisma__DashboardFilterClient<$Result.GetResult<Prisma.$DashboardFilterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DashboardFilters.
     * @param {DashboardFilterCreateManyArgs} args - Arguments to create many DashboardFilters.
     * @example
     * // Create many DashboardFilters
     * const dashboardFilter = await prisma.dashboardFilter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DashboardFilterCreateManyArgs>(args?: SelectSubset<T, DashboardFilterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a DashboardFilter.
     * @param {DashboardFilterDeleteArgs} args - Arguments to delete one DashboardFilter.
     * @example
     * // Delete one DashboardFilter
     * const DashboardFilter = await prisma.dashboardFilter.delete({
     *   where: {
     *     // ... filter to delete one DashboardFilter
     *   }
     * })
     * 
     */
    delete<T extends DashboardFilterDeleteArgs>(args: SelectSubset<T, DashboardFilterDeleteArgs<ExtArgs>>): Prisma__DashboardFilterClient<$Result.GetResult<Prisma.$DashboardFilterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DashboardFilter.
     * @param {DashboardFilterUpdateArgs} args - Arguments to update one DashboardFilter.
     * @example
     * // Update one DashboardFilter
     * const dashboardFilter = await prisma.dashboardFilter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DashboardFilterUpdateArgs>(args: SelectSubset<T, DashboardFilterUpdateArgs<ExtArgs>>): Prisma__DashboardFilterClient<$Result.GetResult<Prisma.$DashboardFilterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DashboardFilters.
     * @param {DashboardFilterDeleteManyArgs} args - Arguments to filter DashboardFilters to delete.
     * @example
     * // Delete a few DashboardFilters
     * const { count } = await prisma.dashboardFilter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DashboardFilterDeleteManyArgs>(args?: SelectSubset<T, DashboardFilterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DashboardFilters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardFilterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DashboardFilters
     * const dashboardFilter = await prisma.dashboardFilter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DashboardFilterUpdateManyArgs>(args: SelectSubset<T, DashboardFilterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DashboardFilter.
     * @param {DashboardFilterUpsertArgs} args - Arguments to update or create a DashboardFilter.
     * @example
     * // Update or create a DashboardFilter
     * const dashboardFilter = await prisma.dashboardFilter.upsert({
     *   create: {
     *     // ... data to create a DashboardFilter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DashboardFilter we want to update
     *   }
     * })
     */
    upsert<T extends DashboardFilterUpsertArgs>(args: SelectSubset<T, DashboardFilterUpsertArgs<ExtArgs>>): Prisma__DashboardFilterClient<$Result.GetResult<Prisma.$DashboardFilterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DashboardFilters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardFilterCountArgs} args - Arguments to filter DashboardFilters to count.
     * @example
     * // Count the number of DashboardFilters
     * const count = await prisma.dashboardFilter.count({
     *   where: {
     *     // ... the filter for the DashboardFilters we want to count
     *   }
     * })
    **/
    count<T extends DashboardFilterCountArgs>(
      args?: Subset<T, DashboardFilterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DashboardFilterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DashboardFilter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardFilterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DashboardFilterAggregateArgs>(args: Subset<T, DashboardFilterAggregateArgs>): Prisma.PrismaPromise<GetDashboardFilterAggregateType<T>>

    /**
     * Group by DashboardFilter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DashboardFilterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DashboardFilterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DashboardFilterGroupByArgs['orderBy'] }
        : { orderBy?: DashboardFilterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DashboardFilterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDashboardFilterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DashboardFilter model
   */
  readonly fields: DashboardFilterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DashboardFilter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DashboardFilterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dashboard<T extends DashboardDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DashboardDefaultArgs<ExtArgs>>): Prisma__DashboardClient<$Result.GetResult<Prisma.$DashboardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    connection<T extends DbConnectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DbConnectionDefaultArgs<ExtArgs>>): Prisma__DbConnectionClient<$Result.GetResult<Prisma.$DbConnectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DashboardFilter model
   */
  interface DashboardFilterFieldRefs {
    readonly id: FieldRef<"DashboardFilter", 'String'>
    readonly dashboardId: FieldRef<"DashboardFilter", 'String'>
    readonly name: FieldRef<"DashboardFilter", 'String'>
    readonly filterType: FieldRef<"DashboardFilter", 'FilterType'>
    readonly connectionId: FieldRef<"DashboardFilter", 'String'>
    readonly targetColumn: FieldRef<"DashboardFilter", 'String'>
    readonly sourceQuery: FieldRef<"DashboardFilter", 'String'>
    readonly defaultValue: FieldRef<"DashboardFilter", 'String'>
    readonly order: FieldRef<"DashboardFilter", 'Int'>
    readonly createdBy: FieldRef<"DashboardFilter", 'String'>
    readonly createdAt: FieldRef<"DashboardFilter", 'DateTime'>
    readonly createdIp: FieldRef<"DashboardFilter", 'String'>
    readonly updatedBy: FieldRef<"DashboardFilter", 'String'>
    readonly updatedAt: FieldRef<"DashboardFilter", 'DateTime'>
    readonly updatedIp: FieldRef<"DashboardFilter", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DashboardFilter findUnique
   */
  export type DashboardFilterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardFilter
     */
    select?: DashboardFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardFilter
     */
    omit?: DashboardFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardFilterInclude<ExtArgs> | null
    /**
     * Filter, which DashboardFilter to fetch.
     */
    where: DashboardFilterWhereUniqueInput
  }

  /**
   * DashboardFilter findUniqueOrThrow
   */
  export type DashboardFilterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardFilter
     */
    select?: DashboardFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardFilter
     */
    omit?: DashboardFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardFilterInclude<ExtArgs> | null
    /**
     * Filter, which DashboardFilter to fetch.
     */
    where: DashboardFilterWhereUniqueInput
  }

  /**
   * DashboardFilter findFirst
   */
  export type DashboardFilterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardFilter
     */
    select?: DashboardFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardFilter
     */
    omit?: DashboardFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardFilterInclude<ExtArgs> | null
    /**
     * Filter, which DashboardFilter to fetch.
     */
    where?: DashboardFilterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DashboardFilters to fetch.
     */
    orderBy?: DashboardFilterOrderByWithRelationInput | DashboardFilterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DashboardFilters.
     */
    cursor?: DashboardFilterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DashboardFilters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DashboardFilters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DashboardFilters.
     */
    distinct?: DashboardFilterScalarFieldEnum | DashboardFilterScalarFieldEnum[]
  }

  /**
   * DashboardFilter findFirstOrThrow
   */
  export type DashboardFilterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardFilter
     */
    select?: DashboardFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardFilter
     */
    omit?: DashboardFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardFilterInclude<ExtArgs> | null
    /**
     * Filter, which DashboardFilter to fetch.
     */
    where?: DashboardFilterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DashboardFilters to fetch.
     */
    orderBy?: DashboardFilterOrderByWithRelationInput | DashboardFilterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DashboardFilters.
     */
    cursor?: DashboardFilterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DashboardFilters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DashboardFilters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DashboardFilters.
     */
    distinct?: DashboardFilterScalarFieldEnum | DashboardFilterScalarFieldEnum[]
  }

  /**
   * DashboardFilter findMany
   */
  export type DashboardFilterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardFilter
     */
    select?: DashboardFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardFilter
     */
    omit?: DashboardFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardFilterInclude<ExtArgs> | null
    /**
     * Filter, which DashboardFilters to fetch.
     */
    where?: DashboardFilterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DashboardFilters to fetch.
     */
    orderBy?: DashboardFilterOrderByWithRelationInput | DashboardFilterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DashboardFilters.
     */
    cursor?: DashboardFilterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DashboardFilters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DashboardFilters.
     */
    skip?: number
    distinct?: DashboardFilterScalarFieldEnum | DashboardFilterScalarFieldEnum[]
  }

  /**
   * DashboardFilter create
   */
  export type DashboardFilterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardFilter
     */
    select?: DashboardFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardFilter
     */
    omit?: DashboardFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardFilterInclude<ExtArgs> | null
    /**
     * The data needed to create a DashboardFilter.
     */
    data: XOR<DashboardFilterCreateInput, DashboardFilterUncheckedCreateInput>
  }

  /**
   * DashboardFilter createMany
   */
  export type DashboardFilterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DashboardFilters.
     */
    data: DashboardFilterCreateManyInput | DashboardFilterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DashboardFilter update
   */
  export type DashboardFilterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardFilter
     */
    select?: DashboardFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardFilter
     */
    omit?: DashboardFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardFilterInclude<ExtArgs> | null
    /**
     * The data needed to update a DashboardFilter.
     */
    data: XOR<DashboardFilterUpdateInput, DashboardFilterUncheckedUpdateInput>
    /**
     * Choose, which DashboardFilter to update.
     */
    where: DashboardFilterWhereUniqueInput
  }

  /**
   * DashboardFilter updateMany
   */
  export type DashboardFilterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DashboardFilters.
     */
    data: XOR<DashboardFilterUpdateManyMutationInput, DashboardFilterUncheckedUpdateManyInput>
    /**
     * Filter which DashboardFilters to update
     */
    where?: DashboardFilterWhereInput
    /**
     * Limit how many DashboardFilters to update.
     */
    limit?: number
  }

  /**
   * DashboardFilter upsert
   */
  export type DashboardFilterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardFilter
     */
    select?: DashboardFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardFilter
     */
    omit?: DashboardFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardFilterInclude<ExtArgs> | null
    /**
     * The filter to search for the DashboardFilter to update in case it exists.
     */
    where: DashboardFilterWhereUniqueInput
    /**
     * In case the DashboardFilter found by the `where` argument doesn't exist, create a new DashboardFilter with this data.
     */
    create: XOR<DashboardFilterCreateInput, DashboardFilterUncheckedCreateInput>
    /**
     * In case the DashboardFilter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DashboardFilterUpdateInput, DashboardFilterUncheckedUpdateInput>
  }

  /**
   * DashboardFilter delete
   */
  export type DashboardFilterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardFilter
     */
    select?: DashboardFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardFilter
     */
    omit?: DashboardFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardFilterInclude<ExtArgs> | null
    /**
     * Filter which DashboardFilter to delete.
     */
    where: DashboardFilterWhereUniqueInput
  }

  /**
   * DashboardFilter deleteMany
   */
  export type DashboardFilterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DashboardFilters to delete
     */
    where?: DashboardFilterWhereInput
    /**
     * Limit how many DashboardFilters to delete.
     */
    limit?: number
  }

  /**
   * DashboardFilter without action
   */
  export type DashboardFilterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DashboardFilter
     */
    select?: DashboardFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DashboardFilter
     */
    omit?: DashboardFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DashboardFilterInclude<ExtArgs> | null
  }


  /**
   * Model GlobalFilter
   */

  export type AggregateGlobalFilter = {
    _count: GlobalFilterCountAggregateOutputType | null
    _avg: GlobalFilterAvgAggregateOutputType | null
    _sum: GlobalFilterSumAggregateOutputType | null
    _min: GlobalFilterMinAggregateOutputType | null
    _max: GlobalFilterMaxAggregateOutputType | null
  }

  export type GlobalFilterAvgAggregateOutputType = {
    order: number | null
  }

  export type GlobalFilterSumAggregateOutputType = {
    order: number | null
  }

  export type GlobalFilterMinAggregateOutputType = {
    id: string | null
    columnName: string | null
    columnValue: string | null
    missingColumnBehavior: $Enums.MissingColumnBehavior | null
    isEnabled: boolean | null
    order: number | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type GlobalFilterMaxAggregateOutputType = {
    id: string | null
    columnName: string | null
    columnValue: string | null
    missingColumnBehavior: $Enums.MissingColumnBehavior | null
    isEnabled: boolean | null
    order: number | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type GlobalFilterCountAggregateOutputType = {
    id: number
    columnName: number
    columnValue: number
    missingColumnBehavior: number
    isEnabled: number
    order: number
    createdBy: number
    createdAt: number
    createdIp: number
    updatedBy: number
    updatedAt: number
    updatedIp: number
    _all: number
  }


  export type GlobalFilterAvgAggregateInputType = {
    order?: true
  }

  export type GlobalFilterSumAggregateInputType = {
    order?: true
  }

  export type GlobalFilterMinAggregateInputType = {
    id?: true
    columnName?: true
    columnValue?: true
    missingColumnBehavior?: true
    isEnabled?: true
    order?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type GlobalFilterMaxAggregateInputType = {
    id?: true
    columnName?: true
    columnValue?: true
    missingColumnBehavior?: true
    isEnabled?: true
    order?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type GlobalFilterCountAggregateInputType = {
    id?: true
    columnName?: true
    columnValue?: true
    missingColumnBehavior?: true
    isEnabled?: true
    order?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
    _all?: true
  }

  export type GlobalFilterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalFilter to aggregate.
     */
    where?: GlobalFilterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalFilters to fetch.
     */
    orderBy?: GlobalFilterOrderByWithRelationInput | GlobalFilterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GlobalFilterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalFilters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalFilters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GlobalFilters
    **/
    _count?: true | GlobalFilterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GlobalFilterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GlobalFilterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GlobalFilterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GlobalFilterMaxAggregateInputType
  }

  export type GetGlobalFilterAggregateType<T extends GlobalFilterAggregateArgs> = {
        [P in keyof T & keyof AggregateGlobalFilter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGlobalFilter[P]>
      : GetScalarType<T[P], AggregateGlobalFilter[P]>
  }




  export type GlobalFilterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GlobalFilterWhereInput
    orderBy?: GlobalFilterOrderByWithAggregationInput | GlobalFilterOrderByWithAggregationInput[]
    by: GlobalFilterScalarFieldEnum[] | GlobalFilterScalarFieldEnum
    having?: GlobalFilterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GlobalFilterCountAggregateInputType | true
    _avg?: GlobalFilterAvgAggregateInputType
    _sum?: GlobalFilterSumAggregateInputType
    _min?: GlobalFilterMinAggregateInputType
    _max?: GlobalFilterMaxAggregateInputType
  }

  export type GlobalFilterGroupByOutputType = {
    id: string
    columnName: string
    columnValue: string
    missingColumnBehavior: $Enums.MissingColumnBehavior | null
    isEnabled: boolean
    order: number
    createdBy: string | null
    createdAt: Date
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
    _count: GlobalFilterCountAggregateOutputType | null
    _avg: GlobalFilterAvgAggregateOutputType | null
    _sum: GlobalFilterSumAggregateOutputType | null
    _min: GlobalFilterMinAggregateOutputType | null
    _max: GlobalFilterMaxAggregateOutputType | null
  }

  type GetGlobalFilterGroupByPayload<T extends GlobalFilterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GlobalFilterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GlobalFilterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GlobalFilterGroupByOutputType[P]>
            : GetScalarType<T[P], GlobalFilterGroupByOutputType[P]>
        }
      >
    >


  export type GlobalFilterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    columnName?: boolean
    columnValue?: boolean
    missingColumnBehavior?: boolean
    isEnabled?: boolean
    order?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
    overrides?: boolean | GlobalFilter$overridesArgs<ExtArgs>
    _count?: boolean | GlobalFilterCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["globalFilter"]>



  export type GlobalFilterSelectScalar = {
    id?: boolean
    columnName?: boolean
    columnValue?: boolean
    missingColumnBehavior?: boolean
    isEnabled?: boolean
    order?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
  }

  export type GlobalFilterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "columnName" | "columnValue" | "missingColumnBehavior" | "isEnabled" | "order" | "createdBy" | "createdAt" | "createdIp" | "updatedBy" | "updatedAt" | "updatedIp", ExtArgs["result"]["globalFilter"]>
  export type GlobalFilterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    overrides?: boolean | GlobalFilter$overridesArgs<ExtArgs>
    _count?: boolean | GlobalFilterCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $GlobalFilterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GlobalFilter"
    objects: {
      overrides: Prisma.$GlobalFilterOverridePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      columnName: string
      columnValue: string
      missingColumnBehavior: $Enums.MissingColumnBehavior | null
      isEnabled: boolean
      order: number
      createdBy: string | null
      createdAt: Date
      createdIp: string | null
      updatedBy: string | null
      updatedAt: Date | null
      updatedIp: string | null
    }, ExtArgs["result"]["globalFilter"]>
    composites: {}
  }

  type GlobalFilterGetPayload<S extends boolean | null | undefined | GlobalFilterDefaultArgs> = $Result.GetResult<Prisma.$GlobalFilterPayload, S>

  type GlobalFilterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GlobalFilterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GlobalFilterCountAggregateInputType | true
    }

  export interface GlobalFilterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GlobalFilter'], meta: { name: 'GlobalFilter' } }
    /**
     * Find zero or one GlobalFilter that matches the filter.
     * @param {GlobalFilterFindUniqueArgs} args - Arguments to find a GlobalFilter
     * @example
     * // Get one GlobalFilter
     * const globalFilter = await prisma.globalFilter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GlobalFilterFindUniqueArgs>(args: SelectSubset<T, GlobalFilterFindUniqueArgs<ExtArgs>>): Prisma__GlobalFilterClient<$Result.GetResult<Prisma.$GlobalFilterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GlobalFilter that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GlobalFilterFindUniqueOrThrowArgs} args - Arguments to find a GlobalFilter
     * @example
     * // Get one GlobalFilter
     * const globalFilter = await prisma.globalFilter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GlobalFilterFindUniqueOrThrowArgs>(args: SelectSubset<T, GlobalFilterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GlobalFilterClient<$Result.GetResult<Prisma.$GlobalFilterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GlobalFilter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalFilterFindFirstArgs} args - Arguments to find a GlobalFilter
     * @example
     * // Get one GlobalFilter
     * const globalFilter = await prisma.globalFilter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GlobalFilterFindFirstArgs>(args?: SelectSubset<T, GlobalFilterFindFirstArgs<ExtArgs>>): Prisma__GlobalFilterClient<$Result.GetResult<Prisma.$GlobalFilterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GlobalFilter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalFilterFindFirstOrThrowArgs} args - Arguments to find a GlobalFilter
     * @example
     * // Get one GlobalFilter
     * const globalFilter = await prisma.globalFilter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GlobalFilterFindFirstOrThrowArgs>(args?: SelectSubset<T, GlobalFilterFindFirstOrThrowArgs<ExtArgs>>): Prisma__GlobalFilterClient<$Result.GetResult<Prisma.$GlobalFilterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GlobalFilters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalFilterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GlobalFilters
     * const globalFilters = await prisma.globalFilter.findMany()
     * 
     * // Get first 10 GlobalFilters
     * const globalFilters = await prisma.globalFilter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const globalFilterWithIdOnly = await prisma.globalFilter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GlobalFilterFindManyArgs>(args?: SelectSubset<T, GlobalFilterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalFilterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GlobalFilter.
     * @param {GlobalFilterCreateArgs} args - Arguments to create a GlobalFilter.
     * @example
     * // Create one GlobalFilter
     * const GlobalFilter = await prisma.globalFilter.create({
     *   data: {
     *     // ... data to create a GlobalFilter
     *   }
     * })
     * 
     */
    create<T extends GlobalFilterCreateArgs>(args: SelectSubset<T, GlobalFilterCreateArgs<ExtArgs>>): Prisma__GlobalFilterClient<$Result.GetResult<Prisma.$GlobalFilterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GlobalFilters.
     * @param {GlobalFilterCreateManyArgs} args - Arguments to create many GlobalFilters.
     * @example
     * // Create many GlobalFilters
     * const globalFilter = await prisma.globalFilter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GlobalFilterCreateManyArgs>(args?: SelectSubset<T, GlobalFilterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a GlobalFilter.
     * @param {GlobalFilterDeleteArgs} args - Arguments to delete one GlobalFilter.
     * @example
     * // Delete one GlobalFilter
     * const GlobalFilter = await prisma.globalFilter.delete({
     *   where: {
     *     // ... filter to delete one GlobalFilter
     *   }
     * })
     * 
     */
    delete<T extends GlobalFilterDeleteArgs>(args: SelectSubset<T, GlobalFilterDeleteArgs<ExtArgs>>): Prisma__GlobalFilterClient<$Result.GetResult<Prisma.$GlobalFilterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GlobalFilter.
     * @param {GlobalFilterUpdateArgs} args - Arguments to update one GlobalFilter.
     * @example
     * // Update one GlobalFilter
     * const globalFilter = await prisma.globalFilter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GlobalFilterUpdateArgs>(args: SelectSubset<T, GlobalFilterUpdateArgs<ExtArgs>>): Prisma__GlobalFilterClient<$Result.GetResult<Prisma.$GlobalFilterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GlobalFilters.
     * @param {GlobalFilterDeleteManyArgs} args - Arguments to filter GlobalFilters to delete.
     * @example
     * // Delete a few GlobalFilters
     * const { count } = await prisma.globalFilter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GlobalFilterDeleteManyArgs>(args?: SelectSubset<T, GlobalFilterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GlobalFilters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalFilterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GlobalFilters
     * const globalFilter = await prisma.globalFilter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GlobalFilterUpdateManyArgs>(args: SelectSubset<T, GlobalFilterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GlobalFilter.
     * @param {GlobalFilterUpsertArgs} args - Arguments to update or create a GlobalFilter.
     * @example
     * // Update or create a GlobalFilter
     * const globalFilter = await prisma.globalFilter.upsert({
     *   create: {
     *     // ... data to create a GlobalFilter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GlobalFilter we want to update
     *   }
     * })
     */
    upsert<T extends GlobalFilterUpsertArgs>(args: SelectSubset<T, GlobalFilterUpsertArgs<ExtArgs>>): Prisma__GlobalFilterClient<$Result.GetResult<Prisma.$GlobalFilterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GlobalFilters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalFilterCountArgs} args - Arguments to filter GlobalFilters to count.
     * @example
     * // Count the number of GlobalFilters
     * const count = await prisma.globalFilter.count({
     *   where: {
     *     // ... the filter for the GlobalFilters we want to count
     *   }
     * })
    **/
    count<T extends GlobalFilterCountArgs>(
      args?: Subset<T, GlobalFilterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GlobalFilterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GlobalFilter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalFilterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GlobalFilterAggregateArgs>(args: Subset<T, GlobalFilterAggregateArgs>): Prisma.PrismaPromise<GetGlobalFilterAggregateType<T>>

    /**
     * Group by GlobalFilter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalFilterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GlobalFilterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GlobalFilterGroupByArgs['orderBy'] }
        : { orderBy?: GlobalFilterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GlobalFilterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGlobalFilterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GlobalFilter model
   */
  readonly fields: GlobalFilterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GlobalFilter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GlobalFilterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    overrides<T extends GlobalFilter$overridesArgs<ExtArgs> = {}>(args?: Subset<T, GlobalFilter$overridesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalFilterOverridePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GlobalFilter model
   */
  interface GlobalFilterFieldRefs {
    readonly id: FieldRef<"GlobalFilter", 'String'>
    readonly columnName: FieldRef<"GlobalFilter", 'String'>
    readonly columnValue: FieldRef<"GlobalFilter", 'String'>
    readonly missingColumnBehavior: FieldRef<"GlobalFilter", 'MissingColumnBehavior'>
    readonly isEnabled: FieldRef<"GlobalFilter", 'Boolean'>
    readonly order: FieldRef<"GlobalFilter", 'Int'>
    readonly createdBy: FieldRef<"GlobalFilter", 'String'>
    readonly createdAt: FieldRef<"GlobalFilter", 'DateTime'>
    readonly createdIp: FieldRef<"GlobalFilter", 'String'>
    readonly updatedBy: FieldRef<"GlobalFilter", 'String'>
    readonly updatedAt: FieldRef<"GlobalFilter", 'DateTime'>
    readonly updatedIp: FieldRef<"GlobalFilter", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GlobalFilter findUnique
   */
  export type GlobalFilterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilter
     */
    select?: GlobalFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilter
     */
    omit?: GlobalFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterInclude<ExtArgs> | null
    /**
     * Filter, which GlobalFilter to fetch.
     */
    where: GlobalFilterWhereUniqueInput
  }

  /**
   * GlobalFilter findUniqueOrThrow
   */
  export type GlobalFilterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilter
     */
    select?: GlobalFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilter
     */
    omit?: GlobalFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterInclude<ExtArgs> | null
    /**
     * Filter, which GlobalFilter to fetch.
     */
    where: GlobalFilterWhereUniqueInput
  }

  /**
   * GlobalFilter findFirst
   */
  export type GlobalFilterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilter
     */
    select?: GlobalFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilter
     */
    omit?: GlobalFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterInclude<ExtArgs> | null
    /**
     * Filter, which GlobalFilter to fetch.
     */
    where?: GlobalFilterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalFilters to fetch.
     */
    orderBy?: GlobalFilterOrderByWithRelationInput | GlobalFilterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalFilters.
     */
    cursor?: GlobalFilterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalFilters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalFilters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalFilters.
     */
    distinct?: GlobalFilterScalarFieldEnum | GlobalFilterScalarFieldEnum[]
  }

  /**
   * GlobalFilter findFirstOrThrow
   */
  export type GlobalFilterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilter
     */
    select?: GlobalFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilter
     */
    omit?: GlobalFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterInclude<ExtArgs> | null
    /**
     * Filter, which GlobalFilter to fetch.
     */
    where?: GlobalFilterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalFilters to fetch.
     */
    orderBy?: GlobalFilterOrderByWithRelationInput | GlobalFilterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalFilters.
     */
    cursor?: GlobalFilterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalFilters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalFilters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalFilters.
     */
    distinct?: GlobalFilterScalarFieldEnum | GlobalFilterScalarFieldEnum[]
  }

  /**
   * GlobalFilter findMany
   */
  export type GlobalFilterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilter
     */
    select?: GlobalFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilter
     */
    omit?: GlobalFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterInclude<ExtArgs> | null
    /**
     * Filter, which GlobalFilters to fetch.
     */
    where?: GlobalFilterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalFilters to fetch.
     */
    orderBy?: GlobalFilterOrderByWithRelationInput | GlobalFilterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GlobalFilters.
     */
    cursor?: GlobalFilterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalFilters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalFilters.
     */
    skip?: number
    distinct?: GlobalFilterScalarFieldEnum | GlobalFilterScalarFieldEnum[]
  }

  /**
   * GlobalFilter create
   */
  export type GlobalFilterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilter
     */
    select?: GlobalFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilter
     */
    omit?: GlobalFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterInclude<ExtArgs> | null
    /**
     * The data needed to create a GlobalFilter.
     */
    data: XOR<GlobalFilterCreateInput, GlobalFilterUncheckedCreateInput>
  }

  /**
   * GlobalFilter createMany
   */
  export type GlobalFilterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GlobalFilters.
     */
    data: GlobalFilterCreateManyInput | GlobalFilterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GlobalFilter update
   */
  export type GlobalFilterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilter
     */
    select?: GlobalFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilter
     */
    omit?: GlobalFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterInclude<ExtArgs> | null
    /**
     * The data needed to update a GlobalFilter.
     */
    data: XOR<GlobalFilterUpdateInput, GlobalFilterUncheckedUpdateInput>
    /**
     * Choose, which GlobalFilter to update.
     */
    where: GlobalFilterWhereUniqueInput
  }

  /**
   * GlobalFilter updateMany
   */
  export type GlobalFilterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GlobalFilters.
     */
    data: XOR<GlobalFilterUpdateManyMutationInput, GlobalFilterUncheckedUpdateManyInput>
    /**
     * Filter which GlobalFilters to update
     */
    where?: GlobalFilterWhereInput
    /**
     * Limit how many GlobalFilters to update.
     */
    limit?: number
  }

  /**
   * GlobalFilter upsert
   */
  export type GlobalFilterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilter
     */
    select?: GlobalFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilter
     */
    omit?: GlobalFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterInclude<ExtArgs> | null
    /**
     * The filter to search for the GlobalFilter to update in case it exists.
     */
    where: GlobalFilterWhereUniqueInput
    /**
     * In case the GlobalFilter found by the `where` argument doesn't exist, create a new GlobalFilter with this data.
     */
    create: XOR<GlobalFilterCreateInput, GlobalFilterUncheckedCreateInput>
    /**
     * In case the GlobalFilter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GlobalFilterUpdateInput, GlobalFilterUncheckedUpdateInput>
  }

  /**
   * GlobalFilter delete
   */
  export type GlobalFilterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilter
     */
    select?: GlobalFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilter
     */
    omit?: GlobalFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterInclude<ExtArgs> | null
    /**
     * Filter which GlobalFilter to delete.
     */
    where: GlobalFilterWhereUniqueInput
  }

  /**
   * GlobalFilter deleteMany
   */
  export type GlobalFilterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalFilters to delete
     */
    where?: GlobalFilterWhereInput
    /**
     * Limit how many GlobalFilters to delete.
     */
    limit?: number
  }

  /**
   * GlobalFilter.overrides
   */
  export type GlobalFilter$overridesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilterOverride
     */
    select?: GlobalFilterOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilterOverride
     */
    omit?: GlobalFilterOverrideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterOverrideInclude<ExtArgs> | null
    where?: GlobalFilterOverrideWhereInput
    orderBy?: GlobalFilterOverrideOrderByWithRelationInput | GlobalFilterOverrideOrderByWithRelationInput[]
    cursor?: GlobalFilterOverrideWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GlobalFilterOverrideScalarFieldEnum | GlobalFilterOverrideScalarFieldEnum[]
  }

  /**
   * GlobalFilter without action
   */
  export type GlobalFilterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilter
     */
    select?: GlobalFilterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilter
     */
    omit?: GlobalFilterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterInclude<ExtArgs> | null
  }


  /**
   * Model GlobalFilterOverride
   */

  export type AggregateGlobalFilterOverride = {
    _count: GlobalFilterOverrideCountAggregateOutputType | null
    _min: GlobalFilterOverrideMinAggregateOutputType | null
    _max: GlobalFilterOverrideMaxAggregateOutputType | null
  }

  export type GlobalFilterOverrideMinAggregateOutputType = {
    id: string | null
    globalFilterId: string | null
    dashboardId: string | null
    isDisabled: boolean | null
    columnValue: string | null
    missingColumnBehavior: $Enums.MissingColumnBehavior | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type GlobalFilterOverrideMaxAggregateOutputType = {
    id: string | null
    globalFilterId: string | null
    dashboardId: string | null
    isDisabled: boolean | null
    columnValue: string | null
    missingColumnBehavior: $Enums.MissingColumnBehavior | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type GlobalFilterOverrideCountAggregateOutputType = {
    id: number
    globalFilterId: number
    dashboardId: number
    isDisabled: number
    columnValue: number
    missingColumnBehavior: number
    createdBy: number
    createdAt: number
    createdIp: number
    updatedBy: number
    updatedAt: number
    updatedIp: number
    _all: number
  }


  export type GlobalFilterOverrideMinAggregateInputType = {
    id?: true
    globalFilterId?: true
    dashboardId?: true
    isDisabled?: true
    columnValue?: true
    missingColumnBehavior?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type GlobalFilterOverrideMaxAggregateInputType = {
    id?: true
    globalFilterId?: true
    dashboardId?: true
    isDisabled?: true
    columnValue?: true
    missingColumnBehavior?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type GlobalFilterOverrideCountAggregateInputType = {
    id?: true
    globalFilterId?: true
    dashboardId?: true
    isDisabled?: true
    columnValue?: true
    missingColumnBehavior?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
    _all?: true
  }

  export type GlobalFilterOverrideAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalFilterOverride to aggregate.
     */
    where?: GlobalFilterOverrideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalFilterOverrides to fetch.
     */
    orderBy?: GlobalFilterOverrideOrderByWithRelationInput | GlobalFilterOverrideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GlobalFilterOverrideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalFilterOverrides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalFilterOverrides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GlobalFilterOverrides
    **/
    _count?: true | GlobalFilterOverrideCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GlobalFilterOverrideMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GlobalFilterOverrideMaxAggregateInputType
  }

  export type GetGlobalFilterOverrideAggregateType<T extends GlobalFilterOverrideAggregateArgs> = {
        [P in keyof T & keyof AggregateGlobalFilterOverride]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGlobalFilterOverride[P]>
      : GetScalarType<T[P], AggregateGlobalFilterOverride[P]>
  }




  export type GlobalFilterOverrideGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GlobalFilterOverrideWhereInput
    orderBy?: GlobalFilterOverrideOrderByWithAggregationInput | GlobalFilterOverrideOrderByWithAggregationInput[]
    by: GlobalFilterOverrideScalarFieldEnum[] | GlobalFilterOverrideScalarFieldEnum
    having?: GlobalFilterOverrideScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GlobalFilterOverrideCountAggregateInputType | true
    _min?: GlobalFilterOverrideMinAggregateInputType
    _max?: GlobalFilterOverrideMaxAggregateInputType
  }

  export type GlobalFilterOverrideGroupByOutputType = {
    id: string
    globalFilterId: string
    dashboardId: string
    isDisabled: boolean
    columnValue: string | null
    missingColumnBehavior: $Enums.MissingColumnBehavior | null
    createdBy: string | null
    createdAt: Date
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
    _count: GlobalFilterOverrideCountAggregateOutputType | null
    _min: GlobalFilterOverrideMinAggregateOutputType | null
    _max: GlobalFilterOverrideMaxAggregateOutputType | null
  }

  type GetGlobalFilterOverrideGroupByPayload<T extends GlobalFilterOverrideGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GlobalFilterOverrideGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GlobalFilterOverrideGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GlobalFilterOverrideGroupByOutputType[P]>
            : GetScalarType<T[P], GlobalFilterOverrideGroupByOutputType[P]>
        }
      >
    >


  export type GlobalFilterOverrideSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    globalFilterId?: boolean
    dashboardId?: boolean
    isDisabled?: boolean
    columnValue?: boolean
    missingColumnBehavior?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
    globalFilter?: boolean | GlobalFilterDefaultArgs<ExtArgs>
    dashboard?: boolean | DashboardDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["globalFilterOverride"]>



  export type GlobalFilterOverrideSelectScalar = {
    id?: boolean
    globalFilterId?: boolean
    dashboardId?: boolean
    isDisabled?: boolean
    columnValue?: boolean
    missingColumnBehavior?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
  }

  export type GlobalFilterOverrideOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "globalFilterId" | "dashboardId" | "isDisabled" | "columnValue" | "missingColumnBehavior" | "createdBy" | "createdAt" | "createdIp" | "updatedBy" | "updatedAt" | "updatedIp", ExtArgs["result"]["globalFilterOverride"]>
  export type GlobalFilterOverrideInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    globalFilter?: boolean | GlobalFilterDefaultArgs<ExtArgs>
    dashboard?: boolean | DashboardDefaultArgs<ExtArgs>
  }

  export type $GlobalFilterOverridePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GlobalFilterOverride"
    objects: {
      globalFilter: Prisma.$GlobalFilterPayload<ExtArgs>
      dashboard: Prisma.$DashboardPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      globalFilterId: string
      dashboardId: string
      isDisabled: boolean
      columnValue: string | null
      missingColumnBehavior: $Enums.MissingColumnBehavior | null
      createdBy: string | null
      createdAt: Date
      createdIp: string | null
      updatedBy: string | null
      updatedAt: Date | null
      updatedIp: string | null
    }, ExtArgs["result"]["globalFilterOverride"]>
    composites: {}
  }

  type GlobalFilterOverrideGetPayload<S extends boolean | null | undefined | GlobalFilterOverrideDefaultArgs> = $Result.GetResult<Prisma.$GlobalFilterOverridePayload, S>

  type GlobalFilterOverrideCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GlobalFilterOverrideFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GlobalFilterOverrideCountAggregateInputType | true
    }

  export interface GlobalFilterOverrideDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GlobalFilterOverride'], meta: { name: 'GlobalFilterOverride' } }
    /**
     * Find zero or one GlobalFilterOverride that matches the filter.
     * @param {GlobalFilterOverrideFindUniqueArgs} args - Arguments to find a GlobalFilterOverride
     * @example
     * // Get one GlobalFilterOverride
     * const globalFilterOverride = await prisma.globalFilterOverride.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GlobalFilterOverrideFindUniqueArgs>(args: SelectSubset<T, GlobalFilterOverrideFindUniqueArgs<ExtArgs>>): Prisma__GlobalFilterOverrideClient<$Result.GetResult<Prisma.$GlobalFilterOverridePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GlobalFilterOverride that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GlobalFilterOverrideFindUniqueOrThrowArgs} args - Arguments to find a GlobalFilterOverride
     * @example
     * // Get one GlobalFilterOverride
     * const globalFilterOverride = await prisma.globalFilterOverride.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GlobalFilterOverrideFindUniqueOrThrowArgs>(args: SelectSubset<T, GlobalFilterOverrideFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GlobalFilterOverrideClient<$Result.GetResult<Prisma.$GlobalFilterOverridePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GlobalFilterOverride that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalFilterOverrideFindFirstArgs} args - Arguments to find a GlobalFilterOverride
     * @example
     * // Get one GlobalFilterOverride
     * const globalFilterOverride = await prisma.globalFilterOverride.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GlobalFilterOverrideFindFirstArgs>(args?: SelectSubset<T, GlobalFilterOverrideFindFirstArgs<ExtArgs>>): Prisma__GlobalFilterOverrideClient<$Result.GetResult<Prisma.$GlobalFilterOverridePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GlobalFilterOverride that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalFilterOverrideFindFirstOrThrowArgs} args - Arguments to find a GlobalFilterOverride
     * @example
     * // Get one GlobalFilterOverride
     * const globalFilterOverride = await prisma.globalFilterOverride.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GlobalFilterOverrideFindFirstOrThrowArgs>(args?: SelectSubset<T, GlobalFilterOverrideFindFirstOrThrowArgs<ExtArgs>>): Prisma__GlobalFilterOverrideClient<$Result.GetResult<Prisma.$GlobalFilterOverridePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GlobalFilterOverrides that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalFilterOverrideFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GlobalFilterOverrides
     * const globalFilterOverrides = await prisma.globalFilterOverride.findMany()
     * 
     * // Get first 10 GlobalFilterOverrides
     * const globalFilterOverrides = await prisma.globalFilterOverride.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const globalFilterOverrideWithIdOnly = await prisma.globalFilterOverride.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GlobalFilterOverrideFindManyArgs>(args?: SelectSubset<T, GlobalFilterOverrideFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GlobalFilterOverridePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GlobalFilterOverride.
     * @param {GlobalFilterOverrideCreateArgs} args - Arguments to create a GlobalFilterOverride.
     * @example
     * // Create one GlobalFilterOverride
     * const GlobalFilterOverride = await prisma.globalFilterOverride.create({
     *   data: {
     *     // ... data to create a GlobalFilterOverride
     *   }
     * })
     * 
     */
    create<T extends GlobalFilterOverrideCreateArgs>(args: SelectSubset<T, GlobalFilterOverrideCreateArgs<ExtArgs>>): Prisma__GlobalFilterOverrideClient<$Result.GetResult<Prisma.$GlobalFilterOverridePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GlobalFilterOverrides.
     * @param {GlobalFilterOverrideCreateManyArgs} args - Arguments to create many GlobalFilterOverrides.
     * @example
     * // Create many GlobalFilterOverrides
     * const globalFilterOverride = await prisma.globalFilterOverride.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GlobalFilterOverrideCreateManyArgs>(args?: SelectSubset<T, GlobalFilterOverrideCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a GlobalFilterOverride.
     * @param {GlobalFilterOverrideDeleteArgs} args - Arguments to delete one GlobalFilterOverride.
     * @example
     * // Delete one GlobalFilterOverride
     * const GlobalFilterOverride = await prisma.globalFilterOverride.delete({
     *   where: {
     *     // ... filter to delete one GlobalFilterOverride
     *   }
     * })
     * 
     */
    delete<T extends GlobalFilterOverrideDeleteArgs>(args: SelectSubset<T, GlobalFilterOverrideDeleteArgs<ExtArgs>>): Prisma__GlobalFilterOverrideClient<$Result.GetResult<Prisma.$GlobalFilterOverridePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GlobalFilterOverride.
     * @param {GlobalFilterOverrideUpdateArgs} args - Arguments to update one GlobalFilterOverride.
     * @example
     * // Update one GlobalFilterOverride
     * const globalFilterOverride = await prisma.globalFilterOverride.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GlobalFilterOverrideUpdateArgs>(args: SelectSubset<T, GlobalFilterOverrideUpdateArgs<ExtArgs>>): Prisma__GlobalFilterOverrideClient<$Result.GetResult<Prisma.$GlobalFilterOverridePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GlobalFilterOverrides.
     * @param {GlobalFilterOverrideDeleteManyArgs} args - Arguments to filter GlobalFilterOverrides to delete.
     * @example
     * // Delete a few GlobalFilterOverrides
     * const { count } = await prisma.globalFilterOverride.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GlobalFilterOverrideDeleteManyArgs>(args?: SelectSubset<T, GlobalFilterOverrideDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GlobalFilterOverrides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalFilterOverrideUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GlobalFilterOverrides
     * const globalFilterOverride = await prisma.globalFilterOverride.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GlobalFilterOverrideUpdateManyArgs>(args: SelectSubset<T, GlobalFilterOverrideUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GlobalFilterOverride.
     * @param {GlobalFilterOverrideUpsertArgs} args - Arguments to update or create a GlobalFilterOverride.
     * @example
     * // Update or create a GlobalFilterOverride
     * const globalFilterOverride = await prisma.globalFilterOverride.upsert({
     *   create: {
     *     // ... data to create a GlobalFilterOverride
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GlobalFilterOverride we want to update
     *   }
     * })
     */
    upsert<T extends GlobalFilterOverrideUpsertArgs>(args: SelectSubset<T, GlobalFilterOverrideUpsertArgs<ExtArgs>>): Prisma__GlobalFilterOverrideClient<$Result.GetResult<Prisma.$GlobalFilterOverridePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GlobalFilterOverrides.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalFilterOverrideCountArgs} args - Arguments to filter GlobalFilterOverrides to count.
     * @example
     * // Count the number of GlobalFilterOverrides
     * const count = await prisma.globalFilterOverride.count({
     *   where: {
     *     // ... the filter for the GlobalFilterOverrides we want to count
     *   }
     * })
    **/
    count<T extends GlobalFilterOverrideCountArgs>(
      args?: Subset<T, GlobalFilterOverrideCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GlobalFilterOverrideCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GlobalFilterOverride.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalFilterOverrideAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GlobalFilterOverrideAggregateArgs>(args: Subset<T, GlobalFilterOverrideAggregateArgs>): Prisma.PrismaPromise<GetGlobalFilterOverrideAggregateType<T>>

    /**
     * Group by GlobalFilterOverride.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GlobalFilterOverrideGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GlobalFilterOverrideGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GlobalFilterOverrideGroupByArgs['orderBy'] }
        : { orderBy?: GlobalFilterOverrideGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GlobalFilterOverrideGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGlobalFilterOverrideGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GlobalFilterOverride model
   */
  readonly fields: GlobalFilterOverrideFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GlobalFilterOverride.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GlobalFilterOverrideClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    globalFilter<T extends GlobalFilterDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GlobalFilterDefaultArgs<ExtArgs>>): Prisma__GlobalFilterClient<$Result.GetResult<Prisma.$GlobalFilterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    dashboard<T extends DashboardDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DashboardDefaultArgs<ExtArgs>>): Prisma__DashboardClient<$Result.GetResult<Prisma.$DashboardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GlobalFilterOverride model
   */
  interface GlobalFilterOverrideFieldRefs {
    readonly id: FieldRef<"GlobalFilterOverride", 'String'>
    readonly globalFilterId: FieldRef<"GlobalFilterOverride", 'String'>
    readonly dashboardId: FieldRef<"GlobalFilterOverride", 'String'>
    readonly isDisabled: FieldRef<"GlobalFilterOverride", 'Boolean'>
    readonly columnValue: FieldRef<"GlobalFilterOverride", 'String'>
    readonly missingColumnBehavior: FieldRef<"GlobalFilterOverride", 'MissingColumnBehavior'>
    readonly createdBy: FieldRef<"GlobalFilterOverride", 'String'>
    readonly createdAt: FieldRef<"GlobalFilterOverride", 'DateTime'>
    readonly createdIp: FieldRef<"GlobalFilterOverride", 'String'>
    readonly updatedBy: FieldRef<"GlobalFilterOverride", 'String'>
    readonly updatedAt: FieldRef<"GlobalFilterOverride", 'DateTime'>
    readonly updatedIp: FieldRef<"GlobalFilterOverride", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GlobalFilterOverride findUnique
   */
  export type GlobalFilterOverrideFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilterOverride
     */
    select?: GlobalFilterOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilterOverride
     */
    omit?: GlobalFilterOverrideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterOverrideInclude<ExtArgs> | null
    /**
     * Filter, which GlobalFilterOverride to fetch.
     */
    where: GlobalFilterOverrideWhereUniqueInput
  }

  /**
   * GlobalFilterOverride findUniqueOrThrow
   */
  export type GlobalFilterOverrideFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilterOverride
     */
    select?: GlobalFilterOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilterOverride
     */
    omit?: GlobalFilterOverrideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterOverrideInclude<ExtArgs> | null
    /**
     * Filter, which GlobalFilterOverride to fetch.
     */
    where: GlobalFilterOverrideWhereUniqueInput
  }

  /**
   * GlobalFilterOverride findFirst
   */
  export type GlobalFilterOverrideFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilterOverride
     */
    select?: GlobalFilterOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilterOverride
     */
    omit?: GlobalFilterOverrideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterOverrideInclude<ExtArgs> | null
    /**
     * Filter, which GlobalFilterOverride to fetch.
     */
    where?: GlobalFilterOverrideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalFilterOverrides to fetch.
     */
    orderBy?: GlobalFilterOverrideOrderByWithRelationInput | GlobalFilterOverrideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalFilterOverrides.
     */
    cursor?: GlobalFilterOverrideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalFilterOverrides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalFilterOverrides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalFilterOverrides.
     */
    distinct?: GlobalFilterOverrideScalarFieldEnum | GlobalFilterOverrideScalarFieldEnum[]
  }

  /**
   * GlobalFilterOverride findFirstOrThrow
   */
  export type GlobalFilterOverrideFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilterOverride
     */
    select?: GlobalFilterOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilterOverride
     */
    omit?: GlobalFilterOverrideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterOverrideInclude<ExtArgs> | null
    /**
     * Filter, which GlobalFilterOverride to fetch.
     */
    where?: GlobalFilterOverrideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalFilterOverrides to fetch.
     */
    orderBy?: GlobalFilterOverrideOrderByWithRelationInput | GlobalFilterOverrideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GlobalFilterOverrides.
     */
    cursor?: GlobalFilterOverrideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalFilterOverrides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalFilterOverrides.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GlobalFilterOverrides.
     */
    distinct?: GlobalFilterOverrideScalarFieldEnum | GlobalFilterOverrideScalarFieldEnum[]
  }

  /**
   * GlobalFilterOverride findMany
   */
  export type GlobalFilterOverrideFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilterOverride
     */
    select?: GlobalFilterOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilterOverride
     */
    omit?: GlobalFilterOverrideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterOverrideInclude<ExtArgs> | null
    /**
     * Filter, which GlobalFilterOverrides to fetch.
     */
    where?: GlobalFilterOverrideWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GlobalFilterOverrides to fetch.
     */
    orderBy?: GlobalFilterOverrideOrderByWithRelationInput | GlobalFilterOverrideOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GlobalFilterOverrides.
     */
    cursor?: GlobalFilterOverrideWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GlobalFilterOverrides from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GlobalFilterOverrides.
     */
    skip?: number
    distinct?: GlobalFilterOverrideScalarFieldEnum | GlobalFilterOverrideScalarFieldEnum[]
  }

  /**
   * GlobalFilterOverride create
   */
  export type GlobalFilterOverrideCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilterOverride
     */
    select?: GlobalFilterOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilterOverride
     */
    omit?: GlobalFilterOverrideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterOverrideInclude<ExtArgs> | null
    /**
     * The data needed to create a GlobalFilterOverride.
     */
    data: XOR<GlobalFilterOverrideCreateInput, GlobalFilterOverrideUncheckedCreateInput>
  }

  /**
   * GlobalFilterOverride createMany
   */
  export type GlobalFilterOverrideCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GlobalFilterOverrides.
     */
    data: GlobalFilterOverrideCreateManyInput | GlobalFilterOverrideCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GlobalFilterOverride update
   */
  export type GlobalFilterOverrideUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilterOverride
     */
    select?: GlobalFilterOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilterOverride
     */
    omit?: GlobalFilterOverrideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterOverrideInclude<ExtArgs> | null
    /**
     * The data needed to update a GlobalFilterOverride.
     */
    data: XOR<GlobalFilterOverrideUpdateInput, GlobalFilterOverrideUncheckedUpdateInput>
    /**
     * Choose, which GlobalFilterOverride to update.
     */
    where: GlobalFilterOverrideWhereUniqueInput
  }

  /**
   * GlobalFilterOverride updateMany
   */
  export type GlobalFilterOverrideUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GlobalFilterOverrides.
     */
    data: XOR<GlobalFilterOverrideUpdateManyMutationInput, GlobalFilterOverrideUncheckedUpdateManyInput>
    /**
     * Filter which GlobalFilterOverrides to update
     */
    where?: GlobalFilterOverrideWhereInput
    /**
     * Limit how many GlobalFilterOverrides to update.
     */
    limit?: number
  }

  /**
   * GlobalFilterOverride upsert
   */
  export type GlobalFilterOverrideUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilterOverride
     */
    select?: GlobalFilterOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilterOverride
     */
    omit?: GlobalFilterOverrideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterOverrideInclude<ExtArgs> | null
    /**
     * The filter to search for the GlobalFilterOverride to update in case it exists.
     */
    where: GlobalFilterOverrideWhereUniqueInput
    /**
     * In case the GlobalFilterOverride found by the `where` argument doesn't exist, create a new GlobalFilterOverride with this data.
     */
    create: XOR<GlobalFilterOverrideCreateInput, GlobalFilterOverrideUncheckedCreateInput>
    /**
     * In case the GlobalFilterOverride was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GlobalFilterOverrideUpdateInput, GlobalFilterOverrideUncheckedUpdateInput>
  }

  /**
   * GlobalFilterOverride delete
   */
  export type GlobalFilterOverrideDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilterOverride
     */
    select?: GlobalFilterOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilterOverride
     */
    omit?: GlobalFilterOverrideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterOverrideInclude<ExtArgs> | null
    /**
     * Filter which GlobalFilterOverride to delete.
     */
    where: GlobalFilterOverrideWhereUniqueInput
  }

  /**
   * GlobalFilterOverride deleteMany
   */
  export type GlobalFilterOverrideDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GlobalFilterOverrides to delete
     */
    where?: GlobalFilterOverrideWhereInput
    /**
     * Limit how many GlobalFilterOverrides to delete.
     */
    limit?: number
  }

  /**
   * GlobalFilterOverride without action
   */
  export type GlobalFilterOverrideDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GlobalFilterOverride
     */
    select?: GlobalFilterOverrideSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GlobalFilterOverride
     */
    omit?: GlobalFilterOverrideOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GlobalFilterOverrideInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    action: 'action',
    operation: 'operation',
    tableName: 'tableName',
    recordId: 'recordId',
    oldValue: 'oldValue',
    newValue: 'newValue',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    createdIp: 'createdIp'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const MetaDataScalarFieldEnum: {
    id: 'id',
    name: 'name',
    desc: 'desc',
    type: 'type'
  };

  export type MetaDataScalarFieldEnum = (typeof MetaDataScalarFieldEnum)[keyof typeof MetaDataScalarFieldEnum]


  export const DbConnectionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    dbType: 'dbType',
    host: 'host',
    port: 'port',
    databaseName: 'databaseName',
    username: 'username',
    encryptedPassword: 'encryptedPassword',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt',
    updatedIp: 'updatedIp'
  };

  export type DbConnectionScalarFieldEnum = (typeof DbConnectionScalarFieldEnum)[keyof typeof DbConnectionScalarFieldEnum]


  export const AiProviderScalarFieldEnum: {
    id: 'id',
    name: 'name',
    model: 'model',
    encryptedApiKey: 'encryptedApiKey',
    isEnabled: 'isEnabled',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt',
    updatedIp: 'updatedIp'
  };

  export type AiProviderScalarFieldEnum = (typeof AiProviderScalarFieldEnum)[keyof typeof AiProviderScalarFieldEnum]


  export const ChartScalarFieldEnum: {
    id: 'id',
    name: 'name',
    connectionId: 'connectionId',
    sqlQuery: 'sqlQuery',
    chartType: 'chartType',
    chartConfig: 'chartConfig',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt',
    updatedIp: 'updatedIp'
  };

  export type ChartScalarFieldEnum = (typeof ChartScalarFieldEnum)[keyof typeof ChartScalarFieldEnum]


  export const DashboardScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt',
    updatedIp: 'updatedIp'
  };

  export type DashboardScalarFieldEnum = (typeof DashboardScalarFieldEnum)[keyof typeof DashboardScalarFieldEnum]


  export const DashboardChartScalarFieldEnum: {
    id: 'id',
    dashboardId: 'dashboardId',
    chartId: 'chartId',
    positionX: 'positionX',
    positionY: 'positionY',
    width: 'width',
    height: 'height',
    order: 'order',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt',
    updatedIp: 'updatedIp'
  };

  export type DashboardChartScalarFieldEnum = (typeof DashboardChartScalarFieldEnum)[keyof typeof DashboardChartScalarFieldEnum]


  export const DashboardFilterScalarFieldEnum: {
    id: 'id',
    dashboardId: 'dashboardId',
    name: 'name',
    filterType: 'filterType',
    connectionId: 'connectionId',
    targetColumn: 'targetColumn',
    sourceQuery: 'sourceQuery',
    defaultValue: 'defaultValue',
    order: 'order',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt',
    updatedIp: 'updatedIp'
  };

  export type DashboardFilterScalarFieldEnum = (typeof DashboardFilterScalarFieldEnum)[keyof typeof DashboardFilterScalarFieldEnum]


  export const GlobalFilterScalarFieldEnum: {
    id: 'id',
    columnName: 'columnName',
    columnValue: 'columnValue',
    missingColumnBehavior: 'missingColumnBehavior',
    isEnabled: 'isEnabled',
    order: 'order',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt',
    updatedIp: 'updatedIp'
  };

  export type GlobalFilterScalarFieldEnum = (typeof GlobalFilterScalarFieldEnum)[keyof typeof GlobalFilterScalarFieldEnum]


  export const GlobalFilterOverrideScalarFieldEnum: {
    id: 'id',
    globalFilterId: 'globalFilterId',
    dashboardId: 'dashboardId',
    isDisabled: 'isDisabled',
    columnValue: 'columnValue',
    missingColumnBehavior: 'missingColumnBehavior',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt',
    updatedIp: 'updatedIp'
  };

  export type GlobalFilterOverrideScalarFieldEnum = (typeof GlobalFilterOverrideScalarFieldEnum)[keyof typeof GlobalFilterOverrideScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const AuditLogOrderByRelevanceFieldEnum: {
    id: 'id',
    action: 'action',
    operation: 'operation',
    tableName: 'tableName',
    recordId: 'recordId',
    createdBy: 'createdBy',
    createdIp: 'createdIp'
  };

  export type AuditLogOrderByRelevanceFieldEnum = (typeof AuditLogOrderByRelevanceFieldEnum)[keyof typeof AuditLogOrderByRelevanceFieldEnum]


  export const MetaDataOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    desc: 'desc',
    type: 'type'
  };

  export type MetaDataOrderByRelevanceFieldEnum = (typeof MetaDataOrderByRelevanceFieldEnum)[keyof typeof MetaDataOrderByRelevanceFieldEnum]


  export const DbConnectionOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    host: 'host',
    databaseName: 'databaseName',
    username: 'username',
    encryptedPassword: 'encryptedPassword',
    createdBy: 'createdBy',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedIp: 'updatedIp'
  };

  export type DbConnectionOrderByRelevanceFieldEnum = (typeof DbConnectionOrderByRelevanceFieldEnum)[keyof typeof DbConnectionOrderByRelevanceFieldEnum]


  export const AiProviderOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    model: 'model',
    encryptedApiKey: 'encryptedApiKey',
    createdBy: 'createdBy',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedIp: 'updatedIp'
  };

  export type AiProviderOrderByRelevanceFieldEnum = (typeof AiProviderOrderByRelevanceFieldEnum)[keyof typeof AiProviderOrderByRelevanceFieldEnum]


  export const ChartOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    connectionId: 'connectionId',
    sqlQuery: 'sqlQuery',
    createdBy: 'createdBy',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedIp: 'updatedIp'
  };

  export type ChartOrderByRelevanceFieldEnum = (typeof ChartOrderByRelevanceFieldEnum)[keyof typeof ChartOrderByRelevanceFieldEnum]


  export const DashboardOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdBy: 'createdBy',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedIp: 'updatedIp'
  };

  export type DashboardOrderByRelevanceFieldEnum = (typeof DashboardOrderByRelevanceFieldEnum)[keyof typeof DashboardOrderByRelevanceFieldEnum]


  export const DashboardChartOrderByRelevanceFieldEnum: {
    id: 'id',
    dashboardId: 'dashboardId',
    chartId: 'chartId',
    createdBy: 'createdBy',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedIp: 'updatedIp'
  };

  export type DashboardChartOrderByRelevanceFieldEnum = (typeof DashboardChartOrderByRelevanceFieldEnum)[keyof typeof DashboardChartOrderByRelevanceFieldEnum]


  export const DashboardFilterOrderByRelevanceFieldEnum: {
    id: 'id',
    dashboardId: 'dashboardId',
    name: 'name',
    connectionId: 'connectionId',
    targetColumn: 'targetColumn',
    sourceQuery: 'sourceQuery',
    defaultValue: 'defaultValue',
    createdBy: 'createdBy',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedIp: 'updatedIp'
  };

  export type DashboardFilterOrderByRelevanceFieldEnum = (typeof DashboardFilterOrderByRelevanceFieldEnum)[keyof typeof DashboardFilterOrderByRelevanceFieldEnum]


  export const GlobalFilterOrderByRelevanceFieldEnum: {
    id: 'id',
    columnName: 'columnName',
    columnValue: 'columnValue',
    createdBy: 'createdBy',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedIp: 'updatedIp'
  };

  export type GlobalFilterOrderByRelevanceFieldEnum = (typeof GlobalFilterOrderByRelevanceFieldEnum)[keyof typeof GlobalFilterOrderByRelevanceFieldEnum]


  export const GlobalFilterOverrideOrderByRelevanceFieldEnum: {
    id: 'id',
    globalFilterId: 'globalFilterId',
    dashboardId: 'dashboardId',
    columnValue: 'columnValue',
    createdBy: 'createdBy',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedIp: 'updatedIp'
  };

  export type GlobalFilterOverrideOrderByRelevanceFieldEnum = (typeof GlobalFilterOverrideOrderByRelevanceFieldEnum)[keyof typeof GlobalFilterOverrideOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DbType'
   */
  export type EnumDbTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DbType'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ChartType'
   */
  export type EnumChartTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChartType'>
    


  /**
   * Reference to a field of type 'FilterType'
   */
  export type EnumFilterTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FilterType'>
    


  /**
   * Reference to a field of type 'MissingColumnBehavior'
   */
  export type EnumMissingColumnBehaviorFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MissingColumnBehavior'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    action?: StringNullableFilter<"AuditLog"> | string | null
    operation?: StringNullableFilter<"AuditLog"> | string | null
    tableName?: StringNullableFilter<"AuditLog"> | string | null
    recordId?: StringNullableFilter<"AuditLog"> | string | null
    oldValue?: JsonNullableFilter<"AuditLog">
    newValue?: JsonNullableFilter<"AuditLog">
    createdBy?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeNullableFilter<"AuditLog"> | Date | string | null
    createdIp?: StringNullableFilter<"AuditLog"> | string | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrderInput | SortOrder
    operation?: SortOrderInput | SortOrder
    tableName?: SortOrderInput | SortOrder
    recordId?: SortOrderInput | SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    createdIp?: SortOrderInput | SortOrder
    _relevance?: AuditLogOrderByRelevanceInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    action?: StringNullableFilter<"AuditLog"> | string | null
    operation?: StringNullableFilter<"AuditLog"> | string | null
    tableName?: StringNullableFilter<"AuditLog"> | string | null
    recordId?: StringNullableFilter<"AuditLog"> | string | null
    oldValue?: JsonNullableFilter<"AuditLog">
    newValue?: JsonNullableFilter<"AuditLog">
    createdBy?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeNullableFilter<"AuditLog"> | Date | string | null
    createdIp?: StringNullableFilter<"AuditLog"> | string | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrderInput | SortOrder
    operation?: SortOrderInput | SortOrder
    tableName?: SortOrderInput | SortOrder
    recordId?: SortOrderInput | SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrderInput | SortOrder
    createdIp?: SortOrderInput | SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    operation?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    tableName?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    recordId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    oldValue?: JsonNullableWithAggregatesFilter<"AuditLog">
    newValue?: JsonNullableWithAggregatesFilter<"AuditLog">
    createdBy?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeNullableWithAggregatesFilter<"AuditLog"> | Date | string | null
    createdIp?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
  }

  export type MetaDataWhereInput = {
    AND?: MetaDataWhereInput | MetaDataWhereInput[]
    OR?: MetaDataWhereInput[]
    NOT?: MetaDataWhereInput | MetaDataWhereInput[]
    id?: StringFilter<"MetaData"> | string
    name?: StringFilter<"MetaData"> | string
    desc?: StringNullableFilter<"MetaData"> | string | null
    type?: StringFilter<"MetaData"> | string
  }

  export type MetaDataOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    desc?: SortOrderInput | SortOrder
    type?: SortOrder
    _relevance?: MetaDataOrderByRelevanceInput
  }

  export type MetaDataWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MetaDataWhereInput | MetaDataWhereInput[]
    OR?: MetaDataWhereInput[]
    NOT?: MetaDataWhereInput | MetaDataWhereInput[]
    name?: StringFilter<"MetaData"> | string
    desc?: StringNullableFilter<"MetaData"> | string | null
    type?: StringFilter<"MetaData"> | string
  }, "id">

  export type MetaDataOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    desc?: SortOrderInput | SortOrder
    type?: SortOrder
    _count?: MetaDataCountOrderByAggregateInput
    _max?: MetaDataMaxOrderByAggregateInput
    _min?: MetaDataMinOrderByAggregateInput
  }

  export type MetaDataScalarWhereWithAggregatesInput = {
    AND?: MetaDataScalarWhereWithAggregatesInput | MetaDataScalarWhereWithAggregatesInput[]
    OR?: MetaDataScalarWhereWithAggregatesInput[]
    NOT?: MetaDataScalarWhereWithAggregatesInput | MetaDataScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MetaData"> | string
    name?: StringWithAggregatesFilter<"MetaData"> | string
    desc?: StringNullableWithAggregatesFilter<"MetaData"> | string | null
    type?: StringWithAggregatesFilter<"MetaData"> | string
  }

  export type DbConnectionWhereInput = {
    AND?: DbConnectionWhereInput | DbConnectionWhereInput[]
    OR?: DbConnectionWhereInput[]
    NOT?: DbConnectionWhereInput | DbConnectionWhereInput[]
    id?: StringFilter<"DbConnection"> | string
    name?: StringFilter<"DbConnection"> | string
    dbType?: EnumDbTypeFilter<"DbConnection"> | $Enums.DbType
    host?: StringFilter<"DbConnection"> | string
    port?: IntFilter<"DbConnection"> | number
    databaseName?: StringFilter<"DbConnection"> | string
    username?: StringFilter<"DbConnection"> | string
    encryptedPassword?: StringFilter<"DbConnection"> | string
    createdBy?: StringNullableFilter<"DbConnection"> | string | null
    createdAt?: DateTimeFilter<"DbConnection"> | Date | string
    createdIp?: StringNullableFilter<"DbConnection"> | string | null
    updatedBy?: StringNullableFilter<"DbConnection"> | string | null
    updatedAt?: DateTimeNullableFilter<"DbConnection"> | Date | string | null
    updatedIp?: StringNullableFilter<"DbConnection"> | string | null
    charts?: ChartListRelationFilter
    dashboardFilters?: DashboardFilterListRelationFilter
  }

  export type DbConnectionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    dbType?: SortOrder
    host?: SortOrder
    port?: SortOrder
    databaseName?: SortOrder
    username?: SortOrder
    encryptedPassword?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    charts?: ChartOrderByRelationAggregateInput
    dashboardFilters?: DashboardFilterOrderByRelationAggregateInput
    _relevance?: DbConnectionOrderByRelevanceInput
  }

  export type DbConnectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DbConnectionWhereInput | DbConnectionWhereInput[]
    OR?: DbConnectionWhereInput[]
    NOT?: DbConnectionWhereInput | DbConnectionWhereInput[]
    name?: StringFilter<"DbConnection"> | string
    dbType?: EnumDbTypeFilter<"DbConnection"> | $Enums.DbType
    host?: StringFilter<"DbConnection"> | string
    port?: IntFilter<"DbConnection"> | number
    databaseName?: StringFilter<"DbConnection"> | string
    username?: StringFilter<"DbConnection"> | string
    encryptedPassword?: StringFilter<"DbConnection"> | string
    createdBy?: StringNullableFilter<"DbConnection"> | string | null
    createdAt?: DateTimeFilter<"DbConnection"> | Date | string
    createdIp?: StringNullableFilter<"DbConnection"> | string | null
    updatedBy?: StringNullableFilter<"DbConnection"> | string | null
    updatedAt?: DateTimeNullableFilter<"DbConnection"> | Date | string | null
    updatedIp?: StringNullableFilter<"DbConnection"> | string | null
    charts?: ChartListRelationFilter
    dashboardFilters?: DashboardFilterListRelationFilter
  }, "id">

  export type DbConnectionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    dbType?: SortOrder
    host?: SortOrder
    port?: SortOrder
    databaseName?: SortOrder
    username?: SortOrder
    encryptedPassword?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    _count?: DbConnectionCountOrderByAggregateInput
    _avg?: DbConnectionAvgOrderByAggregateInput
    _max?: DbConnectionMaxOrderByAggregateInput
    _min?: DbConnectionMinOrderByAggregateInput
    _sum?: DbConnectionSumOrderByAggregateInput
  }

  export type DbConnectionScalarWhereWithAggregatesInput = {
    AND?: DbConnectionScalarWhereWithAggregatesInput | DbConnectionScalarWhereWithAggregatesInput[]
    OR?: DbConnectionScalarWhereWithAggregatesInput[]
    NOT?: DbConnectionScalarWhereWithAggregatesInput | DbConnectionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DbConnection"> | string
    name?: StringWithAggregatesFilter<"DbConnection"> | string
    dbType?: EnumDbTypeWithAggregatesFilter<"DbConnection"> | $Enums.DbType
    host?: StringWithAggregatesFilter<"DbConnection"> | string
    port?: IntWithAggregatesFilter<"DbConnection"> | number
    databaseName?: StringWithAggregatesFilter<"DbConnection"> | string
    username?: StringWithAggregatesFilter<"DbConnection"> | string
    encryptedPassword?: StringWithAggregatesFilter<"DbConnection"> | string
    createdBy?: StringNullableWithAggregatesFilter<"DbConnection"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DbConnection"> | Date | string
    createdIp?: StringNullableWithAggregatesFilter<"DbConnection"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"DbConnection"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"DbConnection"> | Date | string | null
    updatedIp?: StringNullableWithAggregatesFilter<"DbConnection"> | string | null
  }

  export type AiProviderWhereInput = {
    AND?: AiProviderWhereInput | AiProviderWhereInput[]
    OR?: AiProviderWhereInput[]
    NOT?: AiProviderWhereInput | AiProviderWhereInput[]
    id?: StringFilter<"AiProvider"> | string
    name?: StringFilter<"AiProvider"> | string
    model?: StringFilter<"AiProvider"> | string
    encryptedApiKey?: StringFilter<"AiProvider"> | string
    isEnabled?: BoolFilter<"AiProvider"> | boolean
    createdBy?: StringNullableFilter<"AiProvider"> | string | null
    createdAt?: DateTimeFilter<"AiProvider"> | Date | string
    createdIp?: StringNullableFilter<"AiProvider"> | string | null
    updatedBy?: StringNullableFilter<"AiProvider"> | string | null
    updatedAt?: DateTimeNullableFilter<"AiProvider"> | Date | string | null
    updatedIp?: StringNullableFilter<"AiProvider"> | string | null
  }

  export type AiProviderOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    model?: SortOrder
    encryptedApiKey?: SortOrder
    isEnabled?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    _relevance?: AiProviderOrderByRelevanceInput
  }

  export type AiProviderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AiProviderWhereInput | AiProviderWhereInput[]
    OR?: AiProviderWhereInput[]
    NOT?: AiProviderWhereInput | AiProviderWhereInput[]
    name?: StringFilter<"AiProvider"> | string
    model?: StringFilter<"AiProvider"> | string
    encryptedApiKey?: StringFilter<"AiProvider"> | string
    isEnabled?: BoolFilter<"AiProvider"> | boolean
    createdBy?: StringNullableFilter<"AiProvider"> | string | null
    createdAt?: DateTimeFilter<"AiProvider"> | Date | string
    createdIp?: StringNullableFilter<"AiProvider"> | string | null
    updatedBy?: StringNullableFilter<"AiProvider"> | string | null
    updatedAt?: DateTimeNullableFilter<"AiProvider"> | Date | string | null
    updatedIp?: StringNullableFilter<"AiProvider"> | string | null
  }, "id">

  export type AiProviderOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    model?: SortOrder
    encryptedApiKey?: SortOrder
    isEnabled?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    _count?: AiProviderCountOrderByAggregateInput
    _max?: AiProviderMaxOrderByAggregateInput
    _min?: AiProviderMinOrderByAggregateInput
  }

  export type AiProviderScalarWhereWithAggregatesInput = {
    AND?: AiProviderScalarWhereWithAggregatesInput | AiProviderScalarWhereWithAggregatesInput[]
    OR?: AiProviderScalarWhereWithAggregatesInput[]
    NOT?: AiProviderScalarWhereWithAggregatesInput | AiProviderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AiProvider"> | string
    name?: StringWithAggregatesFilter<"AiProvider"> | string
    model?: StringWithAggregatesFilter<"AiProvider"> | string
    encryptedApiKey?: StringWithAggregatesFilter<"AiProvider"> | string
    isEnabled?: BoolWithAggregatesFilter<"AiProvider"> | boolean
    createdBy?: StringNullableWithAggregatesFilter<"AiProvider"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AiProvider"> | Date | string
    createdIp?: StringNullableWithAggregatesFilter<"AiProvider"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"AiProvider"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"AiProvider"> | Date | string | null
    updatedIp?: StringNullableWithAggregatesFilter<"AiProvider"> | string | null
  }

  export type ChartWhereInput = {
    AND?: ChartWhereInput | ChartWhereInput[]
    OR?: ChartWhereInput[]
    NOT?: ChartWhereInput | ChartWhereInput[]
    id?: StringFilter<"Chart"> | string
    name?: StringFilter<"Chart"> | string
    connectionId?: StringFilter<"Chart"> | string
    sqlQuery?: StringFilter<"Chart"> | string
    chartType?: EnumChartTypeFilter<"Chart"> | $Enums.ChartType
    chartConfig?: JsonFilter<"Chart">
    createdBy?: StringNullableFilter<"Chart"> | string | null
    createdAt?: DateTimeFilter<"Chart"> | Date | string
    createdIp?: StringNullableFilter<"Chart"> | string | null
    updatedBy?: StringNullableFilter<"Chart"> | string | null
    updatedAt?: DateTimeNullableFilter<"Chart"> | Date | string | null
    updatedIp?: StringNullableFilter<"Chart"> | string | null
    connection?: XOR<DbConnectionScalarRelationFilter, DbConnectionWhereInput>
    dashboardCharts?: DashboardChartListRelationFilter
  }

  export type ChartOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    connectionId?: SortOrder
    sqlQuery?: SortOrder
    chartType?: SortOrder
    chartConfig?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    connection?: DbConnectionOrderByWithRelationInput
    dashboardCharts?: DashboardChartOrderByRelationAggregateInput
    _relevance?: ChartOrderByRelevanceInput
  }

  export type ChartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChartWhereInput | ChartWhereInput[]
    OR?: ChartWhereInput[]
    NOT?: ChartWhereInput | ChartWhereInput[]
    name?: StringFilter<"Chart"> | string
    connectionId?: StringFilter<"Chart"> | string
    sqlQuery?: StringFilter<"Chart"> | string
    chartType?: EnumChartTypeFilter<"Chart"> | $Enums.ChartType
    chartConfig?: JsonFilter<"Chart">
    createdBy?: StringNullableFilter<"Chart"> | string | null
    createdAt?: DateTimeFilter<"Chart"> | Date | string
    createdIp?: StringNullableFilter<"Chart"> | string | null
    updatedBy?: StringNullableFilter<"Chart"> | string | null
    updatedAt?: DateTimeNullableFilter<"Chart"> | Date | string | null
    updatedIp?: StringNullableFilter<"Chart"> | string | null
    connection?: XOR<DbConnectionScalarRelationFilter, DbConnectionWhereInput>
    dashboardCharts?: DashboardChartListRelationFilter
  }, "id">

  export type ChartOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    connectionId?: SortOrder
    sqlQuery?: SortOrder
    chartType?: SortOrder
    chartConfig?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    _count?: ChartCountOrderByAggregateInput
    _max?: ChartMaxOrderByAggregateInput
    _min?: ChartMinOrderByAggregateInput
  }

  export type ChartScalarWhereWithAggregatesInput = {
    AND?: ChartScalarWhereWithAggregatesInput | ChartScalarWhereWithAggregatesInput[]
    OR?: ChartScalarWhereWithAggregatesInput[]
    NOT?: ChartScalarWhereWithAggregatesInput | ChartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Chart"> | string
    name?: StringWithAggregatesFilter<"Chart"> | string
    connectionId?: StringWithAggregatesFilter<"Chart"> | string
    sqlQuery?: StringWithAggregatesFilter<"Chart"> | string
    chartType?: EnumChartTypeWithAggregatesFilter<"Chart"> | $Enums.ChartType
    chartConfig?: JsonWithAggregatesFilter<"Chart">
    createdBy?: StringNullableWithAggregatesFilter<"Chart"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Chart"> | Date | string
    createdIp?: StringNullableWithAggregatesFilter<"Chart"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"Chart"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Chart"> | Date | string | null
    updatedIp?: StringNullableWithAggregatesFilter<"Chart"> | string | null
  }

  export type DashboardWhereInput = {
    AND?: DashboardWhereInput | DashboardWhereInput[]
    OR?: DashboardWhereInput[]
    NOT?: DashboardWhereInput | DashboardWhereInput[]
    id?: StringFilter<"Dashboard"> | string
    name?: StringFilter<"Dashboard"> | string
    description?: StringNullableFilter<"Dashboard"> | string | null
    createdBy?: StringNullableFilter<"Dashboard"> | string | null
    createdAt?: DateTimeFilter<"Dashboard"> | Date | string
    createdIp?: StringNullableFilter<"Dashboard"> | string | null
    updatedBy?: StringNullableFilter<"Dashboard"> | string | null
    updatedAt?: DateTimeNullableFilter<"Dashboard"> | Date | string | null
    updatedIp?: StringNullableFilter<"Dashboard"> | string | null
    dashboardCharts?: DashboardChartListRelationFilter
    dashboardFilters?: DashboardFilterListRelationFilter
    globalFilterOverrides?: GlobalFilterOverrideListRelationFilter
  }

  export type DashboardOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    dashboardCharts?: DashboardChartOrderByRelationAggregateInput
    dashboardFilters?: DashboardFilterOrderByRelationAggregateInput
    globalFilterOverrides?: GlobalFilterOverrideOrderByRelationAggregateInput
    _relevance?: DashboardOrderByRelevanceInput
  }

  export type DashboardWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DashboardWhereInput | DashboardWhereInput[]
    OR?: DashboardWhereInput[]
    NOT?: DashboardWhereInput | DashboardWhereInput[]
    name?: StringFilter<"Dashboard"> | string
    description?: StringNullableFilter<"Dashboard"> | string | null
    createdBy?: StringNullableFilter<"Dashboard"> | string | null
    createdAt?: DateTimeFilter<"Dashboard"> | Date | string
    createdIp?: StringNullableFilter<"Dashboard"> | string | null
    updatedBy?: StringNullableFilter<"Dashboard"> | string | null
    updatedAt?: DateTimeNullableFilter<"Dashboard"> | Date | string | null
    updatedIp?: StringNullableFilter<"Dashboard"> | string | null
    dashboardCharts?: DashboardChartListRelationFilter
    dashboardFilters?: DashboardFilterListRelationFilter
    globalFilterOverrides?: GlobalFilterOverrideListRelationFilter
  }, "id">

  export type DashboardOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    _count?: DashboardCountOrderByAggregateInput
    _max?: DashboardMaxOrderByAggregateInput
    _min?: DashboardMinOrderByAggregateInput
  }

  export type DashboardScalarWhereWithAggregatesInput = {
    AND?: DashboardScalarWhereWithAggregatesInput | DashboardScalarWhereWithAggregatesInput[]
    OR?: DashboardScalarWhereWithAggregatesInput[]
    NOT?: DashboardScalarWhereWithAggregatesInput | DashboardScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Dashboard"> | string
    name?: StringWithAggregatesFilter<"Dashboard"> | string
    description?: StringNullableWithAggregatesFilter<"Dashboard"> | string | null
    createdBy?: StringNullableWithAggregatesFilter<"Dashboard"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Dashboard"> | Date | string
    createdIp?: StringNullableWithAggregatesFilter<"Dashboard"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"Dashboard"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Dashboard"> | Date | string | null
    updatedIp?: StringNullableWithAggregatesFilter<"Dashboard"> | string | null
  }

  export type DashboardChartWhereInput = {
    AND?: DashboardChartWhereInput | DashboardChartWhereInput[]
    OR?: DashboardChartWhereInput[]
    NOT?: DashboardChartWhereInput | DashboardChartWhereInput[]
    id?: StringFilter<"DashboardChart"> | string
    dashboardId?: StringFilter<"DashboardChart"> | string
    chartId?: StringFilter<"DashboardChart"> | string
    positionX?: IntFilter<"DashboardChart"> | number
    positionY?: IntFilter<"DashboardChart"> | number
    width?: IntFilter<"DashboardChart"> | number
    height?: IntFilter<"DashboardChart"> | number
    order?: IntFilter<"DashboardChart"> | number
    createdBy?: StringNullableFilter<"DashboardChart"> | string | null
    createdAt?: DateTimeFilter<"DashboardChart"> | Date | string
    createdIp?: StringNullableFilter<"DashboardChart"> | string | null
    updatedBy?: StringNullableFilter<"DashboardChart"> | string | null
    updatedAt?: DateTimeNullableFilter<"DashboardChart"> | Date | string | null
    updatedIp?: StringNullableFilter<"DashboardChart"> | string | null
    dashboard?: XOR<DashboardScalarRelationFilter, DashboardWhereInput>
    chart?: XOR<ChartScalarRelationFilter, ChartWhereInput>
  }

  export type DashboardChartOrderByWithRelationInput = {
    id?: SortOrder
    dashboardId?: SortOrder
    chartId?: SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
    width?: SortOrder
    height?: SortOrder
    order?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    dashboard?: DashboardOrderByWithRelationInput
    chart?: ChartOrderByWithRelationInput
    _relevance?: DashboardChartOrderByRelevanceInput
  }

  export type DashboardChartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    dashboardId_chartId?: DashboardChartDashboardIdChartIdCompoundUniqueInput
    AND?: DashboardChartWhereInput | DashboardChartWhereInput[]
    OR?: DashboardChartWhereInput[]
    NOT?: DashboardChartWhereInput | DashboardChartWhereInput[]
    dashboardId?: StringFilter<"DashboardChart"> | string
    chartId?: StringFilter<"DashboardChart"> | string
    positionX?: IntFilter<"DashboardChart"> | number
    positionY?: IntFilter<"DashboardChart"> | number
    width?: IntFilter<"DashboardChart"> | number
    height?: IntFilter<"DashboardChart"> | number
    order?: IntFilter<"DashboardChart"> | number
    createdBy?: StringNullableFilter<"DashboardChart"> | string | null
    createdAt?: DateTimeFilter<"DashboardChart"> | Date | string
    createdIp?: StringNullableFilter<"DashboardChart"> | string | null
    updatedBy?: StringNullableFilter<"DashboardChart"> | string | null
    updatedAt?: DateTimeNullableFilter<"DashboardChart"> | Date | string | null
    updatedIp?: StringNullableFilter<"DashboardChart"> | string | null
    dashboard?: XOR<DashboardScalarRelationFilter, DashboardWhereInput>
    chart?: XOR<ChartScalarRelationFilter, ChartWhereInput>
  }, "id" | "dashboardId_chartId">

  export type DashboardChartOrderByWithAggregationInput = {
    id?: SortOrder
    dashboardId?: SortOrder
    chartId?: SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
    width?: SortOrder
    height?: SortOrder
    order?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    _count?: DashboardChartCountOrderByAggregateInput
    _avg?: DashboardChartAvgOrderByAggregateInput
    _max?: DashboardChartMaxOrderByAggregateInput
    _min?: DashboardChartMinOrderByAggregateInput
    _sum?: DashboardChartSumOrderByAggregateInput
  }

  export type DashboardChartScalarWhereWithAggregatesInput = {
    AND?: DashboardChartScalarWhereWithAggregatesInput | DashboardChartScalarWhereWithAggregatesInput[]
    OR?: DashboardChartScalarWhereWithAggregatesInput[]
    NOT?: DashboardChartScalarWhereWithAggregatesInput | DashboardChartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DashboardChart"> | string
    dashboardId?: StringWithAggregatesFilter<"DashboardChart"> | string
    chartId?: StringWithAggregatesFilter<"DashboardChart"> | string
    positionX?: IntWithAggregatesFilter<"DashboardChart"> | number
    positionY?: IntWithAggregatesFilter<"DashboardChart"> | number
    width?: IntWithAggregatesFilter<"DashboardChart"> | number
    height?: IntWithAggregatesFilter<"DashboardChart"> | number
    order?: IntWithAggregatesFilter<"DashboardChart"> | number
    createdBy?: StringNullableWithAggregatesFilter<"DashboardChart"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DashboardChart"> | Date | string
    createdIp?: StringNullableWithAggregatesFilter<"DashboardChart"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"DashboardChart"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"DashboardChart"> | Date | string | null
    updatedIp?: StringNullableWithAggregatesFilter<"DashboardChart"> | string | null
  }

  export type DashboardFilterWhereInput = {
    AND?: DashboardFilterWhereInput | DashboardFilterWhereInput[]
    OR?: DashboardFilterWhereInput[]
    NOT?: DashboardFilterWhereInput | DashboardFilterWhereInput[]
    id?: StringFilter<"DashboardFilter"> | string
    dashboardId?: StringFilter<"DashboardFilter"> | string
    name?: StringFilter<"DashboardFilter"> | string
    filterType?: EnumFilterTypeFilter<"DashboardFilter"> | $Enums.FilterType
    connectionId?: StringFilter<"DashboardFilter"> | string
    targetColumn?: StringFilter<"DashboardFilter"> | string
    sourceQuery?: StringNullableFilter<"DashboardFilter"> | string | null
    defaultValue?: StringNullableFilter<"DashboardFilter"> | string | null
    order?: IntFilter<"DashboardFilter"> | number
    createdBy?: StringNullableFilter<"DashboardFilter"> | string | null
    createdAt?: DateTimeFilter<"DashboardFilter"> | Date | string
    createdIp?: StringNullableFilter<"DashboardFilter"> | string | null
    updatedBy?: StringNullableFilter<"DashboardFilter"> | string | null
    updatedAt?: DateTimeNullableFilter<"DashboardFilter"> | Date | string | null
    updatedIp?: StringNullableFilter<"DashboardFilter"> | string | null
    dashboard?: XOR<DashboardScalarRelationFilter, DashboardWhereInput>
    connection?: XOR<DbConnectionScalarRelationFilter, DbConnectionWhereInput>
  }

  export type DashboardFilterOrderByWithRelationInput = {
    id?: SortOrder
    dashboardId?: SortOrder
    name?: SortOrder
    filterType?: SortOrder
    connectionId?: SortOrder
    targetColumn?: SortOrder
    sourceQuery?: SortOrderInput | SortOrder
    defaultValue?: SortOrderInput | SortOrder
    order?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    dashboard?: DashboardOrderByWithRelationInput
    connection?: DbConnectionOrderByWithRelationInput
    _relevance?: DashboardFilterOrderByRelevanceInput
  }

  export type DashboardFilterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DashboardFilterWhereInput | DashboardFilterWhereInput[]
    OR?: DashboardFilterWhereInput[]
    NOT?: DashboardFilterWhereInput | DashboardFilterWhereInput[]
    dashboardId?: StringFilter<"DashboardFilter"> | string
    name?: StringFilter<"DashboardFilter"> | string
    filterType?: EnumFilterTypeFilter<"DashboardFilter"> | $Enums.FilterType
    connectionId?: StringFilter<"DashboardFilter"> | string
    targetColumn?: StringFilter<"DashboardFilter"> | string
    sourceQuery?: StringNullableFilter<"DashboardFilter"> | string | null
    defaultValue?: StringNullableFilter<"DashboardFilter"> | string | null
    order?: IntFilter<"DashboardFilter"> | number
    createdBy?: StringNullableFilter<"DashboardFilter"> | string | null
    createdAt?: DateTimeFilter<"DashboardFilter"> | Date | string
    createdIp?: StringNullableFilter<"DashboardFilter"> | string | null
    updatedBy?: StringNullableFilter<"DashboardFilter"> | string | null
    updatedAt?: DateTimeNullableFilter<"DashboardFilter"> | Date | string | null
    updatedIp?: StringNullableFilter<"DashboardFilter"> | string | null
    dashboard?: XOR<DashboardScalarRelationFilter, DashboardWhereInput>
    connection?: XOR<DbConnectionScalarRelationFilter, DbConnectionWhereInput>
  }, "id">

  export type DashboardFilterOrderByWithAggregationInput = {
    id?: SortOrder
    dashboardId?: SortOrder
    name?: SortOrder
    filterType?: SortOrder
    connectionId?: SortOrder
    targetColumn?: SortOrder
    sourceQuery?: SortOrderInput | SortOrder
    defaultValue?: SortOrderInput | SortOrder
    order?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    _count?: DashboardFilterCountOrderByAggregateInput
    _avg?: DashboardFilterAvgOrderByAggregateInput
    _max?: DashboardFilterMaxOrderByAggregateInput
    _min?: DashboardFilterMinOrderByAggregateInput
    _sum?: DashboardFilterSumOrderByAggregateInput
  }

  export type DashboardFilterScalarWhereWithAggregatesInput = {
    AND?: DashboardFilterScalarWhereWithAggregatesInput | DashboardFilterScalarWhereWithAggregatesInput[]
    OR?: DashboardFilterScalarWhereWithAggregatesInput[]
    NOT?: DashboardFilterScalarWhereWithAggregatesInput | DashboardFilterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DashboardFilter"> | string
    dashboardId?: StringWithAggregatesFilter<"DashboardFilter"> | string
    name?: StringWithAggregatesFilter<"DashboardFilter"> | string
    filterType?: EnumFilterTypeWithAggregatesFilter<"DashboardFilter"> | $Enums.FilterType
    connectionId?: StringWithAggregatesFilter<"DashboardFilter"> | string
    targetColumn?: StringWithAggregatesFilter<"DashboardFilter"> | string
    sourceQuery?: StringNullableWithAggregatesFilter<"DashboardFilter"> | string | null
    defaultValue?: StringNullableWithAggregatesFilter<"DashboardFilter"> | string | null
    order?: IntWithAggregatesFilter<"DashboardFilter"> | number
    createdBy?: StringNullableWithAggregatesFilter<"DashboardFilter"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DashboardFilter"> | Date | string
    createdIp?: StringNullableWithAggregatesFilter<"DashboardFilter"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"DashboardFilter"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"DashboardFilter"> | Date | string | null
    updatedIp?: StringNullableWithAggregatesFilter<"DashboardFilter"> | string | null
  }

  export type GlobalFilterWhereInput = {
    AND?: GlobalFilterWhereInput | GlobalFilterWhereInput[]
    OR?: GlobalFilterWhereInput[]
    NOT?: GlobalFilterWhereInput | GlobalFilterWhereInput[]
    id?: StringFilter<"GlobalFilter"> | string
    columnName?: StringFilter<"GlobalFilter"> | string
    columnValue?: StringFilter<"GlobalFilter"> | string
    missingColumnBehavior?: EnumMissingColumnBehaviorNullableFilter<"GlobalFilter"> | $Enums.MissingColumnBehavior | null
    isEnabled?: BoolFilter<"GlobalFilter"> | boolean
    order?: IntFilter<"GlobalFilter"> | number
    createdBy?: StringNullableFilter<"GlobalFilter"> | string | null
    createdAt?: DateTimeFilter<"GlobalFilter"> | Date | string
    createdIp?: StringNullableFilter<"GlobalFilter"> | string | null
    updatedBy?: StringNullableFilter<"GlobalFilter"> | string | null
    updatedAt?: DateTimeNullableFilter<"GlobalFilter"> | Date | string | null
    updatedIp?: StringNullableFilter<"GlobalFilter"> | string | null
    overrides?: GlobalFilterOverrideListRelationFilter
  }

  export type GlobalFilterOrderByWithRelationInput = {
    id?: SortOrder
    columnName?: SortOrder
    columnValue?: SortOrder
    missingColumnBehavior?: SortOrderInput | SortOrder
    isEnabled?: SortOrder
    order?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    overrides?: GlobalFilterOverrideOrderByRelationAggregateInput
    _relevance?: GlobalFilterOrderByRelevanceInput
  }

  export type GlobalFilterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GlobalFilterWhereInput | GlobalFilterWhereInput[]
    OR?: GlobalFilterWhereInput[]
    NOT?: GlobalFilterWhereInput | GlobalFilterWhereInput[]
    columnName?: StringFilter<"GlobalFilter"> | string
    columnValue?: StringFilter<"GlobalFilter"> | string
    missingColumnBehavior?: EnumMissingColumnBehaviorNullableFilter<"GlobalFilter"> | $Enums.MissingColumnBehavior | null
    isEnabled?: BoolFilter<"GlobalFilter"> | boolean
    order?: IntFilter<"GlobalFilter"> | number
    createdBy?: StringNullableFilter<"GlobalFilter"> | string | null
    createdAt?: DateTimeFilter<"GlobalFilter"> | Date | string
    createdIp?: StringNullableFilter<"GlobalFilter"> | string | null
    updatedBy?: StringNullableFilter<"GlobalFilter"> | string | null
    updatedAt?: DateTimeNullableFilter<"GlobalFilter"> | Date | string | null
    updatedIp?: StringNullableFilter<"GlobalFilter"> | string | null
    overrides?: GlobalFilterOverrideListRelationFilter
  }, "id">

  export type GlobalFilterOrderByWithAggregationInput = {
    id?: SortOrder
    columnName?: SortOrder
    columnValue?: SortOrder
    missingColumnBehavior?: SortOrderInput | SortOrder
    isEnabled?: SortOrder
    order?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    _count?: GlobalFilterCountOrderByAggregateInput
    _avg?: GlobalFilterAvgOrderByAggregateInput
    _max?: GlobalFilterMaxOrderByAggregateInput
    _min?: GlobalFilterMinOrderByAggregateInput
    _sum?: GlobalFilterSumOrderByAggregateInput
  }

  export type GlobalFilterScalarWhereWithAggregatesInput = {
    AND?: GlobalFilterScalarWhereWithAggregatesInput | GlobalFilterScalarWhereWithAggregatesInput[]
    OR?: GlobalFilterScalarWhereWithAggregatesInput[]
    NOT?: GlobalFilterScalarWhereWithAggregatesInput | GlobalFilterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GlobalFilter"> | string
    columnName?: StringWithAggregatesFilter<"GlobalFilter"> | string
    columnValue?: StringWithAggregatesFilter<"GlobalFilter"> | string
    missingColumnBehavior?: EnumMissingColumnBehaviorNullableWithAggregatesFilter<"GlobalFilter"> | $Enums.MissingColumnBehavior | null
    isEnabled?: BoolWithAggregatesFilter<"GlobalFilter"> | boolean
    order?: IntWithAggregatesFilter<"GlobalFilter"> | number
    createdBy?: StringNullableWithAggregatesFilter<"GlobalFilter"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"GlobalFilter"> | Date | string
    createdIp?: StringNullableWithAggregatesFilter<"GlobalFilter"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"GlobalFilter"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"GlobalFilter"> | Date | string | null
    updatedIp?: StringNullableWithAggregatesFilter<"GlobalFilter"> | string | null
  }

  export type GlobalFilterOverrideWhereInput = {
    AND?: GlobalFilterOverrideWhereInput | GlobalFilterOverrideWhereInput[]
    OR?: GlobalFilterOverrideWhereInput[]
    NOT?: GlobalFilterOverrideWhereInput | GlobalFilterOverrideWhereInput[]
    id?: StringFilter<"GlobalFilterOverride"> | string
    globalFilterId?: StringFilter<"GlobalFilterOverride"> | string
    dashboardId?: StringFilter<"GlobalFilterOverride"> | string
    isDisabled?: BoolFilter<"GlobalFilterOverride"> | boolean
    columnValue?: StringNullableFilter<"GlobalFilterOverride"> | string | null
    missingColumnBehavior?: EnumMissingColumnBehaviorNullableFilter<"GlobalFilterOverride"> | $Enums.MissingColumnBehavior | null
    createdBy?: StringNullableFilter<"GlobalFilterOverride"> | string | null
    createdAt?: DateTimeFilter<"GlobalFilterOverride"> | Date | string
    createdIp?: StringNullableFilter<"GlobalFilterOverride"> | string | null
    updatedBy?: StringNullableFilter<"GlobalFilterOverride"> | string | null
    updatedAt?: DateTimeNullableFilter<"GlobalFilterOverride"> | Date | string | null
    updatedIp?: StringNullableFilter<"GlobalFilterOverride"> | string | null
    globalFilter?: XOR<GlobalFilterScalarRelationFilter, GlobalFilterWhereInput>
    dashboard?: XOR<DashboardScalarRelationFilter, DashboardWhereInput>
  }

  export type GlobalFilterOverrideOrderByWithRelationInput = {
    id?: SortOrder
    globalFilterId?: SortOrder
    dashboardId?: SortOrder
    isDisabled?: SortOrder
    columnValue?: SortOrderInput | SortOrder
    missingColumnBehavior?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    globalFilter?: GlobalFilterOrderByWithRelationInput
    dashboard?: DashboardOrderByWithRelationInput
    _relevance?: GlobalFilterOverrideOrderByRelevanceInput
  }

  export type GlobalFilterOverrideWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    globalFilterId_dashboardId?: GlobalFilterOverrideGlobalFilterIdDashboardIdCompoundUniqueInput
    AND?: GlobalFilterOverrideWhereInput | GlobalFilterOverrideWhereInput[]
    OR?: GlobalFilterOverrideWhereInput[]
    NOT?: GlobalFilterOverrideWhereInput | GlobalFilterOverrideWhereInput[]
    globalFilterId?: StringFilter<"GlobalFilterOverride"> | string
    dashboardId?: StringFilter<"GlobalFilterOverride"> | string
    isDisabled?: BoolFilter<"GlobalFilterOverride"> | boolean
    columnValue?: StringNullableFilter<"GlobalFilterOverride"> | string | null
    missingColumnBehavior?: EnumMissingColumnBehaviorNullableFilter<"GlobalFilterOverride"> | $Enums.MissingColumnBehavior | null
    createdBy?: StringNullableFilter<"GlobalFilterOverride"> | string | null
    createdAt?: DateTimeFilter<"GlobalFilterOverride"> | Date | string
    createdIp?: StringNullableFilter<"GlobalFilterOverride"> | string | null
    updatedBy?: StringNullableFilter<"GlobalFilterOverride"> | string | null
    updatedAt?: DateTimeNullableFilter<"GlobalFilterOverride"> | Date | string | null
    updatedIp?: StringNullableFilter<"GlobalFilterOverride"> | string | null
    globalFilter?: XOR<GlobalFilterScalarRelationFilter, GlobalFilterWhereInput>
    dashboard?: XOR<DashboardScalarRelationFilter, DashboardWhereInput>
  }, "id" | "globalFilterId_dashboardId">

  export type GlobalFilterOverrideOrderByWithAggregationInput = {
    id?: SortOrder
    globalFilterId?: SortOrder
    dashboardId?: SortOrder
    isDisabled?: SortOrder
    columnValue?: SortOrderInput | SortOrder
    missingColumnBehavior?: SortOrderInput | SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    _count?: GlobalFilterOverrideCountOrderByAggregateInput
    _max?: GlobalFilterOverrideMaxOrderByAggregateInput
    _min?: GlobalFilterOverrideMinOrderByAggregateInput
  }

  export type GlobalFilterOverrideScalarWhereWithAggregatesInput = {
    AND?: GlobalFilterOverrideScalarWhereWithAggregatesInput | GlobalFilterOverrideScalarWhereWithAggregatesInput[]
    OR?: GlobalFilterOverrideScalarWhereWithAggregatesInput[]
    NOT?: GlobalFilterOverrideScalarWhereWithAggregatesInput | GlobalFilterOverrideScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GlobalFilterOverride"> | string
    globalFilterId?: StringWithAggregatesFilter<"GlobalFilterOverride"> | string
    dashboardId?: StringWithAggregatesFilter<"GlobalFilterOverride"> | string
    isDisabled?: BoolWithAggregatesFilter<"GlobalFilterOverride"> | boolean
    columnValue?: StringNullableWithAggregatesFilter<"GlobalFilterOverride"> | string | null
    missingColumnBehavior?: EnumMissingColumnBehaviorNullableWithAggregatesFilter<"GlobalFilterOverride"> | $Enums.MissingColumnBehavior | null
    createdBy?: StringNullableWithAggregatesFilter<"GlobalFilterOverride"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"GlobalFilterOverride"> | Date | string
    createdIp?: StringNullableWithAggregatesFilter<"GlobalFilterOverride"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"GlobalFilterOverride"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"GlobalFilterOverride"> | Date | string | null
    updatedIp?: StringNullableWithAggregatesFilter<"GlobalFilterOverride"> | string | null
  }

  export type AuditLogCreateInput = {
    id?: string
    action?: string | null
    operation?: string | null
    tableName?: string | null
    recordId?: string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    createdBy?: string | null
    createdAt?: Date | string | null
    createdIp?: string | null
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    action?: string | null
    operation?: string | null
    tableName?: string | null
    recordId?: string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    createdBy?: string | null
    createdAt?: Date | string | null
    createdIp?: string | null
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: NullableStringFieldUpdateOperationsInput | string | null
    operation?: NullableStringFieldUpdateOperationsInput | string | null
    tableName?: NullableStringFieldUpdateOperationsInput | string | null
    recordId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: NullableStringFieldUpdateOperationsInput | string | null
    operation?: NullableStringFieldUpdateOperationsInput | string | null
    tableName?: NullableStringFieldUpdateOperationsInput | string | null
    recordId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogCreateManyInput = {
    id?: string
    action?: string | null
    operation?: string | null
    tableName?: string | null
    recordId?: string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    createdBy?: string | null
    createdAt?: Date | string | null
    createdIp?: string | null
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: NullableStringFieldUpdateOperationsInput | string | null
    operation?: NullableStringFieldUpdateOperationsInput | string | null
    tableName?: NullableStringFieldUpdateOperationsInput | string | null
    recordId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: NullableStringFieldUpdateOperationsInput | string | null
    operation?: NullableStringFieldUpdateOperationsInput | string | null
    tableName?: NullableStringFieldUpdateOperationsInput | string | null
    recordId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MetaDataCreateInput = {
    id: string
    name: string
    desc?: string | null
    type: string
  }

  export type MetaDataUncheckedCreateInput = {
    id: string
    name: string
    desc?: string | null
    type: string
  }

  export type MetaDataUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
  }

  export type MetaDataUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
  }

  export type MetaDataCreateManyInput = {
    id: string
    name: string
    desc?: string | null
    type: string
  }

  export type MetaDataUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
  }

  export type MetaDataUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
  }

  export type DbConnectionCreateInput = {
    id?: string
    name: string
    dbType: $Enums.DbType
    host: string
    port: number
    databaseName: string
    username: string
    encryptedPassword: string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    charts?: ChartCreateNestedManyWithoutConnectionInput
    dashboardFilters?: DashboardFilterCreateNestedManyWithoutConnectionInput
  }

  export type DbConnectionUncheckedCreateInput = {
    id?: string
    name: string
    dbType: $Enums.DbType
    host: string
    port: number
    databaseName: string
    username: string
    encryptedPassword: string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    charts?: ChartUncheckedCreateNestedManyWithoutConnectionInput
    dashboardFilters?: DashboardFilterUncheckedCreateNestedManyWithoutConnectionInput
  }

  export type DbConnectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dbType?: EnumDbTypeFieldUpdateOperationsInput | $Enums.DbType
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    databaseName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    encryptedPassword?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    charts?: ChartUpdateManyWithoutConnectionNestedInput
    dashboardFilters?: DashboardFilterUpdateManyWithoutConnectionNestedInput
  }

  export type DbConnectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dbType?: EnumDbTypeFieldUpdateOperationsInput | $Enums.DbType
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    databaseName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    encryptedPassword?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    charts?: ChartUncheckedUpdateManyWithoutConnectionNestedInput
    dashboardFilters?: DashboardFilterUncheckedUpdateManyWithoutConnectionNestedInput
  }

  export type DbConnectionCreateManyInput = {
    id?: string
    name: string
    dbType: $Enums.DbType
    host: string
    port: number
    databaseName: string
    username: string
    encryptedPassword: string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type DbConnectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dbType?: EnumDbTypeFieldUpdateOperationsInput | $Enums.DbType
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    databaseName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    encryptedPassword?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DbConnectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dbType?: EnumDbTypeFieldUpdateOperationsInput | $Enums.DbType
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    databaseName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    encryptedPassword?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AiProviderCreateInput = {
    id?: string
    name: string
    model: string
    encryptedApiKey: string
    isEnabled?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type AiProviderUncheckedCreateInput = {
    id?: string
    name: string
    model: string
    encryptedApiKey: string
    isEnabled?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type AiProviderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    encryptedApiKey?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AiProviderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    encryptedApiKey?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AiProviderCreateManyInput = {
    id?: string
    name: string
    model: string
    encryptedApiKey: string
    isEnabled?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type AiProviderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    encryptedApiKey?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AiProviderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    encryptedApiKey?: StringFieldUpdateOperationsInput | string
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ChartCreateInput = {
    id?: string
    name: string
    sqlQuery: string
    chartType: $Enums.ChartType
    chartConfig: JsonNullValueInput | InputJsonValue
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    connection: DbConnectionCreateNestedOneWithoutChartsInput
    dashboardCharts?: DashboardChartCreateNestedManyWithoutChartInput
  }

  export type ChartUncheckedCreateInput = {
    id?: string
    name: string
    connectionId: string
    sqlQuery: string
    chartType: $Enums.ChartType
    chartConfig: JsonNullValueInput | InputJsonValue
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    dashboardCharts?: DashboardChartUncheckedCreateNestedManyWithoutChartInput
  }

  export type ChartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sqlQuery?: StringFieldUpdateOperationsInput | string
    chartType?: EnumChartTypeFieldUpdateOperationsInput | $Enums.ChartType
    chartConfig?: JsonNullValueInput | InputJsonValue
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    connection?: DbConnectionUpdateOneRequiredWithoutChartsNestedInput
    dashboardCharts?: DashboardChartUpdateManyWithoutChartNestedInput
  }

  export type ChartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    connectionId?: StringFieldUpdateOperationsInput | string
    sqlQuery?: StringFieldUpdateOperationsInput | string
    chartType?: EnumChartTypeFieldUpdateOperationsInput | $Enums.ChartType
    chartConfig?: JsonNullValueInput | InputJsonValue
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    dashboardCharts?: DashboardChartUncheckedUpdateManyWithoutChartNestedInput
  }

  export type ChartCreateManyInput = {
    id?: string
    name: string
    connectionId: string
    sqlQuery: string
    chartType: $Enums.ChartType
    chartConfig: JsonNullValueInput | InputJsonValue
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type ChartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sqlQuery?: StringFieldUpdateOperationsInput | string
    chartType?: EnumChartTypeFieldUpdateOperationsInput | $Enums.ChartType
    chartConfig?: JsonNullValueInput | InputJsonValue
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ChartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    connectionId?: StringFieldUpdateOperationsInput | string
    sqlQuery?: StringFieldUpdateOperationsInput | string
    chartType?: EnumChartTypeFieldUpdateOperationsInput | $Enums.ChartType
    chartConfig?: JsonNullValueInput | InputJsonValue
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DashboardCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    dashboardCharts?: DashboardChartCreateNestedManyWithoutDashboardInput
    dashboardFilters?: DashboardFilterCreateNestedManyWithoutDashboardInput
    globalFilterOverrides?: GlobalFilterOverrideCreateNestedManyWithoutDashboardInput
  }

  export type DashboardUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    dashboardCharts?: DashboardChartUncheckedCreateNestedManyWithoutDashboardInput
    dashboardFilters?: DashboardFilterUncheckedCreateNestedManyWithoutDashboardInput
    globalFilterOverrides?: GlobalFilterOverrideUncheckedCreateNestedManyWithoutDashboardInput
  }

  export type DashboardUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    dashboardCharts?: DashboardChartUpdateManyWithoutDashboardNestedInput
    dashboardFilters?: DashboardFilterUpdateManyWithoutDashboardNestedInput
    globalFilterOverrides?: GlobalFilterOverrideUpdateManyWithoutDashboardNestedInput
  }

  export type DashboardUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    dashboardCharts?: DashboardChartUncheckedUpdateManyWithoutDashboardNestedInput
    dashboardFilters?: DashboardFilterUncheckedUpdateManyWithoutDashboardNestedInput
    globalFilterOverrides?: GlobalFilterOverrideUncheckedUpdateManyWithoutDashboardNestedInput
  }

  export type DashboardCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type DashboardUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DashboardUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DashboardChartCreateInput = {
    id?: string
    positionX?: number
    positionY?: number
    width?: number
    height?: number
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    dashboard: DashboardCreateNestedOneWithoutDashboardChartsInput
    chart: ChartCreateNestedOneWithoutDashboardChartsInput
  }

  export type DashboardChartUncheckedCreateInput = {
    id?: string
    dashboardId: string
    chartId: string
    positionX?: number
    positionY?: number
    width?: number
    height?: number
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type DashboardChartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionX?: IntFieldUpdateOperationsInput | number
    positionY?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    dashboard?: DashboardUpdateOneRequiredWithoutDashboardChartsNestedInput
    chart?: ChartUpdateOneRequiredWithoutDashboardChartsNestedInput
  }

  export type DashboardChartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dashboardId?: StringFieldUpdateOperationsInput | string
    chartId?: StringFieldUpdateOperationsInput | string
    positionX?: IntFieldUpdateOperationsInput | number
    positionY?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DashboardChartCreateManyInput = {
    id?: string
    dashboardId: string
    chartId: string
    positionX?: number
    positionY?: number
    width?: number
    height?: number
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type DashboardChartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionX?: IntFieldUpdateOperationsInput | number
    positionY?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DashboardChartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dashboardId?: StringFieldUpdateOperationsInput | string
    chartId?: StringFieldUpdateOperationsInput | string
    positionX?: IntFieldUpdateOperationsInput | number
    positionY?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DashboardFilterCreateInput = {
    id?: string
    name: string
    filterType: $Enums.FilterType
    targetColumn: string
    sourceQuery?: string | null
    defaultValue?: string | null
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    dashboard: DashboardCreateNestedOneWithoutDashboardFiltersInput
    connection: DbConnectionCreateNestedOneWithoutDashboardFiltersInput
  }

  export type DashboardFilterUncheckedCreateInput = {
    id?: string
    dashboardId: string
    name: string
    filterType: $Enums.FilterType
    connectionId: string
    targetColumn: string
    sourceQuery?: string | null
    defaultValue?: string | null
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type DashboardFilterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filterType?: EnumFilterTypeFieldUpdateOperationsInput | $Enums.FilterType
    targetColumn?: StringFieldUpdateOperationsInput | string
    sourceQuery?: NullableStringFieldUpdateOperationsInput | string | null
    defaultValue?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    dashboard?: DashboardUpdateOneRequiredWithoutDashboardFiltersNestedInput
    connection?: DbConnectionUpdateOneRequiredWithoutDashboardFiltersNestedInput
  }

  export type DashboardFilterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dashboardId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filterType?: EnumFilterTypeFieldUpdateOperationsInput | $Enums.FilterType
    connectionId?: StringFieldUpdateOperationsInput | string
    targetColumn?: StringFieldUpdateOperationsInput | string
    sourceQuery?: NullableStringFieldUpdateOperationsInput | string | null
    defaultValue?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DashboardFilterCreateManyInput = {
    id?: string
    dashboardId: string
    name: string
    filterType: $Enums.FilterType
    connectionId: string
    targetColumn: string
    sourceQuery?: string | null
    defaultValue?: string | null
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type DashboardFilterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filterType?: EnumFilterTypeFieldUpdateOperationsInput | $Enums.FilterType
    targetColumn?: StringFieldUpdateOperationsInput | string
    sourceQuery?: NullableStringFieldUpdateOperationsInput | string | null
    defaultValue?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DashboardFilterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    dashboardId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filterType?: EnumFilterTypeFieldUpdateOperationsInput | $Enums.FilterType
    connectionId?: StringFieldUpdateOperationsInput | string
    targetColumn?: StringFieldUpdateOperationsInput | string
    sourceQuery?: NullableStringFieldUpdateOperationsInput | string | null
    defaultValue?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GlobalFilterCreateInput = {
    id?: string
    columnName: string
    columnValue: string
    missingColumnBehavior?: $Enums.MissingColumnBehavior | null
    isEnabled?: boolean
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    overrides?: GlobalFilterOverrideCreateNestedManyWithoutGlobalFilterInput
  }

  export type GlobalFilterUncheckedCreateInput = {
    id?: string
    columnName: string
    columnValue: string
    missingColumnBehavior?: $Enums.MissingColumnBehavior | null
    isEnabled?: boolean
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    overrides?: GlobalFilterOverrideUncheckedCreateNestedManyWithoutGlobalFilterInput
  }

  export type GlobalFilterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    columnValue?: StringFieldUpdateOperationsInput | string
    missingColumnBehavior?: NullableEnumMissingColumnBehaviorFieldUpdateOperationsInput | $Enums.MissingColumnBehavior | null
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    overrides?: GlobalFilterOverrideUpdateManyWithoutGlobalFilterNestedInput
  }

  export type GlobalFilterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    columnValue?: StringFieldUpdateOperationsInput | string
    missingColumnBehavior?: NullableEnumMissingColumnBehaviorFieldUpdateOperationsInput | $Enums.MissingColumnBehavior | null
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    overrides?: GlobalFilterOverrideUncheckedUpdateManyWithoutGlobalFilterNestedInput
  }

  export type GlobalFilterCreateManyInput = {
    id?: string
    columnName: string
    columnValue: string
    missingColumnBehavior?: $Enums.MissingColumnBehavior | null
    isEnabled?: boolean
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type GlobalFilterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    columnValue?: StringFieldUpdateOperationsInput | string
    missingColumnBehavior?: NullableEnumMissingColumnBehaviorFieldUpdateOperationsInput | $Enums.MissingColumnBehavior | null
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GlobalFilterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    columnValue?: StringFieldUpdateOperationsInput | string
    missingColumnBehavior?: NullableEnumMissingColumnBehaviorFieldUpdateOperationsInput | $Enums.MissingColumnBehavior | null
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GlobalFilterOverrideCreateInput = {
    id?: string
    isDisabled?: boolean
    columnValue?: string | null
    missingColumnBehavior?: $Enums.MissingColumnBehavior | null
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    globalFilter: GlobalFilterCreateNestedOneWithoutOverridesInput
    dashboard: DashboardCreateNestedOneWithoutGlobalFilterOverridesInput
  }

  export type GlobalFilterOverrideUncheckedCreateInput = {
    id?: string
    globalFilterId: string
    dashboardId: string
    isDisabled?: boolean
    columnValue?: string | null
    missingColumnBehavior?: $Enums.MissingColumnBehavior | null
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type GlobalFilterOverrideUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isDisabled?: BoolFieldUpdateOperationsInput | boolean
    columnValue?: NullableStringFieldUpdateOperationsInput | string | null
    missingColumnBehavior?: NullableEnumMissingColumnBehaviorFieldUpdateOperationsInput | $Enums.MissingColumnBehavior | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    globalFilter?: GlobalFilterUpdateOneRequiredWithoutOverridesNestedInput
    dashboard?: DashboardUpdateOneRequiredWithoutGlobalFilterOverridesNestedInput
  }

  export type GlobalFilterOverrideUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    globalFilterId?: StringFieldUpdateOperationsInput | string
    dashboardId?: StringFieldUpdateOperationsInput | string
    isDisabled?: BoolFieldUpdateOperationsInput | boolean
    columnValue?: NullableStringFieldUpdateOperationsInput | string | null
    missingColumnBehavior?: NullableEnumMissingColumnBehaviorFieldUpdateOperationsInput | $Enums.MissingColumnBehavior | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GlobalFilterOverrideCreateManyInput = {
    id?: string
    globalFilterId: string
    dashboardId: string
    isDisabled?: boolean
    columnValue?: string | null
    missingColumnBehavior?: $Enums.MissingColumnBehavior | null
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type GlobalFilterOverrideUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isDisabled?: BoolFieldUpdateOperationsInput | boolean
    columnValue?: NullableStringFieldUpdateOperationsInput | string | null
    missingColumnBehavior?: NullableEnumMissingColumnBehaviorFieldUpdateOperationsInput | $Enums.MissingColumnBehavior | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GlobalFilterOverrideUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    globalFilterId?: StringFieldUpdateOperationsInput | string
    dashboardId?: StringFieldUpdateOperationsInput | string
    isDisabled?: BoolFieldUpdateOperationsInput | boolean
    columnValue?: NullableStringFieldUpdateOperationsInput | string | null
    missingColumnBehavior?: NullableEnumMissingColumnBehaviorFieldUpdateOperationsInput | $Enums.MissingColumnBehavior | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AuditLogOrderByRelevanceInput = {
    fields: AuditLogOrderByRelevanceFieldEnum | AuditLogOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    operation?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    operation?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    operation?: SortOrder
    tableName?: SortOrder
    recordId?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type MetaDataOrderByRelevanceInput = {
    fields: MetaDataOrderByRelevanceFieldEnum | MetaDataOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type MetaDataCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    desc?: SortOrder
    type?: SortOrder
  }

  export type MetaDataMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    desc?: SortOrder
    type?: SortOrder
  }

  export type MetaDataMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    desc?: SortOrder
    type?: SortOrder
  }

  export type EnumDbTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DbType | EnumDbTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DbType[]
    notIn?: $Enums.DbType[]
    not?: NestedEnumDbTypeFilter<$PrismaModel> | $Enums.DbType
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ChartListRelationFilter = {
    every?: ChartWhereInput
    some?: ChartWhereInput
    none?: ChartWhereInput
  }

  export type DashboardFilterListRelationFilter = {
    every?: DashboardFilterWhereInput
    some?: DashboardFilterWhereInput
    none?: DashboardFilterWhereInput
  }

  export type ChartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DashboardFilterOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DbConnectionOrderByRelevanceInput = {
    fields: DbConnectionOrderByRelevanceFieldEnum | DbConnectionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type DbConnectionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    dbType?: SortOrder
    host?: SortOrder
    port?: SortOrder
    databaseName?: SortOrder
    username?: SortOrder
    encryptedPassword?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type DbConnectionAvgOrderByAggregateInput = {
    port?: SortOrder
  }

  export type DbConnectionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    dbType?: SortOrder
    host?: SortOrder
    port?: SortOrder
    databaseName?: SortOrder
    username?: SortOrder
    encryptedPassword?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type DbConnectionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    dbType?: SortOrder
    host?: SortOrder
    port?: SortOrder
    databaseName?: SortOrder
    username?: SortOrder
    encryptedPassword?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type DbConnectionSumOrderByAggregateInput = {
    port?: SortOrder
  }

  export type EnumDbTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DbType | EnumDbTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DbType[]
    notIn?: $Enums.DbType[]
    not?: NestedEnumDbTypeWithAggregatesFilter<$PrismaModel> | $Enums.DbType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDbTypeFilter<$PrismaModel>
    _max?: NestedEnumDbTypeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AiProviderOrderByRelevanceInput = {
    fields: AiProviderOrderByRelevanceFieldEnum | AiProviderOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AiProviderCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    model?: SortOrder
    encryptedApiKey?: SortOrder
    isEnabled?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type AiProviderMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    model?: SortOrder
    encryptedApiKey?: SortOrder
    isEnabled?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type AiProviderMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    model?: SortOrder
    encryptedApiKey?: SortOrder
    isEnabled?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumChartTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ChartType | EnumChartTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChartType[]
    notIn?: $Enums.ChartType[]
    not?: NestedEnumChartTypeFilter<$PrismaModel> | $Enums.ChartType
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DbConnectionScalarRelationFilter = {
    is?: DbConnectionWhereInput
    isNot?: DbConnectionWhereInput
  }

  export type DashboardChartListRelationFilter = {
    every?: DashboardChartWhereInput
    some?: DashboardChartWhereInput
    none?: DashboardChartWhereInput
  }

  export type DashboardChartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChartOrderByRelevanceInput = {
    fields: ChartOrderByRelevanceFieldEnum | ChartOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ChartCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    connectionId?: SortOrder
    sqlQuery?: SortOrder
    chartType?: SortOrder
    chartConfig?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type ChartMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    connectionId?: SortOrder
    sqlQuery?: SortOrder
    chartType?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type ChartMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    connectionId?: SortOrder
    sqlQuery?: SortOrder
    chartType?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type EnumChartTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChartType | EnumChartTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChartType[]
    notIn?: $Enums.ChartType[]
    not?: NestedEnumChartTypeWithAggregatesFilter<$PrismaModel> | $Enums.ChartType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChartTypeFilter<$PrismaModel>
    _max?: NestedEnumChartTypeFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type GlobalFilterOverrideListRelationFilter = {
    every?: GlobalFilterOverrideWhereInput
    some?: GlobalFilterOverrideWhereInput
    none?: GlobalFilterOverrideWhereInput
  }

  export type GlobalFilterOverrideOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DashboardOrderByRelevanceInput = {
    fields: DashboardOrderByRelevanceFieldEnum | DashboardOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type DashboardCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type DashboardMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type DashboardMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type DashboardScalarRelationFilter = {
    is?: DashboardWhereInput
    isNot?: DashboardWhereInput
  }

  export type ChartScalarRelationFilter = {
    is?: ChartWhereInput
    isNot?: ChartWhereInput
  }

  export type DashboardChartOrderByRelevanceInput = {
    fields: DashboardChartOrderByRelevanceFieldEnum | DashboardChartOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type DashboardChartDashboardIdChartIdCompoundUniqueInput = {
    dashboardId: string
    chartId: string
  }

  export type DashboardChartCountOrderByAggregateInput = {
    id?: SortOrder
    dashboardId?: SortOrder
    chartId?: SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
    width?: SortOrder
    height?: SortOrder
    order?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type DashboardChartAvgOrderByAggregateInput = {
    positionX?: SortOrder
    positionY?: SortOrder
    width?: SortOrder
    height?: SortOrder
    order?: SortOrder
  }

  export type DashboardChartMaxOrderByAggregateInput = {
    id?: SortOrder
    dashboardId?: SortOrder
    chartId?: SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
    width?: SortOrder
    height?: SortOrder
    order?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type DashboardChartMinOrderByAggregateInput = {
    id?: SortOrder
    dashboardId?: SortOrder
    chartId?: SortOrder
    positionX?: SortOrder
    positionY?: SortOrder
    width?: SortOrder
    height?: SortOrder
    order?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type DashboardChartSumOrderByAggregateInput = {
    positionX?: SortOrder
    positionY?: SortOrder
    width?: SortOrder
    height?: SortOrder
    order?: SortOrder
  }

  export type EnumFilterTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FilterType | EnumFilterTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FilterType[]
    notIn?: $Enums.FilterType[]
    not?: NestedEnumFilterTypeFilter<$PrismaModel> | $Enums.FilterType
  }

  export type DashboardFilterOrderByRelevanceInput = {
    fields: DashboardFilterOrderByRelevanceFieldEnum | DashboardFilterOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type DashboardFilterCountOrderByAggregateInput = {
    id?: SortOrder
    dashboardId?: SortOrder
    name?: SortOrder
    filterType?: SortOrder
    connectionId?: SortOrder
    targetColumn?: SortOrder
    sourceQuery?: SortOrder
    defaultValue?: SortOrder
    order?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type DashboardFilterAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type DashboardFilterMaxOrderByAggregateInput = {
    id?: SortOrder
    dashboardId?: SortOrder
    name?: SortOrder
    filterType?: SortOrder
    connectionId?: SortOrder
    targetColumn?: SortOrder
    sourceQuery?: SortOrder
    defaultValue?: SortOrder
    order?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type DashboardFilterMinOrderByAggregateInput = {
    id?: SortOrder
    dashboardId?: SortOrder
    name?: SortOrder
    filterType?: SortOrder
    connectionId?: SortOrder
    targetColumn?: SortOrder
    sourceQuery?: SortOrder
    defaultValue?: SortOrder
    order?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type DashboardFilterSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type EnumFilterTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FilterType | EnumFilterTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FilterType[]
    notIn?: $Enums.FilterType[]
    not?: NestedEnumFilterTypeWithAggregatesFilter<$PrismaModel> | $Enums.FilterType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFilterTypeFilter<$PrismaModel>
    _max?: NestedEnumFilterTypeFilter<$PrismaModel>
  }

  export type EnumMissingColumnBehaviorNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.MissingColumnBehavior | EnumMissingColumnBehaviorFieldRefInput<$PrismaModel> | null
    in?: $Enums.MissingColumnBehavior[] | null
    notIn?: $Enums.MissingColumnBehavior[] | null
    not?: NestedEnumMissingColumnBehaviorNullableFilter<$PrismaModel> | $Enums.MissingColumnBehavior | null
  }

  export type GlobalFilterOrderByRelevanceInput = {
    fields: GlobalFilterOrderByRelevanceFieldEnum | GlobalFilterOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type GlobalFilterCountOrderByAggregateInput = {
    id?: SortOrder
    columnName?: SortOrder
    columnValue?: SortOrder
    missingColumnBehavior?: SortOrder
    isEnabled?: SortOrder
    order?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type GlobalFilterAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type GlobalFilterMaxOrderByAggregateInput = {
    id?: SortOrder
    columnName?: SortOrder
    columnValue?: SortOrder
    missingColumnBehavior?: SortOrder
    isEnabled?: SortOrder
    order?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type GlobalFilterMinOrderByAggregateInput = {
    id?: SortOrder
    columnName?: SortOrder
    columnValue?: SortOrder
    missingColumnBehavior?: SortOrder
    isEnabled?: SortOrder
    order?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type GlobalFilterSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type EnumMissingColumnBehaviorNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MissingColumnBehavior | EnumMissingColumnBehaviorFieldRefInput<$PrismaModel> | null
    in?: $Enums.MissingColumnBehavior[] | null
    notIn?: $Enums.MissingColumnBehavior[] | null
    not?: NestedEnumMissingColumnBehaviorNullableWithAggregatesFilter<$PrismaModel> | $Enums.MissingColumnBehavior | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumMissingColumnBehaviorNullableFilter<$PrismaModel>
    _max?: NestedEnumMissingColumnBehaviorNullableFilter<$PrismaModel>
  }

  export type GlobalFilterScalarRelationFilter = {
    is?: GlobalFilterWhereInput
    isNot?: GlobalFilterWhereInput
  }

  export type GlobalFilterOverrideOrderByRelevanceInput = {
    fields: GlobalFilterOverrideOrderByRelevanceFieldEnum | GlobalFilterOverrideOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type GlobalFilterOverrideGlobalFilterIdDashboardIdCompoundUniqueInput = {
    globalFilterId: string
    dashboardId: string
  }

  export type GlobalFilterOverrideCountOrderByAggregateInput = {
    id?: SortOrder
    globalFilterId?: SortOrder
    dashboardId?: SortOrder
    isDisabled?: SortOrder
    columnValue?: SortOrder
    missingColumnBehavior?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type GlobalFilterOverrideMaxOrderByAggregateInput = {
    id?: SortOrder
    globalFilterId?: SortOrder
    dashboardId?: SortOrder
    isDisabled?: SortOrder
    columnValue?: SortOrder
    missingColumnBehavior?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type GlobalFilterOverrideMinOrderByAggregateInput = {
    id?: SortOrder
    globalFilterId?: SortOrder
    dashboardId?: SortOrder
    isDisabled?: SortOrder
    columnValue?: SortOrder
    missingColumnBehavior?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ChartCreateNestedManyWithoutConnectionInput = {
    create?: XOR<ChartCreateWithoutConnectionInput, ChartUncheckedCreateWithoutConnectionInput> | ChartCreateWithoutConnectionInput[] | ChartUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: ChartCreateOrConnectWithoutConnectionInput | ChartCreateOrConnectWithoutConnectionInput[]
    createMany?: ChartCreateManyConnectionInputEnvelope
    connect?: ChartWhereUniqueInput | ChartWhereUniqueInput[]
  }

  export type DashboardFilterCreateNestedManyWithoutConnectionInput = {
    create?: XOR<DashboardFilterCreateWithoutConnectionInput, DashboardFilterUncheckedCreateWithoutConnectionInput> | DashboardFilterCreateWithoutConnectionInput[] | DashboardFilterUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: DashboardFilterCreateOrConnectWithoutConnectionInput | DashboardFilterCreateOrConnectWithoutConnectionInput[]
    createMany?: DashboardFilterCreateManyConnectionInputEnvelope
    connect?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
  }

  export type ChartUncheckedCreateNestedManyWithoutConnectionInput = {
    create?: XOR<ChartCreateWithoutConnectionInput, ChartUncheckedCreateWithoutConnectionInput> | ChartCreateWithoutConnectionInput[] | ChartUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: ChartCreateOrConnectWithoutConnectionInput | ChartCreateOrConnectWithoutConnectionInput[]
    createMany?: ChartCreateManyConnectionInputEnvelope
    connect?: ChartWhereUniqueInput | ChartWhereUniqueInput[]
  }

  export type DashboardFilterUncheckedCreateNestedManyWithoutConnectionInput = {
    create?: XOR<DashboardFilterCreateWithoutConnectionInput, DashboardFilterUncheckedCreateWithoutConnectionInput> | DashboardFilterCreateWithoutConnectionInput[] | DashboardFilterUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: DashboardFilterCreateOrConnectWithoutConnectionInput | DashboardFilterCreateOrConnectWithoutConnectionInput[]
    createMany?: DashboardFilterCreateManyConnectionInputEnvelope
    connect?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
  }

  export type EnumDbTypeFieldUpdateOperationsInput = {
    set?: $Enums.DbType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ChartUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<ChartCreateWithoutConnectionInput, ChartUncheckedCreateWithoutConnectionInput> | ChartCreateWithoutConnectionInput[] | ChartUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: ChartCreateOrConnectWithoutConnectionInput | ChartCreateOrConnectWithoutConnectionInput[]
    upsert?: ChartUpsertWithWhereUniqueWithoutConnectionInput | ChartUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: ChartCreateManyConnectionInputEnvelope
    set?: ChartWhereUniqueInput | ChartWhereUniqueInput[]
    disconnect?: ChartWhereUniqueInput | ChartWhereUniqueInput[]
    delete?: ChartWhereUniqueInput | ChartWhereUniqueInput[]
    connect?: ChartWhereUniqueInput | ChartWhereUniqueInput[]
    update?: ChartUpdateWithWhereUniqueWithoutConnectionInput | ChartUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: ChartUpdateManyWithWhereWithoutConnectionInput | ChartUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: ChartScalarWhereInput | ChartScalarWhereInput[]
  }

  export type DashboardFilterUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<DashboardFilterCreateWithoutConnectionInput, DashboardFilterUncheckedCreateWithoutConnectionInput> | DashboardFilterCreateWithoutConnectionInput[] | DashboardFilterUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: DashboardFilterCreateOrConnectWithoutConnectionInput | DashboardFilterCreateOrConnectWithoutConnectionInput[]
    upsert?: DashboardFilterUpsertWithWhereUniqueWithoutConnectionInput | DashboardFilterUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: DashboardFilterCreateManyConnectionInputEnvelope
    set?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
    disconnect?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
    delete?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
    connect?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
    update?: DashboardFilterUpdateWithWhereUniqueWithoutConnectionInput | DashboardFilterUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: DashboardFilterUpdateManyWithWhereWithoutConnectionInput | DashboardFilterUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: DashboardFilterScalarWhereInput | DashboardFilterScalarWhereInput[]
  }

  export type ChartUncheckedUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<ChartCreateWithoutConnectionInput, ChartUncheckedCreateWithoutConnectionInput> | ChartCreateWithoutConnectionInput[] | ChartUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: ChartCreateOrConnectWithoutConnectionInput | ChartCreateOrConnectWithoutConnectionInput[]
    upsert?: ChartUpsertWithWhereUniqueWithoutConnectionInput | ChartUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: ChartCreateManyConnectionInputEnvelope
    set?: ChartWhereUniqueInput | ChartWhereUniqueInput[]
    disconnect?: ChartWhereUniqueInput | ChartWhereUniqueInput[]
    delete?: ChartWhereUniqueInput | ChartWhereUniqueInput[]
    connect?: ChartWhereUniqueInput | ChartWhereUniqueInput[]
    update?: ChartUpdateWithWhereUniqueWithoutConnectionInput | ChartUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: ChartUpdateManyWithWhereWithoutConnectionInput | ChartUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: ChartScalarWhereInput | ChartScalarWhereInput[]
  }

  export type DashboardFilterUncheckedUpdateManyWithoutConnectionNestedInput = {
    create?: XOR<DashboardFilterCreateWithoutConnectionInput, DashboardFilterUncheckedCreateWithoutConnectionInput> | DashboardFilterCreateWithoutConnectionInput[] | DashboardFilterUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: DashboardFilterCreateOrConnectWithoutConnectionInput | DashboardFilterCreateOrConnectWithoutConnectionInput[]
    upsert?: DashboardFilterUpsertWithWhereUniqueWithoutConnectionInput | DashboardFilterUpsertWithWhereUniqueWithoutConnectionInput[]
    createMany?: DashboardFilterCreateManyConnectionInputEnvelope
    set?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
    disconnect?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
    delete?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
    connect?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
    update?: DashboardFilterUpdateWithWhereUniqueWithoutConnectionInput | DashboardFilterUpdateWithWhereUniqueWithoutConnectionInput[]
    updateMany?: DashboardFilterUpdateManyWithWhereWithoutConnectionInput | DashboardFilterUpdateManyWithWhereWithoutConnectionInput[]
    deleteMany?: DashboardFilterScalarWhereInput | DashboardFilterScalarWhereInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DbConnectionCreateNestedOneWithoutChartsInput = {
    create?: XOR<DbConnectionCreateWithoutChartsInput, DbConnectionUncheckedCreateWithoutChartsInput>
    connectOrCreate?: DbConnectionCreateOrConnectWithoutChartsInput
    connect?: DbConnectionWhereUniqueInput
  }

  export type DashboardChartCreateNestedManyWithoutChartInput = {
    create?: XOR<DashboardChartCreateWithoutChartInput, DashboardChartUncheckedCreateWithoutChartInput> | DashboardChartCreateWithoutChartInput[] | DashboardChartUncheckedCreateWithoutChartInput[]
    connectOrCreate?: DashboardChartCreateOrConnectWithoutChartInput | DashboardChartCreateOrConnectWithoutChartInput[]
    createMany?: DashboardChartCreateManyChartInputEnvelope
    connect?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
  }

  export type DashboardChartUncheckedCreateNestedManyWithoutChartInput = {
    create?: XOR<DashboardChartCreateWithoutChartInput, DashboardChartUncheckedCreateWithoutChartInput> | DashboardChartCreateWithoutChartInput[] | DashboardChartUncheckedCreateWithoutChartInput[]
    connectOrCreate?: DashboardChartCreateOrConnectWithoutChartInput | DashboardChartCreateOrConnectWithoutChartInput[]
    createMany?: DashboardChartCreateManyChartInputEnvelope
    connect?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
  }

  export type EnumChartTypeFieldUpdateOperationsInput = {
    set?: $Enums.ChartType
  }

  export type DbConnectionUpdateOneRequiredWithoutChartsNestedInput = {
    create?: XOR<DbConnectionCreateWithoutChartsInput, DbConnectionUncheckedCreateWithoutChartsInput>
    connectOrCreate?: DbConnectionCreateOrConnectWithoutChartsInput
    upsert?: DbConnectionUpsertWithoutChartsInput
    connect?: DbConnectionWhereUniqueInput
    update?: XOR<XOR<DbConnectionUpdateToOneWithWhereWithoutChartsInput, DbConnectionUpdateWithoutChartsInput>, DbConnectionUncheckedUpdateWithoutChartsInput>
  }

  export type DashboardChartUpdateManyWithoutChartNestedInput = {
    create?: XOR<DashboardChartCreateWithoutChartInput, DashboardChartUncheckedCreateWithoutChartInput> | DashboardChartCreateWithoutChartInput[] | DashboardChartUncheckedCreateWithoutChartInput[]
    connectOrCreate?: DashboardChartCreateOrConnectWithoutChartInput | DashboardChartCreateOrConnectWithoutChartInput[]
    upsert?: DashboardChartUpsertWithWhereUniqueWithoutChartInput | DashboardChartUpsertWithWhereUniqueWithoutChartInput[]
    createMany?: DashboardChartCreateManyChartInputEnvelope
    set?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
    disconnect?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
    delete?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
    connect?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
    update?: DashboardChartUpdateWithWhereUniqueWithoutChartInput | DashboardChartUpdateWithWhereUniqueWithoutChartInput[]
    updateMany?: DashboardChartUpdateManyWithWhereWithoutChartInput | DashboardChartUpdateManyWithWhereWithoutChartInput[]
    deleteMany?: DashboardChartScalarWhereInput | DashboardChartScalarWhereInput[]
  }

  export type DashboardChartUncheckedUpdateManyWithoutChartNestedInput = {
    create?: XOR<DashboardChartCreateWithoutChartInput, DashboardChartUncheckedCreateWithoutChartInput> | DashboardChartCreateWithoutChartInput[] | DashboardChartUncheckedCreateWithoutChartInput[]
    connectOrCreate?: DashboardChartCreateOrConnectWithoutChartInput | DashboardChartCreateOrConnectWithoutChartInput[]
    upsert?: DashboardChartUpsertWithWhereUniqueWithoutChartInput | DashboardChartUpsertWithWhereUniqueWithoutChartInput[]
    createMany?: DashboardChartCreateManyChartInputEnvelope
    set?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
    disconnect?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
    delete?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
    connect?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
    update?: DashboardChartUpdateWithWhereUniqueWithoutChartInput | DashboardChartUpdateWithWhereUniqueWithoutChartInput[]
    updateMany?: DashboardChartUpdateManyWithWhereWithoutChartInput | DashboardChartUpdateManyWithWhereWithoutChartInput[]
    deleteMany?: DashboardChartScalarWhereInput | DashboardChartScalarWhereInput[]
  }

  export type DashboardChartCreateNestedManyWithoutDashboardInput = {
    create?: XOR<DashboardChartCreateWithoutDashboardInput, DashboardChartUncheckedCreateWithoutDashboardInput> | DashboardChartCreateWithoutDashboardInput[] | DashboardChartUncheckedCreateWithoutDashboardInput[]
    connectOrCreate?: DashboardChartCreateOrConnectWithoutDashboardInput | DashboardChartCreateOrConnectWithoutDashboardInput[]
    createMany?: DashboardChartCreateManyDashboardInputEnvelope
    connect?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
  }

  export type DashboardFilterCreateNestedManyWithoutDashboardInput = {
    create?: XOR<DashboardFilterCreateWithoutDashboardInput, DashboardFilterUncheckedCreateWithoutDashboardInput> | DashboardFilterCreateWithoutDashboardInput[] | DashboardFilterUncheckedCreateWithoutDashboardInput[]
    connectOrCreate?: DashboardFilterCreateOrConnectWithoutDashboardInput | DashboardFilterCreateOrConnectWithoutDashboardInput[]
    createMany?: DashboardFilterCreateManyDashboardInputEnvelope
    connect?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
  }

  export type GlobalFilterOverrideCreateNestedManyWithoutDashboardInput = {
    create?: XOR<GlobalFilterOverrideCreateWithoutDashboardInput, GlobalFilterOverrideUncheckedCreateWithoutDashboardInput> | GlobalFilterOverrideCreateWithoutDashboardInput[] | GlobalFilterOverrideUncheckedCreateWithoutDashboardInput[]
    connectOrCreate?: GlobalFilterOverrideCreateOrConnectWithoutDashboardInput | GlobalFilterOverrideCreateOrConnectWithoutDashboardInput[]
    createMany?: GlobalFilterOverrideCreateManyDashboardInputEnvelope
    connect?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
  }

  export type DashboardChartUncheckedCreateNestedManyWithoutDashboardInput = {
    create?: XOR<DashboardChartCreateWithoutDashboardInput, DashboardChartUncheckedCreateWithoutDashboardInput> | DashboardChartCreateWithoutDashboardInput[] | DashboardChartUncheckedCreateWithoutDashboardInput[]
    connectOrCreate?: DashboardChartCreateOrConnectWithoutDashboardInput | DashboardChartCreateOrConnectWithoutDashboardInput[]
    createMany?: DashboardChartCreateManyDashboardInputEnvelope
    connect?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
  }

  export type DashboardFilterUncheckedCreateNestedManyWithoutDashboardInput = {
    create?: XOR<DashboardFilterCreateWithoutDashboardInput, DashboardFilterUncheckedCreateWithoutDashboardInput> | DashboardFilterCreateWithoutDashboardInput[] | DashboardFilterUncheckedCreateWithoutDashboardInput[]
    connectOrCreate?: DashboardFilterCreateOrConnectWithoutDashboardInput | DashboardFilterCreateOrConnectWithoutDashboardInput[]
    createMany?: DashboardFilterCreateManyDashboardInputEnvelope
    connect?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
  }

  export type GlobalFilterOverrideUncheckedCreateNestedManyWithoutDashboardInput = {
    create?: XOR<GlobalFilterOverrideCreateWithoutDashboardInput, GlobalFilterOverrideUncheckedCreateWithoutDashboardInput> | GlobalFilterOverrideCreateWithoutDashboardInput[] | GlobalFilterOverrideUncheckedCreateWithoutDashboardInput[]
    connectOrCreate?: GlobalFilterOverrideCreateOrConnectWithoutDashboardInput | GlobalFilterOverrideCreateOrConnectWithoutDashboardInput[]
    createMany?: GlobalFilterOverrideCreateManyDashboardInputEnvelope
    connect?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
  }

  export type DashboardChartUpdateManyWithoutDashboardNestedInput = {
    create?: XOR<DashboardChartCreateWithoutDashboardInput, DashboardChartUncheckedCreateWithoutDashboardInput> | DashboardChartCreateWithoutDashboardInput[] | DashboardChartUncheckedCreateWithoutDashboardInput[]
    connectOrCreate?: DashboardChartCreateOrConnectWithoutDashboardInput | DashboardChartCreateOrConnectWithoutDashboardInput[]
    upsert?: DashboardChartUpsertWithWhereUniqueWithoutDashboardInput | DashboardChartUpsertWithWhereUniqueWithoutDashboardInput[]
    createMany?: DashboardChartCreateManyDashboardInputEnvelope
    set?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
    disconnect?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
    delete?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
    connect?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
    update?: DashboardChartUpdateWithWhereUniqueWithoutDashboardInput | DashboardChartUpdateWithWhereUniqueWithoutDashboardInput[]
    updateMany?: DashboardChartUpdateManyWithWhereWithoutDashboardInput | DashboardChartUpdateManyWithWhereWithoutDashboardInput[]
    deleteMany?: DashboardChartScalarWhereInput | DashboardChartScalarWhereInput[]
  }

  export type DashboardFilterUpdateManyWithoutDashboardNestedInput = {
    create?: XOR<DashboardFilterCreateWithoutDashboardInput, DashboardFilterUncheckedCreateWithoutDashboardInput> | DashboardFilterCreateWithoutDashboardInput[] | DashboardFilterUncheckedCreateWithoutDashboardInput[]
    connectOrCreate?: DashboardFilterCreateOrConnectWithoutDashboardInput | DashboardFilterCreateOrConnectWithoutDashboardInput[]
    upsert?: DashboardFilterUpsertWithWhereUniqueWithoutDashboardInput | DashboardFilterUpsertWithWhereUniqueWithoutDashboardInput[]
    createMany?: DashboardFilterCreateManyDashboardInputEnvelope
    set?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
    disconnect?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
    delete?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
    connect?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
    update?: DashboardFilterUpdateWithWhereUniqueWithoutDashboardInput | DashboardFilterUpdateWithWhereUniqueWithoutDashboardInput[]
    updateMany?: DashboardFilterUpdateManyWithWhereWithoutDashboardInput | DashboardFilterUpdateManyWithWhereWithoutDashboardInput[]
    deleteMany?: DashboardFilterScalarWhereInput | DashboardFilterScalarWhereInput[]
  }

  export type GlobalFilterOverrideUpdateManyWithoutDashboardNestedInput = {
    create?: XOR<GlobalFilterOverrideCreateWithoutDashboardInput, GlobalFilterOverrideUncheckedCreateWithoutDashboardInput> | GlobalFilterOverrideCreateWithoutDashboardInput[] | GlobalFilterOverrideUncheckedCreateWithoutDashboardInput[]
    connectOrCreate?: GlobalFilterOverrideCreateOrConnectWithoutDashboardInput | GlobalFilterOverrideCreateOrConnectWithoutDashboardInput[]
    upsert?: GlobalFilterOverrideUpsertWithWhereUniqueWithoutDashboardInput | GlobalFilterOverrideUpsertWithWhereUniqueWithoutDashboardInput[]
    createMany?: GlobalFilterOverrideCreateManyDashboardInputEnvelope
    set?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
    disconnect?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
    delete?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
    connect?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
    update?: GlobalFilterOverrideUpdateWithWhereUniqueWithoutDashboardInput | GlobalFilterOverrideUpdateWithWhereUniqueWithoutDashboardInput[]
    updateMany?: GlobalFilterOverrideUpdateManyWithWhereWithoutDashboardInput | GlobalFilterOverrideUpdateManyWithWhereWithoutDashboardInput[]
    deleteMany?: GlobalFilterOverrideScalarWhereInput | GlobalFilterOverrideScalarWhereInput[]
  }

  export type DashboardChartUncheckedUpdateManyWithoutDashboardNestedInput = {
    create?: XOR<DashboardChartCreateWithoutDashboardInput, DashboardChartUncheckedCreateWithoutDashboardInput> | DashboardChartCreateWithoutDashboardInput[] | DashboardChartUncheckedCreateWithoutDashboardInput[]
    connectOrCreate?: DashboardChartCreateOrConnectWithoutDashboardInput | DashboardChartCreateOrConnectWithoutDashboardInput[]
    upsert?: DashboardChartUpsertWithWhereUniqueWithoutDashboardInput | DashboardChartUpsertWithWhereUniqueWithoutDashboardInput[]
    createMany?: DashboardChartCreateManyDashboardInputEnvelope
    set?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
    disconnect?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
    delete?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
    connect?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
    update?: DashboardChartUpdateWithWhereUniqueWithoutDashboardInput | DashboardChartUpdateWithWhereUniqueWithoutDashboardInput[]
    updateMany?: DashboardChartUpdateManyWithWhereWithoutDashboardInput | DashboardChartUpdateManyWithWhereWithoutDashboardInput[]
    deleteMany?: DashboardChartScalarWhereInput | DashboardChartScalarWhereInput[]
  }

  export type DashboardFilterUncheckedUpdateManyWithoutDashboardNestedInput = {
    create?: XOR<DashboardFilterCreateWithoutDashboardInput, DashboardFilterUncheckedCreateWithoutDashboardInput> | DashboardFilterCreateWithoutDashboardInput[] | DashboardFilterUncheckedCreateWithoutDashboardInput[]
    connectOrCreate?: DashboardFilterCreateOrConnectWithoutDashboardInput | DashboardFilterCreateOrConnectWithoutDashboardInput[]
    upsert?: DashboardFilterUpsertWithWhereUniqueWithoutDashboardInput | DashboardFilterUpsertWithWhereUniqueWithoutDashboardInput[]
    createMany?: DashboardFilterCreateManyDashboardInputEnvelope
    set?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
    disconnect?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
    delete?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
    connect?: DashboardFilterWhereUniqueInput | DashboardFilterWhereUniqueInput[]
    update?: DashboardFilterUpdateWithWhereUniqueWithoutDashboardInput | DashboardFilterUpdateWithWhereUniqueWithoutDashboardInput[]
    updateMany?: DashboardFilterUpdateManyWithWhereWithoutDashboardInput | DashboardFilterUpdateManyWithWhereWithoutDashboardInput[]
    deleteMany?: DashboardFilterScalarWhereInput | DashboardFilterScalarWhereInput[]
  }

  export type GlobalFilterOverrideUncheckedUpdateManyWithoutDashboardNestedInput = {
    create?: XOR<GlobalFilterOverrideCreateWithoutDashboardInput, GlobalFilterOverrideUncheckedCreateWithoutDashboardInput> | GlobalFilterOverrideCreateWithoutDashboardInput[] | GlobalFilterOverrideUncheckedCreateWithoutDashboardInput[]
    connectOrCreate?: GlobalFilterOverrideCreateOrConnectWithoutDashboardInput | GlobalFilterOverrideCreateOrConnectWithoutDashboardInput[]
    upsert?: GlobalFilterOverrideUpsertWithWhereUniqueWithoutDashboardInput | GlobalFilterOverrideUpsertWithWhereUniqueWithoutDashboardInput[]
    createMany?: GlobalFilterOverrideCreateManyDashboardInputEnvelope
    set?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
    disconnect?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
    delete?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
    connect?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
    update?: GlobalFilterOverrideUpdateWithWhereUniqueWithoutDashboardInput | GlobalFilterOverrideUpdateWithWhereUniqueWithoutDashboardInput[]
    updateMany?: GlobalFilterOverrideUpdateManyWithWhereWithoutDashboardInput | GlobalFilterOverrideUpdateManyWithWhereWithoutDashboardInput[]
    deleteMany?: GlobalFilterOverrideScalarWhereInput | GlobalFilterOverrideScalarWhereInput[]
  }

  export type DashboardCreateNestedOneWithoutDashboardChartsInput = {
    create?: XOR<DashboardCreateWithoutDashboardChartsInput, DashboardUncheckedCreateWithoutDashboardChartsInput>
    connectOrCreate?: DashboardCreateOrConnectWithoutDashboardChartsInput
    connect?: DashboardWhereUniqueInput
  }

  export type ChartCreateNestedOneWithoutDashboardChartsInput = {
    create?: XOR<ChartCreateWithoutDashboardChartsInput, ChartUncheckedCreateWithoutDashboardChartsInput>
    connectOrCreate?: ChartCreateOrConnectWithoutDashboardChartsInput
    connect?: ChartWhereUniqueInput
  }

  export type DashboardUpdateOneRequiredWithoutDashboardChartsNestedInput = {
    create?: XOR<DashboardCreateWithoutDashboardChartsInput, DashboardUncheckedCreateWithoutDashboardChartsInput>
    connectOrCreate?: DashboardCreateOrConnectWithoutDashboardChartsInput
    upsert?: DashboardUpsertWithoutDashboardChartsInput
    connect?: DashboardWhereUniqueInput
    update?: XOR<XOR<DashboardUpdateToOneWithWhereWithoutDashboardChartsInput, DashboardUpdateWithoutDashboardChartsInput>, DashboardUncheckedUpdateWithoutDashboardChartsInput>
  }

  export type ChartUpdateOneRequiredWithoutDashboardChartsNestedInput = {
    create?: XOR<ChartCreateWithoutDashboardChartsInput, ChartUncheckedCreateWithoutDashboardChartsInput>
    connectOrCreate?: ChartCreateOrConnectWithoutDashboardChartsInput
    upsert?: ChartUpsertWithoutDashboardChartsInput
    connect?: ChartWhereUniqueInput
    update?: XOR<XOR<ChartUpdateToOneWithWhereWithoutDashboardChartsInput, ChartUpdateWithoutDashboardChartsInput>, ChartUncheckedUpdateWithoutDashboardChartsInput>
  }

  export type DashboardCreateNestedOneWithoutDashboardFiltersInput = {
    create?: XOR<DashboardCreateWithoutDashboardFiltersInput, DashboardUncheckedCreateWithoutDashboardFiltersInput>
    connectOrCreate?: DashboardCreateOrConnectWithoutDashboardFiltersInput
    connect?: DashboardWhereUniqueInput
  }

  export type DbConnectionCreateNestedOneWithoutDashboardFiltersInput = {
    create?: XOR<DbConnectionCreateWithoutDashboardFiltersInput, DbConnectionUncheckedCreateWithoutDashboardFiltersInput>
    connectOrCreate?: DbConnectionCreateOrConnectWithoutDashboardFiltersInput
    connect?: DbConnectionWhereUniqueInput
  }

  export type EnumFilterTypeFieldUpdateOperationsInput = {
    set?: $Enums.FilterType
  }

  export type DashboardUpdateOneRequiredWithoutDashboardFiltersNestedInput = {
    create?: XOR<DashboardCreateWithoutDashboardFiltersInput, DashboardUncheckedCreateWithoutDashboardFiltersInput>
    connectOrCreate?: DashboardCreateOrConnectWithoutDashboardFiltersInput
    upsert?: DashboardUpsertWithoutDashboardFiltersInput
    connect?: DashboardWhereUniqueInput
    update?: XOR<XOR<DashboardUpdateToOneWithWhereWithoutDashboardFiltersInput, DashboardUpdateWithoutDashboardFiltersInput>, DashboardUncheckedUpdateWithoutDashboardFiltersInput>
  }

  export type DbConnectionUpdateOneRequiredWithoutDashboardFiltersNestedInput = {
    create?: XOR<DbConnectionCreateWithoutDashboardFiltersInput, DbConnectionUncheckedCreateWithoutDashboardFiltersInput>
    connectOrCreate?: DbConnectionCreateOrConnectWithoutDashboardFiltersInput
    upsert?: DbConnectionUpsertWithoutDashboardFiltersInput
    connect?: DbConnectionWhereUniqueInput
    update?: XOR<XOR<DbConnectionUpdateToOneWithWhereWithoutDashboardFiltersInput, DbConnectionUpdateWithoutDashboardFiltersInput>, DbConnectionUncheckedUpdateWithoutDashboardFiltersInput>
  }

  export type GlobalFilterOverrideCreateNestedManyWithoutGlobalFilterInput = {
    create?: XOR<GlobalFilterOverrideCreateWithoutGlobalFilterInput, GlobalFilterOverrideUncheckedCreateWithoutGlobalFilterInput> | GlobalFilterOverrideCreateWithoutGlobalFilterInput[] | GlobalFilterOverrideUncheckedCreateWithoutGlobalFilterInput[]
    connectOrCreate?: GlobalFilterOverrideCreateOrConnectWithoutGlobalFilterInput | GlobalFilterOverrideCreateOrConnectWithoutGlobalFilterInput[]
    createMany?: GlobalFilterOverrideCreateManyGlobalFilterInputEnvelope
    connect?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
  }

  export type GlobalFilterOverrideUncheckedCreateNestedManyWithoutGlobalFilterInput = {
    create?: XOR<GlobalFilterOverrideCreateWithoutGlobalFilterInput, GlobalFilterOverrideUncheckedCreateWithoutGlobalFilterInput> | GlobalFilterOverrideCreateWithoutGlobalFilterInput[] | GlobalFilterOverrideUncheckedCreateWithoutGlobalFilterInput[]
    connectOrCreate?: GlobalFilterOverrideCreateOrConnectWithoutGlobalFilterInput | GlobalFilterOverrideCreateOrConnectWithoutGlobalFilterInput[]
    createMany?: GlobalFilterOverrideCreateManyGlobalFilterInputEnvelope
    connect?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
  }

  export type NullableEnumMissingColumnBehaviorFieldUpdateOperationsInput = {
    set?: $Enums.MissingColumnBehavior | null
  }

  export type GlobalFilterOverrideUpdateManyWithoutGlobalFilterNestedInput = {
    create?: XOR<GlobalFilterOverrideCreateWithoutGlobalFilterInput, GlobalFilterOverrideUncheckedCreateWithoutGlobalFilterInput> | GlobalFilterOverrideCreateWithoutGlobalFilterInput[] | GlobalFilterOverrideUncheckedCreateWithoutGlobalFilterInput[]
    connectOrCreate?: GlobalFilterOverrideCreateOrConnectWithoutGlobalFilterInput | GlobalFilterOverrideCreateOrConnectWithoutGlobalFilterInput[]
    upsert?: GlobalFilterOverrideUpsertWithWhereUniqueWithoutGlobalFilterInput | GlobalFilterOverrideUpsertWithWhereUniqueWithoutGlobalFilterInput[]
    createMany?: GlobalFilterOverrideCreateManyGlobalFilterInputEnvelope
    set?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
    disconnect?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
    delete?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
    connect?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
    update?: GlobalFilterOverrideUpdateWithWhereUniqueWithoutGlobalFilterInput | GlobalFilterOverrideUpdateWithWhereUniqueWithoutGlobalFilterInput[]
    updateMany?: GlobalFilterOverrideUpdateManyWithWhereWithoutGlobalFilterInput | GlobalFilterOverrideUpdateManyWithWhereWithoutGlobalFilterInput[]
    deleteMany?: GlobalFilterOverrideScalarWhereInput | GlobalFilterOverrideScalarWhereInput[]
  }

  export type GlobalFilterOverrideUncheckedUpdateManyWithoutGlobalFilterNestedInput = {
    create?: XOR<GlobalFilterOverrideCreateWithoutGlobalFilterInput, GlobalFilterOverrideUncheckedCreateWithoutGlobalFilterInput> | GlobalFilterOverrideCreateWithoutGlobalFilterInput[] | GlobalFilterOverrideUncheckedCreateWithoutGlobalFilterInput[]
    connectOrCreate?: GlobalFilterOverrideCreateOrConnectWithoutGlobalFilterInput | GlobalFilterOverrideCreateOrConnectWithoutGlobalFilterInput[]
    upsert?: GlobalFilterOverrideUpsertWithWhereUniqueWithoutGlobalFilterInput | GlobalFilterOverrideUpsertWithWhereUniqueWithoutGlobalFilterInput[]
    createMany?: GlobalFilterOverrideCreateManyGlobalFilterInputEnvelope
    set?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
    disconnect?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
    delete?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
    connect?: GlobalFilterOverrideWhereUniqueInput | GlobalFilterOverrideWhereUniqueInput[]
    update?: GlobalFilterOverrideUpdateWithWhereUniqueWithoutGlobalFilterInput | GlobalFilterOverrideUpdateWithWhereUniqueWithoutGlobalFilterInput[]
    updateMany?: GlobalFilterOverrideUpdateManyWithWhereWithoutGlobalFilterInput | GlobalFilterOverrideUpdateManyWithWhereWithoutGlobalFilterInput[]
    deleteMany?: GlobalFilterOverrideScalarWhereInput | GlobalFilterOverrideScalarWhereInput[]
  }

  export type GlobalFilterCreateNestedOneWithoutOverridesInput = {
    create?: XOR<GlobalFilterCreateWithoutOverridesInput, GlobalFilterUncheckedCreateWithoutOverridesInput>
    connectOrCreate?: GlobalFilterCreateOrConnectWithoutOverridesInput
    connect?: GlobalFilterWhereUniqueInput
  }

  export type DashboardCreateNestedOneWithoutGlobalFilterOverridesInput = {
    create?: XOR<DashboardCreateWithoutGlobalFilterOverridesInput, DashboardUncheckedCreateWithoutGlobalFilterOverridesInput>
    connectOrCreate?: DashboardCreateOrConnectWithoutGlobalFilterOverridesInput
    connect?: DashboardWhereUniqueInput
  }

  export type GlobalFilterUpdateOneRequiredWithoutOverridesNestedInput = {
    create?: XOR<GlobalFilterCreateWithoutOverridesInput, GlobalFilterUncheckedCreateWithoutOverridesInput>
    connectOrCreate?: GlobalFilterCreateOrConnectWithoutOverridesInput
    upsert?: GlobalFilterUpsertWithoutOverridesInput
    connect?: GlobalFilterWhereUniqueInput
    update?: XOR<XOR<GlobalFilterUpdateToOneWithWhereWithoutOverridesInput, GlobalFilterUpdateWithoutOverridesInput>, GlobalFilterUncheckedUpdateWithoutOverridesInput>
  }

  export type DashboardUpdateOneRequiredWithoutGlobalFilterOverridesNestedInput = {
    create?: XOR<DashboardCreateWithoutGlobalFilterOverridesInput, DashboardUncheckedCreateWithoutGlobalFilterOverridesInput>
    connectOrCreate?: DashboardCreateOrConnectWithoutGlobalFilterOverridesInput
    upsert?: DashboardUpsertWithoutGlobalFilterOverridesInput
    connect?: DashboardWhereUniqueInput
    update?: XOR<XOR<DashboardUpdateToOneWithWhereWithoutGlobalFilterOverridesInput, DashboardUpdateWithoutGlobalFilterOverridesInput>, DashboardUncheckedUpdateWithoutGlobalFilterOverridesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumDbTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DbType | EnumDbTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DbType[]
    notIn?: $Enums.DbType[]
    not?: NestedEnumDbTypeFilter<$PrismaModel> | $Enums.DbType
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumDbTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DbType | EnumDbTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DbType[]
    notIn?: $Enums.DbType[]
    not?: NestedEnumDbTypeWithAggregatesFilter<$PrismaModel> | $Enums.DbType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDbTypeFilter<$PrismaModel>
    _max?: NestedEnumDbTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumChartTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ChartType | EnumChartTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChartType[]
    notIn?: $Enums.ChartType[]
    not?: NestedEnumChartTypeFilter<$PrismaModel> | $Enums.ChartType
  }

  export type NestedEnumChartTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChartType | EnumChartTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChartType[]
    notIn?: $Enums.ChartType[]
    not?: NestedEnumChartTypeWithAggregatesFilter<$PrismaModel> | $Enums.ChartType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChartTypeFilter<$PrismaModel>
    _max?: NestedEnumChartTypeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumFilterTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FilterType | EnumFilterTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FilterType[]
    notIn?: $Enums.FilterType[]
    not?: NestedEnumFilterTypeFilter<$PrismaModel> | $Enums.FilterType
  }

  export type NestedEnumFilterTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FilterType | EnumFilterTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FilterType[]
    notIn?: $Enums.FilterType[]
    not?: NestedEnumFilterTypeWithAggregatesFilter<$PrismaModel> | $Enums.FilterType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFilterTypeFilter<$PrismaModel>
    _max?: NestedEnumFilterTypeFilter<$PrismaModel>
  }

  export type NestedEnumMissingColumnBehaviorNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.MissingColumnBehavior | EnumMissingColumnBehaviorFieldRefInput<$PrismaModel> | null
    in?: $Enums.MissingColumnBehavior[] | null
    notIn?: $Enums.MissingColumnBehavior[] | null
    not?: NestedEnumMissingColumnBehaviorNullableFilter<$PrismaModel> | $Enums.MissingColumnBehavior | null
  }

  export type NestedEnumMissingColumnBehaviorNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MissingColumnBehavior | EnumMissingColumnBehaviorFieldRefInput<$PrismaModel> | null
    in?: $Enums.MissingColumnBehavior[] | null
    notIn?: $Enums.MissingColumnBehavior[] | null
    not?: NestedEnumMissingColumnBehaviorNullableWithAggregatesFilter<$PrismaModel> | $Enums.MissingColumnBehavior | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumMissingColumnBehaviorNullableFilter<$PrismaModel>
    _max?: NestedEnumMissingColumnBehaviorNullableFilter<$PrismaModel>
  }

  export type ChartCreateWithoutConnectionInput = {
    id?: string
    name: string
    sqlQuery: string
    chartType: $Enums.ChartType
    chartConfig: JsonNullValueInput | InputJsonValue
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    dashboardCharts?: DashboardChartCreateNestedManyWithoutChartInput
  }

  export type ChartUncheckedCreateWithoutConnectionInput = {
    id?: string
    name: string
    sqlQuery: string
    chartType: $Enums.ChartType
    chartConfig: JsonNullValueInput | InputJsonValue
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    dashboardCharts?: DashboardChartUncheckedCreateNestedManyWithoutChartInput
  }

  export type ChartCreateOrConnectWithoutConnectionInput = {
    where: ChartWhereUniqueInput
    create: XOR<ChartCreateWithoutConnectionInput, ChartUncheckedCreateWithoutConnectionInput>
  }

  export type ChartCreateManyConnectionInputEnvelope = {
    data: ChartCreateManyConnectionInput | ChartCreateManyConnectionInput[]
    skipDuplicates?: boolean
  }

  export type DashboardFilterCreateWithoutConnectionInput = {
    id?: string
    name: string
    filterType: $Enums.FilterType
    targetColumn: string
    sourceQuery?: string | null
    defaultValue?: string | null
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    dashboard: DashboardCreateNestedOneWithoutDashboardFiltersInput
  }

  export type DashboardFilterUncheckedCreateWithoutConnectionInput = {
    id?: string
    dashboardId: string
    name: string
    filterType: $Enums.FilterType
    targetColumn: string
    sourceQuery?: string | null
    defaultValue?: string | null
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type DashboardFilterCreateOrConnectWithoutConnectionInput = {
    where: DashboardFilterWhereUniqueInput
    create: XOR<DashboardFilterCreateWithoutConnectionInput, DashboardFilterUncheckedCreateWithoutConnectionInput>
  }

  export type DashboardFilterCreateManyConnectionInputEnvelope = {
    data: DashboardFilterCreateManyConnectionInput | DashboardFilterCreateManyConnectionInput[]
    skipDuplicates?: boolean
  }

  export type ChartUpsertWithWhereUniqueWithoutConnectionInput = {
    where: ChartWhereUniqueInput
    update: XOR<ChartUpdateWithoutConnectionInput, ChartUncheckedUpdateWithoutConnectionInput>
    create: XOR<ChartCreateWithoutConnectionInput, ChartUncheckedCreateWithoutConnectionInput>
  }

  export type ChartUpdateWithWhereUniqueWithoutConnectionInput = {
    where: ChartWhereUniqueInput
    data: XOR<ChartUpdateWithoutConnectionInput, ChartUncheckedUpdateWithoutConnectionInput>
  }

  export type ChartUpdateManyWithWhereWithoutConnectionInput = {
    where: ChartScalarWhereInput
    data: XOR<ChartUpdateManyMutationInput, ChartUncheckedUpdateManyWithoutConnectionInput>
  }

  export type ChartScalarWhereInput = {
    AND?: ChartScalarWhereInput | ChartScalarWhereInput[]
    OR?: ChartScalarWhereInput[]
    NOT?: ChartScalarWhereInput | ChartScalarWhereInput[]
    id?: StringFilter<"Chart"> | string
    name?: StringFilter<"Chart"> | string
    connectionId?: StringFilter<"Chart"> | string
    sqlQuery?: StringFilter<"Chart"> | string
    chartType?: EnumChartTypeFilter<"Chart"> | $Enums.ChartType
    chartConfig?: JsonFilter<"Chart">
    createdBy?: StringNullableFilter<"Chart"> | string | null
    createdAt?: DateTimeFilter<"Chart"> | Date | string
    createdIp?: StringNullableFilter<"Chart"> | string | null
    updatedBy?: StringNullableFilter<"Chart"> | string | null
    updatedAt?: DateTimeNullableFilter<"Chart"> | Date | string | null
    updatedIp?: StringNullableFilter<"Chart"> | string | null
  }

  export type DashboardFilterUpsertWithWhereUniqueWithoutConnectionInput = {
    where: DashboardFilterWhereUniqueInput
    update: XOR<DashboardFilterUpdateWithoutConnectionInput, DashboardFilterUncheckedUpdateWithoutConnectionInput>
    create: XOR<DashboardFilterCreateWithoutConnectionInput, DashboardFilterUncheckedCreateWithoutConnectionInput>
  }

  export type DashboardFilterUpdateWithWhereUniqueWithoutConnectionInput = {
    where: DashboardFilterWhereUniqueInput
    data: XOR<DashboardFilterUpdateWithoutConnectionInput, DashboardFilterUncheckedUpdateWithoutConnectionInput>
  }

  export type DashboardFilterUpdateManyWithWhereWithoutConnectionInput = {
    where: DashboardFilterScalarWhereInput
    data: XOR<DashboardFilterUpdateManyMutationInput, DashboardFilterUncheckedUpdateManyWithoutConnectionInput>
  }

  export type DashboardFilterScalarWhereInput = {
    AND?: DashboardFilterScalarWhereInput | DashboardFilterScalarWhereInput[]
    OR?: DashboardFilterScalarWhereInput[]
    NOT?: DashboardFilterScalarWhereInput | DashboardFilterScalarWhereInput[]
    id?: StringFilter<"DashboardFilter"> | string
    dashboardId?: StringFilter<"DashboardFilter"> | string
    name?: StringFilter<"DashboardFilter"> | string
    filterType?: EnumFilterTypeFilter<"DashboardFilter"> | $Enums.FilterType
    connectionId?: StringFilter<"DashboardFilter"> | string
    targetColumn?: StringFilter<"DashboardFilter"> | string
    sourceQuery?: StringNullableFilter<"DashboardFilter"> | string | null
    defaultValue?: StringNullableFilter<"DashboardFilter"> | string | null
    order?: IntFilter<"DashboardFilter"> | number
    createdBy?: StringNullableFilter<"DashboardFilter"> | string | null
    createdAt?: DateTimeFilter<"DashboardFilter"> | Date | string
    createdIp?: StringNullableFilter<"DashboardFilter"> | string | null
    updatedBy?: StringNullableFilter<"DashboardFilter"> | string | null
    updatedAt?: DateTimeNullableFilter<"DashboardFilter"> | Date | string | null
    updatedIp?: StringNullableFilter<"DashboardFilter"> | string | null
  }

  export type DbConnectionCreateWithoutChartsInput = {
    id?: string
    name: string
    dbType: $Enums.DbType
    host: string
    port: number
    databaseName: string
    username: string
    encryptedPassword: string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    dashboardFilters?: DashboardFilterCreateNestedManyWithoutConnectionInput
  }

  export type DbConnectionUncheckedCreateWithoutChartsInput = {
    id?: string
    name: string
    dbType: $Enums.DbType
    host: string
    port: number
    databaseName: string
    username: string
    encryptedPassword: string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    dashboardFilters?: DashboardFilterUncheckedCreateNestedManyWithoutConnectionInput
  }

  export type DbConnectionCreateOrConnectWithoutChartsInput = {
    where: DbConnectionWhereUniqueInput
    create: XOR<DbConnectionCreateWithoutChartsInput, DbConnectionUncheckedCreateWithoutChartsInput>
  }

  export type DashboardChartCreateWithoutChartInput = {
    id?: string
    positionX?: number
    positionY?: number
    width?: number
    height?: number
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    dashboard: DashboardCreateNestedOneWithoutDashboardChartsInput
  }

  export type DashboardChartUncheckedCreateWithoutChartInput = {
    id?: string
    dashboardId: string
    positionX?: number
    positionY?: number
    width?: number
    height?: number
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type DashboardChartCreateOrConnectWithoutChartInput = {
    where: DashboardChartWhereUniqueInput
    create: XOR<DashboardChartCreateWithoutChartInput, DashboardChartUncheckedCreateWithoutChartInput>
  }

  export type DashboardChartCreateManyChartInputEnvelope = {
    data: DashboardChartCreateManyChartInput | DashboardChartCreateManyChartInput[]
    skipDuplicates?: boolean
  }

  export type DbConnectionUpsertWithoutChartsInput = {
    update: XOR<DbConnectionUpdateWithoutChartsInput, DbConnectionUncheckedUpdateWithoutChartsInput>
    create: XOR<DbConnectionCreateWithoutChartsInput, DbConnectionUncheckedCreateWithoutChartsInput>
    where?: DbConnectionWhereInput
  }

  export type DbConnectionUpdateToOneWithWhereWithoutChartsInput = {
    where?: DbConnectionWhereInput
    data: XOR<DbConnectionUpdateWithoutChartsInput, DbConnectionUncheckedUpdateWithoutChartsInput>
  }

  export type DbConnectionUpdateWithoutChartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dbType?: EnumDbTypeFieldUpdateOperationsInput | $Enums.DbType
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    databaseName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    encryptedPassword?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    dashboardFilters?: DashboardFilterUpdateManyWithoutConnectionNestedInput
  }

  export type DbConnectionUncheckedUpdateWithoutChartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dbType?: EnumDbTypeFieldUpdateOperationsInput | $Enums.DbType
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    databaseName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    encryptedPassword?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    dashboardFilters?: DashboardFilterUncheckedUpdateManyWithoutConnectionNestedInput
  }

  export type DashboardChartUpsertWithWhereUniqueWithoutChartInput = {
    where: DashboardChartWhereUniqueInput
    update: XOR<DashboardChartUpdateWithoutChartInput, DashboardChartUncheckedUpdateWithoutChartInput>
    create: XOR<DashboardChartCreateWithoutChartInput, DashboardChartUncheckedCreateWithoutChartInput>
  }

  export type DashboardChartUpdateWithWhereUniqueWithoutChartInput = {
    where: DashboardChartWhereUniqueInput
    data: XOR<DashboardChartUpdateWithoutChartInput, DashboardChartUncheckedUpdateWithoutChartInput>
  }

  export type DashboardChartUpdateManyWithWhereWithoutChartInput = {
    where: DashboardChartScalarWhereInput
    data: XOR<DashboardChartUpdateManyMutationInput, DashboardChartUncheckedUpdateManyWithoutChartInput>
  }

  export type DashboardChartScalarWhereInput = {
    AND?: DashboardChartScalarWhereInput | DashboardChartScalarWhereInput[]
    OR?: DashboardChartScalarWhereInput[]
    NOT?: DashboardChartScalarWhereInput | DashboardChartScalarWhereInput[]
    id?: StringFilter<"DashboardChart"> | string
    dashboardId?: StringFilter<"DashboardChart"> | string
    chartId?: StringFilter<"DashboardChart"> | string
    positionX?: IntFilter<"DashboardChart"> | number
    positionY?: IntFilter<"DashboardChart"> | number
    width?: IntFilter<"DashboardChart"> | number
    height?: IntFilter<"DashboardChart"> | number
    order?: IntFilter<"DashboardChart"> | number
    createdBy?: StringNullableFilter<"DashboardChart"> | string | null
    createdAt?: DateTimeFilter<"DashboardChart"> | Date | string
    createdIp?: StringNullableFilter<"DashboardChart"> | string | null
    updatedBy?: StringNullableFilter<"DashboardChart"> | string | null
    updatedAt?: DateTimeNullableFilter<"DashboardChart"> | Date | string | null
    updatedIp?: StringNullableFilter<"DashboardChart"> | string | null
  }

  export type DashboardChartCreateWithoutDashboardInput = {
    id?: string
    positionX?: number
    positionY?: number
    width?: number
    height?: number
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    chart: ChartCreateNestedOneWithoutDashboardChartsInput
  }

  export type DashboardChartUncheckedCreateWithoutDashboardInput = {
    id?: string
    chartId: string
    positionX?: number
    positionY?: number
    width?: number
    height?: number
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type DashboardChartCreateOrConnectWithoutDashboardInput = {
    where: DashboardChartWhereUniqueInput
    create: XOR<DashboardChartCreateWithoutDashboardInput, DashboardChartUncheckedCreateWithoutDashboardInput>
  }

  export type DashboardChartCreateManyDashboardInputEnvelope = {
    data: DashboardChartCreateManyDashboardInput | DashboardChartCreateManyDashboardInput[]
    skipDuplicates?: boolean
  }

  export type DashboardFilterCreateWithoutDashboardInput = {
    id?: string
    name: string
    filterType: $Enums.FilterType
    targetColumn: string
    sourceQuery?: string | null
    defaultValue?: string | null
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    connection: DbConnectionCreateNestedOneWithoutDashboardFiltersInput
  }

  export type DashboardFilterUncheckedCreateWithoutDashboardInput = {
    id?: string
    name: string
    filterType: $Enums.FilterType
    connectionId: string
    targetColumn: string
    sourceQuery?: string | null
    defaultValue?: string | null
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type DashboardFilterCreateOrConnectWithoutDashboardInput = {
    where: DashboardFilterWhereUniqueInput
    create: XOR<DashboardFilterCreateWithoutDashboardInput, DashboardFilterUncheckedCreateWithoutDashboardInput>
  }

  export type DashboardFilterCreateManyDashboardInputEnvelope = {
    data: DashboardFilterCreateManyDashboardInput | DashboardFilterCreateManyDashboardInput[]
    skipDuplicates?: boolean
  }

  export type GlobalFilterOverrideCreateWithoutDashboardInput = {
    id?: string
    isDisabled?: boolean
    columnValue?: string | null
    missingColumnBehavior?: $Enums.MissingColumnBehavior | null
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    globalFilter: GlobalFilterCreateNestedOneWithoutOverridesInput
  }

  export type GlobalFilterOverrideUncheckedCreateWithoutDashboardInput = {
    id?: string
    globalFilterId: string
    isDisabled?: boolean
    columnValue?: string | null
    missingColumnBehavior?: $Enums.MissingColumnBehavior | null
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type GlobalFilterOverrideCreateOrConnectWithoutDashboardInput = {
    where: GlobalFilterOverrideWhereUniqueInput
    create: XOR<GlobalFilterOverrideCreateWithoutDashboardInput, GlobalFilterOverrideUncheckedCreateWithoutDashboardInput>
  }

  export type GlobalFilterOverrideCreateManyDashboardInputEnvelope = {
    data: GlobalFilterOverrideCreateManyDashboardInput | GlobalFilterOverrideCreateManyDashboardInput[]
    skipDuplicates?: boolean
  }

  export type DashboardChartUpsertWithWhereUniqueWithoutDashboardInput = {
    where: DashboardChartWhereUniqueInput
    update: XOR<DashboardChartUpdateWithoutDashboardInput, DashboardChartUncheckedUpdateWithoutDashboardInput>
    create: XOR<DashboardChartCreateWithoutDashboardInput, DashboardChartUncheckedCreateWithoutDashboardInput>
  }

  export type DashboardChartUpdateWithWhereUniqueWithoutDashboardInput = {
    where: DashboardChartWhereUniqueInput
    data: XOR<DashboardChartUpdateWithoutDashboardInput, DashboardChartUncheckedUpdateWithoutDashboardInput>
  }

  export type DashboardChartUpdateManyWithWhereWithoutDashboardInput = {
    where: DashboardChartScalarWhereInput
    data: XOR<DashboardChartUpdateManyMutationInput, DashboardChartUncheckedUpdateManyWithoutDashboardInput>
  }

  export type DashboardFilterUpsertWithWhereUniqueWithoutDashboardInput = {
    where: DashboardFilterWhereUniqueInput
    update: XOR<DashboardFilterUpdateWithoutDashboardInput, DashboardFilterUncheckedUpdateWithoutDashboardInput>
    create: XOR<DashboardFilterCreateWithoutDashboardInput, DashboardFilterUncheckedCreateWithoutDashboardInput>
  }

  export type DashboardFilterUpdateWithWhereUniqueWithoutDashboardInput = {
    where: DashboardFilterWhereUniqueInput
    data: XOR<DashboardFilterUpdateWithoutDashboardInput, DashboardFilterUncheckedUpdateWithoutDashboardInput>
  }

  export type DashboardFilterUpdateManyWithWhereWithoutDashboardInput = {
    where: DashboardFilterScalarWhereInput
    data: XOR<DashboardFilterUpdateManyMutationInput, DashboardFilterUncheckedUpdateManyWithoutDashboardInput>
  }

  export type GlobalFilterOverrideUpsertWithWhereUniqueWithoutDashboardInput = {
    where: GlobalFilterOverrideWhereUniqueInput
    update: XOR<GlobalFilterOverrideUpdateWithoutDashboardInput, GlobalFilterOverrideUncheckedUpdateWithoutDashboardInput>
    create: XOR<GlobalFilterOverrideCreateWithoutDashboardInput, GlobalFilterOverrideUncheckedCreateWithoutDashboardInput>
  }

  export type GlobalFilterOverrideUpdateWithWhereUniqueWithoutDashboardInput = {
    where: GlobalFilterOverrideWhereUniqueInput
    data: XOR<GlobalFilterOverrideUpdateWithoutDashboardInput, GlobalFilterOverrideUncheckedUpdateWithoutDashboardInput>
  }

  export type GlobalFilterOverrideUpdateManyWithWhereWithoutDashboardInput = {
    where: GlobalFilterOverrideScalarWhereInput
    data: XOR<GlobalFilterOverrideUpdateManyMutationInput, GlobalFilterOverrideUncheckedUpdateManyWithoutDashboardInput>
  }

  export type GlobalFilterOverrideScalarWhereInput = {
    AND?: GlobalFilterOverrideScalarWhereInput | GlobalFilterOverrideScalarWhereInput[]
    OR?: GlobalFilterOverrideScalarWhereInput[]
    NOT?: GlobalFilterOverrideScalarWhereInput | GlobalFilterOverrideScalarWhereInput[]
    id?: StringFilter<"GlobalFilterOverride"> | string
    globalFilterId?: StringFilter<"GlobalFilterOverride"> | string
    dashboardId?: StringFilter<"GlobalFilterOverride"> | string
    isDisabled?: BoolFilter<"GlobalFilterOverride"> | boolean
    columnValue?: StringNullableFilter<"GlobalFilterOverride"> | string | null
    missingColumnBehavior?: EnumMissingColumnBehaviorNullableFilter<"GlobalFilterOverride"> | $Enums.MissingColumnBehavior | null
    createdBy?: StringNullableFilter<"GlobalFilterOverride"> | string | null
    createdAt?: DateTimeFilter<"GlobalFilterOverride"> | Date | string
    createdIp?: StringNullableFilter<"GlobalFilterOverride"> | string | null
    updatedBy?: StringNullableFilter<"GlobalFilterOverride"> | string | null
    updatedAt?: DateTimeNullableFilter<"GlobalFilterOverride"> | Date | string | null
    updatedIp?: StringNullableFilter<"GlobalFilterOverride"> | string | null
  }

  export type DashboardCreateWithoutDashboardChartsInput = {
    id?: string
    name: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    dashboardFilters?: DashboardFilterCreateNestedManyWithoutDashboardInput
    globalFilterOverrides?: GlobalFilterOverrideCreateNestedManyWithoutDashboardInput
  }

  export type DashboardUncheckedCreateWithoutDashboardChartsInput = {
    id?: string
    name: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    dashboardFilters?: DashboardFilterUncheckedCreateNestedManyWithoutDashboardInput
    globalFilterOverrides?: GlobalFilterOverrideUncheckedCreateNestedManyWithoutDashboardInput
  }

  export type DashboardCreateOrConnectWithoutDashboardChartsInput = {
    where: DashboardWhereUniqueInput
    create: XOR<DashboardCreateWithoutDashboardChartsInput, DashboardUncheckedCreateWithoutDashboardChartsInput>
  }

  export type ChartCreateWithoutDashboardChartsInput = {
    id?: string
    name: string
    sqlQuery: string
    chartType: $Enums.ChartType
    chartConfig: JsonNullValueInput | InputJsonValue
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    connection: DbConnectionCreateNestedOneWithoutChartsInput
  }

  export type ChartUncheckedCreateWithoutDashboardChartsInput = {
    id?: string
    name: string
    connectionId: string
    sqlQuery: string
    chartType: $Enums.ChartType
    chartConfig: JsonNullValueInput | InputJsonValue
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type ChartCreateOrConnectWithoutDashboardChartsInput = {
    where: ChartWhereUniqueInput
    create: XOR<ChartCreateWithoutDashboardChartsInput, ChartUncheckedCreateWithoutDashboardChartsInput>
  }

  export type DashboardUpsertWithoutDashboardChartsInput = {
    update: XOR<DashboardUpdateWithoutDashboardChartsInput, DashboardUncheckedUpdateWithoutDashboardChartsInput>
    create: XOR<DashboardCreateWithoutDashboardChartsInput, DashboardUncheckedCreateWithoutDashboardChartsInput>
    where?: DashboardWhereInput
  }

  export type DashboardUpdateToOneWithWhereWithoutDashboardChartsInput = {
    where?: DashboardWhereInput
    data: XOR<DashboardUpdateWithoutDashboardChartsInput, DashboardUncheckedUpdateWithoutDashboardChartsInput>
  }

  export type DashboardUpdateWithoutDashboardChartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    dashboardFilters?: DashboardFilterUpdateManyWithoutDashboardNestedInput
    globalFilterOverrides?: GlobalFilterOverrideUpdateManyWithoutDashboardNestedInput
  }

  export type DashboardUncheckedUpdateWithoutDashboardChartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    dashboardFilters?: DashboardFilterUncheckedUpdateManyWithoutDashboardNestedInput
    globalFilterOverrides?: GlobalFilterOverrideUncheckedUpdateManyWithoutDashboardNestedInput
  }

  export type ChartUpsertWithoutDashboardChartsInput = {
    update: XOR<ChartUpdateWithoutDashboardChartsInput, ChartUncheckedUpdateWithoutDashboardChartsInput>
    create: XOR<ChartCreateWithoutDashboardChartsInput, ChartUncheckedCreateWithoutDashboardChartsInput>
    where?: ChartWhereInput
  }

  export type ChartUpdateToOneWithWhereWithoutDashboardChartsInput = {
    where?: ChartWhereInput
    data: XOR<ChartUpdateWithoutDashboardChartsInput, ChartUncheckedUpdateWithoutDashboardChartsInput>
  }

  export type ChartUpdateWithoutDashboardChartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sqlQuery?: StringFieldUpdateOperationsInput | string
    chartType?: EnumChartTypeFieldUpdateOperationsInput | $Enums.ChartType
    chartConfig?: JsonNullValueInput | InputJsonValue
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    connection?: DbConnectionUpdateOneRequiredWithoutChartsNestedInput
  }

  export type ChartUncheckedUpdateWithoutDashboardChartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    connectionId?: StringFieldUpdateOperationsInput | string
    sqlQuery?: StringFieldUpdateOperationsInput | string
    chartType?: EnumChartTypeFieldUpdateOperationsInput | $Enums.ChartType
    chartConfig?: JsonNullValueInput | InputJsonValue
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DashboardCreateWithoutDashboardFiltersInput = {
    id?: string
    name: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    dashboardCharts?: DashboardChartCreateNestedManyWithoutDashboardInput
    globalFilterOverrides?: GlobalFilterOverrideCreateNestedManyWithoutDashboardInput
  }

  export type DashboardUncheckedCreateWithoutDashboardFiltersInput = {
    id?: string
    name: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    dashboardCharts?: DashboardChartUncheckedCreateNestedManyWithoutDashboardInput
    globalFilterOverrides?: GlobalFilterOverrideUncheckedCreateNestedManyWithoutDashboardInput
  }

  export type DashboardCreateOrConnectWithoutDashboardFiltersInput = {
    where: DashboardWhereUniqueInput
    create: XOR<DashboardCreateWithoutDashboardFiltersInput, DashboardUncheckedCreateWithoutDashboardFiltersInput>
  }

  export type DbConnectionCreateWithoutDashboardFiltersInput = {
    id?: string
    name: string
    dbType: $Enums.DbType
    host: string
    port: number
    databaseName: string
    username: string
    encryptedPassword: string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    charts?: ChartCreateNestedManyWithoutConnectionInput
  }

  export type DbConnectionUncheckedCreateWithoutDashboardFiltersInput = {
    id?: string
    name: string
    dbType: $Enums.DbType
    host: string
    port: number
    databaseName: string
    username: string
    encryptedPassword: string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    charts?: ChartUncheckedCreateNestedManyWithoutConnectionInput
  }

  export type DbConnectionCreateOrConnectWithoutDashboardFiltersInput = {
    where: DbConnectionWhereUniqueInput
    create: XOR<DbConnectionCreateWithoutDashboardFiltersInput, DbConnectionUncheckedCreateWithoutDashboardFiltersInput>
  }

  export type DashboardUpsertWithoutDashboardFiltersInput = {
    update: XOR<DashboardUpdateWithoutDashboardFiltersInput, DashboardUncheckedUpdateWithoutDashboardFiltersInput>
    create: XOR<DashboardCreateWithoutDashboardFiltersInput, DashboardUncheckedCreateWithoutDashboardFiltersInput>
    where?: DashboardWhereInput
  }

  export type DashboardUpdateToOneWithWhereWithoutDashboardFiltersInput = {
    where?: DashboardWhereInput
    data: XOR<DashboardUpdateWithoutDashboardFiltersInput, DashboardUncheckedUpdateWithoutDashboardFiltersInput>
  }

  export type DashboardUpdateWithoutDashboardFiltersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    dashboardCharts?: DashboardChartUpdateManyWithoutDashboardNestedInput
    globalFilterOverrides?: GlobalFilterOverrideUpdateManyWithoutDashboardNestedInput
  }

  export type DashboardUncheckedUpdateWithoutDashboardFiltersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    dashboardCharts?: DashboardChartUncheckedUpdateManyWithoutDashboardNestedInput
    globalFilterOverrides?: GlobalFilterOverrideUncheckedUpdateManyWithoutDashboardNestedInput
  }

  export type DbConnectionUpsertWithoutDashboardFiltersInput = {
    update: XOR<DbConnectionUpdateWithoutDashboardFiltersInput, DbConnectionUncheckedUpdateWithoutDashboardFiltersInput>
    create: XOR<DbConnectionCreateWithoutDashboardFiltersInput, DbConnectionUncheckedCreateWithoutDashboardFiltersInput>
    where?: DbConnectionWhereInput
  }

  export type DbConnectionUpdateToOneWithWhereWithoutDashboardFiltersInput = {
    where?: DbConnectionWhereInput
    data: XOR<DbConnectionUpdateWithoutDashboardFiltersInput, DbConnectionUncheckedUpdateWithoutDashboardFiltersInput>
  }

  export type DbConnectionUpdateWithoutDashboardFiltersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dbType?: EnumDbTypeFieldUpdateOperationsInput | $Enums.DbType
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    databaseName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    encryptedPassword?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    charts?: ChartUpdateManyWithoutConnectionNestedInput
  }

  export type DbConnectionUncheckedUpdateWithoutDashboardFiltersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dbType?: EnumDbTypeFieldUpdateOperationsInput | $Enums.DbType
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    databaseName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    encryptedPassword?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    charts?: ChartUncheckedUpdateManyWithoutConnectionNestedInput
  }

  export type GlobalFilterOverrideCreateWithoutGlobalFilterInput = {
    id?: string
    isDisabled?: boolean
    columnValue?: string | null
    missingColumnBehavior?: $Enums.MissingColumnBehavior | null
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    dashboard: DashboardCreateNestedOneWithoutGlobalFilterOverridesInput
  }

  export type GlobalFilterOverrideUncheckedCreateWithoutGlobalFilterInput = {
    id?: string
    dashboardId: string
    isDisabled?: boolean
    columnValue?: string | null
    missingColumnBehavior?: $Enums.MissingColumnBehavior | null
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type GlobalFilterOverrideCreateOrConnectWithoutGlobalFilterInput = {
    where: GlobalFilterOverrideWhereUniqueInput
    create: XOR<GlobalFilterOverrideCreateWithoutGlobalFilterInput, GlobalFilterOverrideUncheckedCreateWithoutGlobalFilterInput>
  }

  export type GlobalFilterOverrideCreateManyGlobalFilterInputEnvelope = {
    data: GlobalFilterOverrideCreateManyGlobalFilterInput | GlobalFilterOverrideCreateManyGlobalFilterInput[]
    skipDuplicates?: boolean
  }

  export type GlobalFilterOverrideUpsertWithWhereUniqueWithoutGlobalFilterInput = {
    where: GlobalFilterOverrideWhereUniqueInput
    update: XOR<GlobalFilterOverrideUpdateWithoutGlobalFilterInput, GlobalFilterOverrideUncheckedUpdateWithoutGlobalFilterInput>
    create: XOR<GlobalFilterOverrideCreateWithoutGlobalFilterInput, GlobalFilterOverrideUncheckedCreateWithoutGlobalFilterInput>
  }

  export type GlobalFilterOverrideUpdateWithWhereUniqueWithoutGlobalFilterInput = {
    where: GlobalFilterOverrideWhereUniqueInput
    data: XOR<GlobalFilterOverrideUpdateWithoutGlobalFilterInput, GlobalFilterOverrideUncheckedUpdateWithoutGlobalFilterInput>
  }

  export type GlobalFilterOverrideUpdateManyWithWhereWithoutGlobalFilterInput = {
    where: GlobalFilterOverrideScalarWhereInput
    data: XOR<GlobalFilterOverrideUpdateManyMutationInput, GlobalFilterOverrideUncheckedUpdateManyWithoutGlobalFilterInput>
  }

  export type GlobalFilterCreateWithoutOverridesInput = {
    id?: string
    columnName: string
    columnValue: string
    missingColumnBehavior?: $Enums.MissingColumnBehavior | null
    isEnabled?: boolean
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type GlobalFilterUncheckedCreateWithoutOverridesInput = {
    id?: string
    columnName: string
    columnValue: string
    missingColumnBehavior?: $Enums.MissingColumnBehavior | null
    isEnabled?: boolean
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type GlobalFilterCreateOrConnectWithoutOverridesInput = {
    where: GlobalFilterWhereUniqueInput
    create: XOR<GlobalFilterCreateWithoutOverridesInput, GlobalFilterUncheckedCreateWithoutOverridesInput>
  }

  export type DashboardCreateWithoutGlobalFilterOverridesInput = {
    id?: string
    name: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    dashboardCharts?: DashboardChartCreateNestedManyWithoutDashboardInput
    dashboardFilters?: DashboardFilterCreateNestedManyWithoutDashboardInput
  }

  export type DashboardUncheckedCreateWithoutGlobalFilterOverridesInput = {
    id?: string
    name: string
    description?: string | null
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    dashboardCharts?: DashboardChartUncheckedCreateNestedManyWithoutDashboardInput
    dashboardFilters?: DashboardFilterUncheckedCreateNestedManyWithoutDashboardInput
  }

  export type DashboardCreateOrConnectWithoutGlobalFilterOverridesInput = {
    where: DashboardWhereUniqueInput
    create: XOR<DashboardCreateWithoutGlobalFilterOverridesInput, DashboardUncheckedCreateWithoutGlobalFilterOverridesInput>
  }

  export type GlobalFilterUpsertWithoutOverridesInput = {
    update: XOR<GlobalFilterUpdateWithoutOverridesInput, GlobalFilterUncheckedUpdateWithoutOverridesInput>
    create: XOR<GlobalFilterCreateWithoutOverridesInput, GlobalFilterUncheckedCreateWithoutOverridesInput>
    where?: GlobalFilterWhereInput
  }

  export type GlobalFilterUpdateToOneWithWhereWithoutOverridesInput = {
    where?: GlobalFilterWhereInput
    data: XOR<GlobalFilterUpdateWithoutOverridesInput, GlobalFilterUncheckedUpdateWithoutOverridesInput>
  }

  export type GlobalFilterUpdateWithoutOverridesInput = {
    id?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    columnValue?: StringFieldUpdateOperationsInput | string
    missingColumnBehavior?: NullableEnumMissingColumnBehaviorFieldUpdateOperationsInput | $Enums.MissingColumnBehavior | null
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GlobalFilterUncheckedUpdateWithoutOverridesInput = {
    id?: StringFieldUpdateOperationsInput | string
    columnName?: StringFieldUpdateOperationsInput | string
    columnValue?: StringFieldUpdateOperationsInput | string
    missingColumnBehavior?: NullableEnumMissingColumnBehaviorFieldUpdateOperationsInput | $Enums.MissingColumnBehavior | null
    isEnabled?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DashboardUpsertWithoutGlobalFilterOverridesInput = {
    update: XOR<DashboardUpdateWithoutGlobalFilterOverridesInput, DashboardUncheckedUpdateWithoutGlobalFilterOverridesInput>
    create: XOR<DashboardCreateWithoutGlobalFilterOverridesInput, DashboardUncheckedCreateWithoutGlobalFilterOverridesInput>
    where?: DashboardWhereInput
  }

  export type DashboardUpdateToOneWithWhereWithoutGlobalFilterOverridesInput = {
    where?: DashboardWhereInput
    data: XOR<DashboardUpdateWithoutGlobalFilterOverridesInput, DashboardUncheckedUpdateWithoutGlobalFilterOverridesInput>
  }

  export type DashboardUpdateWithoutGlobalFilterOverridesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    dashboardCharts?: DashboardChartUpdateManyWithoutDashboardNestedInput
    dashboardFilters?: DashboardFilterUpdateManyWithoutDashboardNestedInput
  }

  export type DashboardUncheckedUpdateWithoutGlobalFilterOverridesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    dashboardCharts?: DashboardChartUncheckedUpdateManyWithoutDashboardNestedInput
    dashboardFilters?: DashboardFilterUncheckedUpdateManyWithoutDashboardNestedInput
  }

  export type ChartCreateManyConnectionInput = {
    id?: string
    name: string
    sqlQuery: string
    chartType: $Enums.ChartType
    chartConfig: JsonNullValueInput | InputJsonValue
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type DashboardFilterCreateManyConnectionInput = {
    id?: string
    dashboardId: string
    name: string
    filterType: $Enums.FilterType
    targetColumn: string
    sourceQuery?: string | null
    defaultValue?: string | null
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type ChartUpdateWithoutConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sqlQuery?: StringFieldUpdateOperationsInput | string
    chartType?: EnumChartTypeFieldUpdateOperationsInput | $Enums.ChartType
    chartConfig?: JsonNullValueInput | InputJsonValue
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    dashboardCharts?: DashboardChartUpdateManyWithoutChartNestedInput
  }

  export type ChartUncheckedUpdateWithoutConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sqlQuery?: StringFieldUpdateOperationsInput | string
    chartType?: EnumChartTypeFieldUpdateOperationsInput | $Enums.ChartType
    chartConfig?: JsonNullValueInput | InputJsonValue
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    dashboardCharts?: DashboardChartUncheckedUpdateManyWithoutChartNestedInput
  }

  export type ChartUncheckedUpdateManyWithoutConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sqlQuery?: StringFieldUpdateOperationsInput | string
    chartType?: EnumChartTypeFieldUpdateOperationsInput | $Enums.ChartType
    chartConfig?: JsonNullValueInput | InputJsonValue
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DashboardFilterUpdateWithoutConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filterType?: EnumFilterTypeFieldUpdateOperationsInput | $Enums.FilterType
    targetColumn?: StringFieldUpdateOperationsInput | string
    sourceQuery?: NullableStringFieldUpdateOperationsInput | string | null
    defaultValue?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    dashboard?: DashboardUpdateOneRequiredWithoutDashboardFiltersNestedInput
  }

  export type DashboardFilterUncheckedUpdateWithoutConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    dashboardId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filterType?: EnumFilterTypeFieldUpdateOperationsInput | $Enums.FilterType
    targetColumn?: StringFieldUpdateOperationsInput | string
    sourceQuery?: NullableStringFieldUpdateOperationsInput | string | null
    defaultValue?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DashboardFilterUncheckedUpdateManyWithoutConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    dashboardId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filterType?: EnumFilterTypeFieldUpdateOperationsInput | $Enums.FilterType
    targetColumn?: StringFieldUpdateOperationsInput | string
    sourceQuery?: NullableStringFieldUpdateOperationsInput | string | null
    defaultValue?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DashboardChartCreateManyChartInput = {
    id?: string
    dashboardId: string
    positionX?: number
    positionY?: number
    width?: number
    height?: number
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type DashboardChartUpdateWithoutChartInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionX?: IntFieldUpdateOperationsInput | number
    positionY?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    dashboard?: DashboardUpdateOneRequiredWithoutDashboardChartsNestedInput
  }

  export type DashboardChartUncheckedUpdateWithoutChartInput = {
    id?: StringFieldUpdateOperationsInput | string
    dashboardId?: StringFieldUpdateOperationsInput | string
    positionX?: IntFieldUpdateOperationsInput | number
    positionY?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DashboardChartUncheckedUpdateManyWithoutChartInput = {
    id?: StringFieldUpdateOperationsInput | string
    dashboardId?: StringFieldUpdateOperationsInput | string
    positionX?: IntFieldUpdateOperationsInput | number
    positionY?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DashboardChartCreateManyDashboardInput = {
    id?: string
    chartId: string
    positionX?: number
    positionY?: number
    width?: number
    height?: number
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type DashboardFilterCreateManyDashboardInput = {
    id?: string
    name: string
    filterType: $Enums.FilterType
    connectionId: string
    targetColumn: string
    sourceQuery?: string | null
    defaultValue?: string | null
    order?: number
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type GlobalFilterOverrideCreateManyDashboardInput = {
    id?: string
    globalFilterId: string
    isDisabled?: boolean
    columnValue?: string | null
    missingColumnBehavior?: $Enums.MissingColumnBehavior | null
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type DashboardChartUpdateWithoutDashboardInput = {
    id?: StringFieldUpdateOperationsInput | string
    positionX?: IntFieldUpdateOperationsInput | number
    positionY?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    chart?: ChartUpdateOneRequiredWithoutDashboardChartsNestedInput
  }

  export type DashboardChartUncheckedUpdateWithoutDashboardInput = {
    id?: StringFieldUpdateOperationsInput | string
    chartId?: StringFieldUpdateOperationsInput | string
    positionX?: IntFieldUpdateOperationsInput | number
    positionY?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DashboardChartUncheckedUpdateManyWithoutDashboardInput = {
    id?: StringFieldUpdateOperationsInput | string
    chartId?: StringFieldUpdateOperationsInput | string
    positionX?: IntFieldUpdateOperationsInput | number
    positionY?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DashboardFilterUpdateWithoutDashboardInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filterType?: EnumFilterTypeFieldUpdateOperationsInput | $Enums.FilterType
    targetColumn?: StringFieldUpdateOperationsInput | string
    sourceQuery?: NullableStringFieldUpdateOperationsInput | string | null
    defaultValue?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    connection?: DbConnectionUpdateOneRequiredWithoutDashboardFiltersNestedInput
  }

  export type DashboardFilterUncheckedUpdateWithoutDashboardInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filterType?: EnumFilterTypeFieldUpdateOperationsInput | $Enums.FilterType
    connectionId?: StringFieldUpdateOperationsInput | string
    targetColumn?: StringFieldUpdateOperationsInput | string
    sourceQuery?: NullableStringFieldUpdateOperationsInput | string | null
    defaultValue?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DashboardFilterUncheckedUpdateManyWithoutDashboardInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    filterType?: EnumFilterTypeFieldUpdateOperationsInput | $Enums.FilterType
    connectionId?: StringFieldUpdateOperationsInput | string
    targetColumn?: StringFieldUpdateOperationsInput | string
    sourceQuery?: NullableStringFieldUpdateOperationsInput | string | null
    defaultValue?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GlobalFilterOverrideUpdateWithoutDashboardInput = {
    id?: StringFieldUpdateOperationsInput | string
    isDisabled?: BoolFieldUpdateOperationsInput | boolean
    columnValue?: NullableStringFieldUpdateOperationsInput | string | null
    missingColumnBehavior?: NullableEnumMissingColumnBehaviorFieldUpdateOperationsInput | $Enums.MissingColumnBehavior | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    globalFilter?: GlobalFilterUpdateOneRequiredWithoutOverridesNestedInput
  }

  export type GlobalFilterOverrideUncheckedUpdateWithoutDashboardInput = {
    id?: StringFieldUpdateOperationsInput | string
    globalFilterId?: StringFieldUpdateOperationsInput | string
    isDisabled?: BoolFieldUpdateOperationsInput | boolean
    columnValue?: NullableStringFieldUpdateOperationsInput | string | null
    missingColumnBehavior?: NullableEnumMissingColumnBehaviorFieldUpdateOperationsInput | $Enums.MissingColumnBehavior | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GlobalFilterOverrideUncheckedUpdateManyWithoutDashboardInput = {
    id?: StringFieldUpdateOperationsInput | string
    globalFilterId?: StringFieldUpdateOperationsInput | string
    isDisabled?: BoolFieldUpdateOperationsInput | boolean
    columnValue?: NullableStringFieldUpdateOperationsInput | string | null
    missingColumnBehavior?: NullableEnumMissingColumnBehaviorFieldUpdateOperationsInput | $Enums.MissingColumnBehavior | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GlobalFilterOverrideCreateManyGlobalFilterInput = {
    id?: string
    dashboardId: string
    isDisabled?: boolean
    columnValue?: string | null
    missingColumnBehavior?: $Enums.MissingColumnBehavior | null
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type GlobalFilterOverrideUpdateWithoutGlobalFilterInput = {
    id?: StringFieldUpdateOperationsInput | string
    isDisabled?: BoolFieldUpdateOperationsInput | boolean
    columnValue?: NullableStringFieldUpdateOperationsInput | string | null
    missingColumnBehavior?: NullableEnumMissingColumnBehaviorFieldUpdateOperationsInput | $Enums.MissingColumnBehavior | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    dashboard?: DashboardUpdateOneRequiredWithoutGlobalFilterOverridesNestedInput
  }

  export type GlobalFilterOverrideUncheckedUpdateWithoutGlobalFilterInput = {
    id?: StringFieldUpdateOperationsInput | string
    dashboardId?: StringFieldUpdateOperationsInput | string
    isDisabled?: BoolFieldUpdateOperationsInput | boolean
    columnValue?: NullableStringFieldUpdateOperationsInput | string | null
    missingColumnBehavior?: NullableEnumMissingColumnBehaviorFieldUpdateOperationsInput | $Enums.MissingColumnBehavior | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GlobalFilterOverrideUncheckedUpdateManyWithoutGlobalFilterInput = {
    id?: StringFieldUpdateOperationsInput | string
    dashboardId?: StringFieldUpdateOperationsInput | string
    isDisabled?: BoolFieldUpdateOperationsInput | boolean
    columnValue?: NullableStringFieldUpdateOperationsInput | string | null
    missingColumnBehavior?: NullableEnumMissingColumnBehaviorFieldUpdateOperationsInput | $Enums.MissingColumnBehavior | null
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}