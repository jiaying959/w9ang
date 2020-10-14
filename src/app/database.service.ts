import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  constructor(private http: HttpClient) {}
  result: any;
  getActors() {
    return this.http.get("/actors");
  }
  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }
  createActor(data) {
    return this.http.post("/actors", data, httpOptions);
  }
  updateActor(id, data) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }
  deleteActor(id) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }
  createMovie(data){
    return this.http.post("/movies", data, httpOptions);
  }
  getMovies() {
    return this.http.get("/movies");
  }
  deleteMovie(id) {
    let url = "/movies/" + id;
    return this.http.delete(url, httpOptions);
  }
  deleteMovieBeforeYear(year){
    let url="/movies/delete/before/"+year;
    return this.http.delete(url, httpOptions);
  }

  addActortoMovie(data){
    let url = "/movies/"+data.movieId+"/actor/"+data.actorId;
    return this.http.put(url,httpOptions);
  }
}
