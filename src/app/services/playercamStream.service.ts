import { effect, inject, Injectable } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DataModelService } from "./dataModel.service";
import { DataModelExtraService } from "./dataModelExtra.service";
import { IPlayerData } from "./Types";

@Injectable({
  providedIn: "root",
})
export class PlayercamStreamService {
  private dataModel = inject(DataModelService);
  private dataModelExtra = inject(DataModelExtraService);
  private sanitizer = inject(DomSanitizer);

  private streams = new Map<string, SafeResourceUrl>();

  constructor() {
    // watch for team changes and add streams
    effect(() => {
      const teams = this.dataModel.teams();
      for (const team of teams) {
        for (const player of team.players) {
          if (!this.streams.has(player.fullName)) {
            this.streams.set(player.fullName, this.createStreamUrl(player));
          }
        }
      }
    });
  }

  getStream(playerFullName: string): SafeResourceUrl | undefined {
    return this.streams.get(playerFullName);
  }

  hasStream(playerFullName: string): boolean {
    return this.streams.has(playerFullName);
  }

  // initialize streams
  initializeFromTeams(): void {
    const teams = this.dataModel.teams();
    for (const team of teams) {
      for (const player of team.players) {
        if (!this.streams.has(player.fullName)) {
          this.streams.set(player.fullName, this.createStreamUrl(player));
        }
      }
    }
  }

  private createStreamUrl(player: IPlayerData): SafeResourceUrl {
    const playerExtra = this.dataModelExtra
      .extra()
      .players.find((entry) => entry.riotId === player.riotId);
    if (!playerExtra) return this.sanitizer.bypassSecurityTrustResourceUrl("");
    const streamUrl =
      this.dataModelExtra.extra().streamUrlPrefix +
      playerExtra.id +
      this.dataModelExtra.extra().streamUrlSuffix;
    return this.sanitizer.bypassSecurityTrustResourceUrl(streamUrl);
  }
}
