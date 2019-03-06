export class Player {
    constructor(public Id: string,
                public FirstName: string,
                public LastName: string,
                public Role: string,
                public Club: string,
                public Price: string,
                public Points: string,
                public Presence: string) {
    }

    public static fromJson(jsonPlayer: Object ): Player {
        var club = '';
        switch (jsonPlayer['RealClubId']) {
            case 100001: club = 'ambri'; break;
            case 100002: club = 'bienne'; break;
            case 100003: club = 'bern'; break;
            case 100004: club = 'davos'; break;
            case 100005: club = 'fribourg'; break;
            case 100007: club = 'lausanne'; break;
            case 100008: club = 'lugano'; break;
            case 100009: club = 'langnau'; break;
            case 100010: club = 'servette'; break;
            case 100011: club = 'zsc'; break;
            case 100012: club = 'zug'; break;
            case 100013: club = 'rapperswil'; break;
        }

        return new Player(
            jsonPlayer['id'],
            jsonPlayer['FirstName'],
            jsonPlayer['LastName'],
            (jsonPlayer['Role'] == '100' ? 'Gardien' : (jsonPlayer['Role'] == '200' ? 'Défenseur' : 'Attaquant')),
            club,
            jsonPlayer['Price'],
            '0',
            '0'
        );
    }

    public getRatio() {
        return Math.round((+this.Points / +this.Presence)*2)/2;
    }

    public getVariation() {
        return (this.getRatio() - +this.Price);
    }
}