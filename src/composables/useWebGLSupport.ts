let cached: boolean | undefined

/** One-off WebGL capability probe (result is cached). */
export function hasWebGL(): boolean {
  if (cached !== undefined) return cached
  if (typeof window === 'undefined' || typeof window.WebGLRenderingContext === 'undefined') {
    return (cached = false)
  }
  try {
    const canvas = document.createElement('canvas')
    const gl = (canvas.getContext('webgl2') ?? canvas.getContext('webgl')) as
      | WebGLRenderingContext
      | WebGL2RenderingContext
      | null
    cached = gl !== null
    // Release the probe context right away; browsers cap the number of live contexts.
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    cached = false
  }
  return cached
}
