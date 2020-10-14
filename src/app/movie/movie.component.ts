import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  moviesDB:any[]=[];
  section=1
  title: string = "";
  year: number =0;
  movieId: string = "";

  actorsDB: any[] = [];
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  constructor(private dbService:DatabaseService) { }
  
  

  //get list of movies
  onGetMovies(){
    this.dbService.getMovies().subscribe((data:any[])=>{
      this.moviesDB=data;
    })
  }

  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //add a new movie
  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }
  //delete movie before a year 
  onDeleteMovieBeforeYear(){
    this.dbService.deleteMovieBeforeYear(this.year).subscribe(result => {
    this.onGetMovies();
    });
  }
//select a movie 
onSelectMovie(item) {
  this.movieId=item._id
}
//select a actor 
onSelectActor(item){
  this.actorId=item._id
}
  //add a actor to movie 
  onAddActortoMovie(){
 const obj = {movieId:this.movieId,actorId:this.actorId};
 console.log(obj);
 this.dbService.addActortoMovie(obj).subscribe(result=>{
   this.onGetActors();
   this.onGetMovies();

 })
  }

  //when the compoenent get initialized 
  ngOnInit(): void {
    this.onGetMovies();
    this.onGetActors();
  }

  changeSection(sectionId){
    this.section=sectionId;
    this.resetValues();
  }

  resetValues(){
    this.title="";
    this.year=0;
    this.movieId = "";
  }
}
