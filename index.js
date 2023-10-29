const songs = require("./songs.json")
const fs = require('fs')

const result = []
let formatResultSQL = ""

for(let i = 0; i< songs.length; i++){
  const name = songs[i].track_name, album = songs[i].album_name, 
        album_img = songs[i].album_img, artist = songs[i].artist_name,
        artist_img = songs[i].artist_img, time = Number(songs[i].duration),
        release_date = songs[i].release_date

  if(typeof name==="string")
    name = name.replace(/['`’]/g, "''")
  if(typeof artist==="string")
    artist = artist.replace(/['`’]/g, "''")
  if(typeof album==="string")
      album = album.replace(/['`’]/g, "''")
  if(typeof album_img==="string")
    album_img = album_img.replace(/['`’]/g, "''")
  if(typeof artist_img==="string")
    artist_img = artist_img.replace(/['`’]/g, "''")
  if(typeof release_date==="string")
    release_date = release_date.replace(/['`’]/g, "''")
    
  const secondsTot = Math.trunc(time/1000)
  const min = Math.floor(secondsTot/60)
  const seconds = secondsTot%60
      
  const secondsStr = seconds.toString()
  if(secondsStr.length<2)
      secondsStr = "0"+secondsStr
  const formattedTime = `${min}:${secondsStr}`

  result.push({name: name, artist: artist, album: album, time: formattedTime,
              is_favorite: Math.random() < 0.5, album_img: album_img,
              artist_img: artist_img })

  if(i!==songs.length-1){
      formatResultSQL += `('${result[i].name}', '${result[i].artist}',`+
                         ` '${result[i].album}', '${result[i].time}',`+
                         ` ${result[i].is_favorite}, '${result[i].album_img}',`+
                         ` '${result[i].artist_img}'),\n`
  }
  else{
    formatResultSQL += `('${result[i].name}', '${result[i].artist}',`+
                       ` '${result[i].album}', '${result[i].time}',`+
                       ` ${result[i].is_favorite}, '${result[i].album_img}',`+
                       ` '${result[i].artist_img}');`
  }

}

fs.writeFile('Output.txt', formatResultSQL, (err) => { 
    if (err) throw err
}) 



