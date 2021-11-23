export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface commentLikeUser {
  id: number;
  username: string;
}

export interface Comment {
  commentLikeUsers: commentLikeUser[];
  content: string;
  created: string;
  id: number;
  updated: string;
  user_id: number;
  username: string;
}

export interface Hashtag {
  id: number;
  name: string;
}

export interface postLikeUser {
  id: number;
  name: string;
}

export interface Review {
  comments: Comment[];
  created: string;
  description: string;
  hashtags: Hashtag[];
  id: number;
  image: string;
  movie_id: number;
  movie_name: string;
  postLikeUsers: postLikeUser[];
  rate: number;
  updated: string;
  user_id: number;
  username: string;
}

export interface Cast {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface Actors {
  cast: Cast[];
}
