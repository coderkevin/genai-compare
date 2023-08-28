"use client";

// This is a temporary fix for using emotion in Next.js 13 with app dir support
// This code comes from: https://github.com/vercel/next.js/tree/9ea6bc4bcb7bf9d63ed8c013ac1ccc45b5974fda/test/e2e/app-dir/emotion-js
// For more details, follow: https://github.com/emotion-js/emotion/issues/2928
//
// TODO: Review and update when concensus/solution is reached

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { ReactNode, useState } from "react";

interface RootStyleRegistryProps {
  children: ReactNode;
}

export default function RootStyleRegistry({
  children,
}: RootStyleRegistryProps) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "emotion-cache" });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
