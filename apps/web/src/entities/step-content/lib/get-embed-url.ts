export const getEmbedUrl = (url?: string): string => {
  if (!url) return ''

  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname.replace(/^www\./, '')
    const pathname = urlObj.pathname

    // YouTube
    if (hostname === 'youtube.com' || hostname === 'youtu.be') {
      if (pathname.includes('/embed/')) return url

      let videoId: string | null = null

      if (hostname === 'youtu.be') {
        videoId = pathname.slice(1) // /dQw4w9WgXcQ
      } else if (pathname.includes('/shorts/')) {
        videoId = pathname.split('/shorts/')[1]
      } else if (pathname === '/watch') {
        videoId = urlObj.searchParams.get('v')
      }

      if (videoId) return `https://www.youtube.com/embed/${videoId}?rel=0`
    }

    // VK Video
    if (hostname === 'vk.com' || hostname === 'vkvideo.ru') {
      if (pathname.includes('/video_ext.php')) return url

      const videoIdMatch = /\/video(-?\d+_\d+)/.exec(pathname)
      const oid = urlObj.searchParams.get('oid')
      const id = urlObj.searchParams.get('id')

      if (videoIdMatch?.[1]) {
        const [ownerId, videoId] = videoIdMatch[1].split('_')
        return `https://vk.com/video_ext.php?oid=${ownerId}&id=${videoId}&hd=2`
      } else if (oid && id) {
        return `https://vk.com/video_ext.php?oid=${oid}&id=${id}&hd=2`
      }
    }

    // RuTube
    if (hostname === 'rutube.ru') {
      if (pathname.includes('/play/embed/')) return url

      const videoIdMatch = /\/video\/([a-zA-Z0-9]+)/.exec(pathname)
      if (videoIdMatch?.[1]) {
        return `https://rutube.ru/play/embed/${videoIdMatch[1]}`
      }
    }

    if (hostname === 'vimeo.com' || hostname === 'player.vimeo.com') {
      if (hostname === 'player.vimeo.com' && pathname.includes('/video/')) return url

      const videoIdMatch = /\/(\d+)/.exec(pathname)
      if (videoIdMatch?.[1]) {
        return `https://player.vimeo.com/video/${videoIdMatch[1]}`
      }
    }

    // Twitch
    if (hostname === 'twitch.tv' || hostname === 'player.twitch.tv') {
      if (hostname === 'player.twitch.tv') return url

      if (pathname.includes('/videos/')) {
        const videoId = pathname.split('/videos/')[1]
        return `https://player.twitch.tv/?video=${videoId}&parent=${window.location.hostname}`
      } else {
        const channelId = pathname.slice(1)
        if (channelId) {
          return `https://player.twitch.tv/?channel=${channelId}&parent=${window.location.hostname}`
        }
      }
    }

    // Dzen
    if (hostname === 'dzen.ru') {
      if (pathname.includes('/embed/')) return url

      const videoIdMatch = /\/video\/watch\/([a-zA-Z0-9]+)/.exec(pathname)
      if (videoIdMatch?.[1]) {
        return `https://dzen.ru/embed/${videoIdMatch[1]}`
      }
    }
  } catch (e) {
    console.error('Video URL parsing error:', e)
  }

  // Fallback: вернуть URL как есть. Если он не поддерживается, браузер попытается загрузить iframe.
  return url
}
