# Backend - Smart Contracts

This project requires some smart contracts to be deployed on chain.

## Development

### First in `hardhat` folder

- Start `hardhat` node

```shell
hardhat $ npx hardhat node
...
```

#### Deploy EAS Contracts (if localhost network)

**Important**: This should be done once per network

TODO: Can I check whether a contract is already deployed?

- On another shell deploy the EAS contracts locally

```shell
hardhat $ npx hardhat run scripts/deployEasContracts.ts
...
```

This will generate the file `hardhat/deployed/contracts/easContractAddresses.json` with the contract addresses
for the `EAS` and the `SchemaRegistry` contracts.

#### Register `TalentProtocolPassportSchemaRecord`

**Important**: This should be done once per network

TODO: Can I check whether the schema record is already registered?

From `hardhat` folder:

```shell
hardhat $ npx hardhat run scripts/registerTalentProtocolPassportSchema.ts
```

# Frontend

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Python 3.x

It is a requirement for jest to be installed. You can use `asdf` to install it. See the [.tool-versions](./.tool-versions) for the version
needed.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
