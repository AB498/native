# BHC Jobs Mobile App

A React Native application for browsing jobs and completing the core job seeker authentication flow.

## Features

### Landing experience

- Hero/banner section
- Popular industries
- Recommended jobs
- Popular companies
- Trending and hot jobs
- Responsive mobile and desktop-style layouts
- Live API integration with demo fallback support

### Authentication

- Sign in
- Sign up
- OTP verification
- Basic client-side validation
- Loading and error states

### Additional UX

- Dark mode toggle
- Reusable components
- Shared theme system
- Simple authenticated app shell after login

## API integration

Base URL:

```txt
https://dev.bhcjobs.com
```

Used endpoints:

- `GET /api/industry/get`
- `GET /api/job/get`
- `GET /api/company/get`
- `POST /api/job_seeker/register`
- `POST /api/job_seeker/phone_verify`
- `POST /api/job_seeker/login`

## Tech stack

- React Native `0.83.1`
- React `19.2.0`
- TypeScript
- React Navigation
- React Native SVG

## Project structure

- `App.tsx` application entry, navigation, and main flow
- `src/components/` reusable UI and screens
- `src/services/landingApi.ts` landing API integration
- `src/services/authApi.ts` authentication API integration
- `src/hooks/useLandingData.ts` landing data loading and fallback handling
- `src/data/mockLandingData.ts` local demo data
- `src/theme/appTheme.tsx` theme provider and color system

## Prerequisites

- Node.js `20+`
- npm
- Android Studio for Android
- Xcode and CocoaPods for iOS on macOS

## Installation

```bash
npm install
```

### iOS only

```bash
cd ios
pod install
cd ..
```

## Running the app

### Start Metro

```bash
npm start
```

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

## App behavior

### Landing data modes

- `Demo` uses local mock content
- `Live` loads data from the BHC Jobs API
- If live requests fail, the app falls back to mock landing data

### Authentication flow

1. Open `Sign In` from the landing screen.
2. Create a new account if needed.
3. Submit registration details.
4. Verify the phone number with OTP.
5. Sign in using phone and password.

## Validation

### Sign in

- Phone must match `01XXXXXXXXX`
- Password must be at least 6 characters

### Sign up

- Full name required
- Phone must match `01XXXXXXXXX`
- Date of birth required
- Passport number required
- Gender required
- Valid email required
- Password must be at least 6 characters
- Confirm password must match

## Notes

- OTP returned by the registration API is shown in the OTP screen when available.
- Social login, password reset, token refresh, and secure storage are not included in the current implementation.
- Some authenticated sections currently use placeholder content while the main landing and authentication flows are fully implemented.

## Quality checks

### Lint

```bash
npm run lint
```

### Test

```bash
npm test -- --watchAll=false --runInBand
```

Current test status:

- Tests pass.
- React Native may still print a `SafeAreaView` deprecation warning during Jest runs because that warning comes from framework internals, not from a failing assertion.
