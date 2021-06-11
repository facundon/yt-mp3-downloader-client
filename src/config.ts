export const ytWatchUrl = "https://youtube.com/watch?v="
export const wsBackendUrl = `ws://${process.env.REACT_APP_BACKEND_API?.replace(
   /^https?:\/\//g,
   ""
)}`
declare global {
   interface Window {
      fbAsyncInit: () => void
   }
}
