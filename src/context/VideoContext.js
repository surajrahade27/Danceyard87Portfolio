import { createContext, useContext } from 'react'

// Holds the function that opens the video player (see VideoProvider).
export const VideoContext = createContext(() => {})

export function useVideoPlayer() {
  return useContext(VideoContext)
}
