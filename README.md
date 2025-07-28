# UPAY API Client

A type-safe TypeScript SDK for the UPAY payment processing API. This library provides a clean, well-typed interface for interacting with UPAY's action-based API system.

## Features

- 🔒 **Type-safe API calls** with compile-time validation
- 📝 **Action-based architecture** with clean `createRequest()` API supporting main/minor action patterns
- 🎯 **Intelligent type narrowing** - minor actions are automatically filtered based on main action
- 🔐 **Unified endpoint handling** with simplified request creation
- ⚡ **Built on modern libraries** (axios, neverthrow, valibot)
- 🔄 **Session management** with automatic session ID handling
- 📦 **Batch operations** support for multiple requests

## Installation

```bash
# Using pnpm (recommended)
pnpm i jsr:@smartbill/upay

# Using npm
npx jsr add @smartbill/upay

# Using bun
bunx jsr add @smartbill/upay

# Using deno
deno add jsr:@smartbill/upay

```

## Quick Start

```typescript
import { createApiClient, createRequest } from '@smartbill/upay';

// Create a client instance
const client = createApiClient({
  demo: true,        // Use demo environment
  liveSystem: false, // Development mode
  language: "HE"     // Hebrew language
});

// Get a session first
const sessionResult = await client.getSession();
if (sessionResult.isOk()) {
  console.log('Session established:', sessionResult.value.result?.sessionId);
}

// Execute actions with type safety
const result = await client.execute(
  createRequest({
    mainAction: "SESSION",
    minorAction: "GETSESSION"
  })
);

if (result.isOk()) {
  console.log('Response:', result.value);
} else {
  console.error('Error:', result.error);
}
```

## Type-Safe Action Execution

The `execute` method with `createRequest` provides compile-time type safety by automatically narrowing available minor actions based on the selected main action:

```typescript
// ✅ Valid combinations - TypeScript will auto-complete available options
await client.execute(createRequest({
  mainAction: "CASHIER",
  minorAction: "DEPOSITCREDITCARD"
}));

await client.execute(createRequest({
  mainAction: "ACCOUNTSECURE", 
  minorAction: "UPDATEUSERKNOWLEDGEGUEST"
}));

await client.execute(createRequest({
  mainAction: "SESSION",
  minorAction: "GETSESSION"
}));

// ❌ Invalid combinations - TypeScript will show errors
await client.execute(createRequest({
  mainAction: "CASHIER",
  minorAction: "UPDATEUSERKNOWLEDGEGUEST" // Error!
}));
```

## API Structure

### Non-Secure Actions
- **INTERFACES**: System interface queries (banks, countries, etc.)
- **SESSION**: Session management (login, logout, refresh)

### Secure Actions
- **ACCOUNTSECURE**: Account management and user data
- **CASHIER**: Payment processing and transfers
- **CONNECTION**: Authentication and account creation
- **CUSTOMEROFFICE**: Invoice and expense management
- **REGULATION**: Compliance and regulatory actions
- **TRANSACTIONSACTION**: Transaction processing
- **TRANSACTIONSINFO**: Transaction queries and reports
- **UPLOAD**: File upload operations

## Advanced Usage

### Batch Operations

```typescript
const batchResult = await client.executeMultiple([
  createRequest({
    mainAction: "TRANSACTIONSINFO",
    minorAction: "GETMYTRANSACTIONS",
    parameters: { limit: 10 }
  }),
  createRequest({
    mainAction: "ACCOUNTSECURE",
    minorAction: "GETMYBALANCES"
  })
]);
```

### Custom Parameters

```typescript
const result = await client.execute(
  createRequest({
    mainAction: "CASHIER",
    minorAction: "DEPOSITCREDITCARD",
    parameters: {
      amount: 100,
      currency: "ILS",
      cardNumber: "****1234"
    }
  })
);
```

### Error Handling

```typescript
const result = await client.execute(
  createRequest({
    mainAction: "CASHIER",
    minorAction: "DEPOSITCREDITCARD"
  })
);

result.match(
  (success) => {
    console.log('Payment processed:', success);
  },
  (error) => {
    console.error('Payment failed:', error.message);
  }
);
```

## Configuration Options

```typescript
const client = createApiClient({
  demo: false,       // Set to false for production
  liveSystem: true,  // Set to true for live transactions
  language: "HE"     // Currently only Hebrew is supported
});
```

## Development

### Testing
```bash
pnpm test
```

### Publish

```shell
pnpm dlx jsr publish --allow-slow-types

# Or Dry run
# pnpm dlx jsr publish --dry-run
```

## License

[Your License Here]

## Contributing

[Contributing guidelines here]
