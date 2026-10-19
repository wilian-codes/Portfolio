import { useCallback, useEffect, useState } from 'react'

export type CopyStatus = 'idle' | 'copied' | 'failed'

const RESET_AFTER_MS = 2000

/** Copies text to the clipboard and reports how it went for a couple of seconds. */
export function useCopyToClipboard() {
  const [status, setStatus] = useState<CopyStatus>('idle')

  useEffect(() => {
    if (status === 'idle') return
    const timer = window.setTimeout(() => setStatus('idle'), RESET_AFTER_MS)
    return () => window.clearTimeout(timer)
  }, [status])

  const copy = useCallback((text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => setStatus('copied'))
      .catch((error: unknown) => {
        // Happens when the browser blocks clipboard access; the button says so.
        console.error('Could not copy to the clipboard.', error)
        setStatus('failed')
      })
  }, [])

  return { status, copy }
}
