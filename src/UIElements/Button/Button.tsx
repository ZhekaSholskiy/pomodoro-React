import React from 'react';
import styles from './button.module.css';

export function Button(props: {text: string, className?: string, onClick?: () => void, disabled?: boolean}) {
  return (
    <button className={`${styles.button} ${props.className}`} onClick={props.onClick} disabled={props.disabled}>
      {props.text}
    </button>
  );
}
