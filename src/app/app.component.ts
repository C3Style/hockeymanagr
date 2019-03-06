import { Component, OnInit, ViewChild } from '@angular/core';
import { HMService } from './services/hm.service';
import { Player } from './objects/player'
import { Stat } from './objects/stat'
import { MatSnackBar } from '@angular/material'
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(BaseChartDirective) 
  public chartRef: BaseChartDirective;

  players: Player[];
  stats: Stat[];
  totalTeamCost: number;
  isLoading: boolean;
  ownPlayersLicenceNumber : string[];

  // lineChart
  public lineChartData:Array<any> = [
    {data: [] }
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: false,
    scales : {
      yAxes: [{
         ticks: {
            steps : 1,
            stepValue : 1,
            max : 20,
            min : 1
          }
      }] 
    }
  };
  public lineChartColors:Array<any> = [
    /*
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
    */
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  
  constructor(private service: HMService, public snackBar: MatSnackBar) {
    this.isLoading = true;
    this.ownPlayersLicenceNumber = [
      // Gardien
      '1929',   // Conz
      '2163', // Nyffeler
      // Défenseurs
      '2201', // Zryd
      '2200', // Zgraggen
      '1962', // Burren
      '1958', // Andersson
      '1984', // Egli
      '2008', // Paschoud
      '2164', // Büsser
      '2165', // Gähler
      // Attaquants
      '1972', // Arcobello	
      '1994', // Pouliot
      '1995', // Rajala
      '1972', // Berger
      '2157', // Walker
      '1977', // Ebbett
      '1993', // Brunner
      '1989', // Tanner
      '1938', // Goi
      '2133', // Bertschy
      '2230', // Bachofner
      '2125', // Traber
    ];
  }

  ngOnInit() {
	  /*
    this.service.getPlayers().subscribe(
      data => {
        this.players = data;
        this.service.getPlayersStats().subscribe(
          data => {
            data.forEach(stat => {
              var player = this.players.find(x => x.Id == stat.IdPlayer);
              player.Points = stat.Points;
              player.Presence = stat.Presence;
            }); 

            // Sort array
            this.players.sort( function(p1, p2) {
              if ( +p1.Points > +p2.Points ){
                return -1;
              }else if( +p1.Points < +p2.Points ){
                  return 1;
              }else{
                return 0;	
              }
            });

            // Calculate total amount
            this.totalTeamCost = this.players.reduce((sum, item) => sum + +item.Price, 0);
            this.isLoading = false;
          }
        );
      }
    ); 
	*/
  }

  getStat(player: Player) {

    this.isLoading = true;
    var month = [];
    this.lineChartLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    this.service.getStat().subscribe(
      data => {

        this.lineChartData.length = 0;
        this.chartRef.chart.config.data.datasets.length = 0;

        for (let key in data) {

          if (player.Id == key) {
            let value = data[key];
            var price = [];

            data[key]['stats'].forEach(stat => {
              var value = Math.round((+stat.points / +stat.presence)*2)/2;
              price.push(value);
            });

            var newObj = {data: price, label: data[key]['playerFirstName'] + " " + data[key]['playerLastName'], fill:false};
            this.chartRef.chart.config.data.datasets.push(newObj);
            this.lineChartData.push(newObj);
          }
        }

        this.chartRef.chart.update();
        this.isLoading = false;
    });    
  }

  saveStat() {
    this.isLoading = true;
    this.service.saveStat(this.players).subscribe(data => {
        this.isLoading = false;
        this.openSnackBar("Les statistiques ont été mémorisées.");
        console.log(data);
      }, 
      error => console.log("Error HTTP Post Service : "),
      () => console.log("Job Done Post !") 
    );
  }

  openSnackBar(text) {
    this.snackBar.open(text, null, {
      duration: 2000,
    });
  }
}
