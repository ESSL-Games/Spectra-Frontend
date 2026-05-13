import { inject, Injectable } from "@angular/core";
import { DataModelExtraService } from "./dataModelExtra.service";

@Injectable({
  providedIn: "root",
})
export class DisplayNameService {
  private dataModelExtra = inject(DataModelExtraService);

  public getDisplayName(puuid: string, fallback: string): string {
    const playerExtra = this.dataModelExtra.extra().players.find((entry) => entry.riotId === puuid);
    if (playerExtra && playerExtra.name !== "") {
      return playerExtra.name;
    }

    return fallback;
  }
}
