import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const MediaControlCard = () => {
  const theme = useTheme();
  const [currentSong, setCurrentSong] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const songs = [
    {
      title: "Apa Mungkin",
      artist: "Bernadya",
      audio: "src/Music/Bernadya - Apa Mungkin (Official Music Video).mp3",
      cover: "public/images/Apa Mungkin.jpeg",
    },
    {
      title: "Evaluasi",
      artist: "Hindia",
      audio: "src/Music/Evaluasi.mp3",
      cover: "public/images/Evaluasi.jpg",
    },
    {
      title: "Resah Jadi Luka",
      artist: "Daun Jatuh",
      audio: "src/Music/Resah Jadi Luka.mp3",
      cover: "public/images/Resah Jadi Luka.jpg",
    },
  ];

  const audioRef = React.useRef(null);

  // Effect to play song when currentSong changes
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSong].audio;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
    }
  }, [currentSong]);

  const playSong = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
    }
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleSongEnd = () => {
    setIsPlaying(false);
  };

  const nextSong = () => {
    setCurrentSong((prevSong) => (prevSong === songs.length - 1 ? 0 : prevSong + 1));
  };

  const previousSong = () => {
    setCurrentSong((prevSong) => (prevSong === 0 ? songs.length - 1 : prevSong - 1));
  };

  return (
    <Card sx={{ display: 'flex' }} className='z-10' id='CardMedia'>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={songs[currentSong].cover}
        alt="Music Cover" 
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }} >
        <CardContent sx={{ flex: '1 0 auto', pb: '0vh', pt: 1.2 }}>
          <Typography component="div" variant="" id='TitleSong'>
            {songs[currentSong].title}
          </Typography>
          <Typography variant="subtitle1" component="div" id='ArtistSong'>
            {songs[currentSong].artist}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous" onClick={previousSong} color="inherit">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause" onClick={playSong} color="inherit">
            {isPlaying ? (
              <PauseIcon sx={{ height: 38, width: 38 }} />
            ) : (
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            )}
          </IconButton>
          <IconButton aria-label="next" onClick={nextSong}  color="inherit">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
      <audio
        ref={audioRef}
        src={songs[currentSong].audio}
        onEnded={handleSongEnd}
      ></audio>
    </Card>
  );
};

export default MediaControlCard;