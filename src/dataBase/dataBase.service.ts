import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/interfaces/album.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { Favorites } from 'src/favorites/interfaces/favorites.interface';
import { Track } from 'src/tracks/interfaces/track.interface';
import { User } from 'src/users/interfaces/user.interface';

@Injectable()
export class DataBaseService {
  private readonly users: User[] = [];
  private readonly tracks: Track[] = [];
  private readonly artists: Artist[] = [];
  private readonly albums: Album[] = [];
  private readonly favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  //users

  addUser(user: User) {
    this.users.push(user);
  }

  getUser(id: string) {
    return this.users.find((user) => user.id === id);
  }

  getUsers() {
    return this.users;
  }

  updateUser(newUserData: User, id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = newUserData;
  }

  deleteUser(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
  }

  //albums

  addAlbum(album: Album) {
    this.albums.push(album);
  }

  getAlbum(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  getAlbums() {
    return this.albums;
  }

  updateAlbum(newAlbumData: Album, id: string) {
    const index = this.albums.findIndex((album) => album.id === id);
    this.albums[index] = newAlbumData;
  }

  deleteAlbum(id: string) {
    const index = this.albums.findIndex((album) => album.id === id);
    this.albums.splice(index, 1);
    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
    this.tracks.forEach((track) => {
      if (track.albumId === id) track.albumId = null;
    });
  }

  //tracks

  addTrack(track: Track) {
    this.tracks.push(track);
  }

  getTrack(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  getTracks() {
    return this.tracks;
  }

  updateTrack(newTrackData: Track, id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks[index] = newTrackData;
  }

  deleteTrack(id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(index, 1);
    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }

  //artists

  addArtist(artist: Artist) {
    this.artists.push(artist);
  }

  getArtist(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  getArtists() {
    return this.artists;
  }

  updateArtist(newArtistData: Artist, id: string) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists[index] = newArtistData;
  }

  deleteArtist(id: string) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(index, 1);
    this.favorites.artists = this.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
    this.tracks.forEach((track) => {
      if (track.artistId === id) track.artistId = null;
    });
    this.albums.forEach((album) => {
      if (album.artistId === id) album.artistId = null;
    });
  }

  //favorites
  isIt(id: string, what: string) {
    const el = this[what].find((item: { id: string }) => item.id === id);
    return el ? true : false;
  }

  addFavorite(id: string, what: string) {
    this.favorites[what].push(id);
  }

  getFavorites() {
    const favorites = {
      artists: this.artists.filter((artist) =>
        this.favorites.artists.includes(artist.id),
      ),
      albums: this.albums.filter((album) =>
        this.favorites.albums.includes(album.id),
      ),
      tracks: this.tracks.filter((track) =>
        this.favorites.tracks.includes(track.id),
      ),
    };
    return favorites;
  }

  deleteFavorite(id: string, what: string) {
    const index = this.favorites[what].findIndex(
      (item: { id: string }) => item.id === id,
    );
    this.favorites[what].splice(index, 1);
  }
}
