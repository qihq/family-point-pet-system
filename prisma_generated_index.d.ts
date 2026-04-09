
/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Family
 * 
 */
export type Family = $Result.DefaultSelection<Prisma.$FamilyPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model PointRule
 * 
 */
export type PointRule = $Result.DefaultSelection<Prisma.$PointRulePayload>
/**
 * Model PointRuleTarget
 * 
 */
export type PointRuleTarget = $Result.DefaultSelection<Prisma.$PointRuleTargetPayload>
/**
 * Model PointRecord
 * 
 */
export type PointRecord = $Result.DefaultSelection<Prisma.$PointRecordPayload>
/**
 * Model PointAccount
 * 
 */
export type PointAccount = $Result.DefaultSelection<Prisma.$PointAccountPayload>
/**
 * Model PointTransaction
 * 
 */
export type PointTransaction = $Result.DefaultSelection<Prisma.$PointTransactionPayload>
/**
 * Model Pet
 * 
 */
export type Pet = $Result.DefaultSelection<Prisma.$PetPayload>
/**
 * Model PetLog
 * 
 */
export type PetLog = $Result.DefaultSelection<Prisma.$PetLogPayload>
/**
 * Model TaskPlan
 * 
 */
export type TaskPlan = $Result.DefaultSelection<Prisma.$TaskPlanPayload>
/**
 * Model TaskLog
 * 
 */
export type TaskLog = $Result.DefaultSelection<Prisma.$TaskLogPayload>
/**
 * Model RewardItem
 * 
 */
export type RewardItem = $Result.DefaultSelection<Prisma.$RewardItemPayload>
/**
 * Model RedeemLog
 * 
 */
export type RedeemLog = $Result.DefaultSelection<Prisma.$RedeemLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  parent: 'parent',
  child: 'child',
  admin: 'admin'
};

export type Role = (typeof Role)[keyof typeof Role]


export const PointsType: {
  fixed: 'fixed',
  range: 'range'
};

export type PointsType = (typeof PointsType)[keyof typeof PointsType]


export const Frequency: {
  daily: 'daily',
  weekly: 'weekly',
  monthly: 'monthly',
  once: 'once',
  unlimited: 'unlimited'
};

export type Frequency = (typeof Frequency)[keyof typeof Frequency]


export const RecordStatus: {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected'
};

export type RecordStatus = (typeof RecordStatus)[keyof typeof RecordStatus]


export const TransactionType: {
  earn: 'earn',
  spend: 'spend'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]


export const SourceType: {
  task: 'task',
  manual: 'manual',
  pet: 'pet'
};

export type SourceType = (typeof SourceType)[keyof typeof SourceType]


export const PetStage: {
  egg: 'egg',
  baby: 'baby',
  growth: 'growth',
  final: 'final'
};

export type PetStage = (typeof PetStage)[keyof typeof PetStage]


export const PetStatus: {
  alive: 'alive',
  dead: 'dead'
};

export type PetStatus = (typeof PetStatus)[keyof typeof PetStatus]


export const PetAction: {
  feed: 'feed',
  water: 'water',
  clean: 'clean',
  play: 'play',
  evolve: 'evolve',
  revive: 'revive',
  decay: 'decay'
};

export type PetAction = (typeof PetAction)[keyof typeof PetAction]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type PointsType = $Enums.PointsType

export const PointsType: typeof $Enums.PointsType

export type Frequency = $Enums.Frequency

export const Frequency: typeof $Enums.Frequency

export type RecordStatus = $Enums.RecordStatus

export const RecordStatus: typeof $Enums.RecordStatus

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

export type SourceType = $Enums.SourceType

export const SourceType: typeof $Enums.SourceType

export type PetStage = $Enums.PetStage

export const PetStage: typeof $Enums.PetStage

export type PetStatus = $Enums.PetStatus

export const PetStatus: typeof $Enums.PetStatus

export type PetAction = $Enums.PetAction

export const PetAction: typeof $Enums.PetAction

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Families
 * const families = await prisma.family.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Families
   * const families = await prisma.family.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.family`: Exposes CRUD operations for the **Family** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Families
    * const families = await prisma.family.findMany()
    * ```
    */
  get family(): Prisma.FamilyDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.pointRule`: Exposes CRUD operations for the **PointRule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PointRules
    * const pointRules = await prisma.pointRule.findMany()
    * ```
    */
  get pointRule(): Prisma.PointRuleDelegate<ExtArgs>;

  /**
   * `prisma.pointRuleTarget`: Exposes CRUD operations for the **PointRuleTarget** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PointRuleTargets
    * const pointRuleTargets = await prisma.pointRuleTarget.findMany()
    * ```
    */
  get pointRuleTarget(): Prisma.PointRuleTargetDelegate<ExtArgs>;

  /**
   * `prisma.pointRecord`: Exposes CRUD operations for the **PointRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PointRecords
    * const pointRecords = await prisma.pointRecord.findMany()
    * ```
    */
  get pointRecord(): Prisma.PointRecordDelegate<ExtArgs>;

  /**
   * `prisma.pointAccount`: Exposes CRUD operations for the **PointAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PointAccounts
    * const pointAccounts = await prisma.pointAccount.findMany()
    * ```
    */
  get pointAccount(): Prisma.PointAccountDelegate<ExtArgs>;

  /**
   * `prisma.pointTransaction`: Exposes CRUD operations for the **PointTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PointTransactions
    * const pointTransactions = await prisma.pointTransaction.findMany()
    * ```
    */
  get pointTransaction(): Prisma.PointTransactionDelegate<ExtArgs>;

  /**
   * `prisma.pet`: Exposes CRUD operations for the **Pet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pets
    * const pets = await prisma.pet.findMany()
    * ```
    */
  get pet(): Prisma.PetDelegate<ExtArgs>;

  /**
   * `prisma.petLog`: Exposes CRUD operations for the **PetLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PetLogs
    * const petLogs = await prisma.petLog.findMany()
    * ```
    */
  get petLog(): Prisma.PetLogDelegate<ExtArgs>;

  /**
   * `prisma.taskPlan`: Exposes CRUD operations for the **TaskPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskPlans
    * const taskPlans = await prisma.taskPlan.findMany()
    * ```
    */
  get taskPlan(): Prisma.TaskPlanDelegate<ExtArgs>;

  /**
   * `prisma.taskLog`: Exposes CRUD operations for the **TaskLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TaskLogs
    * const taskLogs = await prisma.taskLog.findMany()
    * ```
    */
  get taskLog(): Prisma.TaskLogDelegate<ExtArgs>;

  /**
   * `prisma.rewardItem`: Exposes CRUD operations for the **RewardItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RewardItems
    * const rewardItems = await prisma.rewardItem.findMany()
    * ```
    */
  get rewardItem(): Prisma.RewardItemDelegate<ExtArgs>;

  /**
   * `prisma.redeemLog`: Exposes CRUD operations for the **RedeemLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RedeemLogs
    * const redeemLogs = await prisma.redeemLog.findMany()
    * ```
    */
  get redeemLog(): Prisma.RedeemLogDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    Family: 'Family',
    User: 'User',
    PointRule: 'PointRule',
    PointRuleTarget: 'PointRuleTarget',
    PointRecord: 'PointRecord',
    PointAccount: 'PointAccount',
    PointTransaction: 'PointTransaction',
    Pet: 'Pet',
    PetLog: 'PetLog',
    TaskPlan: 'TaskPlan',
    TaskLog: 'TaskLog',
    RewardItem: 'RewardItem',
    RedeemLog: 'RedeemLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "family" | "user" | "pointRule" | "pointRuleTarget" | "pointRecord" | "pointAccount" | "pointTransaction" | "pet" | "petLog" | "taskPlan" | "taskLog" | "rewardItem" | "redeemLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Family: {
        payload: Prisma.$FamilyPayload<ExtArgs>
        fields: Prisma.FamilyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FamilyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FamilyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          findFirst: {
            args: Prisma.FamilyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FamilyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          findMany: {
            args: Prisma.FamilyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>[]
          }
          create: {
            args: Prisma.FamilyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          createMany: {
            args: Prisma.FamilyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FamilyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>[]
          }
          delete: {
            args: Prisma.FamilyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          update: {
            args: Prisma.FamilyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          deleteMany: {
            args: Prisma.FamilyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FamilyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FamilyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          aggregate: {
            args: Prisma.FamilyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFamily>
          }
          groupBy: {
            args: Prisma.FamilyGroupByArgs<ExtArgs>
            result: $Utils.Optional<FamilyGroupByOutputType>[]
          }
          count: {
            args: Prisma.FamilyCountArgs<ExtArgs>
            result: $Utils.Optional<FamilyCountAggregateOutputType> | number
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
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
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
      PointRule: {
        payload: Prisma.$PointRulePayload<ExtArgs>
        fields: Prisma.PointRuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PointRuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PointRuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRulePayload>
          }
          findFirst: {
            args: Prisma.PointRuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PointRuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRulePayload>
          }
          findMany: {
            args: Prisma.PointRuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRulePayload>[]
          }
          create: {
            args: Prisma.PointRuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRulePayload>
          }
          createMany: {
            args: Prisma.PointRuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PointRuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRulePayload>[]
          }
          delete: {
            args: Prisma.PointRuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRulePayload>
          }
          update: {
            args: Prisma.PointRuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRulePayload>
          }
          deleteMany: {
            args: Prisma.PointRuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PointRuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PointRuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRulePayload>
          }
          aggregate: {
            args: Prisma.PointRuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePointRule>
          }
          groupBy: {
            args: Prisma.PointRuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<PointRuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.PointRuleCountArgs<ExtArgs>
            result: $Utils.Optional<PointRuleCountAggregateOutputType> | number
          }
        }
      }
      PointRuleTarget: {
        payload: Prisma.$PointRuleTargetPayload<ExtArgs>
        fields: Prisma.PointRuleTargetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PointRuleTargetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRuleTargetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PointRuleTargetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRuleTargetPayload>
          }
          findFirst: {
            args: Prisma.PointRuleTargetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRuleTargetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PointRuleTargetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRuleTargetPayload>
          }
          findMany: {
            args: Prisma.PointRuleTargetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRuleTargetPayload>[]
          }
          create: {
            args: Prisma.PointRuleTargetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRuleTargetPayload>
          }
          createMany: {
            args: Prisma.PointRuleTargetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PointRuleTargetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRuleTargetPayload>[]
          }
          delete: {
            args: Prisma.PointRuleTargetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRuleTargetPayload>
          }
          update: {
            args: Prisma.PointRuleTargetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRuleTargetPayload>
          }
          deleteMany: {
            args: Prisma.PointRuleTargetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PointRuleTargetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PointRuleTargetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRuleTargetPayload>
          }
          aggregate: {
            args: Prisma.PointRuleTargetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePointRuleTarget>
          }
          groupBy: {
            args: Prisma.PointRuleTargetGroupByArgs<ExtArgs>
            result: $Utils.Optional<PointRuleTargetGroupByOutputType>[]
          }
          count: {
            args: Prisma.PointRuleTargetCountArgs<ExtArgs>
            result: $Utils.Optional<PointRuleTargetCountAggregateOutputType> | number
          }
        }
      }
      PointRecord: {
        payload: Prisma.$PointRecordPayload<ExtArgs>
        fields: Prisma.PointRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PointRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PointRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRecordPayload>
          }
          findFirst: {
            args: Prisma.PointRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PointRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRecordPayload>
          }
          findMany: {
            args: Prisma.PointRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRecordPayload>[]
          }
          create: {
            args: Prisma.PointRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRecordPayload>
          }
          createMany: {
            args: Prisma.PointRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PointRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRecordPayload>[]
          }
          delete: {
            args: Prisma.PointRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRecordPayload>
          }
          update: {
            args: Prisma.PointRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRecordPayload>
          }
          deleteMany: {
            args: Prisma.PointRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PointRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PointRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointRecordPayload>
          }
          aggregate: {
            args: Prisma.PointRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePointRecord>
          }
          groupBy: {
            args: Prisma.PointRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<PointRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.PointRecordCountArgs<ExtArgs>
            result: $Utils.Optional<PointRecordCountAggregateOutputType> | number
          }
        }
      }
      PointAccount: {
        payload: Prisma.$PointAccountPayload<ExtArgs>
        fields: Prisma.PointAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PointAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PointAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointAccountPayload>
          }
          findFirst: {
            args: Prisma.PointAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PointAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointAccountPayload>
          }
          findMany: {
            args: Prisma.PointAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointAccountPayload>[]
          }
          create: {
            args: Prisma.PointAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointAccountPayload>
          }
          createMany: {
            args: Prisma.PointAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PointAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointAccountPayload>[]
          }
          delete: {
            args: Prisma.PointAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointAccountPayload>
          }
          update: {
            args: Prisma.PointAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointAccountPayload>
          }
          deleteMany: {
            args: Prisma.PointAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PointAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PointAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointAccountPayload>
          }
          aggregate: {
            args: Prisma.PointAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePointAccount>
          }
          groupBy: {
            args: Prisma.PointAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<PointAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.PointAccountCountArgs<ExtArgs>
            result: $Utils.Optional<PointAccountCountAggregateOutputType> | number
          }
        }
      }
      PointTransaction: {
        payload: Prisma.$PointTransactionPayload<ExtArgs>
        fields: Prisma.PointTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PointTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PointTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointTransactionPayload>
          }
          findFirst: {
            args: Prisma.PointTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PointTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointTransactionPayload>
          }
          findMany: {
            args: Prisma.PointTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointTransactionPayload>[]
          }
          create: {
            args: Prisma.PointTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointTransactionPayload>
          }
          createMany: {
            args: Prisma.PointTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PointTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointTransactionPayload>[]
          }
          delete: {
            args: Prisma.PointTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointTransactionPayload>
          }
          update: {
            args: Prisma.PointTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointTransactionPayload>
          }
          deleteMany: {
            args: Prisma.PointTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PointTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PointTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PointTransactionPayload>
          }
          aggregate: {
            args: Prisma.PointTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePointTransaction>
          }
          groupBy: {
            args: Prisma.PointTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PointTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PointTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<PointTransactionCountAggregateOutputType> | number
          }
        }
      }
      Pet: {
        payload: Prisma.$PetPayload<ExtArgs>
        fields: Prisma.PetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload>
          }
          findFirst: {
            args: Prisma.PetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload>
          }
          findMany: {
            args: Prisma.PetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload>[]
          }
          create: {
            args: Prisma.PetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload>
          }
          createMany: {
            args: Prisma.PetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload>[]
          }
          delete: {
            args: Prisma.PetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload>
          }
          update: {
            args: Prisma.PetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload>
          }
          deleteMany: {
            args: Prisma.PetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetPayload>
          }
          aggregate: {
            args: Prisma.PetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePet>
          }
          groupBy: {
            args: Prisma.PetGroupByArgs<ExtArgs>
            result: $Utils.Optional<PetGroupByOutputType>[]
          }
          count: {
            args: Prisma.PetCountArgs<ExtArgs>
            result: $Utils.Optional<PetCountAggregateOutputType> | number
          }
        }
      }
      PetLog: {
        payload: Prisma.$PetLogPayload<ExtArgs>
        fields: Prisma.PetLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PetLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PetLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetLogPayload>
          }
          findFirst: {
            args: Prisma.PetLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PetLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetLogPayload>
          }
          findMany: {
            args: Prisma.PetLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetLogPayload>[]
          }
          create: {
            args: Prisma.PetLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetLogPayload>
          }
          createMany: {
            args: Prisma.PetLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PetLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetLogPayload>[]
          }
          delete: {
            args: Prisma.PetLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetLogPayload>
          }
          update: {
            args: Prisma.PetLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetLogPayload>
          }
          deleteMany: {
            args: Prisma.PetLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PetLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PetLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PetLogPayload>
          }
          aggregate: {
            args: Prisma.PetLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePetLog>
          }
          groupBy: {
            args: Prisma.PetLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<PetLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.PetLogCountArgs<ExtArgs>
            result: $Utils.Optional<PetLogCountAggregateOutputType> | number
          }
        }
      }
      TaskPlan: {
        payload: Prisma.$TaskPlanPayload<ExtArgs>
        fields: Prisma.TaskPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPlanPayload>
          }
          findFirst: {
            args: Prisma.TaskPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPlanPayload>
          }
          findMany: {
            args: Prisma.TaskPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPlanPayload>[]
          }
          create: {
            args: Prisma.TaskPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPlanPayload>
          }
          createMany: {
            args: Prisma.TaskPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPlanPayload>[]
          }
          delete: {
            args: Prisma.TaskPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPlanPayload>
          }
          update: {
            args: Prisma.TaskPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPlanPayload>
          }
          deleteMany: {
            args: Prisma.TaskPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TaskPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPlanPayload>
          }
          aggregate: {
            args: Prisma.TaskPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskPlan>
          }
          groupBy: {
            args: Prisma.TaskPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskPlanCountArgs<ExtArgs>
            result: $Utils.Optional<TaskPlanCountAggregateOutputType> | number
          }
        }
      }
      TaskLog: {
        payload: Prisma.$TaskLogPayload<ExtArgs>
        fields: Prisma.TaskLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          findFirst: {
            args: Prisma.TaskLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          findMany: {
            args: Prisma.TaskLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>[]
          }
          create: {
            args: Prisma.TaskLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          createMany: {
            args: Prisma.TaskLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>[]
          }
          delete: {
            args: Prisma.TaskLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          update: {
            args: Prisma.TaskLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          deleteMany: {
            args: Prisma.TaskLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TaskLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskLogPayload>
          }
          aggregate: {
            args: Prisma.TaskLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaskLog>
          }
          groupBy: {
            args: Prisma.TaskLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskLogCountArgs<ExtArgs>
            result: $Utils.Optional<TaskLogCountAggregateOutputType> | number
          }
        }
      }
      RewardItem: {
        payload: Prisma.$RewardItemPayload<ExtArgs>
        fields: Prisma.RewardItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RewardItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RewardItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardItemPayload>
          }
          findFirst: {
            args: Prisma.RewardItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RewardItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardItemPayload>
          }
          findMany: {
            args: Prisma.RewardItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardItemPayload>[]
          }
          create: {
            args: Prisma.RewardItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardItemPayload>
          }
          createMany: {
            args: Prisma.RewardItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RewardItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardItemPayload>[]
          }
          delete: {
            args: Prisma.RewardItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardItemPayload>
          }
          update: {
            args: Prisma.RewardItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardItemPayload>
          }
          deleteMany: {
            args: Prisma.RewardItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RewardItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RewardItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewardItemPayload>
          }
          aggregate: {
            args: Prisma.RewardItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRewardItem>
          }
          groupBy: {
            args: Prisma.RewardItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<RewardItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.RewardItemCountArgs<ExtArgs>
            result: $Utils.Optional<RewardItemCountAggregateOutputType> | number
          }
        }
      }
      RedeemLog: {
        payload: Prisma.$RedeemLogPayload<ExtArgs>
        fields: Prisma.RedeemLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RedeemLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RedeemLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemLogPayload>
          }
          findFirst: {
            args: Prisma.RedeemLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RedeemLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemLogPayload>
          }
          findMany: {
            args: Prisma.RedeemLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemLogPayload>[]
          }
          create: {
            args: Prisma.RedeemLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemLogPayload>
          }
          createMany: {
            args: Prisma.RedeemLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RedeemLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemLogPayload>[]
          }
          delete: {
            args: Prisma.RedeemLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemLogPayload>
          }
          update: {
            args: Prisma.RedeemLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemLogPayload>
          }
          deleteMany: {
            args: Prisma.RedeemLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RedeemLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RedeemLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RedeemLogPayload>
          }
          aggregate: {
            args: Prisma.RedeemLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRedeemLog>
          }
          groupBy: {
            args: Prisma.RedeemLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<RedeemLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.RedeemLogCountArgs<ExtArgs>
            result: $Utils.Optional<RedeemLogCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type FamilyCountOutputType
   */

  export type FamilyCountOutputType = {
    users: number
    pointRules: number
    rewardItems: number
  }

  export type FamilyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | FamilyCountOutputTypeCountUsersArgs
    pointRules?: boolean | FamilyCountOutputTypeCountPointRulesArgs
    rewardItems?: boolean | FamilyCountOutputTypeCountRewardItemsArgs
  }

  // Custom InputTypes
  /**
   * FamilyCountOutputType without action
   */
  export type FamilyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyCountOutputType
     */
    select?: FamilyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FamilyCountOutputType without action
   */
  export type FamilyCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * FamilyCountOutputType without action
   */
  export type FamilyCountOutputTypeCountPointRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PointRuleWhereInput
  }

  /**
   * FamilyCountOutputType without action
   */
  export type FamilyCountOutputTypeCountRewardItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RewardItemWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    pointRecords: number
    taskPlans: number
    taskLogs: number
    redeemLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pointRecords?: boolean | UserCountOutputTypeCountPointRecordsArgs
    taskPlans?: boolean | UserCountOutputTypeCountTaskPlansArgs
    taskLogs?: boolean | UserCountOutputTypeCountTaskLogsArgs
    redeemLogs?: boolean | UserCountOutputTypeCountRedeemLogsArgs
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
  export type UserCountOutputTypeCountPointRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PointRecordWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTaskPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskPlanWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTaskLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRedeemLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RedeemLogWhereInput
  }


  /**
   * Count Type PointRuleCountOutputType
   */

  export type PointRuleCountOutputType = {
    targets: number
    records: number
  }

  export type PointRuleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    targets?: boolean | PointRuleCountOutputTypeCountTargetsArgs
    records?: boolean | PointRuleCountOutputTypeCountRecordsArgs
  }

  // Custom InputTypes
  /**
   * PointRuleCountOutputType without action
   */
  export type PointRuleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRuleCountOutputType
     */
    select?: PointRuleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PointRuleCountOutputType without action
   */
  export type PointRuleCountOutputTypeCountTargetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PointRuleTargetWhereInput
  }

  /**
   * PointRuleCountOutputType without action
   */
  export type PointRuleCountOutputTypeCountRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PointRecordWhereInput
  }


  /**
   * Count Type PointAccountCountOutputType
   */

  export type PointAccountCountOutputType = {
    transactions: number
  }

  export type PointAccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | PointAccountCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * PointAccountCountOutputType without action
   */
  export type PointAccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointAccountCountOutputType
     */
    select?: PointAccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PointAccountCountOutputType without action
   */
  export type PointAccountCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PointTransactionWhereInput
  }


  /**
   * Count Type PetCountOutputType
   */

  export type PetCountOutputType = {
    logs: number
  }

  export type PetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | PetCountOutputTypeCountLogsArgs
  }

  // Custom InputTypes
  /**
   * PetCountOutputType without action
   */
  export type PetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PetCountOutputType
     */
    select?: PetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PetCountOutputType without action
   */
  export type PetCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PetLogWhereInput
  }


  /**
   * Count Type TaskPlanCountOutputType
   */

  export type TaskPlanCountOutputType = {
    logs: number
  }

  export type TaskPlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | TaskPlanCountOutputTypeCountLogsArgs
  }

  // Custom InputTypes
  /**
   * TaskPlanCountOutputType without action
   */
  export type TaskPlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPlanCountOutputType
     */
    select?: TaskPlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskPlanCountOutputType without action
   */
  export type TaskPlanCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskLogWhereInput
  }


  /**
   * Count Type RewardItemCountOutputType
   */

  export type RewardItemCountOutputType = {
    redeems: number
  }

  export type RewardItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    redeems?: boolean | RewardItemCountOutputTypeCountRedeemsArgs
  }

  // Custom InputTypes
  /**
   * RewardItemCountOutputType without action
   */
  export type RewardItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardItemCountOutputType
     */
    select?: RewardItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RewardItemCountOutputType without action
   */
  export type RewardItemCountOutputTypeCountRedeemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RedeemLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Family
   */

  export type AggregateFamily = {
    _count: FamilyCountAggregateOutputType | null
    _min: FamilyMinAggregateOutputType | null
    _max: FamilyMaxAggregateOutputType | null
  }

  export type FamilyMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FamilyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FamilyCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FamilyMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FamilyMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FamilyCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FamilyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Family to aggregate.
     */
    where?: FamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Families to fetch.
     */
    orderBy?: FamilyOrderByWithRelationInput | FamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Families.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Families
    **/
    _count?: true | FamilyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FamilyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FamilyMaxAggregateInputType
  }

  export type GetFamilyAggregateType<T extends FamilyAggregateArgs> = {
        [P in keyof T & keyof AggregateFamily]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFamily[P]>
      : GetScalarType<T[P], AggregateFamily[P]>
  }




  export type FamilyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FamilyWhereInput
    orderBy?: FamilyOrderByWithAggregationInput | FamilyOrderByWithAggregationInput[]
    by: FamilyScalarFieldEnum[] | FamilyScalarFieldEnum
    having?: FamilyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FamilyCountAggregateInputType | true
    _min?: FamilyMinAggregateInputType
    _max?: FamilyMaxAggregateInputType
  }

  export type FamilyGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: FamilyCountAggregateOutputType | null
    _min: FamilyMinAggregateOutputType | null
    _max: FamilyMaxAggregateOutputType | null
  }

  type GetFamilyGroupByPayload<T extends FamilyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FamilyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FamilyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FamilyGroupByOutputType[P]>
            : GetScalarType<T[P], FamilyGroupByOutputType[P]>
        }
      >
    >


  export type FamilySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Family$usersArgs<ExtArgs>
    pointRules?: boolean | Family$pointRulesArgs<ExtArgs>
    rewardItems?: boolean | Family$rewardItemsArgs<ExtArgs>
    _count?: boolean | FamilyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["family"]>

  export type FamilySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["family"]>

  export type FamilySelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FamilyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Family$usersArgs<ExtArgs>
    pointRules?: boolean | Family$pointRulesArgs<ExtArgs>
    rewardItems?: boolean | Family$rewardItemsArgs<ExtArgs>
    _count?: boolean | FamilyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FamilyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FamilyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Family"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      pointRules: Prisma.$PointRulePayload<ExtArgs>[]
      rewardItems: Prisma.$RewardItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["family"]>
    composites: {}
  }

  type FamilyGetPayload<S extends boolean | null | undefined | FamilyDefaultArgs> = $Result.GetResult<Prisma.$FamilyPayload, S>

  type FamilyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FamilyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FamilyCountAggregateInputType | true
    }

  export interface FamilyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Family'], meta: { name: 'Family' } }
    /**
     * Find zero or one Family that matches the filter.
     * @param {FamilyFindUniqueArgs} args - Arguments to find a Family
     * @example
     * // Get one Family
     * const family = await prisma.family.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FamilyFindUniqueArgs>(args: SelectSubset<T, FamilyFindUniqueArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Family that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FamilyFindUniqueOrThrowArgs} args - Arguments to find a Family
     * @example
     * // Get one Family
     * const family = await prisma.family.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FamilyFindUniqueOrThrowArgs>(args: SelectSubset<T, FamilyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Family that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyFindFirstArgs} args - Arguments to find a Family
     * @example
     * // Get one Family
     * const family = await prisma.family.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FamilyFindFirstArgs>(args?: SelectSubset<T, FamilyFindFirstArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Family that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyFindFirstOrThrowArgs} args - Arguments to find a Family
     * @example
     * // Get one Family
     * const family = await prisma.family.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FamilyFindFirstOrThrowArgs>(args?: SelectSubset<T, FamilyFindFirstOrThrowArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Families that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Families
     * const families = await prisma.family.findMany()
     * 
     * // Get first 10 Families
     * const families = await prisma.family.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const familyWithIdOnly = await prisma.family.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FamilyFindManyArgs>(args?: SelectSubset<T, FamilyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Family.
     * @param {FamilyCreateArgs} args - Arguments to create a Family.
     * @example
     * // Create one Family
     * const Family = await prisma.family.create({
     *   data: {
     *     // ... data to create a Family
     *   }
     * })
     * 
     */
    create<T extends FamilyCreateArgs>(args: SelectSubset<T, FamilyCreateArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Families.
     * @param {FamilyCreateManyArgs} args - Arguments to create many Families.
     * @example
     * // Create many Families
     * const family = await prisma.family.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FamilyCreateManyArgs>(args?: SelectSubset<T, FamilyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Families and returns the data saved in the database.
     * @param {FamilyCreateManyAndReturnArgs} args - Arguments to create many Families.
     * @example
     * // Create many Families
     * const family = await prisma.family.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Families and only return the `id`
     * const familyWithIdOnly = await prisma.family.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FamilyCreateManyAndReturnArgs>(args?: SelectSubset<T, FamilyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Family.
     * @param {FamilyDeleteArgs} args - Arguments to delete one Family.
     * @example
     * // Delete one Family
     * const Family = await prisma.family.delete({
     *   where: {
     *     // ... filter to delete one Family
     *   }
     * })
     * 
     */
    delete<T extends FamilyDeleteArgs>(args: SelectSubset<T, FamilyDeleteArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Family.
     * @param {FamilyUpdateArgs} args - Arguments to update one Family.
     * @example
     * // Update one Family
     * const family = await prisma.family.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FamilyUpdateArgs>(args: SelectSubset<T, FamilyUpdateArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Families.
     * @param {FamilyDeleteManyArgs} args - Arguments to filter Families to delete.
     * @example
     * // Delete a few Families
     * const { count } = await prisma.family.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FamilyDeleteManyArgs>(args?: SelectSubset<T, FamilyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Families.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Families
     * const family = await prisma.family.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FamilyUpdateManyArgs>(args: SelectSubset<T, FamilyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Family.
     * @param {FamilyUpsertArgs} args - Arguments to update or create a Family.
     * @example
     * // Update or create a Family
     * const family = await prisma.family.upsert({
     *   create: {
     *     // ... data to create a Family
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Family we want to update
     *   }
     * })
     */
    upsert<T extends FamilyUpsertArgs>(args: SelectSubset<T, FamilyUpsertArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Families.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyCountArgs} args - Arguments to filter Families to count.
     * @example
     * // Count the number of Families
     * const count = await prisma.family.count({
     *   where: {
     *     // ... the filter for the Families we want to count
     *   }
     * })
    **/
    count<T extends FamilyCountArgs>(
      args?: Subset<T, FamilyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FamilyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Family.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FamilyAggregateArgs>(args: Subset<T, FamilyAggregateArgs>): Prisma.PrismaPromise<GetFamilyAggregateType<T>>

    /**
     * Group by Family.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyGroupByArgs} args - Group by arguments.
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
      T extends FamilyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FamilyGroupByArgs['orderBy'] }
        : { orderBy?: FamilyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FamilyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFamilyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Family model
   */
  readonly fields: FamilyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Family.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FamilyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Family$usersArgs<ExtArgs> = {}>(args?: Subset<T, Family$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany"> | Null>
    pointRules<T extends Family$pointRulesArgs<ExtArgs> = {}>(args?: Subset<T, Family$pointRulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointRulePayload<ExtArgs>, T, "findMany"> | Null>
    rewardItems<T extends Family$rewardItemsArgs<ExtArgs> = {}>(args?: Subset<T, Family$rewardItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewardItemPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Family model
   */ 
  interface FamilyFieldRefs {
    readonly id: FieldRef<"Family", 'String'>
    readonly name: FieldRef<"Family", 'String'>
    readonly createdAt: FieldRef<"Family", 'DateTime'>
    readonly updatedAt: FieldRef<"Family", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Family findUnique
   */
  export type FamilyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Family to fetch.
     */
    where: FamilyWhereUniqueInput
  }

  /**
   * Family findUniqueOrThrow
   */
  export type FamilyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Family to fetch.
     */
    where: FamilyWhereUniqueInput
  }

  /**
   * Family findFirst
   */
  export type FamilyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Family to fetch.
     */
    where?: FamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Families to fetch.
     */
    orderBy?: FamilyOrderByWithRelationInput | FamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Families.
     */
    cursor?: FamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Families.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Families.
     */
    distinct?: FamilyScalarFieldEnum | FamilyScalarFieldEnum[]
  }

  /**
   * Family findFirstOrThrow
   */
  export type FamilyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Family to fetch.
     */
    where?: FamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Families to fetch.
     */
    orderBy?: FamilyOrderByWithRelationInput | FamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Families.
     */
    cursor?: FamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Families.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Families.
     */
    distinct?: FamilyScalarFieldEnum | FamilyScalarFieldEnum[]
  }

  /**
   * Family findMany
   */
  export type FamilyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Families to fetch.
     */
    where?: FamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Families to fetch.
     */
    orderBy?: FamilyOrderByWithRelationInput | FamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Families.
     */
    cursor?: FamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Families.
     */
    skip?: number
    distinct?: FamilyScalarFieldEnum | FamilyScalarFieldEnum[]
  }

  /**
   * Family create
   */
  export type FamilyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * The data needed to create a Family.
     */
    data: XOR<FamilyCreateInput, FamilyUncheckedCreateInput>
  }

  /**
   * Family createMany
   */
  export type FamilyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Families.
     */
    data: FamilyCreateManyInput | FamilyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Family createManyAndReturn
   */
  export type FamilyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Families.
     */
    data: FamilyCreateManyInput | FamilyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Family update
   */
  export type FamilyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * The data needed to update a Family.
     */
    data: XOR<FamilyUpdateInput, FamilyUncheckedUpdateInput>
    /**
     * Choose, which Family to update.
     */
    where: FamilyWhereUniqueInput
  }

  /**
   * Family updateMany
   */
  export type FamilyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Families.
     */
    data: XOR<FamilyUpdateManyMutationInput, FamilyUncheckedUpdateManyInput>
    /**
     * Filter which Families to update
     */
    where?: FamilyWhereInput
  }

  /**
   * Family upsert
   */
  export type FamilyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * The filter to search for the Family to update in case it exists.
     */
    where: FamilyWhereUniqueInput
    /**
     * In case the Family found by the `where` argument doesn't exist, create a new Family with this data.
     */
    create: XOR<FamilyCreateInput, FamilyUncheckedCreateInput>
    /**
     * In case the Family was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FamilyUpdateInput, FamilyUncheckedUpdateInput>
  }

  /**
   * Family delete
   */
  export type FamilyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter which Family to delete.
     */
    where: FamilyWhereUniqueInput
  }

  /**
   * Family deleteMany
   */
  export type FamilyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Families to delete
     */
    where?: FamilyWhereInput
  }

  /**
   * Family.users
   */
  export type Family$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Family.pointRules
   */
  export type Family$pointRulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRule
     */
    select?: PointRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleInclude<ExtArgs> | null
    where?: PointRuleWhereInput
    orderBy?: PointRuleOrderByWithRelationInput | PointRuleOrderByWithRelationInput[]
    cursor?: PointRuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PointRuleScalarFieldEnum | PointRuleScalarFieldEnum[]
  }

  /**
   * Family.rewardItems
   */
  export type Family$rewardItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardItem
     */
    select?: RewardItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardItemInclude<ExtArgs> | null
    where?: RewardItemWhereInput
    orderBy?: RewardItemOrderByWithRelationInput | RewardItemOrderByWithRelationInput[]
    cursor?: RewardItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RewardItemScalarFieldEnum | RewardItemScalarFieldEnum[]
  }

  /**
   * Family without action
   */
  export type FamilyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    totalEarnedPoints: number | null
    level: number | null
    streak: number | null
  }

  export type UserSumAggregateOutputType = {
    totalEarnedPoints: number | null
    level: number | null
    streak: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    role: $Enums.Role | null
    pin: string | null
    password: string | null
    familyId: string | null
    avatarUrl: string | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    totalEarnedPoints: number | null
    level: number | null
    streak: number | null
    lastCheckIn: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    role: $Enums.Role | null
    pin: string | null
    password: string | null
    familyId: string | null
    avatarUrl: string | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    totalEarnedPoints: number | null
    level: number | null
    streak: number | null
    lastCheckIn: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    role: number
    pin: number
    password: number
    familyId: number
    avatarUrl: number
    isDeleted: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    totalEarnedPoints: number
    level: number
    streak: number
    lastCheckIn: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    totalEarnedPoints?: true
    level?: true
    streak?: true
  }

  export type UserSumAggregateInputType = {
    totalEarnedPoints?: true
    level?: true
    streak?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    role?: true
    pin?: true
    password?: true
    familyId?: true
    avatarUrl?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    totalEarnedPoints?: true
    level?: true
    streak?: true
    lastCheckIn?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    role?: true
    pin?: true
    password?: true
    familyId?: true
    avatarUrl?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    totalEarnedPoints?: true
    level?: true
    streak?: true
    lastCheckIn?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    role?: true
    pin?: true
    password?: true
    familyId?: true
    avatarUrl?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    totalEarnedPoints?: true
    level?: true
    streak?: true
    lastCheckIn?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    role: $Enums.Role
    pin: string | null
    password: string | null
    familyId: string
    avatarUrl: string | null
    isDeleted: boolean
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    totalEarnedPoints: number
    level: number
    streak: number
    lastCheckIn: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    name?: boolean
    role?: boolean
    pin?: boolean
    password?: boolean
    familyId?: boolean
    avatarUrl?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    totalEarnedPoints?: boolean
    level?: boolean
    streak?: boolean
    lastCheckIn?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    pointAccount?: boolean | User$pointAccountArgs<ExtArgs>
    pointRecords?: boolean | User$pointRecordsArgs<ExtArgs>
    pet?: boolean | User$petArgs<ExtArgs>
    taskPlans?: boolean | User$taskPlansArgs<ExtArgs>
    taskLogs?: boolean | User$taskLogsArgs<ExtArgs>
    redeemLogs?: boolean | User$redeemLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    pin?: boolean
    password?: boolean
    familyId?: boolean
    avatarUrl?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    totalEarnedPoints?: boolean
    level?: boolean
    streak?: boolean
    lastCheckIn?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    role?: boolean
    pin?: boolean
    password?: boolean
    familyId?: boolean
    avatarUrl?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    totalEarnedPoints?: boolean
    level?: boolean
    streak?: boolean
    lastCheckIn?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    pointAccount?: boolean | User$pointAccountArgs<ExtArgs>
    pointRecords?: boolean | User$pointRecordsArgs<ExtArgs>
    pet?: boolean | User$petArgs<ExtArgs>
    taskPlans?: boolean | User$taskPlansArgs<ExtArgs>
    taskLogs?: boolean | User$taskLogsArgs<ExtArgs>
    redeemLogs?: boolean | User$redeemLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      family: Prisma.$FamilyPayload<ExtArgs>
      pointAccount: Prisma.$PointAccountPayload<ExtArgs> | null
      pointRecords: Prisma.$PointRecordPayload<ExtArgs>[]
      pet: Prisma.$PetPayload<ExtArgs> | null
      taskPlans: Prisma.$TaskPlanPayload<ExtArgs>[]
      taskLogs: Prisma.$TaskLogPayload<ExtArgs>[]
      redeemLogs: Prisma.$RedeemLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      role: $Enums.Role
      pin: string | null
      password: string | null
      familyId: string
      avatarUrl: string | null
      isDeleted: boolean
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
      totalEarnedPoints: number
      level: number
      streak: number
      lastCheckIn: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

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
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    family<T extends FamilyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FamilyDefaultArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    pointAccount<T extends User$pointAccountArgs<ExtArgs> = {}>(args?: Subset<T, User$pointAccountArgs<ExtArgs>>): Prisma__PointAccountClient<$Result.GetResult<Prisma.$PointAccountPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    pointRecords<T extends User$pointRecordsArgs<ExtArgs> = {}>(args?: Subset<T, User$pointRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointRecordPayload<ExtArgs>, T, "findMany"> | Null>
    pet<T extends User$petArgs<ExtArgs> = {}>(args?: Subset<T, User$petArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    taskPlans<T extends User$taskPlansArgs<ExtArgs> = {}>(args?: Subset<T, User$taskPlansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPlanPayload<ExtArgs>, T, "findMany"> | Null>
    taskLogs<T extends User$taskLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$taskLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findMany"> | Null>
    redeemLogs<T extends User$redeemLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$redeemLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RedeemLogPayload<ExtArgs>, T, "findMany"> | Null>
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
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly pin: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly familyId: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly isDeleted: FieldRef<"User", 'Boolean'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly totalEarnedPoints: FieldRef<"User", 'Int'>
    readonly level: FieldRef<"User", 'Int'>
    readonly streak: FieldRef<"User", 'Int'>
    readonly lastCheckIn: FieldRef<"User", 'DateTime'>
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
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
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
  }

  /**
   * User.pointAccount
   */
  export type User$pointAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointAccount
     */
    select?: PointAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointAccountInclude<ExtArgs> | null
    where?: PointAccountWhereInput
  }

  /**
   * User.pointRecords
   */
  export type User$pointRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRecord
     */
    select?: PointRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRecordInclude<ExtArgs> | null
    where?: PointRecordWhereInput
    orderBy?: PointRecordOrderByWithRelationInput | PointRecordOrderByWithRelationInput[]
    cursor?: PointRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PointRecordScalarFieldEnum | PointRecordScalarFieldEnum[]
  }

  /**
   * User.pet
   */
  export type User$petArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    where?: PetWhereInput
  }

  /**
   * User.taskPlans
   */
  export type User$taskPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPlan
     */
    select?: TaskPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPlanInclude<ExtArgs> | null
    where?: TaskPlanWhereInput
    orderBy?: TaskPlanOrderByWithRelationInput | TaskPlanOrderByWithRelationInput[]
    cursor?: TaskPlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskPlanScalarFieldEnum | TaskPlanScalarFieldEnum[]
  }

  /**
   * User.taskLogs
   */
  export type User$taskLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    where?: TaskLogWhereInput
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    cursor?: TaskLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskLogScalarFieldEnum | TaskLogScalarFieldEnum[]
  }

  /**
   * User.redeemLogs
   */
  export type User$redeemLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemLog
     */
    select?: RedeemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedeemLogInclude<ExtArgs> | null
    where?: RedeemLogWhereInput
    orderBy?: RedeemLogOrderByWithRelationInput | RedeemLogOrderByWithRelationInput[]
    cursor?: RedeemLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RedeemLogScalarFieldEnum | RedeemLogScalarFieldEnum[]
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model PointRule
   */

  export type AggregatePointRule = {
    _count: PointRuleCountAggregateOutputType | null
    _avg: PointRuleAvgAggregateOutputType | null
    _sum: PointRuleSumAggregateOutputType | null
    _min: PointRuleMinAggregateOutputType | null
    _max: PointRuleMaxAggregateOutputType | null
  }

  export type PointRuleAvgAggregateOutputType = {
    points: number | null
    pointsMin: number | null
    pointsMax: number | null
    maxTimes: number | null
  }

  export type PointRuleSumAggregateOutputType = {
    points: number | null
    pointsMin: number | null
    pointsMax: number | null
    maxTimes: number | null
  }

  export type PointRuleMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    pointsType: $Enums.PointsType | null
    points: number | null
    pointsMin: number | null
    pointsMax: number | null
    needApproval: boolean | null
    frequency: $Enums.Frequency | null
    maxTimes: number | null
    enabled: boolean | null
    familyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PointRuleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    pointsType: $Enums.PointsType | null
    points: number | null
    pointsMin: number | null
    pointsMax: number | null
    needApproval: boolean | null
    frequency: $Enums.Frequency | null
    maxTimes: number | null
    enabled: boolean | null
    familyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PointRuleCountAggregateOutputType = {
    id: number
    name: number
    description: number
    category: number
    pointsType: number
    points: number
    pointsMin: number
    pointsMax: number
    needApproval: number
    frequency: number
    maxTimes: number
    enabled: number
    familyId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PointRuleAvgAggregateInputType = {
    points?: true
    pointsMin?: true
    pointsMax?: true
    maxTimes?: true
  }

  export type PointRuleSumAggregateInputType = {
    points?: true
    pointsMin?: true
    pointsMax?: true
    maxTimes?: true
  }

  export type PointRuleMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    pointsType?: true
    points?: true
    pointsMin?: true
    pointsMax?: true
    needApproval?: true
    frequency?: true
    maxTimes?: true
    enabled?: true
    familyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PointRuleMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    pointsType?: true
    points?: true
    pointsMin?: true
    pointsMax?: true
    needApproval?: true
    frequency?: true
    maxTimes?: true
    enabled?: true
    familyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PointRuleCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    pointsType?: true
    points?: true
    pointsMin?: true
    pointsMax?: true
    needApproval?: true
    frequency?: true
    maxTimes?: true
    enabled?: true
    familyId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PointRuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PointRule to aggregate.
     */
    where?: PointRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointRules to fetch.
     */
    orderBy?: PointRuleOrderByWithRelationInput | PointRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PointRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PointRules
    **/
    _count?: true | PointRuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PointRuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PointRuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PointRuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PointRuleMaxAggregateInputType
  }

  export type GetPointRuleAggregateType<T extends PointRuleAggregateArgs> = {
        [P in keyof T & keyof AggregatePointRule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePointRule[P]>
      : GetScalarType<T[P], AggregatePointRule[P]>
  }




  export type PointRuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PointRuleWhereInput
    orderBy?: PointRuleOrderByWithAggregationInput | PointRuleOrderByWithAggregationInput[]
    by: PointRuleScalarFieldEnum[] | PointRuleScalarFieldEnum
    having?: PointRuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PointRuleCountAggregateInputType | true
    _avg?: PointRuleAvgAggregateInputType
    _sum?: PointRuleSumAggregateInputType
    _min?: PointRuleMinAggregateInputType
    _max?: PointRuleMaxAggregateInputType
  }

  export type PointRuleGroupByOutputType = {
    id: string
    name: string
    description: string | null
    category: string
    pointsType: $Enums.PointsType
    points: number
    pointsMin: number | null
    pointsMax: number | null
    needApproval: boolean
    frequency: $Enums.Frequency
    maxTimes: number | null
    enabled: boolean
    familyId: string
    createdAt: Date
    updatedAt: Date
    _count: PointRuleCountAggregateOutputType | null
    _avg: PointRuleAvgAggregateOutputType | null
    _sum: PointRuleSumAggregateOutputType | null
    _min: PointRuleMinAggregateOutputType | null
    _max: PointRuleMaxAggregateOutputType | null
  }

  type GetPointRuleGroupByPayload<T extends PointRuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PointRuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PointRuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PointRuleGroupByOutputType[P]>
            : GetScalarType<T[P], PointRuleGroupByOutputType[P]>
        }
      >
    >


  export type PointRuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    pointsType?: boolean
    points?: boolean
    pointsMin?: boolean
    pointsMax?: boolean
    needApproval?: boolean
    frequency?: boolean
    maxTimes?: boolean
    enabled?: boolean
    familyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    targets?: boolean | PointRule$targetsArgs<ExtArgs>
    records?: boolean | PointRule$recordsArgs<ExtArgs>
    _count?: boolean | PointRuleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pointRule"]>

  export type PointRuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    pointsType?: boolean
    points?: boolean
    pointsMin?: boolean
    pointsMax?: boolean
    needApproval?: boolean
    frequency?: boolean
    maxTimes?: boolean
    enabled?: boolean
    familyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pointRule"]>

  export type PointRuleSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    pointsType?: boolean
    points?: boolean
    pointsMin?: boolean
    pointsMax?: boolean
    needApproval?: boolean
    frequency?: boolean
    maxTimes?: boolean
    enabled?: boolean
    familyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PointRuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    targets?: boolean | PointRule$targetsArgs<ExtArgs>
    records?: boolean | PointRule$recordsArgs<ExtArgs>
    _count?: boolean | PointRuleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PointRuleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }

  export type $PointRulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PointRule"
    objects: {
      family: Prisma.$FamilyPayload<ExtArgs>
      targets: Prisma.$PointRuleTargetPayload<ExtArgs>[]
      records: Prisma.$PointRecordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      category: string
      pointsType: $Enums.PointsType
      points: number
      pointsMin: number | null
      pointsMax: number | null
      needApproval: boolean
      frequency: $Enums.Frequency
      maxTimes: number | null
      enabled: boolean
      familyId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pointRule"]>
    composites: {}
  }

  type PointRuleGetPayload<S extends boolean | null | undefined | PointRuleDefaultArgs> = $Result.GetResult<Prisma.$PointRulePayload, S>

  type PointRuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PointRuleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PointRuleCountAggregateInputType | true
    }

  export interface PointRuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PointRule'], meta: { name: 'PointRule' } }
    /**
     * Find zero or one PointRule that matches the filter.
     * @param {PointRuleFindUniqueArgs} args - Arguments to find a PointRule
     * @example
     * // Get one PointRule
     * const pointRule = await prisma.pointRule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PointRuleFindUniqueArgs>(args: SelectSubset<T, PointRuleFindUniqueArgs<ExtArgs>>): Prisma__PointRuleClient<$Result.GetResult<Prisma.$PointRulePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PointRule that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PointRuleFindUniqueOrThrowArgs} args - Arguments to find a PointRule
     * @example
     * // Get one PointRule
     * const pointRule = await prisma.pointRule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PointRuleFindUniqueOrThrowArgs>(args: SelectSubset<T, PointRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PointRuleClient<$Result.GetResult<Prisma.$PointRulePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PointRule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRuleFindFirstArgs} args - Arguments to find a PointRule
     * @example
     * // Get one PointRule
     * const pointRule = await prisma.pointRule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PointRuleFindFirstArgs>(args?: SelectSubset<T, PointRuleFindFirstArgs<ExtArgs>>): Prisma__PointRuleClient<$Result.GetResult<Prisma.$PointRulePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PointRule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRuleFindFirstOrThrowArgs} args - Arguments to find a PointRule
     * @example
     * // Get one PointRule
     * const pointRule = await prisma.pointRule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PointRuleFindFirstOrThrowArgs>(args?: SelectSubset<T, PointRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__PointRuleClient<$Result.GetResult<Prisma.$PointRulePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PointRules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PointRules
     * const pointRules = await prisma.pointRule.findMany()
     * 
     * // Get first 10 PointRules
     * const pointRules = await prisma.pointRule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pointRuleWithIdOnly = await prisma.pointRule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PointRuleFindManyArgs>(args?: SelectSubset<T, PointRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointRulePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PointRule.
     * @param {PointRuleCreateArgs} args - Arguments to create a PointRule.
     * @example
     * // Create one PointRule
     * const PointRule = await prisma.pointRule.create({
     *   data: {
     *     // ... data to create a PointRule
     *   }
     * })
     * 
     */
    create<T extends PointRuleCreateArgs>(args: SelectSubset<T, PointRuleCreateArgs<ExtArgs>>): Prisma__PointRuleClient<$Result.GetResult<Prisma.$PointRulePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PointRules.
     * @param {PointRuleCreateManyArgs} args - Arguments to create many PointRules.
     * @example
     * // Create many PointRules
     * const pointRule = await prisma.pointRule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PointRuleCreateManyArgs>(args?: SelectSubset<T, PointRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PointRules and returns the data saved in the database.
     * @param {PointRuleCreateManyAndReturnArgs} args - Arguments to create many PointRules.
     * @example
     * // Create many PointRules
     * const pointRule = await prisma.pointRule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PointRules and only return the `id`
     * const pointRuleWithIdOnly = await prisma.pointRule.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PointRuleCreateManyAndReturnArgs>(args?: SelectSubset<T, PointRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointRulePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PointRule.
     * @param {PointRuleDeleteArgs} args - Arguments to delete one PointRule.
     * @example
     * // Delete one PointRule
     * const PointRule = await prisma.pointRule.delete({
     *   where: {
     *     // ... filter to delete one PointRule
     *   }
     * })
     * 
     */
    delete<T extends PointRuleDeleteArgs>(args: SelectSubset<T, PointRuleDeleteArgs<ExtArgs>>): Prisma__PointRuleClient<$Result.GetResult<Prisma.$PointRulePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PointRule.
     * @param {PointRuleUpdateArgs} args - Arguments to update one PointRule.
     * @example
     * // Update one PointRule
     * const pointRule = await prisma.pointRule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PointRuleUpdateArgs>(args: SelectSubset<T, PointRuleUpdateArgs<ExtArgs>>): Prisma__PointRuleClient<$Result.GetResult<Prisma.$PointRulePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PointRules.
     * @param {PointRuleDeleteManyArgs} args - Arguments to filter PointRules to delete.
     * @example
     * // Delete a few PointRules
     * const { count } = await prisma.pointRule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PointRuleDeleteManyArgs>(args?: SelectSubset<T, PointRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PointRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PointRules
     * const pointRule = await prisma.pointRule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PointRuleUpdateManyArgs>(args: SelectSubset<T, PointRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PointRule.
     * @param {PointRuleUpsertArgs} args - Arguments to update or create a PointRule.
     * @example
     * // Update or create a PointRule
     * const pointRule = await prisma.pointRule.upsert({
     *   create: {
     *     // ... data to create a PointRule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PointRule we want to update
     *   }
     * })
     */
    upsert<T extends PointRuleUpsertArgs>(args: SelectSubset<T, PointRuleUpsertArgs<ExtArgs>>): Prisma__PointRuleClient<$Result.GetResult<Prisma.$PointRulePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PointRules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRuleCountArgs} args - Arguments to filter PointRules to count.
     * @example
     * // Count the number of PointRules
     * const count = await prisma.pointRule.count({
     *   where: {
     *     // ... the filter for the PointRules we want to count
     *   }
     * })
    **/
    count<T extends PointRuleCountArgs>(
      args?: Subset<T, PointRuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PointRuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PointRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PointRuleAggregateArgs>(args: Subset<T, PointRuleAggregateArgs>): Prisma.PrismaPromise<GetPointRuleAggregateType<T>>

    /**
     * Group by PointRule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRuleGroupByArgs} args - Group by arguments.
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
      T extends PointRuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PointRuleGroupByArgs['orderBy'] }
        : { orderBy?: PointRuleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PointRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPointRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PointRule model
   */
  readonly fields: PointRuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PointRule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PointRuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    family<T extends FamilyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FamilyDefaultArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    targets<T extends PointRule$targetsArgs<ExtArgs> = {}>(args?: Subset<T, PointRule$targetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointRuleTargetPayload<ExtArgs>, T, "findMany"> | Null>
    records<T extends PointRule$recordsArgs<ExtArgs> = {}>(args?: Subset<T, PointRule$recordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointRecordPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the PointRule model
   */ 
  interface PointRuleFieldRefs {
    readonly id: FieldRef<"PointRule", 'String'>
    readonly name: FieldRef<"PointRule", 'String'>
    readonly description: FieldRef<"PointRule", 'String'>
    readonly category: FieldRef<"PointRule", 'String'>
    readonly pointsType: FieldRef<"PointRule", 'PointsType'>
    readonly points: FieldRef<"PointRule", 'Int'>
    readonly pointsMin: FieldRef<"PointRule", 'Int'>
    readonly pointsMax: FieldRef<"PointRule", 'Int'>
    readonly needApproval: FieldRef<"PointRule", 'Boolean'>
    readonly frequency: FieldRef<"PointRule", 'Frequency'>
    readonly maxTimes: FieldRef<"PointRule", 'Int'>
    readonly enabled: FieldRef<"PointRule", 'Boolean'>
    readonly familyId: FieldRef<"PointRule", 'String'>
    readonly createdAt: FieldRef<"PointRule", 'DateTime'>
    readonly updatedAt: FieldRef<"PointRule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PointRule findUnique
   */
  export type PointRuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRule
     */
    select?: PointRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleInclude<ExtArgs> | null
    /**
     * Filter, which PointRule to fetch.
     */
    where: PointRuleWhereUniqueInput
  }

  /**
   * PointRule findUniqueOrThrow
   */
  export type PointRuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRule
     */
    select?: PointRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleInclude<ExtArgs> | null
    /**
     * Filter, which PointRule to fetch.
     */
    where: PointRuleWhereUniqueInput
  }

  /**
   * PointRule findFirst
   */
  export type PointRuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRule
     */
    select?: PointRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleInclude<ExtArgs> | null
    /**
     * Filter, which PointRule to fetch.
     */
    where?: PointRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointRules to fetch.
     */
    orderBy?: PointRuleOrderByWithRelationInput | PointRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PointRules.
     */
    cursor?: PointRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PointRules.
     */
    distinct?: PointRuleScalarFieldEnum | PointRuleScalarFieldEnum[]
  }

  /**
   * PointRule findFirstOrThrow
   */
  export type PointRuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRule
     */
    select?: PointRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleInclude<ExtArgs> | null
    /**
     * Filter, which PointRule to fetch.
     */
    where?: PointRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointRules to fetch.
     */
    orderBy?: PointRuleOrderByWithRelationInput | PointRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PointRules.
     */
    cursor?: PointRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointRules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PointRules.
     */
    distinct?: PointRuleScalarFieldEnum | PointRuleScalarFieldEnum[]
  }

  /**
   * PointRule findMany
   */
  export type PointRuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRule
     */
    select?: PointRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleInclude<ExtArgs> | null
    /**
     * Filter, which PointRules to fetch.
     */
    where?: PointRuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointRules to fetch.
     */
    orderBy?: PointRuleOrderByWithRelationInput | PointRuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PointRules.
     */
    cursor?: PointRuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointRules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointRules.
     */
    skip?: number
    distinct?: PointRuleScalarFieldEnum | PointRuleScalarFieldEnum[]
  }

  /**
   * PointRule create
   */
  export type PointRuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRule
     */
    select?: PointRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleInclude<ExtArgs> | null
    /**
     * The data needed to create a PointRule.
     */
    data: XOR<PointRuleCreateInput, PointRuleUncheckedCreateInput>
  }

  /**
   * PointRule createMany
   */
  export type PointRuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PointRules.
     */
    data: PointRuleCreateManyInput | PointRuleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PointRule createManyAndReturn
   */
  export type PointRuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRule
     */
    select?: PointRuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PointRules.
     */
    data: PointRuleCreateManyInput | PointRuleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PointRule update
   */
  export type PointRuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRule
     */
    select?: PointRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleInclude<ExtArgs> | null
    /**
     * The data needed to update a PointRule.
     */
    data: XOR<PointRuleUpdateInput, PointRuleUncheckedUpdateInput>
    /**
     * Choose, which PointRule to update.
     */
    where: PointRuleWhereUniqueInput
  }

  /**
   * PointRule updateMany
   */
  export type PointRuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PointRules.
     */
    data: XOR<PointRuleUpdateManyMutationInput, PointRuleUncheckedUpdateManyInput>
    /**
     * Filter which PointRules to update
     */
    where?: PointRuleWhereInput
  }

  /**
   * PointRule upsert
   */
  export type PointRuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRule
     */
    select?: PointRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleInclude<ExtArgs> | null
    /**
     * The filter to search for the PointRule to update in case it exists.
     */
    where: PointRuleWhereUniqueInput
    /**
     * In case the PointRule found by the `where` argument doesn't exist, create a new PointRule with this data.
     */
    create: XOR<PointRuleCreateInput, PointRuleUncheckedCreateInput>
    /**
     * In case the PointRule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PointRuleUpdateInput, PointRuleUncheckedUpdateInput>
  }

  /**
   * PointRule delete
   */
  export type PointRuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRule
     */
    select?: PointRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleInclude<ExtArgs> | null
    /**
     * Filter which PointRule to delete.
     */
    where: PointRuleWhereUniqueInput
  }

  /**
   * PointRule deleteMany
   */
  export type PointRuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PointRules to delete
     */
    where?: PointRuleWhereInput
  }

  /**
   * PointRule.targets
   */
  export type PointRule$targetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRuleTarget
     */
    select?: PointRuleTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleTargetInclude<ExtArgs> | null
    where?: PointRuleTargetWhereInput
    orderBy?: PointRuleTargetOrderByWithRelationInput | PointRuleTargetOrderByWithRelationInput[]
    cursor?: PointRuleTargetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PointRuleTargetScalarFieldEnum | PointRuleTargetScalarFieldEnum[]
  }

  /**
   * PointRule.records
   */
  export type PointRule$recordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRecord
     */
    select?: PointRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRecordInclude<ExtArgs> | null
    where?: PointRecordWhereInput
    orderBy?: PointRecordOrderByWithRelationInput | PointRecordOrderByWithRelationInput[]
    cursor?: PointRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PointRecordScalarFieldEnum | PointRecordScalarFieldEnum[]
  }

  /**
   * PointRule without action
   */
  export type PointRuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRule
     */
    select?: PointRuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleInclude<ExtArgs> | null
  }


  /**
   * Model PointRuleTarget
   */

  export type AggregatePointRuleTarget = {
    _count: PointRuleTargetCountAggregateOutputType | null
    _min: PointRuleTargetMinAggregateOutputType | null
    _max: PointRuleTargetMaxAggregateOutputType | null
  }

  export type PointRuleTargetMinAggregateOutputType = {
    id: string | null
    pointRuleId: string | null
    childId: string | null
  }

  export type PointRuleTargetMaxAggregateOutputType = {
    id: string | null
    pointRuleId: string | null
    childId: string | null
  }

  export type PointRuleTargetCountAggregateOutputType = {
    id: number
    pointRuleId: number
    childId: number
    _all: number
  }


  export type PointRuleTargetMinAggregateInputType = {
    id?: true
    pointRuleId?: true
    childId?: true
  }

  export type PointRuleTargetMaxAggregateInputType = {
    id?: true
    pointRuleId?: true
    childId?: true
  }

  export type PointRuleTargetCountAggregateInputType = {
    id?: true
    pointRuleId?: true
    childId?: true
    _all?: true
  }

  export type PointRuleTargetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PointRuleTarget to aggregate.
     */
    where?: PointRuleTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointRuleTargets to fetch.
     */
    orderBy?: PointRuleTargetOrderByWithRelationInput | PointRuleTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PointRuleTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointRuleTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointRuleTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PointRuleTargets
    **/
    _count?: true | PointRuleTargetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PointRuleTargetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PointRuleTargetMaxAggregateInputType
  }

  export type GetPointRuleTargetAggregateType<T extends PointRuleTargetAggregateArgs> = {
        [P in keyof T & keyof AggregatePointRuleTarget]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePointRuleTarget[P]>
      : GetScalarType<T[P], AggregatePointRuleTarget[P]>
  }




  export type PointRuleTargetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PointRuleTargetWhereInput
    orderBy?: PointRuleTargetOrderByWithAggregationInput | PointRuleTargetOrderByWithAggregationInput[]
    by: PointRuleTargetScalarFieldEnum[] | PointRuleTargetScalarFieldEnum
    having?: PointRuleTargetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PointRuleTargetCountAggregateInputType | true
    _min?: PointRuleTargetMinAggregateInputType
    _max?: PointRuleTargetMaxAggregateInputType
  }

  export type PointRuleTargetGroupByOutputType = {
    id: string
    pointRuleId: string
    childId: string
    _count: PointRuleTargetCountAggregateOutputType | null
    _min: PointRuleTargetMinAggregateOutputType | null
    _max: PointRuleTargetMaxAggregateOutputType | null
  }

  type GetPointRuleTargetGroupByPayload<T extends PointRuleTargetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PointRuleTargetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PointRuleTargetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PointRuleTargetGroupByOutputType[P]>
            : GetScalarType<T[P], PointRuleTargetGroupByOutputType[P]>
        }
      >
    >


  export type PointRuleTargetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pointRuleId?: boolean
    childId?: boolean
    pointRule?: boolean | PointRuleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pointRuleTarget"]>

  export type PointRuleTargetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pointRuleId?: boolean
    childId?: boolean
    pointRule?: boolean | PointRuleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pointRuleTarget"]>

  export type PointRuleTargetSelectScalar = {
    id?: boolean
    pointRuleId?: boolean
    childId?: boolean
  }

  export type PointRuleTargetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pointRule?: boolean | PointRuleDefaultArgs<ExtArgs>
  }
  export type PointRuleTargetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pointRule?: boolean | PointRuleDefaultArgs<ExtArgs>
  }

  export type $PointRuleTargetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PointRuleTarget"
    objects: {
      pointRule: Prisma.$PointRulePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      pointRuleId: string
      childId: string
    }, ExtArgs["result"]["pointRuleTarget"]>
    composites: {}
  }

  type PointRuleTargetGetPayload<S extends boolean | null | undefined | PointRuleTargetDefaultArgs> = $Result.GetResult<Prisma.$PointRuleTargetPayload, S>

  type PointRuleTargetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PointRuleTargetFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PointRuleTargetCountAggregateInputType | true
    }

  export interface PointRuleTargetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PointRuleTarget'], meta: { name: 'PointRuleTarget' } }
    /**
     * Find zero or one PointRuleTarget that matches the filter.
     * @param {PointRuleTargetFindUniqueArgs} args - Arguments to find a PointRuleTarget
     * @example
     * // Get one PointRuleTarget
     * const pointRuleTarget = await prisma.pointRuleTarget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PointRuleTargetFindUniqueArgs>(args: SelectSubset<T, PointRuleTargetFindUniqueArgs<ExtArgs>>): Prisma__PointRuleTargetClient<$Result.GetResult<Prisma.$PointRuleTargetPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PointRuleTarget that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PointRuleTargetFindUniqueOrThrowArgs} args - Arguments to find a PointRuleTarget
     * @example
     * // Get one PointRuleTarget
     * const pointRuleTarget = await prisma.pointRuleTarget.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PointRuleTargetFindUniqueOrThrowArgs>(args: SelectSubset<T, PointRuleTargetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PointRuleTargetClient<$Result.GetResult<Prisma.$PointRuleTargetPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PointRuleTarget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRuleTargetFindFirstArgs} args - Arguments to find a PointRuleTarget
     * @example
     * // Get one PointRuleTarget
     * const pointRuleTarget = await prisma.pointRuleTarget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PointRuleTargetFindFirstArgs>(args?: SelectSubset<T, PointRuleTargetFindFirstArgs<ExtArgs>>): Prisma__PointRuleTargetClient<$Result.GetResult<Prisma.$PointRuleTargetPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PointRuleTarget that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRuleTargetFindFirstOrThrowArgs} args - Arguments to find a PointRuleTarget
     * @example
     * // Get one PointRuleTarget
     * const pointRuleTarget = await prisma.pointRuleTarget.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PointRuleTargetFindFirstOrThrowArgs>(args?: SelectSubset<T, PointRuleTargetFindFirstOrThrowArgs<ExtArgs>>): Prisma__PointRuleTargetClient<$Result.GetResult<Prisma.$PointRuleTargetPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PointRuleTargets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRuleTargetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PointRuleTargets
     * const pointRuleTargets = await prisma.pointRuleTarget.findMany()
     * 
     * // Get first 10 PointRuleTargets
     * const pointRuleTargets = await prisma.pointRuleTarget.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pointRuleTargetWithIdOnly = await prisma.pointRuleTarget.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PointRuleTargetFindManyArgs>(args?: SelectSubset<T, PointRuleTargetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointRuleTargetPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PointRuleTarget.
     * @param {PointRuleTargetCreateArgs} args - Arguments to create a PointRuleTarget.
     * @example
     * // Create one PointRuleTarget
     * const PointRuleTarget = await prisma.pointRuleTarget.create({
     *   data: {
     *     // ... data to create a PointRuleTarget
     *   }
     * })
     * 
     */
    create<T extends PointRuleTargetCreateArgs>(args: SelectSubset<T, PointRuleTargetCreateArgs<ExtArgs>>): Prisma__PointRuleTargetClient<$Result.GetResult<Prisma.$PointRuleTargetPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PointRuleTargets.
     * @param {PointRuleTargetCreateManyArgs} args - Arguments to create many PointRuleTargets.
     * @example
     * // Create many PointRuleTargets
     * const pointRuleTarget = await prisma.pointRuleTarget.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PointRuleTargetCreateManyArgs>(args?: SelectSubset<T, PointRuleTargetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PointRuleTargets and returns the data saved in the database.
     * @param {PointRuleTargetCreateManyAndReturnArgs} args - Arguments to create many PointRuleTargets.
     * @example
     * // Create many PointRuleTargets
     * const pointRuleTarget = await prisma.pointRuleTarget.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PointRuleTargets and only return the `id`
     * const pointRuleTargetWithIdOnly = await prisma.pointRuleTarget.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PointRuleTargetCreateManyAndReturnArgs>(args?: SelectSubset<T, PointRuleTargetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointRuleTargetPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PointRuleTarget.
     * @param {PointRuleTargetDeleteArgs} args - Arguments to delete one PointRuleTarget.
     * @example
     * // Delete one PointRuleTarget
     * const PointRuleTarget = await prisma.pointRuleTarget.delete({
     *   where: {
     *     // ... filter to delete one PointRuleTarget
     *   }
     * })
     * 
     */
    delete<T extends PointRuleTargetDeleteArgs>(args: SelectSubset<T, PointRuleTargetDeleteArgs<ExtArgs>>): Prisma__PointRuleTargetClient<$Result.GetResult<Prisma.$PointRuleTargetPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PointRuleTarget.
     * @param {PointRuleTargetUpdateArgs} args - Arguments to update one PointRuleTarget.
     * @example
     * // Update one PointRuleTarget
     * const pointRuleTarget = await prisma.pointRuleTarget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PointRuleTargetUpdateArgs>(args: SelectSubset<T, PointRuleTargetUpdateArgs<ExtArgs>>): Prisma__PointRuleTargetClient<$Result.GetResult<Prisma.$PointRuleTargetPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PointRuleTargets.
     * @param {PointRuleTargetDeleteManyArgs} args - Arguments to filter PointRuleTargets to delete.
     * @example
     * // Delete a few PointRuleTargets
     * const { count } = await prisma.pointRuleTarget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PointRuleTargetDeleteManyArgs>(args?: SelectSubset<T, PointRuleTargetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PointRuleTargets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRuleTargetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PointRuleTargets
     * const pointRuleTarget = await prisma.pointRuleTarget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PointRuleTargetUpdateManyArgs>(args: SelectSubset<T, PointRuleTargetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PointRuleTarget.
     * @param {PointRuleTargetUpsertArgs} args - Arguments to update or create a PointRuleTarget.
     * @example
     * // Update or create a PointRuleTarget
     * const pointRuleTarget = await prisma.pointRuleTarget.upsert({
     *   create: {
     *     // ... data to create a PointRuleTarget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PointRuleTarget we want to update
     *   }
     * })
     */
    upsert<T extends PointRuleTargetUpsertArgs>(args: SelectSubset<T, PointRuleTargetUpsertArgs<ExtArgs>>): Prisma__PointRuleTargetClient<$Result.GetResult<Prisma.$PointRuleTargetPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PointRuleTargets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRuleTargetCountArgs} args - Arguments to filter PointRuleTargets to count.
     * @example
     * // Count the number of PointRuleTargets
     * const count = await prisma.pointRuleTarget.count({
     *   where: {
     *     // ... the filter for the PointRuleTargets we want to count
     *   }
     * })
    **/
    count<T extends PointRuleTargetCountArgs>(
      args?: Subset<T, PointRuleTargetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PointRuleTargetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PointRuleTarget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRuleTargetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PointRuleTargetAggregateArgs>(args: Subset<T, PointRuleTargetAggregateArgs>): Prisma.PrismaPromise<GetPointRuleTargetAggregateType<T>>

    /**
     * Group by PointRuleTarget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRuleTargetGroupByArgs} args - Group by arguments.
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
      T extends PointRuleTargetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PointRuleTargetGroupByArgs['orderBy'] }
        : { orderBy?: PointRuleTargetGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PointRuleTargetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPointRuleTargetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PointRuleTarget model
   */
  readonly fields: PointRuleTargetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PointRuleTarget.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PointRuleTargetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pointRule<T extends PointRuleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PointRuleDefaultArgs<ExtArgs>>): Prisma__PointRuleClient<$Result.GetResult<Prisma.$PointRulePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the PointRuleTarget model
   */ 
  interface PointRuleTargetFieldRefs {
    readonly id: FieldRef<"PointRuleTarget", 'String'>
    readonly pointRuleId: FieldRef<"PointRuleTarget", 'String'>
    readonly childId: FieldRef<"PointRuleTarget", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PointRuleTarget findUnique
   */
  export type PointRuleTargetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRuleTarget
     */
    select?: PointRuleTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleTargetInclude<ExtArgs> | null
    /**
     * Filter, which PointRuleTarget to fetch.
     */
    where: PointRuleTargetWhereUniqueInput
  }

  /**
   * PointRuleTarget findUniqueOrThrow
   */
  export type PointRuleTargetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRuleTarget
     */
    select?: PointRuleTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleTargetInclude<ExtArgs> | null
    /**
     * Filter, which PointRuleTarget to fetch.
     */
    where: PointRuleTargetWhereUniqueInput
  }

  /**
   * PointRuleTarget findFirst
   */
  export type PointRuleTargetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRuleTarget
     */
    select?: PointRuleTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleTargetInclude<ExtArgs> | null
    /**
     * Filter, which PointRuleTarget to fetch.
     */
    where?: PointRuleTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointRuleTargets to fetch.
     */
    orderBy?: PointRuleTargetOrderByWithRelationInput | PointRuleTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PointRuleTargets.
     */
    cursor?: PointRuleTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointRuleTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointRuleTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PointRuleTargets.
     */
    distinct?: PointRuleTargetScalarFieldEnum | PointRuleTargetScalarFieldEnum[]
  }

  /**
   * PointRuleTarget findFirstOrThrow
   */
  export type PointRuleTargetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRuleTarget
     */
    select?: PointRuleTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleTargetInclude<ExtArgs> | null
    /**
     * Filter, which PointRuleTarget to fetch.
     */
    where?: PointRuleTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointRuleTargets to fetch.
     */
    orderBy?: PointRuleTargetOrderByWithRelationInput | PointRuleTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PointRuleTargets.
     */
    cursor?: PointRuleTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointRuleTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointRuleTargets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PointRuleTargets.
     */
    distinct?: PointRuleTargetScalarFieldEnum | PointRuleTargetScalarFieldEnum[]
  }

  /**
   * PointRuleTarget findMany
   */
  export type PointRuleTargetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRuleTarget
     */
    select?: PointRuleTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleTargetInclude<ExtArgs> | null
    /**
     * Filter, which PointRuleTargets to fetch.
     */
    where?: PointRuleTargetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointRuleTargets to fetch.
     */
    orderBy?: PointRuleTargetOrderByWithRelationInput | PointRuleTargetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PointRuleTargets.
     */
    cursor?: PointRuleTargetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointRuleTargets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointRuleTargets.
     */
    skip?: number
    distinct?: PointRuleTargetScalarFieldEnum | PointRuleTargetScalarFieldEnum[]
  }

  /**
   * PointRuleTarget create
   */
  export type PointRuleTargetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRuleTarget
     */
    select?: PointRuleTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleTargetInclude<ExtArgs> | null
    /**
     * The data needed to create a PointRuleTarget.
     */
    data: XOR<PointRuleTargetCreateInput, PointRuleTargetUncheckedCreateInput>
  }

  /**
   * PointRuleTarget createMany
   */
  export type PointRuleTargetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PointRuleTargets.
     */
    data: PointRuleTargetCreateManyInput | PointRuleTargetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PointRuleTarget createManyAndReturn
   */
  export type PointRuleTargetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRuleTarget
     */
    select?: PointRuleTargetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PointRuleTargets.
     */
    data: PointRuleTargetCreateManyInput | PointRuleTargetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleTargetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PointRuleTarget update
   */
  export type PointRuleTargetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRuleTarget
     */
    select?: PointRuleTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleTargetInclude<ExtArgs> | null
    /**
     * The data needed to update a PointRuleTarget.
     */
    data: XOR<PointRuleTargetUpdateInput, PointRuleTargetUncheckedUpdateInput>
    /**
     * Choose, which PointRuleTarget to update.
     */
    where: PointRuleTargetWhereUniqueInput
  }

  /**
   * PointRuleTarget updateMany
   */
  export type PointRuleTargetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PointRuleTargets.
     */
    data: XOR<PointRuleTargetUpdateManyMutationInput, PointRuleTargetUncheckedUpdateManyInput>
    /**
     * Filter which PointRuleTargets to update
     */
    where?: PointRuleTargetWhereInput
  }

  /**
   * PointRuleTarget upsert
   */
  export type PointRuleTargetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRuleTarget
     */
    select?: PointRuleTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleTargetInclude<ExtArgs> | null
    /**
     * The filter to search for the PointRuleTarget to update in case it exists.
     */
    where: PointRuleTargetWhereUniqueInput
    /**
     * In case the PointRuleTarget found by the `where` argument doesn't exist, create a new PointRuleTarget with this data.
     */
    create: XOR<PointRuleTargetCreateInput, PointRuleTargetUncheckedCreateInput>
    /**
     * In case the PointRuleTarget was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PointRuleTargetUpdateInput, PointRuleTargetUncheckedUpdateInput>
  }

  /**
   * PointRuleTarget delete
   */
  export type PointRuleTargetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRuleTarget
     */
    select?: PointRuleTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleTargetInclude<ExtArgs> | null
    /**
     * Filter which PointRuleTarget to delete.
     */
    where: PointRuleTargetWhereUniqueInput
  }

  /**
   * PointRuleTarget deleteMany
   */
  export type PointRuleTargetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PointRuleTargets to delete
     */
    where?: PointRuleTargetWhereInput
  }

  /**
   * PointRuleTarget without action
   */
  export type PointRuleTargetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRuleTarget
     */
    select?: PointRuleTargetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRuleTargetInclude<ExtArgs> | null
  }


  /**
   * Model PointRecord
   */

  export type AggregatePointRecord = {
    _count: PointRecordCountAggregateOutputType | null
    _avg: PointRecordAvgAggregateOutputType | null
    _sum: PointRecordSumAggregateOutputType | null
    _min: PointRecordMinAggregateOutputType | null
    _max: PointRecordMaxAggregateOutputType | null
  }

  export type PointRecordAvgAggregateOutputType = {
    points: number | null
  }

  export type PointRecordSumAggregateOutputType = {
    points: number | null
  }

  export type PointRecordMinAggregateOutputType = {
    id: string | null
    childId: string | null
    pointRuleId: string | null
    status: $Enums.RecordStatus | null
    points: number | null
    description: string | null
    imageUrl: string | null
    submitNote: string | null
    reviewNote: string | null
    reviewedById: string | null
    reviewedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PointRecordMaxAggregateOutputType = {
    id: string | null
    childId: string | null
    pointRuleId: string | null
    status: $Enums.RecordStatus | null
    points: number | null
    description: string | null
    imageUrl: string | null
    submitNote: string | null
    reviewNote: string | null
    reviewedById: string | null
    reviewedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PointRecordCountAggregateOutputType = {
    id: number
    childId: number
    pointRuleId: number
    status: number
    points: number
    description: number
    imageUrl: number
    submitNote: number
    reviewNote: number
    reviewedById: number
    reviewedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PointRecordAvgAggregateInputType = {
    points?: true
  }

  export type PointRecordSumAggregateInputType = {
    points?: true
  }

  export type PointRecordMinAggregateInputType = {
    id?: true
    childId?: true
    pointRuleId?: true
    status?: true
    points?: true
    description?: true
    imageUrl?: true
    submitNote?: true
    reviewNote?: true
    reviewedById?: true
    reviewedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PointRecordMaxAggregateInputType = {
    id?: true
    childId?: true
    pointRuleId?: true
    status?: true
    points?: true
    description?: true
    imageUrl?: true
    submitNote?: true
    reviewNote?: true
    reviewedById?: true
    reviewedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PointRecordCountAggregateInputType = {
    id?: true
    childId?: true
    pointRuleId?: true
    status?: true
    points?: true
    description?: true
    imageUrl?: true
    submitNote?: true
    reviewNote?: true
    reviewedById?: true
    reviewedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PointRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PointRecord to aggregate.
     */
    where?: PointRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointRecords to fetch.
     */
    orderBy?: PointRecordOrderByWithRelationInput | PointRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PointRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PointRecords
    **/
    _count?: true | PointRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PointRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PointRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PointRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PointRecordMaxAggregateInputType
  }

  export type GetPointRecordAggregateType<T extends PointRecordAggregateArgs> = {
        [P in keyof T & keyof AggregatePointRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePointRecord[P]>
      : GetScalarType<T[P], AggregatePointRecord[P]>
  }




  export type PointRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PointRecordWhereInput
    orderBy?: PointRecordOrderByWithAggregationInput | PointRecordOrderByWithAggregationInput[]
    by: PointRecordScalarFieldEnum[] | PointRecordScalarFieldEnum
    having?: PointRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PointRecordCountAggregateInputType | true
    _avg?: PointRecordAvgAggregateInputType
    _sum?: PointRecordSumAggregateInputType
    _min?: PointRecordMinAggregateInputType
    _max?: PointRecordMaxAggregateInputType
  }

  export type PointRecordGroupByOutputType = {
    id: string
    childId: string
    pointRuleId: string
    status: $Enums.RecordStatus
    points: number
    description: string | null
    imageUrl: string | null
    submitNote: string | null
    reviewNote: string | null
    reviewedById: string | null
    reviewedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PointRecordCountAggregateOutputType | null
    _avg: PointRecordAvgAggregateOutputType | null
    _sum: PointRecordSumAggregateOutputType | null
    _min: PointRecordMinAggregateOutputType | null
    _max: PointRecordMaxAggregateOutputType | null
  }

  type GetPointRecordGroupByPayload<T extends PointRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PointRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PointRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PointRecordGroupByOutputType[P]>
            : GetScalarType<T[P], PointRecordGroupByOutputType[P]>
        }
      >
    >


  export type PointRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childId?: boolean
    pointRuleId?: boolean
    status?: boolean
    points?: boolean
    description?: boolean
    imageUrl?: boolean
    submitNote?: boolean
    reviewNote?: boolean
    reviewedById?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    child?: boolean | UserDefaultArgs<ExtArgs>
    pointRule?: boolean | PointRuleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pointRecord"]>

  export type PointRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childId?: boolean
    pointRuleId?: boolean
    status?: boolean
    points?: boolean
    description?: boolean
    imageUrl?: boolean
    submitNote?: boolean
    reviewNote?: boolean
    reviewedById?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    child?: boolean | UserDefaultArgs<ExtArgs>
    pointRule?: boolean | PointRuleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pointRecord"]>

  export type PointRecordSelectScalar = {
    id?: boolean
    childId?: boolean
    pointRuleId?: boolean
    status?: boolean
    points?: boolean
    description?: boolean
    imageUrl?: boolean
    submitNote?: boolean
    reviewNote?: boolean
    reviewedById?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PointRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | UserDefaultArgs<ExtArgs>
    pointRule?: boolean | PointRuleDefaultArgs<ExtArgs>
  }
  export type PointRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | UserDefaultArgs<ExtArgs>
    pointRule?: boolean | PointRuleDefaultArgs<ExtArgs>
  }

  export type $PointRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PointRecord"
    objects: {
      child: Prisma.$UserPayload<ExtArgs>
      pointRule: Prisma.$PointRulePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      childId: string
      pointRuleId: string
      status: $Enums.RecordStatus
      points: number
      description: string | null
      imageUrl: string | null
      submitNote: string | null
      reviewNote: string | null
      reviewedById: string | null
      reviewedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pointRecord"]>
    composites: {}
  }

  type PointRecordGetPayload<S extends boolean | null | undefined | PointRecordDefaultArgs> = $Result.GetResult<Prisma.$PointRecordPayload, S>

  type PointRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PointRecordFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PointRecordCountAggregateInputType | true
    }

  export interface PointRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PointRecord'], meta: { name: 'PointRecord' } }
    /**
     * Find zero or one PointRecord that matches the filter.
     * @param {PointRecordFindUniqueArgs} args - Arguments to find a PointRecord
     * @example
     * // Get one PointRecord
     * const pointRecord = await prisma.pointRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PointRecordFindUniqueArgs>(args: SelectSubset<T, PointRecordFindUniqueArgs<ExtArgs>>): Prisma__PointRecordClient<$Result.GetResult<Prisma.$PointRecordPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PointRecord that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PointRecordFindUniqueOrThrowArgs} args - Arguments to find a PointRecord
     * @example
     * // Get one PointRecord
     * const pointRecord = await prisma.pointRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PointRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, PointRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PointRecordClient<$Result.GetResult<Prisma.$PointRecordPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PointRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRecordFindFirstArgs} args - Arguments to find a PointRecord
     * @example
     * // Get one PointRecord
     * const pointRecord = await prisma.pointRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PointRecordFindFirstArgs>(args?: SelectSubset<T, PointRecordFindFirstArgs<ExtArgs>>): Prisma__PointRecordClient<$Result.GetResult<Prisma.$PointRecordPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PointRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRecordFindFirstOrThrowArgs} args - Arguments to find a PointRecord
     * @example
     * // Get one PointRecord
     * const pointRecord = await prisma.pointRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PointRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, PointRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__PointRecordClient<$Result.GetResult<Prisma.$PointRecordPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PointRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PointRecords
     * const pointRecords = await prisma.pointRecord.findMany()
     * 
     * // Get first 10 PointRecords
     * const pointRecords = await prisma.pointRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pointRecordWithIdOnly = await prisma.pointRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PointRecordFindManyArgs>(args?: SelectSubset<T, PointRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointRecordPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PointRecord.
     * @param {PointRecordCreateArgs} args - Arguments to create a PointRecord.
     * @example
     * // Create one PointRecord
     * const PointRecord = await prisma.pointRecord.create({
     *   data: {
     *     // ... data to create a PointRecord
     *   }
     * })
     * 
     */
    create<T extends PointRecordCreateArgs>(args: SelectSubset<T, PointRecordCreateArgs<ExtArgs>>): Prisma__PointRecordClient<$Result.GetResult<Prisma.$PointRecordPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PointRecords.
     * @param {PointRecordCreateManyArgs} args - Arguments to create many PointRecords.
     * @example
     * // Create many PointRecords
     * const pointRecord = await prisma.pointRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PointRecordCreateManyArgs>(args?: SelectSubset<T, PointRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PointRecords and returns the data saved in the database.
     * @param {PointRecordCreateManyAndReturnArgs} args - Arguments to create many PointRecords.
     * @example
     * // Create many PointRecords
     * const pointRecord = await prisma.pointRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PointRecords and only return the `id`
     * const pointRecordWithIdOnly = await prisma.pointRecord.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PointRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, PointRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointRecordPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PointRecord.
     * @param {PointRecordDeleteArgs} args - Arguments to delete one PointRecord.
     * @example
     * // Delete one PointRecord
     * const PointRecord = await prisma.pointRecord.delete({
     *   where: {
     *     // ... filter to delete one PointRecord
     *   }
     * })
     * 
     */
    delete<T extends PointRecordDeleteArgs>(args: SelectSubset<T, PointRecordDeleteArgs<ExtArgs>>): Prisma__PointRecordClient<$Result.GetResult<Prisma.$PointRecordPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PointRecord.
     * @param {PointRecordUpdateArgs} args - Arguments to update one PointRecord.
     * @example
     * // Update one PointRecord
     * const pointRecord = await prisma.pointRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PointRecordUpdateArgs>(args: SelectSubset<T, PointRecordUpdateArgs<ExtArgs>>): Prisma__PointRecordClient<$Result.GetResult<Prisma.$PointRecordPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PointRecords.
     * @param {PointRecordDeleteManyArgs} args - Arguments to filter PointRecords to delete.
     * @example
     * // Delete a few PointRecords
     * const { count } = await prisma.pointRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PointRecordDeleteManyArgs>(args?: SelectSubset<T, PointRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PointRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PointRecords
     * const pointRecord = await prisma.pointRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PointRecordUpdateManyArgs>(args: SelectSubset<T, PointRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PointRecord.
     * @param {PointRecordUpsertArgs} args - Arguments to update or create a PointRecord.
     * @example
     * // Update or create a PointRecord
     * const pointRecord = await prisma.pointRecord.upsert({
     *   create: {
     *     // ... data to create a PointRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PointRecord we want to update
     *   }
     * })
     */
    upsert<T extends PointRecordUpsertArgs>(args: SelectSubset<T, PointRecordUpsertArgs<ExtArgs>>): Prisma__PointRecordClient<$Result.GetResult<Prisma.$PointRecordPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PointRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRecordCountArgs} args - Arguments to filter PointRecords to count.
     * @example
     * // Count the number of PointRecords
     * const count = await prisma.pointRecord.count({
     *   where: {
     *     // ... the filter for the PointRecords we want to count
     *   }
     * })
    **/
    count<T extends PointRecordCountArgs>(
      args?: Subset<T, PointRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PointRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PointRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PointRecordAggregateArgs>(args: Subset<T, PointRecordAggregateArgs>): Prisma.PrismaPromise<GetPointRecordAggregateType<T>>

    /**
     * Group by PointRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointRecordGroupByArgs} args - Group by arguments.
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
      T extends PointRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PointRecordGroupByArgs['orderBy'] }
        : { orderBy?: PointRecordGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PointRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPointRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PointRecord model
   */
  readonly fields: PointRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PointRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PointRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    child<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    pointRule<T extends PointRuleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PointRuleDefaultArgs<ExtArgs>>): Prisma__PointRuleClient<$Result.GetResult<Prisma.$PointRulePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the PointRecord model
   */ 
  interface PointRecordFieldRefs {
    readonly id: FieldRef<"PointRecord", 'String'>
    readonly childId: FieldRef<"PointRecord", 'String'>
    readonly pointRuleId: FieldRef<"PointRecord", 'String'>
    readonly status: FieldRef<"PointRecord", 'RecordStatus'>
    readonly points: FieldRef<"PointRecord", 'Int'>
    readonly description: FieldRef<"PointRecord", 'String'>
    readonly imageUrl: FieldRef<"PointRecord", 'String'>
    readonly submitNote: FieldRef<"PointRecord", 'String'>
    readonly reviewNote: FieldRef<"PointRecord", 'String'>
    readonly reviewedById: FieldRef<"PointRecord", 'String'>
    readonly reviewedAt: FieldRef<"PointRecord", 'DateTime'>
    readonly createdAt: FieldRef<"PointRecord", 'DateTime'>
    readonly updatedAt: FieldRef<"PointRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PointRecord findUnique
   */
  export type PointRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRecord
     */
    select?: PointRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRecordInclude<ExtArgs> | null
    /**
     * Filter, which PointRecord to fetch.
     */
    where: PointRecordWhereUniqueInput
  }

  /**
   * PointRecord findUniqueOrThrow
   */
  export type PointRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRecord
     */
    select?: PointRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRecordInclude<ExtArgs> | null
    /**
     * Filter, which PointRecord to fetch.
     */
    where: PointRecordWhereUniqueInput
  }

  /**
   * PointRecord findFirst
   */
  export type PointRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRecord
     */
    select?: PointRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRecordInclude<ExtArgs> | null
    /**
     * Filter, which PointRecord to fetch.
     */
    where?: PointRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointRecords to fetch.
     */
    orderBy?: PointRecordOrderByWithRelationInput | PointRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PointRecords.
     */
    cursor?: PointRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PointRecords.
     */
    distinct?: PointRecordScalarFieldEnum | PointRecordScalarFieldEnum[]
  }

  /**
   * PointRecord findFirstOrThrow
   */
  export type PointRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRecord
     */
    select?: PointRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRecordInclude<ExtArgs> | null
    /**
     * Filter, which PointRecord to fetch.
     */
    where?: PointRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointRecords to fetch.
     */
    orderBy?: PointRecordOrderByWithRelationInput | PointRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PointRecords.
     */
    cursor?: PointRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PointRecords.
     */
    distinct?: PointRecordScalarFieldEnum | PointRecordScalarFieldEnum[]
  }

  /**
   * PointRecord findMany
   */
  export type PointRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRecord
     */
    select?: PointRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRecordInclude<ExtArgs> | null
    /**
     * Filter, which PointRecords to fetch.
     */
    where?: PointRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointRecords to fetch.
     */
    orderBy?: PointRecordOrderByWithRelationInput | PointRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PointRecords.
     */
    cursor?: PointRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointRecords.
     */
    skip?: number
    distinct?: PointRecordScalarFieldEnum | PointRecordScalarFieldEnum[]
  }

  /**
   * PointRecord create
   */
  export type PointRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRecord
     */
    select?: PointRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a PointRecord.
     */
    data: XOR<PointRecordCreateInput, PointRecordUncheckedCreateInput>
  }

  /**
   * PointRecord createMany
   */
  export type PointRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PointRecords.
     */
    data: PointRecordCreateManyInput | PointRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PointRecord createManyAndReturn
   */
  export type PointRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRecord
     */
    select?: PointRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PointRecords.
     */
    data: PointRecordCreateManyInput | PointRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PointRecord update
   */
  export type PointRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRecord
     */
    select?: PointRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a PointRecord.
     */
    data: XOR<PointRecordUpdateInput, PointRecordUncheckedUpdateInput>
    /**
     * Choose, which PointRecord to update.
     */
    where: PointRecordWhereUniqueInput
  }

  /**
   * PointRecord updateMany
   */
  export type PointRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PointRecords.
     */
    data: XOR<PointRecordUpdateManyMutationInput, PointRecordUncheckedUpdateManyInput>
    /**
     * Filter which PointRecords to update
     */
    where?: PointRecordWhereInput
  }

  /**
   * PointRecord upsert
   */
  export type PointRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRecord
     */
    select?: PointRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the PointRecord to update in case it exists.
     */
    where: PointRecordWhereUniqueInput
    /**
     * In case the PointRecord found by the `where` argument doesn't exist, create a new PointRecord with this data.
     */
    create: XOR<PointRecordCreateInput, PointRecordUncheckedCreateInput>
    /**
     * In case the PointRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PointRecordUpdateInput, PointRecordUncheckedUpdateInput>
  }

  /**
   * PointRecord delete
   */
  export type PointRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRecord
     */
    select?: PointRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRecordInclude<ExtArgs> | null
    /**
     * Filter which PointRecord to delete.
     */
    where: PointRecordWhereUniqueInput
  }

  /**
   * PointRecord deleteMany
   */
  export type PointRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PointRecords to delete
     */
    where?: PointRecordWhereInput
  }

  /**
   * PointRecord without action
   */
  export type PointRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointRecord
     */
    select?: PointRecordSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointRecordInclude<ExtArgs> | null
  }


  /**
   * Model PointAccount
   */

  export type AggregatePointAccount = {
    _count: PointAccountCountAggregateOutputType | null
    _avg: PointAccountAvgAggregateOutputType | null
    _sum: PointAccountSumAggregateOutputType | null
    _min: PointAccountMinAggregateOutputType | null
    _max: PointAccountMaxAggregateOutputType | null
  }

  export type PointAccountAvgAggregateOutputType = {
    balance: number | null
    totalEarned: number | null
    totalSpent: number | null
  }

  export type PointAccountSumAggregateOutputType = {
    balance: number | null
    totalEarned: number | null
    totalSpent: number | null
  }

  export type PointAccountMinAggregateOutputType = {
    id: string | null
    childId: string | null
    balance: number | null
    totalEarned: number | null
    totalSpent: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PointAccountMaxAggregateOutputType = {
    id: string | null
    childId: string | null
    balance: number | null
    totalEarned: number | null
    totalSpent: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PointAccountCountAggregateOutputType = {
    id: number
    childId: number
    balance: number
    totalEarned: number
    totalSpent: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PointAccountAvgAggregateInputType = {
    balance?: true
    totalEarned?: true
    totalSpent?: true
  }

  export type PointAccountSumAggregateInputType = {
    balance?: true
    totalEarned?: true
    totalSpent?: true
  }

  export type PointAccountMinAggregateInputType = {
    id?: true
    childId?: true
    balance?: true
    totalEarned?: true
    totalSpent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PointAccountMaxAggregateInputType = {
    id?: true
    childId?: true
    balance?: true
    totalEarned?: true
    totalSpent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PointAccountCountAggregateInputType = {
    id?: true
    childId?: true
    balance?: true
    totalEarned?: true
    totalSpent?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PointAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PointAccount to aggregate.
     */
    where?: PointAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointAccounts to fetch.
     */
    orderBy?: PointAccountOrderByWithRelationInput | PointAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PointAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PointAccounts
    **/
    _count?: true | PointAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PointAccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PointAccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PointAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PointAccountMaxAggregateInputType
  }

  export type GetPointAccountAggregateType<T extends PointAccountAggregateArgs> = {
        [P in keyof T & keyof AggregatePointAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePointAccount[P]>
      : GetScalarType<T[P], AggregatePointAccount[P]>
  }




  export type PointAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PointAccountWhereInput
    orderBy?: PointAccountOrderByWithAggregationInput | PointAccountOrderByWithAggregationInput[]
    by: PointAccountScalarFieldEnum[] | PointAccountScalarFieldEnum
    having?: PointAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PointAccountCountAggregateInputType | true
    _avg?: PointAccountAvgAggregateInputType
    _sum?: PointAccountSumAggregateInputType
    _min?: PointAccountMinAggregateInputType
    _max?: PointAccountMaxAggregateInputType
  }

  export type PointAccountGroupByOutputType = {
    id: string
    childId: string
    balance: number
    totalEarned: number
    totalSpent: number
    createdAt: Date
    updatedAt: Date
    _count: PointAccountCountAggregateOutputType | null
    _avg: PointAccountAvgAggregateOutputType | null
    _sum: PointAccountSumAggregateOutputType | null
    _min: PointAccountMinAggregateOutputType | null
    _max: PointAccountMaxAggregateOutputType | null
  }

  type GetPointAccountGroupByPayload<T extends PointAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PointAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PointAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PointAccountGroupByOutputType[P]>
            : GetScalarType<T[P], PointAccountGroupByOutputType[P]>
        }
      >
    >


  export type PointAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childId?: boolean
    balance?: boolean
    totalEarned?: boolean
    totalSpent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    child?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | PointAccount$transactionsArgs<ExtArgs>
    _count?: boolean | PointAccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pointAccount"]>

  export type PointAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childId?: boolean
    balance?: boolean
    totalEarned?: boolean
    totalSpent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    child?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pointAccount"]>

  export type PointAccountSelectScalar = {
    id?: boolean
    childId?: boolean
    balance?: boolean
    totalEarned?: boolean
    totalSpent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PointAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | PointAccount$transactionsArgs<ExtArgs>
    _count?: boolean | PointAccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PointAccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PointAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PointAccount"
    objects: {
      child: Prisma.$UserPayload<ExtArgs>
      transactions: Prisma.$PointTransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      childId: string
      balance: number
      totalEarned: number
      totalSpent: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pointAccount"]>
    composites: {}
  }

  type PointAccountGetPayload<S extends boolean | null | undefined | PointAccountDefaultArgs> = $Result.GetResult<Prisma.$PointAccountPayload, S>

  type PointAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PointAccountFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PointAccountCountAggregateInputType | true
    }

  export interface PointAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PointAccount'], meta: { name: 'PointAccount' } }
    /**
     * Find zero or one PointAccount that matches the filter.
     * @param {PointAccountFindUniqueArgs} args - Arguments to find a PointAccount
     * @example
     * // Get one PointAccount
     * const pointAccount = await prisma.pointAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PointAccountFindUniqueArgs>(args: SelectSubset<T, PointAccountFindUniqueArgs<ExtArgs>>): Prisma__PointAccountClient<$Result.GetResult<Prisma.$PointAccountPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PointAccount that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PointAccountFindUniqueOrThrowArgs} args - Arguments to find a PointAccount
     * @example
     * // Get one PointAccount
     * const pointAccount = await prisma.pointAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PointAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, PointAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PointAccountClient<$Result.GetResult<Prisma.$PointAccountPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PointAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointAccountFindFirstArgs} args - Arguments to find a PointAccount
     * @example
     * // Get one PointAccount
     * const pointAccount = await prisma.pointAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PointAccountFindFirstArgs>(args?: SelectSubset<T, PointAccountFindFirstArgs<ExtArgs>>): Prisma__PointAccountClient<$Result.GetResult<Prisma.$PointAccountPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PointAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointAccountFindFirstOrThrowArgs} args - Arguments to find a PointAccount
     * @example
     * // Get one PointAccount
     * const pointAccount = await prisma.pointAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PointAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, PointAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__PointAccountClient<$Result.GetResult<Prisma.$PointAccountPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PointAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PointAccounts
     * const pointAccounts = await prisma.pointAccount.findMany()
     * 
     * // Get first 10 PointAccounts
     * const pointAccounts = await prisma.pointAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pointAccountWithIdOnly = await prisma.pointAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PointAccountFindManyArgs>(args?: SelectSubset<T, PointAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointAccountPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PointAccount.
     * @param {PointAccountCreateArgs} args - Arguments to create a PointAccount.
     * @example
     * // Create one PointAccount
     * const PointAccount = await prisma.pointAccount.create({
     *   data: {
     *     // ... data to create a PointAccount
     *   }
     * })
     * 
     */
    create<T extends PointAccountCreateArgs>(args: SelectSubset<T, PointAccountCreateArgs<ExtArgs>>): Prisma__PointAccountClient<$Result.GetResult<Prisma.$PointAccountPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PointAccounts.
     * @param {PointAccountCreateManyArgs} args - Arguments to create many PointAccounts.
     * @example
     * // Create many PointAccounts
     * const pointAccount = await prisma.pointAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PointAccountCreateManyArgs>(args?: SelectSubset<T, PointAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PointAccounts and returns the data saved in the database.
     * @param {PointAccountCreateManyAndReturnArgs} args - Arguments to create many PointAccounts.
     * @example
     * // Create many PointAccounts
     * const pointAccount = await prisma.pointAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PointAccounts and only return the `id`
     * const pointAccountWithIdOnly = await prisma.pointAccount.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PointAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, PointAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointAccountPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PointAccount.
     * @param {PointAccountDeleteArgs} args - Arguments to delete one PointAccount.
     * @example
     * // Delete one PointAccount
     * const PointAccount = await prisma.pointAccount.delete({
     *   where: {
     *     // ... filter to delete one PointAccount
     *   }
     * })
     * 
     */
    delete<T extends PointAccountDeleteArgs>(args: SelectSubset<T, PointAccountDeleteArgs<ExtArgs>>): Prisma__PointAccountClient<$Result.GetResult<Prisma.$PointAccountPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PointAccount.
     * @param {PointAccountUpdateArgs} args - Arguments to update one PointAccount.
     * @example
     * // Update one PointAccount
     * const pointAccount = await prisma.pointAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PointAccountUpdateArgs>(args: SelectSubset<T, PointAccountUpdateArgs<ExtArgs>>): Prisma__PointAccountClient<$Result.GetResult<Prisma.$PointAccountPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PointAccounts.
     * @param {PointAccountDeleteManyArgs} args - Arguments to filter PointAccounts to delete.
     * @example
     * // Delete a few PointAccounts
     * const { count } = await prisma.pointAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PointAccountDeleteManyArgs>(args?: SelectSubset<T, PointAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PointAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PointAccounts
     * const pointAccount = await prisma.pointAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PointAccountUpdateManyArgs>(args: SelectSubset<T, PointAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PointAccount.
     * @param {PointAccountUpsertArgs} args - Arguments to update or create a PointAccount.
     * @example
     * // Update or create a PointAccount
     * const pointAccount = await prisma.pointAccount.upsert({
     *   create: {
     *     // ... data to create a PointAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PointAccount we want to update
     *   }
     * })
     */
    upsert<T extends PointAccountUpsertArgs>(args: SelectSubset<T, PointAccountUpsertArgs<ExtArgs>>): Prisma__PointAccountClient<$Result.GetResult<Prisma.$PointAccountPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PointAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointAccountCountArgs} args - Arguments to filter PointAccounts to count.
     * @example
     * // Count the number of PointAccounts
     * const count = await prisma.pointAccount.count({
     *   where: {
     *     // ... the filter for the PointAccounts we want to count
     *   }
     * })
    **/
    count<T extends PointAccountCountArgs>(
      args?: Subset<T, PointAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PointAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PointAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PointAccountAggregateArgs>(args: Subset<T, PointAccountAggregateArgs>): Prisma.PrismaPromise<GetPointAccountAggregateType<T>>

    /**
     * Group by PointAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointAccountGroupByArgs} args - Group by arguments.
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
      T extends PointAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PointAccountGroupByArgs['orderBy'] }
        : { orderBy?: PointAccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PointAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPointAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PointAccount model
   */
  readonly fields: PointAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PointAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PointAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    child<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    transactions<T extends PointAccount$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, PointAccount$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the PointAccount model
   */ 
  interface PointAccountFieldRefs {
    readonly id: FieldRef<"PointAccount", 'String'>
    readonly childId: FieldRef<"PointAccount", 'String'>
    readonly balance: FieldRef<"PointAccount", 'Int'>
    readonly totalEarned: FieldRef<"PointAccount", 'Int'>
    readonly totalSpent: FieldRef<"PointAccount", 'Int'>
    readonly createdAt: FieldRef<"PointAccount", 'DateTime'>
    readonly updatedAt: FieldRef<"PointAccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PointAccount findUnique
   */
  export type PointAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointAccount
     */
    select?: PointAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointAccountInclude<ExtArgs> | null
    /**
     * Filter, which PointAccount to fetch.
     */
    where: PointAccountWhereUniqueInput
  }

  /**
   * PointAccount findUniqueOrThrow
   */
  export type PointAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointAccount
     */
    select?: PointAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointAccountInclude<ExtArgs> | null
    /**
     * Filter, which PointAccount to fetch.
     */
    where: PointAccountWhereUniqueInput
  }

  /**
   * PointAccount findFirst
   */
  export type PointAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointAccount
     */
    select?: PointAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointAccountInclude<ExtArgs> | null
    /**
     * Filter, which PointAccount to fetch.
     */
    where?: PointAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointAccounts to fetch.
     */
    orderBy?: PointAccountOrderByWithRelationInput | PointAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PointAccounts.
     */
    cursor?: PointAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PointAccounts.
     */
    distinct?: PointAccountScalarFieldEnum | PointAccountScalarFieldEnum[]
  }

  /**
   * PointAccount findFirstOrThrow
   */
  export type PointAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointAccount
     */
    select?: PointAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointAccountInclude<ExtArgs> | null
    /**
     * Filter, which PointAccount to fetch.
     */
    where?: PointAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointAccounts to fetch.
     */
    orderBy?: PointAccountOrderByWithRelationInput | PointAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PointAccounts.
     */
    cursor?: PointAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PointAccounts.
     */
    distinct?: PointAccountScalarFieldEnum | PointAccountScalarFieldEnum[]
  }

  /**
   * PointAccount findMany
   */
  export type PointAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointAccount
     */
    select?: PointAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointAccountInclude<ExtArgs> | null
    /**
     * Filter, which PointAccounts to fetch.
     */
    where?: PointAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointAccounts to fetch.
     */
    orderBy?: PointAccountOrderByWithRelationInput | PointAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PointAccounts.
     */
    cursor?: PointAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointAccounts.
     */
    skip?: number
    distinct?: PointAccountScalarFieldEnum | PointAccountScalarFieldEnum[]
  }

  /**
   * PointAccount create
   */
  export type PointAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointAccount
     */
    select?: PointAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a PointAccount.
     */
    data: XOR<PointAccountCreateInput, PointAccountUncheckedCreateInput>
  }

  /**
   * PointAccount createMany
   */
  export type PointAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PointAccounts.
     */
    data: PointAccountCreateManyInput | PointAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PointAccount createManyAndReturn
   */
  export type PointAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointAccount
     */
    select?: PointAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PointAccounts.
     */
    data: PointAccountCreateManyInput | PointAccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointAccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PointAccount update
   */
  export type PointAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointAccount
     */
    select?: PointAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a PointAccount.
     */
    data: XOR<PointAccountUpdateInput, PointAccountUncheckedUpdateInput>
    /**
     * Choose, which PointAccount to update.
     */
    where: PointAccountWhereUniqueInput
  }

  /**
   * PointAccount updateMany
   */
  export type PointAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PointAccounts.
     */
    data: XOR<PointAccountUpdateManyMutationInput, PointAccountUncheckedUpdateManyInput>
    /**
     * Filter which PointAccounts to update
     */
    where?: PointAccountWhereInput
  }

  /**
   * PointAccount upsert
   */
  export type PointAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointAccount
     */
    select?: PointAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the PointAccount to update in case it exists.
     */
    where: PointAccountWhereUniqueInput
    /**
     * In case the PointAccount found by the `where` argument doesn't exist, create a new PointAccount with this data.
     */
    create: XOR<PointAccountCreateInput, PointAccountUncheckedCreateInput>
    /**
     * In case the PointAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PointAccountUpdateInput, PointAccountUncheckedUpdateInput>
  }

  /**
   * PointAccount delete
   */
  export type PointAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointAccount
     */
    select?: PointAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointAccountInclude<ExtArgs> | null
    /**
     * Filter which PointAccount to delete.
     */
    where: PointAccountWhereUniqueInput
  }

  /**
   * PointAccount deleteMany
   */
  export type PointAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PointAccounts to delete
     */
    where?: PointAccountWhereInput
  }

  /**
   * PointAccount.transactions
   */
  export type PointAccount$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointTransaction
     */
    select?: PointTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointTransactionInclude<ExtArgs> | null
    where?: PointTransactionWhereInput
    orderBy?: PointTransactionOrderByWithRelationInput | PointTransactionOrderByWithRelationInput[]
    cursor?: PointTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PointTransactionScalarFieldEnum | PointTransactionScalarFieldEnum[]
  }

  /**
   * PointAccount without action
   */
  export type PointAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointAccount
     */
    select?: PointAccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointAccountInclude<ExtArgs> | null
  }


  /**
   * Model PointTransaction
   */

  export type AggregatePointTransaction = {
    _count: PointTransactionCountAggregateOutputType | null
    _avg: PointTransactionAvgAggregateOutputType | null
    _sum: PointTransactionSumAggregateOutputType | null
    _min: PointTransactionMinAggregateOutputType | null
    _max: PointTransactionMaxAggregateOutputType | null
  }

  export type PointTransactionAvgAggregateOutputType = {
    amount: number | null
    balanceAfter: number | null
  }

  export type PointTransactionSumAggregateOutputType = {
    amount: number | null
    balanceAfter: number | null
  }

  export type PointTransactionMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    type: $Enums.TransactionType | null
    amount: number | null
    balanceAfter: number | null
    sourceType: $Enums.SourceType | null
    sourceId: string | null
    description: string | null
    createdAt: Date | null
  }

  export type PointTransactionMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    type: $Enums.TransactionType | null
    amount: number | null
    balanceAfter: number | null
    sourceType: $Enums.SourceType | null
    sourceId: string | null
    description: string | null
    createdAt: Date | null
  }

  export type PointTransactionCountAggregateOutputType = {
    id: number
    accountId: number
    type: number
    amount: number
    balanceAfter: number
    sourceType: number
    sourceId: number
    description: number
    createdAt: number
    _all: number
  }


  export type PointTransactionAvgAggregateInputType = {
    amount?: true
    balanceAfter?: true
  }

  export type PointTransactionSumAggregateInputType = {
    amount?: true
    balanceAfter?: true
  }

  export type PointTransactionMinAggregateInputType = {
    id?: true
    accountId?: true
    type?: true
    amount?: true
    balanceAfter?: true
    sourceType?: true
    sourceId?: true
    description?: true
    createdAt?: true
  }

  export type PointTransactionMaxAggregateInputType = {
    id?: true
    accountId?: true
    type?: true
    amount?: true
    balanceAfter?: true
    sourceType?: true
    sourceId?: true
    description?: true
    createdAt?: true
  }

  export type PointTransactionCountAggregateInputType = {
    id?: true
    accountId?: true
    type?: true
    amount?: true
    balanceAfter?: true
    sourceType?: true
    sourceId?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type PointTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PointTransaction to aggregate.
     */
    where?: PointTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointTransactions to fetch.
     */
    orderBy?: PointTransactionOrderByWithRelationInput | PointTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PointTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PointTransactions
    **/
    _count?: true | PointTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PointTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PointTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PointTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PointTransactionMaxAggregateInputType
  }

  export type GetPointTransactionAggregateType<T extends PointTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregatePointTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePointTransaction[P]>
      : GetScalarType<T[P], AggregatePointTransaction[P]>
  }




  export type PointTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PointTransactionWhereInput
    orderBy?: PointTransactionOrderByWithAggregationInput | PointTransactionOrderByWithAggregationInput[]
    by: PointTransactionScalarFieldEnum[] | PointTransactionScalarFieldEnum
    having?: PointTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PointTransactionCountAggregateInputType | true
    _avg?: PointTransactionAvgAggregateInputType
    _sum?: PointTransactionSumAggregateInputType
    _min?: PointTransactionMinAggregateInputType
    _max?: PointTransactionMaxAggregateInputType
  }

  export type PointTransactionGroupByOutputType = {
    id: string
    accountId: string
    type: $Enums.TransactionType
    amount: number
    balanceAfter: number
    sourceType: $Enums.SourceType
    sourceId: string | null
    description: string | null
    createdAt: Date
    _count: PointTransactionCountAggregateOutputType | null
    _avg: PointTransactionAvgAggregateOutputType | null
    _sum: PointTransactionSumAggregateOutputType | null
    _min: PointTransactionMinAggregateOutputType | null
    _max: PointTransactionMaxAggregateOutputType | null
  }

  type GetPointTransactionGroupByPayload<T extends PointTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PointTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PointTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PointTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], PointTransactionGroupByOutputType[P]>
        }
      >
    >


  export type PointTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    type?: boolean
    amount?: boolean
    balanceAfter?: boolean
    sourceType?: boolean
    sourceId?: boolean
    description?: boolean
    createdAt?: boolean
    account?: boolean | PointAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pointTransaction"]>

  export type PointTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    type?: boolean
    amount?: boolean
    balanceAfter?: boolean
    sourceType?: boolean
    sourceId?: boolean
    description?: boolean
    createdAt?: boolean
    account?: boolean | PointAccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pointTransaction"]>

  export type PointTransactionSelectScalar = {
    id?: boolean
    accountId?: boolean
    type?: boolean
    amount?: boolean
    balanceAfter?: boolean
    sourceType?: boolean
    sourceId?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type PointTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | PointAccountDefaultArgs<ExtArgs>
  }
  export type PointTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | PointAccountDefaultArgs<ExtArgs>
  }

  export type $PointTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PointTransaction"
    objects: {
      account: Prisma.$PointAccountPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      type: $Enums.TransactionType
      amount: number
      balanceAfter: number
      sourceType: $Enums.SourceType
      sourceId: string | null
      description: string | null
      createdAt: Date
    }, ExtArgs["result"]["pointTransaction"]>
    composites: {}
  }

  type PointTransactionGetPayload<S extends boolean | null | undefined | PointTransactionDefaultArgs> = $Result.GetResult<Prisma.$PointTransactionPayload, S>

  type PointTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PointTransactionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PointTransactionCountAggregateInputType | true
    }

  export interface PointTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PointTransaction'], meta: { name: 'PointTransaction' } }
    /**
     * Find zero or one PointTransaction that matches the filter.
     * @param {PointTransactionFindUniqueArgs} args - Arguments to find a PointTransaction
     * @example
     * // Get one PointTransaction
     * const pointTransaction = await prisma.pointTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PointTransactionFindUniqueArgs>(args: SelectSubset<T, PointTransactionFindUniqueArgs<ExtArgs>>): Prisma__PointTransactionClient<$Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PointTransaction that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PointTransactionFindUniqueOrThrowArgs} args - Arguments to find a PointTransaction
     * @example
     * // Get one PointTransaction
     * const pointTransaction = await prisma.pointTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PointTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, PointTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PointTransactionClient<$Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PointTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointTransactionFindFirstArgs} args - Arguments to find a PointTransaction
     * @example
     * // Get one PointTransaction
     * const pointTransaction = await prisma.pointTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PointTransactionFindFirstArgs>(args?: SelectSubset<T, PointTransactionFindFirstArgs<ExtArgs>>): Prisma__PointTransactionClient<$Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PointTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointTransactionFindFirstOrThrowArgs} args - Arguments to find a PointTransaction
     * @example
     * // Get one PointTransaction
     * const pointTransaction = await prisma.pointTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PointTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, PointTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PointTransactionClient<$Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PointTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PointTransactions
     * const pointTransactions = await prisma.pointTransaction.findMany()
     * 
     * // Get first 10 PointTransactions
     * const pointTransactions = await prisma.pointTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pointTransactionWithIdOnly = await prisma.pointTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PointTransactionFindManyArgs>(args?: SelectSubset<T, PointTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PointTransaction.
     * @param {PointTransactionCreateArgs} args - Arguments to create a PointTransaction.
     * @example
     * // Create one PointTransaction
     * const PointTransaction = await prisma.pointTransaction.create({
     *   data: {
     *     // ... data to create a PointTransaction
     *   }
     * })
     * 
     */
    create<T extends PointTransactionCreateArgs>(args: SelectSubset<T, PointTransactionCreateArgs<ExtArgs>>): Prisma__PointTransactionClient<$Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PointTransactions.
     * @param {PointTransactionCreateManyArgs} args - Arguments to create many PointTransactions.
     * @example
     * // Create many PointTransactions
     * const pointTransaction = await prisma.pointTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PointTransactionCreateManyArgs>(args?: SelectSubset<T, PointTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PointTransactions and returns the data saved in the database.
     * @param {PointTransactionCreateManyAndReturnArgs} args - Arguments to create many PointTransactions.
     * @example
     * // Create many PointTransactions
     * const pointTransaction = await prisma.pointTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PointTransactions and only return the `id`
     * const pointTransactionWithIdOnly = await prisma.pointTransaction.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PointTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, PointTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PointTransaction.
     * @param {PointTransactionDeleteArgs} args - Arguments to delete one PointTransaction.
     * @example
     * // Delete one PointTransaction
     * const PointTransaction = await prisma.pointTransaction.delete({
     *   where: {
     *     // ... filter to delete one PointTransaction
     *   }
     * })
     * 
     */
    delete<T extends PointTransactionDeleteArgs>(args: SelectSubset<T, PointTransactionDeleteArgs<ExtArgs>>): Prisma__PointTransactionClient<$Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PointTransaction.
     * @param {PointTransactionUpdateArgs} args - Arguments to update one PointTransaction.
     * @example
     * // Update one PointTransaction
     * const pointTransaction = await prisma.pointTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PointTransactionUpdateArgs>(args: SelectSubset<T, PointTransactionUpdateArgs<ExtArgs>>): Prisma__PointTransactionClient<$Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PointTransactions.
     * @param {PointTransactionDeleteManyArgs} args - Arguments to filter PointTransactions to delete.
     * @example
     * // Delete a few PointTransactions
     * const { count } = await prisma.pointTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PointTransactionDeleteManyArgs>(args?: SelectSubset<T, PointTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PointTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PointTransactions
     * const pointTransaction = await prisma.pointTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PointTransactionUpdateManyArgs>(args: SelectSubset<T, PointTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PointTransaction.
     * @param {PointTransactionUpsertArgs} args - Arguments to update or create a PointTransaction.
     * @example
     * // Update or create a PointTransaction
     * const pointTransaction = await prisma.pointTransaction.upsert({
     *   create: {
     *     // ... data to create a PointTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PointTransaction we want to update
     *   }
     * })
     */
    upsert<T extends PointTransactionUpsertArgs>(args: SelectSubset<T, PointTransactionUpsertArgs<ExtArgs>>): Prisma__PointTransactionClient<$Result.GetResult<Prisma.$PointTransactionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PointTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointTransactionCountArgs} args - Arguments to filter PointTransactions to count.
     * @example
     * // Count the number of PointTransactions
     * const count = await prisma.pointTransaction.count({
     *   where: {
     *     // ... the filter for the PointTransactions we want to count
     *   }
     * })
    **/
    count<T extends PointTransactionCountArgs>(
      args?: Subset<T, PointTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PointTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PointTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PointTransactionAggregateArgs>(args: Subset<T, PointTransactionAggregateArgs>): Prisma.PrismaPromise<GetPointTransactionAggregateType<T>>

    /**
     * Group by PointTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointTransactionGroupByArgs} args - Group by arguments.
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
      T extends PointTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PointTransactionGroupByArgs['orderBy'] }
        : { orderBy?: PointTransactionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PointTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPointTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PointTransaction model
   */
  readonly fields: PointTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PointTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PointTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends PointAccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PointAccountDefaultArgs<ExtArgs>>): Prisma__PointAccountClient<$Result.GetResult<Prisma.$PointAccountPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the PointTransaction model
   */ 
  interface PointTransactionFieldRefs {
    readonly id: FieldRef<"PointTransaction", 'String'>
    readonly accountId: FieldRef<"PointTransaction", 'String'>
    readonly type: FieldRef<"PointTransaction", 'TransactionType'>
    readonly amount: FieldRef<"PointTransaction", 'Int'>
    readonly balanceAfter: FieldRef<"PointTransaction", 'Int'>
    readonly sourceType: FieldRef<"PointTransaction", 'SourceType'>
    readonly sourceId: FieldRef<"PointTransaction", 'String'>
    readonly description: FieldRef<"PointTransaction", 'String'>
    readonly createdAt: FieldRef<"PointTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PointTransaction findUnique
   */
  export type PointTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointTransaction
     */
    select?: PointTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PointTransaction to fetch.
     */
    where: PointTransactionWhereUniqueInput
  }

  /**
   * PointTransaction findUniqueOrThrow
   */
  export type PointTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointTransaction
     */
    select?: PointTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PointTransaction to fetch.
     */
    where: PointTransactionWhereUniqueInput
  }

  /**
   * PointTransaction findFirst
   */
  export type PointTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointTransaction
     */
    select?: PointTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PointTransaction to fetch.
     */
    where?: PointTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointTransactions to fetch.
     */
    orderBy?: PointTransactionOrderByWithRelationInput | PointTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PointTransactions.
     */
    cursor?: PointTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PointTransactions.
     */
    distinct?: PointTransactionScalarFieldEnum | PointTransactionScalarFieldEnum[]
  }

  /**
   * PointTransaction findFirstOrThrow
   */
  export type PointTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointTransaction
     */
    select?: PointTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PointTransaction to fetch.
     */
    where?: PointTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointTransactions to fetch.
     */
    orderBy?: PointTransactionOrderByWithRelationInput | PointTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PointTransactions.
     */
    cursor?: PointTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PointTransactions.
     */
    distinct?: PointTransactionScalarFieldEnum | PointTransactionScalarFieldEnum[]
  }

  /**
   * PointTransaction findMany
   */
  export type PointTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointTransaction
     */
    select?: PointTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointTransactionInclude<ExtArgs> | null
    /**
     * Filter, which PointTransactions to fetch.
     */
    where?: PointTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PointTransactions to fetch.
     */
    orderBy?: PointTransactionOrderByWithRelationInput | PointTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PointTransactions.
     */
    cursor?: PointTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PointTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PointTransactions.
     */
    skip?: number
    distinct?: PointTransactionScalarFieldEnum | PointTransactionScalarFieldEnum[]
  }

  /**
   * PointTransaction create
   */
  export type PointTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointTransaction
     */
    select?: PointTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a PointTransaction.
     */
    data: XOR<PointTransactionCreateInput, PointTransactionUncheckedCreateInput>
  }

  /**
   * PointTransaction createMany
   */
  export type PointTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PointTransactions.
     */
    data: PointTransactionCreateManyInput | PointTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PointTransaction createManyAndReturn
   */
  export type PointTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointTransaction
     */
    select?: PointTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PointTransactions.
     */
    data: PointTransactionCreateManyInput | PointTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PointTransaction update
   */
  export type PointTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointTransaction
     */
    select?: PointTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a PointTransaction.
     */
    data: XOR<PointTransactionUpdateInput, PointTransactionUncheckedUpdateInput>
    /**
     * Choose, which PointTransaction to update.
     */
    where: PointTransactionWhereUniqueInput
  }

  /**
   * PointTransaction updateMany
   */
  export type PointTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PointTransactions.
     */
    data: XOR<PointTransactionUpdateManyMutationInput, PointTransactionUncheckedUpdateManyInput>
    /**
     * Filter which PointTransactions to update
     */
    where?: PointTransactionWhereInput
  }

  /**
   * PointTransaction upsert
   */
  export type PointTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointTransaction
     */
    select?: PointTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the PointTransaction to update in case it exists.
     */
    where: PointTransactionWhereUniqueInput
    /**
     * In case the PointTransaction found by the `where` argument doesn't exist, create a new PointTransaction with this data.
     */
    create: XOR<PointTransactionCreateInput, PointTransactionUncheckedCreateInput>
    /**
     * In case the PointTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PointTransactionUpdateInput, PointTransactionUncheckedUpdateInput>
  }

  /**
   * PointTransaction delete
   */
  export type PointTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointTransaction
     */
    select?: PointTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointTransactionInclude<ExtArgs> | null
    /**
     * Filter which PointTransaction to delete.
     */
    where: PointTransactionWhereUniqueInput
  }

  /**
   * PointTransaction deleteMany
   */
  export type PointTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PointTransactions to delete
     */
    where?: PointTransactionWhereInput
  }

  /**
   * PointTransaction without action
   */
  export type PointTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointTransaction
     */
    select?: PointTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PointTransactionInclude<ExtArgs> | null
  }


  /**
   * Model Pet
   */

  export type AggregatePet = {
    _count: PetCountAggregateOutputType | null
    _avg: PetAvgAggregateOutputType | null
    _sum: PetSumAggregateOutputType | null
    _min: PetMinAggregateOutputType | null
    _max: PetMaxAggregateOutputType | null
  }

  export type PetAvgAggregateOutputType = {
    level: number | null
    exp: number | null
    hunger: number | null
    thirst: number | null
    cleanliness: number | null
    mood: number | null
    health: number | null
    totalCareCount: number | null
  }

  export type PetSumAggregateOutputType = {
    level: number | null
    exp: number | null
    hunger: number | null
    thirst: number | null
    cleanliness: number | null
    mood: number | null
    health: number | null
    totalCareCount: number | null
  }

  export type PetMinAggregateOutputType = {
    id: string | null
    childId: string | null
    name: string | null
    stage: $Enums.PetStage | null
    level: number | null
    exp: number | null
    status: $Enums.PetStatus | null
    hunger: number | null
    thirst: number | null
    cleanliness: number | null
    mood: number | null
    health: number | null
    lastDecayAt: Date | null
    lastFedAt: Date | null
    lastWateredAt: Date | null
    lastCleanedAt: Date | null
    lastPlayedAt: Date | null
    totalCareCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PetMaxAggregateOutputType = {
    id: string | null
    childId: string | null
    name: string | null
    stage: $Enums.PetStage | null
    level: number | null
    exp: number | null
    status: $Enums.PetStatus | null
    hunger: number | null
    thirst: number | null
    cleanliness: number | null
    mood: number | null
    health: number | null
    lastDecayAt: Date | null
    lastFedAt: Date | null
    lastWateredAt: Date | null
    lastCleanedAt: Date | null
    lastPlayedAt: Date | null
    totalCareCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PetCountAggregateOutputType = {
    id: number
    childId: number
    name: number
    stage: number
    level: number
    exp: number
    status: number
    hunger: number
    thirst: number
    cleanliness: number
    mood: number
    health: number
    lastDecayAt: number
    lastFedAt: number
    lastWateredAt: number
    lastCleanedAt: number
    lastPlayedAt: number
    totalCareCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PetAvgAggregateInputType = {
    level?: true
    exp?: true
    hunger?: true
    thirst?: true
    cleanliness?: true
    mood?: true
    health?: true
    totalCareCount?: true
  }

  export type PetSumAggregateInputType = {
    level?: true
    exp?: true
    hunger?: true
    thirst?: true
    cleanliness?: true
    mood?: true
    health?: true
    totalCareCount?: true
  }

  export type PetMinAggregateInputType = {
    id?: true
    childId?: true
    name?: true
    stage?: true
    level?: true
    exp?: true
    status?: true
    hunger?: true
    thirst?: true
    cleanliness?: true
    mood?: true
    health?: true
    lastDecayAt?: true
    lastFedAt?: true
    lastWateredAt?: true
    lastCleanedAt?: true
    lastPlayedAt?: true
    totalCareCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PetMaxAggregateInputType = {
    id?: true
    childId?: true
    name?: true
    stage?: true
    level?: true
    exp?: true
    status?: true
    hunger?: true
    thirst?: true
    cleanliness?: true
    mood?: true
    health?: true
    lastDecayAt?: true
    lastFedAt?: true
    lastWateredAt?: true
    lastCleanedAt?: true
    lastPlayedAt?: true
    totalCareCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PetCountAggregateInputType = {
    id?: true
    childId?: true
    name?: true
    stage?: true
    level?: true
    exp?: true
    status?: true
    hunger?: true
    thirst?: true
    cleanliness?: true
    mood?: true
    health?: true
    lastDecayAt?: true
    lastFedAt?: true
    lastWateredAt?: true
    lastCleanedAt?: true
    lastPlayedAt?: true
    totalCareCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pet to aggregate.
     */
    where?: PetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pets to fetch.
     */
    orderBy?: PetOrderByWithRelationInput | PetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pets
    **/
    _count?: true | PetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PetMaxAggregateInputType
  }

  export type GetPetAggregateType<T extends PetAggregateArgs> = {
        [P in keyof T & keyof AggregatePet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePet[P]>
      : GetScalarType<T[P], AggregatePet[P]>
  }




  export type PetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PetWhereInput
    orderBy?: PetOrderByWithAggregationInput | PetOrderByWithAggregationInput[]
    by: PetScalarFieldEnum[] | PetScalarFieldEnum
    having?: PetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PetCountAggregateInputType | true
    _avg?: PetAvgAggregateInputType
    _sum?: PetSumAggregateInputType
    _min?: PetMinAggregateInputType
    _max?: PetMaxAggregateInputType
  }

  export type PetGroupByOutputType = {
    id: string
    childId: string
    name: string
    stage: $Enums.PetStage
    level: number
    exp: number
    status: $Enums.PetStatus
    hunger: number
    thirst: number
    cleanliness: number
    mood: number
    health: number
    lastDecayAt: Date
    lastFedAt: Date | null
    lastWateredAt: Date | null
    lastCleanedAt: Date | null
    lastPlayedAt: Date | null
    totalCareCount: number
    createdAt: Date
    updatedAt: Date
    _count: PetCountAggregateOutputType | null
    _avg: PetAvgAggregateOutputType | null
    _sum: PetSumAggregateOutputType | null
    _min: PetMinAggregateOutputType | null
    _max: PetMaxAggregateOutputType | null
  }

  type GetPetGroupByPayload<T extends PetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PetGroupByOutputType[P]>
            : GetScalarType<T[P], PetGroupByOutputType[P]>
        }
      >
    >


  export type PetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childId?: boolean
    name?: boolean
    stage?: boolean
    level?: boolean
    exp?: boolean
    status?: boolean
    hunger?: boolean
    thirst?: boolean
    cleanliness?: boolean
    mood?: boolean
    health?: boolean
    lastDecayAt?: boolean
    lastFedAt?: boolean
    lastWateredAt?: boolean
    lastCleanedAt?: boolean
    lastPlayedAt?: boolean
    totalCareCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    child?: boolean | UserDefaultArgs<ExtArgs>
    logs?: boolean | Pet$logsArgs<ExtArgs>
    _count?: boolean | PetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pet"]>

  export type PetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childId?: boolean
    name?: boolean
    stage?: boolean
    level?: boolean
    exp?: boolean
    status?: boolean
    hunger?: boolean
    thirst?: boolean
    cleanliness?: boolean
    mood?: boolean
    health?: boolean
    lastDecayAt?: boolean
    lastFedAt?: boolean
    lastWateredAt?: boolean
    lastCleanedAt?: boolean
    lastPlayedAt?: boolean
    totalCareCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    child?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pet"]>

  export type PetSelectScalar = {
    id?: boolean
    childId?: boolean
    name?: boolean
    stage?: boolean
    level?: boolean
    exp?: boolean
    status?: boolean
    hunger?: boolean
    thirst?: boolean
    cleanliness?: boolean
    mood?: boolean
    health?: boolean
    lastDecayAt?: boolean
    lastFedAt?: boolean
    lastWateredAt?: boolean
    lastCleanedAt?: boolean
    lastPlayedAt?: boolean
    totalCareCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | UserDefaultArgs<ExtArgs>
    logs?: boolean | Pet$logsArgs<ExtArgs>
    _count?: boolean | PetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pet"
    objects: {
      child: Prisma.$UserPayload<ExtArgs>
      logs: Prisma.$PetLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      childId: string
      name: string
      stage: $Enums.PetStage
      level: number
      exp: number
      status: $Enums.PetStatus
      hunger: number
      thirst: number
      cleanliness: number
      mood: number
      health: number
      lastDecayAt: Date
      lastFedAt: Date | null
      lastWateredAt: Date | null
      lastCleanedAt: Date | null
      lastPlayedAt: Date | null
      totalCareCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pet"]>
    composites: {}
  }

  type PetGetPayload<S extends boolean | null | undefined | PetDefaultArgs> = $Result.GetResult<Prisma.$PetPayload, S>

  type PetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PetFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PetCountAggregateInputType | true
    }

  export interface PetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pet'], meta: { name: 'Pet' } }
    /**
     * Find zero or one Pet that matches the filter.
     * @param {PetFindUniqueArgs} args - Arguments to find a Pet
     * @example
     * // Get one Pet
     * const pet = await prisma.pet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PetFindUniqueArgs>(args: SelectSubset<T, PetFindUniqueArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Pet that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PetFindUniqueOrThrowArgs} args - Arguments to find a Pet
     * @example
     * // Get one Pet
     * const pet = await prisma.pet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PetFindUniqueOrThrowArgs>(args: SelectSubset<T, PetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Pet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetFindFirstArgs} args - Arguments to find a Pet
     * @example
     * // Get one Pet
     * const pet = await prisma.pet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PetFindFirstArgs>(args?: SelectSubset<T, PetFindFirstArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Pet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetFindFirstOrThrowArgs} args - Arguments to find a Pet
     * @example
     * // Get one Pet
     * const pet = await prisma.pet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PetFindFirstOrThrowArgs>(args?: SelectSubset<T, PetFindFirstOrThrowArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Pets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pets
     * const pets = await prisma.pet.findMany()
     * 
     * // Get first 10 Pets
     * const pets = await prisma.pet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const petWithIdOnly = await prisma.pet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PetFindManyArgs>(args?: SelectSubset<T, PetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Pet.
     * @param {PetCreateArgs} args - Arguments to create a Pet.
     * @example
     * // Create one Pet
     * const Pet = await prisma.pet.create({
     *   data: {
     *     // ... data to create a Pet
     *   }
     * })
     * 
     */
    create<T extends PetCreateArgs>(args: SelectSubset<T, PetCreateArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Pets.
     * @param {PetCreateManyArgs} args - Arguments to create many Pets.
     * @example
     * // Create many Pets
     * const pet = await prisma.pet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PetCreateManyArgs>(args?: SelectSubset<T, PetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pets and returns the data saved in the database.
     * @param {PetCreateManyAndReturnArgs} args - Arguments to create many Pets.
     * @example
     * // Create many Pets
     * const pet = await prisma.pet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pets and only return the `id`
     * const petWithIdOnly = await prisma.pet.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PetCreateManyAndReturnArgs>(args?: SelectSubset<T, PetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Pet.
     * @param {PetDeleteArgs} args - Arguments to delete one Pet.
     * @example
     * // Delete one Pet
     * const Pet = await prisma.pet.delete({
     *   where: {
     *     // ... filter to delete one Pet
     *   }
     * })
     * 
     */
    delete<T extends PetDeleteArgs>(args: SelectSubset<T, PetDeleteArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Pet.
     * @param {PetUpdateArgs} args - Arguments to update one Pet.
     * @example
     * // Update one Pet
     * const pet = await prisma.pet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PetUpdateArgs>(args: SelectSubset<T, PetUpdateArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Pets.
     * @param {PetDeleteManyArgs} args - Arguments to filter Pets to delete.
     * @example
     * // Delete a few Pets
     * const { count } = await prisma.pet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PetDeleteManyArgs>(args?: SelectSubset<T, PetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pets
     * const pet = await prisma.pet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PetUpdateManyArgs>(args: SelectSubset<T, PetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pet.
     * @param {PetUpsertArgs} args - Arguments to update or create a Pet.
     * @example
     * // Update or create a Pet
     * const pet = await prisma.pet.upsert({
     *   create: {
     *     // ... data to create a Pet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pet we want to update
     *   }
     * })
     */
    upsert<T extends PetUpsertArgs>(args: SelectSubset<T, PetUpsertArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Pets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetCountArgs} args - Arguments to filter Pets to count.
     * @example
     * // Count the number of Pets
     * const count = await prisma.pet.count({
     *   where: {
     *     // ... the filter for the Pets we want to count
     *   }
     * })
    **/
    count<T extends PetCountArgs>(
      args?: Subset<T, PetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PetAggregateArgs>(args: Subset<T, PetAggregateArgs>): Prisma.PrismaPromise<GetPetAggregateType<T>>

    /**
     * Group by Pet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetGroupByArgs} args - Group by arguments.
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
      T extends PetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PetGroupByArgs['orderBy'] }
        : { orderBy?: PetGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pet model
   */
  readonly fields: PetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    child<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    logs<T extends Pet$logsArgs<ExtArgs> = {}>(args?: Subset<T, Pet$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PetLogPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Pet model
   */ 
  interface PetFieldRefs {
    readonly id: FieldRef<"Pet", 'String'>
    readonly childId: FieldRef<"Pet", 'String'>
    readonly name: FieldRef<"Pet", 'String'>
    readonly stage: FieldRef<"Pet", 'PetStage'>
    readonly level: FieldRef<"Pet", 'Int'>
    readonly exp: FieldRef<"Pet", 'Int'>
    readonly status: FieldRef<"Pet", 'PetStatus'>
    readonly hunger: FieldRef<"Pet", 'Int'>
    readonly thirst: FieldRef<"Pet", 'Int'>
    readonly cleanliness: FieldRef<"Pet", 'Int'>
    readonly mood: FieldRef<"Pet", 'Int'>
    readonly health: FieldRef<"Pet", 'Int'>
    readonly lastDecayAt: FieldRef<"Pet", 'DateTime'>
    readonly lastFedAt: FieldRef<"Pet", 'DateTime'>
    readonly lastWateredAt: FieldRef<"Pet", 'DateTime'>
    readonly lastCleanedAt: FieldRef<"Pet", 'DateTime'>
    readonly lastPlayedAt: FieldRef<"Pet", 'DateTime'>
    readonly totalCareCount: FieldRef<"Pet", 'Int'>
    readonly createdAt: FieldRef<"Pet", 'DateTime'>
    readonly updatedAt: FieldRef<"Pet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pet findUnique
   */
  export type PetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    /**
     * Filter, which Pet to fetch.
     */
    where: PetWhereUniqueInput
  }

  /**
   * Pet findUniqueOrThrow
   */
  export type PetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    /**
     * Filter, which Pet to fetch.
     */
    where: PetWhereUniqueInput
  }

  /**
   * Pet findFirst
   */
  export type PetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    /**
     * Filter, which Pet to fetch.
     */
    where?: PetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pets to fetch.
     */
    orderBy?: PetOrderByWithRelationInput | PetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pets.
     */
    cursor?: PetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pets.
     */
    distinct?: PetScalarFieldEnum | PetScalarFieldEnum[]
  }

  /**
   * Pet findFirstOrThrow
   */
  export type PetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    /**
     * Filter, which Pet to fetch.
     */
    where?: PetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pets to fetch.
     */
    orderBy?: PetOrderByWithRelationInput | PetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pets.
     */
    cursor?: PetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pets.
     */
    distinct?: PetScalarFieldEnum | PetScalarFieldEnum[]
  }

  /**
   * Pet findMany
   */
  export type PetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    /**
     * Filter, which Pets to fetch.
     */
    where?: PetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pets to fetch.
     */
    orderBy?: PetOrderByWithRelationInput | PetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pets.
     */
    cursor?: PetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pets.
     */
    skip?: number
    distinct?: PetScalarFieldEnum | PetScalarFieldEnum[]
  }

  /**
   * Pet create
   */
  export type PetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    /**
     * The data needed to create a Pet.
     */
    data: XOR<PetCreateInput, PetUncheckedCreateInput>
  }

  /**
   * Pet createMany
   */
  export type PetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pets.
     */
    data: PetCreateManyInput | PetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pet createManyAndReturn
   */
  export type PetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Pets.
     */
    data: PetCreateManyInput | PetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pet update
   */
  export type PetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    /**
     * The data needed to update a Pet.
     */
    data: XOR<PetUpdateInput, PetUncheckedUpdateInput>
    /**
     * Choose, which Pet to update.
     */
    where: PetWhereUniqueInput
  }

  /**
   * Pet updateMany
   */
  export type PetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pets.
     */
    data: XOR<PetUpdateManyMutationInput, PetUncheckedUpdateManyInput>
    /**
     * Filter which Pets to update
     */
    where?: PetWhereInput
  }

  /**
   * Pet upsert
   */
  export type PetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    /**
     * The filter to search for the Pet to update in case it exists.
     */
    where: PetWhereUniqueInput
    /**
     * In case the Pet found by the `where` argument doesn't exist, create a new Pet with this data.
     */
    create: XOR<PetCreateInput, PetUncheckedCreateInput>
    /**
     * In case the Pet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PetUpdateInput, PetUncheckedUpdateInput>
  }

  /**
   * Pet delete
   */
  export type PetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
    /**
     * Filter which Pet to delete.
     */
    where: PetWhereUniqueInput
  }

  /**
   * Pet deleteMany
   */
  export type PetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pets to delete
     */
    where?: PetWhereInput
  }

  /**
   * Pet.logs
   */
  export type Pet$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PetLog
     */
    select?: PetLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetLogInclude<ExtArgs> | null
    where?: PetLogWhereInput
    orderBy?: PetLogOrderByWithRelationInput | PetLogOrderByWithRelationInput[]
    cursor?: PetLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PetLogScalarFieldEnum | PetLogScalarFieldEnum[]
  }

  /**
   * Pet without action
   */
  export type PetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pet
     */
    select?: PetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetInclude<ExtArgs> | null
  }


  /**
   * Model PetLog
   */

  export type AggregatePetLog = {
    _count: PetLogCountAggregateOutputType | null
    _avg: PetLogAvgAggregateOutputType | null
    _sum: PetLogSumAggregateOutputType | null
    _min: PetLogMinAggregateOutputType | null
    _max: PetLogMaxAggregateOutputType | null
  }

  export type PetLogAvgAggregateOutputType = {
    oldValue: number | null
    newValue: number | null
    pointsCost: number | null
  }

  export type PetLogSumAggregateOutputType = {
    oldValue: number | null
    newValue: number | null
    pointsCost: number | null
  }

  export type PetLogMinAggregateOutputType = {
    id: string | null
    petId: string | null
    action: $Enums.PetAction | null
    oldValue: number | null
    newValue: number | null
    pointsCost: number | null
    description: string | null
    createdAt: Date | null
  }

  export type PetLogMaxAggregateOutputType = {
    id: string | null
    petId: string | null
    action: $Enums.PetAction | null
    oldValue: number | null
    newValue: number | null
    pointsCost: number | null
    description: string | null
    createdAt: Date | null
  }

  export type PetLogCountAggregateOutputType = {
    id: number
    petId: number
    action: number
    oldValue: number
    newValue: number
    pointsCost: number
    description: number
    createdAt: number
    _all: number
  }


  export type PetLogAvgAggregateInputType = {
    oldValue?: true
    newValue?: true
    pointsCost?: true
  }

  export type PetLogSumAggregateInputType = {
    oldValue?: true
    newValue?: true
    pointsCost?: true
  }

  export type PetLogMinAggregateInputType = {
    id?: true
    petId?: true
    action?: true
    oldValue?: true
    newValue?: true
    pointsCost?: true
    description?: true
    createdAt?: true
  }

  export type PetLogMaxAggregateInputType = {
    id?: true
    petId?: true
    action?: true
    oldValue?: true
    newValue?: true
    pointsCost?: true
    description?: true
    createdAt?: true
  }

  export type PetLogCountAggregateInputType = {
    id?: true
    petId?: true
    action?: true
    oldValue?: true
    newValue?: true
    pointsCost?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type PetLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PetLog to aggregate.
     */
    where?: PetLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PetLogs to fetch.
     */
    orderBy?: PetLogOrderByWithRelationInput | PetLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PetLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PetLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PetLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PetLogs
    **/
    _count?: true | PetLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PetLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PetLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PetLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PetLogMaxAggregateInputType
  }

  export type GetPetLogAggregateType<T extends PetLogAggregateArgs> = {
        [P in keyof T & keyof AggregatePetLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePetLog[P]>
      : GetScalarType<T[P], AggregatePetLog[P]>
  }




  export type PetLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PetLogWhereInput
    orderBy?: PetLogOrderByWithAggregationInput | PetLogOrderByWithAggregationInput[]
    by: PetLogScalarFieldEnum[] | PetLogScalarFieldEnum
    having?: PetLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PetLogCountAggregateInputType | true
    _avg?: PetLogAvgAggregateInputType
    _sum?: PetLogSumAggregateInputType
    _min?: PetLogMinAggregateInputType
    _max?: PetLogMaxAggregateInputType
  }

  export type PetLogGroupByOutputType = {
    id: string
    petId: string
    action: $Enums.PetAction
    oldValue: number | null
    newValue: number | null
    pointsCost: number | null
    description: string
    createdAt: Date
    _count: PetLogCountAggregateOutputType | null
    _avg: PetLogAvgAggregateOutputType | null
    _sum: PetLogSumAggregateOutputType | null
    _min: PetLogMinAggregateOutputType | null
    _max: PetLogMaxAggregateOutputType | null
  }

  type GetPetLogGroupByPayload<T extends PetLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PetLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PetLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PetLogGroupByOutputType[P]>
            : GetScalarType<T[P], PetLogGroupByOutputType[P]>
        }
      >
    >


  export type PetLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    petId?: boolean
    action?: boolean
    oldValue?: boolean
    newValue?: boolean
    pointsCost?: boolean
    description?: boolean
    createdAt?: boolean
    pet?: boolean | PetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["petLog"]>

  export type PetLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    petId?: boolean
    action?: boolean
    oldValue?: boolean
    newValue?: boolean
    pointsCost?: boolean
    description?: boolean
    createdAt?: boolean
    pet?: boolean | PetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["petLog"]>

  export type PetLogSelectScalar = {
    id?: boolean
    petId?: boolean
    action?: boolean
    oldValue?: boolean
    newValue?: boolean
    pointsCost?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type PetLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pet?: boolean | PetDefaultArgs<ExtArgs>
  }
  export type PetLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pet?: boolean | PetDefaultArgs<ExtArgs>
  }

  export type $PetLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PetLog"
    objects: {
      pet: Prisma.$PetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      petId: string
      action: $Enums.PetAction
      oldValue: number | null
      newValue: number | null
      pointsCost: number | null
      description: string
      createdAt: Date
    }, ExtArgs["result"]["petLog"]>
    composites: {}
  }

  type PetLogGetPayload<S extends boolean | null | undefined | PetLogDefaultArgs> = $Result.GetResult<Prisma.$PetLogPayload, S>

  type PetLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PetLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PetLogCountAggregateInputType | true
    }

  export interface PetLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PetLog'], meta: { name: 'PetLog' } }
    /**
     * Find zero or one PetLog that matches the filter.
     * @param {PetLogFindUniqueArgs} args - Arguments to find a PetLog
     * @example
     * // Get one PetLog
     * const petLog = await prisma.petLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PetLogFindUniqueArgs>(args: SelectSubset<T, PetLogFindUniqueArgs<ExtArgs>>): Prisma__PetLogClient<$Result.GetResult<Prisma.$PetLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PetLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PetLogFindUniqueOrThrowArgs} args - Arguments to find a PetLog
     * @example
     * // Get one PetLog
     * const petLog = await prisma.petLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PetLogFindUniqueOrThrowArgs>(args: SelectSubset<T, PetLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PetLogClient<$Result.GetResult<Prisma.$PetLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PetLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetLogFindFirstArgs} args - Arguments to find a PetLog
     * @example
     * // Get one PetLog
     * const petLog = await prisma.petLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PetLogFindFirstArgs>(args?: SelectSubset<T, PetLogFindFirstArgs<ExtArgs>>): Prisma__PetLogClient<$Result.GetResult<Prisma.$PetLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PetLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetLogFindFirstOrThrowArgs} args - Arguments to find a PetLog
     * @example
     * // Get one PetLog
     * const petLog = await prisma.petLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PetLogFindFirstOrThrowArgs>(args?: SelectSubset<T, PetLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__PetLogClient<$Result.GetResult<Prisma.$PetLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PetLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PetLogs
     * const petLogs = await prisma.petLog.findMany()
     * 
     * // Get first 10 PetLogs
     * const petLogs = await prisma.petLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const petLogWithIdOnly = await prisma.petLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PetLogFindManyArgs>(args?: SelectSubset<T, PetLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PetLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PetLog.
     * @param {PetLogCreateArgs} args - Arguments to create a PetLog.
     * @example
     * // Create one PetLog
     * const PetLog = await prisma.petLog.create({
     *   data: {
     *     // ... data to create a PetLog
     *   }
     * })
     * 
     */
    create<T extends PetLogCreateArgs>(args: SelectSubset<T, PetLogCreateArgs<ExtArgs>>): Prisma__PetLogClient<$Result.GetResult<Prisma.$PetLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PetLogs.
     * @param {PetLogCreateManyArgs} args - Arguments to create many PetLogs.
     * @example
     * // Create many PetLogs
     * const petLog = await prisma.petLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PetLogCreateManyArgs>(args?: SelectSubset<T, PetLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PetLogs and returns the data saved in the database.
     * @param {PetLogCreateManyAndReturnArgs} args - Arguments to create many PetLogs.
     * @example
     * // Create many PetLogs
     * const petLog = await prisma.petLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PetLogs and only return the `id`
     * const petLogWithIdOnly = await prisma.petLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PetLogCreateManyAndReturnArgs>(args?: SelectSubset<T, PetLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PetLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PetLog.
     * @param {PetLogDeleteArgs} args - Arguments to delete one PetLog.
     * @example
     * // Delete one PetLog
     * const PetLog = await prisma.petLog.delete({
     *   where: {
     *     // ... filter to delete one PetLog
     *   }
     * })
     * 
     */
    delete<T extends PetLogDeleteArgs>(args: SelectSubset<T, PetLogDeleteArgs<ExtArgs>>): Prisma__PetLogClient<$Result.GetResult<Prisma.$PetLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PetLog.
     * @param {PetLogUpdateArgs} args - Arguments to update one PetLog.
     * @example
     * // Update one PetLog
     * const petLog = await prisma.petLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PetLogUpdateArgs>(args: SelectSubset<T, PetLogUpdateArgs<ExtArgs>>): Prisma__PetLogClient<$Result.GetResult<Prisma.$PetLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PetLogs.
     * @param {PetLogDeleteManyArgs} args - Arguments to filter PetLogs to delete.
     * @example
     * // Delete a few PetLogs
     * const { count } = await prisma.petLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PetLogDeleteManyArgs>(args?: SelectSubset<T, PetLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PetLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PetLogs
     * const petLog = await prisma.petLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PetLogUpdateManyArgs>(args: SelectSubset<T, PetLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PetLog.
     * @param {PetLogUpsertArgs} args - Arguments to update or create a PetLog.
     * @example
     * // Update or create a PetLog
     * const petLog = await prisma.petLog.upsert({
     *   create: {
     *     // ... data to create a PetLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PetLog we want to update
     *   }
     * })
     */
    upsert<T extends PetLogUpsertArgs>(args: SelectSubset<T, PetLogUpsertArgs<ExtArgs>>): Prisma__PetLogClient<$Result.GetResult<Prisma.$PetLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PetLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetLogCountArgs} args - Arguments to filter PetLogs to count.
     * @example
     * // Count the number of PetLogs
     * const count = await prisma.petLog.count({
     *   where: {
     *     // ... the filter for the PetLogs we want to count
     *   }
     * })
    **/
    count<T extends PetLogCountArgs>(
      args?: Subset<T, PetLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PetLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PetLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PetLogAggregateArgs>(args: Subset<T, PetLogAggregateArgs>): Prisma.PrismaPromise<GetPetLogAggregateType<T>>

    /**
     * Group by PetLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PetLogGroupByArgs} args - Group by arguments.
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
      T extends PetLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PetLogGroupByArgs['orderBy'] }
        : { orderBy?: PetLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PetLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPetLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PetLog model
   */
  readonly fields: PetLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PetLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PetLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pet<T extends PetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PetDefaultArgs<ExtArgs>>): Prisma__PetClient<$Result.GetResult<Prisma.$PetPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the PetLog model
   */ 
  interface PetLogFieldRefs {
    readonly id: FieldRef<"PetLog", 'String'>
    readonly petId: FieldRef<"PetLog", 'String'>
    readonly action: FieldRef<"PetLog", 'PetAction'>
    readonly oldValue: FieldRef<"PetLog", 'Int'>
    readonly newValue: FieldRef<"PetLog", 'Int'>
    readonly pointsCost: FieldRef<"PetLog", 'Int'>
    readonly description: FieldRef<"PetLog", 'String'>
    readonly createdAt: FieldRef<"PetLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PetLog findUnique
   */
  export type PetLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PetLog
     */
    select?: PetLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetLogInclude<ExtArgs> | null
    /**
     * Filter, which PetLog to fetch.
     */
    where: PetLogWhereUniqueInput
  }

  /**
   * PetLog findUniqueOrThrow
   */
  export type PetLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PetLog
     */
    select?: PetLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetLogInclude<ExtArgs> | null
    /**
     * Filter, which PetLog to fetch.
     */
    where: PetLogWhereUniqueInput
  }

  /**
   * PetLog findFirst
   */
  export type PetLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PetLog
     */
    select?: PetLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetLogInclude<ExtArgs> | null
    /**
     * Filter, which PetLog to fetch.
     */
    where?: PetLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PetLogs to fetch.
     */
    orderBy?: PetLogOrderByWithRelationInput | PetLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PetLogs.
     */
    cursor?: PetLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PetLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PetLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PetLogs.
     */
    distinct?: PetLogScalarFieldEnum | PetLogScalarFieldEnum[]
  }

  /**
   * PetLog findFirstOrThrow
   */
  export type PetLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PetLog
     */
    select?: PetLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetLogInclude<ExtArgs> | null
    /**
     * Filter, which PetLog to fetch.
     */
    where?: PetLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PetLogs to fetch.
     */
    orderBy?: PetLogOrderByWithRelationInput | PetLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PetLogs.
     */
    cursor?: PetLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PetLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PetLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PetLogs.
     */
    distinct?: PetLogScalarFieldEnum | PetLogScalarFieldEnum[]
  }

  /**
   * PetLog findMany
   */
  export type PetLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PetLog
     */
    select?: PetLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetLogInclude<ExtArgs> | null
    /**
     * Filter, which PetLogs to fetch.
     */
    where?: PetLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PetLogs to fetch.
     */
    orderBy?: PetLogOrderByWithRelationInput | PetLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PetLogs.
     */
    cursor?: PetLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PetLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PetLogs.
     */
    skip?: number
    distinct?: PetLogScalarFieldEnum | PetLogScalarFieldEnum[]
  }

  /**
   * PetLog create
   */
  export type PetLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PetLog
     */
    select?: PetLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetLogInclude<ExtArgs> | null
    /**
     * The data needed to create a PetLog.
     */
    data: XOR<PetLogCreateInput, PetLogUncheckedCreateInput>
  }

  /**
   * PetLog createMany
   */
  export type PetLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PetLogs.
     */
    data: PetLogCreateManyInput | PetLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PetLog createManyAndReturn
   */
  export type PetLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PetLog
     */
    select?: PetLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PetLogs.
     */
    data: PetLogCreateManyInput | PetLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PetLog update
   */
  export type PetLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PetLog
     */
    select?: PetLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetLogInclude<ExtArgs> | null
    /**
     * The data needed to update a PetLog.
     */
    data: XOR<PetLogUpdateInput, PetLogUncheckedUpdateInput>
    /**
     * Choose, which PetLog to update.
     */
    where: PetLogWhereUniqueInput
  }

  /**
   * PetLog updateMany
   */
  export type PetLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PetLogs.
     */
    data: XOR<PetLogUpdateManyMutationInput, PetLogUncheckedUpdateManyInput>
    /**
     * Filter which PetLogs to update
     */
    where?: PetLogWhereInput
  }

  /**
   * PetLog upsert
   */
  export type PetLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PetLog
     */
    select?: PetLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetLogInclude<ExtArgs> | null
    /**
     * The filter to search for the PetLog to update in case it exists.
     */
    where: PetLogWhereUniqueInput
    /**
     * In case the PetLog found by the `where` argument doesn't exist, create a new PetLog with this data.
     */
    create: XOR<PetLogCreateInput, PetLogUncheckedCreateInput>
    /**
     * In case the PetLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PetLogUpdateInput, PetLogUncheckedUpdateInput>
  }

  /**
   * PetLog delete
   */
  export type PetLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PetLog
     */
    select?: PetLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetLogInclude<ExtArgs> | null
    /**
     * Filter which PetLog to delete.
     */
    where: PetLogWhereUniqueInput
  }

  /**
   * PetLog deleteMany
   */
  export type PetLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PetLogs to delete
     */
    where?: PetLogWhereInput
  }

  /**
   * PetLog without action
   */
  export type PetLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PetLog
     */
    select?: PetLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PetLogInclude<ExtArgs> | null
  }


  /**
   * Model TaskPlan
   */

  export type AggregateTaskPlan = {
    _count: TaskPlanCountAggregateOutputType | null
    _avg: TaskPlanAvgAggregateOutputType | null
    _sum: TaskPlanSumAggregateOutputType | null
    _min: TaskPlanMinAggregateOutputType | null
    _max: TaskPlanMaxAggregateOutputType | null
  }

  export type TaskPlanAvgAggregateOutputType = {
    points: number | null
  }

  export type TaskPlanSumAggregateOutputType = {
    points: number | null
  }

  export type TaskPlanMinAggregateOutputType = {
    id: string | null
    childId: string | null
    title: string | null
    description: string | null
    points: number | null
    scheduledAt: Date | null
    dueAt: Date | null
    frequency: $Enums.Frequency | null
    enabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskPlanMaxAggregateOutputType = {
    id: string | null
    childId: string | null
    title: string | null
    description: string | null
    points: number | null
    scheduledAt: Date | null
    dueAt: Date | null
    frequency: $Enums.Frequency | null
    enabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TaskPlanCountAggregateOutputType = {
    id: number
    childId: number
    title: number
    description: number
    points: number
    scheduledAt: number
    dueAt: number
    frequency: number
    enabled: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TaskPlanAvgAggregateInputType = {
    points?: true
  }

  export type TaskPlanSumAggregateInputType = {
    points?: true
  }

  export type TaskPlanMinAggregateInputType = {
    id?: true
    childId?: true
    title?: true
    description?: true
    points?: true
    scheduledAt?: true
    dueAt?: true
    frequency?: true
    enabled?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskPlanMaxAggregateInputType = {
    id?: true
    childId?: true
    title?: true
    description?: true
    points?: true
    scheduledAt?: true
    dueAt?: true
    frequency?: true
    enabled?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TaskPlanCountAggregateInputType = {
    id?: true
    childId?: true
    title?: true
    description?: true
    points?: true
    scheduledAt?: true
    dueAt?: true
    frequency?: true
    enabled?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TaskPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskPlan to aggregate.
     */
    where?: TaskPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskPlans to fetch.
     */
    orderBy?: TaskPlanOrderByWithRelationInput | TaskPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskPlans
    **/
    _count?: true | TaskPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskPlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskPlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskPlanMaxAggregateInputType
  }

  export type GetTaskPlanAggregateType<T extends TaskPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskPlan[P]>
      : GetScalarType<T[P], AggregateTaskPlan[P]>
  }




  export type TaskPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskPlanWhereInput
    orderBy?: TaskPlanOrderByWithAggregationInput | TaskPlanOrderByWithAggregationInput[]
    by: TaskPlanScalarFieldEnum[] | TaskPlanScalarFieldEnum
    having?: TaskPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskPlanCountAggregateInputType | true
    _avg?: TaskPlanAvgAggregateInputType
    _sum?: TaskPlanSumAggregateInputType
    _min?: TaskPlanMinAggregateInputType
    _max?: TaskPlanMaxAggregateInputType
  }

  export type TaskPlanGroupByOutputType = {
    id: string
    childId: string
    title: string
    description: string | null
    points: number
    scheduledAt: Date | null
    dueAt: Date | null
    frequency: $Enums.Frequency | null
    enabled: boolean
    createdAt: Date
    updatedAt: Date
    _count: TaskPlanCountAggregateOutputType | null
    _avg: TaskPlanAvgAggregateOutputType | null
    _sum: TaskPlanSumAggregateOutputType | null
    _min: TaskPlanMinAggregateOutputType | null
    _max: TaskPlanMaxAggregateOutputType | null
  }

  type GetTaskPlanGroupByPayload<T extends TaskPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskPlanGroupByOutputType[P]>
            : GetScalarType<T[P], TaskPlanGroupByOutputType[P]>
        }
      >
    >


  export type TaskPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childId?: boolean
    title?: boolean
    description?: boolean
    points?: boolean
    scheduledAt?: boolean
    dueAt?: boolean
    frequency?: boolean
    enabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    child?: boolean | UserDefaultArgs<ExtArgs>
    logs?: boolean | TaskPlan$logsArgs<ExtArgs>
    _count?: boolean | TaskPlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskPlan"]>

  export type TaskPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childId?: boolean
    title?: boolean
    description?: boolean
    points?: boolean
    scheduledAt?: boolean
    dueAt?: boolean
    frequency?: boolean
    enabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    child?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskPlan"]>

  export type TaskPlanSelectScalar = {
    id?: boolean
    childId?: boolean
    title?: boolean
    description?: boolean
    points?: boolean
    scheduledAt?: boolean
    dueAt?: boolean
    frequency?: boolean
    enabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TaskPlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | UserDefaultArgs<ExtArgs>
    logs?: boolean | TaskPlan$logsArgs<ExtArgs>
    _count?: boolean | TaskPlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskPlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TaskPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskPlan"
    objects: {
      child: Prisma.$UserPayload<ExtArgs>
      logs: Prisma.$TaskLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      childId: string
      title: string
      description: string | null
      points: number
      scheduledAt: Date | null
      dueAt: Date | null
      frequency: $Enums.Frequency | null
      enabled: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["taskPlan"]>
    composites: {}
  }

  type TaskPlanGetPayload<S extends boolean | null | undefined | TaskPlanDefaultArgs> = $Result.GetResult<Prisma.$TaskPlanPayload, S>

  type TaskPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TaskPlanFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TaskPlanCountAggregateInputType | true
    }

  export interface TaskPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskPlan'], meta: { name: 'TaskPlan' } }
    /**
     * Find zero or one TaskPlan that matches the filter.
     * @param {TaskPlanFindUniqueArgs} args - Arguments to find a TaskPlan
     * @example
     * // Get one TaskPlan
     * const taskPlan = await prisma.taskPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskPlanFindUniqueArgs>(args: SelectSubset<T, TaskPlanFindUniqueArgs<ExtArgs>>): Prisma__TaskPlanClient<$Result.GetResult<Prisma.$TaskPlanPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TaskPlan that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TaskPlanFindUniqueOrThrowArgs} args - Arguments to find a TaskPlan
     * @example
     * // Get one TaskPlan
     * const taskPlan = await prisma.taskPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskPlanClient<$Result.GetResult<Prisma.$TaskPlanPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TaskPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskPlanFindFirstArgs} args - Arguments to find a TaskPlan
     * @example
     * // Get one TaskPlan
     * const taskPlan = await prisma.taskPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskPlanFindFirstArgs>(args?: SelectSubset<T, TaskPlanFindFirstArgs<ExtArgs>>): Prisma__TaskPlanClient<$Result.GetResult<Prisma.$TaskPlanPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TaskPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskPlanFindFirstOrThrowArgs} args - Arguments to find a TaskPlan
     * @example
     * // Get one TaskPlan
     * const taskPlan = await prisma.taskPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskPlanClient<$Result.GetResult<Prisma.$TaskPlanPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TaskPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskPlans
     * const taskPlans = await prisma.taskPlan.findMany()
     * 
     * // Get first 10 TaskPlans
     * const taskPlans = await prisma.taskPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskPlanWithIdOnly = await prisma.taskPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskPlanFindManyArgs>(args?: SelectSubset<T, TaskPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPlanPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TaskPlan.
     * @param {TaskPlanCreateArgs} args - Arguments to create a TaskPlan.
     * @example
     * // Create one TaskPlan
     * const TaskPlan = await prisma.taskPlan.create({
     *   data: {
     *     // ... data to create a TaskPlan
     *   }
     * })
     * 
     */
    create<T extends TaskPlanCreateArgs>(args: SelectSubset<T, TaskPlanCreateArgs<ExtArgs>>): Prisma__TaskPlanClient<$Result.GetResult<Prisma.$TaskPlanPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TaskPlans.
     * @param {TaskPlanCreateManyArgs} args - Arguments to create many TaskPlans.
     * @example
     * // Create many TaskPlans
     * const taskPlan = await prisma.taskPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskPlanCreateManyArgs>(args?: SelectSubset<T, TaskPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskPlans and returns the data saved in the database.
     * @param {TaskPlanCreateManyAndReturnArgs} args - Arguments to create many TaskPlans.
     * @example
     * // Create many TaskPlans
     * const taskPlan = await prisma.taskPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskPlans and only return the `id`
     * const taskPlanWithIdOnly = await prisma.taskPlan.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPlanPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TaskPlan.
     * @param {TaskPlanDeleteArgs} args - Arguments to delete one TaskPlan.
     * @example
     * // Delete one TaskPlan
     * const TaskPlan = await prisma.taskPlan.delete({
     *   where: {
     *     // ... filter to delete one TaskPlan
     *   }
     * })
     * 
     */
    delete<T extends TaskPlanDeleteArgs>(args: SelectSubset<T, TaskPlanDeleteArgs<ExtArgs>>): Prisma__TaskPlanClient<$Result.GetResult<Prisma.$TaskPlanPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TaskPlan.
     * @param {TaskPlanUpdateArgs} args - Arguments to update one TaskPlan.
     * @example
     * // Update one TaskPlan
     * const taskPlan = await prisma.taskPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskPlanUpdateArgs>(args: SelectSubset<T, TaskPlanUpdateArgs<ExtArgs>>): Prisma__TaskPlanClient<$Result.GetResult<Prisma.$TaskPlanPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TaskPlans.
     * @param {TaskPlanDeleteManyArgs} args - Arguments to filter TaskPlans to delete.
     * @example
     * // Delete a few TaskPlans
     * const { count } = await prisma.taskPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskPlanDeleteManyArgs>(args?: SelectSubset<T, TaskPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskPlans
     * const taskPlan = await prisma.taskPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskPlanUpdateManyArgs>(args: SelectSubset<T, TaskPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TaskPlan.
     * @param {TaskPlanUpsertArgs} args - Arguments to update or create a TaskPlan.
     * @example
     * // Update or create a TaskPlan
     * const taskPlan = await prisma.taskPlan.upsert({
     *   create: {
     *     // ... data to create a TaskPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskPlan we want to update
     *   }
     * })
     */
    upsert<T extends TaskPlanUpsertArgs>(args: SelectSubset<T, TaskPlanUpsertArgs<ExtArgs>>): Prisma__TaskPlanClient<$Result.GetResult<Prisma.$TaskPlanPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TaskPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskPlanCountArgs} args - Arguments to filter TaskPlans to count.
     * @example
     * // Count the number of TaskPlans
     * const count = await prisma.taskPlan.count({
     *   where: {
     *     // ... the filter for the TaskPlans we want to count
     *   }
     * })
    **/
    count<T extends TaskPlanCountArgs>(
      args?: Subset<T, TaskPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TaskPlanAggregateArgs>(args: Subset<T, TaskPlanAggregateArgs>): Prisma.PrismaPromise<GetTaskPlanAggregateType<T>>

    /**
     * Group by TaskPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskPlanGroupByArgs} args - Group by arguments.
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
      T extends TaskPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskPlanGroupByArgs['orderBy'] }
        : { orderBy?: TaskPlanGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TaskPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskPlan model
   */
  readonly fields: TaskPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    child<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    logs<T extends TaskPlan$logsArgs<ExtArgs> = {}>(args?: Subset<T, TaskPlan$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the TaskPlan model
   */ 
  interface TaskPlanFieldRefs {
    readonly id: FieldRef<"TaskPlan", 'String'>
    readonly childId: FieldRef<"TaskPlan", 'String'>
    readonly title: FieldRef<"TaskPlan", 'String'>
    readonly description: FieldRef<"TaskPlan", 'String'>
    readonly points: FieldRef<"TaskPlan", 'Int'>
    readonly scheduledAt: FieldRef<"TaskPlan", 'DateTime'>
    readonly dueAt: FieldRef<"TaskPlan", 'DateTime'>
    readonly frequency: FieldRef<"TaskPlan", 'Frequency'>
    readonly enabled: FieldRef<"TaskPlan", 'Boolean'>
    readonly createdAt: FieldRef<"TaskPlan", 'DateTime'>
    readonly updatedAt: FieldRef<"TaskPlan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TaskPlan findUnique
   */
  export type TaskPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPlan
     */
    select?: TaskPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPlanInclude<ExtArgs> | null
    /**
     * Filter, which TaskPlan to fetch.
     */
    where: TaskPlanWhereUniqueInput
  }

  /**
   * TaskPlan findUniqueOrThrow
   */
  export type TaskPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPlan
     */
    select?: TaskPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPlanInclude<ExtArgs> | null
    /**
     * Filter, which TaskPlan to fetch.
     */
    where: TaskPlanWhereUniqueInput
  }

  /**
   * TaskPlan findFirst
   */
  export type TaskPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPlan
     */
    select?: TaskPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPlanInclude<ExtArgs> | null
    /**
     * Filter, which TaskPlan to fetch.
     */
    where?: TaskPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskPlans to fetch.
     */
    orderBy?: TaskPlanOrderByWithRelationInput | TaskPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskPlans.
     */
    cursor?: TaskPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskPlans.
     */
    distinct?: TaskPlanScalarFieldEnum | TaskPlanScalarFieldEnum[]
  }

  /**
   * TaskPlan findFirstOrThrow
   */
  export type TaskPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPlan
     */
    select?: TaskPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPlanInclude<ExtArgs> | null
    /**
     * Filter, which TaskPlan to fetch.
     */
    where?: TaskPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskPlans to fetch.
     */
    orderBy?: TaskPlanOrderByWithRelationInput | TaskPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskPlans.
     */
    cursor?: TaskPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskPlans.
     */
    distinct?: TaskPlanScalarFieldEnum | TaskPlanScalarFieldEnum[]
  }

  /**
   * TaskPlan findMany
   */
  export type TaskPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPlan
     */
    select?: TaskPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPlanInclude<ExtArgs> | null
    /**
     * Filter, which TaskPlans to fetch.
     */
    where?: TaskPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskPlans to fetch.
     */
    orderBy?: TaskPlanOrderByWithRelationInput | TaskPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskPlans.
     */
    cursor?: TaskPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskPlans.
     */
    skip?: number
    distinct?: TaskPlanScalarFieldEnum | TaskPlanScalarFieldEnum[]
  }

  /**
   * TaskPlan create
   */
  export type TaskPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPlan
     */
    select?: TaskPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPlanInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskPlan.
     */
    data: XOR<TaskPlanCreateInput, TaskPlanUncheckedCreateInput>
  }

  /**
   * TaskPlan createMany
   */
  export type TaskPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskPlans.
     */
    data: TaskPlanCreateManyInput | TaskPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskPlan createManyAndReturn
   */
  export type TaskPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPlan
     */
    select?: TaskPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TaskPlans.
     */
    data: TaskPlanCreateManyInput | TaskPlanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPlanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskPlan update
   */
  export type TaskPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPlan
     */
    select?: TaskPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPlanInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskPlan.
     */
    data: XOR<TaskPlanUpdateInput, TaskPlanUncheckedUpdateInput>
    /**
     * Choose, which TaskPlan to update.
     */
    where: TaskPlanWhereUniqueInput
  }

  /**
   * TaskPlan updateMany
   */
  export type TaskPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskPlans.
     */
    data: XOR<TaskPlanUpdateManyMutationInput, TaskPlanUncheckedUpdateManyInput>
    /**
     * Filter which TaskPlans to update
     */
    where?: TaskPlanWhereInput
  }

  /**
   * TaskPlan upsert
   */
  export type TaskPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPlan
     */
    select?: TaskPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPlanInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskPlan to update in case it exists.
     */
    where: TaskPlanWhereUniqueInput
    /**
     * In case the TaskPlan found by the `where` argument doesn't exist, create a new TaskPlan with this data.
     */
    create: XOR<TaskPlanCreateInput, TaskPlanUncheckedCreateInput>
    /**
     * In case the TaskPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskPlanUpdateInput, TaskPlanUncheckedUpdateInput>
  }

  /**
   * TaskPlan delete
   */
  export type TaskPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPlan
     */
    select?: TaskPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPlanInclude<ExtArgs> | null
    /**
     * Filter which TaskPlan to delete.
     */
    where: TaskPlanWhereUniqueInput
  }

  /**
   * TaskPlan deleteMany
   */
  export type TaskPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskPlans to delete
     */
    where?: TaskPlanWhereInput
  }

  /**
   * TaskPlan.logs
   */
  export type TaskPlan$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    where?: TaskLogWhereInput
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    cursor?: TaskLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskLogScalarFieldEnum | TaskLogScalarFieldEnum[]
  }

  /**
   * TaskPlan without action
   */
  export type TaskPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPlan
     */
    select?: TaskPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPlanInclude<ExtArgs> | null
  }


  /**
   * Model TaskLog
   */

  export type AggregateTaskLog = {
    _count: TaskLogCountAggregateOutputType | null
    _avg: TaskLogAvgAggregateOutputType | null
    _sum: TaskLogSumAggregateOutputType | null
    _min: TaskLogMinAggregateOutputType | null
    _max: TaskLogMaxAggregateOutputType | null
  }

  export type TaskLogAvgAggregateOutputType = {
    points: number | null
  }

  export type TaskLogSumAggregateOutputType = {
    points: number | null
  }

  export type TaskLogMinAggregateOutputType = {
    id: string | null
    taskPlanId: string | null
    childId: string | null
    points: number | null
    note: string | null
    createdAt: Date | null
  }

  export type TaskLogMaxAggregateOutputType = {
    id: string | null
    taskPlanId: string | null
    childId: string | null
    points: number | null
    note: string | null
    createdAt: Date | null
  }

  export type TaskLogCountAggregateOutputType = {
    id: number
    taskPlanId: number
    childId: number
    points: number
    note: number
    createdAt: number
    _all: number
  }


  export type TaskLogAvgAggregateInputType = {
    points?: true
  }

  export type TaskLogSumAggregateInputType = {
    points?: true
  }

  export type TaskLogMinAggregateInputType = {
    id?: true
    taskPlanId?: true
    childId?: true
    points?: true
    note?: true
    createdAt?: true
  }

  export type TaskLogMaxAggregateInputType = {
    id?: true
    taskPlanId?: true
    childId?: true
    points?: true
    note?: true
    createdAt?: true
  }

  export type TaskLogCountAggregateInputType = {
    id?: true
    taskPlanId?: true
    childId?: true
    points?: true
    note?: true
    createdAt?: true
    _all?: true
  }

  export type TaskLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskLog to aggregate.
     */
    where?: TaskLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLogs to fetch.
     */
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TaskLogs
    **/
    _count?: true | TaskLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskLogMaxAggregateInputType
  }

  export type GetTaskLogAggregateType<T extends TaskLogAggregateArgs> = {
        [P in keyof T & keyof AggregateTaskLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaskLog[P]>
      : GetScalarType<T[P], AggregateTaskLog[P]>
  }




  export type TaskLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskLogWhereInput
    orderBy?: TaskLogOrderByWithAggregationInput | TaskLogOrderByWithAggregationInput[]
    by: TaskLogScalarFieldEnum[] | TaskLogScalarFieldEnum
    having?: TaskLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskLogCountAggregateInputType | true
    _avg?: TaskLogAvgAggregateInputType
    _sum?: TaskLogSumAggregateInputType
    _min?: TaskLogMinAggregateInputType
    _max?: TaskLogMaxAggregateInputType
  }

  export type TaskLogGroupByOutputType = {
    id: string
    taskPlanId: string | null
    childId: string
    points: number
    note: string | null
    createdAt: Date
    _count: TaskLogCountAggregateOutputType | null
    _avg: TaskLogAvgAggregateOutputType | null
    _sum: TaskLogSumAggregateOutputType | null
    _min: TaskLogMinAggregateOutputType | null
    _max: TaskLogMaxAggregateOutputType | null
  }

  type GetTaskLogGroupByPayload<T extends TaskLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskLogGroupByOutputType[P]>
            : GetScalarType<T[P], TaskLogGroupByOutputType[P]>
        }
      >
    >


  export type TaskLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskPlanId?: boolean
    childId?: boolean
    points?: boolean
    note?: boolean
    createdAt?: boolean
    taskPlan?: boolean | TaskLog$taskPlanArgs<ExtArgs>
    child?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskLog"]>

  export type TaskLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    taskPlanId?: boolean
    childId?: boolean
    points?: boolean
    note?: boolean
    createdAt?: boolean
    taskPlan?: boolean | TaskLog$taskPlanArgs<ExtArgs>
    child?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taskLog"]>

  export type TaskLogSelectScalar = {
    id?: boolean
    taskPlanId?: boolean
    childId?: boolean
    points?: boolean
    note?: boolean
    createdAt?: boolean
  }

  export type TaskLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    taskPlan?: boolean | TaskLog$taskPlanArgs<ExtArgs>
    child?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TaskLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    taskPlan?: boolean | TaskLog$taskPlanArgs<ExtArgs>
    child?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TaskLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TaskLog"
    objects: {
      taskPlan: Prisma.$TaskPlanPayload<ExtArgs> | null
      child: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      taskPlanId: string | null
      childId: string
      points: number
      note: string | null
      createdAt: Date
    }, ExtArgs["result"]["taskLog"]>
    composites: {}
  }

  type TaskLogGetPayload<S extends boolean | null | undefined | TaskLogDefaultArgs> = $Result.GetResult<Prisma.$TaskLogPayload, S>

  type TaskLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TaskLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TaskLogCountAggregateInputType | true
    }

  export interface TaskLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TaskLog'], meta: { name: 'TaskLog' } }
    /**
     * Find zero or one TaskLog that matches the filter.
     * @param {TaskLogFindUniqueArgs} args - Arguments to find a TaskLog
     * @example
     * // Get one TaskLog
     * const taskLog = await prisma.taskLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskLogFindUniqueArgs>(args: SelectSubset<T, TaskLogFindUniqueArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TaskLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TaskLogFindUniqueOrThrowArgs} args - Arguments to find a TaskLog
     * @example
     * // Get one TaskLog
     * const taskLog = await prisma.taskLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskLogFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TaskLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogFindFirstArgs} args - Arguments to find a TaskLog
     * @example
     * // Get one TaskLog
     * const taskLog = await prisma.taskLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskLogFindFirstArgs>(args?: SelectSubset<T, TaskLogFindFirstArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TaskLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogFindFirstOrThrowArgs} args - Arguments to find a TaskLog
     * @example
     * // Get one TaskLog
     * const taskLog = await prisma.taskLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskLogFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TaskLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TaskLogs
     * const taskLogs = await prisma.taskLog.findMany()
     * 
     * // Get first 10 TaskLogs
     * const taskLogs = await prisma.taskLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskLogWithIdOnly = await prisma.taskLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskLogFindManyArgs>(args?: SelectSubset<T, TaskLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TaskLog.
     * @param {TaskLogCreateArgs} args - Arguments to create a TaskLog.
     * @example
     * // Create one TaskLog
     * const TaskLog = await prisma.taskLog.create({
     *   data: {
     *     // ... data to create a TaskLog
     *   }
     * })
     * 
     */
    create<T extends TaskLogCreateArgs>(args: SelectSubset<T, TaskLogCreateArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TaskLogs.
     * @param {TaskLogCreateManyArgs} args - Arguments to create many TaskLogs.
     * @example
     * // Create many TaskLogs
     * const taskLog = await prisma.taskLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskLogCreateManyArgs>(args?: SelectSubset<T, TaskLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TaskLogs and returns the data saved in the database.
     * @param {TaskLogCreateManyAndReturnArgs} args - Arguments to create many TaskLogs.
     * @example
     * // Create many TaskLogs
     * const taskLog = await prisma.taskLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TaskLogs and only return the `id`
     * const taskLogWithIdOnly = await prisma.taskLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskLogCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TaskLog.
     * @param {TaskLogDeleteArgs} args - Arguments to delete one TaskLog.
     * @example
     * // Delete one TaskLog
     * const TaskLog = await prisma.taskLog.delete({
     *   where: {
     *     // ... filter to delete one TaskLog
     *   }
     * })
     * 
     */
    delete<T extends TaskLogDeleteArgs>(args: SelectSubset<T, TaskLogDeleteArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TaskLog.
     * @param {TaskLogUpdateArgs} args - Arguments to update one TaskLog.
     * @example
     * // Update one TaskLog
     * const taskLog = await prisma.taskLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskLogUpdateArgs>(args: SelectSubset<T, TaskLogUpdateArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TaskLogs.
     * @param {TaskLogDeleteManyArgs} args - Arguments to filter TaskLogs to delete.
     * @example
     * // Delete a few TaskLogs
     * const { count } = await prisma.taskLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskLogDeleteManyArgs>(args?: SelectSubset<T, TaskLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TaskLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TaskLogs
     * const taskLog = await prisma.taskLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskLogUpdateManyArgs>(args: SelectSubset<T, TaskLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TaskLog.
     * @param {TaskLogUpsertArgs} args - Arguments to update or create a TaskLog.
     * @example
     * // Update or create a TaskLog
     * const taskLog = await prisma.taskLog.upsert({
     *   create: {
     *     // ... data to create a TaskLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TaskLog we want to update
     *   }
     * })
     */
    upsert<T extends TaskLogUpsertArgs>(args: SelectSubset<T, TaskLogUpsertArgs<ExtArgs>>): Prisma__TaskLogClient<$Result.GetResult<Prisma.$TaskLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TaskLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogCountArgs} args - Arguments to filter TaskLogs to count.
     * @example
     * // Count the number of TaskLogs
     * const count = await prisma.taskLog.count({
     *   where: {
     *     // ... the filter for the TaskLogs we want to count
     *   }
     * })
    **/
    count<T extends TaskLogCountArgs>(
      args?: Subset<T, TaskLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TaskLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TaskLogAggregateArgs>(args: Subset<T, TaskLogAggregateArgs>): Prisma.PrismaPromise<GetTaskLogAggregateType<T>>

    /**
     * Group by TaskLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskLogGroupByArgs} args - Group by arguments.
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
      T extends TaskLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskLogGroupByArgs['orderBy'] }
        : { orderBy?: TaskLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TaskLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TaskLog model
   */
  readonly fields: TaskLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TaskLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    taskPlan<T extends TaskLog$taskPlanArgs<ExtArgs> = {}>(args?: Subset<T, TaskLog$taskPlanArgs<ExtArgs>>): Prisma__TaskPlanClient<$Result.GetResult<Prisma.$TaskPlanPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    child<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the TaskLog model
   */ 
  interface TaskLogFieldRefs {
    readonly id: FieldRef<"TaskLog", 'String'>
    readonly taskPlanId: FieldRef<"TaskLog", 'String'>
    readonly childId: FieldRef<"TaskLog", 'String'>
    readonly points: FieldRef<"TaskLog", 'Int'>
    readonly note: FieldRef<"TaskLog", 'String'>
    readonly createdAt: FieldRef<"TaskLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TaskLog findUnique
   */
  export type TaskLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLog to fetch.
     */
    where: TaskLogWhereUniqueInput
  }

  /**
   * TaskLog findUniqueOrThrow
   */
  export type TaskLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLog to fetch.
     */
    where: TaskLogWhereUniqueInput
  }

  /**
   * TaskLog findFirst
   */
  export type TaskLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLog to fetch.
     */
    where?: TaskLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLogs to fetch.
     */
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskLogs.
     */
    cursor?: TaskLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskLogs.
     */
    distinct?: TaskLogScalarFieldEnum | TaskLogScalarFieldEnum[]
  }

  /**
   * TaskLog findFirstOrThrow
   */
  export type TaskLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLog to fetch.
     */
    where?: TaskLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLogs to fetch.
     */
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TaskLogs.
     */
    cursor?: TaskLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TaskLogs.
     */
    distinct?: TaskLogScalarFieldEnum | TaskLogScalarFieldEnum[]
  }

  /**
   * TaskLog findMany
   */
  export type TaskLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter, which TaskLogs to fetch.
     */
    where?: TaskLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TaskLogs to fetch.
     */
    orderBy?: TaskLogOrderByWithRelationInput | TaskLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TaskLogs.
     */
    cursor?: TaskLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TaskLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TaskLogs.
     */
    skip?: number
    distinct?: TaskLogScalarFieldEnum | TaskLogScalarFieldEnum[]
  }

  /**
   * TaskLog create
   */
  export type TaskLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * The data needed to create a TaskLog.
     */
    data: XOR<TaskLogCreateInput, TaskLogUncheckedCreateInput>
  }

  /**
   * TaskLog createMany
   */
  export type TaskLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TaskLogs.
     */
    data: TaskLogCreateManyInput | TaskLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TaskLog createManyAndReturn
   */
  export type TaskLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TaskLogs.
     */
    data: TaskLogCreateManyInput | TaskLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TaskLog update
   */
  export type TaskLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * The data needed to update a TaskLog.
     */
    data: XOR<TaskLogUpdateInput, TaskLogUncheckedUpdateInput>
    /**
     * Choose, which TaskLog to update.
     */
    where: TaskLogWhereUniqueInput
  }

  /**
   * TaskLog updateMany
   */
  export type TaskLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TaskLogs.
     */
    data: XOR<TaskLogUpdateManyMutationInput, TaskLogUncheckedUpdateManyInput>
    /**
     * Filter which TaskLogs to update
     */
    where?: TaskLogWhereInput
  }

  /**
   * TaskLog upsert
   */
  export type TaskLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * The filter to search for the TaskLog to update in case it exists.
     */
    where: TaskLogWhereUniqueInput
    /**
     * In case the TaskLog found by the `where` argument doesn't exist, create a new TaskLog with this data.
     */
    create: XOR<TaskLogCreateInput, TaskLogUncheckedCreateInput>
    /**
     * In case the TaskLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskLogUpdateInput, TaskLogUncheckedUpdateInput>
  }

  /**
   * TaskLog delete
   */
  export type TaskLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
    /**
     * Filter which TaskLog to delete.
     */
    where: TaskLogWhereUniqueInput
  }

  /**
   * TaskLog deleteMany
   */
  export type TaskLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TaskLogs to delete
     */
    where?: TaskLogWhereInput
  }

  /**
   * TaskLog.taskPlan
   */
  export type TaskLog$taskPlanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskPlan
     */
    select?: TaskPlanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskPlanInclude<ExtArgs> | null
    where?: TaskPlanWhereInput
  }

  /**
   * TaskLog without action
   */
  export type TaskLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskLog
     */
    select?: TaskLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskLogInclude<ExtArgs> | null
  }


  /**
   * Model RewardItem
   */

  export type AggregateRewardItem = {
    _count: RewardItemCountAggregateOutputType | null
    _avg: RewardItemAvgAggregateOutputType | null
    _sum: RewardItemSumAggregateOutputType | null
    _min: RewardItemMinAggregateOutputType | null
    _max: RewardItemMaxAggregateOutputType | null
  }

  export type RewardItemAvgAggregateOutputType = {
    cost: number | null
    stock: number | null
  }

  export type RewardItemSumAggregateOutputType = {
    cost: number | null
    stock: number | null
  }

  export type RewardItemMinAggregateOutputType = {
    id: string | null
    familyId: string | null
    name: string | null
    description: string | null
    cost: number | null
    stock: number | null
    enabled: boolean | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RewardItemMaxAggregateOutputType = {
    id: string | null
    familyId: string | null
    name: string | null
    description: string | null
    cost: number | null
    stock: number | null
    enabled: boolean | null
    imageUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RewardItemCountAggregateOutputType = {
    id: number
    familyId: number
    name: number
    description: number
    cost: number
    stock: number
    enabled: number
    imageUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RewardItemAvgAggregateInputType = {
    cost?: true
    stock?: true
  }

  export type RewardItemSumAggregateInputType = {
    cost?: true
    stock?: true
  }

  export type RewardItemMinAggregateInputType = {
    id?: true
    familyId?: true
    name?: true
    description?: true
    cost?: true
    stock?: true
    enabled?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RewardItemMaxAggregateInputType = {
    id?: true
    familyId?: true
    name?: true
    description?: true
    cost?: true
    stock?: true
    enabled?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RewardItemCountAggregateInputType = {
    id?: true
    familyId?: true
    name?: true
    description?: true
    cost?: true
    stock?: true
    enabled?: true
    imageUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RewardItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RewardItem to aggregate.
     */
    where?: RewardItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RewardItems to fetch.
     */
    orderBy?: RewardItemOrderByWithRelationInput | RewardItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RewardItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RewardItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RewardItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RewardItems
    **/
    _count?: true | RewardItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RewardItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RewardItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RewardItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RewardItemMaxAggregateInputType
  }

  export type GetRewardItemAggregateType<T extends RewardItemAggregateArgs> = {
        [P in keyof T & keyof AggregateRewardItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRewardItem[P]>
      : GetScalarType<T[P], AggregateRewardItem[P]>
  }




  export type RewardItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RewardItemWhereInput
    orderBy?: RewardItemOrderByWithAggregationInput | RewardItemOrderByWithAggregationInput[]
    by: RewardItemScalarFieldEnum[] | RewardItemScalarFieldEnum
    having?: RewardItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RewardItemCountAggregateInputType | true
    _avg?: RewardItemAvgAggregateInputType
    _sum?: RewardItemSumAggregateInputType
    _min?: RewardItemMinAggregateInputType
    _max?: RewardItemMaxAggregateInputType
  }

  export type RewardItemGroupByOutputType = {
    id: string
    familyId: string
    name: string
    description: string | null
    cost: number
    stock: number | null
    enabled: boolean
    imageUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: RewardItemCountAggregateOutputType | null
    _avg: RewardItemAvgAggregateOutputType | null
    _sum: RewardItemSumAggregateOutputType | null
    _min: RewardItemMinAggregateOutputType | null
    _max: RewardItemMaxAggregateOutputType | null
  }

  type GetRewardItemGroupByPayload<T extends RewardItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RewardItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RewardItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RewardItemGroupByOutputType[P]>
            : GetScalarType<T[P], RewardItemGroupByOutputType[P]>
        }
      >
    >


  export type RewardItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    familyId?: boolean
    name?: boolean
    description?: boolean
    cost?: boolean
    stock?: boolean
    enabled?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    redeems?: boolean | RewardItem$redeemsArgs<ExtArgs>
    _count?: boolean | RewardItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rewardItem"]>

  export type RewardItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    familyId?: boolean
    name?: boolean
    description?: boolean
    cost?: boolean
    stock?: boolean
    enabled?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rewardItem"]>

  export type RewardItemSelectScalar = {
    id?: boolean
    familyId?: boolean
    name?: boolean
    description?: boolean
    cost?: boolean
    stock?: boolean
    enabled?: boolean
    imageUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RewardItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    redeems?: boolean | RewardItem$redeemsArgs<ExtArgs>
    _count?: boolean | RewardItemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RewardItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
  }

  export type $RewardItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RewardItem"
    objects: {
      family: Prisma.$FamilyPayload<ExtArgs>
      redeems: Prisma.$RedeemLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      familyId: string
      name: string
      description: string | null
      cost: number
      stock: number | null
      enabled: boolean
      imageUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rewardItem"]>
    composites: {}
  }

  type RewardItemGetPayload<S extends boolean | null | undefined | RewardItemDefaultArgs> = $Result.GetResult<Prisma.$RewardItemPayload, S>

  type RewardItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RewardItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RewardItemCountAggregateInputType | true
    }

  export interface RewardItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RewardItem'], meta: { name: 'RewardItem' } }
    /**
     * Find zero or one RewardItem that matches the filter.
     * @param {RewardItemFindUniqueArgs} args - Arguments to find a RewardItem
     * @example
     * // Get one RewardItem
     * const rewardItem = await prisma.rewardItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RewardItemFindUniqueArgs>(args: SelectSubset<T, RewardItemFindUniqueArgs<ExtArgs>>): Prisma__RewardItemClient<$Result.GetResult<Prisma.$RewardItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RewardItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RewardItemFindUniqueOrThrowArgs} args - Arguments to find a RewardItem
     * @example
     * // Get one RewardItem
     * const rewardItem = await prisma.rewardItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RewardItemFindUniqueOrThrowArgs>(args: SelectSubset<T, RewardItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RewardItemClient<$Result.GetResult<Prisma.$RewardItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RewardItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardItemFindFirstArgs} args - Arguments to find a RewardItem
     * @example
     * // Get one RewardItem
     * const rewardItem = await prisma.rewardItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RewardItemFindFirstArgs>(args?: SelectSubset<T, RewardItemFindFirstArgs<ExtArgs>>): Prisma__RewardItemClient<$Result.GetResult<Prisma.$RewardItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RewardItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardItemFindFirstOrThrowArgs} args - Arguments to find a RewardItem
     * @example
     * // Get one RewardItem
     * const rewardItem = await prisma.rewardItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RewardItemFindFirstOrThrowArgs>(args?: SelectSubset<T, RewardItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__RewardItemClient<$Result.GetResult<Prisma.$RewardItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RewardItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RewardItems
     * const rewardItems = await prisma.rewardItem.findMany()
     * 
     * // Get first 10 RewardItems
     * const rewardItems = await prisma.rewardItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rewardItemWithIdOnly = await prisma.rewardItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RewardItemFindManyArgs>(args?: SelectSubset<T, RewardItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewardItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RewardItem.
     * @param {RewardItemCreateArgs} args - Arguments to create a RewardItem.
     * @example
     * // Create one RewardItem
     * const RewardItem = await prisma.rewardItem.create({
     *   data: {
     *     // ... data to create a RewardItem
     *   }
     * })
     * 
     */
    create<T extends RewardItemCreateArgs>(args: SelectSubset<T, RewardItemCreateArgs<ExtArgs>>): Prisma__RewardItemClient<$Result.GetResult<Prisma.$RewardItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RewardItems.
     * @param {RewardItemCreateManyArgs} args - Arguments to create many RewardItems.
     * @example
     * // Create many RewardItems
     * const rewardItem = await prisma.rewardItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RewardItemCreateManyArgs>(args?: SelectSubset<T, RewardItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RewardItems and returns the data saved in the database.
     * @param {RewardItemCreateManyAndReturnArgs} args - Arguments to create many RewardItems.
     * @example
     * // Create many RewardItems
     * const rewardItem = await prisma.rewardItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RewardItems and only return the `id`
     * const rewardItemWithIdOnly = await prisma.rewardItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RewardItemCreateManyAndReturnArgs>(args?: SelectSubset<T, RewardItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewardItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RewardItem.
     * @param {RewardItemDeleteArgs} args - Arguments to delete one RewardItem.
     * @example
     * // Delete one RewardItem
     * const RewardItem = await prisma.rewardItem.delete({
     *   where: {
     *     // ... filter to delete one RewardItem
     *   }
     * })
     * 
     */
    delete<T extends RewardItemDeleteArgs>(args: SelectSubset<T, RewardItemDeleteArgs<ExtArgs>>): Prisma__RewardItemClient<$Result.GetResult<Prisma.$RewardItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RewardItem.
     * @param {RewardItemUpdateArgs} args - Arguments to update one RewardItem.
     * @example
     * // Update one RewardItem
     * const rewardItem = await prisma.rewardItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RewardItemUpdateArgs>(args: SelectSubset<T, RewardItemUpdateArgs<ExtArgs>>): Prisma__RewardItemClient<$Result.GetResult<Prisma.$RewardItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RewardItems.
     * @param {RewardItemDeleteManyArgs} args - Arguments to filter RewardItems to delete.
     * @example
     * // Delete a few RewardItems
     * const { count } = await prisma.rewardItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RewardItemDeleteManyArgs>(args?: SelectSubset<T, RewardItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RewardItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RewardItems
     * const rewardItem = await prisma.rewardItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RewardItemUpdateManyArgs>(args: SelectSubset<T, RewardItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RewardItem.
     * @param {RewardItemUpsertArgs} args - Arguments to update or create a RewardItem.
     * @example
     * // Update or create a RewardItem
     * const rewardItem = await prisma.rewardItem.upsert({
     *   create: {
     *     // ... data to create a RewardItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RewardItem we want to update
     *   }
     * })
     */
    upsert<T extends RewardItemUpsertArgs>(args: SelectSubset<T, RewardItemUpsertArgs<ExtArgs>>): Prisma__RewardItemClient<$Result.GetResult<Prisma.$RewardItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RewardItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardItemCountArgs} args - Arguments to filter RewardItems to count.
     * @example
     * // Count the number of RewardItems
     * const count = await prisma.rewardItem.count({
     *   where: {
     *     // ... the filter for the RewardItems we want to count
     *   }
     * })
    **/
    count<T extends RewardItemCountArgs>(
      args?: Subset<T, RewardItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RewardItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RewardItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RewardItemAggregateArgs>(args: Subset<T, RewardItemAggregateArgs>): Prisma.PrismaPromise<GetRewardItemAggregateType<T>>

    /**
     * Group by RewardItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewardItemGroupByArgs} args - Group by arguments.
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
      T extends RewardItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RewardItemGroupByArgs['orderBy'] }
        : { orderBy?: RewardItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RewardItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRewardItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RewardItem model
   */
  readonly fields: RewardItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RewardItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RewardItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    family<T extends FamilyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FamilyDefaultArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    redeems<T extends RewardItem$redeemsArgs<ExtArgs> = {}>(args?: Subset<T, RewardItem$redeemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RedeemLogPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the RewardItem model
   */ 
  interface RewardItemFieldRefs {
    readonly id: FieldRef<"RewardItem", 'String'>
    readonly familyId: FieldRef<"RewardItem", 'String'>
    readonly name: FieldRef<"RewardItem", 'String'>
    readonly description: FieldRef<"RewardItem", 'String'>
    readonly cost: FieldRef<"RewardItem", 'Int'>
    readonly stock: FieldRef<"RewardItem", 'Int'>
    readonly enabled: FieldRef<"RewardItem", 'Boolean'>
    readonly imageUrl: FieldRef<"RewardItem", 'String'>
    readonly createdAt: FieldRef<"RewardItem", 'DateTime'>
    readonly updatedAt: FieldRef<"RewardItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RewardItem findUnique
   */
  export type RewardItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardItem
     */
    select?: RewardItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardItemInclude<ExtArgs> | null
    /**
     * Filter, which RewardItem to fetch.
     */
    where: RewardItemWhereUniqueInput
  }

  /**
   * RewardItem findUniqueOrThrow
   */
  export type RewardItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardItem
     */
    select?: RewardItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardItemInclude<ExtArgs> | null
    /**
     * Filter, which RewardItem to fetch.
     */
    where: RewardItemWhereUniqueInput
  }

  /**
   * RewardItem findFirst
   */
  export type RewardItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardItem
     */
    select?: RewardItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardItemInclude<ExtArgs> | null
    /**
     * Filter, which RewardItem to fetch.
     */
    where?: RewardItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RewardItems to fetch.
     */
    orderBy?: RewardItemOrderByWithRelationInput | RewardItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RewardItems.
     */
    cursor?: RewardItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RewardItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RewardItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RewardItems.
     */
    distinct?: RewardItemScalarFieldEnum | RewardItemScalarFieldEnum[]
  }

  /**
   * RewardItem findFirstOrThrow
   */
  export type RewardItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardItem
     */
    select?: RewardItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardItemInclude<ExtArgs> | null
    /**
     * Filter, which RewardItem to fetch.
     */
    where?: RewardItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RewardItems to fetch.
     */
    orderBy?: RewardItemOrderByWithRelationInput | RewardItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RewardItems.
     */
    cursor?: RewardItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RewardItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RewardItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RewardItems.
     */
    distinct?: RewardItemScalarFieldEnum | RewardItemScalarFieldEnum[]
  }

  /**
   * RewardItem findMany
   */
  export type RewardItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardItem
     */
    select?: RewardItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardItemInclude<ExtArgs> | null
    /**
     * Filter, which RewardItems to fetch.
     */
    where?: RewardItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RewardItems to fetch.
     */
    orderBy?: RewardItemOrderByWithRelationInput | RewardItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RewardItems.
     */
    cursor?: RewardItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RewardItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RewardItems.
     */
    skip?: number
    distinct?: RewardItemScalarFieldEnum | RewardItemScalarFieldEnum[]
  }

  /**
   * RewardItem create
   */
  export type RewardItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardItem
     */
    select?: RewardItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardItemInclude<ExtArgs> | null
    /**
     * The data needed to create a RewardItem.
     */
    data: XOR<RewardItemCreateInput, RewardItemUncheckedCreateInput>
  }

  /**
   * RewardItem createMany
   */
  export type RewardItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RewardItems.
     */
    data: RewardItemCreateManyInput | RewardItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RewardItem createManyAndReturn
   */
  export type RewardItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardItem
     */
    select?: RewardItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RewardItems.
     */
    data: RewardItemCreateManyInput | RewardItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RewardItem update
   */
  export type RewardItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardItem
     */
    select?: RewardItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardItemInclude<ExtArgs> | null
    /**
     * The data needed to update a RewardItem.
     */
    data: XOR<RewardItemUpdateInput, RewardItemUncheckedUpdateInput>
    /**
     * Choose, which RewardItem to update.
     */
    where: RewardItemWhereUniqueInput
  }

  /**
   * RewardItem updateMany
   */
  export type RewardItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RewardItems.
     */
    data: XOR<RewardItemUpdateManyMutationInput, RewardItemUncheckedUpdateManyInput>
    /**
     * Filter which RewardItems to update
     */
    where?: RewardItemWhereInput
  }

  /**
   * RewardItem upsert
   */
  export type RewardItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardItem
     */
    select?: RewardItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardItemInclude<ExtArgs> | null
    /**
     * The filter to search for the RewardItem to update in case it exists.
     */
    where: RewardItemWhereUniqueInput
    /**
     * In case the RewardItem found by the `where` argument doesn't exist, create a new RewardItem with this data.
     */
    create: XOR<RewardItemCreateInput, RewardItemUncheckedCreateInput>
    /**
     * In case the RewardItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RewardItemUpdateInput, RewardItemUncheckedUpdateInput>
  }

  /**
   * RewardItem delete
   */
  export type RewardItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardItem
     */
    select?: RewardItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardItemInclude<ExtArgs> | null
    /**
     * Filter which RewardItem to delete.
     */
    where: RewardItemWhereUniqueInput
  }

  /**
   * RewardItem deleteMany
   */
  export type RewardItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RewardItems to delete
     */
    where?: RewardItemWhereInput
  }

  /**
   * RewardItem.redeems
   */
  export type RewardItem$redeemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemLog
     */
    select?: RedeemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedeemLogInclude<ExtArgs> | null
    where?: RedeemLogWhereInput
    orderBy?: RedeemLogOrderByWithRelationInput | RedeemLogOrderByWithRelationInput[]
    cursor?: RedeemLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RedeemLogScalarFieldEnum | RedeemLogScalarFieldEnum[]
  }

  /**
   * RewardItem without action
   */
  export type RewardItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewardItem
     */
    select?: RewardItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewardItemInclude<ExtArgs> | null
  }


  /**
   * Model RedeemLog
   */

  export type AggregateRedeemLog = {
    _count: RedeemLogCountAggregateOutputType | null
    _avg: RedeemLogAvgAggregateOutputType | null
    _sum: RedeemLogSumAggregateOutputType | null
    _min: RedeemLogMinAggregateOutputType | null
    _max: RedeemLogMaxAggregateOutputType | null
  }

  export type RedeemLogAvgAggregateOutputType = {
    quantity: number | null
    pointsSpent: number | null
  }

  export type RedeemLogSumAggregateOutputType = {
    quantity: number | null
    pointsSpent: number | null
  }

  export type RedeemLogMinAggregateOutputType = {
    id: string | null
    childId: string | null
    rewardItemId: string | null
    quantity: number | null
    pointsSpent: number | null
    note: string | null
    createdAt: Date | null
  }

  export type RedeemLogMaxAggregateOutputType = {
    id: string | null
    childId: string | null
    rewardItemId: string | null
    quantity: number | null
    pointsSpent: number | null
    note: string | null
    createdAt: Date | null
  }

  export type RedeemLogCountAggregateOutputType = {
    id: number
    childId: number
    rewardItemId: number
    quantity: number
    pointsSpent: number
    note: number
    createdAt: number
    _all: number
  }


  export type RedeemLogAvgAggregateInputType = {
    quantity?: true
    pointsSpent?: true
  }

  export type RedeemLogSumAggregateInputType = {
    quantity?: true
    pointsSpent?: true
  }

  export type RedeemLogMinAggregateInputType = {
    id?: true
    childId?: true
    rewardItemId?: true
    quantity?: true
    pointsSpent?: true
    note?: true
    createdAt?: true
  }

  export type RedeemLogMaxAggregateInputType = {
    id?: true
    childId?: true
    rewardItemId?: true
    quantity?: true
    pointsSpent?: true
    note?: true
    createdAt?: true
  }

  export type RedeemLogCountAggregateInputType = {
    id?: true
    childId?: true
    rewardItemId?: true
    quantity?: true
    pointsSpent?: true
    note?: true
    createdAt?: true
    _all?: true
  }

  export type RedeemLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RedeemLog to aggregate.
     */
    where?: RedeemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RedeemLogs to fetch.
     */
    orderBy?: RedeemLogOrderByWithRelationInput | RedeemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RedeemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RedeemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RedeemLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RedeemLogs
    **/
    _count?: true | RedeemLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RedeemLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RedeemLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RedeemLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RedeemLogMaxAggregateInputType
  }

  export type GetRedeemLogAggregateType<T extends RedeemLogAggregateArgs> = {
        [P in keyof T & keyof AggregateRedeemLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRedeemLog[P]>
      : GetScalarType<T[P], AggregateRedeemLog[P]>
  }




  export type RedeemLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RedeemLogWhereInput
    orderBy?: RedeemLogOrderByWithAggregationInput | RedeemLogOrderByWithAggregationInput[]
    by: RedeemLogScalarFieldEnum[] | RedeemLogScalarFieldEnum
    having?: RedeemLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RedeemLogCountAggregateInputType | true
    _avg?: RedeemLogAvgAggregateInputType
    _sum?: RedeemLogSumAggregateInputType
    _min?: RedeemLogMinAggregateInputType
    _max?: RedeemLogMaxAggregateInputType
  }

  export type RedeemLogGroupByOutputType = {
    id: string
    childId: string
    rewardItemId: string
    quantity: number
    pointsSpent: number
    note: string | null
    createdAt: Date
    _count: RedeemLogCountAggregateOutputType | null
    _avg: RedeemLogAvgAggregateOutputType | null
    _sum: RedeemLogSumAggregateOutputType | null
    _min: RedeemLogMinAggregateOutputType | null
    _max: RedeemLogMaxAggregateOutputType | null
  }

  type GetRedeemLogGroupByPayload<T extends RedeemLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RedeemLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RedeemLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RedeemLogGroupByOutputType[P]>
            : GetScalarType<T[P], RedeemLogGroupByOutputType[P]>
        }
      >
    >


  export type RedeemLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childId?: boolean
    rewardItemId?: boolean
    quantity?: boolean
    pointsSpent?: boolean
    note?: boolean
    createdAt?: boolean
    child?: boolean | UserDefaultArgs<ExtArgs>
    rewardItem?: boolean | RewardItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["redeemLog"]>

  export type RedeemLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childId?: boolean
    rewardItemId?: boolean
    quantity?: boolean
    pointsSpent?: boolean
    note?: boolean
    createdAt?: boolean
    child?: boolean | UserDefaultArgs<ExtArgs>
    rewardItem?: boolean | RewardItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["redeemLog"]>

  export type RedeemLogSelectScalar = {
    id?: boolean
    childId?: boolean
    rewardItemId?: boolean
    quantity?: boolean
    pointsSpent?: boolean
    note?: boolean
    createdAt?: boolean
  }

  export type RedeemLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | UserDefaultArgs<ExtArgs>
    rewardItem?: boolean | RewardItemDefaultArgs<ExtArgs>
  }
  export type RedeemLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    child?: boolean | UserDefaultArgs<ExtArgs>
    rewardItem?: boolean | RewardItemDefaultArgs<ExtArgs>
  }

  export type $RedeemLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RedeemLog"
    objects: {
      child: Prisma.$UserPayload<ExtArgs>
      rewardItem: Prisma.$RewardItemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      childId: string
      rewardItemId: string
      quantity: number
      pointsSpent: number
      note: string | null
      createdAt: Date
    }, ExtArgs["result"]["redeemLog"]>
    composites: {}
  }

  type RedeemLogGetPayload<S extends boolean | null | undefined | RedeemLogDefaultArgs> = $Result.GetResult<Prisma.$RedeemLogPayload, S>

  type RedeemLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RedeemLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RedeemLogCountAggregateInputType | true
    }

  export interface RedeemLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RedeemLog'], meta: { name: 'RedeemLog' } }
    /**
     * Find zero or one RedeemLog that matches the filter.
     * @param {RedeemLogFindUniqueArgs} args - Arguments to find a RedeemLog
     * @example
     * // Get one RedeemLog
     * const redeemLog = await prisma.redeemLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RedeemLogFindUniqueArgs>(args: SelectSubset<T, RedeemLogFindUniqueArgs<ExtArgs>>): Prisma__RedeemLogClient<$Result.GetResult<Prisma.$RedeemLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RedeemLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RedeemLogFindUniqueOrThrowArgs} args - Arguments to find a RedeemLog
     * @example
     * // Get one RedeemLog
     * const redeemLog = await prisma.redeemLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RedeemLogFindUniqueOrThrowArgs>(args: SelectSubset<T, RedeemLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RedeemLogClient<$Result.GetResult<Prisma.$RedeemLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RedeemLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemLogFindFirstArgs} args - Arguments to find a RedeemLog
     * @example
     * // Get one RedeemLog
     * const redeemLog = await prisma.redeemLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RedeemLogFindFirstArgs>(args?: SelectSubset<T, RedeemLogFindFirstArgs<ExtArgs>>): Prisma__RedeemLogClient<$Result.GetResult<Prisma.$RedeemLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RedeemLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemLogFindFirstOrThrowArgs} args - Arguments to find a RedeemLog
     * @example
     * // Get one RedeemLog
     * const redeemLog = await prisma.redeemLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RedeemLogFindFirstOrThrowArgs>(args?: SelectSubset<T, RedeemLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__RedeemLogClient<$Result.GetResult<Prisma.$RedeemLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RedeemLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RedeemLogs
     * const redeemLogs = await prisma.redeemLog.findMany()
     * 
     * // Get first 10 RedeemLogs
     * const redeemLogs = await prisma.redeemLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const redeemLogWithIdOnly = await prisma.redeemLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RedeemLogFindManyArgs>(args?: SelectSubset<T, RedeemLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RedeemLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RedeemLog.
     * @param {RedeemLogCreateArgs} args - Arguments to create a RedeemLog.
     * @example
     * // Create one RedeemLog
     * const RedeemLog = await prisma.redeemLog.create({
     *   data: {
     *     // ... data to create a RedeemLog
     *   }
     * })
     * 
     */
    create<T extends RedeemLogCreateArgs>(args: SelectSubset<T, RedeemLogCreateArgs<ExtArgs>>): Prisma__RedeemLogClient<$Result.GetResult<Prisma.$RedeemLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RedeemLogs.
     * @param {RedeemLogCreateManyArgs} args - Arguments to create many RedeemLogs.
     * @example
     * // Create many RedeemLogs
     * const redeemLog = await prisma.redeemLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RedeemLogCreateManyArgs>(args?: SelectSubset<T, RedeemLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RedeemLogs and returns the data saved in the database.
     * @param {RedeemLogCreateManyAndReturnArgs} args - Arguments to create many RedeemLogs.
     * @example
     * // Create many RedeemLogs
     * const redeemLog = await prisma.redeemLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RedeemLogs and only return the `id`
     * const redeemLogWithIdOnly = await prisma.redeemLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RedeemLogCreateManyAndReturnArgs>(args?: SelectSubset<T, RedeemLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RedeemLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RedeemLog.
     * @param {RedeemLogDeleteArgs} args - Arguments to delete one RedeemLog.
     * @example
     * // Delete one RedeemLog
     * const RedeemLog = await prisma.redeemLog.delete({
     *   where: {
     *     // ... filter to delete one RedeemLog
     *   }
     * })
     * 
     */
    delete<T extends RedeemLogDeleteArgs>(args: SelectSubset<T, RedeemLogDeleteArgs<ExtArgs>>): Prisma__RedeemLogClient<$Result.GetResult<Prisma.$RedeemLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RedeemLog.
     * @param {RedeemLogUpdateArgs} args - Arguments to update one RedeemLog.
     * @example
     * // Update one RedeemLog
     * const redeemLog = await prisma.redeemLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RedeemLogUpdateArgs>(args: SelectSubset<T, RedeemLogUpdateArgs<ExtArgs>>): Prisma__RedeemLogClient<$Result.GetResult<Prisma.$RedeemLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RedeemLogs.
     * @param {RedeemLogDeleteManyArgs} args - Arguments to filter RedeemLogs to delete.
     * @example
     * // Delete a few RedeemLogs
     * const { count } = await prisma.redeemLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RedeemLogDeleteManyArgs>(args?: SelectSubset<T, RedeemLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RedeemLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RedeemLogs
     * const redeemLog = await prisma.redeemLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RedeemLogUpdateManyArgs>(args: SelectSubset<T, RedeemLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RedeemLog.
     * @param {RedeemLogUpsertArgs} args - Arguments to update or create a RedeemLog.
     * @example
     * // Update or create a RedeemLog
     * const redeemLog = await prisma.redeemLog.upsert({
     *   create: {
     *     // ... data to create a RedeemLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RedeemLog we want to update
     *   }
     * })
     */
    upsert<T extends RedeemLogUpsertArgs>(args: SelectSubset<T, RedeemLogUpsertArgs<ExtArgs>>): Prisma__RedeemLogClient<$Result.GetResult<Prisma.$RedeemLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RedeemLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemLogCountArgs} args - Arguments to filter RedeemLogs to count.
     * @example
     * // Count the number of RedeemLogs
     * const count = await prisma.redeemLog.count({
     *   where: {
     *     // ... the filter for the RedeemLogs we want to count
     *   }
     * })
    **/
    count<T extends RedeemLogCountArgs>(
      args?: Subset<T, RedeemLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RedeemLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RedeemLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RedeemLogAggregateArgs>(args: Subset<T, RedeemLogAggregateArgs>): Prisma.PrismaPromise<GetRedeemLogAggregateType<T>>

    /**
     * Group by RedeemLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RedeemLogGroupByArgs} args - Group by arguments.
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
      T extends RedeemLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RedeemLogGroupByArgs['orderBy'] }
        : { orderBy?: RedeemLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RedeemLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRedeemLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RedeemLog model
   */
  readonly fields: RedeemLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RedeemLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RedeemLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    child<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    rewardItem<T extends RewardItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RewardItemDefaultArgs<ExtArgs>>): Prisma__RewardItemClient<$Result.GetResult<Prisma.$RewardItemPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the RedeemLog model
   */ 
  interface RedeemLogFieldRefs {
    readonly id: FieldRef<"RedeemLog", 'String'>
    readonly childId: FieldRef<"RedeemLog", 'String'>
    readonly rewardItemId: FieldRef<"RedeemLog", 'String'>
    readonly quantity: FieldRef<"RedeemLog", 'Int'>
    readonly pointsSpent: FieldRef<"RedeemLog", 'Int'>
    readonly note: FieldRef<"RedeemLog", 'String'>
    readonly createdAt: FieldRef<"RedeemLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RedeemLog findUnique
   */
  export type RedeemLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemLog
     */
    select?: RedeemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedeemLogInclude<ExtArgs> | null
    /**
     * Filter, which RedeemLog to fetch.
     */
    where: RedeemLogWhereUniqueInput
  }

  /**
   * RedeemLog findUniqueOrThrow
   */
  export type RedeemLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemLog
     */
    select?: RedeemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedeemLogInclude<ExtArgs> | null
    /**
     * Filter, which RedeemLog to fetch.
     */
    where: RedeemLogWhereUniqueInput
  }

  /**
   * RedeemLog findFirst
   */
  export type RedeemLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemLog
     */
    select?: RedeemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedeemLogInclude<ExtArgs> | null
    /**
     * Filter, which RedeemLog to fetch.
     */
    where?: RedeemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RedeemLogs to fetch.
     */
    orderBy?: RedeemLogOrderByWithRelationInput | RedeemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RedeemLogs.
     */
    cursor?: RedeemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RedeemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RedeemLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RedeemLogs.
     */
    distinct?: RedeemLogScalarFieldEnum | RedeemLogScalarFieldEnum[]
  }

  /**
   * RedeemLog findFirstOrThrow
   */
  export type RedeemLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemLog
     */
    select?: RedeemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedeemLogInclude<ExtArgs> | null
    /**
     * Filter, which RedeemLog to fetch.
     */
    where?: RedeemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RedeemLogs to fetch.
     */
    orderBy?: RedeemLogOrderByWithRelationInput | RedeemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RedeemLogs.
     */
    cursor?: RedeemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RedeemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RedeemLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RedeemLogs.
     */
    distinct?: RedeemLogScalarFieldEnum | RedeemLogScalarFieldEnum[]
  }

  /**
   * RedeemLog findMany
   */
  export type RedeemLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemLog
     */
    select?: RedeemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedeemLogInclude<ExtArgs> | null
    /**
     * Filter, which RedeemLogs to fetch.
     */
    where?: RedeemLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RedeemLogs to fetch.
     */
    orderBy?: RedeemLogOrderByWithRelationInput | RedeemLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RedeemLogs.
     */
    cursor?: RedeemLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RedeemLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RedeemLogs.
     */
    skip?: number
    distinct?: RedeemLogScalarFieldEnum | RedeemLogScalarFieldEnum[]
  }

  /**
   * RedeemLog create
   */
  export type RedeemLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemLog
     */
    select?: RedeemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedeemLogInclude<ExtArgs> | null
    /**
     * The data needed to create a RedeemLog.
     */
    data: XOR<RedeemLogCreateInput, RedeemLogUncheckedCreateInput>
  }

  /**
   * RedeemLog createMany
   */
  export type RedeemLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RedeemLogs.
     */
    data: RedeemLogCreateManyInput | RedeemLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RedeemLog createManyAndReturn
   */
  export type RedeemLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemLog
     */
    select?: RedeemLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RedeemLogs.
     */
    data: RedeemLogCreateManyInput | RedeemLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedeemLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RedeemLog update
   */
  export type RedeemLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemLog
     */
    select?: RedeemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedeemLogInclude<ExtArgs> | null
    /**
     * The data needed to update a RedeemLog.
     */
    data: XOR<RedeemLogUpdateInput, RedeemLogUncheckedUpdateInput>
    /**
     * Choose, which RedeemLog to update.
     */
    where: RedeemLogWhereUniqueInput
  }

  /**
   * RedeemLog updateMany
   */
  export type RedeemLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RedeemLogs.
     */
    data: XOR<RedeemLogUpdateManyMutationInput, RedeemLogUncheckedUpdateManyInput>
    /**
     * Filter which RedeemLogs to update
     */
    where?: RedeemLogWhereInput
  }

  /**
   * RedeemLog upsert
   */
  export type RedeemLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemLog
     */
    select?: RedeemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedeemLogInclude<ExtArgs> | null
    /**
     * The filter to search for the RedeemLog to update in case it exists.
     */
    where: RedeemLogWhereUniqueInput
    /**
     * In case the RedeemLog found by the `where` argument doesn't exist, create a new RedeemLog with this data.
     */
    create: XOR<RedeemLogCreateInput, RedeemLogUncheckedCreateInput>
    /**
     * In case the RedeemLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RedeemLogUpdateInput, RedeemLogUncheckedUpdateInput>
  }

  /**
   * RedeemLog delete
   */
  export type RedeemLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemLog
     */
    select?: RedeemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedeemLogInclude<ExtArgs> | null
    /**
     * Filter which RedeemLog to delete.
     */
    where: RedeemLogWhereUniqueInput
  }

  /**
   * RedeemLog deleteMany
   */
  export type RedeemLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RedeemLogs to delete
     */
    where?: RedeemLogWhereInput
  }

  /**
   * RedeemLog without action
   */
  export type RedeemLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RedeemLog
     */
    select?: RedeemLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RedeemLogInclude<ExtArgs> | null
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


  export const FamilyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FamilyScalarFieldEnum = (typeof FamilyScalarFieldEnum)[keyof typeof FamilyScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    role: 'role',
    pin: 'pin',
    password: 'password',
    familyId: 'familyId',
    avatarUrl: 'avatarUrl',
    isDeleted: 'isDeleted',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    totalEarnedPoints: 'totalEarnedPoints',
    level: 'level',
    streak: 'streak',
    lastCheckIn: 'lastCheckIn'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PointRuleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    category: 'category',
    pointsType: 'pointsType',
    points: 'points',
    pointsMin: 'pointsMin',
    pointsMax: 'pointsMax',
    needApproval: 'needApproval',
    frequency: 'frequency',
    maxTimes: 'maxTimes',
    enabled: 'enabled',
    familyId: 'familyId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PointRuleScalarFieldEnum = (typeof PointRuleScalarFieldEnum)[keyof typeof PointRuleScalarFieldEnum]


  export const PointRuleTargetScalarFieldEnum: {
    id: 'id',
    pointRuleId: 'pointRuleId',
    childId: 'childId'
  };

  export type PointRuleTargetScalarFieldEnum = (typeof PointRuleTargetScalarFieldEnum)[keyof typeof PointRuleTargetScalarFieldEnum]


  export const PointRecordScalarFieldEnum: {
    id: 'id',
    childId: 'childId',
    pointRuleId: 'pointRuleId',
    status: 'status',
    points: 'points',
    description: 'description',
    imageUrl: 'imageUrl',
    submitNote: 'submitNote',
    reviewNote: 'reviewNote',
    reviewedById: 'reviewedById',
    reviewedAt: 'reviewedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PointRecordScalarFieldEnum = (typeof PointRecordScalarFieldEnum)[keyof typeof PointRecordScalarFieldEnum]


  export const PointAccountScalarFieldEnum: {
    id: 'id',
    childId: 'childId',
    balance: 'balance',
    totalEarned: 'totalEarned',
    totalSpent: 'totalSpent',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PointAccountScalarFieldEnum = (typeof PointAccountScalarFieldEnum)[keyof typeof PointAccountScalarFieldEnum]


  export const PointTransactionScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    type: 'type',
    amount: 'amount',
    balanceAfter: 'balanceAfter',
    sourceType: 'sourceType',
    sourceId: 'sourceId',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type PointTransactionScalarFieldEnum = (typeof PointTransactionScalarFieldEnum)[keyof typeof PointTransactionScalarFieldEnum]


  export const PetScalarFieldEnum: {
    id: 'id',
    childId: 'childId',
    name: 'name',
    stage: 'stage',
    level: 'level',
    exp: 'exp',
    status: 'status',
    hunger: 'hunger',
    thirst: 'thirst',
    cleanliness: 'cleanliness',
    mood: 'mood',
    health: 'health',
    lastDecayAt: 'lastDecayAt',
    lastFedAt: 'lastFedAt',
    lastWateredAt: 'lastWateredAt',
    lastCleanedAt: 'lastCleanedAt',
    lastPlayedAt: 'lastPlayedAt',
    totalCareCount: 'totalCareCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PetScalarFieldEnum = (typeof PetScalarFieldEnum)[keyof typeof PetScalarFieldEnum]


  export const PetLogScalarFieldEnum: {
    id: 'id',
    petId: 'petId',
    action: 'action',
    oldValue: 'oldValue',
    newValue: 'newValue',
    pointsCost: 'pointsCost',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type PetLogScalarFieldEnum = (typeof PetLogScalarFieldEnum)[keyof typeof PetLogScalarFieldEnum]


  export const TaskPlanScalarFieldEnum: {
    id: 'id',
    childId: 'childId',
    title: 'title',
    description: 'description',
    points: 'points',
    scheduledAt: 'scheduledAt',
    dueAt: 'dueAt',
    frequency: 'frequency',
    enabled: 'enabled',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TaskPlanScalarFieldEnum = (typeof TaskPlanScalarFieldEnum)[keyof typeof TaskPlanScalarFieldEnum]


  export const TaskLogScalarFieldEnum: {
    id: 'id',
    taskPlanId: 'taskPlanId',
    childId: 'childId',
    points: 'points',
    note: 'note',
    createdAt: 'createdAt'
  };

  export type TaskLogScalarFieldEnum = (typeof TaskLogScalarFieldEnum)[keyof typeof TaskLogScalarFieldEnum]


  export const RewardItemScalarFieldEnum: {
    id: 'id',
    familyId: 'familyId',
    name: 'name',
    description: 'description',
    cost: 'cost',
    stock: 'stock',
    enabled: 'enabled',
    imageUrl: 'imageUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RewardItemScalarFieldEnum = (typeof RewardItemScalarFieldEnum)[keyof typeof RewardItemScalarFieldEnum]


  export const RedeemLogScalarFieldEnum: {
    id: 'id',
    childId: 'childId',
    rewardItemId: 'rewardItemId',
    quantity: 'quantity',
    pointsSpent: 'pointsSpent',
    note: 'note',
    createdAt: 'createdAt'
  };

  export type RedeemLogScalarFieldEnum = (typeof RedeemLogScalarFieldEnum)[keyof typeof RedeemLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'PointsType'
   */
  export type EnumPointsTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PointsType'>
    


  /**
   * Reference to a field of type 'PointsType[]'
   */
  export type ListEnumPointsTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PointsType[]'>
    


  /**
   * Reference to a field of type 'Frequency'
   */
  export type EnumFrequencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Frequency'>
    


  /**
   * Reference to a field of type 'Frequency[]'
   */
  export type ListEnumFrequencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Frequency[]'>
    


  /**
   * Reference to a field of type 'RecordStatus'
   */
  export type EnumRecordStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RecordStatus'>
    


  /**
   * Reference to a field of type 'RecordStatus[]'
   */
  export type ListEnumRecordStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RecordStatus[]'>
    


  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    


  /**
   * Reference to a field of type 'TransactionType[]'
   */
  export type ListEnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType[]'>
    


  /**
   * Reference to a field of type 'SourceType'
   */
  export type EnumSourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SourceType'>
    


  /**
   * Reference to a field of type 'SourceType[]'
   */
  export type ListEnumSourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SourceType[]'>
    


  /**
   * Reference to a field of type 'PetStage'
   */
  export type EnumPetStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PetStage'>
    


  /**
   * Reference to a field of type 'PetStage[]'
   */
  export type ListEnumPetStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PetStage[]'>
    


  /**
   * Reference to a field of type 'PetStatus'
   */
  export type EnumPetStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PetStatus'>
    


  /**
   * Reference to a field of type 'PetStatus[]'
   */
  export type ListEnumPetStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PetStatus[]'>
    


  /**
   * Reference to a field of type 'PetAction'
   */
  export type EnumPetActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PetAction'>
    


  /**
   * Reference to a field of type 'PetAction[]'
   */
  export type ListEnumPetActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PetAction[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type FamilyWhereInput = {
    AND?: FamilyWhereInput | FamilyWhereInput[]
    OR?: FamilyWhereInput[]
    NOT?: FamilyWhereInput | FamilyWhereInput[]
    id?: StringFilter<"Family"> | string
    name?: StringFilter<"Family"> | string
    createdAt?: DateTimeFilter<"Family"> | Date | string
    updatedAt?: DateTimeFilter<"Family"> | Date | string
    users?: UserListRelationFilter
    pointRules?: PointRuleListRelationFilter
    rewardItems?: RewardItemListRelationFilter
  }

  export type FamilyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    pointRules?: PointRuleOrderByRelationAggregateInput
    rewardItems?: RewardItemOrderByRelationAggregateInput
  }

  export type FamilyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FamilyWhereInput | FamilyWhereInput[]
    OR?: FamilyWhereInput[]
    NOT?: FamilyWhereInput | FamilyWhereInput[]
    name?: StringFilter<"Family"> | string
    createdAt?: DateTimeFilter<"Family"> | Date | string
    updatedAt?: DateTimeFilter<"Family"> | Date | string
    users?: UserListRelationFilter
    pointRules?: PointRuleListRelationFilter
    rewardItems?: RewardItemListRelationFilter
  }, "id">

  export type FamilyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FamilyCountOrderByAggregateInput
    _max?: FamilyMaxOrderByAggregateInput
    _min?: FamilyMinOrderByAggregateInput
  }

  export type FamilyScalarWhereWithAggregatesInput = {
    AND?: FamilyScalarWhereWithAggregatesInput | FamilyScalarWhereWithAggregatesInput[]
    OR?: FamilyScalarWhereWithAggregatesInput[]
    NOT?: FamilyScalarWhereWithAggregatesInput | FamilyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Family"> | string
    name?: StringWithAggregatesFilter<"Family"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Family"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Family"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    pin?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    familyId?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    isDeleted?: BoolFilter<"User"> | boolean
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    totalEarnedPoints?: IntFilter<"User"> | number
    level?: IntFilter<"User"> | number
    streak?: IntFilter<"User"> | number
    lastCheckIn?: DateTimeNullableFilter<"User"> | Date | string | null
    family?: XOR<FamilyRelationFilter, FamilyWhereInput>
    pointAccount?: XOR<PointAccountNullableRelationFilter, PointAccountWhereInput> | null
    pointRecords?: PointRecordListRelationFilter
    pet?: XOR<PetNullableRelationFilter, PetWhereInput> | null
    taskPlans?: TaskPlanListRelationFilter
    taskLogs?: TaskLogListRelationFilter
    redeemLogs?: RedeemLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    pin?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    familyId?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    totalEarnedPoints?: SortOrder
    level?: SortOrder
    streak?: SortOrder
    lastCheckIn?: SortOrderInput | SortOrder
    family?: FamilyOrderByWithRelationInput
    pointAccount?: PointAccountOrderByWithRelationInput
    pointRecords?: PointRecordOrderByRelationAggregateInput
    pet?: PetOrderByWithRelationInput
    taskPlans?: TaskPlanOrderByRelationAggregateInput
    taskLogs?: TaskLogOrderByRelationAggregateInput
    redeemLogs?: RedeemLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    role?: EnumRoleFilter<"User"> | $Enums.Role
    pin?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    familyId?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    isDeleted?: BoolFilter<"User"> | boolean
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    totalEarnedPoints?: IntFilter<"User"> | number
    level?: IntFilter<"User"> | number
    streak?: IntFilter<"User"> | number
    lastCheckIn?: DateTimeNullableFilter<"User"> | Date | string | null
    family?: XOR<FamilyRelationFilter, FamilyWhereInput>
    pointAccount?: XOR<PointAccountNullableRelationFilter, PointAccountWhereInput> | null
    pointRecords?: PointRecordListRelationFilter
    pet?: XOR<PetNullableRelationFilter, PetWhereInput> | null
    taskPlans?: TaskPlanListRelationFilter
    taskLogs?: TaskLogListRelationFilter
    redeemLogs?: RedeemLogListRelationFilter
  }, "id" | "name">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    pin?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    familyId?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    totalEarnedPoints?: SortOrder
    level?: SortOrder
    streak?: SortOrder
    lastCheckIn?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    pin?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    familyId?: StringWithAggregatesFilter<"User"> | string
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    isDeleted?: BoolWithAggregatesFilter<"User"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    totalEarnedPoints?: IntWithAggregatesFilter<"User"> | number
    level?: IntWithAggregatesFilter<"User"> | number
    streak?: IntWithAggregatesFilter<"User"> | number
    lastCheckIn?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type PointRuleWhereInput = {
    AND?: PointRuleWhereInput | PointRuleWhereInput[]
    OR?: PointRuleWhereInput[]
    NOT?: PointRuleWhereInput | PointRuleWhereInput[]
    id?: StringFilter<"PointRule"> | string
    name?: StringFilter<"PointRule"> | string
    description?: StringNullableFilter<"PointRule"> | string | null
    category?: StringFilter<"PointRule"> | string
    pointsType?: EnumPointsTypeFilter<"PointRule"> | $Enums.PointsType
    points?: IntFilter<"PointRule"> | number
    pointsMin?: IntNullableFilter<"PointRule"> | number | null
    pointsMax?: IntNullableFilter<"PointRule"> | number | null
    needApproval?: BoolFilter<"PointRule"> | boolean
    frequency?: EnumFrequencyFilter<"PointRule"> | $Enums.Frequency
    maxTimes?: IntNullableFilter<"PointRule"> | number | null
    enabled?: BoolFilter<"PointRule"> | boolean
    familyId?: StringFilter<"PointRule"> | string
    createdAt?: DateTimeFilter<"PointRule"> | Date | string
    updatedAt?: DateTimeFilter<"PointRule"> | Date | string
    family?: XOR<FamilyRelationFilter, FamilyWhereInput>
    targets?: PointRuleTargetListRelationFilter
    records?: PointRecordListRelationFilter
  }

  export type PointRuleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    pointsType?: SortOrder
    points?: SortOrder
    pointsMin?: SortOrderInput | SortOrder
    pointsMax?: SortOrderInput | SortOrder
    needApproval?: SortOrder
    frequency?: SortOrder
    maxTimes?: SortOrderInput | SortOrder
    enabled?: SortOrder
    familyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    family?: FamilyOrderByWithRelationInput
    targets?: PointRuleTargetOrderByRelationAggregateInput
    records?: PointRecordOrderByRelationAggregateInput
  }

  export type PointRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PointRuleWhereInput | PointRuleWhereInput[]
    OR?: PointRuleWhereInput[]
    NOT?: PointRuleWhereInput | PointRuleWhereInput[]
    name?: StringFilter<"PointRule"> | string
    description?: StringNullableFilter<"PointRule"> | string | null
    category?: StringFilter<"PointRule"> | string
    pointsType?: EnumPointsTypeFilter<"PointRule"> | $Enums.PointsType
    points?: IntFilter<"PointRule"> | number
    pointsMin?: IntNullableFilter<"PointRule"> | number | null
    pointsMax?: IntNullableFilter<"PointRule"> | number | null
    needApproval?: BoolFilter<"PointRule"> | boolean
    frequency?: EnumFrequencyFilter<"PointRule"> | $Enums.Frequency
    maxTimes?: IntNullableFilter<"PointRule"> | number | null
    enabled?: BoolFilter<"PointRule"> | boolean
    familyId?: StringFilter<"PointRule"> | string
    createdAt?: DateTimeFilter<"PointRule"> | Date | string
    updatedAt?: DateTimeFilter<"PointRule"> | Date | string
    family?: XOR<FamilyRelationFilter, FamilyWhereInput>
    targets?: PointRuleTargetListRelationFilter
    records?: PointRecordListRelationFilter
  }, "id">

  export type PointRuleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    pointsType?: SortOrder
    points?: SortOrder
    pointsMin?: SortOrderInput | SortOrder
    pointsMax?: SortOrderInput | SortOrder
    needApproval?: SortOrder
    frequency?: SortOrder
    maxTimes?: SortOrderInput | SortOrder
    enabled?: SortOrder
    familyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PointRuleCountOrderByAggregateInput
    _avg?: PointRuleAvgOrderByAggregateInput
    _max?: PointRuleMaxOrderByAggregateInput
    _min?: PointRuleMinOrderByAggregateInput
    _sum?: PointRuleSumOrderByAggregateInput
  }

  export type PointRuleScalarWhereWithAggregatesInput = {
    AND?: PointRuleScalarWhereWithAggregatesInput | PointRuleScalarWhereWithAggregatesInput[]
    OR?: PointRuleScalarWhereWithAggregatesInput[]
    NOT?: PointRuleScalarWhereWithAggregatesInput | PointRuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PointRule"> | string
    name?: StringWithAggregatesFilter<"PointRule"> | string
    description?: StringNullableWithAggregatesFilter<"PointRule"> | string | null
    category?: StringWithAggregatesFilter<"PointRule"> | string
    pointsType?: EnumPointsTypeWithAggregatesFilter<"PointRule"> | $Enums.PointsType
    points?: IntWithAggregatesFilter<"PointRule"> | number
    pointsMin?: IntNullableWithAggregatesFilter<"PointRule"> | number | null
    pointsMax?: IntNullableWithAggregatesFilter<"PointRule"> | number | null
    needApproval?: BoolWithAggregatesFilter<"PointRule"> | boolean
    frequency?: EnumFrequencyWithAggregatesFilter<"PointRule"> | $Enums.Frequency
    maxTimes?: IntNullableWithAggregatesFilter<"PointRule"> | number | null
    enabled?: BoolWithAggregatesFilter<"PointRule"> | boolean
    familyId?: StringWithAggregatesFilter<"PointRule"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PointRule"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PointRule"> | Date | string
  }

  export type PointRuleTargetWhereInput = {
    AND?: PointRuleTargetWhereInput | PointRuleTargetWhereInput[]
    OR?: PointRuleTargetWhereInput[]
    NOT?: PointRuleTargetWhereInput | PointRuleTargetWhereInput[]
    id?: StringFilter<"PointRuleTarget"> | string
    pointRuleId?: StringFilter<"PointRuleTarget"> | string
    childId?: StringFilter<"PointRuleTarget"> | string
    pointRule?: XOR<PointRuleRelationFilter, PointRuleWhereInput>
  }

  export type PointRuleTargetOrderByWithRelationInput = {
    id?: SortOrder
    pointRuleId?: SortOrder
    childId?: SortOrder
    pointRule?: PointRuleOrderByWithRelationInput
  }

  export type PointRuleTargetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PointRuleTargetWhereInput | PointRuleTargetWhereInput[]
    OR?: PointRuleTargetWhereInput[]
    NOT?: PointRuleTargetWhereInput | PointRuleTargetWhereInput[]
    pointRuleId?: StringFilter<"PointRuleTarget"> | string
    childId?: StringFilter<"PointRuleTarget"> | string
    pointRule?: XOR<PointRuleRelationFilter, PointRuleWhereInput>
  }, "id">

  export type PointRuleTargetOrderByWithAggregationInput = {
    id?: SortOrder
    pointRuleId?: SortOrder
    childId?: SortOrder
    _count?: PointRuleTargetCountOrderByAggregateInput
    _max?: PointRuleTargetMaxOrderByAggregateInput
    _min?: PointRuleTargetMinOrderByAggregateInput
  }

  export type PointRuleTargetScalarWhereWithAggregatesInput = {
    AND?: PointRuleTargetScalarWhereWithAggregatesInput | PointRuleTargetScalarWhereWithAggregatesInput[]
    OR?: PointRuleTargetScalarWhereWithAggregatesInput[]
    NOT?: PointRuleTargetScalarWhereWithAggregatesInput | PointRuleTargetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PointRuleTarget"> | string
    pointRuleId?: StringWithAggregatesFilter<"PointRuleTarget"> | string
    childId?: StringWithAggregatesFilter<"PointRuleTarget"> | string
  }

  export type PointRecordWhereInput = {
    AND?: PointRecordWhereInput | PointRecordWhereInput[]
    OR?: PointRecordWhereInput[]
    NOT?: PointRecordWhereInput | PointRecordWhereInput[]
    id?: StringFilter<"PointRecord"> | string
    childId?: StringFilter<"PointRecord"> | string
    pointRuleId?: StringFilter<"PointRecord"> | string
    status?: EnumRecordStatusFilter<"PointRecord"> | $Enums.RecordStatus
    points?: IntFilter<"PointRecord"> | number
    description?: StringNullableFilter<"PointRecord"> | string | null
    imageUrl?: StringNullableFilter<"PointRecord"> | string | null
    submitNote?: StringNullableFilter<"PointRecord"> | string | null
    reviewNote?: StringNullableFilter<"PointRecord"> | string | null
    reviewedById?: StringNullableFilter<"PointRecord"> | string | null
    reviewedAt?: DateTimeNullableFilter<"PointRecord"> | Date | string | null
    createdAt?: DateTimeFilter<"PointRecord"> | Date | string
    updatedAt?: DateTimeFilter<"PointRecord"> | Date | string
    child?: XOR<UserRelationFilter, UserWhereInput>
    pointRule?: XOR<PointRuleRelationFilter, PointRuleWhereInput>
  }

  export type PointRecordOrderByWithRelationInput = {
    id?: SortOrder
    childId?: SortOrder
    pointRuleId?: SortOrder
    status?: SortOrder
    points?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    submitNote?: SortOrderInput | SortOrder
    reviewNote?: SortOrderInput | SortOrder
    reviewedById?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    child?: UserOrderByWithRelationInput
    pointRule?: PointRuleOrderByWithRelationInput
  }

  export type PointRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PointRecordWhereInput | PointRecordWhereInput[]
    OR?: PointRecordWhereInput[]
    NOT?: PointRecordWhereInput | PointRecordWhereInput[]
    childId?: StringFilter<"PointRecord"> | string
    pointRuleId?: StringFilter<"PointRecord"> | string
    status?: EnumRecordStatusFilter<"PointRecord"> | $Enums.RecordStatus
    points?: IntFilter<"PointRecord"> | number
    description?: StringNullableFilter<"PointRecord"> | string | null
    imageUrl?: StringNullableFilter<"PointRecord"> | string | null
    submitNote?: StringNullableFilter<"PointRecord"> | string | null
    reviewNote?: StringNullableFilter<"PointRecord"> | string | null
    reviewedById?: StringNullableFilter<"PointRecord"> | string | null
    reviewedAt?: DateTimeNullableFilter<"PointRecord"> | Date | string | null
    createdAt?: DateTimeFilter<"PointRecord"> | Date | string
    updatedAt?: DateTimeFilter<"PointRecord"> | Date | string
    child?: XOR<UserRelationFilter, UserWhereInput>
    pointRule?: XOR<PointRuleRelationFilter, PointRuleWhereInput>
  }, "id">

  export type PointRecordOrderByWithAggregationInput = {
    id?: SortOrder
    childId?: SortOrder
    pointRuleId?: SortOrder
    status?: SortOrder
    points?: SortOrder
    description?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    submitNote?: SortOrderInput | SortOrder
    reviewNote?: SortOrderInput | SortOrder
    reviewedById?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PointRecordCountOrderByAggregateInput
    _avg?: PointRecordAvgOrderByAggregateInput
    _max?: PointRecordMaxOrderByAggregateInput
    _min?: PointRecordMinOrderByAggregateInput
    _sum?: PointRecordSumOrderByAggregateInput
  }

  export type PointRecordScalarWhereWithAggregatesInput = {
    AND?: PointRecordScalarWhereWithAggregatesInput | PointRecordScalarWhereWithAggregatesInput[]
    OR?: PointRecordScalarWhereWithAggregatesInput[]
    NOT?: PointRecordScalarWhereWithAggregatesInput | PointRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PointRecord"> | string
    childId?: StringWithAggregatesFilter<"PointRecord"> | string
    pointRuleId?: StringWithAggregatesFilter<"PointRecord"> | string
    status?: EnumRecordStatusWithAggregatesFilter<"PointRecord"> | $Enums.RecordStatus
    points?: IntWithAggregatesFilter<"PointRecord"> | number
    description?: StringNullableWithAggregatesFilter<"PointRecord"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"PointRecord"> | string | null
    submitNote?: StringNullableWithAggregatesFilter<"PointRecord"> | string | null
    reviewNote?: StringNullableWithAggregatesFilter<"PointRecord"> | string | null
    reviewedById?: StringNullableWithAggregatesFilter<"PointRecord"> | string | null
    reviewedAt?: DateTimeNullableWithAggregatesFilter<"PointRecord"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PointRecord"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PointRecord"> | Date | string
  }

  export type PointAccountWhereInput = {
    AND?: PointAccountWhereInput | PointAccountWhereInput[]
    OR?: PointAccountWhereInput[]
    NOT?: PointAccountWhereInput | PointAccountWhereInput[]
    id?: StringFilter<"PointAccount"> | string
    childId?: StringFilter<"PointAccount"> | string
    balance?: IntFilter<"PointAccount"> | number
    totalEarned?: IntFilter<"PointAccount"> | number
    totalSpent?: IntFilter<"PointAccount"> | number
    createdAt?: DateTimeFilter<"PointAccount"> | Date | string
    updatedAt?: DateTimeFilter<"PointAccount"> | Date | string
    child?: XOR<UserRelationFilter, UserWhereInput>
    transactions?: PointTransactionListRelationFilter
  }

  export type PointAccountOrderByWithRelationInput = {
    id?: SortOrder
    childId?: SortOrder
    balance?: SortOrder
    totalEarned?: SortOrder
    totalSpent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    child?: UserOrderByWithRelationInput
    transactions?: PointTransactionOrderByRelationAggregateInput
  }

  export type PointAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    childId?: string
    AND?: PointAccountWhereInput | PointAccountWhereInput[]
    OR?: PointAccountWhereInput[]
    NOT?: PointAccountWhereInput | PointAccountWhereInput[]
    balance?: IntFilter<"PointAccount"> | number
    totalEarned?: IntFilter<"PointAccount"> | number
    totalSpent?: IntFilter<"PointAccount"> | number
    createdAt?: DateTimeFilter<"PointAccount"> | Date | string
    updatedAt?: DateTimeFilter<"PointAccount"> | Date | string
    child?: XOR<UserRelationFilter, UserWhereInput>
    transactions?: PointTransactionListRelationFilter
  }, "id" | "childId">

  export type PointAccountOrderByWithAggregationInput = {
    id?: SortOrder
    childId?: SortOrder
    balance?: SortOrder
    totalEarned?: SortOrder
    totalSpent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PointAccountCountOrderByAggregateInput
    _avg?: PointAccountAvgOrderByAggregateInput
    _max?: PointAccountMaxOrderByAggregateInput
    _min?: PointAccountMinOrderByAggregateInput
    _sum?: PointAccountSumOrderByAggregateInput
  }

  export type PointAccountScalarWhereWithAggregatesInput = {
    AND?: PointAccountScalarWhereWithAggregatesInput | PointAccountScalarWhereWithAggregatesInput[]
    OR?: PointAccountScalarWhereWithAggregatesInput[]
    NOT?: PointAccountScalarWhereWithAggregatesInput | PointAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PointAccount"> | string
    childId?: StringWithAggregatesFilter<"PointAccount"> | string
    balance?: IntWithAggregatesFilter<"PointAccount"> | number
    totalEarned?: IntWithAggregatesFilter<"PointAccount"> | number
    totalSpent?: IntWithAggregatesFilter<"PointAccount"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PointAccount"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PointAccount"> | Date | string
  }

  export type PointTransactionWhereInput = {
    AND?: PointTransactionWhereInput | PointTransactionWhereInput[]
    OR?: PointTransactionWhereInput[]
    NOT?: PointTransactionWhereInput | PointTransactionWhereInput[]
    id?: StringFilter<"PointTransaction"> | string
    accountId?: StringFilter<"PointTransaction"> | string
    type?: EnumTransactionTypeFilter<"PointTransaction"> | $Enums.TransactionType
    amount?: IntFilter<"PointTransaction"> | number
    balanceAfter?: IntFilter<"PointTransaction"> | number
    sourceType?: EnumSourceTypeFilter<"PointTransaction"> | $Enums.SourceType
    sourceId?: StringNullableFilter<"PointTransaction"> | string | null
    description?: StringNullableFilter<"PointTransaction"> | string | null
    createdAt?: DateTimeFilter<"PointTransaction"> | Date | string
    account?: XOR<PointAccountRelationFilter, PointAccountWhereInput>
  }

  export type PointTransactionOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    sourceType?: SortOrder
    sourceId?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    account?: PointAccountOrderByWithRelationInput
  }

  export type PointTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PointTransactionWhereInput | PointTransactionWhereInput[]
    OR?: PointTransactionWhereInput[]
    NOT?: PointTransactionWhereInput | PointTransactionWhereInput[]
    accountId?: StringFilter<"PointTransaction"> | string
    type?: EnumTransactionTypeFilter<"PointTransaction"> | $Enums.TransactionType
    amount?: IntFilter<"PointTransaction"> | number
    balanceAfter?: IntFilter<"PointTransaction"> | number
    sourceType?: EnumSourceTypeFilter<"PointTransaction"> | $Enums.SourceType
    sourceId?: StringNullableFilter<"PointTransaction"> | string | null
    description?: StringNullableFilter<"PointTransaction"> | string | null
    createdAt?: DateTimeFilter<"PointTransaction"> | Date | string
    account?: XOR<PointAccountRelationFilter, PointAccountWhereInput>
  }, "id">

  export type PointTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    sourceType?: SortOrder
    sourceId?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PointTransactionCountOrderByAggregateInput
    _avg?: PointTransactionAvgOrderByAggregateInput
    _max?: PointTransactionMaxOrderByAggregateInput
    _min?: PointTransactionMinOrderByAggregateInput
    _sum?: PointTransactionSumOrderByAggregateInput
  }

  export type PointTransactionScalarWhereWithAggregatesInput = {
    AND?: PointTransactionScalarWhereWithAggregatesInput | PointTransactionScalarWhereWithAggregatesInput[]
    OR?: PointTransactionScalarWhereWithAggregatesInput[]
    NOT?: PointTransactionScalarWhereWithAggregatesInput | PointTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PointTransaction"> | string
    accountId?: StringWithAggregatesFilter<"PointTransaction"> | string
    type?: EnumTransactionTypeWithAggregatesFilter<"PointTransaction"> | $Enums.TransactionType
    amount?: IntWithAggregatesFilter<"PointTransaction"> | number
    balanceAfter?: IntWithAggregatesFilter<"PointTransaction"> | number
    sourceType?: EnumSourceTypeWithAggregatesFilter<"PointTransaction"> | $Enums.SourceType
    sourceId?: StringNullableWithAggregatesFilter<"PointTransaction"> | string | null
    description?: StringNullableWithAggregatesFilter<"PointTransaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PointTransaction"> | Date | string
  }

  export type PetWhereInput = {
    AND?: PetWhereInput | PetWhereInput[]
    OR?: PetWhereInput[]
    NOT?: PetWhereInput | PetWhereInput[]
    id?: StringFilter<"Pet"> | string
    childId?: StringFilter<"Pet"> | string
    name?: StringFilter<"Pet"> | string
    stage?: EnumPetStageFilter<"Pet"> | $Enums.PetStage
    level?: IntFilter<"Pet"> | number
    exp?: IntFilter<"Pet"> | number
    status?: EnumPetStatusFilter<"Pet"> | $Enums.PetStatus
    hunger?: IntFilter<"Pet"> | number
    thirst?: IntFilter<"Pet"> | number
    cleanliness?: IntFilter<"Pet"> | number
    mood?: IntFilter<"Pet"> | number
    health?: IntFilter<"Pet"> | number
    lastDecayAt?: DateTimeFilter<"Pet"> | Date | string
    lastFedAt?: DateTimeNullableFilter<"Pet"> | Date | string | null
    lastWateredAt?: DateTimeNullableFilter<"Pet"> | Date | string | null
    lastCleanedAt?: DateTimeNullableFilter<"Pet"> | Date | string | null
    lastPlayedAt?: DateTimeNullableFilter<"Pet"> | Date | string | null
    totalCareCount?: IntFilter<"Pet"> | number
    createdAt?: DateTimeFilter<"Pet"> | Date | string
    updatedAt?: DateTimeFilter<"Pet"> | Date | string
    child?: XOR<UserRelationFilter, UserWhereInput>
    logs?: PetLogListRelationFilter
  }

  export type PetOrderByWithRelationInput = {
    id?: SortOrder
    childId?: SortOrder
    name?: SortOrder
    stage?: SortOrder
    level?: SortOrder
    exp?: SortOrder
    status?: SortOrder
    hunger?: SortOrder
    thirst?: SortOrder
    cleanliness?: SortOrder
    mood?: SortOrder
    health?: SortOrder
    lastDecayAt?: SortOrder
    lastFedAt?: SortOrderInput | SortOrder
    lastWateredAt?: SortOrderInput | SortOrder
    lastCleanedAt?: SortOrderInput | SortOrder
    lastPlayedAt?: SortOrderInput | SortOrder
    totalCareCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    child?: UserOrderByWithRelationInput
    logs?: PetLogOrderByRelationAggregateInput
  }

  export type PetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    childId?: string
    AND?: PetWhereInput | PetWhereInput[]
    OR?: PetWhereInput[]
    NOT?: PetWhereInput | PetWhereInput[]
    name?: StringFilter<"Pet"> | string
    stage?: EnumPetStageFilter<"Pet"> | $Enums.PetStage
    level?: IntFilter<"Pet"> | number
    exp?: IntFilter<"Pet"> | number
    status?: EnumPetStatusFilter<"Pet"> | $Enums.PetStatus
    hunger?: IntFilter<"Pet"> | number
    thirst?: IntFilter<"Pet"> | number
    cleanliness?: IntFilter<"Pet"> | number
    mood?: IntFilter<"Pet"> | number
    health?: IntFilter<"Pet"> | number
    lastDecayAt?: DateTimeFilter<"Pet"> | Date | string
    lastFedAt?: DateTimeNullableFilter<"Pet"> | Date | string | null
    lastWateredAt?: DateTimeNullableFilter<"Pet"> | Date | string | null
    lastCleanedAt?: DateTimeNullableFilter<"Pet"> | Date | string | null
    lastPlayedAt?: DateTimeNullableFilter<"Pet"> | Date | string | null
    totalCareCount?: IntFilter<"Pet"> | number
    createdAt?: DateTimeFilter<"Pet"> | Date | string
    updatedAt?: DateTimeFilter<"Pet"> | Date | string
    child?: XOR<UserRelationFilter, UserWhereInput>
    logs?: PetLogListRelationFilter
  }, "id" | "childId">

  export type PetOrderByWithAggregationInput = {
    id?: SortOrder
    childId?: SortOrder
    name?: SortOrder
    stage?: SortOrder
    level?: SortOrder
    exp?: SortOrder
    status?: SortOrder
    hunger?: SortOrder
    thirst?: SortOrder
    cleanliness?: SortOrder
    mood?: SortOrder
    health?: SortOrder
    lastDecayAt?: SortOrder
    lastFedAt?: SortOrderInput | SortOrder
    lastWateredAt?: SortOrderInput | SortOrder
    lastCleanedAt?: SortOrderInput | SortOrder
    lastPlayedAt?: SortOrderInput | SortOrder
    totalCareCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PetCountOrderByAggregateInput
    _avg?: PetAvgOrderByAggregateInput
    _max?: PetMaxOrderByAggregateInput
    _min?: PetMinOrderByAggregateInput
    _sum?: PetSumOrderByAggregateInput
  }

  export type PetScalarWhereWithAggregatesInput = {
    AND?: PetScalarWhereWithAggregatesInput | PetScalarWhereWithAggregatesInput[]
    OR?: PetScalarWhereWithAggregatesInput[]
    NOT?: PetScalarWhereWithAggregatesInput | PetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pet"> | string
    childId?: StringWithAggregatesFilter<"Pet"> | string
    name?: StringWithAggregatesFilter<"Pet"> | string
    stage?: EnumPetStageWithAggregatesFilter<"Pet"> | $Enums.PetStage
    level?: IntWithAggregatesFilter<"Pet"> | number
    exp?: IntWithAggregatesFilter<"Pet"> | number
    status?: EnumPetStatusWithAggregatesFilter<"Pet"> | $Enums.PetStatus
    hunger?: IntWithAggregatesFilter<"Pet"> | number
    thirst?: IntWithAggregatesFilter<"Pet"> | number
    cleanliness?: IntWithAggregatesFilter<"Pet"> | number
    mood?: IntWithAggregatesFilter<"Pet"> | number
    health?: IntWithAggregatesFilter<"Pet"> | number
    lastDecayAt?: DateTimeWithAggregatesFilter<"Pet"> | Date | string
    lastFedAt?: DateTimeNullableWithAggregatesFilter<"Pet"> | Date | string | null
    lastWateredAt?: DateTimeNullableWithAggregatesFilter<"Pet"> | Date | string | null
    lastCleanedAt?: DateTimeNullableWithAggregatesFilter<"Pet"> | Date | string | null
    lastPlayedAt?: DateTimeNullableWithAggregatesFilter<"Pet"> | Date | string | null
    totalCareCount?: IntWithAggregatesFilter<"Pet"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Pet"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Pet"> | Date | string
  }

  export type PetLogWhereInput = {
    AND?: PetLogWhereInput | PetLogWhereInput[]
    OR?: PetLogWhereInput[]
    NOT?: PetLogWhereInput | PetLogWhereInput[]
    id?: StringFilter<"PetLog"> | string
    petId?: StringFilter<"PetLog"> | string
    action?: EnumPetActionFilter<"PetLog"> | $Enums.PetAction
    oldValue?: IntNullableFilter<"PetLog"> | number | null
    newValue?: IntNullableFilter<"PetLog"> | number | null
    pointsCost?: IntNullableFilter<"PetLog"> | number | null
    description?: StringFilter<"PetLog"> | string
    createdAt?: DateTimeFilter<"PetLog"> | Date | string
    pet?: XOR<PetRelationFilter, PetWhereInput>
  }

  export type PetLogOrderByWithRelationInput = {
    id?: SortOrder
    petId?: SortOrder
    action?: SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    pointsCost?: SortOrderInput | SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    pet?: PetOrderByWithRelationInput
  }

  export type PetLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PetLogWhereInput | PetLogWhereInput[]
    OR?: PetLogWhereInput[]
    NOT?: PetLogWhereInput | PetLogWhereInput[]
    petId?: StringFilter<"PetLog"> | string
    action?: EnumPetActionFilter<"PetLog"> | $Enums.PetAction
    oldValue?: IntNullableFilter<"PetLog"> | number | null
    newValue?: IntNullableFilter<"PetLog"> | number | null
    pointsCost?: IntNullableFilter<"PetLog"> | number | null
    description?: StringFilter<"PetLog"> | string
    createdAt?: DateTimeFilter<"PetLog"> | Date | string
    pet?: XOR<PetRelationFilter, PetWhereInput>
  }, "id">

  export type PetLogOrderByWithAggregationInput = {
    id?: SortOrder
    petId?: SortOrder
    action?: SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    pointsCost?: SortOrderInput | SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    _count?: PetLogCountOrderByAggregateInput
    _avg?: PetLogAvgOrderByAggregateInput
    _max?: PetLogMaxOrderByAggregateInput
    _min?: PetLogMinOrderByAggregateInput
    _sum?: PetLogSumOrderByAggregateInput
  }

  export type PetLogScalarWhereWithAggregatesInput = {
    AND?: PetLogScalarWhereWithAggregatesInput | PetLogScalarWhereWithAggregatesInput[]
    OR?: PetLogScalarWhereWithAggregatesInput[]
    NOT?: PetLogScalarWhereWithAggregatesInput | PetLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PetLog"> | string
    petId?: StringWithAggregatesFilter<"PetLog"> | string
    action?: EnumPetActionWithAggregatesFilter<"PetLog"> | $Enums.PetAction
    oldValue?: IntNullableWithAggregatesFilter<"PetLog"> | number | null
    newValue?: IntNullableWithAggregatesFilter<"PetLog"> | number | null
    pointsCost?: IntNullableWithAggregatesFilter<"PetLog"> | number | null
    description?: StringWithAggregatesFilter<"PetLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PetLog"> | Date | string
  }

  export type TaskPlanWhereInput = {
    AND?: TaskPlanWhereInput | TaskPlanWhereInput[]
    OR?: TaskPlanWhereInput[]
    NOT?: TaskPlanWhereInput | TaskPlanWhereInput[]
    id?: StringFilter<"TaskPlan"> | string
    childId?: StringFilter<"TaskPlan"> | string
    title?: StringFilter<"TaskPlan"> | string
    description?: StringNullableFilter<"TaskPlan"> | string | null
    points?: IntFilter<"TaskPlan"> | number
    scheduledAt?: DateTimeNullableFilter<"TaskPlan"> | Date | string | null
    dueAt?: DateTimeNullableFilter<"TaskPlan"> | Date | string | null
    frequency?: EnumFrequencyNullableFilter<"TaskPlan"> | $Enums.Frequency | null
    enabled?: BoolFilter<"TaskPlan"> | boolean
    createdAt?: DateTimeFilter<"TaskPlan"> | Date | string
    updatedAt?: DateTimeFilter<"TaskPlan"> | Date | string
    child?: XOR<UserRelationFilter, UserWhereInput>
    logs?: TaskLogListRelationFilter
  }

  export type TaskPlanOrderByWithRelationInput = {
    id?: SortOrder
    childId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    points?: SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    dueAt?: SortOrderInput | SortOrder
    frequency?: SortOrderInput | SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    child?: UserOrderByWithRelationInput
    logs?: TaskLogOrderByRelationAggregateInput
  }

  export type TaskPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskPlanWhereInput | TaskPlanWhereInput[]
    OR?: TaskPlanWhereInput[]
    NOT?: TaskPlanWhereInput | TaskPlanWhereInput[]
    childId?: StringFilter<"TaskPlan"> | string
    title?: StringFilter<"TaskPlan"> | string
    description?: StringNullableFilter<"TaskPlan"> | string | null
    points?: IntFilter<"TaskPlan"> | number
    scheduledAt?: DateTimeNullableFilter<"TaskPlan"> | Date | string | null
    dueAt?: DateTimeNullableFilter<"TaskPlan"> | Date | string | null
    frequency?: EnumFrequencyNullableFilter<"TaskPlan"> | $Enums.Frequency | null
    enabled?: BoolFilter<"TaskPlan"> | boolean
    createdAt?: DateTimeFilter<"TaskPlan"> | Date | string
    updatedAt?: DateTimeFilter<"TaskPlan"> | Date | string
    child?: XOR<UserRelationFilter, UserWhereInput>
    logs?: TaskLogListRelationFilter
  }, "id">

  export type TaskPlanOrderByWithAggregationInput = {
    id?: SortOrder
    childId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    points?: SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    dueAt?: SortOrderInput | SortOrder
    frequency?: SortOrderInput | SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TaskPlanCountOrderByAggregateInput
    _avg?: TaskPlanAvgOrderByAggregateInput
    _max?: TaskPlanMaxOrderByAggregateInput
    _min?: TaskPlanMinOrderByAggregateInput
    _sum?: TaskPlanSumOrderByAggregateInput
  }

  export type TaskPlanScalarWhereWithAggregatesInput = {
    AND?: TaskPlanScalarWhereWithAggregatesInput | TaskPlanScalarWhereWithAggregatesInput[]
    OR?: TaskPlanScalarWhereWithAggregatesInput[]
    NOT?: TaskPlanScalarWhereWithAggregatesInput | TaskPlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TaskPlan"> | string
    childId?: StringWithAggregatesFilter<"TaskPlan"> | string
    title?: StringWithAggregatesFilter<"TaskPlan"> | string
    description?: StringNullableWithAggregatesFilter<"TaskPlan"> | string | null
    points?: IntWithAggregatesFilter<"TaskPlan"> | number
    scheduledAt?: DateTimeNullableWithAggregatesFilter<"TaskPlan"> | Date | string | null
    dueAt?: DateTimeNullableWithAggregatesFilter<"TaskPlan"> | Date | string | null
    frequency?: EnumFrequencyNullableWithAggregatesFilter<"TaskPlan"> | $Enums.Frequency | null
    enabled?: BoolWithAggregatesFilter<"TaskPlan"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"TaskPlan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TaskPlan"> | Date | string
  }

  export type TaskLogWhereInput = {
    AND?: TaskLogWhereInput | TaskLogWhereInput[]
    OR?: TaskLogWhereInput[]
    NOT?: TaskLogWhereInput | TaskLogWhereInput[]
    id?: StringFilter<"TaskLog"> | string
    taskPlanId?: StringNullableFilter<"TaskLog"> | string | null
    childId?: StringFilter<"TaskLog"> | string
    points?: IntFilter<"TaskLog"> | number
    note?: StringNullableFilter<"TaskLog"> | string | null
    createdAt?: DateTimeFilter<"TaskLog"> | Date | string
    taskPlan?: XOR<TaskPlanNullableRelationFilter, TaskPlanWhereInput> | null
    child?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type TaskLogOrderByWithRelationInput = {
    id?: SortOrder
    taskPlanId?: SortOrderInput | SortOrder
    childId?: SortOrder
    points?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    taskPlan?: TaskPlanOrderByWithRelationInput
    child?: UserOrderByWithRelationInput
  }

  export type TaskLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskLogWhereInput | TaskLogWhereInput[]
    OR?: TaskLogWhereInput[]
    NOT?: TaskLogWhereInput | TaskLogWhereInput[]
    taskPlanId?: StringNullableFilter<"TaskLog"> | string | null
    childId?: StringFilter<"TaskLog"> | string
    points?: IntFilter<"TaskLog"> | number
    note?: StringNullableFilter<"TaskLog"> | string | null
    createdAt?: DateTimeFilter<"TaskLog"> | Date | string
    taskPlan?: XOR<TaskPlanNullableRelationFilter, TaskPlanWhereInput> | null
    child?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type TaskLogOrderByWithAggregationInput = {
    id?: SortOrder
    taskPlanId?: SortOrderInput | SortOrder
    childId?: SortOrder
    points?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TaskLogCountOrderByAggregateInput
    _avg?: TaskLogAvgOrderByAggregateInput
    _max?: TaskLogMaxOrderByAggregateInput
    _min?: TaskLogMinOrderByAggregateInput
    _sum?: TaskLogSumOrderByAggregateInput
  }

  export type TaskLogScalarWhereWithAggregatesInput = {
    AND?: TaskLogScalarWhereWithAggregatesInput | TaskLogScalarWhereWithAggregatesInput[]
    OR?: TaskLogScalarWhereWithAggregatesInput[]
    NOT?: TaskLogScalarWhereWithAggregatesInput | TaskLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TaskLog"> | string
    taskPlanId?: StringNullableWithAggregatesFilter<"TaskLog"> | string | null
    childId?: StringWithAggregatesFilter<"TaskLog"> | string
    points?: IntWithAggregatesFilter<"TaskLog"> | number
    note?: StringNullableWithAggregatesFilter<"TaskLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TaskLog"> | Date | string
  }

  export type RewardItemWhereInput = {
    AND?: RewardItemWhereInput | RewardItemWhereInput[]
    OR?: RewardItemWhereInput[]
    NOT?: RewardItemWhereInput | RewardItemWhereInput[]
    id?: StringFilter<"RewardItem"> | string
    familyId?: StringFilter<"RewardItem"> | string
    name?: StringFilter<"RewardItem"> | string
    description?: StringNullableFilter<"RewardItem"> | string | null
    cost?: IntFilter<"RewardItem"> | number
    stock?: IntNullableFilter<"RewardItem"> | number | null
    enabled?: BoolFilter<"RewardItem"> | boolean
    imageUrl?: StringNullableFilter<"RewardItem"> | string | null
    createdAt?: DateTimeFilter<"RewardItem"> | Date | string
    updatedAt?: DateTimeFilter<"RewardItem"> | Date | string
    family?: XOR<FamilyRelationFilter, FamilyWhereInput>
    redeems?: RedeemLogListRelationFilter
  }

  export type RewardItemOrderByWithRelationInput = {
    id?: SortOrder
    familyId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    cost?: SortOrder
    stock?: SortOrderInput | SortOrder
    enabled?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    family?: FamilyOrderByWithRelationInput
    redeems?: RedeemLogOrderByRelationAggregateInput
  }

  export type RewardItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RewardItemWhereInput | RewardItemWhereInput[]
    OR?: RewardItemWhereInput[]
    NOT?: RewardItemWhereInput | RewardItemWhereInput[]
    familyId?: StringFilter<"RewardItem"> | string
    name?: StringFilter<"RewardItem"> | string
    description?: StringNullableFilter<"RewardItem"> | string | null
    cost?: IntFilter<"RewardItem"> | number
    stock?: IntNullableFilter<"RewardItem"> | number | null
    enabled?: BoolFilter<"RewardItem"> | boolean
    imageUrl?: StringNullableFilter<"RewardItem"> | string | null
    createdAt?: DateTimeFilter<"RewardItem"> | Date | string
    updatedAt?: DateTimeFilter<"RewardItem"> | Date | string
    family?: XOR<FamilyRelationFilter, FamilyWhereInput>
    redeems?: RedeemLogListRelationFilter
  }, "id">

  export type RewardItemOrderByWithAggregationInput = {
    id?: SortOrder
    familyId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    cost?: SortOrder
    stock?: SortOrderInput | SortOrder
    enabled?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RewardItemCountOrderByAggregateInput
    _avg?: RewardItemAvgOrderByAggregateInput
    _max?: RewardItemMaxOrderByAggregateInput
    _min?: RewardItemMinOrderByAggregateInput
    _sum?: RewardItemSumOrderByAggregateInput
  }

  export type RewardItemScalarWhereWithAggregatesInput = {
    AND?: RewardItemScalarWhereWithAggregatesInput | RewardItemScalarWhereWithAggregatesInput[]
    OR?: RewardItemScalarWhereWithAggregatesInput[]
    NOT?: RewardItemScalarWhereWithAggregatesInput | RewardItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RewardItem"> | string
    familyId?: StringWithAggregatesFilter<"RewardItem"> | string
    name?: StringWithAggregatesFilter<"RewardItem"> | string
    description?: StringNullableWithAggregatesFilter<"RewardItem"> | string | null
    cost?: IntWithAggregatesFilter<"RewardItem"> | number
    stock?: IntNullableWithAggregatesFilter<"RewardItem"> | number | null
    enabled?: BoolWithAggregatesFilter<"RewardItem"> | boolean
    imageUrl?: StringNullableWithAggregatesFilter<"RewardItem"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RewardItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RewardItem"> | Date | string
  }

  export type RedeemLogWhereInput = {
    AND?: RedeemLogWhereInput | RedeemLogWhereInput[]
    OR?: RedeemLogWhereInput[]
    NOT?: RedeemLogWhereInput | RedeemLogWhereInput[]
    id?: StringFilter<"RedeemLog"> | string
    childId?: StringFilter<"RedeemLog"> | string
    rewardItemId?: StringFilter<"RedeemLog"> | string
    quantity?: IntFilter<"RedeemLog"> | number
    pointsSpent?: IntFilter<"RedeemLog"> | number
    note?: StringNullableFilter<"RedeemLog"> | string | null
    createdAt?: DateTimeFilter<"RedeemLog"> | Date | string
    child?: XOR<UserRelationFilter, UserWhereInput>
    rewardItem?: XOR<RewardItemRelationFilter, RewardItemWhereInput>
  }

  export type RedeemLogOrderByWithRelationInput = {
    id?: SortOrder
    childId?: SortOrder
    rewardItemId?: SortOrder
    quantity?: SortOrder
    pointsSpent?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    child?: UserOrderByWithRelationInput
    rewardItem?: RewardItemOrderByWithRelationInput
  }

  export type RedeemLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RedeemLogWhereInput | RedeemLogWhereInput[]
    OR?: RedeemLogWhereInput[]
    NOT?: RedeemLogWhereInput | RedeemLogWhereInput[]
    childId?: StringFilter<"RedeemLog"> | string
    rewardItemId?: StringFilter<"RedeemLog"> | string
    quantity?: IntFilter<"RedeemLog"> | number
    pointsSpent?: IntFilter<"RedeemLog"> | number
    note?: StringNullableFilter<"RedeemLog"> | string | null
    createdAt?: DateTimeFilter<"RedeemLog"> | Date | string
    child?: XOR<UserRelationFilter, UserWhereInput>
    rewardItem?: XOR<RewardItemRelationFilter, RewardItemWhereInput>
  }, "id">

  export type RedeemLogOrderByWithAggregationInput = {
    id?: SortOrder
    childId?: SortOrder
    rewardItemId?: SortOrder
    quantity?: SortOrder
    pointsSpent?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RedeemLogCountOrderByAggregateInput
    _avg?: RedeemLogAvgOrderByAggregateInput
    _max?: RedeemLogMaxOrderByAggregateInput
    _min?: RedeemLogMinOrderByAggregateInput
    _sum?: RedeemLogSumOrderByAggregateInput
  }

  export type RedeemLogScalarWhereWithAggregatesInput = {
    AND?: RedeemLogScalarWhereWithAggregatesInput | RedeemLogScalarWhereWithAggregatesInput[]
    OR?: RedeemLogScalarWhereWithAggregatesInput[]
    NOT?: RedeemLogScalarWhereWithAggregatesInput | RedeemLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RedeemLog"> | string
    childId?: StringWithAggregatesFilter<"RedeemLog"> | string
    rewardItemId?: StringWithAggregatesFilter<"RedeemLog"> | string
    quantity?: IntWithAggregatesFilter<"RedeemLog"> | number
    pointsSpent?: IntWithAggregatesFilter<"RedeemLog"> | number
    note?: StringNullableWithAggregatesFilter<"RedeemLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RedeemLog"> | Date | string
  }

  export type FamilyCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutFamilyInput
    pointRules?: PointRuleCreateNestedManyWithoutFamilyInput
    rewardItems?: RewardItemCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutFamilyInput
    pointRules?: PointRuleUncheckedCreateNestedManyWithoutFamilyInput
    rewardItems?: RewardItemUncheckedCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutFamilyNestedInput
    pointRules?: PointRuleUpdateManyWithoutFamilyNestedInput
    rewardItems?: RewardItemUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutFamilyNestedInput
    pointRules?: PointRuleUncheckedUpdateManyWithoutFamilyNestedInput
    rewardItems?: RewardItemUncheckedUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FamilyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FamilyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    role: $Enums.Role
    pin?: string | null
    password?: string | null
    avatarUrl?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalEarnedPoints?: number
    level?: number
    streak?: number
    lastCheckIn?: Date | string | null
    family: FamilyCreateNestedOneWithoutUsersInput
    pointAccount?: PointAccountCreateNestedOneWithoutChildInput
    pointRecords?: PointRecordCreateNestedManyWithoutChildInput
    pet?: PetCreateNestedOneWithoutChildInput
    taskPlans?: TaskPlanCreateNestedManyWithoutChildInput
    taskLogs?: TaskLogCreateNestedManyWithoutChildInput
    redeemLogs?: RedeemLogCreateNestedManyWithoutChildInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    role: $Enums.Role
    pin?: string | null
    password?: string | null
    familyId: string
    avatarUrl?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalEarnedPoints?: number
    level?: number
    streak?: number
    lastCheckIn?: Date | string | null
    pointAccount?: PointAccountUncheckedCreateNestedOneWithoutChildInput
    pointRecords?: PointRecordUncheckedCreateNestedManyWithoutChildInput
    pet?: PetUncheckedCreateNestedOneWithoutChildInput
    taskPlans?: TaskPlanUncheckedCreateNestedManyWithoutChildInput
    taskLogs?: TaskLogUncheckedCreateNestedManyWithoutChildInput
    redeemLogs?: RedeemLogUncheckedCreateNestedManyWithoutChildInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalEarnedPoints?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastCheckIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    family?: FamilyUpdateOneRequiredWithoutUsersNestedInput
    pointAccount?: PointAccountUpdateOneWithoutChildNestedInput
    pointRecords?: PointRecordUpdateManyWithoutChildNestedInput
    pet?: PetUpdateOneWithoutChildNestedInput
    taskPlans?: TaskPlanUpdateManyWithoutChildNestedInput
    taskLogs?: TaskLogUpdateManyWithoutChildNestedInput
    redeemLogs?: RedeemLogUpdateManyWithoutChildNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalEarnedPoints?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastCheckIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pointAccount?: PointAccountUncheckedUpdateOneWithoutChildNestedInput
    pointRecords?: PointRecordUncheckedUpdateManyWithoutChildNestedInput
    pet?: PetUncheckedUpdateOneWithoutChildNestedInput
    taskPlans?: TaskPlanUncheckedUpdateManyWithoutChildNestedInput
    taskLogs?: TaskLogUncheckedUpdateManyWithoutChildNestedInput
    redeemLogs?: RedeemLogUncheckedUpdateManyWithoutChildNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    role: $Enums.Role
    pin?: string | null
    password?: string | null
    familyId: string
    avatarUrl?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalEarnedPoints?: number
    level?: number
    streak?: number
    lastCheckIn?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalEarnedPoints?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastCheckIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalEarnedPoints?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastCheckIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PointRuleCreateInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    pointsType: $Enums.PointsType
    points: number
    pointsMin?: number | null
    pointsMax?: number | null
    needApproval?: boolean
    frequency: $Enums.Frequency
    maxTimes?: number | null
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    family: FamilyCreateNestedOneWithoutPointRulesInput
    targets?: PointRuleTargetCreateNestedManyWithoutPointRuleInput
    records?: PointRecordCreateNestedManyWithoutPointRuleInput
  }

  export type PointRuleUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    pointsType: $Enums.PointsType
    points: number
    pointsMin?: number | null
    pointsMax?: number | null
    needApproval?: boolean
    frequency: $Enums.Frequency
    maxTimes?: number | null
    enabled?: boolean
    familyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    targets?: PointRuleTargetUncheckedCreateNestedManyWithoutPointRuleInput
    records?: PointRecordUncheckedCreateNestedManyWithoutPointRuleInput
  }

  export type PointRuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    pointsType?: EnumPointsTypeFieldUpdateOperationsInput | $Enums.PointsType
    points?: IntFieldUpdateOperationsInput | number
    pointsMin?: NullableIntFieldUpdateOperationsInput | number | null
    pointsMax?: NullableIntFieldUpdateOperationsInput | number | null
    needApproval?: BoolFieldUpdateOperationsInput | boolean
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    maxTimes?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    family?: FamilyUpdateOneRequiredWithoutPointRulesNestedInput
    targets?: PointRuleTargetUpdateManyWithoutPointRuleNestedInput
    records?: PointRecordUpdateManyWithoutPointRuleNestedInput
  }

  export type PointRuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    pointsType?: EnumPointsTypeFieldUpdateOperationsInput | $Enums.PointsType
    points?: IntFieldUpdateOperationsInput | number
    pointsMin?: NullableIntFieldUpdateOperationsInput | number | null
    pointsMax?: NullableIntFieldUpdateOperationsInput | number | null
    needApproval?: BoolFieldUpdateOperationsInput | boolean
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    maxTimes?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    familyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targets?: PointRuleTargetUncheckedUpdateManyWithoutPointRuleNestedInput
    records?: PointRecordUncheckedUpdateManyWithoutPointRuleNestedInput
  }

  export type PointRuleCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    pointsType: $Enums.PointsType
    points: number
    pointsMin?: number | null
    pointsMax?: number | null
    needApproval?: boolean
    frequency: $Enums.Frequency
    maxTimes?: number | null
    enabled?: boolean
    familyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PointRuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    pointsType?: EnumPointsTypeFieldUpdateOperationsInput | $Enums.PointsType
    points?: IntFieldUpdateOperationsInput | number
    pointsMin?: NullableIntFieldUpdateOperationsInput | number | null
    pointsMax?: NullableIntFieldUpdateOperationsInput | number | null
    needApproval?: BoolFieldUpdateOperationsInput | boolean
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    maxTimes?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointRuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    pointsType?: EnumPointsTypeFieldUpdateOperationsInput | $Enums.PointsType
    points?: IntFieldUpdateOperationsInput | number
    pointsMin?: NullableIntFieldUpdateOperationsInput | number | null
    pointsMax?: NullableIntFieldUpdateOperationsInput | number | null
    needApproval?: BoolFieldUpdateOperationsInput | boolean
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    maxTimes?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    familyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointRuleTargetCreateInput = {
    id?: string
    childId: string
    pointRule: PointRuleCreateNestedOneWithoutTargetsInput
  }

  export type PointRuleTargetUncheckedCreateInput = {
    id?: string
    pointRuleId: string
    childId: string
  }

  export type PointRuleTargetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    pointRule?: PointRuleUpdateOneRequiredWithoutTargetsNestedInput
  }

  export type PointRuleTargetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pointRuleId?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
  }

  export type PointRuleTargetCreateManyInput = {
    id?: string
    pointRuleId: string
    childId: string
  }

  export type PointRuleTargetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
  }

  export type PointRuleTargetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    pointRuleId?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
  }

  export type PointRecordCreateInput = {
    id?: string
    status?: $Enums.RecordStatus
    points: number
    description?: string | null
    imageUrl?: string | null
    submitNote?: string | null
    reviewNote?: string | null
    reviewedById?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    child: UserCreateNestedOneWithoutPointRecordsInput
    pointRule: PointRuleCreateNestedOneWithoutRecordsInput
  }

  export type PointRecordUncheckedCreateInput = {
    id?: string
    childId: string
    pointRuleId: string
    status?: $Enums.RecordStatus
    points: number
    description?: string | null
    imageUrl?: string | null
    submitNote?: string | null
    reviewNote?: string | null
    reviewedById?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PointRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    submitNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedById?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    child?: UserUpdateOneRequiredWithoutPointRecordsNestedInput
    pointRule?: PointRuleUpdateOneRequiredWithoutRecordsNestedInput
  }

  export type PointRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    pointRuleId?: StringFieldUpdateOperationsInput | string
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    submitNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedById?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointRecordCreateManyInput = {
    id?: string
    childId: string
    pointRuleId: string
    status?: $Enums.RecordStatus
    points: number
    description?: string | null
    imageUrl?: string | null
    submitNote?: string | null
    reviewNote?: string | null
    reviewedById?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PointRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    submitNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedById?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    pointRuleId?: StringFieldUpdateOperationsInput | string
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    submitNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedById?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointAccountCreateInput = {
    id?: string
    balance?: number
    totalEarned?: number
    totalSpent?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    child: UserCreateNestedOneWithoutPointAccountInput
    transactions?: PointTransactionCreateNestedManyWithoutAccountInput
  }

  export type PointAccountUncheckedCreateInput = {
    id?: string
    childId: string
    balance?: number
    totalEarned?: number
    totalSpent?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: PointTransactionUncheckedCreateNestedManyWithoutAccountInput
  }

  export type PointAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    totalEarned?: IntFieldUpdateOperationsInput | number
    totalSpent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    child?: UserUpdateOneRequiredWithoutPointAccountNestedInput
    transactions?: PointTransactionUpdateManyWithoutAccountNestedInput
  }

  export type PointAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    totalEarned?: IntFieldUpdateOperationsInput | number
    totalSpent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: PointTransactionUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type PointAccountCreateManyInput = {
    id?: string
    childId: string
    balance?: number
    totalEarned?: number
    totalSpent?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PointAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    totalEarned?: IntFieldUpdateOperationsInput | number
    totalSpent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    totalEarned?: IntFieldUpdateOperationsInput | number
    totalSpent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointTransactionCreateInput = {
    id?: string
    type: $Enums.TransactionType
    amount: number
    balanceAfter: number
    sourceType: $Enums.SourceType
    sourceId?: string | null
    description?: string | null
    createdAt?: Date | string
    account: PointAccountCreateNestedOneWithoutTransactionsInput
  }

  export type PointTransactionUncheckedCreateInput = {
    id?: string
    accountId: string
    type: $Enums.TransactionType
    amount: number
    balanceAfter: number
    sourceType: $Enums.SourceType
    sourceId?: string | null
    description?: string | null
    createdAt?: Date | string
  }

  export type PointTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: PointAccountUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type PointTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointTransactionCreateManyInput = {
    id?: string
    accountId: string
    type: $Enums.TransactionType
    amount: number
    balanceAfter: number
    sourceType: $Enums.SourceType
    sourceId?: string | null
    description?: string | null
    createdAt?: Date | string
  }

  export type PointTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PetCreateInput = {
    id?: string
    name?: string
    stage?: $Enums.PetStage
    level?: number
    exp?: number
    status?: $Enums.PetStatus
    hunger?: number
    thirst?: number
    cleanliness?: number
    mood?: number
    health?: number
    lastDecayAt?: Date | string
    lastFedAt?: Date | string | null
    lastWateredAt?: Date | string | null
    lastCleanedAt?: Date | string | null
    lastPlayedAt?: Date | string | null
    totalCareCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    child: UserCreateNestedOneWithoutPetInput
    logs?: PetLogCreateNestedManyWithoutPetInput
  }

  export type PetUncheckedCreateInput = {
    id?: string
    childId: string
    name?: string
    stage?: $Enums.PetStage
    level?: number
    exp?: number
    status?: $Enums.PetStatus
    hunger?: number
    thirst?: number
    cleanliness?: number
    mood?: number
    health?: number
    lastDecayAt?: Date | string
    lastFedAt?: Date | string | null
    lastWateredAt?: Date | string | null
    lastCleanedAt?: Date | string | null
    lastPlayedAt?: Date | string | null
    totalCareCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: PetLogUncheckedCreateNestedManyWithoutPetInput
  }

  export type PetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stage?: EnumPetStageFieldUpdateOperationsInput | $Enums.PetStage
    level?: IntFieldUpdateOperationsInput | number
    exp?: IntFieldUpdateOperationsInput | number
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    hunger?: IntFieldUpdateOperationsInput | number
    thirst?: IntFieldUpdateOperationsInput | number
    cleanliness?: IntFieldUpdateOperationsInput | number
    mood?: IntFieldUpdateOperationsInput | number
    health?: IntFieldUpdateOperationsInput | number
    lastDecayAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastFedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastCleanedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalCareCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    child?: UserUpdateOneRequiredWithoutPetNestedInput
    logs?: PetLogUpdateManyWithoutPetNestedInput
  }

  export type PetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stage?: EnumPetStageFieldUpdateOperationsInput | $Enums.PetStage
    level?: IntFieldUpdateOperationsInput | number
    exp?: IntFieldUpdateOperationsInput | number
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    hunger?: IntFieldUpdateOperationsInput | number
    thirst?: IntFieldUpdateOperationsInput | number
    cleanliness?: IntFieldUpdateOperationsInput | number
    mood?: IntFieldUpdateOperationsInput | number
    health?: IntFieldUpdateOperationsInput | number
    lastDecayAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastFedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastCleanedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalCareCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: PetLogUncheckedUpdateManyWithoutPetNestedInput
  }

  export type PetCreateManyInput = {
    id?: string
    childId: string
    name?: string
    stage?: $Enums.PetStage
    level?: number
    exp?: number
    status?: $Enums.PetStatus
    hunger?: number
    thirst?: number
    cleanliness?: number
    mood?: number
    health?: number
    lastDecayAt?: Date | string
    lastFedAt?: Date | string | null
    lastWateredAt?: Date | string | null
    lastCleanedAt?: Date | string | null
    lastPlayedAt?: Date | string | null
    totalCareCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stage?: EnumPetStageFieldUpdateOperationsInput | $Enums.PetStage
    level?: IntFieldUpdateOperationsInput | number
    exp?: IntFieldUpdateOperationsInput | number
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    hunger?: IntFieldUpdateOperationsInput | number
    thirst?: IntFieldUpdateOperationsInput | number
    cleanliness?: IntFieldUpdateOperationsInput | number
    mood?: IntFieldUpdateOperationsInput | number
    health?: IntFieldUpdateOperationsInput | number
    lastDecayAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastFedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastCleanedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalCareCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stage?: EnumPetStageFieldUpdateOperationsInput | $Enums.PetStage
    level?: IntFieldUpdateOperationsInput | number
    exp?: IntFieldUpdateOperationsInput | number
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    hunger?: IntFieldUpdateOperationsInput | number
    thirst?: IntFieldUpdateOperationsInput | number
    cleanliness?: IntFieldUpdateOperationsInput | number
    mood?: IntFieldUpdateOperationsInput | number
    health?: IntFieldUpdateOperationsInput | number
    lastDecayAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastFedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastCleanedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalCareCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PetLogCreateInput = {
    id?: string
    action: $Enums.PetAction
    oldValue?: number | null
    newValue?: number | null
    pointsCost?: number | null
    description: string
    createdAt?: Date | string
    pet: PetCreateNestedOneWithoutLogsInput
  }

  export type PetLogUncheckedCreateInput = {
    id?: string
    petId: string
    action: $Enums.PetAction
    oldValue?: number | null
    newValue?: number | null
    pointsCost?: number | null
    description: string
    createdAt?: Date | string
  }

  export type PetLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumPetActionFieldUpdateOperationsInput | $Enums.PetAction
    oldValue?: NullableIntFieldUpdateOperationsInput | number | null
    newValue?: NullableIntFieldUpdateOperationsInput | number | null
    pointsCost?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pet?: PetUpdateOneRequiredWithoutLogsNestedInput
  }

  export type PetLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    petId?: StringFieldUpdateOperationsInput | string
    action?: EnumPetActionFieldUpdateOperationsInput | $Enums.PetAction
    oldValue?: NullableIntFieldUpdateOperationsInput | number | null
    newValue?: NullableIntFieldUpdateOperationsInput | number | null
    pointsCost?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PetLogCreateManyInput = {
    id?: string
    petId: string
    action: $Enums.PetAction
    oldValue?: number | null
    newValue?: number | null
    pointsCost?: number | null
    description: string
    createdAt?: Date | string
  }

  export type PetLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumPetActionFieldUpdateOperationsInput | $Enums.PetAction
    oldValue?: NullableIntFieldUpdateOperationsInput | number | null
    newValue?: NullableIntFieldUpdateOperationsInput | number | null
    pointsCost?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PetLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    petId?: StringFieldUpdateOperationsInput | string
    action?: EnumPetActionFieldUpdateOperationsInput | $Enums.PetAction
    oldValue?: NullableIntFieldUpdateOperationsInput | number | null
    newValue?: NullableIntFieldUpdateOperationsInput | number | null
    pointsCost?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskPlanCreateInput = {
    id?: string
    title: string
    description?: string | null
    points?: number
    scheduledAt?: Date | string | null
    dueAt?: Date | string | null
    frequency?: $Enums.Frequency | null
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    child: UserCreateNestedOneWithoutTaskPlansInput
    logs?: TaskLogCreateNestedManyWithoutTaskPlanInput
  }

  export type TaskPlanUncheckedCreateInput = {
    id?: string
    childId: string
    title: string
    description?: string | null
    points?: number
    scheduledAt?: Date | string | null
    dueAt?: Date | string | null
    frequency?: $Enums.Frequency | null
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: TaskLogUncheckedCreateNestedManyWithoutTaskPlanInput
  }

  export type TaskPlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    frequency?: NullableEnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    child?: UserUpdateOneRequiredWithoutTaskPlansNestedInput
    logs?: TaskLogUpdateManyWithoutTaskPlanNestedInput
  }

  export type TaskPlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    frequency?: NullableEnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: TaskLogUncheckedUpdateManyWithoutTaskPlanNestedInput
  }

  export type TaskPlanCreateManyInput = {
    id?: string
    childId: string
    title: string
    description?: string | null
    points?: number
    scheduledAt?: Date | string | null
    dueAt?: Date | string | null
    frequency?: $Enums.Frequency | null
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskPlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    frequency?: NullableEnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskPlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    frequency?: NullableEnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLogCreateInput = {
    id?: string
    points?: number
    note?: string | null
    createdAt?: Date | string
    taskPlan?: TaskPlanCreateNestedOneWithoutLogsInput
    child: UserCreateNestedOneWithoutTaskLogsInput
  }

  export type TaskLogUncheckedCreateInput = {
    id?: string
    taskPlanId?: string | null
    childId: string
    points?: number
    note?: string | null
    createdAt?: Date | string
  }

  export type TaskLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskPlan?: TaskPlanUpdateOneWithoutLogsNestedInput
    child?: UserUpdateOneRequiredWithoutTaskLogsNestedInput
  }

  export type TaskLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    childId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLogCreateManyInput = {
    id?: string
    taskPlanId?: string | null
    childId: string
    points?: number
    note?: string | null
    createdAt?: Date | string
  }

  export type TaskLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    childId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewardItemCreateInput = {
    id?: string
    name: string
    description?: string | null
    cost: number
    stock?: number | null
    enabled?: boolean
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    family: FamilyCreateNestedOneWithoutRewardItemsInput
    redeems?: RedeemLogCreateNestedManyWithoutRewardItemInput
  }

  export type RewardItemUncheckedCreateInput = {
    id?: string
    familyId: string
    name: string
    description?: string | null
    cost: number
    stock?: number | null
    enabled?: boolean
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    redeems?: RedeemLogUncheckedCreateNestedManyWithoutRewardItemInput
  }

  export type RewardItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cost?: IntFieldUpdateOperationsInput | number
    stock?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    family?: FamilyUpdateOneRequiredWithoutRewardItemsNestedInput
    redeems?: RedeemLogUpdateManyWithoutRewardItemNestedInput
  }

  export type RewardItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cost?: IntFieldUpdateOperationsInput | number
    stock?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    redeems?: RedeemLogUncheckedUpdateManyWithoutRewardItemNestedInput
  }

  export type RewardItemCreateManyInput = {
    id?: string
    familyId: string
    name: string
    description?: string | null
    cost: number
    stock?: number | null
    enabled?: boolean
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RewardItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cost?: IntFieldUpdateOperationsInput | number
    stock?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewardItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cost?: IntFieldUpdateOperationsInput | number
    stock?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RedeemLogCreateInput = {
    id?: string
    quantity?: number
    pointsSpent: number
    note?: string | null
    createdAt?: Date | string
    child: UserCreateNestedOneWithoutRedeemLogsInput
    rewardItem: RewardItemCreateNestedOneWithoutRedeemsInput
  }

  export type RedeemLogUncheckedCreateInput = {
    id?: string
    childId: string
    rewardItemId: string
    quantity?: number
    pointsSpent: number
    note?: string | null
    createdAt?: Date | string
  }

  export type RedeemLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    pointsSpent?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    child?: UserUpdateOneRequiredWithoutRedeemLogsNestedInput
    rewardItem?: RewardItemUpdateOneRequiredWithoutRedeemsNestedInput
  }

  export type RedeemLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    rewardItemId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    pointsSpent?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RedeemLogCreateManyInput = {
    id?: string
    childId: string
    rewardItemId: string
    quantity?: number
    pointsSpent: number
    note?: string | null
    createdAt?: Date | string
  }

  export type RedeemLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    pointsSpent?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RedeemLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    rewardItemId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    pointsSpent?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type PointRuleListRelationFilter = {
    every?: PointRuleWhereInput
    some?: PointRuleWhereInput
    none?: PointRuleWhereInput
  }

  export type RewardItemListRelationFilter = {
    every?: RewardItemWhereInput
    some?: RewardItemWhereInput
    none?: RewardItemWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PointRuleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RewardItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FamilyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FamilyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FamilyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FamilyRelationFilter = {
    is?: FamilyWhereInput
    isNot?: FamilyWhereInput
  }

  export type PointAccountNullableRelationFilter = {
    is?: PointAccountWhereInput | null
    isNot?: PointAccountWhereInput | null
  }

  export type PointRecordListRelationFilter = {
    every?: PointRecordWhereInput
    some?: PointRecordWhereInput
    none?: PointRecordWhereInput
  }

  export type PetNullableRelationFilter = {
    is?: PetWhereInput | null
    isNot?: PetWhereInput | null
  }

  export type TaskPlanListRelationFilter = {
    every?: TaskPlanWhereInput
    some?: TaskPlanWhereInput
    none?: TaskPlanWhereInput
  }

  export type TaskLogListRelationFilter = {
    every?: TaskLogWhereInput
    some?: TaskLogWhereInput
    none?: TaskLogWhereInput
  }

  export type RedeemLogListRelationFilter = {
    every?: RedeemLogWhereInput
    some?: RedeemLogWhereInput
    none?: RedeemLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PointRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskPlanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RedeemLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    pin?: SortOrder
    password?: SortOrder
    familyId?: SortOrder
    avatarUrl?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    totalEarnedPoints?: SortOrder
    level?: SortOrder
    streak?: SortOrder
    lastCheckIn?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    totalEarnedPoints?: SortOrder
    level?: SortOrder
    streak?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    pin?: SortOrder
    password?: SortOrder
    familyId?: SortOrder
    avatarUrl?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    totalEarnedPoints?: SortOrder
    level?: SortOrder
    streak?: SortOrder
    lastCheckIn?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    pin?: SortOrder
    password?: SortOrder
    familyId?: SortOrder
    avatarUrl?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    totalEarnedPoints?: SortOrder
    level?: SortOrder
    streak?: SortOrder
    lastCheckIn?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    totalEarnedPoints?: SortOrder
    level?: SortOrder
    streak?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type EnumPointsTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PointsType | EnumPointsTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PointsType[] | ListEnumPointsTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PointsType[] | ListEnumPointsTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPointsTypeFilter<$PrismaModel> | $Enums.PointsType
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumFrequencyFilter<$PrismaModel = never> = {
    equals?: $Enums.Frequency | EnumFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumFrequencyFilter<$PrismaModel> | $Enums.Frequency
  }

  export type PointRuleTargetListRelationFilter = {
    every?: PointRuleTargetWhereInput
    some?: PointRuleTargetWhereInput
    none?: PointRuleTargetWhereInput
  }

  export type PointRuleTargetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PointRuleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    pointsType?: SortOrder
    points?: SortOrder
    pointsMin?: SortOrder
    pointsMax?: SortOrder
    needApproval?: SortOrder
    frequency?: SortOrder
    maxTimes?: SortOrder
    enabled?: SortOrder
    familyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PointRuleAvgOrderByAggregateInput = {
    points?: SortOrder
    pointsMin?: SortOrder
    pointsMax?: SortOrder
    maxTimes?: SortOrder
  }

  export type PointRuleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    pointsType?: SortOrder
    points?: SortOrder
    pointsMin?: SortOrder
    pointsMax?: SortOrder
    needApproval?: SortOrder
    frequency?: SortOrder
    maxTimes?: SortOrder
    enabled?: SortOrder
    familyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PointRuleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    pointsType?: SortOrder
    points?: SortOrder
    pointsMin?: SortOrder
    pointsMax?: SortOrder
    needApproval?: SortOrder
    frequency?: SortOrder
    maxTimes?: SortOrder
    enabled?: SortOrder
    familyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PointRuleSumOrderByAggregateInput = {
    points?: SortOrder
    pointsMin?: SortOrder
    pointsMax?: SortOrder
    maxTimes?: SortOrder
  }

  export type EnumPointsTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PointsType | EnumPointsTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PointsType[] | ListEnumPointsTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PointsType[] | ListEnumPointsTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPointsTypeWithAggregatesFilter<$PrismaModel> | $Enums.PointsType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPointsTypeFilter<$PrismaModel>
    _max?: NestedEnumPointsTypeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumFrequencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Frequency | EnumFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumFrequencyWithAggregatesFilter<$PrismaModel> | $Enums.Frequency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFrequencyFilter<$PrismaModel>
    _max?: NestedEnumFrequencyFilter<$PrismaModel>
  }

  export type PointRuleRelationFilter = {
    is?: PointRuleWhereInput
    isNot?: PointRuleWhereInput
  }

  export type PointRuleTargetCountOrderByAggregateInput = {
    id?: SortOrder
    pointRuleId?: SortOrder
    childId?: SortOrder
  }

  export type PointRuleTargetMaxOrderByAggregateInput = {
    id?: SortOrder
    pointRuleId?: SortOrder
    childId?: SortOrder
  }

  export type PointRuleTargetMinOrderByAggregateInput = {
    id?: SortOrder
    pointRuleId?: SortOrder
    childId?: SortOrder
  }

  export type EnumRecordStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RecordStatus | EnumRecordStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RecordStatus[] | ListEnumRecordStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecordStatus[] | ListEnumRecordStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRecordStatusFilter<$PrismaModel> | $Enums.RecordStatus
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PointRecordCountOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    pointRuleId?: SortOrder
    status?: SortOrder
    points?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    submitNote?: SortOrder
    reviewNote?: SortOrder
    reviewedById?: SortOrder
    reviewedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PointRecordAvgOrderByAggregateInput = {
    points?: SortOrder
  }

  export type PointRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    pointRuleId?: SortOrder
    status?: SortOrder
    points?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    submitNote?: SortOrder
    reviewNote?: SortOrder
    reviewedById?: SortOrder
    reviewedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PointRecordMinOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    pointRuleId?: SortOrder
    status?: SortOrder
    points?: SortOrder
    description?: SortOrder
    imageUrl?: SortOrder
    submitNote?: SortOrder
    reviewNote?: SortOrder
    reviewedById?: SortOrder
    reviewedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PointRecordSumOrderByAggregateInput = {
    points?: SortOrder
  }

  export type EnumRecordStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RecordStatus | EnumRecordStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RecordStatus[] | ListEnumRecordStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecordStatus[] | ListEnumRecordStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRecordStatusWithAggregatesFilter<$PrismaModel> | $Enums.RecordStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRecordStatusFilter<$PrismaModel>
    _max?: NestedEnumRecordStatusFilter<$PrismaModel>
  }

  export type PointTransactionListRelationFilter = {
    every?: PointTransactionWhereInput
    some?: PointTransactionWhereInput
    none?: PointTransactionWhereInput
  }

  export type PointTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PointAccountCountOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    balance?: SortOrder
    totalEarned?: SortOrder
    totalSpent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PointAccountAvgOrderByAggregateInput = {
    balance?: SortOrder
    totalEarned?: SortOrder
    totalSpent?: SortOrder
  }

  export type PointAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    balance?: SortOrder
    totalEarned?: SortOrder
    totalSpent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PointAccountMinOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    balance?: SortOrder
    totalEarned?: SortOrder
    totalSpent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PointAccountSumOrderByAggregateInput = {
    balance?: SortOrder
    totalEarned?: SortOrder
    totalSpent?: SortOrder
  }

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type EnumSourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeFilter<$PrismaModel> | $Enums.SourceType
  }

  export type PointAccountRelationFilter = {
    is?: PointAccountWhereInput
    isNot?: PointAccountWhereInput
  }

  export type PointTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    sourceType?: SortOrder
    sourceId?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type PointTransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
    balanceAfter?: SortOrder
  }

  export type PointTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    sourceType?: SortOrder
    sourceId?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type PointTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    sourceType?: SortOrder
    sourceId?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type PointTransactionSumOrderByAggregateInput = {
    amount?: SortOrder
    balanceAfter?: SortOrder
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type EnumSourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.SourceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSourceTypeFilter<$PrismaModel>
    _max?: NestedEnumSourceTypeFilter<$PrismaModel>
  }

  export type EnumPetStageFilter<$PrismaModel = never> = {
    equals?: $Enums.PetStage | EnumPetStageFieldRefInput<$PrismaModel>
    in?: $Enums.PetStage[] | ListEnumPetStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetStage[] | ListEnumPetStageFieldRefInput<$PrismaModel>
    not?: NestedEnumPetStageFilter<$PrismaModel> | $Enums.PetStage
  }

  export type EnumPetStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PetStatus | EnumPetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PetStatus[] | ListEnumPetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetStatus[] | ListEnumPetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPetStatusFilter<$PrismaModel> | $Enums.PetStatus
  }

  export type PetLogListRelationFilter = {
    every?: PetLogWhereInput
    some?: PetLogWhereInput
    none?: PetLogWhereInput
  }

  export type PetLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PetCountOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    name?: SortOrder
    stage?: SortOrder
    level?: SortOrder
    exp?: SortOrder
    status?: SortOrder
    hunger?: SortOrder
    thirst?: SortOrder
    cleanliness?: SortOrder
    mood?: SortOrder
    health?: SortOrder
    lastDecayAt?: SortOrder
    lastFedAt?: SortOrder
    lastWateredAt?: SortOrder
    lastCleanedAt?: SortOrder
    lastPlayedAt?: SortOrder
    totalCareCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PetAvgOrderByAggregateInput = {
    level?: SortOrder
    exp?: SortOrder
    hunger?: SortOrder
    thirst?: SortOrder
    cleanliness?: SortOrder
    mood?: SortOrder
    health?: SortOrder
    totalCareCount?: SortOrder
  }

  export type PetMaxOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    name?: SortOrder
    stage?: SortOrder
    level?: SortOrder
    exp?: SortOrder
    status?: SortOrder
    hunger?: SortOrder
    thirst?: SortOrder
    cleanliness?: SortOrder
    mood?: SortOrder
    health?: SortOrder
    lastDecayAt?: SortOrder
    lastFedAt?: SortOrder
    lastWateredAt?: SortOrder
    lastCleanedAt?: SortOrder
    lastPlayedAt?: SortOrder
    totalCareCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PetMinOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    name?: SortOrder
    stage?: SortOrder
    level?: SortOrder
    exp?: SortOrder
    status?: SortOrder
    hunger?: SortOrder
    thirst?: SortOrder
    cleanliness?: SortOrder
    mood?: SortOrder
    health?: SortOrder
    lastDecayAt?: SortOrder
    lastFedAt?: SortOrder
    lastWateredAt?: SortOrder
    lastCleanedAt?: SortOrder
    lastPlayedAt?: SortOrder
    totalCareCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PetSumOrderByAggregateInput = {
    level?: SortOrder
    exp?: SortOrder
    hunger?: SortOrder
    thirst?: SortOrder
    cleanliness?: SortOrder
    mood?: SortOrder
    health?: SortOrder
    totalCareCount?: SortOrder
  }

  export type EnumPetStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PetStage | EnumPetStageFieldRefInput<$PrismaModel>
    in?: $Enums.PetStage[] | ListEnumPetStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetStage[] | ListEnumPetStageFieldRefInput<$PrismaModel>
    not?: NestedEnumPetStageWithAggregatesFilter<$PrismaModel> | $Enums.PetStage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPetStageFilter<$PrismaModel>
    _max?: NestedEnumPetStageFilter<$PrismaModel>
  }

  export type EnumPetStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PetStatus | EnumPetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PetStatus[] | ListEnumPetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetStatus[] | ListEnumPetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPetStatusWithAggregatesFilter<$PrismaModel> | $Enums.PetStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPetStatusFilter<$PrismaModel>
    _max?: NestedEnumPetStatusFilter<$PrismaModel>
  }

  export type EnumPetActionFilter<$PrismaModel = never> = {
    equals?: $Enums.PetAction | EnumPetActionFieldRefInput<$PrismaModel>
    in?: $Enums.PetAction[] | ListEnumPetActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetAction[] | ListEnumPetActionFieldRefInput<$PrismaModel>
    not?: NestedEnumPetActionFilter<$PrismaModel> | $Enums.PetAction
  }

  export type PetRelationFilter = {
    is?: PetWhereInput
    isNot?: PetWhereInput
  }

  export type PetLogCountOrderByAggregateInput = {
    id?: SortOrder
    petId?: SortOrder
    action?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    pointsCost?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type PetLogAvgOrderByAggregateInput = {
    oldValue?: SortOrder
    newValue?: SortOrder
    pointsCost?: SortOrder
  }

  export type PetLogMaxOrderByAggregateInput = {
    id?: SortOrder
    petId?: SortOrder
    action?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    pointsCost?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type PetLogMinOrderByAggregateInput = {
    id?: SortOrder
    petId?: SortOrder
    action?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    pointsCost?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type PetLogSumOrderByAggregateInput = {
    oldValue?: SortOrder
    newValue?: SortOrder
    pointsCost?: SortOrder
  }

  export type EnumPetActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PetAction | EnumPetActionFieldRefInput<$PrismaModel>
    in?: $Enums.PetAction[] | ListEnumPetActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetAction[] | ListEnumPetActionFieldRefInput<$PrismaModel>
    not?: NestedEnumPetActionWithAggregatesFilter<$PrismaModel> | $Enums.PetAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPetActionFilter<$PrismaModel>
    _max?: NestedEnumPetActionFilter<$PrismaModel>
  }

  export type EnumFrequencyNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Frequency | EnumFrequencyFieldRefInput<$PrismaModel> | null
    in?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel> | null
    not?: NestedEnumFrequencyNullableFilter<$PrismaModel> | $Enums.Frequency | null
  }

  export type TaskPlanCountOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    points?: SortOrder
    scheduledAt?: SortOrder
    dueAt?: SortOrder
    frequency?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskPlanAvgOrderByAggregateInput = {
    points?: SortOrder
  }

  export type TaskPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    points?: SortOrder
    scheduledAt?: SortOrder
    dueAt?: SortOrder
    frequency?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskPlanMinOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    points?: SortOrder
    scheduledAt?: SortOrder
    dueAt?: SortOrder
    frequency?: SortOrder
    enabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TaskPlanSumOrderByAggregateInput = {
    points?: SortOrder
  }

  export type EnumFrequencyNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Frequency | EnumFrequencyFieldRefInput<$PrismaModel> | null
    in?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel> | null
    not?: NestedEnumFrequencyNullableWithAggregatesFilter<$PrismaModel> | $Enums.Frequency | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumFrequencyNullableFilter<$PrismaModel>
    _max?: NestedEnumFrequencyNullableFilter<$PrismaModel>
  }

  export type TaskPlanNullableRelationFilter = {
    is?: TaskPlanWhereInput | null
    isNot?: TaskPlanWhereInput | null
  }

  export type TaskLogCountOrderByAggregateInput = {
    id?: SortOrder
    taskPlanId?: SortOrder
    childId?: SortOrder
    points?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskLogAvgOrderByAggregateInput = {
    points?: SortOrder
  }

  export type TaskLogMaxOrderByAggregateInput = {
    id?: SortOrder
    taskPlanId?: SortOrder
    childId?: SortOrder
    points?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskLogMinOrderByAggregateInput = {
    id?: SortOrder
    taskPlanId?: SortOrder
    childId?: SortOrder
    points?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskLogSumOrderByAggregateInput = {
    points?: SortOrder
  }

  export type RewardItemCountOrderByAggregateInput = {
    id?: SortOrder
    familyId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    cost?: SortOrder
    stock?: SortOrder
    enabled?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RewardItemAvgOrderByAggregateInput = {
    cost?: SortOrder
    stock?: SortOrder
  }

  export type RewardItemMaxOrderByAggregateInput = {
    id?: SortOrder
    familyId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    cost?: SortOrder
    stock?: SortOrder
    enabled?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RewardItemMinOrderByAggregateInput = {
    id?: SortOrder
    familyId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    cost?: SortOrder
    stock?: SortOrder
    enabled?: SortOrder
    imageUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RewardItemSumOrderByAggregateInput = {
    cost?: SortOrder
    stock?: SortOrder
  }

  export type RewardItemRelationFilter = {
    is?: RewardItemWhereInput
    isNot?: RewardItemWhereInput
  }

  export type RedeemLogCountOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    rewardItemId?: SortOrder
    quantity?: SortOrder
    pointsSpent?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type RedeemLogAvgOrderByAggregateInput = {
    quantity?: SortOrder
    pointsSpent?: SortOrder
  }

  export type RedeemLogMaxOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    rewardItemId?: SortOrder
    quantity?: SortOrder
    pointsSpent?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type RedeemLogMinOrderByAggregateInput = {
    id?: SortOrder
    childId?: SortOrder
    rewardItemId?: SortOrder
    quantity?: SortOrder
    pointsSpent?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type RedeemLogSumOrderByAggregateInput = {
    quantity?: SortOrder
    pointsSpent?: SortOrder
  }

  export type UserCreateNestedManyWithoutFamilyInput = {
    create?: XOR<UserCreateWithoutFamilyInput, UserUncheckedCreateWithoutFamilyInput> | UserCreateWithoutFamilyInput[] | UserUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFamilyInput | UserCreateOrConnectWithoutFamilyInput[]
    createMany?: UserCreateManyFamilyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PointRuleCreateNestedManyWithoutFamilyInput = {
    create?: XOR<PointRuleCreateWithoutFamilyInput, PointRuleUncheckedCreateWithoutFamilyInput> | PointRuleCreateWithoutFamilyInput[] | PointRuleUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: PointRuleCreateOrConnectWithoutFamilyInput | PointRuleCreateOrConnectWithoutFamilyInput[]
    createMany?: PointRuleCreateManyFamilyInputEnvelope
    connect?: PointRuleWhereUniqueInput | PointRuleWhereUniqueInput[]
  }

  export type RewardItemCreateNestedManyWithoutFamilyInput = {
    create?: XOR<RewardItemCreateWithoutFamilyInput, RewardItemUncheckedCreateWithoutFamilyInput> | RewardItemCreateWithoutFamilyInput[] | RewardItemUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: RewardItemCreateOrConnectWithoutFamilyInput | RewardItemCreateOrConnectWithoutFamilyInput[]
    createMany?: RewardItemCreateManyFamilyInputEnvelope
    connect?: RewardItemWhereUniqueInput | RewardItemWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutFamilyInput = {
    create?: XOR<UserCreateWithoutFamilyInput, UserUncheckedCreateWithoutFamilyInput> | UserCreateWithoutFamilyInput[] | UserUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFamilyInput | UserCreateOrConnectWithoutFamilyInput[]
    createMany?: UserCreateManyFamilyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PointRuleUncheckedCreateNestedManyWithoutFamilyInput = {
    create?: XOR<PointRuleCreateWithoutFamilyInput, PointRuleUncheckedCreateWithoutFamilyInput> | PointRuleCreateWithoutFamilyInput[] | PointRuleUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: PointRuleCreateOrConnectWithoutFamilyInput | PointRuleCreateOrConnectWithoutFamilyInput[]
    createMany?: PointRuleCreateManyFamilyInputEnvelope
    connect?: PointRuleWhereUniqueInput | PointRuleWhereUniqueInput[]
  }

  export type RewardItemUncheckedCreateNestedManyWithoutFamilyInput = {
    create?: XOR<RewardItemCreateWithoutFamilyInput, RewardItemUncheckedCreateWithoutFamilyInput> | RewardItemCreateWithoutFamilyInput[] | RewardItemUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: RewardItemCreateOrConnectWithoutFamilyInput | RewardItemCreateOrConnectWithoutFamilyInput[]
    createMany?: RewardItemCreateManyFamilyInputEnvelope
    connect?: RewardItemWhereUniqueInput | RewardItemWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<UserCreateWithoutFamilyInput, UserUncheckedCreateWithoutFamilyInput> | UserCreateWithoutFamilyInput[] | UserUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFamilyInput | UserCreateOrConnectWithoutFamilyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFamilyInput | UserUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: UserCreateManyFamilyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFamilyInput | UserUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFamilyInput | UserUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PointRuleUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<PointRuleCreateWithoutFamilyInput, PointRuleUncheckedCreateWithoutFamilyInput> | PointRuleCreateWithoutFamilyInput[] | PointRuleUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: PointRuleCreateOrConnectWithoutFamilyInput | PointRuleCreateOrConnectWithoutFamilyInput[]
    upsert?: PointRuleUpsertWithWhereUniqueWithoutFamilyInput | PointRuleUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: PointRuleCreateManyFamilyInputEnvelope
    set?: PointRuleWhereUniqueInput | PointRuleWhereUniqueInput[]
    disconnect?: PointRuleWhereUniqueInput | PointRuleWhereUniqueInput[]
    delete?: PointRuleWhereUniqueInput | PointRuleWhereUniqueInput[]
    connect?: PointRuleWhereUniqueInput | PointRuleWhereUniqueInput[]
    update?: PointRuleUpdateWithWhereUniqueWithoutFamilyInput | PointRuleUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: PointRuleUpdateManyWithWhereWithoutFamilyInput | PointRuleUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: PointRuleScalarWhereInput | PointRuleScalarWhereInput[]
  }

  export type RewardItemUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<RewardItemCreateWithoutFamilyInput, RewardItemUncheckedCreateWithoutFamilyInput> | RewardItemCreateWithoutFamilyInput[] | RewardItemUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: RewardItemCreateOrConnectWithoutFamilyInput | RewardItemCreateOrConnectWithoutFamilyInput[]
    upsert?: RewardItemUpsertWithWhereUniqueWithoutFamilyInput | RewardItemUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: RewardItemCreateManyFamilyInputEnvelope
    set?: RewardItemWhereUniqueInput | RewardItemWhereUniqueInput[]
    disconnect?: RewardItemWhereUniqueInput | RewardItemWhereUniqueInput[]
    delete?: RewardItemWhereUniqueInput | RewardItemWhereUniqueInput[]
    connect?: RewardItemWhereUniqueInput | RewardItemWhereUniqueInput[]
    update?: RewardItemUpdateWithWhereUniqueWithoutFamilyInput | RewardItemUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: RewardItemUpdateManyWithWhereWithoutFamilyInput | RewardItemUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: RewardItemScalarWhereInput | RewardItemScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<UserCreateWithoutFamilyInput, UserUncheckedCreateWithoutFamilyInput> | UserCreateWithoutFamilyInput[] | UserUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutFamilyInput | UserCreateOrConnectWithoutFamilyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutFamilyInput | UserUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: UserCreateManyFamilyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutFamilyInput | UserUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutFamilyInput | UserUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PointRuleUncheckedUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<PointRuleCreateWithoutFamilyInput, PointRuleUncheckedCreateWithoutFamilyInput> | PointRuleCreateWithoutFamilyInput[] | PointRuleUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: PointRuleCreateOrConnectWithoutFamilyInput | PointRuleCreateOrConnectWithoutFamilyInput[]
    upsert?: PointRuleUpsertWithWhereUniqueWithoutFamilyInput | PointRuleUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: PointRuleCreateManyFamilyInputEnvelope
    set?: PointRuleWhereUniqueInput | PointRuleWhereUniqueInput[]
    disconnect?: PointRuleWhereUniqueInput | PointRuleWhereUniqueInput[]
    delete?: PointRuleWhereUniqueInput | PointRuleWhereUniqueInput[]
    connect?: PointRuleWhereUniqueInput | PointRuleWhereUniqueInput[]
    update?: PointRuleUpdateWithWhereUniqueWithoutFamilyInput | PointRuleUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: PointRuleUpdateManyWithWhereWithoutFamilyInput | PointRuleUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: PointRuleScalarWhereInput | PointRuleScalarWhereInput[]
  }

  export type RewardItemUncheckedUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<RewardItemCreateWithoutFamilyInput, RewardItemUncheckedCreateWithoutFamilyInput> | RewardItemCreateWithoutFamilyInput[] | RewardItemUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: RewardItemCreateOrConnectWithoutFamilyInput | RewardItemCreateOrConnectWithoutFamilyInput[]
    upsert?: RewardItemUpsertWithWhereUniqueWithoutFamilyInput | RewardItemUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: RewardItemCreateManyFamilyInputEnvelope
    set?: RewardItemWhereUniqueInput | RewardItemWhereUniqueInput[]
    disconnect?: RewardItemWhereUniqueInput | RewardItemWhereUniqueInput[]
    delete?: RewardItemWhereUniqueInput | RewardItemWhereUniqueInput[]
    connect?: RewardItemWhereUniqueInput | RewardItemWhereUniqueInput[]
    update?: RewardItemUpdateWithWhereUniqueWithoutFamilyInput | RewardItemUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: RewardItemUpdateManyWithWhereWithoutFamilyInput | RewardItemUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: RewardItemScalarWhereInput | RewardItemScalarWhereInput[]
  }

  export type FamilyCreateNestedOneWithoutUsersInput = {
    create?: XOR<FamilyCreateWithoutUsersInput, FamilyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutUsersInput
    connect?: FamilyWhereUniqueInput
  }

  export type PointAccountCreateNestedOneWithoutChildInput = {
    create?: XOR<PointAccountCreateWithoutChildInput, PointAccountUncheckedCreateWithoutChildInput>
    connectOrCreate?: PointAccountCreateOrConnectWithoutChildInput
    connect?: PointAccountWhereUniqueInput
  }

  export type PointRecordCreateNestedManyWithoutChildInput = {
    create?: XOR<PointRecordCreateWithoutChildInput, PointRecordUncheckedCreateWithoutChildInput> | PointRecordCreateWithoutChildInput[] | PointRecordUncheckedCreateWithoutChildInput[]
    connectOrCreate?: PointRecordCreateOrConnectWithoutChildInput | PointRecordCreateOrConnectWithoutChildInput[]
    createMany?: PointRecordCreateManyChildInputEnvelope
    connect?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
  }

  export type PetCreateNestedOneWithoutChildInput = {
    create?: XOR<PetCreateWithoutChildInput, PetUncheckedCreateWithoutChildInput>
    connectOrCreate?: PetCreateOrConnectWithoutChildInput
    connect?: PetWhereUniqueInput
  }

  export type TaskPlanCreateNestedManyWithoutChildInput = {
    create?: XOR<TaskPlanCreateWithoutChildInput, TaskPlanUncheckedCreateWithoutChildInput> | TaskPlanCreateWithoutChildInput[] | TaskPlanUncheckedCreateWithoutChildInput[]
    connectOrCreate?: TaskPlanCreateOrConnectWithoutChildInput | TaskPlanCreateOrConnectWithoutChildInput[]
    createMany?: TaskPlanCreateManyChildInputEnvelope
    connect?: TaskPlanWhereUniqueInput | TaskPlanWhereUniqueInput[]
  }

  export type TaskLogCreateNestedManyWithoutChildInput = {
    create?: XOR<TaskLogCreateWithoutChildInput, TaskLogUncheckedCreateWithoutChildInput> | TaskLogCreateWithoutChildInput[] | TaskLogUncheckedCreateWithoutChildInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutChildInput | TaskLogCreateOrConnectWithoutChildInput[]
    createMany?: TaskLogCreateManyChildInputEnvelope
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
  }

  export type RedeemLogCreateNestedManyWithoutChildInput = {
    create?: XOR<RedeemLogCreateWithoutChildInput, RedeemLogUncheckedCreateWithoutChildInput> | RedeemLogCreateWithoutChildInput[] | RedeemLogUncheckedCreateWithoutChildInput[]
    connectOrCreate?: RedeemLogCreateOrConnectWithoutChildInput | RedeemLogCreateOrConnectWithoutChildInput[]
    createMany?: RedeemLogCreateManyChildInputEnvelope
    connect?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
  }

  export type PointAccountUncheckedCreateNestedOneWithoutChildInput = {
    create?: XOR<PointAccountCreateWithoutChildInput, PointAccountUncheckedCreateWithoutChildInput>
    connectOrCreate?: PointAccountCreateOrConnectWithoutChildInput
    connect?: PointAccountWhereUniqueInput
  }

  export type PointRecordUncheckedCreateNestedManyWithoutChildInput = {
    create?: XOR<PointRecordCreateWithoutChildInput, PointRecordUncheckedCreateWithoutChildInput> | PointRecordCreateWithoutChildInput[] | PointRecordUncheckedCreateWithoutChildInput[]
    connectOrCreate?: PointRecordCreateOrConnectWithoutChildInput | PointRecordCreateOrConnectWithoutChildInput[]
    createMany?: PointRecordCreateManyChildInputEnvelope
    connect?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
  }

  export type PetUncheckedCreateNestedOneWithoutChildInput = {
    create?: XOR<PetCreateWithoutChildInput, PetUncheckedCreateWithoutChildInput>
    connectOrCreate?: PetCreateOrConnectWithoutChildInput
    connect?: PetWhereUniqueInput
  }

  export type TaskPlanUncheckedCreateNestedManyWithoutChildInput = {
    create?: XOR<TaskPlanCreateWithoutChildInput, TaskPlanUncheckedCreateWithoutChildInput> | TaskPlanCreateWithoutChildInput[] | TaskPlanUncheckedCreateWithoutChildInput[]
    connectOrCreate?: TaskPlanCreateOrConnectWithoutChildInput | TaskPlanCreateOrConnectWithoutChildInput[]
    createMany?: TaskPlanCreateManyChildInputEnvelope
    connect?: TaskPlanWhereUniqueInput | TaskPlanWhereUniqueInput[]
  }

  export type TaskLogUncheckedCreateNestedManyWithoutChildInput = {
    create?: XOR<TaskLogCreateWithoutChildInput, TaskLogUncheckedCreateWithoutChildInput> | TaskLogCreateWithoutChildInput[] | TaskLogUncheckedCreateWithoutChildInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutChildInput | TaskLogCreateOrConnectWithoutChildInput[]
    createMany?: TaskLogCreateManyChildInputEnvelope
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
  }

  export type RedeemLogUncheckedCreateNestedManyWithoutChildInput = {
    create?: XOR<RedeemLogCreateWithoutChildInput, RedeemLogUncheckedCreateWithoutChildInput> | RedeemLogCreateWithoutChildInput[] | RedeemLogUncheckedCreateWithoutChildInput[]
    connectOrCreate?: RedeemLogCreateOrConnectWithoutChildInput | RedeemLogCreateOrConnectWithoutChildInput[]
    createMany?: RedeemLogCreateManyChildInputEnvelope
    connect?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FamilyUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<FamilyCreateWithoutUsersInput, FamilyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutUsersInput
    upsert?: FamilyUpsertWithoutUsersInput
    connect?: FamilyWhereUniqueInput
    update?: XOR<XOR<FamilyUpdateToOneWithWhereWithoutUsersInput, FamilyUpdateWithoutUsersInput>, FamilyUncheckedUpdateWithoutUsersInput>
  }

  export type PointAccountUpdateOneWithoutChildNestedInput = {
    create?: XOR<PointAccountCreateWithoutChildInput, PointAccountUncheckedCreateWithoutChildInput>
    connectOrCreate?: PointAccountCreateOrConnectWithoutChildInput
    upsert?: PointAccountUpsertWithoutChildInput
    disconnect?: PointAccountWhereInput | boolean
    delete?: PointAccountWhereInput | boolean
    connect?: PointAccountWhereUniqueInput
    update?: XOR<XOR<PointAccountUpdateToOneWithWhereWithoutChildInput, PointAccountUpdateWithoutChildInput>, PointAccountUncheckedUpdateWithoutChildInput>
  }

  export type PointRecordUpdateManyWithoutChildNestedInput = {
    create?: XOR<PointRecordCreateWithoutChildInput, PointRecordUncheckedCreateWithoutChildInput> | PointRecordCreateWithoutChildInput[] | PointRecordUncheckedCreateWithoutChildInput[]
    connectOrCreate?: PointRecordCreateOrConnectWithoutChildInput | PointRecordCreateOrConnectWithoutChildInput[]
    upsert?: PointRecordUpsertWithWhereUniqueWithoutChildInput | PointRecordUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: PointRecordCreateManyChildInputEnvelope
    set?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
    disconnect?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
    delete?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
    connect?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
    update?: PointRecordUpdateWithWhereUniqueWithoutChildInput | PointRecordUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: PointRecordUpdateManyWithWhereWithoutChildInput | PointRecordUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: PointRecordScalarWhereInput | PointRecordScalarWhereInput[]
  }

  export type PetUpdateOneWithoutChildNestedInput = {
    create?: XOR<PetCreateWithoutChildInput, PetUncheckedCreateWithoutChildInput>
    connectOrCreate?: PetCreateOrConnectWithoutChildInput
    upsert?: PetUpsertWithoutChildInput
    disconnect?: PetWhereInput | boolean
    delete?: PetWhereInput | boolean
    connect?: PetWhereUniqueInput
    update?: XOR<XOR<PetUpdateToOneWithWhereWithoutChildInput, PetUpdateWithoutChildInput>, PetUncheckedUpdateWithoutChildInput>
  }

  export type TaskPlanUpdateManyWithoutChildNestedInput = {
    create?: XOR<TaskPlanCreateWithoutChildInput, TaskPlanUncheckedCreateWithoutChildInput> | TaskPlanCreateWithoutChildInput[] | TaskPlanUncheckedCreateWithoutChildInput[]
    connectOrCreate?: TaskPlanCreateOrConnectWithoutChildInput | TaskPlanCreateOrConnectWithoutChildInput[]
    upsert?: TaskPlanUpsertWithWhereUniqueWithoutChildInput | TaskPlanUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: TaskPlanCreateManyChildInputEnvelope
    set?: TaskPlanWhereUniqueInput | TaskPlanWhereUniqueInput[]
    disconnect?: TaskPlanWhereUniqueInput | TaskPlanWhereUniqueInput[]
    delete?: TaskPlanWhereUniqueInput | TaskPlanWhereUniqueInput[]
    connect?: TaskPlanWhereUniqueInput | TaskPlanWhereUniqueInput[]
    update?: TaskPlanUpdateWithWhereUniqueWithoutChildInput | TaskPlanUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: TaskPlanUpdateManyWithWhereWithoutChildInput | TaskPlanUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: TaskPlanScalarWhereInput | TaskPlanScalarWhereInput[]
  }

  export type TaskLogUpdateManyWithoutChildNestedInput = {
    create?: XOR<TaskLogCreateWithoutChildInput, TaskLogUncheckedCreateWithoutChildInput> | TaskLogCreateWithoutChildInput[] | TaskLogUncheckedCreateWithoutChildInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutChildInput | TaskLogCreateOrConnectWithoutChildInput[]
    upsert?: TaskLogUpsertWithWhereUniqueWithoutChildInput | TaskLogUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: TaskLogCreateManyChildInputEnvelope
    set?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    disconnect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    delete?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    update?: TaskLogUpdateWithWhereUniqueWithoutChildInput | TaskLogUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: TaskLogUpdateManyWithWhereWithoutChildInput | TaskLogUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
  }

  export type RedeemLogUpdateManyWithoutChildNestedInput = {
    create?: XOR<RedeemLogCreateWithoutChildInput, RedeemLogUncheckedCreateWithoutChildInput> | RedeemLogCreateWithoutChildInput[] | RedeemLogUncheckedCreateWithoutChildInput[]
    connectOrCreate?: RedeemLogCreateOrConnectWithoutChildInput | RedeemLogCreateOrConnectWithoutChildInput[]
    upsert?: RedeemLogUpsertWithWhereUniqueWithoutChildInput | RedeemLogUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: RedeemLogCreateManyChildInputEnvelope
    set?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
    disconnect?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
    delete?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
    connect?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
    update?: RedeemLogUpdateWithWhereUniqueWithoutChildInput | RedeemLogUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: RedeemLogUpdateManyWithWhereWithoutChildInput | RedeemLogUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: RedeemLogScalarWhereInput | RedeemLogScalarWhereInput[]
  }

  export type PointAccountUncheckedUpdateOneWithoutChildNestedInput = {
    create?: XOR<PointAccountCreateWithoutChildInput, PointAccountUncheckedCreateWithoutChildInput>
    connectOrCreate?: PointAccountCreateOrConnectWithoutChildInput
    upsert?: PointAccountUpsertWithoutChildInput
    disconnect?: PointAccountWhereInput | boolean
    delete?: PointAccountWhereInput | boolean
    connect?: PointAccountWhereUniqueInput
    update?: XOR<XOR<PointAccountUpdateToOneWithWhereWithoutChildInput, PointAccountUpdateWithoutChildInput>, PointAccountUncheckedUpdateWithoutChildInput>
  }

  export type PointRecordUncheckedUpdateManyWithoutChildNestedInput = {
    create?: XOR<PointRecordCreateWithoutChildInput, PointRecordUncheckedCreateWithoutChildInput> | PointRecordCreateWithoutChildInput[] | PointRecordUncheckedCreateWithoutChildInput[]
    connectOrCreate?: PointRecordCreateOrConnectWithoutChildInput | PointRecordCreateOrConnectWithoutChildInput[]
    upsert?: PointRecordUpsertWithWhereUniqueWithoutChildInput | PointRecordUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: PointRecordCreateManyChildInputEnvelope
    set?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
    disconnect?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
    delete?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
    connect?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
    update?: PointRecordUpdateWithWhereUniqueWithoutChildInput | PointRecordUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: PointRecordUpdateManyWithWhereWithoutChildInput | PointRecordUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: PointRecordScalarWhereInput | PointRecordScalarWhereInput[]
  }

  export type PetUncheckedUpdateOneWithoutChildNestedInput = {
    create?: XOR<PetCreateWithoutChildInput, PetUncheckedCreateWithoutChildInput>
    connectOrCreate?: PetCreateOrConnectWithoutChildInput
    upsert?: PetUpsertWithoutChildInput
    disconnect?: PetWhereInput | boolean
    delete?: PetWhereInput | boolean
    connect?: PetWhereUniqueInput
    update?: XOR<XOR<PetUpdateToOneWithWhereWithoutChildInput, PetUpdateWithoutChildInput>, PetUncheckedUpdateWithoutChildInput>
  }

  export type TaskPlanUncheckedUpdateManyWithoutChildNestedInput = {
    create?: XOR<TaskPlanCreateWithoutChildInput, TaskPlanUncheckedCreateWithoutChildInput> | TaskPlanCreateWithoutChildInput[] | TaskPlanUncheckedCreateWithoutChildInput[]
    connectOrCreate?: TaskPlanCreateOrConnectWithoutChildInput | TaskPlanCreateOrConnectWithoutChildInput[]
    upsert?: TaskPlanUpsertWithWhereUniqueWithoutChildInput | TaskPlanUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: TaskPlanCreateManyChildInputEnvelope
    set?: TaskPlanWhereUniqueInput | TaskPlanWhereUniqueInput[]
    disconnect?: TaskPlanWhereUniqueInput | TaskPlanWhereUniqueInput[]
    delete?: TaskPlanWhereUniqueInput | TaskPlanWhereUniqueInput[]
    connect?: TaskPlanWhereUniqueInput | TaskPlanWhereUniqueInput[]
    update?: TaskPlanUpdateWithWhereUniqueWithoutChildInput | TaskPlanUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: TaskPlanUpdateManyWithWhereWithoutChildInput | TaskPlanUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: TaskPlanScalarWhereInput | TaskPlanScalarWhereInput[]
  }

  export type TaskLogUncheckedUpdateManyWithoutChildNestedInput = {
    create?: XOR<TaskLogCreateWithoutChildInput, TaskLogUncheckedCreateWithoutChildInput> | TaskLogCreateWithoutChildInput[] | TaskLogUncheckedCreateWithoutChildInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutChildInput | TaskLogCreateOrConnectWithoutChildInput[]
    upsert?: TaskLogUpsertWithWhereUniqueWithoutChildInput | TaskLogUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: TaskLogCreateManyChildInputEnvelope
    set?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    disconnect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    delete?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    update?: TaskLogUpdateWithWhereUniqueWithoutChildInput | TaskLogUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: TaskLogUpdateManyWithWhereWithoutChildInput | TaskLogUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
  }

  export type RedeemLogUncheckedUpdateManyWithoutChildNestedInput = {
    create?: XOR<RedeemLogCreateWithoutChildInput, RedeemLogUncheckedCreateWithoutChildInput> | RedeemLogCreateWithoutChildInput[] | RedeemLogUncheckedCreateWithoutChildInput[]
    connectOrCreate?: RedeemLogCreateOrConnectWithoutChildInput | RedeemLogCreateOrConnectWithoutChildInput[]
    upsert?: RedeemLogUpsertWithWhereUniqueWithoutChildInput | RedeemLogUpsertWithWhereUniqueWithoutChildInput[]
    createMany?: RedeemLogCreateManyChildInputEnvelope
    set?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
    disconnect?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
    delete?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
    connect?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
    update?: RedeemLogUpdateWithWhereUniqueWithoutChildInput | RedeemLogUpdateWithWhereUniqueWithoutChildInput[]
    updateMany?: RedeemLogUpdateManyWithWhereWithoutChildInput | RedeemLogUpdateManyWithWhereWithoutChildInput[]
    deleteMany?: RedeemLogScalarWhereInput | RedeemLogScalarWhereInput[]
  }

  export type FamilyCreateNestedOneWithoutPointRulesInput = {
    create?: XOR<FamilyCreateWithoutPointRulesInput, FamilyUncheckedCreateWithoutPointRulesInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutPointRulesInput
    connect?: FamilyWhereUniqueInput
  }

  export type PointRuleTargetCreateNestedManyWithoutPointRuleInput = {
    create?: XOR<PointRuleTargetCreateWithoutPointRuleInput, PointRuleTargetUncheckedCreateWithoutPointRuleInput> | PointRuleTargetCreateWithoutPointRuleInput[] | PointRuleTargetUncheckedCreateWithoutPointRuleInput[]
    connectOrCreate?: PointRuleTargetCreateOrConnectWithoutPointRuleInput | PointRuleTargetCreateOrConnectWithoutPointRuleInput[]
    createMany?: PointRuleTargetCreateManyPointRuleInputEnvelope
    connect?: PointRuleTargetWhereUniqueInput | PointRuleTargetWhereUniqueInput[]
  }

  export type PointRecordCreateNestedManyWithoutPointRuleInput = {
    create?: XOR<PointRecordCreateWithoutPointRuleInput, PointRecordUncheckedCreateWithoutPointRuleInput> | PointRecordCreateWithoutPointRuleInput[] | PointRecordUncheckedCreateWithoutPointRuleInput[]
    connectOrCreate?: PointRecordCreateOrConnectWithoutPointRuleInput | PointRecordCreateOrConnectWithoutPointRuleInput[]
    createMany?: PointRecordCreateManyPointRuleInputEnvelope
    connect?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
  }

  export type PointRuleTargetUncheckedCreateNestedManyWithoutPointRuleInput = {
    create?: XOR<PointRuleTargetCreateWithoutPointRuleInput, PointRuleTargetUncheckedCreateWithoutPointRuleInput> | PointRuleTargetCreateWithoutPointRuleInput[] | PointRuleTargetUncheckedCreateWithoutPointRuleInput[]
    connectOrCreate?: PointRuleTargetCreateOrConnectWithoutPointRuleInput | PointRuleTargetCreateOrConnectWithoutPointRuleInput[]
    createMany?: PointRuleTargetCreateManyPointRuleInputEnvelope
    connect?: PointRuleTargetWhereUniqueInput | PointRuleTargetWhereUniqueInput[]
  }

  export type PointRecordUncheckedCreateNestedManyWithoutPointRuleInput = {
    create?: XOR<PointRecordCreateWithoutPointRuleInput, PointRecordUncheckedCreateWithoutPointRuleInput> | PointRecordCreateWithoutPointRuleInput[] | PointRecordUncheckedCreateWithoutPointRuleInput[]
    connectOrCreate?: PointRecordCreateOrConnectWithoutPointRuleInput | PointRecordCreateOrConnectWithoutPointRuleInput[]
    createMany?: PointRecordCreateManyPointRuleInputEnvelope
    connect?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
  }

  export type EnumPointsTypeFieldUpdateOperationsInput = {
    set?: $Enums.PointsType
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumFrequencyFieldUpdateOperationsInput = {
    set?: $Enums.Frequency
  }

  export type FamilyUpdateOneRequiredWithoutPointRulesNestedInput = {
    create?: XOR<FamilyCreateWithoutPointRulesInput, FamilyUncheckedCreateWithoutPointRulesInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutPointRulesInput
    upsert?: FamilyUpsertWithoutPointRulesInput
    connect?: FamilyWhereUniqueInput
    update?: XOR<XOR<FamilyUpdateToOneWithWhereWithoutPointRulesInput, FamilyUpdateWithoutPointRulesInput>, FamilyUncheckedUpdateWithoutPointRulesInput>
  }

  export type PointRuleTargetUpdateManyWithoutPointRuleNestedInput = {
    create?: XOR<PointRuleTargetCreateWithoutPointRuleInput, PointRuleTargetUncheckedCreateWithoutPointRuleInput> | PointRuleTargetCreateWithoutPointRuleInput[] | PointRuleTargetUncheckedCreateWithoutPointRuleInput[]
    connectOrCreate?: PointRuleTargetCreateOrConnectWithoutPointRuleInput | PointRuleTargetCreateOrConnectWithoutPointRuleInput[]
    upsert?: PointRuleTargetUpsertWithWhereUniqueWithoutPointRuleInput | PointRuleTargetUpsertWithWhereUniqueWithoutPointRuleInput[]
    createMany?: PointRuleTargetCreateManyPointRuleInputEnvelope
    set?: PointRuleTargetWhereUniqueInput | PointRuleTargetWhereUniqueInput[]
    disconnect?: PointRuleTargetWhereUniqueInput | PointRuleTargetWhereUniqueInput[]
    delete?: PointRuleTargetWhereUniqueInput | PointRuleTargetWhereUniqueInput[]
    connect?: PointRuleTargetWhereUniqueInput | PointRuleTargetWhereUniqueInput[]
    update?: PointRuleTargetUpdateWithWhereUniqueWithoutPointRuleInput | PointRuleTargetUpdateWithWhereUniqueWithoutPointRuleInput[]
    updateMany?: PointRuleTargetUpdateManyWithWhereWithoutPointRuleInput | PointRuleTargetUpdateManyWithWhereWithoutPointRuleInput[]
    deleteMany?: PointRuleTargetScalarWhereInput | PointRuleTargetScalarWhereInput[]
  }

  export type PointRecordUpdateManyWithoutPointRuleNestedInput = {
    create?: XOR<PointRecordCreateWithoutPointRuleInput, PointRecordUncheckedCreateWithoutPointRuleInput> | PointRecordCreateWithoutPointRuleInput[] | PointRecordUncheckedCreateWithoutPointRuleInput[]
    connectOrCreate?: PointRecordCreateOrConnectWithoutPointRuleInput | PointRecordCreateOrConnectWithoutPointRuleInput[]
    upsert?: PointRecordUpsertWithWhereUniqueWithoutPointRuleInput | PointRecordUpsertWithWhereUniqueWithoutPointRuleInput[]
    createMany?: PointRecordCreateManyPointRuleInputEnvelope
    set?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
    disconnect?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
    delete?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
    connect?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
    update?: PointRecordUpdateWithWhereUniqueWithoutPointRuleInput | PointRecordUpdateWithWhereUniqueWithoutPointRuleInput[]
    updateMany?: PointRecordUpdateManyWithWhereWithoutPointRuleInput | PointRecordUpdateManyWithWhereWithoutPointRuleInput[]
    deleteMany?: PointRecordScalarWhereInput | PointRecordScalarWhereInput[]
  }

  export type PointRuleTargetUncheckedUpdateManyWithoutPointRuleNestedInput = {
    create?: XOR<PointRuleTargetCreateWithoutPointRuleInput, PointRuleTargetUncheckedCreateWithoutPointRuleInput> | PointRuleTargetCreateWithoutPointRuleInput[] | PointRuleTargetUncheckedCreateWithoutPointRuleInput[]
    connectOrCreate?: PointRuleTargetCreateOrConnectWithoutPointRuleInput | PointRuleTargetCreateOrConnectWithoutPointRuleInput[]
    upsert?: PointRuleTargetUpsertWithWhereUniqueWithoutPointRuleInput | PointRuleTargetUpsertWithWhereUniqueWithoutPointRuleInput[]
    createMany?: PointRuleTargetCreateManyPointRuleInputEnvelope
    set?: PointRuleTargetWhereUniqueInput | PointRuleTargetWhereUniqueInput[]
    disconnect?: PointRuleTargetWhereUniqueInput | PointRuleTargetWhereUniqueInput[]
    delete?: PointRuleTargetWhereUniqueInput | PointRuleTargetWhereUniqueInput[]
    connect?: PointRuleTargetWhereUniqueInput | PointRuleTargetWhereUniqueInput[]
    update?: PointRuleTargetUpdateWithWhereUniqueWithoutPointRuleInput | PointRuleTargetUpdateWithWhereUniqueWithoutPointRuleInput[]
    updateMany?: PointRuleTargetUpdateManyWithWhereWithoutPointRuleInput | PointRuleTargetUpdateManyWithWhereWithoutPointRuleInput[]
    deleteMany?: PointRuleTargetScalarWhereInput | PointRuleTargetScalarWhereInput[]
  }

  export type PointRecordUncheckedUpdateManyWithoutPointRuleNestedInput = {
    create?: XOR<PointRecordCreateWithoutPointRuleInput, PointRecordUncheckedCreateWithoutPointRuleInput> | PointRecordCreateWithoutPointRuleInput[] | PointRecordUncheckedCreateWithoutPointRuleInput[]
    connectOrCreate?: PointRecordCreateOrConnectWithoutPointRuleInput | PointRecordCreateOrConnectWithoutPointRuleInput[]
    upsert?: PointRecordUpsertWithWhereUniqueWithoutPointRuleInput | PointRecordUpsertWithWhereUniqueWithoutPointRuleInput[]
    createMany?: PointRecordCreateManyPointRuleInputEnvelope
    set?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
    disconnect?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
    delete?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
    connect?: PointRecordWhereUniqueInput | PointRecordWhereUniqueInput[]
    update?: PointRecordUpdateWithWhereUniqueWithoutPointRuleInput | PointRecordUpdateWithWhereUniqueWithoutPointRuleInput[]
    updateMany?: PointRecordUpdateManyWithWhereWithoutPointRuleInput | PointRecordUpdateManyWithWhereWithoutPointRuleInput[]
    deleteMany?: PointRecordScalarWhereInput | PointRecordScalarWhereInput[]
  }

  export type PointRuleCreateNestedOneWithoutTargetsInput = {
    create?: XOR<PointRuleCreateWithoutTargetsInput, PointRuleUncheckedCreateWithoutTargetsInput>
    connectOrCreate?: PointRuleCreateOrConnectWithoutTargetsInput
    connect?: PointRuleWhereUniqueInput
  }

  export type PointRuleUpdateOneRequiredWithoutTargetsNestedInput = {
    create?: XOR<PointRuleCreateWithoutTargetsInput, PointRuleUncheckedCreateWithoutTargetsInput>
    connectOrCreate?: PointRuleCreateOrConnectWithoutTargetsInput
    upsert?: PointRuleUpsertWithoutTargetsInput
    connect?: PointRuleWhereUniqueInput
    update?: XOR<XOR<PointRuleUpdateToOneWithWhereWithoutTargetsInput, PointRuleUpdateWithoutTargetsInput>, PointRuleUncheckedUpdateWithoutTargetsInput>
  }

  export type UserCreateNestedOneWithoutPointRecordsInput = {
    create?: XOR<UserCreateWithoutPointRecordsInput, UserUncheckedCreateWithoutPointRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPointRecordsInput
    connect?: UserWhereUniqueInput
  }

  export type PointRuleCreateNestedOneWithoutRecordsInput = {
    create?: XOR<PointRuleCreateWithoutRecordsInput, PointRuleUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: PointRuleCreateOrConnectWithoutRecordsInput
    connect?: PointRuleWhereUniqueInput
  }

  export type EnumRecordStatusFieldUpdateOperationsInput = {
    set?: $Enums.RecordStatus
  }

  export type UserUpdateOneRequiredWithoutPointRecordsNestedInput = {
    create?: XOR<UserCreateWithoutPointRecordsInput, UserUncheckedCreateWithoutPointRecordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPointRecordsInput
    upsert?: UserUpsertWithoutPointRecordsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPointRecordsInput, UserUpdateWithoutPointRecordsInput>, UserUncheckedUpdateWithoutPointRecordsInput>
  }

  export type PointRuleUpdateOneRequiredWithoutRecordsNestedInput = {
    create?: XOR<PointRuleCreateWithoutRecordsInput, PointRuleUncheckedCreateWithoutRecordsInput>
    connectOrCreate?: PointRuleCreateOrConnectWithoutRecordsInput
    upsert?: PointRuleUpsertWithoutRecordsInput
    connect?: PointRuleWhereUniqueInput
    update?: XOR<XOR<PointRuleUpdateToOneWithWhereWithoutRecordsInput, PointRuleUpdateWithoutRecordsInput>, PointRuleUncheckedUpdateWithoutRecordsInput>
  }

  export type UserCreateNestedOneWithoutPointAccountInput = {
    create?: XOR<UserCreateWithoutPointAccountInput, UserUncheckedCreateWithoutPointAccountInput>
    connectOrCreate?: UserCreateOrConnectWithoutPointAccountInput
    connect?: UserWhereUniqueInput
  }

  export type PointTransactionCreateNestedManyWithoutAccountInput = {
    create?: XOR<PointTransactionCreateWithoutAccountInput, PointTransactionUncheckedCreateWithoutAccountInput> | PointTransactionCreateWithoutAccountInput[] | PointTransactionUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: PointTransactionCreateOrConnectWithoutAccountInput | PointTransactionCreateOrConnectWithoutAccountInput[]
    createMany?: PointTransactionCreateManyAccountInputEnvelope
    connect?: PointTransactionWhereUniqueInput | PointTransactionWhereUniqueInput[]
  }

  export type PointTransactionUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<PointTransactionCreateWithoutAccountInput, PointTransactionUncheckedCreateWithoutAccountInput> | PointTransactionCreateWithoutAccountInput[] | PointTransactionUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: PointTransactionCreateOrConnectWithoutAccountInput | PointTransactionCreateOrConnectWithoutAccountInput[]
    createMany?: PointTransactionCreateManyAccountInputEnvelope
    connect?: PointTransactionWhereUniqueInput | PointTransactionWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutPointAccountNestedInput = {
    create?: XOR<UserCreateWithoutPointAccountInput, UserUncheckedCreateWithoutPointAccountInput>
    connectOrCreate?: UserCreateOrConnectWithoutPointAccountInput
    upsert?: UserUpsertWithoutPointAccountInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPointAccountInput, UserUpdateWithoutPointAccountInput>, UserUncheckedUpdateWithoutPointAccountInput>
  }

  export type PointTransactionUpdateManyWithoutAccountNestedInput = {
    create?: XOR<PointTransactionCreateWithoutAccountInput, PointTransactionUncheckedCreateWithoutAccountInput> | PointTransactionCreateWithoutAccountInput[] | PointTransactionUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: PointTransactionCreateOrConnectWithoutAccountInput | PointTransactionCreateOrConnectWithoutAccountInput[]
    upsert?: PointTransactionUpsertWithWhereUniqueWithoutAccountInput | PointTransactionUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: PointTransactionCreateManyAccountInputEnvelope
    set?: PointTransactionWhereUniqueInput | PointTransactionWhereUniqueInput[]
    disconnect?: PointTransactionWhereUniqueInput | PointTransactionWhereUniqueInput[]
    delete?: PointTransactionWhereUniqueInput | PointTransactionWhereUniqueInput[]
    connect?: PointTransactionWhereUniqueInput | PointTransactionWhereUniqueInput[]
    update?: PointTransactionUpdateWithWhereUniqueWithoutAccountInput | PointTransactionUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: PointTransactionUpdateManyWithWhereWithoutAccountInput | PointTransactionUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: PointTransactionScalarWhereInput | PointTransactionScalarWhereInput[]
  }

  export type PointTransactionUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<PointTransactionCreateWithoutAccountInput, PointTransactionUncheckedCreateWithoutAccountInput> | PointTransactionCreateWithoutAccountInput[] | PointTransactionUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: PointTransactionCreateOrConnectWithoutAccountInput | PointTransactionCreateOrConnectWithoutAccountInput[]
    upsert?: PointTransactionUpsertWithWhereUniqueWithoutAccountInput | PointTransactionUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: PointTransactionCreateManyAccountInputEnvelope
    set?: PointTransactionWhereUniqueInput | PointTransactionWhereUniqueInput[]
    disconnect?: PointTransactionWhereUniqueInput | PointTransactionWhereUniqueInput[]
    delete?: PointTransactionWhereUniqueInput | PointTransactionWhereUniqueInput[]
    connect?: PointTransactionWhereUniqueInput | PointTransactionWhereUniqueInput[]
    update?: PointTransactionUpdateWithWhereUniqueWithoutAccountInput | PointTransactionUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: PointTransactionUpdateManyWithWhereWithoutAccountInput | PointTransactionUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: PointTransactionScalarWhereInput | PointTransactionScalarWhereInput[]
  }

  export type PointAccountCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<PointAccountCreateWithoutTransactionsInput, PointAccountUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: PointAccountCreateOrConnectWithoutTransactionsInput
    connect?: PointAccountWhereUniqueInput
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type EnumSourceTypeFieldUpdateOperationsInput = {
    set?: $Enums.SourceType
  }

  export type PointAccountUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<PointAccountCreateWithoutTransactionsInput, PointAccountUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: PointAccountCreateOrConnectWithoutTransactionsInput
    upsert?: PointAccountUpsertWithoutTransactionsInput
    connect?: PointAccountWhereUniqueInput
    update?: XOR<XOR<PointAccountUpdateToOneWithWhereWithoutTransactionsInput, PointAccountUpdateWithoutTransactionsInput>, PointAccountUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserCreateNestedOneWithoutPetInput = {
    create?: XOR<UserCreateWithoutPetInput, UserUncheckedCreateWithoutPetInput>
    connectOrCreate?: UserCreateOrConnectWithoutPetInput
    connect?: UserWhereUniqueInput
  }

  export type PetLogCreateNestedManyWithoutPetInput = {
    create?: XOR<PetLogCreateWithoutPetInput, PetLogUncheckedCreateWithoutPetInput> | PetLogCreateWithoutPetInput[] | PetLogUncheckedCreateWithoutPetInput[]
    connectOrCreate?: PetLogCreateOrConnectWithoutPetInput | PetLogCreateOrConnectWithoutPetInput[]
    createMany?: PetLogCreateManyPetInputEnvelope
    connect?: PetLogWhereUniqueInput | PetLogWhereUniqueInput[]
  }

  export type PetLogUncheckedCreateNestedManyWithoutPetInput = {
    create?: XOR<PetLogCreateWithoutPetInput, PetLogUncheckedCreateWithoutPetInput> | PetLogCreateWithoutPetInput[] | PetLogUncheckedCreateWithoutPetInput[]
    connectOrCreate?: PetLogCreateOrConnectWithoutPetInput | PetLogCreateOrConnectWithoutPetInput[]
    createMany?: PetLogCreateManyPetInputEnvelope
    connect?: PetLogWhereUniqueInput | PetLogWhereUniqueInput[]
  }

  export type EnumPetStageFieldUpdateOperationsInput = {
    set?: $Enums.PetStage
  }

  export type EnumPetStatusFieldUpdateOperationsInput = {
    set?: $Enums.PetStatus
  }

  export type UserUpdateOneRequiredWithoutPetNestedInput = {
    create?: XOR<UserCreateWithoutPetInput, UserUncheckedCreateWithoutPetInput>
    connectOrCreate?: UserCreateOrConnectWithoutPetInput
    upsert?: UserUpsertWithoutPetInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPetInput, UserUpdateWithoutPetInput>, UserUncheckedUpdateWithoutPetInput>
  }

  export type PetLogUpdateManyWithoutPetNestedInput = {
    create?: XOR<PetLogCreateWithoutPetInput, PetLogUncheckedCreateWithoutPetInput> | PetLogCreateWithoutPetInput[] | PetLogUncheckedCreateWithoutPetInput[]
    connectOrCreate?: PetLogCreateOrConnectWithoutPetInput | PetLogCreateOrConnectWithoutPetInput[]
    upsert?: PetLogUpsertWithWhereUniqueWithoutPetInput | PetLogUpsertWithWhereUniqueWithoutPetInput[]
    createMany?: PetLogCreateManyPetInputEnvelope
    set?: PetLogWhereUniqueInput | PetLogWhereUniqueInput[]
    disconnect?: PetLogWhereUniqueInput | PetLogWhereUniqueInput[]
    delete?: PetLogWhereUniqueInput | PetLogWhereUniqueInput[]
    connect?: PetLogWhereUniqueInput | PetLogWhereUniqueInput[]
    update?: PetLogUpdateWithWhereUniqueWithoutPetInput | PetLogUpdateWithWhereUniqueWithoutPetInput[]
    updateMany?: PetLogUpdateManyWithWhereWithoutPetInput | PetLogUpdateManyWithWhereWithoutPetInput[]
    deleteMany?: PetLogScalarWhereInput | PetLogScalarWhereInput[]
  }

  export type PetLogUncheckedUpdateManyWithoutPetNestedInput = {
    create?: XOR<PetLogCreateWithoutPetInput, PetLogUncheckedCreateWithoutPetInput> | PetLogCreateWithoutPetInput[] | PetLogUncheckedCreateWithoutPetInput[]
    connectOrCreate?: PetLogCreateOrConnectWithoutPetInput | PetLogCreateOrConnectWithoutPetInput[]
    upsert?: PetLogUpsertWithWhereUniqueWithoutPetInput | PetLogUpsertWithWhereUniqueWithoutPetInput[]
    createMany?: PetLogCreateManyPetInputEnvelope
    set?: PetLogWhereUniqueInput | PetLogWhereUniqueInput[]
    disconnect?: PetLogWhereUniqueInput | PetLogWhereUniqueInput[]
    delete?: PetLogWhereUniqueInput | PetLogWhereUniqueInput[]
    connect?: PetLogWhereUniqueInput | PetLogWhereUniqueInput[]
    update?: PetLogUpdateWithWhereUniqueWithoutPetInput | PetLogUpdateWithWhereUniqueWithoutPetInput[]
    updateMany?: PetLogUpdateManyWithWhereWithoutPetInput | PetLogUpdateManyWithWhereWithoutPetInput[]
    deleteMany?: PetLogScalarWhereInput | PetLogScalarWhereInput[]
  }

  export type PetCreateNestedOneWithoutLogsInput = {
    create?: XOR<PetCreateWithoutLogsInput, PetUncheckedCreateWithoutLogsInput>
    connectOrCreate?: PetCreateOrConnectWithoutLogsInput
    connect?: PetWhereUniqueInput
  }

  export type EnumPetActionFieldUpdateOperationsInput = {
    set?: $Enums.PetAction
  }

  export type PetUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<PetCreateWithoutLogsInput, PetUncheckedCreateWithoutLogsInput>
    connectOrCreate?: PetCreateOrConnectWithoutLogsInput
    upsert?: PetUpsertWithoutLogsInput
    connect?: PetWhereUniqueInput
    update?: XOR<XOR<PetUpdateToOneWithWhereWithoutLogsInput, PetUpdateWithoutLogsInput>, PetUncheckedUpdateWithoutLogsInput>
  }

  export type UserCreateNestedOneWithoutTaskPlansInput = {
    create?: XOR<UserCreateWithoutTaskPlansInput, UserUncheckedCreateWithoutTaskPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutTaskPlansInput
    connect?: UserWhereUniqueInput
  }

  export type TaskLogCreateNestedManyWithoutTaskPlanInput = {
    create?: XOR<TaskLogCreateWithoutTaskPlanInput, TaskLogUncheckedCreateWithoutTaskPlanInput> | TaskLogCreateWithoutTaskPlanInput[] | TaskLogUncheckedCreateWithoutTaskPlanInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutTaskPlanInput | TaskLogCreateOrConnectWithoutTaskPlanInput[]
    createMany?: TaskLogCreateManyTaskPlanInputEnvelope
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
  }

  export type TaskLogUncheckedCreateNestedManyWithoutTaskPlanInput = {
    create?: XOR<TaskLogCreateWithoutTaskPlanInput, TaskLogUncheckedCreateWithoutTaskPlanInput> | TaskLogCreateWithoutTaskPlanInput[] | TaskLogUncheckedCreateWithoutTaskPlanInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutTaskPlanInput | TaskLogCreateOrConnectWithoutTaskPlanInput[]
    createMany?: TaskLogCreateManyTaskPlanInputEnvelope
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
  }

  export type NullableEnumFrequencyFieldUpdateOperationsInput = {
    set?: $Enums.Frequency | null
  }

  export type UserUpdateOneRequiredWithoutTaskPlansNestedInput = {
    create?: XOR<UserCreateWithoutTaskPlansInput, UserUncheckedCreateWithoutTaskPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutTaskPlansInput
    upsert?: UserUpsertWithoutTaskPlansInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTaskPlansInput, UserUpdateWithoutTaskPlansInput>, UserUncheckedUpdateWithoutTaskPlansInput>
  }

  export type TaskLogUpdateManyWithoutTaskPlanNestedInput = {
    create?: XOR<TaskLogCreateWithoutTaskPlanInput, TaskLogUncheckedCreateWithoutTaskPlanInput> | TaskLogCreateWithoutTaskPlanInput[] | TaskLogUncheckedCreateWithoutTaskPlanInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutTaskPlanInput | TaskLogCreateOrConnectWithoutTaskPlanInput[]
    upsert?: TaskLogUpsertWithWhereUniqueWithoutTaskPlanInput | TaskLogUpsertWithWhereUniqueWithoutTaskPlanInput[]
    createMany?: TaskLogCreateManyTaskPlanInputEnvelope
    set?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    disconnect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    delete?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    update?: TaskLogUpdateWithWhereUniqueWithoutTaskPlanInput | TaskLogUpdateWithWhereUniqueWithoutTaskPlanInput[]
    updateMany?: TaskLogUpdateManyWithWhereWithoutTaskPlanInput | TaskLogUpdateManyWithWhereWithoutTaskPlanInput[]
    deleteMany?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
  }

  export type TaskLogUncheckedUpdateManyWithoutTaskPlanNestedInput = {
    create?: XOR<TaskLogCreateWithoutTaskPlanInput, TaskLogUncheckedCreateWithoutTaskPlanInput> | TaskLogCreateWithoutTaskPlanInput[] | TaskLogUncheckedCreateWithoutTaskPlanInput[]
    connectOrCreate?: TaskLogCreateOrConnectWithoutTaskPlanInput | TaskLogCreateOrConnectWithoutTaskPlanInput[]
    upsert?: TaskLogUpsertWithWhereUniqueWithoutTaskPlanInput | TaskLogUpsertWithWhereUniqueWithoutTaskPlanInput[]
    createMany?: TaskLogCreateManyTaskPlanInputEnvelope
    set?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    disconnect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    delete?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    connect?: TaskLogWhereUniqueInput | TaskLogWhereUniqueInput[]
    update?: TaskLogUpdateWithWhereUniqueWithoutTaskPlanInput | TaskLogUpdateWithWhereUniqueWithoutTaskPlanInput[]
    updateMany?: TaskLogUpdateManyWithWhereWithoutTaskPlanInput | TaskLogUpdateManyWithWhereWithoutTaskPlanInput[]
    deleteMany?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
  }

  export type TaskPlanCreateNestedOneWithoutLogsInput = {
    create?: XOR<TaskPlanCreateWithoutLogsInput, TaskPlanUncheckedCreateWithoutLogsInput>
    connectOrCreate?: TaskPlanCreateOrConnectWithoutLogsInput
    connect?: TaskPlanWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTaskLogsInput = {
    create?: XOR<UserCreateWithoutTaskLogsInput, UserUncheckedCreateWithoutTaskLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTaskLogsInput
    connect?: UserWhereUniqueInput
  }

  export type TaskPlanUpdateOneWithoutLogsNestedInput = {
    create?: XOR<TaskPlanCreateWithoutLogsInput, TaskPlanUncheckedCreateWithoutLogsInput>
    connectOrCreate?: TaskPlanCreateOrConnectWithoutLogsInput
    upsert?: TaskPlanUpsertWithoutLogsInput
    disconnect?: TaskPlanWhereInput | boolean
    delete?: TaskPlanWhereInput | boolean
    connect?: TaskPlanWhereUniqueInput
    update?: XOR<XOR<TaskPlanUpdateToOneWithWhereWithoutLogsInput, TaskPlanUpdateWithoutLogsInput>, TaskPlanUncheckedUpdateWithoutLogsInput>
  }

  export type UserUpdateOneRequiredWithoutTaskLogsNestedInput = {
    create?: XOR<UserCreateWithoutTaskLogsInput, UserUncheckedCreateWithoutTaskLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTaskLogsInput
    upsert?: UserUpsertWithoutTaskLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTaskLogsInput, UserUpdateWithoutTaskLogsInput>, UserUncheckedUpdateWithoutTaskLogsInput>
  }

  export type FamilyCreateNestedOneWithoutRewardItemsInput = {
    create?: XOR<FamilyCreateWithoutRewardItemsInput, FamilyUncheckedCreateWithoutRewardItemsInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutRewardItemsInput
    connect?: FamilyWhereUniqueInput
  }

  export type RedeemLogCreateNestedManyWithoutRewardItemInput = {
    create?: XOR<RedeemLogCreateWithoutRewardItemInput, RedeemLogUncheckedCreateWithoutRewardItemInput> | RedeemLogCreateWithoutRewardItemInput[] | RedeemLogUncheckedCreateWithoutRewardItemInput[]
    connectOrCreate?: RedeemLogCreateOrConnectWithoutRewardItemInput | RedeemLogCreateOrConnectWithoutRewardItemInput[]
    createMany?: RedeemLogCreateManyRewardItemInputEnvelope
    connect?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
  }

  export type RedeemLogUncheckedCreateNestedManyWithoutRewardItemInput = {
    create?: XOR<RedeemLogCreateWithoutRewardItemInput, RedeemLogUncheckedCreateWithoutRewardItemInput> | RedeemLogCreateWithoutRewardItemInput[] | RedeemLogUncheckedCreateWithoutRewardItemInput[]
    connectOrCreate?: RedeemLogCreateOrConnectWithoutRewardItemInput | RedeemLogCreateOrConnectWithoutRewardItemInput[]
    createMany?: RedeemLogCreateManyRewardItemInputEnvelope
    connect?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
  }

  export type FamilyUpdateOneRequiredWithoutRewardItemsNestedInput = {
    create?: XOR<FamilyCreateWithoutRewardItemsInput, FamilyUncheckedCreateWithoutRewardItemsInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutRewardItemsInput
    upsert?: FamilyUpsertWithoutRewardItemsInput
    connect?: FamilyWhereUniqueInput
    update?: XOR<XOR<FamilyUpdateToOneWithWhereWithoutRewardItemsInput, FamilyUpdateWithoutRewardItemsInput>, FamilyUncheckedUpdateWithoutRewardItemsInput>
  }

  export type RedeemLogUpdateManyWithoutRewardItemNestedInput = {
    create?: XOR<RedeemLogCreateWithoutRewardItemInput, RedeemLogUncheckedCreateWithoutRewardItemInput> | RedeemLogCreateWithoutRewardItemInput[] | RedeemLogUncheckedCreateWithoutRewardItemInput[]
    connectOrCreate?: RedeemLogCreateOrConnectWithoutRewardItemInput | RedeemLogCreateOrConnectWithoutRewardItemInput[]
    upsert?: RedeemLogUpsertWithWhereUniqueWithoutRewardItemInput | RedeemLogUpsertWithWhereUniqueWithoutRewardItemInput[]
    createMany?: RedeemLogCreateManyRewardItemInputEnvelope
    set?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
    disconnect?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
    delete?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
    connect?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
    update?: RedeemLogUpdateWithWhereUniqueWithoutRewardItemInput | RedeemLogUpdateWithWhereUniqueWithoutRewardItemInput[]
    updateMany?: RedeemLogUpdateManyWithWhereWithoutRewardItemInput | RedeemLogUpdateManyWithWhereWithoutRewardItemInput[]
    deleteMany?: RedeemLogScalarWhereInput | RedeemLogScalarWhereInput[]
  }

  export type RedeemLogUncheckedUpdateManyWithoutRewardItemNestedInput = {
    create?: XOR<RedeemLogCreateWithoutRewardItemInput, RedeemLogUncheckedCreateWithoutRewardItemInput> | RedeemLogCreateWithoutRewardItemInput[] | RedeemLogUncheckedCreateWithoutRewardItemInput[]
    connectOrCreate?: RedeemLogCreateOrConnectWithoutRewardItemInput | RedeemLogCreateOrConnectWithoutRewardItemInput[]
    upsert?: RedeemLogUpsertWithWhereUniqueWithoutRewardItemInput | RedeemLogUpsertWithWhereUniqueWithoutRewardItemInput[]
    createMany?: RedeemLogCreateManyRewardItemInputEnvelope
    set?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
    disconnect?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
    delete?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
    connect?: RedeemLogWhereUniqueInput | RedeemLogWhereUniqueInput[]
    update?: RedeemLogUpdateWithWhereUniqueWithoutRewardItemInput | RedeemLogUpdateWithWhereUniqueWithoutRewardItemInput[]
    updateMany?: RedeemLogUpdateManyWithWhereWithoutRewardItemInput | RedeemLogUpdateManyWithWhereWithoutRewardItemInput[]
    deleteMany?: RedeemLogScalarWhereInput | RedeemLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRedeemLogsInput = {
    create?: XOR<UserCreateWithoutRedeemLogsInput, UserUncheckedCreateWithoutRedeemLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRedeemLogsInput
    connect?: UserWhereUniqueInput
  }

  export type RewardItemCreateNestedOneWithoutRedeemsInput = {
    create?: XOR<RewardItemCreateWithoutRedeemsInput, RewardItemUncheckedCreateWithoutRedeemsInput>
    connectOrCreate?: RewardItemCreateOrConnectWithoutRedeemsInput
    connect?: RewardItemWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRedeemLogsNestedInput = {
    create?: XOR<UserCreateWithoutRedeemLogsInput, UserUncheckedCreateWithoutRedeemLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRedeemLogsInput
    upsert?: UserUpsertWithoutRedeemLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRedeemLogsInput, UserUpdateWithoutRedeemLogsInput>, UserUncheckedUpdateWithoutRedeemLogsInput>
  }

  export type RewardItemUpdateOneRequiredWithoutRedeemsNestedInput = {
    create?: XOR<RewardItemCreateWithoutRedeemsInput, RewardItemUncheckedCreateWithoutRedeemsInput>
    connectOrCreate?: RewardItemCreateOrConnectWithoutRedeemsInput
    upsert?: RewardItemUpsertWithoutRedeemsInput
    connect?: RewardItemWhereUniqueInput
    update?: XOR<XOR<RewardItemUpdateToOneWithWhereWithoutRedeemsInput, RewardItemUpdateWithoutRedeemsInput>, RewardItemUncheckedUpdateWithoutRedeemsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumPointsTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PointsType | EnumPointsTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PointsType[] | ListEnumPointsTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PointsType[] | ListEnumPointsTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPointsTypeFilter<$PrismaModel> | $Enums.PointsType
  }

  export type NestedEnumFrequencyFilter<$PrismaModel = never> = {
    equals?: $Enums.Frequency | EnumFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumFrequencyFilter<$PrismaModel> | $Enums.Frequency
  }

  export type NestedEnumPointsTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PointsType | EnumPointsTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PointsType[] | ListEnumPointsTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PointsType[] | ListEnumPointsTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPointsTypeWithAggregatesFilter<$PrismaModel> | $Enums.PointsType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPointsTypeFilter<$PrismaModel>
    _max?: NestedEnumPointsTypeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumFrequencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Frequency | EnumFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumFrequencyWithAggregatesFilter<$PrismaModel> | $Enums.Frequency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFrequencyFilter<$PrismaModel>
    _max?: NestedEnumFrequencyFilter<$PrismaModel>
  }

  export type NestedEnumRecordStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RecordStatus | EnumRecordStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RecordStatus[] | ListEnumRecordStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecordStatus[] | ListEnumRecordStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRecordStatusFilter<$PrismaModel> | $Enums.RecordStatus
  }

  export type NestedEnumRecordStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RecordStatus | EnumRecordStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RecordStatus[] | ListEnumRecordStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecordStatus[] | ListEnumRecordStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRecordStatusWithAggregatesFilter<$PrismaModel> | $Enums.RecordStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRecordStatusFilter<$PrismaModel>
    _max?: NestedEnumRecordStatusFilter<$PrismaModel>
  }

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedEnumSourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeFilter<$PrismaModel> | $Enums.SourceType
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.SourceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSourceTypeFilter<$PrismaModel>
    _max?: NestedEnumSourceTypeFilter<$PrismaModel>
  }

  export type NestedEnumPetStageFilter<$PrismaModel = never> = {
    equals?: $Enums.PetStage | EnumPetStageFieldRefInput<$PrismaModel>
    in?: $Enums.PetStage[] | ListEnumPetStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetStage[] | ListEnumPetStageFieldRefInput<$PrismaModel>
    not?: NestedEnumPetStageFilter<$PrismaModel> | $Enums.PetStage
  }

  export type NestedEnumPetStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PetStatus | EnumPetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PetStatus[] | ListEnumPetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetStatus[] | ListEnumPetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPetStatusFilter<$PrismaModel> | $Enums.PetStatus
  }

  export type NestedEnumPetStageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PetStage | EnumPetStageFieldRefInput<$PrismaModel>
    in?: $Enums.PetStage[] | ListEnumPetStageFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetStage[] | ListEnumPetStageFieldRefInput<$PrismaModel>
    not?: NestedEnumPetStageWithAggregatesFilter<$PrismaModel> | $Enums.PetStage
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPetStageFilter<$PrismaModel>
    _max?: NestedEnumPetStageFilter<$PrismaModel>
  }

  export type NestedEnumPetStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PetStatus | EnumPetStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PetStatus[] | ListEnumPetStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetStatus[] | ListEnumPetStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPetStatusWithAggregatesFilter<$PrismaModel> | $Enums.PetStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPetStatusFilter<$PrismaModel>
    _max?: NestedEnumPetStatusFilter<$PrismaModel>
  }

  export type NestedEnumPetActionFilter<$PrismaModel = never> = {
    equals?: $Enums.PetAction | EnumPetActionFieldRefInput<$PrismaModel>
    in?: $Enums.PetAction[] | ListEnumPetActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetAction[] | ListEnumPetActionFieldRefInput<$PrismaModel>
    not?: NestedEnumPetActionFilter<$PrismaModel> | $Enums.PetAction
  }

  export type NestedEnumPetActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PetAction | EnumPetActionFieldRefInput<$PrismaModel>
    in?: $Enums.PetAction[] | ListEnumPetActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.PetAction[] | ListEnumPetActionFieldRefInput<$PrismaModel>
    not?: NestedEnumPetActionWithAggregatesFilter<$PrismaModel> | $Enums.PetAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPetActionFilter<$PrismaModel>
    _max?: NestedEnumPetActionFilter<$PrismaModel>
  }

  export type NestedEnumFrequencyNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Frequency | EnumFrequencyFieldRefInput<$PrismaModel> | null
    in?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel> | null
    not?: NestedEnumFrequencyNullableFilter<$PrismaModel> | $Enums.Frequency | null
  }

  export type NestedEnumFrequencyNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Frequency | EnumFrequencyFieldRefInput<$PrismaModel> | null
    in?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Frequency[] | ListEnumFrequencyFieldRefInput<$PrismaModel> | null
    not?: NestedEnumFrequencyNullableWithAggregatesFilter<$PrismaModel> | $Enums.Frequency | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumFrequencyNullableFilter<$PrismaModel>
    _max?: NestedEnumFrequencyNullableFilter<$PrismaModel>
  }

  export type UserCreateWithoutFamilyInput = {
    id?: string
    name: string
    role: $Enums.Role
    pin?: string | null
    password?: string | null
    avatarUrl?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalEarnedPoints?: number
    level?: number
    streak?: number
    lastCheckIn?: Date | string | null
    pointAccount?: PointAccountCreateNestedOneWithoutChildInput
    pointRecords?: PointRecordCreateNestedManyWithoutChildInput
    pet?: PetCreateNestedOneWithoutChildInput
    taskPlans?: TaskPlanCreateNestedManyWithoutChildInput
    taskLogs?: TaskLogCreateNestedManyWithoutChildInput
    redeemLogs?: RedeemLogCreateNestedManyWithoutChildInput
  }

  export type UserUncheckedCreateWithoutFamilyInput = {
    id?: string
    name: string
    role: $Enums.Role
    pin?: string | null
    password?: string | null
    avatarUrl?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalEarnedPoints?: number
    level?: number
    streak?: number
    lastCheckIn?: Date | string | null
    pointAccount?: PointAccountUncheckedCreateNestedOneWithoutChildInput
    pointRecords?: PointRecordUncheckedCreateNestedManyWithoutChildInput
    pet?: PetUncheckedCreateNestedOneWithoutChildInput
    taskPlans?: TaskPlanUncheckedCreateNestedManyWithoutChildInput
    taskLogs?: TaskLogUncheckedCreateNestedManyWithoutChildInput
    redeemLogs?: RedeemLogUncheckedCreateNestedManyWithoutChildInput
  }

  export type UserCreateOrConnectWithoutFamilyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFamilyInput, UserUncheckedCreateWithoutFamilyInput>
  }

  export type UserCreateManyFamilyInputEnvelope = {
    data: UserCreateManyFamilyInput | UserCreateManyFamilyInput[]
    skipDuplicates?: boolean
  }

  export type PointRuleCreateWithoutFamilyInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    pointsType: $Enums.PointsType
    points: number
    pointsMin?: number | null
    pointsMax?: number | null
    needApproval?: boolean
    frequency: $Enums.Frequency
    maxTimes?: number | null
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    targets?: PointRuleTargetCreateNestedManyWithoutPointRuleInput
    records?: PointRecordCreateNestedManyWithoutPointRuleInput
  }

  export type PointRuleUncheckedCreateWithoutFamilyInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    pointsType: $Enums.PointsType
    points: number
    pointsMin?: number | null
    pointsMax?: number | null
    needApproval?: boolean
    frequency: $Enums.Frequency
    maxTimes?: number | null
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    targets?: PointRuleTargetUncheckedCreateNestedManyWithoutPointRuleInput
    records?: PointRecordUncheckedCreateNestedManyWithoutPointRuleInput
  }

  export type PointRuleCreateOrConnectWithoutFamilyInput = {
    where: PointRuleWhereUniqueInput
    create: XOR<PointRuleCreateWithoutFamilyInput, PointRuleUncheckedCreateWithoutFamilyInput>
  }

  export type PointRuleCreateManyFamilyInputEnvelope = {
    data: PointRuleCreateManyFamilyInput | PointRuleCreateManyFamilyInput[]
    skipDuplicates?: boolean
  }

  export type RewardItemCreateWithoutFamilyInput = {
    id?: string
    name: string
    description?: string | null
    cost: number
    stock?: number | null
    enabled?: boolean
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    redeems?: RedeemLogCreateNestedManyWithoutRewardItemInput
  }

  export type RewardItemUncheckedCreateWithoutFamilyInput = {
    id?: string
    name: string
    description?: string | null
    cost: number
    stock?: number | null
    enabled?: boolean
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    redeems?: RedeemLogUncheckedCreateNestedManyWithoutRewardItemInput
  }

  export type RewardItemCreateOrConnectWithoutFamilyInput = {
    where: RewardItemWhereUniqueInput
    create: XOR<RewardItemCreateWithoutFamilyInput, RewardItemUncheckedCreateWithoutFamilyInput>
  }

  export type RewardItemCreateManyFamilyInputEnvelope = {
    data: RewardItemCreateManyFamilyInput | RewardItemCreateManyFamilyInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutFamilyInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutFamilyInput, UserUncheckedUpdateWithoutFamilyInput>
    create: XOR<UserCreateWithoutFamilyInput, UserUncheckedCreateWithoutFamilyInput>
  }

  export type UserUpdateWithWhereUniqueWithoutFamilyInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutFamilyInput, UserUncheckedUpdateWithoutFamilyInput>
  }

  export type UserUpdateManyWithWhereWithoutFamilyInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutFamilyInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    pin?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    familyId?: StringFilter<"User"> | string
    avatarUrl?: StringNullableFilter<"User"> | string | null
    isDeleted?: BoolFilter<"User"> | boolean
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    totalEarnedPoints?: IntFilter<"User"> | number
    level?: IntFilter<"User"> | number
    streak?: IntFilter<"User"> | number
    lastCheckIn?: DateTimeNullableFilter<"User"> | Date | string | null
  }

  export type PointRuleUpsertWithWhereUniqueWithoutFamilyInput = {
    where: PointRuleWhereUniqueInput
    update: XOR<PointRuleUpdateWithoutFamilyInput, PointRuleUncheckedUpdateWithoutFamilyInput>
    create: XOR<PointRuleCreateWithoutFamilyInput, PointRuleUncheckedCreateWithoutFamilyInput>
  }

  export type PointRuleUpdateWithWhereUniqueWithoutFamilyInput = {
    where: PointRuleWhereUniqueInput
    data: XOR<PointRuleUpdateWithoutFamilyInput, PointRuleUncheckedUpdateWithoutFamilyInput>
  }

  export type PointRuleUpdateManyWithWhereWithoutFamilyInput = {
    where: PointRuleScalarWhereInput
    data: XOR<PointRuleUpdateManyMutationInput, PointRuleUncheckedUpdateManyWithoutFamilyInput>
  }

  export type PointRuleScalarWhereInput = {
    AND?: PointRuleScalarWhereInput | PointRuleScalarWhereInput[]
    OR?: PointRuleScalarWhereInput[]
    NOT?: PointRuleScalarWhereInput | PointRuleScalarWhereInput[]
    id?: StringFilter<"PointRule"> | string
    name?: StringFilter<"PointRule"> | string
    description?: StringNullableFilter<"PointRule"> | string | null
    category?: StringFilter<"PointRule"> | string
    pointsType?: EnumPointsTypeFilter<"PointRule"> | $Enums.PointsType
    points?: IntFilter<"PointRule"> | number
    pointsMin?: IntNullableFilter<"PointRule"> | number | null
    pointsMax?: IntNullableFilter<"PointRule"> | number | null
    needApproval?: BoolFilter<"PointRule"> | boolean
    frequency?: EnumFrequencyFilter<"PointRule"> | $Enums.Frequency
    maxTimes?: IntNullableFilter<"PointRule"> | number | null
    enabled?: BoolFilter<"PointRule"> | boolean
    familyId?: StringFilter<"PointRule"> | string
    createdAt?: DateTimeFilter<"PointRule"> | Date | string
    updatedAt?: DateTimeFilter<"PointRule"> | Date | string
  }

  export type RewardItemUpsertWithWhereUniqueWithoutFamilyInput = {
    where: RewardItemWhereUniqueInput
    update: XOR<RewardItemUpdateWithoutFamilyInput, RewardItemUncheckedUpdateWithoutFamilyInput>
    create: XOR<RewardItemCreateWithoutFamilyInput, RewardItemUncheckedCreateWithoutFamilyInput>
  }

  export type RewardItemUpdateWithWhereUniqueWithoutFamilyInput = {
    where: RewardItemWhereUniqueInput
    data: XOR<RewardItemUpdateWithoutFamilyInput, RewardItemUncheckedUpdateWithoutFamilyInput>
  }

  export type RewardItemUpdateManyWithWhereWithoutFamilyInput = {
    where: RewardItemScalarWhereInput
    data: XOR<RewardItemUpdateManyMutationInput, RewardItemUncheckedUpdateManyWithoutFamilyInput>
  }

  export type RewardItemScalarWhereInput = {
    AND?: RewardItemScalarWhereInput | RewardItemScalarWhereInput[]
    OR?: RewardItemScalarWhereInput[]
    NOT?: RewardItemScalarWhereInput | RewardItemScalarWhereInput[]
    id?: StringFilter<"RewardItem"> | string
    familyId?: StringFilter<"RewardItem"> | string
    name?: StringFilter<"RewardItem"> | string
    description?: StringNullableFilter<"RewardItem"> | string | null
    cost?: IntFilter<"RewardItem"> | number
    stock?: IntNullableFilter<"RewardItem"> | number | null
    enabled?: BoolFilter<"RewardItem"> | boolean
    imageUrl?: StringNullableFilter<"RewardItem"> | string | null
    createdAt?: DateTimeFilter<"RewardItem"> | Date | string
    updatedAt?: DateTimeFilter<"RewardItem"> | Date | string
  }

  export type FamilyCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pointRules?: PointRuleCreateNestedManyWithoutFamilyInput
    rewardItems?: RewardItemCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pointRules?: PointRuleUncheckedCreateNestedManyWithoutFamilyInput
    rewardItems?: RewardItemUncheckedCreateNestedManyWithoutFamilyInput
  }

  export type FamilyCreateOrConnectWithoutUsersInput = {
    where: FamilyWhereUniqueInput
    create: XOR<FamilyCreateWithoutUsersInput, FamilyUncheckedCreateWithoutUsersInput>
  }

  export type PointAccountCreateWithoutChildInput = {
    id?: string
    balance?: number
    totalEarned?: number
    totalSpent?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: PointTransactionCreateNestedManyWithoutAccountInput
  }

  export type PointAccountUncheckedCreateWithoutChildInput = {
    id?: string
    balance?: number
    totalEarned?: number
    totalSpent?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: PointTransactionUncheckedCreateNestedManyWithoutAccountInput
  }

  export type PointAccountCreateOrConnectWithoutChildInput = {
    where: PointAccountWhereUniqueInput
    create: XOR<PointAccountCreateWithoutChildInput, PointAccountUncheckedCreateWithoutChildInput>
  }

  export type PointRecordCreateWithoutChildInput = {
    id?: string
    status?: $Enums.RecordStatus
    points: number
    description?: string | null
    imageUrl?: string | null
    submitNote?: string | null
    reviewNote?: string | null
    reviewedById?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    pointRule: PointRuleCreateNestedOneWithoutRecordsInput
  }

  export type PointRecordUncheckedCreateWithoutChildInput = {
    id?: string
    pointRuleId: string
    status?: $Enums.RecordStatus
    points: number
    description?: string | null
    imageUrl?: string | null
    submitNote?: string | null
    reviewNote?: string | null
    reviewedById?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PointRecordCreateOrConnectWithoutChildInput = {
    where: PointRecordWhereUniqueInput
    create: XOR<PointRecordCreateWithoutChildInput, PointRecordUncheckedCreateWithoutChildInput>
  }

  export type PointRecordCreateManyChildInputEnvelope = {
    data: PointRecordCreateManyChildInput | PointRecordCreateManyChildInput[]
    skipDuplicates?: boolean
  }

  export type PetCreateWithoutChildInput = {
    id?: string
    name?: string
    stage?: $Enums.PetStage
    level?: number
    exp?: number
    status?: $Enums.PetStatus
    hunger?: number
    thirst?: number
    cleanliness?: number
    mood?: number
    health?: number
    lastDecayAt?: Date | string
    lastFedAt?: Date | string | null
    lastWateredAt?: Date | string | null
    lastCleanedAt?: Date | string | null
    lastPlayedAt?: Date | string | null
    totalCareCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: PetLogCreateNestedManyWithoutPetInput
  }

  export type PetUncheckedCreateWithoutChildInput = {
    id?: string
    name?: string
    stage?: $Enums.PetStage
    level?: number
    exp?: number
    status?: $Enums.PetStatus
    hunger?: number
    thirst?: number
    cleanliness?: number
    mood?: number
    health?: number
    lastDecayAt?: Date | string
    lastFedAt?: Date | string | null
    lastWateredAt?: Date | string | null
    lastCleanedAt?: Date | string | null
    lastPlayedAt?: Date | string | null
    totalCareCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: PetLogUncheckedCreateNestedManyWithoutPetInput
  }

  export type PetCreateOrConnectWithoutChildInput = {
    where: PetWhereUniqueInput
    create: XOR<PetCreateWithoutChildInput, PetUncheckedCreateWithoutChildInput>
  }

  export type TaskPlanCreateWithoutChildInput = {
    id?: string
    title: string
    description?: string | null
    points?: number
    scheduledAt?: Date | string | null
    dueAt?: Date | string | null
    frequency?: $Enums.Frequency | null
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: TaskLogCreateNestedManyWithoutTaskPlanInput
  }

  export type TaskPlanUncheckedCreateWithoutChildInput = {
    id?: string
    title: string
    description?: string | null
    points?: number
    scheduledAt?: Date | string | null
    dueAt?: Date | string | null
    frequency?: $Enums.Frequency | null
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: TaskLogUncheckedCreateNestedManyWithoutTaskPlanInput
  }

  export type TaskPlanCreateOrConnectWithoutChildInput = {
    where: TaskPlanWhereUniqueInput
    create: XOR<TaskPlanCreateWithoutChildInput, TaskPlanUncheckedCreateWithoutChildInput>
  }

  export type TaskPlanCreateManyChildInputEnvelope = {
    data: TaskPlanCreateManyChildInput | TaskPlanCreateManyChildInput[]
    skipDuplicates?: boolean
  }

  export type TaskLogCreateWithoutChildInput = {
    id?: string
    points?: number
    note?: string | null
    createdAt?: Date | string
    taskPlan?: TaskPlanCreateNestedOneWithoutLogsInput
  }

  export type TaskLogUncheckedCreateWithoutChildInput = {
    id?: string
    taskPlanId?: string | null
    points?: number
    note?: string | null
    createdAt?: Date | string
  }

  export type TaskLogCreateOrConnectWithoutChildInput = {
    where: TaskLogWhereUniqueInput
    create: XOR<TaskLogCreateWithoutChildInput, TaskLogUncheckedCreateWithoutChildInput>
  }

  export type TaskLogCreateManyChildInputEnvelope = {
    data: TaskLogCreateManyChildInput | TaskLogCreateManyChildInput[]
    skipDuplicates?: boolean
  }

  export type RedeemLogCreateWithoutChildInput = {
    id?: string
    quantity?: number
    pointsSpent: number
    note?: string | null
    createdAt?: Date | string
    rewardItem: RewardItemCreateNestedOneWithoutRedeemsInput
  }

  export type RedeemLogUncheckedCreateWithoutChildInput = {
    id?: string
    rewardItemId: string
    quantity?: number
    pointsSpent: number
    note?: string | null
    createdAt?: Date | string
  }

  export type RedeemLogCreateOrConnectWithoutChildInput = {
    where: RedeemLogWhereUniqueInput
    create: XOR<RedeemLogCreateWithoutChildInput, RedeemLogUncheckedCreateWithoutChildInput>
  }

  export type RedeemLogCreateManyChildInputEnvelope = {
    data: RedeemLogCreateManyChildInput | RedeemLogCreateManyChildInput[]
    skipDuplicates?: boolean
  }

  export type FamilyUpsertWithoutUsersInput = {
    update: XOR<FamilyUpdateWithoutUsersInput, FamilyUncheckedUpdateWithoutUsersInput>
    create: XOR<FamilyCreateWithoutUsersInput, FamilyUncheckedCreateWithoutUsersInput>
    where?: FamilyWhereInput
  }

  export type FamilyUpdateToOneWithWhereWithoutUsersInput = {
    where?: FamilyWhereInput
    data: XOR<FamilyUpdateWithoutUsersInput, FamilyUncheckedUpdateWithoutUsersInput>
  }

  export type FamilyUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pointRules?: PointRuleUpdateManyWithoutFamilyNestedInput
    rewardItems?: RewardItemUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pointRules?: PointRuleUncheckedUpdateManyWithoutFamilyNestedInput
    rewardItems?: RewardItemUncheckedUpdateManyWithoutFamilyNestedInput
  }

  export type PointAccountUpsertWithoutChildInput = {
    update: XOR<PointAccountUpdateWithoutChildInput, PointAccountUncheckedUpdateWithoutChildInput>
    create: XOR<PointAccountCreateWithoutChildInput, PointAccountUncheckedCreateWithoutChildInput>
    where?: PointAccountWhereInput
  }

  export type PointAccountUpdateToOneWithWhereWithoutChildInput = {
    where?: PointAccountWhereInput
    data: XOR<PointAccountUpdateWithoutChildInput, PointAccountUncheckedUpdateWithoutChildInput>
  }

  export type PointAccountUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    totalEarned?: IntFieldUpdateOperationsInput | number
    totalSpent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: PointTransactionUpdateManyWithoutAccountNestedInput
  }

  export type PointAccountUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    totalEarned?: IntFieldUpdateOperationsInput | number
    totalSpent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: PointTransactionUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type PointRecordUpsertWithWhereUniqueWithoutChildInput = {
    where: PointRecordWhereUniqueInput
    update: XOR<PointRecordUpdateWithoutChildInput, PointRecordUncheckedUpdateWithoutChildInput>
    create: XOR<PointRecordCreateWithoutChildInput, PointRecordUncheckedCreateWithoutChildInput>
  }

  export type PointRecordUpdateWithWhereUniqueWithoutChildInput = {
    where: PointRecordWhereUniqueInput
    data: XOR<PointRecordUpdateWithoutChildInput, PointRecordUncheckedUpdateWithoutChildInput>
  }

  export type PointRecordUpdateManyWithWhereWithoutChildInput = {
    where: PointRecordScalarWhereInput
    data: XOR<PointRecordUpdateManyMutationInput, PointRecordUncheckedUpdateManyWithoutChildInput>
  }

  export type PointRecordScalarWhereInput = {
    AND?: PointRecordScalarWhereInput | PointRecordScalarWhereInput[]
    OR?: PointRecordScalarWhereInput[]
    NOT?: PointRecordScalarWhereInput | PointRecordScalarWhereInput[]
    id?: StringFilter<"PointRecord"> | string
    childId?: StringFilter<"PointRecord"> | string
    pointRuleId?: StringFilter<"PointRecord"> | string
    status?: EnumRecordStatusFilter<"PointRecord"> | $Enums.RecordStatus
    points?: IntFilter<"PointRecord"> | number
    description?: StringNullableFilter<"PointRecord"> | string | null
    imageUrl?: StringNullableFilter<"PointRecord"> | string | null
    submitNote?: StringNullableFilter<"PointRecord"> | string | null
    reviewNote?: StringNullableFilter<"PointRecord"> | string | null
    reviewedById?: StringNullableFilter<"PointRecord"> | string | null
    reviewedAt?: DateTimeNullableFilter<"PointRecord"> | Date | string | null
    createdAt?: DateTimeFilter<"PointRecord"> | Date | string
    updatedAt?: DateTimeFilter<"PointRecord"> | Date | string
  }

  export type PetUpsertWithoutChildInput = {
    update: XOR<PetUpdateWithoutChildInput, PetUncheckedUpdateWithoutChildInput>
    create: XOR<PetCreateWithoutChildInput, PetUncheckedCreateWithoutChildInput>
    where?: PetWhereInput
  }

  export type PetUpdateToOneWithWhereWithoutChildInput = {
    where?: PetWhereInput
    data: XOR<PetUpdateWithoutChildInput, PetUncheckedUpdateWithoutChildInput>
  }

  export type PetUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stage?: EnumPetStageFieldUpdateOperationsInput | $Enums.PetStage
    level?: IntFieldUpdateOperationsInput | number
    exp?: IntFieldUpdateOperationsInput | number
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    hunger?: IntFieldUpdateOperationsInput | number
    thirst?: IntFieldUpdateOperationsInput | number
    cleanliness?: IntFieldUpdateOperationsInput | number
    mood?: IntFieldUpdateOperationsInput | number
    health?: IntFieldUpdateOperationsInput | number
    lastDecayAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastFedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastCleanedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalCareCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: PetLogUpdateManyWithoutPetNestedInput
  }

  export type PetUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stage?: EnumPetStageFieldUpdateOperationsInput | $Enums.PetStage
    level?: IntFieldUpdateOperationsInput | number
    exp?: IntFieldUpdateOperationsInput | number
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    hunger?: IntFieldUpdateOperationsInput | number
    thirst?: IntFieldUpdateOperationsInput | number
    cleanliness?: IntFieldUpdateOperationsInput | number
    mood?: IntFieldUpdateOperationsInput | number
    health?: IntFieldUpdateOperationsInput | number
    lastDecayAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastFedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastCleanedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalCareCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: PetLogUncheckedUpdateManyWithoutPetNestedInput
  }

  export type TaskPlanUpsertWithWhereUniqueWithoutChildInput = {
    where: TaskPlanWhereUniqueInput
    update: XOR<TaskPlanUpdateWithoutChildInput, TaskPlanUncheckedUpdateWithoutChildInput>
    create: XOR<TaskPlanCreateWithoutChildInput, TaskPlanUncheckedCreateWithoutChildInput>
  }

  export type TaskPlanUpdateWithWhereUniqueWithoutChildInput = {
    where: TaskPlanWhereUniqueInput
    data: XOR<TaskPlanUpdateWithoutChildInput, TaskPlanUncheckedUpdateWithoutChildInput>
  }

  export type TaskPlanUpdateManyWithWhereWithoutChildInput = {
    where: TaskPlanScalarWhereInput
    data: XOR<TaskPlanUpdateManyMutationInput, TaskPlanUncheckedUpdateManyWithoutChildInput>
  }

  export type TaskPlanScalarWhereInput = {
    AND?: TaskPlanScalarWhereInput | TaskPlanScalarWhereInput[]
    OR?: TaskPlanScalarWhereInput[]
    NOT?: TaskPlanScalarWhereInput | TaskPlanScalarWhereInput[]
    id?: StringFilter<"TaskPlan"> | string
    childId?: StringFilter<"TaskPlan"> | string
    title?: StringFilter<"TaskPlan"> | string
    description?: StringNullableFilter<"TaskPlan"> | string | null
    points?: IntFilter<"TaskPlan"> | number
    scheduledAt?: DateTimeNullableFilter<"TaskPlan"> | Date | string | null
    dueAt?: DateTimeNullableFilter<"TaskPlan"> | Date | string | null
    frequency?: EnumFrequencyNullableFilter<"TaskPlan"> | $Enums.Frequency | null
    enabled?: BoolFilter<"TaskPlan"> | boolean
    createdAt?: DateTimeFilter<"TaskPlan"> | Date | string
    updatedAt?: DateTimeFilter<"TaskPlan"> | Date | string
  }

  export type TaskLogUpsertWithWhereUniqueWithoutChildInput = {
    where: TaskLogWhereUniqueInput
    update: XOR<TaskLogUpdateWithoutChildInput, TaskLogUncheckedUpdateWithoutChildInput>
    create: XOR<TaskLogCreateWithoutChildInput, TaskLogUncheckedCreateWithoutChildInput>
  }

  export type TaskLogUpdateWithWhereUniqueWithoutChildInput = {
    where: TaskLogWhereUniqueInput
    data: XOR<TaskLogUpdateWithoutChildInput, TaskLogUncheckedUpdateWithoutChildInput>
  }

  export type TaskLogUpdateManyWithWhereWithoutChildInput = {
    where: TaskLogScalarWhereInput
    data: XOR<TaskLogUpdateManyMutationInput, TaskLogUncheckedUpdateManyWithoutChildInput>
  }

  export type TaskLogScalarWhereInput = {
    AND?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
    OR?: TaskLogScalarWhereInput[]
    NOT?: TaskLogScalarWhereInput | TaskLogScalarWhereInput[]
    id?: StringFilter<"TaskLog"> | string
    taskPlanId?: StringNullableFilter<"TaskLog"> | string | null
    childId?: StringFilter<"TaskLog"> | string
    points?: IntFilter<"TaskLog"> | number
    note?: StringNullableFilter<"TaskLog"> | string | null
    createdAt?: DateTimeFilter<"TaskLog"> | Date | string
  }

  export type RedeemLogUpsertWithWhereUniqueWithoutChildInput = {
    where: RedeemLogWhereUniqueInput
    update: XOR<RedeemLogUpdateWithoutChildInput, RedeemLogUncheckedUpdateWithoutChildInput>
    create: XOR<RedeemLogCreateWithoutChildInput, RedeemLogUncheckedCreateWithoutChildInput>
  }

  export type RedeemLogUpdateWithWhereUniqueWithoutChildInput = {
    where: RedeemLogWhereUniqueInput
    data: XOR<RedeemLogUpdateWithoutChildInput, RedeemLogUncheckedUpdateWithoutChildInput>
  }

  export type RedeemLogUpdateManyWithWhereWithoutChildInput = {
    where: RedeemLogScalarWhereInput
    data: XOR<RedeemLogUpdateManyMutationInput, RedeemLogUncheckedUpdateManyWithoutChildInput>
  }

  export type RedeemLogScalarWhereInput = {
    AND?: RedeemLogScalarWhereInput | RedeemLogScalarWhereInput[]
    OR?: RedeemLogScalarWhereInput[]
    NOT?: RedeemLogScalarWhereInput | RedeemLogScalarWhereInput[]
    id?: StringFilter<"RedeemLog"> | string
    childId?: StringFilter<"RedeemLog"> | string
    rewardItemId?: StringFilter<"RedeemLog"> | string
    quantity?: IntFilter<"RedeemLog"> | number
    pointsSpent?: IntFilter<"RedeemLog"> | number
    note?: StringNullableFilter<"RedeemLog"> | string | null
    createdAt?: DateTimeFilter<"RedeemLog"> | Date | string
  }

  export type FamilyCreateWithoutPointRulesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutFamilyInput
    rewardItems?: RewardItemCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUncheckedCreateWithoutPointRulesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutFamilyInput
    rewardItems?: RewardItemUncheckedCreateNestedManyWithoutFamilyInput
  }

  export type FamilyCreateOrConnectWithoutPointRulesInput = {
    where: FamilyWhereUniqueInput
    create: XOR<FamilyCreateWithoutPointRulesInput, FamilyUncheckedCreateWithoutPointRulesInput>
  }

  export type PointRuleTargetCreateWithoutPointRuleInput = {
    id?: string
    childId: string
  }

  export type PointRuleTargetUncheckedCreateWithoutPointRuleInput = {
    id?: string
    childId: string
  }

  export type PointRuleTargetCreateOrConnectWithoutPointRuleInput = {
    where: PointRuleTargetWhereUniqueInput
    create: XOR<PointRuleTargetCreateWithoutPointRuleInput, PointRuleTargetUncheckedCreateWithoutPointRuleInput>
  }

  export type PointRuleTargetCreateManyPointRuleInputEnvelope = {
    data: PointRuleTargetCreateManyPointRuleInput | PointRuleTargetCreateManyPointRuleInput[]
    skipDuplicates?: boolean
  }

  export type PointRecordCreateWithoutPointRuleInput = {
    id?: string
    status?: $Enums.RecordStatus
    points: number
    description?: string | null
    imageUrl?: string | null
    submitNote?: string | null
    reviewNote?: string | null
    reviewedById?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    child: UserCreateNestedOneWithoutPointRecordsInput
  }

  export type PointRecordUncheckedCreateWithoutPointRuleInput = {
    id?: string
    childId: string
    status?: $Enums.RecordStatus
    points: number
    description?: string | null
    imageUrl?: string | null
    submitNote?: string | null
    reviewNote?: string | null
    reviewedById?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PointRecordCreateOrConnectWithoutPointRuleInput = {
    where: PointRecordWhereUniqueInput
    create: XOR<PointRecordCreateWithoutPointRuleInput, PointRecordUncheckedCreateWithoutPointRuleInput>
  }

  export type PointRecordCreateManyPointRuleInputEnvelope = {
    data: PointRecordCreateManyPointRuleInput | PointRecordCreateManyPointRuleInput[]
    skipDuplicates?: boolean
  }

  export type FamilyUpsertWithoutPointRulesInput = {
    update: XOR<FamilyUpdateWithoutPointRulesInput, FamilyUncheckedUpdateWithoutPointRulesInput>
    create: XOR<FamilyCreateWithoutPointRulesInput, FamilyUncheckedCreateWithoutPointRulesInput>
    where?: FamilyWhereInput
  }

  export type FamilyUpdateToOneWithWhereWithoutPointRulesInput = {
    where?: FamilyWhereInput
    data: XOR<FamilyUpdateWithoutPointRulesInput, FamilyUncheckedUpdateWithoutPointRulesInput>
  }

  export type FamilyUpdateWithoutPointRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutFamilyNestedInput
    rewardItems?: RewardItemUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyUncheckedUpdateWithoutPointRulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutFamilyNestedInput
    rewardItems?: RewardItemUncheckedUpdateManyWithoutFamilyNestedInput
  }

  export type PointRuleTargetUpsertWithWhereUniqueWithoutPointRuleInput = {
    where: PointRuleTargetWhereUniqueInput
    update: XOR<PointRuleTargetUpdateWithoutPointRuleInput, PointRuleTargetUncheckedUpdateWithoutPointRuleInput>
    create: XOR<PointRuleTargetCreateWithoutPointRuleInput, PointRuleTargetUncheckedCreateWithoutPointRuleInput>
  }

  export type PointRuleTargetUpdateWithWhereUniqueWithoutPointRuleInput = {
    where: PointRuleTargetWhereUniqueInput
    data: XOR<PointRuleTargetUpdateWithoutPointRuleInput, PointRuleTargetUncheckedUpdateWithoutPointRuleInput>
  }

  export type PointRuleTargetUpdateManyWithWhereWithoutPointRuleInput = {
    where: PointRuleTargetScalarWhereInput
    data: XOR<PointRuleTargetUpdateManyMutationInput, PointRuleTargetUncheckedUpdateManyWithoutPointRuleInput>
  }

  export type PointRuleTargetScalarWhereInput = {
    AND?: PointRuleTargetScalarWhereInput | PointRuleTargetScalarWhereInput[]
    OR?: PointRuleTargetScalarWhereInput[]
    NOT?: PointRuleTargetScalarWhereInput | PointRuleTargetScalarWhereInput[]
    id?: StringFilter<"PointRuleTarget"> | string
    pointRuleId?: StringFilter<"PointRuleTarget"> | string
    childId?: StringFilter<"PointRuleTarget"> | string
  }

  export type PointRecordUpsertWithWhereUniqueWithoutPointRuleInput = {
    where: PointRecordWhereUniqueInput
    update: XOR<PointRecordUpdateWithoutPointRuleInput, PointRecordUncheckedUpdateWithoutPointRuleInput>
    create: XOR<PointRecordCreateWithoutPointRuleInput, PointRecordUncheckedCreateWithoutPointRuleInput>
  }

  export type PointRecordUpdateWithWhereUniqueWithoutPointRuleInput = {
    where: PointRecordWhereUniqueInput
    data: XOR<PointRecordUpdateWithoutPointRuleInput, PointRecordUncheckedUpdateWithoutPointRuleInput>
  }

  export type PointRecordUpdateManyWithWhereWithoutPointRuleInput = {
    where: PointRecordScalarWhereInput
    data: XOR<PointRecordUpdateManyMutationInput, PointRecordUncheckedUpdateManyWithoutPointRuleInput>
  }

  export type PointRuleCreateWithoutTargetsInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    pointsType: $Enums.PointsType
    points: number
    pointsMin?: number | null
    pointsMax?: number | null
    needApproval?: boolean
    frequency: $Enums.Frequency
    maxTimes?: number | null
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    family: FamilyCreateNestedOneWithoutPointRulesInput
    records?: PointRecordCreateNestedManyWithoutPointRuleInput
  }

  export type PointRuleUncheckedCreateWithoutTargetsInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    pointsType: $Enums.PointsType
    points: number
    pointsMin?: number | null
    pointsMax?: number | null
    needApproval?: boolean
    frequency: $Enums.Frequency
    maxTimes?: number | null
    enabled?: boolean
    familyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    records?: PointRecordUncheckedCreateNestedManyWithoutPointRuleInput
  }

  export type PointRuleCreateOrConnectWithoutTargetsInput = {
    where: PointRuleWhereUniqueInput
    create: XOR<PointRuleCreateWithoutTargetsInput, PointRuleUncheckedCreateWithoutTargetsInput>
  }

  export type PointRuleUpsertWithoutTargetsInput = {
    update: XOR<PointRuleUpdateWithoutTargetsInput, PointRuleUncheckedUpdateWithoutTargetsInput>
    create: XOR<PointRuleCreateWithoutTargetsInput, PointRuleUncheckedCreateWithoutTargetsInput>
    where?: PointRuleWhereInput
  }

  export type PointRuleUpdateToOneWithWhereWithoutTargetsInput = {
    where?: PointRuleWhereInput
    data: XOR<PointRuleUpdateWithoutTargetsInput, PointRuleUncheckedUpdateWithoutTargetsInput>
  }

  export type PointRuleUpdateWithoutTargetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    pointsType?: EnumPointsTypeFieldUpdateOperationsInput | $Enums.PointsType
    points?: IntFieldUpdateOperationsInput | number
    pointsMin?: NullableIntFieldUpdateOperationsInput | number | null
    pointsMax?: NullableIntFieldUpdateOperationsInput | number | null
    needApproval?: BoolFieldUpdateOperationsInput | boolean
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    maxTimes?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    family?: FamilyUpdateOneRequiredWithoutPointRulesNestedInput
    records?: PointRecordUpdateManyWithoutPointRuleNestedInput
  }

  export type PointRuleUncheckedUpdateWithoutTargetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    pointsType?: EnumPointsTypeFieldUpdateOperationsInput | $Enums.PointsType
    points?: IntFieldUpdateOperationsInput | number
    pointsMin?: NullableIntFieldUpdateOperationsInput | number | null
    pointsMax?: NullableIntFieldUpdateOperationsInput | number | null
    needApproval?: BoolFieldUpdateOperationsInput | boolean
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    maxTimes?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    familyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    records?: PointRecordUncheckedUpdateManyWithoutPointRuleNestedInput
  }

  export type UserCreateWithoutPointRecordsInput = {
    id?: string
    name: string
    role: $Enums.Role
    pin?: string | null
    password?: string | null
    avatarUrl?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalEarnedPoints?: number
    level?: number
    streak?: number
    lastCheckIn?: Date | string | null
    family: FamilyCreateNestedOneWithoutUsersInput
    pointAccount?: PointAccountCreateNestedOneWithoutChildInput
    pet?: PetCreateNestedOneWithoutChildInput
    taskPlans?: TaskPlanCreateNestedManyWithoutChildInput
    taskLogs?: TaskLogCreateNestedManyWithoutChildInput
    redeemLogs?: RedeemLogCreateNestedManyWithoutChildInput
  }

  export type UserUncheckedCreateWithoutPointRecordsInput = {
    id?: string
    name: string
    role: $Enums.Role
    pin?: string | null
    password?: string | null
    familyId: string
    avatarUrl?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalEarnedPoints?: number
    level?: number
    streak?: number
    lastCheckIn?: Date | string | null
    pointAccount?: PointAccountUncheckedCreateNestedOneWithoutChildInput
    pet?: PetUncheckedCreateNestedOneWithoutChildInput
    taskPlans?: TaskPlanUncheckedCreateNestedManyWithoutChildInput
    taskLogs?: TaskLogUncheckedCreateNestedManyWithoutChildInput
    redeemLogs?: RedeemLogUncheckedCreateNestedManyWithoutChildInput
  }

  export type UserCreateOrConnectWithoutPointRecordsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPointRecordsInput, UserUncheckedCreateWithoutPointRecordsInput>
  }

  export type PointRuleCreateWithoutRecordsInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    pointsType: $Enums.PointsType
    points: number
    pointsMin?: number | null
    pointsMax?: number | null
    needApproval?: boolean
    frequency: $Enums.Frequency
    maxTimes?: number | null
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    family: FamilyCreateNestedOneWithoutPointRulesInput
    targets?: PointRuleTargetCreateNestedManyWithoutPointRuleInput
  }

  export type PointRuleUncheckedCreateWithoutRecordsInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    pointsType: $Enums.PointsType
    points: number
    pointsMin?: number | null
    pointsMax?: number | null
    needApproval?: boolean
    frequency: $Enums.Frequency
    maxTimes?: number | null
    enabled?: boolean
    familyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    targets?: PointRuleTargetUncheckedCreateNestedManyWithoutPointRuleInput
  }

  export type PointRuleCreateOrConnectWithoutRecordsInput = {
    where: PointRuleWhereUniqueInput
    create: XOR<PointRuleCreateWithoutRecordsInput, PointRuleUncheckedCreateWithoutRecordsInput>
  }

  export type UserUpsertWithoutPointRecordsInput = {
    update: XOR<UserUpdateWithoutPointRecordsInput, UserUncheckedUpdateWithoutPointRecordsInput>
    create: XOR<UserCreateWithoutPointRecordsInput, UserUncheckedCreateWithoutPointRecordsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPointRecordsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPointRecordsInput, UserUncheckedUpdateWithoutPointRecordsInput>
  }

  export type UserUpdateWithoutPointRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalEarnedPoints?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastCheckIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    family?: FamilyUpdateOneRequiredWithoutUsersNestedInput
    pointAccount?: PointAccountUpdateOneWithoutChildNestedInput
    pet?: PetUpdateOneWithoutChildNestedInput
    taskPlans?: TaskPlanUpdateManyWithoutChildNestedInput
    taskLogs?: TaskLogUpdateManyWithoutChildNestedInput
    redeemLogs?: RedeemLogUpdateManyWithoutChildNestedInput
  }

  export type UserUncheckedUpdateWithoutPointRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalEarnedPoints?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastCheckIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pointAccount?: PointAccountUncheckedUpdateOneWithoutChildNestedInput
    pet?: PetUncheckedUpdateOneWithoutChildNestedInput
    taskPlans?: TaskPlanUncheckedUpdateManyWithoutChildNestedInput
    taskLogs?: TaskLogUncheckedUpdateManyWithoutChildNestedInput
    redeemLogs?: RedeemLogUncheckedUpdateManyWithoutChildNestedInput
  }

  export type PointRuleUpsertWithoutRecordsInput = {
    update: XOR<PointRuleUpdateWithoutRecordsInput, PointRuleUncheckedUpdateWithoutRecordsInput>
    create: XOR<PointRuleCreateWithoutRecordsInput, PointRuleUncheckedCreateWithoutRecordsInput>
    where?: PointRuleWhereInput
  }

  export type PointRuleUpdateToOneWithWhereWithoutRecordsInput = {
    where?: PointRuleWhereInput
    data: XOR<PointRuleUpdateWithoutRecordsInput, PointRuleUncheckedUpdateWithoutRecordsInput>
  }

  export type PointRuleUpdateWithoutRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    pointsType?: EnumPointsTypeFieldUpdateOperationsInput | $Enums.PointsType
    points?: IntFieldUpdateOperationsInput | number
    pointsMin?: NullableIntFieldUpdateOperationsInput | number | null
    pointsMax?: NullableIntFieldUpdateOperationsInput | number | null
    needApproval?: BoolFieldUpdateOperationsInput | boolean
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    maxTimes?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    family?: FamilyUpdateOneRequiredWithoutPointRulesNestedInput
    targets?: PointRuleTargetUpdateManyWithoutPointRuleNestedInput
  }

  export type PointRuleUncheckedUpdateWithoutRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    pointsType?: EnumPointsTypeFieldUpdateOperationsInput | $Enums.PointsType
    points?: IntFieldUpdateOperationsInput | number
    pointsMin?: NullableIntFieldUpdateOperationsInput | number | null
    pointsMax?: NullableIntFieldUpdateOperationsInput | number | null
    needApproval?: BoolFieldUpdateOperationsInput | boolean
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    maxTimes?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    familyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targets?: PointRuleTargetUncheckedUpdateManyWithoutPointRuleNestedInput
  }

  export type UserCreateWithoutPointAccountInput = {
    id?: string
    name: string
    role: $Enums.Role
    pin?: string | null
    password?: string | null
    avatarUrl?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalEarnedPoints?: number
    level?: number
    streak?: number
    lastCheckIn?: Date | string | null
    family: FamilyCreateNestedOneWithoutUsersInput
    pointRecords?: PointRecordCreateNestedManyWithoutChildInput
    pet?: PetCreateNestedOneWithoutChildInput
    taskPlans?: TaskPlanCreateNestedManyWithoutChildInput
    taskLogs?: TaskLogCreateNestedManyWithoutChildInput
    redeemLogs?: RedeemLogCreateNestedManyWithoutChildInput
  }

  export type UserUncheckedCreateWithoutPointAccountInput = {
    id?: string
    name: string
    role: $Enums.Role
    pin?: string | null
    password?: string | null
    familyId: string
    avatarUrl?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalEarnedPoints?: number
    level?: number
    streak?: number
    lastCheckIn?: Date | string | null
    pointRecords?: PointRecordUncheckedCreateNestedManyWithoutChildInput
    pet?: PetUncheckedCreateNestedOneWithoutChildInput
    taskPlans?: TaskPlanUncheckedCreateNestedManyWithoutChildInput
    taskLogs?: TaskLogUncheckedCreateNestedManyWithoutChildInput
    redeemLogs?: RedeemLogUncheckedCreateNestedManyWithoutChildInput
  }

  export type UserCreateOrConnectWithoutPointAccountInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPointAccountInput, UserUncheckedCreateWithoutPointAccountInput>
  }

  export type PointTransactionCreateWithoutAccountInput = {
    id?: string
    type: $Enums.TransactionType
    amount: number
    balanceAfter: number
    sourceType: $Enums.SourceType
    sourceId?: string | null
    description?: string | null
    createdAt?: Date | string
  }

  export type PointTransactionUncheckedCreateWithoutAccountInput = {
    id?: string
    type: $Enums.TransactionType
    amount: number
    balanceAfter: number
    sourceType: $Enums.SourceType
    sourceId?: string | null
    description?: string | null
    createdAt?: Date | string
  }

  export type PointTransactionCreateOrConnectWithoutAccountInput = {
    where: PointTransactionWhereUniqueInput
    create: XOR<PointTransactionCreateWithoutAccountInput, PointTransactionUncheckedCreateWithoutAccountInput>
  }

  export type PointTransactionCreateManyAccountInputEnvelope = {
    data: PointTransactionCreateManyAccountInput | PointTransactionCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPointAccountInput = {
    update: XOR<UserUpdateWithoutPointAccountInput, UserUncheckedUpdateWithoutPointAccountInput>
    create: XOR<UserCreateWithoutPointAccountInput, UserUncheckedCreateWithoutPointAccountInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPointAccountInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPointAccountInput, UserUncheckedUpdateWithoutPointAccountInput>
  }

  export type UserUpdateWithoutPointAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalEarnedPoints?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastCheckIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    family?: FamilyUpdateOneRequiredWithoutUsersNestedInput
    pointRecords?: PointRecordUpdateManyWithoutChildNestedInput
    pet?: PetUpdateOneWithoutChildNestedInput
    taskPlans?: TaskPlanUpdateManyWithoutChildNestedInput
    taskLogs?: TaskLogUpdateManyWithoutChildNestedInput
    redeemLogs?: RedeemLogUpdateManyWithoutChildNestedInput
  }

  export type UserUncheckedUpdateWithoutPointAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalEarnedPoints?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastCheckIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pointRecords?: PointRecordUncheckedUpdateManyWithoutChildNestedInput
    pet?: PetUncheckedUpdateOneWithoutChildNestedInput
    taskPlans?: TaskPlanUncheckedUpdateManyWithoutChildNestedInput
    taskLogs?: TaskLogUncheckedUpdateManyWithoutChildNestedInput
    redeemLogs?: RedeemLogUncheckedUpdateManyWithoutChildNestedInput
  }

  export type PointTransactionUpsertWithWhereUniqueWithoutAccountInput = {
    where: PointTransactionWhereUniqueInput
    update: XOR<PointTransactionUpdateWithoutAccountInput, PointTransactionUncheckedUpdateWithoutAccountInput>
    create: XOR<PointTransactionCreateWithoutAccountInput, PointTransactionUncheckedCreateWithoutAccountInput>
  }

  export type PointTransactionUpdateWithWhereUniqueWithoutAccountInput = {
    where: PointTransactionWhereUniqueInput
    data: XOR<PointTransactionUpdateWithoutAccountInput, PointTransactionUncheckedUpdateWithoutAccountInput>
  }

  export type PointTransactionUpdateManyWithWhereWithoutAccountInput = {
    where: PointTransactionScalarWhereInput
    data: XOR<PointTransactionUpdateManyMutationInput, PointTransactionUncheckedUpdateManyWithoutAccountInput>
  }

  export type PointTransactionScalarWhereInput = {
    AND?: PointTransactionScalarWhereInput | PointTransactionScalarWhereInput[]
    OR?: PointTransactionScalarWhereInput[]
    NOT?: PointTransactionScalarWhereInput | PointTransactionScalarWhereInput[]
    id?: StringFilter<"PointTransaction"> | string
    accountId?: StringFilter<"PointTransaction"> | string
    type?: EnumTransactionTypeFilter<"PointTransaction"> | $Enums.TransactionType
    amount?: IntFilter<"PointTransaction"> | number
    balanceAfter?: IntFilter<"PointTransaction"> | number
    sourceType?: EnumSourceTypeFilter<"PointTransaction"> | $Enums.SourceType
    sourceId?: StringNullableFilter<"PointTransaction"> | string | null
    description?: StringNullableFilter<"PointTransaction"> | string | null
    createdAt?: DateTimeFilter<"PointTransaction"> | Date | string
  }

  export type PointAccountCreateWithoutTransactionsInput = {
    id?: string
    balance?: number
    totalEarned?: number
    totalSpent?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    child: UserCreateNestedOneWithoutPointAccountInput
  }

  export type PointAccountUncheckedCreateWithoutTransactionsInput = {
    id?: string
    childId: string
    balance?: number
    totalEarned?: number
    totalSpent?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PointAccountCreateOrConnectWithoutTransactionsInput = {
    where: PointAccountWhereUniqueInput
    create: XOR<PointAccountCreateWithoutTransactionsInput, PointAccountUncheckedCreateWithoutTransactionsInput>
  }

  export type PointAccountUpsertWithoutTransactionsInput = {
    update: XOR<PointAccountUpdateWithoutTransactionsInput, PointAccountUncheckedUpdateWithoutTransactionsInput>
    create: XOR<PointAccountCreateWithoutTransactionsInput, PointAccountUncheckedCreateWithoutTransactionsInput>
    where?: PointAccountWhereInput
  }

  export type PointAccountUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: PointAccountWhereInput
    data: XOR<PointAccountUpdateWithoutTransactionsInput, PointAccountUncheckedUpdateWithoutTransactionsInput>
  }

  export type PointAccountUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    totalEarned?: IntFieldUpdateOperationsInput | number
    totalSpent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    child?: UserUpdateOneRequiredWithoutPointAccountNestedInput
  }

  export type PointAccountUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    balance?: IntFieldUpdateOperationsInput | number
    totalEarned?: IntFieldUpdateOperationsInput | number
    totalSpent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutPetInput = {
    id?: string
    name: string
    role: $Enums.Role
    pin?: string | null
    password?: string | null
    avatarUrl?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalEarnedPoints?: number
    level?: number
    streak?: number
    lastCheckIn?: Date | string | null
    family: FamilyCreateNestedOneWithoutUsersInput
    pointAccount?: PointAccountCreateNestedOneWithoutChildInput
    pointRecords?: PointRecordCreateNestedManyWithoutChildInput
    taskPlans?: TaskPlanCreateNestedManyWithoutChildInput
    taskLogs?: TaskLogCreateNestedManyWithoutChildInput
    redeemLogs?: RedeemLogCreateNestedManyWithoutChildInput
  }

  export type UserUncheckedCreateWithoutPetInput = {
    id?: string
    name: string
    role: $Enums.Role
    pin?: string | null
    password?: string | null
    familyId: string
    avatarUrl?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalEarnedPoints?: number
    level?: number
    streak?: number
    lastCheckIn?: Date | string | null
    pointAccount?: PointAccountUncheckedCreateNestedOneWithoutChildInput
    pointRecords?: PointRecordUncheckedCreateNestedManyWithoutChildInput
    taskPlans?: TaskPlanUncheckedCreateNestedManyWithoutChildInput
    taskLogs?: TaskLogUncheckedCreateNestedManyWithoutChildInput
    redeemLogs?: RedeemLogUncheckedCreateNestedManyWithoutChildInput
  }

  export type UserCreateOrConnectWithoutPetInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPetInput, UserUncheckedCreateWithoutPetInput>
  }

  export type PetLogCreateWithoutPetInput = {
    id?: string
    action: $Enums.PetAction
    oldValue?: number | null
    newValue?: number | null
    pointsCost?: number | null
    description: string
    createdAt?: Date | string
  }

  export type PetLogUncheckedCreateWithoutPetInput = {
    id?: string
    action: $Enums.PetAction
    oldValue?: number | null
    newValue?: number | null
    pointsCost?: number | null
    description: string
    createdAt?: Date | string
  }

  export type PetLogCreateOrConnectWithoutPetInput = {
    where: PetLogWhereUniqueInput
    create: XOR<PetLogCreateWithoutPetInput, PetLogUncheckedCreateWithoutPetInput>
  }

  export type PetLogCreateManyPetInputEnvelope = {
    data: PetLogCreateManyPetInput | PetLogCreateManyPetInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPetInput = {
    update: XOR<UserUpdateWithoutPetInput, UserUncheckedUpdateWithoutPetInput>
    create: XOR<UserCreateWithoutPetInput, UserUncheckedCreateWithoutPetInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPetInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPetInput, UserUncheckedUpdateWithoutPetInput>
  }

  export type UserUpdateWithoutPetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalEarnedPoints?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastCheckIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    family?: FamilyUpdateOneRequiredWithoutUsersNestedInput
    pointAccount?: PointAccountUpdateOneWithoutChildNestedInput
    pointRecords?: PointRecordUpdateManyWithoutChildNestedInput
    taskPlans?: TaskPlanUpdateManyWithoutChildNestedInput
    taskLogs?: TaskLogUpdateManyWithoutChildNestedInput
    redeemLogs?: RedeemLogUpdateManyWithoutChildNestedInput
  }

  export type UserUncheckedUpdateWithoutPetInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalEarnedPoints?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastCheckIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pointAccount?: PointAccountUncheckedUpdateOneWithoutChildNestedInput
    pointRecords?: PointRecordUncheckedUpdateManyWithoutChildNestedInput
    taskPlans?: TaskPlanUncheckedUpdateManyWithoutChildNestedInput
    taskLogs?: TaskLogUncheckedUpdateManyWithoutChildNestedInput
    redeemLogs?: RedeemLogUncheckedUpdateManyWithoutChildNestedInput
  }

  export type PetLogUpsertWithWhereUniqueWithoutPetInput = {
    where: PetLogWhereUniqueInput
    update: XOR<PetLogUpdateWithoutPetInput, PetLogUncheckedUpdateWithoutPetInput>
    create: XOR<PetLogCreateWithoutPetInput, PetLogUncheckedCreateWithoutPetInput>
  }

  export type PetLogUpdateWithWhereUniqueWithoutPetInput = {
    where: PetLogWhereUniqueInput
    data: XOR<PetLogUpdateWithoutPetInput, PetLogUncheckedUpdateWithoutPetInput>
  }

  export type PetLogUpdateManyWithWhereWithoutPetInput = {
    where: PetLogScalarWhereInput
    data: XOR<PetLogUpdateManyMutationInput, PetLogUncheckedUpdateManyWithoutPetInput>
  }

  export type PetLogScalarWhereInput = {
    AND?: PetLogScalarWhereInput | PetLogScalarWhereInput[]
    OR?: PetLogScalarWhereInput[]
    NOT?: PetLogScalarWhereInput | PetLogScalarWhereInput[]
    id?: StringFilter<"PetLog"> | string
    petId?: StringFilter<"PetLog"> | string
    action?: EnumPetActionFilter<"PetLog"> | $Enums.PetAction
    oldValue?: IntNullableFilter<"PetLog"> | number | null
    newValue?: IntNullableFilter<"PetLog"> | number | null
    pointsCost?: IntNullableFilter<"PetLog"> | number | null
    description?: StringFilter<"PetLog"> | string
    createdAt?: DateTimeFilter<"PetLog"> | Date | string
  }

  export type PetCreateWithoutLogsInput = {
    id?: string
    name?: string
    stage?: $Enums.PetStage
    level?: number
    exp?: number
    status?: $Enums.PetStatus
    hunger?: number
    thirst?: number
    cleanliness?: number
    mood?: number
    health?: number
    lastDecayAt?: Date | string
    lastFedAt?: Date | string | null
    lastWateredAt?: Date | string | null
    lastCleanedAt?: Date | string | null
    lastPlayedAt?: Date | string | null
    totalCareCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    child: UserCreateNestedOneWithoutPetInput
  }

  export type PetUncheckedCreateWithoutLogsInput = {
    id?: string
    childId: string
    name?: string
    stage?: $Enums.PetStage
    level?: number
    exp?: number
    status?: $Enums.PetStatus
    hunger?: number
    thirst?: number
    cleanliness?: number
    mood?: number
    health?: number
    lastDecayAt?: Date | string
    lastFedAt?: Date | string | null
    lastWateredAt?: Date | string | null
    lastCleanedAt?: Date | string | null
    lastPlayedAt?: Date | string | null
    totalCareCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PetCreateOrConnectWithoutLogsInput = {
    where: PetWhereUniqueInput
    create: XOR<PetCreateWithoutLogsInput, PetUncheckedCreateWithoutLogsInput>
  }

  export type PetUpsertWithoutLogsInput = {
    update: XOR<PetUpdateWithoutLogsInput, PetUncheckedUpdateWithoutLogsInput>
    create: XOR<PetCreateWithoutLogsInput, PetUncheckedCreateWithoutLogsInput>
    where?: PetWhereInput
  }

  export type PetUpdateToOneWithWhereWithoutLogsInput = {
    where?: PetWhereInput
    data: XOR<PetUpdateWithoutLogsInput, PetUncheckedUpdateWithoutLogsInput>
  }

  export type PetUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stage?: EnumPetStageFieldUpdateOperationsInput | $Enums.PetStage
    level?: IntFieldUpdateOperationsInput | number
    exp?: IntFieldUpdateOperationsInput | number
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    hunger?: IntFieldUpdateOperationsInput | number
    thirst?: IntFieldUpdateOperationsInput | number
    cleanliness?: IntFieldUpdateOperationsInput | number
    mood?: IntFieldUpdateOperationsInput | number
    health?: IntFieldUpdateOperationsInput | number
    lastDecayAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastFedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastCleanedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalCareCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    child?: UserUpdateOneRequiredWithoutPetNestedInput
  }

  export type PetUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    stage?: EnumPetStageFieldUpdateOperationsInput | $Enums.PetStage
    level?: IntFieldUpdateOperationsInput | number
    exp?: IntFieldUpdateOperationsInput | number
    status?: EnumPetStatusFieldUpdateOperationsInput | $Enums.PetStatus
    hunger?: IntFieldUpdateOperationsInput | number
    thirst?: IntFieldUpdateOperationsInput | number
    cleanliness?: IntFieldUpdateOperationsInput | number
    mood?: IntFieldUpdateOperationsInput | number
    health?: IntFieldUpdateOperationsInput | number
    lastDecayAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastFedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastWateredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastCleanedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastPlayedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalCareCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutTaskPlansInput = {
    id?: string
    name: string
    role: $Enums.Role
    pin?: string | null
    password?: string | null
    avatarUrl?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalEarnedPoints?: number
    level?: number
    streak?: number
    lastCheckIn?: Date | string | null
    family: FamilyCreateNestedOneWithoutUsersInput
    pointAccount?: PointAccountCreateNestedOneWithoutChildInput
    pointRecords?: PointRecordCreateNestedManyWithoutChildInput
    pet?: PetCreateNestedOneWithoutChildInput
    taskLogs?: TaskLogCreateNestedManyWithoutChildInput
    redeemLogs?: RedeemLogCreateNestedManyWithoutChildInput
  }

  export type UserUncheckedCreateWithoutTaskPlansInput = {
    id?: string
    name: string
    role: $Enums.Role
    pin?: string | null
    password?: string | null
    familyId: string
    avatarUrl?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalEarnedPoints?: number
    level?: number
    streak?: number
    lastCheckIn?: Date | string | null
    pointAccount?: PointAccountUncheckedCreateNestedOneWithoutChildInput
    pointRecords?: PointRecordUncheckedCreateNestedManyWithoutChildInput
    pet?: PetUncheckedCreateNestedOneWithoutChildInput
    taskLogs?: TaskLogUncheckedCreateNestedManyWithoutChildInput
    redeemLogs?: RedeemLogUncheckedCreateNestedManyWithoutChildInput
  }

  export type UserCreateOrConnectWithoutTaskPlansInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTaskPlansInput, UserUncheckedCreateWithoutTaskPlansInput>
  }

  export type TaskLogCreateWithoutTaskPlanInput = {
    id?: string
    points?: number
    note?: string | null
    createdAt?: Date | string
    child: UserCreateNestedOneWithoutTaskLogsInput
  }

  export type TaskLogUncheckedCreateWithoutTaskPlanInput = {
    id?: string
    childId: string
    points?: number
    note?: string | null
    createdAt?: Date | string
  }

  export type TaskLogCreateOrConnectWithoutTaskPlanInput = {
    where: TaskLogWhereUniqueInput
    create: XOR<TaskLogCreateWithoutTaskPlanInput, TaskLogUncheckedCreateWithoutTaskPlanInput>
  }

  export type TaskLogCreateManyTaskPlanInputEnvelope = {
    data: TaskLogCreateManyTaskPlanInput | TaskLogCreateManyTaskPlanInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTaskPlansInput = {
    update: XOR<UserUpdateWithoutTaskPlansInput, UserUncheckedUpdateWithoutTaskPlansInput>
    create: XOR<UserCreateWithoutTaskPlansInput, UserUncheckedCreateWithoutTaskPlansInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTaskPlansInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTaskPlansInput, UserUncheckedUpdateWithoutTaskPlansInput>
  }

  export type UserUpdateWithoutTaskPlansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalEarnedPoints?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastCheckIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    family?: FamilyUpdateOneRequiredWithoutUsersNestedInput
    pointAccount?: PointAccountUpdateOneWithoutChildNestedInput
    pointRecords?: PointRecordUpdateManyWithoutChildNestedInput
    pet?: PetUpdateOneWithoutChildNestedInput
    taskLogs?: TaskLogUpdateManyWithoutChildNestedInput
    redeemLogs?: RedeemLogUpdateManyWithoutChildNestedInput
  }

  export type UserUncheckedUpdateWithoutTaskPlansInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalEarnedPoints?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastCheckIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pointAccount?: PointAccountUncheckedUpdateOneWithoutChildNestedInput
    pointRecords?: PointRecordUncheckedUpdateManyWithoutChildNestedInput
    pet?: PetUncheckedUpdateOneWithoutChildNestedInput
    taskLogs?: TaskLogUncheckedUpdateManyWithoutChildNestedInput
    redeemLogs?: RedeemLogUncheckedUpdateManyWithoutChildNestedInput
  }

  export type TaskLogUpsertWithWhereUniqueWithoutTaskPlanInput = {
    where: TaskLogWhereUniqueInput
    update: XOR<TaskLogUpdateWithoutTaskPlanInput, TaskLogUncheckedUpdateWithoutTaskPlanInput>
    create: XOR<TaskLogCreateWithoutTaskPlanInput, TaskLogUncheckedCreateWithoutTaskPlanInput>
  }

  export type TaskLogUpdateWithWhereUniqueWithoutTaskPlanInput = {
    where: TaskLogWhereUniqueInput
    data: XOR<TaskLogUpdateWithoutTaskPlanInput, TaskLogUncheckedUpdateWithoutTaskPlanInput>
  }

  export type TaskLogUpdateManyWithWhereWithoutTaskPlanInput = {
    where: TaskLogScalarWhereInput
    data: XOR<TaskLogUpdateManyMutationInput, TaskLogUncheckedUpdateManyWithoutTaskPlanInput>
  }

  export type TaskPlanCreateWithoutLogsInput = {
    id?: string
    title: string
    description?: string | null
    points?: number
    scheduledAt?: Date | string | null
    dueAt?: Date | string | null
    frequency?: $Enums.Frequency | null
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    child: UserCreateNestedOneWithoutTaskPlansInput
  }

  export type TaskPlanUncheckedCreateWithoutLogsInput = {
    id?: string
    childId: string
    title: string
    description?: string | null
    points?: number
    scheduledAt?: Date | string | null
    dueAt?: Date | string | null
    frequency?: $Enums.Frequency | null
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskPlanCreateOrConnectWithoutLogsInput = {
    where: TaskPlanWhereUniqueInput
    create: XOR<TaskPlanCreateWithoutLogsInput, TaskPlanUncheckedCreateWithoutLogsInput>
  }

  export type UserCreateWithoutTaskLogsInput = {
    id?: string
    name: string
    role: $Enums.Role
    pin?: string | null
    password?: string | null
    avatarUrl?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalEarnedPoints?: number
    level?: number
    streak?: number
    lastCheckIn?: Date | string | null
    family: FamilyCreateNestedOneWithoutUsersInput
    pointAccount?: PointAccountCreateNestedOneWithoutChildInput
    pointRecords?: PointRecordCreateNestedManyWithoutChildInput
    pet?: PetCreateNestedOneWithoutChildInput
    taskPlans?: TaskPlanCreateNestedManyWithoutChildInput
    redeemLogs?: RedeemLogCreateNestedManyWithoutChildInput
  }

  export type UserUncheckedCreateWithoutTaskLogsInput = {
    id?: string
    name: string
    role: $Enums.Role
    pin?: string | null
    password?: string | null
    familyId: string
    avatarUrl?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalEarnedPoints?: number
    level?: number
    streak?: number
    lastCheckIn?: Date | string | null
    pointAccount?: PointAccountUncheckedCreateNestedOneWithoutChildInput
    pointRecords?: PointRecordUncheckedCreateNestedManyWithoutChildInput
    pet?: PetUncheckedCreateNestedOneWithoutChildInput
    taskPlans?: TaskPlanUncheckedCreateNestedManyWithoutChildInput
    redeemLogs?: RedeemLogUncheckedCreateNestedManyWithoutChildInput
  }

  export type UserCreateOrConnectWithoutTaskLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTaskLogsInput, UserUncheckedCreateWithoutTaskLogsInput>
  }

  export type TaskPlanUpsertWithoutLogsInput = {
    update: XOR<TaskPlanUpdateWithoutLogsInput, TaskPlanUncheckedUpdateWithoutLogsInput>
    create: XOR<TaskPlanCreateWithoutLogsInput, TaskPlanUncheckedCreateWithoutLogsInput>
    where?: TaskPlanWhereInput
  }

  export type TaskPlanUpdateToOneWithWhereWithoutLogsInput = {
    where?: TaskPlanWhereInput
    data: XOR<TaskPlanUpdateWithoutLogsInput, TaskPlanUncheckedUpdateWithoutLogsInput>
  }

  export type TaskPlanUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    frequency?: NullableEnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    child?: UserUpdateOneRequiredWithoutTaskPlansNestedInput
  }

  export type TaskPlanUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    frequency?: NullableEnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutTaskLogsInput = {
    update: XOR<UserUpdateWithoutTaskLogsInput, UserUncheckedUpdateWithoutTaskLogsInput>
    create: XOR<UserCreateWithoutTaskLogsInput, UserUncheckedCreateWithoutTaskLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTaskLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTaskLogsInput, UserUncheckedUpdateWithoutTaskLogsInput>
  }

  export type UserUpdateWithoutTaskLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalEarnedPoints?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastCheckIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    family?: FamilyUpdateOneRequiredWithoutUsersNestedInput
    pointAccount?: PointAccountUpdateOneWithoutChildNestedInput
    pointRecords?: PointRecordUpdateManyWithoutChildNestedInput
    pet?: PetUpdateOneWithoutChildNestedInput
    taskPlans?: TaskPlanUpdateManyWithoutChildNestedInput
    redeemLogs?: RedeemLogUpdateManyWithoutChildNestedInput
  }

  export type UserUncheckedUpdateWithoutTaskLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalEarnedPoints?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastCheckIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pointAccount?: PointAccountUncheckedUpdateOneWithoutChildNestedInput
    pointRecords?: PointRecordUncheckedUpdateManyWithoutChildNestedInput
    pet?: PetUncheckedUpdateOneWithoutChildNestedInput
    taskPlans?: TaskPlanUncheckedUpdateManyWithoutChildNestedInput
    redeemLogs?: RedeemLogUncheckedUpdateManyWithoutChildNestedInput
  }

  export type FamilyCreateWithoutRewardItemsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutFamilyInput
    pointRules?: PointRuleCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUncheckedCreateWithoutRewardItemsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutFamilyInput
    pointRules?: PointRuleUncheckedCreateNestedManyWithoutFamilyInput
  }

  export type FamilyCreateOrConnectWithoutRewardItemsInput = {
    where: FamilyWhereUniqueInput
    create: XOR<FamilyCreateWithoutRewardItemsInput, FamilyUncheckedCreateWithoutRewardItemsInput>
  }

  export type RedeemLogCreateWithoutRewardItemInput = {
    id?: string
    quantity?: number
    pointsSpent: number
    note?: string | null
    createdAt?: Date | string
    child: UserCreateNestedOneWithoutRedeemLogsInput
  }

  export type RedeemLogUncheckedCreateWithoutRewardItemInput = {
    id?: string
    childId: string
    quantity?: number
    pointsSpent: number
    note?: string | null
    createdAt?: Date | string
  }

  export type RedeemLogCreateOrConnectWithoutRewardItemInput = {
    where: RedeemLogWhereUniqueInput
    create: XOR<RedeemLogCreateWithoutRewardItemInput, RedeemLogUncheckedCreateWithoutRewardItemInput>
  }

  export type RedeemLogCreateManyRewardItemInputEnvelope = {
    data: RedeemLogCreateManyRewardItemInput | RedeemLogCreateManyRewardItemInput[]
    skipDuplicates?: boolean
  }

  export type FamilyUpsertWithoutRewardItemsInput = {
    update: XOR<FamilyUpdateWithoutRewardItemsInput, FamilyUncheckedUpdateWithoutRewardItemsInput>
    create: XOR<FamilyCreateWithoutRewardItemsInput, FamilyUncheckedCreateWithoutRewardItemsInput>
    where?: FamilyWhereInput
  }

  export type FamilyUpdateToOneWithWhereWithoutRewardItemsInput = {
    where?: FamilyWhereInput
    data: XOR<FamilyUpdateWithoutRewardItemsInput, FamilyUncheckedUpdateWithoutRewardItemsInput>
  }

  export type FamilyUpdateWithoutRewardItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutFamilyNestedInput
    pointRules?: PointRuleUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyUncheckedUpdateWithoutRewardItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutFamilyNestedInput
    pointRules?: PointRuleUncheckedUpdateManyWithoutFamilyNestedInput
  }

  export type RedeemLogUpsertWithWhereUniqueWithoutRewardItemInput = {
    where: RedeemLogWhereUniqueInput
    update: XOR<RedeemLogUpdateWithoutRewardItemInput, RedeemLogUncheckedUpdateWithoutRewardItemInput>
    create: XOR<RedeemLogCreateWithoutRewardItemInput, RedeemLogUncheckedCreateWithoutRewardItemInput>
  }

  export type RedeemLogUpdateWithWhereUniqueWithoutRewardItemInput = {
    where: RedeemLogWhereUniqueInput
    data: XOR<RedeemLogUpdateWithoutRewardItemInput, RedeemLogUncheckedUpdateWithoutRewardItemInput>
  }

  export type RedeemLogUpdateManyWithWhereWithoutRewardItemInput = {
    where: RedeemLogScalarWhereInput
    data: XOR<RedeemLogUpdateManyMutationInput, RedeemLogUncheckedUpdateManyWithoutRewardItemInput>
  }

  export type UserCreateWithoutRedeemLogsInput = {
    id?: string
    name: string
    role: $Enums.Role
    pin?: string | null
    password?: string | null
    avatarUrl?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalEarnedPoints?: number
    level?: number
    streak?: number
    lastCheckIn?: Date | string | null
    family: FamilyCreateNestedOneWithoutUsersInput
    pointAccount?: PointAccountCreateNestedOneWithoutChildInput
    pointRecords?: PointRecordCreateNestedManyWithoutChildInput
    pet?: PetCreateNestedOneWithoutChildInput
    taskPlans?: TaskPlanCreateNestedManyWithoutChildInput
    taskLogs?: TaskLogCreateNestedManyWithoutChildInput
  }

  export type UserUncheckedCreateWithoutRedeemLogsInput = {
    id?: string
    name: string
    role: $Enums.Role
    pin?: string | null
    password?: string | null
    familyId: string
    avatarUrl?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalEarnedPoints?: number
    level?: number
    streak?: number
    lastCheckIn?: Date | string | null
    pointAccount?: PointAccountUncheckedCreateNestedOneWithoutChildInput
    pointRecords?: PointRecordUncheckedCreateNestedManyWithoutChildInput
    pet?: PetUncheckedCreateNestedOneWithoutChildInput
    taskPlans?: TaskPlanUncheckedCreateNestedManyWithoutChildInput
    taskLogs?: TaskLogUncheckedCreateNestedManyWithoutChildInput
  }

  export type UserCreateOrConnectWithoutRedeemLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRedeemLogsInput, UserUncheckedCreateWithoutRedeemLogsInput>
  }

  export type RewardItemCreateWithoutRedeemsInput = {
    id?: string
    name: string
    description?: string | null
    cost: number
    stock?: number | null
    enabled?: boolean
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    family: FamilyCreateNestedOneWithoutRewardItemsInput
  }

  export type RewardItemUncheckedCreateWithoutRedeemsInput = {
    id?: string
    familyId: string
    name: string
    description?: string | null
    cost: number
    stock?: number | null
    enabled?: boolean
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RewardItemCreateOrConnectWithoutRedeemsInput = {
    where: RewardItemWhereUniqueInput
    create: XOR<RewardItemCreateWithoutRedeemsInput, RewardItemUncheckedCreateWithoutRedeemsInput>
  }

  export type UserUpsertWithoutRedeemLogsInput = {
    update: XOR<UserUpdateWithoutRedeemLogsInput, UserUncheckedUpdateWithoutRedeemLogsInput>
    create: XOR<UserCreateWithoutRedeemLogsInput, UserUncheckedCreateWithoutRedeemLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRedeemLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRedeemLogsInput, UserUncheckedUpdateWithoutRedeemLogsInput>
  }

  export type UserUpdateWithoutRedeemLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalEarnedPoints?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastCheckIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    family?: FamilyUpdateOneRequiredWithoutUsersNestedInput
    pointAccount?: PointAccountUpdateOneWithoutChildNestedInput
    pointRecords?: PointRecordUpdateManyWithoutChildNestedInput
    pet?: PetUpdateOneWithoutChildNestedInput
    taskPlans?: TaskPlanUpdateManyWithoutChildNestedInput
    taskLogs?: TaskLogUpdateManyWithoutChildNestedInput
  }

  export type UserUncheckedUpdateWithoutRedeemLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: StringFieldUpdateOperationsInput | string
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalEarnedPoints?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastCheckIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pointAccount?: PointAccountUncheckedUpdateOneWithoutChildNestedInput
    pointRecords?: PointRecordUncheckedUpdateManyWithoutChildNestedInput
    pet?: PetUncheckedUpdateOneWithoutChildNestedInput
    taskPlans?: TaskPlanUncheckedUpdateManyWithoutChildNestedInput
    taskLogs?: TaskLogUncheckedUpdateManyWithoutChildNestedInput
  }

  export type RewardItemUpsertWithoutRedeemsInput = {
    update: XOR<RewardItemUpdateWithoutRedeemsInput, RewardItemUncheckedUpdateWithoutRedeemsInput>
    create: XOR<RewardItemCreateWithoutRedeemsInput, RewardItemUncheckedCreateWithoutRedeemsInput>
    where?: RewardItemWhereInput
  }

  export type RewardItemUpdateToOneWithWhereWithoutRedeemsInput = {
    where?: RewardItemWhereInput
    data: XOR<RewardItemUpdateWithoutRedeemsInput, RewardItemUncheckedUpdateWithoutRedeemsInput>
  }

  export type RewardItemUpdateWithoutRedeemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cost?: IntFieldUpdateOperationsInput | number
    stock?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    family?: FamilyUpdateOneRequiredWithoutRewardItemsNestedInput
  }

  export type RewardItemUncheckedUpdateWithoutRedeemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    familyId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cost?: IntFieldUpdateOperationsInput | number
    stock?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyFamilyInput = {
    id?: string
    name: string
    role: $Enums.Role
    pin?: string | null
    password?: string | null
    avatarUrl?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    totalEarnedPoints?: number
    level?: number
    streak?: number
    lastCheckIn?: Date | string | null
  }

  export type PointRuleCreateManyFamilyInput = {
    id?: string
    name: string
    description?: string | null
    category: string
    pointsType: $Enums.PointsType
    points: number
    pointsMin?: number | null
    pointsMax?: number | null
    needApproval?: boolean
    frequency: $Enums.Frequency
    maxTimes?: number | null
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RewardItemCreateManyFamilyInput = {
    id?: string
    name: string
    description?: string | null
    cost: number
    stock?: number | null
    enabled?: boolean
    imageUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalEarnedPoints?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastCheckIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pointAccount?: PointAccountUpdateOneWithoutChildNestedInput
    pointRecords?: PointRecordUpdateManyWithoutChildNestedInput
    pet?: PetUpdateOneWithoutChildNestedInput
    taskPlans?: TaskPlanUpdateManyWithoutChildNestedInput
    taskLogs?: TaskLogUpdateManyWithoutChildNestedInput
    redeemLogs?: RedeemLogUpdateManyWithoutChildNestedInput
  }

  export type UserUncheckedUpdateWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalEarnedPoints?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastCheckIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pointAccount?: PointAccountUncheckedUpdateOneWithoutChildNestedInput
    pointRecords?: PointRecordUncheckedUpdateManyWithoutChildNestedInput
    pet?: PetUncheckedUpdateOneWithoutChildNestedInput
    taskPlans?: TaskPlanUncheckedUpdateManyWithoutChildNestedInput
    taskLogs?: TaskLogUncheckedUpdateManyWithoutChildNestedInput
    redeemLogs?: RedeemLogUncheckedUpdateManyWithoutChildNestedInput
  }

  export type UserUncheckedUpdateManyWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    pin?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    totalEarnedPoints?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    streak?: IntFieldUpdateOperationsInput | number
    lastCheckIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PointRuleUpdateWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    pointsType?: EnumPointsTypeFieldUpdateOperationsInput | $Enums.PointsType
    points?: IntFieldUpdateOperationsInput | number
    pointsMin?: NullableIntFieldUpdateOperationsInput | number | null
    pointsMax?: NullableIntFieldUpdateOperationsInput | number | null
    needApproval?: BoolFieldUpdateOperationsInput | boolean
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    maxTimes?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targets?: PointRuleTargetUpdateManyWithoutPointRuleNestedInput
    records?: PointRecordUpdateManyWithoutPointRuleNestedInput
  }

  export type PointRuleUncheckedUpdateWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    pointsType?: EnumPointsTypeFieldUpdateOperationsInput | $Enums.PointsType
    points?: IntFieldUpdateOperationsInput | number
    pointsMin?: NullableIntFieldUpdateOperationsInput | number | null
    pointsMax?: NullableIntFieldUpdateOperationsInput | number | null
    needApproval?: BoolFieldUpdateOperationsInput | boolean
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    maxTimes?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    targets?: PointRuleTargetUncheckedUpdateManyWithoutPointRuleNestedInput
    records?: PointRecordUncheckedUpdateManyWithoutPointRuleNestedInput
  }

  export type PointRuleUncheckedUpdateManyWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    pointsType?: EnumPointsTypeFieldUpdateOperationsInput | $Enums.PointsType
    points?: IntFieldUpdateOperationsInput | number
    pointsMin?: NullableIntFieldUpdateOperationsInput | number | null
    pointsMax?: NullableIntFieldUpdateOperationsInput | number | null
    needApproval?: BoolFieldUpdateOperationsInput | boolean
    frequency?: EnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency
    maxTimes?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewardItemUpdateWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cost?: IntFieldUpdateOperationsInput | number
    stock?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    redeems?: RedeemLogUpdateManyWithoutRewardItemNestedInput
  }

  export type RewardItemUncheckedUpdateWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cost?: IntFieldUpdateOperationsInput | number
    stock?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    redeems?: RedeemLogUncheckedUpdateManyWithoutRewardItemNestedInput
  }

  export type RewardItemUncheckedUpdateManyWithoutFamilyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    cost?: IntFieldUpdateOperationsInput | number
    stock?: NullableIntFieldUpdateOperationsInput | number | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointRecordCreateManyChildInput = {
    id?: string
    pointRuleId: string
    status?: $Enums.RecordStatus
    points: number
    description?: string | null
    imageUrl?: string | null
    submitNote?: string | null
    reviewNote?: string | null
    reviewedById?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskPlanCreateManyChildInput = {
    id?: string
    title: string
    description?: string | null
    points?: number
    scheduledAt?: Date | string | null
    dueAt?: Date | string | null
    frequency?: $Enums.Frequency | null
    enabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskLogCreateManyChildInput = {
    id?: string
    taskPlanId?: string | null
    points?: number
    note?: string | null
    createdAt?: Date | string
  }

  export type RedeemLogCreateManyChildInput = {
    id?: string
    rewardItemId: string
    quantity?: number
    pointsSpent: number
    note?: string | null
    createdAt?: Date | string
  }

  export type PointRecordUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    submitNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedById?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pointRule?: PointRuleUpdateOneRequiredWithoutRecordsNestedInput
  }

  export type PointRecordUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    pointRuleId?: StringFieldUpdateOperationsInput | string
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    submitNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedById?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointRecordUncheckedUpdateManyWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    pointRuleId?: StringFieldUpdateOperationsInput | string
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    submitNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedById?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskPlanUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    frequency?: NullableEnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: TaskLogUpdateManyWithoutTaskPlanNestedInput
  }

  export type TaskPlanUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    frequency?: NullableEnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: TaskLogUncheckedUpdateManyWithoutTaskPlanNestedInput
  }

  export type TaskPlanUncheckedUpdateManyWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dueAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    frequency?: NullableEnumFrequencyFieldUpdateOperationsInput | $Enums.Frequency | null
    enabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLogUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taskPlan?: TaskPlanUpdateOneWithoutLogsNestedInput
  }

  export type TaskLogUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLogUncheckedUpdateManyWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    taskPlanId?: NullableStringFieldUpdateOperationsInput | string | null
    points?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RedeemLogUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    pointsSpent?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rewardItem?: RewardItemUpdateOneRequiredWithoutRedeemsNestedInput
  }

  export type RedeemLogUncheckedUpdateWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    rewardItemId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    pointsSpent?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RedeemLogUncheckedUpdateManyWithoutChildInput = {
    id?: StringFieldUpdateOperationsInput | string
    rewardItemId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    pointsSpent?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointRuleTargetCreateManyPointRuleInput = {
    id?: string
    childId: string
  }

  export type PointRecordCreateManyPointRuleInput = {
    id?: string
    childId: string
    status?: $Enums.RecordStatus
    points: number
    description?: string | null
    imageUrl?: string | null
    submitNote?: string | null
    reviewNote?: string | null
    reviewedById?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PointRuleTargetUpdateWithoutPointRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
  }

  export type PointRuleTargetUncheckedUpdateWithoutPointRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
  }

  export type PointRuleTargetUncheckedUpdateManyWithoutPointRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
  }

  export type PointRecordUpdateWithoutPointRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    submitNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedById?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    child?: UserUpdateOneRequiredWithoutPointRecordsNestedInput
  }

  export type PointRecordUncheckedUpdateWithoutPointRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    submitNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedById?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointRecordUncheckedUpdateManyWithoutPointRuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    status?: EnumRecordStatusFieldUpdateOperationsInput | $Enums.RecordStatus
    points?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    submitNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewNote?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedById?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointTransactionCreateManyAccountInput = {
    id?: string
    type: $Enums.TransactionType
    amount: number
    balanceAfter: number
    sourceType: $Enums.SourceType
    sourceId?: string | null
    description?: string | null
    createdAt?: Date | string
  }

  export type PointTransactionUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointTransactionUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PointTransactionUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    amount?: IntFieldUpdateOperationsInput | number
    balanceAfter?: IntFieldUpdateOperationsInput | number
    sourceType?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PetLogCreateManyPetInput = {
    id?: string
    action: $Enums.PetAction
    oldValue?: number | null
    newValue?: number | null
    pointsCost?: number | null
    description: string
    createdAt?: Date | string
  }

  export type PetLogUpdateWithoutPetInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumPetActionFieldUpdateOperationsInput | $Enums.PetAction
    oldValue?: NullableIntFieldUpdateOperationsInput | number | null
    newValue?: NullableIntFieldUpdateOperationsInput | number | null
    pointsCost?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PetLogUncheckedUpdateWithoutPetInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumPetActionFieldUpdateOperationsInput | $Enums.PetAction
    oldValue?: NullableIntFieldUpdateOperationsInput | number | null
    newValue?: NullableIntFieldUpdateOperationsInput | number | null
    pointsCost?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PetLogUncheckedUpdateManyWithoutPetInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumPetActionFieldUpdateOperationsInput | $Enums.PetAction
    oldValue?: NullableIntFieldUpdateOperationsInput | number | null
    newValue?: NullableIntFieldUpdateOperationsInput | number | null
    pointsCost?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLogCreateManyTaskPlanInput = {
    id?: string
    childId: string
    points?: number
    note?: string | null
    createdAt?: Date | string
  }

  export type TaskLogUpdateWithoutTaskPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    child?: UserUpdateOneRequiredWithoutTaskLogsNestedInput
  }

  export type TaskLogUncheckedUpdateWithoutTaskPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskLogUncheckedUpdateManyWithoutTaskPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    points?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RedeemLogCreateManyRewardItemInput = {
    id?: string
    childId: string
    quantity?: number
    pointsSpent: number
    note?: string | null
    createdAt?: Date | string
  }

  export type RedeemLogUpdateWithoutRewardItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    pointsSpent?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    child?: UserUpdateOneRequiredWithoutRedeemLogsNestedInput
  }

  export type RedeemLogUncheckedUpdateWithoutRewardItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    pointsSpent?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RedeemLogUncheckedUpdateManyWithoutRewardItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    childId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    pointsSpent?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use FamilyCountOutputTypeDefaultArgs instead
     */
    export type FamilyCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FamilyCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PointRuleCountOutputTypeDefaultArgs instead
     */
    export type PointRuleCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PointRuleCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PointAccountCountOutputTypeDefaultArgs instead
     */
    export type PointAccountCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PointAccountCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PetCountOutputTypeDefaultArgs instead
     */
    export type PetCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PetCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskPlanCountOutputTypeDefaultArgs instead
     */
    export type TaskPlanCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskPlanCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RewardItemCountOutputTypeDefaultArgs instead
     */
    export type RewardItemCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RewardItemCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FamilyDefaultArgs instead
     */
    export type FamilyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FamilyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PointRuleDefaultArgs instead
     */
    export type PointRuleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PointRuleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PointRuleTargetDefaultArgs instead
     */
    export type PointRuleTargetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PointRuleTargetDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PointRecordDefaultArgs instead
     */
    export type PointRecordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PointRecordDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PointAccountDefaultArgs instead
     */
    export type PointAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PointAccountDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PointTransactionDefaultArgs instead
     */
    export type PointTransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PointTransactionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PetDefaultArgs instead
     */
    export type PetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PetDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PetLogDefaultArgs instead
     */
    export type PetLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PetLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskPlanDefaultArgs instead
     */
    export type TaskPlanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskPlanDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TaskLogDefaultArgs instead
     */
    export type TaskLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TaskLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RewardItemDefaultArgs instead
     */
    export type RewardItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RewardItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RedeemLogDefaultArgs instead
     */
    export type RedeemLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RedeemLogDefaultArgs<ExtArgs>

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