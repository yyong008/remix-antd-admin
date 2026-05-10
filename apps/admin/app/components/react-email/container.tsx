import { createContext, useContext } from "react";

import styles from "./container.module.css";

export const ExamplePageContext = createContext(false);

interface ExampleShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ReactEmailContainer({ title, description, children }: ExampleShellProps) {
  const hideHeader = useContext(ExamplePageContext);

  return (
    <div className={styles.container}>
      {!hideHeader && (
        <>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
