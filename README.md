# Github Repositories Explorer

This is an [Expo](https://expo.dev) project that allows you to search for Github repositories by username, view their details and navigate to repository page on [github.com](https://github.com).

## Get started

0. Prepare environment<br> Create `.env` file using `.env.example` as template, then create GitHub personal access token using those [docs](
   https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic
   ) and add it to Your newly created `.env` file under: 

   ```
   EXPO_PUBLIC_GITHUB_ACCESS_TOKEN=<your_token_here>
   ```
   **Note:** Even though searching doesn't require auth,
   authenticated requests have higher rate limits than unauthenticated requests (5000 vs 60), so it will allow You to make more searches per hour.
   if You don't want to generate personal access token and use authenticated requests change:
   ```
   EXPO_PUBLIC_USE_AUTHENTICATED_REQUESTS=false
   ```
    To check remaining rate limit You can use rate limit checker at the bottom of the screen. It will show You how many requests You have left in the current hour.


1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

3. Open the app on Your device or emulator

**Note:** if You make changes in `.env` file, You need to restart the server to apply changes.


