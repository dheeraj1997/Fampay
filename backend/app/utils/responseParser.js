module.exports.parseApiResponse = data => {
    const resultObject = []
    data.items.forEach(item => {
      resultObject.push({
        video_id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        channel_id: item.snippet.channelId,
        channel_title: item.snippet.channelTitle,
        publish_time: item.snippet.publishTime
      })
    })

    return resultObject
}
