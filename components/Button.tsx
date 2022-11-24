import { JSX } from 'preact'
import { IS_BROWSER } from '$fresh/runtime.ts'
// import OP from 'open-props'

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
    />
  )
}
