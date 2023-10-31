const songs = require("./songs.json")
const fs = require('fs')

const artistIndex = []
let indexArtist = 0
const resultArtist = []
const result = []
let formatResultSQLSongs = ""
let formatResultSQLArtists = ""

for(let i = 0; i< songs.length; i++){
  let name = songs[i].track_name, 
        album = songs[i].album_name, 
        album_img = songs[i].album_img,
        album_type = songs[i].album_type,
        album_label = songs[i].album_label,
        album_track_number = songs[i].album_track_number,
        song_contributors = songs[i].artist_num,
        explicit = songs[i].explicit,
        artist = songs[i].artist_name,
        artist_img = songs[i].artist_img, 
        time = Number(songs[i].duration),
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
  if(typeof name==="string")
    album_type = album_type.replace(/['`’]/g, "''")
  if(typeof name==="string")
    album_label = album_label.replace(/['`’]/g, "''")
  if(typeof name==="string")
    album_track_number = album_track_number.replace(/['`’]/g, "''")
  if(typeof name==="string")
    song_contributors = song_contributors.replace(/['`’]/g, "''")
  if(typeof name==="string")
    explicit = explicit.replace(/['`’]/g, "''").toLowerCase()
    
  const secondsTot = Math.trunc(time/1000)
  const min = Math.floor(secondsTot/60)
  const seconds = secondsTot%60
      
  let secondsStr = seconds.toString()
  if(secondsStr.length<2)
      secondsStr = "0"+secondsStr
  const formattedTime = `${min}:${secondsStr}`

  if(artistIndex.indexOf(artist)===-1){
    artistIndex.push(artist)
    resultArtist.push({artist, artist_img})
    formatResultSQLArtists += `('${resultArtist[indexArtist].artist}', '${resultArtist[indexArtist].artist_img}'),\n`
    indexArtist++
  }
  const artist_index = artistIndex.indexOf(artist)+1
  result.push({artist_id: artist_index, name: name, artist: artist, album: album, time: formattedTime,
              is_favorite: Math.random() < 0.5, album_img: album_img,
              artist_img: artist_img, release_date: release_date })

  if(i!==songs.length-1){
      formatResultSQLSongs += `('${result[i].artist_id}', ` + `'${result[i].name}', '${result[i].artist}',`+
                         ` '${result[i].album}', '${result[i].time}',`+
                         ` ${result[i].is_favorite}, '${result[i].album_img}',`+
                         ` '${result[i].artist_img}', '${result[i].release_date}'),\n`
  }
  else{
    formatResultSQLSongs += `('${result[i].artist_id}', ` + `'${result[i].name}', '${result[i].artist}',`+
                       ` '${result[i].album}', '${result[i].time}',`+
                       ` ${result[i].is_favorite}, '${result[i].album_img}',`+
                       ` '${result[i].artist_img}', '${result[i].release_date}');`
  }

}

fs.writeFile('OutputSQLSongs.txt', formatResultSQLSongs, (err) => { 
    if (err) throw err
}) 

fs.writeFile('OutputSQLArtists.txt', formatResultSQLArtists, (err) => { 
  if (err) throw err
}) 



