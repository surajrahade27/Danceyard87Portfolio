import { useState } from 'react'
import { VideoContext } from '../../context/VideoContext'
import VideoModal from './VideoModal'

// Lets any section open the shared video player: useVideoPlayer()(video)
function VideoProvider({ children }) {
  const [video, setVideo] = useState(null)

  return (
    <VideoContext value={setVideo}>
      {children}
      {video && <VideoModal video={video} onClose={() => setVideo(null)} />}
    </VideoContext>
  )
}

export default VideoProvider
