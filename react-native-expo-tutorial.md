# React Native + Expo Tutorial
### A guide to understanding "vibe coded" mobile apps

This tutorial is written for someone who has AI-generated (vibe coded) React Native code and wants to actually understand what it's doing — not just copy-paste it. We'll go from zero to being able to read almost any Expo project confidently.

---

## 1. The Big Picture: What Are React Native and Expo?

**React Native** lets you write mobile apps (iOS + Android) using JavaScript/TypeScript and React, instead of Swift (iOS) or Kotlin (Android). One codebase, two platforms.

**Expo** is a toolchain built on top of React Native that removes most of the painful setup. Without Expo, you'd need Xcode, Android Studio, native build configs, etc. just to see "Hello World" on your phone. Expo handles all of that for you.

Think of it like this:
- **React Native** = the engine (the actual UI framework)
- **Expo** = the car body, dashboard, and tools around the engine that make it usable without being a mechanic

When AI generates "React Native + Expo" code, it's almost always using **Expo Router** (file-based navigation) and functional React components with **hooks**. Keep that in mind — it explains a lot of the "weird" folder structure you'll see.

---

## 2. Project Structure — What Each File/Folder Does

A typical vibe-coded Expo app looks like this:

```
my-app/
├── app/                    ← Screens live here (Expo Router)
│   ├── _layout.tsx         ← Root layout, wraps all screens
│   ├── index.tsx           ← Home screen ("/" route)
│   └── profile.tsx         ← Another screen ("/profile" route)
├── components/              ← Reusable UI pieces (buttons, cards, etc.)
├── assets/                  ← Images, fonts, icons
├── constants/                ← Colors, sizes, static config values
├── hooks/                    ← Custom reusable logic (useSomething.ts)
├── app.json                 ← Expo app configuration (name, icon, splash)
├── package.json             ← Dependencies + npm scripts
└── tsconfig.json             ← TypeScript settings (if using TS)
```

**Key insight:** With Expo Router, the *file name and location inside `app/`* determines the URL/screen route. This is the same idea as Next.js for web. So if you see a file at `app/settings/index.tsx`, that's automatically the `/settings` screen — no manual route registration needed.

---

## 3. Anatomy of a Screen Component

Here's a minimal, realistic screen you'll see in most generated code:

```tsx
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

Let's break down every piece:

| Line/Concept | What it means |
|---|---|
| `import { View, Text, ... } from 'react-native'` | These are the basic "HTML tags" of React Native. `View` = like a `<div>`. `Text` = like a `<span>`/`<p>` (note: **all text must be inside `<Text>`**, unlike web) |
| `export default function HomeScreen()` | This is the component. The file's default export is what Expo Router renders as the screen |
| `return (<View>...</View>)` | JSX — describes what's on screen |
| `style={styles.container}` | React Native doesn't use CSS files. Styles are JS objects, applied via the `style` prop |
| `StyleSheet.create({...})` | A performance-optimized way to define style objects. Functionally similar to a plain object, but Expo apps almost always use this |
| `flex: 1` | Makes the View fill available space — the RN equivalent of `height: 100%` in a flexbox world. **Everything in RN is flexbox by default** |

---

## 4. Core Building-Block Components

AI-generated code leans heavily on a small set of built-in components. Learn these and 80% of the code becomes readable:

| Component | Web equivalent | Purpose |
|---|---|---|
| `View` | `<div>` | Layout container |
| `Text` | `<p>`/`<span>` | Any visible text |
| `Image` | `<img>` | Displaying images |
| `TextInput` | `<input>` | Text entry fields |
| `TouchableOpacity` / `Pressable` | `<button>` | Tappable elements (fades slightly on press) |
| `ScrollView` | `overflow: scroll` | Scrollable content (loads everything at once) |
| `FlatList` | Virtualized list | Scrollable list of many items — only renders what's visible (better for long lists) |
| `SafeAreaView` | N/A | Keeps content away from notches/status bars |

**Common pattern you'll see constantly:**

```tsx
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <Text>{item.name}</Text>}
/>
```

This says: "for each thing in `items`, render it using this function." It's the RN equivalent of `.map()` for rendering lists, but optimized for performance.

---

## 5. State and Hooks — Why Code Has So Many `useState`/`useEffect`

Vibe-coded apps are full of **React hooks**. If you understand these three, you can follow almost any logic:

### `useState` — remembering values that change
```tsx
import { useState } from 'react';

const [count, setCount] = useState(0);
```
- `count` = current value
- `setCount` = function to update it
- `0` = initial value

Whenever `setCount(...)` is called, the component **re-renders** with the new value.

### `useEffect` — running code at specific times
```tsx
import { useEffect } from 'react';

useEffect(() => {
  fetchData();
}, []);
```
- The function runs after the component mounts (appears on screen)
- The `[]` at the end is the **dependency array** — empty means "run once." If it contained a variable like `[userId]`, it would re-run whenever `userId` changes

### `useRouter` (from Expo Router) — navigation
```tsx
import { useRouter } from 'expo-router';

const router = useRouter();
router.push('/profile'); // navigate to another screen
```

---

## 6. Styling Cheat Sheet

Since there's no CSS file, here's how common web styling maps to React Native:

| Web CSS | React Native |
|---|---|
| `display: flex` | Default for every `View` |
| `class="..."` | `style={styles.xyz}` |
| `background-color` | `backgroundColor` (camelCase, no hyphens) |
| `margin-top` | `marginTop` |
| `px` units | Just numbers (no unit) — `fontSize: 16` |
| `%` widths | Still works: `width: '50%'` |
| Media queries | `Dimensions` API or libraries like `useWindowDimensions()` |
| Hover states | Don't exist on mobile — look for `onPressIn`/`onPressOut` instead |

**Rule of thumb:** every CSS property becomes camelCase, and units are dropped (numbers = density-independent pixels).

---

## 7. Data Fetching Pattern

Almost every vibe-coded app that talks to an API follows this shape:

```tsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchData() {
    try {
      const response = await fetch('https://api.example.com/items');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  fetchData();
}, []);

if (loading) return <ActivityIndicator />;

return <Text>{JSON.stringify(data)}</Text>;
```

Reading this: "When the screen loads, fetch data. While waiting, show a spinner (`ActivityIndicator`). Once done, show the data (or handle the error)."

---

## 8. Navigation Basics (Expo Router)

Since file location = route, navigation code usually looks like:

```tsx
import { Link, useRouter } from 'expo-router';

// Declarative way — like an <a> tag
<Link href="/profile">Go to profile</Link>

// Imperative way — inside a function/event handler
const router = useRouter();
router.push('/profile');
router.back(); // go to previous screen
```

Special file names to recognize:
- `_layout.tsx` — wraps child screens (often adds a header, tab bar, or navigation container)
- `[id].tsx` — a **dynamic route**, e.g. `app/product/[id].tsx` matches `/product/123`, and you access `123` via `useLocalSearchParams()`

---

## 9. Running the Project

Commands you'll actually use:

```bash
npx create-expo-app my-app     # create a new project
cd my-app
npx expo start                 # start the dev server
```

After `npx expo start`, you get a QR code. Scan it with the **Expo Go** app on your phone (or press `i`/`a` in the terminal to open an iOS/Android simulator) to preview the app live, with hot reload on every save.

---

## 10. Common Things That Confuse Beginners

- **No `<div>`, no `<h1>`, no `<p>`.** Everything is `View`/`Text`/etc. Text *must* be wrapped in `<Text>` — you can't put raw text inside a `<View>`.
- **No CSS cascade.** Styles don't inherit down to children the way CSS does (except `Text` inside `Text`, which does inherit some properties).
- **`Platform.OS`** — you'll see code branching like:
  ```tsx
  import { Platform } from 'react-native';
  const padding = Platform.OS === 'ios' ? 20 : 16;
  ```
  This handles the small differences between iOS and Android.
- **Async Storage** replaces `localStorage`:
  ```tsx
  import AsyncStorage from '@react-native-async-storage/async-storage';
  await AsyncStorage.setItem('key', 'value');
  ```

---

## 11. Quick Reference Glossary

| Term | Meaning |
|---|---|
| JSX | HTML-like syntax inside JavaScript |
| Component | A function that returns UI (JSX) |
| Props | Data passed into a component, e.g. `<Card title="Hi" />` |
| Hook | A special function (starts with `use`) that adds React features like state |
| State | Data that changes and triggers a re-render when updated |
| Expo Router | File-based navigation system for Expo apps |
| Metro bundler | The tool that bundles your JS code to run on the device |

---

## 12. How to Read Vibe-Coded Code, Step by Step

Next time an AI hands you a file, read it in this order:
1. **Imports** — tells you what tools/components are being used
2. **The function signature** — what's the component called, what props does it take?
3. **State declarations (`useState`)** — what data does this screen track?
4. **Effects (`useEffect`)** — what happens automatically (fetches, timers, subscriptions)?
5. **The `return (...)` JSX** — what's actually rendered, and which state variables show up where?
6. **Styles at the bottom** — usually the least important part to understand first

---

You now have enough of a mental model to open any Expo-generated file and trace through what it's doing, even if you didn't write it yourself.
