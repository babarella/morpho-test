## Technical assignment for Morpho Labs - Quicks docs

Hosted on Vercel: https://morpho-test-beta.vercel.app/

### Installation

1. Clone repo
2. `npm i`
3. `npm run dev`

### Folder structure

Pretty standard folder structure with clear separation of concerns, you shouldn't be too confused navigating. So I will describe only special parts.

- src/components/ui - home for UI components which have potential to belong to UI kit and with time being separated into their own package
- src/lib - folder for pure logic, main rule - structure it by domain
- src/components - structure by domain, the rule for creation component: folder and .tsx file with same name paired with index.ts to export for elegan access nad funneling in case achitecure of component gets more complex. Not applicable to components which are supposed to be implementation details of main component.

### General notices
- Was not setting up too strict and clear static analysis, so just basic linting, prettier and husky on top, could definitely be improved

### What is possible to be improved?
- Better selection of graphql query library to support client-side caching (could boost search results output)
- I had to care about a bunch of details to make this app prod-ready to my taste, so I was a bit in hurry, so I think better architecture and development is possible for `useVaultsSearch` hook to tackle race conditions in a more elegant way.

Overall that's it. I gave it a lot of attention and time, I believe it's a masterpiece. Hope you enjoy inspecting it.
