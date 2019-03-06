export class Stat {
    constructor(public IdPlayer: string,
                public Points: string,
                public Presence: string) {
    }

    public static fromJson(jsonStat: Object ): Stat {
        return new Stat(
            jsonStat['id'],
            jsonStat['points'],
            jsonStat['presense']
        );
    }
}