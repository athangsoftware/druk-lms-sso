
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
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model AuthorizationCode
 * 
 */
export type AuthorizationCode = $Result.DefaultSelection<Prisma.$AuthorizationCodePayload>
/**
 * Model RedirectURL
 * 
 */
export type RedirectURL = $Result.DefaultSelection<Prisma.$RedirectURLPayload>
/**
 * Model PostLogoutRedirectURL
 * OIDC RP-Initiated Logout: RFC 8904
 * Post-logout redirect URIs that are pre-registered for each client
 */
export type PostLogoutRedirectURL = $Result.DefaultSelection<Prisma.$PostLogoutRedirectURLPayload>
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model PasswordResetToken
 * 
 */
export type PasswordResetToken = $Result.DefaultSelection<Prisma.$PasswordResetTokenPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model WebhookLog
 * 
 */
export type WebhookLog = $Result.DefaultSelection<Prisma.$WebhookLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ClientType: {
  PUBLIC: 'PUBLIC',
  CONFIDENTIAL: 'CONFIDENTIAL'
};

export type ClientType = (typeof ClientType)[keyof typeof ClientType]


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


export const Role: {
  MEMBER: 'MEMBER',
  MODRATOR: 'MODRATOR',
  DEV: 'DEV',
  SUPER_ADMIN: 'SUPER_ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type ClientType = $Enums.ClientType

export const ClientType: typeof $Enums.ClientType

export type DbType = $Enums.DbType

export const DbType: typeof $Enums.DbType

export type ChartType = $Enums.ChartType

export const ChartType: typeof $Enums.ChartType

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

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
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.authorizationCode`: Exposes CRUD operations for the **AuthorizationCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthorizationCodes
    * const authorizationCodes = await prisma.authorizationCode.findMany()
    * ```
    */
  get authorizationCode(): Prisma.AuthorizationCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.redirectURL`: Exposes CRUD operations for the **RedirectURL** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RedirectURLS
    * const redirectURLS = await prisma.redirectURL.findMany()
    * ```
    */
  get redirectURL(): Prisma.RedirectURLDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postLogoutRedirectURL`: Exposes CRUD operations for the **PostLogoutRedirectURL** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostLogoutRedirectURLS
    * const postLogoutRedirectURLS = await prisma.postLogoutRedirectURL.findMany()
    * ```
    */
  get postLogoutRedirectURL(): Prisma.PostLogoutRedirectURLDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordResetToken`: Exposes CRUD operations for the **PasswordResetToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResetTokens
    * const passwordResetTokens = await prisma.passwordResetToken.findMany()
    * ```
    */
  get passwordResetToken(): Prisma.PasswordResetTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.webhookLog`: Exposes CRUD operations for the **WebhookLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebhookLogs
    * const webhookLogs = await prisma.webhookLog.findMany()
    * ```
    */
  get webhookLog(): Prisma.WebhookLogDelegate<ExtArgs, ClientOptions>;
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
    Client: 'Client',
    AuthorizationCode: 'AuthorizationCode',
    RedirectURL: 'RedirectURL',
    PostLogoutRedirectURL: 'PostLogoutRedirectURL',
    DbConnection: 'DbConnection',
    AiProvider: 'AiProvider',
    Chart: 'Chart',
    Dashboard: 'Dashboard',
    DashboardChart: 'DashboardChart',
    User: 'User',
    PasswordResetToken: 'PasswordResetToken',
    RefreshToken: 'RefreshToken',
    WebhookLog: 'WebhookLog'
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
      modelProps: "auditLog" | "metaData" | "client" | "authorizationCode" | "redirectURL" | "postLogoutRedirectURL" | "dbConnection" | "aiProvider" | "chart" | "dashboard" | "dashboardChart" | "user" | "passwordResetToken" | "refreshToken" | "webhookLog"
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
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      AuthorizationCode: {
        payload: Prisma.$AuthorizationCodePayload<ExtArgs>
        fields: Prisma.AuthorizationCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthorizationCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthorizationCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationCodePayload>
          }
          findFirst: {
            args: Prisma.AuthorizationCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthorizationCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationCodePayload>
          }
          findMany: {
            args: Prisma.AuthorizationCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationCodePayload>[]
          }
          create: {
            args: Prisma.AuthorizationCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationCodePayload>
          }
          createMany: {
            args: Prisma.AuthorizationCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AuthorizationCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationCodePayload>
          }
          update: {
            args: Prisma.AuthorizationCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationCodePayload>
          }
          deleteMany: {
            args: Prisma.AuthorizationCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthorizationCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuthorizationCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthorizationCodePayload>
          }
          aggregate: {
            args: Prisma.AuthorizationCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthorizationCode>
          }
          groupBy: {
            args: Prisma.AuthorizationCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthorizationCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthorizationCodeCountArgs<ExtArgs>
            result: $Utils.Optional<AuthorizationCodeCountAggregateOutputType> | number
          }
        }
      }
      RedirectURL: {
        payload: Prisma.$RedirectURLPayload<ExtArgs>
        fields: Prisma.RedirectURLFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RedirectURLFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedirectURLPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RedirectURLFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedirectURLPayload>
          }
          findFirst: {
            args: Prisma.RedirectURLFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedirectURLPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RedirectURLFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedirectURLPayload>
          }
          findMany: {
            args: Prisma.RedirectURLFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedirectURLPayload>[]
          }
          create: {
            args: Prisma.RedirectURLCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedirectURLPayload>
          }
          createMany: {
            args: Prisma.RedirectURLCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RedirectURLDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedirectURLPayload>
          }
          update: {
            args: Prisma.RedirectURLUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedirectURLPayload>
          }
          deleteMany: {
            args: Prisma.RedirectURLDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RedirectURLUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RedirectURLUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedirectURLPayload>
          }
          aggregate: {
            args: Prisma.RedirectURLAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRedirectURL>
          }
          groupBy: {
            args: Prisma.RedirectURLGroupByArgs<ExtArgs>
            result: $Utils.Optional<RedirectURLGroupByOutputType>[]
          }
          count: {
            args: Prisma.RedirectURLCountArgs<ExtArgs>
            result: $Utils.Optional<RedirectURLCountAggregateOutputType> | number
          }
        }
      }
      PostLogoutRedirectURL: {
        payload: Prisma.$PostLogoutRedirectURLPayload<ExtArgs>
        fields: Prisma.PostLogoutRedirectURLFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostLogoutRedirectURLFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostLogoutRedirectURLPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostLogoutRedirectURLFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostLogoutRedirectURLPayload>
          }
          findFirst: {
            args: Prisma.PostLogoutRedirectURLFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostLogoutRedirectURLPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostLogoutRedirectURLFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostLogoutRedirectURLPayload>
          }
          findMany: {
            args: Prisma.PostLogoutRedirectURLFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostLogoutRedirectURLPayload>[]
          }
          create: {
            args: Prisma.PostLogoutRedirectURLCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostLogoutRedirectURLPayload>
          }
          createMany: {
            args: Prisma.PostLogoutRedirectURLCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PostLogoutRedirectURLDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostLogoutRedirectURLPayload>
          }
          update: {
            args: Prisma.PostLogoutRedirectURLUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostLogoutRedirectURLPayload>
          }
          deleteMany: {
            args: Prisma.PostLogoutRedirectURLDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostLogoutRedirectURLUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PostLogoutRedirectURLUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostLogoutRedirectURLPayload>
          }
          aggregate: {
            args: Prisma.PostLogoutRedirectURLAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostLogoutRedirectURL>
          }
          groupBy: {
            args: Prisma.PostLogoutRedirectURLGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostLogoutRedirectURLGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostLogoutRedirectURLCountArgs<ExtArgs>
            result: $Utils.Optional<PostLogoutRedirectURLCountAggregateOutputType> | number
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
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      PasswordResetToken: {
        payload: Prisma.$PasswordResetTokenPayload<ExtArgs>
        fields: Prisma.PasswordResetTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findMany: {
            args: Prisma.PasswordResetTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          create: {
            args: Prisma.PasswordResetTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          createMany: {
            args: Prisma.PasswordResetTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PasswordResetTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          update: {
            args: Prisma.PasswordResetTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PasswordResetTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordResetToken>
          }
          groupBy: {
            args: Prisma.PasswordResetTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetTokenCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      WebhookLog: {
        payload: Prisma.$WebhookLogPayload<ExtArgs>
        fields: Prisma.WebhookLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebhookLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebhookLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>
          }
          findFirst: {
            args: Prisma.WebhookLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebhookLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>
          }
          findMany: {
            args: Prisma.WebhookLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>[]
          }
          create: {
            args: Prisma.WebhookLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>
          }
          createMany: {
            args: Prisma.WebhookLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.WebhookLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>
          }
          update: {
            args: Prisma.WebhookLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>
          }
          deleteMany: {
            args: Prisma.WebhookLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebhookLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WebhookLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>
          }
          aggregate: {
            args: Prisma.WebhookLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebhookLog>
          }
          groupBy: {
            args: Prisma.WebhookLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebhookLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebhookLogCountArgs<ExtArgs>
            result: $Utils.Optional<WebhookLogCountAggregateOutputType> | number
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
    client?: ClientOmit
    authorizationCode?: AuthorizationCodeOmit
    redirectURL?: RedirectURLOmit
    postLogoutRedirectURL?: PostLogoutRedirectURLOmit
    dbConnection?: DbConnectionOmit
    aiProvider?: AiProviderOmit
    chart?: ChartOmit
    dashboard?: DashboardOmit
    dashboardChart?: DashboardChartOmit
    user?: UserOmit
    passwordResetToken?: PasswordResetTokenOmit
    refreshToken?: RefreshTokenOmit
    webhookLog?: WebhookLogOmit
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
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    refreshTokens: number
    authorizationCodes: number
    redirectUrls: number
    postLogoutRedirectUrls: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refreshTokens?: boolean | ClientCountOutputTypeCountRefreshTokensArgs
    authorizationCodes?: boolean | ClientCountOutputTypeCountAuthorizationCodesArgs
    redirectUrls?: boolean | ClientCountOutputTypeCountRedirectUrlsArgs
    postLogoutRedirectUrls?: boolean | ClientCountOutputTypeCountPostLogoutRedirectUrlsArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountAuthorizationCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthorizationCodeWhereInput
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountRedirectUrlsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RedirectURLWhereInput
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountPostLogoutRedirectUrlsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostLogoutRedirectURLWhereInput
  }


  /**
   * Count Type DbConnectionCountOutputType
   */

  export type DbConnectionCountOutputType = {
    charts: number
  }

  export type DbConnectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    charts?: boolean | DbConnectionCountOutputTypeCountChartsArgs
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
  }

  export type DashboardCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dashboardCharts?: boolean | DashboardCountOutputTypeCountDashboardChartsArgs
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    refreshTokens: number
    passwordResetTokens: number
    authorizationCodes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs
    passwordResetTokens?: boolean | UserCountOutputTypeCountPasswordResetTokensArgs
    authorizationCodes?: boolean | UserCountOutputTypeCountAuthorizationCodesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPasswordResetTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuthorizationCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthorizationCodeWhereInput
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
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientMinAggregateOutputType = {
    id: string | null
    name: string | null
    clientId: string | null
    clientSecret: string | null
    clientType: $Enums.ClientType | null
    disableStrictUrlValidation: boolean | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type ClientMaxAggregateOutputType = {
    id: string | null
    name: string | null
    clientId: string | null
    clientSecret: string | null
    clientType: $Enums.ClientType | null
    disableStrictUrlValidation: boolean | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    name: number
    clientId: number
    clientSecret: number
    clientType: number
    disableStrictUrlValidation: number
    createdBy: number
    createdAt: number
    createdIp: number
    updatedBy: number
    updatedAt: number
    updatedIp: number
    _all: number
  }


  export type ClientMinAggregateInputType = {
    id?: true
    name?: true
    clientId?: true
    clientSecret?: true
    clientType?: true
    disableStrictUrlValidation?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    name?: true
    clientId?: true
    clientSecret?: true
    clientType?: true
    disableStrictUrlValidation?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    name?: true
    clientId?: true
    clientSecret?: true
    clientType?: true
    disableStrictUrlValidation?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: string
    name: string
    clientId: string
    clientSecret: string | null
    clientType: $Enums.ClientType
    disableStrictUrlValidation: boolean
    createdBy: string | null
    createdAt: Date
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    clientId?: boolean
    clientSecret?: boolean
    clientType?: boolean
    disableStrictUrlValidation?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
    refreshTokens?: boolean | Client$refreshTokensArgs<ExtArgs>
    authorizationCodes?: boolean | Client$authorizationCodesArgs<ExtArgs>
    redirectUrls?: boolean | Client$redirectUrlsArgs<ExtArgs>
    postLogoutRedirectUrls?: boolean | Client$postLogoutRedirectUrlsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>



  export type ClientSelectScalar = {
    id?: boolean
    name?: boolean
    clientId?: boolean
    clientSecret?: boolean
    clientType?: boolean
    disableStrictUrlValidation?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
  }

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "clientId" | "clientSecret" | "clientType" | "disableStrictUrlValidation" | "createdBy" | "createdAt" | "createdIp" | "updatedBy" | "updatedAt" | "updatedIp", ExtArgs["result"]["client"]>
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refreshTokens?: boolean | Client$refreshTokensArgs<ExtArgs>
    authorizationCodes?: boolean | Client$authorizationCodesArgs<ExtArgs>
    redirectUrls?: boolean | Client$redirectUrlsArgs<ExtArgs>
    postLogoutRedirectUrls?: boolean | Client$postLogoutRedirectUrlsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      authorizationCodes: Prisma.$AuthorizationCodePayload<ExtArgs>[]
      redirectUrls: Prisma.$RedirectURLPayload<ExtArgs>[]
      postLogoutRedirectUrls: Prisma.$PostLogoutRedirectURLPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      clientId: string
      clientSecret: string | null
      clientType: $Enums.ClientType
      disableStrictUrlValidation: boolean
      createdBy: string | null
      createdAt: Date
      createdIp: string | null
      updatedBy: string | null
      updatedAt: Date | null
      updatedIp: string | null
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
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
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    refreshTokens<T extends Client$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, Client$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    authorizationCodes<T extends Client$authorizationCodesArgs<ExtArgs> = {}>(args?: Subset<T, Client$authorizationCodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorizationCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    redirectUrls<T extends Client$redirectUrlsArgs<ExtArgs> = {}>(args?: Subset<T, Client$redirectUrlsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RedirectURLPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    postLogoutRedirectUrls<T extends Client$postLogoutRedirectUrlsArgs<ExtArgs> = {}>(args?: Subset<T, Client$postLogoutRedirectUrlsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostLogoutRedirectURLPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Client model
   */
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'String'>
    readonly name: FieldRef<"Client", 'String'>
    readonly clientId: FieldRef<"Client", 'String'>
    readonly clientSecret: FieldRef<"Client", 'String'>
    readonly clientType: FieldRef<"Client", 'ClientType'>
    readonly disableStrictUrlValidation: FieldRef<"Client", 'Boolean'>
    readonly createdBy: FieldRef<"Client", 'String'>
    readonly createdAt: FieldRef<"Client", 'DateTime'>
    readonly createdIp: FieldRef<"Client", 'String'>
    readonly updatedBy: FieldRef<"Client", 'String'>
    readonly updatedAt: FieldRef<"Client", 'DateTime'>
    readonly updatedIp: FieldRef<"Client", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to delete.
     */
    limit?: number
  }

  /**
   * Client.refreshTokens
   */
  export type Client$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * Client.authorizationCodes
   */
  export type Client$authorizationCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorizationCode
     */
    select?: AuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorizationCode
     */
    omit?: AuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationCodeInclude<ExtArgs> | null
    where?: AuthorizationCodeWhereInput
    orderBy?: AuthorizationCodeOrderByWithRelationInput | AuthorizationCodeOrderByWithRelationInput[]
    cursor?: AuthorizationCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuthorizationCodeScalarFieldEnum | AuthorizationCodeScalarFieldEnum[]
  }

  /**
   * Client.redirectUrls
   */
  export type Client$redirectUrlsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedirectURL
     */
    select?: RedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RedirectURL
     */
    omit?: RedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedirectURLInclude<ExtArgs> | null
    where?: RedirectURLWhereInput
    orderBy?: RedirectURLOrderByWithRelationInput | RedirectURLOrderByWithRelationInput[]
    cursor?: RedirectURLWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RedirectURLScalarFieldEnum | RedirectURLScalarFieldEnum[]
  }

  /**
   * Client.postLogoutRedirectUrls
   */
  export type Client$postLogoutRedirectUrlsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLogoutRedirectURL
     */
    select?: PostLogoutRedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostLogoutRedirectURL
     */
    omit?: PostLogoutRedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLogoutRedirectURLInclude<ExtArgs> | null
    where?: PostLogoutRedirectURLWhereInput
    orderBy?: PostLogoutRedirectURLOrderByWithRelationInput | PostLogoutRedirectURLOrderByWithRelationInput[]
    cursor?: PostLogoutRedirectURLWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostLogoutRedirectURLScalarFieldEnum | PostLogoutRedirectURLScalarFieldEnum[]
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model AuthorizationCode
   */

  export type AggregateAuthorizationCode = {
    _count: AuthorizationCodeCountAggregateOutputType | null
    _min: AuthorizationCodeMinAggregateOutputType | null
    _max: AuthorizationCodeMaxAggregateOutputType | null
  }

  export type AuthorizationCodeMinAggregateOutputType = {
    id: string | null
    code: string | null
    clientId: string | null
    userId: string | null
    redirectUri: string | null
    codeChallenge: string | null
    codeChallengeMethod: string | null
    state: string | null
    expiresAt: Date | null
    isUsed: boolean | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type AuthorizationCodeMaxAggregateOutputType = {
    id: string | null
    code: string | null
    clientId: string | null
    userId: string | null
    redirectUri: string | null
    codeChallenge: string | null
    codeChallengeMethod: string | null
    state: string | null
    expiresAt: Date | null
    isUsed: boolean | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type AuthorizationCodeCountAggregateOutputType = {
    id: number
    code: number
    clientId: number
    userId: number
    redirectUri: number
    codeChallenge: number
    codeChallengeMethod: number
    state: number
    expiresAt: number
    isUsed: number
    createdBy: number
    createdAt: number
    createdIp: number
    updatedBy: number
    updatedAt: number
    updatedIp: number
    _all: number
  }


  export type AuthorizationCodeMinAggregateInputType = {
    id?: true
    code?: true
    clientId?: true
    userId?: true
    redirectUri?: true
    codeChallenge?: true
    codeChallengeMethod?: true
    state?: true
    expiresAt?: true
    isUsed?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type AuthorizationCodeMaxAggregateInputType = {
    id?: true
    code?: true
    clientId?: true
    userId?: true
    redirectUri?: true
    codeChallenge?: true
    codeChallengeMethod?: true
    state?: true
    expiresAt?: true
    isUsed?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type AuthorizationCodeCountAggregateInputType = {
    id?: true
    code?: true
    clientId?: true
    userId?: true
    redirectUri?: true
    codeChallenge?: true
    codeChallengeMethod?: true
    state?: true
    expiresAt?: true
    isUsed?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
    _all?: true
  }

  export type AuthorizationCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthorizationCode to aggregate.
     */
    where?: AuthorizationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthorizationCodes to fetch.
     */
    orderBy?: AuthorizationCodeOrderByWithRelationInput | AuthorizationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthorizationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthorizationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthorizationCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthorizationCodes
    **/
    _count?: true | AuthorizationCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthorizationCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthorizationCodeMaxAggregateInputType
  }

  export type GetAuthorizationCodeAggregateType<T extends AuthorizationCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthorizationCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthorizationCode[P]>
      : GetScalarType<T[P], AggregateAuthorizationCode[P]>
  }




  export type AuthorizationCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthorizationCodeWhereInput
    orderBy?: AuthorizationCodeOrderByWithAggregationInput | AuthorizationCodeOrderByWithAggregationInput[]
    by: AuthorizationCodeScalarFieldEnum[] | AuthorizationCodeScalarFieldEnum
    having?: AuthorizationCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthorizationCodeCountAggregateInputType | true
    _min?: AuthorizationCodeMinAggregateInputType
    _max?: AuthorizationCodeMaxAggregateInputType
  }

  export type AuthorizationCodeGroupByOutputType = {
    id: string
    code: string
    clientId: string
    userId: string | null
    redirectUri: string
    codeChallenge: string | null
    codeChallengeMethod: string | null
    state: string | null
    expiresAt: Date
    isUsed: boolean
    createdBy: string | null
    createdAt: Date
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
    _count: AuthorizationCodeCountAggregateOutputType | null
    _min: AuthorizationCodeMinAggregateOutputType | null
    _max: AuthorizationCodeMaxAggregateOutputType | null
  }

  type GetAuthorizationCodeGroupByPayload<T extends AuthorizationCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthorizationCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthorizationCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthorizationCodeGroupByOutputType[P]>
            : GetScalarType<T[P], AuthorizationCodeGroupByOutputType[P]>
        }
      >
    >


  export type AuthorizationCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    clientId?: boolean
    userId?: boolean
    redirectUri?: boolean
    codeChallenge?: boolean
    codeChallengeMethod?: boolean
    state?: boolean
    expiresAt?: boolean
    isUsed?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    user?: boolean | AuthorizationCode$userArgs<ExtArgs>
  }, ExtArgs["result"]["authorizationCode"]>



  export type AuthorizationCodeSelectScalar = {
    id?: boolean
    code?: boolean
    clientId?: boolean
    userId?: boolean
    redirectUri?: boolean
    codeChallenge?: boolean
    codeChallengeMethod?: boolean
    state?: boolean
    expiresAt?: boolean
    isUsed?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
  }

  export type AuthorizationCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "clientId" | "userId" | "redirectUri" | "codeChallenge" | "codeChallengeMethod" | "state" | "expiresAt" | "isUsed" | "createdBy" | "createdAt" | "createdIp" | "updatedBy" | "updatedAt" | "updatedIp", ExtArgs["result"]["authorizationCode"]>
  export type AuthorizationCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    user?: boolean | AuthorizationCode$userArgs<ExtArgs>
  }

  export type $AuthorizationCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuthorizationCode"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      clientId: string
      userId: string | null
      redirectUri: string
      codeChallenge: string | null
      codeChallengeMethod: string | null
      state: string | null
      expiresAt: Date
      isUsed: boolean
      createdBy: string | null
      createdAt: Date
      createdIp: string | null
      updatedBy: string | null
      updatedAt: Date | null
      updatedIp: string | null
    }, ExtArgs["result"]["authorizationCode"]>
    composites: {}
  }

  type AuthorizationCodeGetPayload<S extends boolean | null | undefined | AuthorizationCodeDefaultArgs> = $Result.GetResult<Prisma.$AuthorizationCodePayload, S>

  type AuthorizationCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthorizationCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthorizationCodeCountAggregateInputType | true
    }

  export interface AuthorizationCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuthorizationCode'], meta: { name: 'AuthorizationCode' } }
    /**
     * Find zero or one AuthorizationCode that matches the filter.
     * @param {AuthorizationCodeFindUniqueArgs} args - Arguments to find a AuthorizationCode
     * @example
     * // Get one AuthorizationCode
     * const authorizationCode = await prisma.authorizationCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthorizationCodeFindUniqueArgs>(args: SelectSubset<T, AuthorizationCodeFindUniqueArgs<ExtArgs>>): Prisma__AuthorizationCodeClient<$Result.GetResult<Prisma.$AuthorizationCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuthorizationCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthorizationCodeFindUniqueOrThrowArgs} args - Arguments to find a AuthorizationCode
     * @example
     * // Get one AuthorizationCode
     * const authorizationCode = await prisma.authorizationCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthorizationCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthorizationCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthorizationCodeClient<$Result.GetResult<Prisma.$AuthorizationCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthorizationCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizationCodeFindFirstArgs} args - Arguments to find a AuthorizationCode
     * @example
     * // Get one AuthorizationCode
     * const authorizationCode = await prisma.authorizationCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthorizationCodeFindFirstArgs>(args?: SelectSubset<T, AuthorizationCodeFindFirstArgs<ExtArgs>>): Prisma__AuthorizationCodeClient<$Result.GetResult<Prisma.$AuthorizationCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthorizationCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizationCodeFindFirstOrThrowArgs} args - Arguments to find a AuthorizationCode
     * @example
     * // Get one AuthorizationCode
     * const authorizationCode = await prisma.authorizationCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthorizationCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthorizationCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthorizationCodeClient<$Result.GetResult<Prisma.$AuthorizationCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuthorizationCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizationCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthorizationCodes
     * const authorizationCodes = await prisma.authorizationCode.findMany()
     * 
     * // Get first 10 AuthorizationCodes
     * const authorizationCodes = await prisma.authorizationCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authorizationCodeWithIdOnly = await prisma.authorizationCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthorizationCodeFindManyArgs>(args?: SelectSubset<T, AuthorizationCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorizationCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuthorizationCode.
     * @param {AuthorizationCodeCreateArgs} args - Arguments to create a AuthorizationCode.
     * @example
     * // Create one AuthorizationCode
     * const AuthorizationCode = await prisma.authorizationCode.create({
     *   data: {
     *     // ... data to create a AuthorizationCode
     *   }
     * })
     * 
     */
    create<T extends AuthorizationCodeCreateArgs>(args: SelectSubset<T, AuthorizationCodeCreateArgs<ExtArgs>>): Prisma__AuthorizationCodeClient<$Result.GetResult<Prisma.$AuthorizationCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuthorizationCodes.
     * @param {AuthorizationCodeCreateManyArgs} args - Arguments to create many AuthorizationCodes.
     * @example
     * // Create many AuthorizationCodes
     * const authorizationCode = await prisma.authorizationCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthorizationCodeCreateManyArgs>(args?: SelectSubset<T, AuthorizationCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AuthorizationCode.
     * @param {AuthorizationCodeDeleteArgs} args - Arguments to delete one AuthorizationCode.
     * @example
     * // Delete one AuthorizationCode
     * const AuthorizationCode = await prisma.authorizationCode.delete({
     *   where: {
     *     // ... filter to delete one AuthorizationCode
     *   }
     * })
     * 
     */
    delete<T extends AuthorizationCodeDeleteArgs>(args: SelectSubset<T, AuthorizationCodeDeleteArgs<ExtArgs>>): Prisma__AuthorizationCodeClient<$Result.GetResult<Prisma.$AuthorizationCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuthorizationCode.
     * @param {AuthorizationCodeUpdateArgs} args - Arguments to update one AuthorizationCode.
     * @example
     * // Update one AuthorizationCode
     * const authorizationCode = await prisma.authorizationCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthorizationCodeUpdateArgs>(args: SelectSubset<T, AuthorizationCodeUpdateArgs<ExtArgs>>): Prisma__AuthorizationCodeClient<$Result.GetResult<Prisma.$AuthorizationCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuthorizationCodes.
     * @param {AuthorizationCodeDeleteManyArgs} args - Arguments to filter AuthorizationCodes to delete.
     * @example
     * // Delete a few AuthorizationCodes
     * const { count } = await prisma.authorizationCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthorizationCodeDeleteManyArgs>(args?: SelectSubset<T, AuthorizationCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthorizationCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizationCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthorizationCodes
     * const authorizationCode = await prisma.authorizationCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthorizationCodeUpdateManyArgs>(args: SelectSubset<T, AuthorizationCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuthorizationCode.
     * @param {AuthorizationCodeUpsertArgs} args - Arguments to update or create a AuthorizationCode.
     * @example
     * // Update or create a AuthorizationCode
     * const authorizationCode = await prisma.authorizationCode.upsert({
     *   create: {
     *     // ... data to create a AuthorizationCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthorizationCode we want to update
     *   }
     * })
     */
    upsert<T extends AuthorizationCodeUpsertArgs>(args: SelectSubset<T, AuthorizationCodeUpsertArgs<ExtArgs>>): Prisma__AuthorizationCodeClient<$Result.GetResult<Prisma.$AuthorizationCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuthorizationCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizationCodeCountArgs} args - Arguments to filter AuthorizationCodes to count.
     * @example
     * // Count the number of AuthorizationCodes
     * const count = await prisma.authorizationCode.count({
     *   where: {
     *     // ... the filter for the AuthorizationCodes we want to count
     *   }
     * })
    **/
    count<T extends AuthorizationCodeCountArgs>(
      args?: Subset<T, AuthorizationCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthorizationCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthorizationCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizationCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuthorizationCodeAggregateArgs>(args: Subset<T, AuthorizationCodeAggregateArgs>): Prisma.PrismaPromise<GetAuthorizationCodeAggregateType<T>>

    /**
     * Group by AuthorizationCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthorizationCodeGroupByArgs} args - Group by arguments.
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
      T extends AuthorizationCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthorizationCodeGroupByArgs['orderBy'] }
        : { orderBy?: AuthorizationCodeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuthorizationCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthorizationCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuthorizationCode model
   */
  readonly fields: AuthorizationCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthorizationCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthorizationCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends AuthorizationCode$userArgs<ExtArgs> = {}>(args?: Subset<T, AuthorizationCode$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AuthorizationCode model
   */
  interface AuthorizationCodeFieldRefs {
    readonly id: FieldRef<"AuthorizationCode", 'String'>
    readonly code: FieldRef<"AuthorizationCode", 'String'>
    readonly clientId: FieldRef<"AuthorizationCode", 'String'>
    readonly userId: FieldRef<"AuthorizationCode", 'String'>
    readonly redirectUri: FieldRef<"AuthorizationCode", 'String'>
    readonly codeChallenge: FieldRef<"AuthorizationCode", 'String'>
    readonly codeChallengeMethod: FieldRef<"AuthorizationCode", 'String'>
    readonly state: FieldRef<"AuthorizationCode", 'String'>
    readonly expiresAt: FieldRef<"AuthorizationCode", 'DateTime'>
    readonly isUsed: FieldRef<"AuthorizationCode", 'Boolean'>
    readonly createdBy: FieldRef<"AuthorizationCode", 'String'>
    readonly createdAt: FieldRef<"AuthorizationCode", 'DateTime'>
    readonly createdIp: FieldRef<"AuthorizationCode", 'String'>
    readonly updatedBy: FieldRef<"AuthorizationCode", 'String'>
    readonly updatedAt: FieldRef<"AuthorizationCode", 'DateTime'>
    readonly updatedIp: FieldRef<"AuthorizationCode", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AuthorizationCode findUnique
   */
  export type AuthorizationCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorizationCode
     */
    select?: AuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorizationCode
     */
    omit?: AuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationCodeInclude<ExtArgs> | null
    /**
     * Filter, which AuthorizationCode to fetch.
     */
    where: AuthorizationCodeWhereUniqueInput
  }

  /**
   * AuthorizationCode findUniqueOrThrow
   */
  export type AuthorizationCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorizationCode
     */
    select?: AuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorizationCode
     */
    omit?: AuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationCodeInclude<ExtArgs> | null
    /**
     * Filter, which AuthorizationCode to fetch.
     */
    where: AuthorizationCodeWhereUniqueInput
  }

  /**
   * AuthorizationCode findFirst
   */
  export type AuthorizationCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorizationCode
     */
    select?: AuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorizationCode
     */
    omit?: AuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationCodeInclude<ExtArgs> | null
    /**
     * Filter, which AuthorizationCode to fetch.
     */
    where?: AuthorizationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthorizationCodes to fetch.
     */
    orderBy?: AuthorizationCodeOrderByWithRelationInput | AuthorizationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthorizationCodes.
     */
    cursor?: AuthorizationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthorizationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthorizationCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthorizationCodes.
     */
    distinct?: AuthorizationCodeScalarFieldEnum | AuthorizationCodeScalarFieldEnum[]
  }

  /**
   * AuthorizationCode findFirstOrThrow
   */
  export type AuthorizationCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorizationCode
     */
    select?: AuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorizationCode
     */
    omit?: AuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationCodeInclude<ExtArgs> | null
    /**
     * Filter, which AuthorizationCode to fetch.
     */
    where?: AuthorizationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthorizationCodes to fetch.
     */
    orderBy?: AuthorizationCodeOrderByWithRelationInput | AuthorizationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthorizationCodes.
     */
    cursor?: AuthorizationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthorizationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthorizationCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthorizationCodes.
     */
    distinct?: AuthorizationCodeScalarFieldEnum | AuthorizationCodeScalarFieldEnum[]
  }

  /**
   * AuthorizationCode findMany
   */
  export type AuthorizationCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorizationCode
     */
    select?: AuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorizationCode
     */
    omit?: AuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationCodeInclude<ExtArgs> | null
    /**
     * Filter, which AuthorizationCodes to fetch.
     */
    where?: AuthorizationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthorizationCodes to fetch.
     */
    orderBy?: AuthorizationCodeOrderByWithRelationInput | AuthorizationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthorizationCodes.
     */
    cursor?: AuthorizationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthorizationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthorizationCodes.
     */
    skip?: number
    distinct?: AuthorizationCodeScalarFieldEnum | AuthorizationCodeScalarFieldEnum[]
  }

  /**
   * AuthorizationCode create
   */
  export type AuthorizationCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorizationCode
     */
    select?: AuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorizationCode
     */
    omit?: AuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a AuthorizationCode.
     */
    data: XOR<AuthorizationCodeCreateInput, AuthorizationCodeUncheckedCreateInput>
  }

  /**
   * AuthorizationCode createMany
   */
  export type AuthorizationCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuthorizationCodes.
     */
    data: AuthorizationCodeCreateManyInput | AuthorizationCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthorizationCode update
   */
  export type AuthorizationCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorizationCode
     */
    select?: AuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorizationCode
     */
    omit?: AuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a AuthorizationCode.
     */
    data: XOR<AuthorizationCodeUpdateInput, AuthorizationCodeUncheckedUpdateInput>
    /**
     * Choose, which AuthorizationCode to update.
     */
    where: AuthorizationCodeWhereUniqueInput
  }

  /**
   * AuthorizationCode updateMany
   */
  export type AuthorizationCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuthorizationCodes.
     */
    data: XOR<AuthorizationCodeUpdateManyMutationInput, AuthorizationCodeUncheckedUpdateManyInput>
    /**
     * Filter which AuthorizationCodes to update
     */
    where?: AuthorizationCodeWhereInput
    /**
     * Limit how many AuthorizationCodes to update.
     */
    limit?: number
  }

  /**
   * AuthorizationCode upsert
   */
  export type AuthorizationCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorizationCode
     */
    select?: AuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorizationCode
     */
    omit?: AuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the AuthorizationCode to update in case it exists.
     */
    where: AuthorizationCodeWhereUniqueInput
    /**
     * In case the AuthorizationCode found by the `where` argument doesn't exist, create a new AuthorizationCode with this data.
     */
    create: XOR<AuthorizationCodeCreateInput, AuthorizationCodeUncheckedCreateInput>
    /**
     * In case the AuthorizationCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthorizationCodeUpdateInput, AuthorizationCodeUncheckedUpdateInput>
  }

  /**
   * AuthorizationCode delete
   */
  export type AuthorizationCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorizationCode
     */
    select?: AuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorizationCode
     */
    omit?: AuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationCodeInclude<ExtArgs> | null
    /**
     * Filter which AuthorizationCode to delete.
     */
    where: AuthorizationCodeWhereUniqueInput
  }

  /**
   * AuthorizationCode deleteMany
   */
  export type AuthorizationCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthorizationCodes to delete
     */
    where?: AuthorizationCodeWhereInput
    /**
     * Limit how many AuthorizationCodes to delete.
     */
    limit?: number
  }

  /**
   * AuthorizationCode.user
   */
  export type AuthorizationCode$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuthorizationCode without action
   */
  export type AuthorizationCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorizationCode
     */
    select?: AuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorizationCode
     */
    omit?: AuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationCodeInclude<ExtArgs> | null
  }


  /**
   * Model RedirectURL
   */

  export type AggregateRedirectURL = {
    _count: RedirectURLCountAggregateOutputType | null
    _min: RedirectURLMinAggregateOutputType | null
    _max: RedirectURLMaxAggregateOutputType | null
  }

  export type RedirectURLMinAggregateOutputType = {
    id: string | null
    url: string | null
    clientId: string | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type RedirectURLMaxAggregateOutputType = {
    id: string | null
    url: string | null
    clientId: string | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type RedirectURLCountAggregateOutputType = {
    id: number
    url: number
    clientId: number
    createdBy: number
    createdAt: number
    createdIp: number
    updatedBy: number
    updatedAt: number
    updatedIp: number
    _all: number
  }


  export type RedirectURLMinAggregateInputType = {
    id?: true
    url?: true
    clientId?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type RedirectURLMaxAggregateInputType = {
    id?: true
    url?: true
    clientId?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type RedirectURLCountAggregateInputType = {
    id?: true
    url?: true
    clientId?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
    _all?: true
  }

  export type RedirectURLAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RedirectURL to aggregate.
     */
    where?: RedirectURLWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RedirectURLS to fetch.
     */
    orderBy?: RedirectURLOrderByWithRelationInput | RedirectURLOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RedirectURLWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RedirectURLS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RedirectURLS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RedirectURLS
    **/
    _count?: true | RedirectURLCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RedirectURLMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RedirectURLMaxAggregateInputType
  }

  export type GetRedirectURLAggregateType<T extends RedirectURLAggregateArgs> = {
        [P in keyof T & keyof AggregateRedirectURL]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRedirectURL[P]>
      : GetScalarType<T[P], AggregateRedirectURL[P]>
  }




  export type RedirectURLGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RedirectURLWhereInput
    orderBy?: RedirectURLOrderByWithAggregationInput | RedirectURLOrderByWithAggregationInput[]
    by: RedirectURLScalarFieldEnum[] | RedirectURLScalarFieldEnum
    having?: RedirectURLScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RedirectURLCountAggregateInputType | true
    _min?: RedirectURLMinAggregateInputType
    _max?: RedirectURLMaxAggregateInputType
  }

  export type RedirectURLGroupByOutputType = {
    id: string
    url: string
    clientId: string
    createdBy: string | null
    createdAt: Date
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
    _count: RedirectURLCountAggregateOutputType | null
    _min: RedirectURLMinAggregateOutputType | null
    _max: RedirectURLMaxAggregateOutputType | null
  }

  type GetRedirectURLGroupByPayload<T extends RedirectURLGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RedirectURLGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RedirectURLGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RedirectURLGroupByOutputType[P]>
            : GetScalarType<T[P], RedirectURLGroupByOutputType[P]>
        }
      >
    >


  export type RedirectURLSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    clientId?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["redirectURL"]>



  export type RedirectURLSelectScalar = {
    id?: boolean
    url?: boolean
    clientId?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
  }

  export type RedirectURLOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "clientId" | "createdBy" | "createdAt" | "createdIp" | "updatedBy" | "updatedAt" | "updatedIp", ExtArgs["result"]["redirectURL"]>
  export type RedirectURLInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $RedirectURLPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RedirectURL"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      clientId: string
      createdBy: string | null
      createdAt: Date
      createdIp: string | null
      updatedBy: string | null
      updatedAt: Date | null
      updatedIp: string | null
    }, ExtArgs["result"]["redirectURL"]>
    composites: {}
  }

  type RedirectURLGetPayload<S extends boolean | null | undefined | RedirectURLDefaultArgs> = $Result.GetResult<Prisma.$RedirectURLPayload, S>

  type RedirectURLCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RedirectURLFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RedirectURLCountAggregateInputType | true
    }

  export interface RedirectURLDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RedirectURL'], meta: { name: 'RedirectURL' } }
    /**
     * Find zero or one RedirectURL that matches the filter.
     * @param {RedirectURLFindUniqueArgs} args - Arguments to find a RedirectURL
     * @example
     * // Get one RedirectURL
     * const redirectURL = await prisma.redirectURL.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RedirectURLFindUniqueArgs>(args: SelectSubset<T, RedirectURLFindUniqueArgs<ExtArgs>>): Prisma__RedirectURLClient<$Result.GetResult<Prisma.$RedirectURLPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RedirectURL that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RedirectURLFindUniqueOrThrowArgs} args - Arguments to find a RedirectURL
     * @example
     * // Get one RedirectURL
     * const redirectURL = await prisma.redirectURL.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RedirectURLFindUniqueOrThrowArgs>(args: SelectSubset<T, RedirectURLFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RedirectURLClient<$Result.GetResult<Prisma.$RedirectURLPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RedirectURL that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedirectURLFindFirstArgs} args - Arguments to find a RedirectURL
     * @example
     * // Get one RedirectURL
     * const redirectURL = await prisma.redirectURL.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RedirectURLFindFirstArgs>(args?: SelectSubset<T, RedirectURLFindFirstArgs<ExtArgs>>): Prisma__RedirectURLClient<$Result.GetResult<Prisma.$RedirectURLPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RedirectURL that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedirectURLFindFirstOrThrowArgs} args - Arguments to find a RedirectURL
     * @example
     * // Get one RedirectURL
     * const redirectURL = await prisma.redirectURL.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RedirectURLFindFirstOrThrowArgs>(args?: SelectSubset<T, RedirectURLFindFirstOrThrowArgs<ExtArgs>>): Prisma__RedirectURLClient<$Result.GetResult<Prisma.$RedirectURLPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RedirectURLS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedirectURLFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RedirectURLS
     * const redirectURLS = await prisma.redirectURL.findMany()
     * 
     * // Get first 10 RedirectURLS
     * const redirectURLS = await prisma.redirectURL.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const redirectURLWithIdOnly = await prisma.redirectURL.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RedirectURLFindManyArgs>(args?: SelectSubset<T, RedirectURLFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RedirectURLPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RedirectURL.
     * @param {RedirectURLCreateArgs} args - Arguments to create a RedirectURL.
     * @example
     * // Create one RedirectURL
     * const RedirectURL = await prisma.redirectURL.create({
     *   data: {
     *     // ... data to create a RedirectURL
     *   }
     * })
     * 
     */
    create<T extends RedirectURLCreateArgs>(args: SelectSubset<T, RedirectURLCreateArgs<ExtArgs>>): Prisma__RedirectURLClient<$Result.GetResult<Prisma.$RedirectURLPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RedirectURLS.
     * @param {RedirectURLCreateManyArgs} args - Arguments to create many RedirectURLS.
     * @example
     * // Create many RedirectURLS
     * const redirectURL = await prisma.redirectURL.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RedirectURLCreateManyArgs>(args?: SelectSubset<T, RedirectURLCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RedirectURL.
     * @param {RedirectURLDeleteArgs} args - Arguments to delete one RedirectURL.
     * @example
     * // Delete one RedirectURL
     * const RedirectURL = await prisma.redirectURL.delete({
     *   where: {
     *     // ... filter to delete one RedirectURL
     *   }
     * })
     * 
     */
    delete<T extends RedirectURLDeleteArgs>(args: SelectSubset<T, RedirectURLDeleteArgs<ExtArgs>>): Prisma__RedirectURLClient<$Result.GetResult<Prisma.$RedirectURLPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RedirectURL.
     * @param {RedirectURLUpdateArgs} args - Arguments to update one RedirectURL.
     * @example
     * // Update one RedirectURL
     * const redirectURL = await prisma.redirectURL.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RedirectURLUpdateArgs>(args: SelectSubset<T, RedirectURLUpdateArgs<ExtArgs>>): Prisma__RedirectURLClient<$Result.GetResult<Prisma.$RedirectURLPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RedirectURLS.
     * @param {RedirectURLDeleteManyArgs} args - Arguments to filter RedirectURLS to delete.
     * @example
     * // Delete a few RedirectURLS
     * const { count } = await prisma.redirectURL.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RedirectURLDeleteManyArgs>(args?: SelectSubset<T, RedirectURLDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RedirectURLS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedirectURLUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RedirectURLS
     * const redirectURL = await prisma.redirectURL.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RedirectURLUpdateManyArgs>(args: SelectSubset<T, RedirectURLUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RedirectURL.
     * @param {RedirectURLUpsertArgs} args - Arguments to update or create a RedirectURL.
     * @example
     * // Update or create a RedirectURL
     * const redirectURL = await prisma.redirectURL.upsert({
     *   create: {
     *     // ... data to create a RedirectURL
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RedirectURL we want to update
     *   }
     * })
     */
    upsert<T extends RedirectURLUpsertArgs>(args: SelectSubset<T, RedirectURLUpsertArgs<ExtArgs>>): Prisma__RedirectURLClient<$Result.GetResult<Prisma.$RedirectURLPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RedirectURLS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedirectURLCountArgs} args - Arguments to filter RedirectURLS to count.
     * @example
     * // Count the number of RedirectURLS
     * const count = await prisma.redirectURL.count({
     *   where: {
     *     // ... the filter for the RedirectURLS we want to count
     *   }
     * })
    **/
    count<T extends RedirectURLCountArgs>(
      args?: Subset<T, RedirectURLCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RedirectURLCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RedirectURL.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedirectURLAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RedirectURLAggregateArgs>(args: Subset<T, RedirectURLAggregateArgs>): Prisma.PrismaPromise<GetRedirectURLAggregateType<T>>

    /**
     * Group by RedirectURL.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedirectURLGroupByArgs} args - Group by arguments.
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
      T extends RedirectURLGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RedirectURLGroupByArgs['orderBy'] }
        : { orderBy?: RedirectURLGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RedirectURLGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRedirectURLGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RedirectURL model
   */
  readonly fields: RedirectURLFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RedirectURL.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RedirectURLClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RedirectURL model
   */
  interface RedirectURLFieldRefs {
    readonly id: FieldRef<"RedirectURL", 'String'>
    readonly url: FieldRef<"RedirectURL", 'String'>
    readonly clientId: FieldRef<"RedirectURL", 'String'>
    readonly createdBy: FieldRef<"RedirectURL", 'String'>
    readonly createdAt: FieldRef<"RedirectURL", 'DateTime'>
    readonly createdIp: FieldRef<"RedirectURL", 'String'>
    readonly updatedBy: FieldRef<"RedirectURL", 'String'>
    readonly updatedAt: FieldRef<"RedirectURL", 'DateTime'>
    readonly updatedIp: FieldRef<"RedirectURL", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RedirectURL findUnique
   */
  export type RedirectURLFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedirectURL
     */
    select?: RedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RedirectURL
     */
    omit?: RedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedirectURLInclude<ExtArgs> | null
    /**
     * Filter, which RedirectURL to fetch.
     */
    where: RedirectURLWhereUniqueInput
  }

  /**
   * RedirectURL findUniqueOrThrow
   */
  export type RedirectURLFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedirectURL
     */
    select?: RedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RedirectURL
     */
    omit?: RedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedirectURLInclude<ExtArgs> | null
    /**
     * Filter, which RedirectURL to fetch.
     */
    where: RedirectURLWhereUniqueInput
  }

  /**
   * RedirectURL findFirst
   */
  export type RedirectURLFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedirectURL
     */
    select?: RedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RedirectURL
     */
    omit?: RedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedirectURLInclude<ExtArgs> | null
    /**
     * Filter, which RedirectURL to fetch.
     */
    where?: RedirectURLWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RedirectURLS to fetch.
     */
    orderBy?: RedirectURLOrderByWithRelationInput | RedirectURLOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RedirectURLS.
     */
    cursor?: RedirectURLWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RedirectURLS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RedirectURLS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RedirectURLS.
     */
    distinct?: RedirectURLScalarFieldEnum | RedirectURLScalarFieldEnum[]
  }

  /**
   * RedirectURL findFirstOrThrow
   */
  export type RedirectURLFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedirectURL
     */
    select?: RedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RedirectURL
     */
    omit?: RedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedirectURLInclude<ExtArgs> | null
    /**
     * Filter, which RedirectURL to fetch.
     */
    where?: RedirectURLWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RedirectURLS to fetch.
     */
    orderBy?: RedirectURLOrderByWithRelationInput | RedirectURLOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RedirectURLS.
     */
    cursor?: RedirectURLWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RedirectURLS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RedirectURLS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RedirectURLS.
     */
    distinct?: RedirectURLScalarFieldEnum | RedirectURLScalarFieldEnum[]
  }

  /**
   * RedirectURL findMany
   */
  export type RedirectURLFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedirectURL
     */
    select?: RedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RedirectURL
     */
    omit?: RedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedirectURLInclude<ExtArgs> | null
    /**
     * Filter, which RedirectURLS to fetch.
     */
    where?: RedirectURLWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RedirectURLS to fetch.
     */
    orderBy?: RedirectURLOrderByWithRelationInput | RedirectURLOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RedirectURLS.
     */
    cursor?: RedirectURLWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RedirectURLS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RedirectURLS.
     */
    skip?: number
    distinct?: RedirectURLScalarFieldEnum | RedirectURLScalarFieldEnum[]
  }

  /**
   * RedirectURL create
   */
  export type RedirectURLCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedirectURL
     */
    select?: RedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RedirectURL
     */
    omit?: RedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedirectURLInclude<ExtArgs> | null
    /**
     * The data needed to create a RedirectURL.
     */
    data: XOR<RedirectURLCreateInput, RedirectURLUncheckedCreateInput>
  }

  /**
   * RedirectURL createMany
   */
  export type RedirectURLCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RedirectURLS.
     */
    data: RedirectURLCreateManyInput | RedirectURLCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RedirectURL update
   */
  export type RedirectURLUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedirectURL
     */
    select?: RedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RedirectURL
     */
    omit?: RedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedirectURLInclude<ExtArgs> | null
    /**
     * The data needed to update a RedirectURL.
     */
    data: XOR<RedirectURLUpdateInput, RedirectURLUncheckedUpdateInput>
    /**
     * Choose, which RedirectURL to update.
     */
    where: RedirectURLWhereUniqueInput
  }

  /**
   * RedirectURL updateMany
   */
  export type RedirectURLUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RedirectURLS.
     */
    data: XOR<RedirectURLUpdateManyMutationInput, RedirectURLUncheckedUpdateManyInput>
    /**
     * Filter which RedirectURLS to update
     */
    where?: RedirectURLWhereInput
    /**
     * Limit how many RedirectURLS to update.
     */
    limit?: number
  }

  /**
   * RedirectURL upsert
   */
  export type RedirectURLUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedirectURL
     */
    select?: RedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RedirectURL
     */
    omit?: RedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedirectURLInclude<ExtArgs> | null
    /**
     * The filter to search for the RedirectURL to update in case it exists.
     */
    where: RedirectURLWhereUniqueInput
    /**
     * In case the RedirectURL found by the `where` argument doesn't exist, create a new RedirectURL with this data.
     */
    create: XOR<RedirectURLCreateInput, RedirectURLUncheckedCreateInput>
    /**
     * In case the RedirectURL was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RedirectURLUpdateInput, RedirectURLUncheckedUpdateInput>
  }

  /**
   * RedirectURL delete
   */
  export type RedirectURLDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedirectURL
     */
    select?: RedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RedirectURL
     */
    omit?: RedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedirectURLInclude<ExtArgs> | null
    /**
     * Filter which RedirectURL to delete.
     */
    where: RedirectURLWhereUniqueInput
  }

  /**
   * RedirectURL deleteMany
   */
  export type RedirectURLDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RedirectURLS to delete
     */
    where?: RedirectURLWhereInput
    /**
     * Limit how many RedirectURLS to delete.
     */
    limit?: number
  }

  /**
   * RedirectURL without action
   */
  export type RedirectURLDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedirectURL
     */
    select?: RedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RedirectURL
     */
    omit?: RedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedirectURLInclude<ExtArgs> | null
  }


  /**
   * Model PostLogoutRedirectURL
   */

  export type AggregatePostLogoutRedirectURL = {
    _count: PostLogoutRedirectURLCountAggregateOutputType | null
    _min: PostLogoutRedirectURLMinAggregateOutputType | null
    _max: PostLogoutRedirectURLMaxAggregateOutputType | null
  }

  export type PostLogoutRedirectURLMinAggregateOutputType = {
    id: string | null
    url: string | null
    clientId: string | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type PostLogoutRedirectURLMaxAggregateOutputType = {
    id: string | null
    url: string | null
    clientId: string | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type PostLogoutRedirectURLCountAggregateOutputType = {
    id: number
    url: number
    clientId: number
    createdBy: number
    createdAt: number
    createdIp: number
    updatedBy: number
    updatedAt: number
    updatedIp: number
    _all: number
  }


  export type PostLogoutRedirectURLMinAggregateInputType = {
    id?: true
    url?: true
    clientId?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type PostLogoutRedirectURLMaxAggregateInputType = {
    id?: true
    url?: true
    clientId?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type PostLogoutRedirectURLCountAggregateInputType = {
    id?: true
    url?: true
    clientId?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
    _all?: true
  }

  export type PostLogoutRedirectURLAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostLogoutRedirectURL to aggregate.
     */
    where?: PostLogoutRedirectURLWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostLogoutRedirectURLS to fetch.
     */
    orderBy?: PostLogoutRedirectURLOrderByWithRelationInput | PostLogoutRedirectURLOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostLogoutRedirectURLWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostLogoutRedirectURLS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostLogoutRedirectURLS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostLogoutRedirectURLS
    **/
    _count?: true | PostLogoutRedirectURLCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostLogoutRedirectURLMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostLogoutRedirectURLMaxAggregateInputType
  }

  export type GetPostLogoutRedirectURLAggregateType<T extends PostLogoutRedirectURLAggregateArgs> = {
        [P in keyof T & keyof AggregatePostLogoutRedirectURL]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostLogoutRedirectURL[P]>
      : GetScalarType<T[P], AggregatePostLogoutRedirectURL[P]>
  }




  export type PostLogoutRedirectURLGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostLogoutRedirectURLWhereInput
    orderBy?: PostLogoutRedirectURLOrderByWithAggregationInput | PostLogoutRedirectURLOrderByWithAggregationInput[]
    by: PostLogoutRedirectURLScalarFieldEnum[] | PostLogoutRedirectURLScalarFieldEnum
    having?: PostLogoutRedirectURLScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostLogoutRedirectURLCountAggregateInputType | true
    _min?: PostLogoutRedirectURLMinAggregateInputType
    _max?: PostLogoutRedirectURLMaxAggregateInputType
  }

  export type PostLogoutRedirectURLGroupByOutputType = {
    id: string
    url: string
    clientId: string
    createdBy: string | null
    createdAt: Date
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
    _count: PostLogoutRedirectURLCountAggregateOutputType | null
    _min: PostLogoutRedirectURLMinAggregateOutputType | null
    _max: PostLogoutRedirectURLMaxAggregateOutputType | null
  }

  type GetPostLogoutRedirectURLGroupByPayload<T extends PostLogoutRedirectURLGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostLogoutRedirectURLGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostLogoutRedirectURLGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostLogoutRedirectURLGroupByOutputType[P]>
            : GetScalarType<T[P], PostLogoutRedirectURLGroupByOutputType[P]>
        }
      >
    >


  export type PostLogoutRedirectURLSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    clientId?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postLogoutRedirectURL"]>



  export type PostLogoutRedirectURLSelectScalar = {
    id?: boolean
    url?: boolean
    clientId?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
  }

  export type PostLogoutRedirectURLOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "clientId" | "createdBy" | "createdAt" | "createdIp" | "updatedBy" | "updatedAt" | "updatedIp", ExtArgs["result"]["postLogoutRedirectURL"]>
  export type PostLogoutRedirectURLInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $PostLogoutRedirectURLPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostLogoutRedirectURL"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      clientId: string
      createdBy: string | null
      createdAt: Date
      createdIp: string | null
      updatedBy: string | null
      updatedAt: Date | null
      updatedIp: string | null
    }, ExtArgs["result"]["postLogoutRedirectURL"]>
    composites: {}
  }

  type PostLogoutRedirectURLGetPayload<S extends boolean | null | undefined | PostLogoutRedirectURLDefaultArgs> = $Result.GetResult<Prisma.$PostLogoutRedirectURLPayload, S>

  type PostLogoutRedirectURLCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostLogoutRedirectURLFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostLogoutRedirectURLCountAggregateInputType | true
    }

  export interface PostLogoutRedirectURLDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostLogoutRedirectURL'], meta: { name: 'PostLogoutRedirectURL' } }
    /**
     * Find zero or one PostLogoutRedirectURL that matches the filter.
     * @param {PostLogoutRedirectURLFindUniqueArgs} args - Arguments to find a PostLogoutRedirectURL
     * @example
     * // Get one PostLogoutRedirectURL
     * const postLogoutRedirectURL = await prisma.postLogoutRedirectURL.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostLogoutRedirectURLFindUniqueArgs>(args: SelectSubset<T, PostLogoutRedirectURLFindUniqueArgs<ExtArgs>>): Prisma__PostLogoutRedirectURLClient<$Result.GetResult<Prisma.$PostLogoutRedirectURLPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostLogoutRedirectURL that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostLogoutRedirectURLFindUniqueOrThrowArgs} args - Arguments to find a PostLogoutRedirectURL
     * @example
     * // Get one PostLogoutRedirectURL
     * const postLogoutRedirectURL = await prisma.postLogoutRedirectURL.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostLogoutRedirectURLFindUniqueOrThrowArgs>(args: SelectSubset<T, PostLogoutRedirectURLFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostLogoutRedirectURLClient<$Result.GetResult<Prisma.$PostLogoutRedirectURLPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostLogoutRedirectURL that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostLogoutRedirectURLFindFirstArgs} args - Arguments to find a PostLogoutRedirectURL
     * @example
     * // Get one PostLogoutRedirectURL
     * const postLogoutRedirectURL = await prisma.postLogoutRedirectURL.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostLogoutRedirectURLFindFirstArgs>(args?: SelectSubset<T, PostLogoutRedirectURLFindFirstArgs<ExtArgs>>): Prisma__PostLogoutRedirectURLClient<$Result.GetResult<Prisma.$PostLogoutRedirectURLPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostLogoutRedirectURL that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostLogoutRedirectURLFindFirstOrThrowArgs} args - Arguments to find a PostLogoutRedirectURL
     * @example
     * // Get one PostLogoutRedirectURL
     * const postLogoutRedirectURL = await prisma.postLogoutRedirectURL.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostLogoutRedirectURLFindFirstOrThrowArgs>(args?: SelectSubset<T, PostLogoutRedirectURLFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostLogoutRedirectURLClient<$Result.GetResult<Prisma.$PostLogoutRedirectURLPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostLogoutRedirectURLS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostLogoutRedirectURLFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostLogoutRedirectURLS
     * const postLogoutRedirectURLS = await prisma.postLogoutRedirectURL.findMany()
     * 
     * // Get first 10 PostLogoutRedirectURLS
     * const postLogoutRedirectURLS = await prisma.postLogoutRedirectURL.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postLogoutRedirectURLWithIdOnly = await prisma.postLogoutRedirectURL.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostLogoutRedirectURLFindManyArgs>(args?: SelectSubset<T, PostLogoutRedirectURLFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostLogoutRedirectURLPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostLogoutRedirectURL.
     * @param {PostLogoutRedirectURLCreateArgs} args - Arguments to create a PostLogoutRedirectURL.
     * @example
     * // Create one PostLogoutRedirectURL
     * const PostLogoutRedirectURL = await prisma.postLogoutRedirectURL.create({
     *   data: {
     *     // ... data to create a PostLogoutRedirectURL
     *   }
     * })
     * 
     */
    create<T extends PostLogoutRedirectURLCreateArgs>(args: SelectSubset<T, PostLogoutRedirectURLCreateArgs<ExtArgs>>): Prisma__PostLogoutRedirectURLClient<$Result.GetResult<Prisma.$PostLogoutRedirectURLPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostLogoutRedirectURLS.
     * @param {PostLogoutRedirectURLCreateManyArgs} args - Arguments to create many PostLogoutRedirectURLS.
     * @example
     * // Create many PostLogoutRedirectURLS
     * const postLogoutRedirectURL = await prisma.postLogoutRedirectURL.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostLogoutRedirectURLCreateManyArgs>(args?: SelectSubset<T, PostLogoutRedirectURLCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PostLogoutRedirectURL.
     * @param {PostLogoutRedirectURLDeleteArgs} args - Arguments to delete one PostLogoutRedirectURL.
     * @example
     * // Delete one PostLogoutRedirectURL
     * const PostLogoutRedirectURL = await prisma.postLogoutRedirectURL.delete({
     *   where: {
     *     // ... filter to delete one PostLogoutRedirectURL
     *   }
     * })
     * 
     */
    delete<T extends PostLogoutRedirectURLDeleteArgs>(args: SelectSubset<T, PostLogoutRedirectURLDeleteArgs<ExtArgs>>): Prisma__PostLogoutRedirectURLClient<$Result.GetResult<Prisma.$PostLogoutRedirectURLPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostLogoutRedirectURL.
     * @param {PostLogoutRedirectURLUpdateArgs} args - Arguments to update one PostLogoutRedirectURL.
     * @example
     * // Update one PostLogoutRedirectURL
     * const postLogoutRedirectURL = await prisma.postLogoutRedirectURL.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostLogoutRedirectURLUpdateArgs>(args: SelectSubset<T, PostLogoutRedirectURLUpdateArgs<ExtArgs>>): Prisma__PostLogoutRedirectURLClient<$Result.GetResult<Prisma.$PostLogoutRedirectURLPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostLogoutRedirectURLS.
     * @param {PostLogoutRedirectURLDeleteManyArgs} args - Arguments to filter PostLogoutRedirectURLS to delete.
     * @example
     * // Delete a few PostLogoutRedirectURLS
     * const { count } = await prisma.postLogoutRedirectURL.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostLogoutRedirectURLDeleteManyArgs>(args?: SelectSubset<T, PostLogoutRedirectURLDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostLogoutRedirectURLS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostLogoutRedirectURLUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostLogoutRedirectURLS
     * const postLogoutRedirectURL = await prisma.postLogoutRedirectURL.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostLogoutRedirectURLUpdateManyArgs>(args: SelectSubset<T, PostLogoutRedirectURLUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PostLogoutRedirectURL.
     * @param {PostLogoutRedirectURLUpsertArgs} args - Arguments to update or create a PostLogoutRedirectURL.
     * @example
     * // Update or create a PostLogoutRedirectURL
     * const postLogoutRedirectURL = await prisma.postLogoutRedirectURL.upsert({
     *   create: {
     *     // ... data to create a PostLogoutRedirectURL
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostLogoutRedirectURL we want to update
     *   }
     * })
     */
    upsert<T extends PostLogoutRedirectURLUpsertArgs>(args: SelectSubset<T, PostLogoutRedirectURLUpsertArgs<ExtArgs>>): Prisma__PostLogoutRedirectURLClient<$Result.GetResult<Prisma.$PostLogoutRedirectURLPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostLogoutRedirectURLS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostLogoutRedirectURLCountArgs} args - Arguments to filter PostLogoutRedirectURLS to count.
     * @example
     * // Count the number of PostLogoutRedirectURLS
     * const count = await prisma.postLogoutRedirectURL.count({
     *   where: {
     *     // ... the filter for the PostLogoutRedirectURLS we want to count
     *   }
     * })
    **/
    count<T extends PostLogoutRedirectURLCountArgs>(
      args?: Subset<T, PostLogoutRedirectURLCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostLogoutRedirectURLCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostLogoutRedirectURL.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostLogoutRedirectURLAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PostLogoutRedirectURLAggregateArgs>(args: Subset<T, PostLogoutRedirectURLAggregateArgs>): Prisma.PrismaPromise<GetPostLogoutRedirectURLAggregateType<T>>

    /**
     * Group by PostLogoutRedirectURL.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostLogoutRedirectURLGroupByArgs} args - Group by arguments.
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
      T extends PostLogoutRedirectURLGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostLogoutRedirectURLGroupByArgs['orderBy'] }
        : { orderBy?: PostLogoutRedirectURLGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PostLogoutRedirectURLGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostLogoutRedirectURLGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostLogoutRedirectURL model
   */
  readonly fields: PostLogoutRedirectURLFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostLogoutRedirectURL.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostLogoutRedirectURLClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PostLogoutRedirectURL model
   */
  interface PostLogoutRedirectURLFieldRefs {
    readonly id: FieldRef<"PostLogoutRedirectURL", 'String'>
    readonly url: FieldRef<"PostLogoutRedirectURL", 'String'>
    readonly clientId: FieldRef<"PostLogoutRedirectURL", 'String'>
    readonly createdBy: FieldRef<"PostLogoutRedirectURL", 'String'>
    readonly createdAt: FieldRef<"PostLogoutRedirectURL", 'DateTime'>
    readonly createdIp: FieldRef<"PostLogoutRedirectURL", 'String'>
    readonly updatedBy: FieldRef<"PostLogoutRedirectURL", 'String'>
    readonly updatedAt: FieldRef<"PostLogoutRedirectURL", 'DateTime'>
    readonly updatedIp: FieldRef<"PostLogoutRedirectURL", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PostLogoutRedirectURL findUnique
   */
  export type PostLogoutRedirectURLFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLogoutRedirectURL
     */
    select?: PostLogoutRedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostLogoutRedirectURL
     */
    omit?: PostLogoutRedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLogoutRedirectURLInclude<ExtArgs> | null
    /**
     * Filter, which PostLogoutRedirectURL to fetch.
     */
    where: PostLogoutRedirectURLWhereUniqueInput
  }

  /**
   * PostLogoutRedirectURL findUniqueOrThrow
   */
  export type PostLogoutRedirectURLFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLogoutRedirectURL
     */
    select?: PostLogoutRedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostLogoutRedirectURL
     */
    omit?: PostLogoutRedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLogoutRedirectURLInclude<ExtArgs> | null
    /**
     * Filter, which PostLogoutRedirectURL to fetch.
     */
    where: PostLogoutRedirectURLWhereUniqueInput
  }

  /**
   * PostLogoutRedirectURL findFirst
   */
  export type PostLogoutRedirectURLFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLogoutRedirectURL
     */
    select?: PostLogoutRedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostLogoutRedirectURL
     */
    omit?: PostLogoutRedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLogoutRedirectURLInclude<ExtArgs> | null
    /**
     * Filter, which PostLogoutRedirectURL to fetch.
     */
    where?: PostLogoutRedirectURLWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostLogoutRedirectURLS to fetch.
     */
    orderBy?: PostLogoutRedirectURLOrderByWithRelationInput | PostLogoutRedirectURLOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostLogoutRedirectURLS.
     */
    cursor?: PostLogoutRedirectURLWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostLogoutRedirectURLS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostLogoutRedirectURLS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostLogoutRedirectURLS.
     */
    distinct?: PostLogoutRedirectURLScalarFieldEnum | PostLogoutRedirectURLScalarFieldEnum[]
  }

  /**
   * PostLogoutRedirectURL findFirstOrThrow
   */
  export type PostLogoutRedirectURLFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLogoutRedirectURL
     */
    select?: PostLogoutRedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostLogoutRedirectURL
     */
    omit?: PostLogoutRedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLogoutRedirectURLInclude<ExtArgs> | null
    /**
     * Filter, which PostLogoutRedirectURL to fetch.
     */
    where?: PostLogoutRedirectURLWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostLogoutRedirectURLS to fetch.
     */
    orderBy?: PostLogoutRedirectURLOrderByWithRelationInput | PostLogoutRedirectURLOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostLogoutRedirectURLS.
     */
    cursor?: PostLogoutRedirectURLWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostLogoutRedirectURLS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostLogoutRedirectURLS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostLogoutRedirectURLS.
     */
    distinct?: PostLogoutRedirectURLScalarFieldEnum | PostLogoutRedirectURLScalarFieldEnum[]
  }

  /**
   * PostLogoutRedirectURL findMany
   */
  export type PostLogoutRedirectURLFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLogoutRedirectURL
     */
    select?: PostLogoutRedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostLogoutRedirectURL
     */
    omit?: PostLogoutRedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLogoutRedirectURLInclude<ExtArgs> | null
    /**
     * Filter, which PostLogoutRedirectURLS to fetch.
     */
    where?: PostLogoutRedirectURLWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostLogoutRedirectURLS to fetch.
     */
    orderBy?: PostLogoutRedirectURLOrderByWithRelationInput | PostLogoutRedirectURLOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostLogoutRedirectURLS.
     */
    cursor?: PostLogoutRedirectURLWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostLogoutRedirectURLS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostLogoutRedirectURLS.
     */
    skip?: number
    distinct?: PostLogoutRedirectURLScalarFieldEnum | PostLogoutRedirectURLScalarFieldEnum[]
  }

  /**
   * PostLogoutRedirectURL create
   */
  export type PostLogoutRedirectURLCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLogoutRedirectURL
     */
    select?: PostLogoutRedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostLogoutRedirectURL
     */
    omit?: PostLogoutRedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLogoutRedirectURLInclude<ExtArgs> | null
    /**
     * The data needed to create a PostLogoutRedirectURL.
     */
    data: XOR<PostLogoutRedirectURLCreateInput, PostLogoutRedirectURLUncheckedCreateInput>
  }

  /**
   * PostLogoutRedirectURL createMany
   */
  export type PostLogoutRedirectURLCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostLogoutRedirectURLS.
     */
    data: PostLogoutRedirectURLCreateManyInput | PostLogoutRedirectURLCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostLogoutRedirectURL update
   */
  export type PostLogoutRedirectURLUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLogoutRedirectURL
     */
    select?: PostLogoutRedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostLogoutRedirectURL
     */
    omit?: PostLogoutRedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLogoutRedirectURLInclude<ExtArgs> | null
    /**
     * The data needed to update a PostLogoutRedirectURL.
     */
    data: XOR<PostLogoutRedirectURLUpdateInput, PostLogoutRedirectURLUncheckedUpdateInput>
    /**
     * Choose, which PostLogoutRedirectURL to update.
     */
    where: PostLogoutRedirectURLWhereUniqueInput
  }

  /**
   * PostLogoutRedirectURL updateMany
   */
  export type PostLogoutRedirectURLUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostLogoutRedirectURLS.
     */
    data: XOR<PostLogoutRedirectURLUpdateManyMutationInput, PostLogoutRedirectURLUncheckedUpdateManyInput>
    /**
     * Filter which PostLogoutRedirectURLS to update
     */
    where?: PostLogoutRedirectURLWhereInput
    /**
     * Limit how many PostLogoutRedirectURLS to update.
     */
    limit?: number
  }

  /**
   * PostLogoutRedirectURL upsert
   */
  export type PostLogoutRedirectURLUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLogoutRedirectURL
     */
    select?: PostLogoutRedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostLogoutRedirectURL
     */
    omit?: PostLogoutRedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLogoutRedirectURLInclude<ExtArgs> | null
    /**
     * The filter to search for the PostLogoutRedirectURL to update in case it exists.
     */
    where: PostLogoutRedirectURLWhereUniqueInput
    /**
     * In case the PostLogoutRedirectURL found by the `where` argument doesn't exist, create a new PostLogoutRedirectURL with this data.
     */
    create: XOR<PostLogoutRedirectURLCreateInput, PostLogoutRedirectURLUncheckedCreateInput>
    /**
     * In case the PostLogoutRedirectURL was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostLogoutRedirectURLUpdateInput, PostLogoutRedirectURLUncheckedUpdateInput>
  }

  /**
   * PostLogoutRedirectURL delete
   */
  export type PostLogoutRedirectURLDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLogoutRedirectURL
     */
    select?: PostLogoutRedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostLogoutRedirectURL
     */
    omit?: PostLogoutRedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLogoutRedirectURLInclude<ExtArgs> | null
    /**
     * Filter which PostLogoutRedirectURL to delete.
     */
    where: PostLogoutRedirectURLWhereUniqueInput
  }

  /**
   * PostLogoutRedirectURL deleteMany
   */
  export type PostLogoutRedirectURLDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostLogoutRedirectURLS to delete
     */
    where?: PostLogoutRedirectURLWhereInput
    /**
     * Limit how many PostLogoutRedirectURLS to delete.
     */
    limit?: number
  }

  /**
   * PostLogoutRedirectURL without action
   */
  export type PostLogoutRedirectURLDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLogoutRedirectURL
     */
    select?: PostLogoutRedirectURLSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostLogoutRedirectURL
     */
    omit?: PostLogoutRedirectURLOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLogoutRedirectURLInclude<ExtArgs> | null
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
    _count?: boolean | DbConnectionCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $DbConnectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DbConnection"
    objects: {
      charts: Prisma.$ChartPayload<ExtArgs>[]
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
    _count?: boolean | DashboardCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $DashboardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Dashboard"
    objects: {
      dashboardCharts: Prisma.$DashboardChartPayload<ExtArgs>[]
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
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phoneNumber: string | null
    username: string | null
    ndiIdentifier: string | null
    password: string | null
    role: $Enums.Role | null
    isVerified: boolean | null
    isActive: boolean | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    phoneNumber: string | null
    username: string | null
    ndiIdentifier: string | null
    password: string | null
    role: $Enums.Role | null
    isVerified: boolean | null
    isActive: boolean | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    phoneNumber: number
    username: number
    ndiIdentifier: number
    password: number
    role: number
    isVerified: number
    isActive: number
    createdBy: number
    createdAt: number
    createdIp: number
    updatedBy: number
    updatedAt: number
    updatedIp: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phoneNumber?: true
    username?: true
    ndiIdentifier?: true
    password?: true
    role?: true
    isVerified?: true
    isActive?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phoneNumber?: true
    username?: true
    ndiIdentifier?: true
    password?: true
    role?: true
    isVerified?: true
    isActive?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    phoneNumber?: true
    username?: true
    ndiIdentifier?: true
    password?: true
    role?: true
    isVerified?: true
    isActive?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    firstName: string
    lastName: string | null
    email: string
    phoneNumber: string | null
    username: string
    ndiIdentifier: string | null
    password: string | null
    role: $Enums.Role
    isVerified: boolean
    isActive: boolean
    createdBy: string | null
    createdAt: Date
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phoneNumber?: boolean
    username?: boolean
    ndiIdentifier?: boolean
    password?: boolean
    role?: boolean
    isVerified?: boolean
    isActive?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    passwordResetTokens?: boolean | User$passwordResetTokensArgs<ExtArgs>
    authorizationCodes?: boolean | User$authorizationCodesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    phoneNumber?: boolean
    username?: boolean
    ndiIdentifier?: boolean
    password?: boolean
    role?: boolean
    isVerified?: boolean
    isActive?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "phoneNumber" | "username" | "ndiIdentifier" | "password" | "role" | "isVerified" | "isActive" | "createdBy" | "createdAt" | "createdIp" | "updatedBy" | "updatedAt" | "updatedIp", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    passwordResetTokens?: boolean | User$passwordResetTokensArgs<ExtArgs>
    authorizationCodes?: boolean | User$authorizationCodesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      passwordResetTokens: Prisma.$PasswordResetTokenPayload<ExtArgs>[]
      authorizationCodes: Prisma.$AuthorizationCodePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string | null
      email: string
      phoneNumber: string | null
      username: string
      ndiIdentifier: string | null
      password: string | null
      role: $Enums.Role
      isVerified: boolean
      isActive: boolean
      createdBy: string | null
      createdAt: Date
      createdIp: string | null
      updatedBy: string | null
      updatedAt: Date | null
      updatedIp: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    refreshTokens<T extends User$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    passwordResetTokens<T extends User$passwordResetTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$passwordResetTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    authorizationCodes<T extends User$authorizationCodesArgs<ExtArgs> = {}>(args?: Subset<T, User$authorizationCodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthorizationCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly ndiIdentifier: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly isVerified: FieldRef<"User", 'Boolean'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdBy: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly createdIp: FieldRef<"User", 'String'>
    readonly updatedBy: FieldRef<"User", 'String'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly updatedIp: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.refreshTokens
   */
  export type User$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * User.passwordResetTokens
   */
  export type User$passwordResetTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    cursor?: PasswordResetTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * User.authorizationCodes
   */
  export type User$authorizationCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthorizationCode
     */
    select?: AuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthorizationCode
     */
    omit?: AuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthorizationCodeInclude<ExtArgs> | null
    where?: AuthorizationCodeWhereInput
    orderBy?: AuthorizationCodeOrderByWithRelationInput | AuthorizationCodeOrderByWithRelationInput[]
    cursor?: AuthorizationCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuthorizationCodeScalarFieldEnum | AuthorizationCodeScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model PasswordResetToken
   */

  export type AggregatePasswordResetToken = {
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  export type PasswordResetTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    expiresAt: Date | null
    isUsed: boolean | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type PasswordResetTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    expiresAt: Date | null
    isUsed: boolean | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type PasswordResetTokenCountAggregateOutputType = {
    id: number
    token: number
    userId: number
    expiresAt: number
    isUsed: number
    createdBy: number
    createdAt: number
    createdIp: number
    updatedBy: number
    updatedAt: number
    updatedIp: number
    _all: number
  }


  export type PasswordResetTokenMinAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    isUsed?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type PasswordResetTokenMaxAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    isUsed?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type PasswordResetTokenCountAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    isUsed?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
    _all?: true
  }

  export type PasswordResetTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetToken to aggregate.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResetTokens
    **/
    _count?: true | PasswordResetTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type GetPasswordResetTokenAggregateType<T extends PasswordResetTokenAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordResetToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordResetToken[P]>
      : GetScalarType<T[P], AggregatePasswordResetToken[P]>
  }




  export type PasswordResetTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithAggregationInput | PasswordResetTokenOrderByWithAggregationInput[]
    by: PasswordResetTokenScalarFieldEnum[] | PasswordResetTokenScalarFieldEnum
    having?: PasswordResetTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetTokenCountAggregateInputType | true
    _min?: PasswordResetTokenMinAggregateInputType
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type PasswordResetTokenGroupByOutputType = {
    id: string
    token: string
    userId: string
    expiresAt: Date
    isUsed: boolean
    createdBy: string | null
    createdAt: Date
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  type GetPasswordResetTokenGroupByPayload<T extends PasswordResetTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    isUsed?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>



  export type PasswordResetTokenSelectScalar = {
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    isUsed?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
  }

  export type PasswordResetTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "userId" | "expiresAt" | "isUsed" | "createdBy" | "createdAt" | "createdIp" | "updatedBy" | "updatedAt" | "updatedIp", ExtArgs["result"]["passwordResetToken"]>
  export type PasswordResetTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PasswordResetTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordResetToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      userId: string
      expiresAt: Date
      isUsed: boolean
      createdBy: string | null
      createdAt: Date
      createdIp: string | null
      updatedBy: string | null
      updatedAt: Date | null
      updatedIp: string | null
    }, ExtArgs["result"]["passwordResetToken"]>
    composites: {}
  }

  type PasswordResetTokenGetPayload<S extends boolean | null | undefined | PasswordResetTokenDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetTokenPayload, S>

  type PasswordResetTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetTokenCountAggregateInputType | true
    }

  export interface PasswordResetTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordResetToken'], meta: { name: 'PasswordResetToken' } }
    /**
     * Find zero or one PasswordResetToken that matches the filter.
     * @param {PasswordResetTokenFindUniqueArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetTokenFindUniqueArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordResetToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetTokenFindUniqueOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetTokenFindFirstArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResetTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany()
     * 
     * // Get first 10 PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetTokenFindManyArgs>(args?: SelectSubset<T, PasswordResetTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordResetToken.
     * @param {PasswordResetTokenCreateArgs} args - Arguments to create a PasswordResetToken.
     * @example
     * // Create one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.create({
     *   data: {
     *     // ... data to create a PasswordResetToken
     *   }
     * })
     * 
     */
    create<T extends PasswordResetTokenCreateArgs>(args: SelectSubset<T, PasswordResetTokenCreateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResetTokens.
     * @param {PasswordResetTokenCreateManyArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetTokenCreateManyArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PasswordResetToken.
     * @param {PasswordResetTokenDeleteArgs} args - Arguments to delete one PasswordResetToken.
     * @example
     * // Delete one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.delete({
     *   where: {
     *     // ... filter to delete one PasswordResetToken
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetTokenDeleteArgs>(args: SelectSubset<T, PasswordResetTokenDeleteArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordResetToken.
     * @param {PasswordResetTokenUpdateArgs} args - Arguments to update one PasswordResetToken.
     * @example
     * // Update one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetTokenUpdateArgs>(args: SelectSubset<T, PasswordResetTokenUpdateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResetTokens.
     * @param {PasswordResetTokenDeleteManyArgs} args - Arguments to filter PasswordResetTokens to delete.
     * @example
     * // Delete a few PasswordResetTokens
     * const { count } = await prisma.passwordResetToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetTokenDeleteManyArgs>(args?: SelectSubset<T, PasswordResetTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetTokenUpdateManyArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PasswordResetToken.
     * @param {PasswordResetTokenUpsertArgs} args - Arguments to update or create a PasswordResetToken.
     * @example
     * // Update or create a PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.upsert({
     *   create: {
     *     // ... data to create a PasswordResetToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordResetToken we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetTokenUpsertArgs>(args: SelectSubset<T, PasswordResetTokenUpsertArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenCountArgs} args - Arguments to filter PasswordResetTokens to count.
     * @example
     * // Count the number of PasswordResetTokens
     * const count = await prisma.passwordResetToken.count({
     *   where: {
     *     // ... the filter for the PasswordResetTokens we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetTokenCountArgs>(
      args?: Subset<T, PasswordResetTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PasswordResetTokenAggregateArgs>(args: Subset<T, PasswordResetTokenAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetTokenAggregateType<T>>

    /**
     * Group by PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenGroupByArgs} args - Group by arguments.
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
      T extends PasswordResetTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetTokenGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PasswordResetTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordResetToken model
   */
  readonly fields: PasswordResetTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordResetToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PasswordResetToken model
   */
  interface PasswordResetTokenFieldRefs {
    readonly id: FieldRef<"PasswordResetToken", 'String'>
    readonly token: FieldRef<"PasswordResetToken", 'String'>
    readonly userId: FieldRef<"PasswordResetToken", 'String'>
    readonly expiresAt: FieldRef<"PasswordResetToken", 'DateTime'>
    readonly isUsed: FieldRef<"PasswordResetToken", 'Boolean'>
    readonly createdBy: FieldRef<"PasswordResetToken", 'String'>
    readonly createdAt: FieldRef<"PasswordResetToken", 'DateTime'>
    readonly createdIp: FieldRef<"PasswordResetToken", 'String'>
    readonly updatedBy: FieldRef<"PasswordResetToken", 'String'>
    readonly updatedAt: FieldRef<"PasswordResetToken", 'DateTime'>
    readonly updatedIp: FieldRef<"PasswordResetToken", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PasswordResetToken findUnique
   */
  export type PasswordResetTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findUniqueOrThrow
   */
  export type PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findFirst
   */
  export type PasswordResetTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findFirstOrThrow
   */
  export type PasswordResetTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findMany
   */
  export type PasswordResetTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetTokens to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken create
   */
  export type PasswordResetTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
  }

  /**
   * PasswordResetToken createMany
   */
  export type PasswordResetTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordResetToken update
   */
  export type PasswordResetTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
    /**
     * Choose, which PasswordResetToken to update.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken updateMany
   */
  export type PasswordResetTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
  }

  /**
   * PasswordResetToken upsert
   */
  export type PasswordResetTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordResetToken to update in case it exists.
     */
    where: PasswordResetTokenWhereUniqueInput
    /**
     * In case the PasswordResetToken found by the `where` argument doesn't exist, create a new PasswordResetToken with this data.
     */
    create: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
    /**
     * In case the PasswordResetToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
  }

  /**
   * PasswordResetToken delete
   */
  export type PasswordResetTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter which PasswordResetToken to delete.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken deleteMany
   */
  export type PasswordResetTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetTokens to delete
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to delete.
     */
    limit?: number
  }

  /**
   * PasswordResetToken without action
   */
  export type PasswordResetTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    clientId: string | null
    expiresAt: Date | null
    revoked: boolean | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    clientId: string | null
    expiresAt: Date | null
    revoked: boolean | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    token: number
    userId: number
    clientId: number
    expiresAt: number
    revoked: number
    createdBy: number
    createdAt: number
    createdIp: number
    updatedBy: number
    updatedAt: number
    updatedIp: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    clientId?: true
    expiresAt?: true
    revoked?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    clientId?: true
    expiresAt?: true
    revoked?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    clientId?: true
    expiresAt?: true
    revoked?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    token: string
    userId: string
    clientId: string
    expiresAt: Date
    revoked: boolean
    createdBy: string | null
    createdAt: Date
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    clientId?: boolean
    expiresAt?: boolean
    revoked?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>



  export type RefreshTokenSelectScalar = {
    id?: boolean
    token?: boolean
    userId?: boolean
    clientId?: boolean
    expiresAt?: boolean
    revoked?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "userId" | "clientId" | "expiresAt" | "revoked" | "createdBy" | "createdAt" | "createdIp" | "updatedBy" | "updatedAt" | "updatedIp", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      client: Prisma.$ClientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      userId: string
      clientId: string
      expiresAt: Date
      revoked: boolean
      createdBy: string | null
      createdAt: Date
      createdIp: string | null
      updatedBy: string | null
      updatedAt: Date | null
      updatedIp: string | null
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
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
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly token: FieldRef<"RefreshToken", 'String'>
    readonly userId: FieldRef<"RefreshToken", 'String'>
    readonly clientId: FieldRef<"RefreshToken", 'String'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly revoked: FieldRef<"RefreshToken", 'Boolean'>
    readonly createdBy: FieldRef<"RefreshToken", 'String'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly createdIp: FieldRef<"RefreshToken", 'String'>
    readonly updatedBy: FieldRef<"RefreshToken", 'String'>
    readonly updatedAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly updatedIp: FieldRef<"RefreshToken", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model WebhookLog
   */

  export type AggregateWebhookLog = {
    _count: WebhookLogCountAggregateOutputType | null
    _min: WebhookLogMinAggregateOutputType | null
    _max: WebhookLogMaxAggregateOutputType | null
  }

  export type WebhookLogMinAggregateOutputType = {
    id: string | null
    proofRequestId: string | null
    payload: string | null
    processedAt: Date | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type WebhookLogMaxAggregateOutputType = {
    id: string | null
    proofRequestId: string | null
    payload: string | null
    processedAt: Date | null
    createdBy: string | null
    createdAt: Date | null
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
  }

  export type WebhookLogCountAggregateOutputType = {
    id: number
    proofRequestId: number
    payload: number
    processedAt: number
    createdBy: number
    createdAt: number
    createdIp: number
    updatedBy: number
    updatedAt: number
    updatedIp: number
    _all: number
  }


  export type WebhookLogMinAggregateInputType = {
    id?: true
    proofRequestId?: true
    payload?: true
    processedAt?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type WebhookLogMaxAggregateInputType = {
    id?: true
    proofRequestId?: true
    payload?: true
    processedAt?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
  }

  export type WebhookLogCountAggregateInputType = {
    id?: true
    proofRequestId?: true
    payload?: true
    processedAt?: true
    createdBy?: true
    createdAt?: true
    createdIp?: true
    updatedBy?: true
    updatedAt?: true
    updatedIp?: true
    _all?: true
  }

  export type WebhookLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookLog to aggregate.
     */
    where?: WebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookLogs to fetch.
     */
    orderBy?: WebhookLogOrderByWithRelationInput | WebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebhookLogs
    **/
    _count?: true | WebhookLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebhookLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebhookLogMaxAggregateInputType
  }

  export type GetWebhookLogAggregateType<T extends WebhookLogAggregateArgs> = {
        [P in keyof T & keyof AggregateWebhookLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhookLog[P]>
      : GetScalarType<T[P], AggregateWebhookLog[P]>
  }




  export type WebhookLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookLogWhereInput
    orderBy?: WebhookLogOrderByWithAggregationInput | WebhookLogOrderByWithAggregationInput[]
    by: WebhookLogScalarFieldEnum[] | WebhookLogScalarFieldEnum
    having?: WebhookLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebhookLogCountAggregateInputType | true
    _min?: WebhookLogMinAggregateInputType
    _max?: WebhookLogMaxAggregateInputType
  }

  export type WebhookLogGroupByOutputType = {
    id: string
    proofRequestId: string
    payload: string
    processedAt: Date
    createdBy: string | null
    createdAt: Date
    createdIp: string | null
    updatedBy: string | null
    updatedAt: Date | null
    updatedIp: string | null
    _count: WebhookLogCountAggregateOutputType | null
    _min: WebhookLogMinAggregateOutputType | null
    _max: WebhookLogMaxAggregateOutputType | null
  }

  type GetWebhookLogGroupByPayload<T extends WebhookLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebhookLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebhookLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebhookLogGroupByOutputType[P]>
            : GetScalarType<T[P], WebhookLogGroupByOutputType[P]>
        }
      >
    >


  export type WebhookLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    proofRequestId?: boolean
    payload?: boolean
    processedAt?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
  }, ExtArgs["result"]["webhookLog"]>



  export type WebhookLogSelectScalar = {
    id?: boolean
    proofRequestId?: boolean
    payload?: boolean
    processedAt?: boolean
    createdBy?: boolean
    createdAt?: boolean
    createdIp?: boolean
    updatedBy?: boolean
    updatedAt?: boolean
    updatedIp?: boolean
  }

  export type WebhookLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "proofRequestId" | "payload" | "processedAt" | "createdBy" | "createdAt" | "createdIp" | "updatedBy" | "updatedAt" | "updatedIp", ExtArgs["result"]["webhookLog"]>

  export type $WebhookLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebhookLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      proofRequestId: string
      payload: string
      processedAt: Date
      createdBy: string | null
      createdAt: Date
      createdIp: string | null
      updatedBy: string | null
      updatedAt: Date | null
      updatedIp: string | null
    }, ExtArgs["result"]["webhookLog"]>
    composites: {}
  }

  type WebhookLogGetPayload<S extends boolean | null | undefined | WebhookLogDefaultArgs> = $Result.GetResult<Prisma.$WebhookLogPayload, S>

  type WebhookLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebhookLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebhookLogCountAggregateInputType | true
    }

  export interface WebhookLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebhookLog'], meta: { name: 'WebhookLog' } }
    /**
     * Find zero or one WebhookLog that matches the filter.
     * @param {WebhookLogFindUniqueArgs} args - Arguments to find a WebhookLog
     * @example
     * // Get one WebhookLog
     * const webhookLog = await prisma.webhookLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookLogFindUniqueArgs>(args: SelectSubset<T, WebhookLogFindUniqueArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WebhookLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebhookLogFindUniqueOrThrowArgs} args - Arguments to find a WebhookLog
     * @example
     * // Get one WebhookLog
     * const webhookLog = await prisma.webhookLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookLogFindUniqueOrThrowArgs>(args: SelectSubset<T, WebhookLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogFindFirstArgs} args - Arguments to find a WebhookLog
     * @example
     * // Get one WebhookLog
     * const webhookLog = await prisma.webhookLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookLogFindFirstArgs>(args?: SelectSubset<T, WebhookLogFindFirstArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogFindFirstOrThrowArgs} args - Arguments to find a WebhookLog
     * @example
     * // Get one WebhookLog
     * const webhookLog = await prisma.webhookLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookLogFindFirstOrThrowArgs>(args?: SelectSubset<T, WebhookLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WebhookLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebhookLogs
     * const webhookLogs = await prisma.webhookLog.findMany()
     * 
     * // Get first 10 WebhookLogs
     * const webhookLogs = await prisma.webhookLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webhookLogWithIdOnly = await prisma.webhookLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebhookLogFindManyArgs>(args?: SelectSubset<T, WebhookLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WebhookLog.
     * @param {WebhookLogCreateArgs} args - Arguments to create a WebhookLog.
     * @example
     * // Create one WebhookLog
     * const WebhookLog = await prisma.webhookLog.create({
     *   data: {
     *     // ... data to create a WebhookLog
     *   }
     * })
     * 
     */
    create<T extends WebhookLogCreateArgs>(args: SelectSubset<T, WebhookLogCreateArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WebhookLogs.
     * @param {WebhookLogCreateManyArgs} args - Arguments to create many WebhookLogs.
     * @example
     * // Create many WebhookLogs
     * const webhookLog = await prisma.webhookLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebhookLogCreateManyArgs>(args?: SelectSubset<T, WebhookLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a WebhookLog.
     * @param {WebhookLogDeleteArgs} args - Arguments to delete one WebhookLog.
     * @example
     * // Delete one WebhookLog
     * const WebhookLog = await prisma.webhookLog.delete({
     *   where: {
     *     // ... filter to delete one WebhookLog
     *   }
     * })
     * 
     */
    delete<T extends WebhookLogDeleteArgs>(args: SelectSubset<T, WebhookLogDeleteArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WebhookLog.
     * @param {WebhookLogUpdateArgs} args - Arguments to update one WebhookLog.
     * @example
     * // Update one WebhookLog
     * const webhookLog = await prisma.webhookLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebhookLogUpdateArgs>(args: SelectSubset<T, WebhookLogUpdateArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WebhookLogs.
     * @param {WebhookLogDeleteManyArgs} args - Arguments to filter WebhookLogs to delete.
     * @example
     * // Delete a few WebhookLogs
     * const { count } = await prisma.webhookLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebhookLogDeleteManyArgs>(args?: SelectSubset<T, WebhookLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebhookLogs
     * const webhookLog = await prisma.webhookLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebhookLogUpdateManyArgs>(args: SelectSubset<T, WebhookLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WebhookLog.
     * @param {WebhookLogUpsertArgs} args - Arguments to update or create a WebhookLog.
     * @example
     * // Update or create a WebhookLog
     * const webhookLog = await prisma.webhookLog.upsert({
     *   create: {
     *     // ... data to create a WebhookLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebhookLog we want to update
     *   }
     * })
     */
    upsert<T extends WebhookLogUpsertArgs>(args: SelectSubset<T, WebhookLogUpsertArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WebhookLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogCountArgs} args - Arguments to filter WebhookLogs to count.
     * @example
     * // Count the number of WebhookLogs
     * const count = await prisma.webhookLog.count({
     *   where: {
     *     // ... the filter for the WebhookLogs we want to count
     *   }
     * })
    **/
    count<T extends WebhookLogCountArgs>(
      args?: Subset<T, WebhookLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebhookLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WebhookLogAggregateArgs>(args: Subset<T, WebhookLogAggregateArgs>): Prisma.PrismaPromise<GetWebhookLogAggregateType<T>>

    /**
     * Group by WebhookLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogGroupByArgs} args - Group by arguments.
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
      T extends WebhookLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebhookLogGroupByArgs['orderBy'] }
        : { orderBy?: WebhookLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WebhookLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebhookLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebhookLog model
   */
  readonly fields: WebhookLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebhookLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the WebhookLog model
   */
  interface WebhookLogFieldRefs {
    readonly id: FieldRef<"WebhookLog", 'String'>
    readonly proofRequestId: FieldRef<"WebhookLog", 'String'>
    readonly payload: FieldRef<"WebhookLog", 'String'>
    readonly processedAt: FieldRef<"WebhookLog", 'DateTime'>
    readonly createdBy: FieldRef<"WebhookLog", 'String'>
    readonly createdAt: FieldRef<"WebhookLog", 'DateTime'>
    readonly createdIp: FieldRef<"WebhookLog", 'String'>
    readonly updatedBy: FieldRef<"WebhookLog", 'String'>
    readonly updatedAt: FieldRef<"WebhookLog", 'DateTime'>
    readonly updatedIp: FieldRef<"WebhookLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WebhookLog findUnique
   */
  export type WebhookLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Filter, which WebhookLog to fetch.
     */
    where: WebhookLogWhereUniqueInput
  }

  /**
   * WebhookLog findUniqueOrThrow
   */
  export type WebhookLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Filter, which WebhookLog to fetch.
     */
    where: WebhookLogWhereUniqueInput
  }

  /**
   * WebhookLog findFirst
   */
  export type WebhookLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Filter, which WebhookLog to fetch.
     */
    where?: WebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookLogs to fetch.
     */
    orderBy?: WebhookLogOrderByWithRelationInput | WebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookLogs.
     */
    cursor?: WebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookLogs.
     */
    distinct?: WebhookLogScalarFieldEnum | WebhookLogScalarFieldEnum[]
  }

  /**
   * WebhookLog findFirstOrThrow
   */
  export type WebhookLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Filter, which WebhookLog to fetch.
     */
    where?: WebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookLogs to fetch.
     */
    orderBy?: WebhookLogOrderByWithRelationInput | WebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookLogs.
     */
    cursor?: WebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookLogs.
     */
    distinct?: WebhookLogScalarFieldEnum | WebhookLogScalarFieldEnum[]
  }

  /**
   * WebhookLog findMany
   */
  export type WebhookLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Filter, which WebhookLogs to fetch.
     */
    where?: WebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookLogs to fetch.
     */
    orderBy?: WebhookLogOrderByWithRelationInput | WebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebhookLogs.
     */
    cursor?: WebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookLogs.
     */
    skip?: number
    distinct?: WebhookLogScalarFieldEnum | WebhookLogScalarFieldEnum[]
  }

  /**
   * WebhookLog create
   */
  export type WebhookLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * The data needed to create a WebhookLog.
     */
    data: XOR<WebhookLogCreateInput, WebhookLogUncheckedCreateInput>
  }

  /**
   * WebhookLog createMany
   */
  export type WebhookLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebhookLogs.
     */
    data: WebhookLogCreateManyInput | WebhookLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebhookLog update
   */
  export type WebhookLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * The data needed to update a WebhookLog.
     */
    data: XOR<WebhookLogUpdateInput, WebhookLogUncheckedUpdateInput>
    /**
     * Choose, which WebhookLog to update.
     */
    where: WebhookLogWhereUniqueInput
  }

  /**
   * WebhookLog updateMany
   */
  export type WebhookLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebhookLogs.
     */
    data: XOR<WebhookLogUpdateManyMutationInput, WebhookLogUncheckedUpdateManyInput>
    /**
     * Filter which WebhookLogs to update
     */
    where?: WebhookLogWhereInput
    /**
     * Limit how many WebhookLogs to update.
     */
    limit?: number
  }

  /**
   * WebhookLog upsert
   */
  export type WebhookLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * The filter to search for the WebhookLog to update in case it exists.
     */
    where: WebhookLogWhereUniqueInput
    /**
     * In case the WebhookLog found by the `where` argument doesn't exist, create a new WebhookLog with this data.
     */
    create: XOR<WebhookLogCreateInput, WebhookLogUncheckedCreateInput>
    /**
     * In case the WebhookLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookLogUpdateInput, WebhookLogUncheckedUpdateInput>
  }

  /**
   * WebhookLog delete
   */
  export type WebhookLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Filter which WebhookLog to delete.
     */
    where: WebhookLogWhereUniqueInput
  }

  /**
   * WebhookLog deleteMany
   */
  export type WebhookLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookLogs to delete
     */
    where?: WebhookLogWhereInput
    /**
     * Limit how many WebhookLogs to delete.
     */
    limit?: number
  }

  /**
   * WebhookLog without action
   */
  export type WebhookLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
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


  export const ClientScalarFieldEnum: {
    id: 'id',
    name: 'name',
    clientId: 'clientId',
    clientSecret: 'clientSecret',
    clientType: 'clientType',
    disableStrictUrlValidation: 'disableStrictUrlValidation',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt',
    updatedIp: 'updatedIp'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const AuthorizationCodeScalarFieldEnum: {
    id: 'id',
    code: 'code',
    clientId: 'clientId',
    userId: 'userId',
    redirectUri: 'redirectUri',
    codeChallenge: 'codeChallenge',
    codeChallengeMethod: 'codeChallengeMethod',
    state: 'state',
    expiresAt: 'expiresAt',
    isUsed: 'isUsed',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt',
    updatedIp: 'updatedIp'
  };

  export type AuthorizationCodeScalarFieldEnum = (typeof AuthorizationCodeScalarFieldEnum)[keyof typeof AuthorizationCodeScalarFieldEnum]


  export const RedirectURLScalarFieldEnum: {
    id: 'id',
    url: 'url',
    clientId: 'clientId',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt',
    updatedIp: 'updatedIp'
  };

  export type RedirectURLScalarFieldEnum = (typeof RedirectURLScalarFieldEnum)[keyof typeof RedirectURLScalarFieldEnum]


  export const PostLogoutRedirectURLScalarFieldEnum: {
    id: 'id',
    url: 'url',
    clientId: 'clientId',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt',
    updatedIp: 'updatedIp'
  };

  export type PostLogoutRedirectURLScalarFieldEnum = (typeof PostLogoutRedirectURLScalarFieldEnum)[keyof typeof PostLogoutRedirectURLScalarFieldEnum]


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


  export const UserScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phoneNumber: 'phoneNumber',
    username: 'username',
    ndiIdentifier: 'ndiIdentifier',
    password: 'password',
    role: 'role',
    isVerified: 'isVerified',
    isActive: 'isActive',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt',
    updatedIp: 'updatedIp'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PasswordResetTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    userId: 'userId',
    expiresAt: 'expiresAt',
    isUsed: 'isUsed',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt',
    updatedIp: 'updatedIp'
  };

  export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    userId: 'userId',
    clientId: 'clientId',
    expiresAt: 'expiresAt',
    revoked: 'revoked',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt',
    updatedIp: 'updatedIp'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const WebhookLogScalarFieldEnum: {
    id: 'id',
    proofRequestId: 'proofRequestId',
    payload: 'payload',
    processedAt: 'processedAt',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedAt: 'updatedAt',
    updatedIp: 'updatedIp'
  };

  export type WebhookLogScalarFieldEnum = (typeof WebhookLogScalarFieldEnum)[keyof typeof WebhookLogScalarFieldEnum]


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


  export const ClientOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    clientId: 'clientId',
    clientSecret: 'clientSecret',
    createdBy: 'createdBy',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedIp: 'updatedIp'
  };

  export type ClientOrderByRelevanceFieldEnum = (typeof ClientOrderByRelevanceFieldEnum)[keyof typeof ClientOrderByRelevanceFieldEnum]


  export const AuthorizationCodeOrderByRelevanceFieldEnum: {
    id: 'id',
    code: 'code',
    clientId: 'clientId',
    userId: 'userId',
    redirectUri: 'redirectUri',
    codeChallenge: 'codeChallenge',
    codeChallengeMethod: 'codeChallengeMethod',
    state: 'state',
    createdBy: 'createdBy',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedIp: 'updatedIp'
  };

  export type AuthorizationCodeOrderByRelevanceFieldEnum = (typeof AuthorizationCodeOrderByRelevanceFieldEnum)[keyof typeof AuthorizationCodeOrderByRelevanceFieldEnum]


  export const RedirectURLOrderByRelevanceFieldEnum: {
    id: 'id',
    url: 'url',
    clientId: 'clientId',
    createdBy: 'createdBy',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedIp: 'updatedIp'
  };

  export type RedirectURLOrderByRelevanceFieldEnum = (typeof RedirectURLOrderByRelevanceFieldEnum)[keyof typeof RedirectURLOrderByRelevanceFieldEnum]


  export const PostLogoutRedirectURLOrderByRelevanceFieldEnum: {
    id: 'id',
    url: 'url',
    clientId: 'clientId',
    createdBy: 'createdBy',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedIp: 'updatedIp'
  };

  export type PostLogoutRedirectURLOrderByRelevanceFieldEnum = (typeof PostLogoutRedirectURLOrderByRelevanceFieldEnum)[keyof typeof PostLogoutRedirectURLOrderByRelevanceFieldEnum]


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


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phoneNumber: 'phoneNumber',
    username: 'username',
    ndiIdentifier: 'ndiIdentifier',
    password: 'password',
    createdBy: 'createdBy',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedIp: 'updatedIp'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const PasswordResetTokenOrderByRelevanceFieldEnum: {
    id: 'id',
    token: 'token',
    userId: 'userId',
    createdBy: 'createdBy',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedIp: 'updatedIp'
  };

  export type PasswordResetTokenOrderByRelevanceFieldEnum = (typeof PasswordResetTokenOrderByRelevanceFieldEnum)[keyof typeof PasswordResetTokenOrderByRelevanceFieldEnum]


  export const RefreshTokenOrderByRelevanceFieldEnum: {
    id: 'id',
    token: 'token',
    userId: 'userId',
    clientId: 'clientId',
    createdBy: 'createdBy',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedIp: 'updatedIp'
  };

  export type RefreshTokenOrderByRelevanceFieldEnum = (typeof RefreshTokenOrderByRelevanceFieldEnum)[keyof typeof RefreshTokenOrderByRelevanceFieldEnum]


  export const WebhookLogOrderByRelevanceFieldEnum: {
    id: 'id',
    proofRequestId: 'proofRequestId',
    payload: 'payload',
    createdBy: 'createdBy',
    createdIp: 'createdIp',
    updatedBy: 'updatedBy',
    updatedIp: 'updatedIp'
  };

  export type WebhookLogOrderByRelevanceFieldEnum = (typeof WebhookLogOrderByRelevanceFieldEnum)[keyof typeof WebhookLogOrderByRelevanceFieldEnum]


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
   * Reference to a field of type 'ClientType'
   */
  export type EnumClientTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClientType'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DbType'
   */
  export type EnumDbTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DbType'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'ChartType'
   */
  export type EnumChartTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChartType'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


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

  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: StringFilter<"Client"> | string
    name?: StringFilter<"Client"> | string
    clientId?: StringFilter<"Client"> | string
    clientSecret?: StringNullableFilter<"Client"> | string | null
    clientType?: EnumClientTypeFilter<"Client"> | $Enums.ClientType
    disableStrictUrlValidation?: BoolFilter<"Client"> | boolean
    createdBy?: StringNullableFilter<"Client"> | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
    createdIp?: StringNullableFilter<"Client"> | string | null
    updatedBy?: StringNullableFilter<"Client"> | string | null
    updatedAt?: DateTimeNullableFilter<"Client"> | Date | string | null
    updatedIp?: StringNullableFilter<"Client"> | string | null
    refreshTokens?: RefreshTokenListRelationFilter
    authorizationCodes?: AuthorizationCodeListRelationFilter
    redirectUrls?: RedirectURLListRelationFilter
    postLogoutRedirectUrls?: PostLogoutRedirectURLListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    clientId?: SortOrder
    clientSecret?: SortOrderInput | SortOrder
    clientType?: SortOrder
    disableStrictUrlValidation?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
    authorizationCodes?: AuthorizationCodeOrderByRelationAggregateInput
    redirectUrls?: RedirectURLOrderByRelationAggregateInput
    postLogoutRedirectUrls?: PostLogoutRedirectURLOrderByRelationAggregateInput
    _relevance?: ClientOrderByRelevanceInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clientId?: string
    clientId_clientSecret?: ClientClientIdClientSecretCompoundUniqueInput
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    name?: StringFilter<"Client"> | string
    clientSecret?: StringNullableFilter<"Client"> | string | null
    clientType?: EnumClientTypeFilter<"Client"> | $Enums.ClientType
    disableStrictUrlValidation?: BoolFilter<"Client"> | boolean
    createdBy?: StringNullableFilter<"Client"> | string | null
    createdAt?: DateTimeFilter<"Client"> | Date | string
    createdIp?: StringNullableFilter<"Client"> | string | null
    updatedBy?: StringNullableFilter<"Client"> | string | null
    updatedAt?: DateTimeNullableFilter<"Client"> | Date | string | null
    updatedIp?: StringNullableFilter<"Client"> | string | null
    refreshTokens?: RefreshTokenListRelationFilter
    authorizationCodes?: AuthorizationCodeListRelationFilter
    redirectUrls?: RedirectURLListRelationFilter
    postLogoutRedirectUrls?: PostLogoutRedirectURLListRelationFilter
  }, "id" | "clientId" | "clientId_clientSecret">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    clientId?: SortOrder
    clientSecret?: SortOrderInput | SortOrder
    clientType?: SortOrder
    disableStrictUrlValidation?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    _count?: ClientCountOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Client"> | string
    name?: StringWithAggregatesFilter<"Client"> | string
    clientId?: StringWithAggregatesFilter<"Client"> | string
    clientSecret?: StringNullableWithAggregatesFilter<"Client"> | string | null
    clientType?: EnumClientTypeWithAggregatesFilter<"Client"> | $Enums.ClientType
    disableStrictUrlValidation?: BoolWithAggregatesFilter<"Client"> | boolean
    createdBy?: StringNullableWithAggregatesFilter<"Client"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
    createdIp?: StringNullableWithAggregatesFilter<"Client"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"Client"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Client"> | Date | string | null
    updatedIp?: StringNullableWithAggregatesFilter<"Client"> | string | null
  }

  export type AuthorizationCodeWhereInput = {
    AND?: AuthorizationCodeWhereInput | AuthorizationCodeWhereInput[]
    OR?: AuthorizationCodeWhereInput[]
    NOT?: AuthorizationCodeWhereInput | AuthorizationCodeWhereInput[]
    id?: StringFilter<"AuthorizationCode"> | string
    code?: StringFilter<"AuthorizationCode"> | string
    clientId?: StringFilter<"AuthorizationCode"> | string
    userId?: StringNullableFilter<"AuthorizationCode"> | string | null
    redirectUri?: StringFilter<"AuthorizationCode"> | string
    codeChallenge?: StringNullableFilter<"AuthorizationCode"> | string | null
    codeChallengeMethod?: StringNullableFilter<"AuthorizationCode"> | string | null
    state?: StringNullableFilter<"AuthorizationCode"> | string | null
    expiresAt?: DateTimeFilter<"AuthorizationCode"> | Date | string
    isUsed?: BoolFilter<"AuthorizationCode"> | boolean
    createdBy?: StringNullableFilter<"AuthorizationCode"> | string | null
    createdAt?: DateTimeFilter<"AuthorizationCode"> | Date | string
    createdIp?: StringNullableFilter<"AuthorizationCode"> | string | null
    updatedBy?: StringNullableFilter<"AuthorizationCode"> | string | null
    updatedAt?: DateTimeNullableFilter<"AuthorizationCode"> | Date | string | null
    updatedIp?: StringNullableFilter<"AuthorizationCode"> | string | null
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AuthorizationCodeOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    clientId?: SortOrder
    userId?: SortOrderInput | SortOrder
    redirectUri?: SortOrder
    codeChallenge?: SortOrderInput | SortOrder
    codeChallengeMethod?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    isUsed?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    client?: ClientOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    _relevance?: AuthorizationCodeOrderByRelevanceInput
  }

  export type AuthorizationCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: AuthorizationCodeWhereInput | AuthorizationCodeWhereInput[]
    OR?: AuthorizationCodeWhereInput[]
    NOT?: AuthorizationCodeWhereInput | AuthorizationCodeWhereInput[]
    clientId?: StringFilter<"AuthorizationCode"> | string
    userId?: StringNullableFilter<"AuthorizationCode"> | string | null
    redirectUri?: StringFilter<"AuthorizationCode"> | string
    codeChallenge?: StringNullableFilter<"AuthorizationCode"> | string | null
    codeChallengeMethod?: StringNullableFilter<"AuthorizationCode"> | string | null
    state?: StringNullableFilter<"AuthorizationCode"> | string | null
    expiresAt?: DateTimeFilter<"AuthorizationCode"> | Date | string
    isUsed?: BoolFilter<"AuthorizationCode"> | boolean
    createdBy?: StringNullableFilter<"AuthorizationCode"> | string | null
    createdAt?: DateTimeFilter<"AuthorizationCode"> | Date | string
    createdIp?: StringNullableFilter<"AuthorizationCode"> | string | null
    updatedBy?: StringNullableFilter<"AuthorizationCode"> | string | null
    updatedAt?: DateTimeNullableFilter<"AuthorizationCode"> | Date | string | null
    updatedIp?: StringNullableFilter<"AuthorizationCode"> | string | null
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "code">

  export type AuthorizationCodeOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    clientId?: SortOrder
    userId?: SortOrderInput | SortOrder
    redirectUri?: SortOrder
    codeChallenge?: SortOrderInput | SortOrder
    codeChallengeMethod?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    expiresAt?: SortOrder
    isUsed?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    _count?: AuthorizationCodeCountOrderByAggregateInput
    _max?: AuthorizationCodeMaxOrderByAggregateInput
    _min?: AuthorizationCodeMinOrderByAggregateInput
  }

  export type AuthorizationCodeScalarWhereWithAggregatesInput = {
    AND?: AuthorizationCodeScalarWhereWithAggregatesInput | AuthorizationCodeScalarWhereWithAggregatesInput[]
    OR?: AuthorizationCodeScalarWhereWithAggregatesInput[]
    NOT?: AuthorizationCodeScalarWhereWithAggregatesInput | AuthorizationCodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuthorizationCode"> | string
    code?: StringWithAggregatesFilter<"AuthorizationCode"> | string
    clientId?: StringWithAggregatesFilter<"AuthorizationCode"> | string
    userId?: StringNullableWithAggregatesFilter<"AuthorizationCode"> | string | null
    redirectUri?: StringWithAggregatesFilter<"AuthorizationCode"> | string
    codeChallenge?: StringNullableWithAggregatesFilter<"AuthorizationCode"> | string | null
    codeChallengeMethod?: StringNullableWithAggregatesFilter<"AuthorizationCode"> | string | null
    state?: StringNullableWithAggregatesFilter<"AuthorizationCode"> | string | null
    expiresAt?: DateTimeWithAggregatesFilter<"AuthorizationCode"> | Date | string
    isUsed?: BoolWithAggregatesFilter<"AuthorizationCode"> | boolean
    createdBy?: StringNullableWithAggregatesFilter<"AuthorizationCode"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuthorizationCode"> | Date | string
    createdIp?: StringNullableWithAggregatesFilter<"AuthorizationCode"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"AuthorizationCode"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"AuthorizationCode"> | Date | string | null
    updatedIp?: StringNullableWithAggregatesFilter<"AuthorizationCode"> | string | null
  }

  export type RedirectURLWhereInput = {
    AND?: RedirectURLWhereInput | RedirectURLWhereInput[]
    OR?: RedirectURLWhereInput[]
    NOT?: RedirectURLWhereInput | RedirectURLWhereInput[]
    id?: StringFilter<"RedirectURL"> | string
    url?: StringFilter<"RedirectURL"> | string
    clientId?: StringFilter<"RedirectURL"> | string
    createdBy?: StringNullableFilter<"RedirectURL"> | string | null
    createdAt?: DateTimeFilter<"RedirectURL"> | Date | string
    createdIp?: StringNullableFilter<"RedirectURL"> | string | null
    updatedBy?: StringNullableFilter<"RedirectURL"> | string | null
    updatedAt?: DateTimeNullableFilter<"RedirectURL"> | Date | string | null
    updatedIp?: StringNullableFilter<"RedirectURL"> | string | null
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
  }

  export type RedirectURLOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    clientId?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    client?: ClientOrderByWithRelationInput
    _relevance?: RedirectURLOrderByRelevanceInput
  }

  export type RedirectURLWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RedirectURLWhereInput | RedirectURLWhereInput[]
    OR?: RedirectURLWhereInput[]
    NOT?: RedirectURLWhereInput | RedirectURLWhereInput[]
    url?: StringFilter<"RedirectURL"> | string
    clientId?: StringFilter<"RedirectURL"> | string
    createdBy?: StringNullableFilter<"RedirectURL"> | string | null
    createdAt?: DateTimeFilter<"RedirectURL"> | Date | string
    createdIp?: StringNullableFilter<"RedirectURL"> | string | null
    updatedBy?: StringNullableFilter<"RedirectURL"> | string | null
    updatedAt?: DateTimeNullableFilter<"RedirectURL"> | Date | string | null
    updatedIp?: StringNullableFilter<"RedirectURL"> | string | null
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
  }, "id">

  export type RedirectURLOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    clientId?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    _count?: RedirectURLCountOrderByAggregateInput
    _max?: RedirectURLMaxOrderByAggregateInput
    _min?: RedirectURLMinOrderByAggregateInput
  }

  export type RedirectURLScalarWhereWithAggregatesInput = {
    AND?: RedirectURLScalarWhereWithAggregatesInput | RedirectURLScalarWhereWithAggregatesInput[]
    OR?: RedirectURLScalarWhereWithAggregatesInput[]
    NOT?: RedirectURLScalarWhereWithAggregatesInput | RedirectURLScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RedirectURL"> | string
    url?: StringWithAggregatesFilter<"RedirectURL"> | string
    clientId?: StringWithAggregatesFilter<"RedirectURL"> | string
    createdBy?: StringNullableWithAggregatesFilter<"RedirectURL"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RedirectURL"> | Date | string
    createdIp?: StringNullableWithAggregatesFilter<"RedirectURL"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"RedirectURL"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"RedirectURL"> | Date | string | null
    updatedIp?: StringNullableWithAggregatesFilter<"RedirectURL"> | string | null
  }

  export type PostLogoutRedirectURLWhereInput = {
    AND?: PostLogoutRedirectURLWhereInput | PostLogoutRedirectURLWhereInput[]
    OR?: PostLogoutRedirectURLWhereInput[]
    NOT?: PostLogoutRedirectURLWhereInput | PostLogoutRedirectURLWhereInput[]
    id?: StringFilter<"PostLogoutRedirectURL"> | string
    url?: StringFilter<"PostLogoutRedirectURL"> | string
    clientId?: StringFilter<"PostLogoutRedirectURL"> | string
    createdBy?: StringNullableFilter<"PostLogoutRedirectURL"> | string | null
    createdAt?: DateTimeFilter<"PostLogoutRedirectURL"> | Date | string
    createdIp?: StringNullableFilter<"PostLogoutRedirectURL"> | string | null
    updatedBy?: StringNullableFilter<"PostLogoutRedirectURL"> | string | null
    updatedAt?: DateTimeNullableFilter<"PostLogoutRedirectURL"> | Date | string | null
    updatedIp?: StringNullableFilter<"PostLogoutRedirectURL"> | string | null
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
  }

  export type PostLogoutRedirectURLOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    clientId?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    client?: ClientOrderByWithRelationInput
    _relevance?: PostLogoutRedirectURLOrderByRelevanceInput
  }

  export type PostLogoutRedirectURLWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PostLogoutRedirectURLWhereInput | PostLogoutRedirectURLWhereInput[]
    OR?: PostLogoutRedirectURLWhereInput[]
    NOT?: PostLogoutRedirectURLWhereInput | PostLogoutRedirectURLWhereInput[]
    url?: StringFilter<"PostLogoutRedirectURL"> | string
    clientId?: StringFilter<"PostLogoutRedirectURL"> | string
    createdBy?: StringNullableFilter<"PostLogoutRedirectURL"> | string | null
    createdAt?: DateTimeFilter<"PostLogoutRedirectURL"> | Date | string
    createdIp?: StringNullableFilter<"PostLogoutRedirectURL"> | string | null
    updatedBy?: StringNullableFilter<"PostLogoutRedirectURL"> | string | null
    updatedAt?: DateTimeNullableFilter<"PostLogoutRedirectURL"> | Date | string | null
    updatedIp?: StringNullableFilter<"PostLogoutRedirectURL"> | string | null
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
  }, "id">

  export type PostLogoutRedirectURLOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    clientId?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    _count?: PostLogoutRedirectURLCountOrderByAggregateInput
    _max?: PostLogoutRedirectURLMaxOrderByAggregateInput
    _min?: PostLogoutRedirectURLMinOrderByAggregateInput
  }

  export type PostLogoutRedirectURLScalarWhereWithAggregatesInput = {
    AND?: PostLogoutRedirectURLScalarWhereWithAggregatesInput | PostLogoutRedirectURLScalarWhereWithAggregatesInput[]
    OR?: PostLogoutRedirectURLScalarWhereWithAggregatesInput[]
    NOT?: PostLogoutRedirectURLScalarWhereWithAggregatesInput | PostLogoutRedirectURLScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PostLogoutRedirectURL"> | string
    url?: StringWithAggregatesFilter<"PostLogoutRedirectURL"> | string
    clientId?: StringWithAggregatesFilter<"PostLogoutRedirectURL"> | string
    createdBy?: StringNullableWithAggregatesFilter<"PostLogoutRedirectURL"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PostLogoutRedirectURL"> | Date | string
    createdIp?: StringNullableWithAggregatesFilter<"PostLogoutRedirectURL"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"PostLogoutRedirectURL"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"PostLogoutRedirectURL"> | Date | string | null
    updatedIp?: StringNullableWithAggregatesFilter<"PostLogoutRedirectURL"> | string | null
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

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    phoneNumber?: StringNullableFilter<"User"> | string | null
    username?: StringFilter<"User"> | string
    ndiIdentifier?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isVerified?: BoolFilter<"User"> | boolean
    isActive?: BoolFilter<"User"> | boolean
    createdBy?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    createdIp?: StringNullableFilter<"User"> | string | null
    updatedBy?: StringNullableFilter<"User"> | string | null
    updatedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    updatedIp?: StringNullableFilter<"User"> | string | null
    refreshTokens?: RefreshTokenListRelationFilter
    passwordResetTokens?: PasswordResetTokenListRelationFilter
    authorizationCodes?: AuthorizationCodeListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    username?: SortOrder
    ndiIdentifier?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
    passwordResetTokens?: PasswordResetTokenOrderByRelationAggregateInput
    authorizationCodes?: AuthorizationCodeOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    ndiIdentifier?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    lastName?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    phoneNumber?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isVerified?: BoolFilter<"User"> | boolean
    isActive?: BoolFilter<"User"> | boolean
    createdBy?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    createdIp?: StringNullableFilter<"User"> | string | null
    updatedBy?: StringNullableFilter<"User"> | string | null
    updatedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    updatedIp?: StringNullableFilter<"User"> | string | null
    refreshTokens?: RefreshTokenListRelationFilter
    passwordResetTokens?: PasswordResetTokenListRelationFilter
    authorizationCodes?: AuthorizationCodeListRelationFilter
  }, "id" | "username" | "ndiIdentifier">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrderInput | SortOrder
    email?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    username?: SortOrder
    ndiIdentifier?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    phoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    username?: StringWithAggregatesFilter<"User"> | string
    ndiIdentifier?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdBy?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    createdIp?: StringNullableWithAggregatesFilter<"User"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"User"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    updatedIp?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type PasswordResetTokenWhereInput = {
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    token?: StringFilter<"PasswordResetToken"> | string
    userId?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    isUsed?: BoolFilter<"PasswordResetToken"> | boolean
    createdBy?: StringNullableFilter<"PasswordResetToken"> | string | null
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    createdIp?: StringNullableFilter<"PasswordResetToken"> | string | null
    updatedBy?: StringNullableFilter<"PasswordResetToken"> | string | null
    updatedAt?: DateTimeNullableFilter<"PasswordResetToken"> | Date | string | null
    updatedIp?: StringNullableFilter<"PasswordResetToken"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PasswordResetTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    isUsed?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    _relevance?: PasswordResetTokenOrderByRelevanceInput
  }

  export type PasswordResetTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    token?: StringFilter<"PasswordResetToken"> | string
    userId?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    isUsed?: BoolFilter<"PasswordResetToken"> | boolean
    createdBy?: StringNullableFilter<"PasswordResetToken"> | string | null
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    createdIp?: StringNullableFilter<"PasswordResetToken"> | string | null
    updatedBy?: StringNullableFilter<"PasswordResetToken"> | string | null
    updatedAt?: DateTimeNullableFilter<"PasswordResetToken"> | Date | string | null
    updatedIp?: StringNullableFilter<"PasswordResetToken"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type PasswordResetTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    isUsed?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    _count?: PasswordResetTokenCountOrderByAggregateInput
    _max?: PasswordResetTokenMaxOrderByAggregateInput
    _min?: PasswordResetTokenMinOrderByAggregateInput
  }

  export type PasswordResetTokenScalarWhereWithAggregatesInput = {
    AND?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    OR?: PasswordResetTokenScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    token?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    userId?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
    isUsed?: BoolWithAggregatesFilter<"PasswordResetToken"> | boolean
    createdBy?: StringNullableWithAggregatesFilter<"PasswordResetToken"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
    createdIp?: StringNullableWithAggregatesFilter<"PasswordResetToken"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"PasswordResetToken"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"PasswordResetToken"> | Date | string | null
    updatedIp?: StringNullableWithAggregatesFilter<"PasswordResetToken"> | string | null
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    userId?: StringFilter<"RefreshToken"> | string
    clientId?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revoked?: BoolFilter<"RefreshToken"> | boolean
    createdBy?: StringNullableFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdIp?: StringNullableFilter<"RefreshToken"> | string | null
    updatedBy?: StringNullableFilter<"RefreshToken"> | string | null
    updatedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    updatedIp?: StringNullableFilter<"RefreshToken"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    clientId?: SortOrder
    expiresAt?: SortOrder
    revoked?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    client?: ClientOrderByWithRelationInput
    _relevance?: RefreshTokenOrderByRelevanceInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    userId?: StringFilter<"RefreshToken"> | string
    clientId?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revoked?: BoolFilter<"RefreshToken"> | boolean
    createdBy?: StringNullableFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdIp?: StringNullableFilter<"RefreshToken"> | string | null
    updatedBy?: StringNullableFilter<"RefreshToken"> | string | null
    updatedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    updatedIp?: StringNullableFilter<"RefreshToken"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
  }, "id" | "token">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    clientId?: SortOrder
    expiresAt?: SortOrder
    revoked?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefreshToken"> | string
    token?: StringWithAggregatesFilter<"RefreshToken"> | string
    userId?: StringWithAggregatesFilter<"RefreshToken"> | string
    clientId?: StringWithAggregatesFilter<"RefreshToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    revoked?: BoolWithAggregatesFilter<"RefreshToken"> | boolean
    createdBy?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    createdIp?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"RefreshToken"> | Date | string | null
    updatedIp?: StringNullableWithAggregatesFilter<"RefreshToken"> | string | null
  }

  export type WebhookLogWhereInput = {
    AND?: WebhookLogWhereInput | WebhookLogWhereInput[]
    OR?: WebhookLogWhereInput[]
    NOT?: WebhookLogWhereInput | WebhookLogWhereInput[]
    id?: StringFilter<"WebhookLog"> | string
    proofRequestId?: StringFilter<"WebhookLog"> | string
    payload?: StringFilter<"WebhookLog"> | string
    processedAt?: DateTimeFilter<"WebhookLog"> | Date | string
    createdBy?: StringNullableFilter<"WebhookLog"> | string | null
    createdAt?: DateTimeFilter<"WebhookLog"> | Date | string
    createdIp?: StringNullableFilter<"WebhookLog"> | string | null
    updatedBy?: StringNullableFilter<"WebhookLog"> | string | null
    updatedAt?: DateTimeNullableFilter<"WebhookLog"> | Date | string | null
    updatedIp?: StringNullableFilter<"WebhookLog"> | string | null
  }

  export type WebhookLogOrderByWithRelationInput = {
    id?: SortOrder
    proofRequestId?: SortOrder
    payload?: SortOrder
    processedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    _relevance?: WebhookLogOrderByRelevanceInput
  }

  export type WebhookLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    proofRequestId?: string
    AND?: WebhookLogWhereInput | WebhookLogWhereInput[]
    OR?: WebhookLogWhereInput[]
    NOT?: WebhookLogWhereInput | WebhookLogWhereInput[]
    payload?: StringFilter<"WebhookLog"> | string
    processedAt?: DateTimeFilter<"WebhookLog"> | Date | string
    createdBy?: StringNullableFilter<"WebhookLog"> | string | null
    createdAt?: DateTimeFilter<"WebhookLog"> | Date | string
    createdIp?: StringNullableFilter<"WebhookLog"> | string | null
    updatedBy?: StringNullableFilter<"WebhookLog"> | string | null
    updatedAt?: DateTimeNullableFilter<"WebhookLog"> | Date | string | null
    updatedIp?: StringNullableFilter<"WebhookLog"> | string | null
  }, "id" | "proofRequestId">

  export type WebhookLogOrderByWithAggregationInput = {
    id?: SortOrder
    proofRequestId?: SortOrder
    payload?: SortOrder
    processedAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrderInput | SortOrder
    updatedBy?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    updatedIp?: SortOrderInput | SortOrder
    _count?: WebhookLogCountOrderByAggregateInput
    _max?: WebhookLogMaxOrderByAggregateInput
    _min?: WebhookLogMinOrderByAggregateInput
  }

  export type WebhookLogScalarWhereWithAggregatesInput = {
    AND?: WebhookLogScalarWhereWithAggregatesInput | WebhookLogScalarWhereWithAggregatesInput[]
    OR?: WebhookLogScalarWhereWithAggregatesInput[]
    NOT?: WebhookLogScalarWhereWithAggregatesInput | WebhookLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebhookLog"> | string
    proofRequestId?: StringWithAggregatesFilter<"WebhookLog"> | string
    payload?: StringWithAggregatesFilter<"WebhookLog"> | string
    processedAt?: DateTimeWithAggregatesFilter<"WebhookLog"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"WebhookLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WebhookLog"> | Date | string
    createdIp?: StringNullableWithAggregatesFilter<"WebhookLog"> | string | null
    updatedBy?: StringNullableWithAggregatesFilter<"WebhookLog"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"WebhookLog"> | Date | string | null
    updatedIp?: StringNullableWithAggregatesFilter<"WebhookLog"> | string | null
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

  export type ClientCreateInput = {
    id?: string
    name: string
    clientId: string
    clientSecret?: string | null
    clientType?: $Enums.ClientType
    disableStrictUrlValidation?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutClientInput
    authorizationCodes?: AuthorizationCodeCreateNestedManyWithoutClientInput
    redirectUrls?: RedirectURLCreateNestedManyWithoutClientInput
    postLogoutRedirectUrls?: PostLogoutRedirectURLCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    id?: string
    name: string
    clientId: string
    clientSecret?: string | null
    clientType?: $Enums.ClientType
    disableStrictUrlValidation?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutClientInput
    authorizationCodes?: AuthorizationCodeUncheckedCreateNestedManyWithoutClientInput
    redirectUrls?: RedirectURLUncheckedCreateNestedManyWithoutClientInput
    postLogoutRedirectUrls?: PostLogoutRedirectURLUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: EnumClientTypeFieldUpdateOperationsInput | $Enums.ClientType
    disableStrictUrlValidation?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutClientNestedInput
    authorizationCodes?: AuthorizationCodeUpdateManyWithoutClientNestedInput
    redirectUrls?: RedirectURLUpdateManyWithoutClientNestedInput
    postLogoutRedirectUrls?: PostLogoutRedirectURLUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: EnumClientTypeFieldUpdateOperationsInput | $Enums.ClientType
    disableStrictUrlValidation?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutClientNestedInput
    authorizationCodes?: AuthorizationCodeUncheckedUpdateManyWithoutClientNestedInput
    redirectUrls?: RedirectURLUncheckedUpdateManyWithoutClientNestedInput
    postLogoutRedirectUrls?: PostLogoutRedirectURLUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyInput = {
    id?: string
    name: string
    clientId: string
    clientSecret?: string | null
    clientType?: $Enums.ClientType
    disableStrictUrlValidation?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type ClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: EnumClientTypeFieldUpdateOperationsInput | $Enums.ClientType
    disableStrictUrlValidation?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: EnumClientTypeFieldUpdateOperationsInput | $Enums.ClientType
    disableStrictUrlValidation?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorizationCodeCreateInput = {
    id?: string
    code: string
    redirectUri: string
    codeChallenge?: string | null
    codeChallengeMethod?: string | null
    state?: string | null
    expiresAt: Date | string
    isUsed?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    client: ClientCreateNestedOneWithoutAuthorizationCodesInput
    user?: UserCreateNestedOneWithoutAuthorizationCodesInput
  }

  export type AuthorizationCodeUncheckedCreateInput = {
    id?: string
    code: string
    clientId: string
    userId?: string | null
    redirectUri: string
    codeChallenge?: string | null
    codeChallengeMethod?: string | null
    state?: string | null
    expiresAt: Date | string
    isUsed?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type AuthorizationCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    redirectUri?: StringFieldUpdateOperationsInput | string
    codeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    codeChallengeMethod?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    client?: ClientUpdateOneRequiredWithoutAuthorizationCodesNestedInput
    user?: UserUpdateOneWithoutAuthorizationCodesNestedInput
  }

  export type AuthorizationCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    redirectUri?: StringFieldUpdateOperationsInput | string
    codeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    codeChallengeMethod?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorizationCodeCreateManyInput = {
    id?: string
    code: string
    clientId: string
    userId?: string | null
    redirectUri: string
    codeChallenge?: string | null
    codeChallengeMethod?: string | null
    state?: string | null
    expiresAt: Date | string
    isUsed?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type AuthorizationCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    redirectUri?: StringFieldUpdateOperationsInput | string
    codeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    codeChallengeMethod?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorizationCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    redirectUri?: StringFieldUpdateOperationsInput | string
    codeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    codeChallengeMethod?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RedirectURLCreateInput = {
    id?: string
    url: string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    client: ClientCreateNestedOneWithoutRedirectUrlsInput
  }

  export type RedirectURLUncheckedCreateInput = {
    id?: string
    url: string
    clientId: string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type RedirectURLUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    client?: ClientUpdateOneRequiredWithoutRedirectUrlsNestedInput
  }

  export type RedirectURLUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RedirectURLCreateManyInput = {
    id?: string
    url: string
    clientId: string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type RedirectURLUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RedirectURLUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PostLogoutRedirectURLCreateInput = {
    id?: string
    url: string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    client: ClientCreateNestedOneWithoutPostLogoutRedirectUrlsInput
  }

  export type PostLogoutRedirectURLUncheckedCreateInput = {
    id?: string
    url: string
    clientId: string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type PostLogoutRedirectURLUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    client?: ClientUpdateOneRequiredWithoutPostLogoutRedirectUrlsNestedInput
  }

  export type PostLogoutRedirectURLUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PostLogoutRedirectURLCreateManyInput = {
    id?: string
    url: string
    clientId: string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type PostLogoutRedirectURLUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PostLogoutRedirectURLUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type UserCreateInput = {
    id?: string
    firstName: string
    lastName?: string | null
    email: string
    phoneNumber?: string | null
    username: string
    ndiIdentifier?: string | null
    password?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    passwordResetTokens?: PasswordResetTokenCreateNestedManyWithoutUserInput
    authorizationCodes?: AuthorizationCodeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName?: string | null
    email: string
    phoneNumber?: string | null
    username: string
    ndiIdentifier?: string | null
    password?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    passwordResetTokens?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    authorizationCodes?: AuthorizationCodeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    ndiIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    passwordResetTokens?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    authorizationCodes?: AuthorizationCodeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    ndiIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    passwordResetTokens?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    authorizationCodes?: AuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    firstName: string
    lastName?: string | null
    email: string
    phoneNumber?: string | null
    username: string
    ndiIdentifier?: string | null
    password?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    ndiIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    ndiIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PasswordResetTokenCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    isUsed?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    user: UserCreateNestedOneWithoutPasswordResetTokensInput
  }

  export type PasswordResetTokenUncheckedCreateInput = {
    id?: string
    token: string
    userId: string
    expiresAt: Date | string
    isUsed?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type PasswordResetTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutPasswordResetTokensNestedInput
  }

  export type PasswordResetTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PasswordResetTokenCreateManyInput = {
    id?: string
    token: string
    userId: string
    expiresAt: Date | string
    isUsed?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type PasswordResetTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PasswordResetTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RefreshTokenCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    revoked?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    user: UserCreateNestedOneWithoutRefreshTokensInput
    client: ClientCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    token: string
    userId: string
    clientId: string
    expiresAt: Date | string
    revoked?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput
    client?: ClientUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    token: string
    userId: string
    clientId: string
    expiresAt: Date | string
    revoked?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WebhookLogCreateInput = {
    id?: string
    proofRequestId: string
    payload: string
    processedAt?: Date | string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type WebhookLogUncheckedCreateInput = {
    id?: string
    proofRequestId: string
    payload: string
    processedAt?: Date | string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type WebhookLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    proofRequestId?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WebhookLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    proofRequestId?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WebhookLogCreateManyInput = {
    id?: string
    proofRequestId: string
    payload: string
    processedAt?: Date | string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type WebhookLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    proofRequestId?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WebhookLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    proofRequestId?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EnumClientTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ClientType | EnumClientTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ClientType[]
    notIn?: $Enums.ClientType[]
    not?: NestedEnumClientTypeFilter<$PrismaModel> | $Enums.ClientType
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type AuthorizationCodeListRelationFilter = {
    every?: AuthorizationCodeWhereInput
    some?: AuthorizationCodeWhereInput
    none?: AuthorizationCodeWhereInput
  }

  export type RedirectURLListRelationFilter = {
    every?: RedirectURLWhereInput
    some?: RedirectURLWhereInput
    none?: RedirectURLWhereInput
  }

  export type PostLogoutRedirectURLListRelationFilter = {
    every?: PostLogoutRedirectURLWhereInput
    some?: PostLogoutRedirectURLWhereInput
    none?: PostLogoutRedirectURLWhereInput
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuthorizationCodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RedirectURLOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostLogoutRedirectURLOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientOrderByRelevanceInput = {
    fields: ClientOrderByRelevanceFieldEnum | ClientOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ClientClientIdClientSecretCompoundUniqueInput = {
    clientId: string
    clientSecret: string
  }

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    clientId?: SortOrder
    clientSecret?: SortOrder
    clientType?: SortOrder
    disableStrictUrlValidation?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    clientId?: SortOrder
    clientSecret?: SortOrder
    clientType?: SortOrder
    disableStrictUrlValidation?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    clientId?: SortOrder
    clientSecret?: SortOrder
    clientType?: SortOrder
    disableStrictUrlValidation?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type EnumClientTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClientType | EnumClientTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ClientType[]
    notIn?: $Enums.ClientType[]
    not?: NestedEnumClientTypeWithAggregatesFilter<$PrismaModel> | $Enums.ClientType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClientTypeFilter<$PrismaModel>
    _max?: NestedEnumClientTypeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type ClientScalarRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AuthorizationCodeOrderByRelevanceInput = {
    fields: AuthorizationCodeOrderByRelevanceFieldEnum | AuthorizationCodeOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AuthorizationCodeCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    redirectUri?: SortOrder
    codeChallenge?: SortOrder
    codeChallengeMethod?: SortOrder
    state?: SortOrder
    expiresAt?: SortOrder
    isUsed?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type AuthorizationCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    redirectUri?: SortOrder
    codeChallenge?: SortOrder
    codeChallengeMethod?: SortOrder
    state?: SortOrder
    expiresAt?: SortOrder
    isUsed?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type AuthorizationCodeMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    clientId?: SortOrder
    userId?: SortOrder
    redirectUri?: SortOrder
    codeChallenge?: SortOrder
    codeChallengeMethod?: SortOrder
    state?: SortOrder
    expiresAt?: SortOrder
    isUsed?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type RedirectURLOrderByRelevanceInput = {
    fields: RedirectURLOrderByRelevanceFieldEnum | RedirectURLOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RedirectURLCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    clientId?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type RedirectURLMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    clientId?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type RedirectURLMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    clientId?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type PostLogoutRedirectURLOrderByRelevanceInput = {
    fields: PostLogoutRedirectURLOrderByRelevanceFieldEnum | PostLogoutRedirectURLOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PostLogoutRedirectURLCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    clientId?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type PostLogoutRedirectURLMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    clientId?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type PostLogoutRedirectURLMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    clientId?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
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

  export type ChartListRelationFilter = {
    every?: ChartWhereInput
    some?: ChartWhereInput
    none?: ChartWhereInput
  }

  export type ChartOrderByRelationAggregateInput = {
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type PasswordResetTokenListRelationFilter = {
    every?: PasswordResetTokenWhereInput
    some?: PasswordResetTokenWhereInput
    none?: PasswordResetTokenWhereInput
  }

  export type PasswordResetTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    username?: SortOrder
    ndiIdentifier?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    username?: SortOrder
    ndiIdentifier?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    username?: SortOrder
    ndiIdentifier?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isVerified?: SortOrder
    isActive?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PasswordResetTokenOrderByRelevanceInput = {
    fields: PasswordResetTokenOrderByRelevanceFieldEnum | PasswordResetTokenOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PasswordResetTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    isUsed?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type PasswordResetTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    isUsed?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type PasswordResetTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    isUsed?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type RefreshTokenOrderByRelevanceInput = {
    fields: RefreshTokenOrderByRelevanceFieldEnum | RefreshTokenOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    clientId?: SortOrder
    expiresAt?: SortOrder
    revoked?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    clientId?: SortOrder
    expiresAt?: SortOrder
    revoked?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    clientId?: SortOrder
    expiresAt?: SortOrder
    revoked?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type WebhookLogOrderByRelevanceInput = {
    fields: WebhookLogOrderByRelevanceFieldEnum | WebhookLogOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type WebhookLogCountOrderByAggregateInput = {
    id?: SortOrder
    proofRequestId?: SortOrder
    payload?: SortOrder
    processedAt?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type WebhookLogMaxOrderByAggregateInput = {
    id?: SortOrder
    proofRequestId?: SortOrder
    payload?: SortOrder
    processedAt?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    createdIp?: SortOrder
    updatedBy?: SortOrder
    updatedAt?: SortOrder
    updatedIp?: SortOrder
  }

  export type WebhookLogMinOrderByAggregateInput = {
    id?: SortOrder
    proofRequestId?: SortOrder
    payload?: SortOrder
    processedAt?: SortOrder
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

  export type RefreshTokenCreateNestedManyWithoutClientInput = {
    create?: XOR<RefreshTokenCreateWithoutClientInput, RefreshTokenUncheckedCreateWithoutClientInput> | RefreshTokenCreateWithoutClientInput[] | RefreshTokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutClientInput | RefreshTokenCreateOrConnectWithoutClientInput[]
    createMany?: RefreshTokenCreateManyClientInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type AuthorizationCodeCreateNestedManyWithoutClientInput = {
    create?: XOR<AuthorizationCodeCreateWithoutClientInput, AuthorizationCodeUncheckedCreateWithoutClientInput> | AuthorizationCodeCreateWithoutClientInput[] | AuthorizationCodeUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AuthorizationCodeCreateOrConnectWithoutClientInput | AuthorizationCodeCreateOrConnectWithoutClientInput[]
    createMany?: AuthorizationCodeCreateManyClientInputEnvelope
    connect?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
  }

  export type RedirectURLCreateNestedManyWithoutClientInput = {
    create?: XOR<RedirectURLCreateWithoutClientInput, RedirectURLUncheckedCreateWithoutClientInput> | RedirectURLCreateWithoutClientInput[] | RedirectURLUncheckedCreateWithoutClientInput[]
    connectOrCreate?: RedirectURLCreateOrConnectWithoutClientInput | RedirectURLCreateOrConnectWithoutClientInput[]
    createMany?: RedirectURLCreateManyClientInputEnvelope
    connect?: RedirectURLWhereUniqueInput | RedirectURLWhereUniqueInput[]
  }

  export type PostLogoutRedirectURLCreateNestedManyWithoutClientInput = {
    create?: XOR<PostLogoutRedirectURLCreateWithoutClientInput, PostLogoutRedirectURLUncheckedCreateWithoutClientInput> | PostLogoutRedirectURLCreateWithoutClientInput[] | PostLogoutRedirectURLUncheckedCreateWithoutClientInput[]
    connectOrCreate?: PostLogoutRedirectURLCreateOrConnectWithoutClientInput | PostLogoutRedirectURLCreateOrConnectWithoutClientInput[]
    createMany?: PostLogoutRedirectURLCreateManyClientInputEnvelope
    connect?: PostLogoutRedirectURLWhereUniqueInput | PostLogoutRedirectURLWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<RefreshTokenCreateWithoutClientInput, RefreshTokenUncheckedCreateWithoutClientInput> | RefreshTokenCreateWithoutClientInput[] | RefreshTokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutClientInput | RefreshTokenCreateOrConnectWithoutClientInput[]
    createMany?: RefreshTokenCreateManyClientInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type AuthorizationCodeUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<AuthorizationCodeCreateWithoutClientInput, AuthorizationCodeUncheckedCreateWithoutClientInput> | AuthorizationCodeCreateWithoutClientInput[] | AuthorizationCodeUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AuthorizationCodeCreateOrConnectWithoutClientInput | AuthorizationCodeCreateOrConnectWithoutClientInput[]
    createMany?: AuthorizationCodeCreateManyClientInputEnvelope
    connect?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
  }

  export type RedirectURLUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<RedirectURLCreateWithoutClientInput, RedirectURLUncheckedCreateWithoutClientInput> | RedirectURLCreateWithoutClientInput[] | RedirectURLUncheckedCreateWithoutClientInput[]
    connectOrCreate?: RedirectURLCreateOrConnectWithoutClientInput | RedirectURLCreateOrConnectWithoutClientInput[]
    createMany?: RedirectURLCreateManyClientInputEnvelope
    connect?: RedirectURLWhereUniqueInput | RedirectURLWhereUniqueInput[]
  }

  export type PostLogoutRedirectURLUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<PostLogoutRedirectURLCreateWithoutClientInput, PostLogoutRedirectURLUncheckedCreateWithoutClientInput> | PostLogoutRedirectURLCreateWithoutClientInput[] | PostLogoutRedirectURLUncheckedCreateWithoutClientInput[]
    connectOrCreate?: PostLogoutRedirectURLCreateOrConnectWithoutClientInput | PostLogoutRedirectURLCreateOrConnectWithoutClientInput[]
    createMany?: PostLogoutRedirectURLCreateManyClientInputEnvelope
    connect?: PostLogoutRedirectURLWhereUniqueInput | PostLogoutRedirectURLWhereUniqueInput[]
  }

  export type EnumClientTypeFieldUpdateOperationsInput = {
    set?: $Enums.ClientType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RefreshTokenUpdateManyWithoutClientNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutClientInput, RefreshTokenUncheckedCreateWithoutClientInput> | RefreshTokenCreateWithoutClientInput[] | RefreshTokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutClientInput | RefreshTokenCreateOrConnectWithoutClientInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutClientInput | RefreshTokenUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: RefreshTokenCreateManyClientInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutClientInput | RefreshTokenUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutClientInput | RefreshTokenUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type AuthorizationCodeUpdateManyWithoutClientNestedInput = {
    create?: XOR<AuthorizationCodeCreateWithoutClientInput, AuthorizationCodeUncheckedCreateWithoutClientInput> | AuthorizationCodeCreateWithoutClientInput[] | AuthorizationCodeUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AuthorizationCodeCreateOrConnectWithoutClientInput | AuthorizationCodeCreateOrConnectWithoutClientInput[]
    upsert?: AuthorizationCodeUpsertWithWhereUniqueWithoutClientInput | AuthorizationCodeUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: AuthorizationCodeCreateManyClientInputEnvelope
    set?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
    disconnect?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
    delete?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
    connect?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
    update?: AuthorizationCodeUpdateWithWhereUniqueWithoutClientInput | AuthorizationCodeUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: AuthorizationCodeUpdateManyWithWhereWithoutClientInput | AuthorizationCodeUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: AuthorizationCodeScalarWhereInput | AuthorizationCodeScalarWhereInput[]
  }

  export type RedirectURLUpdateManyWithoutClientNestedInput = {
    create?: XOR<RedirectURLCreateWithoutClientInput, RedirectURLUncheckedCreateWithoutClientInput> | RedirectURLCreateWithoutClientInput[] | RedirectURLUncheckedCreateWithoutClientInput[]
    connectOrCreate?: RedirectURLCreateOrConnectWithoutClientInput | RedirectURLCreateOrConnectWithoutClientInput[]
    upsert?: RedirectURLUpsertWithWhereUniqueWithoutClientInput | RedirectURLUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: RedirectURLCreateManyClientInputEnvelope
    set?: RedirectURLWhereUniqueInput | RedirectURLWhereUniqueInput[]
    disconnect?: RedirectURLWhereUniqueInput | RedirectURLWhereUniqueInput[]
    delete?: RedirectURLWhereUniqueInput | RedirectURLWhereUniqueInput[]
    connect?: RedirectURLWhereUniqueInput | RedirectURLWhereUniqueInput[]
    update?: RedirectURLUpdateWithWhereUniqueWithoutClientInput | RedirectURLUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: RedirectURLUpdateManyWithWhereWithoutClientInput | RedirectURLUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: RedirectURLScalarWhereInput | RedirectURLScalarWhereInput[]
  }

  export type PostLogoutRedirectURLUpdateManyWithoutClientNestedInput = {
    create?: XOR<PostLogoutRedirectURLCreateWithoutClientInput, PostLogoutRedirectURLUncheckedCreateWithoutClientInput> | PostLogoutRedirectURLCreateWithoutClientInput[] | PostLogoutRedirectURLUncheckedCreateWithoutClientInput[]
    connectOrCreate?: PostLogoutRedirectURLCreateOrConnectWithoutClientInput | PostLogoutRedirectURLCreateOrConnectWithoutClientInput[]
    upsert?: PostLogoutRedirectURLUpsertWithWhereUniqueWithoutClientInput | PostLogoutRedirectURLUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: PostLogoutRedirectURLCreateManyClientInputEnvelope
    set?: PostLogoutRedirectURLWhereUniqueInput | PostLogoutRedirectURLWhereUniqueInput[]
    disconnect?: PostLogoutRedirectURLWhereUniqueInput | PostLogoutRedirectURLWhereUniqueInput[]
    delete?: PostLogoutRedirectURLWhereUniqueInput | PostLogoutRedirectURLWhereUniqueInput[]
    connect?: PostLogoutRedirectURLWhereUniqueInput | PostLogoutRedirectURLWhereUniqueInput[]
    update?: PostLogoutRedirectURLUpdateWithWhereUniqueWithoutClientInput | PostLogoutRedirectURLUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: PostLogoutRedirectURLUpdateManyWithWhereWithoutClientInput | PostLogoutRedirectURLUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: PostLogoutRedirectURLScalarWhereInput | PostLogoutRedirectURLScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutClientInput, RefreshTokenUncheckedCreateWithoutClientInput> | RefreshTokenCreateWithoutClientInput[] | RefreshTokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutClientInput | RefreshTokenCreateOrConnectWithoutClientInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutClientInput | RefreshTokenUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: RefreshTokenCreateManyClientInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutClientInput | RefreshTokenUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutClientInput | RefreshTokenUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type AuthorizationCodeUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<AuthorizationCodeCreateWithoutClientInput, AuthorizationCodeUncheckedCreateWithoutClientInput> | AuthorizationCodeCreateWithoutClientInput[] | AuthorizationCodeUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AuthorizationCodeCreateOrConnectWithoutClientInput | AuthorizationCodeCreateOrConnectWithoutClientInput[]
    upsert?: AuthorizationCodeUpsertWithWhereUniqueWithoutClientInput | AuthorizationCodeUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: AuthorizationCodeCreateManyClientInputEnvelope
    set?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
    disconnect?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
    delete?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
    connect?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
    update?: AuthorizationCodeUpdateWithWhereUniqueWithoutClientInput | AuthorizationCodeUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: AuthorizationCodeUpdateManyWithWhereWithoutClientInput | AuthorizationCodeUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: AuthorizationCodeScalarWhereInput | AuthorizationCodeScalarWhereInput[]
  }

  export type RedirectURLUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<RedirectURLCreateWithoutClientInput, RedirectURLUncheckedCreateWithoutClientInput> | RedirectURLCreateWithoutClientInput[] | RedirectURLUncheckedCreateWithoutClientInput[]
    connectOrCreate?: RedirectURLCreateOrConnectWithoutClientInput | RedirectURLCreateOrConnectWithoutClientInput[]
    upsert?: RedirectURLUpsertWithWhereUniqueWithoutClientInput | RedirectURLUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: RedirectURLCreateManyClientInputEnvelope
    set?: RedirectURLWhereUniqueInput | RedirectURLWhereUniqueInput[]
    disconnect?: RedirectURLWhereUniqueInput | RedirectURLWhereUniqueInput[]
    delete?: RedirectURLWhereUniqueInput | RedirectURLWhereUniqueInput[]
    connect?: RedirectURLWhereUniqueInput | RedirectURLWhereUniqueInput[]
    update?: RedirectURLUpdateWithWhereUniqueWithoutClientInput | RedirectURLUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: RedirectURLUpdateManyWithWhereWithoutClientInput | RedirectURLUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: RedirectURLScalarWhereInput | RedirectURLScalarWhereInput[]
  }

  export type PostLogoutRedirectURLUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<PostLogoutRedirectURLCreateWithoutClientInput, PostLogoutRedirectURLUncheckedCreateWithoutClientInput> | PostLogoutRedirectURLCreateWithoutClientInput[] | PostLogoutRedirectURLUncheckedCreateWithoutClientInput[]
    connectOrCreate?: PostLogoutRedirectURLCreateOrConnectWithoutClientInput | PostLogoutRedirectURLCreateOrConnectWithoutClientInput[]
    upsert?: PostLogoutRedirectURLUpsertWithWhereUniqueWithoutClientInput | PostLogoutRedirectURLUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: PostLogoutRedirectURLCreateManyClientInputEnvelope
    set?: PostLogoutRedirectURLWhereUniqueInput | PostLogoutRedirectURLWhereUniqueInput[]
    disconnect?: PostLogoutRedirectURLWhereUniqueInput | PostLogoutRedirectURLWhereUniqueInput[]
    delete?: PostLogoutRedirectURLWhereUniqueInput | PostLogoutRedirectURLWhereUniqueInput[]
    connect?: PostLogoutRedirectURLWhereUniqueInput | PostLogoutRedirectURLWhereUniqueInput[]
    update?: PostLogoutRedirectURLUpdateWithWhereUniqueWithoutClientInput | PostLogoutRedirectURLUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: PostLogoutRedirectURLUpdateManyWithWhereWithoutClientInput | PostLogoutRedirectURLUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: PostLogoutRedirectURLScalarWhereInput | PostLogoutRedirectURLScalarWhereInput[]
  }

  export type ClientCreateNestedOneWithoutAuthorizationCodesInput = {
    create?: XOR<ClientCreateWithoutAuthorizationCodesInput, ClientUncheckedCreateWithoutAuthorizationCodesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutAuthorizationCodesInput
    connect?: ClientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAuthorizationCodesInput = {
    create?: XOR<UserCreateWithoutAuthorizationCodesInput, UserUncheckedCreateWithoutAuthorizationCodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthorizationCodesInput
    connect?: UserWhereUniqueInput
  }

  export type ClientUpdateOneRequiredWithoutAuthorizationCodesNestedInput = {
    create?: XOR<ClientCreateWithoutAuthorizationCodesInput, ClientUncheckedCreateWithoutAuthorizationCodesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutAuthorizationCodesInput
    upsert?: ClientUpsertWithoutAuthorizationCodesInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutAuthorizationCodesInput, ClientUpdateWithoutAuthorizationCodesInput>, ClientUncheckedUpdateWithoutAuthorizationCodesInput>
  }

  export type UserUpdateOneWithoutAuthorizationCodesNestedInput = {
    create?: XOR<UserCreateWithoutAuthorizationCodesInput, UserUncheckedCreateWithoutAuthorizationCodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuthorizationCodesInput
    upsert?: UserUpsertWithoutAuthorizationCodesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuthorizationCodesInput, UserUpdateWithoutAuthorizationCodesInput>, UserUncheckedUpdateWithoutAuthorizationCodesInput>
  }

  export type ClientCreateNestedOneWithoutRedirectUrlsInput = {
    create?: XOR<ClientCreateWithoutRedirectUrlsInput, ClientUncheckedCreateWithoutRedirectUrlsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutRedirectUrlsInput
    connect?: ClientWhereUniqueInput
  }

  export type ClientUpdateOneRequiredWithoutRedirectUrlsNestedInput = {
    create?: XOR<ClientCreateWithoutRedirectUrlsInput, ClientUncheckedCreateWithoutRedirectUrlsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutRedirectUrlsInput
    upsert?: ClientUpsertWithoutRedirectUrlsInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutRedirectUrlsInput, ClientUpdateWithoutRedirectUrlsInput>, ClientUncheckedUpdateWithoutRedirectUrlsInput>
  }

  export type ClientCreateNestedOneWithoutPostLogoutRedirectUrlsInput = {
    create?: XOR<ClientCreateWithoutPostLogoutRedirectUrlsInput, ClientUncheckedCreateWithoutPostLogoutRedirectUrlsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutPostLogoutRedirectUrlsInput
    connect?: ClientWhereUniqueInput
  }

  export type ClientUpdateOneRequiredWithoutPostLogoutRedirectUrlsNestedInput = {
    create?: XOR<ClientCreateWithoutPostLogoutRedirectUrlsInput, ClientUncheckedCreateWithoutPostLogoutRedirectUrlsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutPostLogoutRedirectUrlsInput
    upsert?: ClientUpsertWithoutPostLogoutRedirectUrlsInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutPostLogoutRedirectUrlsInput, ClientUpdateWithoutPostLogoutRedirectUrlsInput>, ClientUncheckedUpdateWithoutPostLogoutRedirectUrlsInput>
  }

  export type ChartCreateNestedManyWithoutConnectionInput = {
    create?: XOR<ChartCreateWithoutConnectionInput, ChartUncheckedCreateWithoutConnectionInput> | ChartCreateWithoutConnectionInput[] | ChartUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: ChartCreateOrConnectWithoutConnectionInput | ChartCreateOrConnectWithoutConnectionInput[]
    createMany?: ChartCreateManyConnectionInputEnvelope
    connect?: ChartWhereUniqueInput | ChartWhereUniqueInput[]
  }

  export type ChartUncheckedCreateNestedManyWithoutConnectionInput = {
    create?: XOR<ChartCreateWithoutConnectionInput, ChartUncheckedCreateWithoutConnectionInput> | ChartCreateWithoutConnectionInput[] | ChartUncheckedCreateWithoutConnectionInput[]
    connectOrCreate?: ChartCreateOrConnectWithoutConnectionInput | ChartCreateOrConnectWithoutConnectionInput[]
    createMany?: ChartCreateManyConnectionInputEnvelope
    connect?: ChartWhereUniqueInput | ChartWhereUniqueInput[]
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

  export type DashboardChartUncheckedCreateNestedManyWithoutDashboardInput = {
    create?: XOR<DashboardChartCreateWithoutDashboardInput, DashboardChartUncheckedCreateWithoutDashboardInput> | DashboardChartCreateWithoutDashboardInput[] | DashboardChartUncheckedCreateWithoutDashboardInput[]
    connectOrCreate?: DashboardChartCreateOrConnectWithoutDashboardInput | DashboardChartCreateOrConnectWithoutDashboardInput[]
    createMany?: DashboardChartCreateManyDashboardInputEnvelope
    connect?: DashboardChartWhereUniqueInput | DashboardChartWhereUniqueInput[]
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

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type PasswordResetTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
  }

  export type AuthorizationCodeCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthorizationCodeCreateWithoutUserInput, AuthorizationCodeUncheckedCreateWithoutUserInput> | AuthorizationCodeCreateWithoutUserInput[] | AuthorizationCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthorizationCodeCreateOrConnectWithoutUserInput | AuthorizationCodeCreateOrConnectWithoutUserInput[]
    createMany?: AuthorizationCodeCreateManyUserInputEnvelope
    connect?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
  }

  export type AuthorizationCodeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthorizationCodeCreateWithoutUserInput, AuthorizationCodeUncheckedCreateWithoutUserInput> | AuthorizationCodeCreateWithoutUserInput[] | AuthorizationCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthorizationCodeCreateOrConnectWithoutUserInput | AuthorizationCodeCreateOrConnectWithoutUserInput[]
    createMany?: AuthorizationCodeCreateManyUserInputEnvelope
    connect?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type PasswordResetTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput | PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    set?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    disconnect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    delete?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    update?: PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput | PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetTokenUpdateManyWithWhereWithoutUserInput | PasswordResetTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
  }

  export type AuthorizationCodeUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthorizationCodeCreateWithoutUserInput, AuthorizationCodeUncheckedCreateWithoutUserInput> | AuthorizationCodeCreateWithoutUserInput[] | AuthorizationCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthorizationCodeCreateOrConnectWithoutUserInput | AuthorizationCodeCreateOrConnectWithoutUserInput[]
    upsert?: AuthorizationCodeUpsertWithWhereUniqueWithoutUserInput | AuthorizationCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthorizationCodeCreateManyUserInputEnvelope
    set?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
    disconnect?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
    delete?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
    connect?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
    update?: AuthorizationCodeUpdateWithWhereUniqueWithoutUserInput | AuthorizationCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthorizationCodeUpdateManyWithWhereWithoutUserInput | AuthorizationCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthorizationCodeScalarWhereInput | AuthorizationCodeScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput | PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    set?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    disconnect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    delete?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    update?: PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput | PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetTokenUpdateManyWithWhereWithoutUserInput | PasswordResetTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
  }

  export type AuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthorizationCodeCreateWithoutUserInput, AuthorizationCodeUncheckedCreateWithoutUserInput> | AuthorizationCodeCreateWithoutUserInput[] | AuthorizationCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthorizationCodeCreateOrConnectWithoutUserInput | AuthorizationCodeCreateOrConnectWithoutUserInput[]
    upsert?: AuthorizationCodeUpsertWithWhereUniqueWithoutUserInput | AuthorizationCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthorizationCodeCreateManyUserInputEnvelope
    set?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
    disconnect?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
    delete?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
    connect?: AuthorizationCodeWhereUniqueInput | AuthorizationCodeWhereUniqueInput[]
    update?: AuthorizationCodeUpdateWithWhereUniqueWithoutUserInput | AuthorizationCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthorizationCodeUpdateManyWithWhereWithoutUserInput | AuthorizationCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthorizationCodeScalarWhereInput | AuthorizationCodeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPasswordResetTokensInput = {
    create?: XOR<UserCreateWithoutPasswordResetTokensInput, UserUncheckedCreateWithoutPasswordResetTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPasswordResetTokensNestedInput = {
    create?: XOR<UserCreateWithoutPasswordResetTokensInput, UserUncheckedCreateWithoutPasswordResetTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetTokensInput
    upsert?: UserUpsertWithoutPasswordResetTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPasswordResetTokensInput, UserUpdateWithoutPasswordResetTokensInput>, UserUncheckedUpdateWithoutPasswordResetTokensInput>
  }

  export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
  }

  export type ClientCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<ClientCreateWithoutRefreshTokensInput, ClientUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: ClientCreateOrConnectWithoutRefreshTokensInput
    connect?: ClientWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    upsert?: UserUpsertWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefreshTokensInput, UserUpdateWithoutRefreshTokensInput>, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type ClientUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<ClientCreateWithoutRefreshTokensInput, ClientUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: ClientCreateOrConnectWithoutRefreshTokensInput
    upsert?: ClientUpsertWithoutRefreshTokensInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutRefreshTokensInput, ClientUpdateWithoutRefreshTokensInput>, ClientUncheckedUpdateWithoutRefreshTokensInput>
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

  export type NestedEnumClientTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ClientType | EnumClientTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ClientType[]
    notIn?: $Enums.ClientType[]
    not?: NestedEnumClientTypeFilter<$PrismaModel> | $Enums.ClientType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedEnumClientTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClientType | EnumClientTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ClientType[]
    notIn?: $Enums.ClientType[]
    not?: NestedEnumClientTypeWithAggregatesFilter<$PrismaModel> | $Enums.ClientType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClientTypeFilter<$PrismaModel>
    _max?: NestedEnumClientTypeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumDbTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DbType | EnumDbTypeFieldRefInput<$PrismaModel>
    in?: $Enums.DbType[]
    notIn?: $Enums.DbType[]
    not?: NestedEnumDbTypeFilter<$PrismaModel> | $Enums.DbType
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type RefreshTokenCreateWithoutClientInput = {
    id?: string
    token: string
    expiresAt: Date | string
    revoked?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    user: UserCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateWithoutClientInput = {
    id?: string
    token: string
    userId: string
    expiresAt: Date | string
    revoked?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type RefreshTokenCreateOrConnectWithoutClientInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutClientInput, RefreshTokenUncheckedCreateWithoutClientInput>
  }

  export type RefreshTokenCreateManyClientInputEnvelope = {
    data: RefreshTokenCreateManyClientInput | RefreshTokenCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type AuthorizationCodeCreateWithoutClientInput = {
    id?: string
    code: string
    redirectUri: string
    codeChallenge?: string | null
    codeChallengeMethod?: string | null
    state?: string | null
    expiresAt: Date | string
    isUsed?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    user?: UserCreateNestedOneWithoutAuthorizationCodesInput
  }

  export type AuthorizationCodeUncheckedCreateWithoutClientInput = {
    id?: string
    code: string
    userId?: string | null
    redirectUri: string
    codeChallenge?: string | null
    codeChallengeMethod?: string | null
    state?: string | null
    expiresAt: Date | string
    isUsed?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type AuthorizationCodeCreateOrConnectWithoutClientInput = {
    where: AuthorizationCodeWhereUniqueInput
    create: XOR<AuthorizationCodeCreateWithoutClientInput, AuthorizationCodeUncheckedCreateWithoutClientInput>
  }

  export type AuthorizationCodeCreateManyClientInputEnvelope = {
    data: AuthorizationCodeCreateManyClientInput | AuthorizationCodeCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type RedirectURLCreateWithoutClientInput = {
    id?: string
    url: string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type RedirectURLUncheckedCreateWithoutClientInput = {
    id?: string
    url: string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type RedirectURLCreateOrConnectWithoutClientInput = {
    where: RedirectURLWhereUniqueInput
    create: XOR<RedirectURLCreateWithoutClientInput, RedirectURLUncheckedCreateWithoutClientInput>
  }

  export type RedirectURLCreateManyClientInputEnvelope = {
    data: RedirectURLCreateManyClientInput | RedirectURLCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type PostLogoutRedirectURLCreateWithoutClientInput = {
    id?: string
    url: string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type PostLogoutRedirectURLUncheckedCreateWithoutClientInput = {
    id?: string
    url: string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type PostLogoutRedirectURLCreateOrConnectWithoutClientInput = {
    where: PostLogoutRedirectURLWhereUniqueInput
    create: XOR<PostLogoutRedirectURLCreateWithoutClientInput, PostLogoutRedirectURLUncheckedCreateWithoutClientInput>
  }

  export type PostLogoutRedirectURLCreateManyClientInputEnvelope = {
    data: PostLogoutRedirectURLCreateManyClientInput | PostLogoutRedirectURLCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutClientInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutClientInput, RefreshTokenUncheckedUpdateWithoutClientInput>
    create: XOR<RefreshTokenCreateWithoutClientInput, RefreshTokenUncheckedCreateWithoutClientInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutClientInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutClientInput, RefreshTokenUncheckedUpdateWithoutClientInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutClientInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutClientInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    userId?: StringFilter<"RefreshToken"> | string
    clientId?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revoked?: BoolFilter<"RefreshToken"> | boolean
    createdBy?: StringNullableFilter<"RefreshToken"> | string | null
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdIp?: StringNullableFilter<"RefreshToken"> | string | null
    updatedBy?: StringNullableFilter<"RefreshToken"> | string | null
    updatedAt?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    updatedIp?: StringNullableFilter<"RefreshToken"> | string | null
  }

  export type AuthorizationCodeUpsertWithWhereUniqueWithoutClientInput = {
    where: AuthorizationCodeWhereUniqueInput
    update: XOR<AuthorizationCodeUpdateWithoutClientInput, AuthorizationCodeUncheckedUpdateWithoutClientInput>
    create: XOR<AuthorizationCodeCreateWithoutClientInput, AuthorizationCodeUncheckedCreateWithoutClientInput>
  }

  export type AuthorizationCodeUpdateWithWhereUniqueWithoutClientInput = {
    where: AuthorizationCodeWhereUniqueInput
    data: XOR<AuthorizationCodeUpdateWithoutClientInput, AuthorizationCodeUncheckedUpdateWithoutClientInput>
  }

  export type AuthorizationCodeUpdateManyWithWhereWithoutClientInput = {
    where: AuthorizationCodeScalarWhereInput
    data: XOR<AuthorizationCodeUpdateManyMutationInput, AuthorizationCodeUncheckedUpdateManyWithoutClientInput>
  }

  export type AuthorizationCodeScalarWhereInput = {
    AND?: AuthorizationCodeScalarWhereInput | AuthorizationCodeScalarWhereInput[]
    OR?: AuthorizationCodeScalarWhereInput[]
    NOT?: AuthorizationCodeScalarWhereInput | AuthorizationCodeScalarWhereInput[]
    id?: StringFilter<"AuthorizationCode"> | string
    code?: StringFilter<"AuthorizationCode"> | string
    clientId?: StringFilter<"AuthorizationCode"> | string
    userId?: StringNullableFilter<"AuthorizationCode"> | string | null
    redirectUri?: StringFilter<"AuthorizationCode"> | string
    codeChallenge?: StringNullableFilter<"AuthorizationCode"> | string | null
    codeChallengeMethod?: StringNullableFilter<"AuthorizationCode"> | string | null
    state?: StringNullableFilter<"AuthorizationCode"> | string | null
    expiresAt?: DateTimeFilter<"AuthorizationCode"> | Date | string
    isUsed?: BoolFilter<"AuthorizationCode"> | boolean
    createdBy?: StringNullableFilter<"AuthorizationCode"> | string | null
    createdAt?: DateTimeFilter<"AuthorizationCode"> | Date | string
    createdIp?: StringNullableFilter<"AuthorizationCode"> | string | null
    updatedBy?: StringNullableFilter<"AuthorizationCode"> | string | null
    updatedAt?: DateTimeNullableFilter<"AuthorizationCode"> | Date | string | null
    updatedIp?: StringNullableFilter<"AuthorizationCode"> | string | null
  }

  export type RedirectURLUpsertWithWhereUniqueWithoutClientInput = {
    where: RedirectURLWhereUniqueInput
    update: XOR<RedirectURLUpdateWithoutClientInput, RedirectURLUncheckedUpdateWithoutClientInput>
    create: XOR<RedirectURLCreateWithoutClientInput, RedirectURLUncheckedCreateWithoutClientInput>
  }

  export type RedirectURLUpdateWithWhereUniqueWithoutClientInput = {
    where: RedirectURLWhereUniqueInput
    data: XOR<RedirectURLUpdateWithoutClientInput, RedirectURLUncheckedUpdateWithoutClientInput>
  }

  export type RedirectURLUpdateManyWithWhereWithoutClientInput = {
    where: RedirectURLScalarWhereInput
    data: XOR<RedirectURLUpdateManyMutationInput, RedirectURLUncheckedUpdateManyWithoutClientInput>
  }

  export type RedirectURLScalarWhereInput = {
    AND?: RedirectURLScalarWhereInput | RedirectURLScalarWhereInput[]
    OR?: RedirectURLScalarWhereInput[]
    NOT?: RedirectURLScalarWhereInput | RedirectURLScalarWhereInput[]
    id?: StringFilter<"RedirectURL"> | string
    url?: StringFilter<"RedirectURL"> | string
    clientId?: StringFilter<"RedirectURL"> | string
    createdBy?: StringNullableFilter<"RedirectURL"> | string | null
    createdAt?: DateTimeFilter<"RedirectURL"> | Date | string
    createdIp?: StringNullableFilter<"RedirectURL"> | string | null
    updatedBy?: StringNullableFilter<"RedirectURL"> | string | null
    updatedAt?: DateTimeNullableFilter<"RedirectURL"> | Date | string | null
    updatedIp?: StringNullableFilter<"RedirectURL"> | string | null
  }

  export type PostLogoutRedirectURLUpsertWithWhereUniqueWithoutClientInput = {
    where: PostLogoutRedirectURLWhereUniqueInput
    update: XOR<PostLogoutRedirectURLUpdateWithoutClientInput, PostLogoutRedirectURLUncheckedUpdateWithoutClientInput>
    create: XOR<PostLogoutRedirectURLCreateWithoutClientInput, PostLogoutRedirectURLUncheckedCreateWithoutClientInput>
  }

  export type PostLogoutRedirectURLUpdateWithWhereUniqueWithoutClientInput = {
    where: PostLogoutRedirectURLWhereUniqueInput
    data: XOR<PostLogoutRedirectURLUpdateWithoutClientInput, PostLogoutRedirectURLUncheckedUpdateWithoutClientInput>
  }

  export type PostLogoutRedirectURLUpdateManyWithWhereWithoutClientInput = {
    where: PostLogoutRedirectURLScalarWhereInput
    data: XOR<PostLogoutRedirectURLUpdateManyMutationInput, PostLogoutRedirectURLUncheckedUpdateManyWithoutClientInput>
  }

  export type PostLogoutRedirectURLScalarWhereInput = {
    AND?: PostLogoutRedirectURLScalarWhereInput | PostLogoutRedirectURLScalarWhereInput[]
    OR?: PostLogoutRedirectURLScalarWhereInput[]
    NOT?: PostLogoutRedirectURLScalarWhereInput | PostLogoutRedirectURLScalarWhereInput[]
    id?: StringFilter<"PostLogoutRedirectURL"> | string
    url?: StringFilter<"PostLogoutRedirectURL"> | string
    clientId?: StringFilter<"PostLogoutRedirectURL"> | string
    createdBy?: StringNullableFilter<"PostLogoutRedirectURL"> | string | null
    createdAt?: DateTimeFilter<"PostLogoutRedirectURL"> | Date | string
    createdIp?: StringNullableFilter<"PostLogoutRedirectURL"> | string | null
    updatedBy?: StringNullableFilter<"PostLogoutRedirectURL"> | string | null
    updatedAt?: DateTimeNullableFilter<"PostLogoutRedirectURL"> | Date | string | null
    updatedIp?: StringNullableFilter<"PostLogoutRedirectURL"> | string | null
  }

  export type ClientCreateWithoutAuthorizationCodesInput = {
    id?: string
    name: string
    clientId: string
    clientSecret?: string | null
    clientType?: $Enums.ClientType
    disableStrictUrlValidation?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutClientInput
    redirectUrls?: RedirectURLCreateNestedManyWithoutClientInput
    postLogoutRedirectUrls?: PostLogoutRedirectURLCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutAuthorizationCodesInput = {
    id?: string
    name: string
    clientId: string
    clientSecret?: string | null
    clientType?: $Enums.ClientType
    disableStrictUrlValidation?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutClientInput
    redirectUrls?: RedirectURLUncheckedCreateNestedManyWithoutClientInput
    postLogoutRedirectUrls?: PostLogoutRedirectURLUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutAuthorizationCodesInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutAuthorizationCodesInput, ClientUncheckedCreateWithoutAuthorizationCodesInput>
  }

  export type UserCreateWithoutAuthorizationCodesInput = {
    id?: string
    firstName: string
    lastName?: string | null
    email: string
    phoneNumber?: string | null
    username: string
    ndiIdentifier?: string | null
    password?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    passwordResetTokens?: PasswordResetTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuthorizationCodesInput = {
    id?: string
    firstName: string
    lastName?: string | null
    email: string
    phoneNumber?: string | null
    username: string
    ndiIdentifier?: string | null
    password?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    passwordResetTokens?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuthorizationCodesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuthorizationCodesInput, UserUncheckedCreateWithoutAuthorizationCodesInput>
  }

  export type ClientUpsertWithoutAuthorizationCodesInput = {
    update: XOR<ClientUpdateWithoutAuthorizationCodesInput, ClientUncheckedUpdateWithoutAuthorizationCodesInput>
    create: XOR<ClientCreateWithoutAuthorizationCodesInput, ClientUncheckedCreateWithoutAuthorizationCodesInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutAuthorizationCodesInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutAuthorizationCodesInput, ClientUncheckedUpdateWithoutAuthorizationCodesInput>
  }

  export type ClientUpdateWithoutAuthorizationCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: EnumClientTypeFieldUpdateOperationsInput | $Enums.ClientType
    disableStrictUrlValidation?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutClientNestedInput
    redirectUrls?: RedirectURLUpdateManyWithoutClientNestedInput
    postLogoutRedirectUrls?: PostLogoutRedirectURLUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutAuthorizationCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: EnumClientTypeFieldUpdateOperationsInput | $Enums.ClientType
    disableStrictUrlValidation?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutClientNestedInput
    redirectUrls?: RedirectURLUncheckedUpdateManyWithoutClientNestedInput
    postLogoutRedirectUrls?: PostLogoutRedirectURLUncheckedUpdateManyWithoutClientNestedInput
  }

  export type UserUpsertWithoutAuthorizationCodesInput = {
    update: XOR<UserUpdateWithoutAuthorizationCodesInput, UserUncheckedUpdateWithoutAuthorizationCodesInput>
    create: XOR<UserCreateWithoutAuthorizationCodesInput, UserUncheckedCreateWithoutAuthorizationCodesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuthorizationCodesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuthorizationCodesInput, UserUncheckedUpdateWithoutAuthorizationCodesInput>
  }

  export type UserUpdateWithoutAuthorizationCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    ndiIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    passwordResetTokens?: PasswordResetTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuthorizationCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    ndiIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    passwordResetTokens?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ClientCreateWithoutRedirectUrlsInput = {
    id?: string
    name: string
    clientId: string
    clientSecret?: string | null
    clientType?: $Enums.ClientType
    disableStrictUrlValidation?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutClientInput
    authorizationCodes?: AuthorizationCodeCreateNestedManyWithoutClientInput
    postLogoutRedirectUrls?: PostLogoutRedirectURLCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutRedirectUrlsInput = {
    id?: string
    name: string
    clientId: string
    clientSecret?: string | null
    clientType?: $Enums.ClientType
    disableStrictUrlValidation?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutClientInput
    authorizationCodes?: AuthorizationCodeUncheckedCreateNestedManyWithoutClientInput
    postLogoutRedirectUrls?: PostLogoutRedirectURLUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutRedirectUrlsInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutRedirectUrlsInput, ClientUncheckedCreateWithoutRedirectUrlsInput>
  }

  export type ClientUpsertWithoutRedirectUrlsInput = {
    update: XOR<ClientUpdateWithoutRedirectUrlsInput, ClientUncheckedUpdateWithoutRedirectUrlsInput>
    create: XOR<ClientCreateWithoutRedirectUrlsInput, ClientUncheckedCreateWithoutRedirectUrlsInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutRedirectUrlsInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutRedirectUrlsInput, ClientUncheckedUpdateWithoutRedirectUrlsInput>
  }

  export type ClientUpdateWithoutRedirectUrlsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: EnumClientTypeFieldUpdateOperationsInput | $Enums.ClientType
    disableStrictUrlValidation?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutClientNestedInput
    authorizationCodes?: AuthorizationCodeUpdateManyWithoutClientNestedInput
    postLogoutRedirectUrls?: PostLogoutRedirectURLUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutRedirectUrlsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: EnumClientTypeFieldUpdateOperationsInput | $Enums.ClientType
    disableStrictUrlValidation?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutClientNestedInput
    authorizationCodes?: AuthorizationCodeUncheckedUpdateManyWithoutClientNestedInput
    postLogoutRedirectUrls?: PostLogoutRedirectURLUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateWithoutPostLogoutRedirectUrlsInput = {
    id?: string
    name: string
    clientId: string
    clientSecret?: string | null
    clientType?: $Enums.ClientType
    disableStrictUrlValidation?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutClientInput
    authorizationCodes?: AuthorizationCodeCreateNestedManyWithoutClientInput
    redirectUrls?: RedirectURLCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutPostLogoutRedirectUrlsInput = {
    id?: string
    name: string
    clientId: string
    clientSecret?: string | null
    clientType?: $Enums.ClientType
    disableStrictUrlValidation?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutClientInput
    authorizationCodes?: AuthorizationCodeUncheckedCreateNestedManyWithoutClientInput
    redirectUrls?: RedirectURLUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutPostLogoutRedirectUrlsInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutPostLogoutRedirectUrlsInput, ClientUncheckedCreateWithoutPostLogoutRedirectUrlsInput>
  }

  export type ClientUpsertWithoutPostLogoutRedirectUrlsInput = {
    update: XOR<ClientUpdateWithoutPostLogoutRedirectUrlsInput, ClientUncheckedUpdateWithoutPostLogoutRedirectUrlsInput>
    create: XOR<ClientCreateWithoutPostLogoutRedirectUrlsInput, ClientUncheckedCreateWithoutPostLogoutRedirectUrlsInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutPostLogoutRedirectUrlsInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutPostLogoutRedirectUrlsInput, ClientUncheckedUpdateWithoutPostLogoutRedirectUrlsInput>
  }

  export type ClientUpdateWithoutPostLogoutRedirectUrlsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: EnumClientTypeFieldUpdateOperationsInput | $Enums.ClientType
    disableStrictUrlValidation?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutClientNestedInput
    authorizationCodes?: AuthorizationCodeUpdateManyWithoutClientNestedInput
    redirectUrls?: RedirectURLUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutPostLogoutRedirectUrlsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: EnumClientTypeFieldUpdateOperationsInput | $Enums.ClientType
    disableStrictUrlValidation?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutClientNestedInput
    authorizationCodes?: AuthorizationCodeUncheckedUpdateManyWithoutClientNestedInput
    redirectUrls?: RedirectURLUncheckedUpdateManyWithoutClientNestedInput
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

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    revoked?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    client: ClientCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    clientId: string
    expiresAt: Date | string
    revoked?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PasswordResetTokenCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    isUsed?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type PasswordResetTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    isUsed?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type PasswordResetTokenCreateOrConnectWithoutUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    create: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetTokenCreateManyUserInputEnvelope = {
    data: PasswordResetTokenCreateManyUserInput | PasswordResetTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuthorizationCodeCreateWithoutUserInput = {
    id?: string
    code: string
    redirectUri: string
    codeChallenge?: string | null
    codeChallengeMethod?: string | null
    state?: string | null
    expiresAt: Date | string
    isUsed?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    client: ClientCreateNestedOneWithoutAuthorizationCodesInput
  }

  export type AuthorizationCodeUncheckedCreateWithoutUserInput = {
    id?: string
    code: string
    clientId: string
    redirectUri: string
    codeChallenge?: string | null
    codeChallengeMethod?: string | null
    state?: string | null
    expiresAt: Date | string
    isUsed?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type AuthorizationCodeCreateOrConnectWithoutUserInput = {
    where: AuthorizationCodeWhereUniqueInput
    create: XOR<AuthorizationCodeCreateWithoutUserInput, AuthorizationCodeUncheckedCreateWithoutUserInput>
  }

  export type AuthorizationCodeCreateManyUserInputEnvelope = {
    data: AuthorizationCodeCreateManyUserInput | AuthorizationCodeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    update: XOR<PasswordResetTokenUpdateWithoutUserInput, PasswordResetTokenUncheckedUpdateWithoutUserInput>
    create: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    data: XOR<PasswordResetTokenUpdateWithoutUserInput, PasswordResetTokenUncheckedUpdateWithoutUserInput>
  }

  export type PasswordResetTokenUpdateManyWithWhereWithoutUserInput = {
    where: PasswordResetTokenScalarWhereInput
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type PasswordResetTokenScalarWhereInput = {
    AND?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
    OR?: PasswordResetTokenScalarWhereInput[]
    NOT?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    token?: StringFilter<"PasswordResetToken"> | string
    userId?: StringFilter<"PasswordResetToken"> | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    isUsed?: BoolFilter<"PasswordResetToken"> | boolean
    createdBy?: StringNullableFilter<"PasswordResetToken"> | string | null
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    createdIp?: StringNullableFilter<"PasswordResetToken"> | string | null
    updatedBy?: StringNullableFilter<"PasswordResetToken"> | string | null
    updatedAt?: DateTimeNullableFilter<"PasswordResetToken"> | Date | string | null
    updatedIp?: StringNullableFilter<"PasswordResetToken"> | string | null
  }

  export type AuthorizationCodeUpsertWithWhereUniqueWithoutUserInput = {
    where: AuthorizationCodeWhereUniqueInput
    update: XOR<AuthorizationCodeUpdateWithoutUserInput, AuthorizationCodeUncheckedUpdateWithoutUserInput>
    create: XOR<AuthorizationCodeCreateWithoutUserInput, AuthorizationCodeUncheckedCreateWithoutUserInput>
  }

  export type AuthorizationCodeUpdateWithWhereUniqueWithoutUserInput = {
    where: AuthorizationCodeWhereUniqueInput
    data: XOR<AuthorizationCodeUpdateWithoutUserInput, AuthorizationCodeUncheckedUpdateWithoutUserInput>
  }

  export type AuthorizationCodeUpdateManyWithWhereWithoutUserInput = {
    where: AuthorizationCodeScalarWhereInput
    data: XOR<AuthorizationCodeUpdateManyMutationInput, AuthorizationCodeUncheckedUpdateManyWithoutUserInput>
  }

  export type UserCreateWithoutPasswordResetTokensInput = {
    id?: string
    firstName: string
    lastName?: string | null
    email: string
    phoneNumber?: string | null
    username: string
    ndiIdentifier?: string | null
    password?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    authorizationCodes?: AuthorizationCodeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPasswordResetTokensInput = {
    id?: string
    firstName: string
    lastName?: string | null
    email: string
    phoneNumber?: string | null
    username: string
    ndiIdentifier?: string | null
    password?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    authorizationCodes?: AuthorizationCodeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPasswordResetTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPasswordResetTokensInput, UserUncheckedCreateWithoutPasswordResetTokensInput>
  }

  export type UserUpsertWithoutPasswordResetTokensInput = {
    update: XOR<UserUpdateWithoutPasswordResetTokensInput, UserUncheckedUpdateWithoutPasswordResetTokensInput>
    create: XOR<UserCreateWithoutPasswordResetTokensInput, UserUncheckedCreateWithoutPasswordResetTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPasswordResetTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPasswordResetTokensInput, UserUncheckedUpdateWithoutPasswordResetTokensInput>
  }

  export type UserUpdateWithoutPasswordResetTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    ndiIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    authorizationCodes?: AuthorizationCodeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPasswordResetTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    ndiIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    authorizationCodes?: AuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutRefreshTokensInput = {
    id?: string
    firstName: string
    lastName?: string | null
    email: string
    phoneNumber?: string | null
    username: string
    ndiIdentifier?: string | null
    password?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    passwordResetTokens?: PasswordResetTokenCreateNestedManyWithoutUserInput
    authorizationCodes?: AuthorizationCodeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    firstName: string
    lastName?: string | null
    email: string
    phoneNumber?: string | null
    username: string
    ndiIdentifier?: string | null
    password?: string | null
    role?: $Enums.Role
    isVerified?: boolean
    isActive?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    passwordResetTokens?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    authorizationCodes?: AuthorizationCodeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
  }

  export type ClientCreateWithoutRefreshTokensInput = {
    id?: string
    name: string
    clientId: string
    clientSecret?: string | null
    clientType?: $Enums.ClientType
    disableStrictUrlValidation?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    authorizationCodes?: AuthorizationCodeCreateNestedManyWithoutClientInput
    redirectUrls?: RedirectURLCreateNestedManyWithoutClientInput
    postLogoutRedirectUrls?: PostLogoutRedirectURLCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    name: string
    clientId: string
    clientSecret?: string | null
    clientType?: $Enums.ClientType
    disableStrictUrlValidation?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
    authorizationCodes?: AuthorizationCodeUncheckedCreateNestedManyWithoutClientInput
    redirectUrls?: RedirectURLUncheckedCreateNestedManyWithoutClientInput
    postLogoutRedirectUrls?: PostLogoutRedirectURLUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutRefreshTokensInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutRefreshTokensInput, ClientUncheckedCreateWithoutRefreshTokensInput>
  }

  export type UserUpsertWithoutRefreshTokensInput = {
    update: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    ndiIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetTokens?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    authorizationCodes?: AuthorizationCodeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    ndiIdentifier?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetTokens?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    authorizationCodes?: AuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ClientUpsertWithoutRefreshTokensInput = {
    update: XOR<ClientUpdateWithoutRefreshTokensInput, ClientUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<ClientCreateWithoutRefreshTokensInput, ClientUncheckedCreateWithoutRefreshTokensInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutRefreshTokensInput, ClientUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type ClientUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: EnumClientTypeFieldUpdateOperationsInput | $Enums.ClientType
    disableStrictUrlValidation?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationCodes?: AuthorizationCodeUpdateManyWithoutClientNestedInput
    redirectUrls?: RedirectURLUpdateManyWithoutClientNestedInput
    postLogoutRedirectUrls?: PostLogoutRedirectURLUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: NullableStringFieldUpdateOperationsInput | string | null
    clientType?: EnumClientTypeFieldUpdateOperationsInput | $Enums.ClientType
    disableStrictUrlValidation?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    authorizationCodes?: AuthorizationCodeUncheckedUpdateManyWithoutClientNestedInput
    redirectUrls?: RedirectURLUncheckedUpdateManyWithoutClientNestedInput
    postLogoutRedirectUrls?: PostLogoutRedirectURLUncheckedUpdateManyWithoutClientNestedInput
  }

  export type RefreshTokenCreateManyClientInput = {
    id?: string
    token: string
    userId: string
    expiresAt: Date | string
    revoked?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type AuthorizationCodeCreateManyClientInput = {
    id?: string
    code: string
    userId?: string | null
    redirectUri: string
    codeChallenge?: string | null
    codeChallengeMethod?: string | null
    state?: string | null
    expiresAt: Date | string
    isUsed?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type RedirectURLCreateManyClientInput = {
    id?: string
    url: string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type PostLogoutRedirectURLCreateManyClientInput = {
    id?: string
    url: string
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type RefreshTokenUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RefreshTokenUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorizationCodeUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    redirectUri?: StringFieldUpdateOperationsInput | string
    codeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    codeChallengeMethod?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutAuthorizationCodesNestedInput
  }

  export type AuthorizationCodeUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    redirectUri?: StringFieldUpdateOperationsInput | string
    codeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    codeChallengeMethod?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorizationCodeUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    redirectUri?: StringFieldUpdateOperationsInput | string
    codeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    codeChallengeMethod?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RedirectURLUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RedirectURLUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RedirectURLUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PostLogoutRedirectURLUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PostLogoutRedirectURLUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PostLogoutRedirectURLUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type RefreshTokenCreateManyUserInput = {
    id?: string
    token: string
    clientId: string
    expiresAt: Date | string
    revoked?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type PasswordResetTokenCreateManyUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    isUsed?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type AuthorizationCodeCreateManyUserInput = {
    id?: string
    code: string
    clientId: string
    redirectUri: string
    codeChallenge?: string | null
    codeChallengeMethod?: string | null
    state?: string | null
    expiresAt: Date | string
    isUsed?: boolean
    createdBy?: string | null
    createdAt?: Date | string
    createdIp?: string | null
    updatedBy?: string | null
    updatedAt?: Date | string | null
    updatedIp?: string | null
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    client?: ClientUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PasswordResetTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PasswordResetTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PasswordResetTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorizationCodeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    redirectUri?: StringFieldUpdateOperationsInput | string
    codeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    codeChallengeMethod?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
    client?: ClientUpdateOneRequiredWithoutAuthorizationCodesNestedInput
  }

  export type AuthorizationCodeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    redirectUri?: StringFieldUpdateOperationsInput | string
    codeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    codeChallengeMethod?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdIp?: NullableStringFieldUpdateOperationsInput | string | null
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedIp?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuthorizationCodeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    redirectUri?: StringFieldUpdateOperationsInput | string
    codeChallenge?: NullableStringFieldUpdateOperationsInput | string | null
    codeChallengeMethod?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isUsed?: BoolFieldUpdateOperationsInput | boolean
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